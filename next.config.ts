import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Hostinger shared hosting (public_html).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
