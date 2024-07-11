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
    top: calc(var(--size) * 1px);
    left: calc(var(--size) * 1px);
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

const WalrusAudioKnob = ({
  size = 48,
  colors = {
    primary: '#000',
    secondary: '#8a8a8a',
    edge: '#2c2c2c',
    tick: '#FFF',
  },
}) => (
  <StyledGradientBackground size={size} colors={colors}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
    >
      <g fill="none">
        <circle cx="32" cy="32" r="30" stroke={colors.edge} strokeWidth="4" />
        <rect width="3" height="28" x="31" y="4" fill={colors.tick} />
      </g>
    </svg>
  </StyledGradientBackground>
)

export default WalrusAudioKnob
