/**
 * Button — renders as a Link when `href` is provided, otherwise as a <button>.
 *
 * All variants meet the 44px minimum touch target at the `md` size and carry a
 * visible focus ring via the global :focus-visible rule.
 */

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-colors transition-transform duration-200 " +
  "motion-safe:hover:-translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-canvas hover:bg-accent-hover " +
    "shadow-[0_1px_24px_-8px_rgba(243,223,162,0.55)]",
  secondary:
    "border border-hairline-strong text-ink hover:border-accent hover:text-accent " +
    "bg-white/[0.02] hover:bg-white/[0.04]",
  ghost: "text-ink-muted hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-6 text-sm sm:text-base",
  lg: "min-h-12 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children"> & {
    href: string;
    /** Opens in a new tab and adds the appropriate rel attributes. */
    external?: boolean;
    /** Adds rel="nofollow" — used for placeholder destinations. */
    nofollow?: boolean;
  };

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    const { href, external, nofollow, ...linkRest } = rest as ButtonAsLink;
    const rel =
      [external ? "noopener noreferrer" : null, nofollow ? "nofollow" : null]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <Link
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={rel}
        {...linkRest}
      >
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
