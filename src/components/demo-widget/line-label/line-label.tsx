import { demoState } from "@components/demo-widget/demo-state-store"
import { type Component } from "solid-js"
import styles from "./line-label.module.css"
import type { LineLabel as LineLabelType } from "@types"

interface LineLabelProps extends LineLabelType {
  pedalSlug: string
}

export const LineLabel: Component<LineLabelProps> = props => {
  const { getSetting, activePreset } = demoState

  const setting = () =>
    getSetting(props.pedalSlug, props.id, props.dependency) as string

  const LINE_CAP_RADIUS = 3

  const width = Math.max(
    Math.abs(props.position.left - props.labelPosition.left),
    LINE_CAP_RADIUS * 2
  )
  const height = Math.max(
    Math.abs(props.position.top - props.labelPosition.top),
    LINE_CAP_RADIUS * 2
  )

  const isRightAligned = props.position.left <= props.labelPosition.left
  const isTopDown = props.position.top <= props.labelPosition.top

  const startX = isRightAligned ? LINE_CAP_RADIUS : width - LINE_CAP_RADIUS
  const startY = isTopDown ? LINE_CAP_RADIUS : height - LINE_CAP_RADIUS

  let endX = isRightAligned ? width - LINE_CAP_RADIUS : LINE_CAP_RADIUS
  let endY = isTopDown ? height - LINE_CAP_RADIUS : LINE_CAP_RADIUS

  let bendX = width / 2

  return (
    <div class={setting() && !activePreset()?.noLabels ? "" : "hidden"}>
      <div
        class={`${styles["line-label-container"]} text-loopydemos-text-themed`}
        id={props.id}
        style={{
          transform: `translate(${isRightAligned ? 0 : -100}%, ${isTopDown ? 0 : -100}%)`,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          class="drop-shadow-md"
        >
          <g fill="none" fill-rule="evenodd">
            <polyline
              fill="none"
              class="stroke-loopydemos-text-themed"
              stroke={props.color}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              points={`${startX} ${startY} ${bendX} ${endY} ${endX} ${endY}`}
            ></polyline>
            <circle
              class="fill-loopydemos-text-themed"
              cx={startX}
              cy={startY}
              r={LINE_CAP_RADIUS}
              fill={props.color}
            ></circle>
            <circle
              class="fill-loopydemos-text-themed"
              cx={endX}
              cy={endY}
              r={LINE_CAP_RADIUS}
              fill={props.color}
            ></circle>
          </g>
        </svg>
        <span
          class={`${styles["line-label"]} text-xs text-loopydemos-text-themed`}
          classList={{
            "long-width": props.isLong,
            [styles["right-aligned"]]: isRightAligned,
          }}
          style={{
            top: `${endY - LINE_CAP_RADIUS / 2}px`,
            left: `${endX}px`,
          }}
        >
          {setting()}
        </span>
      </div>
    </div>
  )
}
