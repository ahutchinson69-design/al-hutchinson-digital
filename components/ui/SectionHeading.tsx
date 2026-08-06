/**
 * SectionHeading — the standard eyebrow + heading + lead block.
 *
 * `as` controls the heading level so that pages keep a correct, sequential
 * heading outline regardless of where the component is used.
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  heading: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  /** Constrains the heading width; defaults to a comfortable measure. */
  headingClassName?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  lead,
  as: Tag = "h2",
  align = "left",
  className,
  headingClassName,
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

      <Tag
        className={cn(
          Tag === "h1"
            ? "text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl"
            : "text-2xl leading-[1.15] font-semibold sm:text-3xl lg:text-4xl",
          "max-w-3xl",
          headingClassName,
        )}
      >
        {heading}
      </Tag>

      {lead ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg",
            centered && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
