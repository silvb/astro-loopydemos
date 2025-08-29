import type { Preset, StaticPedalData } from "@types"
import { type Component, createSignal, onMount } from "solid-js"
import { AudioPlayer } from "./audio-player"
import { ComparisonSlider } from "./comparison-slider"
import { DemoStateProvider } from "./demo-state-store"
import { Pedal } from "./pedal"
import { PresetsSlider } from "./presets-slider"
import { ScaleFactor } from "./scale-factor"

interface DemoWidgetContainerProps {
  presets: Preset[]
  staticPedalData: StaticPedalData[]
  isComparison?: boolean
  hasBackingTrack?: boolean
  presetSlug: string
  volume?: number
  maxHeight: number
  noMargin?: boolean
}

export const DemoWidgetContainer: Component<
  DemoWidgetContainerProps
> = props => {
  const [isLoaded, setIsLoaded] = createSignal(false)

  onMount(() => {
    setIsLoaded(true)
  })

  return (
    <>
      {isLoaded() && (
        <style>
          {`#loading-skeleton-${props.presetSlug} { display: none; }`}
        </style>
      )}
      <DemoStateProvider
        presets={props.presets}
        pedals={props.staticPedalData.map(pedalData => pedalData.slug)}
      >
        <div class="flex flex-col gap-4">
          <AudioPlayer
            slug={props.presetSlug}
            hasBackingTrack={props.hasBackingTrack}
            volume={props.volume}
          />
          {props.isComparison && (
            <ComparisonSlider
              pedals={props.staticPedalData.map(
                ({ slug, thumbnailSrc, thumbnailSrcSet }) => ({
                  slug,
                  imgSrc: thumbnailSrc,
                  imgSrcSet: thumbnailSrcSet,
                }),
              )}
            />
          )}
          {props.presets.length > 1 && (
            <PresetsSlider presets={props.presets} />
          )}
          <ScaleFactor height={props.maxHeight}>
            <div class="mt-8 overflow-x-scroll">
              {props.staticPedalData
                .filter(pedalData => pedalData.isAmp)
                .map(pedalData => (
                  <Pedal {...pedalData} />
                ))}
            </div>
            <div
              class="flex items-start justify-center"
              classList={{ "mb-20": !props.noMargin }}
            >
              {props.staticPedalData
                .filter(pedalData => !pedalData.isAmp)
                .map(pedalData => (
                  <Pedal {...pedalData} />
                ))}
            </div>
          </ScaleFactor>
        </div>
      </DemoStateProvider>
    </>
  )
}
