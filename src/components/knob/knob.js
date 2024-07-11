import React from "react"
import { FaHandPointUp } from "react-icons/fa"
import styled from "styled-components"

import { useDemoStateReducer } from "../demo-container/demo-state-context"
import ArrowKnob from "./arrow-knob"
import BakelitKnob from "./bakelit-knob"
import BrutalistKnob from "./brutalist-knob.astro"
import CbaKnob from "./cba-knob.astro"
import ChickenHeadKnob from "./chicken-head-knob.astro"
import DaviesKnob from "./davies-knob.astro"
import DragSweepControl from "./drag-sweep-control"
import FairfieldKnob from "./fairfield-knob.astro"
import { FlbKnob } from "./flb-knob"
import GojiraKnob from "./gojira-knob.astro"
import JhsKnob from "./jhs-knob.astro"
import { Joystick } from "./joystick"
import KnurledKnob from "./knurled-knob"
import LichtlaermAudioKnob from "./lichtlaerm-audio-knob"
import { ObneKnob } from "./obne-knob.astro"
import OffsetKnob from "./offset-knob.astro"
import { RoundChickenHeadKnob } from "./round-chicken-head-knob"
import SimpleDotKnob from "./simple-dot-knob.astro"
import SimpleKnob from "./simple-knob.astro"
import WalrusAudioKnob from "./walrus-audio-knob"

const StyledKnobContainer = styled.div`
  --rotation: ${({ rotation }) => rotation};
  --animRotation: ${(props) =>
    props.reverseInitAnimation ? "30deg" : "-30deg"};
  --size: ${({ size }) => size}px;
  position: relative;
  z-index: ${(props) => (props.isSweep ? 10 : 0)};

  width: var(--size);
  height: var(--size);

  ${(props) =>
    props.isSweep && !props.isRotary
      ? "animation: 1s linear 1 forwards wiggle;"
      : ""}

  svg g {
    transform: rotate(var(--rotation));
    transform-origin: 50% 50%;
    ${(props) =>
      !props.isSweep &&
      !props.isRotary &&
      `transition: transform 0.2s ease-in;`}
  }

  @keyframes wiggle {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(var(--animRotation));
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(var(--animRotation));
    }
    100% {
      transform: rotate(0deg);
    }
  }
`

const StyledPositionContainer = styled.div`
  z-index: 0;
  width: ${(props) => props.size}px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const StyledLabel = styled.span`
  font-size: ${(props) => props.scale * 0.7}rem;
  line-height: 1rem;
  margin-top: 0.1rem;
  text-align: center;
`

const AnimatedIcon = styled(FaHandPointUp)`
  position: absolute;
  bottom: -1rem;
  ${(props) => props.alignment}: 0rem;
  font-size: 2rem;
  color: var(--primaryHighlight);
  animation: 1s linear 1 forwards bounce;
  z-index: 10;

  @keyframes bounce {
    0% {
      transform: translateY(0px);
    }
    25% {
      transform: translateY(-8px);
    }
    50% {
      transform: translateY(0px);
    }
    75% {
      transform: translateY(-8px);
    }
    95% {
      opacity: 1;
      z-index: 10;
    }
    100% {
      transform: translateY(0px);
      opacity: 0;
      z-index: -99;
    }
  }
`
const levelToRotationFunc = ({ level, isRotary, rotaryAngles }) =>
  isRotary ? `${rotaryAngles[level - 1]}deg` : `${30 * level - 150}deg`

const Knob = ({
  id = "",
  size = 64,
  scale = 1,
  pedalName = "",
  level = 5,
  type = "bakelit",
  isSweep = false,
  label = "",
  isRotary = false,
  rotaryAngles = [],
  ...rest
}) => {
  const [{ activePreset }, _] = useDemoStateReducer()
  const initialValue = activePreset?.initialValue || 5

  const renderKnob = (internalLevel) => (
    <>
      <StyledKnobContainer
        rotation={levelToRotationFunc({
          level: internalLevel,
          isRotary,
          rotaryAngles,
        })}
        isSweep={isSweep}
        size={size}
        isRotary={isRotary}
        reverseInitAnimation={initialValue < 5}
      >
        {
          {
            bakelit: <BakelitKnob size={size} {...rest} />,
            knurled: <KnurledKnob size={size} {...rest} />,
            offset: <OffsetKnob size={size} {...rest} />,
            walrus: <WalrusAudioKnob size={size} {...rest} />,
            lichtlaerm: <LichtlaermAudioKnob size={size} {...rest} />,
            jhs: <JhsKnob size={size} {...rest} />,
            simple: <SimpleKnob size={size} {...rest} />,
            fairfield: <FairfieldKnob size={size} {...rest} />,
            simpledot: <SimpleDotKnob size={size} {...rest} />,
            chicken: <ChickenHeadKnob size={size} {...rest} />,
            roundchicken: <RoundChickenHeadKnob size={size} {...rest} />,
            gojira: <GojiraKnob size={size} {...rest} />,
            arrow: <ArrowKnob size={size} {...rest} />,
            brutalist: <BrutalistKnob size={size} {...rest} />,
            cba: <CbaKnob size={size} {...rest} />,
            davies: <DaviesKnob size={size} {...rest} />,
            joystick: <Joystick size={size} setting={level} {...rest} />,
            flb: <FlbKnob size={size} {...rest} />,
            obne: <ObneKnob size={size} {...rest} />,
          }[type]
        }
      </StyledKnobContainer>
      {isSweep && !isRotary && (
        <AnimatedIcon alignment={initialValue < 5 ? "left" : "right"} />
      )}
    </>
  )

  return (
    <StyledPositionContainer id={id} size={size}>
      {isSweep ? (
        <DragSweepControl
          id={id}
          pedalName={pedalName}
          render={renderKnob}
          size={size}
          initialValue={initialValue}
          isRotary={isRotary}
        />
      ) : (
        renderKnob(level)
      )}
      {label.length > 0 && <StyledLabel scale={scale}>{label}</StyledLabel>}
    </StyledPositionContainer>
  )
}

export default Knob
