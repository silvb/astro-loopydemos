import { useDemoState } from "@components/demo-widget/demo-state-store"
import type { Knob } from "@types"
import type { Component } from "solid-js"

const VIEWBOX_SIZE = 912
const STICK_RADIUS = 72
const VIEWBOX_CENTER = VIEWBOX_SIZE / 2
const STICK_RANGE = 328 - STICK_RADIUS

export const Joystick: Component<Pick<Knob, "id" | "size">> = props => {
  const { activePreset } = useDemoState()

  const stickCoords = () => {
    const radialCoords = activePreset()?.settings?.[props.id] as {
      radius: number
      angle: number
    }

    if (!radialCoords) return { x: VIEWBOX_CENTER, y: VIEWBOX_CENTER }

    return {
      x:
        radialCoords.radius *
          Math.cos(radialCoords.angle * (Math.PI / 180)) *
          STICK_RANGE +
        VIEWBOX_CENTER,
      y:
        radialCoords.radius *
          Math.sin(radialCoords.angle * (Math.PI / 180)) *
          STICK_RANGE +
        VIEWBOX_CENTER,
    }
  }

  const uniqueId = `${props.id}-joystick-${Math.random().toString(36).substring(7)}}`

  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 912 912"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Joystick</title>
      <circle cx="456" cy="456" r="456" fill="#2E2E2E" />
      <circle cx="456" cy="456" r="328" stroke="#232323" stroke-width="4" />
      <circle
        cx="456"
        cy="456"
        r="278"
        fill={`url(#${uniqueId}-paint0_radial_1_23)`}
        stroke="#232323"
        stroke-width="4"
      />
      <circle
        cx="738"
        cy="178"
        r="30"
        fill="#292929"
        stroke="#232323"
        stroke-width="4"
      />
      <line
        x1="728.828"
        y1="167.087"
        x2="748.627"
        y2="186.886"
        stroke="#4A4949"
        stroke-width="4"
        stroke-linecap="round"
      />
      <line
        x1="728"
        y1="186.799"
        x2="747.799"
        y2="167"
        stroke="#4A4949"
        stroke-width="4"
        stroke-linecap="round"
      />
      <circle
        cx="181"
        cy="179"
        r="30"
        fill="#292929"
        stroke="#232323"
        stroke-width="4"
      />
      <line
        x1="171.828"
        y1="168.087"
        x2="191.627"
        y2="187.886"
        stroke="#4A4949"
        stroke-width="4"
        stroke-linecap="round"
      />
      <line
        x1="171"
        y1="187.799"
        x2="190.799"
        y2="168"
        stroke="#4A4949"
        stroke-width="4"
        stroke-linecap="round"
      />
      <circle
        cx="173"
        cy="732"
        r="30"
        fill="#292929"
        stroke="#232323"
        stroke-width="4"
      />
      <line
        x1="163.828"
        y1="721.087"
        x2="183.627"
        y2="740.886"
        stroke="#4A4949"
        stroke-width="4"
        stroke-linecap="round"
      />
      <line
        x1="163"
        y1="740.799"
        x2="182.799"
        y2="721"
        stroke="#4A4949"
        stroke-width="4"
        stroke-linecap="round"
      />
      <circle
        cx="727"
        cy="742"
        r="30"
        fill="#292929"
        stroke="#232323"
        stroke-width="4"
      />
      <line
        x1="717.828"
        y1="731.087"
        x2="737.627"
        y2="750.886"
        stroke="#4A4949"
        stroke-width="4"
        stroke-linecap="round"
      />
      <line
        x1="717"
        y1="750.799"
        x2="736.799"
        y2="731"
        stroke="#4A4949"
        stroke-width="4"
        stroke-linecap="round"
      />
      <circle
        cx={stickCoords().x}
        cy={stickCoords().y}
        r={STICK_RADIUS}
        fill={`url(#${uniqueId}-stick_head_radial)`}
        class="stroke-loopydemos-highlight-primary"
        stroke-width="16"
      />
      <defs>
        <radialGradient
          id={`${uniqueId}-paint0_radial_1_23`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(456 456) rotate(90) scale(280)"
        >
          <stop stop-color="#6C6C6C" stop-opacity="0" />
          <stop offset="1" stop-color="#1E1E1E" />
        </radialGradient>
        <radialGradient id={`${uniqueId}-stick_head_radial`}>
          <stop stop-color="#767676" />
          <stop stop-color="#232323" offset="1" />
        </radialGradient>
      </defs>
    </svg>
  )
}
