import './globals.css';
import Script from 'next/script';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cabalgatas en Caldas, Antioquia | Recorridos Ecológicos a Caballo',
  description: 'Conectando jinetes principiantes y expertos con los paisajes montañosos del sur del Valle de Aburrá. ¡Reserva tu cabalgata hoy!',
  openGraph: {
    title: 'Cabalgatas Ecológicas en Caldas | Reservas Disponibles',
    description: 'A 30 mins de Medellín. 100% Parqueadero Privado. Caballos mansos y briosos para todos los niveles.',
    url: 'https://cabalgatamedellin.com',
    siteName: 'Cabalgatas Medellín',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Caballos cruzando el río en Caldas',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "TouristAttraction"],
    "name": "Cabalgatas Medellín - Pesebrera Caldas",
    "description": "Recorridos ecológicos a caballo por senderos y ríos en Caldas, Antioquia.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Caldas",
      "addressRegion": "Antioquia",
      "addressCountry": "CO"
    },
    "priceRange": "$$$",
    "telephone": "+573000000000"
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}