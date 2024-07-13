import type { Preset } from "@types"
import { atom, computed } from "nanostores"

export const $activePresetId = atom<string | undefined>(undefined)

export const $presets = atom<Preset[]>([])

export const $activePreset = computed(
  [$activePresetId, $presets],
  (activePresetId, presets) =>
    presets.find((preset) => preset.id === activePresetId)
)
