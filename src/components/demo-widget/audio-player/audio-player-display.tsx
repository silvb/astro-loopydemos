import { type Component, Show } from "solid-js"
import { useDemoState } from "../demo-state-store"
import { AudioPlayerVisualizer } from "./audio-player-visualizer"
import { getDisplayText } from "./get-display-text"

export const AudioPlayerDisplay: Component = () => {
  const {
    isPlaying,
    pedalsOn,
    activePedals,
    isLoading,
    hasErrors,
    secondaryCircuitsOn,
  } = useDemoState()

  const isAnyPedalOn = () =>
    activePedals().some(pedal => pedalsOn().includes(pedal)) ||
    secondaryCircuitsOn().length > 0

  const showVisualizer = () => isAnyPedalOn() && isPlaying() && !hasErrors()

  return (
    <div class="flex h-full w-full items-center justify-center">
      <Show
        when={showVisualizer()}
        fallback={
          <span
            class="px-2 text-center font-pixel text-loopydemos-highlight-primary-themed text-xs [word-spacing:-0.1em] sm:text-xs md:text-sm"
            classList={{
              "text-loopydemos-red": hasErrors(),
            }}
          >
            {getDisplayText(
              isPlaying(),
              false,
              isLoading(),
              isAnyPedalOn(),
              hasErrors(),
            )}
          </span>
        }
      >
        <AudioPlayerVisualizer subdued={isLoading()} />
      </Show>
    </div>
  )
}
