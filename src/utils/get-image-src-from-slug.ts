export const getImageSrcFromSlug = (slug: string) => {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/images/*.{jpeg,jpg,png,webp}"
  )

  const imageSrc =
    images[`/src/images/${slug}.png`] ||
    images[`/src/images/${slug}.webp`] ||
    images[`/src/images/${slug}.jpg`]

  if (!imageSrc) throw new Error(`No image exists for "${slug}" in src/images`)

  return imageSrc()
}