import { defineCollection, z } from "astro:content"

const controlElementSchema = z.object({
  id: z.string(),
  size: z.number(),
  position: z.object({
    top: z.number(),
    left: z.number(),
  }),
})

const knobTypeEnum = z.enum([
  "bakelit",
  "knurled",
  "offset",
  "walrus",
  "lichtlaerm",
  "jhs",
  "simple",
  "fairfield",
  "simpledot",
  "chicken",
  "roundchicken",
  "gojira",
  "arrow",
  "brutalist",
  "cba",
  "davies",
  "joystick",
  "flb",
  "obne",
])

const demos = defineCollection({
  type: "content",
  schema: z.object({
    model: z.string(),
    builder: z.string(),
  }),
})

const presets = defineCollection({
  type: "data",
  schema: z.object({}),
})

const pedals = defineCollection({
  type: "data",
  schema: z.object({
    enclosure: z.enum(["portrait", "landscape"]).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    controls: z.object({
      knobs: z
        .array(
          controlElementSchema.extend({
            type: knobTypeEnum,
          })
        )
        .optional(),
    }),
  }),
})

export const collections = {
  demos,
  presets,
  pedals,
}
