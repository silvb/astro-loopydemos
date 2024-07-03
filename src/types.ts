import type { CollectionEntry } from "astro:content"

export interface PedalProps {
  slug: CollectionEntry<"demos">["slug"]
  model: CollectionEntry<"demos">["data"]["model"]
  builder: CollectionEntry<"demos">["data"]["builder"]
}
