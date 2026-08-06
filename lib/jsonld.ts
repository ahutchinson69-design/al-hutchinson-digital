/**
 * Structured data (schema.org).
 *
 * Accuracy policy: `Person` deliberately omits jobTitle-as-credential,
 * alumniOf, award and worksFor, because none has been verified. `sameAs` only
 * includes social profiles that have been marked as real in data/socials.ts —
 * placeholder URLs are never published to search engines.
 */

import { site } from "@/data/site";
import { publishedSocials } from "@/data/socials";
import { absoluteUrl } from "@/lib/seo";
import type { Article } from "@/data/articles";

export function personJsonLd() {
  const sameAs = publishedSocials.map((s) => s.href);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.personName,
    url: site.url,
    description: site.description,
    knowsAbout: [
      "Healthcare technology",
      "Skilled nursing operations",
      "Artificial intelligence workflows",
      "Professional education",
      "Creative technology",
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": `${site.url}/#person` },
  };
}

/** Undated articles omit datePublished rather than inventing one. */
export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    url: absoluteUrl(`/insights/${article.slug}`),
    articleSection: article.category,
    author: { "@id": `${site.url}/#person` },
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
