import type { CollectionEntry } from "astro:content"
import { defineCollection, z } from "astro:content"
import type { knobSchema, presetSchema, switchSchema } from "./content/config"

export interface PedalProps {
  slug: CollectionEntry<"demos">["slug"]
  model: CollectionEntry<"demos">["data"]["model"]
  builder: CollectionEntry<"demos">["data"]["builder"]
}

export type Knob = z.infer<typeof knobSchema>

export interface Switch extends z.infer<typeof switchSchema> {
  state?: 1 | 2 | 3
}

export type Preset = z.infer<typeof presetSchema>
