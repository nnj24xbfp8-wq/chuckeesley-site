import { z, defineCollection } from "astro:content";
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
    link: z.string().url().optional(),
    order: z.number().optional(), // optional fine-tuning of order within a category (lower = earlier)
});

export type BlogSchema = z.infer<typeof blogSchema>;
export type StoreSchema = z.infer<typeof storeSchema>;
export type ReadingSchema = z.infer<typeof readingSchema>;

const blogCollection = defineCollection({ schema: blogSchema });
const storeCollection = defineCollection({ schema: storeSchema });
const readingCollection = defineCollection({ type: 'data', schema: readingSchema });

export const collections = {
    'blog': blogCollection,
    'store': storeCollection,
    'reading': readingCollection,
}