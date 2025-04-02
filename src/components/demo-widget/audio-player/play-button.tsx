import { PhPauseIcon } from "@components/icons/ph-pause-icon"
import { PhPlayIcon } from "@components/icons/ph-play-icon"
import { PhSpinnerIcon } from "@components/icons/ph-spinner-icon"
import { type Component, Show, onCleanup, onMount } from "solid-js"
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

  const handleShortcut = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault()
      setIsPlaying(!isPlaying())
    }

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
  })

  onCleanup(() => {
    document.removeEventListener("keydown", handleShortcut)
  })

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying())}
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
