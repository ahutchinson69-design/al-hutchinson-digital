import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { PageHero } from "@/components/PageHero";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

export const metadata = pageMetadata({
  title: "Accessibility",
  description: `Accessibility statement for ${site.name}.`,
  path: "/accessibility",
});

const measures = [
  "Semantic HTML with a sequential heading structure on every page.",
  "A skip link as the first tab stop, and visible focus indicators throughout.",
  "Keyboard-operable navigation, including a focus-trapped mobile drawer that closes on Escape.",
  "Form fields with real labels, errors linked via aria-describedby, and an error summary that receives focus.",
  "Status and category information conveyed by text and shape, never by colour alone.",
  "Full support for prefers-reduced-motion — all animation is suppressed when requested.",
  "Touch targets sized to at least 44×44 pixels.",
  "Layouts that reflow without horizontal scrolling from small phones to large desktop displays.",
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        heading="Accessibility statement."
        lead="What has been built in, and how to report something that does not work."
      />

      <section className="shell section-y">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          <PlaceholderNotice>
            This statement describes the measures implemented during development.
            It has not yet been validated by a formal audit or by assistive
            technology testing, so it does not claim a WCAG conformance level.
          </PlaceholderNotice>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-ink">
              Measures taken
            </h2>
            <ul className="flex flex-col gap-3">
              {measures.map((measure) => (
                <li key={measure} className="flex gap-3 text-ink-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="leading-relaxed">{measure}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-ink">Known limitations</h2>
            <p className="leading-relaxed text-ink-muted">
              Several images are generated placeholders pending real assets. Once
              photographs and project imagery are added, each will need meaningful
              alternative text supplied alongside it in the data files.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-ink">Feedback</h2>
            <p className="leading-relaxed text-ink-muted">
              If you encounter a barrier on this site, please report it to{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-accent hover:text-accent-hover"
              >
                {site.email}
              </a>{" "}
              (placeholder address). Reports are welcome and will be acted on.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
