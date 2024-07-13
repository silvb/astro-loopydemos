import { $activePreset } from "@components/demo-widget/demo-state-store"
import { useStore } from "@nanostores/solid"
import { cva } from "class-variance-authority"
import { createEffect, type ParentComponent } from "solid-js"

interface KnobStateContainerProps {
  id: string
  isRotary?: boolean
  rotaryAngles?: number[]
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
  const activePreset = useStore($activePreset)

  const level = () => (activePreset()?.settings?.[props.id] as number) || 5

  const isSweepTarget = () =>
    activePreset()?.isSweep && activePreset()?.target === props.id

  return (
    <div
      class={containerClass({
        transition: !Boolean(props.isRotary) && !isSweepTarget(),
      })}
      style={{
        transform: `rotate(${props.isRotary ? props.rotaryAngles?.[level() - 1] : 30 * level() - 150}deg)`,
      }}
    >
      {props.children}
    </div>
  )
}
