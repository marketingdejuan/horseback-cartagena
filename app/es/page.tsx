import type { Metadata } from 'next';
import ClientePage from '../ClientePage';

export const metadata: Metadata = {
  title: 'Cabalgatas en Cartagena | Playa Manzanillo del Mar (Sin Peajes)',
  description:
    'Reserva tu cabalgata en las playas de Manzanillo del Mar, Zona Norte de Cartagena. A solo 20 minutos del Centro Histórico y Bocagrande, sin peajes.',
  alternates: {
    canonical: 'https://horsebackcartagena.com/es',
    languages: {
      'en-US': 'https://horsebackcartagena.com',
      'es-CO': 'https://horsebackcartagena.com/es',
    },
  },
};

export default function HomePageEs() {
  return <ClientePage lang="es" />;
}
