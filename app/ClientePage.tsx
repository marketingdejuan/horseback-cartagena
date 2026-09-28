"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Calendar, 
  ShieldCheck, 
  Info, 
  Star, 
  PlayCircle, 
  Camera, 
  X, 
  Gift, 
  Clock, 
  Home, 
  MapPin, 
  BadgeCheck, 
  BookOpen, 
  Image as ImageIcon, 
  Phone, 
  Instagram, 
  Facebook 
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

  if (!data) {
    return (
      <div className="min-h-screen bg-stone-900 font-sans selection:bg-amber-200">
        <section className="relative h-[80vh] bg-stone-800 overflow-hidden flex flex-col justify-end">
          <div className="absolute inset-0 w-full h-full bg-stone-700 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent z-10"></div>
          <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-12 text-center md:text-left">
            <div className="h-12 md:h-16 bg-stone-600/50 rounded-xl w-3/4 mb-4 mx-auto md:mx-0 animate-pulse"></div>
            <div className="h-6 md:h-8 bg-stone-600/50 rounded-lg w-1/2 mb-8 mx-auto md:mx-0 animate-pulse"></div>
            <div className="h-14 w-64 bg-green-600/20 rounded-full mx-auto md:mx-0 animate-pulse"></div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-200">
      
      <section id="inicio" className="relative h-[80vh] bg-stone-900 overflow-hidden flex flex-col justify-end">
        <Image 
          src="/cabalgatas-en-medellin-y-caldas.webp" 
          alt="Jinetes cabalgando por los paisajes de Caldas, Antioquia" 
          fill 
          priority={true}
          quality={60} 
          className="absolute inset-0 w-full h-full object-cover opacity-90" 
          sizes="(max-width: 768px) 768px, 1200px" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent z-10"></div>
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            {data.heroTitle || "Cabalgatas Ecológicas"}
          </h1>
          <p className="text-stone-200 text-lg md:text-xl font-medium mb-8">
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
            <Image 
              src="/logo-whatsapp.webp" 
              alt="WhatsApp" 
              width={24} 
              height={24} 
              aria-hidden="true" 
              className="w-5 h-5"
            /> 
            Chatear con Asesor
          </a>

        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
        
        <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-200 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-stone-100 pb-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 flex items-center gap-3">
              <Calendar className="text-amber-700 w-8 h-8" aria-hidden="true" /> Cotiza y Reserva
            </h2>
            {data.urgencyText && (
              <div className="bg-red-50 text-red-900 px-4 py-2 rounded-xl text-sm font-bold animate-pulse flex items-center gap-2 border border-red-400">
                <Clock className="w-4 h-4" aria-hidden="true"/>{data.urgencyText}
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="fecha-reserva" className="block text-sm font-extrabold text-stone-900 mb-2">1. Selecciona Fecha y Hora</label>
                <div className="flex gap-2">
                  <input 
                    id="fecha-reserva" 
                    aria-label="Seleccionar fecha" 
                    type="date" 
                    value={fecha} 
                    onChange={(e) => setFecha(e.target.value)} 
                    className="w-full p-3 border-2 border-stone-300 rounded-xl bg-white text-stone-900 font-bold outline-none focus:border-green-600 transition-colors" 
                  />
                  <select 
                    id="hora-reserva" 
                    aria-label="Seleccionar hora" 
                    value={hora} 
                    onChange={(e) => setHora(e.target.value)} 
                    className="w-full p-3 border-2 border-stone-300 rounded-xl bg-white text-stone-900 font-bold outline-none focus:border-green-600 transition-colors"
                  >
                    <option value="10:00">10:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
                <div className="mt-4 bg-amber-50 p-4 rounded-xl border-2 border-amber-300 shadow-sm">
                  <p className="text-sm text-amber-900 font-medium leading-relaxed">
                    💡 <strong className="font-extrabold">Nota importante:</strong> Las cabalgatas grupales (sin costo extra de guía) son únicamente los <strong className="font-extrabold">sábados y domingos a las 2:00 PM</strong>. Cualquier otro día u horario será una experiencia exclusiva y privada.
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-extrabold text-stone-900 mb-2">2. Número de Jinetes</label>
                <div className="flex items-center gap-4 bg-white p-2 rounded-xl border-2 border-stone-300 w-fit shadow-sm">
                  <button 
                    aria-label="Disminuir número de jinetes" 
                    onClick={() => setJinetes(Math.max(1, jinetes - 1))} 
                    className="w-10 h-10 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-lg font-extrabold shadow-sm transition"
                  >
                    -
                  </button>
                  <span aria-live="polite" className="w-8 text-center font-extrabold text-2xl text-stone-900">{jinetes}</span>
                  <button 
                    aria-label="Aumentar número de jinetes" 
                    onClick={() => setJinetes(jinetes + 1)} 
                    className="w-10 h-10 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-lg font-extrabold shadow-sm transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="telefono-reserva" className="block text-sm font-extrabold text-stone-900 mb-2">3. Tu número de WhatsApp</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-stone-700" aria-hidden="true" />
                  </div>
                  <input 
                    id="telefono-reserva" 
                    aria-label="Ingresar número de WhatsApp" 
                    type="tel" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                    placeholder="Ej: 300 123 4567" 
                    className="w-full pl-10 p-3 border-2 border-stone-300 rounded-xl bg-white text-stone-900 font-bold outline-none focus:border-green-600 transition-colors placeholder-stone-500"
                  />
                </div>
                <p className="text-xs font-bold text-stone-600 mt-2">Obligatorio para enviarte la cotización detallada.</p>
              </div>
            </div>
            
            <div className="bg-stone-900 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between border-2 border-stone-800">
              <div>
                <p className="text-sm font-extrabold text-amber-500 mb-4 bg-amber-500/10 inline-block px-3 py-1 rounded-lg border border-amber-500/20">
                  {tipoCabalgataStr}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-stone-300 font-medium">{jinetes} Jinetes x ${precioBase.toLocaleString()}</span>
                  <span className="font-extrabold text-lg text-white">${(jinetes * precioBase).toLocaleString()}</span>
                </div>
                {!esGrupal && (
                  <div className="flex justify-between items-center mb-3 text-red-300 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                    <span className="font-bold">Costo Guía Exclusivo</span>
                    <span className="font-extrabold">+${costoGuia.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-stone-700 my-4"></div>
                <div className="flex justify-between items-end">
                  <span className="text-lg text-stone-400 font-bold">Total</span>
                  <span className="text-4xl font-black text-amber-500">${totalCalculado.toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                onClick={handleReservaWhatsApp} 
                disabled={!isValidPhone}
                aria-label={isValidPhone ? 'Enviar cotización por WhatsApp' : 'Ingresa tu número primero para enviar'}
                className={`mt-8 block w-full text-center font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${isValidPhone ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer' : 'bg-stone-800 text-stone-500 cursor-not-allowed border-2 border-stone-700'}`}
              >
                <Image 
                  src="/logo-whatsapp.webp" 
                  alt="WhatsApp" 
                  width={24} 
                  height={24} 
                  aria-hidden="true" 
                  className="w-6 h-6"
                /> 
                {isValidPhone ? 'Enviar por WhatsApp' : 'Ingresa tu número primero'}
              </button>
            </div>
          </div>
        </section>

        <PricingSection />

        <section id="ubicacion" className="pt-4 scroll-mt-20">
          <div className="bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-stone-50 to-white">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-extrabold text-stone-800">{data.businessName || 'Cabalgatas Medellín'}</h2>
                  <BadgeCheck className="w-6 h-6 text-blue-600 fill-current" aria-hidden="true" />
                </div>
                <p className="text-stone-700 font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" aria-hidden="true"/> {data.mapAddress || 'Caldas, Antioquia'}
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border shadow-sm" aria-label={`Calificación de ${data.googleRating || '5.0'} estrellas en Google`}>
                   <span className="text-3xl font-black text-stone-800">{data.googleRating || '5.0'}</span>
                   <div className="flex text-amber-500">
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                     <Star className="w-5 h-5 fill-current" aria-hidden="true"/>
                   </div>
                </div>
                <p className="text-sm font-bold text-stone-600 mt-2">Basado en {data.googleReviewCount || '150'}+ opiniones</p>
              </div>
            </div>
            
            <div className="w-full h-[300px] relative bg-stone-200 flex items-center justify-center overflow-hidden border-t">
              <Image 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
                alt="Imagen de fondo del mapa de ubicación" 
                fill 
                quality={75}
                className="object-cover opacity-60 blur-[2px]" 
                sizes="(max-width: 768px) 100vw, 800px" 
              />
              <div className="absolute inset-0 bg-stone-900/30"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-2xl mb-4 animate-bounce">
                  <MapPin className="w-8 h-8 text-amber-600" aria-hidden="true" />
                </div>
                {data.mapEmbedUrl ? (
                  <a 
                    href={data.mapEmbedUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Abrir ubicación en Google Maps" 
                    className="bg-stone-900 text-white font-bold py-3 px-6 rounded-xl shadow-xl transition-transform hover:scale-105 flex items-center gap-2"
                  >
                    Abrir en Google Maps
                  </a>
                ) : (
                  <span className="bg-white px-4 py-2 rounded-lg font-bold text-stone-600 shadow">Mapa no configurado</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {data.gallery && data.gallery.length > 0 && (
          <section id="galeria" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-2">
              <Camera className="w-8 h-8 text-amber-600" aria-hidden="true" /> Galería
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
              {data.gallery.map((item: any) => (
                <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-center bg-white rounded-2xl shadow-sm border overflow-hidden group">
                  <div className="h-48 overflow-hidden relative bg-stone-100">
                    <Image 
                      src={item.url} 
                      alt={item.title || 'Foto de Cabalgata en Caldas'} 
                      fill 
                      quality={75}
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      sizes="(max-width: 768px) 100vw, 320px" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent"></div>
                    {item.title && <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">{item.title}</h3>}
                  </div>
                  {item.desc && <div className="p-4"><p className="text-stone-700 text-sm">{item.desc}</p></div>}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              
              <a 
                href={linkGancho} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Pedir más información por WhatsApp" 
                onClick={() => trackWhatsAppClick('Boton_Abajo_Galeria')} 
                className="bg-green-100 text-green-800 hover:bg-green-200 font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors"
              >
                <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} aria-hidden="true" className="w-5 h-5"/> 
                Me gusta. Quiero más info.
              </a>

            </div>
          </section>
        )}

        {data.blogPosts && data.blogPosts.length > 0 && (
          <section id="blog" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-amber-600" aria-hidden="true" /> Nuestro Blog
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.blogPosts.slice(0, 2).map((post: any) => (
                <a key={post.id} href={`/blog/${post.slug}`} aria-label={`Leer artículo: ${post.title}`} className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="relative w-full h-40 bg-stone-100">
                    <Image 
                      src={post.image || 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=800'} 
                      alt={`Imagen de portada para ${post.title}`} 
                      fill 
                      quality={75}
                      className="object-cover group-hover:scale-105 transition-transform" 
                      sizes="(max-width: 768px) 100vw, 50vw" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-stone-800">{post.title}</h3>
                    <p className="text-stone-600 text-sm line-clamp-2">{post.metaDesc || post.content}</p>
                    <span className="text-amber-700 font-bold text-sm mt-4 block" aria-hidden="true">Leer artículo →</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-6">
              <a href="/blog" aria-label="Ver todos los artículos del blog" className="inline-block border-2 border-stone-300 text-stone-700 font-bold py-2 px-6 rounded-full hover:bg-stone-50">
                Ver todos los artículos
              </a>
            </div>
          </section>
        )}

        {data.reviews && data.reviews.length > 0 && (
          <section id="reviews" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-6">Jinetes Felices</h2>
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
              {data.reviews.map((review: any) => (
                <div key={review.id} className="min-w-[300px] bg-white p-6 rounded-3xl shadow-sm border snap-center flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-500 mb-3" role="img" aria-label={`Calificación de ${review.rating} estrellas`}>
                      {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />)}
                    </div>
                    <p className="text-stone-700 italic mb-4 text-sm leading-relaxed">"{review.text}"</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-200">
                    <span className="font-bold text-sm text-stone-900">{review.author}</span>
                    {review.videoUrl && (
                      <a href={review.videoUrl} target="_blank" rel="noreferrer" aria-label={`Ver video de testimonio de ${review.author}`} className="flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-3 py-1.5 rounded-full">
                        <PlayCircle className="w-4 h-4" aria-hidden="true" /> Ver Video
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              
              <a 
                href={linkCotizador} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Hacer una reserva por WhatsApp" 
                onClick={() => trackWhatsAppClick('Boton_Abajo_Reviews')} 
                className="bg-green-600 text-white hover:bg-green-700 font-bold py-3 px-8 rounded-full flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} aria-hidden="true" className="w-5 h-5"/> 
                Únete a ellos, reserva aquí
              </a>

            </div>
          </section>
        )}

        {data.faqs && data.faqs.length > 0 && (
          <section id="faq" className="pb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Preguntas Frecuentes</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {data.faqs.map((faq: any) => (
                <details key={faq.id} className="group bg-white rounded-xl border border-stone-300 cursor-pointer overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex justify-between items-center font-bold p-5 text-stone-900 hover:bg-stone-50">{faq.q}</summary>
                  <div className="text-stone-700 px-5 pb-5 bg-stone-50 pt-2 border-t border-stone-200">{faq.a}</div>
                </details>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-stone-600 mb-4 font-medium">¿Aún tienes dudas?</p>
              
              <a 
                href={linkGancho} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Hablar con un asesor por WhatsApp para resolver dudas" 
                onClick={() => trackWhatsAppClick('Boton_Abajo_FAQ')} 
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
              >
                <Image src="/logo-whatsapp.webp" alt="WhatsApp" width={24} height={24} aria-hidden="true" className="w-5 h-5"/> 
                Habla con un asesor ahora
              </a>

            </div>
          </section>
        )}
      </main>

      {/* 🔥 FOOTER & REDES SOCIALES CONFIGURADAS */}
      <footer className="bg-stone-900 text-stone-400 py-12 text-center relative z-20 mt-12 border-t-4 border-amber-600">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-white text-2xl font-black mb-6">Síguenos en nuestras redes</h3>
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="https://www.instagram.com/cabalgataseco" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram de Cabalgatas Medellín" 
              className="bg-stone-800 p-4 rounded-full hover:bg-pink-600 hover:text-white transition-all hover:scale-110 shadow-lg"
            >
              <Instagram className="w-8 h-8" aria-hidden="true" />
            </a>
            
            <a 
              href="https://web.facebook.com/Cabalgatasmedellin" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Facebook de Cabalgatas Medellín" 
              className="bg-stone-800 p-4 rounded-full hover:bg-blue-600 hover:text-white transition-all hover:scale-110 shadow-lg"
            >
              <Facebook className="w-8 h-8" aria-hidden="true" />
            </a>
          </div>
          <p className="text-sm font-medium">© {new Date().getFullYear()} Cabalgatas Medellín. Todos los derechos reservados.</p>
        </div>
      </footer>

      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative animate-in zoom-in duration-300">
            <button onClick={() => setShowExitPopup(false)} aria-label="Cerrar ventana emergente" className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 bg-stone-200 rounded-full p-2"><X className="w-5 h-5" aria-hidden="true"/></button>
            <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-6"><Gift className="w-10 h-10" aria-hidden="true" /></div>
            <h3 className="text-2xl font-extrabold text-stone-900 mb-2">¡Espera! No te vayas 🐎</h3>
            <p className="text-stone-700 mb-8">Resérvalo ahora mismo por WhatsApp y recibe un <b>descuento sorpresa</b>.</p>
            
            <a 
              href={linkCotizador} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Reclamar descuento por WhatsApp" 
              onClick={() => { setShowExitPopup(false); trackWhatsAppClick('Boton_Exit_Intent'); }} 
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg"
            >
              ¡Reclamar mi descuento!
            </a>

            <button onClick={() => setShowExitPopup(false)} aria-label="Cerrar descuento" className="mt-4 text-sm text-stone-500 font-bold hover:text-stone-700">No gracias</button>
          </div>
        </div>
      )}

      {/* 🔥 BOTÓN FLOTANTE PRINCIPAL DE WHATSAPP (Desktop) */}
      <a 
        href={linkGancho} 
        target="_blank" 
        rel="noreferrer" 
        aria-label="Abrir chat flotante de WhatsApp" 
        onClick={() => trackWhatsAppClick('Boton_Flotante')} 
        className="fixed bottom-8 right-8 hover:scale-110 transition-transform z-50 hidden md:flex items-center justify-center animate-bounce drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
      >
        <Image src="/logo-whatsapp.webp" alt="WhatsApp Flotante" width={64} height={64} aria-hidden="true" className="rounded-full" />
      </a>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-2 py-3 pb-safe z-50 grid grid-cols-5 gap-1 text-center md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.08)] items-center">
        
        <a 
          href={data?.navLink1 || '#inicio'} 
          aria-label="Ir a la sección de Inicio" 
          className="flex flex-col items-center text-stone-600 hover:text-amber-700"
        >
          <Home className="w-5 h-5 mb-1" aria-hidden="true" />
          <span className="text-[9px] font-bold truncate w-full">{data?.navLabel1 || 'Inicio'}</span>
        </a>

        <a 
          href={data?.navLink2 || '#cotizador'} 
          aria-label="Ir a la sección de Cotizador" 
          className="flex flex-col items-center text-stone-600 hover:text-amber-700"
        >
          <Calendar className="w-5 h-5 mb-1" aria-hidden="true" />
          <span className="text-[9px] font-bold truncate w-full">{data?.navLabel2 || 'Cotizar'}</span>
        </a>
        
        {/* 🔥 BOTÓN FLOTANTE CENTRAL DE WHATSAPP (Móvil) */}
        <a 
          href={linkGancho} 
          target="_blank" 
          rel="noreferrer" 
          aria-label="Chatear por WhatsApp" 
          onClick={() => trackWhatsAppClick('Boton_Nav_Movil')} 
          className="relative -mt-8 flex justify-center"
        >
          <div className="bg-white rounded-full shadow-xl shadow-green-600/40 animate-pulse border-4 border-white flex items-center justify-center p-1">
            <Image src="/logo-whatsapp.webp" alt="WhatsApp Móvil" width={48} height={48} aria-hidden="true" />
          </div>
        </a>
        
        <a 
          href={data?.navLink3 || '#galeria'} 
          aria-label="Ir a la sección de Galería" 
          className="flex flex-col items-center text-stone-600 hover:text-amber-700"
        >
          <ImageIcon className="w-5 h-5 mb-1" aria-hidden="true" />
          <span className="text-[9px] font-bold truncate w-full">{data?.navLabel3 || 'Galería'}</span>
        </a>

        <a 
          href={data?.navLink4 || '#faq'} 
          aria-label="Ir a la sección de Preguntas Frecuentes" 
          className="flex flex-col items-center text-stone-600 hover:text-amber-700"
        >
          <Info className="w-5 h-5 mb-1" aria-hidden="true" />
          <span className="text-[9px] font-bold truncate w-full">{data?.navLabel4 || 'FAQ'}</span>
        </a>

      </nav>
    </div>
  );
}