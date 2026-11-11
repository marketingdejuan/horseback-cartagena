import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cabalgatas en Manzanillo del Mar Cartagena | Guía Oficial Zona Norte',
  description:
    'Guía completa de cabalgatas en Manzanillo del Mar (Zona Norte de Cartagena). A 20 minutos de Bocagrande y Ciudad Amurallada por el Viaducto del Manglar sin peajes.',
  alternates: {
    canonical: 'https://horsebackcartagena.com/cabalgatas-manzanillo-del-mar',
  },
};

const faqs = [
  {
    q: '¿Cuánto tiempo toma llegar a Manzanillo del Mar desde el Centro Histórico o Bocagrande?',
    a: 'El trayecto toma aproximadamente 20 minutos desde la Ciudad Amurallada, Getsemaní o Bocagrande, y solo 12 minutos desde el sector de Morros y el Aeropuerto Rafael Núñez.',
  },
  {
    q: '¿Hay que pagar peajes para llegar a la pesebrera en Manzanillo del Mar?',
    a: 'No. La ruta saliendo de Cartagena por el Viaducto del Gran Manglar (Vía al Mar) hasta la entrada de Manzanillo del Mar es 100% libre de peajes.',
  },
  {
    q: '¿Se requiere experiencia previa montando a caballo?',
    a: 'No necesitas experiencia. Contamos con caballos criollos mansos de paso suave y guías expertos que te enseñan el manejo básico antes de entrar a la playa.',
  },
  {
    q: '¿Cuál es el mejor horario para cabalgar en las playas de Cartagena?',
    a: 'Los horarios favoritos por la brisa fresca y la luz para fotografías son en la mañana (8:30 AM a 10:30 AM) y al atardecer (3:30 PM a 5:30 PM).',
  },
  {
    q: '¿Los niños pueden participar en la cabalgata en Manzanillo del Mar?',
    a: 'Sí, recibimos niños desde los 3 años en caballos dóciles guiados de cabestro y con póliza de asistencia médica incluida.',
  },
  {
    q: '¿Ofrecen servicio de transporte desde hoteles y Airbnb?',
    a: 'Sí, contamos con transporte VIP puerta a puerta opcional en vehículos climatizados desde Bocagrande, Laguito, Castillogrande, Centro, Getsemaní y Morros.',
  },
  {
    q: '¿Qué lugares naturales se recorren durante el tour?',
    a: 'Recorremos las playas abiertas de Manzanillo del Mar, senderos costeros nativos y miradores hacia el ecosistema de manglares de la Zona Norte.',
  },
  {
    q: '¿Cómo funciona la reserva en línea?',
    a: 'Puedes cotizar en tiempo real en nuestra web y confirmar directamente por WhatsApp eligiendo fecha, hora y número de jinetes.',
  },
];

export default function PilarManzanilloPage() {
  const schemaPilar = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'TouristAttraction', 'SportsActivityLocation'],
        name: 'Horseback Cartagena - Sede Manzanillo del Mar',
        url: 'https://horsebackcartagena.com/cabalgatas-manzanillo-del-mar',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Playas de Manzanillo del Mar, Zona Norte',
          addressLocality: 'Cartagena de Indias',
          addressRegion: 'Bolívar',
          addressCountry: 'CO',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 10.5218, longitude: -75.5015 },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <div lang="es" className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPilar) }}
      />

      <header className="bg-slate-900 text-white py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-amber-400">Horseback Cartagena</Link>
          <div className="flex gap-4 text-sm">
            <Link href="/" className="hover:text-amber-300">English Home</Link>
            <Link href="/es" className="hover:text-amber-300">Inicio Español</Link>
            <Link href="/reservar" className="bg-emerald-600 px-3 py-1 rounded-lg">Reservar</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-4 space-y-12">
        <nav className="text-xs text-slate-500">
          <Link href="/es" className="underline">Inicio</Link> &gt; <span>Cabalgatas en Manzanillo del Mar</span>
        </nav>

        <section>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Cabalgatas en Manzanillo del Mar: Guía Oficial de la Zona Norte de Cartagena
          </h1>
          <p className="text-lg text-slate-700">
            Manzanillo del Mar es el corregimiento costero más tranquilo y exclusivo de la <strong>Zona Norte de Cartagena de Indias</strong>. A diferencia de las playas urbanas congestionadas, aquí dispones de kilómetros de arena amplia frente al mar Caribe y senderos ecológicos rodeados de manglares, a solo <strong>20 minutos del Centro Histórico</strong> y <strong>sin pagar peajes</strong>.
          </p>
        </section>

        {/* Tabla Comparativa 1 */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold mb-4">
            Comparativa: Manzanillo del Mar vs. Otras Playas de Cartagena
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b">
                  <th className="p-3">Criterio</th>
                  <th className="p-3 text-emerald-700 font-bold">Manzanillo del Mar (Nuestra Sede)</th>
                  <th className="p-3 text-slate-600">Playas Urbanas / Otras Zonas</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">Distancia desde el Centro</td>
                  <td className="p-3 text-emerald-700 font-semibold">20 min (12 min desde Morros)</td>
                  <td className="p-3">45 a 60 min fuera de la ciudad</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Peajes en la ruta</td>
                  <td className="p-3 text-emerald-700 font-semibold">$0 COP (Ruta 100% sin peajes)</td>
                  <td className="p-3">1 a 2 peajes ida y regreso</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Privacidad en la playa</td>
                  <td className="p-3 text-emerald-700 font-semibold">Playa amplia sin vendedores ambulantes</td>
                  <td className="p-3">Alta congestión peatonal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tabla Comparativa 2 */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold mb-4">
            Tiempos de Llegada y Opciones de Transporte a la Pesebrera
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b">
                  <th className="p-3">Punto de Salida en Cartagena</th>
                  <th className="p-3">Tiempo Estimado</th>
                  <th className="p-3">Vía Recomendada (Sin Peajes)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">Morros / La Boquilla / Aeropuerto</td>
                  <td className="p-3 font-semibold">12 minutos</td>
                  <td className="p-3">Vía al Mar directo hacia Zona Norte</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Centro Histórico / Getsemaní</td>
                  <td className="p-3 font-semibold">20 minutos</td>
                  <td className="p-3">Viaducto del Gran Manglar</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Bocagrande / Castillogrande / Laguito</td>
                  <td className="p-3 font-semibold">22 a 25 minutos</td>
                  <td className="p-3">Av. Santander + Viaducto del Gran Manglar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Mapa Interactivo */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold mb-4">Ubicación en Manzanillo del Mar (Zona Norte)</h2>
          <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-200">
            <iframe
              title="Mapa Cabalgatas Manzanillo del Mar Cartagena"
              src="https://www.google.com/maps?q=10.5218,-75.5015&z=14&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
            />
          </div>
        </section>

        {/* 8 FAQs Profundas */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold mb-6">Preguntas Frecuentes sobre Manzanillo del Mar</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-lg">{f.q}</h3>
                <p className="text-slate-600 text-sm mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
