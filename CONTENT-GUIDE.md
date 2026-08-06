# Content customisation guide

A task-by-task walkthrough. Every change below is a data-file edit — you do not
need to touch a React component for any of it.

After any change, run:

```bash
npm run check
```

That lints, typechecks and builds. TypeScript will catch a mistyped category or
a missing required field before it reaches the browser.

---

## 1. Make the site yours (start here)

Open **`data/site.ts`**.

| Field         | Change it to                                                     |
| ------------- | ---------------------------------------------------------------- |
| `url`         | Your real domain. Everything SEO-related depends on this.        |
| `email`       | A monitored address.                                             |
| `location`    | Keep it broad — city/state or country, never a street address.   |
| `resume.href` | Path to your PDF under `public/`.                                |
| `portrait`    | `"/images/portrait.jpg"` once you add the photo.                 |

Set `resume.isPlaceholder` to `false` once the real PDF is in place — that
removes the "(placeholder)" tag from the download button.

---

## 2. Navigation

Also in `data/site.ts`.

- `primaryNav` — the header bar. Keep it to about seven items; more and it
  wraps awkwardly on laptops.
- `secondaryNav` — reachable from the mobile drawer and footer. Media lives
  here.
- `footerNav` — the three footer columns.

Adding a link here does **not** create the page. Add a `page.tsx` under `app/`
first, or the link will 404.

---

## 3. Your photograph

1. Save it as `public/images/portrait.jpg` (portrait orientation, 1600 × 2000
   is ideal).
2. Set `portrait: "/images/portrait.jpg"` in `data/site.ts`.

It appears in the homepage hero and on the About page. Until then, both show an
abstract "AH" monogram panel.

---

## 4. Social links

**`data/socials.ts`.** Replace each `href`, then set `isPlaceholder: false`.

Until you do:

- the link carries `rel="nofollow"`
- screen readers announce it as "(placeholder link)"
- it is excluded from the `sameAs` array in the site's structured data

That last point matters: publishing a non-existent profile URL to search
engines is worse than publishing none.

Remove entries you do not use — the list is not fixed.

---

## 5. The career timeline

**`data/timeline.ts`.** This is now populated from Al's CV — eight entries from
Fleet Marine Force Corpsman (1987–1991) through DNP candidate (expected 2028),
each with real dates and employers, and all marked `isPlaceholder: false`.

The structure, if you add or amend an entry:

```ts
{
  id: "skilled-nursing",
  title: "Primary Care Nurse Practitioner",
  org: "MedElite Healthcare Management",
  period: "2023 – Present",   // real dates only, or null to show no date
  description: "Your actual account.",
  icon: "building",
  isPlaceholder: false,
},
```

Entries with `period: null` render "Period to be added" rather than an invented
date. The homepage stops showing its "dates and employers omitted" notice once
no entry is marked `isPlaceholder` — which is already the case.

Related: `credentials` in `data/about.ts` holds education, licensure, military
service and decorations, publications, service and honors. Same rule applies —
CV-traceable only.

---

## 6. Projects

**`data/projects.ts`.**

### Minimum viable project

```ts
{
  slug: "my-project",            // becomes /projects/my-project
  title: "My Project",
  category: "Healthcare",        // drives the gallery filter
  categoryLabel: "Healthcare AI",// shown on the card
  status: "Concept",             // Concept | Active | Research | Published
  summary: "One or two sentences.",
  contentStatus: "draft",
  featured: true,                // include on the homepage
  image: null,
}
```

`category` must be one of: `Healthcare`, `AI`, `Education`, `Media`,
`Research`, `Design`. TypeScript rejects anything else.

### Filling out the detail page

Every remaining field is optional and its section disappears when omitted:

| Field       | Renders as                                    |
| ----------- | --------------------------------------------- |
| `overview`  | Opening paragraph                             |
| `problem`   | "The problem" — bulleted                      |
| `solution`  | "Proposed approach" — bulleted                |
| `process`   | Numbered steps (`{ title, description }`)     |
| `tools`     | Sidebar chips                                 |
| `lessons`   | "What this has clarified" — bulleted          |
| `nextSteps` | "Next steps" — bulleted                       |
| `related`   | Related-project cards (array of other slugs)  |

### The placeholder banner

While `contentStatus: "placeholder"`, the detail page shows a visible notice
saying the write-up is illustrative. Change it to `"draft"` or `"final"` once
the copy is genuinely yours.

### Adding an image

```ts
image: "/images/projects/my-project.jpg",
imageAlt: "What the image actually shows",
```

