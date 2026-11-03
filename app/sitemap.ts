import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cabalgatamedellin.com';
  const fechaActual = new Date();

  const paginasPrincipales: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: fechaActual,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: fechaActual,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: fechaActual,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const slugsSEO = [
    'planes-cabalgatas-medellin',
    'tour-cuatrimotos-medellin-caldas',
    'cabalgatas-caldas-antioquia',
    'cabalgata-romantica-parejas-medellin',
    'cabalgatas-ninos-familias-medellin',
    'cabalgata-vip-transporte-el-poblado-laureles',
    'alquiler-caballos-medellin-precios',
    'cabalgatas-grupos-empresas-medellin',
    'donde-montar-a-caballo-cerca-de-medellin',
    'en-horseback-riding-medellin-tours',
  ];

  const paginasSEO: MetadataRoute.Sitemap = slugsSEO.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: fechaActual,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...paginasPrincipales, ...paginasSEO];
}