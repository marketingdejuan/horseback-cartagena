import type { Metadata } from "next";

// MOTOR SEO ESTRATÉGICO - INGLÉS
export const metadata: Metadata = {
  title: 'Horseback Riding Medellin | Ecological & Private Tours',
  description: 'Experience the best ecological horseback riding tours near Medellin, Colombia. Book private rides, group tours, and VIP packages with transport included.',
  keywords: 'horseback riding medellin, medellin horse tours, things to do in medellin, medellin day trips, horseback riding colombia, medellin tours',
  openGraph: {
    title: 'Horseback Riding Medellin | Ecological & Private Tours',
    description: 'Experience the best ecological horseback riding tours near Medellin, Colombia.',
    url: 'https://cabalgatamedellin.com/en',
    siteName: 'Horseback Riding Medellin',
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