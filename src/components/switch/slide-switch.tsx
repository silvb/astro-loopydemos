import type { Switch, SwitchState } from "@types"
import { type Component } from "solid-js"

interface SlideSwitchProps extends Pick<Switch, "size" | "orientation"> {
  state: SwitchState
}

export const SlideSwitch: Component<SlideSwitchProps> = (props) => {
  const uniqueId = `slide-switch-${Math.random().toString(36).substring(7)}`
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 64 64"
    >
      <defs>
        <radialGradient id={`${uniqueId}-shinyGradient`}>
          <stop offset="10%" stop-color="aliceblue" />
          <stop offset="80%" stop-color="darkslategray" />
          <stop offset="95%" stop-color="#333" />
        </radialGradient>
      </defs>
      <g
        fill="none"
        transform={`rotate(${props.orientation === "vertical" ? -90 : 0} 32 32)`}
      >
        <rect
          width={64}
          height={24}
          fill="black"
          x="0"
          y="20"
          rx="12"
          ry="12"
        />
        <circle
          class="transition-transform duration-100 ease-in"
          style={{
            transform: `translateX(${props.state === 1 ? 10 : 50}%)`,
          }}
          cx="12"
          cy="32"
          r="12"
          fill={`url('#${uniqueId}-shinyGradient')`}
        />
      </g>
    </svg>
  )
}
