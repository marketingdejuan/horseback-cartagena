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
      </head>
      <body className="antialiased font-sans">
        
        {/* ========================================== */}
        {/* 🚀 CÓDIGOS DE MARKETING DIGITAL (PÍXELES) */}
        {/* ========================================== */}
        
        {/* 1. Píxel de Meta (Facebook/Instagram Ads) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            // TODO: Cambiar este texto por tu ID real de Meta
            fbq('init', 'TU_ID_DEL_PIXEL_DE_FACEBOOK_AQUI'); 
            fbq('track', 'PageView');
          `}
        </Script>

        {/* 2. Etiqueta de Google (Analytics 4 y Google Ads) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-12762T7ZP0" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Tu código real de Google Analytics 4 ya está configurado:
            gtag('config', 'G-12762T7ZP0'); 
            
            // TODO: Cambiar este texto por tu ID real de Google Ads (cuando lo tengas)
            gtag('config', 'AW-XXXXXXXXXX');
          `}
        </Script>
        
        {/* ========================================== */}

        <LanguageSwitcher />
        {children}
      </body>
    </html>
  );
}