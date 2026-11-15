/** Section 8 — Blog: the latest posts. */

import { Button } from "@/components/ui/Button";
import { articles } from "@/data/articles";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BlogPreview() {
  return (
    <section id="blog">
      <div className="shell section-y">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Blog"
            heading="Latest from the blog."
            lead="Plain-language thinking on healthcare technology, AI workflows, and what actually changes when these tools arrive in a working environment."
          />

          <Button href="/blog" variant="secondary" withArrow className="shrink-0">
            All posts
          </Button>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
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
