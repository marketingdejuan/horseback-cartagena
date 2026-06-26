import './globals.css';
import Script from 'next/script';
import { Metadata } from 'next';

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
    <html lang="es">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-GHH9Y226MV`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
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