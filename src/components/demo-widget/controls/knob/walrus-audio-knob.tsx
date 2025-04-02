import type { Knob } from "@types"
import { type Component, mergeProps } from "solid-js"
import styles from "./gradients.module.css"

type WalrusAudioKnobProps = Pick<Knob, "size" | "colors">

export const WalrusAudioKnob: Component<WalrusAudioKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        primary: "#000",
        secondary: "#8a8a8a",
        edge: "#2c2c2c",
        tick: "#FFF",
      },
    },
    props,
  )
  return (
    <div
      class={styles["walrus-audio-knob"]}
      style={{
        "--size": `${mergedProps.size}px`,
        "--primaryColor": mergedProps.colors.primary,
        "--secondaryColor": mergedProps.colors.secondary,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={mergedProps.size}
        height={mergedProps.size}
        viewBox="0 0 64 64"
      >
        <title>Knob</title>
        <g fill="none">
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke={mergedProps.colors.edge}
            stroke-width="4"
          />
          <rect
            width="3"
            height="28"
            x="31"
            y="4"
            fill={mergedProps.colors.tick}
          />
        </g>
      </svg>
    </div>
  )
}
