import { defineCollection, z } from 'astro:content';

const editorialSource = z.object({
  label: z.string(),
  url: z.string().url(),
  organization: z.string().optional(),
  period: z.string().optional(),
  retrievedAt: z.coerce.date().optional(),
  note: z.string().optional()
});

const keyFigure = z.object({
  value: z.string(),
  label: z.string(),
  note: z.string().optional()
});

const galsenFacts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['fr', 'en']),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    coveredPeriod: z.string().optional(),
    category: z.enum(['public-spending', 'development', 'places-heritage', 'other']),
    format: z.enum(['exploration', 'brief', 'report']).default('exploration'),
    draft: z.boolean().default(true),
    sources: z.array(editorialSource).min(1),
    keyFigures: z.array(keyFigure).max(5).optional(),
    dataDownload: z.string().optional()
  })
});

export const collections = {
  'galsen-facts': galsenFacts
};
