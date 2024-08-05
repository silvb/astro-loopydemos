import type { ControlElement, Preset, SettingsValue } from "@types"
import { createSignal, createMemo, createRoot, createEffect } from "solid-js"
import { debounce } from "radash"

const findClosestValue = (value: number, valueArray: number[]) =>
  valueArray.reduce((acc, curr) => {
    const lastDistance = Math.abs(value - acc)
    const currDistance = Math.abs(value - curr)

    return lastDistance <= currDistance ? acc : curr
  }, valueArray[0])

function createDemoState() {
  const [mainPedal, setMainPedal] = createSignal<string>("")
  const [activePresetId, selectPreset] = createSignal<string | undefined>(
    undefined
  )
  const [presets, setPresets] = createSignal<Preset[]>([])
  const [sweepSetting, setSweepSetting] = createSignal<Record<string, number>>(
    {}
  )
  const [pedalsOn, setPedalsOn] = createSignal<string[]>([])
  const [secondaryCircuitsOn, setSecondaryCircuitsOn] = createSignal<string[]>(
    []
  )

  const [isPlaying, setIsPlaying] = createSignal(false)

  const [activePedals, setActivePedals] = createSignal<string[]>([])

  const [isBackingTrackMuted, setIsBackingTrackMuted] = createSignal(false)

  const [isLoading, setIsLoading] = createSignal(false)

  const [widthTab, setWidthTab] = createSignal<Record<string, number>>({})

  const [maxHeight, setMaxHeight] = createSignal(0)

  const setIsLoadingDebounced = debounce({ delay: 200 }, setIsLoading)

  const activePreset = createMemo(() =>
    presets().find((preset) => preset.id === activePresetId())
  )

  const selectSweepSetting = (id: string, value: number) => {
    if (
      !activePreset()?.isSweep &&
      !activePreset()?.chain?.some((p) => p.isSweep)
    )
      return

    const values =
      activePreset()?.values ||
      activePreset()?.chain?.find((p) => p.isSweep)?.values ||
      []

    const closestValue = findClosestValue(value, values)

    if (closestValue === sweepSetting()[id]) return

    setSweepSetting({ [id]: closestValue })
  }

  const toggleBypass = (pedalSlug: string) => {
    const pedals = pedalsOn()

    if (pedals.includes(pedalSlug)) {
      setPedalsOn(pedals.filter((id) => id !== pedalSlug))
    } else {
      setPedalsOn([...pedals, pedalSlug])
    }
  }

  const toggleSecondaryCircuit = (circuitId: string) => {
    const circuits = secondaryCircuitsOn()

    if (circuits.includes(circuitId)) {
      setSecondaryCircuitsOn(circuits.filter((id) => id !== circuitId))
    } else {
      setSecondaryCircuitsOn([...circuits, circuitId])
    }
  }

  const getSetting = (
    pedalSlug: string,
    id?: string,
    dependency?: ControlElement["dependency"]
  ): SettingsValue | undefined => {
    if (!id) return

    if (!activePedals().includes(pedalSlug)) return

    const slug = pedalSlug

    return (
      sweepSetting()?.[id] ??
      activePreset()?.chain?.find((chainItem) => chainItem.pedalSlug === slug)
        ?.settings?.[id] ??
      activePreset()?.comparison?.find(
        (compItem) => compItem.pedalSlug === slug
      )?.settings?.[id] ??
      activePreset()?.settings?.[id] ??
      dependency?.values?.find(
        ({ sourceValue }) => sourceValue === getSetting(dependency.source, slug)
      )?.targetValue
    )
  }

  createEffect(() => {
    setPedalsOn(activePedals())
  })

  createEffect(() => {
    if (!activePreset()?.isSweep) {
      setSweepSetting({})
    }
    setSecondaryCircuitsOn(activePreset()?.initialSecondaryCircuits || [])

    if (activePreset()?.comparison) return
    setActivePedals(
      activePreset()?.chain?.map((chainElement) => chainElement.pedalSlug) || [
        mainPedal(),
      ]
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
    setPedalsOn,
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
    widthTab,
    setWidthTab,
    maxHeight,
    setMaxHeight,
    setIsLoading: setIsLoadingDebounced,
  }
}

export const demoState = createRoot(createDemoState)
