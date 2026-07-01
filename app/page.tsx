"use client";
import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar, ShieldCheck, Info, Star, PlayCircle, Camera, X, Gift, Clock, Home } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function ClientePage() {
  const [data, setData] = useState<any>(null);
  const [fecha, setFecha] = useState('');
  const [jinetes, setJinetes] = useState(2);
  const [duracion, setDuracion] = useState('2 Horas');
  const [mansos, setMansos] = useState(1);
  const [briosos, setBriosos] = useState(1);
  const [currentHero, setCurrentHero] = useState(0);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "configuracion", "general");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) setData(docSnap.data());
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (data?.heroMedia && data.heroMedia.length > 1) {
      const interval = setInterval(() => setCurrentHero((prev) => (prev + 1) % data.heroMedia.length), 5000);
      return () => clearInterval(interval);
    }
  }, [data?.heroMedia]);

  useEffect(() => {
    if (data?.enableExitIntent && !hasShownPopup) {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setShowExitPopup(true);
          setHasShownPopup(true);
        }
      };
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [data, hasShownPopup]);

  if (!data) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-4 animate-pulse">
          <div className="h-64 bg-stone-200 rounded-3xl" />
          <div className="h-8 bg-stone-200 rounded-lg w-3/4" />
          <div className="h-4 bg-stone-200 rounded-lg w-full" />
        </div>
      </div>
    );
  }

  const precioBase = data.basePrice || 100000;
  const precioGuia = data.guidePrice || 80000;
  let recargoGuia = 0;
  if (fecha) {
    const diaSemana = new Date(fecha + 'T12:00:00').getDay();
    if (diaSemana >= 1 && diaSemana <= 5) recargoGuia = precioGuia;
  }
  const totalCalculado = (jinetes * precioBase) + recargoGuia;

  const linkCotizador = `https://wa.me/${data.whatsappNumber || "573000000000"}?text=${encodeURIComponent(`Hola, quiero reservar para ${jinetes} personas. Cotización: $${totalCalculado.toLocaleString()}`)}`;
  const linkGancho = `https://wa.me/${data.whatsappNumber || "573000000000"}?text=${encodeURIComponent("¡Hola! Quiero información sobre las cabalgatas.")}`;
  const linkDescuento = `https://wa.me/${data.whatsappNumber || "573000000000"}?text=${encodeURIComponent("¡Hola! Quiero reclamar mi descuento sorpresa.")}`;

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-20">
      <section className="relative h-[80vh] bg-stone-900 overflow-hidden">
        {data.heroMedia?.map((media: any, idx: number) => (
           <img key={media.id} src={media.url} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentHero ? 'opacity-50' : 'opacity-0'}`} alt="Hero" />
        ))}
        <div className="relative z-10 p-10 flex flex-col justify-end h-full max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white mb-4">{data.heroTitle || "Cabalgatas Ecológicas"}</h1>
          <p className="text-stone-200 text-xl">{data.heroSubtitle || "Experiencias inolvidables"}</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-12">
        <section className="bg-white rounded-3xl shadow-2xl p-8 border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2"><Calendar className="text-amber-600" /> Cotiza Ahora</h2>
            {data.urgencyText && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold animate-pulse">{data.urgencyText}</div>}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <input type="date" onChange={(e) => setFecha(e.target.value)} className="w-full p-3 border rounded-xl" />
              <div className="flex items-center gap-4">
                <button onClick={() => setJinetes(Math.max(1, jinetes - 1))} className="p-3 bg-stone-100 rounded-lg">-</button>
                <span className="font-bold text-xl">{jinetes} Jinetes</span>
                <button onClick={() => setJinetes(jinetes + 1)} className="p-3 bg-stone-100 rounded-lg">+</button>
              </div>
            </div>
            <div className="bg-stone-900 p-6 rounded-2xl text-white text-center">
              <p className="text-stone-400">Inversión Total</p>
              <p className="text-4xl font-extrabold text-amber-500">${totalCalculado.toLocaleString()}</p>
              <a href={linkCotizador} className="block mt-6 bg-green-500 py-3 rounded-xl font-bold hover:scale-105 transition-transform">Reservar por WhatsApp</a>
            </div>
          </div>
        </section>

        {data.gallery && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Galería de Experiencias</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {data.gallery.map((item: any, i: number) => (
                <img key={i} src={item.url} className="w-48 h-48 rounded-2xl object-cover" alt="Galería" />
              ))}
            </div>
          </section>
        )}

        <section className="pb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {data.faqs?.map((faq: any, i: number) => (
              <details key={i} className="bg-white p-5 rounded-xl border">
                <summary className="font-bold cursor-pointer">{faq.q}</summary>
                <p className="pt-2 text-stone-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm text-center relative">
            <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4"><X /></button>
            <Gift className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">¡No te vayas!</h3>
            <p className="mb-6">Reserva ahora y recibe un regalo sorpresa.</p>
            <a href={linkDescuento} className="block bg-green-500 text-white py-3 rounded-lg font-bold">Reclamar Descuento</a>
          </div>
        </div>
      )}
    </div>
  );
}