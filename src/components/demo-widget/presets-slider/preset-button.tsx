import type { Preset } from "@types"
import { onMount, Show, type Component } from "solid-js"
import { useDemoState } from "../demo-state-store"
import { PhFadersIcon } from "../icons/ph-faders-icon"
import { PhSpinnerIcon } from "../icons/ph-spinner-icon"

type PresetButtonProps = Pick<Preset, "id" | "isSweep" | "label">

export const PresetButton: Component<PresetButtonProps> = props => {
  const {
    activePresetId,
    selectPreset,
    activePedals,
    pedalsOn,
    setPedalsOn,
    isLoading,
  } = useDemoState()
  let buttonEl!: HTMLButtonElement

  onMount(() => {
    const backgroundColor = window.getComputedStyle(buttonEl).backgroundColor
    const rgbValues = backgroundColor.match(/\d+/g)
    if (!rgbValues || rgbValues.length !== 3) return

    const [r, g, b] = rgbValues.map(Number)

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b

    const textColor = luminance > 128 ? "#000" : "#fff"

    buttonEl.style.setProperty("color", textColor)
  })

  const isLoadingAndActive = () => isLoading() && activePresetId() === props.id
  const isActive = () =>
    activePresetId() === props.id &&
    activePedals().some(activePedal => pedalsOn().includes(activePedal))

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
      class="flex h-full items-center gap-1 rounded-md px-2 font-black text-loopydemos-background"
      classList={{
        "bg-loopydemos-highlight-secondary-themed": props.isSweep,
        "bg-loopydemos-highlight-primary-themed": !props.isSweep,
        "opacity-100": isActive(),
        "opacity-40": !isActive(),
      }}
    >
      <span>{props.label}</span>
      <Show when={isLoadingAndActive()} fallback={<PhFadersIcon />}>
        <PhSpinnerIcon />
      </Show>
    </button>
  )
}