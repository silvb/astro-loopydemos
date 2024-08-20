import { Knob } from "@components/demo-widget/controls/knob"
import { AbsolutePosition } from "@components/demo-widget/pedal/absolute-position"
import { Switch } from "@components/demo-widget/controls/switch"
import { Led } from "@components/demo-widget/controls/led"
import { PedalStateContainer } from "./pedal-state-container"
import { getImageAltFromSlug } from "@utils/get-image-alt-from-slug"
import { LineLabel } from "@components/demo-widget/controls/line-label"
import { Slider } from "@components/demo-widget/controls/slider"
import { type Component, Switch as RenderSwitch, Match } from "solid-js"
import type { StaticPedalData } from "@types"
import { DarkFatherControls } from "../controls/dark-father-controls"

type PedalProps = StaticPedalData

export const Pedal: Component<PedalProps> = props => {
  return (
    <PedalStateContainer slug={props.slug} enclosureWidth={props.width}>
      <div
        id={props.slug}
        class="relative box-border select-none"
        style={{
          width: `${props.width}px`,
          height: `${props.height}px`,
        }}
      >
        <img
          src={props.imgSrc}
          alt={getImageAltFromSlug(props.slug)}
          class="absolute h-full w-full object-contain"
          loading="eager"
        />
        <div class="relative h-full w-full">
          {props.isOneOff && (
            <RenderSwitch>
              <Match when={props.slug === "vvco-pedals-dark-father-preamp"}>
                <DarkFatherControls />
              </Match>
            </RenderSwitch>
          )}
          {props.controls?.knobs?.map(knob => (
            <AbsolutePosition id={knob.id} {...knob.position}>
              <Knob {...knob} pedalSlug={props.slug} />
            </AbsolutePosition>
          ))}
          {props.controls?.switches?.map(switchEl => (
            <AbsolutePosition id={switchEl.id} {...switchEl.position}>
              <Switch {...switchEl} pedalSlug={props.slug} />
            </AbsolutePosition>
          ))}
          {props.controls?.leds?.map(led => (
            <AbsolutePosition id={led.id} {...led.position}>
              <Led {...led} pedalSlug={props.slug} />
            </AbsolutePosition>
          ))}
          {props.controls?.labels?.map(label => (
            <AbsolutePosition id={label.id} {...label.position}>
              <LineLabel {...label} pedalSlug={props.slug} />
            </AbsolutePosition>
          ))}
          {props.controls?.sliders?.map(slider => (
            <AbsolutePosition id={slider.id} {...slider.position}>
              <Slider {...slider} pedalSlug={props.slug} />
            </AbsolutePosition>
          ))}
        </div>
      </div>
    </PedalStateContainer>
  )
}
