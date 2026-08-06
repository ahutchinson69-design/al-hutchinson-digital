/** Section 3 — Personal introduction. */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function Introduction() {
  return (
    <section className="border-t border-hairline bg-canvas-2">
      <div className="shell section-y">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Introduction</p>
            <h2 className="mt-4 text-2xl leading-[1.15] font-semibold sm:text-3xl lg:text-4xl">
              Experience across disciplines. One practical mission.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              I began developing leadership and resilience through military service
              before building a career in healthcare. Years inside skilled nursing
              environments revealed how documentation burdens, fragmented systems,
              and outdated workflows affect both professionals and residents. My
              current work explores how artificial intelligence, thoughtful design,
              and education can create more efficient and humane systems.
            </p>

            <Link
              href="/about"
              className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              Read My Story
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
