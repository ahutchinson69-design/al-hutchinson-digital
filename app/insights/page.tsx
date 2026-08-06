import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredArticle, formatArticleDate } from "@/data/articles";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { InsightsGallery } from "@/components/InsightsGallery";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Insights",
  description:
    "Plain-language writing on healthcare technology, AI workflows, professional education, and what actually changes when intelligent systems reach a working environment.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        heading="Writing and analysis."
        lead="Notes on healthcare technology, AI workflows, and the difference between what a tool promises and what it changes."
      />

      {/* ── Featured article ─────────────────────────────────────────────── */}
      <section className="shell section-y">
        <Reveal>
          <article className="group relative overflow-hidden rounded-3xl border border-hairline bg-canvas-2 p-8 sm:p-12">
            <div aria-hidden="true" className="glow-warm absolute inset-0" />

            <div className="relative flex max-w-3xl flex-col gap-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                <span className="eyebrow">Featured</span>
                <span aria-hidden="true">•</span>
                <span>{featuredArticle.category}</span>
                <span aria-hidden="true">•</span>
                <span>{featuredArticle.readingMinutes} min read</span>
                <span aria-hidden="true">•</span>
                <span>{formatArticleDate(featuredArticle.publishedAt)}</span>
              </div>

              <h2 className="text-2xl leading-tight font-semibold sm:text-3xl lg:text-4xl">
                <Link
                  href={`/insights/${featuredArticle.slug}`}
                  className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
                >
                  {featuredArticle.title}
                </Link>
              </h2>

              <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                {featuredArticle.summary}
              </p>

              <span
                aria-hidden="true"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent"
              >
                Read Article
                <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
              </span>
            </div>
          </article>
        </Reveal>
      </section>

      {/* ── All articles ─────────────────────────────────────────────────── */}
      <section className="border-t border-hairline">
        <div className="shell section-y">
          <Reveal className="mb-10">
            <SectionHeading eyebrow="Archive" heading="All articles." />
          </Reveal>

          <InsightsGallery />
        </div>
      </section>

      <section className="border-t border-hairline bg-canvas-2">
        <div className="shell section-y">
          <Reveal>
            <NewsletterSignup />
          </Reveal>
        </div>
      </section>
    </>
  );
}
