"use client";
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MARCA_SITIO = 'cabalgatamedellin.com';

interface PricingProps {
  basePrice?: number;
  guidePrice?: number;
}

export default function PricingSectionEn({ basePrice: propBasePrice, guidePrice: propGuidePrice }: PricingProps = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const addonsScrollRef = useRef<HTMLDivElement>(null);

  const [precioBase, setPrecioBase] = useState<number>(propBasePrice || 100000);
  const [costoGuia, setCostoGuia] = useState<number>(propGuidePrice ?? 80000);

  useEffect(() => {
    fetch(`https://admin.cabalgatas.co/api/ajustes?brandName=${MARCA_SITIO}`, { cache: 'no-store' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          if (data.basePrice) setPrecioBase(Number(data.basePrice));
          if (data.guidePrice !== undefined) setCostoGuia(Number(data.guidePrice));
        }
      })
      .catch(err => console.error("Error syncing prices in PricingSectionEn:", err));
  }, []);

  const scroll = (direction: 'left' | 'right', ref: any) => {
    if (ref.current) {
      const { scrollLeft } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - 350 : scrollLeft + 350;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const irAlCotizador = (nombrePlan: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'select_item', {
        event_category: 'Select Plan EN',
        event_label: nombrePlan,
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
    <section className="bg-[#fbfbfd] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Choose Your Perfect Experience
          </h2>
          <p className="mt-4 text-lg font-medium text-zinc-500 max-w-2xl mx-auto tracking-wide">
            Swipe to see our plans, from budget-friendly group rides to all-inclusive VIP adventures.
          </p>
        </div>

        <div className="relative group">
          <button 
            onClick={() => scroll('left', scrollRef)} 
            className="absolute -left-2 md:-left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md text-zinc-900 p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-zinc-200 hover:bg-zinc-50 hover:scale-110 transition-all focus:outline-none"
            aria-label="Previous plan"
          >
            <ChevronLeft size={28} className="md:w-8 md:h-8" aria-hidden="true" />
          </button>

          <button 
            onClick={() => scroll('right', scrollRef)} 
            className="absolute -right-2 md:-right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md text-zinc-900 p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-zinc-200 hover:bg-zinc-50 hover:scale-110 transition-all focus:outline-none"
            aria-label="Next plan"
          >
            <ChevronRight size={28} className="md:w-8 md:h-8" aria-hidden="true" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 px-4 sm:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            
            {/* PLAN 1: PRIVADA */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[360px] bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-zinc-100 flex flex-col relative hover:border-blue-500/50 hover:shadow-lg transition-all">
              <h3 className="text-2xl font-extrabold text-zinc-900 mb-2 tracking-tight">Private Ride</h3>
              <p className="text-zinc-500 text-sm font-medium mb-6 flex-grow leading-relaxed">Your own pace. Total exclusivity for you and your group.</p>
              <div className="mb-2">
                <span className="text-4xl font-extrabold text-zinc-900 tracking-tighter">${precioBase.toLocaleString()}</span>
                <span className="text-zinc-400 font-bold ml-1">COP / person</span>
              </div>
              <div className="bg-blue-50/50 border border-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg mb-6 w-max shadow-sm">
                + ${costoGuia.toLocaleString()} COP Guide (One-time fee per group)
              </div>
              <ul className="space-y-4 mb-8 text-sm text-zinc-600 font-medium flex-grow">
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
                  Personalized attention & pace
                </li>
              </ul>
              <button 
                onClick={() => irAlCotizador('Private Ride EN')}
                className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Book Private Ride
              </button>
            </div>

            {/* PLAN 2: GRUPAL */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[360px] bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-zinc-100 flex flex-col hover:border-green-500/50 hover:shadow-lg transition-all">
              <h3 className="text-2xl font-extrabold text-zinc-900 mb-2 tracking-tight">Group Ride</h3>
              <p className="text-zinc-500 text-sm font-medium mb-6 flex-grow leading-relaxed">The ideal weekend option. Join a group and enjoy nature on a budget.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-zinc-900 tracking-tighter">${precioBase.toLocaleString()}</span>
                <span className="text-zinc-400 font-bold ml-1">COP / person</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-zinc-600 font-medium flex-grow">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Only Saturdays and Sundays at 2:00 PM
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  No extra guide fee
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Meet other travelers
                </li>
              </ul>
              <button 
                onClick={() => irAlCotizador('Group Ride EN')}
                className="w-full bg-green-500 text-white font-bold py-4 px-4 rounded-xl hover:bg-green-600 active:scale-95 transition-all shadow-md mt-auto cursor-pointer"
              >
                Book Group Ride
              </button>
            </div>

            {/* PLAN 3: CELEBRACIÓN */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[360px] bg-white rounded-[2rem] shadow-xl p-8 border-2 border-amber-500 flex flex-col relative transform md:-translate-y-2 hover:shadow-2xl transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-xs font-extrabold uppercase tracking-widest py-1.5 px-5 rounded-full shadow-lg">
                Most Popular
              </div>
              <h3 className="text-2xl font-extrabold text-zinc-900 mb-2 mt-2 tracking-tight">Celebration Plan</h3>
              <p className="text-zinc-500 text-sm font-medium mb-6 flex-grow leading-relaxed">Ideal for birthdays and anniversaries. Everything ready to surprise your partner.</p>
              <div className="mb-6">
                <span className="text-zinc-400 font-medium text-sm">Private Base +</span>
                <br/>
                <span className="text-4xl font-extrabold text-zinc-900 tracking-tighter">$30.000</span>
                <span className="text-zinc-400 font-bold ml-1">COP / lunch</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-zinc-600 font-medium flex-grow">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Includes everything from Private Ride
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Special lunch included
                </li>
                <li className="flex items-start bg-amber-50/50 p-3 rounded-xl border border-amber-100 text-zinc-800 font-bold mt-2 shadow-sm">
                  <span className="text-amber-500 mr-2 text-lg leading-none" aria-hidden="true">✓</span>
                  Decoration: $50.000 COP (FREE for 6+ people)
                </li>
              </ul>
              <button 
                onClick={() => irAlCotizador('Celebration Plan EN')}
                className="w-full bg-amber-500 text-white font-bold py-4 px-4 rounded-xl hover:bg-amber-600 active:scale-95 transition-all shadow-lg mt-auto cursor-pointer"
              >
                Book Celebration
              </button>
            </div>

            {/* PLAN 4: VIP */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[360px] bg-zinc-900 rounded-[2rem] shadow-xl p-8 border border-zinc-800 flex flex-col relative text-white hover:border-yellow-400/50 hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-extrabold mb-2 text-yellow-400 tracking-tight">VIP Adventure</h3>
              <p className="text-zinc-400 text-sm font-medium mb-6 flex-grow leading-relaxed">The complete worry-free experience. We take care of everything.</p>
              <div className="mb-6">
                <span className="text-zinc-500 font-medium text-sm">Celebration Base +</span>
                <br/>
                <span className="text-4xl font-extrabold text-white tracking-tighter">$130.000</span>
                <span className="text-zinc-500 font-bold ml-1">COP / transport</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-zinc-300 font-medium flex-grow">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Private Ride + Lunch included
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 font-bold text-lg leading-none" aria-hidden="true">✓</span>
                  Round-trip VIP Transportation
                </li>
                <li className="flex items-start text-xs text-zinc-400 bg-zinc-800/50 p-3 rounded-xl mt-2 border border-zinc-700">
                  <span className="mr-2 text-lg leading-none" aria-hidden="true">ℹ</span>
                  From Medellin Metro Area (Up to Laureles/Poblado)
                </li>
              </ul>
              <button 
                onClick={() => irAlCotizador('VIP Adventure EN')}
                className="w-full bg-yellow-400 text-zinc-900 font-bold py-4 px-4 rounded-xl hover:bg-yellow-500 active:scale-95 transition-all shadow-lg mt-auto cursor-pointer"
              >
                Book VIP
              </button>
            </div>

          </div>
        </div>

        {/* ADD-ONS SECTION */}
        <div className="mt-16 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-white relative group">
          <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-8 text-center tracking-tight">Enhance Your Experience (Add-ons)</h3>
          
          <button 
            onClick={() => scroll('left', addonsScrollRef)} 
            className="absolute -left-2 md:-left-6 top-[60%] transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md text-zinc-900 p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-zinc-200 hover:bg-zinc-50 focus:outline-none transition-all"
            aria-label="Previous add-ons"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>

          <button 
            onClick={() => scroll('right', addonsScrollRef)} 
            className="absolute -right-2 md:-right-6 top-[60%] transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md text-zinc-900 p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-zinc-200 hover:bg-zinc-50 focus:outline-none transition-all"
            aria-label="Next add-ons"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>

          <div ref={addonsScrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            <div className="snap-center shrink-0 w-[75vw] md:w-[320px] flex flex-col items-center p-8 border border-zinc-100 rounded-[2rem] bg-white shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
              <span className="text-5xl mb-4 drop-shadow-sm" role="img" aria-label="ATV Icon">🏍️</span>
              <h4 className="font-extrabold text-xl text-zinc-900 text-center mb-2 tracking-tight">ATV Tour</h4>
              <p className="text-sm font-medium text-zinc-500 text-center mb-6">1.5 hours of pure adrenaline</p>
              <div className="text-center mt-auto">
                <span className="font-extrabold text-2xl text-zinc-900">$250.000</span> <span className="text-xs font-bold text-zinc-400">COP / driver</span>
                <br/>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg mt-3 inline-block border border-blue-100">+ $50.000 COP for passenger</span>
              </div>
            </div>

            <div className="snap-center shrink-0 w-[75vw] md:w-[320px] flex flex-col items-center p-8 border border-zinc-100 rounded-[2rem] bg-white shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
              <span className="text-5xl mb-4 drop-shadow-sm" role="img" aria-label="Traditional Hat Icon">🤠</span>
              <h4 className="font-extrabold text-xl text-zinc-900 text-center mb-2 tracking-tight">Traditional Paisa Hat</h4>
              <p className="text-sm font-medium text-zinc-500 text-center mb-6">Protect yourself from the sun with local style</p>
              <span className="font-extrabold text-2xl text-zinc-900 mt-auto">$30.000 <span className="text-xs font-bold text-zinc-400">COP</span></span>
            </div>

            <div className="snap-center shrink-0 w-[75vw] md:w-[320px] flex flex-col items-center p-8 border border-zinc-100 rounded-[2rem] bg-white shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
              <span className="text-5xl mb-4 drop-shadow-sm" role="img" aria-label="Traditional Poncho Icon">🧣</span>
              <h4 className="font-extrabold text-xl text-zinc-900 text-center mb-2 tracking-tight">Antioquian Poncho</h4>
              <p className="text-sm font-medium text-zinc-500 text-center mb-6">Take home the best souvenir photo</p>
              <span className="font-extrabold text-2xl text-zinc-900 mt-auto">$30.000 <span className="text-xs font-bold text-zinc-400">COP</span></span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}