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
  pedalId: string
}

export const Switch: Component<SwitchProps> = (props) => {
  const { getSetting, toggleBypass, toggleSecondaryCircuit, activePreset } =
    demoState

  const state = () => (getSetting(props.id, props.pedalId) ?? 1) as SwitchState

  return (
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
            props.secondaryCircuitId === activePreset()?.secondaryCircuitId
          }
        >
          <StompSwitch
            id={props.id}
            isDark={props.variant === "dark"}
            isMomentary={props.isMomentary}
            size={props.size}
            aria-label="pedal bypass switch"
            onClick={() => {
              if (props.id === "bypass_switch") {
                toggleBypass(props.pedalId)
              }
              if (props.secondaryCircuitId) {
                toggleSecondaryCircuit(props.secondaryCircuitId)
              }
            }}
          />
        </Show>
      </Match>
    </RenderSwitch>
  )
}
