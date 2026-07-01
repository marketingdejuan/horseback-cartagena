"use client";
import React, { useEffect, useState } from 'react';
import { MapPin, MessageCircle, Calendar, ShieldCheck, Music, CheckCircle, Home, Info, Star, PlayCircle, Camera, X, Gift, Clock } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function ClientePage() {
const [data, setData] = useState(null);

// Estados del cotizador
const [fecha, setFecha] = useState('');
const [jinetes, setJinetes] = useState(2);
const [duracion, setDuracion] = useState('2 Horas');
const [mansos, setMansos] = useState(1);
const [briosos, setBriosos] = useState(1);
const [sonido, setSonido] = useState('Burroteca con música');
const [currentHero, setCurrentHero] = useState(0);

// Estados CRO (Ventas)
const [showExitPopup, setShowExitPopup] = useState(false);
const [hasShownPopup, setHasShownPopup] = useState(false);

// Conexión Firebase
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

// Detector de Intención de Salida (Exit Intent)
useEffect(() => {
if (data?.enableExitIntent && !hasShownPopup) {
const handleMouseLeave = (e: MouseEvent) => {
if (e.clientY <= 0) { // Si el mouse va hacia la barra de pestañas
setShowExitPopup(true);
setHasShownPopup(true);
}
};
document.addEventListener('mouseleave', handleMouseLeave);
return () => document.removeEventListener('mouseleave', handleMouseLeave);
}
}, [data, hasShownPopup]);

// Pantalla de Carga Optimizada (Skeletons)
if (!data) {
return (

















);
}

// Cálculos Matemáticos
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
const linkDescuento = "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent("¡Hola! Vi que tengo un 5% de descuento si reservo ahora mismo. 🎁 ¿Podemos revisar la disponibilidad?");
const getLinkCaballo = (nombreCaballo: string) => "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent(¡Hola! Me enamoré del caballo ${nombreCaballo} 😍. ¿Está disponible?);

const nav1 = data.navLabel1 || "Inicio"; const nav2 = data.navLabel2 || "Cotizar"; const nav3 = data.navLabel3 || "FAQ";

// Renderizado del Banner Principal
const renderHeroMedia = () => {
if (data.heroMedia && data.heroMedia.length > 0) {
return data.heroMedia.map((media: any, idx: number) => {
const isVideo = media.url.toLowerCase().includes('.mp4') || media.url.toLowerCase().includes('.webm');
const isActive = idx === currentHero;
const classes = absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isActive ? 'opacity-50 z-10' : 'opacity-0 z-0'};

    if (isVideo) return <video key={media.id} src={media.url} autoPlay loop muted playsInline className={classes} />;
    return <img key={media.id} src={media.url} alt="Cabalgata" className={classes} />;
  });
}
return <img src={data.mediaLibrary?.[0]?.url || "https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=1920"} alt="Fondo" className="absolute inset-0 w-full h-full object-cover opacity-50" />;


};

