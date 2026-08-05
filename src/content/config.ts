import { defineCollection, z } from 'astro:content';

const nieuws = defineCollection({
  type: 'content',
  schema: z.object({
    titel: z.string(),
    samenvatting: z.string(),
    datum: z.date(),
    auteur: z.string().default('Fleur Wagenaar'),
    afbeelding: z.string().optional(),
    categorie: z.string().default('Afvallen'),
  }),
});

export const collections = { nieuws };
