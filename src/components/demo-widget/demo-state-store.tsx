import type { ControlElement, Preset, SettingsValue } from "@types"
import { debounce } from "radash"
import {
  type ParentComponent,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js"

const findClosestValue = (value: number, valueArray: number[]) =>
  valueArray.reduce((acc, curr) => {
    const lastDistance = Math.abs(value - acc)
    const currDistance = Math.abs(value - curr)

    return lastDistance <= currDistance ? acc : curr
  }, valueArray[0])

interface DemoStateProviderProps {
  presets: Preset[]
  pedals: string[]
}

export const useDemoStateValue = (props: DemoStateProviderProps) => {
  const [mainPedal, setMainPedal] = createSignal<string>(props.pedals[0])
  const [activePresetId, selectPreset] = createSignal<string | undefined>(
    undefined,
  )
  const [presets, setPresets] = createSignal<Preset[]>(props.presets)
  const [sweepSetting, setSweepSetting] = createSignal<Record<string, number>>(
    {},
  )
  const [pedalsOn, setPedalsOn] = createSignal<string[]>(props.pedals)
  const [secondaryCircuitsOn, setSecondaryCircuitsOn] = createSignal<string[]>(
    [],
  )
  const [isPlaying, setIsPlaying] = createSignal(false)
  const [activePedals, setActivePedals] = createSignal<string[]>([])
  const [isBackingTrackMuted, setIsBackingTrackMuted] = createSignal(false)
  const [isLoading, setIsLoading] = createSignal(false)
  const [hasErrors, setHasErrors] = createSignal(false)
  const [widthTab, setWidthTab] = createSignal<Record<string, number>>({})

  const setIsLoadingDebounced = debounce({ delay: 200 }, setIsLoading)

  const activePreset = () =>
    presets().find(preset => preset.id === activePresetId())

  const selectNextPreset = () => {
    const presetIndex = presets().findIndex(
      preset => preset.id === activePresetId(),
    )

    const nextPresetIndex =
      presetIndex === presets().length - 1 ? 0 : presetIndex + 1

    selectPreset(presets()[nextPresetIndex].id)
  }

  const selectPreviousPreset = () => {
    const presetIndex = presets().findIndex(
      preset => preset.id === activePresetId(),
    )

    const previousPresetIndex =
      presetIndex === 0 ? presets().length - 1 : presetIndex - 1

    selectPreset(presets()[previousPresetIndex].id)
  }

  const selectSweepSetting = (id: string, value: number) => {
    if (
      !activePreset()?.isSweep &&
      !activePreset()?.chain?.some(p => p.isSweep)
    )
      return

    const values =
      activePreset()?.values ||
      activePreset()?.chain?.find(p => p.isSweep)?.values ||
      []

    const closestValue = findClosestValue(value, values)

    if (closestValue === sweepSetting()[id]) return

    setSweepSetting({ [id]: closestValue })
  }

  const toggleBypass = (pedalSlug: string) => {
    const pedals = pedalsOn()

    if (pedals.includes(pedalSlug)) {
      setPedalsOn(pedals.filter(id => id !== pedalSlug))
    } else {
      setPedalsOn([...pedals, pedalSlug])
    }
  }

  const toggleSecondaryCircuit = (circuitId: string) => {
    const circuits = secondaryCircuitsOn()

    if (circuits.includes(circuitId)) {
      setSecondaryCircuitsOn(circuits.filter(id => id !== circuitId))
    } else {
      setSecondaryCircuitsOn([...circuits, circuitId])
    }
  }

  const getSetting = (
    pedalSlug: string,
    id?: string,
    dependency?: ControlElement["dependency"],
  ): SettingsValue | undefined => {
    if (!id) return

    if (!activePedals().includes(pedalSlug)) return

    const slug = pedalSlug

    return (
      sweepSetting()?.[id] ??
      activePreset()?.chain?.find(chainItem => chainItem.pedalSlug === slug)
        ?.settings?.[id] ??
      activePreset()?.comparison?.find(compItem => compItem.pedalSlug === slug)
        ?.settings?.[id] ??
      activePreset()?.settings?.[id] ??
      dependency?.values?.find(
        ({ sourceValue }) =>
          sourceValue === getSetting(slug, dependency.source),
      )?.targetValue
    )
  }

  const addPedalsOn = (pedalSlugs: string[]) => {
    setPedalsOn(prev => [...new Set([...prev, ...pedalSlugs])])
  }

  const isSweepTarget = (id: string, pedalSlug: string) => {
    const isSweep =
      activePreset()?.isSweep ||
      activePreset()?.chain?.some(p => p.isSweep && p.pedalSlug === pedalSlug)

    if (!isSweep) return false

    const target =
      activePreset()?.target ||
      activePreset()?.chain?.find(p => p.isSweep)?.target

    return target === id
  }

  createEffect(() => {
    addPedalsOn(activePedals())
  })

  createEffect(() => {
    if (activePreset()?.isSweep) {
      setSweepSetting(prev =>
        activePreset()?.target
          ? {
              [activePreset()!.target || ""]:
                prev[activePreset()!.target!] ||
                activePreset()?.initialValue ||
                0,
            }
          : {},
      )
    } else {
      setSweepSetting({})
    }

    setSecondaryCircuitsOn(activePreset()?.initialSecondaryCircuits || [])

    if (activePreset()?.comparison) {
      const pedalsInComparison = activePreset()?.comparison?.map(
        item => item.pedalSlug,
      )
      if (!pedalsInComparison?.includes(activePedals()[0]))
        setActivePedals([pedalsInComparison?.[0] || ""])
      return
    }

    setActivePedals(
      activePreset()?.chain?.map(chainElement => chainElement.pedalSlug) || [
        mainPedal(),
      ],
    )
  })

  createEffect(() => {
    if (presets().length > 0) {
      selectPreset(presets()[0].id)
    }
  })

  return {
    activePedals,
    activePreset,
    activePresetId,
    pedalsOn,
    selectPreset,
    selectSweepSetting,
    addPedalsOn,
    setPresets,
    sweepSetting,
    toggleBypass,
    setMainPedal,
    secondaryCircuitsOn,
    toggleSecondaryCircuit,
    getSetting,
    setActivePedals,
    isPlaying,
    setIsPlaying,
    isBackingTrackMuted,
    setIsBackingTrackMuted,
    isLoading,
    hasErrors,
    setHasErrors,
    widthTab,
    setWidthTab,
    setIsLoading: setIsLoadingDebounced,
    isSweepTarget,
    selectNextPreset,
    selectPreviousPreset,
  }
}

export type ContextType = ReturnType<typeof useDemoStateValue>

const DemoStateContext = createContext<ContextType>()

export const useDemoState = () => {
  const context = useContext(DemoStateContext)

  if (!context) {
    throw new Error("useDemoState must be used within a DemoStateProvider")
  }

  return context
}

export const DemoStateProvider: ParentComponent<
  DemoStateProviderProps
> = props => {
  const value = useDemoStateValue(props)

  return (
    <DemoStateContext.Provider value={value}>
      {props.children}
    </DemoStateContext.Provider>
  )
}
