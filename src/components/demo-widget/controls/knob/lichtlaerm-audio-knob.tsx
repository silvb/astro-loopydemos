import type { Knob } from "@types"
import { type Component, mergeProps } from "solid-js"
import styles from "./gradients.module.css"

type LichtlaermAudioKnobProps = Pick<Knob, "size" | "colors">

export const LichtlaermAudioKnob: Component<
  LichtlaermAudioKnobProps
> = props => {
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
      class={styles["lichtlaerm-knob"]}
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
          <path
            d="M32.4642 3.50689L37.8637 17.0056C38.0624 17.5022 37.4477 17.9218 37.0575 17.5561L33.0259 13.7764C32.4489 13.2355 31.5511 13.2355 30.9741 13.7764L26.9425 17.556C26.5523 17.9218 25.9377 17.5022 26.1363 17.0056L31.5358 3.50689L31.0715 3.32119L31.5358 3.50689C31.7034 3.08782 32.2966 3.08781 32.4642 3.50689Z"
            fill="#D9D9D9"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </div>
  )
}
