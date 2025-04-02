import { type Component, type JSX, createSignal } from "solid-js"

interface StompSwitchProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  id?: string
  pedalSlug: string
  secondaryCircuitId?: string
  size: number
  isDark?: boolean
  isMomentary?: boolean
  isOn?: boolean
}

export const StompSwitch: Component<StompSwitchProps> = props => {
  const [isDown, setIsDown] = createSignal(false)

  const uniqueStompId = [
    props.id,
    props.pedalSlug,
    props.secondaryCircuitId,
  ].join("-")

  return (
    <button
      type="button"
      onClick={() => {
        props.onClick()
      }}
      id={props.id}
      class="relative m-0"
      onMouseDown={() => {
        setIsDown(props.isMomentary ? !props.isOn : true)
      }}
      onTouchStart={() => {
        setIsDown(props.isMomentary ? !props.isOn : true)
      }}
      onMouseUp={() => {
        if (!props.isMomentary) setIsDown(false)
      }}
      onTouchEnd={() => {
        if (!props.isMomentary) setIsDown(false)
      }}
      aria-label={props["aria-label"]}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 52 52"
        class="pointer-events-none select-none"
      >
        <title>{props["aria-label"]}</title>
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
