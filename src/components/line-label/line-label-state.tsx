import { demoState } from "@components/demo-widget/demo-state-store"
import type { ControlElement } from "@types"
import { createEffect, Show, type ParentComponent } from "solid-js"

interface LineLabelStateProps {
  id: string
  pedalSlug: string
  dependency?: ControlElement["dependency"]
}

export const LineLabelState: ParentComponent<LineLabelStateProps> = props => {
  const { getSetting, activePreset } = demoState

  const setting = () =>
    getSetting(props.pedalSlug, props.id, props.dependency) as string

  createEffect(() => {
    const textElement = document.getElementById(`line-label-${props.id}`)

    if (textElement) textElement.textContent = setting()
  })

  return (
    <div class={setting() && !activePreset()?.noLabels ? "" : "hidden"}>
      {props.children}
    </div>
  )
}
