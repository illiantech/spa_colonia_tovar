import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      nesting: true,
    }),
    preact(),
  ],

  site: "https://illiantech.github.io",
  base: "spa_colonia_tovar",
});
