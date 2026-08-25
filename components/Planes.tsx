"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PricingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const addonsScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      // Desplaza aproximadamente el ancho de una tarjeta para que el movimiento sea suave
      const scrollTo = direction === 'left' ? scrollLeft - 350 : scrollLeft + 350;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-stone-900 sm:text-5xl">
            Elige tu Experiencia Perfecta
          </h2>
          <p className="mt-4 text-lg font-medium text-stone-600 max-w-2xl mx-auto">
            Desliza para ver nuestros planes, desde opciones económicas hasta aventuras VIP todo incluido.
          </p>
        </div>

        {/* Contenedor Principal de Planes con Flechas Integradas */}
        <div className="relative group">
          
          {/* Flecha Izquierda (Visible en PC y Móvil) */}
          <button 
            onClick={() => scroll('left', scrollRef)} 
            className="absolute -left-2 md:-left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white text-stone-900 p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-stone-200 hover:bg-stone-100 hover:scale-110 transition-all focus:outline-none"
            aria-label="Ver plan anterior"
          >
            <ChevronLeft size={28} className="md:w-8 md:h-8" />
          </button>

          {/* Flecha Derecha (Visible en PC y Móvil) */}
          <button 
            onClick={() => scroll('right', scrollRef)} 
            className="absolute -right-2 md:-right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white text-stone-900 p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-stone-200 hover:bg-stone-100 hover:scale-110 transition-all focus:outline-none"
            aria-label="Ver siguiente plan"
          >
            <ChevronRight size={28} className="md:w-8 md:h-8" />
          </button>

          {/* 
            Contenedor de Tarjetas (Carrusel Horizontal Universal)
          */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 px-4 sm:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            
            {/* 1. Cabalgata Privada (AHORA ES LA PRIMERA) */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[360px] bg-white rounded-3xl shadow-lg p-8 border-2 border-stone-100 flex flex-col relative hover:border-blue-500 transition-colors">
              <h3 className="text-2xl font-black text-stone-900 mb-2">Cabalgata Privada</h3>
              <p className="text-stone-500 text-sm font-medium mb-6 flex-grow">Tu propio ritmo. Exclusividad total para ti y tus acompañantes.</p>
              <div className="mb-2">
                <span className="text-4xl font-black text-stone-900">$100.000</span>
                <span className="text-stone-500 font-bold">/persona</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold px-3 py-1.5 rounded-lg mb-6 w-max shadow-sm">
                + $80.000 Guía (Pago único por grupo)
              </div>
              <ul className="space-y-4 mb-8 text-sm text-stone-700 font-medium flex-grow">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 font-bold text-lg leading-none">✓</span>
                  Horario 100% flexible
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 font-bold text-lg leading-none">✓</span>
                  Guía exclusivo solo para tu grupo
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 font-bold text-lg leading-none">✓</span>
                  Atención personalizada
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white font-extrabold py-4 px-4 rounded-xl hover:bg-blue-700 transition shadow-md">
                Reservar Privada
              </button>
            </div>

            {/* 2. Cabalgata Grupal (AHORA ES LA SEGUNDA) */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[360px] bg-white rounded-3xl shadow-lg p-8 border-2 border-stone-100 flex flex-col hover:border-green-500 transition-colors">
              <h3 className="text-2xl font-black text-stone-900 mb-2">Cabalgata Grupal</h3>
              <p className="text-stone-500 text-sm font-medium mb-6 flex-grow">La opción ideal para el fin de semana. Únete a un grupo y disfruta la naturaleza.</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-stone-900">$100.000</span>
                <span className="text-stone-500 font-bold">/persona</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-stone-700 font-medium flex-grow">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 font-bold text-lg leading-none">✓</span>
                  Solo Sábados y Domingos a las 2:00 PM
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 font-bold text-lg leading-none">✓</span>
                  Sin cobro adicional de guía
                </li>
              </ul>
              <button className="w-full bg-green-500 text-white font-extrabold py-4 px-4 rounded-xl hover:bg-green-600 transition shadow-md mt-auto">
                Reservar Grupal
              </button>
            </div>

            {/* 3. Plan Celebración */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[360px] bg-white rounded-3xl shadow-2xl p-8 border-4 border-amber-500 flex flex-col relative transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                Más Popular
              </div>
              <h3 className="text-2xl font-black text-stone-900 mb-2 mt-2">Plan Celebración</h3>
              <p className="text-stone-500 text-sm font-medium mb-6 flex-grow">Ideal para cumpleaños y aniversarios. Todo listo para sorprender.</p>
              <div className="mb-6">
                <span className="text-stone-500 font-bold text-sm">Base Privada +</span>
                <br/>
                <span className="text-4xl font-black text-stone-900">$30.000</span>
                <span className="text-stone-500 font-bold">/almuerzo</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-stone-700 font-medium flex-grow">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 font-bold text-lg leading-none">✓</span>
                  Incluye todo lo del Plan Privado
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 font-bold text-lg leading-none">✓</span>
                  Almuerzo especial incluido
                </li>
                <li className="flex items-start bg-amber-50 p-2 rounded-lg border border-amber-100 text-stone-900 font-bold mt-2">
                  <span className="text-amber-500 mr-2 text-lg leading-none">✓</span>
                  Decoración: $50.000 (GRATIS para más de 6 personas)
                </li>
              </ul>
              <button className="w-full bg-amber-500 text-white font-extrabold py-4 px-4 rounded-xl hover:bg-amber-600 transition shadow-lg mt-auto">
                Reservar Celebración
              </button>
            </div>

            {/* 4. Plan VIP / Extranjeros */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[360px] bg-stone-900 rounded-3xl shadow-xl p-8 border-2 border-stone-800 flex flex-col relative text-white hover:border-yellow-400 transition-colors">
              <h3 className="text-2xl font-black mb-2 text-yellow-400">Aventura VIP</h3>
              <p className="text-stone-400 text-sm font-medium mb-6 flex-grow">La experiencia completa sin preocupaciones. Nosotros nos encargamos de todo.</p>
              <div className="mb-6">
                <span className="text-stone-400 font-bold text-sm">Base Celebración +</span>
                <br/>
                <span className="text-4xl font-black text-white">$130.000</span>
                <span className="text-stone-400 font-bold">/transporte</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-stone-300 font-medium flex-grow">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 font-bold text-lg leading-none">✓</span>
                  Cabalgata Privada + Almuerzo
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 font-bold text-lg leading-none">✓</span>
                  Transporte VIP Ida y Vuelta
                </li>
                <li className="flex items-start text-xs text-stone-400 bg-stone-800 p-2 rounded-lg mt-2">
                  <span className="mr-2 text-lg leading-none">ℹ</span>
                  Desde Área Metropolitana (Máximo hasta Laureles)
                </li>
              </ul>
              <button className="w-full bg-yellow-400 text-stone-900 font-extrabold py-4 px-4 rounded-xl hover:bg-yellow-500 transition shadow-lg mt-auto">
                Reservar VIP
              </button>
            </div>

          </div>
        </div>

        {/* Sección de Add-ons (Complementos) */}
        <div className="mt-16 bg-white rounded-3xl shadow-sm p-8 md:p-12 border-2 border-stone-100 relative group">
          <h3 className="text-2xl md:text-3xl font-black text-stone-900 mb-8 text-center">Mejora tu Experiencia (Add-ons)</h3>
          
          {/* Flecha Izquierda Add-ons */}
          <button 
            onClick={() => scroll('left', addonsScrollRef)} 
            className="absolute -left-2 md:-left-6 top-[60%] transform -translate-y-1/2 z-20 bg-white text-stone-900 p-3 rounded-full shadow-lg border border-stone-200 md:hidden hover:bg-stone-100 focus:outline-none group-hover:block"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Flecha Derecha Add-ons */}
          <button 
            onClick={() => scroll('right', addonsScrollRef)} 
            className="absolute -right-2 md:-right-6 top-[60%] transform -translate-y-1/2 z-20 bg-white text-stone-900 p-3 rounded-full shadow-lg border border-stone-200 md:hidden hover:bg-stone-100 focus:outline-none group-hover:block"
          >
            <ChevronRight size={24} />
          </button>

          <div ref={addonsScrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            {/* Add-on: Cuatrimotos */}
            <div className="snap-center shrink-0 w-[75vw] md:w-[320px] flex flex-col items-center p-8 border-2 border-stone-100 rounded-2xl bg-stone-50 hover:border-amber-400 transition-colors">
              <span className="text-5xl mb-4 drop-shadow-md">🏍️</span>
              <h4 className="font-black text-xl text-stone-900 text-center mb-2">Tour Cuatrimoto</h4>
              <p className="text-sm font-medium text-stone-500 text-center mb-6">1.5 horas de adrenalina pura</p>
              <div className="text-center mt-auto">
                <span className="font-black text-2xl text-stone-900">$250.000</span> <span className="text-sm font-bold text-stone-500">/persona</span>
                <br/>
                <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg mt-3 inline-block">+ $50.000 copiloto</span>
              </div>
            </div>

            {/* Add-on: Sombrero */}
            <div className="snap-center shrink-0 w-[75vw] md:w-[320px] flex flex-col items-center p-8 border-2 border-stone-100 rounded-2xl bg-stone-50 hover:border-amber-400 transition-colors">
              <span className="text-5xl mb-4 drop-shadow-md">🤠</span>
              <h4 className="font-black text-xl text-stone-900 text-center mb-2">Sombrero Paisa</h4>
              <p className="text-sm font-medium text-stone-500 text-center mb-6">Protégete del sol con estilo tradicional</p>
              <span className="font-black text-2xl text-stone-900 mt-auto">$30.000</span>
            </div>

            {/* Add-on: Poncho */}
            <div className="snap-center shrink-0 w-[75vw] md:w-[320px] flex flex-col items-center p-8 border-2 border-stone-100 rounded-2xl bg-stone-50 hover:border-amber-400 transition-colors">
              <span className="text-5xl mb-4 drop-shadow-md">🧣</span>
              <h4 className="font-black text-xl text-stone-900 text-center mb-2">Poncho Antioqueño</h4>
              <p className="text-sm font-medium text-stone-500 text-center mb-6">Llévate la mejor foto de recuerdo</p>
              <span className="font-black text-2xl text-stone-900 mt-auto">$30.000</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}