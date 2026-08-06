/**
 * MediaLinkChips — external links for a media item.
 *
 * Links still marked as placeholders in data/media.ts render as inert chips
 * labelled "link coming soon" rather than as live anchors, so the site never
 * sends a visitor to a URL that does not exist.
 */

import { ExternalLink } from "lucide-react";
import type { MediaLink } from "@/data/media";
import { cn } from "@/lib/cn";

const chip =
  "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm";

export function MediaLinkChips({
  links,
  className,
}: {
  links: MediaLink[];
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <li key={link.label}>
          {link.isPlaceholder ? (
            <span
              className={cn(
                chip,
                "cursor-not-allowed border-dashed border-hairline text-ink-muted/70",
              )}
            >
              {link.label}
              <span className="text-xs">(link coming soon)</span>
            </span>
          ) : (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                chip,
                "border-hairline text-ink-muted transition-colors hover:border-accent/40 hover:text-accent",
              )}
            >
              {link.label}
              <ExternalLink aria-hidden="true" className="size-3.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
