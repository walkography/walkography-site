import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schema base per le sezioni principali
const baseSchema = z.object({
  titolo: z.string(),
  data: z.date(),
  taglia: z.enum(['piccola', 'media', 'grande']).default('media'),
  immagine: z.string().optional(),
  estratto: z.string().optional(),
  descrizione: z.string().optional(),
  correlati: z.array(z.object({
    sezione: z.enum(['theory', 'atlas', 'funzone', 'laboratory', 'news']),
    slug: z.string(),
  })).optional(),
});

// Schema per le pagine statiche (About, ecc.)
const pageSchema = z.object({
  titolo: z.string(),
  descrizione: z.string().optional(),
});

// Schema per le news
const newsSchema = z.object({
  titolo: z.string(),
  data: z.date(),
  taglia: z.enum(['piccola', 'media']).default('piccola'),
  estratto: z.string().optional(),
  descrizione: z.string().optional(),
});

export const collections = {
  theory:     defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/theory' }),     schema: baseSchema }),
  atlas:      defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/atlas' }),      schema: baseSchema }),
  funzone:    defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/funzone' }),    schema: baseSchema }),
  laboratory: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/laboratory' }), schema: baseSchema }),
  news:       defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),       schema: newsSchema }),
  pages:      defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),      schema: pageSchema }),
};