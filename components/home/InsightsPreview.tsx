/** Section 8 — Insights. */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InsightsPreview() {
  return (
    <section className="border-t border-hairline">
      <div className="shell section-y">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Insights"
            heading="Writing and analysis."
            lead="Plain-language thinking on healthcare technology, AI workflows, and what actually changes when these tools arrive in a working environment."
          />

          <Link
            href="/insights"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            All insights
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.08}>
              <ArticleCard article={article} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
