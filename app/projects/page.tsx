import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { CallToAction } from "@/components/CallToAction";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Healthcare AI concepts, education resources, design research and creative media projects developed by Al Hutchinson under Hutchinson FutureWorks.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        heading="Concepts, research, and creative work."
        lead="Each project states plainly where it stands — concept, active, research, or published. Nothing here claims an outcome it has not earned."
      />

      <section className="shell section-y">
        {/* useSearchParams requires a Suspense boundary during prerendering */}
        <Suspense
          fallback={
            <p className="text-sm text-ink-muted">Loading projects…</p>
          }
        >
          <ProjectGallery />
        </Suspense>
      </section>

      <CallToAction
        heading="Working on something similar?"
        body="If any of this overlaps with a problem you are facing, I would be glad to compare notes."
        secondary={{ label: "Read Insights", href: "/insights" }}
      />
    </>
  );
}
