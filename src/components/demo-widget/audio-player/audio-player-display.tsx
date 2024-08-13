import { Show, type Component } from "solid-js"
import { getDisplayText } from "./get-display-text"
import { useDemoState } from "../demo-state-store"
import type { JSX } from "astro/jsx-runtime"
import { AudioPlayerVisualizer } from "./audio-player-visualizer"

interface AudioPlayerDisplayProps {
  "audio-visualizer"?: JSX.Element
}

export const AudioPlayerDisplay: Component<AudioPlayerDisplayProps> = props => {
  const { isPlaying, pedalsOn, activePedals, isLoading } = useDemoState()

  const isAnyPedalOn = () =>
    activePedals().some(pedal => pedalsOn().includes(pedal))

  const showVisualizer = () => isAnyPedalOn() && isPlaying() && !isLoading()

  return (
    <div class="flex h-full w-full items-center justify-center">
      <Show
        when={showVisualizer()}
        fallback={
          <span class="px-2 text-center font-mono text-base text-loopydemos-highlight-primary-themed [word-spacing:-0.1em] sm:text-lg md:text-xl">
            {getDisplayText(
              isPlaying(),
              false,
              isLoading(),
              isAnyPedalOn(),
              false
            )}
          </span>
        }
      >
        <AudioPlayerVisualizer />
      </Show>
    </div>
  )
}
