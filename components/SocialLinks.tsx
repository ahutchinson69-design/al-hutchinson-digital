/**
 * SocialLinks.
 *
 * lucide-react v1 removed brand glyphs, so the marks below are inline SVG.
 * Profiles still flagged as placeholders in data/socials.ts render with
 * rel="nofollow" and a tooltip noting they are not yet configured — the link
 * still works so it can be tested, but it is never advertised to crawlers.
 */

import { Mail } from "lucide-react";
import { socials, type SocialIconName } from "@/data/socials";
import { cn } from "@/lib/cn";

function BrandMark({ name }: { name: SocialIconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: "size-[1.125rem]",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05c.53-.95 1.83-1.96 3.76-1.96C21.6 8.75 23 11 23 14.24V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9Z" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.42.36.8 1.08.8 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.09 0 12 0 12s0 3.91.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14c.5-1.89.5-5.8.5-5.8s0-3.91-.5-5.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.72a6.12 6.12 0 1 0 0 12.24 6.12 6.12 0 0 0 0-12.24Zm0 10.09a3.97 3.97 0 1 1 0-7.94 3.97 3.97 0 0 1 0 7.94Zm7.79-10.33a1.43 1.43 0 1 1-2.86 0 1.43 1.43 0 0 1 2.86 0Z" />
        </svg>
      );
    case "mail":
      return <Mail aria-hidden="true" className="size-[1.125rem]" />;
  }
}

export function SocialLinks({
  className,
  showLabels = false,
}: {
  className?: string;
  showLabels?: boolean;
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target={social.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={cn(
              social.href.startsWith("mailto:") ? "" : "noopener noreferrer",
              social.isPlaceholder ? "nofollow" : "",
            ).trim()}
            title={
              social.isPlaceholder
                ? `${social.label} — placeholder link, not yet configured`
                : social.label
            }
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline",
              "px-4 text-ink-muted transition-colors",
              "hover:border-accent/40 hover:text-accent",
              showLabels ? "" : "justify-center px-0 w-11",
            )}
          >
            <BrandMark name={social.icon} />
            <span className={showLabels ? "text-sm" : "sr-only"}>
              {social.label}
              {social.isPlaceholder ? " (placeholder link)" : ""}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
