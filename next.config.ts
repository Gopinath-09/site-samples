import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['26.20.200.61'],

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
