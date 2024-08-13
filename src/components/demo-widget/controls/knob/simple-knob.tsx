import type { Knob } from "@types"
import { mergeProps, type Component } from "solid-js"

type SimpleKnobProps = Pick<Knob, "colors" | "size">

export const SimpleKnob: Component<SimpleKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        primary: "#1F1B1C",
        tick: "#FFFDFE",
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
          fill={mergedProps.colors.primary}
          stroke-width="4"
        ></circle>
        <rect
          width="8"
          height="40"
          x="56"
          y="0"
          fill={mergedProps.colors.tick}
          rx="4"
          ry="4"
        ></rect>
      </g>
    </svg>
  )
}
