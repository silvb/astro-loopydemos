import { createEffect, type Component, type JSX, createSignal } from "solid-js"

interface StompSwitchProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  id?: string
  size: number
  isDisabled?: boolean
  isDark?: boolean
  isMomentary?: boolean
  isOn?: boolean
  "momentary-indicator"?: JSX.Element
  pedalSlug: string
  secondaryCircuitId?: string
}

export const StompSwitch: Component<StompSwitchProps> = (props) => {
  const [isDown, setIsDown] = createSignal(false)

  createEffect(() => {
    if (props.isMomentary) {
      setIsDown(props.isOn ?? false)
    }
  })

  const uniqueStompId = [
    props.id,
    props.pedalSlug,
    props.secondaryCircuitId,
  ].join("-")

  return (
    <button
      type="button"
      onClick={() => {
        if (!props.isDisabled) props.onClick()
      }}
      id={props.id}
      class="relative m-0"
      style={{
        cursor: props.isDisabled ? "not-allowed" : "pointer",
      }}
      onMouseDown={() => {
        if (!props.isDisabled && !props.isMomentary) setIsDown(true)
      }}
      onTouchStart={() => {
        if (!props.isDisabled && !props.isMomentary) setIsDown(true)
      }}
      onMouseUp={() => {
        if (!props.isDisabled && !props.isMomentary) setIsDown(false)
      }}
      onTouchEnd={() => {
        if (!props.isDisabled && !props.isMomentary) setIsDown(false)
      }}
      aria-label={props["aria-label"]}
    >
      {props.isMomentary && props.isOn && props["momentary-indicator"]}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 52 52"
        opacity={props.isDisabled ? 0 : 1}
        class="pointer-events-none select-none"
      >
        <defs>
          <radialGradient id={`${uniqueStompId}-gradient1`}>
            <stop
              offset="0%"
              stop-color={props.isDark ? "#666" : "aliceblue"}
            />
            <stop
              offset="70%"
              stop-color={props.isDark ? "#666" : "aliceblue"}
            />
            <stop
              offset="95%"
              stop-color={props.isDark ? "#222" : "lightslategray"}
            />
          </radialGradient>
          <radialGradient id={`${uniqueStompId}-gradient2`}>
            <stop
              offset="0%"
              stop-color={props.isDark ? "#666" : "aliceblue"}
            />
            <stop
              offset="80%"
              stop-color={props.isDark ? "#666" : "aliceblue"}
            />
            <stop
              offset="100%"
              stop-color={props.isDark ? "#222" : "#a3bbd2"}
            />
          </radialGradient>
        </defs>
        <g fill="none">
          <circle
            cx="26"
            cy="26"
            r="26"
            fill={`url(#${uniqueStompId}-gradient1)`}
          />
          <polygon
            fill={`url(#${uniqueStompId}-gradient1)`}
            stroke={props.isDark ? "#555" : "slategray"}
            points="32 8 52.785 20 52.785 44 32 56 11.215 44 11.215 20"
            transform="rotate(90 32 32) translate(-6, 6)"
          />
          <circle
            cx="26"
            cy={`${isDown() ? 27 : 26}`}
            r={`${isDown() ? 15 : 16}`}
            fill={props.isDark ? "black" : "slategray"}
          />
          <circle
            cx="26"
            cy={`${isDown() ? 26 : 24}`}
            r={`${isDown() ? 15 : 16}`}
            fill={`url(#${uniqueStompId}-gradient2)`}
          />
        </g>
      </svg>
    </button>
  )
}
