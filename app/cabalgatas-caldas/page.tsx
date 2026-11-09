import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, ShieldCheck, Star, Clock, MapPin, BadgeCheck, 
  CheckCircle2, Shield, Compass, ArrowRight, Home, ChevronRight,
  Coffee, Heart, Camera, Sun, Trees, Mountain, Car, Users
} from 'lucide-react';

const URL_SITIO = 'https://cabalgatamedellin.com';
const URL_PAGINA = 'https://cabalgatamedellin.com/cabalgatas-caldas';
const WHATSAPP_DEFAULT = '573000000000';

export const metadata: Metadata = {
  title: 'Cabalgatas Caldas, Antioquia | Rutas Ecológicas desde $100.000 (Vereda Salinas)',
  description: 'Vive las mejores cabalgatas en Caldas, Antioquia (Vereda Salinas). A solo 30 min de Medellín y El Poblado sin peajes. Caballos mansos, guías expertos, cuatrimotos y seguro médico incluido.',
  keywords: 'cabalgatas caldas, cabalgatas en caldas antioquia, montar a caballo en caldas, alquiler de caballos caldas antioquia, turismo ecologico caldas antioquia, que hacer en caldas antioquia, vereda salinas caldas',
  alternates: {
    canonical: URL_PAGINA,
  },
  openGraph: {
    title: 'Cabalgatas en Caldas, Antioquia | Naturaleza y Tradición a 30 min de Medellín',
    description: 'Recorridos guiados de 2 horas a caballo por bosques nativos, quebradas y miradores de Caldas, Antioquia. Planes grupales, privados y románticos con Magenta Seguros.',
    url: URL_PAGINA,
    siteName: 'Cabalgata Medellín',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: `${URL_SITIO}/cabalgatas-en-medellin-y-caldas.webp`,
        width: 1200,
        height: 630,
        alt: 'Jinetes en cabalgata ecológica por las montañas de Caldas, Antioquia',
      },
    ],
  },
};

const FAQS_CALDAS = [
  {
    q: '¿Dónde se realizan exactamente las cabalgatas en Caldas, Antioquia?',
    a: 'Nuestras cabalgatas salen desde nuestra finca equina ubicada en la Vereda Salinas del municipio de Caldas, Antioquia (Sur del Valle de Aburrá). Es una zona campestre segura de tradición cafetera y caballista, rodeada de bosques nativos, nacimientos de agua y miradores naturales hacia las montañas del Suroeste cercano.'
  },
  {
    q: '¿Cuánto cuesta una cabalgata en Caldas y qué incluye el precio?',
    a: 'El precio base es de $100.000 COP por persona para un recorrido guiado de 2 horas. Incluye caballo criollo manso ensillado a tu medida, inducción práctica de manejo antes de salir, acompañamiento de guía baquiano, tinto campesino de bienvenida y póliza de asistencia médica con Magenta Seguros. Los sábados y domingos a las 2:00 PM en modalidad grupal no pagas costo extra de guía; en horarios privados para tu grupo se adiciona un único valor de $80.000 COP por el guía exclusivo.'
  },
  {
    q: '¿Cuánto tiempo toma llegar a Caldas desde Medellín, El Poblado o Envigado?',
    a: 'Desde El Poblado, Envigado, Sabaneta, Itagüí o La Estrella tardas aproximadamente 25 a 35 minutos avanzando hacia el sur por la Autopista Sur o la Avenida Regional. Lo mejor es que no tienes que pagar ningún peaje y la vía es completamente accesible para cualquier automóvil particular, moto, taxi o Uber.'
  },
  {
    q: '¿Se puede llegar en Metro o transporte público hasta las cabalgatas en Caldas?',
    a: 'Sí. Puedes tomar el Metro de Medellín en dirección sur hasta la última estación (Estación La Estrella). Desde allí puedes tomar un taxi, Uber o ruta integrada hacia Caldas que te dejará en nuestra sede de la Vereda Salinas en unos 12 a 15 minutos. También ofrecemos el Plan VIP con transporte privado puerta a puerta desde tu hotel o residencia por $130.000 COP ida y vuelta.'
  },
  {
    q: '¿Necesito experiencia previa para montar a caballo en las rutas de Caldas?',
    a: 'No necesitas experiencia previa. Contamos con una caballada mansa, noble y entrenada para el turismo ecológico y familiar. Antes de iniciar el ascenso a la montaña brindamos una charla práctica y asignamos cada ejemplar según la edad, peso y confianza del jinete.'
  },
  {
    q: '¿Desde qué edad pueden montar los niños y cuál es el límite de peso?',
    a: 'Recibimos niños desde los 3 años de edad, quienes van acompañados por un adulto responsable y supervisados por nuestro guía. Por bienestar y salud de la columna de nuestros caballos, el peso máximo permitido es de 110 kilogramos por jinete.'
  },
  {
    q: '¿Qué otros atractivos turísticos tiene el municipio de Caldas, Antioquia?',
    a: 'Caldas es conocido como la puerta del Suroeste Antioqueño y la tierra del agua. Además de nuestras cabalgatas y tours de cuatrimotos en la Vereda Salinas, el municipio alberga el Alto de San Miguel (donde nace el Río Medellín), la Reserva Forestal La Romera, el Parque Principal con la Catedral Nuestra Señora de las Mercedes y una excelente oferta de restaurantes típicos en la Variante de Caldas.'
  },
  {
    q: '¿Qué pasa si llueve en Caldas el día de mi cabalgata?',
    a: 'A Caldas se le conoce cariñosamente en Antioquia por su clima fresco de bosque húmedo. Si hay llovizna ligera, operamos con normalidad y te entregamos ponchos impermeables gratuitos para que disfrutes la aventura. En caso de tormenta eléctrica o lluvia severa que afecte la seguridad, reprogramamos tu reserva sin ningún costo adicional.'
  }
];

