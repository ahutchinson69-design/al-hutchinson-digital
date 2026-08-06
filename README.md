# Al Hutchinson Digital

Personal site for **Al Hutchinson** — healthcare, artificial intelligence,
education, and creative technology. Experimental projects, research, and
concepts are published under the **Hutchinson FutureWorks** label.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion
and Lucide icons. Every route is statically prerendered.

---

## Quick start

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open <http://localhost:3000>.

Build for production:

```bash
npm run build
```

Serve the production build locally:

```bash
npm run start
```

Run everything the CI-equivalent check would run (lint → types → build):

```bash
npm run check
```

| Script              | Does                                       |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Development server with hot reload         |
| `npm run build`     | Production build                           |
| `npm run start`     | Serve the production build                 |
| `npm run lint`      | ESLint (Next core-web-vitals + TypeScript) |
| `npm run typecheck` | `tsc --noEmit`                             |
| `npm run check`     | Lint, typecheck and build in sequence      |

---

## Where to edit things

All copy lives in `data/`. You should rarely need to touch a component to
change what the site says.

| I want to change…                        | Edit                    |
| ---------------------------------------- | ----------------------- |
| Name, tagline, email, domain, navigation | `data/site.ts`          |
| Résumé download                          | `data/site.ts`          |
| Homepage pillars, "currently exploring"  | `data/pillars.ts`       |
| Projects (cards **and** detail pages)    | `data/projects.ts`      |
| Articles                                 | `data/articles.ts`      |
| Career timeline                          | `data/timeline.ts`      |
| Social profile links                     | `data/socials.ts`       |
| About page narrative, values, vision     | `data/about.ts`         |
| Healthcare AI page                       | `data/healthcare-ai.ts` |
| Teaching page, workshops, downloads      | `data/teaching.ts`      |
| Media page, Moon Tape Radio              | `data/media.ts`         |
| Colours, fonts, spacing                  | `app/globals.css`       |

### Colours

The palette is defined once, in the `@theme` block at the top of
`app/globals.css`. Tailwind v4 generates utilities from those variables, so
changing `--color-accent` there updates every button, icon and label on the
site.

### Adding a portrait

See [`public/images/README.md`](public/images/README.md). Short version: the photo lives at
`public/images/portrait-outdoor.jpg` and is set via `portrait` in
`data/site.ts`. **Crop replacements to 4:5 and give them a new filename** —
reusing a filename means caches keep serving the old picture.

### Adding project images

Also covered in [`public/images/README.md`](public/images/README.md). Set both
`image` and `imageAlt` on the project in `data/projects.ts` — the alt text is
required for accessibility.

### Replacing the social links

Open `data/socials.ts`, replace each `href`, and flip `isPlaceholder` to
`false`. Links left as placeholders are rendered with `rel="nofollow"`,
labelled as placeholders for screen readers, and excluded from the site's
structured data — so an unfinished profile is never advertised to search
engines.

### Adding an article

Append an object to `articles` in `data/articles.ts`. The `slug` becomes the
URL. The `body` is an array of typed blocks:

```ts
body: [
  { type: "p", text: "A paragraph." },
  { type: "h2", text: "A subheading" },
  { type: "ul", items: ["First point", "Second point"] },
  { type: "quote", text: "A pulled quote." },
],
```

Set `publishedAt` to an ISO date (`"2026-03-14"`) when you publish. While it is
`null`, cards display "Date to be added" and the article is excluded from
`datePublished` in structured data — no date is ever invented.

Set `featured: true` on the one article you want at the top of the Insights
page. Set `contentStatus` to `"draft"` or `"final"` to remove the visible
placeholder banner.

### Adding a project

Append to `projects` in `data/projects.ts`. `slug` becomes `/projects/<slug>`
and the detail page is generated automatically. Only `slug`, `title`,
`category`, `categoryLabel`, `status`, `summary` and `contentStatus` are
required — every detail section is optional and simply does not render when
absent.

Set `featured: true` to include it in the homepage grid, and `category` to one
of `Healthcare | AI | Education | Media | Research | Design` (this drives the
gallery filters).

### Changing the social card

`app/opengraph-image.tsx` generates the 1200 × 630 card at build time and
`app/twitter-image.tsx` reuses it. There is no image file to maintain — edit
the component.

---

## The contact form

The form posts to `app/api/contact/route.ts`, which validates again on the
server and delivers by email through Resend's REST API — called with `fetch`,
so the project takes on no extra dependency.

**It needs one environment variable to actually send.** Copy `.env.example` to
`.env.local` for development, and set the same values in your host's dashboard
for production (Vercel: Settings → Environment Variables):

