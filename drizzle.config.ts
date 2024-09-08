// /// <reference path="./.astro/types.d.ts" />

import dotenv from "dotenv";

dotenv.config();

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schemas.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
    authToken: process.env.DATABASE_TOKEN ?? ""
  }
} satisfies Config;
