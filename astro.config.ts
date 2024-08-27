import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    nesting: true
  }), preact(), db()],
  site: "https://illiantech.github.io",
  base: "spa_colonia_tovar"
});