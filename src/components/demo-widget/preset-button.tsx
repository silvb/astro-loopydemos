import type { Preset } from "@types"
import { onMount, type ParentComponent } from "solid-js"
import { cva } from "class-variance-authority"
import { demoState } from "./demo-state-store"

const buttonClass = cva(
  "flex h-full items-center gap-1 rounded-md px-2 font-black text-loopydemos-background",
  {
    variants: {
      isSweep: {
        true: "bg-loopydemos-highlight-secondary",
        false: "bg-loopydemos-highlight-primary",
      },
      isActive: {
        true: "opacity-100",
        false: "opacity-40",
      },
    },
  }
)

type PresetButtonProps = Pick<Preset, "id" | "isSweep" | "label">

export const PresetButton: ParentComponent<PresetButtonProps> = (props) => {
  const { activePresetId, selectPreset, activePedals, pedalsOn, setPedalsOn } =
    demoState
  let buttonEl!: HTMLButtonElement

  onMount(() => {
    const backgroundColor = window.getComputedStyle(buttonEl).backgroundColor
    const rgbValues = backgroundColor.match(/\d+/g)
    if (!rgbValues || rgbValues.length !== 3) return

    const [r, g, b] = rgbValues.map(Number)

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b

    const textColor =
      luminance > 128 ? "text-loopydemos-black" : "text-loopydemos-text"

    buttonEl.classList.add(textColor)
  })

  return (
    <button
      id={props.id}
      ref={buttonEl}
      onClick={() => {
        selectPreset(props.id)
        buttonEl.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        })

        setPedalsOn(activePedals())
      }}
      class={buttonClass({
        isSweep: Boolean(props.isSweep),
        isActive:
          activePresetId() === props.id &&
          activePedals().some((activePedal) =>
            pedalsOn().includes(activePedal)
          ),
      })}
    >
      <span>{props.label}</span>
      {props.children}
    </button>
  )
}
