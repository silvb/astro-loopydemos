import type { Knob } from "@types"
import { mergeProps, type Component } from "solid-js"

type GojiraKnobProps = Pick<Knob, "colors" | "size">

export const GojiraKnob: Component<GojiraKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        primary: "#D233AF",
        secondary: "#8EBCC6",
        edge: "#BBE0EC",
      },
    },
    props
  )

  return (
    <svg
      width={mergedProps.size}
      height={mergedProps.size}
      viewBox="0 0 270 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle
          cx="135"
          cy="135"
          r="127"
          fill={mergedProps.colors.secondary}
          stroke={mergedProps.colors.edge}
          stroke-width="16"
        ></circle>
        <path
          d="M187 175.022C187 199.581 164.377 221 134.5 221S82 199.581 82 175.022c0-6.368 1.313-10.375 3.057-13.026 1.713-2.604 4.332-4.644 8.35-6.21 8.659-3.374 21.519-3.786 38.659-3.786 17.046 0 31.329.387 41.363 3.886 4.801 1.673 8.018 3.871 10.079 6.569 2.012 2.633 3.492 6.484 3.492 12.567Z"
          stroke={mergedProps.colors.edge}
          stroke-width="16"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M177.635 97c-.905 6.979-1.6 13.173-2.217 18.668C171.26 152.692 170.665 158 133.635 158c-37.284 0-37.632-4.612-40.521-42.813-.407-5.371-.863-11.407-1.48-18.187-5-55-.525-63 42.001-63 42.526 0 51 9 44 63Zm-12-22.304c0 11.658-4.002 11.565-20.017 11.194-3.296-.076-7.1-.164-11.483-.164-4.383 0-8.188.088-11.483.164-16.015.371-20.017.464-20.017-11.194 0-14.058 5.818-29.696 31.5-29.696 25.681 0 31.5 15.638 31.5 29.696ZM135.135 147c22.764 0 24-10.144 26.087-29.456 2.087-19.312-3.323-20.467-26.087-20.467-2.144 0-4.155-.022-6.037-.042-18.1-.197-24.267-.264-22.022 20.509 2.087 19.312 5.295 29.456 28.059 29.456Z"
          fill={mergedProps.colors.primary}
        ></path>
        <circle
          cx="135"
          cy="121"
          r="15"
          fill={mergedProps.colors.edge}
        ></circle>
      </g>
    </svg>
  )
}
