import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/utils/cloudflareLoader.ts',
  },
};

export default nextConfig;
