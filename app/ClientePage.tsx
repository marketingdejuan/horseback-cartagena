"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, ShieldCheck, Info, Star, PlayCircle, Camera, X, Gift, Clock, 
  Home, MapPin, BadgeCheck, BookOpen, Image as ImageIcon, Phone, 
  Coffee, Compass, CheckCircle2, Shield, Heart, Sun, ArrowRight
} from 'lucide-react';
import PricingSection from '../components/Planes';

const MARCA_SITIO = 'cabalgatamedellin.com';

const FAQS_ES = [
  { 
    id: 'faq-1', 
    q: '¿Necesito experiencia previa para realizar la cabalgata?', 
    a: 'No necesitas experiencia previa. Asignamos caballos nobles según tu nivel, brindamos inducción inicial y vas acompañado por un guía durante todo el recorrido con póliza de Magenta Seguros incluida.' 
  },
  { 
    id: 'faq-2', 
    q: '¿Dónde están ubicados y cuánto tarda llegar desde Medellín?', 
    a: 'Estamos ubicados en la Vereda Salinas en Caldas, Antioquia (Sur del Valle de Aburrá), a solo 30 minutos de El Poblado y Laureles sin pagar peajes ni sufrir el tráfico del Oriente, con opción de transporte VIP puerta a puerta.' 
  },
  { 
    id: 'faq-3', 
    q: '¿Cuánto dura la experiencia y por dónde pasa la ruta?', 
    a: 'El recorrido a caballo dura aproximadamente 2 horas a través de senderos ecológicos, bosques nativos y miradores en las montañas del sur del Valle de Aburrá. Te recomendamos disponer de unas 2.5 horas en total para incluir la bienvenida, la inducción de seguridad y la asignación de tu caballo ideal.' 
  },
  { 
    id: 'faq-4', 
    q: '¿Tienen límite de peso o edad mínima para los jinetes?', 
    a: 'Sí. Por el bienestar y la salud de nuestros caballos (nuestra prioridad), el peso máximo permitido es de 110 kg. Recibimos niños a partir de los 3 años, quienes deben ir acompañados de un adulto.' 
  },
  { 
    id: 'faq-5', 
    q: '¿Qué pasa si llueve el día de mi reserva?', 
    a: 'Al ser una aventura en la naturaleza, operamos con normalidad bajo lluvia ligera (te proporcionaremos ponchos plásticos). Sin embargo, en caso de tormenta eléctrica o clima severo que comprometa la seguridad, reprogramaremos tu reserva sin ningún costo adicional.' 
  }
];

const PAGINAS_INTERLINKING = [
  { href: '/cabalgatas-caldas', titulo: 'Cabalgatas en Caldas, Antioquia (Guía Oficial)', tag: 'Sede Vereda Salinas' },
  { href: '/planes-cabalgatas-medellin', titulo: 'Planes y Paquetes de Cabalgatas', tag: 'Paquetes' },
  { href: '/tour-cuatrimotos-medellin-caldas', titulo: 'Tour de Cuatrimotos en Medellín y Caldas', tag: 'Adrenalina 1.5h' },
  { href: '/cabalgata-romantica-parejas-medellin', titulo: 'Cabalgata Romántica para Parejas', tag: 'Aniversarios' },
  { href: '/cabalgatas-ninos-familias-medellin', titulo: 'Cabalgatas para Niños y Familias', tag: 'Desde 3 años' },
  { href: '/cabalgata-vip-transporte-el-poblado-laureles', titulo: 'Cabalgata VIP con Transporte Incluido', tag: 'El Poblado / Laureles' },
  { href: '/alquiler-caballos-medellin-precios', titulo: 'Alquiler de Caballos por Horas', tag: 'Tarifas por Tiempo' },
  { href: '/cabalgatas-grupos-empresas-medellin', titulo: 'Cabalgatas para Grupos y Empresas', tag: 'Eventos 6+ pax' },
  { href: '/donde-montar-a-caballo-cerca-de-medellin', titulo: 'Dónde Montar a Caballo Cerca de Medellín', tag: 'Comparativa Sur vs Oriente' },
  { href: '/en-horseback-riding-medellin-tours', titulo: 'Private Horseback Riding Medellin (English)', tag: 'English Tours' }
];

