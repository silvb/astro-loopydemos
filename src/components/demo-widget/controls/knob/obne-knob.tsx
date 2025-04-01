import type { Knob } from "@types"
import { type Component, mergeProps } from "solid-js"

type ObneKnobProps = Pick<Knob, "colors" | "size">

export const ObneKnob: Component<ObneKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        primary: "#eeeae6",
        secondary: "#565958",
        tick: "#1F1B1C",
        edge: "#111",
      },
    },
    props,
  )

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={mergedProps.size}
      height={mergedProps.size}
      viewBox="0 0 256 256"
    >
      <title>Knob</title>
      <g fill="none">
        <circle cx="128" cy="128" r="120" fill={mergedProps.colors.primary} />
        <circle
          cx="128"
          cy="128"
          r="118"
          stroke={mergedProps.colors.edge}
          stroke-width="20"
        />
        <circle
          cx="128"
          cy="128"
          r="116"
          stroke={mergedProps.colors.secondary}
          stroke-dasharray="36 36"
          stroke-linecap="square"
          stroke-width="8"
          transform="rotate(15 128 128)"
        />
        <circle
          cx="128"
          cy="128"
          r="107"
          stroke={mergedProps.colors.secondary}
          stroke-width="12"
        />
        <rect
          width="20"
          height="64"
          x="118"
          y="26"
          fill={mergedProps.colors.tick}
          rx="4"
        />
      </g>
    </svg>
  )
}
