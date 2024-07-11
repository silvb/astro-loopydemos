import React from 'react'

import { COLORS } from '../styles/colors'

const VIEWBOX_SIZE = 912
const STICK_RADIUS = 72
const VIEWBOX_CENTER = VIEWBOX_SIZE / 2
const STICK_RANGE = 328 - STICK_RADIUS

const getStickCoords = ({ angle = 90, radius = 1 }) => ({
  x: radius * Math.cos(angle * (Math.PI / 180)) * STICK_RANGE + VIEWBOX_CENTER,
  y: radius * Math.sin(angle * (Math.PI / 180)) * STICK_RANGE + VIEWBOX_CENTER,
})

export const Joystick = ({
  size = 128,
  setting = { angle: 90, radius: 1 },
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 912 912"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="456" cy="456" r="456" fill="#2E2E2E" />
    <circle cx="456" cy="456" r="328" stroke="#232323" strokeWidth="4" />
    <circle
      cx="456"
      cy="456"
      r="278"
      fill="url(#paint0_radial_1_23)"
      stroke="#232323"
      strokeWidth="4"
    />
    <circle
      cx="738"
      cy="178"
      r="30"
      fill="#292929"
      stroke="#232323"
      strokeWidth="4"
    />
    <line
      x1="728.828"
      y1="167.087"
      x2="748.627"
      y2="186.886"
      stroke="#4A4949"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <line
      x1="728"
      y1="186.799"
      x2="747.799"
      y2="167"
      stroke="#4A4949"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle
      cx="181"
      cy="179"
      r="30"
      fill="#292929"
      stroke="#232323"
      strokeWidth="4"
    />
    <line
      x1="171.828"
      y1="168.087"
      x2="191.627"
      y2="187.886"
      stroke="#4A4949"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <line
      x1="171"
      y1="187.799"
      x2="190.799"
      y2="168"
      stroke="#4A4949"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle
      cx="173"
      cy="732"
      r="30"
      fill="#292929"
      stroke="#232323"
      strokeWidth="4"
    />
    <line
      x1="163.828"
      y1="721.087"
      x2="183.627"
      y2="740.886"
      stroke="#4A4949"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <line
      x1="163"
      y1="740.799"
      x2="182.799"
      y2="721"
      stroke="#4A4949"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle
      cx="727"
      cy="742"
      r="30"
      fill="#292929"
      stroke="#232323"
      strokeWidth="4"
    />
    <line
      x1="717.828"
      y1="731.087"
      x2="737.627"
      y2="750.886"
      stroke="#4A4949"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <line
      x1="717"
      y1="750.799"
      x2="736.799"
      y2="731"
      stroke="#4A4949"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle
      cx={getStickCoords(setting).x}
      cy={getStickCoords(setting).y}
      r={STICK_RADIUS}
      fill="url(#stick_head_radial)"
      stroke={COLORS.cyan}
      strokeWidth="16"
    />
    <defs>
      <radialGradient
        id="paint0_radial_1_23"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(456 456) rotate(90) scale(280)"
      >
        <stop stopColor="#6C6C6C" stopOpacity="0" />
        <stop offset="1" stopColor="#1E1E1E" />
      </radialGradient>
      <radialGradient id="stick_head_radial">
        <stop stopColor="#767676" />
        <stop stopColor="#232323" offset="1" />
      </radialGradient>
    </defs>
  </svg>
)
