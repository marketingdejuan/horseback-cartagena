import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://horsebackcartagena.com';
  const lastModified = new Date();

  const mainPages = [
    { url: `${baseUrl}`, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/es`, priority: 0.95, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/cabalgatas-manzanillo-del-mar`, priority: 0.95, changeFrequency: 'weekly' as const },
  ];

  const intentLandings = [
    'planes-cabalgatas-cartagena',
    'alquiler-caballos-cartagena-precios',
    'tour-cuatrimotos-cartagena-manzanillo',
    'cabalgata-romantica-parejas-cartagena',
    'cabalgatas-ninos-familias-cartagena',
    'cabalgata-vip-transporte-bocagrande-centro-morros',
    'cabalgatas-grupos-empresas-cartagena',
    'donde-montar-a-caballo-cerca-de-cartagena',
    'en-horseback-riding-cartagena-tours',
    'reservar',
    'consultar',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const blogPosts = [
    'primera-cabalgata',
    'mansos-briosos',
    'ropa-cabalgata',
    'integracion-empresas-cartagena-cabalgatas',
    'mitos-y-verdades-sobre-montar-a-caballo',
    'tradicion-naturaleza-y-aventura-asi-se-vive-diciembre-en-cabalgata-1',
    'el-lenguaje-secreto-de-los-caballos-como-se-comunican-entre-ellos-y-con-nosotros',
    'cabalgatas-una-actividad-perfecta-para-desconectarte-de-la-rutina',
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...mainPages.map((p) => ({ ...p, lastModified })),
    ...intentLandings,
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...blogPosts,
  ];
}
