import type { Preset } from "@types"
import { createSignal, createMemo, createRoot } from "solid-js"

const findClosestValue = (value: number, valueArray: number[]) =>
  valueArray.reduce((acc, curr) => {
    const lastDistance = Math.abs(value - acc)
    const currDistance = Math.abs(value - curr)

    return lastDistance <= currDistance ? acc : curr
  }, valueArray[0])

function createDemoState() {
  const [activePresetId, selectPreset] = createSignal<string | undefined>(
    undefined
  )
  const [presets, setPresets] = createSignal<Preset[]>([])
  const [sweepSetting, setSweepSetting] = createSignal<Record<string, number>>(
    {}
  )

  const activePreset = createMemo(() =>
    presets().find((preset) => preset.id === activePresetId())
  )

  const selectSweepSetting = (id: string, value: number) => {
    if (!activePreset()?.isSweep) return

    const values = activePreset()?.values || []

    const closestValue = findClosestValue(value, values)

    setSweepSetting({ [id]: closestValue })
  }

  return {
    activePresetId,
    setPresets,
    selectPreset,
    activePreset,
    sweepSetting,
    selectSweepSetting,
  }
}

export const demoState = createRoot(createDemoState)
