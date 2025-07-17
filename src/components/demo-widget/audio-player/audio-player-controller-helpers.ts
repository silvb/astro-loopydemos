import type { Preset } from "@types"
import { BACKING_TRACK, CLEAN_TONE, MEDIA_ROOT_URL } from "./constants"
import { audioBufferCache } from "./audio-buffer-cache"

export const getMediaUrl = (id: string, slug: string) => {
  switch (id) {
    case CLEAN_TONE:
      return `${MEDIA_ROOT_URL}/${slug}/clean.mp3`
    case BACKING_TRACK:
      return `${MEDIA_ROOT_URL}/${slug}/backing_track.mp3`
    default:
      return `${MEDIA_ROOT_URL}/${slug}/${id}.mp3`
  }
}

export const fetchAudioBuffer = async (
  id: string,
  slug: string,
  audioContext: AudioContext,
) => {
  const cacheKey = `${slug}:${id}`
  
  // Check cache first
  const cachedBuffer = audioBufferCache.get(cacheKey)
  if (cachedBuffer) {
    return cachedBuffer
  }

  // Check if request is already pending
  const pendingRequest = audioBufferCache.getPending(cacheKey)
  if (pendingRequest) {
    return pendingRequest
  }

  // Create new fetch promise
  const fetchPromise = (async () => {
    const url = getMediaUrl(id, slug)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch audio buffer: ${response.statusText}`)
    }

    const buffer = await response.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(buffer)
    
    // Cache the decoded audio buffer
    audioBufferCache.set(cacheKey, audioBuffer)
    
    return audioBuffer
  })()

  // Track the pending request
  audioBufferCache.setPending(cacheKey, fetchPromise)
  
  return fetchPromise
}

/**
 * Preload audio buffers for better performance
 */
export const preloadAudioBuffers = async (
  presetIds: string[],
  slug: string,
  audioContext: AudioContext,
) => {
  const promises = presetIds.map(id => 
    fetchAudioBuffer(id, slug, audioContext).catch(error => {
      console.warn(`Failed to preload audio buffer ${id}:`, error)
      return null
    })
  )
  
  return Promise.allSettled(promises)
}

/**
 * Clear audio buffer cache (useful for memory management)
 */
export const clearAudioBufferCache = () => {
  audioBufferCache.clear()
}

export const addSweepValue = (
  id: string,
  target?: string,
  sweepSetting?: Record<string, number>,
  initialValue?: number,
  isSweep?: boolean,
) => {
  if (!isSweep) return id

  const level = sweepSetting?.[target!] ?? initialValue

  return `${id}_${level}`
}

export const getPresetIdChain = (
  preset: Preset,
  pedalsOn: string[],
  sweepSetting: Record<string, number>,
  secondaryCircuitsOn: string[],
  activePedals: string[],
) => {
  // if there are no active pedals turned on and no secondary circuits are active, return clean tone
  if (
    !activePedals.some(activePedal => pedalsOn.includes(activePedal)) &&
    secondaryCircuitsOn?.length === 0
  ) {
    return CLEAN_TONE
  }

  let presetId = preset.id

  // if the preset has a chain of multiple pedals, we need to check each pedal for sweeps
  // and secondary circuits and concatenate all active pedals that are turned on
  presetId += `_chain_${preset.chain
    ?.filter(
      pedal =>
        pedalsOn.includes(pedal.pedalSlug) ||
        secondaryCircuitsOn.includes(pedal.secondaryCircuitId ?? ""),
    )
    .map(pedal => {
      let pedalId = pedal.id
      if (pedalsOn.includes(pedal.pedalSlug)) {
        // if there is a secondary circuit that is engaged, replace id with secondary circuit slug
        if (
          pedal.secondaryCircuitId &&
          secondaryCircuitsOn.includes(pedal.secondaryCircuitId)
        ) {
          pedalId = pedal.secondaryCircuitSlug ?? ""
        }
      } else {
        // if it's turned off, it has a secondary circuit (we checked in the filter)
        pedalId = pedal.secondaryCircuitOnlySlug ?? ""
      }

      // if there is a sweep, concatenate the sweep value
      pedalId = addSweepValue(
        pedalId,
        pedal.target,
        sweepSetting,
        pedal.initialValue,
        pedal.isSweep,
      )

      return pedalId
    })
    .join("_")}`

  return presetId
}

export const getAudioPresetId = (
  sweepSetting: Record<string, number>,
  activePedals: string[],
  pedalsOn: string[],
  secondaryCircuitsOn: string[],
  activePreset?: Preset,
): string => {
  if (!activePreset) return CLEAN_TONE

  const allPedalsOff =
    !activePedals.some(pedal => pedalsOn.includes(pedal)) &&
    secondaryCircuitsOn.length === 0
  const isSweepButNoSetting =
    activePreset.isSweep &&
    !Object.keys(sweepSetting).includes(activePreset.target)

  if (allPedalsOff || isSweepButNoSetting) return CLEAN_TONE

  if (activePreset.comparison)
    return (
      activePreset.comparison.find(compPreset =>
        activePedals.includes(compPreset.pedalSlug),
      )?.id || CLEAN_TONE
    )

  if (activePreset.chain)
    return getPresetIdChain(
      activePreset,
      pedalsOn,
      sweepSetting,
      secondaryCircuitsOn,
      activePedals,
    )

  let presetId = activePreset.id

  if (activePreset.secondaryCircuitId) {
    const secondaryCircuitIsOn = secondaryCircuitsOn.includes(
      activePreset.secondaryCircuitId,
    )

    const mainCircuitIsOn = activePedals.some(pedal => pedalsOn.includes(pedal))

    presetId = mainCircuitIsOn
      ? secondaryCircuitIsOn
        ? activePreset.secondaryCircuitSlug!
        : activePreset.id
      : secondaryCircuitIsOn
        ? activePreset.secondaryCircuitOnlySlug!
        : CLEAN_TONE
  }

  return activePreset.isSweep
    ? `${presetId}_${sweepSetting[activePreset.target]}`
    : presetId
}
