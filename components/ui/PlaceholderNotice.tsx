/**
 * PlaceholderNotice — a visible, honest label for scaffolding content.
 *
 * Used wherever the copy on screen is illustrative rather than a verified
 * account, so a visitor is never misled and the site owner can see at a glance
 * what still needs replacing.
 */

import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

export function PlaceholderNotice({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-dashed border-hairline-strong",
        "bg-white/[0.02] px-4 py-3 text-sm text-ink-muted",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
      <p>
        <span className="font-medium text-ink">Placeholder content. </span>
        {children}
      </p>
    </div>
  );
}
