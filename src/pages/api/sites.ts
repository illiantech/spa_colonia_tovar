import type { APIRoute } from "astro";
import { db, Sites } from "astro:db";

const res = (
  body: string,
  {
    status,
    statusText,
    headers
  }: { status?: number; statusText: string; headers?: HeadersInit }
) => new Response(body, { status, statusText, headers });

export const ALL: APIRoute = async () => {
  const SITES = await db.all(Sites);

  return res(JSON.stringify(SITES), {
    status: 200,
    statusText: "OK",
    headers: { "Content-Type": "application/json" }
  });
};
