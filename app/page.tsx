"use client";
import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar, ShieldCheck, Info, Star, PlayCircle, Camera, X, Gift, Clock, Home } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function ClientePage() {
  const [data, setData] = useState<any>(null);
  
  // Estados del Cotizador
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00'); 
  const [jinetes, setJinetes] = useState(2);
  const [currentHero, setCurrentHero] = useState(0);
  
  // Estados de CRO (Ventas)
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  // 1. Sincronización en tiempo real con Firebase
  useEffect(() => {
    const docRef = doc(db, "configuracion", "general");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) setData(docSnap.data());
    });
    return () => unsubscribe();
  }, []);

  // 2. Rotación de Banners
  useEffect(() => {
    if (data?.heroMedia && data.heroMedia.length > 1) {
      const interval = setInterval(() => setCurrentHero((prev) => (prev + 1) % data.heroMedia.length), 5000);
      return () => clearInterval(interval);
    }
  }, [data?.heroMedia]);

  // 3. Intención de Salida (Exit Intent)
  useEffect(() => {
    if (data?.enableExitIntent && !hasShownPopup) {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) { setShowExitPopup(true); setHasShownPopup(true); }
      };
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [data, hasShownPopup]);

  // Skeleton Loader mientras carga
  if (!data) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-4 animate-pulse">
        <div className="h-64 bg-stone-200 rounded-3xl" />
        <div className="h-8 bg-stone-200 rounded-lg w-3/4" />
        <div className="h-4 bg-stone-200 rounded-lg w-full" />
      </div>
    </div>
  );

  // --- LÓGICA COMERCIAL ---
  // Fin de semana (6 = Sábado, 0 = Domingo)
  const esFinDeSemana = fecha ? [6, 0].includes(new Date(fecha + 'T12:00:00').getDay()) : false;
  const esDosPm = hora === '14:00';
  
  // Es grupal SOLAMENTE si es fin de semana Y a las 2:00 PM
  const esGrupal = esFinDeSemana && esDosPm; 
  
  const precioBase = data.basePrice || 100000;
  // Si no es grupal, se cobra el guía automáticamente
  const costoGuia = esGrupal ? 0 : (data.guidePrice || 80000); 
  const totalCalculado = (jinetes * precioBase) + costoGuia;

  const tipoCabalgataStr = esGrupal ? 'Grupal (Sin cobro extra de guía)' : 'Privada (Incluye guía exclusivo)';
  const whatsappNum = data.whatsappNumber || "573000000000";
  
  // Links de WhatsApp
  const linkCotizador = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hola, quiero reservar para el ${fecha || 'próximo fin de semana'} a las ${hora}. Somos ${jinetes} personas. Modalidad: ${esGrupal ? 'Grupal' : 'Privada'}. Cotización: $${totalCalculado.toLocaleString()}`)}`;
  const linkGancho = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("¡Hola! Quiero información sobre las cabalgatas. 🐎")}`;
  const linkRegalo = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("¡Hola! Vi el descuento sorpresa y no me quiero quedar sin montar. 🎁")}`;

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-24 md:pb-8">
      
      {/* Selector de Idiomas */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <a href="/" className="opacity-100 shadow-lg rounded-full overflow-hidden border-2 border-white"><img src="https://flagcdn.com/w40/co.png" alt="Español" className="w-8 h-8 object-cover" /></a>
        <a href="/en" className="opacity-50 hover:opacity-100 transition-all shadow-lg rounded-full overflow-hidden border-2 border-transparent hover:border-white"><img src="https://flagcdn.com/w40/us.png" alt="English" className="w-8 h-8 object-cover" /></a>
      </div>

      {/* HERO SECTION */}
      <section id="inicio" className="relative h-[80vh] bg-stone-900 overflow-hidden flex flex-col justify-end">
        {data.heroMedia && data.heroMedia.length > 0 ? (
          data.heroMedia.map((media: any, idx: number) => {
            const isVideo = media.url?.toLowerCase().includes('.mp4');
            const classes = `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentHero ? 'opacity-50' : 'opacity-0'}`;
            return isVideo 
              ? <video key={media.id} src={media.url} autoPlay loop muted playsInline className={classes} />
              : <img key={media.id} src={media.url} alt="Cabalgata" className={classes} />;
          })
        ) : (
          <div className="absolute inset-0 bg-stone-800 opacity-50"></div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent z-10"></div>
        
        {data.promoActive && (
          <div className="absolute top-0 w-full z-20 bg-amber-500/90 text-stone-900 py-2 px-4 flex justify-center text-xs md:text-sm font-bold tracking-wide text-center">
            <ShieldCheck className="w-4 h-4 mr-2 hidden md:block" /> +1,200 jinetes felices este año • Parqueadero Privado
          </div>
        )}
        
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">{data.heroTitle || "Cabalgatas Ecológicas en Caldas"}</h1>
          <p className="text-stone-200 text-lg md:text-xl max-w-2xl font-medium">{data.heroSubtitle || "Conectando jinetes principiantes y expertos con paisajes espectaculares."}</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
        
        {/* COTIZADOR */}
        <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-100 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2"><Calendar className="w-6 h-6 text-amber-600" /> Cotiza y Reserva</h2>
            {data.urgencyText && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 animate-pulse border border-red-100">
                <Clock className="w-4 h-4" /> {data.urgencyText}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2">1. Selecciona Fecha y Hora</label>
                <div className="flex gap-2">
                  <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl font-medium bg-stone-50 outline-none focus:border-amber-500" />
                  <select value={hora} onChange={(e) => setHora(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl font-medium bg-stone-50 outline-none focus:border-amber-500">
                    <option value="10:00">10:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
                {!esGrupal && fecha && <p className="text-xs text-amber-600 font-bold mt-2">*Horario/Día seleccionado aplica como Cabalgata Privada.</p>}
              </div>
              
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2">2. Número de Jinetes</label>
                <div className="flex items-center gap-4 bg-stone-50 p-2 rounded-xl border border-stone-200 w-fit">
                  <button onClick={() => setJinetes(Math.max(1, jinetes - 1))} className="w-10 h-10 bg-white rounded-lg font-bold shadow hover:bg-stone-200">-</button>
                  <span className="w-8 text-center font-bold text-xl">{jinetes}</span>
                  <button onClick={() => setJinetes(jinetes + 1)} className="w-10 h-10 bg-white rounded-lg font-bold shadow hover:bg-stone-200">+</button>
                </div>
              </div>
            </div>
            
            <div className="bg-stone-900 rounded-2xl p-6 text-white flex flex-col justify-between shadow-xl">
              <div>
                <p className="text-sm font-bold text-amber-500 mb-4 bg-amber-500/10 inline-block px-3 py-1 rounded-lg">{tipoCabalgataStr}</p>
                <div className="flex justify-between items-center mb-3"><span className="text-stone-300">{jinetes} Jinetes x ${precioBase.toLocaleString()}</span><span className="font-bold text-lg">${(jinetes * precioBase).toLocaleString()}</span></div>
                {!esGrupal && <div className="flex justify-between items-center mb-3 text-red-400 bg-red-400/10 p-2 rounded-lg border border-red-400/20"><span>Costo Guía Exclusivo</span><span className="font-bold">+${costoGuia.toLocaleString()}</span></div>}
                <div className="border-t border-stone-700 my-4"></div>
                <div className="flex justify-between items-end"><span className="text-lg text-stone-300">Total Inversión</span><span className="text-4xl font-extrabold text-amber-500">${totalCalculado.toLocaleString()}</span></div>
              </div>
              <a href={linkCotizador} target="_blank" rel="noreferrer" className="mt-8 block w-full bg-green-500 hover:bg-green-600 text-center text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg shadow-green-500/30"><MessageCircle className="w-5 h-5"/> Enviar cotización</a>
            </div>
          </div>
        </section>

        {/* GALERÍA */}
        {data.gallery && data.gallery.length > 0 && (
          <section id="galeria" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-2"><Camera className="w-8 h-8 text-amber-500" /> Experiencias</h2>
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
              {data.gallery.map((item: any) => (
                <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-center bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden group">
                  <div className="h-48 overflow-hidden relative bg-stone-100">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">{item.title}</h3>
                  </div>
                  {item.desc && <div className="p-4"><p className="text-stone-600 text-sm">{item.desc}</p></div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RESEÑAS */}
        {data.reviews && data.reviews.length > 0 && (
          <section id="reviews" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-6">Jinetes Felices</h2>
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
              {data.reviews.map((review: any) => (
                <div key={review.id} className="min-w-[300px] md:min-w-[350px] bg-white p-6 rounded-3xl shadow-sm border border-stone-100 snap-center flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-400 mb-3">{[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                    <p className="text-stone-600 italic mb-4 text-sm leading-relaxed">"{review.text}"</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                    <span className="font-bold text-stone-800 text-sm">{review.author}</span>
                    {review.videoUrl && <a href={review.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100"><PlayCircle className="w-4 h-4" /> Ver Video</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {data.faqs && data.faqs.length > 0 && (
          <section id="faq" className="pb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Preguntas Frecuentes</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {data.faqs.map((faq: any) => (
                <details key={faq.id} className="group bg-white rounded-xl border border-stone-200 cursor-pointer overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex justify-between items-center font-bold p-5 text-stone-800 hover:bg-stone-50">{faq.q}<span className="transition group-open:rotate-180 text-amber-500"><svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg></span></summary>
                  <div className="text-stone-600 px-5 pb-5 bg-stone-50 pt-2 border-t leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* POPUP EXIT INTENT */}
      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative animate-in zoom-in duration-300">
            <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 bg-stone-100 rounded-full p-2"><X className="w-5 h-5"/></button>
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><Gift className="w-10 h-10" /></div>
            <h3 className="text-2xl font-extrabold text-stone-800 mb-2">¡Espera! No te vayas 🐎</h3>
            <p className="text-stone-600 mb-8">Resérvalo ahora mismo por WhatsApp y te damos un <b>descuento sorpresa</b>.</p>
            <a href={linkRegalo} target="_blank" rel="noreferrer" onClick={() => setShowExitPopup(false)} className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-105">
              ¡Reclamar mi regalo por WhatsApp!
            </a>
            <button onClick={() => setShowExitPopup(false)} className="mt-4 text-sm text-stone-400 font-medium hover:text-stone-600">No gracias</button>
          </div>
        </div>
      )}

      {/* BOTÓN FLOTANTE Y NAVBAR MÓVIL */}
      <a href={linkGancho} target="_blank" rel="noreferrer" className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-600 hover:scale-110 transition-all z-50 hidden md:flex items-center justify-center group animate-bounce">
         <MessageCircle className="w-8 h-8" />
      </a>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 pb-safe z-50 flex justify-between items-center md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <a href="#inicio" className="flex flex-col items-center text-stone-400 hover:text-amber-600 transition-colors"><Home className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">{data.navLabel1 || 'Inicio'}</span></a>
        <a href="#cotizador" className="flex flex-col items-center text-stone-400 hover:text-amber-600 transition-colors"><Calendar className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">{data.navLabel2 || 'Cotizar'}</span></a>
        <a href={linkGancho} target="_blank" rel="noreferrer" className="relative -top-5 flex flex-col items-center">
          <div className="bg-green-500 text-white p-4 rounded-full shadow-[0_10px_20px_rgba(34,197,94,0.3)] animate-pulse"><MessageCircle className="w-7 h-7" /></div>
        </a>
        <a href="#faq" className="flex flex-col items-center text-stone-400 hover:text-amber-600 transition-colors"><Info className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">{data.navLabel3 || 'FAQ'}</span></a>
      </nav>
    </div>
  );
}