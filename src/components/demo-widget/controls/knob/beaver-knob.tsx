import type { Knob } from "@types"
import { type Component, mergeProps } from "solid-js"
import styles from "./gradients.module.css"

type BeaverKnobProps = Pick<Knob, "size" | "colors">

export const BeaverKnob: Component<BeaverKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        primary: "#000",
        secondary: "#8a8a8a",
        edge: "#2c2c2c",
        tick: "#e0ffff",
      },
    },
    props,
  )

  const uniqueMaskId = `mask-${Math.random().toString(36).slice(2, 11)}`
  return (
    <div
      class={styles["beaver-knob"]}
      style={{
        "--size": `${mergedProps.size}px`,
        "--primaryColor": mergedProps.colors.primary,
        "--secondaryColor": mergedProps.colors.secondary,
      }}
    >
      <svg
        width={mergedProps.size}
        height={mergedProps.size}
        viewBox="0 0 257 257"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Knob</title>
        <g fill="none">
          <mask
            id={uniqueMaskId}
            style="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="257"
            height="257"
          >
            <path
              d="M116.642 4.397a24.001 24.001 0 0 1 24.68 0l12.251 7.344a24 24 0 0 0 12.733 3.412l14.283-.234a24.001 24.001 0 0 1 21.373 12.34l6.937 12.485a24 24 0 0 0 9.321 9.321l12.487 6.939a24 24 0 0 1 12.339 21.372l-.235 14.282a24.007 24.007 0 0 0 3.412 12.733l7.344 12.251a24 24 0 0 1 0 24.68l-7.344 12.251a24.01 24.01 0 0 0-3.412 12.733l.235 14.283a24.002 24.002 0 0 1-12.339 21.373l-12.487 6.937a24 24 0 0 0-9.321 9.321l-6.937 12.487a24.002 24.002 0 0 1-21.373 12.339l-14.283-.235a24.01 24.01 0 0 0-12.733 3.412l-12.251 7.344a24 24 0 0 1-24.68 0l-12.251-7.344a24.007 24.007 0 0 0-12.733-3.412l-14.282.235a24 24 0 0 1-21.372-12.339l-6.939-12.487a24 24 0 0 0-9.321-9.321l-12.485-6.937a24.001 24.001 0 0 1-12.34-21.373l.234-14.283a24.002 24.002 0 0 0-3.412-12.733l-7.344-12.251a24.001 24.001 0 0 1 0-24.68l7.344-12.251a24 24 0 0 0 3.412-12.733l-.234-14.282a24 24 0 0 1 12.34-21.372l12.485-6.939a24 24 0 0 0 9.321-9.321l6.939-12.485a24 24 0 0 1 21.372-12.34l14.282.234a23.996 23.996 0 0 0 12.733-3.412l12.251-7.344Zm12.34 13.225c-61.502 0-111.36 49.858-111.36 111.36 0 61.503 49.858 111.36 111.36 111.36 61.503 0 111.36-49.857 111.361-111.36 0-61.502-49.858-111.36-111.361-111.36Z"
              fill="white"
            />
          </mask>
          <g mask={`url(#${uniqueMaskId})`}>
            <circle
              cx="128.982"
              cy="128.982"
              fill={mergedProps.colors.primary}
              r="125.796"
            />
          </g>
          <path
            fill={mergedProps.colors.tick}
            d="M122.795 20.715h12.373v49.493h-12.373z"
          />
        </g>
      </svg>
    </div>
  )
}