| Variable         | Purpose                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY` | From [resend.com](https://resend.com). Starts `re_`.                                                                   |
| `CONTACT_TO`     | Where enquiries land. Falls back to `site.email`.                                                                      |
| `CONTACT_FROM`   | A verified sender on your domain. Use `onboarding@resend.dev` until `alhutchinsondigital.com` is verified with Resend. |

Without the key the route returns 503 and the form says plainly that it is not
connected yet and gives the visitor the email address instead. It never claims
a message was delivered when it was not.

Also built in: a honeypot field, server-side length ceilings, and a simple
in-memory rate limit of 5 submissions per IP per 10 minutes. That limit resets
on redeploy and is per-instance — fine for a personal site, but move it to a
shared store if the site ever gets serious traffic.

## Deploying to Vercel

1. Push the repository to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import it. Vercel detects
   Next.js — no build configuration is needed.
3. Deploy.
4. Add your domain under **Settings → Domains** and follow the DNS
   instructions.
5. Set the environment variables from `.env.example` so the contact form can
   send.
6. Confirm `url` in `data/site.ts` matches the domain you actually bought. It
   drives canonical URLs, Open Graph tags, `sitemap.xml`, `robots.txt`,
   `llms.txt` and structured data.

Any host that supports Next.js works — `npm run build` then `npm run start`.

## AI crawlers

Two things speak to AI assistants and search crawlers:

- **`app/robots.ts`** allows everything, and names the AI crawlers explicitly
  (GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others) rather than
  leaving them to the wildcard. Some operators treat a missing rule for their
  own agent as ambiguous; an explicit `Allow` removes the doubt.
- **`app/llms.txt/route.ts`** serves `/llms.txt`, a plain-language summary
  following the emerging llms.txt convention. It is generated from the same
  data files as the site, so it cannot drift.

The point of `/llms.txt` is accuracy, not ranking. Left to infer, assistants
routinely soften "board-certified nurse practitioner" into "healthcare worker",
or describe the concept projects as shipped products. The file states the facts
plainly and flags what must not be overstated — including that the DNP is in
progress and is a nursing doctorate, not a medical degree.

**Be clear-eyed about what this does.** llms.txt is a convention, not a
standard, and honouring it is entirely voluntary — plenty of crawlers ignore
it. Neither file improves search ranking on its own. What actually helps
discovery is already in place: clean semantic HTML, per-page metadata,
`Person` and `WebSite` structured data, and a sitemap.

---

## Before going live

Everything marked PLACEHOLDER is deliberately visible so nothing unfinished
ships silently.

Done:

- [x] Portrait — `public/images/portrait.jpg`
- [x] Contact email, LinkedIn and YouTube in `data/site.ts` / `data/socials.ts`
- [x] Real career timeline with dates and employers (`data/timeline.ts`)
- [x] Education, licensure, military service, publications, honors
      (`credentials` in `data/about.ts`)
- [x] Teaching record (`teachingRecord` in `data/teaching.ts`)
- [x] One-page public résumé at `public/resume/al-hutchinson-resume.pdf`
      (source in `src/`). The full CV is **not** published — it is marked
      CONFIDENTIAL and kept outside `public/` at `assets/cv/`.
- [x] Three teaching guides in `public/resources/` (sources in `src/`)
- [x] Contact form endpoint at `app/api/contact/route.ts`
- [x] `llms.txt` and AI-crawler rules in `robots.txt`

Still outstanding:

- [ ] **Buy the domain.** `data/site.ts` is set to `alhutchinsondigital.com`.
      Note the brand is styled "AlHutchinson:Digital" but a colon cannot appear
      in a domain — only letters, digits and hyphens are legal.
- [ ] **Set `RESEND_API_KEY`** so the contact form actually sends. Until then it
      returns a clear "not connected" notice.
- [ ] Verify the sending domain with Resend, then switch `CONTACT_FROM` from
      `onboarding@resend.dev` to an address on your own domain.
- [ ] Add real publication dates to `data/articles.ts` when you publish —
      `publishedAt` is `null`, so cards read "Date to be added".
- [ ] Replace `app/privacy/page.tsx` with a reviewed privacy policy. It is
      still an outline, and the contact form now processes personal data, so
      this matters more than it did.
- [ ] Re-check `app/accessibility/page.tsx` after a real audit.
- [ ] Optional: a GitHub profile link (`data/socials.ts`), and a screenshot of
      the CareOS Command Center to replace the sign-in screen on that card.

### A note on accuracy

Every biographical claim on this site traces to Al Hutchinson's CV — degrees,
employers, dates, military unit and decorations, publications, the EMS
Instructor of the Year award, the 5,000+ figure for people taught. Nothing is
rounded up or embellished.

Two deliberate omissions: DEA registration details are on the CV but not on the
site, and articles carry `publishedAt: null` so no publication date is
invented — cards read "Date to be added" until a real one is supplied.

Keep that standard. If it cannot be traced to the CV or to something Al has
actually done, it should not be on the site.

---

## Accessibility

Implemented throughout: semantic landmarks and a sequential heading outline; a
skip link as the first tab stop; visible focus rings; a keyboard-operable
mobile drawer with a focus trap, Escape-to-close and focus restoration;
labelled form fields with `aria-describedby` errors and a focusable error
summary; status conveyed by text and shape rather than colour alone; full
`prefers-reduced-motion` support (CSS _and_ Framer Motion); 44 px minimum touch
targets; and layouts that reflow without horizontal scrolling.

See `app/accessibility/page.tsx` for the public statement.

---

## Project structure

```
app/                    Routes (App Router)
  layout.tsx            Root layout, fonts, metadata, JSON-LD
  globals.css           Design tokens + base styles  ← edit colours here
  page.tsx              Home
  about/ projects/ healthcare-ai/ teaching/ insights/ media/ contact/
  projects/[slug]/      Generated project detail pages
  insights/[slug]/      Generated article pages
  privacy/ accessibility/ not-found.tsx
  sitemap.ts robots.ts opengraph-image.tsx twitter-image.tsx

components/
  layout/               Header, MobileNavigation, Footer, Wordmark, SkipLink
  ui/                   Button, SectionHeading, StatusBadge, Reveal, Icon,
                        PortraitPlaceholder, MediaPlaceholder,
                        PlaceholderNotice, Prose
  cards/                ProjectCard, ArticleCard, PillarCard
  home/                 The ten homepage sections
  ContactForm, Timeline, SocialLinks, CallToAction, PageHero,
  ProjectGallery, InsightsGallery, NewsletterSignup, MediaLinkChips

data/                   All editable content
lib/                    cn, seo, jsonld
public/                 Images, résumé, downloadable resources
```

See [CONTENT-GUIDE.md](CONTENT-GUIDE.md) for a task-by-task customisation
walkthrough.
