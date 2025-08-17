import { type Component, createEffect, onCleanup } from "solid-js"
import { useDemoState } from "../demo-state-store"
import {
  fetchAudioBuffer,
  getAudioPresetId,
  preloadAudioBuffers,
} from "./audio-player-controller-helpers"
import { BACKING_TRACK } from "./constants"

interface AudioPlayerControllerProps {
  slug: string
  hasBackingTrack?: boolean
  volume?: number
}

type CurrentBuffer = {
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
  }
  let backingTrackAudioSource: AudioBufferSourceNode | null = null
  let trackLength = 0
  let hasPreloaded = false
  let audioStartTime = 0

  const errorHandler = (error: unknown, slug: string, id: string) => {
    console.error("Error fetching audio buffer", {
      error,
      slug,
      id,
    })
    setHasErrors(true)
  }

  createEffect(async () => {
    const muteBackingTrack = isBackingTrackMuted()
    const presetId = getAudioPresetId(
      sweepSetting(),
      activePedals(),
      pedalsOn(),
      secondaryCircuitsOn(),
      activePreset(),
    )

    if (isPlaying()) {
      try {
        if (!audioContext) {
          audioContext = new AudioContext()
        }

        if (audioContext.state === "suspended") {
          await audioContext.resume()
        }

        // Preload commonly used buffers on first play (but not current preset)
        if (!hasPreloaded && audioContext) {
          hasPreloaded = true
          const commonPresetIds = ["clean"]

          // Only preload backing track if this demo has one
          if (props.hasBackingTrack) {
            commonPresetIds.push("backing_track")
          }

          preloadAudioBuffers(commonPresetIds, props.slug, audioContext).catch(
            error => console.warn("Preloading failed:", error),
          )
        }

        let currentAudioBuffer: AudioBuffer | null = null

        if (currentBuffer.id !== presetId) {
          currentBuffer.id = presetId ?? null
          setIsLoading(true)

          try {
            currentAudioBuffer = await fetchAudioBuffer(
              presetId,
              props.slug,
              audioContext,
            )
          } catch (error) {
            errorHandler(error, props.slug, presetId)
          } finally {
            setIsLoading(false)
          }
        } else {
          // Get from cache since we know it's the same preset
          currentAudioBuffer = await fetchAudioBuffer(
            presetId,
            props.slug,
            audioContext,
          )
        }

        if (trackLength === 0 && currentAudioBuffer) {
          trackLength =
            currentAudioBuffer.length / currentAudioBuffer.sampleRate
        }

        if (currentAudioBuffer) {
          currentPlayingAudioSource?.stop()
          currentPlayingAudioSource?.disconnect()
          currentPlayingAudioSource = audioContext.createBufferSource()
          currentPlayingAudioSource.buffer = currentAudioBuffer
          currentPlayingAudioSource.loop = true

          const gainNode = audioContext.createGain()
          gainNode.gain.value = props.volume ?? 1
          currentPlayingAudioSource.connect(gainNode)
          gainNode.connect(audioContext.destination)

          // Set audio start time when first preset starts playing
          if (audioStartTime === 0) {
            audioStartTime = audioContext.currentTime
          }

          const elapsedTime = audioContext.currentTime - audioStartTime
          currentPlayingAudioSource.start(0, elapsedTime % trackLength)
        }

        if (props.hasBackingTrack) {
          let backingTrackBuffer: AudioBuffer | null = null

          setIsLoading(true)
          try {
            backingTrackBuffer = await fetchAudioBuffer(
              BACKING_TRACK,
              props.slug,
              audioContext,
            )
          } catch (error) {
            errorHandler(error, props.slug, BACKING_TRACK)
          } finally {
            setIsLoading(false)
          }

          backingTrackAudioSource?.stop()
          backingTrackAudioSource?.disconnect()

          if (!muteBackingTrack && backingTrackBuffer) {
            backingTrackAudioSource = audioContext.createBufferSource()
            backingTrackAudioSource.buffer = backingTrackBuffer
            backingTrackAudioSource.loop = true

            backingTrackAudioSource.connect(audioContext.destination)

            const elapsedTime = audioContext.currentTime - audioStartTime
            backingTrackAudioSource.start(0, elapsedTime % trackLength)
          }
        }
      } catch (error) {
        errorHandler(error, props.slug, presetId)
      }
    } else {
      audioContext?.suspend()
      // Reset audio start time when stopping
      audioStartTime = 0
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
