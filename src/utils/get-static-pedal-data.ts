import { getImage } from "astro:assets"
import { type CollectionEntry, getEntry } from "astro:content"
import {
  LANDSCAPE_DEFAULT_ENCLOSURE,
  POTRAIT_DEFAULT_ENCLOSURE,
} from "@constants/sizes"
import type { StaticPedalData } from "@types"
import { getImageSrcFromSlug } from "./get-image-src-from-slug"

export const getStaticPedalData = async (
  pedals: string[],
): Promise<StaticPedalData[]> => {
  const staticPedalData: StaticPedalData[] = []

  for (const pedalSlug of pedals) {
    const pedalData: CollectionEntry<"pedals"> | undefined = await getEntry(
      "pedals",
      `${pedalSlug as CollectionEntry<"demos">["slug"]}.pedal`,
    )

    if (!pedalData) {
      throw new Error(`Pedal not found: ${pedalSlug}`)
    }

    const { controls, width, height, enclosure, imageSrcSlug, isOneOff } =
      pedalData.data
    const enclosureWidth =
      width ||
      (enclosure === "landscape"
        ? LANDSCAPE_DEFAULT_ENCLOSURE.width
        : POTRAIT_DEFAULT_ENCLOSURE.width)
    const enclosureHeight =
      height ||
      (enclosure === "landscape"
        ? LANDSCAPE_DEFAULT_ENCLOSURE.height
        : POTRAIT_DEFAULT_ENCLOSURE.height)

    // Use Astro's automatic responsive breakpoint generation
    const { src: imgSrc, srcSet: imgSrcSet } = await getImage({
      src: getImageSrcFromSlug(imageSrcSlug ?? pedalSlug),
      width: enclosureWidth,
      height: enclosureHeight,
      quality: "high",
      format: "avif",
      // Let Astro automatically generate responsive breakpoints
      breakpoints: {
        count: 4,
        minWidth: Math.round(enclosureWidth * 0.5),
        maxWidth: Math.round(enclosureWidth * 2),
      },
    })

    // Smart thumbnail generation with automatic breakpoints
    const thumbnailBaseWidth = 94
    const thumbnailBaseHeight = Math.round((enclosureHeight / enclosureWidth) * thumbnailBaseWidth)
    
    const { src: thumbnailSrc, srcSet: thumbnailSrcSet } = await getImage({
      src: getImageSrcFromSlug(imageSrcSlug ?? pedalSlug),
      width: thumbnailBaseWidth,
      height: thumbnailBaseHeight,
      format: "avif",
      // Generate responsive thumbnails for high-DPI displays
      breakpoints: {
        count: 2,
        minWidth: thumbnailBaseWidth,
        maxWidth: thumbnailBaseWidth * 2,
      },
    })

    const { src: tinySrc } = await getImage({
      src: getImageSrcFromSlug(imageSrcSlug ?? pedalSlug),
      width: 100,
      quality: "low",
      format: "avif",
    })

    // Use Astro's automatic sizes calculation for constrained layout
    // This matches the container behavior where pedals are displayed
    const sizes = `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${enclosureWidth}px`

    staticPedalData.push({
      width: enclosureWidth,
      height: enclosureHeight,
      slug: pedalSlug,
      imgSrc,
      imgSrcSet,
      thumbnailSrc,
      thumbnailSrcSet,
      tinySrc,
      sizes,
      controls,
      isOneOff,
    })
  }

  return staticPedalData
}
