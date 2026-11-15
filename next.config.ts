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

  async rewrites() {
    return [
      { source: "/intro", destination: "/intro/index.html" },
      { source: "/dbq-studio", destination: "/dbq-studio/index.html" },
    ];
  },
};

export default nextConfig;
