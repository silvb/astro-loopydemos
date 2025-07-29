export const getImageSrcFromSlug = (slug: string, isSeo?: boolean) => {
  if (isSeo) {
    const images = import.meta.glob<{ default: ImageMetadata }>(
      "/src/images/seo-preview/*.{jpeg,jpg}",
    )

    const imageSrc =
      images[`/src/images/seo-preview/${slug}.jpeg`] ||
      images[`/src/images/seo-preview/${slug}.jpg`]

    if (!imageSrc)
      throw new Error(`No image exists for "${slug}" in src/images/seo-preview`)

    return imageSrc()
  }

  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/images/*.{jpeg,jpg,png,webp}",
  )

  const imageSrc =
    images[`/src/images/${slug}.png`] ||
    images[`/src/images/${slug}.webp`] ||
    images[`/src/images/${slug}.jpg`]

  if (!imageSrc) throw new Error(`No image exists for "${slug}" in src/images`)

  return imageSrc()
}

export type ImageSrc = ReturnType<typeof getImageSrcFromSlug>
