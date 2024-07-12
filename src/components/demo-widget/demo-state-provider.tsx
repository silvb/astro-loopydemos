import type { Preset } from "@types"
import type { CollectionEntry } from "astro:content"
import { createContext, useContext, type ParentComponent } from "solid-js"
import { createStore } from "solid-js/store"

interface DemoStateContainerProps {
  slug: CollectionEntry<"demos">["slug"]
  presets: Preset[]
}

// context type
type DemoState = [
  { activePreset: Preset },
  { selectPreset: (selectedId: string) => void },
]

const DemoState = createContext<DemoState>()

export const DemoStateProvider: ParentComponent<DemoStateContainerProps> = (
  props
) => {
  const [demoState, setDemoState] = createStore({
    activePreset: props.presets[0],
  })

  const selectPreset = (selectedId: string) => {
    setDemoState(
      "activePreset",
      () =>
        props.presets.find((preset) => preset.id === selectedId) ||
        props.presets[0]
    )
  }

  return (
    <DemoState.Provider value={[demoState, { selectPreset }]}>
      {props.children}
    </DemoState.Provider>
  )
}

export const useDemoState = () => useContext(DemoState)
