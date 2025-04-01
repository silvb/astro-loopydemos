import type { Switch, SwitchState } from "@types"
import { type Component, mergeProps } from "solid-js"

interface PushButtonProps extends Pick<Switch, "size" | "colors"> {
  state: SwitchState
}

export const PushButton: Component<PushButtonProps> = props => {
  const mergedProps = mergeProps(
    {
      size: 64,
      state: 1,
      colors: { primary: "#222", secondary: "#555" },
    },
    props,
  )
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={mergedProps.size}
      height={mergedProps.size}
      viewBox="0 0 64 64"
    >
      <title>Push Button</title>
      <g fill="none">
        <rect
          x="8"
          y={mergedProps.state === 1 ? "20" : "28"}
          width="48"
          height={mergedProps.state === 1 ? "18" : "10"}
          fill={mergedProps.colors.primary}
        />
        <circle cx="32" cy="40" r="24" fill={mergedProps.colors.primary} />
        <circle
          cx="32"
          cy={mergedProps.state === 1 ? "24" : "32"}
          r="23"
          fill={mergedProps.colors.primary}
          stroke-width="2"
          stroke={mergedProps.colors.secondary}
        />
      </g>
    </svg>
  )
}
