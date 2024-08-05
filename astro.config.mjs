import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import icon from "astro-icon"
import rehypeExternalLinks from "rehype-external-links"
import solidJs from "@astrojs/solid-js"

import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({ nesting: true }), icon(), solidJs(), mdx()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
        },
      ],
    ],
  },
})
