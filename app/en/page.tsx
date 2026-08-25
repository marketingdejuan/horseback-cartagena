"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Calendar, ShieldCheck, Info, Star, PlayCircle, Camera, X, Gift, Clock, Home, MapPin, BadgeCheck, BookOpen, Image as ImageIcon, Phone } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, onSnapshot, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import PricingSectionEn from '../../components/PlanesEn';

export default function EnglishPage() {
  const [data, setData] = useState<any>(null);
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
      if (data.metaTitle) document.title = `${data.metaTitle} | English`;

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
      setMeta('og:title', `${data.metaTitle} | English`, true);
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
        event_category: 'Contact Conversion',
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
  const tipoCabalgataStr = esGrupal ? 'Group Ride (No extra guide fee)' : 'Private Ride (Exclusive guide included)';
  const whatsappNum = data?.whatsappNumber || "573000000000";
  
  const linkCotizador = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello, I want to book on ${fecha || 'next weekend'} at ${hora}. We are ${jinetes} people. Modality: ${esGrupal ? 'Group' : 'Private'}. Quote: $${totalCalculado.toLocaleString()} COP`)}`;
  const linkGancho = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("Hello! I want information about the horseback riding tours. 🐎")}`;
  
  const isValidPhone = telefono.trim().length >= 7;

  const handleReservaWhatsApp = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (!isValidPhone) return;
    trackWhatsAppClick('Boton_Cotizador_EN');

    try {
      await addDoc(collection(db, 'reservas'), {
        plan: esGrupal ? 'Group Ride' : 'Private Ride',
        fecha: fecha || 'To be defined',
        hora: hora,
        jinetes: jinetes,
        telefono: telefono,
        total: totalCalculado,
        fechaCreacion: serverTimestamp(),
        origen: 'Web English'
      });
    } catch (error) {
      console.error("Error saving silent reservation:", error);
    }
    window.open(linkCotizador, '_blank');
  };

  if (!data) return null;

  // FAQ Schema optimizado para las preguntas y respuestas en INGLÉS
  const faqSchema = data?.faqs?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.qEn || faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.aEn || faq.a
      }
    }))
  } : null;

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-200">
      
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <section id="inicio" className="relative h-[80vh] bg-stone-900 overflow-hidden flex flex-col justify-end">
        {data.heroMedia?.map((media: any, idx: number) => {
          const isVideo = media.url?.toLowerCase().includes('.mp4');
          const classes = `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentHero ? 'opacity-50' : 'opacity-0'}`;
          return isVideo ? (
            <video key={idx} src={media.url} autoPlay loop muted playsInline className={classes} />
          ) : (
            <Image key={idx} src={media.url} alt="Horseback Riding Medellin" fill priority={idx === 0} className={classes} sizes="100vw" />
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent z-10"></div>
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">{data.heroTitleEn || "Ecological Horseback Riding"}</h1>
          <p className="text-stone-200 text-lg md:text-xl font-medium mb-8">{data.heroSubtitleEn || "Unique experiences in Antioquia, Colombia."}</p>
          <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Principal_Hero_EN')} className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105"><MessageCircle className="w-5 h-5"/> Chat with an Advisor</a>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
        
        {/* COTIZADOR EN INGLÉS */}
        <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-200 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-stone-100 pb-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 flex items-center gap-3">
              <Calendar className="text-amber-600 w-8 h-8" /> Quote and Book
            </h2>
            {data.urgencyTextEn && <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-sm font-bold animate-pulse flex items-center gap-2 border border-red-200"><Clock className="w-4 h-4"/>{data.urgencyTextEn}</div>}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-extrabold text-stone-900 mb-2">1. Select Date and Time</label>
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
                    💡 <strong className="font-extrabold">Important note:</strong> Group rides (no extra guide fee) are exclusively on <strong className="font-extrabold">Saturdays and Sundays at 2:00 PM</strong>. Any other day or time will be an exclusive private experience (includes guide fee).
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-extrabold text-stone-900 mb-2">2. Number of Riders</label>
                <div className="flex items-center gap-4 bg-white p-2 rounded-xl border-2 border-stone-300 w-fit shadow-sm">
                  <button onClick={() => setJinetes(Math.max(1, jinetes - 1))} className="w-10 h-10 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-lg font-extrabold shadow-sm transition">-</button>
                  <span className="w-8 text-center font-extrabold text-2xl text-stone-900">{jinetes}</span>
                  <button onClick={() => setJinetes(jinetes + 1)} className="w-10 h-10 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-lg font-extrabold shadow-sm transition">+</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-stone-900 mb-2">3. Your WhatsApp number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-stone-500" /></div>
                  <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ex: +1 234 567 8900" className="w-full pl-10 p-3 border-2 border-stone-300 rounded-xl bg-white text-stone-900 font-bold outline-none focus:border-green-500 transition-colors placeholder-stone-400"/>
                </div>
                <p className="text-xs font-bold text-stone-500 mt-2">Mandatory to send you the detailed quote.</p>
              </div>
            </div>
            
            <div className="bg-stone-900 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between border-2 border-stone-800">
              <div>
                <p className="text-sm font-extrabold text-amber-500 mb-4 bg-amber-500/10 inline-block px-3 py-1 rounded-lg border border-amber-500/20">{tipoCabalgataStr}</p>
                <div className="flex justify-between items-center mb-3"><span className="text-stone-300 font-medium">{jinetes} Riders x ${precioBase.toLocaleString()}</span><span className="font-extrabold text-lg text-white">${(jinetes * precioBase).toLocaleString()} COP</span></div>
                {!esGrupal && <div className="flex justify-between items-center mb-3 text-red-300 bg-red-500/10 p-2 rounded-lg border border-red-500/20"><span className="font-bold">Exclusive Guide Fee</span><span className="font-extrabold">+${costoGuia.toLocaleString()} COP</span></div>}
                <div className="border-t border-stone-700 my-4"></div>
                <div className="flex justify-between items-end"><span className="text-lg text-stone-400 font-bold">Total</span><span className="text-4xl font-black text-amber-500">${totalCalculado.toLocaleString()} COP</span></div>
              </div>
              
              <button 
                onClick={handleReservaWhatsApp} 
                disabled={!isValidPhone}
                className={`mt-8 block w-full text-center font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${isValidPhone ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer' : 'bg-stone-800 text-stone-500 cursor-not-allowed border-2 border-stone-700'}`}
              >
                <MessageCircle className="w-6 h-6"/> {isValidPhone ? 'Send via WhatsApp' : 'Enter your number first'}
              </button>
            </div>
          </div>
        </section>

        <PricingSectionEn />

        {/* SECCIÓN MAPAS CON NEXT IMAGE */}
        <section id="ubicacion" className="pt-4 scroll-mt-20">
          <div className="bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-stone-50 to-white">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-extrabold text-stone-800">{data.businessName || 'Cabalgatas Medellín'}</h2>
                  <BadgeCheck className="w-6 h-6 text-blue-500 fill-current" />
                </div>
                <p className="text-stone-500 font-medium flex items-center gap-2"><MapPin className="w-4 h-4"/> {data.mapAddressEn || data.mapAddress || 'Caldas, Antioquia'}</p>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border shadow-sm">
                   <span className="text-3xl font-black text-stone-800">{data.googleRating || '5.0'}</span>
                   <div className="flex text-amber-500"><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /></div>
                </div>
                <p className="text-sm font-bold text-stone-500 mt-2 hover:underline cursor-pointer">Based on {data.googleReviewCount || '150'}+ reviews</p>
              </div>
            </div>
            
            <div className="w-full h-[300px] relative bg-stone-200 flex items-center justify-center overflow-hidden border-t">
              <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" alt="Location Map" fill className="object-cover opacity-60 blur-[2px]" sizes="(max-width: 768px) 100vw, 800px" />
              <div className="absolute inset-0 bg-stone-900/30"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-2xl mb-4 animate-bounce">
                  <MapPin className="w-8 h-8 text-amber-500" />
                </div>
                {data.mapEmbedUrl ? (
                  <a href={data.mapEmbedUrl} target="_blank" rel="noreferrer" className="bg-stone-900 text-white font-bold py-3 px-6 rounded-xl shadow-xl transition-transform hover:scale-105 flex items-center gap-2">
                    Open in Google Maps
                  </a>
                ) : (
                  <span className="bg-white px-4 py-2 rounded-lg font-bold text-stone-500 shadow">Map not configured</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* GALERÍA CON NEXT IMAGE Y TRADUCCIONES */}
        {data.gallery && data.gallery.length > 0 && (
          <section id="galeria" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-2"><Camera className="w-8 h-8 text-amber-500" /> Gallery</h2>
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
              {data.gallery.map((item: any) => (
                <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-center bg-white rounded-2xl shadow-sm border overflow-hidden group">
                  <div className="h-48 overflow-hidden relative bg-stone-100">
                    <Image src={item.url} alt={item.titleEn || item.title || 'Horseback riding photo'} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 320px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">{item.titleEn || item.title}</h3>
                  </div>
                  {(item.descEn || item.desc) && <div className="p-4"><p className="text-stone-600 text-sm">{item.descEn || item.desc}</p></div>}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Abajo_Galeria_EN')} className="bg-green-100 text-green-700 hover:bg-green-200 font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors"><MessageCircle className="w-5 h-5"/> I like it. I want more info.</a>
            </div>
          </section>
        )}

        {/* BLOG PREVIEWS CON NEXT IMAGE */}
        {data.blogPosts && data.blogPosts.length > 0 && (
          <section id="blog" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-2"><BookOpen className="w-8 h-8 text-amber-500" /> Our Blog</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.blogPosts.slice(0, 2).map((post: any) => (
                <a key={post.id} href={`/blog/${post.slug}`} className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="relative w-full h-40 bg-stone-100">
                    <Image src={post.image || 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=800'} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-stone-800">{post.title}</h3>
                    <p className="text-stone-500 text-sm line-clamp-2">{post.metaDesc || post.content}</p>
                    <span className="text-amber-600 font-bold text-sm mt-4 block">Read article →</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-6">
              <a href="/blog" className="inline-block border-2 border-stone-200 text-stone-600 font-bold py-2 px-6 rounded-full hover:bg-stone-50">View all articles</a>
            </div>
          </section>
        )}

        {/* RESEÑAS EN INGLÉS */}
        {data.reviews && data.reviews.length > 0 && (
          <section id="reviews" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-6">Happy Riders</h2>
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
              {data.reviews.map((review: any) => (
                <div key={review.id} className="min-w-[300px] bg-white p-6 rounded-3xl shadow-sm border snap-center flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-400 mb-3">{[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                    <p className="text-stone-600 italic mb-4 text-sm leading-relaxed">"{review.textEn || review.text}"</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <span className="font-bold text-sm">{review.author}</span>
                    {review.videoUrl && <a href={review.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full"><PlayCircle className="w-4 h-4" /> Watch Video</a>}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <a href={linkCotizador} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Abajo_Reviews_EN')} className="bg-green-500 text-white hover:bg-green-600 font-bold py-3 px-8 rounded-full flex items-center gap-2 shadow-lg transition-transform hover:scale-105"><MessageCircle className="w-5 h-5"/> Join them, book here</a>
            </div>
          </section>
        )}

        {/* PREGUNTAS FRECUENTES EN INGLÉS */}
        {data.faqs && data.faqs.length > 0 && (
          <section id="faq" className="pb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {data.faqs.map((faq: any) => (
                <details key={faq.id} className="group bg-white rounded-xl border cursor-pointer overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex justify-between items-center font-bold p-5 text-stone-800 hover:bg-stone-50">{faq.qEn || faq.q}</summary>
                  <div className="text-stone-600 px-5 pb-5 bg-stone-50 pt-2 border-t">{faq.aEn || faq.a}</div>
                </details>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-stone-500 mb-4">Still have doubts?</p>
              <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Abajo_FAQ_EN')} className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"><MessageCircle className="w-5 h-5"/> Talk to an advisor now</a>
            </div>
          </section>
        )}
      </main>

      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative animate-in zoom-in duration-300">
            <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 bg-stone-100 rounded-full p-2"><X className="w-5 h-5"/></button>
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><Gift className="w-10 h-10" /></div>
            <h3 className="text-2xl font-extrabold text-stone-800 mb-2">Wait! Don't go 🐎</h3>
            <p className="text-stone-600 mb-8">Book it right now via WhatsApp and receive a <b>surprise discount</b>.</p>
            <a href={linkCotizador} target="_blank" rel="noreferrer" onClick={() => { setShowExitPopup(false); trackWhatsAppClick('Boton_Exit_Intent_EN'); }} className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg">
              Claim my discount!
            </a>
            <button onClick={() => setShowExitPopup(false)} className="mt-4 text-sm text-stone-400 font-medium">No thanks</button>
          </div>
        </div>
      )}

      <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Flotante_EN')} className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-600 hover:scale-110 transition-all z-50 hidden md:flex items-center justify-center animate-bounce"><MessageCircle className="w-8 h-8" /></a>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-2 py-3 pb-safe z-50 grid grid-cols-5 gap-1 text-center md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.08)] items-center">
        <a href={data?.navLink1 || '#inicio'} className="flex flex-col items-center text-stone-500 hover:text-amber-600"><Home className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel1En || 'Home'}</span></a>
        <a href={data?.navLink2 || '#cotizador'} className="flex flex-col items-center text-stone-500 hover:text-amber-600"><Calendar className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel2En || 'Quote'}</span></a>
        <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Nav_Movil_EN')} className="relative -mt-8 flex justify-center"><div className="bg-green-500 text-white p-4 rounded-full shadow-xl shadow-green-500/40 animate-pulse border-4 border-white"><MessageCircle className="w-7 h-7" /></div></a>
        <a href={data?.navLink3 || '#galeria'} className="flex flex-col items-center text-stone-500 hover:text-amber-600"><ImageIcon className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel3En || 'Gallery'}</span></a>
        <a href={data?.navLink4 || '#faq'} className="flex flex-col items-center text-stone-500 hover:text-amber-600"><Info className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold truncate w-full">{data?.navLabel4En || 'FAQ'}</span></a>
      </nav>
    </div>
  );
}