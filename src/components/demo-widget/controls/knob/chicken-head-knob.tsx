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
          r="36"
          fill={mergedProps.colors.primary}
          stroke-width="1"
          stroke={mergedProps.colors.edge}
        />
        <circle
          cx="60"
          cy="60"
          r="18"
          fill={mergedProps.colors.primary}
          stroke-width="1"
          stroke={mergedProps.colors.edge}
        />
        <polygon
          points="60,5 39,110 81,110"
          fill={mergedProps.colors.primary}
          stroke-width="1"
          stroke-linejoin="round"
          stroke={mergedProps.colors.edge}
        />
        <polygon
          points="63,5 57,5 43,115 77,115"
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
