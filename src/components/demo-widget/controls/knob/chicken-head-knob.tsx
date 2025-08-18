import type { Knob } from "@types"
import { type Component, mergeProps } from "solid-js"

type ChickenHeadKnobProps = Pick<Knob, "colors" | "size">

export const ChickenHeadKnob: Component<ChickenHeadKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        tick: "#1F1B1C",
        primary: "#FFFDFE",
        secondary: "black",
        edge: "#1F1B1C",
      },
    },
    props,
  )

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={mergedProps.size}
      height={mergedProps.size}
      viewBox="0 0 120 120"
    >
      <title>Knob</title>
      <g fill="none">
        <circle
          cx="60"
          cy="60"
          r="60"
          fill={mergedProps.colors.secondary}
          stroke-width="4"
        />
        <circle
          cx="60"
          cy="60"
          r="32"
          fill={mergedProps.colors.primary}
          stroke-width="1"
          stroke={mergedProps.colors.edge}
        />
        <circle
          cx="60"
          cy="60"
          r="16"
          fill={mergedProps.colors.primary}
          stroke-width="1"
          stroke={mergedProps.colors.edge}
        />
        <polygon
          points="61,5 59,5 39,100 81,100"
          fill={mergedProps.colors.primary}
          stroke-width="1"
          stroke-linejoin="round"
          stroke={mergedProps.colors.edge}
        />
        <polygon
          points="62,5 58,5 42,105 78,105"
          fill={mergedProps.colors.primary}
          stroke-width="1"
          stroke-linejoin="round"
          stroke={mergedProps.colors.edge}
        />
        <rect
          width="2"
          height="24"
          x="59"
          y="5"
          fill={mergedProps.colors.tick}
          rx="2"
          ry="2"
        />
      </g>
    </svg>
  )
}
