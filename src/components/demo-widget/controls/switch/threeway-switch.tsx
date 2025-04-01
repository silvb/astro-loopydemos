import type { Switch, SwitchState } from "@types"
import { type Component, mergeProps } from "solid-js"

interface ThreewaySwitchProps
  extends Pick<Switch, "size" | "orientation" | "colors"> {
  state: SwitchState
}

export const ThreewaySwitch: Component<ThreewaySwitchProps> = props => {
  const mergedProps = mergeProps(
    {
      size: 64,
      state: 1,
      orientation: "horizontal",
      colors: { primary: "#312e2f" },
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
      <title>Threeway Switch</title>
      <g
        fill="none"
        transform={`rotate(${mergedProps.orientation === "vertical" ? -90 : 0} 32 32)`}
      >
        <rect
          width={64}
          height={32}
          fill={mergedProps.colors?.primary || "black"}
          x="0"
          y="16"
          rx="2"
          ry="2"
        />
        <rect
          width={56}
          height={20}
          fill="black"
          x="4"
          y="22"
          rx="2"
          ry="2"
          stroke-width={1}
          stroke="#3c3c40"
        />
        <g
          fill="none"
          class="transition-transform duration-100 ease-in"
          style={{
            transform: `translateX(${{ 1: 0, 2: 24, 3: 48 }[mergedProps.state]}%)`,
          }}
        >
          <rect
            x="0"
            y="16"
            fill="#44484f"
            width={32}
            height="32"
            rx="4"
            ry="4"
            stroke-width={1}
            stroke="#8c8b9d"
          />
          <line
            x1={8}
            x2={8}
            y1={20}
            y2={44}
            stroke-width={6}
            stroke="#000"
            stroke-linecap="round"
          />
          <line
            x1={16}
            x2={16}
            y1={20}
            y2={44}
            stroke-width={6}
            stroke="#000"
            stroke-linecap="round"
          />
          <line
            x1={24}
            x2={24}
            y1={20}
            y2={44}
            stroke-width={6}
            stroke="#000"
            stroke-linecap="round"
          />
        </g>
      </g>
    </svg>
  )
}
