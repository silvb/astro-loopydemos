import type { Knob } from "@types"
import { type Component, mergeProps } from "solid-js"

type JhsKnobProps = Pick<Knob, "colors" | "size">

export const JhsKnob: Component<JhsKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        primary: "#1F1B1C",
        secondary: "lightslategrey",
        tick: "#FFFDFE",
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
          r="56"
          fill={mergedProps.colors.primary}
          stroke-width="3"
          stroke={mergedProps.colors.secondary}
        />
        <path
          fill={mergedProps.colors.primary}
          stroke={mergedProps.colors.secondary}
          stroke-width="3"
          d="M104.37701,29.5816271 L115.312765,54.8801148 L131.754021,77 L115.312765,99.1198852 L104.37701,124.418373 L77,121.23977 L49.6229896,124.418373 L38.687235,99.1198852 L22.2459793,77 L38.687235,54.8801148 L49.6229896,29.5816271 L77,32.7602296 L104.37701,29.5816271 Z"
          transform="rotate(30 60 60) translate(-17 -16.073)"
        />
        <rect
          width="8"
          height="40"
          x="56"
          y="16"
          fill={mergedProps.colors.tick}
          rx="4"
          ry="4"
        />
      </g>
    </svg>
  )
}
