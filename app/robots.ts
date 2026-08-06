import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * robots.txt
 *
 * Every crawler is allowed, including the AI assistant crawlers, which are
 * named explicitly rather than left to the wildcard. Naming them is a
 * deliberate signal: several operators check for a specific rule for their own
 * agent and treat its absence as ambiguous. An explicit Allow removes the
 * ambiguity in the direction Al wants — this site is meant to be read, quoted
 * and cited by assistants.
 *
 * A companion /llms.txt gives those crawlers a plain-language summary so they
 * describe Al's credentials accurately instead of inferring them.
 */

/** Crawlers used to build AI training sets and to answer questions live. */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
