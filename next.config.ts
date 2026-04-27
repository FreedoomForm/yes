import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'leroux.qodeinteractive.com',
      },
      {
        protocol: 'https',
        hostname: 'preview.themeforest.net',
      },
    ],
  },
};

export default nextConfig;
