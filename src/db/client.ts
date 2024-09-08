import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";

const turso = createClient({
  url: import.meta.env.DATABASE_URL ?? "",
  authToken: import.meta.env.DATABASE_TOKEN ?? ""
});

export const db = drizzle(turso);
