import type { Knob } from "@types"
import { mergeProps, type Component } from "solid-js"
import styles from "./gradients.module.css"

type FlbKnobProps = Pick<Knob, "size" | "colors">

export const FlbKnob: Component<FlbKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        primary: "#000",
        secondary: "#8a8a8a",
      },
    },
    props
  )

  const uniqueKnobId = Math.random().toString(36).substring(7)
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
        <defs>
          <mask id={`${uniqueKnobId}-cut-off-rect`}>
            <rect x={0} y={0} height={24} width={64} fill="#fff"></rect>
          </mask>
        </defs>
        <g fill="none">
          <circle
            cx="32"
            cy="32"
            r="32"
            fill={mergedProps.colors.secondary}
            mask={`url(#${uniqueKnobId}-cut-off-rect)`}
          ></circle>
          <circle
            r="5"
            cx="31"
            cy="12"
            fill={mergedProps.colors.primary}
          ></circle>
        </g>
      </svg>
    </div>
  )
}
