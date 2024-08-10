import type { CBASwitchSate, SwitchState, Switch as SwitchType } from "@types"
import { ToggleSwitch } from "./toggle-switch"
import {
  Match,
  Switch as RenderSwitch,
  Show,
  type Component,
  type JSXElement,
} from "solid-js"
import { demoState } from "@components/demo-widget/demo-state-store"
import { ThreewaySwitch } from "./threeway-switch"
import { RockerSwitch } from "./rocker-switch"
import { PushButton } from "./push-button"
import { SlideSwitch } from "./slide-switch"
import { CBADipSwitches } from "./cba-dip-switches"
import { StompSwitch } from "./stomp-switch"

interface SwitchProps extends SwitchType {
  pedalSlug: string
  "sweep-indicator"?: JSXElement
  "momentary-indicator"?: JSXElement
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
  } = demoState

  const state = () =>
    (getSetting(props.pedalSlug, props.id) ?? 1) as SwitchState

  return (
    <Show when={activePedals().includes(props.pedalSlug)}>
      <Show when={isSweepTarget(props.id, props.pedalSlug)}>
        {props["sweep-indicator"]}
        <button
          class="absolute left-0 top-0 z-10 h-full w-full"
          style={{ width: `${props.size}px`, height: `${props.size}px` }}
          onClick={() => {
            const numSweepValues = activePreset()?.values?.length ?? 0
            const currIndex =
              activePreset()?.values?.findIndex(value => value === state()) ?? 0

            const nextIndex = (currIndex + 1) % numSweepValues
            selectSweepSetting(
              props.id,
              activePreset()?.values?.[nextIndex] ?? 1
            )
          }}
        ></button>
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
          <PushButton size={props.size} state={state()} />
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
                  compPreset => compPreset.pedalSlug === props.pedalSlug
                )?.secondaryCircuitId,
                activePreset()?.chain?.find(
                  chainItem => chainItem.pedalSlug === props.pedalSlug
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
                  secondaryCircuitsOn().includes(props.secondaryCircuitId)
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
              {props["sweep-indicator"]}
            </Show>
            <Show
              when={
                props.isMomentary &&
                props.secondaryCircuitId &&
                secondaryCircuitsOn().includes(props.secondaryCircuitId)
              }
            >
              {props["momentary-indicator"]}
            </Show>
          </Show>
        </Match>
      </RenderSwitch>
    </Show>
  )
}
