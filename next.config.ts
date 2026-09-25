/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de Next/Image para optimizar imágenes de Firebase
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  
  // Ignorar errores de linter viejos al subir a Coolify
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 🚀 Forzar Caché agresivo (Arregla Captura 22 de PageSpeed)
  async headers() {
    return [
      {
        source: '/_next/image(.*)', 
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;