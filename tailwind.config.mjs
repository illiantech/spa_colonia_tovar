/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "terracotta-soft": "#1F1C18",
        terracotta: "#780f04",
        "black-opac": "hsla(0, 0%, 0%,.6)"
      }
    },
    plugins: []
  }
};
