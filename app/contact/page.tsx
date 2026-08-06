import { Mail, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { socials } from "@/data/socials";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Al Hutchinson about healthcare innovation, AI-assisted workflows, teaching, research, and creative technology collaborations.",
  path: "/contact",
});

const interests = [
  "Healthcare AI concepts and workflow design",
  "Teaching, workshops and speaking",
  "Research collaboration and co-writing",
  "Creative and media projects",
  "Advisory and consulting conversations",
];

const hasPlaceholderSocials = socials.some((s) => s.isPlaceholder);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        heading="Start a conversation."
        lead="Whether you work in a facility, teach, build, or are simply thinking about the same problems — I would like to hear from you."
      />

      <section className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ── Details ───────────────────────────────────────────────── */}
          <Reveal className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <h2 className="eyebrow">Direct</h2>

              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <Mail
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-accent"
                  />
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-ink transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-accent"
                  />
                  <span className="text-sm text-ink-muted">{site.location}</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="eyebrow">Elsewhere</h2>
              <SocialLinks showLabels />
              {hasPlaceholderSocials ? (
                <p className="text-xs text-ink-muted">
                  Some profile links are still placeholders and are marked as such.
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="eyebrow">Open to</h2>
              <ul className="flex flex-col gap-3">
                {interests.map((interest) => (
                  <li key={interest} className="flex gap-3 text-sm text-ink-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="leading-relaxed">{interest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ── Form ──────────────────────────────────────────────────── */}
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="rounded-2xl border border-hairline bg-surface/40 p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
