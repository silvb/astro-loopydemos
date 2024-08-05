import {
  createEffect,
  createSignal,
  onMount,
  type ParentComponent,
} from "solid-js"
import { demoState } from "./demo-state-store"

export const ScaleFactor: ParentComponent = (props) => {
  const { activePedals, widthTab } = demoState
  const [containerWidth, setContainerWidth] = createSignal(window.innerWidth)
  const [scale, setScale] = createSignal(1)

  createEffect(() => {
    const currentCompoundWidth = activePedals().reduce(
      (acc, curr) => acc + (widthTab()[curr] ?? 0),
      0
    )

    setScale(Math.min(1, containerWidth() / currentCompoundWidth))
  })

  onMount(() => {
    window.addEventListener("resize", () => {
      setContainerWidth(
        document.getElementById("scale-container")?.offsetWidth ?? 0
      )
    })
  })

  return (
    <div id="scale-container" style={{ transform: `scale(${scale()})` }}>
      {props.children}
    </div>
  )
}
