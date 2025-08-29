import { Knob } from "@components/demo-widget/controls/knob"
import { Led } from "@components/demo-widget/controls/led"
import { LineLabel } from "@components/demo-widget/controls/line-label"
import { Slider } from "@components/demo-widget/controls/slider"
import { Switch } from "@components/demo-widget/controls/switch"
import { AbsolutePosition } from "@components/demo-widget/pedal/absolute-position"
import type { StaticPedalData } from "@types"
import { getImageAltFromSlug } from "@utils/get-image-alt-from-slug"
import {
  type Component,
  createSignal,
  Match,
  Switch as RenderSwitch,
} from "solid-js"
import { DarkFatherControls } from "../controls/dark-father-controls"
import { PedalStateContainer } from "./pedal-state-container"

type PedalProps = StaticPedalData

export const Pedal: Component<PedalProps> = props => {
  const [isImgLoaded, setIsImgLoaded] = createSignal(false)
  return (
    <PedalStateContainer
      slug={props.slug}
      enclosureWidth={props.width}
      isAmp={props.isAmp}
    >
      <div
        id={props.slug}
        class="relative box-border select-none"
        classList={{ "mx-auto": props.isAmp }}
        style={{
          width: `${props.width}px`,
          height: `${props.height}px`,
        }}
      >
        <img
          src={props.imgSrc}
          srcSet={props.imgSrcSet.attribute}
          sizes={props.sizes}
          width={props.width}
          height={props.height}
          alt={getImageAltFromSlug(props.slug)}
          class="absolute size-full object-contain"
          loading="eager"
          onLoad={() => setIsImgLoaded(true)}
        />
        <div
          class="absolute size-full bg-center bg-contain bg-no-repeat blur-sm transition-opacity duration-500"
          classList={{
            "opacity-0": isImgLoaded(),
            "opacity-100": !isImgLoaded(),
          }}
          style={{
            "background-image": `url(${props.tinySrc})`,
          }}
        />
        <div class="relative size-full">
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
            <AbsolutePosition
              id={label.id}
              {...label.position}
              className="pointer-events-none"
            >
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
