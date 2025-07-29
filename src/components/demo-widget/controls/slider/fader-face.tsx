import { type Component, Match, mergeProps, Switch } from "solid-js"

interface FaderFaceProps {
  size?: number
  tickColor?: string
  faceColor?: string
  type?: "walrus" | "simple"
}

export const FaderFace: Component<FaderFaceProps> = props => {
  const mergedProps = mergeProps(
    { size: 64, tickColor: "#d0c6ac", faceColor: "#4d4d4d", type: "walrus" },
    props,
  )

  return (
    <Switch>
      <Match when={mergedProps.type === "walrus"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={mergedProps.size * 1.5}
          height={mergedProps.size}
          viewBox="0 0 96 64"
        >
          <title>Fader Face</title>
          <g fill="none">
            <rect
              x={0}
              y={0}
              fill="#515153"
              height={64}
              width={96}
              rx={4}
              ry={4}
            />
            <polygon
              points="30,40 64,40 93,61 3,61"
              fill="#2e2b29"
              stroke-linejoin="round"
              stroke-width="4"
              stroke="#2e2b29"
            />
            <polygon
              points="30,20 64,20 93,3 3,3"
              fill="#423d39"
              stroke-linejoin="round"
              stroke-width="4"
              stroke="#423d39"
            />
            <rect
              x={44}
              y={20}
              width={8}
              height={44}
              fill={mergedProps.tickColor}
              rx="2"
            />
          </g>
        </svg>
      </Match>
      <Match when={mergedProps.type === "simple"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={mergedProps.size * 1.5}
          height={mergedProps.size}
          viewBox="0 0 96 64"
        >
          <title>Fader Face</title>
          <g fill="none">
            <rect
              x={16}
              y={0}
              fill={mergedProps.faceColor}
              height={64}
              width={64}
              rx={4}
              ry={4}
              style={{ filter: "brightness(0.6)" }}
            />
            <polygon
              points="30,58 64,58 78,63 17,63"
              fill={mergedProps.faceColor}
              stroke-linejoin="round"
              stroke-width="4"
              stroke={mergedProps.faceColor}
            />
            <polygon
              points="30,6 64,6 78,1 17,1"
              fill={mergedProps.faceColor}
              stroke-linejoin="round"
              stroke-width="4"
              stroke={mergedProps.faceColor}
            />
            <rect
              x={28}
              y={0}
              width={40}
              height={64}
              fill={mergedProps.faceColor}
              rx="2"
            />
            <rect
              x={44}
              y={0}
              width={8}
              height={64}
              fill={mergedProps.tickColor}
              rx="2"
            />
          </g>
        </svg>
      </Match>
    </Switch>
  )
}
