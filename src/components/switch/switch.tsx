import type { SwitchState, Switch as SwitchType } from "@types"
import { ToggleSwitch } from "./toggle-switch"
import { Match, Switch as RenderSwitch, type Component } from "solid-js"
import { demoState } from "@components/demo-widget/demo-state-store"
import { ThreewaySwitch } from "./threeway-switch"
import { RockerSwitch } from "./rocker-switch"

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
    </RenderSwitch>
  )
}