return (

<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org/", "@type": "LocalBusiness", "name": "Cabalgatas Medellín", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "125" } }) }} />

  {/* Selector de Idiomas */}
  <div className="absolute top-4 right-4 z-50 flex gap-2">
    <a href="/" className="opacity-100 hover:scale-110 transition-transform shadow-lg rounded-full overflow-hidden border-2 border-white"><img src="https://flagcdn.com/w40/co.png" alt="Español" className="w-8 h-8 object-cover" /></a>
    <a href="/en" className="opacity-50 hover:opacity-100 hover:scale-110 transition-all shadow-lg rounded-full overflow-hidden border-2 border-transparent hover:border-white"><img src="https://flagcdn.com/w40/us.png" alt="English" className="w-8 h-8 object-cover" /></a>
  </div>

  <section id="inicio" className="relative h-[80vh] bg-stone-900 overflow-hidden flex flex-col justify-between">
    {renderHeroMedia()}
    <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-900 z-10"></div>
    
    {data.promoActive && (
      <div className="relative z-20 w-full bg-amber-500/90 text-stone-900 py-2 px-4 flex justify-center text-xs md:text-sm font-bold tracking-wide text-center">
        <ShieldCheck className="w-4 h-4 mr-2 hidden md:block" /> +1,200 jinetes seguros este año • 100% Parqueadero Privado
      </div>
    )}
    
    <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-12 text-center md:text-left">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">{data.heroTitle || "Cabalgatas Ecológicas en Caldas"}</h1>
      <p className="text-stone-200 text-lg md:text-xl max-w-2xl font-medium">{data.heroSubtitle || "Conectando jinetes principiantes y expertos con paisajes espectaculares."}</p>
    </div>
  </section>

  <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
    
    {/* Cotizador y Urgencia */}
    <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-100 scroll-mt-20">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
         <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2"><Calendar className="w-6 h-6 text-amber-600" /> Cotiza y Reserva en Vivo</h2>
         
         {/* GATILLO DE URGENCIA (CRO) */}
         {data.urgencyText && (
           <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 animate-pulse border border-red-100">
             <Clock className="w-4 h-4" /> {data.urgencyText}
           </div>
         )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div><label className="block text-sm font-bold text-stone-600 mb-2">1. Selecciona la Fecha</label><input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl font-medium bg-stone-50 outline-none focus:border-amber-500 transition-colors" /></div>
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
             {mansos + briosos !== jinetes && <p className="text-red-500 text-xs mt-2 font-bold animate-bounce">La suma debe ser igual a {jinetes} jinetes.</p>}
          </div>
        </div>
        
        <div className="bg-stone-900 rounded-2xl p-6 text-white flex flex-col justify-between border border-stone-700 shadow-xl">
          <div>
            <h3 className="text-stone-400 font-bold mb-4 uppercase text-sm">Cotización Exacta</h3>
            <div className="flex justify-between items-center mb-3"><span className="text-stone-300">{jinetes} Jinetes x ${precioBase.toLocaleString()}</span><span className="font-bold text-lg">${(jinetes * precioBase).toLocaleString()}</span></div>
            {recargoGuia > 0 && <div className="flex justify-between items-center mb-3 text-amber-400 bg-amber-400/10 p-2 rounded-lg"><span>Recargo Guía (Semana)</span><span className="font-bold">+${recargoGuia.toLocaleString()}</span></div>}
            <div className="border-t border-stone-700 my-4"></div>
            <div className="flex justify-between items-end"><span className="text-lg text-stone-300">Total Inversión</span><span className="text-4xl font-extrabold text-amber-500">${totalCalculado.toLocaleString()}</span></div>
            <div className="mt-4 bg-stone-800 p-3 rounded-xl border border-stone-700"><p className="text-stone-300 text-sm flex justify-between items-center"><span>Abono hoy para reservar:</span><span className="font-bold text-white bg-stone-700 px-3 py-1 rounded-lg">${((totalCalculado * porcentajeAbono) / 100).toLocaleString()} ({porcentajeAbono}%)</span></p></div>
          </div>
          <a href={linkCotizador} target="_blank" rel="noreferrer" className="mt-8 block w-full bg-green-500 hover:bg-green-600 text-center text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg shadow-green-500/30"><MessageCircle className="w-5 h-5"/> Enviar cotización por WhatsApp</a>
        </div>
      </div>
    </section>

    {/* Galería Visual */}
    {data.gallery && data.gallery.length > 0 && (
      <section id="galeria" className="pt-4 scroll-mt-20">
        <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-2"><Camera className="w-8 h-8 text-amber-500" /> Galería de Experiencias</h2>
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

    {/* Reseñas y Caballos */}
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
                {review.videoUrl && <a href={review.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors"><PlayCircle className="w-4 h-4" /> Ver Video</a>}
              </div>
            </div>
          ))}
        </div>
      </section>
    )}

    <section id="faq" className="pb-12 scroll-mt-20">
      <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Preguntas Frecuentes</h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        {data.faqs?.map((faq: any) => (
          <details key={faq.id} className="group bg-white rounded-xl border border-stone-200 cursor-pointer overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex justify-between items-center font-bold p-5 text-stone-800 hover:bg-stone-50">{faq.q}<span className="transition group-open:rotate-180 text-amber-500"><svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg></span></summary>
            <div className="text-stone-600 px-5 pb-5 bg-stone-50 pt-2 border-t leading-relaxed">{faq.a}</div>
          </details>
        ))}
      </div>
    </section>
  </main>

  {/* Módulo Modal Exit Intent (CRO) */}
  {showExitPopup && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative animate-in zoom-in duration-300">
        <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 bg-stone-100 rounded-full p-2"><X className="w-5 h-5"/></button>
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
           <Gift className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-extrabold text-stone-800 mb-2">¡Espera! No te vayas sin montar 🐎</h3>
        <p className="text-stone-600 mb-8">Sabemos que quieres la mejor experiencia. Resérvalo ahora mismo por WhatsApp y te damos un <b>descuento sorpresa</b> o una bebida de cortesía.</p>
        <a href={linkDescuento} target="_blank" rel="noreferrer" onClick={() => setShowExitPopup(false)} className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-105">
          ¡Reclamar mi regalo por WhatsApp!
        </a>
        <button onClick={() => setShowExitPopup(false)} className="mt-4 text-sm text-stone-400 font-medium hover:text-stone-600">No gracias, pagaré precio full después</button>
      </div>
    </div>
  )}

  {/* Botones Flotantes y Navegación Móvil */}
  <a href={linkGancho} target="_blank" rel="noreferrer" className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-600 hover:scale-110 transition-all z-50 hidden md:flex items-center justify-center group animate-bounce">
     <MessageCircle className="w-8 h-8" />
     <span className="absolute right-full mr-4 bg-stone-900 text-white px-3 py-1.5 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold shadow-lg">
       ¡Reserva directa!
     </span>
  </a>

  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 pb-safe z-50 flex justify-between items-center md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
    <a href="#inicio" className="flex flex-col items-center text-stone-400 hover:text-amber-600 transition-colors"><Home className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">{nav1}</span></a>
    <a href="#cotizador" className="flex flex-col items-center text-stone-400 hover:text-amber-600 transition-colors"><Calendar className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">{nav2}</span></a>
    <a href={linkGancho} target="_blank" rel="noreferrer" className="relative -top-5 flex flex-col items-center">
      <div className="bg-green-500 text-white p-4 rounded-full shadow-[0_10px_20px_rgba(34,197,94,0.3)] active:scale-95 transition-transform animate-pulse"><MessageCircle className="w-7 h-7" /></div>
    </a>
    <a href="#faq" className="flex flex-col items-center text-stone-400 hover:text-amber-600 transition-colors"><Info className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">{nav3}</span></a>
  </nav>
</div>


);
}