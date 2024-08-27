import { db, Sites } from "astro:db";

// fetch(
//   "https://raw.githubusercontent.com/illiantech/spa_colonia_tovar/main/JSON/tourismSites.json"
// )
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("errooor");
//   });

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Sites).values([{ id: "sdsd" }, { id: "sdsdsds" }]);
}
