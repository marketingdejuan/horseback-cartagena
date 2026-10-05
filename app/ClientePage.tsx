"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Calendar, ShieldCheck, Info, Star, PlayCircle, Camera, X, Gift, Clock, 
  Home, MapPin, BadgeCheck, BookOpen, Image as ImageIcon, Phone, 
  Coffee, Compass, CheckCircle2, Shield, Heart, Sun
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import PricingSection from '../components/Planes';

export default function ClientePage({ initialData }: { initialData: any }) {
  
  const [data] = useState<any>(initialData); 
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00');
  const [jinetes, setJinetes] = useState(2);
  const [telefono, setTelefono] = useState('');
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    if (data?.enableExitIntent && !hasShownPopup) {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) { setShowExitPopup(true); setHasShownPopup(true); }
      };
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [data, hasShownPopup]);

  const trackWhatsAppClick = (ubicacionBoton: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'Conversión Contacto',
        event_label: ubicacionBoton,
        value: 1
      });
    }
  };

  const esFinDeSemana = fecha ? [6, 0].includes(new Date(fecha + 'T12:00:00').getDay()) : false;
  const esDosPm = hora === '14:00';
  const esGrupal = esFinDeSemana && esDosPm;
  const precioBase = data?.basePrice || 100000;
  const costoGuia = esGrupal ? 0 : (data?.guidePrice || 80000);
  const totalCalculado = (jinetes * precioBase) + costoGuia;
  const tipoCabalgataStr = esGrupal ? 'Grupal (Sin cobro extra de guía)' : 'Privada (Incluye guía exclusivo)';
  const whatsappNum = data?.whatsappNumber || "573000000000";
  
  const mensajeReserva = `Hola, quiero reservar el ${fecha || 'próximo fin de semana'} a las ${hora}. Somos ${jinetes} personas. Modalidad: ${esGrupal ? 'Grupal' : 'Privada'}. Cotización: $${totalCalculado.toLocaleString()}`;
  const linkCotizador = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(mensajeReserva)}`;
  const linkGancho = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("¡Hola! Quiero información sobre las cabalgatas. 🐎")}`;
  const isValidPhone = telefono.trim().length >= 7;

  const handleReservaWhatsApp = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (!isValidPhone) return;
    trackWhatsAppClick('Boton_Cotizador');
    try {
      await addDoc(collection(db, 'reservas'), {
        plan: esGrupal ? 'Cabalgata Grupal' : 'Cabalgata Privada',
        fecha: fecha || 'Por definir',
        hora: hora,
        jinetes: jinetes,
        telefono: telefono,
        total: totalCalculado,
        fechaCreacion: serverTimestamp(),
        origen: 'Web Español'
      });
    } catch (error) {
      console.error("Error guardando reserva silenciosa:", error);
    }
    window.open(linkCotizador, '_blank');
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": data?.businessName || "Cabalgatas Medellín",
    "description": data?.heroSubtitle || "Experiencias únicas a caballo en los paisajes de Antioquia.",
    "url": "https://cabalgatamedellin.com",
    "image": "https://cabalgatamedellin.com/cabalgatas-en-medellin-y-caldas.webp",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Caldas",
      "addressRegion": "Antioquia",
      "addressCountry": "CO"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "COP",
      "price": precioBase.toString(),
      "availability": "https://schema.org/InStock"
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-900 font-sans selection:bg-amber-200">
        <section className="relative h-[80vh] bg-zinc-800 overflow-hidden flex flex-col justify-end">
          <div className="absolute inset-0 w-full h-full bg-zinc-700 animate-pulse"></div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfd] font-sans selection:bg-amber-200 text-zinc-900">
      {/* Script SEO Invisible */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* HEADER DIFUMINADO TECNOLÓGICO */}
      <section id="inicio" className="relative h-[85vh] bg-[#fbfbfd] overflow-hidden flex flex-col justify-center">
        
        {/* Máscara de Degradado Estilo Apple */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)'
          }}
        >
          <Image 
            src="/cabalgatas-en-medellin-y-caldas.webp" 
            alt="Jinetes cabalgando por los paisajes de Caldas, Antioquia" 
            fill 
            priority={true}
            quality={75} 
            className="absolute inset-0 w-full h-full object-cover" 
            sizes="(max-width: 768px) 768px, 1200px" 
          />
          {/* Overlay oscuro sutil para que el texto resalte */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* MODIFICACIÓN AQUÍ: Aumentamos pb-24 en móvil para evitar que la tarjeta tape el botón */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-24 md:pb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tighter drop-shadow-xl">
            {data.heroTitle || "Cabalgatas Ecológicas"}
          </h1>
          <p className="text-zinc-100 text-xl md:text-2xl font-medium mb-10 tracking-wide drop-shadow-md max-w-2xl">
            {data.heroSubtitle || "Experiencias únicas en Antioquia."}
          </p>
          
          <a 
            href={linkGancho} 
            target="_blank" 
            rel="noreferrer" 
            aria-label="Chatear con un asesor por WhatsApp" 
            onClick={() => trackWhatsAppClick('Boton_Principal_Hero')} 
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} aria-hidden="true" className="w-5 h-5"/> 
            Chatear con Asesor
          </a>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL CON SUPERPOSICIÓN */}
      {/* MODIFICACIÓN AQUÍ: Ajuste dinámico de mt-[-60px] móvil y mt-[-120px] desktop */}
      <main className="max-w-4xl mx-auto px-4 mt-[-60px] md:mt-[-120px] relative z-20 space-y-16">
        
        {/* COTIZADOR - GLASSMORPHISM AVANZADO */}
        <section id="cotizador" className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-8 md:p-10 border border-white scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-zinc-200/50 pb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 flex items-center gap-3 tracking-tight">
              <Calendar className="text-amber-600 w-8 h-8" aria-hidden="true" /> Cotiza y Reserva
            </h2>
            {data.urgencyText && (
              <div className="bg-red-50 text-red-900 px-4 py-2 rounded-xl text-sm font-bold animate-pulse flex items-center gap-2 border border-red-100">
                <Clock className="w-4 h-4" aria-hidden="true"/>{data.urgencyText}
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-zinc-800 mb-3">1. Selecciona Fecha y Hora</label>
                <div className="flex gap-3">
                  <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-4 border border-zinc-200/50 rounded-2xl bg-white/50 text-zinc-900 font-bold outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all shadow-sm" />
                  <select value={hora} onChange={(e) => setHora(e.target.value)} className="w-full p-4 border border-zinc-200/50 rounded-2xl bg-white/50 text-zinc-900 font-bold outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all shadow-sm">
                    <option value="10:00">10:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
                <div className="mt-4 bg-zinc-100/50 p-4 rounded-2xl border border-zinc-200/50">
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">💡 <strong className="font-extrabold text-zinc-800">Nota importante:</strong> Las cabalgatas grupales (sin costo extra de guía) son los <strong className="font-extrabold text-zinc-800">sábados y domingos a las 2:00 PM</strong>. Otro horario será una experiencia privada.</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-800 mb-3">2. Número de Jinetes</label>
                <div className="flex items-center gap-4 bg-white/50 p-2 rounded-2xl border border-zinc-200/50 w-fit shadow-sm">
                  <button onClick={() => setJinetes(Math.max(1, jinetes - 1))} className="w-12 h-12 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl font-extrabold shadow-sm border border-zinc-100 transition-all">-</button>
                  <span className="w-8 text-center font-extrabold text-2xl text-zinc-900">{jinetes}</span>
                  <button onClick={() => setJinetes(jinetes + 1)} className="w-12 h-12 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl font-extrabold shadow-sm border border-zinc-100 transition-all">+</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-800 mb-3">3. Tu número de WhatsApp</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-zinc-400" /></div>
                  <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej: 300 123 4567" className="w-full pl-12 p-4 border border-zinc-200/50 rounded-2xl bg-white/50 text-zinc-900 font-bold outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all shadow-sm placeholder-zinc-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-900 rounded-[2rem] p-8 text-white shadow-2xl flex flex-col justify-between border border-zinc-800">
              <div>
                <p className="text-xs font-bold text-amber-500 mb-5 bg-amber-500/10 inline-block px-4 py-2 rounded-xl uppercase tracking-wider">{tipoCabalgataStr}</p>
                <div className="flex justify-between items-center mb-4"><span className="text-zinc-400 font-medium">{jinetes} Jinetes x ${precioBase.toLocaleString()}</span><span className="font-bold text-xl text-white">${(jinetes * precioBase).toLocaleString()}</span></div>
                {!esGrupal && (
                  <div className="flex justify-between items-center mb-4 text-red-300 bg-red-500/10 p-4 rounded-xl border border-red-500/10"><span className="font-semibold text-sm">Costo Guía Exclusivo</span><span className="font-bold">+${costoGuia.toLocaleString()}</span></div>
                )}
                <div className="border-t border-zinc-800 my-6"></div>
                <div className="flex justify-between items-end"><span className="text-lg text-zinc-400 font-medium tracking-tight">Total estimado</span><span className="text-5xl font-extrabold text-amber-500 tracking-tighter">${totalCalculado.toLocaleString()}</span></div>
              </div>
              <button onClick={handleReservaWhatsApp} disabled={!isValidPhone} className={`mt-8 block w-full text-center font-extrabold py-5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${isValidPhone ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'}`}>
                <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} className="w-6 h-6"/> {isValidPhone ? 'Enviar por WhatsApp' : 'Ingresa tu número primero'}
              </button>
            </div>
          </div>
        </section>

        {/* SECCIÓN: LA EXPERIENCIA Y PREPARACIÓN */}
        <section className="grid md:grid-cols-2 gap-6 scroll-mt-20">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 border border-white">
            <h3 className="text-2xl font-extrabold text-zinc-900 mb-6 tracking-tight flex items-center gap-2">
              <Compass className="w-7 h-7 text-amber-600"/> La Experiencia
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shadow shrink-0 z-10"><Coffee className="w-4 h-4" /></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/60 p-4 rounded-2xl border border-zinc-100 shadow-sm">
                  <h4 className="font-bold text-zinc-900">1. Bienvenida</h4>
                  <p className="text-sm text-zinc-500 mt-1">Llegada a la finca, inducción rápida y tinto campesino.</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shadow shrink-0 z-10"><Heart className="w-4 h-4" /></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/60 p-4 rounded-2xl border border-zinc-100 shadow-sm">
                  <h4 className="font-bold text-zinc-900">2. Conexión</h4>
                  <p className="text-sm text-zinc-500 mt-1">Te asignamos el caballo ideal según tu nivel de experiencia.</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shadow shrink-0 z-10"><Camera className="w-4 h-4" /></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/60 p-4 rounded-2xl border border-zinc-100 shadow-sm">
                  <h4 className="font-bold text-zinc-900">3. El Recorrido</h4>
                  <p className="text-sm text-zinc-500 mt-1">Ruta guiada por miradores, senderos ecológicos y naturaleza pura.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 border border-white">
              <h3 className="text-2xl font-extrabold text-zinc-900 mb-6 tracking-tight flex items-center gap-2">
                <CheckCircle2 className="w-7 h-7 text-green-600"/> ¿Qué traer?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 bg-white/60 p-3 rounded-2xl border border-zinc-100 shadow-sm">
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-50"><Sun className="w-5 h-5 text-amber-500"/></div>
                  <span className="font-medium text-zinc-700">Bloqueador solar y gorra</span>
                </li>
                <li className="flex items-center gap-4 bg-white/60 p-3 rounded-2xl border border-zinc-100 shadow-sm">
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-50"><ShieldCheck className="w-5 h-5 text-zinc-500"/></div>
                  <span className="font-medium text-zinc-700">Pantalón largo (jean o sudadera)</span>
                </li>
                <li className="flex items-center gap-4 bg-white/60 p-3 rounded-2xl border border-zinc-100 shadow-sm">
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-50"><MapPin className="w-5 h-5 text-zinc-500"/></div>
                  <span className="font-medium text-zinc-700">Zapatos cerrados (botas o tenis)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-[2.5rem] shadow-xl p-8 border border-zinc-700 text-white relative overflow-hidden">
              <Shield className="absolute -right-4 -top-4 w-32 h-32 text-white/5 rotate-12" />
              <h3 className="text-xl font-extrabold mb-2 tracking-tight">Viaja Asegurado</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-5">Tu bienestar es nuestra prioridad. Todas nuestras rutas incluyen póliza de asistencia médica con <b>Magenta Seguros</b>.</p>
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 font-bold px-4 py-2.5 rounded-xl text-sm border border-green-500/30">
                <ShieldCheck className="w-4 h-4"/> Cobertura Total Incluida
              </div>
            </div>
          </div>
        </section>

        <PricingSection />

        <section id="ubicacion" className="pt-4 scroll-mt-20">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-zinc-50/50 to-white/50">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">{data.businessName || 'Cabalgatas Medellín'}</h2>
                  <BadgeCheck className="w-6 h-6 text-blue-500 fill-current" aria-hidden="true" />
                </div>
                <p className="text-zinc-600 font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" aria-hidden="true"/> {data.mapAddress || 'Caldas, Antioquia'}
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-zinc-100">
                   <span className="text-3xl font-extrabold text-zinc-900 tracking-tight">{data.googleRating || '5.0'}</span>
                   <div className="flex text-amber-400">
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                   </div>
                </div>
                <p className="text-sm font-medium text-zinc-500 mt-3">Basado en {data.googleReviewCount || '150'}+ opiniones</p>
              </div>
            </div>
            
            <div className="w-full h-[320px] relative bg-zinc-200 flex items-center justify-center overflow-hidden border-t border-zinc-100">
              <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" alt="Imagen de fondo del mapa de ubicación" fill quality={75} className="object-cover opacity-60 blur-[3px]" sizes="(max-width: 768px) 100vw, 800px" />
              <div className="absolute inset-0 bg-zinc-900/20"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl mb-4 animate-bounce border border-white/50">
                  <MapPin className="w-8 h-8 text-amber-600" aria-hidden="true" />
                </div>
                {data.mapEmbedUrl ? (
                  <a href={data.mapEmbedUrl} target="_blank" rel="noreferrer" className="bg-zinc-900/90 backdrop-blur-md text-white font-bold py-3 px-6 rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center gap-2 hover:bg-black">
                    Abrir en Google Maps
                  </a>
                ) : (
                  <span className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl font-bold text-zinc-600 shadow-lg border border-white/50">Mapa no configurado</span>
                )}
              </div>
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
                    <Image src={item.url} alt={item.title || 'Foto de Cabalgata en Caldas'} fill quality={75} className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" sizes="(max-width: 768px) 100vw, 320px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-80"></div>
                    {item.title && <h3 className="absolute bottom-5 left-5 text-white font-bold text-lg tracking-tight">{item.title}</h3>}
                  </div>
                  {item.desc && <div className="p-5"><p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p></div>}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Abajo_Galeria')} className="bg-green-50 text-green-700 hover:bg-green-100 font-bold py-3.5 px-8 rounded-full flex items-center gap-2 transition-colors border border-green-200/50">
                <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} aria-hidden="true" className="w-5 h-5"/> Me gusta. Quiero más info.
              </a>
            </div>
          </section>
        )}

        {data.blogPosts && data.blogPosts.length > 0 && (
          <section id="blog" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-extrabold text-zinc-900 mb-8 flex items-center gap-3 tracking-tight">
              <BookOpen className="w-8 h-8 text-amber-600" aria-hidden="true" /> Nuestro Blog
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.blogPosts.slice(0, 2).map((post: any) => (
                <a key={post.id} href={`/blog/${post.slug}`} className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative w-full h-48 bg-zinc-100">
                    <Image src={post.image || 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=800'} alt={`Imagen de portada para ${post.title}`} fill quality={75} className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <div className="p-7">
                    <h3 className="font-extrabold text-xl mb-3 text-zinc-900 tracking-tight">{post.title}</h3>
                    <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">{post.metaDesc || post.content}</p>
                    <span className="text-amber-600 font-bold text-sm mt-5 block">Leer artículo →</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="/blog" className="inline-block border border-zinc-200 bg-white text-zinc-700 font-bold py-3 px-8 rounded-full hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-sm">
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
                      <a href={review.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-3.5 py-2 rounded-xl transition-colors hover:bg-red-100">
                        <PlayCircle className="w-4 h-4" aria-hidden="true" /> Ver Video
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.faqs && data.faqs.length > 0 && (
          <section id="faq" className="pb-16 scroll-mt-20">
            <h2 className="text-3xl font-extrabold text-zinc-900 mb-10 text-center tracking-tight">Preguntas Frecuentes</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {data.faqs.map((faq: any) => (
                <details key={faq.id} className="group bg-white rounded-2xl border border-zinc-200 cursor-pointer overflow-hidden shadow-sm transition-all hover:border-zinc-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex justify-between items-center font-bold p-6 text-zinc-800 bg-white group-open:bg-zinc-50/50 transition-colors">{faq.q}</summary>
                  <div className="text-zinc-600 px-6 pb-6 bg-zinc-50/50 pt-2 border-t border-zinc-100 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-zinc-500 mb-5 font-medium tracking-wide">¿Aún tienes dudas?</p>
              <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Abajo_FAQ')} className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} aria-hidden="true" className="w-5 h-5"/> Habla con un asesor ahora
              </a>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-zinc-950 text-zinc-400 py-16 text-center relative z-20 mt-12 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-white text-2xl font-bold mb-8 tracking-tight">Síguenos en nuestras redes</h3>
          <div className="flex justify-center gap-6 mb-10">
            <a href="https://www.instagram.com/cabalgataseco" target="_blank" rel="noreferrer" className="bg-zinc-900 p-4 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110 flex items-center justify-center border border-zinc-800 hover:border-pink-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://web.facebook.com/Cabalgatasmedellin" target="_blank" rel="noreferrer" className="bg-zinc-900 p-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 flex items-center justify-center border border-zinc-800 hover:border-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
          <p className="text-sm font-medium tracking-wide text-zinc-500">© {new Date().getFullYear()} Cabalgatas Medellín. Todos los derechos reservados.</p>
        </div>
      </footer>

      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl text-center relative animate-in zoom-in duration-300 border border-zinc-100">
            <button onClick={() => setShowExitPopup(false)} className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-900 bg-zinc-100 rounded-full p-2 transition-colors"><X className="w-5 h-5"/></button>
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-100"><Gift className="w-10 h-10" /></div>
            <h3 className="text-2xl font-extrabold text-zinc-900 mb-3 tracking-tight">¡Espera! No te vayas 🐎</h3>
            <p className="text-zinc-500 mb-8 leading-relaxed">Resérvalo ahora por WhatsApp y recibe un <b className="text-zinc-800">descuento sorpresa</b>.</p>
            <a href={linkCotizador} target="_blank" rel="noreferrer" onClick={() => { setShowExitPopup(false); trackWhatsAppClick('Boton_Exit_Intent'); }} className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors">
              ¡Reclamar mi descuento!
            </a>
            <button onClick={() => setShowExitPopup(false)} className="mt-5 text-sm text-zinc-400 font-bold hover:text-zinc-700 transition-colors">No gracias</button>
          </div>
        </div>
      )}

      <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Flotante')} className="fixed bottom-8 right-8 hover:scale-110 transition-transform z-50 hidden md:flex items-center justify-center animate-bounce drop-shadow-[0_8px_30px_rgba(34,197,94,0.4)]">
        <Image src="/logo-whatsapp.webp" alt="WhatsApp Flotante" width={64} height={64} className="rounded-full" />
      </a>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-zinc-200/50 px-2 py-3 pb-safe z-50 grid grid-cols-5 gap-1 text-center md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)] items-center">
        <a href={data?.navLink1 || '#inicio'} className="flex flex-col items-center text-zinc-500 hover:text-amber-600 transition-colors"><Home className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel1 || 'Inicio'}</span></a>
        <a href={data?.navLink2 || '#cotizador'} className="flex flex-col items-center text-zinc-500 hover:text-amber-600 transition-colors"><Calendar className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel2 || 'Cotizar'}</span></a>
        <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Nav_Movil')} className="relative -mt-8 flex justify-center">
          <div className="bg-white rounded-full shadow-[0_8px_20px_rgba(34,197,94,0.3)] animate-pulse border-4 border-white flex items-center justify-center p-1">
            <Image src="/logo-whatsapp.webp" alt="WhatsApp Móvil" width={48} height={48} />
          </div>
        </a>
        <a href={data?.navLink3 || '#galeria'} className="flex flex-col items-center text-zinc-500 hover:text-amber-600 transition-colors"><ImageIcon className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel3 || 'Galería'}</span></a>
        <a href={data?.navLink4 || '#faq'} className="flex flex-col items-center text-zinc-500 hover:text-amber-600 transition-colors"><Info className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel4 || 'FAQ'}</span></a>
      </nav>
    </div>
  );
}