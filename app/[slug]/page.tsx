import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

export const dynamicParams = true;

interface LandingConfig {
  lang: 'en' | 'es';
  title: string;
  description: string;
  h1: string;
  intro: string;
  price: number;
  tablaTitulo: string;
  tablaColNosotros: string;
  tablaColOtros: string;
  tablaFilas: { criterio: string; nosotros: string; otros: string }[];
  faqs: { q: string; a: string }[];
}

const LANDINGS: Record<string, LandingConfig> = {
  'planes-cabalgatas-cartagena': {
    lang: 'es',
    title: 'Planes de Cabalgatas en Cartagena | Paquetes Playa y VIP',
    description: 'Compara todos nuestros planes de cabalgatas en Cartagena: Grupal, Privado, Parejas al atardecer y VIP con transporte desde tu hotel.',
    h1: 'Planes y Paquetes de Cabalgatas en Cartagena de Indias',
    intro: 'Diseñamos paquetes a medida en las playas de Manzanillo del Mar (Zona Norte), a 20 minutos del Centro Amurallado y sin peajes.',
    price: 150000,
    tablaTitulo: 'Comparativa de Paquetes de Cabalgata en Cartagena',
    tablaColNosotros: 'Planes Horseback Cartagena',
    tablaColOtros: 'Paseos Informales',
    tablaFilas: [
      { criterio: 'Duración efectiva', nosotros: '2 horas completas en playa y sendero', otros: '30 a 45 minutos' },
      { criterio: 'Seguro médico', nosotros: 'Póliza de asistencia incluida', otros: 'Sin cobertura' },
      { criterio: 'Ubicación', nosotros: 'Manzanillo del Mar (sin peajes)', otros: 'Playas congestionadas' },
    ],
    faqs: [
      { q: '¿Qué incluye el plan básico?', a: 'Incluye 2 horas de cabalgata por playa y manglares, caballo asignado según experiencia, guía acompañante y seguro médico.' },
    ],
  },
  'alquiler-caballos-cartagena-precios': {
    lang: 'es',
    title: 'Alquiler de Caballos en Cartagena Precios por Hora y Grupos',
    description: 'Tarifas actualizadas de alquiler de caballos en Cartagena. Desglose por horas, aperaje completo y descuentos para grupos en Manzanillo del Mar.',
    h1: 'Alquiler de Caballos en Cartagena: Precios y Tarifas Transparentes',
    intro: 'Conoce el desglose exacto por jinete, aperaje criollo bien mantenido y acompañamiento profesional en la Zona Norte.',
    price: 150000,
    tablaTitulo: 'Desglose de Tarifas de Alquiler Equino',
    tablaColNosotros: 'Tarifa Oficial Manzanillo',
    tablaColOtros: 'Intermediarios / Agencias',
    tablaFilas: [
      { criterio: 'Tarifa base 2 horas', nosotros: '$150.000 COP por jinete', otros: '$240.000+ COP con sobrecostos' },
      { criterio: 'Guía exclusivo opcional', nosotros: '$60.000 COP por grupo', otros: 'Cobro por persona' },
      { criterio: 'Estado de sillas y aperos', nosotros: 'Sillas acolchadas desinfectadas', otros: 'Aperos desgastados' },
    ],
    faqs: [
      { q: '¿El precio cambia según el número de jinetes?', a: 'La tarifa base es de $150.000 COP por persona y el costo del guía privado ($60.000 COP) se divide entre todo tu grupo.' },
    ],
  },
  'tour-cuatrimotos-cartagena-manzanillo': {
    lang: 'es',
    title: 'Tour de Cuatrimotos en Cartagena y Manzanillo del Mar',
    description: 'Alquiler y tour guiado en cuatrimotos por las playas y trochas de Manzanillo del Mar en Cartagena. A 20 minutos del Centro sin peajes.',
    h1: 'Tour de Cuatrimotos Off-Road en Manzanillo del Mar, Cartagena',
    intro: 'Recorre dunas costeras, trochas rurales y tramos de playa en cuatrimotos automáticas de alto cilindraje.',
    price: 280000,
    tablaTitulo: 'Especificaciones del Tour de Cuatrimotos (ATVs)',
    tablaColNosotros: 'Nuestra Ruta Manzanillo Off-Road',
    tablaColOtros: 'Alquiler Urbano',
    tablaFilas: [
      { criterio: 'Tarifa y duración', nosotros: '$280.000 COP / 1.5 horas', otros: '$300.000 COP / 45 min' },
      { criterio: 'Parrillero adicional', nosotros: '+$60.000 COP permitido', otros: 'Prohibido o cobro doble' },
      { criterio: 'Tipo de terreno', nosotros: 'Arena de playa + trocha ecológica', otros: 'Solo pavimento' },
    ],
    faqs: [
      { q: '¿Necesito experiencia para manejar las cuatrimotos?', a: 'No, todas nuestras cuatrimotos son automáticas y realizamos una práctica previa antes de salir a la ruta.' },
    ],
  },
  'cabalgata-romantica-parejas-cartagena': {
    lang: 'es',
    title: 'Cabalgata Romántica para Parejas en Cartagena al Atardecer',
    description: 'Celebra aniversarios, cumpleaños o pedidas de mano con una cabalgata privada al atardecer en la playa de Manzanillo del Mar.',
    h1: 'Cabalgata Romántica al Atardecer en la Playa de Cartagena',
    intro: 'Un recorrido 100% privado para dos personas frente al mar Caribe durante la hora dorada, con brindis y sesión fotográfica.',
    price: 480000,
    tablaTitulo: 'Comparativa Plan Romántico vs. Tour Grupal',
    tablaColNosotros: 'Plan Romántico Parejas ($480k)',
    tablaColOtros: 'Cabalgata Estándar',
    tablaFilas: [
      { criterio: 'Privacidad del recorrido', nosotros: 'Exclusivo para ustedes dos + guía', otros: 'Compartido con otros turistas' },
      { criterio: 'Celebración en playa', nosotros: 'Brindis, picada y montaje', otros: 'Solo recorrido a caballo' },
      { criterio: 'Horario recomendado', nosotros: 'Atardecer frente al mar (4:00 PM)', otros: 'Horario general' },
    ],
    faqs: [
      { q: '¿Pueden ayudarme a organizar una propuesta de matrimonio?', a: 'Sí, coordinamos el punto exacto frente al mar al atardecer con brindis y registro en video.' },
    ],
  },
  'cabalgatas-ninos-familias-cartagena': {
    lang: 'es',
    title: 'Cabalgatas para Niños y Familias en Cartagena Seguras',
    description: 'Plan familiar seguro en Cartagena: cabalgatas para niños desde 3 años con caballos mansos en las playas tranquilas de Manzanillo del Mar.',
    h1: 'Cabalgatas Seguras para Niños y Familias en Cartagena',
    intro: 'Disfruta de una actividad al aire libre con caballos extremadamente nobles, terreno plano de arena y acompañamiento personalizado.',
    price: 150000,
    tablaTitulo: 'Protocolo de Seguridad Familiar e Infantil',
    tablaColNosotros: 'Estándar Familiar Manzanillo',
    tablaColOtros: 'Paseos sin Control',
    tablaFilas: [
      { criterio: 'Edad mínima permitida', nosotros: 'Desde los 3 años con guía de cabestro', otros: 'Sin protocolo infantil' },
      { criterio: 'Temperamento equino', nosotros: 'Caballos escuela 100% mansos', otros: 'Caballos sin selección' },
      { criterio: 'Cobertura médica', nosotros: 'Póliza activa para cada menor y adulto', otros: 'Sin póliza' },
    ],
    faqs: [
      { q: '¿Los niños van solos o acompañados?', a: 'Los niños pequeños pueden ir acompañados por un guía que lleva el caballo de cabestro o junto a sus padres según su edad.' },
    ],
  },
  'cabalgata-vip-transporte-bocagrande-centro-morros': {
    lang: 'es',
    title: 'Cabalgata VIP con Transporte desde Bocagrande, Centro y Morros',
    description: 'Tour de cabalgata en Cartagena con recogida privada puerta a puerta en tu hotel o Airbnb en Bocagrande, Ciudad Amurallada, Getsemaní y Morros.',
    h1: 'Cabalgata VIP con Recogida en Hotel (Bocagrande, Centro y Morros)',
    intro: 'Olvídate de negociar taxis: te recogemos en vehículo privado climatizado en la puerta de tu hotel y te regresamos al finalizar.',
    price: 270000,
    tablaTitulo: 'Ventajas del Servicio VIP Puerta a Puerta',
    tablaColNosotros: 'Transporte VIP Integrado',
    tablaColOtros: 'Transporte por Cuenta Propia',
    tablaFilas: [
      { criterio: 'Recogida y regreso', nosotros: 'Puerta a puerta en hotel o Airbnb', otros: 'Difícil conseguir regreso en la tarde' },
      { criterio: 'Peajes en ruta', nosotros: '$0 COP por Viaducto del Manglar', otros: 'Tarifas variables de taxi' },
      { criterio: 'Tiempo de viaje', nosotros: '20 min desde Centro / 12 min desde Morros', otros: 'Esperas prolongadas' },
    ],
    faqs: [
      { q: '¿En qué zonas de Cartagena recogen?', a: 'Cubrimos Bocagrande, Castillogrande, El Laguito, Centro Histórico, Getsemaní, Marbella, Crespo, Morros y La Boquilla.' },
    ],
  },
  'cabalgatas-grupos-empresas-cartagena': {
    lang: 'es',
    title: 'Cabalgatas para Grupos, Empresas y Despedidas en Cartagena',
    description: 'Organiza eventos corporativos, integraciones empresariales, despedidas de soltera(o) y grupos de 6 a 30 personas en Cartagena.',
    h1: 'Cabalgatas para Grupos, Despedidas y Eventos Corporativos en Cartagena',
    intro: 'Capacidad operativa para grupos grandes de hasta 30 jinetes simultáneos en las playas de Manzanillo del Mar.',
    price: 150000,
    tablaTitulo: 'Capacidad Operativa para Grupos y Empresas',
    tablaColNosotros: 'Operación Grupal Manzanillo',
    tablaColOtros: 'Alquileres Pequeños',
    tablaFilas: [
      { criterio: 'Capacidad simultánea', nosotros: 'Hasta 30 caballos en un mismo turno', otros: 'Máximo 4 a 5 caballos' },
      { criterio: 'Logística y guías', nosotros: 'Múltiples guías montados de apoyo', otros: 'Un solo guía' },
      { criterio: 'Facturación y reservas', nosotros: 'Coordinación directa con nuestro ERP', otros: 'Informal' },
    ],
    faqs: [
      { q: '¿Hacen despedidas de soltera o cumpleaños grupales?', a: 'Sí, organizamos salidas privadas para grupos de amigos, despedidas y empresas con transporte en van opcional.' },
    ],
  },
  'donde-montar-a-caballo-cerca-de-cartagena': {
    lang: 'es',
    title: 'Dónde Montar a Caballo Cerca de Cartagena: Comparativa de Zonas',
    description: 'Guía comparativa para saber dónde montar a caballo en Cartagena: Manzanillo del Mar, La Boquilla, Tierra Bomba y Turbaco. Tiempos y peajes.',
    h1: '¿Dónde Montar a Caballo en Cartagena? Guía Comparativa de Zonas',
    intro: 'Analizamos las principales zonas ecuestres cerca de Cartagena según distancia, costo de peajes, estado de los caballos y belleza del paisaje.',
    price: 150000,
    tablaTitulo: 'Comparativa de Zonas para Cabalgar en Cartagena',
    tablaColNosotros: 'Manzanillo del Mar (Zona Norte)',
    tablaColOtros: 'Otras Zonas / Municipios Vecinos',
    tablaFilas: [
      { criterio: 'Tiempo desde el Centro', nosotros: '20 minutos en carro', otros: '45 a 60 minutos o lancha' },
      { criterio: 'Peajes o lanchas', nosotros: '0 peajes (acceso terrestre directo)', otros: 'Peaje vial o pago de lancha' },
      { criterio: 'Paisaje del recorrido', nosotros: 'Playa abierta del Caribe + Manglares', otros: 'Potrero cerrado o zona congestionada' },
    ],
    faqs: [
      { q: '¿Por qué Manzanillo del Mar es la mejor zona para cabalgar en Cartagena?', a: 'Porque combina acceso rápido en 20 minutos sin peajes con playas amplias y tranquilas donde se puede cabalgar con total seguridad.' },
    ],
  },
  'en-horseback-riding-cartagena-tours': {
    lang: 'en',
    title: 'Horseback Riding Cartagena Tours | Best Beach Ride in Colombia',
    description: 'Top-rated horseback riding tours in Cartagena, Colombia. Ride along Manzanillo del Mar beach just 20 minutes from the Walled City with zero tolls.',
    h1: 'Horseback Riding Cartagena Tours: Private Beach & Mangrove Rides',
    intro: 'Escape the crowds and ride healthy, well-cared-for Paso Fino horses along the pristine Caribbean coastline of Manzanillo del Mar.',
    price: 150000,
    tablaTitulo: 'Cartagena Horseback Tour Comparison',
    tablaColNosotros: 'Horseback Cartagena (Manzanillo)',
    tablaColOtros: 'Street Vendors / Crowded Beaches',
    tablaFilas: [
      { criterio: 'Distance from Walled City', nosotros: '20 minutes via Gran Manglar Viaduct', otros: '1+ hour away' },
      { criterio: 'Toll Fees', nosotros: '$0 (100% Toll-Free Route)', otros: 'Extra highway tolls' },
      { criterio: 'Horse Welfare & Safety', nosotros: 'Healthy ranch horses + Medical Insurance', otros: 'No insurance or safety gear' },
    ],
    faqs: [
      { q: 'How far is the ranch from the Walled City and Bocagrande?', a: 'We are located in Manzanillo del Mar (North Zone), just 20 minutes from the Walled City, Getsemaní, and Bocagrande, and 12 minutes from the airport.' },
    ],
  },
  reservar: {
    lang: 'es',
    title: 'Reservar Cabalgata en Cartagena en Línea | Confirmación Inmediata',
    description: 'Reserva tu cabalgata o tour de cuatrimotos en Manzanillo del Mar, Cartagena. Confirmación inmediata por WhatsApp.',
    h1: 'Reservar Cabalgata en Cartagena de Indias',
    intro: 'Asegura tus caballos para la fecha y hora que prefieras en nuestra sede de Manzanillo del Mar (a 20 min del Centro sin peajes).',
    price: 150000,
    tablaTitulo: 'Pasos y Condiciones de Reserva Rápida',
    tablaColNosotros: 'Reserva Directa Online',
    tablaColOtros: 'Reserva con Revendedores',
    tablaFilas: [
      { criterio: 'Confirmación de cupo', nosotros: 'Inmediata con el ERP central', otros: 'Sujeta a intermediarios' },
      { criterio: 'Precio garantizado', nosotros: 'Tarifa directa de pesebrera', otros: 'Comisiones ocultas' },
      { criterio: 'Flexibilidad climática', nosotros: 'Reprogramación sin penalidad por lluvia', otros: 'Sin garantía' },
    ],
    faqs: [
      { q: '¿Con cuánta anticipación debo reservar?', a: 'Recomendamos reservar al menos 24 horas antes, especialmente si deseas el horario del atardecer (4:00 PM).' },
    ],
  },
  consultar: {
    lang: 'es',
    title: 'Consultar Disponibilidad y Reglas Operativas | Horseback Cartagena',
    description: 'Consulta horarios disponibles, límites de peso, edades y recomendaciones para tu cabalgata en Cartagena.',
    h1: 'Consulta de Disponibilidad y Reglas Operativas en Cartagena',
    intro: 'Revisa todos los detalles operativos antes de tu visita a nuestra sede en Manzanillo del Mar.',
    price: 150000,
    tablaTitulo: 'Reglas Operativas y Recomendaciones',
    tablaColNosotros: 'Requisito Operativo',
    tablaColOtros: 'Detalle para el Visitante',
    tablaFilas: [
      { criterio: 'Horarios de salida', nosotros: '8:00 AM a 4:30 PM todos los días', otros: 'Llegar 15 min antes' },
      { criterio: 'Vestimenta sugerida', nosotros: 'Ropa fresca, calzado cerrado y bloqueador', otros: 'Sombrero o gorra opcional' },
      { criterio: 'Peso máximo por jinete', nosotros: 'Hasta 105 kg por bienestar equino', otros: 'Caballos asignados por talla' },
    ],
    faqs: [
      { q: '¿Qué pasa si llueve el día de mi cabalgata?', a: 'Podemos ajustar la hora de salida el mismo día o reprogramar tu reserva sin ningún costo adicional.' },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = LANDINGS[slug];
  if (!page) return { title: 'Not Found' };

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `https://horsebackcartagena.com/${slug}`,
    },
  };
}

