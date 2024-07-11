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

const LichtLaermAudioKnob = ({
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
        <path
          d="M32.4642 3.50689L37.8637 17.0056C38.0624 17.5022 37.4477 17.9218 37.0575 17.5561L33.0259 13.7764C32.4489 13.2355 31.5511 13.2355 30.9741 13.7764L26.9425 17.556C26.5523 17.9218 25.9377 17.5022 26.1363 17.0056L31.5358 3.50689L31.0715 3.32119L31.5358 3.50689C31.7034 3.08782 32.2966 3.08781 32.4642 3.50689Z"
          fill="#D9D9D9"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  </StyledGradientBackground>
)

export default LichtLaermAudioKnob
