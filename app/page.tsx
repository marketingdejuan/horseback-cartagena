"use client";
import React, { useEffect, useState } from 'react';
import { MapPin, Star, MessageCircle, Info, Home, Map } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function ClientePage() {
const [data, setData] = useState(null);

// Escuchar la base de datos en tiempo real
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
return Cargando experiencia...;
}

const waLink = https://wa.me/${data.whatsappNumber}?text=Hola,%20me%20gustaría%20información%20sobre%20las%20cabalgatas;

return (
// pb-20 es VITAL para que la barra inferior no tape el contenido del final


  {/* 1. HERO SECTION */}
  <section id="inicio" className="relative h-[70vh] bg-stone-900 rounded-b-[2.5rem] overflow-hidden flex items-end p-6 md:p-12">
    <img 
      src={data.gallery && data.gallery.length > 0 ? data.gallery[0] : 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=800'} 
      alt="Cabalgata" 
      className="absolute inset-0 w-full h-full object-cover opacity-60"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
    <div className="relative z-10 w-full max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 leading-tight">
        {data.heroTitle}
      </h1>
      <p className="text-stone-300 text-lg md:text-xl mb-6 max-w-lg">
        {data.heroSubtitle}
      </p>
      <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-full hover:bg-green-600 transition-transform active:scale-95 shadow-lg shadow-green-500/30">
        <MessageCircle className="w-5 h-5" /> Reservar Ahora
      </a>
    </div>
  </section>

  <main className="max-w-4xl mx-auto px-4 md:px-0 mt-8 space-y-12">
    
    {/* 2. SOBRE NOSOTROS */}
    <section id="info" className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-stone-100">
      <h2 className="text-2xl font-bold text-stone-800 mb-4 flex items-center gap-2">
        <Info className="w-6 h-6 text-amber-600" /> Sobre Nosotros
      </h2>
      <p className="text-stone-600 leading-relaxed text-lg">
        {data.aboutText}
      </p>
    </section>

    {/* 3. RUTAS Y PRECIOS */}
    <section id="rutas">
      <h2 className="text-2xl font-bold text-stone-800 mb-6 px-2 flex items-center gap-2">
        <Map className="w-6 h-6 text-amber-600" /> Nuestras Rutas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.routes?.map((route: any) => (
          <div key={route.id} className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex justify-between items-center hover:border-amber-200 transition-colors">
            <div>
              <h3 className="font-bold text-stone-800 text-lg">{route.title}</h3>
              <p className="text-stone-500 text-sm flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" /> {route.duration}
              </p>
            </div>
            <div className="text-right">
              <span className="block font-extrabold text-amber-600 text-xl">${route.price}</span>
              <span className="text-xs text-stone-400">COP</span>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* 4. GALERÍA */}
    <section id="galeria">
      <h2 className="text-2xl font-bold text-stone-800 mb-6 px-2">Galería</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {data.gallery?.slice(1).map((url: string, index: number) => (
          <img key={index} src={url} alt={`Cabalgata ${index}`} className="w-full h-32 md:h-48 object-cover rounded-xl shadow-sm" />
        ))}
      </div>
    </section>

    {/* 5. TESTIMONIOS */}
    <section id="testimonios" className="pb-8">
      <h2 className="text-2xl font-bold text-stone-800 mb-6 px-2">Lo que dicen</h2>
      <div className="space-y-4">
        {data.reviews?.map((review: any) => (
          <div key={review.id} className="bg-stone-100 p-5 rounded-2xl">
            <div className="flex text-amber-500 mb-2">
              <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
            </div>
            <p className="italic text-stone-600 mb-2">"{review.text}"</p>
            <p className="font-bold text-sm text-stone-800">- {review.name}</p>
          </div>
        ))}
      </div>
    </section>
  </main>

  {/* 🌟 BARRA INFERIOR FIJA (ESTILO APP MÓVIL) 🌟 */}
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 pb-safe z-50 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:hidden">
    <a href="#inicio" className="flex flex-col items-center text-stone-400 hover:text-amber-600">
      <Home className="w-6 h-6 mb-1" />
      <span className="text-[10px] font-bold">Inicio</span>
    </a>
    <a href="#rutas" className="flex flex-col items-center text-stone-400 hover:text-amber-600">
      <Map className="w-6 h-6 mb-1" />
      <span className="text-[10px] font-bold">Rutas</span>
    </a>
    <a href={waLink} target="_blank" rel="noreferrer" className="relative -top-5 flex flex-col items-center">
      <div className="bg-green-500 text-white p-4 rounded-full shadow-lg shadow-green-500/40 active:scale-95 transition-transform">
        <MessageCircle className="w-7 h-7" />
      </div>
    </a>
    <a href="#info" className="flex flex-col items-center text-stone-400 hover:text-amber-600">
      <Info className="w-6 h-6 mb-1" />
      <span className="text-[10px] font-bold">Info</span>
    </a>
  </nav>

</div>


);
}