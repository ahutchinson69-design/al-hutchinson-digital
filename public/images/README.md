# Image assets

Nothing in here is required for the site to run — every image slot falls back
to a generated placeholder graphic. Drop real files in and point the matching
data file at them.

## Portrait

1. Add your photograph here, e.g. `portrait.jpg`. **Crop it to 4:5** (e.g.
   800 × 1000, ideally 1600 × 2000) — that is exactly the ratio of the frame
   in `components/ui/PortraitPlaceholder.tsx`, so a 4:5 file is displayed
   whole at every viewport width and nothing is cropped away unpredictably.
   The file currently in place is 720 × 900, cropped from the original
   768 × 1024 photograph to centre the face.
2. In [`data/site.ts`](../../data/site.ts) set:

   ```ts
   portrait: "/images/portrait.jpg",
   ```

Alt text comes from `portraitAlt` in the same file.

**Give a replacement photo a new filename** (e.g. `portrait-2027.jpg`) and point
`portrait` at it, rather than overwriting the existing file. Next caches
optimised images by URL, and browsers cache them again on top — reusing the
same filename means the old photo keeps being served until every one of those
caches expires.

## Project images

Put them in `projects/`, e.g. `projects/snf-ai-documentation-system.jpg`
(landscape, at least 1200 × 750). Then in
[`data/projects.ts`](../../data/projects.ts):

```ts
image: "/images/projects/snf-ai-documentation-system.jpg",
imageAlt: "Diagram of the documentation workflow, from point of care to review",
```

`imageAlt` is required whenever `image` is set — describe what the image shows,
not that it is an image.

## Media images

Same pattern: files live in `media/`, and `image` / `imageAlt` are set on
entries in [`data/media.ts`](../../data/media.ts).

## Ratio

Card and detail frames are 16:10 and 16:9, filled with `object-cover`. Supply
landscape files at 16:10 or wider — anything much squarer loses its edges.

## Social card

The Open Graph / Twitter card is **generated at build time** by
[`app/opengraph-image.tsx`](../../app/opengraph-image.tsx) — there is no image
file to maintain. Edit that component to change the card.

## Formats

Next.js serves AVIF and WebP automatically (configured in `next.config.ts`), so
upload the highest-quality JPEG or PNG you have and let the build optimise it.
