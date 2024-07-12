import React from 'react'
import styled from 'styled-components'

const DipContainer = styled.div`
  background: #aa232f;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  display: flex;
  padding: 0 2px;
  box-sizing: border-box;
`

const DipRow = styled.div`
  display: flex;
  flex: 1 0 auto;
  height: 100%;
  align-items: center;
  padding: 0 3px;
  justify-content: space-between;
`

const Dip = styled.div`
  --width: ${({ scale }) => 6 * scale}px;
  --height: ${({ scale }) => 12 * scale}px;
  --nippleWidth: ${({ scale }) => 6 * scale - scale}px;
  --nippleHeight: ${({ scale }) => 6 * scale}px;

  background: #898989;
  position: relative;
  width: var(--width);
  height: var(--height);

  z-index: 0;

  :before {
    content: ' ';
    width: var(--nippleWidth);
    height: var(--nippleHeight);
    position: absolute;
    left: calc((var(--width) - var(--nippleWidth)) / 2);
    bottom: 0;
    transform: translateY(${({ value }) => (value ? -100 : 0)}%);
    background: #fefcfd;
    z-index: 1;
    transition: transform ease-in 0.2s;
  }
`

const Divider = styled.div`
  height: 100%;
  width: 1px;
  background: black;
`

const lineArray = num => Array.from(Array(num).keys())

export const CBADipSwitches = ({
  dimensions = { width: 131, height: 30 },
  dipValues = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  scale = 1,
}) => {
  return (
    <DipContainer
      width={dimensions.width * scale}
      height={dimensions.height * scale}
    >
      <DipRow>
        {lineArray(8).map(i => (
          <Dip key={i} value={dipValues[i]} scale={scale} />
        ))}
      </DipRow>
      <Divider />
      <DipRow>
        {lineArray(8).map(i => (
          <Dip key={i} value={dipValues[i + 8]} scale={scale} />
        ))}
      </DipRow>
    </DipContainer>
  )
}
