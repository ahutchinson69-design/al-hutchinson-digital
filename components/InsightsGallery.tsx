"use client";

/**
 * InsightsGallery — category filter + search over the article list.
 * Mirrors the ProjectGallery pattern: radio-group filters, live result count.
 */

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { articleCategories, articles } from "@/data/articles";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { cn } from "@/lib/cn";

const FILTERS = ["All", ...articleCategories];

export function InsightsGallery() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return articles.filter((article) => {
      if (filter !== "All" && article.category !== filter) return false;
      if (!needle) return true;

      return [article.title, article.summary, article.category]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [filter, query]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <fieldset>
          <legend className="sr-only">Filter articles by category</legend>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((option) => {
              const active = filter === option;
              return (
                <label
                  key={option}
                  className={cn(
                    "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm transition-colors",
                    "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent",
                    active
                      ? "border-accent bg-accent/10 font-medium text-accent"
                      : "border-hairline text-ink-muted hover:border-hairline-strong hover:text-ink",
                  )}
                >
                  <input
                    type="radio"
                    name="article-category"
                    value={option}
                    checked={active}
                    onChange={() => setFilter(option)}
                    className="sr-only"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="relative w-full lg:max-w-xs">
          <label htmlFor="article-search" className="sr-only">
            Search articles
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted"
          />
          <input
            id="article-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles…"
            className={cn(
              "min-h-12 w-full rounded-full border border-hairline bg-canvas-2",
              "py-3 ps-11 pe-11 text-base text-ink placeholder:text-ink-muted/60",
              "transition-colors hover:border-hairline-strong focus:border-accent focus:outline-none",
            )}
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-accent"
            >
              <X aria-hidden="true" className="size-4" />
              <span className="sr-only">Clear search</span>
            </button>
          ) : null}
        </div>
      </div>

      <p aria-live="polite" className="text-sm text-ink-muted">
        {results.length} {results.length === 1 ? "article" : "articles"}
        {filter === "All" ? "" : ` in ${filter}`}
        {query ? ` matching “${query}”` : ""}
      </p>

      {results.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              className="h-full"
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-hairline-strong px-6 py-16 text-center">
          <p className="text-ink">No articles match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
            className="mt-4 min-h-11 text-sm font-medium text-accent hover:text-accent-hover"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
