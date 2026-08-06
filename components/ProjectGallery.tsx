"use client";

/**
 * ProjectGallery — filterable, searchable project grid.
 *
 * The active category is mirrored into the URL query string (?category=AI) so
 * a filtered view can be linked to directly — the homepage pillar cards rely
 * on this. Filtering itself is client-side over a small in-memory dataset, so
 * no network round trip is involved.
 *
 * Accessibility: filters are a radio group (only one applies at a time), the
 * result count is announced via aria-live, and the search field is a labelled
 * type="search" input.
 */

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import {
  PROJECT_CATEGORIES,
  projects,
  type ProjectCategory,
} from "@/data/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { cn } from "@/lib/cn";

type Filter = ProjectCategory | "All";

const FILTERS: Filter[] = ["All", ...PROJECT_CATEGORIES];

function isCategory(value: string | null): value is ProjectCategory {
  return (PROJECT_CATEGORIES as readonly string[]).includes(value ?? "");
}

export function ProjectGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = searchParams.get("category");
  const [filter, setFilter] = useState<Filter>(
    isCategory(initial) ? initial : "All",
  );
  const [query, setQuery] = useState("");

  function selectFilter(next: Filter) {
    setFilter(next);
    // Keep the URL shareable without pushing a new history entry per click.
    const params = new URLSearchParams(searchParams.toString());
    if (next === "All") params.delete("category");
    else params.set("category", next);

    const qs = params.toString();
    router.replace(qs ? `/projects?${qs}` : "/projects", { scroll: false });
  }

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return projects.filter((project) => {
      if (filter !== "All" && project.category !== filter) return false;
      if (!needle) return true;

      return [
        project.title,
        project.summary,
        project.categoryLabel,
        project.status,
        ...(project.tools ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [filter, query]);

  return (
    <div className="flex flex-col gap-8">
      {/* ── Controls ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <fieldset className="flex flex-col gap-3">
          <legend className="sr-only">Filter projects by category</legend>

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
                    name="project-category"
                    value={option}
                    checked={active}
                    onChange={() => selectFilter(option)}
                    className="sr-only"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="relative w-full lg:max-w-xs">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted"
          />
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects…"
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
        {results.length} {results.length === 1 ? "project" : "projects"}
        {filter === "All" ? "" : ` in ${filter}`}
        {query ? ` matching “${query}”` : ""}
      </p>

      {/* ── Results ───────────────────────────────────────────────────── */}
      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((project) => (
            <ProjectCard key={project.slug} project={project} className="h-full" />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-hairline-strong px-6 py-16 text-center">
          <p className="text-ink">No projects match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              selectFilter("All");
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
