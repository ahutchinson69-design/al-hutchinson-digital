/**
 * Metadata helpers.
 *
 * Every page calls `pageMetadata()` so titles, canonical URLs, Open Graph and
 * Twitter cards stay consistent. The production domain is a placeholder in
 * data/site.ts — update it there and every URL here follows.
 */

import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadataBase = new URL(site.url);

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/projects". */
  path: string;
  /** Renders as an article rather than a website in Open Graph. */
  type?: "website" | "article";
};

/**
 * Routes served by `app/opengraph-image.tsx` and `app/twitter-image.tsx`.
 *
 * These must be referenced explicitly. Next only injects a file-based social
 * image automatically when a segment does not declare its own `openGraph`
 * object — and every page here does, so declaring one would otherwise drop the
 * generated card on all routes except the homepage.
 */
const OG_IMAGE = "/opengraph-image";
const TWITTER_IMAGE = "/twitter-image";

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = new URL(path, metadataBase).toString();
  const fullTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${site.personName} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [TWITTER_IMAGE],
    },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, metadataBase).toString();
}
