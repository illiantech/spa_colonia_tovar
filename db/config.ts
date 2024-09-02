/// <reference path="../.astro/integrations/astro_db/db.d.ts" />
/// <reference path="../node_modules/@astrojs/db/virtual.d.ts" />

import { column, defineDb, defineTable } from "astro:db";

const Images = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    src: column.text(),
    alt: column.text(),
    siteId: column.text({ references: () => Sites.columns.id })
  }
});

export const Sites = defineTable({
  columns: {
    title: column.text(),
    tlf: column.text({ optional: true }),
    openingHours: column.text({ optional: true }),
    category: column.text({
      enum: ["place", "inn", "restaurant", "activitys"]
    }),
    location: column.text(),
    link: column.text(),
    description: column.text(),
    id: column.text({ primaryKey: true, unique: true })
  }
});

const Comments = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    elapsedTime: column.number(),
    content: column.text(),
    siteId: column.text({ references: () => Sites.columns.id }),
    userId: column.text({ references: () => Users.columns.id })
  }
});

const Users = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    email: column.text(),
    password: column.text()
  }
});

const Likes = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    siteId: column.text({ references: () => Sites.columns.id }),
    userId: column.text({ references: () => Users.columns.id })
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { Sites, Likes, Users, Comments, Images }
});
