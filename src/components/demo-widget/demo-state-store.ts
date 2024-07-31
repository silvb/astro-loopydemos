import type { ControlElement, Preset, SettingsValue } from "@types"
import { createSignal, createMemo, createRoot, createEffect } from "solid-js"

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

  const [activePedals, setActivePedals] = createSignal<string[]>([])

  const activePreset = createMemo(() =>
    presets().find((preset) => preset.id === activePresetId())
  )

  const selectSweepSetting = (id: string, value: number) => {
    if (!activePreset()?.isSweep) return

    const values = activePreset()?.values || []

    const closestValue = findClosestValue(value, values)

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
    id?: string,
    pedalSlug?: string,
    dependency?: ControlElement["dependency"]
  ): SettingsValue | undefined => {
    if (!id) return
    const slug = pedalSlug || mainPedal()

    return (
      sweepSetting()?.[id] ??
      activePreset()?.chain?.find((chainItem) => chainItem.pedalSlug === slug)
        ?.settings?.[id] ??
      activePreset()?.comparison?.find(
        (compItem) => compItem.pedalSlug === slug
      )?.settings?.[id] ??
      activePreset()?.settings?.[id] ??
      dependency?.values?.find(
        ({ sourceValue }) =>
          sourceValue === getSetting(dependency?.source, slug)
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
  }
}

export const demoState = createRoot(createDemoState)
