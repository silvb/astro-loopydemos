import type { Knob as KnobType } from "@types"
import { SimpleKnob } from "./simple-knob"
import { CbaKnob } from "./cba-knob"
import { BrutalistKnob } from "./brutalist-knob"
import { ChickenHeadKnob } from "./chicken-head-knob"
import { SimpleDotKnob } from "./simple-dot-knob"
import { DaviesKnob } from "./davies-knob"
import { FairfieldKnob } from "./fairfield-knob"
import { GojiraKnob } from "./gojira-knob"
import { OffsetKnob } from "./offset-knob"
import { JhsKnob } from "./jhs-knob"
import { ObneKnob } from "./obne-knob"
import { ArrowKnob } from "./arrow-knob"
import { BakelitKnob } from "./bakelit-knob"
import { WalrusAudioKnob } from "./walrus-audio-knob"
import { FlbKnob } from "./flb-knob"
import { Joystick } from "./joystick"
import { KnurledKnob } from "./knurled-knob"
import { LichtlaermAudioKnob } from "./lichtlaerm-audio-knob"
import { RoundChickenHeadKnob } from "./round-chicken-head-knob"
import { KnobStateContainer } from "./knob-state-container"
import { Match, splitProps, Switch, type Component } from "solid-js"

interface KnobProps extends KnobType {
  pedalSlug: string
}

export const Knob: Component<KnobProps> = props => {
  const [stateContainerProps, sizeAndColorProps, _] = splitProps(
    props,
    ["id", "isRotary", "rotaryAngles", "size", "pedalSlug"],
    ["colors", "size"]
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
      </Switch>
    </KnobStateContainer>
  )
}
