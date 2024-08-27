/// <reference path="../.astro/integrations/astro_db/db.d.ts" />
/// <reference path="../node_modules/@astrojs/db/virtual.d.ts" />

import { column, defineDb, defineTable } from "astro:db";

export const Sites = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true })
  }
});

const Comments = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),

    content: column.text()
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
  tables: { Sites, Likes, Users, Comments }
});
