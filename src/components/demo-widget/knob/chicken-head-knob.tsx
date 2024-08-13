import type { Knob } from "@types"
import { mergeProps, type Component } from "solid-js"

type ChickenHeadKnobProps = Pick<Knob, "colors" | "size">

export const ChickenHeadKnob: Component<ChickenHeadKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        tick: "#1F1B1C",
        primary: "#FFFDFE",
        secondary: "black",
      },
    },
    props
  )

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={mergedProps.size}
      height={mergedProps.size}
      viewBox="0 0 120 120"
    >
      <g fill="none">
        <circle
          cx="60"
          cy="60"
          r="60"
          fill={mergedProps.colors.secondary}
          stroke-width="4"
        ></circle>
        <circle
          cx="60"
          cy="60"
          r="36"
          fill={mergedProps.colors.primary}
          stroke-width="4"
        ></circle>
        <polygon
          points="60,5 35,105 85,105"
          fill={mergedProps.colors.primary}
          stroke-width="4"
          stroke-linejoin="round"
          stroke={mergedProps.colors.primary}
        ></polygon>
        <rect
          width="4"
          height="48"
          x="58"
          y="2"
          fill={mergedProps.colors.tick}
          rx="2"
          ry="2"
        ></rect>
      </g>
    </svg>
  )
}
