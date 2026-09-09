import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["26.20.200.61"],
  // A stray lockfile exists one level up (D:\project); pin the workspace root
  // so Turbopack doesn't infer the wrong directory.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Serve AVIF where supported, WebP otherwise.
    formats: ["image/avif", "image/webp"],
    // Next 16 allow-lists qualities. 90 is for hero backgrounds.
    qualities: [60, 75, 90],
  },
};

export default nextConfig;
