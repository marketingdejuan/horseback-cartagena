import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://horsebackcartagena.com'),
  title: 'Horseback Riding Cartagena | Private Beach & Sunset Tours (Manzanillo)',
  description:
    'Top-rated beach horseback riding in Cartagena, Colombia. Ride gentle Paso Fino horses in Manzanillo del Mar, just 20 mins from the Walled City & Bocagrande. No tolls, VIP hotel pickup & bilingual guides.',
  keywords: [
    'horseback riding cartagena',
    'cartagena horseback riding beach',
    'sunset horseback riding cartagena',
    'manzanillo del mar horseback riding',
    'things to do in cartagena colombia',
    'cabalgatas en cartagena',
  ],
  alternates: {
    canonical: 'https://horsebackcartagena.com',
    languages: {
      'en-US': 'https://horsebackcartagena.com',
      'es-CO': 'https://horsebackcartagena.com/es',
      'x-default': 'https://horsebackcartagena.com',
    },
  },
  openGraph: {
    title: 'Horseback Riding Cartagena | Private Caribbean Beach Tours',
    description:
      'Uncrowded beach & mangrove horseback rides in Manzanillo del Mar. 20 minutes from the Walled City with zero tolls.',
    url: 'https://horsebackcartagena.com',
    siteName: 'Horseback Cartagena',
    locale: 'en_US',
    type: 'website',
  },
};

// Pilar 7: @graph con LocalBusiness, TouristAttraction, SportsActivityLocation, GeoCoordinates, Offer, AggregateRating y FAQPage
const globalSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'TouristAttraction', 'SportsActivityLocation'],
      '@id': 'https://horsebackcartagena.com/#organization',
      name: 'Horseback Cartagena — Beach & Mangrove Tours',
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
      offers: {
        '@type': 'Offer',
        name: '2-Hour Caribbean Beach Horseback Ride',
        price: '150000',
        priceCurrency: 'COP',
        availability: 'https://schema.org/InStock',
        url: 'https://horsebackcartagena.com',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://horsebackcartagena.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where can you go horseback riding on the beach in Cartagena?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our ranch operates in Manzanillo del Mar (North Zone of Cartagena), offering wide, uncrowded Caribbean beaches and mangrove trails just 20 minutes from the Walled City and Bocagrande with zero highway tolls.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you offer private hotel pickup from the Walled City, Getsemaní, or Bocagrande?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we offer optional VIP round-trip door-to-door transportation in air-conditioned vehicles directly from your hotel or Airbnb in the Historic Center, Getsemaní, Bocagrande, and Morros.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is horseback riding in Cartagena suitable for beginners and kids?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We match each rider with gentle, well-cared-for Colombian horses, provide bilingual guide assistance, and include medical insurance for all riders starting from age 3.',
          },
        },
      ],
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
