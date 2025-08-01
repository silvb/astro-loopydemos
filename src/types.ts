import type { getImage } from "astro:assets"
import type { CollectionEntry, z } from "astro:content"
import type {
  controlElementSchema,
  knobSchema,
  labelSchema,
  ledSchema,
  postTypeEnum,
  presetSchema,
  settingsValueSchema,
  sliderSchema,
  switchSchema,
} from "./content/config"

export interface PedalProps {
  slug: CollectionEntry<"demos">["slug"]
  model: CollectionEntry<"demos">["data"]["model"]
  builder: CollectionEntry<"demos">["data"]["builder"]
}

export type Knob = z.infer<typeof knobSchema>

export type Switch = z.infer<typeof switchSchema>

export type CBASwitchSate = boolean[]

export type SwitchState = 1 | 2 | 3

export type Preset = z.infer<typeof presetSchema>

export type Led = z.infer<typeof ledSchema>

export type ControlElement = z.infer<typeof controlElementSchema>

export type SettingsValue = z.infer<typeof settingsValueSchema>

export type PostType = z.infer<typeof postTypeEnum>

export type LineLabel = z.infer<typeof labelSchema>

export type Slider = z.infer<typeof sliderSchema>

export type GetImageResult = Awaited<ReturnType<typeof getImage>>
export interface StaticPedalData {
  slug: string
  imgSrc: GetImageResult["src"]
  tinySrc: GetImageResult["src"]
  imgSrcSet: GetImageResult["srcSet"]
  thumbnailSrc: GetImageResult["src"]
  thumbnailSrcSet: GetImageResult["srcSet"]
  sizes: string
  width: number
  height: number
  controls: CollectionEntry<"pedals">["data"]["controls"]
  isOneOff: CollectionEntry<"pedals">["data"]["isOneOff"]
}
