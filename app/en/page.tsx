"use client";
import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar, ShieldCheck, Info, Star, PlayCircle, Camera, X, Gift, Clock, Home, MapPin, BadgeCheck } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function EnglishPage() {
  const [data, setData] = useState<any>(null);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00'); 
  const [jinetes, setJinetes] = useState(2);
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "configuracion", "general"), (docSnap) => {
      if (docSnap.exists()) setData(docSnap.data());
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (data?.heroMedia && data.heroMedia.length > 1) {
      const interval = setInterval(() => setCurrentHero((prev) => (prev + 1) % data.heroMedia.length), 5000);
      return () => clearInterval(interval);
    }
  }, [data?.heroMedia]);

  if (!data) return <div className="min-h-screen bg-stone-50 flex items-center justify-center animate-pulse"><div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>;

  const esFinDeSemana = fecha ? [6, 0].includes(new Date(fecha + 'T12:00:00').getDay()) : false;
  const esDosPm = hora === '14:00';
  const esGrupal = esFinDeSemana && esDosPm; 
  
  const precioBase = data.basePrice || 100000;
  const costoGuia = esGrupal ? 0 : (data.guidePrice || 80000); 
  const totalCalculado = (jinetes * precioBase) + costoGuia;

  const tipoCabalgataStr = esGrupal ? 'Group Ride (No extra guide fee)' : 'Private Ride (Includes exclusive guide)';
  const whatsappNum = data.whatsappNumber || "573000000000";
  
  const linkCotizador = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hi, I want to book for ${fecha || 'next weekend'} at ${hora}. We are ${jinetes} riders. Mode: ${esGrupal ? 'Group' : 'Private'}. Quote: $${totalCalculado.toLocaleString()} COP`)}`;
  const linkGancho = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("Hi! I would like more information about the horseback riding. 🐎")}`;

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-24 md:pb-8">
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <a href="/" className="opacity-50 hover:opacity-100 transition-all shadow-lg rounded-full overflow-hidden border-2 border-transparent hover:border-white"><img src="https://flagcdn.com/w40/co.png" className="w-8 h-8 object-cover" /></a>
        <a href="/en" className="opacity-100 shadow-lg rounded-full overflow-hidden border-2 border-white"><img src="https://flagcdn.com/w40/us.png" className="w-8 h-8 object-cover" /></a>
      </div>

      <section id="inicio" className="relative h-[80vh] bg-stone-900 overflow-hidden flex flex-col justify-end">
        {data.heroMedia?.map((media: any, idx: number) => {
          const isVideo = media.url?.toLowerCase().includes('.mp4');
          const classes = `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentHero ? 'opacity-50' : 'opacity-0'}`;
          return isVideo ? <video key={idx} src={media.url} autoPlay loop muted playsInline className={classes} /> : <img key={idx} src={media.url} className={classes} />;
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent z-10"></div>
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">{data.heroTitleEn || "Horseback Riding Medellín"}</h1>
          <p className="text-stone-200 text-lg md:text-xl font-medium">{data.heroSubtitleEn || "Unforgettable experiences."}</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
        <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-100 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-2"><Calendar className="text-amber-600" /> Book Your Ride</h2>
            {data.urgencyTextEn && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold animate-pulse flex items-center gap-2"><Clock className="w-4 h-4"/>{data.urgencyTextEn}</div>}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2">1. Select Date and Time</label>
                <div className="flex gap-2">
                  <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl bg-stone-50 outline-none focus:border-amber-500" />
                  <select value={hora} onChange={(e) => setHora(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl bg-stone-50 outline-none focus:border-amber-500">
                    <option value="10:00">10:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
                {!esGrupal && fecha && <p className="text-xs text-amber-600 font-bold mt-2">*This schedule applies as a Private Ride.</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2">2. Number of Riders</label>
                <div className="flex items-center gap-4 bg-stone-50 p-2 rounded-xl border border-stone-200 w-fit">
                  <button onClick={() => setJinetes(Math.max(1, jinetes - 1))} className="w-10 h-10 bg-white rounded-lg font-bold shadow">-</button>
                  <span className="w-8 text-center font-bold text-xl">{jinetes}</span>
                  <button onClick={() => setJinetes(jinetes + 1)} className="w-10 h-10 bg-white rounded-lg font-bold shadow">+</button>
                </div>
              </div>
            </div>
            
            <div className="bg-stone-900 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between">
              <div>
                <p className="text-sm font-bold text-amber-500 mb-4 bg-amber-500/10 inline-block px-3 py-1 rounded-lg">{tipoCabalgataStr}</p>
                <div className="flex justify-between items-center mb-3"><span className="text-stone-300">{jinetes} Riders x ${precioBase.toLocaleString()}</span><span className="font-bold text-lg">${(jinetes * precioBase).toLocaleString()}</span></div>
                {!esGrupal && <div className="flex justify-between items-center mb-3 text-red-400 bg-red-400/10 p-2 rounded-lg border border-red-400/20"><span>Exclusive Guide Fee</span><span className="font-bold">+${costoGuia.toLocaleString()}</span></div>}
                <div className="border-t border-stone-700 my-4"></div>
                <div className="flex justify-between items-end"><span className="text-lg text-stone-300">Total (COP)</span><span className="text-4xl font-extrabold text-amber-500">${totalCalculado.toLocaleString()}</span></div>
              </div>
              <a href={linkCotizador} target="_blank" rel="noreferrer" className="mt-8 block w-full bg-green-500 hover:bg-green-600 text-center text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"><MessageCircle className="w-5 h-5"/> Send via WhatsApp</a>
            </div>
          </div>
        </section>

        {/* GOOGLE MAPS AND TRUST */}
        <section id="ubicacion" className="pt-4 scroll-mt-20">
          <div className="bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-stone-50 to-white">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-extrabold text-stone-800">{data.businessName || 'Cabalgatas Medellín'}</h2>
                  <BadgeCheck className="w-6 h-6 text-blue-500 fill-current" />
                </div>
                <p className="text-stone-500 font-medium flex items-center gap-2"><MapPin className="w-4 h-4"/> {data.mapAddressEn || 'Caldas, Antioquia'}</p>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border shadow-sm">
                   <span className="text-3xl font-black text-stone-800">{data.googleRating || '5.0'}</span>
                   <div className="flex text-amber-500">
                      <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                   </div>
                </div>
                <p className="text-sm font-bold text-stone-500 mt-2">Based on {data.googleReviewCount || '150'}+ Google reviews</p>
              </div>
            </div>
            <div className="w-full h-[400px] bg-stone-200">
              {data.mapEmbedUrl ? (
                <iframe src={data.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400 font-bold">Map not configured</div>
              )}
            </div>
          </div>
        </section>

        {data.gallery && data.gallery.length > 0 && (
          <section id="galeria" className="pt-4 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-2"><Camera className="w-8 h-8 text-amber-500" /> Photo Gallery</h2>
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
              {data.gallery.map((item: any) => (
                <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-center bg-white rounded-2xl shadow-sm border overflow-hidden group">
                  <div className="h-48 overflow-hidden relative bg-stone-100">
                    <img src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">{item.titleEn}</h3>
                  </div>
                  {item.descEn && <div className="p-4"><p className="text-stone-600 text-sm">{item.descEn}</p></div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.faqs && data.faqs.length > 0 && (
          <section id="faq" className="pb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {data.faqs.map((faq: any) => (
                <details key={faq.id} className="group bg-white rounded-xl border cursor-pointer overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex justify-between items-center font-bold p-5 text-stone-800 hover:bg-stone-50">{faq.qEn}</summary>
                  <div className="text-stone-600 px-5 pb-5 bg-stone-50 pt-2 border-t">{faq.aEn}</div>
                </details>
              ))}
            </div>
          </section>
        )}
      </main>

      <a href={linkGancho} target="_blank" rel="noreferrer" className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-600 hover:scale-110 transition-all z-50 hidden md:flex items-center justify-center animate-bounce"><MessageCircle className="w-8 h-8" /></a>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-3 pb-safe z-50 flex justify-between items-center md:hidden">
        <a href="#inicio" className="flex flex-col items-center text-stone-400"><Home className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">{data.navLabel1En || 'Home'}</span></a>
        <a href="#cotizador" className="flex flex-col items-center text-stone-400"><Calendar className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">{data.navLabel2En || 'Quote'}</span></a>
        <a href={linkGancho} target="_blank" rel="noreferrer" className="relative -top-5 flex flex-col items-center"><div className="bg-green-500 text-white p-4 rounded-full shadow-lg"><MessageCircle className="w-7 h-7" /></div></a>
        <a href="#faq" className="flex flex-col items-center text-stone-400"><Info className="w-6 h-6 mb-1" /><span className="text-[10px] font-bold">{data.navLabel3En || 'FAQ'}</span></a>
      </nav>
    </div>
  );
}


