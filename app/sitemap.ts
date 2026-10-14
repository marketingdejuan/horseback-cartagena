import { MetadataRoute } from 'next';

// 🔥 CONFIGURACIÓN DE MARCA (Si copias este archivo a otro sitio, solo cambia estas 2 líneas)
const MARCA_SITIO = 'cabalgatamedellin.com';
const URL_SITIO = 'https://cabalgatamedellin.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Rutas principales fijas de la marca
  const routes: MetadataRoute.Sitemap = [
    {
      url: URL_SITIO,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, // Prioridad máxima para la home en español
    },
    {
      url: `${URL_SITIO}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Prioridad casi máxima para la home en inglés
    },
    {
      url: `${URL_SITIO}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85, // Índice principal del blog
    },
    {
      url: `${URL_SITIO}/registro`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8, // Página de registro de exoneración
    },
  ];

  // 2. Extraemos dinámicamente los artículos del Blog desde el Súper ERP (PostgreSQL)
  try {
    const res = await fetch(`https://admin.cabalgatas.co/api/blog?brand=${MARCA_SITIO}`, {
      next: { revalidate: 3600 } // Refresca el mapa del sitio cada hora
    });

    if (res.ok) {
      const blogPosts = await res.json();

      if (Array.isArray(blogPosts)) {
        blogPosts.forEach((post: any) => {
          if (post.slug) {
            routes.push({
              url: `${URL_SITIO}/blog/${post.slug}`,
              lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
              changeFrequency: 'weekly',
              priority: 0.7, // Prioridad alta para el SEO orgánico de tus artículos
            });
          }
        });
      }
    }
  } catch (error) {
    console.error("Error generando el sitemap dinámico desde el ERP:", error);
  }

  return routes;
}