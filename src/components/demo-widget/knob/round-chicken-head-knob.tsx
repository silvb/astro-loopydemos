import type { Knob } from "@types"
import { mergeProps, type Component } from "solid-js"
import styles from "./gradients.module.css"

type RoundChickenHeadKnobProps = Pick<Knob, "size" | "colors">

export const RoundChickenHeadKnob: Component<
  RoundChickenHeadKnobProps
> = props => {
  const mergedProps = mergeProps(
    {
      colors: {
        tick: "#1F1B1C",
        primary: "#FFFDFE",
        secondary: "#E6E6E6",
      },
    },
    props
  )

  return (
    <div
      class={styles["round-chicken-head-knob"]}
      style={{
        "--size": `${mergedProps.size}px`,
      }}
    >
      <svg
        width={mergedProps.size}
        height={mergedProps.size}
        viewBox="0 0 380 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M190 380C294.934 380 380 294.934 380 190C380 85.0659 294.934 0 190 0C85.0659 0 0 85.0659 0 190C0 294.934 85.0659 380 190 380ZM190 265C231.421 265 265 231.421 265 190C265 148.579 231.421 115 190 115C148.579 115 115 148.579 115 190C115 231.421 148.579 265 190 265Z"
            fill={mergedProps.colors.secondary}
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M190 280C239.706 280 280 239.706 280 190C280 140.294 239.706 100 190 100C140.294 100 100 140.294 100 190C100 239.706 140.294 280 190 280ZM190 265C231.421 265 265 231.421 265 190C265 148.579 231.421 115 190 115C148.579 115 115 148.579 115 190C115 231.421 148.579 265 190 265Z"
            fill={mergedProps.colors.primary}
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M179.505 2C173.936 2 169.099 5.83142 167.824 11.2525L138.635 135.35C152.056 122.731 170.125 115 190 115C210.575 115 229.215 123.285 242.766 136.701L212.705 11.2046C211.412 5.80672 206.586 2 201.035 2L179.505 2ZM261.197 213.644C251.294 243.48 223.16 265 190 265C157.742 265 130.24 244.635 119.651 216.06L90.797 338.734C89.4674 344.387 92.3764 350.181 97.7042 352.491L140.634 371.107C143.438 372.323 146.601 372.423 149.477 371.387L169.611 364.13C182.787 359.381 197.209 359.392 210.378 364.159L230.406 371.409C233.232 372.432 236.339 372.358 239.113 371.2L284.072 352.435C289.506 350.167 292.492 344.291 291.12 338.565L261.197 213.644Z"
            fill={mergedProps.colors.primary}
          ></path>
          <rect
            x="184"
            y="6"
            width="12"
            height="100"
            fill={mergedProps.colors.tick}
          ></rect>
        </g>
      </svg>
    </div>
  )
}
