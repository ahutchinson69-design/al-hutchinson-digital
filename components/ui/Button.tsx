/**
 * Button — renders as a Link when `href` is provided, otherwise as a <button>.
 *
 * All variants meet the 44px minimum touch target at the `md` size and carry a
 * visible focus ring via the global :focus-visible rule.
 */

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "group whitespace-nowrap transition-[background-color,color,border-color,transform] duration-300 " +
  "ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-canvas hover:bg-accent-hover " +
    "shadow-[0_8px_30px_-10px_rgba(243,223,162,0.6)]",
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
  /** Adds a nested arrow circle at the trailing edge. */
  withArrow?: boolean;
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
    withArrow,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    withArrow && "pr-1.5",
    className,
  );
  const content = (
    <>
      {children}
      {withArrow ? (
        <span
          aria-hidden="true"
          className={cn(
            "ml-1 inline-flex size-8 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
            variant === "primary" ? "bg-canvas/90 text-accent" : "bg-white/10 text-ink",
          )}
        >
          <ArrowUpRight className="size-4" />
        </span>
      ) : null}
    </>
  );

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
        {content}
      </Link>
    );
  }

  const buttonRest = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
