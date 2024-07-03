import { defineCollection, z } from "astro:content"

const demos = defineCollection({
  type: "content",
  schema: z.object({
    model: z.string(),
    builder: z.string(),
  }),
})

export const collections = {
  demos,
}
