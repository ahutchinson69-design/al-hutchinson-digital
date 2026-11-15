import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { PageHero } from "@/components/PageHero";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

export const metadata = pageMetadata({
  title: "Privacy",
  description: `How ${site.name} handles the information you send through the contact and booking forms, and what the site does and does not collect.`,
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
            with a reviewed policy. The contact and booking forms send what you
            enter by email, as described below; update this page if analytics or
            any other data handling are added.
          </PlaceholderNotice>

          <Section title="What is collected">
            <p>
              This site runs no analytics and sets no cookies. It stores nothing
              about visitors. The only information it handles is what you choose
              to send through the contact and booking forms.
            </p>
          </Section>

          <Section title="The contact and booking forms">
            <p>
              When you send either form, the details you entered (your name,
              email address, organization if given, and your message or
              requested times) are sent to my inbox as an email through Resend,
              an email delivery service. The site itself keeps no copy. I use
              those details only to reply to you. Please do not include patient
              information or anything confidential.
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
