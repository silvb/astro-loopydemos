import { defineCollection, z } from "astro:content"

const controlElementSchema = z.object({
  id: z.string(),
  size: z.number(),
  dimensions: z
    .object({
      width: z.number(),
      height: z.number(),
    })
    .optional(),
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

const switchTypeEnum = z.enum([
  "stomp",
  "toggle",
  "rocker",
  "slide",
  "threeway",
  "pushbutton",
  "cba",
])

export const colorsSchema = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
  tick: z.string().optional(),
  edge: z.string().optional(),
})

export const knobSchema = controlElementSchema.extend({
  type: knobTypeEnum,
  colors: colorsSchema.optional(),
  isRotary: z.boolean().optional(),
  rotaryAngles: z.array(z.number()).optional(),
})

export const switchSchema = controlElementSchema.extend({
  type: switchTypeEnum,
  secondaryCircuitId: z.string().optional(),
  isMomentary: z.boolean().optional(),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
  colors: colorsSchema.optional(),
  variant: z.enum(["boss", "dark"]).optional(),
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

export const settingsSchema = z.record(
  z.string(),
  z
    .number()
    .or(z.string())
    .or(z.object({ radius: z.number(), angle: z.number() }))
    .or(z.boolean().or(z.array(z.boolean())))
)

export const presetChainElementSchema = z.object({
  name: z.string(),
  id: z.string(),
  settings: settingsSchema,
})

export const presetSchema = z.object({
  id: z.string(),
  label: z.string(),
  isSweep: z.boolean().optional(),
  target: z.string().optional(),
  initialValue: z.number().optional(),
  values: z.array(z.number()).optional(),
  settings: z
    .record(
      z.string(),
      z
        .number()
        .or(z.string())
        .or(z.object({ radius: z.number(), angle: z.number() }))
        .or(z.boolean().or(z.array(z.boolean())))
    )
    .optional(),
  chain: z.array(presetChainElementSchema).optional(),
})

const presets = defineCollection({
  type: "data",
  schema: z.object({
    presets: z.array(presetSchema),
  }),
})

const pedals = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    enclosure: z.enum(["portrait", "landscape"]).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    controls: z
      .object({
        knobs: z.array(knobSchema).optional(),
        switches: z.array(switchSchema).optional(),
      })
      .optional(),
  }),
})

export const collections = {
  demos,
  presets,
  pedals,
}
