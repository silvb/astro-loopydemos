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
  const { setPresets, setPedalsOn, setMainPedal, setDemoType } = demoState
  onMount(() => {
    setTimeout(() => {
      setMainPedal(props.demoType === "single" ? props.pedals[0] : "")
      setPresets(props.presets)
      setPedalsOn(props.pedals)
      setDemoType(props.demoType)
    }, 200)
  })

  return null
}
