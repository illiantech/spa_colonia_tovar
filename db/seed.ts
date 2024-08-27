import { db, Sites } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Sites).values([{ id: "sdsd" }, { id: "sdsdsds" }]);
}
