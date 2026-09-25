import { MetadataRoute } from 'next';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cabalgatamedellin.com';

  // 1. Definimos las rutas principales (Fusionando tu código original + Registro)
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly', // Como tenías configurado
      priority: 1.0, // Prioridad máxima para la home en español
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Prioridad casi máxima para la home en inglés
    },
    {
      url: `${baseUrl}/registro`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8, // Página de registro de exoneración
    },
  ];

  // 2. Extraemos dinámicamente los artículos del Blog desde tu Firebase
  try {
    const configSnap = await getDoc(doc(db, 'configuracion', 'general'));
    
    if (configSnap.exists()) {
      const data = configSnap.data();
      const blogPosts = data.blogPosts || [];
      
      blogPosts.forEach((post: any) => {
        if (post.slug) {
          routes.push({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(), 
            changeFrequency: 'weekly',
            priority: 0.7, // Prioridad alta para el SEO orgánico de tus artículos
          });
        }
      });
    }
  } catch (error) {
    console.error("Error generando el sitemap dinámico:", error);
  }

  return routes;
}