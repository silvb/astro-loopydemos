import { getImageAltFromSlug } from "@utils/get-image-alt-from-slug"
import { ComparisonPedalSelect } from "../comparison-slider/comparison-pedal-select"
import type { Component } from "solid-js"

type PedalData = {
  slug: string
  imgSrc: string
}
interface ComparisonSliderProps {
  pedals: PedalData[]
}

export const ComparisonSlider: Component<ComparisonSliderProps> = props => (
  <ul class="custom-scrollbar flex list-none flex-nowrap items-center gap-2">
    {props.pedals.map(pedal => (
      <li class="h-16 w-16 shrink-0 rounded-md md:h-28 md:w-28">
        <ComparisonPedalSelect pedalSlug={pedal.slug}>
          <img
            src={pedal.imgSrc}
            alt={getImageAltFromSlug(pedal.slug)}
            class="h-5/6 w-5/6 object-contain"
          />
        </ComparisonPedalSelect>
      </li>
    ))}
  </ul>
)
