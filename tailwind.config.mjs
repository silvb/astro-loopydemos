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
        "loopydemos-primary": {
          DEFAULT: "#9580ff",
          themed: "var(--loopydemos-primary)",
        },
        "loopydemos-secondary": {
          DEFAULT: "#383a59",
          themed: "var(--loopydemos-secondary)",
        },
        "loopydemos-background": {
          DEFAULT: "#282a36",
          themed: "var(--loopydemos-background)",
        },
        "loopydemos-highlight-primary": {
          DEFAULT: "#80ffea",
          themed: "var(--loopydemos-primary-highlight)",
        },
        "loopydemos-highlight-secondary": {
          DEFAULT: "#ff80bf",
          themed: "var(--loopydemos-secondary-highlight)",
        },
        "loopydemos-highlight-tertiary": {
          DEFAULT: "#f1fa8c",
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
        "loopydemos-gray": {
          DEFAULT: "#bcc2cd",
          themed: "var(--loopydemos-gray)",
        },
        "loopydemos-black": {
          DEFAULT: "#121212",
          themed: "var(--loopydemos-black)",
        },
      },
      backgroundImage: {
        noise: 'url("/noise.svg")',
      },
      gridTemplateColumns: {
        "3-min-repeat": "repeat(auto-fit, minmax(10rem, 1fr))",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [],
}
