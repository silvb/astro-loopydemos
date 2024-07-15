import type { Switch, SwitchState } from "@types"
import { mergeProps, type Component } from "solid-js"

function adjustBrightness(hex: string, brightness: number) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "")

  // Parse the r, g, b values
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

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

export const RockerSwitch: Component<RockerSwitchProps> = (props) => {
  const finalProps = mergeProps(
    {
      size: 64,
      state: 1,
      orientation: "horizontal",
      colors: { primary: "#f74709" },
    },
    props
  )

  const a = 64
  const b = 36
  const width =
    finalProps.orientation === "horizontal"
      ? finalProps.size
      : (finalProps.size / a) * b
  const height =
    finalProps.orientation === "horizontal"
      ? (finalProps.size / a) * b
      : finalProps.size

  const viewboxWidth = finalProps.orientation === "horizontal" ? a : b
  const viewboxHeight = finalProps.orientation === "horizontal" ? b : a
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}
    >
      <g
        fill="none"
        transform={`rotate(${
          finalProps.orientation === "horizontal"
            ? "0 0 0"
            : `90 ${b / 2} ${b / 2}`
        })`}
      >
        {finalProps.state === 1 ? (
          <>
            <rect
              x="0"
              y="0"
              width={a * 0.4}
              height={b}
              fill={adjustBrightness(finalProps.colors.primary, 0.9)}
            />
            <rect
              x={a * 0.4}
              y="0"
              width={a * 0.3}
              height={b}
              fill={adjustBrightness(finalProps.colors.primary, 2)}
            />
            <rect
              x={a * 0.7}
              y="0"
              width={a * 0.3}
              height={b}
              fill={adjustBrightness(finalProps.colors.primary, 0.7)}
            />
          </>
        ) : (
          <>
            <rect
              x="0"
              y="0"
              width={a * 0.3}
              height={b}
              fill={adjustBrightness(finalProps.colors.primary, 1.5)}
            />
            <rect
              x={a * 0.3}
              y="0"
              width={a * 0.3}
              height={b}
              fill={adjustBrightness(finalProps.colors.primary, 0.7)}
            />
            <rect
              x={a * 0.6}
              y="0"
              width={a * 0.4}
              height={b}
              fill={finalProps.colors.primary}
            />
          </>
        )}
      </g>
    </svg>
  )
}
