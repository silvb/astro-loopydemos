import type { CollectionEntry } from "astro:content"
import { z } from "astro:content"
import type { knobSchema, presetSchema, switchSchema } from "./content/config"

export interface PedalProps {
  slug: CollectionEntry<"demos">["slug"]
  model: CollectionEntry<"demos">["data"]["model"]
  builder: CollectionEntry<"demos">["data"]["builder"]
}

export type Knob = z.infer<typeof knobSchema>

export type Switch = z.infer<typeof switchSchema>

export type SwitchState = 1 | 2 | 3

export type Preset = z.infer<typeof presetSchema>
