import type { Knob } from "@types"
import { type Component, mergeProps } from "solid-js"

type MarconiKnobProps = Pick<Knob, "colors" | "size">

export const MarconiKnob: Component<MarconiKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        primary: "#760031",
        secondary: "#D9D9D9",
        tick: "#D9D9D9",
      },
    },
    props,
  )

  return (
    <svg
      width={mergedProps.size}
      height={mergedProps.size}
      viewBox="0 0 348 348"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Marconi Knob</title>
      <g fill="none" fill-rule="evenodd">
        <circle cx="174" cy="174" r="174" fill="#D9D9D9" fill-opacity="0.5" />
        <circle
          cx="174"
          cy="174"
          r="170"
          stroke="#fff"
          stroke-width={8}
          stroke-opacity="0.25"
        />
        <path
          d="M202 0C204.209 0 206 1.79086 206 4V45.9072C263.439 60.2101 306 112.134 306 174C306 235.866 263.439 287.789 206 302.092V344C206 346.209 204.209 348 202 348H146C143.791 348 142 346.209 142 344V302.092C84.5611 287.789 42 235.866 42 174C42 112.134 84.561 60.2101 142 45.9072V4C142 1.79087 143.791 0 146 0H202Z"
          fill={mergedProps.colors.primary}
        />
        <circle cx="174" cy="174" r="112" fill={mergedProps.colors.primary} />
        <rect x="170" width="8" height="62" fill={mergedProps.colors.tick} />
        <circle
          cx="174"
          cy="174"
          r="108"
          stroke="#000"
          stroke-width={6}
          stroke-opacity="0.25"
        />
        <rect
          x="171"
          y="288"
          width="6"
          height="60"
          fill="#000"
          fill-opacity="0.25"
        />
      </g>
    </svg>
  )
}
