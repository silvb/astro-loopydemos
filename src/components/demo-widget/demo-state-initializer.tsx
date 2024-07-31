import { onMount, type Component } from "solid-js"
import type { Preset } from "@types"
import { demoState } from "./demo-state-store"

interface DemoStateInitializerProps {
  presets: Preset[]
  pedals: string[]
}

export const DemoStateInitializer: Component<DemoStateInitializerProps> = (
  props
) => {
  const { setPresets, setPedalsOn, setMainPedal } = demoState

  onMount(() => {
    setTimeout(() => {
      setMainPedal(props.pedals[0])
      setPresets(props.presets)
      setPedalsOn(props.pedals)
    }, 200)
  })

  return null
}
