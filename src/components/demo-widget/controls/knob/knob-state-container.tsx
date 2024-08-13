import { useDemoState } from "@components/demo-widget/demo-state-store"
import { Show, type ParentComponent, type JSXElement } from "solid-js"
import { DragSweepControl } from "./drag-sweep-control"
import { SweepIndicator } from "../sweep-indicator"

interface KnobStateContainerProps {
  id: string
  isRotary?: boolean
  size: number
  highlightColor?: "primary" | "secondary" | "tertiary"
  rotaryAngles?: number[]
  "sweep-indicator"?: JSXElement
  pedalSlug: string
}

export const KnobStateContainer: ParentComponent<
  KnobStateContainerProps
> = props => {
  const { getSetting, activePedals, isSweepTarget } = useDemoState()

  const level = () => (getSetting(props.pedalSlug, props.id) as number) ?? 5

  return (
    <Show when={activePedals().includes(props.pedalSlug)}>
      <div
        class="relative origin-center"
        classList={{
          "transition-transform ease-in duration-200": !props.isRotary,
          "transition-none": props.isRotary,
        }}
        style={{
          transform: `rotate(${props.isRotary ? props.rotaryAngles?.[level() - 1] : 30 * level() - 150}deg)`,
        }}
      >
        <Show
          when={isSweepTarget(props.id, props.pedalSlug)}
          fallback={props.children}
        >
          <DragSweepControl id={props.id}>
            <SweepIndicator color={props.highlightColor} size={props.size} />
            {props.children}
          </DragSweepControl>
        </Show>
      </div>
    </Show>
  )
}
