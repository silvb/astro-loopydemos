import type { StaticPedalData } from "@types"
import { getImageAltFromSlug } from "@utils/get-image-alt-from-slug"
import type { Component } from "solid-js"
import { ComparisonPedalSelect } from "../comparison-slider/comparison-pedal-select"
import { useDemoState } from "../demo-state-store"

type PedalData = Pick<StaticPedalData, "slug" | "imgSrc" | "imgSrcSet">
interface ComparisonSliderProps {
  pedals: PedalData[]
}

export const ComparisonSlider: Component<ComparisonSliderProps> = props => {
  const { activePreset } = useDemoState()

  const pedalsInComparison = () =>
    activePreset()?.comparison?.map(item => item.pedalSlug)
  return (
    <ul class="custom-scrollbar flex list-none flex-nowrap items-center gap-2">
      {props.pedals
        .filter(pedal => pedalsInComparison()?.includes(pedal.slug))
        .map(pedal => (
          <li class="h-16 w-16 shrink-0 rounded-md md:h-28 md:w-28">
            <ComparisonPedalSelect pedalSlug={pedal.slug}>
              <img
                src={pedal.imgSrc}
                srcSet={pedal.imgSrcSet.attribute}
                sizes="(min-width: 640px) 94px, 54px"
                alt={getImageAltFromSlug(pedal.slug)}
                class="h-5/6 w-5/6 object-contain"
              />
            </ComparisonPedalSelect>
          </li>
        ))}
    </ul>
  )
}
