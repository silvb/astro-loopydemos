import React from 'react'

export const PushButton = ({
  size = 64,
  state = 1,
  colors = { primary: '#222', secondary: '#555' },
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 64 64"
  >
    <g fill="none">
      <rect
        x="8"
        y={state === 1 ? `20` : `28`}
        width="48"
        height={state === 1 ? `18` : `10`}
        fill={colors.primary}
      />
      <circle cx="32" cy="40" r="24" fill={colors.primary} />
      <circle
        cx="32"
        cy={state === 1 ? `24` : `32`}
        r="23"
        fill={colors.primary}
        strokeWidth="2"
        stroke={colors.secondary}
      />
    </g>
  </svg>
)
