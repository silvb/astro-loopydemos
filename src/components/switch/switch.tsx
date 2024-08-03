import type { CBASwitchSate, SwitchState, Switch as SwitchType } from "@types"
import { ToggleSwitch } from "./toggle-switch"
import { Match, Switch as RenderSwitch, Show, type Component } from "solid-js"
import { demoState } from "@components/demo-widget/demo-state-store"
import { ThreewaySwitch } from "./threeway-switch"
import { RockerSwitch } from "./rocker-switch"
import { PushButton } from "./push-button"
import { SlideSwitch } from "./slide-switch"
import { CBADipSwitches } from "./cba-dip-switches"
import { StompSwitch } from "./stomp-switch"

interface SwitchProps extends SwitchType {
  pedalSlug: string
}

export const Switch: Component<SwitchProps> = (props) => {
  const {
    getSetting,
    toggleBypass,
    toggleSecondaryCircuit,
    activePreset,
    activePedals,
  } = demoState

  const state = () =>
    (getSetting(props.pedalSlug, props.id) ?? 1) as SwitchState

  return (
    <Show when={activePedals().includes(props.pedalSlug)}>
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
                  (compPreset) => compPreset.pedalSlug === props.pedalSlug
                )?.secondaryCircuitId,
                activePreset()?.chain?.find(
                  (chainItem) => chainItem.pedalSlug === props.pedalSlug
                )?.secondaryCircuitId,
              ].includes(props.secondaryCircuitId)
            }
          >
            <StompSwitch
              id={props.id}
              isDark={props.variant === "dark"}
              isMomentary={props.isMomentary}
              size={props.size}
              aria-label="pedal bypass switch"
              pedalSlug={props.pedalSlug}
              secondaryCircuitId={props.secondaryCircuitId}
              onClick={() => {
                if (props.id === "bypass_switch") {
                  toggleBypass(props.pedalSlug)
                }
                if (props.secondaryCircuitId) {
                  toggleSecondaryCircuit(props.secondaryCircuitId)
                }
              }}
            />
          </Show>
        </Match>
      </RenderSwitch>
    </Show>
  )
}
