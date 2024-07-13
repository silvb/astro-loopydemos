import { onMount, type Component } from "solid-js"
import type { Preset } from "@types"
import { $activePresetId, $presets } from "./demo-state-store"

interface DemoStateInitializerProps {
  presets: Preset[]
}

export const DemoStateInitializer: Component<DemoStateInitializerProps> = (
  props
) => {
  onMount(() => {
    setTimeout(() => {
      $activePresetId.set(props.presets[0].id)
      $presets.set(props.presets)
    }, 0)
  })

  return null
}
