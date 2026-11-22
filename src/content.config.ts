import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().min(10).max(70),
    description: z.string().min(50).max(160),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.string().min(2).max(40),
    tags: z.array(z.string()).min(1).max(8),
    author: z.string().default('Blockprinting Editorial'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    canonicalUrl: z.url().optional(),
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
