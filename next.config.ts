import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  async rewrites() {
    return [
      { source: "/media", destination: "/media/index.html" },
    ];
  },
};

export default nextConfig;
