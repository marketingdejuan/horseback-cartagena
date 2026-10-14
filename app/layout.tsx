import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LanguageSwitcher from "../components/LanguageSwitcher";

// 🔥 CONFIGURACIÓN DE MARCA E IDs DE SEGUIMIENTO
const MARCA_SITIO = 'cabalgatamedellin.com';
const URL_SITIO = 'https://cabalgatamedellin.com';
const META_PIXEL_ID = '1105267645313250';
const GA4_ID = 'G-12762T7ZP0';
const GOOGLE_ADS_ID = 'AW-10958714047';

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: 'Cabalgatas en Medellín | Alquiler de Caballos y Tours',
  description: 'Las mejores cabalgatas en Medellín. Disfruta de alquiler de caballos, paseos ecológicos y la mejor experiencia de montar caballo cerca a la ciudad.',
  keywords: 'cabalgatas medellin, alquiler de caballos en medellin, montar caballo en medellin, paseos a caballo medellin, tours ecologicos medellin',
  alternates: {
    canonical: URL_SITIO,
    languages: {
      'es-CO': URL_SITIO,
      'en-US': `${URL_SITIO}/en`,
    },
  },
  openGraph: {
    title: 'Cabalgatas en Medellín | Alquiler de Caballos y Tours',
    description: 'La mejor experiencia de montar caballo cerca a Medellín. Planes privados, grupales y románticos.',
    url: URL_SITIO,
    siteName: 'Cabalgatas Medellín',
    locale: 'es_CO',
    type: 'website',
  },
};

async function getBrandSettings() {
  try {
    const res = await fetch(`https://admin.cabalgatas.co/api/ajustes?brandName=${MARCA_SITIO}`, {
      next: { revalidate: 300 } // Refresca cada 5 minutos
    });
    if (res.ok) return await res.json();
  } catch (error) {
    console.error("Error leyendo ajustes en layout:", error);
  }
  return null;
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const settings = await getBrandSettings();
  
  const businessName = settings?.businessName && settings.businessName !== 'Nombre del Negocio'
    ? settings.businessName
    : "Cabalgatas Medellín";
    
  const telephone = settings?.whatsappNumber 
    ? `+${settings.whatsappNumber.replace(/\D/g, '')}` 
    : "+573000000000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristAttraction", "SportsActivityLocation"],
    "name": businessName,
    "description": "Servicio premium de alquiler de caballos y rutas ecológicas en Medellín y Caldas, Antioquia.",
    "url": URL_SITIO,
    "telephone": telephone,
    "priceRange": "$$",
    "address": { 
      "@type": "PostalAddress", 
      "addressLocality": "Caldas", 
      "addressRegion": "Antioquia", 
      "addressCountry": "CO" 
    },
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
            
            fbq('init', '${META_PIXEL_ID}'); 
            fbq('track', 'PageView');
          `}
        </Script>

        {/* 2. Etiqueta Global de Google (Analytics 4 + Google Ads) */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA4_ID}'); 
            gtag('config', '${GOOGLE_ADS_ID}', { 'allow_enhanced_conversions': true });
          `}
        </Script>
        
        {/* ========================================== */}

        <LanguageSwitcher />
        {children}
      </body>
    </html>
  );
}