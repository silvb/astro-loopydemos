import { Show, type Component } from "solid-js"
import { getDisplayText } from "./get-display-text"
import { demoState } from "../demo-state-store"
import type { JSX } from "astro/jsx-runtime"

interface AudioPlayerDisplayProps {
  "audio-visualizer"?: JSX.Element
}

export const AudioPlayerDisplay: Component<AudioPlayerDisplayProps> = (
  props
) => {
  const { isPlaying, pedalsOn, activePedals } = demoState

  //check if any of the active pedals are on
  const isAnyPedalOn = () =>
    activePedals().some((pedal) => pedalsOn().includes(pedal))

  const showVisualizer = () => isAnyPedalOn() && isPlaying() //&& !isLoading()

  return (
    <div class="flex h-full w-full items-center justify-center">
      <Show
        when={showVisualizer()}
        fallback={
          <span class="text-center font-mono text-loopydemos-highlight-primary-themed">
            {getDisplayText(isPlaying(), false, false, isAnyPedalOn(), false)}
          </span>
        }
      >
        {props["audio-visualizer"]}
      </Show>
    </div>
  )
}
