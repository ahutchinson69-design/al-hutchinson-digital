/**
 * Footer — wordmark, mission, navigation, socials and legal placeholders.
 * The copyright year is generated at render time, never hard-coded.
 */

import Link from "next/link";
import { footerMission, footerNav, site } from "@/data/site";
import { SocialLinks } from "@/components/SocialLinks";
import { Wordmark } from "@/components/layout/Wordmark";
import { MEDICAL_DISCLAIMER } from "@/data/healthcare-ai";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-canvas-2">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-6">
            <Wordmark />
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              {footerMission}
            </p>
            <p className="text-xs text-ink-muted/70">
              Experimental projects, research and concepts are published under{" "}
              <span className="text-ink-muted">{site.labName}</span>.
            </p>
            <SocialLinks />
          </div>

          <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.heading} className="flex flex-col gap-4">
                <h2 className="eyebrow">{group.heading}</h2>
                <ul className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink-muted transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-ink-muted/70">
            {MEDICAL_DISCLAIMER}
          </p>
          <p className="text-xs text-ink-muted/70">
            © {year} {site.personName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