export default async function CabalgatasCaldasPage() {
  let whatsappNum = WHATSAPP_DEFAULT;
  try {
    const res = await fetch('https://admin.cabalgatas.co/api/ajustes?brandName=cabalgatamedellin.com', {
      next: { revalidate: 300 }
    });
    if (res.ok) {
      const ajustes = await res.json();
      if (ajustes.whatsappNumber) whatsappNum = ajustes.whatsappNumber;
    }
  } catch (e) {
    // Fallback al número por defecto
  }

  const msgGeneral = '¡Hola! Vi la página de Cabalgatas en Caldas, Antioquia y quiero cotizar una reserva. 🐎';
  const msgGrupal = '¡Hola! Quiero reservar la Cabalgata Grupal en Caldas ($100.000/persona - Fin de semana 2:00 PM). 🐎';
  const msgPrivada = '¡Hola! Quiero reservar una Cabalgata Privada en Caldas en horario exclusivo. 🐎';
  const msgCuatrimoto = '¡Hola! Quiero información del Tour de Cuatrimotos en Caldas, Antioquia. 🏍️';

  const linkGeneral = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msgGeneral)}`;
  const linkGrupal = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msgGrupal)}`;
  const linkPrivada = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msgPrivada)}`;
  const linkCuatrimoto = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msgCuatrimoto)}`;

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Cabalgatas en Medellín",
            "item": URL_SITIO
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Cabalgatas Caldas, Antioquia",
            "item": URL_PAGINA
          }
        ]
      },
      {
        "@type": ["LocalBusiness", "TouristAttraction", "SportsActivityLocation"],
        "@id": `${URL_PAGINA}#localbusiness`,
        "name": "Cabalgata Medellín - Sede Caldas, Antioquia",
        "description": "Operador líder de cabalgatas ecológicas y tours en cuatrimoto en la Vereda Salinas de Caldas, Antioquia. Rutas de 2 horas con caballos mansos y póliza Magenta Seguros.",
        "url": URL_PAGINA,
        "telephone": `+${whatsappNum}`,
        "image": `${URL_SITIO}/cabalgatas-en-medellin-y-caldas.webp`,
        "priceRange": "$100.000 - $260.000 COP",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Vereda Salinas",
          "addressLocality": "Caldas",
          "addressRegion": "Antioquia",
          "postalCode": "055440",
          "addressCountry": "CO"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "6.0911",
          "longitude": "-75.6358"
        },
        "areaServed": [
          { "@type": "City", "name": "Caldas" },
          { "@type": "City", "name": "Medellín" },
          { "@type": "City", "name": "Envigado" },
          { "@type": "City", "name": "Sabaneta" },
          { "@type": "City", "name": "Itagüí" },
          { "@type": "City", "name": "La Estrella" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "150"
        },
        "offers": [
          {
            "@type": "Offer",
            "name": "Cabalgata Grupal en Caldas (Sábados y Domingos 2:00 PM)",
            "price": "100000",
            "priceCurrency": "COP",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "name": "Cabalgata Privada en Caldas (10:00 AM, 2:00 PM o 4:00 PM)",
            "price": "100000",
            "priceCurrency": "COP",
            "description": "Tarifa por jinete más $80.000 COP de guía exclusivo por grupo.",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "name": "Tour de Cuatrimotos en Caldas (1.5 Horas)",
            "price": "250000",
            "priceCurrency": "COP",
            "availability": "https://schema.org/InStock"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${URL_PAGINA}#faq`,
        "mainEntity": FAQS_CALDAS.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] font-sans selection:bg-amber-200 text-zinc-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />

      {/* 1. HERO PRINCIPAL OPTIMIZADO PARA "CABALGATAS CALDAS" */}
      <header className="relative min-h-[82vh] bg-zinc-900 overflow-hidden flex flex-col justify-center pt-16 pb-24">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
          }}
        >
          <Image 
            src="/cabalgatas-en-medellin-y-caldas.webp" 
            alt="Cabalgatas en Caldas, Antioquia - Jinetes recorriendo senderos ecológicos en la Vereda Salinas" 
            fill 
            priority={true}
            fetchPriority="high"
            quality={70} 
            className="absolute inset-0 w-full h-full object-cover" 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 900px, 1200px" 
          />
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <div className="relative z-20 w-full max-w-4xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm font-bold text-zinc-300 mb-6">
            <Link href="/" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <Home className="w-4 h-4" /> Inicio
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
            <span className="text-amber-400">Cabalgatas Caldas, Antioquia</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full">
              📍 Vereda Salinas, Caldas (Sur del Valle de Aburrá)
            </span>
            <span className="bg-green-500/20 border border-green-400/40 text-green-200 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full">
              ⭐ 5.0 en Google (+150 Opiniones)
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tighter drop-shadow-xl">
            Cabalgatas en Caldas, Antioquia: Rutas Ecológicas, Miradores y Naturaleza
          </h1>

          <p className="text-zinc-100 text-lg md:text-xl font-medium mb-8 tracking-wide drop-shadow-md max-w-2xl leading-relaxed">
            Vive la auténtica tradición equina antioqueña en la Vereda Salinas de Caldas. A solo 30 minutos de El Poblado y Laureles sin pagar peajes, con caballos criollos mansos, 2 horas de senderos de montaña y seguro médico incluido desde $100.000 COP.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <a 
              href={linkGeneral} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} className="w-5 h-5"/> 
              Reservar en Caldas por WhatsApp
            </a>
            <Link 
              href="/#cotizador" 
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-900 font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <Calendar className="w-5 h-5 text-amber-600" /> Cotizar Fecha en Línea
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-[-50px] relative z-20 space-y-14">

        {/* 2. RESUMEN EJECUTIVO Y DATOS RÁPIDOS DE LA RUTA EN CALDAS */}
        <section className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-8 md:p-10 border border-zinc-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 mb-8 border-b border-zinc-100 text-center">
            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <Clock className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
              <p className="text-xs text-zinc-500 font-bold uppercase">Duración Ruta</p>
              <p className="text-lg font-extrabold text-zinc-900">2 Horas Reales</p>
            </div>
            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <MapPin className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
              <p className="text-xs text-zinc-500 font-bold uppercase">Ubicación</p>
              <p className="text-lg font-extrabold text-zinc-900">Vereda Salinas</p>
            </div>
            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <ShieldCheck className="w-6 h-6 text-green-600 mx-auto mb-1.5" />
              <p className="text-xs text-zinc-500 font-bold uppercase">Póliza Médica</p>
              <p className="text-lg font-extrabold text-zinc-900">Magenta Seguros</p>
            </div>
            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <Users className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
              <p className="text-xs text-zinc-500 font-bold uppercase">Edad y Peso</p>
              <p className="text-lg font-extrabold text-zinc-900">3+ años / 110 kg</p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-5 tracking-tight">
            ¿Por qué las Cabalgatas en Caldas son la Mejor Experiencia Ecuestre del Valle de Aburrá?
          </h2>
          <div className="space-y-4 text-zinc-600 text-base md:text-lg leading-relaxed">
            <p>
              Cuando buscas <strong>cabalgatas en Caldas</strong>, estás eligiendo el municipio con mayor vocación campestre, hídrica y montañosa del Sur del Valle de Aburrá. Mientras que otras zonas cercanas a Medellín han urbanizado sus antiguos caminos de herradura y obligan a los caballos a caminar sobre pavimento o rieles de concreto, la <strong>Vereda Salinas en Caldas, Antioquia</strong> conserva senderos de tierra blanda, cafetales tradicionales, bosques de niebla y divisas panorámicas inigualables.
            </p>
            <p>
              En nuestra pesebrera operamos bajo un modelo de <strong>turismo ecológico responsable</strong>: grupos reducidos, caballos criollos colombianos en óptimo estado nutricional y sanitario, sillas de montar acolchadas y acompañamiento permanente de guías baquianos conocedores de la montaña.
            </p>
          </div>
        </section>

        {/* 3. GALERÍA VISUAL DE PAISAJES Y EXPERIENCIA EN CALDAS */}
        <section className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-10 border border-zinc-100">
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-3 tracking-tight flex items-center gap-2">
            <Camera className="w-7 h-7 text-amber-600" /> Paisajes y Senderos de Nuestra Ruta en Caldas
          </h2>
          <p className="text-zinc-500 text-sm md:text-base mb-8">
            Conoce el entorno natural por donde cabalgarás durante 2 horas en las montañas del sur de Antioquia:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl overflow-hidden border border-zinc-100 shadow-sm bg-zinc-50 flex flex-col">
              <div className="relative h-52 w-full">
                <Image 
                  src="/cabalgatas-en-medellin-y-caldas.webp" 
                  alt="Cabalgata guiada por senderos verdes de la Vereda Salinas en Caldas" 
                  fill 
                  quality={70}
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <div className="p-5">
                <h3 className="font-extrabold text-zinc-900 text-lg mb-1">1. Senderos de Tierra y Bosque</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Caminos veredales auténticos que cuidan las articulaciones de nuestros caballos y te conectan con la flora nativa de Caldas.
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-zinc-100 shadow-sm bg-zinc-50 flex flex-col">
              <div className="relative h-52 w-full">
                <Image 
                  src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=800&auto=format&fit=crop" 
                  alt="Caballos criollos mansos listos para cabalgata en Caldas Antioquia" 
                  fill 
                  quality={70}
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <div className="p-5">
                <h3 className="font-extrabold text-zinc-900 text-lg mb-1">2. Caballos Mansos y Nobles</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Ejemplares seleccionados para principiantes, niños desde los 3 años, parejas y jinetes experimentados.
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-zinc-100 shadow-sm bg-zinc-50 flex flex-col">
              <div className="relative h-52 w-full">
                <Image 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop" 
                  alt="Miradores de montaña en el municipio de Caldas al sur del Valle de Aburrá" 
                  fill 
                  quality={70}
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <div className="p-5">
                <h3 className="font-extrabold text-zinc-900 text-lg mb-1">3. Miradores del Sur de Aburrá</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Paradas estratégicas en la parte alta de la montaña para que nuestro guía te tome fotos y videos inolvidables.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. GUÍA PROFUNDA DEL MUNICIPIO DE CALDAS, ANTIOQUIA (SEO DE ENTIDADES LOCALES) */}
        <section className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-zinc-100 space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
            <Mountain className="w-4 h-4" /> Guía de Turismo Ecológico en Caldas
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
            El Municipio de Caldas, Antioquia: Puerta del Suroeste y Tierra del Agua
          </h2>
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
            Ubicado a 1.750 metros sobre el nivel del mar en el extremo sur del Área Metropolitana, el <strong>municipio de Caldas, Antioquia</strong> (fundado en 1848) es famoso por su riqueza hídrica, su tradición alfarera y caballista, y su temperatura templada promedio de <strong>19°C a 23°C</strong>, ideal para cabalgar sin el calor sofocante de las tierras bajas ni el frío extremo del páramo.
          </p>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/60">
              <h3 className="font-extrabold text-zinc-900 text-lg mb-2 flex items-center gap-2">
                <Trees className="w-5 h-5 text-green-600" /> Alto de San Miguel y La Romera
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Caldas es la cuna del <strong>Río Medellín (Río Aburrá)</strong>, el cual nace en la reserva ecológica del <strong>Alto de San Miguel</strong>. Junto con la <strong>Reserva Forestal La Romera</strong> y las montañas de la <strong>Vereda Salinas</strong>, conforma un corredor biológico lleno de aves silvestres, aire puro y quebradas cristalinas.
              </p>
            </div>

            <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/60">
              <h3 className="font-extrabold text-zinc-900 text-lg mb-2 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-amber-600" /> Tradición Equina y Gastronómica
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Históricamente, Caldas ha sido el paso real de arriería que conecta a Medellín con el <strong>Suroeste Antioqueño</strong> (Amagá, Fredonia, Venecia y Jardín). Esto mantiene viva una cultura de respeto por el caballo criollo y una oferta gastronómica campestre única alrededor de la Variante y sus veredas.
              </p>
            </div>
          </div>
        </section>

        {/* 5. TABLA COMPARATIVA 1: PLANES Y PRECIOS DE CABALGATAS EN CALDAS */}
        <section className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-zinc-100">
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-3 tracking-tight">
            Tabla de Planes y Precios en Nuestra Sede de Caldas (2026)
          </h2>
          <p className="text-zinc-600 text-sm md:text-base mb-6">
            Compara nuestras modalidades en la Vereda Salinas y elige el plan ideal para tu pareja, familia o grupo de amigos:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 mb-6">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="p-4 font-bold">Plan en Caldas</th>
                  <th className="p-4 font-bold">Horario Disponible</th>
                  <th className="p-4 font-bold">Precio por Persona</th>
                  <th className="p-4 font-bold">Costo Guía</th>
                  <th className="p-4 font-bold">Ideal Para</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white">
                <tr>
                  <td className="p-4 font-extrabold text-zinc-900">Cabalgata Grupal</td>
                  <td className="p-4 text-zinc-700">Sáb y Dom 2:00 PM</td>
                  <td className="p-4 text-green-700 font-extrabold">$100.000 COP</td>
                  <td className="p-4 text-green-700 font-bold">$0 (Incluido)</td>
                  <td className="p-4 text-zinc-600">Amigos, viajeros y familias</td>
                </tr>
                <tr>
                  <td className="p-4 font-extrabold text-zinc-900">Cabalgata Privada</td>
                  <td className="p-4 text-zinc-700">Lun a Dom (10 AM, 2 PM, 4 PM)</td>
                  <td className="p-4 text-green-700 font-extrabold">$100.000 COP</td>
                  <td className="p-4 text-zinc-700 font-semibold">+$80.000 por grupo</td>
                  <td className="p-4 text-zinc-600">Parejas, niños y grupos exclusivos</td>
                </tr>
                <tr>
                  <td className="p-4 font-extrabold text-zinc-900">Plan Celebración</td>
                  <td className="p-4 text-zinc-700">Lun a Dom (Privado)</td>
                  <td className="p-4 text-green-700 font-extrabold">$130.000 COP (Con almuerzo)</td>
                  <td className="p-4 text-zinc-700 font-semibold">+$80.000 por grupo</td>
                  <td className="p-4 text-zinc-600">Aniversarios y cumpleaños (6+ decoración gratis)</td>
                </tr>
                <tr>
                  <td className="p-4 font-extrabold text-zinc-900">Plan Aventura VIP</td>
                  <td className="p-4 text-zinc-700">Lun a Dom (Con Recogida)</td>
                  <td className="p-4 text-green-700 font-extrabold">$130.000 COP + Transporte</td>
                  <td className="p-4 text-zinc-700 font-semibold">+$130.000 carro VIP</td>
                  <td className="p-4 text-zinc-600">Turistas en El Poblado y Laureles</td>
                </tr>
                <tr>
                  <td className="p-4 font-extrabold text-amber-800">Tour Cuatrimotos</td>
                  <td className="p-4 text-zinc-700">Lun a Dom (1.5 Horas)</td>
                  <td className="p-4 text-amber-700 font-extrabold">$250.000 COP / máquina</td>
                  <td className="p-4 text-green-700 font-bold">$0 (Incluido)</td>
                  <td className="p-4 text-zinc-600">Adrenalina (+ $50.000 parrillero)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-zinc-500 mb-6">
            * Todos los planes listados en la tabla incluyen póliza de asistencia médica individual con Magenta Seguros, inducción previa y caballo o cuatrimoto asignada en nuestra sede de la Vereda Salinas, Caldas.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <a href={linkGrupal} target="_blank" rel="noreferrer" className="bg-zinc-900 hover:bg-black text-white font-bold py-3.5 px-5 rounded-2xl text-center text-sm transition-colors">
              Reservar Plan Grupal
            </a>
            <a href={linkPrivada} target="_blank" rel="noreferrer" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-5 rounded-2xl text-center text-sm transition-colors">
              Reservar Plan Privado
            </a>
            <a href={linkCuatrimoto} target="_blank" rel="noreferrer" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 px-5 rounded-2xl text-center text-sm transition-colors">
              Reservar Cuatrimotos
            </a>
          </div>
        </section>

        {/* 6. TABLA COMPARATIVA 2: CABALGATAS EN CALDAS VS OTRAS ZONAS DE ANTIOQUIA */}
        <section className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-zinc-100">
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-3 tracking-tight">
            Comparativa: Cabalgatas en Caldas (Sur) vs. Oriente y Occidente Antioqueño
          </h2>
          <p className="text-zinc-600 text-sm md:text-base mb-6">
            Descubre por qué elegir Caldas te ahorra tiempo de desplazamiento y dinero en peajes frente a otras zonas cercanas a Medellín:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 mb-4">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="p-4 font-bold">Factor Comparativo</th>
                  <th className="p-4 font-bold text-amber-400">Caldas - Vereda Salinas (Sur)</th>
                  <th className="p-4 font-bold text-zinc-300">Oriente (Rionegro / Guarne)</th>
                  <th className="p-4 font-bold text-zinc-300">Occidente (San Cristóbal / Santa Fe)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white">
                <tr>
                  <td className="p-4 font-bold text-zinc-800">Tiempo desde El Poblado / Envigado</td>
                  <td className="p-4 text-green-700 font-extrabold">25 a 30 minutos</td>
                  <td className="p-4 text-zinc-500">55 a 90 minutos</td>
                  <td className="p-4 text-zinc-500">50 a 80 minutos</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-800">Costo de Peajes (Ida y Regreso)</td>
                  <td className="p-4 text-green-700 font-extrabold">$0 COP (Sin peajes)</td>
                  <td className="p-4 text-zinc-500">$34.000 a $48.000 COP</td>
                  <td className="p-4 text-zinc-500">$32.000+ COP (Túnel)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-800">Acceso en Metro + Taxi Corto</td>
                  <td className="p-4 text-green-700 font-extrabold">Sí (Estación La Estrella + 12 min)</td>
                  <td className="p-4 text-zinc-500">No directo (Buses intermunicipales)</td>
                  <td className="p-4 text-zinc-500">Limitado</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-800">Tipo de Sendero</td>
                  <td className="p-4 text-green-700 font-extrabold">Tierra, bosque nativo y miradores</td>
                  <td className="p-4 text-zinc-500">Tramos altos de rieles y pavimento</td>
                  <td className="p-4 text-zinc-500">Mixto / Clima muy caluroso</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-800">Tarifa Promedio (2 Horas)</td>
                  <td className="p-4 text-green-700 font-extrabold">$100.000 COP (Con Seguro)</td>
                  <td className="p-4 text-zinc-500">$130.000 a $170.000 COP</td>
                  <td className="p-4 text-zinc-500">$120.000 a $150.000 COP</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500">
            La ubicación estratégica de Caldas al sur del Valle de Aburrá permite llegar sin pagar peajes desde Medellín, Envigado, Sabaneta, Itagüí y La Estrella.
          </p>
        </section>

        {/* 7. PASO A PASO DE LA EXPERIENCIA Y CÓMO LLEGAR A CALDAS */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 border border-zinc-100">
            <h2 className="text-2xl font-extrabold text-zinc-900 mb-6 tracking-tight flex items-center gap-2">
              <Compass className="w-7 h-7 text-amber-600" /> Paso a Paso de tu Ruta en Caldas
            </h2>
            <ul className="space-y-4 text-sm text-zinc-600">
              <li className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                <strong className="text-zinc-900 block text-base mb-1">1. Bienvenida Campesina en la Finca</strong>
                Llegada a la Vereda Salinas, registro en póliza médica de Magenta Seguros y tinto tradicional campesino mientras conoces la pesebrera.
              </li>
              <li className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                <strong className="text-zinc-900 block text-base mb-1">2. Emparejamiento e Inducción Práctica</strong>
                Te asignamos el caballo ideal según tu experiencia, graduamos los estribos a tu estatura y te enseñamos el manejo básico de las riendas.
              </li>
              <li className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                <strong className="text-zinc-900 block text-base mb-1">3. Ascenso por Bosques y Miradores (2 Horas)</strong>
                Recorrido guiado por senderos ecológicos, quebradas y divisas de montaña con paradas para fotografías y regreso a la finca para almorzar.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 border border-zinc-100">
            <h2 className="text-2xl font-extrabold text-zinc-900 mb-6 tracking-tight flex items-center gap-2">
              <Car className="w-7 h-7 text-green-600" /> ¿Cómo Llegar a Nuestra Sede en Caldas?
            </h2>
            <ul className="space-y-4 text-sm text-zinc-600">
              <li className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                <strong className="text-zinc-900 block text-base mb-1">En Carro Particular o Moto (Con Parqueadero)</strong>
                Toma la Autopista Sur o Avenida Regional pasando por Envigado, Sabaneta, Itagüí y La Estrella hasta el ingreso a la Vereda Salinas en Caldas (vía apta para todo tipo de vehículo).
              </li>
              <li className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                <strong className="text-zinc-900 block text-base mb-1">En Metro de Medellín + Taxi / Uber</strong>
                Viaja en la Línea A del Metro hasta la Estación La Estrella y toma un taxi o aplicación de transporte de solo 12 a 15 minutos hasta nuestra finca.
              </li>
              <li className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                <strong className="text-zinc-900 block text-base mb-1">En Nuestro Transporte Privado VIP</strong>
                Por $130.000 COP adicionales por el vehículo, te recogemos en la puerta de tu hotel o apartamento en El Poblado, Laureles o el Sur y te llevamos de regreso.
              </li>
            </ul>
          </div>
        </section>

        {/* 8. MAPA INTERACTIVO EMBEBIDO DE CALDAS, ANTIOQUIA */}
        <section className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-zinc-100 overflow-hidden">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-extrabold text-zinc-900">Ubicación en Vereda Salinas, Caldas</h2>
                <BadgeCheck className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-zinc-600 text-sm font-medium flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" /> Caldas, Antioquia, Colombia (Sur del Valle de Aburrá)
              </p>
            </div>
            <a 
              href={linkGeneral} 
              target="_blank" 
              rel="noreferrer" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-2xl text-sm shadow-md transition-colors"
            >
              Solicitar Pin Exacto por WhatsApp
            </a>
          </div>
          <div className="w-full h-[350px] bg-zinc-200 border-t border-zinc-100">
            <iframe
              title="Mapa de Cabalgatas en Caldas, Antioquia - Vereda Salinas"
              src="https://www.google.com/maps?q=6.0911,-75.6358&hl=es&z=14&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </section>

        {/* 9. SECCIÓN DE PREGUNTAS FRECUENTES (FAQ) SOBRE CABALGATAS EN CALDAS */}
        <section className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-zinc-100">
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-8 tracking-tight">
            Preguntas Frecuentes sobre las Cabalgatas en Caldas, Antioquia
          </h2>
          <div className="space-y-4">
            {FAQS_CALDAS.map((faq, idx) => (
              <details key={idx} open className="group bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden">
                <summary className="flex justify-between items-center font-bold p-5 text-zinc-900 cursor-pointer">
                  {faq.q}
                </summary>
                <div className="text-zinc-600 px-5 pb-5 pt-2 border-t border-zinc-200/60 leading-relaxed text-sm md:text-base">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 10. CLÚSTER DE INTERLINKING (ENLACES INTERNOS PARA POTENCIAR SEO) */}
        <section className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-zinc-100">
          <h2 className="text-2xl font-extrabold text-zinc-900 mb-3 tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-amber-600" /> Explora Más Experiencias y Guías Relacionadas
          </h2>
          <p className="text-zinc-500 text-sm mb-6">
            Complementa tu visita a Caldas con nuestras rutas especializadas y guías para jinetes:
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-sm font-bold">
            <Link href="/" className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 flex items-center justify-between">
              <span>Portada y Cotizador en Línea</span> <ArrowRight className="w-4 h-4 text-amber-600" />
            </Link>
            <Link href="/planes-cabalgatas-medellin" className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 flex items-center justify-between">
              <span>Planes y Tarifas 2026</span> <ArrowRight className="w-4 h-4 text-amber-600" />
            </Link>
            <Link href="/tour-cuatrimotos-medellin-caldas" className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 flex items-center justify-between">
              <span>Tour de Cuatrimotos en Caldas</span> <ArrowRight className="w-4 h-4 text-amber-600" />
            </Link>
            <Link href="/cabalgata-romantica-parejas-medellin" className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 flex items-center justify-between">
              <span>Cabalgata Romántica Parejas</span> <ArrowRight className="w-4 h-4 text-amber-600" />
            </Link>
            <Link href="/cabalgatas-ninos-familias-medellin" className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 flex items-center justify-between">
              <span>Cabalgatas para Niños y Familias</span> <ArrowRight className="w-4 h-4 text-amber-600" />
            </Link>
            <Link href="/cabalgata-vip-transporte-el-poblado-laureles" className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 flex items-center justify-between">
              <span>Plan VIP con Transporte</span> <ArrowRight className="w-4 h-4 text-amber-600" />
            </Link>
            <Link href="/blog/primera-cabalgata" className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 flex items-center justify-between">
              <span>Guía para tu Primera Cabalgata</span> <ArrowRight className="w-4 h-4 text-amber-600" />
            </Link>
            <Link href="/blog/ropa-cabalgata" className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 flex items-center justify-between">
              <span>¿Qué Ropa Llevar a Caldas?</span> <ArrowRight className="w-4 h-4 text-amber-600" />
            </Link>
            <Link href="/reservar" className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 flex items-center justify-between">
              <span>Reservar Cupo Ahora</span> <Calendar className="w-4 h-4 text-green-700" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 text-zinc-400 py-14 mt-16 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-white font-extrabold text-lg">Cabalgata Medellín — Sede Vereda Salinas, Caldas, Antioquia</p>
            <p className="text-xs text-zinc-500 mt-1">A 30 minutos de El Poblado y Laureles (Sin peajes) • Póliza Magenta Seguros Incluida</p>
          </div>
          <Link href="/" className="text-amber-400 hover:underline text-sm font-bold">
            ← Volver a cabalgatamedellin.com
          </Link>
        </div>
      </footer>
    </div>
  );
}
