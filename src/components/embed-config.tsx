import { COLORS } from "@constants/colors"
import { type Component, createEffect, createSignal, on } from "solid-js"
import { createStore } from "solid-js/store"
import { EmbedCode } from "./embed-code"

interface EmbedConfigProps {
  siteUrl: string
  title: string
  slug: string
  minHeight: number
}

const MIN_WIDTH = 320

export const EmbedConfig: Component<EmbedConfigProps> = props => {
  const [height, setHeight] = createSignal(props.minHeight)
  const [width, setWidth] = createSignal(400)
  const [colors, setColors] = createStore({
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    text: COLORS.text,
    background: COLORS.background,
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
        class="size-10 cursor-pointer rounded-full border-4 border-loopydemos-background"
        style={{ "background-color": colors[props.color] }}
      />
    </label>
  )

  return (
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-4 rounded-lg bg-loopydemos-secondary p-4">
        <label class="flex items-center gap-2">
          <span>Frame width:</span>
          <div class="flex flex-col gap-1">
            <input
              type="number"
              value={width()}
              min={MIN_WIDTH}
              onChange={e => setWidth(Number.parseInt(e.currentTarget.value))}
              class="min-w-40 rounded-md bg-loopydemos-background p-2"
            />
            {width() < MIN_WIDTH && (
              <span class="text-loopydemos-red text-sm italic">{`This will look ugly on your site. Best to keep the width above ${MIN_WIDTH}px.`}</span>
            )}
          </div>
        </label>
        <label class="flex items-center gap-2">
          <span>Frame height:</span>
          <div class="flex flex-col gap-1">
            <input
              type="number"
              value={height()}
              min={props.minHeight}
              onChange={e => setHeight(Number.parseInt(e.currentTarget.value))}
              class="min-w-40 rounded-md bg-loopydemos-background p-2"
            />
            {height() < props.minHeight && (
              <span class="text-loopydemos-red text-sm italic">{`This will look ugly on your site. Best to keep the height above ${props.minHeight}px.`}</span>
            )}
          </div>
        </label>
        <div class="flex grow items-center gap-2">
          <span>Customize colors:</span>
          <div class="flex flex-wrap gap-2">
            <ColorInput color="primary" />
            <ColorInput color="secondary" />
            <ColorInput color="background" />
            <ColorInput color="text" />
            <ColorInput color="highlight-primary" />
            <ColorInput color="highlight-secondary" />
            <ColorInput color="highlight-tertiary" />
          </div>
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
        />
      </div>
    </div>
  )
}
