import { createEffect, createSignal, on, type Component } from "solid-js"
import { COLORS } from "@constants/colors"
import { createStore } from "solid-js/store"
import { EmbedCode } from "./embed-code"

interface EmbedConfigProps {
  siteUrl: string
  title: string
  slug: string
}

export const EmbedConfig: Component<EmbedConfigProps> = props => {
  const [height, setHeight] = createSignal(560)
  const [width, setWidth] = createSignal(400)
  const [colors, setColors] = createStore({
    primary: COLORS["primary"],
    secondary: COLORS["secondary"],
    text: COLORS["text"],
    background: COLORS["background"],
    "highlight-primary": COLORS["highlight-primary"],
    "highlight-secondary": COLORS["highlight-secondary"],
    "highlight-tertiary": COLORS["highlight-tertiary"],
  })
  const [embedCode, setEmbedCode] = createSignal("")
  let frameElement!: HTMLDivElement

  const updateEmbedCode = () => {
    setEmbedCode(() => frameElement.outerHTML.replaceAll("&amp;", "&"))
  }

  const searchString = () =>
    `${Object.entries(colors)
      .map(([key, value]) => {
        let transformedKey = key
        const keyParts = key.split("-")
        if (keyParts.length === 2) {
          transformedKey = `${keyParts[1]}${keyParts[0][0].toUpperCase() + keyParts[0].slice(1)}`
        }
        return `${transformedKey}=${value.slice(1)}`
      })
      .join("&")}`

  createEffect(on([searchString, height, width], () => updateEmbedCode()))

  const ColorInput: Component<{ color: keyof typeof colors }> = props => (
    <label>
      <input
        type="color"
        value={colors[props.color]}
        class="sr-only"
        onChange={e => {
          setColors(props.color, e.currentTarget.value)
        }}
      />
      <div
        class="size-6 cursor-pointer rounded-full border-2 border-loopydemos-background"
        style={{ "background-color": colors[props.color] }}
      ></div>
    </label>
  )

  return (
    <div class="flex flex-col gap-6">
      <div class="flex flex-wrap items-center gap-4 rounded-lg bg-loopydemos-secondary p-4">
        <label class="flex items-center gap-2">
          <span>Frame width:</span>
          <input
            type="number"
            value={width()}
            onChange={e => setWidth(parseInt(e.currentTarget.value))}
            class="min-w-40 rounded-md bg-loopydemos-background p-2"
          ></input>
        </label>
        <label class="flex items-center gap-2">
          <span>Frame height:</span>
          <input
            type="number"
            value={height()}
            onChange={e => setHeight(parseInt(e.currentTarget.value))}
            class="min-w-40 rounded-md bg-loopydemos-background p-2"
          ></input>
        </label>
        <div class="flex grow justify-between gap-2">
          <span>Customize colors:</span>
          <ColorInput color="primary" />
          <ColorInput color="secondary" />
          <ColorInput color="background" />
          <ColorInput color="text" />
          <ColorInput color="highlight-primary" />
          <ColorInput color="highlight-secondary" />
          <ColorInput color="highlight-tertiary" />
        </div>
      </div>
      <EmbedCode code={embedCode()} />
      <div
        style={{ display: "flex", "justify-content": "center" }}
        ref={frameElement}
      >
        <iframe
          src={`${props.siteUrl}/demos/${props.slug}/embed?${searchString()}`}
          height={height()}
          width={width()}
          title={props.title}
          loading="lazy"
          style={{ "border-radius": "12px", border: 0 }}
        ></iframe>
      </div>
    </div>
  )
}
