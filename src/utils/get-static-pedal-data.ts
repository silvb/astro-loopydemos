import {
  LANDSCAPE_DEFAULT_ENCLOSURE,
  POTRAIT_DEFAULT_ENCLOSURE,
} from "@constants/sizes"
import type { StaticPedalData } from "@types"
import { getImage } from "astro:assets"
import { type CollectionEntry, getEntry } from "astro:content"
import { getImageSrcFromSlug } from "./get-image-src-from-slug"

export const getStaticPedalData = async (
  pedals: string[]
): Promise<StaticPedalData[]> => {
  let staticPedalData: StaticPedalData[] = []

  for (const pedalSlug of pedals) {
    const pedalData: CollectionEntry<"pedals"> = await getEntry(
      "pedals",
      `${pedalSlug as CollectionEntry<"demos">["slug"]}.pedal`
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

    const { src: imgSrc, srcSet: imgSrcSet } = await getImage({
      src: getImageSrcFromSlug(imageSrcSlug ?? pedalSlug),
      width: enclosureWidth * 2,
      quality: "high",
    })

    const { src: thumbnailSrc, srcSet: thumbnailSrcSet } = await getImage({
      src: getImageSrcFromSlug(imageSrcSlug ?? pedalSlug),
      widths: [94, 54],
    })

    const { src: tinySrc } = await getImage({
      src: getImageSrcFromSlug(imageSrcSlug ?? pedalSlug),
      width: 100,
      quality: "low",
    })

    staticPedalData.push({
      width: enclosureWidth,
      height: enclosureHeight,
      slug: pedalSlug,
      imgSrc,
      imgSrcSet,
      thumbnailSrc,
      thumbnailSrcSet,
      tinySrc,
      controls,
      isOneOff,
    })
  }

  return staticPedalData
}
