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
    <article
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border border-hairline",
        "bg-surface/60 p-6",
        "transition-[border-color,transform] duration-300",
        "hover:border-hairline-strong motion-safe:hover:-translate-y-1",
        "focus-within:border-accent/50",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
        <span className="eyebrow">{article.category}</span>
        <span aria-hidden="true" className="text-hairline-strong">
          •
        </span>
        <span>{article.readingMinutes} min read</span>
        <span aria-hidden="true" className="text-hairline-strong">
          •
        </span>
        <span>{formatArticleDate(article.publishedAt)}</span>
      </div>

      <h3 className="text-lg leading-snug font-semibold text-ink transition-colors group-hover:text-accent">
        <Link
          href={`/insights/${article.slug}`}
          className="after:absolute after:inset-0"
        >
          {article.title}
        </Link>
      </h3>

      <p className="text-sm leading-relaxed text-ink-muted">{article.summary}</p>

      <span
        aria-hidden="true"
        className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-accent"
      >
        Read Article
        <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
      </span>
    </article>
  );
}
