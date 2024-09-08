import type { APIRoute } from "astro";
import { schemaSites } from "../../schemas/sites";
import { findSitesByCategory } from "../../services/sites";
import { res } from "../../utils/utilityFunctions";

// import { createHash } from "node:crypto";
// export const generateID = (str: string) =>
//   createHash("sha256").update(str).digest("hex");

export const getSites: APIRoute = async ({ params }) => {
  const SITES = await findSitesByCategory(params);

  const validation = schemaSites.safeParse(SITES);

  if (!validation.success) {
    return res(
      JSON.stringify({
        error: "Invalid data",
        details: validation.error
      }),
      {
        status: 406
      }
    );
  }

  return res(JSON.stringify(SITES), {
    status: 200
  });
};
