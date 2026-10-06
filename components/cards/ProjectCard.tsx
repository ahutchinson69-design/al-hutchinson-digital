/**
 * ProjectCard — used by the homepage grid and the Projects gallery.
 *
 * The whole card is a single link target (via a stretched overlay) so the hit
 * area is generous on touch, while screen readers still announce one clear
 * link with the project title as its accessible name.
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "bezel group relative lift focus-within:ring-2 focus-within:ring-accent/60",
        className,
      )}
    >
      <div className="bezel-core flex h-full flex-col p-2.5">
        <MediaPlaceholder
          src={project.image}
          alt={project.imageAlt}
          seed={project.slug}
          icon="sparkles"
          className="rounded-[1.25rem] border-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:group-hover:scale-[1.02]"
        />

        <div className="flex flex-1 flex-col gap-3 p-4 pt-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-accent">{project.categoryLabel}</span>
            <StatusBadge status={project.status} className="ms-auto" />
          </div>

          <h3 className="text-lg font-semibold text-ink sm:text-xl">
            <Link href={`/projects/${project.slug}`} className="after:absolute after:-inset-[0.375rem] after:rounded-[2rem] after:content-['']">
              {project.title}
            </Link>
          </h3>

          <p className="text-sm leading-relaxed text-ink-muted">{project.summary}</p>

          <span
            aria-hidden="true"
            className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent"
          >
            View Case Study
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="size-3.5" />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
