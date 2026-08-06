import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { PageHero } from "@/components/PageHero";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

export const metadata = pageMetadata({
  title: "Privacy",
  description: `Privacy information for ${site.name}.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        heading="Privacy information."
        lead="What this site does and does not collect."
      />

      <section className="shell section-y">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          <PlaceholderNotice>
            This is a working outline, not a finished privacy policy. Replace it
            with a reviewed policy before the site handles any real submissions —
            particularly if the contact form is connected to a backend or any
            analytics are added.
          </PlaceholderNotice>

          <Section title="What is collected">
            <p>
              As currently built, this site is entirely static. It runs no
              analytics, sets no cookies, and stores nothing about visitors.
            </p>
          </Section>

          <Section title="The contact form">
            <p>
              The contact form is not connected to a backend. Details entered into
              it are validated in your browser and are never transmitted or
              stored anywhere. If a backend is added later, this section must be
              updated to describe where submissions go, who can read them, and how
              long they are kept.
            </p>
          </Section>

          <Section title="Third parties">
            <p>
              Fonts are served from the deployment itself rather than a third-party
              CDN. External links to social platforms are marked, and those
              platforms apply their own privacy practices once you leave this site.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about privacy can be sent to{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-accent hover:text-accent-hover"
              >
                {site.email}
              </a>{" "}
              (placeholder address).
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="leading-relaxed text-ink-muted">{children}</div>
    </section>
  );
}
