import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Bloqueamos el admin para que Google no lo muestre
    },
    sitemap: 'https://cabalgatamedellin.com/sitemap.xml',
  }
}