"use client";
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MARCA_SITIO = 'cabalgatamedellin.com';

export default function PricingSectionEn() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const addonsScrollRef = useRef<HTMLDivElement>(null);

  const [precioBase, setPrecioBase] = useState<number>(100000);
  const [costoGuia, setCostoGuia] = useState<number>(80000);

  useEffect(() => {
    fetch(`https://admin.cabalgatas.co/api/ajustes?brandName=${MARCA_SITIO}`, { cache: 'no-store' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          if (data.basePrice) setPrecioBase(Number(data.basePrice));
          if (data.guidePrice !== undefined) setCostoGuia(Number(data.guidePrice));
        }
      })
      .catch(err => console.error("Error fetching prices in PlanesEn:", err));
  }, []);

  const scroll = (direction: 'left' | 'right', ref: any) => {
    if (ref.current) {
      const { scrollLeft } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - 350 : scrollLeft + 350;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const irAlCotizador = (planName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'select_item', {
        event_category: 'Plan Selection EN',
        event_label: planName,
      });
    }

    const seccionCotizador = document.getElementById('cotizador');
    if (seccionCotizador) {
      seccionCotizador.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const inputTelefono = document.getElementById('telefono-reserva');
        if (inputTelefono) inputTelefono.focus();
      }, 600);
    }
  };

  return (
    <section className="bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-stone-900 sm:text-5xl">
            Choose Your Perfect Experience
          </h2>
          <p className="mt-4 text-lg font-medium text-stone-600 max-w-2xl mx-auto">
            Swipe to explore our packages, from budget-friendly group rides to all-inclusive VIP adventures.
          </p>
        </div>

        <div className="relative group">
          <button 
            onClick={() => scroll('left', scrollRef)} 
            className="absolute -left-2 md:-left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white text-stone-900 p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-stone-200 hover:bg-stone-100 hover:scale-110 transition-all focus:outline-none"
            aria-label="Previous plan"
          >
            <ChevronLeft size={28} className="md:w-8 md:h-8" aria-hidden="true" />
          </button>

          <button 
            onClick={() => scroll('right', scrollRef)} 
            className="absolute -right-2 md:-right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white text-stone-900 p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-stone-200 hover:bg-stone-100 hover:scale-110 transition-all focus:outline-none"
            aria-label="Next plan"
          >
            <ChevronRight size={28} className="md:w-8 md:h-8" aria-hidden="true" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 px-4 sm:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            
            {/* PLAN 1: PRIVATE */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[360px] bg-white rounded-3xl shadow-lg p-8 border-2 border-stone-100 flex flex-col relative hover:border-blue-500 transition-colors">
              <h3 className="text-2xl font-black text-stone-900 mb-2">Private Ride</h3>
              <p className="text-stone-500 text-sm font-medium mb-6 flex-grow">Your own pace. Total exclusivity for you and your group.</p>
              <div className="mb-2">
                <span className="text-4xl font-black text-stone-900">${precioBase.toLocaleString('es-CO')}</span>
                <span className="text-stone-500 font-bold"> COP/person</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold px-3 py-1.5 rounded-lg mb-6 w-max shadow-sm">
                + ${costoGuia.toLocaleString('es-CO')} COP Guide (One-time group fee)
              </div>
              <ul className="space-y-4 mb-8 text-sm text-stone-700 font-medium flex-grow">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  100% flexible schedule
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Exclusive guide just for your group
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Personalized attention
                </li>
              </ul>
              <button 
                onClick={() => irAlCotizador('Private Ride')}
                className="w-full bg-blue-600 text-white font-extrabold py-4 px-4 rounded-xl hover:bg-blue-700 active:scale-95 transition shadow-md cursor-pointer"
              >
                Book Private Ride
              </button>
            </div>

            {/* PLAN 2: GROUP */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[360px] bg-white rounded-3xl shadow-lg p-8 border-2 border-stone-100 flex flex-col hover:border-green-500 transition-colors">
              <h3 className="text-2xl font-black text-stone-900 mb-2">Group Ride</h3>
              <p className="text-stone-500 text-sm font-medium mb-6 flex-grow">The ideal weekend option. Join a group and enjoy nature.</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-stone-900">${precioBase.toLocaleString('es-CO')}</span>
                <span className="text-stone-500 font-bold"> COP/person</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-stone-700 font-medium flex-grow">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Saturdays & Sundays at 2:00 PM only
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  No extra guide fee
                </li>
              </ul>
              <button 
                onClick={() => irAlCotizador('Group Ride')}
                className="w-full bg-green-500 text-white font-extrabold py-4 px-4 rounded-xl hover:bg-green-600 active:scale-95 transition shadow-md mt-auto cursor-pointer"
              >
                Book Group Ride
              </button>
            </div>

            {/* PLAN 3: CELEBRATION */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[360px] bg-white rounded-3xl shadow-2xl p-8 border-4 border-amber-500 flex flex-col relative transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                Most Popular
              </div>
              <h3 className="text-2xl font-black text-stone-900 mb-2 mt-2">Celebration Package</h3>
              <p className="text-stone-500 text-sm font-medium mb-6 flex-grow">Ideal for birthdays and anniversaries. Everything ready to surprise.</p>
              <div className="mb-6">
                <span className="text-stone-500 font-bold text-sm">Private Base +</span>
                <br/>
                <span className="text-4xl font-black text-stone-900">$30.000</span>
                <span className="text-stone-500 font-bold"> COP/lunch</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-stone-700 font-medium flex-grow">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Includes everything in Private Ride
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Special traditional lunch included
                </li>
                <li className="flex items-start bg-amber-50 p-2 rounded-lg border border-amber-100 text-stone-900 font-bold mt-2">
                  <span className="text-amber-500 mr-2 text-lg leading-none" aria-hidden="true">✓</span>
                  Decoration: $50.000 COP (FREE for 6+ people)
                </li>
              </ul>
              <button 
                onClick={() => irAlCotizador('Celebration Package')}
                className="w-full bg-amber-500 text-white font-extrabold py-4 px-4 rounded-xl hover:bg-amber-600 active:scale-95 transition shadow-lg mt-auto cursor-pointer"
              >
                Book Celebration
              </button>
            </div>

            {/* PLAN 4: VIP */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[360px] bg-stone-900 rounded-3xl shadow-xl p-8 border-2 border-stone-800 flex flex-col relative text-white hover:border-yellow-400 transition-colors">
              <h3 className="text-2xl font-black mb-2 text-yellow-400">VIP Adventure</h3>
              <p className="text-stone-400 text-sm font-medium mb-6 flex-grow">The complete worry-free experience. We take care of everything.</p>
              <div className="mb-6">
                <span className="text-stone-400 font-bold text-sm">Celebration Base +</span>
                <br/>
                <span className="text-4xl font-black text-white">$130.000</span>
                <span className="text-stone-400 font-bold"> COP/transport</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-stone-300 font-medium flex-grow">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Private Ride + Lunch
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Round-trip VIP Private Transport
                </li>
                <li className="flex items-start text-xs text-stone-400 bg-stone-800 p-2 rounded-lg mt-2">
                  <span className="mr-2 text-lg leading-none" aria-hidden="true">ℹ</span>
                  Pick-up in Medellín Metro Area (El Poblado, Envigado, Sabaneta, up to Laureles)
                </li>
              </ul>
              <button 
                onClick={() => irAlCotizador('VIP Adventure')}
                className="w-full bg-yellow-400 text-stone-900 font-extrabold py-4 px-4 rounded-xl hover:bg-yellow-500 active:scale-95 transition shadow-lg mt-auto cursor-pointer"
              >
                Book VIP
              </button>
            </div>

          </div>
        </div>

        <div className="mt-16 bg-white rounded-3xl shadow-sm p-8 md:p-12 border-2 border-stone-100 relative group">
          <h3 className="text-2xl md:text-3xl font-black text-stone-900 mb-8 text-center">Upgrade Your Experience (Add-ons)</h3>
          
          <button 
            onClick={() => scroll('left', addonsScrollRef)} 
            className="absolute -left-2 md:-left-6 top-[60%] transform -translate-y-1/2 z-20 bg-white text-stone-900 p-3 rounded-full shadow-lg border border-stone-200 hover:bg-stone-100 focus:outline-none transition-all"
            aria-label="Previous add-ons"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>

          <button 
            onClick={() => scroll('right', addonsScrollRef)} 
            className="absolute -right-2 md:-right-6 top-[60%] transform -translate-y-1/2 z-20 bg-white text-stone-900 p-3 rounded-full shadow-lg border border-stone-200 hover:bg-stone-100 focus:outline-none transition-all"
            aria-label="Next add-ons"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>

          <div ref={addonsScrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            <div className="snap-center shrink-0 w-[75vw] md:w-[320px] flex flex-col items-center p-8 border-2 border-stone-100 rounded-2xl bg-stone-50 hover:border-amber-400 transition-colors">
              <span className="text-5xl mb-4 drop-shadow-md" role="img" aria-label="ATV Icon">🏍️</span>
              <h4 className="font-black text-xl text-stone-900 text-center mb-2">ATV Quad Tour</h4>
              <p className="text-sm font-medium text-stone-500 text-center mb-6">1.5 hours of pure adrenaline</p>
              <div className="text-center mt-auto">
                <span className="font-black text-2xl text-stone-900">$250.000</span> <span className="text-sm font-bold text-stone-500">COP/person</span>
                <br/>
                <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg mt-3 inline-block">+ $50.000 COP passenger</span>
              </div>
            </div>

            <div className="snap-center shrink-0 w-[75vw] md:w-[320px] flex flex-col items-center p-8 border-2 border-stone-100 rounded-2xl bg-stone-50 hover:border-amber-400 transition-colors">
              <span className="text-5xl mb-4 drop-shadow-md" role="img" aria-label="Paisa Hat Icon">🤠</span>
              <h4 className="font-black text-xl text-stone-900 text-center mb-2">Traditional Paisa Hat</h4>
              <p className="text-sm font-medium text-stone-500 text-center mb-6">Protect yourself from the sun in style</p>
              <span className="font-black text-2xl text-stone-900 mt-auto">$30.000 COP</span>
            </div>

            <div className="snap-center shrink-0 w-[75vw] md:w-[320px] flex flex-col items-center p-8 border-2 border-stone-100 rounded-2xl bg-stone-50 hover:border-amber-400 transition-colors">
              <span className="text-5xl mb-4 drop-shadow-md" role="img" aria-label="Poncho Icon">🧣</span>
              <h4 className="font-black text-xl text-stone-900 text-center mb-2">Antioquian Poncho</h4>
              <p className="text-sm font-medium text-stone-500 text-center mb-6">Take home the best souvenir photo</p>
              <span className="font-black text-2xl text-stone-900 mt-auto">$30.000 COP</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}