import { z } from "astro/zod";

export const schemaSites = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    tlf: z.string().optional(),
    openingHours: z.string().optional(),
    location: z.string(),
    description: z.string(),
    links: z.array(
      z.object({
        url: z.string().url(),
        id: z.string().uuid()
      })
    ),
    images: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
        id: z.string().uuid()
      })
    )
  })
);
