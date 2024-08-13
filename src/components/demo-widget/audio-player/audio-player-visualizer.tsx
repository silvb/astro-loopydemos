import type { Component } from "solid-js"
import styles from "./audio-player-visualizer.module.css"

export const AudioPlayerVisualizer: Component = () => (
  <div class="flex h-full w-full gap-px px-2 py-3">
    {Array.from({ length: 200 }, (_, i) => (
      <div
        class={`${styles["animate-warp"]} h-full grow rounded-lg bg-loopydemos-highlight-secondary-themed`}
        classList={{ "hidden xs:block": i > 100 }}
        style={{
          "--delay": `calc(${Math.random()} * 0.2s)`,
          "--duration": `calc(${Math.random() + 0.7} * 0.5s)`,
        }}
      />
    ))}
  </div>
)
