import type { Metadata } from "next";
import "./globals.css";

// MOTOR SEO ESTRATÉGICO - ESPAÑOL (HOME)
export const metadata: Metadata = {
  title: 'Cabalgatas en Medellín | Tours Ecológicos y Privados en Caldas',
  description: 'Vive la mejor experiencia de cabalgatas ecológicas cerca a Medellín (Caldas, Antioquia). Reserva tours privados, grupales y planes VIP para parejas o familias.',
  keywords: 'cabalgatas medellin, tour a caballo antioquia, planes en medellin, caballos caldas antioquia, cabalgatas ecologicas, que hacer cerca a medellin',
  alternates: {
    // Esto le dice a Google que tienes dos versiones oficiales de la web
    languages: {
      'es-CO': 'https://cabalgatamedellin.com',
      'en-US': 'https://cabalgatamedellin.com/en',
    },
  },
  openGraph: {
    title: 'Cabalgatas en Medellín | Tours Ecológicos y Privados en Caldas',
    description: 'Vive la mejor experiencia de cabalgatas ecológicas cerca a Medellín.',
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
  return (
    <html lang="es">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}