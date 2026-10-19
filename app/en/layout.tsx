import type { Metadata } from "next";

const URL_SITIO = 'https://cabalgatamedellin.com';

export const metadata: Metadata = {
  title: 'Horseback Riding in Medellin | Private & Eco Tours',
  description: 'Disconnect from the city and enjoy an ecological horseback riding experience in the mountains of Caldas, Antioquia (40 mins from Medellin). Medical insurance included.',
  keywords: 'horseback riding medellin, horse tours medellin, eco tours antioquia, ride horses colombia, things to do in medellin',
  alternates: {
    canonical: `${URL_SITIO}/en`,
    languages: {
      'es-CO': URL_SITIO,
      'en-US': `${URL_SITIO}/en`,
      'x-default': URL_SITIO,
    },
  },
  openGraph: {
    title: 'Horseback Riding in Medellin | Private & Eco Tours',
    description: 'The best ecological horseback riding experience near Medellin. Gentle horses, mountain views, and full medical insurance.',
    url: `${URL_SITIO}/en`,
    siteName: 'Medellin Horseback Riding',
    locale: 'en_US',
    type: 'website',
  },
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}