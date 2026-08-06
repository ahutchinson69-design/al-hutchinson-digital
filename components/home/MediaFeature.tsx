/** Section 9 — Media and creative work. */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredMedia } from "@/data/media";
import { MediaLinkChips } from "@/components/MediaLinkChips";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Reveal } from "@/components/ui/Reveal";

export function MediaFeature() {
  return (
    <section className="border-t border-hairline bg-canvas-2">
      <div className="shell section-y">
        <Reveal className="overflow-hidden rounded-3xl border border-hairline bg-surface/40">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-3">
              <MediaPlaceholder
                src={featuredMedia.image}
                alt={featuredMedia.imageAlt}
                seed={featuredMedia.slug}
                icon="music"
                aspect="aspect-16/10 lg:aspect-auto lg:h-full"
                className="lg:rounded-2xl"
                sizes="(min-width: 1024px) 40rem, 94vw"
              />
            </div>

            <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
              <p className="eyebrow">{featuredMedia.category}</p>

              <h2 className="text-2xl leading-tight font-semibold sm:text-3xl">
                {featuredMedia.title}
              </h2>

              <p className="text-base leading-relaxed text-ink-muted">
                {featuredMedia.description}
              </p>

              <MediaLinkChips links={featuredMedia.links} />

              <Link
                href="/media"
                className="group inline-flex w-fit items-center gap-2 pt-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                Explore media and creative work
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
