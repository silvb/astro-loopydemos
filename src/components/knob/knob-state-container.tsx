import { demoState } from "@components/demo-widget/demo-state-store"
import { cva } from "class-variance-authority"
import { Show, type ParentComponent, type JSXElement } from "solid-js"
import { DragSweepControl } from "./drag-sweep-control"

interface KnobStateContainerProps {
  id: string
  isRotary?: boolean
  size: number
  rotaryAngles?: number[]
  "sweep-indicator"?: JSXElement
  pedalSlug: string
}

const containerClass = cva("relative origin-center", {
  variants: {
    transition: {
      true: "transition-transform ease-in duration-200",
      false: "transition-none",
    },
  },
})

export const KnobStateContainer: ParentComponent<
  KnobStateContainerProps
> = props => {
  const { getSetting, activePedals, isSweepTarget } = demoState

  const level = () => (getSetting(props.pedalSlug, props.id) as number) ?? 5

  return (
    <Show when={activePedals().includes(props.pedalSlug)}>
      <div
        class={containerClass({
          transition:
            !Boolean(props.isRotary) &&
            !isSweepTarget(props.id, props.pedalSlug),
        })}
        style={{
          transform: `rotate(${props.isRotary ? props.rotaryAngles?.[level() - 1] : 30 * level() - 150}deg)`,
        }}
      >
        <Show
          when={isSweepTarget(props.id, props.pedalSlug)}
          fallback={props.children}
        >
          <DragSweepControl id={props.id}>
            {props["sweep-indicator"]}
            {props.children}
          </DragSweepControl>
        </Show>
      </div>
    </Show>
  )
}
