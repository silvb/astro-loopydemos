import type { Knob } from "@types"
import { type Component, mergeProps } from "solid-js"

type FairfieldKnobProps = Pick<Knob, "colors" | "size">

export const FairfieldKnob: Component<FairfieldKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        primary: "#1F1B1C",
        secondary: "#A6A6A6",
        tick: "#1F1B1C",
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
        <circle cx="60" cy="60" r="60" fill={mergedProps.colors.secondary} />
        <circle cx="60" cy="60" r="42" fill={mergedProps.colors.primary} />
        <polygon points="40,24 60,6 80,24" fill={mergedProps.colors.primary} />
        <polygon points="48,20 60,1 72,20" fill={mergedProps.colors.primary} />
        <rect
          width="4"
          height="30"
          x="58"
          y="4"
          fill={mergedProps.colors.tick}
          rx="4"
          ry="4"
        />
      </g>
    </svg>
  )
}
