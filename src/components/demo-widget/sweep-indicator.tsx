import type { ControlElement } from "@types"
import { mergeProps, type Component } from "solid-js"
import styles from "./sweep-indicator.module.css"

interface SweepIndicatorProps {
  size: number
  color: ControlElement["highlightColor"]
}

export const SweepIndicator: Component<SweepIndicatorProps> = props => {
  const mergedProps = mergeProps({ color: "secondary" }, props)
  return (
    <div
      class={styles["sweep-indicator"]}
      classList={{
        "border-loopydemos-highlight-primary-themed":
          mergedProps.color === "primary",
        "border-loopydemos-highlight-secondary-themed":
          mergedProps.color === "secondary",
        "border-loopydemos-highlight-tertiary-themed":
          mergedProps.color === "tertiary",
      }}
      style={{
        "--size": `${mergedProps.size}px`,
        "--scaleX": 1,
        "--scaleY": 1,
      }}
    />
  )
}
