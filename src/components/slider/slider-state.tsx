import { demoState } from "@components/demo-widget/demo-state-store"
import { throttle } from "radash"
import { type Component, type JSX } from "solid-js"

interface SliderStateProps {
  id: string
  pedalSlug: string
  size: {
    width: number
    height: number
    innerWidth: number
    innerHeight: number
  }
  color: string
  tilt?: number
  "fader-face"?: JSX.Element
}

export const SliderState: Component<SliderStateProps> = props => {
  const { selectSweepSetting, getSetting, isSweepTarget } = demoState

  const faderId = `fader-${props.id}-${props.pedalSlug}`

  const handlePosition = () => {
    const position = (getSetting(props.pedalSlug, props.id) as number) * 10
    return Math.min(95, Math.max(5, position))
  }

  const startMouseDrag = (downEvent: MouseEvent) => {
    if (!isSweepTarget(props.id, props.pedalSlug)) return
    downEvent.preventDefault()

    const boundindRect = document
      ?.getElementById(faderId)
      ?.getBoundingClientRect()

    if (!boundindRect) return
    const { left: rectLeft, width } = boundindRect

    const moveValue = ((downEvent.clientX - rectLeft) / width) * 10
    selectSweepSetting(props.id, moveValue)

    const handleDrag = (moveEvent: typeof downEvent) => {
      moveEvent.preventDefault()

      const moveValue = ((moveEvent.clientX - rectLeft) / width) * 10
      selectSweepSetting(props.id, moveValue)
    }

    const throttledHandleDrag = throttle({ interval: 100 }, handleDrag)

    document.addEventListener("mousemove", throttledHandleDrag)
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", throttledHandleDrag)
    })
  }

  const startTouchDrag = (downEvent: TouchEvent) => {
    if (!isSweepTarget(props.id, props.pedalSlug)) return
    downEvent.preventDefault()

    const boundindRect = document
      ?.getElementById(faderId)
      ?.getBoundingClientRect()

    if (!boundindRect) return
    const { left: rectLeft, width } = boundindRect

    const moveValue = ((downEvent.touches[0].clientX - rectLeft) / width) * 10
    selectSweepSetting(props.id, moveValue)

    const handleDrag = (moveEvent: typeof downEvent) => {
      moveEvent.preventDefault()

      const moveValue = ((moveEvent.touches[0].clientX - rectLeft) / width) * 10
      selectSweepSetting(props.id, moveValue)
    }

    const throttledHandleDrag = throttle({ interval: 100 }, handleDrag)

    document.addEventListener("touchmove", throttledHandleDrag)
    document.addEventListener("touchend", () => {
      document.removeEventListener("touchmove", throttledHandleDrag)
    })
  }

  return (
    <div
      id={props.id}
      class="center flex touch-none place-items-center rounded-md"
      style={{
        width: `${props.size.width}px`,
        height: `${props.size.height}px`,
        "background-color": props.color,
        transform: `rotate(${props.tilt}deg)`,
      }}
      onMouseDown={startMouseDrag}
      onTouchStart={startTouchDrag}
    >
      <div
        id={faderId}
        class="relative rounded-2xl bg-black"
        classList={{
          "border-2 border-dashed border-loopydemos-highlight-secondary-themed":
            isSweepTarget(props.id, props.pedalSlug),
        }}
        style={{
          width: `${props.size.innerWidth}px`,
          height: `${props.size.innerHeight}px`,
        }}
      >
        <div
          style={{
            width: `${props.size.height * 1.5}px`,
            height: `${props.size.height}px`,
            left: `${handlePosition()}%`,
          }}
          class="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center transition-[left]"
        >
          {props["fader-face"]}
        </div>
      </div>
    </div>
  )
}
