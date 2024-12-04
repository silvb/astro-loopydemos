const fs = require("fs")
const { prompt } = require("enquirer")

const capitalizeString = (string = "") =>
  string.slice(0, 1).toUpperCase() + string.slice(1)

const createMdxContent = ({
  builder,
  slug,
  model,
  tags,
  pickup,
  isSponsored = false,
  date,
}) => `---
builder: ${builder}
model: ${model}
slug: ${slug}
type: demo
isSponsored: ${isSponsored.toString()}
date: ${date}
tags:
  ${tags.length > 0 ? tags.map(tag => `- ${tag}`).join("\n  ") : "- "}
externalLinks:
  thomann: ...
  builderLink: ...
  sweetwater: ...
---

Write some copy about the ${model} by ${builder}.

### Signal Chain

- Fidelity Guitars Stellarosa Lite II with Lollar Firebird pickups (${pickup})
- ${model}
- [Mixwave Benson Chimera Plugin*](https://sweetwater.sjv.io/B0N2PL)
- A bit of room-like reverb from the [Valhalla Vintage Verb plugin](https://valhalladsp.com/shop/reverb/valhalla-vintage-verb/)
`

const getdefaultPresets = ({ knobs = [], toggles = [], hasBackingTrack }) => ({
  hasBackingTrack,
  volume: 0.65,
  presets: [
    {
      id: "static_preset",
      label: "Static Preset",
      settings: {
        ...knobs.reduce((acc, knob) => ({ ...acc, [knob]: 5 }), {}),
        ...toggles.reduce((acc, toggle) => ({ ...acc, [toggle]: 1 }), {}),
      },
    },
    {
      id: `${knobs[0]}_knob`,
      label: `${capitalizeString(knobs[0])}`,
      isSweep: true,
      target: knobs[0],
      initialValue: 0,
      values: [0, 2, 4, 6, 8, 10],
      settings: {
        ...knobs.slice(1).reduce((acc, knob) => ({ ...acc, [knob]: 5 }), {}),
        ...toggles.reduce((acc, toggle) => ({ ...acc, [toggle]: 1 }), {}),
      },
    },
  ],
})

const getDefaultControls = ({ knobs = [], toggles = [], slug = "" }) => ({
  name: slug,
  controls: {
    knobs: knobs.map(knob => ({
      id: knob,
      size: 48,
      position: { top: 64, left: 64 },
      type: "bakelit",
    })),
    leds: [
      {
        id: "on_led",
        size: 32,
        position: { top: 64, left: 64 },
      },
    ],
    switches: [
      {
        id: "bypass_switch",
        type: "stomp",
        size: 48,
        position: { top: 64, left: 64 },
      },
      ...toggles.map(toggle => ({
        id: toggle,
        type: "toggle",
        size: 32,
        position: { top: 64, left: 64 },
      })),
    ],
  },
})

;(async function main() {
  try {
    const now = new Date()
    const date = now.toISOString().split("T")[0]

    const {
      builder,
      model,
      isSponsored,
      hasBackingTrack,
      pickup,
      tags,
      knobs,
      toggles,
    } = await prompt([
      {
        type: "input",
        name: "builder",
        message: "What's the name of the builder/brand?",
      },
      {
        type: "input",
        name: "model",
        message: "How is the pedal called?",
      },
      {
        type: "toggle",
        name: "isSponsored",
        message: "Is this a sponsored demo?",
        enabled: "Yep",
        disabled: "Nope",
      },
      {
        type: "toggle",
        name: "hasBackingTrack",
        message: "Did you record a backing track?",
        enabled: "Yep",
        disabled: "Nope",
      },
      {
        type: "select",
        name: "pickup",
        message: "Which pickup did you use?",
        choices: ["neck pickup", "both pickups", "bridge pickup"],
      },
      {
        type: "list",
        name: "tags",
        message: "Which keywords describe this pedal most accurately?",
      },
      {
        type: "list",
        name: "knobs",
        message: "What are the labels of the knobs?",
      },
      {
        type: "list",
        name: "toggles",
        message: "What toggle switches are there?",
      },
    ])

    const slug = `${builder}-${model}`.toLowerCase().replace(/ /g, "-")

    fs.writeFile(
      `src/content/demos/${slug}.md`,
      createMdxContent({
        builder,
        slug,
        isSponsored,
        hasBackingTrack,
        model,
        tags,
        pickup,
        date,
      }),
      err => {
        if (err) return console.error(err)
      }
    )

    fs.writeFile(
      `src/content/presets/${slug}.presets.json`,
      JSON.stringify(getdefaultPresets({ knobs, toggles, hasBackingTrack })),
      err => {
        if (err) return console.error(err)
      }
    )

    fs.writeFile(
      `src/content/pedals/${slug}.pedal.json`,
      JSON.stringify(getDefaultControls({ knobs, toggles, slug })),
      err => {
        if (err) console.error(err)
      }
    )
  } catch (e) {
    console.error(e)
  }
})()
