import { demoState } from "@components/demo-widget/demo-state-store"
import { type ParentComponent, createEffect, createSignal } from "solid-js"
import { throttle } from "radash"

interface DragSweepControlProps {
  id: string
}

const getNextLevel = (startLevel: number, startY: number, clientY: number) => {
  let nextLevel = startLevel + (startY - clientY) / 12
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

  const startMouseDrag = (downEvent: MouseEvent) => {
    downEvent.preventDefault()

    const startY = downEvent.clientY
    const startLevel = level()

    const handleDrag = (moveEvent: typeof downEvent) => {
      moveEvent.preventDefault()
      setLevel(getNextLevel(startLevel, startY, moveEvent.clientY))
    }

    const throttledHandleDrag = throttle({ interval: 100 }, handleDrag)

    document.addEventListener("mousemove", throttledHandleDrag)
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", throttledHandleDrag)
    })
  }

  const startTouchDrag = (downEvent: TouchEvent) => {
    downEvent.preventDefault()

    const startY = downEvent.touches[0].clientY
    const startLevel = level()

    const handleDrag = (moveEvent: typeof downEvent) => {
      moveEvent.preventDefault()
      setLevel(getNextLevel(startLevel, startY, moveEvent.touches[0].clientY))
    }

    const throttledHandleDrag = throttle({ interval: 100 }, handleDrag)

    document.addEventListener("touchmove", throttledHandleDrag)
    document.addEventListener("touchend", () => {
      document.removeEventListener("touchmove", throttledHandleDrag)
    })
  }

  return (
    <div
      class="relative touch-none"
      onMouseDown={startMouseDrag}
      onTouchStart={startTouchDrag}
    >
      {props.children}
    </div>
  )
}
