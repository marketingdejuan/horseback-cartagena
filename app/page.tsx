import ClientePage from './ClientePage';
import { Metadata } from 'next';

// Actualización rápida: cada 60 segundos refresca caché en servidor
export const revalidate = 60;

// 🔥 CONFIGURACIÓN DE MARCA (Para replicar en los otros sitios solo cambias estas constantes)
const MARCA_SITIO = 'cabalgatamedellin.com';
const URL_SITIO = 'https://cabalgatamedellin.com';

// Datos base del sitio (Reemplaza el antiguo documento estático de Firebase)
const DATOS_BASE = {
  businessName: 'Cabalgatas Medellín',
  whatsappNumber: '573000000000',
  basePrice: 100000,
  guidePrice: 80000,
  enableExitIntent: true,
  heroTitle: 'Cabalgatas Ecológicas en Medellín y Caldas',
  heroSubtitle: 'Desconéctate de la ciudad y vive una experiencia inolvidable a caballo por las montañas de Antioquia.',
  urgencyText: '¡Últimos cupos disponibles para este fin de semana!',
  metaTitle: 'Cabalgatas Medellín | Rutas Ecológicas y Seguras en Antioquia',
  metaDescription: 'Reserva tu cabalgata ecológica en Caldas, Antioquia a solo minutos de Medellín. Caballos dóciles, guías expertos y planes para parejas, familias y grupos.',
  seoKeywords: 'cabalgatas medellin, cabalgatas en antioquia, cabalgatas caldas, paseo a caballo medellin, planes en pareja medellin',
  seoOgImage: `${URL_SITIO}/cabalgatas-en-medellin-y-caldas.webp`,
  mapAddress: 'Caldas, Antioquia (Sur del Valle de Aburrá)',
  googleRating: '5.0',
  googleReviewCount: '150',
  mapEmbedUrl: 'https://maps.google.com',
  reviews: [
    {
      id: 'rev-1',
      author: 'Camila Restrepo',
      rating: 5,
      text: 'Una experiencia espectacular. Los caballos están súper bien cuidados, son muy nobles y los paisajes en Caldas son hermosos.'
    },
    {
      id: 'rev-2',
      author: 'Andrés Gómez',
      rating: 5,
      text: 'Fui con mi pareja en el plan privado y todo estuvo impecable. El guía muy atento tomándonos fotos y explicándonos el recorrido.'
    },
    {
      id: 'rev-3',
      author: 'familia_viajera',
      rating: 5,
      text: 'Era nuestra primera vez montando a caballo y nos sentimos seguros desde el primer minuto. ¡100% recomendados!'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      q: '¿Necesito tener experiencia previa montando a caballo?',
      a: 'No necesitas experiencia. Nuestros caballos son dóciles y entrenados para turismo ecológico, y antes de salir recibirás una inducción práctica por parte de nuestros guías.'
    },
    {
      id: 'faq-2',
      q: '¿Qué ropa debo llevar para la cabalgata?',
      a: 'Es indispensable usar pantalón largo (preferiblemente jean o ropa cómoda que cubra las piernas) y calzado cerrado (tenis o botas). Recomendamos aplicar protector solar y llevar gorra o sombrero.'
    },
    {
      id: 'faq-3',
      q: '¿Cuál es la diferencia entre cabalgata grupal y privada?',
      a: 'La cabalgata grupal se realiza los sábados y domingos a las 2:00 PM sin costo adicional de guía. En cualquier otro horario o día de la semana, el recorrido es 100% privado y exclusivo para tu grupo.'
    }
  ],
  gallery: []
};

// Función centralizada que consulta el Súper ERP desde el Servidor (SSR)
async function getSiteData() {
  try {
    const [resAjustes, resBlog] = await Promise.all([
      fetch(`https://admin.cabalgatas.co/api/ajustes?brandName=${MARCA_SITIO}`, { next: { revalidate: 60 } }),
      fetch(`https://admin.cabalgatas.co/api/blog?brand=${MARCA_SITIO}`, { next: { revalidate: 60 } })
    ]);

    const ajustesERP = resAjustes.ok ? await resAjustes.json() : {};
    const blogERP = resBlog.ok ? await resBlog.json() : [];

    return {
      ...DATOS_BASE,
      businessName: ajustesERP.businessName && ajustesERP.businessName !== 'Nombre del Negocio' 
        ? ajustesERP.businessName 
        : DATOS_BASE.businessName,
      whatsappNumber: ajustesERP.whatsappNumber || DATOS_BASE.whatsappNumber,
      basePrice: ajustesERP.basePrice || DATOS_BASE.basePrice,
      guidePrice: ajustesERP.guidePrice ?? DATOS_BASE.guidePrice,
      blogPosts: Array.isArray(blogERP) ? blogERP : []
    };
  } catch (error) {
    console.error("Error conectando SSR con el Súper ERP:", error);
    return { ...DATOS_BASE, blogPosts: [] };
  }
}

// 🚀 SEO 100% de Servidor (Google lo lee instantáneamente)
export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData();

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.seoKeywords,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: URL_SITIO,
      siteName: data.businessName,
      images: [data.seoOgImage],
      locale: 'es_CO',
      type: 'website',
    }
  };
}

export default async function Page() {
  const initialData = await getSiteData();
  return <ClientePage initialData={initialData} />;
}