`imageAlt` is required whenever `image` is set.

---

## 7. Articles

**`data/articles.ts`.**

```ts
{
  slug: "my-article",
  title: "My Article",
  category: "Healthcare AI",   // free text; drives the Insights filters
  readingMinutes: 6,
  publishedAt: "2026-03-14",   // ISO date, or null
  summary: "One or two sentences for the card.",
  featured: false,             // exactly one article should be featured
  contentStatus: "final",
  body: [
    { type: "p", text: "…" },
    { type: "h2", text: "…" },
    { type: "ul", items: ["…", "…"] },
    { type: "quote", text: "…" },
  ],
}
```

Categories are derived from the articles themselves, so a new category name
automatically appears as a filter on the Insights page.

**On dates:** leave `publishedAt: null` until you actually publish. Cards then
read "Date to be added" and the article is excluded from `datePublished` in
structured data. Never backdate.

---

## 8. Healthcare AI page

**`data/healthcare-ai.ts`.**

- `observedProblems` — what you have seen. Keep these as observations, not
  findings; there is no study behind them.
- `opportunities` — the four cards. `icon` must be a key from
  `components/ui/Icon.tsx`.
- `safeguards` — the ethical non-negotiables.
- `CLINICAL_SAFEGUARD` — the statement rendered prominently mid-page. Required
  to stay visible.
- `MEDICAL_DISCLAIMER` — appears in the site footer on every page.

Be careful adding claims here. Anything phrased as an outcome ("reduced
documentation time by 30%") needs a source you can point to.

---

## 9. Teaching page

**`data/teaching.ts`.**

- `teachingPhilosophy` — the narrative.
- `teachingTopics` — what you teach.
- `workshopFormats` — currently phrased as *what can be delivered*, not a
  delivery history. Keep it that way until you have a record to cite.
- `resources` — downloadable guides. Put the file in `public/resources/`, point
  `href` at it, and set `isPlaceholder: false`.
- `speakingInterests` — settings you would like to speak in.

---

## 10. Media page

**`data/media.ts`.**

`featuredMedia` is the large Moon Tape Radio card shown on both the homepage
and the Media page. `mediaItems` is the grid beneath it.

Each `links` entry has an `isPlaceholder` flag. While it is `true`, the link
renders as a greyed-out chip reading "(link coming soon)" rather than as a live
anchor — so the site never sends anyone to a URL that does not exist. Set it to
`false` once the real URL is in.

---

## 11. Colours and typography

**`app/globals.css`**, the `@theme` block at the top.

```css
--color-canvas: #0b0b0d;      /* page background      */
--color-canvas-2: #121216;    /* alternating sections */
--color-surface: #19191f;     /* cards                */
--color-ink: #f7f7f5;         /* primary text         */
--color-ink-muted: #a7a7b0;   /* secondary text       */
--color-accent: #f3dfa2;      /* gold accent          */
--color-accent-hover: #ffe9a9;
```

Tailwind v4 generates every utility from these, so changing `--color-accent`
updates all buttons, icons, labels and active states at once.

If you change the accent, check contrast against `--color-canvas` — the accent
is used for small text (the `.eyebrow` label) and needs to clear 4.5:1.

To change the typeface, edit the `Geist` / `Geist_Mono` imports in
`app/layout.tsx`. Use `@next/font/google` imports rather than a `<link>` so the
font is self-hosted and no request goes to a third party.

---

## 12. Adding a whole new page

1. Create `app/your-page/page.tsx`.
2. Export metadata using the shared helper:

   ```tsx
   import { pageMetadata } from "@/lib/seo";

   export const metadata = pageMetadata({
     title: "Your Page",
     description: "One sentence for search results.",
     path: "/your-page",
   });
   ```

3. Use `<PageHero>` for the top block so it matches every other page.
4. Add the route to `staticRoutes` in `app/sitemap.ts`.
5. Add it to `primaryNav` or `footerNav` in `data/site.ts`.

---

## Things worth not breaking

- **Do not add unverifiable claims.** Degrees, employers, rank, certifications,
  awards, dates, publications, testimonials, client names, statistics and
  medical outcomes are all absent by design.
- **Do not remove the clinical safeguard statement** from the Healthcare AI
  page, or the medical disclaimer from the footer.
- **Do not describe the contact form as working** until it is connected.
- **Always set `imageAlt` when you set `image`.**
- **Keep `url` in `data/site.ts` correct** — canonical tags, the sitemap and
  structured data all derive from it.
