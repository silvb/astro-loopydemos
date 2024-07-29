import { onMount, type Component } from "solid-js"
import type { Preset } from "@types"
import { demoState } from "./demo-state-store"

interface DemoStateInitializerProps {
  presets: Preset[]
  pedals: string[]
  demoType: "single" | "comparison"
}

export const DemoStateInitializer: Component<DemoStateInitializerProps> = (
  props
) => {
  const { selectPreset, setPresets, setPedalsOn, setMainPedal, setDemoType } =
    demoState
  onMount(() => {
    setTimeout(() => {
      selectPreset(props.presets[0].id)
      setPresets(props.presets)
      setPedalsOn(props.pedals)
      setDemoType(props.demoType)
      setMainPedal(props.demoType === "single" ? props.pedals[0] : "")
    }, 0)
  })

  return null
}
