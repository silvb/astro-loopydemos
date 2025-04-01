import type { Knob } from "@types"
import type { Component } from "solid-js"

type SimpleKnobProps = Pick<Knob, "size">

export const MuffKnob: Component<SimpleKnobProps> = props => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 272 272"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Knob</title>
    <g>
      <circle
        cx="136"
        cy="135.75"
        r="129.5"
        fill="#1A1A1A"
        stroke="#6d6d6d"
        stroke-width="5"
      />
      <circle
        cx="136.386"
        cy="135.435"
        r="84.5"
        fill="black"
        stroke="#6d6d6d"
      />
      <path
        d="M205.886 135.435C205.886 173.819 174.769 204.935 136.386 204.935C98.0018 204.935 66.8856 173.819 66.8856 135.435C66.8856 97.051 98.0018 65.9348 136.386 65.9348C174.769 65.9348 205.886 97.051 205.886 135.435Z"
        fill="#1A1A1A"
        stroke="#6d6d6d"
      />
      <rect
        x="263.815"
        y="178.368"
        width="53.9997"
        height="16"
        transform="rotate(120 263.815 178.368)"
        fill="black"
      />
      <rect
        x="265.547"
        y="179.368"
        width="9.81812"
        height="16"
        transform="rotate(120 265.547 179.368)"
        fill="#6d6d6d"
      />
      <rect
        x="259.05"
        y="192.622"
        width="9.81812"
        height="16"
        transform="rotate(120 259.05 192.622)"
        fill="#6d6d6d"
      />
      <rect
        x="243.456"
        y="217.63"
        width="9.81812"
        height="16"
        transform="rotate(120 243.456 217.63)"
        fill="#6d6d6d"
      />
      <rect
        x="251.686"
        y="205.375"
        width="9.81812"
        height="16"
        transform="rotate(120 251.686 205.375)"
        fill="#6d6d6d"
      />
      <rect
        x="34.6852"
        y="225.768"
        width="54"
        height="16"
        transform="rotate(-120 34.6852 225.768)"
        fill="black"
      />
      <rect
        x="32.9531"
        y="226.768"
        width="9.81818"
        height="16"
        transform="rotate(-120 32.9531 226.768)"
        fill="#6d6d6d"
      />
      <rect
        x="24.724"
        y="214.514"
        width="9.81818"
        height="16"
        transform="rotate(-120 24.724 214.514)"
        fill="#6d6d6d"
      />
      <rect
        x="10.8625"
        y="188.505"
        width="9.81818"
        height="16"
        transform="rotate(-120 10.8625 188.505)"
        fill="#6d6d6d"
      />
      <rect
        x="17.3596"
        y="201.759"
        width="9.81818"
        height="16"
        transform="rotate(-120 17.3596 201.759)"
        fill="#6d6d6d"
      />
      <rect x="108.3" y="3" width="54" height="16" fill="black" />
      <rect x="108.3" y="1" width="9.81818" height="16" fill="#6d6d6d" />
      <rect x="123.027" width="9.81818" height="16" fill="#6d6d6d" />
      <rect x="152.482" y="1" width="9.81818" height="16" fill="#6d6d6d" />
      <rect x="137.755" width="9.81818" height="16" fill="#6d6d6d" />
      <circle
        cx="135.273"
        cy="27.273"
        r="18"
        transform="rotate(120 135.273 27.273)"
        fill="#FFFCEA"
      />
    </g>
  </svg>
)
