/**
 * PageHero — the standard top-of-page block for every route except Home,
 * which has its own bespoke hero.
 */

import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PageHero({
  eyebrow,
  heading,
  lead,
  children,
}: {
  eyebrow: string;
  heading: string;
  lead?: string;
  /** Buttons or supporting content rendered beneath the lead. */
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div aria-hidden="true" className="glow-warm absolute inset-0" />

      <div className="shell relative pt-28 pb-14 sm:pt-32 md:pt-40 md:pb-20">
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          heading={heading}
          lead={lead}
        />
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
