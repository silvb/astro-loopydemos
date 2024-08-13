import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  type ParentComponent,
} from "solid-js"
import { demoState } from "./demo-state-store"
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "tailwind.config.mjs"

export const ScaleFactor: ParentComponent = props => {
  const { activePedals, widthTab } = demoState
  const [containerWidth, setContainerWidth] = createSignal(window.innerWidth)
  const [scale, setScale] = createSignal(1)
  const [isMobile, setIsMobile] = createSignal(true)
  const breakpoint = resolveConfig(tailwindConfig).theme.screens.sm
  let containerElement!: HTMLDivElement

  const handleResize = () => {
    setContainerWidth(containerElement.offsetWidth ?? 0)
    setIsMobile(window.matchMedia(`(max-width: ${breakpoint})`).matches)
  }

  createEffect(() => {
    const currentCompoundWidth = activePedals().reduce(
      (acc, curr) => acc + (widthTab()[curr] ?? 0),
      0
    )

    const mobileFactor = isMobile() ? 0.75 : 1

    setScale(
      Math.min(1, containerWidth() / (currentCompoundWidth * mobileFactor))
    )
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
