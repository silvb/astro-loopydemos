import { createEffect, createResource, type ParentComponent } from "solid-js"
import { demoState } from "../demo-state-store"
import { getImageFromSlug } from "@utils/get-image-from-slug"

interface PedalStateContainerProps {
  slug: string
}

export const PedalStateContainer: ParentComponent<PedalStateContainerProps> = (
  props
) => {
  const { activePedals } = demoState

  const orderIndex = () => activePedals().indexOf(props.slug)

  const [imageSrc] = createResource(props.slug, getImageFromSlug)

  createEffect(() => {
    console.log({ imageSrc: imageSrc() })
  })

  return (
    <div
      class={activePedals().includes(props.slug) ? "" : "hidden"}
      style={{ order: orderIndex() }}
    >
      {props.children}
    </div>
  )
}
