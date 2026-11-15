import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Social card, generated at build time.
 *
 * File-based metadata cascades to every nested route, so all pages inherit
 * this image unless they define their own. Generating it removes the need to
 * ship and maintain a binary asset.
 */

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090B",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Warm accent wash, mirroring the site's hero treatment */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -140,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(243,223,162,0.16) 0%, rgba(243,223,162,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              border: "1px solid rgba(243,223,162,0.3)",
              background: "rgba(243,223,162,0.08)",
              color: "#3D8BFF",
              fontSize: 24,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            AH
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {/* Mirrors the header lockup: name in plain ink, rule, then the
                suffix in the blue accent. */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 4,
              }}
            >
              <span style={{ color: "#F1F5F9" }}>{site.wordmark}</span>
              <span
                style={{
                  display: "flex",
                  width: 1,
                  height: 16,
                  backgroundColor: "rgba(243,223,162,0.35)",
                }}
              />
              <span style={{ color: "#3D8BFF" }}>{site.wordmarkSuffix}</span>
            </div>
            <div style={{ color: "#9AA7B8", fontSize: 15, letterSpacing: 2 }}>
              {site.wordmarkSub}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              color: "#F1F5F9",
              fontSize: 62,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 940,
              display: "flex",
            }}
          >
            Building practical technology for the future of healthcare and human
            work.
          </div>

          <div
            style={{
              color: "#9AA7B8",
              fontSize: 24,
              lineHeight: 1.4,
              maxWidth: 820,
              display: "flex",
            }}
          >
            Healthcare • Artificial Intelligence • Education • Creative Technology
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 28,
          }}
        >
          <div style={{ color: "#9AA7B8", fontSize: 20 }}>{site.personName}</div>
          <div style={{ color: "#3D8BFF", fontSize: 20 }}>{site.labName}</div>
        </div>
      </div>
    ),
    size,
  );
}
