import { Show, type Component } from "solid-js"
import { getDisplayText } from "./get-display-text"
import { useDemoState } from "../demo-state-store"
import { AudioPlayerVisualizer } from "./audio-player-visualizer"

export const AudioPlayerDisplay: Component = () => {
  const { isPlaying, pedalsOn, activePedals, isLoading, hasErrors } =
    useDemoState()

  const isAnyPedalOn = () =>
    activePedals().some(pedal => pedalsOn().includes(pedal))

  const showVisualizer = () =>
    isAnyPedalOn() && isPlaying() && !isLoading() && !hasErrors()

  return (
    <div class="flex h-full w-full items-center justify-center">
      <Show
        when={showVisualizer()}
        fallback={
          <span
            class="px-2 text-center font-pixel text-xs text-loopydemos-highlight-primary-themed [word-spacing:-0.1em] sm:text-xs md:text-sm"
            classList={{
              "text-loopydemos-red": hasErrors(),
            }}
          >
            {getDisplayText(
              isPlaying(),
              false,
              isLoading(),
              isAnyPedalOn(),
              hasErrors()
            )}
          </span>
        }
      >
        <AudioPlayerVisualizer />
      </Show>
    </div>
  )
}
