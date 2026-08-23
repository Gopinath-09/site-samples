import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["26.20.200.61"],

  /**
   * Image pipeline for the asset-heavy redesign. AVIF is tried first and falls
   * back to WebP, then to the source format. Next 16 requires `qualities` to be
   * an explicit allowlist: 75 covers general imagery, 90 is reserved for the
   * hero and product screenshots where fine UI text has to stay crisp.
   */
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },

  /**
   * `/case-studies` was superseded by the richer `/portfolio` section, which
   * renders the same dataset. Permanent redirects keep old links and search
   * rankings pointing at the single canonical URL for each project.
   */
  async redirects() {
    return [
      { source: "/case-studies", destination: "/portfolio", permanent: true },
      {
        source: "/case-studies/:slug",
        destination: "/portfolio/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
