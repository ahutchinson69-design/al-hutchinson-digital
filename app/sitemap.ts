import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap. Static routes are listed explicitly; project and article routes are
 * derived from the data files, so adding an entry there adds it here too.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/healthcare-ai", priority: 0.9 },
    { path: "/teaching", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/book", priority: 0.8 },
    { path: "/media", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
    { path: "/accessibility", priority: 0.3 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority,
    })),

    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    ...articles.map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      // Only a real publication date is reported; a made-up "modified today"
      // on every build teaches crawlers to ignore the field.
      ...(article.publishedAt ? { lastModified: new Date(article.publishedAt) } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
