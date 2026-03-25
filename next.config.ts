import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  // Allow large file uploads
  experimental: {
    serverActions: {
      bodySizeLimit: '110mb',
    },
  },
};

export default nextConfig;
