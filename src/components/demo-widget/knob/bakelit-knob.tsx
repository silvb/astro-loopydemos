import type { Knob } from "@types"
import { mergeProps, type Component } from "solid-js"
import styles from "./gradients.module.css"

type BakelitKnobProps = Pick<Knob, "size" | "colors">

export const BakelitKnob: Component<BakelitKnobProps> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        primary: "#444",
        secondary: "#1C1C1C",
        tick: "#fff",
      },
    },
    props
  )

  const uniqueKnobId = Math.random().toString(36).substring(7)
  return (
    <div
      class={styles["bakelit-knob"]}
      style={{
        "--size": `${mergedProps.size}px`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={mergedProps.size}
        height={mergedProps.size}
        viewBox="0 0 132 132"
      >
        <defs>
          <mask id={`${uniqueKnobId}-cut-out-path`}>
            <circle cx="88" cy="87" r="66" fill="#fff"></circle>
            <circle cx="88" cy="87" r="39.5" fill="#000"></circle>
          </mask>
          <mask id={`${uniqueKnobId}-cut-out-circle`}>
            <circle cx="66" cy="66" r="66" fill="#fff"></circle>
            <circle cx="66" cy="66" r="39.5" fill="#000"></circle>
          </mask>
        </defs>
        <g fill="none">
          <circle
            cx="66"
            cy="66"
            r="66"
            fill={mergedProps.colors.secondary}
            mask={`url(#${uniqueKnobId}-cut-out-circle)`}
          ></circle>
          <path
            mask={`url(#${uniqueKnobId}-cut-out-path)`}
            transform="translate(-22 -21) rotate(-30 88 88)"
            fill={mergedProps.colors.primary}
            d="M83.4791075,137.049077 L72,139.712813 C62.9938854,141.802689 53.9085617,136.557275 51.2153903,127.712813 L47.7826997,116.439746 C46.8932372,113.518722 45.3467568,110.84014 43.2618073,108.609331 L35.2153903,100 C28.9024472,93.2454141 28.9024472,82.7545859 35.2153903,76 L43.2618073,67.3906694 C45.3467568,65.1598603 46.8932372,62.4812777 47.7826997,59.5602539 L51.2153903,48.2871871 C53.9085617,39.442725 62.9938854,34.1973109 72,36.2871871 L83.4791075,38.9509232 C86.4535196,39.641138 89.5464804,39.641138 92.5208925,38.9509232 L104,36.2871871 C113.006115,34.1973109 122.091438,39.442725 124.78461,48.2871871 L128.2173,59.5602539 C129.106763,62.4812777 130.653243,65.1598603 132.738193,67.3906694 L140.78461,76 C147.097553,82.7545859 147.097553,93.2454141 140.78461,100 L132.738193,108.609331 C130.653243,110.84014 129.106763,113.518722 128.2173,116.439746 L124.78461,127.712813 C122.091438,136.557275 113.006115,141.802689 104,139.712813 L92.5208925,137.049077 C89.5464804,136.358862 86.4535196,136.358862 83.4791075,137.049077 Z"
          ></path>
          <rect
            width="6"
            height="18"
            x="63"
            y="9"
            fill={mergedProps.colors.tick}
          ></rect>
        </g>
      </svg>
    </div>
  )
}
