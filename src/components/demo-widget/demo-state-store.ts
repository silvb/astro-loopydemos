import type { Preset } from "@types"
import { createSignal, createMemo, createRoot } from "solid-js"

function createDemoState() {
  const [activePresetId, selectPreset] = createSignal<string | undefined>(
    undefined
  )
  const [presets, setPresets] = createSignal<Preset[]>([])

  const activePreset = createMemo(() =>
    presets().find((preset) => preset.id === activePresetId())
  )

  return { activePresetId, setPresets, selectPreset, activePreset }
}

export const demoState = createRoot(createDemoState)
