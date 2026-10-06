/** Section 9 — Media and creative work. */

import { Button } from "@/components/ui/Button";
import { featuredMedia } from "@/data/media";
import { MediaLinkChips } from "@/components/MediaLinkChips";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Reveal } from "@/components/ui/Reveal";

export function MediaFeature() {
  return (
    <section className="bg-canvas-2/60">
      <div className="shell section-y">
        <Reveal className="bezel">
          <div className="bezel-core grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-3">
              <MediaPlaceholder
                src={featuredMedia.image}
                alt={featuredMedia.imageAlt}
                seed={featuredMedia.slug}
                icon="music"
                aspect="aspect-16/10 lg:aspect-auto lg:h-full"
                className="rounded-[1.25rem] border-0 lg:rounded-[1.25rem]"
                sizes="(min-width: 1024px) 40rem, 94vw"
              />
            </div>

            <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
              <p className="pill-label w-fit">{featuredMedia.category}</p>

              <h2 className="text-2xl leading-tight font-semibold sm:text-3xl">
                {featuredMedia.title}
              </h2>

              <p className="text-base leading-relaxed text-ink-muted">
                {featuredMedia.description}
              </p>

              <MediaLinkChips links={featuredMedia.links} />

              <Button href="/media" withArrow className="mt-1 w-fit">
                Explore media and creative work
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
