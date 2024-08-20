import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  type ParentComponent,
} from "solid-js"
import { useDemoState } from "./demo-state-store"

export const ScaleFactor: ParentComponent = props => {
  const { activePedals, widthTab } = useDemoState()
  const [containerWidth, setContainerWidth] = createSignal(window.innerWidth)
  const [scale, setScale] = createSignal(1)
  let containerElement!: HTMLDivElement

  const handleResize = () => {
    setContainerWidth(containerElement.offsetWidth ?? 0)
  }

  createEffect(() => {
    const currentCompoundWidth = activePedals().reduce(
      (acc, curr) => acc + (widthTab()[curr] ?? 0),
      0
    )

    setScale(Math.min(1, containerWidth() / currentCompoundWidth))
  })

  onMount(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
  })

  onCleanup(() => {
    window.removeEventListener("resize", handleResize)
  })

  return (
    <div ref={containerElement} style={{ transform: `scale(${scale()})` }}>
      {props.children}
    </div>
  )
}
