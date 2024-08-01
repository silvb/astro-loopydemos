import { type ParentComponent } from "solid-js"
import { demoState } from "../demo-state-store"

interface PedalStateContainerProps {
  slug: string
}

export const PedalStateContainer: ParentComponent<PedalStateContainerProps> = (
  props
) => {
  const { activePedals } = demoState

  const orderIndex = () => activePedals().indexOf(props.slug)
  const isHidden = () => !activePedals().includes(props.slug)
  const isVisibleWithOthers = () => activePedals().length > 1 && !isHidden()

  return (
    <div
      class={isHidden() ? "hidden" : isVisibleWithOthers() ? "self-end" : ""}
      style={{ order: orderIndex() }}
    >
      {props.children}
    </div>
  )
}
