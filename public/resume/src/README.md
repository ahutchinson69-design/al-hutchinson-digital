# Résumé source

`resume.html` is the source for `../al-hutchinson-resume.pdf` — a one-page
public résumé condensed from Al's full CV.

Re-render after editing:

```bash
cd public/resume
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/al-hutchinson-resume.pdf" \
  "file://$PWD/src/resume.html"
```

Then confirm it is still one page:

```bash
python3 -c "import re;d=open('al-hutchinson-resume.pdf','rb').read();print(re.findall(rb'/Count\s+(\d+)',d)[0])"
```

## Two things to know

**The body is pinned to `height: 11in; overflow: hidden`.** Chrome's print
layout rounds differently from its screen layout and was emitting a blank
second page. Measured content height is 1054px against a 1056px page — so
nothing is clipped today, but **if you add content, re-measure**, or it will be
silently cut off rather than flowing to page two.

**What is deliberately not here.** No home address, no phone number, no DEA
registration, no licence numbers. This document is downloadable by anyone; the
full CV is not published and lives outside `public/` at `assets/cv/`.
