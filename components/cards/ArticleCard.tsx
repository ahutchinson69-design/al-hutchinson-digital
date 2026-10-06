/**
 * ArticleCard — Insights listing and homepage preview.
 *
 * Dates come from `formatArticleDate`, which returns "Date to be added" rather
 * than inventing a publication date for unpublished drafts.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatArticleDate, type Article } from "@/data/articles";
import { cn } from "@/lib/cn";

export function ArticleCard({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) {
  return (
    <article className={cn("bezel group relative lift focus-within:ring-2 focus-within:ring-accent/60", className)}>
      <div className="bezel-core flex h-full flex-col gap-4 p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
          <span className="font-medium text-accent">{article.category}</span>
          <span aria-hidden="true" className="text-hairline-strong">
            •
          </span>
          <span>{article.readingMinutes} min read</span>
          <span aria-hidden="true" className="text-hairline-strong">
            •
          </span>
          <span>{formatArticleDate(article.publishedAt)}</span>
        </div>

        <h3 className="text-lg leading-snug font-semibold text-ink sm:text-xl">
          <Link
            href={`/insights/${article.slug}`}
            className="after:absolute after:-inset-[0.375rem] after:rounded-[2rem] after:content-['']"
          >
            {article.title}
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-ink-muted">{article.summary}</p>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2 pt-1 text-sm font-medium text-accent"
        >
          Read Article
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
            <ArrowRight className="size-3.5" />
          </span>
        </span>
      </div>
    </article>
  );
}
