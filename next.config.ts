import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes plain HTML/CSS/JS to out/, so the
  // site still uploads to any static host and old URLs like /about.html keep working.
  output: 'export',
  images: { unoptimized: true },
  experimental: {
    agentUpgrade: 'security',
  },
};

export default nextConfig;
