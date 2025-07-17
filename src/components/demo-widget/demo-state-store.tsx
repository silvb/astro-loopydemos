import type { ControlElement, Preset, SettingsValue } from "@types"
import { debounce } from "radash"
import {
  type ParentComponent,
  batch,
  createContext,
  createEffect,
  createMemo,
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

  const addSweepSetting = (target: string, value: number) => {
    setSweepSetting(prev => ({
      ...prev,
      [target]: value,
    }))
  }

  const activePreset = () =>
    presets().find(preset => preset.id === activePresetId())

  // Memoized version for expensive computations
  const memoizedActivePreset = createMemo(() => activePreset())
  const memoizedActivePedals = createMemo(() => activePedals())

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

  const selectSweepSetting = (value?: number) => {
    if (
      !activePreset() ||
      (!activePreset()?.isSweep && !activePreset()?.chain?.some(p => p.isSweep))
    ) {
      setSweepSetting({})
      return
    }

    const target =
      activePreset()?.target ||
      activePreset()?.chain?.find(p => p.isSweep)?.target

    if (!target) {
      setSweepSetting({})
      return
    }

    const values =
      activePreset()?.values ||
      activePreset()?.chain?.find(p => p.isSweep)?.values ||
      []

    const currentValue =
      (value ?? sweepSetting()[target]) || activePreset()?.initialValue || 0

    const closestValue = findClosestValue(currentValue, values)

    if (closestValue === sweepSetting()[target]) return

    addSweepSetting(target, closestValue)
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
      activePreset()?.chain?.find(chainItem => chainItem.pedalSlug === slug)
        ?.settings?.[id] ??
      activePreset()?.comparison?.find(compItem => compItem.pedalSlug === slug)
        ?.settings?.[id] ??
      activePreset()?.settings?.[id] ??
      dependency?.values?.find(
        ({ sourceValue }) =>
          sourceValue === getSetting(slug, dependency.source),
      )?.targetValue ??
      sweepSetting()?.[id]
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

  // Initialize first preset when presets are available
  createEffect(() => {
    if (presets().length > 0 && !activePresetId()) {
      selectPreset(presets()[0].id)
    }
  })

  // Batch all preset-related state updates
  createEffect(() => {
    const preset = memoizedActivePreset()
    if (!preset) return

    batch(() => {
      // Critical: sweep setting must be updated first and synchronously
      selectSweepSetting()

      // Secondary state updates
      setSecondaryCircuitsOn(preset.initialSecondaryCircuits || [])

      let newActivePedals: string[]
      if (preset.comparison) {
        const pedalsInComparison = preset.comparison.map(item => item.pedalSlug)
        if (!pedalsInComparison.includes(memoizedActivePedals()[0])) {
          newActivePedals = [pedalsInComparison[0] || ""]
          setActivePedals(newActivePedals)
        } else {
          newActivePedals = memoizedActivePedals()
        }
      } else {
        newActivePedals = preset.chain?.map(
          chainElement => chainElement.pedalSlug,
        ) || [mainPedal()]
        setActivePedals(newActivePedals)
      }

      // Batch the pedals on update with the active pedals update
      addPedalsOn(newActivePedals)
    })
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
