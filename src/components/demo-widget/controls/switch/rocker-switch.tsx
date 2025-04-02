import type { Switch, SwitchState } from "@types"
import { type Component, mergeProps } from "solid-js"

function adjustBrightness(hex: string, brightness: number) {
  // Remove the hash at the start if it's there
  const hexWithoutHash = hex.replace(/^#/, "")

  // Parse the r, g, b values
  const r = Number.parseInt(hexWithoutHash.substring(0, 2), 16)
  const g = Number.parseInt(hexWithoutHash.substring(2, 4), 16)
  const b = Number.parseInt(hexWithoutHash.substring(4, 6), 16)

  // Calculate new values for r, g, b
  const rAdjust = Math.min(Math.max(0, r * brightness), 255)
  const gAdjust = Math.min(Math.max(0, g * brightness), 255)
  const bAdjust = Math.min(Math.max(0, b * brightness), 255)

  // Convert back to hex
  const rHex = Math.round(rAdjust).toString(16).padStart(2, "0")
  const gHex = Math.round(gAdjust).toString(16).padStart(2, "0")
  const bHex = Math.round(bAdjust).toString(16).padStart(2, "0")

  // Return the adjusted color
  return `#${rHex}${gHex}${bHex}`
}

interface RockerSwitchProps
  extends Pick<Switch, "size" | "orientation" | "colors"> {
  state: SwitchState
}

export const RockerSwitch: Component<RockerSwitchProps> = props => {
  const mergedProps = mergeProps(
    {
      size: 64,
      state: 1,
      orientation: "horizontal",
      colors: { primary: "#f74709" },
    },
    props,
  )

  const a = 64
  const b = 36
  const width =
    mergedProps.orientation === "horizontal"
      ? mergedProps.size
      : (mergedProps.size / a) * b
  const height =
    mergedProps.orientation === "horizontal"
      ? (mergedProps.size / a) * b
      : mergedProps.size

  const viewboxWidth = mergedProps.orientation === "horizontal" ? a : b
  const viewboxHeight = mergedProps.orientation === "horizontal" ? b : a
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}
    >
      <title>Rocker Switch</title>
      <g
        fill="none"
        transform={`rotate(${
          mergedProps.orientation === "horizontal"
            ? "0 0 0"
            : `90 ${b / 2} ${b / 2}`
        })`}
      >
        {mergedProps.state === 1 ? (
          <>
            <rect
              x="0"
              y="0"
              width={a * 0.4}
              height={b}
              fill={
                mergedProps.colors.primary &&
                adjustBrightness(mergedProps.colors.primary, 0.9)
              }
            />
            <rect
              x={a * 0.4}
              y="0"
              width={a * 0.3}
              height={b}
              fill={
                mergedProps.colors.primary &&
                adjustBrightness(mergedProps.colors.primary, 2)
              }
            />
            <rect
              x={a * 0.7}
              y="0"
              width={a * 0.3}
              height={b}
              fill={
                mergedProps.colors.primary &&
                adjustBrightness(mergedProps.colors.primary, 0.7)
              }
            />
          </>
        ) : (
          <>
            <rect
              x="0"
              y="0"
              width={a * 0.3}
              height={b}
              fill={
                mergedProps.colors.primary &&
                adjustBrightness(mergedProps.colors.primary, 1.5)
              }
            />
            <rect
              x={a * 0.3}
              y="0"
              width={a * 0.3}
              height={b}
              fill={
                mergedProps.colors.primary &&
                adjustBrightness(mergedProps.colors.primary, 0.7)
              }
            />
            <rect
              x={a * 0.6}
              y="0"
              width={a * 0.4}
              height={b}
              fill={mergedProps.colors.primary}
            />
          </>
        )}
      </g>
    </svg>
  )
}
