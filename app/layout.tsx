import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://horsebackcartagena.com'),
  title: 'Horseback Riding Cartagena | Manzanillo del Mar Beach Tours',
  description:
    'Book the best beach horseback riding in Cartagena, Colombia. Private and group tours in Manzanillo del Mar (North Zone), 20 mins from the Walled City. Zero tolls.',
  alternates: {
    canonical: 'https://horsebackcartagena.com',
    languages: {
      'en-US': 'https://horsebackcartagena.com',
      'es-CO': 'https://horsebackcartagena.com/es',
    },
  },
  openGraph: {
    title: 'Horseback Riding Cartagena | Beach & Mangrove Tours',
    description:
      'Ride gentle Paso Fino horses along the beaches of Manzanillo del Mar, just 20 minutes from Bocagrande and the Historic Center. No tolls.',
    url: 'https://horsebackcartagena.com',
    siteName: 'Horseback Cartagena',
    locale: 'en_US',
    type: 'website',
  },
};

const globalSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'TouristAttraction', 'SportsActivityLocation'],
      '@id': 'https://horsebackcartagena.com/#organization',
      name: 'Horseback Cartagena',
      url: 'https://horsebackcartagena.com',
      telephone: '+573000000000',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Playas de Manzanillo del Mar, Zona Norte',
        addressLocality: 'Cartagena de Indias',
        addressRegion: 'Bolívar',
        addressCountry: 'CO',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 10.5218,
        longitude: -75.5015,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '184',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0f172a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}

        {/* Pilar 1: Cero bloqueo en móvil - Scripts con strategy="lazyOnload" */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PENDIENTE"
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PENDIENTE');
          `}
        </Script>
      </body>
    </html>
  );
}
