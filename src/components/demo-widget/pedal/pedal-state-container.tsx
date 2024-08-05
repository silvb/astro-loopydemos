import { createEffect, type ParentComponent } from "solid-js"
import { demoState } from "../demo-state-store"

interface PedalStateContainerProps {
  slug: string
  enclosureWidth: number
  enclosureHeight: number
}

export const PedalStateContainer: ParentComponent<PedalStateContainerProps> = (
  props
) => {
  const { activePedals, setWidthTab, setMaxHeight } = demoState

  const orderIndex = () => activePedals().indexOf(props.slug)
  const isHidden = () => !activePedals().includes(props.slug)
  const isVisibleWithOthers = () => activePedals().length > 1 && !isHidden()

  createEffect(() => {
    setWidthTab((prev) => ({ ...prev, [props.slug]: props.enclosureWidth }))
    setMaxHeight((prev) => Math.max(prev, props.enclosureHeight))
  })

  return (
    <div
      class={isHidden() ? "hidden" : isVisibleWithOthers() ? "self-end" : ""}
      style={{ order: orderIndex() }}
    >
      {props.children}
    </div>
  )
}
