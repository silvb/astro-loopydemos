import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import rehypeExternalLinks from "rehype-external-links";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), solidJs()],
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"]
    }]]
  }
});