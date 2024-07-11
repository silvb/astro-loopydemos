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

export const knobSchema = controlElementSchema.extend({
  type: knobTypeEnum,
  colors: z
    .object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      tick: z.string().optional(),
      edge: z.string().optional(),
    })
    .optional(),
})

const demos = defineCollection({
  type: "content",
  schema: z.object({
    model: z.string(),
    builder: z.string(),
    date: z.date(),
    type: z.enum(["demo", "post", "none"]),
  }),
})

const presets = defineCollection({
  type: "data",
  schema: z.object({
    presets: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        isSweep: z.boolean().optional(),
        target: z.string().optional(),
        initialValue: z.number().optional(),
        values: z.array(z.number()).optional(),
        settings: z.record(
          z.string(),
          z
            .number()
            .or(z.string())
            .or(z.boolean().or(z.array(z.boolean())))
        ),
      })
    ),
  }),
})

const pedals = defineCollection({
  type: "data",
  schema: z.object({
    enclosure: z.enum(["portrait", "landscape"]).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    controls: z.object({
      knobs: z.array(knobSchema).optional(),
    }),
  }),
})

export const collections = {
  demos,
  presets,
  pedals,
}
