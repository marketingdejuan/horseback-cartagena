import './globals.css';
import Script from 'next/script';
import { Metadata } from 'next';

/* STREAMING_CHUNK:Configurando Metadata Open Graph... */
export const metadata: Metadata = {
title: 'Cabalgatas en Caldas | Recorridos Ecológicos a Caballo',
description: 'Conectando jinetes principiantes y expertos con los paisajes montañosos del sur del Valle de Aburrá. ¡Reserva hoy!',
openGraph: {
title: 'Cabalgatas Ecológicas en Caldas | Reservas Disponibles',
description: 'A 30 mins de Medellín. 100% Parqueadero Privado. Caballos mansos y briosos.',
url: 'https://cabalgatamedellin.com',
siteName: 'Cabalgatas Medellín',
images: [
{
url: 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=1200',
width: 1200,
height: 630,
alt: 'Caballos cruzando el río en Caldas',
},
],
locale: 'es_CO',
type: 'website',
},
};

export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
/* STREAMING_CHUNK:Inyectando Schema JSON-LD y Analytics... */
const jsonLd = {
"@context": "https://schema.org",
"@type": "SportsActivityLocation",
"name": "Cabalgatas Medellín - Pesebrera Caldas",
"description": "Recorridos ecológicos a caballo por senderos y ríos en Caldas, Antioquia.",
"address": {
"@type": "PostalAddress",
"addressLocality": "Caldas",
"addressRegion": "Antioquia",
"addressCountry": "CO"
},
"priceRange": "$$$",
"telephone": "+573000000000"
};

return (


<Script
strategy="afterInteractive"
src={https://www.googletagmanager.com/gtag/js?id=G-GHH9Y226MV}
/>

{window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-GHH9Y226MV');}

<script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>


{children}


);
}