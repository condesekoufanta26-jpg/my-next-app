import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Strict Mode
  reactStrictMode: true,

  // Compression des réponses
  compress: true,

  // Configuration des images
  images: {
    domains: ['localhost', 'res.cloudinary.com'], // ← Ajout de Cloudinary
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // ← Ajout pour Cloudinary
      },
    ],
  },

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },

  // Variables runtime (accessibles via process.env)
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  },
};

export default nextConfig;