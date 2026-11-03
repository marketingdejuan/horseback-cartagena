import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog',
        has: [
          {
            type: 'query',
            key: 'tag',
          },
        ],
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;