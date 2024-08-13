import { demoState } from "@components/demo-widget/demo-state-store"
import { type ParentComponent, createEffect, createSignal } from "solid-js"
import { throttle } from "radash"

interface DragSweepControlProps {
  id: string
}

const getNextLevel = (startLevel: number, startY: number, clientY: number) => {
  let nextLevel = startLevel + (startY - clientY) / 6
  nextLevel = Math.min(10, nextLevel)
  nextLevel = Math.max(0, nextLevel)
  return nextLevel
}

export const DragSweepControl: ParentComponent<
  DragSweepControlProps
> = props => {
  const { activePreset, sweepSetting, selectSweepSetting } = demoState
  const [level, setLevel] = createSignal(
    (sweepSetting()[props.id] ||
      activePreset()?.initialValue ||
      activePreset()?.chain?.find(p => p.isSweep)?.initialValue) ??
      0
  )

  createEffect(() => {
    selectSweepSetting(props.id, level())
  })

  const startDrag = (downEvent: MouseEvent | TouchEvent) => {
    downEvent.preventDefault()

    const startY =
      downEvent instanceof MouseEvent
        ? downEvent.clientY
        : downEvent.touches[0].clientY
    const startLevel = level()

    const handleDrag = (moveEvent: typeof downEvent) => {
      moveEvent.preventDefault()
      const moveY =
        moveEvent instanceof MouseEvent
          ? moveEvent.clientY
          : moveEvent.touches[0].clientY
      setLevel(getNextLevel(startLevel, startY, moveY))
    }

    const throttledHandleDrag = throttle({ interval: 100 }, handleDrag)

    if (downEvent instanceof MouseEvent) {
      document.addEventListener("mousemove", throttledHandleDrag)
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", throttledHandleDrag)
      })
    } else {
      document.addEventListener("touchmove", throttledHandleDrag)
      document.addEventListener("touchend", () => {
        document.removeEventListener("touchmove", throttledHandleDrag)
      })
    }
  }

  return (
    <div
      class="relative touch-none"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      {props.children}
    </div>
  )
}
