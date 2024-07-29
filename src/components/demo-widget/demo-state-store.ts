import type { Preset } from "@types"
import { createSignal, createMemo, createRoot, createEffect } from "solid-js"

const findClosestValue = (value: number, valueArray: number[]) =>
  valueArray.reduce((acc, curr) => {
    const lastDistance = Math.abs(value - acc)
    const currDistance = Math.abs(value - curr)

    return lastDistance <= currDistance ? acc : curr
  }, valueArray[0])

function createDemoState() {
  const [demoType, setDemoType] = createSignal<"single" | "comparison">(
    "single"
  )
  const [mainPedal, setMainPedal] = createSignal<string>("")
  const [activePresetId, selectPreset] = createSignal<string | undefined>(
    undefined
  )
  const [presets, setPresets] = createSignal<Preset[]>([])
  const [sweepSetting, setSweepSetting] = createSignal<Record<string, number>>(
    {}
  )
  const [pedalsOn, setPedalsOn] = createSignal<string[]>([])

  const activePreset = createMemo(() =>
    presets().find((preset) => preset.id === activePresetId())
  )

  const activePedals = createMemo(() => {
    if (demoType() === "single") {
      return (
        activePreset()?.chain?.map((chainElement) => chainElement.name) || [
          mainPedal(),
        ]
      )
    }

    return []
  })

  createEffect(() => {
    setPedalsOn(activePedals())
  })

  const selectSweepSetting = (id: string, value: number) => {
    if (!activePreset()?.isSweep) return

    const values = activePreset()?.values || []

    const closestValue = findClosestValue(value, values)

    setSweepSetting({ [id]: closestValue })
  }

  const toggleBypass = (pedalId: string) => {
    const pedals = pedalsOn()

    if (pedals.includes(pedalId)) {
      setPedalsOn(pedals.filter((id) => id !== pedalId))
    } else {
      setPedalsOn([...pedals, pedalId])
    }
  }

  return {
    activePedals,
    activePreset,
    activePresetId,
    pedalsOn,
    selectPreset,
    selectSweepSetting,
    setPedalsOn,
    setPresets,
    sweepSetting,
    toggleBypass,
    setDemoType,
    setMainPedal,
  }
}

export const demoState = createRoot(createDemoState)
