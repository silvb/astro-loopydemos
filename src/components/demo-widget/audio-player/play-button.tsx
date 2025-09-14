import { PhPauseIcon } from "@components/icons/ph-pause-icon"
import { PhPlayIcon } from "@components/icons/ph-play-icon"
import { PhSpinnerIcon } from "@components/icons/ph-spinner-icon"
import {
  type Component,
  createSignal,
  onCleanup,
  onMount,
  Show,
} from "solid-js"
import { isIOSDevice, unmuteIOSAudio } from "../../../utils/ios-audio-unmute"
import { useDemoState } from "../demo-state-store"

export const PlayButton: Component = () => {
  const {
    isPlaying,
    setIsPlaying,
    isLoading,
    selectPreviousPreset,
    selectNextPreset,
    isBackingTrackMuted,
    setIsBackingTrackMuted,
  } = useDemoState()

  const [isInViewport, setIsInViewport] = createSignal(false)
  let buttonRef: HTMLButtonElement | undefined

  const handleShortcut = async (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault()
      if (!isInViewport() && isPlaying()) {
        setIsPlaying(false)
        return
      }
      if (isInViewport()) {
        // On iOS devices, unmute audio before starting playback via keyboard
        if (isIOSDevice() && !isPlaying()) {
          try {
            await unmuteIOSAudio()
          } catch (error) {
            console.warn("Failed to unmute iOS audio:", error)
          }
        }
        setIsPlaying(!isPlaying())
      }
      return
    }

    if (!isInViewport()) return

    if (e.code === "KeyK") {
      e.preventDefault()
      selectPreviousPreset()
    }

    if (e.code === "KeyL") {
      e.preventDefault()
      selectNextPreset()
    }

    if (e.code === "KeyM") {
      e.preventDefault()
      setIsBackingTrackMuted(!isBackingTrackMuted())
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleShortcut)

    if (buttonRef) {
      const observer = new IntersectionObserver(
        entries => {
          setIsInViewport(entries[0].isIntersecting)
        },
        { threshold: 0.1 },
      )
      observer.observe(buttonRef)

      onCleanup(() => {
        observer.disconnect()
      })
    }
  })

  onCleanup(() => {
    document.removeEventListener("keydown", handleShortcut)
  })

  const handlePlayButtonClick = async () => {
    // On iOS devices, unmute audio before starting playback
    if (isIOSDevice() && !isPlaying()) {
      try {
        await unmuteIOSAudio()
      } catch (error) {
        console.warn("Failed to unmute iOS audio:", error)
      }
    }

    setIsPlaying(!isPlaying())
  }

  return (
    <button
      ref={buttonRef}
      onClick={handlePlayButtonClick}
      class="h-full basis-12 text-[3rem] text-loopydemos-highlight-tertiary-themed"
      type="button"
    >
      <span class="sr-only">Start to play audio of demo track</span>
      <Show when={!isLoading()} fallback={<PhSpinnerIcon />}>
        <Show when={isPlaying()} fallback={<PhPlayIcon />}>
          <PhPauseIcon />
        </Show>
      </Show>
    </button>
  )
}
