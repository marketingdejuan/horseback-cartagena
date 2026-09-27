import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import ClientePage from './ClientePage';
import { Metadata } from 'next';

// Forzamos la actualización de caché cada 1 hora
export const revalidate = 3600; 

// 🚀 NUEVO: SEO 100% de Servidor (Google lo lee instantáneamente)
export async function generateMetadata(): Promise<Metadata> {
  try {
    const docSnap = await getDoc(doc(db, "configuracion", "general"));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        title: data.metaTitle || 'Cabalgatas Medellín | Ecológicas y Seguras',
        description: data.metaDescription || 'Reserva tu cabalgata en Caldas, Antioquia.',
        keywords: data.seoKeywords || 'cabalgatas medellin, cabalgatas caldas',
        openGraph: {
          images: [data.seoOgImage || ''],
        }
      }
    }
  } catch (e) {
    console.error("Error cargando SEO:", e);
  }
  return { title: 'Cabalgatas Medellín' };
}

export default async function Page() {
  let initialData = null;
  try {
    const docSnap = await getDoc(doc(db, "configuracion", "general"));
    if (docSnap.exists()) {
      initialData = docSnap.data();
    }
  } catch (error) {
    console.error("Error cargando SSR:", error);
  }

  return <ClientePage initialData={initialData} />;
}