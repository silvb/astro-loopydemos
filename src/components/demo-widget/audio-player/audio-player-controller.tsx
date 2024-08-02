import { createEffect, type Component } from "solid-js"
import { demoState } from "../demo-state-store"
import { fetchAudioBuffer } from "./audio-player-controller-helpers"
import { BACKING_TRACK, CLEAN_TONE } from "./constants"

interface AudioPlayerControllerProps {
  slug: string
  hasBackingTrack?: boolean
  volume?: number
}

type CurrentBuffer = {
  buffer: AudioBuffer | null
  id: string | null
}

export const AudioPlayerController: Component<AudioPlayerControllerProps> = (
  props
) => {
  const {
    isPlaying,
    activePreset,
    sweepSetting,
    isBackingTrackMuted,
    setIsLoading,
    pedalsOn,
    activePedals,
  } = demoState
  let audioContext: AudioContext | null = null
  let currentPlayingAudioSource: AudioBufferSourceNode | null = null
  const currentBuffer: CurrentBuffer = {
    id: null,
    buffer: null,
  }
  let backingTrackAudioSource: AudioBufferSourceNode | null = null
  let backingTackBuffer: AudioBuffer | null = null
  let trackLength = 0

  createEffect(async () => {
    const preset = activePreset()
    const muteBackingTrack = isBackingTrackMuted()
    if (isPlaying() && preset) {
      if (!audioContext) {
        audioContext = new AudioContext()
      }

      if (audioContext.state === "suspended") {
        await audioContext.resume()
      }

      let presetId = CLEAN_TONE
      if (activePedals().some((pedal) => pedalsOn().includes(pedal))) {
        if (
          preset.isSweep &&
          !Object.keys(sweepSetting()).includes(preset.target)
        )
          return

        presetId = preset.isSweep
          ? preset.id + "_" + sweepSetting()[preset.target]
          : preset.id
      }

      if (currentBuffer.id !== presetId) {
        currentBuffer.id = presetId
        setIsLoading(true)
        currentBuffer.buffer = await fetchAudioBuffer(
          presetId,
          props.slug,
          audioContext
        )
        setIsLoading(false)
      }

      if (trackLength === 0 && currentBuffer.buffer) {
        trackLength =
          currentBuffer.buffer.length / currentBuffer.buffer.sampleRate
      }

      currentPlayingAudioSource?.stop()
      currentPlayingAudioSource = audioContext.createBufferSource()
      currentPlayingAudioSource.buffer = currentBuffer.buffer
      currentPlayingAudioSource.loop = true

      const gainNode = audioContext.createGain()
      gainNode.gain.value = props.volume ?? 1
      currentPlayingAudioSource.connect(gainNode)
      gainNode.connect(audioContext.destination)

      currentPlayingAudioSource.start(0, audioContext.currentTime % trackLength)

      if (props.hasBackingTrack) {
        if (!backingTackBuffer) {
          setIsLoading(true)
          backingTackBuffer = await fetchAudioBuffer(
            BACKING_TRACK,
            props.slug,
            audioContext
          )
          setIsLoading(false)
        }

        backingTrackAudioSource?.stop()

        if (!muteBackingTrack) {
          backingTrackAudioSource = audioContext.createBufferSource()
          backingTrackAudioSource.buffer = backingTackBuffer
          backingTrackAudioSource.loop = true

          backingTrackAudioSource.connect(audioContext.destination)
          backingTrackAudioSource.start(
            0,
            audioContext.currentTime % trackLength
          )
        }
      }
    } else {
      audioContext?.suspend()
    }
  })

  return null
}
