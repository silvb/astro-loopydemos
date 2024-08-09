import type { JSX } from "astro/jsx-runtime"
import { onCleanup, onMount, Show, type Component } from "solid-js"
import { demoState } from "../demo-state-store"
import { set } from "radash"

interface PlayButtonProps {
  "play-icon"?: JSX.Element
  "pause-icon"?: JSX.Element
  "loading-icon"?: JSX.Element
}

export const PlayButton: Component<PlayButtonProps> = props => {
  const {
    isPlaying,
    setIsPlaying,
    isLoading,
    selectPreviousPreset,
    selectNextPreset,
    isBackingTrackMuted,
    setIsBackingTrackMuted,
  } = demoState

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
      <Show when={!isLoading()} fallback={props["loading-icon"]}>
        <Show when={isPlaying()} fallback={props["play-icon"]}>
          {props["pause-icon"]}
        </Show>
      </Show>
    </button>
  )
}
