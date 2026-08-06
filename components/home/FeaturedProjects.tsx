/** Section 4 — Featured projects. */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedProjects() {
  return (
    <section id="work" className="border-t border-hairline">
      <div className="shell section-y">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            heading="Projects and concepts."
            lead="Concepts, research and creative work developed under Hutchinson FutureWorks. Each entry states plainly where it currently stands."
          />

          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            All projects
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 3) * 0.08}>
              <ProjectCard project={project} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
