/**
 * CallToAction — the closing block reused across pages.
 */

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Action = { label: string; href: string };

export function CallToAction({
  eyebrow = "Get in touch",
  heading = "Let's build something useful.",
  body = "I am interested in healthcare innovation, AI-assisted workflows, education, research, creative technology, and meaningful professional collaborations.",
  primary = { label: "Start a Conversation", href: "/contact" },
  secondary = { label: "View Projects", href: "/projects" },
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  primary?: Action;
  secondary?: Action;
}) {
  return (
    <section>
      <div className="shell section-y">
        <Reveal className="bezel">
          <div className="bezel-core relative px-6 py-16 sm:px-12 md:py-24">
          <div aria-hidden="true" className="glow-warm absolute inset-0" />

          <div className="relative flex flex-col items-center gap-8">
            <SectionHeading
              eyebrow={eyebrow}
              heading={heading}
              lead={body}
              align="center"
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={primary.href} size="lg" withArrow>
                {primary.label}
              </Button>
              <Button href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            </div>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
