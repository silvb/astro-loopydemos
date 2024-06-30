/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "loopydemos-primary": { DEFAULT: "#9580ff" },
        "loopydemos-secondary": { DEFAULT: "#383a59" },
      },
    },
  },
  plugins: [],
};