export default function ClientePage({ initialData }: { initialData: any }) {
  
  const [data, setData] = useState<any>(initialData ? initialData : {}); 
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00');
  const [jinetes, setJinetes] = useState(2);
  const [telefono, setTelefono] = useState('');
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    const sincronizarConERP = async () => {
      try {
        const [resAjustes, resBlog] = await Promise.all([
          fetch(`https://admin.cabalgatas.co/api/ajustes?brandName=${MARCA_SITIO}`, { cache: 'no-store' }),
          fetch(`https://admin.cabalgatas.co/api/blog?brand=${MARCA_SITIO}`, { cache: 'no-store' })
        ]);

        const nuevosDatos: any = {};

        if (resAjustes.ok) {
          const ajustesERP = await resAjustes.json();
          if (ajustesERP.basePrice) nuevosDatos.basePrice = ajustesERP.basePrice;
          if (ajustesERP.guidePrice !== undefined) nuevosDatos.guidePrice = ajustesERP.guidePrice;
          if (ajustesERP.whatsappNumber) nuevosDatos.whatsappNumber = ajustesERP.whatsappNumber;
          if (ajustesERP.businessName && ajustesERP.businessName !== 'Nombre del Negocio') {
            nuevosDatos.businessName = ajustesERP.businessName;
          }
        }

        if (resBlog.ok) {
          const blogERP = await resBlog.json();
          if (Array.isArray(blogERP) && blogERP.length > 0) {
            nuevosDatos.blogPosts = blogERP;
          }
        }

        setData((prev: any) => ({ ...prev, ...nuevosDatos }));
      } catch (error) {
        console.error("Error sincronizando datos con el ERP:", error);
      }
    };

    sincronizarConERP();
  }, []);

  useEffect(() => {
    if (data?.enableExitIntent && !hasShownPopup) {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) { 
          setShowExitPopup(true); 
          setHasShownPopup(true); 
        }
      };
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [data, hasShownPopup]);

  const trackWhatsAppClick = (ubicacionBoton: string) => {
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'whatsapp_click', {
          event_category: 'Conversión Contacto',
          event_label: ubicacionBoton,
          value: 1
        });
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-10958714047/MQGxCMyQ1-YcEL_pwuko',
          'value': 1.0,
          'currency': 'COP'
        });
      }
    }, 0);
  };

  // SANITIZACIÓN DE VALORES DEL COTIZADOR (PREVENCIÓN DOM XSS)
  const jinetesSeguros = Math.min(30, Math.max(1, Number(jinetes) || 1));
  const fechaSegura = fecha.replace(/[^0-9-]/g, '').slice(0, 10);
  const horaSegura = ['10:00', '14:00', '16:00'].includes(hora) ? hora : '10:00';
  const telefonoSeguro = telefono.replace(/[^0-9+\s-]/g, '').trim().slice(0, 20);

  const esFinDeSemana = fechaSegura ? [6, 0].includes(new Date(fechaSegura + 'T12:00:00').getDay()) : false;
  const esDosPm = horaSegura === '14:00';
  const esGrupal = esFinDeSemana && esDosPm;
  const precioBase = data?.basePrice ? Number(data.basePrice) : 100000;
  const costoGuia = esGrupal ? 0 : (data?.guidePrice ?? 80000);
  const totalCalculado = (jinetesSeguros * precioBase) + costoGuia;
  const tipoCabalgataStr = esGrupal ? 'Grupal (Sin cobro extra de guía)' : 'Privada (Incluye guía exclusivo)';
  const whatsappNum = (data?.whatsappNumber ? String(data.whatsappNumber) : "573000000000").replace(/\D/g, '');
  const fechaTexto = fechaSegura ? fechaSegura : 'próximo fin de semana';
  const modalidadTexto = esGrupal ? 'Grupal' : 'Privada';
  
  const mensajeReserva = `Hola, quiero reservar el ${fechaTexto} a las ${horaSegura}. Somos ${jinetesSeguros} personas. Modalidad: ${modalidadTexto}. Cotización: $${totalCalculado.toLocaleString()}`;
  const linkCotizador = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(mensajeReserva)}`;
  const linkGancho = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("¡Hola! Quiero información sobre las cabalgatas en Medellín y Caldas. 🐎")}`;
  
  const isValidPhone = telefonoSeguro.length >= 7;

  const handleReservaWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault(); 
    trackWhatsAppClick('Boton_Cotizador');
    
    if (isValidPhone) {
      const notaReserva = `Cotización Web (${modalidadTexto}) - ${jinetesSeguros} Jinetes.`;
      const payload = {
        clientName: "Lead Web (Cotizador)",
        phone: telefonoSeguro,
        date: fechaSegura ? new Date(`${fechaSegura}T${horaSegura}:00-05:00`).toISOString() : new Date().toISOString(),
        totalValue: totalCalculado,
        notes: notaReserva,
        brand: MARCA_SITIO,
        funnelStage: 'Nueva'
      };

      fetch('https://admin.cabalgatas.co/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch((error) => console.error("Error guardando reserva en el ERP:", error));
    }
    
    window.open(linkCotizador, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] font-sans selection:bg-amber-200 text-zinc-900">

      {/* BARRA DE NAVEGACIÓN SUPERIOR CON ACCESO DIRECTO A LAS PÁGINAS CLAVE */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="font-extrabold text-base md:text-lg tracking-tight text-white hover:text-amber-400 transition-colors">
            🐎 Cabalgata Medellín
          </Link>
          <nav aria-label="Navegación Principal" className="flex flex-wrap items-center gap-3 md:gap-5 text-xs md:text-sm font-bold text-zinc-300">
            <a href="#cotizador" className="hover:text-amber-400 transition-colors">Cotizar</a>
            <Link href="/planes-cabalgatas-medellin" className="hover:text-amber-400 transition-colors">Planes</Link>
            <Link href="/cabalgatas-caldas" className="hover:text-amber-400 transition-colors">Sede Caldas</Link>
            <Link href="/tour-cuatrimotos-medellin-caldas" className="hover:text-amber-400 transition-colors">Cuatrimotos</Link>
            <Link href="/cabalgata-romantica-parejas-medellin" className="hover:text-amber-400 transition-colors hidden sm:inline">Parejas</Link>
            <Link href="/blog" className="hover:text-amber-400 transition-colors hidden md:inline">Blog</Link>
            <Link href="/reservar" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 px-3.5 py-1.5 rounded-full font-extrabold transition-colors">
              Reservar
            </Link>
          </nav>
        </div>
      </header>

      <section id="inicio" className="relative h-[82vh] bg-[#fbfbfd] overflow-hidden flex flex-col justify-center">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)'
          }}
        >
          <Image 
            src="/cabalgatas-en-medellin-y-caldas.webp" 
            alt="Cabalgatas en Medellín y Caldas, Antioquia - Jinetes en ruta ecológica" 
            fill 
            priority={true}
            fetchPriority="high"
            quality={65} 
            className="absolute inset-0 w-full h-full object-cover" 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 900px, 1200px" 
          />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-24 md:pb-12 text-center md:text-left">
          <span className="inline-block bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            📍 A solo 30 min de El Poblado y Laureles (Sin peajes)
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tighter drop-shadow-xl">
            Cabalgatas en Medellín: Rutas Ecológicas y Tradicionales en Caldas, Antioquia
          </h1>
          <p className="text-zinc-100 text-lg md:text-2xl font-medium mb-10 tracking-wide drop-shadow-md max-w-2xl">
            {data.heroSubtitle ? data.heroSubtitle : "Desconéctate de la ciudad a solo 30 minutos del sur de Medellín. Caballos dóciles, guías expertos y seguro médico incluido."}
          </p>
          
          <a 
            href={linkGancho} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Chatear con un asesor por WhatsApp" 
            onClick={() => trackWhatsAppClick('Boton_Principal_Hero')} 
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} aria-hidden="true" className="w-5 h-5"/> 
            Chatear con Asesor
          </a>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-60px] md:mt-[-120px] relative z-20 space-y-16">
        
        <section id="cotizador" className="bg-white md:bg-white/90 md:backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-8 md:p-10 border border-zinc-100 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-zinc-200/50 pb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 flex items-center gap-3 tracking-tight">
              <Calendar className="text-amber-600 w-8 h-8" aria-hidden="true" /> Cotiza y Reserva
            </h2>
            {data.urgencyText && esFinDeSemana && (
              <div className="bg-red-50 text-red-900 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-red-100">
                <Clock className="w-4 h-4" aria-hidden="true"/>{data.urgencyText}
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <label htmlFor="fecha-reserva" className="block text-sm font-bold text-zinc-800 mb-3">
                  <span>1. Selecciona Fecha y Hora</span>
                </label>
                <div className="flex gap-3">
                  <input id="fecha-reserva" aria-label="Seleccionar fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-4 border border-zinc-200 rounded-2xl bg-zinc-50/50 text-zinc-900 font-bold outline-none focus:border-green-600 transition-colors shadow-sm" />
                  <select id="hora-reserva" aria-label="Seleccionar hora" value={hora} onChange={(e) => setHora(e.target.value)} className="w-full p-4 border border-zinc-200 rounded-2xl bg-zinc-50/50 text-zinc-900 font-bold outline-none focus:border-green-600 transition-colors shadow-sm">
                    <option value="10:00">10:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
                <div className="mt-4 bg-zinc-100/70 p-4 rounded-2xl border border-zinc-200/60">
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                    💡 <strong className="font-extrabold text-zinc-800">Nota importante:</strong> Las cabalgatas grupales (sin costo extra de guía) son únicamente los <strong className="font-extrabold text-zinc-800">sábados y domingos a las 2:00 PM</strong>. Cualquier otro día u horario será una experiencia exclusiva y privada.
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-800 mb-3">
                  <span>2. Número de Jinetes</span>
                </label>
                <div className="flex items-center gap-4 bg-zinc-50 p-2 rounded-2xl border border-zinc-200 w-fit shadow-sm">
                  <button type="button" aria-label="Disminuir número de jinetes" onClick={() => setJinetes(Math.max(1, jinetesSeguros - 1))} className="w-12 h-12 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl font-extrabold shadow-sm border border-zinc-200 transition-colors">-</button>
                  <span aria-live="polite" className="w-8 text-center font-extrabold text-2xl text-zinc-900">{jinetesSeguros}</span>
                  <button type="button" aria-label="Aumentar número de jinetes" onClick={() => setJinetes(Math.min(30, jinetesSeguros + 1))} className="w-12 h-12 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl font-extrabold shadow-sm border border-zinc-200 transition-colors">+</button>
                </div>
              </div>

              <div>
                <label htmlFor="telefono-reserva" className="block text-sm font-bold text-zinc-800 mb-3">
                  <span>3. Tu número de WhatsApp</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-zinc-400" aria-hidden="true" />
                  </div>
                  <input id="telefono-reserva" aria-label="Ingresar número de WhatsApp" type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej: 300 123 4567" className="w-full pl-12 p-4 border border-zinc-200 rounded-2xl bg-zinc-50/50 text-zinc-900 font-bold outline-none focus:border-green-600 transition-colors shadow-sm placeholder-zinc-400"/>
                </div>
                <p className="text-xs font-medium text-zinc-500 mt-2">Opcional, pero recomendado para agilizar tu reserva.</p>
              </div>
            </div>
            
            <div className="bg-zinc-900 rounded-[2rem] p-8 text-white shadow-2xl flex flex-col justify-between border border-zinc-800">
              <div>
                <p className="text-xs font-bold text-amber-500 mb-5 bg-amber-500/10 inline-block px-4 py-2 rounded-xl uppercase tracking-wider">{tipoCabalgataStr}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-400 font-medium">{jinetesSeguros} Jinetes x ${precioBase.toLocaleString()}: </span>
                  <span className="font-bold text-xl text-white">${(jinetesSeguros * precioBase).toLocaleString()}</span>
                </div>
                {!esGrupal && (
                  <div className="flex justify-between items-center mb-4 text-red-300 bg-red-500/10 p-4 rounded-xl border border-red-500/10">
                    <span className="font-semibold text-sm">Costo Guía Exclusivo: </span>
                    <span className="font-bold">+${costoGuia.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-zinc-800 my-6"></div>
                <div className="flex justify-between items-end">
                  <span className="text-lg text-zinc-400 font-medium tracking-tight">Total estimado: </span>
                  <span className="text-5xl font-extrabold text-amber-500 tracking-tighter">${totalCalculado.toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                type="button"
                onClick={handleReservaWhatsApp} 
                aria-label="Enviar cotización por WhatsApp"
                className="mt-8 block w-full text-center font-extrabold py-5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              >
                <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} aria-hidden="true" className="w-6 h-6"/> 
                Enviar por WhatsApp
              </button>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6 scroll-mt-20">
          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 border border-zinc-100">
            <h3 className="text-2xl font-extrabold text-zinc-900 mb-6 tracking-tight flex items-center gap-2">
              <Compass className="w-7 h-7 text-amber-600"/> La Experiencia en Caldas
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shadow shrink-0 z-10"><Coffee className="w-4 h-4" /></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-zinc-50/70 p-4 rounded-2xl border border-zinc-100 shadow-sm">
                  <h4 className="font-bold text-zinc-900"><span>1. Llegada Rápida (30 min)</span></h4>
                  <p className="text-sm text-zinc-500 mt-1">A solo 30 minutos de El Poblado y Laureles en la Vereda Salinas, Caldas (sin peajes ni trancones).</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shadow shrink-0 z-10"><Heart className="w-4 h-4" /></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-zinc-50/70 p-4 rounded-2xl border border-zinc-100 shadow-sm">
                  <h4 className="font-bold text-zinc-900"><span>2. Inducción y Conexión</span></h4>
                  <p className="text-sm text-zinc-500 mt-1">Tinto campesino de bienvenida y asignación de un caballo dócil según tu nivel (desde 3 años de edad).</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shadow shrink-0 z-10"><Camera className="w-4 h-4" /></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-zinc-50/70 p-4 rounded-2xl border border-zinc-100 shadow-sm">
                  <h4 className="font-bold text-zinc-900"><span>3. Recorrido Ecológico (2h)</span></h4>
                  <p className="text-sm text-zinc-500 mt-1">Ruta guiada por miradores, senderos ecológicos, quebradas y bosques nativos de Antioquia.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 border border-zinc-100">
              <h3 className="text-2xl font-extrabold text-zinc-900 mb-6 tracking-tight flex items-center gap-2">
                <CheckCircle2 className="w-7 h-7 text-green-600"/> ¿Qué traer?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 bg-zinc-50/70 p-3 rounded-2xl border border-zinc-100 shadow-sm">
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-50"><Sun className="w-5 h-5 text-amber-500"/></div>
                  <span className="font-medium text-zinc-700">Bloqueador solar y gorra o sombrero</span>
                </li>
                <li className="flex items-center gap-4 bg-zinc-50/70 p-3 rounded-2xl border border-zinc-100 shadow-sm">
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-50"><ShieldCheck className="w-5 h-5 text-zinc-500"/></div>
                  <span className="font-medium text-zinc-700">Pantalón largo cómodo (jean o sudadera)</span>
                </li>
                <li className="flex items-center gap-4 bg-zinc-50/70 p-3 rounded-2xl border border-zinc-100 shadow-sm">
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-50"><MapPin className="w-5 h-5 text-zinc-500"/></div>
                  <span className="font-medium text-zinc-700">Zapatos cerrados (botas o tenis con buen agarre)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-[2.5rem] shadow-xl p-8 border border-zinc-700 text-white relative overflow-hidden">
              <Shield className="absolute -right-4 -top-4 w-32 h-32 text-white/5 rotate-12" />
              <h3 className="text-xl font-extrabold mb-2 tracking-tight">Viaja Asegurado</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-5">Tu bienestar es nuestra prioridad. Todas nuestras rutas incluyen póliza de asistencia médica con <b>Magenta Seguros</b>.</p>
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 font-bold px-4 py-2.5 rounded-xl text-sm border border-green-500/30">
                <ShieldCheck className="w-4 h-4"/> Cobertura Médica Incluida
              </div>
            </div>
          </div>
        </section>

        <PricingSection />

        <section id="ubicacion" className="pt-4 scroll-mt-20">
          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-zinc-100 overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-zinc-50/50 to-white/50">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Cabalgata Medellín</h2>
                  <BadgeCheck className="w-6 h-6 text-blue-500 fill-current" aria-hidden="true" />
                </div>
                <p className="text-zinc-600 font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" aria-hidden="true"/> Vereda Salinas, Caldas, Antioquia (A 30 min de El Poblado)
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-zinc-100" aria-label={`Calificación de ${data.googleRating ? data.googleRating : '5.0'} estrellas en Google`}>
                   <span className="text-3xl font-extrabold text-zinc-900 tracking-tight">{data.googleRating ? data.googleRating : '5.0'}</span>
                   <div className="flex text-amber-400">
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                   </div>
                </div>
                <p className="text-sm font-medium text-zinc-500 mt-3">Basado en {data.googleReviewCount ? data.googleReviewCount : '150'}+ opiniones</p>
              </div>
            </div>
            
            <div className="w-full h-[360px] relative bg-zinc-200 border-t border-zinc-100">
              <iframe
                title="Ubicación Cabalgata Medellín en Vereda Salinas, Caldas, Antioquia"
                src="https://www.google.com/maps?q=6.0911,-75.6358&hl=es&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              {data.mapEmbedUrl && (
                <div className="absolute bottom-4 right-4 z-10">
                  <a href={data.mapEmbedUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir ubicación en Google Maps" className="bg-zinc-900/90 text-white text-sm font-bold py-3 px-5 rounded-2xl shadow-xl transition-transform hover:scale-105 flex items-center gap-2 hover:bg-black">
                    <MapPin className="w-4 h-4 text-amber-400" /> Abrir en Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {data.gallery && data.gallery.length > 0 && (
          <section id="galeria" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-extrabold text-zinc-900 mb-8 flex items-center gap-3 tracking-tight">
              <Camera className="w-8 h-8 text-amber-600" aria-hidden="true" /> Galería
            </h2>
            <div className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
              {data.gallery.map((item: any) => (
                <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-center bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 overflow-hidden group">
                  <div className="h-56 overflow-hidden relative bg-zinc-100">
                    <Image src={item.url} alt={item.title ? item.title : 'Foto de Cabalgata en Caldas'} fill quality={70} className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" sizes="(max-width: 768px) 280px, 320px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-80"></div>
                    {item.title && <h3 className="absolute bottom-5 left-5 text-white font-bold text-lg tracking-tight">{item.title}</h3>}
                  </div>
                  {item.desc && <div className="p-5"><p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p></div>}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <a href={linkGancho} target="_blank" rel="noopener noreferrer" aria-label="Pedir más información por WhatsApp" onClick={() => trackWhatsAppClick('Boton_Abajo_Galeria')} className="bg-green-50 text-green-700 hover:bg-green-100 font-bold py-3.5 px-8 rounded-full flex items-center gap-2 transition-colors border border-green-200/50">
                <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} aria-hidden="true" className="w-5 h-5"/> 
                Me gusta. Quiero más info.
              </a>
            </div>
          </section>
        )}

        {data.blogPosts && data.blogPosts.length > 0 && (
          <section id="blog" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-extrabold text-zinc-900 mb-8 flex items-center gap-3 tracking-tight">
              <BookOpen className="w-8 h-8 text-amber-600" aria-hidden="true" /> Guías y Artículos
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.blogPosts.slice(0, 2).map((post: any) => (
                <a key={post.id} href={`/blog/${post.slug}`} aria-label={`Leer artículo: ${post.title}`} className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative w-full h-48 bg-zinc-100">
                    <img src={post.image ? post.image : 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=800'} loading="lazy" alt={`Imagen de portada para ${post.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                  </div>
                  <div className="p-7">
                    <h3 className="font-extrabold text-xl mb-3 text-zinc-900 tracking-tight">{post.title}</h3>
                    <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">{post.metaDesc ? post.metaDesc : post.content}</p>
                    <span className="text-amber-600 font-bold text-sm mt-5 block" aria-hidden="true">Leer artículo →</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="/blog" aria-label="Ver todos los artículos del blog" className="inline-block border border-zinc-200 bg-white text-zinc-700 font-bold py-3 px-8 rounded-full hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-sm">
                Ver todos los artículos
              </a>
            </div>
          </section>
        )}

        {data.reviews && data.reviews.length > 0 && (
          <section id="reviews" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-extrabold text-zinc-900 mb-8 tracking-tight">Jinetes Felices</h2>
            <div className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
              {data.reviews.map((review: any) => (
                <div key={review.id} className="min-w-[300px] bg-white p-7 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 snap-center flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-400 mb-4" role="img" aria-label={`Calificación de ${review.rating} estrellas`}>
                      {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />)}
                    </div>
                    <p className="text-zinc-600 italic mb-5 text-sm leading-relaxed tracking-wide">"{review.text}"</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-5 border-t border-zinc-100">
                    <span className="font-bold text-sm text-zinc-900">{review.author}</span>
                    {review.videoUrl && (
                      <a href={review.videoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver video de testimonio de ${review.author}`} className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-3.5 py-2 rounded-xl transition-colors hover:bg-red-100">
                        <PlayCircle className="w-4 h-4" aria-hidden="true" /> Ver Video
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <a href={linkCotizador} target="_blank" rel="noopener noreferrer" aria-label="Hacer una reserva por WhatsApp" onClick={() => trackWhatsAppClick('Boton_Abajo_Reviews')} className="bg-green-600 text-white hover:bg-green-700 font-bold py-4 px-8 rounded-full flex items-center gap-2 shadow-lg transition-transform hover:scale-105">
                <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} aria-hidden="true" className="w-5 h-5"/> 
                Únete a ellos, reserva aquí
              </a>
            </div>
          </section>
        )}

        <section id="faq" className="pb-8 scroll-mt-20">
          <h2 className="text-3xl font-extrabold text-zinc-900 mb-10 text-center tracking-tight">Preguntas Frecuentes sobre las Cabalgatas en Medellín</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQS_ES.map((faq: any) => (
              <details key={faq.id} open className="group bg-white rounded-2xl border border-zinc-200 cursor-pointer overflow-hidden shadow-sm transition-colors hover:border-zinc-300 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-bold p-6 text-zinc-800 bg-white group-open:bg-zinc-50/50 transition-colors">{faq.q}</summary>
                <div className="text-zinc-600 px-6 pb-6 bg-zinc-50/50 pt-2 border-t border-zinc-100 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-zinc-500 mb-5 font-medium tracking-wide">¿Aún tienes dudas?</p>
            <a href={linkGancho} target="_blank" rel="noopener noreferrer" aria-label="Hablar con un asesor por WhatsApp para resolver dudas" onClick={() => trackWhatsAppClick('Boton_Abajo_FAQ')} className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
              <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} aria-hidden="true" className="w-5 h-5"/> 
              Habla con un asesor ahora
            </a>
          </div>
        </section>

        <section className="pb-16">
          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-10 border border-zinc-100">
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-3 tracking-tight flex items-center gap-2">
              <Compass className="w-7 h-7 text-amber-600" aria-hidden="true" /> Rutas Especializadas y Planes por Tipo de Viajero
            </h2>
            <p className="text-zinc-500 text-sm md:text-base mb-8">
              Explora nuestras guías detalladas según tu plan ideal en Medellín y Caldas, Antioquia:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {PAGINAS_INTERLINKING.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group bg-zinc-50/80 hover:bg-amber-50/40 border border-zinc-200/80 hover:border-amber-400 p-4 rounded-2xl flex items-center justify-between transition-colors shadow-sm"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                    <h3 className="font-bold text-zinc-900 group-hover:text-amber-800 text-sm md:text-base mt-1.5">
                      {item.titulo}
                    </h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-amber-600 transition-colors shrink-0 ml-3" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 text-zinc-400 py-16 relative z-20 mt-12 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-left mb-12">
          <div>
            <h3 className="text-white text-xl font-extrabold mb-4 tracking-tight">Cabalgata Medellín</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Rutas ecológicas a caballo y tours en cuatrimoto en el Sur del Valle de Aburrá. Póliza de asistencia médica con Magenta Seguros incluida.
            </p>
            <p className="text-xs text-zinc-500 font-semibold">
              Operador Turístico Autorizado en Antioquia (Cumplimiento Ley 300 de Turismo y RNT).
            </p>
          </div>

          <div>
            <h4 className="text-white text-base font-bold mb-4">Contacto y Ubicación (NAP)</h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><strong className="text-zinc-200">Dirección:</strong> Vereda Salinas, Caldas, Antioquia, Colombia</li>
              <li><strong className="text-zinc-200">Referencia:</strong> A 30 min de El Poblado y Laureles (Sin peajes)</li>
              <li><strong className="text-zinc-200">WhatsApp / Teléfono:</strong> +{whatsappNum}</li>
              <li><strong className="text-zinc-200">Horario:</strong> Lunes a Domingo (Salidas 10:00 AM, 2:00 PM y 4:00 PM)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-base font-bold mb-4">Rutas, Planes y Guías</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link href="/cabalgatas-caldas" className="text-amber-400 font-bold hover:underline transition-colors">Cabalgatas en Caldas, Antioquia (Guía Oficial)</Link></li>
              <li><Link href="/planes-cabalgatas-medellin" className="hover:text-amber-400 transition-colors">Planes y Paquetes de Cabalgatas</Link></li>
              <li><Link href="/tour-cuatrimotos-medellin-caldas" className="hover:text-amber-400 transition-colors">Tour de Cuatrimotos en Medellín y Caldas</Link></li>
              <li><Link href="/cabalgata-romantica-parejas-medellin" className="hover:text-amber-400 transition-colors">Cabalgata Romántica para Parejas</Link></li>
              <li><Link href="/cabalgatas-ninos-familias-medellin" className="hover:text-amber-400 transition-colors">Cabalgatas para Niños y Familias</Link></li>
              <li><Link href="/cabalgata-vip-transporte-el-poblado-laureles" className="hover:text-amber-400 transition-colors">Cabalgata VIP con Transporte (El Poblado)</Link></li>
              <li><Link href="/alquiler-caballos-medellin-precios" className="hover:text-amber-400 transition-colors">Alquiler de Caballos por Horas</Link></li>
              <li><Link href="/cabalgatas-grupos-empresas-medellin" className="hover:text-amber-400 transition-colors">Cabalgatas para Grupos y Empresas</Link></li>
              <li><Link href="/donde-montar-a-caballo-cerca-de-medellin" className="hover:text-amber-400 transition-colors">Dónde Montar a Caballo Cerca de Medellín</Link></li>
              <li><Link href="/en-horseback-riding-medellin-tours" className="hover:text-amber-400 transition-colors">Private Horseback Riding Tours (EN)</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium tracking-wide text-zinc-500">
            © {new Date().getFullYear()} Cabalgata Medellín (cabalgatamedellin.com). Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://www.instagram.com/cabalgataseco" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram de Cabalgata Medellín" 
              className="bg-zinc-900 p-3 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 flex items-center justify-center border border-zinc-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a 
              href="https://web.facebook.com/Cabalgatasmedellin" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook de Cabalgata Medellín" 
              className="bg-zinc-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center border border-zinc-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
      </footer>

      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/60 p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl text-center relative border border-zinc-100">
            <button onClick={() => setShowExitPopup(false)} aria-label="Cerrar ventana emergente" className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-900 bg-zinc-100 rounded-full p-2 transition-colors"><X className="w-5 h-5" aria-hidden="true"/></button>
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-100"><Gift className="w-10 h-10" aria-hidden="true" /></div>
            <h3 className="text-2xl font-extrabold text-zinc-900 mb-3 tracking-tight">¡Espera! No te vayas 🐎</h3>
            <p className="text-zinc-500 mb-8 leading-relaxed">Resérvalo ahora mismo por WhatsApp y recibe un <b className="text-zinc-800">descuento sorpresa</b>.</p>
            <a href={linkCotizador} target="_blank" rel="noopener noreferrer" aria-label="Reclamar descuento por WhatsApp" onClick={() => { setShowExitPopup(false); trackWhatsAppClick('Boton_Exit_Intent'); }} className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors">
              ¡Reclamar mi descuento!
            </a>
            <button onClick={() => setShowExitPopup(false)} aria-label="Cerrar descuento" className="mt-5 text-sm text-zinc-400 font-bold hover:text-zinc-700 transition-colors">No gracias</button>
          </div>
        </div>
      )}

      <a 
        href={linkGancho} target="_blank" rel="noopener noreferrer" aria-label="Abrir chat flotante de WhatsApp" 
        onClick={() => trackWhatsAppClick('Boton_Flotante')} 
        className="fixed bottom-8 right-8 hover:scale-110 transition-transform z-50 hidden md:flex items-center justify-center drop-shadow-[0_8px_30px_rgba(34,197,94,0.4)]"
      >
        <Image src="/logo-whatsapp.webp" alt="WhatsApp Flotante" width={64} height={64} aria-hidden="true" className="rounded-full" />
      </a>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-2 py-3 pb-safe z-50 grid grid-cols-5 gap-1 text-center md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)] items-center">
        <a href={data?.navLink1 ? data.navLink1 : '#inicio'} aria-label="Ir a la sección de Inicio" className="flex flex-col items-center text-zinc-500 hover:text-amber-600 transition-colors">
          <Home className="w-5 h-5 mb-1" aria-hidden="true" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel1 ? data.navLabel1 : 'Inicio'}</span>
        </a>
        <a href={data?.navLink2 ? data.navLink2 : '#cotizador'} aria-label="Ir a la sección de Cotizador" className="flex flex-col items-center text-zinc-500 hover:text-amber-600 transition-colors">
          <Calendar className="w-5 h-5 mb-1" aria-hidden="true" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel2 ? data.navLabel2 : 'Cotizar'}</span>
        </a>
        
        <a href={linkGancho} target="_blank" rel="noopener noreferrer" aria-label="Chatear por WhatsApp" onClick={() => trackWhatsAppClick('Boton_Nav_Movil')} className="relative -mt-8 flex justify-center">
          <div className="bg-white rounded-full shadow-[0_8px_20px_rgba(34,197,94,0.3)] border-4 border-white flex items-center justify-center p-1">
            <Image src="/logo-whatsapp.webp" alt="WhatsApp Móvil" width={48} height={48} aria-hidden="true" />
          </div>
        </a>
        
        <a href={data?.navLink3 ? data.navLink3 : '#galeria'} aria-label="Ir a la sección de Galería" className="flex flex-col items-center text-zinc-500 hover:text-amber-600 transition-colors">
          <ImageIcon className="w-5 h-5 mb-1" aria-hidden="true" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel3 ? data.navLabel3 : 'Galería'}</span>
        </a>
        <a href={data?.navLink4 ? data.navLink4 : '#faq'} aria-label="Ir a la sección de Preguntas Frecuentes" className="flex flex-col items-center text-zinc-500 hover:text-amber-600 transition-colors">
          <Info className="w-5 h-5 mb-1" aria-hidden="true" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel4 ? data.navLabel4 : 'FAQ'}</span>
        </a>
      </nav>
    </div>
  );
}
