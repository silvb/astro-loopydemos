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

  return (
    <div
      class={activePedals().includes(props.slug) ? "" : "hidden"}
      style={{ order: orderIndex() }}
    >
      {props.children}
    </div>
  )
}
