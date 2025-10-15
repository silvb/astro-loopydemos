import { useDemoState } from "@components/demo-widget/demo-state-store"
import { createMemo, type ParentComponent, Show } from "solid-js"
import { SweepIndicator } from "../sweep-indicator"
import { DragSweepControl } from "./drag-sweep-control"

interface KnobStateContainerProps {
  id: string
  isRotary?: boolean
  size: number
  highlightColor?: "primary" | "secondary" | "tertiary"
  rotaryAngles?: number[]
  pedalSlug: string
}

export const KnobStateContainer: ParentComponent<
  KnobStateContainerProps
> = props => {
  const { getSetting, activePedals, isSweepTarget } = useDemoState()

  // Memoize computations to prevent excessive re-evaluation
  const level = createMemo(
    () => (getSetting(props.pedalSlug, props.id) as number) ?? 5,
  )
  const isActive = createMemo(() => activePedals().includes(props.pedalSlug))
  const isSweepTargetMemo = createMemo(() =>
    isSweepTarget(props.id, props.pedalSlug),
  )

  return (
    <Show when={isActive()}>
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
        <Show when={isSweepTargetMemo()} fallback={props.children}>
          <DragSweepControl id={props.id} size={props.size}>
            <SweepIndicator color={props.highlightColor} size={props.size} />
            {props.children}
          </DragSweepControl>
        </Show>
      </div>
    </Show>
  )
}
