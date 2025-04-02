import type { Preset } from "@types"

export const getPedalsFromPresets = (presets: Preset[]): string[] => [
  ...new Set(
    presets.reduce(
      (acc, { chain, comparison }) => [
        ...acc,
        ...(chain?.map(({ pedalSlug }) => pedalSlug) ?? []),
        ...(comparison?.map(({ pedalSlug }) => pedalSlug) ?? []),
      ],
      [] as string[],
    ),
  ),
]
