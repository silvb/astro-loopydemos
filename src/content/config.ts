import { defineCollection, z } from "astro:content"

export const colorsSchema = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
  tick: z.string().optional(),
  edge: z.string().optional(),
})

export const settingsValueSchema = z
  .number()
  .or(z.string())
  .or(z.object({ radius: z.number(), angle: z.number() }))
  .or(z.boolean())
  .or(z.array(z.boolean()))

export const settingsSchema = z.record(z.string(), settingsValueSchema)

export const ledColorsSchema = z.object({
  on: z.string(),
  off: z.string().optional(),
})

export const dependencySchema = z.object({
  source: z.string(),
  values: z.array(
    z.object({
      sourceValue: z.number().or(z.boolean()),
      targetValue: settingsValueSchema.optional(),
      colors: ledColorsSchema.optional(),
    }),
  ),
})

export const controlElementSchema = z.object({
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
  dependency: dependencySchema.optional(),
  highlightColor: z.enum(["primary", "secondary", "tertiary"]).optional(),
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
  "muff",
  "fanclub",
  "emptyhead",
  "emptyheadlarge",
  "marconi",
  "orange",
  "fender",
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

export const knobSchema = controlElementSchema.extend({
  type: knobTypeEnum,
  colors: colorsSchema.optional(),
  isRotary: z.boolean().optional(),
  rotaryAngles: z.array(z.number()).optional(),
})

export const ledSchema = controlElementSchema.extend({
  colors: ledColorsSchema.optional(),
  isBlinking: z.boolean().optional(),
  secondaryCircuitId: z.string().optional(),
  type: z.enum(["round", "square", "mood"]).optional(),
  isOnIndicator: z.boolean().optional(),
  offOverride: z.boolean().optional(),
  blinkOffset: z.number().optional(),
  defaultTime: z.number().optional(),
  requiresMainCircuitForSecondary: z.boolean().optional(),
})

export const sliderSchema = z.object({
  id: z.string(),
  size: z.object({
    width: z.number(),
    height: z.number(),
    innerWidth: z.number(),
    innerHeight: z.number(),
  }),
  position: z.object({
    top: z.number(),
    left: z.number(),
  }),
  faderType: z.enum(["walrus", "simple"]).optional(),
  tilt: z.number().optional(),
  colors: z
    .object({
      enclosure: z.string().optional(),
      tick: z.string().optional(),
      face: z.string().optional(),
    })
    .optional(),
})

export const labelSchema = z.object({
  id: z.string(),
  position: z.object({
    top: z.number(),
    left: z.number(),
  }),
  labelPosition: z.object({
    top: z.number(),
    left: z.number(),
  }),
  color: z.string().optional(),
  dependency: dependencySchema.optional(),
  isLong: z.boolean().optional(),
})

export const switchSchema = controlElementSchema.extend({
  type: switchTypeEnum,
  secondaryCircuitId: z.string().optional(),
  isMomentary: z.boolean().optional(),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
  colors: colorsSchema.optional(),
  variant: z.enum(["boss", "dark"]).optional(),
})

export const postTypeEnum = z.enum(["demo", "post", "none", "freeform"])

const demos = defineCollection({
  type: "content",
  schema: z.object({
    model: z.string(),
    builder: z.string(),
    date: z.date(),
    type: postTypeEnum,
    hasBackingTrack: z.boolean().optional(),
    volume: z.number().optional(),
    externalLinks: z
      .object({
        builderLink: z.string(),
        perfectCircuit: z.string().optional(),
        thomann: z.string().optional(),
        sweetwater: z.string().optional(),
        soundShoppe: z.string().optional(),
        reverb: z.string().optional(),
        deathcloud: z.string().optional(),
      })
      .optional(),
    relatedSlugs: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
})

const posts = defineCollection({
  type: "content",
  schema: z.object({
    date: z.date(),
    title: z.string(),
    type: postTypeEnum,
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
    hasBackingTrack: z.boolean().optional(),
    volume: z.number().optional(),
    relatedSlugs: z.array(z.string()).optional(),
  }),
})

export const presetChainElementSchema = z.object({
  pedalSlug: z.string(),
  id: z.string(),
  settings: settingsSchema,
  secondaryCircuitId: z.string().optional(),
  secondaryCircuitSlug: z.string().optional(),
  secondaryCircuitOnlySlug: z.string().optional(),
  target: z.string().optional(),
  isSweep: z.boolean().optional(),
  initialValue: z.number().optional(),
  values: z.array(z.number()).optional(),
})

export const basePresetSchema = z.object({
  id: z.string(),
  label: z.string(),
  noLabels: z.boolean().optional(),
  secondaryCircuitId: z.string().optional(),
  secondaryCircuitSlug: z.string().optional(),
  secondaryCircuitOnlySlug: z.string().optional(),
  initialSecondaryCircuits: z.array(z.string()).optional(),
  settings: settingsSchema.optional(),
  chain: z.array(presetChainElementSchema).optional(),
  comparison: z
    .array(
      z.object({
        id: z.string(),
        pedalSlug: z.string(),
        secondaryCircuitId: z.string().optional(),
        secondaryCircuitSlug: z.string().optional(),
        secondaryCircuitOnlySlug: z.string().optional(),
        initialSecondaryCircuits: z.array(z.string()).optional(),
        settings: settingsSchema.optional(),
      }),
    )
    .optional(),
  isSweep: z.literal(undefined),
  target: z.string().optional(),
  initialValue: z.number().optional(),
  values: z.array(z.number()).optional(),
})

export const sweepPresetSchema = basePresetSchema.extend({
  isSweep: z.literal(true),
  target: z.string(),
  initialValue: z.number(),
  values: z.array(z.number()),
})

export const presetSchema = z.discriminatedUnion("isSweep", [
  basePresetSchema,
  sweepPresetSchema,
])

const presets = defineCollection({
  type: "data",
  schema: z.object({
    volume: z.number().optional(),
    hasBackingTrack: z.boolean().optional(),
    mainPedal: z.string().optional(),
    presets: z.array(presetSchema),
  }),
})

const pedals = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    imageSrcSlug: z.string().optional(),
    isOneOff: z.boolean().optional(),
    isAmp: z.boolean().optional(),
    enclosure: z.enum(["portrait", "landscape"]).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    controls: z
      .object({
        knobs: z.array(knobSchema).optional(),
        switches: z.array(switchSchema).optional(),
        leds: z.array(ledSchema).optional(),
        labels: z.array(labelSchema).optional(),
        sliders: z.array(sliderSchema).optional(),
      })
      .optional(),
  }),
})

export const collections = {
  demos,
  presets,
  pedals,
  posts,
}
