import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const proxyUrl = apiUrl.replace('0.0.0.0', '127.0.0.1');
    console.log('NextConfig: Proxying /api to:', proxyUrl);
    return [
      {
        source: '/api/:path((?!auth).*)',
        destination: `${proxyUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
