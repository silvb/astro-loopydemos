import type { Knob } from "@types"
import { mergeProps, type Component } from "solid-js"

type CbaKnobProps = Pick<Knob, "colors" | "size">

export const CbaKnob: Component<CbaKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        primary: "#E58075",
      },
    },
    props
  )

  const uniqueKnobId = Math.random().toString(36).substring(7)

  return (
    <svg
      width={mergedProps.size}
      height={mergedProps.size}
      viewBox="0 0 426 425"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none">
        <circle
          cx="213"
          cy="212.361"
          r="150"
          transform="rotate(45 213 212.361)"
          fill={`url(#${uniqueKnobId}-lin-gradient1)`}
        ></circle>
        <circle
          cx="213"
          cy="212.254"
          r="152"
          stroke="#6A6A6A"
          stroke-width="6"
          stroke-dasharray="5 10"
        ></circle>
        <circle
          cx="213"
          cy="212.355"
          r="130"
          transform="rotate(-45 213 212.355)"
          stroke={`url(#${uniqueKnobId}-lin-gradient2)`}
          stroke-width="40"
        ></circle>
        <path fill="#fff" d="M199 82h28v130h-28z"></path>
        <path fill={mergedProps.colors.primary} d="M199 57h28v25h-28z"></path>
        <defs>
          <linearGradient
            id={`${uniqueKnobId}-lin-gradient1`}
            x1="213"
            y1="62.361"
            x2="213"
            y2="362.361"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".49" stop-color="#575757"></stop>
            <stop offset="1" stop-color="#EFEFEF"></stop>
          </linearGradient>
          <linearGradient
            id={`${uniqueKnobId}-lin-gradient2`}
            x1="213"
            y1="62.355"
            x2="213"
            y2="362.355"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#7D7D7D"></stop>
            <stop offset=".516" stop-color="#fff"></stop>
            <stop offset="1" stop-color="#838383"></stop>
          </linearGradient>
        </defs>
      </g>
    </svg>
  )
}
