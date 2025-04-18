import type { Knob } from "@types"
import type { Component } from "solid-js"

type OffsetKnobProps = Pick<Knob, "size">

export const OffsetKnob: Component<OffsetKnobProps> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 132 132"
  >
    <title>Offset Knob</title>
    <g fill="none">
      <circle cx="66" cy="66" r="66" fill="#1F1B1C" />
      <path
        fill="#1F1B1C"
        stroke="lightslategrey"
        stroke-width="2"
        d="M104.37701,29.5816271 L115.312765,54.8801148 L131.754021,77 L115.312765,99.1198852 L104.37701,124.418373 L77,121.23977 L49.6229896,124.418373 L38.687235,99.1198852 L22.2459793,77 L38.687235,54.8801148 L49.6229896,29.5816271 L77,32.7602296 L104.37701,29.5816271 Z"
        transform="rotate(30 66 66) translate(-11 -10.073)"
      />
      <rect width="4" height="40" x="64" y="20" fill="#FFFDFE" />
      <circle cx="66" cy="6" r="4" fill="#FFFDFE" />
    </g>
  </svg>
)
