import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LanguageSwitcher from "../components/LanguageSwitcher";

const MARCA_SITIO = 'cabalgatamedellin.com';
const URL_SITIO = 'https://cabalgatamedellin.com';
const META_PIXEL_ID = '1105267645313250';
const GA4_ID = 'G-12762T7ZP0';
const GOOGLE_ADS_ID = 'AW-10958714047';

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: 'Cabalgatas en Medellín y Caldas | Planes desde $100.000 (A 30 min del Poblado)',
  description: 'Cabalgatas ecológicas y tours en cuatrimoto en Caldas, Antioquia, a 30 minutos de El Poblado y Laureles (sin peajes). Caballos dóciles, guías expertos y póliza médica con Magenta Seguros.',
  keywords: 'cabalgatas en medellin, cabalgatas medellin, cabalgata en caldas antioquia, alquiler de caballos en medellin, tour cuatrimotos medellin, paseos a caballo medellin',
  alternates: {
    canonical: URL_SITIO,
    languages: {
      'es-CO': URL_SITIO,
      'en-US': `${URL_SITIO}/en`,
      'x-default': URL_SITIO,
    },
  },
  openGraph: {
    title: 'Cabalgatas en Medellín y Caldas | Planes desde $100.000 (A 30 min del Poblado)',
    description: 'Rutas ecológicas y tradicionales en Caldas, Antioquia. A solo 30 minutos del sur de Medellín con póliza médica Magenta Seguros incluida.',
    url: URL_SITIO,
    siteName: 'Cabalgata Medellín',
    locale: 'es_CO',
    type: 'website',
  },
};

async function getBrandSettings() {
  try {
    const res = await fetch(`https://admin.cabalgatas.co/api/ajustes?brandName=${MARCA_SITIO}`, {
      next: { revalidate: 300 } 
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
    : "Cabalgata Medellín";
    
  const telephone = settings?.whatsappNumber 
    ? `+${settings.whatsappNumber.replace(/\D/g, '')}` 
    : "+573000000000";

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "TouristAttraction"],
        "@id": "https://cabalgatamedellin.com/#business",
        "name": businessName,
        "url": "https://cabalgatamedellin.com/",
        "telephone": telephone,
        "description": "Cabalgatas ecológicas y tours en cuatrimoto en Caldas, Antioquia, a 30 minutos de Medellín. Caballos dóciles, guías expertos y póliza médica con Magenta Seguros.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Vereda Salinas",
          "addressLocality": "Caldas",
          "addressRegion": "Antioquia",
          "addressCountry": "CO"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "6.0911",
          "longitude": "-75.6358"
        },
        "areaServed": { "@type": "City", "name": "Medellín" },
        "priceRange": "$100.000 - $250.000 COP",
        "offers": [
          {
            "@type": "Offer",
            "name": "Cabalgata Grupal Fin de Semana",
            "price": "100000",
            "priceCurrency": "COP",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "name": "Cabalgata Privada Exclusiva",
            "price": "100000",
            "priceCurrency": "COP",
            "description": "Tarifa por persona más $80.000 COP de guía exclusivo por grupo.",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "name": "Tour Cuatrimoto (1.5 Horas)",
            "price": "250000",
            "priceCurrency": "COP",
            "availability": "https://schema.org/InStock"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://cabalgatamedellin.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Necesito experiencia previa para realizar la cabalgata?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No necesitas experiencia previa. Asignamos caballos nobles según tu nivel, brindamos inducción inicial y vas acompañado por un guía durante todo el recorrido con póliza de Magenta Seguros incluida."
            }
          },
          {
            "@type": "Question",
            "name": "¿Dónde están ubicados y cuánto tarda llegar desde Medellín?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Estamos ubicados en la Vereda Salinas en Caldas, Antioquia (Sur del Valle de Aburrá), a solo 30 minutos de El Poblado y Laureles sin pagar peajes, con opción de transporte VIP puerta a puerta."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cuánto dura la experiencia y por dónde pasa la ruta?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "El recorrido a caballo dura aproximadamente 2 horas a través de senderos ecológicos, bosques nativos y miradores en las montañas del sur del Valle de Aburrá. Te recomendamos disponer de unas 2.5 horas en total."
            }
          },
          {
            "@type": "Question",
            "name": "¿Tienen límite de peso o edad mínima para los jinetes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Por el bienestar y la salud de nuestros caballos, el peso máximo permitido es de 110 kg. Recibimos niños a partir de los 3 años acompañados de un adulto."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué pasa si llueve el día de mi reserva?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Operamos con normalidad bajo lluvia ligera proporcionando ponchos plásticos. En caso de tormenta eléctrica o clima severo que comprometa la seguridad, reprogramaremos tu reserva sin costo adicional."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="es">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }} />
      </head>
      <body className="antialiased font-sans">
        
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

        <LanguageSwitcher />
        {children}
      </body>
    </html>
  );
}