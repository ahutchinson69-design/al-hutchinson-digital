import { featuredMedia, mediaItems } from "@/data/media";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CallToAction } from "@/components/CallToAction";
import { MediaLinkChips } from "@/components/MediaLinkChips";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Media",
  description:
    "Moon Tape Radio, video and audio projects, visual design work and educational infographics by Al Hutchinson.",
  path: "/media",
});

/** Maps a media kind to its placeholder icon. */
const kindIcon = {
  video: "play",
  audio: "music",
  visual: "sparkles",
} as const;

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        heading="Creative and visual work."
        lead="Atmosphere, world-building, and visual explanation — the side of the work that is made to be felt rather than read."
      />

      {/* ── Featured: Moon Tape Radio ────────────────────────────────────── */}
      <section className="shell section-y">
        <Reveal className="overflow-hidden rounded-3xl border border-hairline bg-surface/40">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
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

              <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">
                {featuredMedia.title}
              </h2>

              <p className="text-base leading-relaxed text-ink-muted">
                {featuredMedia.description}
              </p>

              <MediaLinkChips links={featuredMedia.links} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Everything else ──────────────────────────────────────────────── */}
      <section className="border-t border-hairline bg-canvas-2">
        <div className="shell section-y">
          <Reveal>
            <SectionHeading
              eyebrow="Portfolio"
              heading="Other creative work."
              lead="Video, audio, illustration and visual explanation projects at various stages."
            />
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mediaItems.map((item, index) => (
              <Reveal as="li" key={item.slug} delay={(index % 3) * 0.07}>
                <article className="flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-surface/60 p-3">
                  <MediaPlaceholder
                    src={item.image}
                    alt={item.imageAlt}
                    seed={item.slug}
                    icon={kindIcon[item.kind]}
                  />

                  <div className="flex flex-1 flex-col gap-3 p-4 pt-1">
                    <p className="eyebrow">{item.category}</p>
                    <h3 className="text-base font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                    <MediaLinkChips
                      links={item.links}
                      className="mt-auto pt-2"
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction
        eyebrow="Media"
        heading="Collaborating on something visual?"
        body="I am interested in projects that pair careful visual work with a clear idea worth communicating."
        secondary={{ label: "See All Projects", href: "/projects" }}
      />
    </>
  );
}
