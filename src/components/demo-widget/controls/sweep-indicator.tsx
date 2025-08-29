import type { ControlElement } from "@types"
import { type Component, mergeProps, onMount } from "solid-js"
import styles from "./sweep-indicator.module.css"

interface SweepIndicatorProps {
  size: number
  color: ControlElement["highlightColor"]
  isStomp?: boolean
}

export const SweepIndicator: Component<SweepIndicatorProps> = props => {
  const mergedProps = mergeProps({ color: "secondary" }, props)
  let scrollEl!: HTMLDivElement

  onMount(() => {
    if (props.isStomp) return
    scrollEl.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    })
  })
  return (
    <div
      ref={scrollEl}
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
