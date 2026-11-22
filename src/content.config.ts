import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().min(8).max(70),
    shortTitle: z.string().min(4).max(46).optional(),
    description: z.string().min(50).max(160),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    part: z.enum(['start', 'fundamentals', 'traditions', 'chemistry', 'ethics']),
    order: z.number().int().min(1),
    category: z.string().min(2).max(40),
    tags: z.array(z.string()).min(1).max(8),
    author: z.string().default('Jeremy Fritzhand'),
    draft: z.boolean().default(false),
    canonicalUrl: z.url().optional(),
    sidenote: z.string().max(260).optional(),
    faqs: z
      .array(
        z.object({
          question: z.string().min(5),
          answer: z.string().min(10),
        })
      )
      .optional(),
    howToSteps: z
      .array(
        z.object({
          name: z.string().min(3),
          text: z.string().min(10),
        })
      )
      .optional(),
  }),
});

export const collections = { guides };
