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

    // Generate responsive breakpoints based on enclosure size
    const responsiveWidths = [
      Math.round(enclosureWidth * 0.5), // Mobile/small screens
      Math.round(enclosureWidth * 1), // Tablet
      Math.round(enclosureWidth * 1.5), // Desktop
      Math.round(enclosureWidth * 2), // High-DPI displays
    ]

    const { src: imgSrc, srcSet: imgSrcSet } = await getImage({
      src: getImageSrcFromSlug(imageSrcSlug ?? pedalSlug),
      widths: responsiveWidths,
      quality: "high",
      format: "avif",
    })

    const { src: thumbnailSrc, srcSet: thumbnailSrcSet } = await getImage({
      src: getImageSrcFromSlug(imageSrcSlug ?? pedalSlug),
      widths: [94, 54],
      format: "avif",
    })

    const { src: tinySrc } = await getImage({
      src: getImageSrcFromSlug(imageSrcSlug ?? pedalSlug),
      width: 100,
      quality: "low",
      format: "avif",
    })

    // Generate contextual sizes based on pedal dimensions
    const sizes =
      enclosureWidth > 300
        ? "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        : "(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"

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
