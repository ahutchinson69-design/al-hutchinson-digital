import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Pin the workspace root. Without this, Next infers it from the nearest
   * lockfile, which can resolve to a parent directory on machines that have
   * one higher up the tree.
   */
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },

  images: {
    // Modern formats first; Next falls back automatically.
    formats: ["image/avif", "image/webp"],
  },

  /**
   * The cinematic intro is a standalone page of plain HTML/CSS/JS under
   * public/intro/. Static files are served at their exact path, so this maps
   * the tidy /intro URL onto the actual file.
   */
  /**
   * The blog used to live at /insights. Old links and search results keep
   * working: they are sent permanently to the same post under /blog.
   */
  async redirects() {
    return [
      { source: "/insights", destination: "/blog", permanent: true },
      { source: "/insights/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },

  /**
   * Security headers on every response. The script policy keeps
   * 'unsafe-inline' because Next.js and the JSON-LD blocks use inline
   * scripts; the rest of the policy still blocks framing, plugins, and
   * loading code or forms from other sites.
   */
  poweredByHeader: false,
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      { source: "/intro", destination: "/intro/index.html" },
      { source: "/dbq-studio", destination: "/dbq-studio/index.html" },
    ];
  },
};

export default nextConfig;
