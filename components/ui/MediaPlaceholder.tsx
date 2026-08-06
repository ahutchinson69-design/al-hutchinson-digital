/**
 * Image / media frame used by project cards, media cards and detail pages.
 *
 * Renders a real image when one is supplied, otherwise a generated geometric
 * placeholder. The placeholder pattern is derived from the label so each
 * project gets a stable, distinct look without needing any asset files.
 */

import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Props = {
  /** Path under /public. Null renders the generated placeholder. */
  src?: string | null;
  /** Required whenever `src` is set. */
  alt?: string;
  /** Used to derive a stable placeholder pattern. */
  seed: string;
  icon?: IconName;
  className?: string;
  /** Tailwind aspect ratio class, e.g. "aspect-video". */
  aspect?: string;
  sizes?: string;
};

export function MediaPlaceholder({
  src,
  alt,
  seed,
  icon = "sparkles",
  className,
  aspect = "aspect-16/10",
  sizes = "(min-width: 1024px) 30rem, (min-width: 640px) 50vw, 92vw",
}: Props) {
  const frame = cn(
    "relative overflow-hidden rounded-xl border border-hairline bg-canvas-2",
    aspect,
    className,
  );

  if (src) {
    return (
      <div className={frame}>
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  // Stable per-seed rotation so every card looks intentional but distinct.
  const hash = Array.from(seed).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const angle = hash % 60;

  return (
    <div className={frame}>
      <div aria-hidden="true" className="grid-faint absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${angle + 120}deg, rgba(243,223,162,0.10), rgba(243,223,162,0) 58%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-12 -bottom-16 size-52 rounded-full border border-accent/15"
      />
      <div
        aria-hidden="true"
        className="absolute -right-4 -bottom-8 size-32 rounded-full border border-accent/10"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <Icon name={icon} className="size-7 text-accent/70" />
        <span className="text-[0.625rem] tracking-[0.2em] text-ink-muted/80 uppercase">
          Image placeholder
        </span>
      </div>
    </div>
  );
}
