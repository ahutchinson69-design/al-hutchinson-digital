/**
 * Prose — renders the structured article body from data/articles.ts.
 *
 * A tiny block renderer rather than a markdown dependency: article content is
 * authored as typed data, which keeps it validated at build time and avoids
 * shipping a parser to the client.
 */

import type { ArticleBlock } from "@/data/articles";

export function Prose({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-6 text-xl font-semibold text-ink sm:text-2xl"
              >
                {block.text}
              </h2>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-accent py-1 pl-5 text-lg leading-relaxed text-ink italic"
              >
                {block.text}
              </blockquote>
            );

          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );

          default:
            return (
              <p key={i} className="leading-relaxed text-ink-muted">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
