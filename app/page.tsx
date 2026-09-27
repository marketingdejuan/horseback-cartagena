import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import ClientePage from './ClientePage';

// Regenerar caché en el servidor cada hora para máxima velocidad
export const revalidate = 3600; 

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

  // Pasamos la data al cliente para que no tenga que esperar a Firebase
  return <ClientePage initialData={initialData} />;
}