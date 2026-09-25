import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',     // Bloquea la ruta principal
        '/admin/*',   // Bloquea TODAS las subrutas que puedan existir dentro del admin
        '/api/'       // Bloquea las rutas de la API interna (Google no necesita indexar llamadas a bases de datos)
      ], 
    },
    sitemap: 'https://cabalgatamedellin.com/sitemap.xml',
  }
}