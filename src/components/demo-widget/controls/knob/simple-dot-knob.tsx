import type { Knob } from "@types"
import { type Component, mergeProps } from "solid-js"

type SimpleDotKnobProps = Pick<Knob, "colors" | "size">

export const SimpleDotKnob: Component<SimpleDotKnobProps> = props => {
  const mergedProps = mergeProps(
    { colors: { primary: "#1F1B1C", tick: "#FFFDFE" } },
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
          fill={mergedProps.colors.primary}
          stroke-width="4"
        />
        <circle cx="60" cy="16" r="8" fill={mergedProps.colors.tick} />
      </g>
    </svg>
  )
}
