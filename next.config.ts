import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'admin.cabalgatas.co' },
      { protocol: 'https', hostname: 'horsebackcartagena.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/en', destination: '/', permanent: true },
      { source: '/cabalgatas-caldas', destination: '/cabalgatas-manzanillo-del-mar', permanent: true },
      { source: '/cabalgatas-caldas-antioquia', destination: '/cabalgatas-manzanillo-del-mar', permanent: true },
      { source: '/cabalgatas-manzanillo-cartagena', destination: '/cabalgatas-manzanillo-del-mar', permanent: true },
      { source: '/cabalgatas-zona-norte-cartagena', destination: '/cabalgatas-manzanillo-del-mar', permanent: true },
      { source: '/planes-cabalgatas-medellin', destination: '/planes-cabalgatas-cartagena', permanent: true },
      { source: '/alquiler-caballos-medellin-precios', destination: '/alquiler-caballos-cartagena-precios', permanent: true },
      { source: '/tour-cuatrimotos-medellin-caldas', destination: '/tour-cuatrimotos-cartagena-manzanillo', permanent: true },
      { source: '/cabalgata-romantica-parejas-medellin', destination: '/cabalgata-romantica-parejas-cartagena', permanent: true },
      { source: '/cabalgatas-ninos-familias-medellin', destination: '/cabalgatas-ninos-familias-cartagena', permanent: true },
      { source: '/cabalgata-vip-transporte-poblado-laureles-envigado', destination: '/cabalgata-vip-transporte-bocagrande-centro-morros', permanent: true },
      { source: '/cabalgatas-grupos-empresas-medellin', destination: '/cabalgatas-grupos-empresas-cartagena', permanent: true },
      { source: '/donde-montar-a-caballo-cerca-de-medellin', destination: '/donde-montar-a-caballo-cerca-de-cartagena', permanent: true },
      { source: '/en-horseback-riding-medellin-tours', destination: '/en-horseback-riding-cartagena-tours', permanent: true },
      { source: '/blog/integracion-empresas-medellin-cabalgatas', destination: '/blog/integracion-empresas-cartagena-cabalgatas', permanent: true },
    ];
  },
};

export default nextConfig;
