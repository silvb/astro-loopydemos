import type { Preset } from "@types"
import { CLEAN_TONE, MEDIA_ROOT_URL, BACKING_TRACK } from "./constants"

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
  audioContext: AudioContext
) => {
  const url = getMediaUrl(id, slug)
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  return audioContext.decodeAudioData(buffer)
}

export const addSweepValue = (
  id: string,
  target?: string,
  sweepSetting?: Record<string, number>,
  initialValue?: number,
  isSweep?: boolean
) => {
  if (!isSweep) return id

  const level = !sweepSetting?.[target!] ? initialValue : sweepSetting[target!]
  return `${id}_${level}`
}

export const getPresetIdChain = (
  preset: Preset,
  pedalsOn: string[],
  sweepSetting: Record<string, number>,
  secondaryCircuitsOn: string[],
  activePedals: string[]
) => {
  // if there are no active pedals turned on and no secondary circuits are active, return clean tone
  if (
    !activePedals.some((activePedal) => pedalsOn.includes(activePedal)) &&
    secondaryCircuitsOn?.length === 0
  ) {
    return CLEAN_TONE
  }

  let presetId = preset.id

  // if the preset has a chain of multiple pedals, we need to check each pedal for sweeps
  // and secondary circuits and concatenate all active pedals that are turned on
  presetId +=
    "_chain_" +
    preset.chain
      ?.filter(
        (pedal) =>
          pedalsOn.includes(pedal.pedalSlug) ||
          secondaryCircuitsOn.includes(pedal.secondaryCircuitId ?? "")
      )
      .map((pedal) => {
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
          pedal.isSweep
        )

        return pedalId
      })
      .join("_")

  return presetId
}

export const getAudioPresetId = (
  activePreset: Preset,
  sweepSetting: Record<string, number>,
  activePedals: string[],
  pedalsOn: string[],
  secondaryCircuitsOn: string[]
) => {
  const allPedalsOff =
    !activePedals.some((pedal) => pedalsOn.includes(pedal)) &&
    secondaryCircuitsOn.length === 0
  const isSweepButNoSetting =
    activePreset.isSweep &&
    !Object.keys(sweepSetting).includes(activePreset.target)

  if (allPedalsOff || isSweepButNoSetting) return CLEAN_TONE

  if (activePreset.comparison)
    return (
      activePreset.comparison.find((compPreset) =>
        activePedals.includes(compPreset.pedalSlug)
      )?.id || CLEAN_TONE
    )

  if (activePreset.chain)
    return getPresetIdChain(
      activePreset,
      pedalsOn,
      sweepSetting,
      secondaryCircuitsOn,
      activePedals
    )

  if (activePreset.secondaryCircuitId) {
    const secondaryCircuitIsOn = secondaryCircuitsOn.includes(
      activePreset.secondaryCircuitId
    )

    return secondaryCircuitIsOn
      ? activePreset.secondaryCircuitSlug
      : activePreset.id
  }

  return activePreset.isSweep
    ? activePreset.id + "_" + sweepSetting[activePreset.target]
    : activePreset.id
}
