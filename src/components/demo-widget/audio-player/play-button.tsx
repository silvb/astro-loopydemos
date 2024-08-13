import { onCleanup, onMount, Show, type Component } from "solid-js"
import { useDemoState } from "../demo-state-store"
import { PhSpinnerIcon } from "../icons/ph-spinner-icon"
import { PhPlayIcon } from "../icons/ph-play-icon"
import { PhPauseIcon } from "../icons/ph-pause-icon"

export const PlayButton: Component = props => {
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
      tabIndex={1}
      onClick={() => setIsPlaying(!isPlaying())}
      class="h-full basis-12 text-[3rem] text-loopydemos-highlight-tertiary-themed"
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
