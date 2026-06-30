"use client";
import React, { useEffect, useState } from 'react';
import { MapPin, MessageCircle, Calendar, ShieldCheck, Music, CheckCircle, Home, Info, Star, PlayCircle } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function EnglishPage() {
  const [data, setData] = useState<any>(null);
  
  const [fecha, setFecha] = useState('');
  const [jinetes, setJinetes] = useState(2);
  const [duracion, setDuracion] = useState('2 Hours');
  const [mansos, setMansos] = useState(1);
  const [briosos, setBriosos] = useState(1);
  const [sonido, setSonido] = useState('Music Speaker');

  useEffect(() => {
    const docRef = doc(db, "configuracion", "general");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-500 font-bold animate-pulse">Saddling horses...</p>
      </div>
    );
  }

  const precioBase = data.basePrice || 100000;
  const precioGuia = data.guidePrice || 80000;
  const porcentajeAbono = data.depositPercent || 50;
  let recargoGuia = 0;
  if (fecha) {
    const dateObj = new Date(fecha + 'T12:00:00');
    const diaSemana = dateObj.getDay(); 
    if (diaSemana >= 1 && diaSemana <= 5) { recargoGuia = precioGuia; }
  }
  
  const totalCalculado = (jinetes * precioBase) + recargoGuia;
  const abonoRequerido = totalCalculado * (porcentajeAbono / 100);

  const numeroWa = data.whatsappNumber || "573000000000";
  const textoCotizador = "Hi, I want to book a ride for " + (fecha || 'next weekend') + " for " + jinetes + " people (" + duracion + "). I need " + mansos + " calm horses and " + briosos + " spirited ones. Sound: " + sonido + ". My quote is $" + totalCalculado.toLocaleString('es-CO') + " COP. Do you have availability?";
  const linkCotizador = "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent(textoCotizador);
  const textoGancho = "Hi! I want to live the best horseback riding experience near Medellin. 🐎✨ Could you give me more information about availability?";
  const linkGancho = "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent(textoGancho);
  const textoFaq = "Hi, I was reading the FAQs on the website but I have an additional question...";
  const linkFaq = "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent(textoFaq);
  const getLinkCaballo = (nombreCaballo: string) => {
     const texto = `Hi! I fell in love with the horse ${nombreCaballo} 😍. Is it available for my next ride?`;
     return "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent(texto);
  };

  const totalReviews = (data.reviews?.length || 0) + 124;return (
    <div className="min-h-screen bg-stone-50 font-sans pb-32 md:pb-12">
      
      {/* SCHEMA MARKUP PARA GOOGLE (Estrellas Amarillas) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "LocalBusiness",
            "name": "Horseback Riding Medellin",
            "image": data.mediaLibrary?.[0]?.url || "https://cabalgatamedellin.com/logo.jpg",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": totalReviews.toString()
            }
          })
        }}
      />

      {/* --- LANGUAGE SWITCHER --- */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <a href="/" className="opacity-50 hover:opacity-100 hover:scale-110 transition-all shadow-lg rounded-full overflow-hidden border-2 border-transparent hover:border-white">
          <img src="https://flagcdn.com/w40/co.png" alt="Español" className="w-8 h-8 object-cover" />
        </a>
        <a href="/en" className="opacity-100 hover:scale-110 transition-transform shadow-lg rounded-full overflow-hidden border-2 border-white">
          <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-8 h-8 object-cover" />
        </a>
      </div>

      <section id="inicio" className="relative h-[80vh] bg-stone-900 overflow-hidden flex flex-col justify-between">
        <img src={data.mediaLibrary?.[0]?.url || "https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=1920"} alt="Fondo Cabalgata" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-900"></div>
        
        {data.promoActive && (
          <div className="relative z-10 w-full bg-amber-500/90 text-stone-900 py-2 px-4 flex justify-center text-xs md:text-sm font-bold tracking-wide text-center">
            <ShieldCheck className="w-4 h-4 mr-2 hidden md:block" /> +1,200 safe riders this year • 100% Private Parking • 30 mins from Medellin
          </div>
        )}
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">Ecological Horseback Riding near Medellin</h1>
          <p className="text-stone-200 text-lg md:text-xl max-w-2xl font-medium">Connecting beginners and experts with the stunning mountain landscapes of the Aburrá Valley.</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
        <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-100">
          <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2"><Calendar className="w-6 h-6 text-amber-600" /> Live Quote & Booking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2">1. Select Date</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl font-medium bg-stone-50 outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2">2. Number of Riders</label>
                <div className="flex items-center gap-4 bg-stone-50 p-2 rounded-xl border border-stone-200 w-fit">
                  <button onClick={() => setJinetes(Math.max(1, jinetes - 1))} className="w-10 h-10 bg-white rounded-lg font-bold hover:bg-stone-200">-</button>
                  <span className="w-8 text-center font-bold text-xl">{jinetes}</span>
                  <button onClick={() => setJinetes(jinetes + 1)} className="w-10 h-10 bg-white rounded-lg font-bold hover:bg-stone-200">+</button>
                </div>
              </div>
              <div>
                 <label className="block text-sm font-bold text-stone-600 mb-2">3. Duration</label>
                 <select value={duracion} onChange={(e) => setDuracion(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl bg-stone-50 outline-none focus:border-amber-500">
                   <option>1 Hour</option><option>2 Hours (Recommended)</option><option>3 Hours</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-bold text-stone-600 mb-2">4. Horse Distribution</label>
                 <div className="flex gap-4">
                    <div className="flex-1 bg-stone-50 p-3 rounded-xl border border-stone-200">
                       <span className="text-xs font-bold text-stone-500 block mb-2">Calm (Beginners)</span>
                       <input type="number" min="0" value={mansos} onChange={(e)=>setMansos(Number(e.target.value))} className="w-full p-2 border rounded-lg text-center font-bold outline-none focus:border-amber-500" />
                    </div>
                    <div className="flex-1 bg-stone-50 p-3 rounded-xl border border-stone-200">
                       <span className="text-xs font-bold text-stone-500 block mb-2">Spirited (Experts)</span>
                       <input type="number" min="0" value={briosos} onChange={(e)=>setBriosos(Number(e.target.value))} className="w-full p-2 border rounded-lg text-center font-bold outline-none focus:border-amber-500" />
                    </div>
                 </div>
                 {mansos + briosos !== jinetes && <p className="text-red-500 text-xs mt-2 font-bold animate-pulse">The sum must equal {jinetes} riders.</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2">5. Sound / Vibe</label>
                <select value={sonido} onChange={(e) => setSonido(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl bg-stone-50 outline-none focus:border-amber-500">
                   <option>Music Speaker (Included)</option><option>Connect my Bluetooth/USB</option><option>I prefer peaceful silence</option>
                 </select>
              </div>
            </div>

            <div className="bg-stone-900 rounded-2xl p-6 text-white flex flex-col justify-between border border-stone-700">
              <div>
                <h3 className="text-stone-400 font-bold mb-4 uppercase text-sm">Exact Quote</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-stone-300">{jinetes} Riders x ${precioBase.toLocaleString()} COP</span>
                  <span className="font-bold text-lg">${(jinetes * precioBase).toLocaleString()} COP</span>
                </div>
                {recargoGuia > 0 && (
                  <div className="flex justify-between items-center mb-3 text-amber-400 bg-amber-400/10 p-2 rounded-lg">
                    <span>Guide Surcharge (Weekday)</span>
                    <span className="font-bold">+${recargoGuia.toLocaleString()} COP</span>
                  </div>
                )}
                <div className="border-t border-stone-700 my-4"></div>
                <div className="flex justify-between items-end">
                  <span className="text-lg text-stone-300">Total Investment</span>
                  <span className="text-4xl font-extrabold text-amber-500">${totalCalculado.toLocaleString()}</span>
                </div>
                <div className="mt-4 bg-stone-800 p-3 rounded-xl border border-stone-700">
                   <p className="text-stone-300 text-sm flex justify-between">
                     <span>Deposit to book today:</span>
                     <span className="font-bold text-white">${abonoRequerido.toLocaleString()} COP ({porcentajeAbono}%)</span>
                   </p>
                </div>
              </div>
              <a href={linkCotizador} target="_blank" rel="noreferrer" className="mt-8 block w-full bg-green-500 hover:bg-green-600 text-center text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/30">
                <MessageCircle className="w-5 h-5"/> Send quote via WhatsApp
              </a>
            </div>
          </div>
        </section>
        <section id="recorrido">
          <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">The Route in Caldas</h2>
          <div className="flex flex-col md:flex-row justify-between relative gap-6 md:gap-0">
            <div className="absolute top-6 left-0 w-full h-1 bg-amber-200 hidden md:block -z-10"></div>
            {[
              { t: 'Starting Point', d: 'Stables in Caldas. Safe free parking.' },
              { t: 'Into the Wild', d: 'Ecological trails and dense pine forests.' },
              { t: 'Wildlife & Water', d: 'Bird watching and crossing 2 rivers on horseback.' },
              { t: 'Countryside Return', d: 'Slow, peaceful ride guided by an expert.' }
            ].map((paso, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center px-4">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 z-10 shadow-md">{i + 1}</div>
                <h3 className="font-bold text-stone-800 mb-2">{paso.t}</h3>
                <p className="text-stone-600 text-sm">{paso.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="equinos">
          <h2 className="text-3xl font-bold text-stone-800 mb-2">Meet your companion</h2>
          <p className="text-stone-500 mb-8 text-lg">We have the perfect horse for your experience level.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.horses?.map((horse: any) => (
              <div key={horse.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border group flex flex-col">
                <div className="h-48 relative">
                  <img src={horse.photo || 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400'} alt={horse.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${horse.type === 'Manso' ? 'bg-blue-500' : 'bg-red-500'}`}>
                    {horse.type === 'Manso' ? 'Calm 🐴' : 'Spirited 🐎'}
                  </span>
                </div>
                <div className="p-4 text-center flex-1 flex flex-col justify-between">
                  <h3 className="font-extrabold text-stone-800 text-lg mb-3">{horse.name}</h3>
                  <a href={getLinkCaballo(horse.name)} target="_blank" rel="noreferrer" className="bg-green-50 text-green-700 hover:bg-green-500 hover:text-white border border-green-200 font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors">
                    <MessageCircle className="w-4 h-4"/> I want this one!
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- REVIEWS & SOCIAL PROOF EN INGLES --- */}
        {data.reviews && data.reviews.length > 0 && (
          <section id="reviews" className="pt-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-stone-800 mb-2">Happy Riders</h2>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500"><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/></div>
                  <span className="font-bold text-stone-600">4.9/5 on Google</span>
                </div>
              </div>
              <a href="https://google.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline text-sm">See all reviews →</a>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
              {data.reviews.map((review: any) => (
                <div key={review.id} className="min-w-[300px] md:min-w-[350px] bg-white p-6 rounded-3xl shadow-sm border border-stone-100 snap-center flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-400 mb-3">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-stone-600 italic mb-4 text-sm leading-relaxed">"{review.text}"</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                    <span className="font-bold text-stone-800 text-sm">{review.author}</span>
                    {review.videoUrl && (
                      <a href={review.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors">
                        <PlayCircle className="w-4 h-4" /> Watch Video
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        <section className="bg-amber-50 rounded-3xl p-6 md:p-8 border border-amber-100 flex flex-col md:flex-row items-center gap-8">
          <div className="bg-amber-100 p-6 rounded-full text-amber-600 shrink-0"><Music className="w-12 h-12" /></div>
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-3">Our Famous "Burroteca" 🎶</h2>
            <p className="text-stone-600 mb-4 text-lg">We bring a specialized equestrian speaker to add rhythm to the ride.</p>
            <ul className="text-stone-700 space-y-2 font-medium">
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500"/> Connect your phone via Bluetooth or USB.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-amber-500"/> Silence options to just enjoy nature.</li>
            </ul>
          </div>
        </section>

        <section id="faq" className="pb-12">
          <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {data.faqs?.map((faq: any) => (
              <details key={faq.id} className="group bg-white rounded-xl border border-stone-200 cursor-pointer overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-bold p-5 text-stone-800 hover:bg-stone-50">
                  {faq.q}
                  <span className="transition group-open:rotate-180 text-amber-500">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="text-stone-600 px-5 pb-5 bg-stone-50 pt-2 border-t">{faq.a}</div>
              </details>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <a href={linkFaq} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 px-6 rounded-xl transition-colors border border-stone-200">
              <MessageCircle className="w-5 h-5 text-green-500"/> I have another question
            </a>
          </div>
        </section>
      </main>

      <a href={linkGancho} target="_blank" rel="noreferrer" className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-transform z-50 hidden md:flex items-center justify-center group">
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-stone-900 text-white px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold">
          Book now!
        </span>
      </a>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 pb-safe z-50 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:hidden">
        <a href="#inicio" className="flex flex-col items-center text-stone-400 hover:text-amber-600">
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Home</span>
        </a>
        <a href="#cotizador" className="flex flex-col items-center text-stone-400 hover:text-amber-600">
          <Calendar className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Quote</span>
        </a>
        <a href={linkGancho} target="_blank" rel="noreferrer" className="relative -top-5 flex flex-col items-center">
          <div className="bg-green-500 text-white p-4 rounded-full shadow-lg shadow-green-500/40 active:scale-95 transition-transform">
            <MessageCircle className="w-7 h-7" />
          </div>
        </a>
        <a href="#faq" className="flex flex-col items-center text-stone-400 hover:text-amber-600">
          <Info className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">FAQ</span>
        </a>
      </nav>

    </div>
  );
}