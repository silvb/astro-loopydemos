import { type Component, createSignal } from "solid-js"
import { PhCheckIcon } from "./icons/ph-check-icon"
import { PhCopyIcon } from "./icons/ph-copy-icon"

type EmbedCodeProps =
  | {
      static: true
      slug: string
      title: string
      siteUrl: string
      height?: number
    }
  | {
      code: string
      static?: false
    }

export const EmbedCode: Component<EmbedCodeProps> = props => {
  const [isCopied, setIsCopied] = createSignal(false)

  const embedCode = () =>
    props.static
      ? `<div style="display: flex; justify-content: center;"><iframe loading="lazy" src="${props.siteUrl}/demos/${props.slug}/embed" height="${props.height}" width="400" title="${props.title} | Loopy Demos" style="border-radius: 12px; border: 0px;"></iframe></div>`
      : props.code

  return (
    <div class="flex items-stretch gap-2 rounded-lg bg-loopydemos-primary p-2">
      <pre
        class="flex items-center overflow-x-scroll rounded-md px-2 py-1 font-pixel text-xs transition-colors"
        classList={{
          "bg-loopydemos-green text-loopydemos-background": isCopied(),
          "bg-loopydemos-secondary text-loopydemos-highlight-primary":
            !isCopied(),
        }}
      >
        <code>{embedCode()}</code>
      </pre>
      <button
        class="flex items-center gap-2 whitespace-nowrap rounded-lg bg-loopydemos-highlight-tertiary px-4 py-2 font-black text-base text-loopydemos-background"
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(embedCode())
          setIsCopied(true)

          setTimeout(() => {
            setIsCopied(false)
          }, 2000)
        }}
      >
        {isCopied() ? <PhCheckIcon /> : <PhCopyIcon />}
        <span>Copy Code</span>
      </button>
    </div>
  )
}
