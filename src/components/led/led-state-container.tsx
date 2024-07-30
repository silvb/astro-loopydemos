import { demoState } from "@components/demo-widget/demo-state-store"
import type { Led } from "@types"
import { Show, type Component, type JSX } from "solid-js"

interface LedStateContainerProps
  extends Pick<
    Led,
    | "id"
    | "secondaryCircuitId"
    | "isBlinking"
    | "type"
    | "isOnIndicator"
    | "blinkOffset"
    | "defaultTime"
    | "offOverride"
    | "dependency"
  > {
  pedalId: string
  "led-on"?: JSX.Element
  "led-off"?: JSX.Element
}

export const LedStateContainer: Component<LedStateContainerProps> = (props) => {
  const { pedalsOn, getSetting, secondaryCircuitsOn } = demoState

  const setting = () => getSetting(props.id, props.pedalId, props.dependency)

  const isOn = () =>
    ((props.id === "on_led" || props.isOnIndicator) &&
      pedalsOn().includes(props.pedalId) &&
      setting() !== false) ||
    setting() ||
    (props.secondaryCircuitId &&
      secondaryCircuitsOn().includes(props.secondaryCircuitId)) ||
    (props.isBlinking && !props.offOverride)

  const blinkTime = () => (setting() || props.defaultTime) ?? 0

  const containerClass = props.isBlinking
    ? props.type === "mood"
      ? "blinking-led mood-blink"
      : "blinking-led"
    : ""

  console.log({
    isBlinking: props.isBlinking,
    type: props.type,
    containerClass,
  })

  return (
    <div
      class={containerClass}
      style={{
        "--blinkTime": `${blinkTime() ?? 0}ms`,
        "--blinkOffset": `${props.blinkOffset ?? 0}ms`,
      }}
    >
      <Show when={isOn()} fallback={props["led-off"]}>
        {props["led-on"]}
      </Show>
    </div>
  )
}
