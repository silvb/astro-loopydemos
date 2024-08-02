import { createEffect, type Component } from "solid-js"
import { demoState } from "../demo-state-store"
import { getMediaUrl } from "./audio-player-controller-helpers"

interface AudioPlayerControllerProps {
  slug: string
  hasBackingTrack?: boolean
  volume?: number
}

export const AudioPlayerController: Component<AudioPlayerControllerProps> = (
  props
) => {
  const { isPlaying, activePreset, sweepSetting } = demoState
  let audioContext: AudioContext | null = null
  let currentPlayingAudioSource: AudioBufferSourceNode | null = null
  let backingTrackAudioSource: AudioBufferSourceNode | null = null
  let currentTime = 0
  let trackLength = 0

  createEffect(async () => {
    const preset = activePreset()
    if (isPlaying() && preset) {
      if (!audioContext) {
        audioContext = new AudioContext()
      }

      if (
        preset.isSweep &&
        !Object.keys(sweepSetting()).includes(preset.target)
      )
        return

      const presetId = preset.isSweep
        ? preset.id + "_" + sweepSetting()[preset.target]
        : preset.id

      const url = getMediaUrl(presetId, props.slug)
      const response = await fetch(url)
      const buffer = await response.arrayBuffer()

      const decodedAudioBuffer = await audioContext.decodeAudioData(buffer)

      if (trackLength === 0) {
        trackLength = decodedAudioBuffer.length / decodedAudioBuffer.sampleRate
      }

      currentPlayingAudioSource?.stop()
      currentPlayingAudioSource?.disconnect()
      currentTime = audioContext.currentTime % trackLength
      currentPlayingAudioSource = audioContext.createBufferSource()
      currentPlayingAudioSource.buffer = decodedAudioBuffer
      currentPlayingAudioSource.loop = true
      const gainNode = audioContext.createGain()
      gainNode.gain.value = 1

      currentPlayingAudioSource.connect(gainNode)

      gainNode.connect(audioContext.destination)

      currentPlayingAudioSource.start(0, currentTime)
    } else {
      if (currentPlayingAudioSource) {
        currentPlayingAudioSource.stop()
      }
    }
  })

  createEffect(() => {})

  return null
}
