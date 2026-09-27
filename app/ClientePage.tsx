"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Calendar, ShieldCheck, Info, Star, PlayCircle, Camera, X, Gift, Clock, Home, MapPin, BadgeCheck, BookOpen, Image as ImageIcon, Phone } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, onSnapshot, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import PricingSection from '../components/Planes';

export default function ClientePage({ initialData }: { initialData: any }) {
  
  const [data, setData] = useState<any>(initialData);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00');
  const [jinetes, setJinetes] = useState(2);
  const [telefono, setTelefono] = useState('');
  const [currentHero, setCurrentHero] = useState(0);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "configuracion", "general"), (docSnap) => {
      if (docSnap.exists()) setData(docSnap.data());
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (data) {
      if (data.metaTitle) document.title = data.metaTitle;
      const setMeta = (name: string, content: string, isProperty = false) => {
        if(!content) return;
        const attr = isProperty ? 'property' : 'name';
        let el = document.querySelector(`meta[${attr}="${name}"]`);
        if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
        el.setAttribute('content', content);
      };
      setMeta('description', data.metaDescription);
      setMeta('keywords', data.seoKeywords);
      setMeta('og:image', data.seoOgImage, true);
      setMeta('og:title', data.metaTitle, true);
    }
  }, [data]);

  useEffect(() => {
    if (data?.heroMedia && data.heroMedia.length > 1) {
      const interval = setInterval(() => setCurrentHero((prev) => (prev + 1) % data.heroMedia.length), 5000);
      return () => clearInterval(interval);
    }
  }, [data?.heroMedia]);

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
  const linkCotizador = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hola, quiero reservar el ${fecha || 'próximo fin de semana'} a las ${hora}. Somos ${jinetes} personas. Modalidad: ${esGrupal ? 'Grupal' : 'Privada'}. Cotización: $${totalCalculado.toLocaleString()}`)}`;
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

  if (!data) return null;

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-200">
      
      {/* 🚀 LCP OPTIMIZADO: Banner Hero con Priority Absoluto */}
      <section id="inicio" className="relative h-[80vh] bg-stone-900 overflow-hidden flex flex-col justify-end">
        {data.heroMedia?.map((media: any, idx: number) => {
          const isVideo = media.url?.toLowerCase().includes('.mp4');
          const isFirstItem = idx === 0;
          const classes = `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentHero ? 'opacity-100' : 'opacity-0'}`;
          
          return isVideo ? (
            <video key={idx} src={media.url} autoPlay loop muted playsInline className={classes} />
          ) : (
            <Image 
              key={idx} 
              src={media.url} 
              alt="Cabalgatas Medellín Banner" 
              fill 
              priority={isFirstItem} // Esto elimina el loading="lazy" que arruinaba tu LCP
              quality={60} // Reduce el peso drásticamente
              className={classes} 
              sizes="(max-width: 768px) 768px, 1200px" // Ayuda a Next.js a comprimir mejor
            />
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent z-10"></div>
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">{data.heroTitle || "Cabalgatas Ecológicas"}</h1>
          <p className="text-stone-200 text-lg md:text-xl font-medium mb-8">{data.heroSubtitle || "Experiencias únicas en Antioquia."}</p>
          <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Principal_Hero')} className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105"><MessageCircle className="w-5 h-5"/> Chatear con Asesor</a>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
        
        {/* COTIZADOR */}
        <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-200 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-stone-100 pb-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 flex items-center gap-3">
              <Calendar className="text-amber-600 w-8 h-8" /> Cotiza y Reserva
            </h2>
            {data.urgencyText && <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-sm font-bold animate-pulse flex items-center gap-2 border border-red-200"><Clock className="w-4 h-4"/>{data.urgencyText}</div>}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-extrabold text-stone-900 mb-2">1. Selecciona Fecha y Hora</label>
                <div className="flex gap-2">
                  <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-3 border-2 border-stone-300 rounded-xl bg-white text-stone-900 font-bold outline-none focus:border-green-500 transition-colors" />
                  <select value={hora} onChange={(e) => setHora(e.target.value)} className="w-full p-3 border-2 border-stone-300 rounded-xl bg-white text-stone-900 font-bold outline-none focus:border-green-500 transition-colors">
                    <option value="10:00">10:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
                <div className="mt-4 bg-amber-50 p-4 rounded-xl border-2 border-amber-300 shadow-sm">
                  <p className="text-sm text-amber-900 font-medium leading-relaxed">
                    💡 <strong className="font-extrabold">Nota importante:</strong> Las cabalgatas grupales (sin costo extra de guía) son únicamente los <strong className="font-extrabold">sábados y domingos a las 2:00 PM</strong>. Cualquier otro día u horario será una experiencia exclusiva y privada (incluye cobro del guía).
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-extrabold text-stone-900 mb-2">2. Número de Jinetes</label>
                <div className="flex items-center gap-4 bg-white p-2 rounded-xl border-2 border-stone-300 w-fit shadow-sm">
                  <button onClick={() => setJinetes(Math.max(1, jinetes - 1))} className="w-10 h-10 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-lg font-extrabold shadow-sm transition">-</button>
                  <span className="w-8 text-center font-extrabold text-2xl text-stone-900">{jinetes}</span>
                  <button onClick={() => setJinetes(jinetes + 1)} className="w-10 h-10 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-lg font-extrabold shadow-sm transition">+</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-stone-900 mb-2">3. Tu número de WhatsApp</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-stone-500" /></div>
                  <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej: 300 123 4567" className="w-full pl-10 p-3 border-2 border-stone-300 rounded-xl bg-white text-stone-900 font-bold outline-none focus:border-green-500 transition-colors placeholder-stone-400"/>
                </div>
                <p className="text-xs font-bold text-stone-500 mt-2">Obligatorio para enviarte la cotización detallada.</p>
              </div>
            </div>
            
            <div className="bg-stone-900 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between border-2 border-stone-800">
              <div>
                <p className="text-sm font-extrabold text-amber-500 mb-4 bg-amber-500/10 inline-block px-3 py-1 rounded-lg border border-amber-500/20">{tipoCabalgataStr}</p>
                <div className="flex justify-between items-center mb-3"><span className="text-stone-300 font-medium">{jinetes} Jinetes x ${precioBase.toLocaleString()}</span><span className="font-extrabold text-lg text-white">${(jinetes * precioBase).toLocaleString()}</span></div>
                {!esGrupal && <div className="flex justify-between items-center mb-3 text-red-300 bg-red-500/10 p-2 rounded-lg border border-red-500/20"><span className="font-bold">Costo Guía Exclusivo</span><span className="font-extrabold">+${costoGuia.toLocaleString()}</span></div>}
                <div className="border-t border-stone-700 my-4"></div>
                <div className="flex justify-between items-end"><span className="text-lg text-stone-400 font-bold">Total</span><span className="text-4xl font-black text-amber-500">${totalCalculado.toLocaleString()}</span></div>
              </div>
              
              <button 
                onClick={handleReservaWhatsApp} 
                disabled={!isValidPhone}
                className={`mt-8 block w-full text-center font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${isValidPhone ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer' : 'bg-stone-800 text-stone-500 cursor-not-allowed border-2 border-stone-700'}`}
              >
                <MessageCircle className="w-6 h-6"/> {isValidPhone ? 'Enviar por WhatsApp' : 'Ingresa tu número primero'}
              </button>
            </div>
          </div>
        </section>

        <PricingSection />

        {/* SECCIÓN MAPAS */}
        <section id="ubicacion" className="pt-4 scroll-mt-20">
          <div className="bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-stone-50 to-white">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-extrabold text-stone-800">{data.businessName || 'Cabalgatas Medellín'}</h2>
                  <BadgeCheck className="w-6 h-6 text-blue-500 fill-current" />
                </div>
                <p className="text-stone-500 font-medium flex items-center gap-2"><MapPin className="w-4 h-4"/> {data.mapAddress || 'Caldas, Antioquia'}</p>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border shadow-sm">
                   <span className="text-3xl font-black text-stone-800">{data.googleRating || '5.0'}</span>
                   <div className="flex text-amber-500"><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /></div>
                </div>
                <p className="text-sm font-bold text-stone-500 mt-2 hover:underline cursor-pointer">Basado en {data.googleReviewCount || '150'}+ opiniones</p>
              </div>
            </div>
            
            <div className="w-full h-[300px] relative bg-stone-200 flex items-center justify-center overflow-hidden border-t">
              <Image 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
                alt="Ubicación Mapa" 
                fill 
                quality={75}
                className="object-cover opacity-60 blur-[2px]" 
                sizes="(max-width: 768px) 100vw, 800px" 
              />
              <div className="absolute inset-0 bg-stone-900/30"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-2xl mb-4 animate-bounce">
                  <MapPin className="w-8 h-8 text-amber-500" />
                </div>
                {data.mapEmbedUrl ? (
                  <a href={data.mapEmbedUrl} target="_blank" rel="noreferrer" className="bg-stone-900 text-white font-bold py-3 px-6 rounded-xl shadow-xl transition-transform hover:scale-105 flex items-center gap-2">
                    Abrir en Google Maps
                  </a>
                ) : (
                  <span className="bg-white px-4 py-2 rounded-lg font-bold text-stone-500 shadow">Mapa no configurado</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* GALERÍA */}
        {data.gallery && data.gallery.length > 0 && (
          <section id="galeria" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-2"><Camera className="w-8 h-8 text-amber-500" /> Galería</h2>
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
              {data.gallery.map((item: any) => (
                <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-center bg-white rounded-2xl shadow-sm border overflow-hidden group">
                  <div className="h-48 overflow-hidden relative bg-stone-100">
                    <Image 
                      src={item.url} 
                      alt={item.title || 'Foto de Cabalgata'} 
                      fill 
                      quality={75}
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      sizes="(max-width: 768px) 100vw, 320px" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">{item.title}</h3>
                  </div>
                  {item.desc && <div className="p-4"><p className="text-stone-600 text-sm">{item.desc}</p></div>}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Abajo_Galeria')} className="bg-green-100 text-green-700 hover:bg-green-200 font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors"><MessageCircle className="w-5 h-5"/> Me gusta. Quiero más info.</a>
            </div>
          </section>
        )}

        {/* BLOG */}
        {data.blogPosts && data.blogPosts.length > 0 && (
          <section id="blog" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-2"><BookOpen className="w-8 h-8 text-amber-500" /> Nuestro Blog</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.blogPosts.slice(0, 2).map((post: any) => (
                <a key={post.id} href={`/blog/${post.slug}`} className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="relative w-full h-40 bg-stone-100">
                    <Image 
                      src={post.image || 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=800'} 
                      alt={post.title} 
                      fill 
                      quality={75}
                      className="object-cover group-hover:scale-105 transition-transform" 
                      sizes="(max-width: 768px) 100vw, 50vw" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-stone-800">{post.title}</h3>
                    <p className="text-stone-500 text-sm line-clamp-2">{post.metaDesc || post.content}</p>
                    <span className="text-amber-600 font-bold text-sm mt-4 block">Leer artículo →</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-6">
              <a href="/blog" className="inline-block border-2 border-stone-200 text-stone-600 font-bold py-2 px-6 rounded-full hover:bg-stone-50">Ver todos los artículos</a>
            </div>
          </section>
        )}

        {/* RESEÑAS */}
        {data.reviews && data.reviews.length > 0 && (
          <section id="reviews" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-6">Jinetes Felices</h2>
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
              {data.reviews.map((review: any) => (
                <div key={review.id} className="min-w-[300px] bg-white p-6 rounded-3xl shadow-sm border snap-center flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-400 mb-3">{[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                    <p className="text-stone-600 italic mb-4 text-sm leading-relaxed">"{review.text}"</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <span className="font-bold text-sm">{review.author}</span>
                    {review.videoUrl && <a href={review.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full"><PlayCircle className="w-4 h-4" /> Ver Video</a>}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <a href={linkCotizador} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Abajo_Reviews')} className="bg-green-500 text-white hover:bg-green-600 font-bold py-3 px-8 rounded-full flex items-center gap-2 shadow-lg transition-transform hover:scale-105"><MessageCircle className="w-5 h-5"/> Únete a ellos, reserva aquí</a>
            </div>
          </section>
        )}

        {/* PREGUNTAS FRECUENTES */}
        {data.faqs && data.faqs.length > 0 && (
          <section id="faq" className="pb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Preguntas Frecuentes</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {data.faqs.map((faq: any) => (
                <details key={faq.id} className="group bg-white rounded-xl border cursor-pointer overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex justify-between items-center font-bold p-5 text-stone-800 hover:bg-stone-50">{faq.q}</summary>
                  <div className="text-stone-600 px-5 pb-5 bg-stone-50 pt-2 border-t">{faq.a}</div>
                </details>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-stone-500 mb-4">¿Aún tienes dudas?</p>
              <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Abajo_FAQ')} className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"><MessageCircle className="w-5 h-5"/> Habla con un asesor ahora</a>
            </div>
          </section>
        )}
      </main>

      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative animate-in zoom-in duration-300">
            <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 bg-stone-100 rounded-full p-2"><X className="w-5 h-5"/></button>
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><Gift className="w-10 h-10" /></div>
            <h3 className="text-2xl font-extrabold text-stone-800 mb-2">¡Espera! No te vayas 🐎</h3>
            <p className="text-stone-600 mb-8">Resérvalo ahora mismo por WhatsApp y recibe un <b>descuento sorpresa</b>.</p>
            <a href={linkCotizador} target="_blank" rel="noreferrer" onClick={() => { setShowExitPopup(false); trackWhatsAppClick('Boton_Exit_Intent'); }} className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg">
              ¡Reclamar mi descuento!
            </a>
            <button onClick={() => setShowExitPopup(false)} className="mt-4 text-sm text-stone-400 font-medium">No gracias</button>
          </div>
        </div>
      )}

      <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Flotante')} className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-600 hover:scale-110 transition-all z-50 hidden md:flex items-center justify-center animate-bounce"><MessageCircle className="w-8 h-8" /></a>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-2 py-3 pb-safe z-50 grid grid-cols-5 gap-1 text-center md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.08)] items-center">
        <a href={data?.navLink1 || '#inicio'} className="flex flex-col items-center text-stone-500 hover:text-amber-600"><Home className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel1 || 'Inicio'}</span></a>
        <a href={data?.navLink2 || '#cotizador'} className="flex flex-col items-center text-stone-500 hover:text-amber-600"><Calendar className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel2 || 'Cotizar'}</span></a>
        <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Nav_Movil')} className="relative -mt-8 flex justify-center"><div className="bg-green-500 text-white p-4 rounded-full shadow-xl shadow-green-500/40 animate-pulse border-4 border-white"><MessageCircle className="w-7 h-7" /></div></a>
        <a href={data?.navLink3 || '#galeria'} className="flex flex-col items-center text-stone-500 hover:text-amber-600"><ImageIcon className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel3 || 'Galería'}</span></a>
        <a href={data?.navLink4 || '#faq'} className="flex flex-col items-center text-stone-500 hover:text-amber-600"><Info className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel4 || 'FAQ'}</span></a>
      </nav>
    </div>
  );
}