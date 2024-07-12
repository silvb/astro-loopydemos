import type { Preset } from "@types"
import { onMount, type ParentComponent } from "solid-js"
import { useDemoState } from "./demo-state-provider"
import { cva } from "class-variance-authority"

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
  const [{ activePreset }, { selectPreset }] = useDemoState()
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
      onClick={() => selectPreset(props.id)}
      class={buttonClass({
        isSweep: props.isSweep,
        isActive: activePreset.id === props.id,
      })}
    >
      <span>{props.label}</span>
      {props.children}
    </button>
  )
}
