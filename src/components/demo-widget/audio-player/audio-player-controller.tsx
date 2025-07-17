import { type Component, createEffect, onCleanup } from "solid-js"
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

  createEffect(() => {
    const muteBackingTrack = isBackingTrackMuted()
    const presetId = getAudioPresetId(
      sweepSetting(),
      activePedals(),
      pedalsOn(),
      secondaryCircuitsOn(),
      activePreset(),
    )

    if (isPlaying()) {
      (async () => {
        try {
          if (!audioContext) {
            audioContext = new AudioContext()
          }

          if (audioContext.state === "suspended") {
            await audioContext.resume()
          }

          if (currentBuffer.id !== presetId) {
            currentBuffer.id = presetId ?? null
            setIsLoading(true)

            try {
              currentBuffer.buffer = await fetchAudioBuffer(
                presetId,
                props.slug,
                audioContext,
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
          currentPlayingAudioSource?.disconnect()
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
                  audioContext,
                )
              } catch (error) {
                errorHandler(error, props.slug, BACKING_TRACK)
              } finally {
                setIsLoading(false)
              }
            }

            backingTrackAudioSource?.stop()
            backingTrackAudioSource?.disconnect()

            if (!muteBackingTrack) {
              backingTrackAudioSource = audioContext.createBufferSource()
              backingTrackAudioSource.buffer = backingTackBuffer
              backingTrackAudioSource.loop = true

              backingTrackAudioSource.connect(audioContext.destination)
              backingTrackAudioSource.start(
                0,
                audioContext.currentTime % trackLength,
              )
            }
          }
        } catch (error) {
          errorHandler(error, props.slug, presetId)
        }
      })()
    } else {
      audioContext?.suspend()
    }
  })

  onCleanup(() => {
    currentPlayingAudioSource?.stop()
    currentPlayingAudioSource?.disconnect()
    backingTrackAudioSource?.stop()
    backingTrackAudioSource?.disconnect()
    audioContext?.close()
  })

  return null
}
