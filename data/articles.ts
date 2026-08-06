/**
 * Insights / articles.
 *
 * ── Adding an article ───────────────────────────────────────────────────────
 * Append to `articles`. `slug` becomes the URL (/insights/<slug>).
 * `body` is an array of blocks rendered by components/ui/Prose.tsx:
 *   { type: "p" | "h2" | "quote", text }   |   { type: "ul", items: string[] }
 *
 * ── Dates ───────────────────────────────────────────────────────────────────
 * `publishedAt` is intentionally null on every entry. No publication date is
 * invented. Cards show "Date to be added" until a real ISO date is supplied,
 * and undated articles are omitted from structured data.
 */

export type ArticleBlock =
  | { type: "p" | "h2" | "quote"; text: string }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  category: string;
  /** Estimated reading time in minutes. */
  readingMinutes: number;
  /** ISO date string, or null while unpublished. */
  publishedAt: string | null;
  summary: string;
  featured?: boolean;
  contentStatus: "placeholder" | "draft" | "final";
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "where-ai-can-actually-help-skilled-nursing",
    title:
      "Where Artificial Intelligence Can Actually Help Skilled Nursing Facilities",
    category: "Healthcare AI",
    readingMinutes: 7,
    publishedAt: null,
    featured: true,
    contentStatus: "final",
    summary:
      "Most conversations about AI in long-term care start with the technology. A more useful starting point is the parts of the day that consume time without improving care.",
    body: [
      {
        type: "p",
        text: "The question worth asking inside a skilled nursing facility is not what artificial intelligence can do. It is which parts of the day consume attention without improving anyone's care, and whether any of them can be safely reduced.",
      },
      { type: "h2", text: "Start from the friction, not the capability" },
      {
        type: "p",
        text: "Technology introduced on its own terms tends to be added on top of existing work. Staff end up maintaining the old process and the new system at once. Starting from observed friction produces a much shorter and more honest list of opportunities.",
      },
      {
        type: "ul",
        items: [
          "Information re-entered into more than one system.",
          "Review steps that exist only because an earlier step is unreliable.",
          "Reporting assembled by hand from records that already exist.",
          "Handoffs where context is reconstructed rather than carried forward.",
        ],
      },
      { type: "h2", text: "The boundary that matters" },
      {
        type: "p",
        text: "There is a meaningful difference between a system that organises what a clinician recorded and one that decides what should have been recorded. The first reduces load. The second relocates responsibility to something that cannot hold it.",
      },
      {
        type: "quote",
        text: "AI systems should support professional judgment, not replace licensed clinical decision-making.",
      },
      { type: "h2", text: "What good looks like" },
      {
        type: "p",
        text: "A well-placed assistive system is unremarkable in use. It removes a step, catches an omission before it becomes a finding, and makes review predictable. It does not require anyone to trust it beyond what it has shown.",
      },
      {
        type: "p",
        text: "That is a lower ceiling than most AI marketing suggests. It is also the version most likely to survive contact with a real building, a real schedule, and real staffing.",
      },
    ],
  },
  {
    slug: "automating-work-versus-improving-work",
    title: "The Difference Between Automating Work and Improving Work",
    category: "Technology & Systems",
    readingMinutes: 5,
    publishedAt: null,
    contentStatus: "final",
    summary:
      "Automation makes an existing process faster. Improvement asks whether the process should exist. The two get confused constantly, and the confusion is expensive.",
    body: [
      {
        type: "p",
        text: "Automation takes a process as given and makes it faster. Improvement asks whether the process should exist in that shape at all. The distinction sounds academic until you have automated something that should have been removed.",
      },
      { type: "h2", text: "Automation preserves assumptions" },
      {
        type: "p",
        text: "Every process encodes decisions about how work should flow — many of them made years ago, under different constraints, by people no longer present. Automating that process preserves those decisions and makes them harder to revisit, because now they are also expensive to change.",
      },
      { type: "h2", text: "A short diagnostic" },
      {
        type: "ul",
        items: [
          "Who consumes this output, and what decision does it inform?",
          "What would break if this step stopped tomorrow?",
          "Does this step exist to create value, or to compensate for an earlier failure?",
          "Would a person new to the work invent this step from scratch?",
        ],
      },
      {
        type: "p",
        text: "Steps that survive those four questions are worth automating. Steps that do not are worth deleting, and deleting is cheaper.",
      },
      { type: "h2", text: "Why this matters more with AI" },
      {
        type: "p",
        text: "AI lowers the cost of automating almost anything, including work that should not be done. When automation is cheap, the discipline of asking whether a process deserves to exist becomes the scarce skill — not the implementation.",
      },
    ],
  },
  {
    slug: "why-healthcare-professionals-need-practical-ai-education",
    title: "Why Healthcare Professionals Need Practical AI Education",
    category: "Education",
    readingMinutes: 6,
    publishedAt: null,
    contentStatus: "final",
    summary:
      "Clinical staff are already using these tools. The open question is whether they are using them with any framework for judging when the output can be trusted.",
    body: [
      {
        type: "p",
        text: "Healthcare professionals are already using AI tools — for drafting, for summarising, for making sense of an unfamiliar policy at the end of a long shift. The question is no longer whether to introduce them. It is whether anyone has been given a framework for judging when the output can be relied on.",
      },
      { type: "h2", text: "Awareness training is not enough" },
      {
        type: "p",
        text: "Most available education explains what AI is. Very little of it explains what to do when a tool produces something confident and wrong, which is the situation that actually arises.",
      },
      { type: "h2", text: "What practical education covers" },
      {
        type: "ul",
        items: [
          "Which tasks these tools are genuinely reliable for, and which they are not.",
          "How to phrase a request so the output is specific enough to check.",
          "How to verify a claim before it reaches a record or a decision.",
          "What must never be entered into a general-purpose tool.",
          "Where professional and regulatory responsibility remains, regardless of the tool.",
        ],
      },
      { type: "h2", text: "Delivered in the shape of the job" },
      {
        type: "p",
        text: "Education that assumes a free afternoon will not reach the people who most need it. Short, specific, immediately applicable material fits the schedule that clinical staff actually have — and it is the format most likely to change what happens on the floor.",
      },
    ],
  },
];

/* ── Helpers ───────────────────────────────────────────────────────────── */

export const featuredArticle = articles.find((a) => a.featured) ?? articles[0];

export const articleCategories = Array.from(
  new Set(articles.map((a) => a.category)),
).sort();

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/**
 * Formats a publication date, or returns an honest placeholder label when no
 * date has been supplied. Never invents one.
 */
export function formatArticleDate(publishedAt: string | null): string {
  if (!publishedAt) return "Date to be added";
  return new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
