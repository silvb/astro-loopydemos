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
  const isComparison = props.presets.some(({ comparison }) =>
    Boolean(comparison)
  )
  onMount(() => {
    setTimeout(() => {
      setMainPedal(isComparison ? "" : props.pedals[0])
      setPresets(props.presets)
      setPedalsOn(props.pedals)
    }, 200)
  })

  return null
}