# Teaching guide sources

HTML sources for the three downloadable PDFs on `/teaching`. Each is a
self-contained, print-styled HTML file (US Letter, system fonts only, no
network fetches) rendered to PDF with local headless Chrome.

- `practical-ai-starter-guide.html` → `../practical-ai-starter-guide.pdf`
- `resume-workflow-worksheet.html` → `../resume-workflow-worksheet.pdf`
- `prompt-design-reference.html` → `../prompt-design-reference.pdf`

`_shared.css` is the source-of-truth stylesheet (navy `#0B1F3A` / gold
`#F3DFA2` on white, matching the site's `@theme` palette but light-on-white
for print). It is **not** linked at render time — each HTML file inlines its
own copy in a `<style>` block, since Chrome's headless print needs a single
file with no relative asset loads. If you change the design, edit
`_shared.css` first, then propagate the same rules into each guide's inline
`<style>` block.

## Editing a guide

1. Edit the HTML file directly (each guide is two `.page` divs — one per
   printed page — with a `.band` header, `.content` body, and `.footer`).
2. Re-render with local headless Chrome. From the `public/resources`
   directory:

   ```bash
   CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

   "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
     --print-to-pdf="$(pwd)/practical-ai-starter-guide.pdf" \
     "file://$(pwd)/src/practical-ai-starter-guide.html"

   "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
     --print-to-pdf="$(pwd)/resume-workflow-worksheet.pdf" \
     "file://$(pwd)/src/resume-workflow-worksheet.html"

   "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
     --print-to-pdf="$(pwd)/prompt-design-reference.pdf" \
     "file://$(pwd)/src/prompt-design-reference.html"
   ```

3. Sanity-check page count and that text is real (not rasterized):

   ```bash
   mdls -name kMDItemNumberOfPages practical-ai-starter-guide.pdf
   strings practical-ai-starter-guide.pdf | grep -c "/Type0"   # embedded text fonts, not images
   ```

If Chrome isn't at that path, try Chromium or Edge at the equivalent
`Contents/MacOS/` binary. Do not ship a PDF built any other way — hand-rolled
PDF generation on this machine tends to produce broken text layout.

## Content rules (carried over from the brief)

- Invent nothing about Al beyond what's in `data/about.ts` (`credentials`)
  and `data/teaching.ts`.
- No fabricated citations, studies, or statistics — phrase reliability
  claims as practical guidance, not research findings.
- No medical advice — these teach tool use, not clinical decision-making.
- Keep each PDF under ~2MB (plain text/CSS, no images, so this is not a
  realistic risk unless something changes).
