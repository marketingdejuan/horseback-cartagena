import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LanguageSwitcher from "../components/LanguageSwitcher";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristAttraction", "SportsActivityLocation"],
    "name": "Cabalgatas Medellín",
    "description": "Servicio premium de alquiler de caballos en Medellín.",
    "url": "https://cabalgatamedellin.com",
    "telephone": "+573000000000",
    "priceRange": "$$",
    "address": { "@type": "PostalAddress", "addressLocality": "Caldas", "addressRegion": "Antioquia", "addressCountry": "CO" },
    "areaServed": { "@type": "City", "name": "Medellín" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "150" }
  };

  return (
    <html lang="es">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        
        {/* 🚀 PRECONEXIÓN EXTREMA (Arregla Captura 20 de PageSpeed) */}
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firestore.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cabalgata-medellin.firebaseapp.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
      </head>
      <body className="antialiased font-sans">
        
        {/* 🚀 CÓDIGOS DE MARKETING (Carga diferida para no bloquear renderizado) */}
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', 'TU_ID_DEL_PIXEL_DE_FACEBOOK_AQUI'); 
            fbq('track', 'PageView');
          `}
        </Script>

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-12762T7ZP0" strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-12762T7ZP0'); 
            gtag('config', 'AW-XXXXXXXXXX');
          `}
        </Script>

        <LanguageSwitcher />
        {children}
      </body>
    </html>
  );
}