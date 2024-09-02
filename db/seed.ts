import { db, Images, Sites } from "astro:db";

export default async function seed() {
  await db.insert(Sites).values([
    {
      id: "site-one",
      title: "hola mundo",
      tlf: "23232323",
      openingHours: "Lunes a Viernes 9:00 AM - 5:00 PM",
      location: "en la plaza",
      link: "http://",
      description: "lorem ipsum dolor sit amet, consectetur adipis",
      category: "place"
    }
  ]);

  await db.insert(Images).values([
    {
      id: crypto.randomUUID(),
      src: "/spa_colonia_tovar/example.jpg",
      alt: "example",
      siteId: "site-one"
    },
    {
      id: crypto.randomUUID(),
      src: "/spa_colonia_tovar/example1.jpg",
      alt: "example1",
      siteId: "site-one"
    },
    {
      id: crypto.randomUUID(),
      src: "/spa_colonia_tovar/example2.jpg",
      alt: "example2",
      siteId: "site-one"
    }
  ]);
}
