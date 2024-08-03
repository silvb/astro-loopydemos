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

  return activePreset.isSweep
    ? activePreset.id + "_" + sweepSetting[activePreset.target]
    : activePreset.id
}
