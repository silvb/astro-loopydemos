import { onMount, type Component } from "solid-js"
import type { Preset } from "@types"
import { demoState } from "./demo-state-store"

interface DemoStateInitializerProps {
  presets: Preset[]
}

export const DemoStateInitializer: Component<DemoStateInitializerProps> = (
  props
) => {
  const { selectPreset, setPresets } = demoState
  onMount(() => {
    setTimeout(() => {
      selectPreset(props.presets[0].id)
      setPresets(props.presets)
    }, 0)
  })

  return null
}
