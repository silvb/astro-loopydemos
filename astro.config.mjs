import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import icon from "astro-icon"
import rehypeExternalLinks from "rehype-external-links"
import solidJs from "@astrojs/solid-js"
import mdx from "@astrojs/mdx"
import vercel from "@astrojs/vercel/static"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  site: "https://loopydemos.com",
  integrations: [
    tailwind({
      nesting: true,
    }),
    icon(),
    solidJs(),
    mdx(),
    sitemap(),
  ],
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
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
})
