import type { Metadata } from "next";
import "./globals.css";
import LanguageSwitcher from "../components/LanguageSwitcher";

// MOTOR SEO ESTRATÉGICO SUPER OPTIMIZADO PARA MEDELLÍN
export const metadata: Metadata = {
  title: 'Cabalgatas en Medellín | Alquiler de Caballos y Tours',
  description: 'Las mejores cabalgatas en Medellín. Disfruta de alquiler de caballos, paseos ecológicos y la mejor experiencia de montar caballo cerca a la ciudad.',
  keywords: 'cabalgatas medellin, alquiler de caballos en medellin, montar caballo en medellin, paseos a caballo medellin, tours ecologicos medellin',
  alternates: {
    languages: {
      'es-CO': 'https://cabalgatamedellin.com',
      'en-US': 'https://cabalgatamedellin.com/en',
    },
  },
  openGraph: {
    title: 'Cabalgatas en Medellín | Alquiler de Caballos y Tours',
    description: 'La mejor experiencia de montar caballo cerca a Medellín. Planes privados, grupales y románticos.',
    url: 'https://cabalgatamedellin.com',
    siteName: 'Cabalgatas Medellín',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // DATOS ESTRUCTURADOS (SCHEMA.ORG) PARA ENAMORAR A GOOGLE
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristAttraction", "SportsActivityLocation"],
    "name": "Cabalgatas Medellín",
    "description": "Servicio premium de alquiler de caballos en Medellín. Tours guiados, cabalgatas ecológicas y experiencias privadas para parejas y familias.",
    "url": "https://cabalgatamedellin.com",
    "telephone": "+573000000000",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Caldas",
      "addressRegion": "Antioquia",
      "addressCountry": "CO"
    },
    // AQUÍ ESTÁ EL TRUCO DE ORO: Le decimos a Google que tu área de servicio es Medellín
    "areaServed": {
      "@type": "City",
      "name": "Medellín"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "150"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Alquiler de caballos en Medellín"
      },
      {
        "@type": "Offer",
        "name": "Montar caballo en Medellín"
      },
      {
        "@type": "Offer",
        "name": "Cabalgatas Medellín"
      }
    ]
  };

  return (
    <html lang="es">
      <head>
        {/* Inyectamos los Datos Estructurados de forma segura */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        
        {/* Selector Flotante Inteligente de Idiomas */}
        <LanguageSwitcher />

        {children}
      </body>
    </html>
  );
}