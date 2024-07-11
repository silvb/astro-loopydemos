import React from 'react'
import styled from 'styled-components'

const StyledGradientBackground = styled.div`
  position: relative;
  --size: ${props => props.size}px;
  width: var(--size);
  height: var(--size);
  --primaryColor: ${({ colors }) => colors.primary};
  --secondaryColor: ${({ colors }) => colors.secondary};

  &:before {
    position: absolute;
    content: ' ';
    width: calc(var(--size) - 2px);
    height: calc(var(--size) - 2px);
    top: 1px;
    left: 1px;
    background: conic-gradient(
      from 120deg,
      var(--secondaryColor),
      var(--primaryColor),
      var(--primaryColor),
      var(--secondaryColor),
      var(--primaryColor),
      var(--primaryColor),
      var(--secondaryColor)
    );
    border-radius: 50%;
    z-index: -1;
  }
`

export const FlbKnob = ({
  size = 48,
  colors = {
    primary: '#000',
    secondary: '#8a8a8a',
  },
}) => (
  <StyledGradientBackground size={size} colors={colors}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
    >
      <defs>
        <mask id="cut-off-rect">
          <rect x={0} y={0} height={24} width={64} fill="#fff" />
        </mask>
      </defs>
      <g fill="none">
        <circle
          cx="32"
          cy="32"
          r="32"
          fill={colors.secondary}
          mask="url(#cut-off-rect)"
        />
        <circle r="5" cx="31" cy="12" fill={colors.primary} />
      </g>
    </svg>
  </StyledGradientBackground>
)
