# Signature source assets

Generated with Higgsfield on 2026-07-29. Kept outside `public/` so they are not
served or deployed — nothing on the site loads them.

| File | What it is |
| --- | --- |
| `signature.png` | The original 1376×768 render: calligraphy on its own dark background. Useful as a social/press image. |
| `signature-writeon.mp4` | An 8s 1080p AI write-on animation (Seedance 1.5, interpolated from an empty background to the finished signature). Not used by the intro — the intro reveals the real artwork with CSS instead, which is sharper and ~7MB lighter. Handy for social posts. |

The asset the site actually uses is `public/intro/media/signature-ink.png`, which
is this artwork keyed to transparency and trimmed, plus `signature-meta.json`,
the centre-line the glowing pen tip follows.
