import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind({
    nesting: true
  }), preact()]
  // site: "https://illiantech.github.io",
  // base: "spa_colonia_tovar"
  ,
  adapter: vercel()
});