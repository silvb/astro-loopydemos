import type { Knob as KnobType } from "@types"
import { type Component, Match, Switch, splitProps } from "solid-js"
import { ArrowKnob } from "./arrow-knob"
import { BakelitKnob } from "./bakelit-knob"
import { BrutalistKnob } from "./brutalist-knob"
import { CbaKnob } from "./cba-knob"
import { ChickenHeadKnob } from "./chicken-head-knob"
import { DaviesKnob } from "./davies-knob"
import { EmptyHeadKnob } from "./empty-head"
import { EmptyHeadLargeKnob } from "./empty-head-large"
import { FairfieldKnob } from "./fairfield-knob"
import { FanclubKnob } from "./fanclub-knob"
import { FlbKnob } from "./flb-knob"
import { GojiraKnob } from "./gojira-knob"
import { JhsKnob } from "./jhs-knob"
import { Joystick } from "./joystick"
import { KnobStateContainer } from "./knob-state-container"
import { KnurledKnob } from "./knurled-knob"
import { LichtlaermAudioKnob } from "./lichtlaerm-audio-knob"
import { MuffKnob } from "./muff-knob"
import { ObneKnob } from "./obne-knob"
import { OffsetKnob } from "./offset-knob"
import { OrangeKnob } from "./orange-knob"
import { RoundChickenHeadKnob } from "./round-chicken-head-knob"
import { SimpleDotKnob } from "./simple-dot-knob"
import { SimpleKnob } from "./simple-knob"
import { WalrusAudioKnob } from "./walrus-audio-knob"

interface KnobProps extends KnobType {
  pedalSlug: string
}

export const Knob: Component<KnobProps> = props => {
  const [stateContainerProps, sizeAndColorProps, _] = splitProps(
    props,
    ["id", "isRotary", "rotaryAngles", "size", "pedalSlug", "highlightColor"],
    ["colors", "size"],
  )

  return (
    <KnobStateContainer {...stateContainerProps}>
      <Switch>
        <Match when={props.type === "arrow"}>
          <ArrowKnob size={props.size} />
        </Match>
        <Match when={props.type === "bakelit"}>
          <BakelitKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "brutalist"}>
          <BrutalistKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "cba"}>
          <CbaKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "chicken"}>
          <ChickenHeadKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "davies"}>
          <DaviesKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "fairfield"}>
          <FairfieldKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "flb"}>
          <FlbKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "gojira"}>
          <GojiraKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "jhs"}>
          <JhsKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "joystick"}>
          <Joystick id={props.id} size={props.size} />
        </Match>
        <Match when={props.type === "knurled"}>
          <KnurledKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "lichtlaerm"}>
          <LichtlaermAudioKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "obne"}>
          <ObneKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "offset"}>
          <OffsetKnob size={props.size} />
        </Match>
        <Match when={props.type === "roundchicken"}>
          <RoundChickenHeadKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "simple"}>
          <SimpleKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "simpledot"}>
          <SimpleDotKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "walrus"}>
          <WalrusAudioKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "muff"}>
          <MuffKnob size={props.size} />
        </Match>
        <Match when={props.type === "fanclub"}>
          <FanclubKnob size={props.size} />
        </Match>
        <Match when={props.type === "emptyhead"}>
          <EmptyHeadKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "emptyheadlarge"}>
          <EmptyHeadLargeKnob {...sizeAndColorProps} />
        </Match>
        <Match when={props.type === "orange"}>
          <OrangeKnob {...sizeAndColorProps} />
        </Match>
      </Switch>
    </KnobStateContainer>
  )
}
