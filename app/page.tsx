"use client";
import React, { useEffect, useState } from 'react';
import { MapPin, MessageCircle, Calendar, ShieldCheck, Music, CheckCircle, Home, Info } from 'lucide-react';
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
        <p className="text-stone-500 font-bold animate-pulse">Preparando caballos...</p>
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
    if (diaSemana >= 1 && diaSemana <= 5) {
      recargoGuia = precioGuia;
    }
  }
  
  const totalCalculado = (jinetes * precioBase) + recargoGuia;
  const abonoRequerido = totalCalculado * (porcentajeAbono / 100);

  // --- NUEVOS ENLACES INTELIGENTES DE WHATSAPP ---
  const numeroWa = data.whatsappNumber || "573000000000";
  
  const textoCotizador = "Hola, quiero reservar el " + (fecha || 'próximo fin de semana') + " para " + jinetes + " personas (" + duracion + "). Necesito " + mansos + " caballos mansos y " + briosos + " briosos. Sonido: " + sonido + ". Mi cotización dio $" + totalCalculado.toLocaleString('es-CO') + ". ¿Tienen disponibilidad?";
  const linkCotizador = "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent(textoCotizador);
  
  const textoGancho = "¡Hola! Quiero vivir la mejor experiencia a caballo cerca de Medellín. 🐎✨ ¿Me regalan información de disponibilidad?";
  const linkGancho = "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent(textoGancho);
  
  const textoFaq = "Hola, estaba leyendo las preguntas frecuentes en la web pero tengo una duda adicional...";
  const linkFaq = "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent(textoFaq);
  
  const getLinkCaballo = (nombreCaballo: string) => {
     const texto = `¡Hola! Me enamoré del caballo ${nombreCaballo} 😍. ¿Está disponible para mi próxima cabalgata?`;
     return "https://wa.me/" + numeroWa + "?text=" + encodeURIComponent(texto);
  };
  // ------------------------------------------------

  const nav1 = data.navLabel1 || "Inicio";
  const nav2 = data.navLabel2 || "Cotizar";
  const nav3 = data.navLabel3 || "FAQ";

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-32 md:pb-12">
      {/* HERO SECTION */}
      <section id="inicio" className="relative h-[80vh] bg-stone-900 overflow-hidden flex flex-col justify-between">
        <img src={data.mediaLibrary?.[0]?.url || "https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=1920"} alt="Fondo Cabalgata" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-900"></div>
        
        {data.promoActive && (
          <div className="relative z-10 w-full bg-amber-500/90 text-stone-900 py-2 px-4 flex justify-center text-xs md:text-sm font-bold tracking-wide text-center">
            <ShieldCheck className="w-4 h-4 mr-2 hidden md:block" /> +1,200 jinetes seguros este año • 100% Parqueadero Privado • A 30 mins de Medellín
          </div>
        )}
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">{data.heroTitle || "Cabalgatas Ecológicas en Caldas, Antioquia"}</h1>
          <p className="text-stone-200 text-lg md:text-xl max-w-2xl font-medium">{data.heroSubtitle || "Conectando jinetes principiantes y expertos con los paisajes montañosos del sur del Valle de Aburrá."}</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
        
        <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-100">
          <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2"><Calendar className="w-6 h-6 text-amber-600" /> Cotiza y Reserva en Vivo</h2>
          
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
                   <option>1 Hora</option><option>2 Horas (Recomendada)</option><option>3 Horas</option>
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
                 {mansos + briosos !== jinetes && <p className="text-red-500 text-xs mt-2 font-bold animate-pulse">La suma debe ser igual a {jinetes} jinetes.</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2">5. Sonido / Ambiente</label>
                <select value={sonido} onChange={(e) => setSonido(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl bg-stone-50 outline-none focus:border-amber-500">
                   <option>Burroteca con música</option><option>Conectar mi USB/Bluetooth</option><option>Prefiero silencio campestre</option>
                 </select>
              </div>
            </div>
            {/* HERO SECTION */}
      <section id="inicio" className="relative h-[80vh] bg-stone-900 overflow-hidden flex flex-col justify-between">
        <img src={data.mediaLibrary?.[0]?.url || "https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=1920"} alt="Fondo Cabalgata" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-900"></div>
        
        {data.promoActive && (
          <div className="relative z-10 w-full bg-amber-500/90 text-stone-900 py-2 px-4 flex justify-center text-xs md:text-sm font-bold tracking-wide text-center">
            <ShieldCheck className="w-4 h-4 mr-2 hidden md:block" /> +1,200 jinetes seguros este año • 100% Parqueadero Privado • A 30 mins de Medellín
          </div>
        )}
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">{data.heroTitle || "Cabalgatas Ecológicas en Caldas, Antioquia"}</h1>
          <p className="text-stone-200 text-lg md:text-xl max-w-2xl font-medium">{data.heroSubtitle || "Conectando jinetes principiantes y expertos con los paisajes montañosos del sur del Valle de Aburrá."}</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
        
        <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-100">
          <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2"><Calendar className="w-6 h-6 text-amber-600" /> Cotiza y Reserva en Vivo</h2>
          
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
                   <option>1 Hora</option><option>2 Horas (Recomendada)</option><option>3 Horas</option>
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
                 {mansos + briosos !== jinetes && <p className="text-red-500 text-xs mt-2 font-bold animate-pulse">La suma debe ser igual a {jinetes} jinetes.</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2">5. Sonido / Ambiente</label>
                <select value={sonido} onChange={(e) => setSonido(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl bg-stone-50 outline-none focus:border-amber-500">
                   <option>Burroteca con música</option><option>Conectar mi USB/Bluetooth</option><option>Prefiero silencio campestre</option>
                 </select>
              </div>
            </div>
            {/* HERO SECTION */}
      <section id="inicio" className="relative h-[80vh] bg-stone-900 overflow-hidden flex flex-col justify-between">
        <img src={data.mediaLibrary?.[0]?.url || "https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=1920"} alt="Fondo Cabalgata" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-900"></div>
        
        {data.promoActive && (
          <div className="relative z-10 w-full bg-amber-500/90 text-stone-900 py-2 px-4 flex justify-center text-xs md:text-sm font-bold tracking-wide text-center">
            <ShieldCheck className="w-4 h-4 mr-2 hidden md:block" /> +1,200 jinetes seguros este año • 100% Parqueadero Privado • A 30 mins de Medellín
          </div>
        )}
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">{data.heroTitle || "Cabalgatas Ecológicas en Caldas, Antioquia"}</h1>
          <p className="text-stone-200 text-lg md:text-xl max-w-2xl font-medium">{data.heroSubtitle || "Conectando jinetes principiantes y expertos con los paisajes montañosos del sur del Valle de Aburrá."}</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
        
        <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-100">
          <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2"><Calendar className="w-6 h-6 text-amber-600" /> Cotiza y Reserva en Vivo</h2>
          
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
                   <option>1 Hora</option><option>2 Horas (Recomendada)</option><option>3 Horas</option>
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
                 {mansos + briosos !== jinetes && <p className="text-red-500 text-xs mt-2 font-bold animate-pulse">La suma debe ser igual a {jinetes} jinetes.</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2">5. Sonido / Ambiente</label>
                <select value={sonido} onChange={(e) => setSonido(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl bg-stone-50 outline-none focus:border-amber-500">
                   <option>Burroteca con música</option><option>Conectar mi USB/Bluetooth</option><option>Prefiero silencio campestre</option>
                 </select>
              </div>
            </div>
    </div>