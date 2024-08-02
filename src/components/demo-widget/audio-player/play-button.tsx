import type { JSX } from "astro/jsx-runtime"
import { createSignal, Show, type Component } from "solid-js"
import { demoState } from "../demo-state-store"

interface PlayButtonProps {
  "play-icon"?: JSX.Element
  "pause-icon"?: JSX.Element
  "loading-icon"?: JSX.Element
}

export const PlayButton: Component<PlayButtonProps> = (props) => {
  const { isPlaying, setIsPlaying } = demoState
  const [isLoading, setIsLoading] = createSignal(false)

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying())}
      class="text-loopydemos-highlight-tertiary-themed h-full basis-12 text-[3rem]"
    >
      <Show when={!isLoading()} fallback={props["loading-icon"]}>
        <Show when={isPlaying()} fallback={props["play-icon"]}>
          {props["pause-icon"]}
        </Show>
      </Show>
    </button>
  )
}
