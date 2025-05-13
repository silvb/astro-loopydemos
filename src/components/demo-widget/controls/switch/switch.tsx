import { useDemoState } from "@components/demo-widget/demo-state-store"
import type { CBASwitchSate, SwitchState, Switch as SwitchType } from "@types"
import { type Component, Match, Switch as RenderSwitch, Show } from "solid-js"
import { MomentaryIndicator } from "../momentary-indicator"
import { SweepIndicator } from "../sweep-indicator"
import { CBADipSwitches } from "./cba-dip-switches"
import { PushButton } from "./push-button"
import { RockerSwitch } from "./rocker-switch"
import { SlideSwitch } from "./slide-switch"
import { StompSwitch } from "./stomp-switch"
import { ThreewaySwitch } from "./threeway-switch"
import { ToggleSwitch } from "./toggle-switch"

interface SwitchProps extends SwitchType {
  pedalSlug: string
}

export const Switch: Component<SwitchProps> = props => {
  const {
    getSetting,
    toggleBypass,
    toggleSecondaryCircuit,
    secondaryCircuitsOn,
    activePreset,
    activePedals,
    isSweepTarget,
    selectSweepSetting,
  } = useDemoState()

  const state = () =>
    (getSetting(props.pedalSlug, props.id) ?? 1) as SwitchState

  return (
    <Show when={activePedals().includes(props.pedalSlug)}>
      <Show when={isSweepTarget(props.id, props.pedalSlug)}>
        <SweepIndicator size={props.size} color={props.highlightColor} />
        <button
          type="button"
          class="absolute top-0 left-0 z-10 h-full w-full"
          style={{ width: `${props.size}px`, height: `${props.size}px` }}
          onClick={() => {
            const numSweepValues = activePreset()?.values?.length ?? 0
            const currIndex =
              activePreset()?.values?.findIndex(value => value === state()) ?? 0

            const nextIndex = (currIndex + 1) % numSweepValues
            selectSweepSetting(
              props.id,
              activePreset()?.values?.[nextIndex] ?? 1,
            )
          }}
        />
      </Show>
      <RenderSwitch>
        <Match when={props.type === "toggle"}>
          <ToggleSwitch
            size={props.size}
            orientation={props.orientation}
            state={state()}
          />
        </Match>
        <Match when={props.type === "threeway"}>
          <ThreewaySwitch
            size={props.size}
            orientation={props.orientation}
            colors={props.colors}
            state={state()}
          />
        </Match>
        <Match when={props.type === "rocker"}>
          <RockerSwitch
            size={props.size}
            orientation={props.orientation}
            colors={props.colors}
            state={state()}
          />
        </Match>
        <Match when={props.type === "pushbutton"}>
          <PushButton size={props.size} colors={props.colors} state={state()} />
        </Match>
        <Match when={props.type === "slide"}>
          <SlideSwitch
            size={props.size}
            orientation={props.orientation}
            state={state()}
          />
        </Match>
        <Match when={props.type === "cba"}>
          <CBADipSwitches state={state() as unknown as CBASwitchSate} />
        </Match>
        <Match when={props.type === "stomp"}>
          <Show
            when={
              !props.secondaryCircuitId ||
              [
                activePreset()?.secondaryCircuitId,
                activePreset()?.comparison?.find(
                  compPreset => compPreset.pedalSlug === props.pedalSlug,
                )?.secondaryCircuitId,
                activePreset()?.chain?.find(
                  chainItem => chainItem.pedalSlug === props.pedalSlug,
                )?.secondaryCircuitId,
              ].includes(props.secondaryCircuitId)
            }
          >
            <StompSwitch
              id={props.id}
              isDark={props.variant === "dark"}
              size={props.size}
              aria-label="pedal bypass switch"
              pedalSlug={props.pedalSlug}
              secondaryCircuitId={props.secondaryCircuitId}
              isMomentary={props.isMomentary}
              isOn={Boolean(
                props.secondaryCircuitId &&
                  secondaryCircuitsOn().includes(props.secondaryCircuitId),
              )}
              onClick={() => {
                if (props.id === "bypass_switch") {
                  toggleBypass(props.pedalSlug)
                }
                if (props.secondaryCircuitId) {
                  toggleSecondaryCircuit(props.secondaryCircuitId)
                }
              }}
            />
            <Show
              when={
                props.secondaryCircuitId &&
                !secondaryCircuitsOn().includes(props.secondaryCircuitId)
              }
            >
              <SweepIndicator size={props.size} color={props.highlightColor} />
            </Show>
            <Show
              when={
                props.isMomentary &&
                props.secondaryCircuitId &&
                secondaryCircuitsOn().includes(props.secondaryCircuitId)
              }
            >
              <MomentaryIndicator size={props.size} />
            </Show>
          </Show>
        </Match>
      </RenderSwitch>
    </Show>
  )
}
