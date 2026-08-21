import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
    badge: z.string().optional(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
        message: 'tags must be unique',
    }).optional(),
});

const storeSchema = z.object({
    title: z.string(),
    description: z.string(),
    custom_link_label: z.string(),
    custom_link: z.string().optional(),
    updatedDate: z.coerce.date(),
    pricing: z.string().optional(),
    oldPricing: z.string().optional(),
    badge: z.string().optional(),
    checkoutUrl: z.string().optional(),
    heroImage: z.string().optional(),
});

// Reading list — one YAML file per book in src/content/reading/.
// Category controls which section the book renders under on /reading.
const readingSchema = z.object({
    title: z.string(),
    author: z.string(),
    year: z.number().optional(),
    category: z.enum([
        'foundational',     // How to think about technology entrepreneurship
        'institutional',    // Institutional and political economy of startups
        'classroom',        // What I assign in my classes
        'return-to',        // Books I keep returning to
        'recent',           // Recently
    ]),
    why: z.string(),        // One-line annotation: why this book matters
    link: z.url().optional(),
    order: z.number().optional(), // optional fine-tuning of order within a category (lower = earlier)
});

export type BlogSchema = z.infer<typeof blogSchema>;
export type StoreSchema = z.infer<typeof storeSchema>;
export type ReadingSchema = z.infer<typeof readingSchema>;

const blogCollection = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: blogSchema,
});

const readingCollection = defineCollection({
    loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/reading' }),
    schema: readingSchema,
});

// NOTE: the `store` collection has no content directory in this repo and is not
// read by any page. Its schema and exported type are kept because
// src/layouts/StoreItemLayout.astro imports StoreSchema, but registering it as a
// collection would point a glob loader at a directory that does not exist.
export const collections = {
    'blog': blogCollection,
    'reading': readingCollection,
}
