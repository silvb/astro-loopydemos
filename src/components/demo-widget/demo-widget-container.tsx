import { onMount, type Component } from "solid-js"
import { DemoStateProvider } from "./demo-state-store"
import type { Preset, StaticPedalData } from "@types"
import { AudioPlayer } from "./audio-player"
import { ComparisonSlider } from "./comparison-slider"
import { PresetsSlider } from "./presets-slider"
import { ScaleFactor } from "./scale-factor"
import { Pedal } from "./pedal"

interface DemoWidgetContainerProps {
  presets: Preset[]
  staticPedalData: StaticPedalData[]
  isComparison?: boolean
  hasBackingTrack?: boolean
  presetSlug: string
  volume?: number
  maxHeight: number
}

export const DemoWidgetContainer: Component<
  DemoWidgetContainerProps
> = props => {
  onMount(() => {
    const loadingSkeletonEl = document.getElementById(
      `loading-skeleton-${props.presetSlug}`
    )

    if (loadingSkeletonEl) {
      loadingSkeletonEl.style.display = "none"
    }
  })

  return (
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
              })
            )}
          />
        )}
        {props.presets.length > 1 && <PresetsSlider presets={props.presets} />}
      </div>
      <ScaleFactor>
        <div
          class="mt-8 flex items-start justify-center"
          style={{
            height: `${props.maxHeight}px`,
          }}
        >
          {props.staticPedalData.map(pedalData => (
            <Pedal {...pedalData} />
          ))}
        </div>
      </ScaleFactor>
    </DemoStateProvider>
  )
}
