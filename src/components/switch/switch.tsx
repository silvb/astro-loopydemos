import type { CBASwitchSate, SwitchState, Switch as SwitchType } from "@types"
import { ToggleSwitch } from "./toggle-switch"
import { Match, Switch as RenderSwitch, type Component } from "solid-js"
import { demoState } from "@components/demo-widget/demo-state-store"
import { ThreewaySwitch } from "./threeway-switch"
import { RockerSwitch } from "./rocker-switch"
import { PushButton } from "./push-button"
import { SlideSwitch } from "./slide-switch"
import { CBADipSwitches } from "./cba-dip-switches"

type SwitchProps = Pick<
  SwitchType,
  | "size"
  | "orientation"
  | "type"
  | "isMomentary"
  | "secondaryCircuitId"
  | "id"
  | "colors"
>

export const Switch: Component<SwitchProps> = (props) => {
  const { activePreset } = demoState

  const state = () => (activePreset()?.settings?.[props.id] || 1) as SwitchState

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
        <CBADipSwitches state={state() as CBASwitchSate} />
      </Match>
    </RenderSwitch>
  )
}
