import { type CollectionEntry } from "astro:content"
import { Knob } from "@components/demo-widget/knob"
import { AbsolutePosition } from "@components/demo-widget/pedal/absolute-position"
import { Switch } from "@components/demo-widget/switch"
import { Led } from "@components/demo-widget/led"
import { PedalStateContainer } from "./pedal-state-container"
import { getImageAltFromSlug } from "@utils/get-image-alt-from-slug"
import { LineLabel } from "@components/demo-widget/line-label"
import { Slider } from "@components/demo-widget/slider"
import type { Component } from "solid-js"

interface PedalProps {
  slug: string
  imgSrc: string
  width: number
  height: number
  controls: CollectionEntry<"pedals">["data"]["controls"]
}

export const Pedal: Component<PedalProps> = props => {
  return (
    <PedalStateContainer slug={props.slug} enclosureWidth={props.width}>
      <div
        id={props.slug}
        class="relative box-border h-[calc(var(--height)*0.75)] w-[calc(var(--width)*0.75)] select-none sm:h-[var(--height)] sm:w-[var(--width)]"
        style={{
          "--width": `${props.width}px`,
          "--height": `${props.height}px`,
        }}
      >
        <img
          src={props.imgSrc}
          alt={getImageAltFromSlug(props.slug)}
          class="absolute h-full w-full object-contain"
          loading="eager"
        />
        <div class="relative h-full w-full transform">
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
