"use client";
import React, { useEffect, useState } from 'react';
import { MapPin, MessageCircle, Calendar, ShieldCheck, Music, CheckCircle, Home, Info, Star, PlayCircle, Camera } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function ClientePage() {
  const [data, setData] = useState<any>(null);
  
  const [fecha, setFecha] = useState('');
  const [jinetes, setJinetes] = useState(2);
  const [duracion, setDuracion] = useState('2 Horas');
  const [mansos, setMansos] = useState(1);
  const [briosos, setBriosos] = useState(1);
  const [sonido, setSonido] = useState('Burroteca con música');
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const docRef = doc(db, "configuracion", "general");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) { setData(docSnap.data()); }
    });
    return () => unsubscribe();
  }, []);

  // Rotación del Hero
  useEffect(() => {
    if (data?.heroMedia && data.heroMedia.length > 1) {
      const interval = setInterval(() => {
        setCurrentHero((prev) => (prev + 1) % data.heroMedia.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data?.heroMedia]);

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50"><p className="text-stone-500 font-bold animate-pulse">Preparando caballos...</p></div>;
  }

  const precioBase = data.basePrice || 100000;
  const precioGuia = data.guidePrice || 80000;
  const porcentajeAbono = data.depositPercent || 50;
  let recargoGuia = 0;
  if (fecha) {
    const diaSemana = new Date(fecha + 'T12:00:00').getDay(); 
    if (diaSemana >= 1 && diaSemana <= 5) recargoGuia = precioGuia;
  }
  const totalCalculado = (jinetes * precioBase) + recargoGuia;
  const numeroWa = data.whatsappNumber || "573000000000";
  const textoCotizador = "Hola, quiero reservar el " + (fecha || 'próximo fin de semana') + " para " + jinetes + " personas (" + duracion + "). Necesito " + mansos + " caballos mansos y " + briosos + " briosos. Mi cotización dio $" + totalCalculado.toLocaleString('es-CO') + ". ¿Tienen disponibilidad?";
  
  const linkCotizador = "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent(textoCotizador);
  const linkGancho = "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent("¡Hola! Quiero vivir la mejor experiencia a caballo cerca de Medellín. 🐎✨ ¿Me regalan información?");
  const linkFaq = "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent("Hola, leí las FAQ en la web pero tengo una duda...");
  const getLinkCaballo = (nombreCaballo: string) => "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent(`¡Hola! Me enamoré del caballo ${nombreCaballo} 😍. ¿Está disponible?`);

  const nav1 = data.navLabel1 || "Inicio"; const nav2 = data.navLabel2 || "Cotizar"; const nav3 = data.navLabel3 || "FAQ";

  const renderHeroMedia = () => {
    if (data.heroMedia && data.heroMedia.length > 0) {
      return data.heroMedia.map((media: any, idx: number) => {
        const isVideo = media.url.toLowerCase().includes('.mp4') || media.url.toLowerCase().includes('.webm');
        const isActive = idx === currentHero;
        const classes = `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isActive ? 'opacity-50' : 'opacity-0'}`;
        
        if (isVideo) return <video key={media.id} src={media.url} autoPlay loop muted playsInline className={classes} />;
        return <img key={media.id} src={media.url} alt="Cabalgata" className={classes} />;
      });
    }
    // Fallback original
    return <img src={data.mediaLibrary?.[0]?.url || "https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=1920"} alt="Fondo" className="absolute inset-0 w-full h-full object-cover opacity-50" />;
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-32 md:pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org/", "@type": "LocalBusiness", "name": "Cabalgatas Medellín", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "125" } }) }} />
      
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <a href="/" className="opacity-100 hover:scale-110 transition-transform shadow-lg rounded-full overflow-hidden border-2 border-white"><img src="https://flagcdn.com/w40/co.png" alt="Español" className="w-8 h-8 object-cover" /></a>
        <a href="/en" className="opacity-50 hover:opacity-100 hover:scale-110 transition-all shadow-lg rounded-full overflow-hidden border-2 border-transparent hover:border-white"><img src="https://flagcdn.com/w40/us.png" alt="English" className="w-8 h-8 object-cover" /></a>
      </div>

      <section id="inicio" className="relative h-[80vh] bg-stone-900 overflow-hidden flex flex-col justify-between">
        {renderHeroMedia()}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-900"></div>
        
        {data.promoActive && (
          <div className="relative z-10 w-full bg-amber-500/90 text-stone-900 py-2 px-4 flex justify-center text-xs md:text-sm font-bold tracking-wide text-center">
            <ShieldCheck className="w-4 h-4 mr-2 hidden md:block" /> +1,200 jinetes seguros este año • 100% Parqueadero Privado
          </div>
        )}
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">{data.heroTitle || "Cabalgatas Ecológicas en Caldas"}</h1>
          <p className="text-stone-200 text-lg md:text-xl max-w-2xl font-medium">{data.heroSubtitle || "Conectando jinetes principiantes y expertos con paisajes espectaculares."}</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
        <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-100">
          <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2"><Calendar className="w-6 h-6 text-amber-600" /> Cotiza y Reserva en Vivo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div><label className="block text-sm font-bold text-stone-600 mb-2">1. Selecciona la Fecha</label><input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl font-medium bg-stone-50 outline-none focus:border-amber-500" /></div>
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2">2. Número de Jinetes</label>
                <div className="flex items-center gap-4 bg-stone-50 p-2 rounded-xl border border-stone-200 w-fit">
                  <button onClick={() => setJinetes(Math.max(1, jinetes - 1))} className="w-10 h-10 bg-white rounded-lg font-bold hover:bg-stone-200">-</button>
                  <span className="w-8 text-center font-bold text-xl">{jinetes}</span>
                  <button onClick={() => setJinetes(jinetes + 1)} className="w-10 h-10 bg-white rounded-lg font-bold hover:bg-stone-200">+</button>
                </div>
              </div>
              <div><label className="block text-sm font-bold text-stone-600 mb-2">3. Distribución de caballos</label>
                 <div className="flex gap-4">
                    <div className="flex-1 bg-stone-50 p-3 rounded-xl border border-stone-200"><span className="text-xs font-bold text-stone-500 block mb-2">Mansos (Principiantes)</span><input type="number" min="0" value={mansos} onChange={(e)=>setMansos(Number(e.target.value))} className="w-full p-2 border rounded-lg text-center font-bold outline-none focus:border-amber-500" /></div>
                    <div className="flex-1 bg-stone-50 p-3 rounded-xl border border-stone-200"><span className="text-xs font-bold text-stone-500 block mb-2">Briosos (Expertos)</span><input type="number" min="0" value={briosos} onChange={(e)=>setBriosos(Number(e.target.value))} className="w-full p-2 border rounded-lg text-center font-bold outline-none focus:border-amber-500" /></div>
                 </div>
                 {mansos + briosos !== jinetes && <p className="text-red-500 text-xs mt-2 font-bold animate-pulse">La suma debe ser igual a {jinetes} jinetes.</p>}
              </div>
            </div>
            <div className="bg-stone-900 rounded-2xl p-6 text-white flex flex-col justify-between border border-stone-700">
              <div>
                <h3 className="text-stone-400 font-bold mb-4 uppercase text-sm">Cotización Exacta</h3>
                <div className="flex justify-between items-center mb-3"><span className="text-stone-300">{jinetes} Jinetes x ${precioBase.toLocaleString()}</span><span className="font-bold text-lg">${(jinetes * precioBase).toLocaleString()}</span></div>
                {recargoGuia > 0 && <div className="flex justify-between items-center mb-3 text-amber-400 bg-amber-400/10 p-2 rounded-lg"><span>Recargo Guía (Semana)</span><span className="font-bold">+${recargoGuia.toLocaleString()}</span></div>}
                <div className="border-t border-stone-700 my-4"></div>
                <div className="flex justify-between items-end"><span className="text-lg text-stone-300">Total Inversión</span><span className="text-4xl font-extrabold text-amber-500">${totalCalculado.toLocaleString()}</span></div>
                <div className="mt-4 bg-stone-800 p-3 rounded-xl border border-stone-700"><p className="text-stone-300 text-sm flex justify-between"><span>Abono hoy para reservar:</span><span className="font-bold text-white">${((totalCalculado * porcentajeAbono) / 100).toLocaleString()} ({porcentajeAbono}%)</span></p></div>
              </div>
              <a href={linkCotizador} target="_blank" rel="noreferrer" className="mt-8 block w-full bg-green-500 hover:bg-green-600 text-center text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/30"><MessageCircle className="w-5 h-5"/> Enviar cotización por WhatsApp</a>
            </div>
          </div>
        </section>
        <section id="faq" className="pb-12">
          <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {data.faqs?.map((faq: any) => (
              <details key={faq.id} className="group bg-white rounded-xl border border-stone-200 cursor-pointer overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-bold p-5 text-stone-800 hover:bg-stone-50">{faq.q}<span className="transition group-open:rotate-180 text-amber-500"><svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg></span></summary>
                <div className="text-stone-600 px-5 pb-5 bg-stone-50 pt-2 border-t">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>
      </main>

      <a href={linkGancho} target="_blank" rel="noreferrer" className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-transform z-50 hidden md:flex items-center justify-center group"><MessageCircle className="w-8 h-8" /></a>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 pb-safe z-50 flex justify-between items-center md:hidden">
        <a href="#inicio" className="flex flex-col items-center text-stone-400"><Home className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">{nav1}</span></a>
        <a href="#cotizador" className="flex flex-col items-center text-stone-400"><Calendar className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">{nav2}</span></a>
        <a href={linkGancho} target="_blank" rel="noreferrer" className="relative -top-5 flex flex-col items-center"><div className="bg-green-500 text-white p-4 rounded-full shadow-lg"><MessageCircle className="w-7 h-7" /></div></a>
        <a href="#faq" className="flex flex-col items-center text-stone-400"><Info className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">{nav3}</span></a>
      </nav>
    </div>
  );
}