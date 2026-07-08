import { defineCollection, z } from "astro:content";

const locale = z.enum(["en", "de", "da"]);
const contentLocale = z.enum(["en", "de", "da", "all"]);

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale,
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
    featured: z.boolean().default(false)
  })
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    client: z.string(),
    period: z.string(),
    locale,
    role: z.string(),
    summary: z.string(),
    scope: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    visibility: z.enum(["public", "private"]).default("public"),
    featured: z.boolean().default(false),
    confidentialityNote: z.string().optional()
  })
});

const scripts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    locale: contentLocale,
    platform: z.string(),
    riskLevel: z.enum(["Low", "Moderate", "High"]),
    lastReviewed: z.date(),
    prerequisites: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    downloadPath: z.string().optional(),
    draft: z.boolean().default(true)
  })
});

export const collections = { articles, projects, scripts };
