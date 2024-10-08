export const getImageAltFromSlug = (slug: string) =>
  slug
    .split("-")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ")
