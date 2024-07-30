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
}

const containerClass = cva("relative origin-center", {
  variants: {
    transition: {
      true: "transition-transform ease-in duration-200",
      false: "transition-none",
    },
  },
})

export const KnobStateContainer: ParentComponent<KnobStateContainerProps> = (
  props
) => {
  const { activePreset, getSetting } = demoState

  const isSweepTarget = () =>
    activePreset()?.isSweep && activePreset()?.target === props.id

  const level = () => (getSetting(props.id) as number) ?? 5

  return (
    <div
      class={containerClass({
        transition: !Boolean(props.isRotary) && !isSweepTarget(),
      })}
      style={{
        transform: `rotate(${props.isRotary ? props.rotaryAngles?.[level() - 1] : 30 * level() - 150}deg)`,
      }}
    >
      <Show when={isSweepTarget()} fallback={props.children}>
        <DragSweepControl id={props.id}>
          {props["sweep-indicator"]}
          {props.children}
        </DragSweepControl>
      </Show>
    </div>
  )
}
