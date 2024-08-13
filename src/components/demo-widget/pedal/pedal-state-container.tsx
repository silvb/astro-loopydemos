import { createEffect, type ParentComponent } from "solid-js"
import { useDemoState } from "../demo-state-store"

interface PedalStateContainerProps {
  slug: string
  enclosureWidth: number
}

export const PedalStateContainer: ParentComponent<
  PedalStateContainerProps
> = props => {
  const { activePedals, setWidthTab } = useDemoState()

  const orderIndex = () => activePedals().indexOf(props.slug)
  const isHidden = () => !activePedals().includes(props.slug)
  const isVisibleWithOthers = () => activePedals().length > 1 && !isHidden()

  createEffect(() => {
    setWidthTab(prev => ({ ...prev, [props.slug]: props.enclosureWidth }))
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
