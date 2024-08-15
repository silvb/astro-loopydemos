import { createEffect, createMemo, type Component } from "solid-js"
import { useDemoState } from "../demo-state-store"
import {
  fetchAudioBuffer,
  getAudioPresetId,
} from "./audio-player-controller-helpers"
import { BACKING_TRACK } from "./constants"

interface AudioPlayerControllerProps {
  slug: string
  hasBackingTrack?: boolean
  volume?: number
}

type CurrentBuffer = {
  buffer: AudioBuffer | null
  id: string | null
}

export const AudioPlayerController: Component<
  AudioPlayerControllerProps
> = props => {
  const {
    isPlaying,
    activePreset,
    sweepSetting,
    isBackingTrackMuted,
    setIsLoading,
    setHasErrors,
    pedalsOn,
    activePedals,
    secondaryCircuitsOn,
  } = useDemoState()
  let audioContext: AudioContext | null = null
  let currentPlayingAudioSource: AudioBufferSourceNode | null = null
  const currentBuffer: CurrentBuffer = {
    id: null,
    buffer: null,
  }
  let backingTrackAudioSource: AudioBufferSourceNode | null = null
  let backingTackBuffer: AudioBuffer | null = null
  let trackLength = 0

  const errorHandler = (error: unknown, slug: string, id: string) => {
    console.error("Error fetching audio buffer", {
      error,
      slug,
      id,
    })
    setHasErrors(true)
  }

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

      const presetId = getAudioPresetId(
        preset,
        sweepSetting(),
        activePedals(),
        pedalsOn(),
        secondaryCircuitsOn()
      )

      if (currentBuffer.id !== presetId) {
        currentBuffer.id = presetId ?? null
        setIsLoading(true)

        try {
          currentBuffer.buffer = await fetchAudioBuffer(
            presetId,
            props.slug,
            audioContext
          )
        } catch (error) {
          errorHandler(error, props.slug, presetId)
        } finally {
          setIsLoading(false)
        }
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
          try {
            backingTackBuffer = await fetchAudioBuffer(
              BACKING_TRACK,
              props.slug,
              audioContext
            )
          } catch (error) {
            errorHandler(error, props.slug, BACKING_TRACK)
          } finally {
            setIsLoading(false)
          }
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
