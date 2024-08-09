import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
      fontFamily: {
        sans: ["Mulish Variable", ...defaultTheme.fontFamily.sans],
        mono: ["VT323", ...defaultTheme.fontFamily.mono],
        display: ["Anton", ...defaultTheme.fontFamily.serif],
        logo: ["Erica One", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        "loopydemos-primary": {
          DEFAULT: "#9580ff",
          themed: "var(--loopydemos-primary)",
        },
        "loopydemos-secondary": {
          DEFAULT: "#242441",
          themed: "var(--loopydemos-secondary)",
        },
        "loopydemos-background": {
          DEFAULT: "#100f13",
          themed: "var(--loopydemos-background)",
        },
        "loopydemos-highlight-primary": {
          DEFAULT: "#5cf5f5",
          themed: "var(--loopydemos-primary-highlight)",
        },
        "loopydemos-highlight-secondary": {
          DEFAULT: "#f765ae",
          themed: "var(--loopydemos-secondary-highlight)",
        },
        "loopydemos-highlight-tertiary": {
          DEFAULT: "#f8f859",
          themed: "var(--loopydemos-tertiary-highlight)",
        },
        "loopydemos-text": {
          DEFAULT: "#f8f8f2",
          themed: "var(--loopydemos-text)",
        },
        "loopydemos-green": {
          DEFAULT: "#50fa7b",
          themed: "var(--loopydemos-green)",
        },
        "loopydemos-red": {
          DEFAULT: "#ff5555",
          themed: "var(--loopydemos-red)",
        },
        "loopydemos-orange": {
          DEFAULT: "#ffb86c",
          themed: "var(--loopydemos-orange)",
        },
        "loopydemos-subdued": {
          DEFAULT: "#bcc2cd",
          themed: "var(--loopydemos-subdued)",
        },
        "loopydemos-black": {
          DEFAULT: "#121212",
          themed: "var(--loopydemos-black)",
        },
      },
      backgroundImage: {
        noise: 'url("/noise.svg")',
        shiny:
          "conic-gradient(from 120deg,#8a8a8a,#fff,#fff,#8a8a8a,#fff,#fff,#8a8a8a)",
        "shiny-lg":
          "conic-gradient(from 30deg,#8a8a8a,#fff,#fff,#8a8a8a,#fff,#fff,#8a8a8a,#8a8a8a,#fff,#8a8a8a,#fff,#fff,#8a8a8a,#8a8a8a,#fff,#8a8a8a)",
      },
      gridTemplateColumns: {
        "3-min-repeat": "repeat(auto-fit, minmax(9rem, 1fr))",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [],
}
