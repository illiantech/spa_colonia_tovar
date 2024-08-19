/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "terracotta-soft": "#1F1C18",
        terracotta: "#780f04",
        "black-opac-1": "hsla(0, 0%, 0%,.7)",
        "black-opac-2": "hsla(0, 0%, 0%,.6)",
        "black-opac-3": "hsla(0, 0%, 0%,.5)",
        "black-opac-4": "hsla(0, 0%, 0%,.4)",
        "black-opac-5": "hsla(0, 0%, 0%,.3)",
        "black-opac-6": "hsla(0, 0%, 0%,.2)"
      }
    },
    plugins: []
  }
};
