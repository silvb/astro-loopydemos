import type { Component, JSX } from "solid-js"

export const PhSpinnerIcon: Component<
  JSX.SvgSVGAttributes<SVGSVGElement>
> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
    class="animate-spin-slow"
    {...props}
  >
    <path
      fill="currentColor"
      d="M140 32v32a12 12 0 0 1-24 0V32a12 12 0 0 1 24 0m33.25 62.75a12 12 0 0 0 8.49-3.52l22.63-22.63a12 12 0 0 0-17-17l-22.6 22.66a12 12 0 0 0 8.48 20.49M224 116h-32a12 12 0 0 0 0 24h32a12 12 0 0 0 0-24m-42.26 48.77a12 12 0 1 0-17 17l22.63 22.63a12 12 0 0 0 17-17ZM128 180a12 12 0 0 0-12 12v32a12 12 0 0 0 24 0v-32a12 12 0 0 0-12-12m-53.74-15.23L51.63 187.4a12 12 0 0 0 17 17l22.63-22.63a12 12 0 1 0-17-17M76 128a12 12 0 0 0-12-12H32a12 12 0 0 0 0 24h32a12 12 0 0 0 12-12m-7.4-76.37a12 12 0 1 0-17 17l22.66 22.6a12 12 0 0 0 17-17Z"
    ></path>
  </svg>
)