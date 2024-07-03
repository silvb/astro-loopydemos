import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mulish Variable", ...defaultTheme.fontFamily.sans],
        mono: ["VT323", ...defaultTheme.fontFamily.mono],
        display: ["Bowlby One SC", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        "loopydemos-primary": { DEFAULT: "#9580ff" },
        "loopydemos-secondary": { DEFAULT: "#383a59" },
        "loopydemos-background": { DEFAULT: "#282a36" },
        "loopydemos-highlight-primary": { DEFAULT: "#80ffea" },
        "loopydemos-highlight-secondary": { DEFAULT: "#ff80bf" },
        "loopydemos-highlight-tertiary": { DEFAULT: "#F1FA8C" },
        "loopydemos-text": { DEFAULT: "#f8f8f2" },
      },
      backgroundImage: {
        noise: 'url("/noise.svg")',
      },
    },
  },
  plugins: [],
}
