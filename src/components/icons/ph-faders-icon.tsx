import type { Component, JSX } from "solid-js"

export const PhFadersIcon: Component<
  JSX.SvgSVGAttributes<SVGSVGElement>
> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
    {...props}
  >
    <path
      fill="currentColor"
      d="M140 124v92a12 12 0 0 1-24 0v-92a12 12 0 0 1 24 0m60 68a12 12 0 0 0-12 12v12a12 12 0 0 0 24 0v-12a12 12 0 0 0-12-12m24-40h-12V40a12 12 0 0 0-24 0v112h-12a12 12 0 0 0 0 24h48a12 12 0 0 0 0-24m-168 8a12 12 0 0 0-12 12v44a12 12 0 0 0 24 0v-44a12 12 0 0 0-12-12m24-40H68V40a12 12 0 0 0-24 0v80H32a12 12 0 0 0 0 24h48a12 12 0 0 0 0-24m72-48h-12V40a12 12 0 0 0-24 0v32h-12a12 12 0 0 0 0 24h48a12 12 0 0 0 0-24"
    ></path>
  </svg>
)