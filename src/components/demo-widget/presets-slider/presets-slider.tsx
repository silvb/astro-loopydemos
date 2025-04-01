import type { Preset } from "@types"
import type { Component } from "solid-js"
// import { Icon } from "astro-icon/components"
import { PresetButton } from "./preset-button"

interface PresetsSliderProps {
  presets: Preset[]
}

export const PresetsSlider: Component<PresetsSliderProps> = props => (
  <div class="custom-scrollbar">
    <ul class="flex h-10 list-none gap-1">
      {props.presets.map(({ id, isSweep, label, chain }) => (
        <li class="h-full flex-shrink-0 flex-grow-0 basis-auto">
          <PresetButton
            id={id}
            isSweep={chain?.some(p => p.isSweep) || isSweep}
            label={label}
          />
        </li>
      ))}
    </ul>
  </div>
)