export default async function DynamicIntentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = LANDINGS[slug];
  if (!data) notFound();

  const isEn = data.lang === 'en';

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isEn ? 'Home' : 'Inicio',
            item: isEn ? 'https://horsebackcartagena.com' : 'https://horsebackcartagena.com/es',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: data.h1,
            item: `https://horsebackcartagena.com/${slug}`,
          },
        ],
      },
      {
        '@type': ['TouristTrip', 'Product'],
        name: data.h1,
        description: data.description,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'COP',
          price: data.price,
          availability: 'https://schema.org/InStock',
          url: `https://horsebackcartagena.com/${slug}`,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <div lang={isEn ? 'en' : 'es'} className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* Pilar 4 y Pilar 5: Barra superior traducida 100% según el idioma de la URL */}
      <header className="bg-slate-900 text-white py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href={isEn ? '/' : '/es'} className="font-extrabold text-amber-400">
            Horseback Cartagena
          </Link>
          <nav className="hidden md:flex gap-5 text-sm">
            <Link href={isEn ? '/' : '/es'}>{isEn ? 'Home' : 'Inicio'}</Link>
            <Link href="/planes-cabalgatas-cartagena">{isEn ? 'Packages' : 'Planes'}</Link>
            <Link href="/cabalgatas-manzanillo-del-mar">{isEn ? 'Manzanillo Ranch' : 'Sede Manzanillo'}</Link>
            <Link href="/tour-cuatrimotos-cartagena-manzanillo">{isEn ? 'ATVs' : 'Cuatrimotos'}</Link>
            <Link href="/cabalgata-romantica-parejas-cartagena">{isEn ? 'Couples' : 'Parejas'}</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <Link
            href={isEn ? '/#quoter' : '/es#cotizador'}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg"
          >
            {isEn ? 'Book Online' : 'Cotizar en Línea'}
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-4 space-y-10 flex-1">
        <nav className="text-xs text-slate-500">
          <Link href={isEn ? '/' : '/es'} className="underline">
            {isEn ? 'Home' : 'Inicio'}
          </Link>{' '}
          &gt; <span>{data.h1}</span>
        </nav>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{data.h1}</h1>
          <p className="text-lg text-slate-700 mb-6">{data.intro}</p>
          <Link
            href={isEn ? '/#quoter' : '/es#cotizador'}
            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl"
          >
            {isEn ? 'Quote & Book via WhatsApp' : 'Cotizar y Reservar por WhatsApp'}
          </Link>
        </section>

        {/* Pilar 3: Tabla Comparativa Única por Página */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold mb-4">{data.tablaTitulo}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b">
                  <th className="p-3">{isEn ? 'Feature' : 'Criterio'}</th>
                  <th className="p-3 text-emerald-700 font-bold">{data.tablaColNosotros}</th>
                  <th className="p-3 text-slate-600">{data.tablaColOtros}</th>
                </tr>
              </thead>
              <tbody>
                {data.tablaFilas.map((fila, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-3 font-medium">{fila.criterio}</td>
                    <td className="p-3 text-emerald-700 font-semibold">{fila.nosotros}</td>
                    <td className="p-3 text-slate-600">{fila.otros}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold mb-4">
            {isEn ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
          </h2>
          <div className="space-y-4">
            {data.faqs.map((f, i) => (
              <div key={i} className="border-b border-slate-200 pb-3">
                <h3 className="font-bold">{f.q}</h3>
                <p className="text-sm text-slate-600 mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 text-sm py-8 px-4 text-center">
        <p>
          Horseback Cartagena • Manzanillo del Mar, North Zone, Cartagena de Indias, Colombia •{' '}
          {isEn ? '20 mins from Walled City (No Tolls)' : 'A 20 min del Centro Histórico (Sin Peajes)'}
        </p>
      </footer>
    </div>
  );
}
