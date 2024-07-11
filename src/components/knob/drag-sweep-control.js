import throttle from 'lodash/throttle'
import React, { useEffect, useState } from 'react'

import useDebouncedEffect from '../../helpers/use-debounced-effect'
import { useDemoStateReducer } from '../demo-container/demo-state-context'
import { InteractionContainer } from '../interaction-container'

const isBrowser = typeof window !== `undefined`

const DragSweepControl = ({
  id = '',
  render = () => {},
  size = 64,
  isRotary = false,
}) => {
  const [{ activePreset, sweepSetting }, dispatch] = useDemoStateReducer()

  const sweepPreset =
    activePreset?.chain?.find(pedal => pedal.isSweep) || activePreset

  const { initialValue } = sweepPreset

  const [level, setLevel] = useState(initialValue || 0)

  const isSweepPresetReady = sweepPreset.isSweep && sweepPreset.target === id

  useEffect(() => {
    setLevel(sweepSetting[id])
  }, [activePreset])

  useDebouncedEffect(
    () => {
      dispatch({
        type: 'SELECT_SWEEP_SETTING',
        payload: { id, value: level },
      })
    },
    [level],
    100
  )

  const startDrag = downEvent => {
    if (!isBrowser || isRotary) return
    downEvent.preventDefault()

    const startY = downEvent.clientY || downEvent.touches[0].clientY
    const isTouch = Boolean(downEvent.touches)
    const startLevel = level

    const handleDrag = moveEvent => {
      moveEvent.preventDefault()

      const clientY = moveEvent.clientY || moveEvent.touches[0].clientY

      let nextLevel = startLevel + (startY - clientY) / 12
      nextLevel = Math.min(10, nextLevel)
      nextLevel = Math.max(0, nextLevel)
      setLevel(nextLevel)
    }

    const throttledHandleDrag = throttle(handleDrag, 100)

    if (isTouch) {
      document.addEventListener('touchmove', throttledHandleDrag)
      document.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', throttledHandleDrag)
      })
    } else {
      document.addEventListener('mousemove', throttledHandleDrag)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', throttledHandleDrag)
      })
    }
  }

  const handleClick = () => {
    if (!isRotary || !isSweepPresetReady) return

    const numValues = activePreset.values.length
    const currentValIndex = activePreset.values.findIndex(
      val => val === sweepSetting[id]
    )

    const nextIndex = (currentValIndex + 1) % numValues
    const nextValue = activePreset.values.slice().sort()[nextIndex]
    dispatch({
      type: 'SELECT_SWEEP_SETTING',
      payload: { id, value: nextValue },
    })
    setLevel(nextValue)
  }

  return (
    <InteractionContainer
      color="secondary"
      size={size}
      extraCSS="touch-action: none;"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onClick={handleClick}
    >
      {render(level)}
    </InteractionContainer>
  )
}
export default DragSweepControl
