import type { Params } from "astro";
import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { Categorys, Images, Links, Sites } from "../db/schemas";
import { CategorysEnum } from "../utils/enums";
import type { TourismSite, UUID } from "../utils/types";
import { notRepeatData } from "../utils/utilityFunctions";

export const findSitesByCategory = async (params: Params) => {
  const { category } = params;

  const { title, tlf, openingHours, location, description, id } = Sites;

  const DATA = await db
    .select({
      Images,
      Links,
      title,
      tlf,
      openingHours,
      location,
      description,
      id
    })
    .from(Sites)
    .innerJoin(Categorys, eq(Categorys.id, Sites.categoryId))
    .where(eq(Categorys.category, category as CategorysEnum))
    .innerJoin(Images, eq(Images.siteId, Sites.id))
    .innerJoin(Links, eq(Links.siteId, Sites.id));

  const SITES = Object.values(
    DATA.reduce((acc: Record<string, TourismSite>, item) => {
      const { id, Links, Images } = item;

      if (!acc[id])
        acc[id] = {
          id,
          title: item.title,
          tlf: item.tlf,
          openingHours: item.openingHours,
          location: item.location,
          description: item.description,
          links: [],
          images: []
        } as TourismSite;

      const NOT_LINK_REPEAT = notRepeatData({
        arr: acc[id].links,
        id: Links.id as UUID
      });

      const NOT_IMAGE_REPEAT = notRepeatData({
        arr: acc[id].images,
        id: Images.id as UUID
      });

      if (NOT_LINK_REPEAT)
        acc[id].links.push({
          id: Links.id as UUID,
          url: Links.url
        });

      if (NOT_IMAGE_REPEAT)
        acc[id].images.push({
          id: Images.id as UUID,
          src: Images.src,
          alt: Images.alt
        });

      return acc;
    }, {})
  );

  return SITES;
};
