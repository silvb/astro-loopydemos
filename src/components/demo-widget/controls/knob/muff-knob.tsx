import type { Knob } from "@types"
import { type Component } from "solid-js"

type SimpleKnobProps = Pick<Knob, "size">

export const MuffKnob: Component<SimpleKnobProps> = props => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 496 496"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="247.614"
      cy="249.315"
      r="129.5"
      fill="#1A1A1A"
      stroke="#434343"
      stroke-width="5"
    />
    <circle cx="248" cy="249" r="84.5" fill="black" stroke="#434343" />
    <path
      d="M317.5 249C317.5 287.384 286.384 318.5 248 318.5C209.616 318.5 178.5 287.384 178.5 249C178.5 210.616 209.616 179.5 248 179.5C286.384 179.5 317.5 210.616 317.5 249Z"
      fill="#1A1A1A"
      stroke="#434343"
    />
    <rect x="220.614" y="117.315" width="53.9997" height="16" fill="black" />
    <rect x="220.614" y="115.315" width="9.81812" height="16" fill="#434343" />
    <rect x="235.341" y="114.315" width="9.81812" height="16" fill="#434343" />
    <rect x="264.797" y="115.315" width="9.81812" height="16" fill="#434343" />
    <rect x="250.068" y="114.315" width="9.81812" height="16" fill="#434343" />
    <circle cx="248" cy="143" r="18" fill="#FFFCEA" />
    <rect
      x="376.229"
      y="292.048"
      width="54"
      height="16"
      transform="rotate(120 376.229 292.048)"
      fill="black"
    />
    <rect
      x="377.961"
      y="293.048"
      width="9.81818"
      height="16"
      transform="rotate(120 377.961 293.048)"
      fill="#434343"
    />
    <rect
      x="371.464"
      y="306.301"
      width="9.81818"
      height="16"
      transform="rotate(120 371.464 306.301)"
      fill="#434343"
    />
    <rect
      x="355.871"
      y="331.31"
      width="9.81818"
      height="16"
      transform="rotate(120 355.871 331.31)"
      fill="#434343"
    />
    <rect
      x="364.1"
      y="319.056"
      width="9.81818"
      height="16"
      transform="rotate(120 364.1 319.056)"
      fill="#434343"
    />
    <rect
      x="146.499"
      y="339.68"
      width="54"
      height="16"
      transform="rotate(-120 146.499 339.68)"
      fill="black"
    />
    <rect
      x="144.767"
      y="340.68"
      width="9.81818"
      height="16"
      transform="rotate(-120 144.767 340.68)"
      fill="#434343"
    />
    <rect
      x="136.538"
      y="328.425"
      width="9.81818"
      height="16"
      transform="rotate(-120 136.538 328.425)"
      fill="#434343"
    />
    <rect
      x="122.676"
      y="302.417"
      width="9.81818"
      height="16"
      transform="rotate(-120 122.676 302.417)"
      fill="#434343"
    />
    <rect
      x="129.174"
      y="315.671"
      width="9.81818"
      height="16"
      transform="rotate(-120 129.174 315.671)"
      fill="#434343"
    />
  </svg>
)
