import type { Switch, SwitchState } from "@types"
import { type Component } from "solid-js"

interface PushButtonProps extends Pick<Switch, "size"> {
  state: SwitchState
}

export const PushButton: Component<PushButtonProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 64 64"
  >
    <g fill="none">
      <rect
        x="8"
        y={props.state === 1 ? `20` : `28`}
        width="48"
        height={props.state === 1 ? `18` : `10`}
        fill="#222"
      />
      <circle cx="32" cy="40" r="24" fill="#222" />
      <circle
        cx="32"
        cy={props.state === 1 ? `24` : `32`}
        r="23"
        fill="#222"
        stroke-width="2"
        stroke="#555"
      />
    </g>
  </svg>
)
