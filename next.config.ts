import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/skillswipe-demo",
  assetPrefix: "/skillswipe-demo",
  images: { unoptimized: true },
  experimental: { optimizePackageImports: ["lucide-react"] },
};
export default nextConfig;
