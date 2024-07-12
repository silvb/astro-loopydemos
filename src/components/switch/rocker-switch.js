import React from 'react'
import styled from 'styled-components'

const StyledSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;

  rect {
    border: 1px solid aliceblue;
  }
`

function adjustBrightness(hex, brightness) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '')

  // Parse the r, g, b values
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  // Calculate new values for r, g, b
  r = Math.min(Math.max(0, r * brightness), 255)
  g = Math.min(Math.max(0, g * brightness), 255)
  b = Math.min(Math.max(0, b * brightness), 255)

  // Convert back to hex
  r = Math.round(r).toString(16).padStart(2, '0')
  g = Math.round(g).toString(16).padStart(2, '0')
  b = Math.round(b).toString(16).padStart(2, '0')

  // Return the adjusted color
  return `#${r}${g}${b}`
}

export const RockerSwitch = ({
  size = 64,
  state = 1,
  orientation = 'horizontal',
  color = '#f74709',
}) => {
  const a = 64
  const b = 36
  const width = orientation === 'horizontal' ? size : (size / a) * b
  const height = orientation === 'horizontal' ? (size / a) * b : size

  const viewboxWidth = orientation === 'horizontal' ? a : b
  const viewboxHeight = orientation === 'horizontal' ? b : a
  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}
    >
      <g
        fill="none"
        transform={`rotate(${
          orientation === 'horizontal' ? '0 0 0' : `90 ${b / 2} ${b / 2}`
        })`}
      >
        {state === 1 ? (
          <>
            <rect
              x="0"
              y="0"
              width={a * 0.4}
              height={b}
              fill={adjustBrightness(color, 0.9)}
            />
            <rect
              x={a * 0.4}
              y="0"
              width={a * 0.3}
              height={b}
              fill={adjustBrightness(color, 2)}
            />
            <rect
              x={a * 0.7}
              y="0"
              width={a * 0.3}
              height={b}
              fill={adjustBrightness(color, 0.7)}
            />
          </>
        ) : (
          <>
            <rect
              x="0"
              y="0"
              width={a * 0.3}
              height={b}
              fill={adjustBrightness(color, 1.5)}
            />
            <rect
              x={a * 0.3}
              y="0"
              width={a * 0.3}
              height={b}
              fill={adjustBrightness(color, 0.7)}
            />
            <rect x={a * 0.6} y="0" width={a * 0.4} height={b} fill={color} />
          </>
        )}
      </g>
    </StyledSVG>
  )
}
