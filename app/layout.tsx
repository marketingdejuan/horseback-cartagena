import type { Metadata } from "next";
import "./globals.css";

// MOTOR SEO INTERNACIONAL
export const metadata: Metadata = {
  title: 'Cabalgatas en Caldas, Antioquia | Recorridos Ecológicos a Caballo',
  description: 'Conectando jinetes principiantes y expertos con los paisajes montañosos del sur del Valle de Aburrá. ¡Reserva tu cabalgata hoy!',
  alternates: {
    // Esto le dice a Google que tienes dos versiones oficiales de la web
    languages: {
      'es-CO': 'https://cabalgatamedellin.com',
      'en-US': 'https://cabalgatamedellin.com/en',
    },
  },
  openGraph: {
    title: 'Cabalgatas Ecológicas en Caldas | Reservas Disponibles',
    description: 'Conectando jinetes principiantes y expertos con los paisajes montañosos del sur del Valle de Aburrá.',
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