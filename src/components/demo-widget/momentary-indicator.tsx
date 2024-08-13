import type { Component } from "solid-js"
import styles from "./momentary-indicator.module.css"

interface MomentaryIndicatorProps {
  size: number
}

export const MomentaryIndicator: Component<MomentaryIndicatorProps> = props => (
  <div
    class={styles["momentary-indicator"]}
    style={{ "--size": `${props.size}px` }}
  ></div>
)
