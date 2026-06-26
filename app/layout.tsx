import './globals.css';
import Script from 'next/script';
import { Metadata } from 'next';

/* STREAMING_CHUNK:Configurando metadatos globales... */
export const metadata: Metadata = {
title: 'Cabalgata Medellín | Expertos en Rutas a Caballo',
description: 'Vive la mejor experiencia de cabalgata en Medellín y Caldas.',
};

export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (


{/* STREAMING_CHUNK:Inyectando scripts de Google Analytics... /}
{/ Google Analytics: Cargamos el script principal de forma asíncrona */}
<Script
strategy="afterInteractive"
src={https://www.googletagmanager.com/gtag/js?id=G-GHH9Y226MV}
/>

    {/* STREAMING_CHUNK:Inicializando la configuración de GA4... */}
    {/* Inicializamos la configuración de tu propiedad GA4 */}
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        // Este es tu ID de medición exacto (G-GHH9Y226MV)
        gtag('config', 'G-GHH9Y226MV');
      `}
    </Script>
  </head>
  <body>
    {children}
  </body>
</html>


);
}