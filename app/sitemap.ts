import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://cabalgatamedellin.com',
      lastModified: new Date(),
      changeFrequency: 'weekly', // Le decimos a Google que actualizamos seguido
      priority: 1.0, // Prioridad máxima para la home en español
    },
    {
      url: 'https://cabalgatamedellin.com/en',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Prioridad casi máxima para la home en inglés
    },
  ]
}