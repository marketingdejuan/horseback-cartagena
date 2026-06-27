"use client";
import React, { useEffect, useState } from 'react';
import { MapPin, MessageCircle, Calendar, ShieldCheck, Music, CheckCircle, Home, Info } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function ClientePage() {
const [data, setData] = useState(null);

// Estado del Cotizador Interactivo
const [fecha, setFecha] = useState('');
const [jinetes, setJinetes] = useState(2);
const [duracion, setDuracion] = useState('2 Horas');
const [mansos, setMansos] = useState(1);
const [briosos, setBriosos] = useState(1);
const [sonido, setSonido] = useState('Burroteca con música');

// Conexión a Firebase en tiempo real
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

Preparando caballos...

);
}

// Lógica Matemática de Precios
const precioBase = data.basePrice || 100000;
const precioGuia = data.guidePrice || 80000;
const porcentajeAbono = data.depositPercent || 50;

let recargoGuia = 0;
if (fecha) {
const dateObj = new Date(fecha + 'T12:00:00');
const diaSemana = dateObj.getDay();
// Si es Lunes (1) a Viernes (5), se cobra el guía
if (diaSemana >= 1 && diaSemana <= 5) {
recargoGuia = precioGuia;
}
}

const totalCalculado = (jinetes * precioBase) + recargoGuia;
const abonoRequerido = totalCalculado * (porcentajeAbono / 100);

// Generador de Link de WhatsApp
const numeroWa = data.whatsappNumber || "573000000000";
const textoMensaje = "Hola, quiero reservar el " + (fecha || 'próximo fin de semana') + " para " + jinetes + " personas (" + duracion + "). Necesito " + mansos + " caballos mansos y " + briosos + " briosos. Sonido: " + sonido + ". Mi cotización dio $" + totalCalculado.toLocaleString('es-CO') + ". ¿Tienen disponibilidad?";
const linkReserva = "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent(textoMensaje);

// Labels dinámicos de la barra de navegación
const nav1 = data.navLabel1 || "Inicio";
const nav2 = data.navLabel2 || "Cotizar";
const nav3 = data.navLabel3 || "FAQ";

return (

{/* HERO SECTION */}

<img
src={data.mediaLibrary?.[0]?.url || "https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=1920"}
alt="Fondo Cabalgata"
className="absolute inset-0 w-full h-full object-cover opacity-50"
/>


    {data.promoActive && (
      <div className="relative z-10 w-full bg-amber-500/90 text-stone-900 py-2 px-4 flex justify-center text-xs md:text-sm font-bold tracking-wide text-center">
        <ShieldCheck className="w-4 h-4 mr-2 hidden md:block" /> +1,200 jinetes seguros este año • 100% Parqueadero Privado • A 30 mins de Medellín
      </div>
    )}

    <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 text-center md:text-left">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
        {data.heroTitle || "Cabalgatas Ecológicas en Caldas, Antioquia"}
      </h1>
      <p className="text-stone-200 text-lg md:text-xl max-w-2xl font-medium">
        {data.heroSubtitle || "Conectando jinetes principiantes y expertos con los paisajes montañosos del sur del Valle de Aburrá."}
      </p>
    </div>
  </section>

  <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
    
    {/* COTIZADOR INTERACTIVO */}
    <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-100">
      <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-amber-600" /> Cotiza y Reserva en Vivo
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-stone-600 mb-2">1. Selecciona la Fecha</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl font-medium bg-stone-50 outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-stone-600 mb-2">2. Número de Jinetes</label>
            <div className="flex items-center gap-4 bg-stone-50 p-2 rounded-xl border border-stone-200 w-fit">
              <button onClick={() => setJinetes(Math.max(1, jinetes - 1))} className="w-10 h-10 bg-white rounded-lg font-bold hover:bg-stone-200">-</button>
              <span className="w-8 text-center font-bold text-xl">{jinetes}</span>
              <button onClick={() => setJinetes(jinetes + 1)} className="w-10 h-10 bg-white rounded-lg font-bold hover:bg-stone-200">+</button>
            </div>
          </div>
          <div>
             <label className="block text-sm font-bold text-stone-600 mb-2">3. Duración</label>
             <select value={duracion} onChange={(e) => setDuracion(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl bg-stone-50 outline-none focus:border-amber-500">
               <option>1 Hora</option>
               <option>2 Horas (Recomendada)</option>
               <option>3 Horas</option>
             </select>
          </div>
          <div>
             <label className="block text-sm font-bold text-stone-600 mb-2">4. Distribución de caballos</label>
             <div className="flex gap-4">
                <div className="flex-1 bg-stone-50 p-3 rounded-xl border border-stone-200">
                   <span className="text-xs font-bold text-stone-500 block mb-2">Mansos (Principiantes)</span>
                   <input type="number" min="0" value={mansos} onChange={(e)=>setMansos(Number(e.target.value))} className="w-full p-2 border rounded-lg text-center font-bold outline-none focus:border-amber-500" />
                </div>
                <div className="flex-1 bg-stone-50 p-3 rounded-xl border border-stone-200">
                   <span className="text-xs font-bold text-stone-500 block mb-2">Briosos (Expertos)</span>
                   <input type="number" min="0" value={briosos} onChange={(e)=>setBriosos(Number(e.target.value))} className="w-full p-2 border rounded-lg text-center font-bold outline-none focus:border-amber-500" />
                </div>
             </div>
             {mansos + briosos !== jinetes && (
               <p className="text-red-500 text-xs mt-2 font-bold animate-pulse">La suma debe ser igual a {jinetes} jinetes.</p>
             )}
          </div>
          <div>
            <label className="block text-sm font-bold text-stone-600 mb-2">5. Sonido / Ambiente</label>
            <select value={sonido} onChange={(e) => setSonido(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl bg-stone-50 outline-none focus:border-amber-500">
               <option>Burroteca con música</option>
               <option>Conectar mi USB/Bluetooth</option>
               <option>Prefiero silencio campestre</option>
             </select>
          </div>
        </div>

        <div className="bg-stone-900 rounded-2xl p-6 text-white flex flex-col justify-between border border-stone-700">
          <div>
            <h3 className="text-stone-400 font-bold mb-4 uppercase text-sm">Cotización Exacta</h3>
            <div className="flex justify-between items-center mb-3">
              <span className="text-stone-300">{jinetes} Jinetes x ${precioBase.toLocaleString()}</span>
              <span className="font-bold text-lg">${(jinetes * precioBase).toLocaleString()}</span>
            </div>
            {recargoGuia > 0 && (
              <div className="flex justify-between items-center mb-3 text-amber-400 bg-amber-400/10 p-2 rounded-lg">
                <span>Recargo Guía (Semana)</span>
                <span className="font-bold">+${recargoGuia.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-stone-700 my-4"></div>
            <div className="flex justify-between items-end">
              <span className="text-lg text-stone-300">Total Inversión</span>
              <span className="text-4xl font-extrabold text-amber-500">${totalCalculado.toLocaleString()}</span>
            </div>
            <div className="mt-4 bg-stone-800 p-3 rounded-xl border border-stone-700">
               <p className="text-stone-300 text-sm flex justify-between">
                 <span>Abono hoy para reservar:</span>
                 <span className="font-bold text-white">${abonoRequerido.toLocaleString()} ({porcentajeAbono}%)</span>
               </p>
            </div>
          </div>

          <a href={linkReserva} target="_blank" rel="noreferrer" className="mt-8 block w-full bg-green-500 hover:bg-green-600 text-center text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/30">
            <MessageCircle className="w-5 h-5"/> Enviar cotización por WhatsApp
          </a>
        </div>
      </div>
    </section>

    {/* MAPA RECORRIDO */}
    <section id="recorrido">
      <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">El Recorrido en Caldas</h2>
      <div className="flex flex-col md:flex-row justify-between relative gap-6 md:gap-0">
        <div className="absolute top-6 left-0 w-full h-1 bg-amber-200 hidden md:block -z-10"></div>
        {[
          { t: 'Punto de Partida', d: 'Pesebrera en Caldas. Parqueadero gratuito seguro.' },
          { t: 'Adentramiento', d: 'Senderos ecológicos y densos bosques de pino.' },
          { t: 'Fauna y Agua', d: 'Avistamiento de aves y cruce a caballo de 2 ríos.' },
          { t: 'Regreso Campestre', d: 'Paso lento y campestre guiado por chalán experto.' }
        ].map((paso, i) => (
          <div key={i} className="flex-1 flex flex-col items-center text-center px-4">
            <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 z-10 shadow-md">{i + 1}</div>
            <h3 className="font-bold text-stone-800 mb-2">{paso.t}</h3>
            <p className="text-stone-600 text-sm">{paso.d}</p>
          </div>
        ))}
      </div>
    </section>

    {/* VITRINA DE EQUINOS */}
    <section id="equinos">
      <h2 className="text-3xl font-bold text-stone-800 mb-2">Conoce a tu compañero</h2>
      <p className="text-stone-500 mb-8 text-lg">Tenemos el caballo perfecto para tu nivel.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.horses?.map((horse: any) => (
          <div key={horse.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border group">
            <div className="h-48 relative">
              <img src={horse.photo || 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400'} alt={horse.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${horse.type === 'Manso' ? 'bg-blue-500' : 'bg-red-500'}`}>
                {horse.type === 'Manso' ? 'Mansito 🐴' : 'Brioso 🐎'}
              </span>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-extrabold text-stone-800 text-lg">{horse.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* BURROTECA */}
    <section className="bg-amber-50 rounded-3xl p-6 md:p-8 border border-amber-100 flex flex-col md:flex-row items-center gap-8">
      <div className="bg-amber-100 p-6 rounded-full text-amber-600 shrink-0">
         <Music className="w-12 h-12" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-stone-800 mb-3">La Famosa "Burroteca" 🎶</h2>
        <p className="text-stone-600 mb-4 text-lg">Llevamos un bafle ecuestre especializado para ponerle ritmo al recorrido.</p>
        <ul className="text-stone-700 space-y-2 font-medium">
          <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500"/> Compatible con tu celular vía Bluetooth o USB.</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-amber-500"/> Opciones de silencio para disfrutar la naturaleza.</li>
        </ul>
      </div>
    </section>

    {/* FAQ SEO */}
    <section id="faq" className="pb-12">
      <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Preguntas Frecuentes</h2>
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
    </section>
  </main>

  {/* BOTÓN FLOTANTE WHATSAPP (DESKTOP) */}
  <a href={linkReserva} target="_blank" rel="noreferrer" className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-transform z-50 hidden md:flex items-center justify-center group">
    <MessageCircle className="w-8 h-8" />
    <span className="absolute right-full mr-4 bg-stone-900 text-white px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold">
      ¡Reserva ahora!
    </span>
  </a>

  {/* BARRA INFERIOR FIJA (MÓVIL) */}
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 pb-safe z-50 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:hidden">
    <a href="#inicio" className="flex flex-col items-center text-stone-400 hover:text-amber-600">
      <Home className="w-6 h-6 mb-1" />
      <span className="text-[10px] font-bold">{nav1}</span>
    </a>
    <a href="#cotizador" className="flex flex-col items-center text-stone-400 hover:text-amber-600">
      <Calendar className="w-6 h-6 mb-1" />
      <span className="text-[10px] font-bold">{nav2}</span>
    </a>
    <a href={linkReserva} target="_blank" rel="noreferrer" className="relative -top-5 flex flex-col items-center">
      <div className="bg-green-500 text-white p-4 rounded-full shadow-lg shadow-green-500/40 active:scale-95 transition-transform">
        <MessageCircle className="w-7 h-7" />
      </div>
    </a>
    <a href="#faq" className="flex flex-col items-center text-stone-400 hover:text-amber-600">
      <Info className="w-6 h-6 mb-1" />
      <span className="text-[10px] font-bold">{nav3}</span>
    </a>
  </nav>

</div>


);
}