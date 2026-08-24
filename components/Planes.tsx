import React from 'react';

export default function PricingSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Elige tu Experiencia Perfecta
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Desliza para ver nuestros planes, desde opciones económicas hasta aventuras VIP.
          </p>
        </div>

        {/* Contenedor del Carrusel */}
        {/* Usamos flex, overflow-x-auto y snap-x para el efecto carrusel nativo */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          
          {/* 1. Cabalgata Grupal */}
          <div className="snap-center shrink-0 w-[85vw] sm:w-[320px] bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Cabalgata Grupal</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow">La opción ideal para el fin de semana. Únete a un grupo y disfruta la naturaleza.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-gray-900">$100.000</span>
              <span className="text-gray-500 font-medium">/persona</span>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-gray-600 flex-grow">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Solo Sábados y Domingos a las 2:00 PM
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Sin cobro adicional de guía
              </li>
            </ul>
            <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition">
              Reservar Grupal
            </button>
          </div>

          {/* 2. Cabalgata Privada */}
          <div className="snap-center shrink-0 w-[85vw] sm:w-[320px] bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col relative">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Cabalgata Privada</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow">Tu propio ritmo. Exclusividad para ti y tus acompañantes.</p>
            <div className="mb-2">
              <span className="text-4xl font-extrabold text-gray-900">$100.000</span>
              <span className="text-gray-500 font-medium">/persona</span>
            </div>
            <div className="bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1 rounded-md mb-6 w-max">
              + $80.000 Guía (Pago único por grupo)
            </div>
            <ul className="space-y-4 mb-8 text-sm text-gray-600 flex-grow">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Horario flexible
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Guía exclusivo solo para tu grupo
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Atención personalizada
              </li>
            </ul>
            <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition">
              Reservar Privada
            </button>
          </div>

          {/* 3. Plan Celebración */}
          <div className="snap-center shrink-0 w-[85vw] sm:w-[320px] bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-500 flex flex-col relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md">
              Más Popular
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Plan Celebración</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow">Ideal para cumpleaños y aniversarios. Todo listo para sorprender.</p>
            <div className="mb-6">
              <span className="text-gray-500 font-medium">Base Privada +</span>
              <br/>
              <span className="text-3xl font-bold text-gray-900">$30.000</span>
              <span className="text-gray-500 font-medium">/almuerzo</span>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-gray-600 flex-grow">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                Incluye todo lo del Plan Privado
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                Almuerzo especial incluido
              </li>
              <li className="flex items-start font-medium text-gray-900">
                <span className="text-orange-500 mr-2">✓</span>
                Decoración: $50.000 (GRATIS para > 6 personas)
              </li>
            </ul>
            <button className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition">
              Reservar Celebración
            </button>
          </div>

          {/* 4. Plan VIP / Extranjeros */}
          <div className="snap-center shrink-0 w-[85vw] sm:w-[320px] bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-700 flex flex-col relative text-white">
            <h3 className="text-xl font-semibold mb-2">Aventura VIP</h3>
            <p className="text-gray-400 text-sm mb-6 flex-grow">La experiencia completa sin preocupaciones. Nosotros nos encargamos de todo.</p>
            <div className="mb-6">
              <span className="text-gray-400 font-medium">Base Celebración +</span>
              <br/>
              <span className="text-3xl font-bold text-white">$130.000</span>
              <span className="text-gray-400 font-medium">/transporte</span>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-gray-300 flex-grow">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                Cabalgata Privada + Almuerzo
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                Transporte VIP Ida y Vuelta
              </li>
              <li className="flex items-start text-xs text-gray-400">
                <span className="mr-2">ℹ</span>
                Área Metropolitana (Máx. Laureles)
              </li>
            </ul>
            <button className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition">
              Reservar VIP
            </button>
          </div>

        </div>

        {/* Sección de Add-ons (Complementos) */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Mejora tu Experiencia (Add-ons)</h3>
          
          {/* Carrusel interno para los Add-ons en móviles, grid en escritorio */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 snap-x snap-mandatory gap-6 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
            
            {/* Add-on: Cuatrimotos */}
            <div className="snap-center shrink-0 w-[75vw] md:w-auto flex flex-col items-center p-6 border border-gray-100 rounded-xl bg-gray-50">
              <span className="text-4xl mb-3">🏍️</span>
              <h4 className="font-bold text-gray-900 text-center">Tour en Cuatrimoto</h4>
              <p className="text-sm text-gray-500 text-center mb-3">1.5 horas de adrenalina pura</p>
              <div className="text-center mt-auto">
                <span className="font-bold text-xl text-gray-900">$250.000</span> <span className="text-sm text-gray-500">/persona</span>
                <br/>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded mt-2 inline-block">+ $50.000 copiloto</span>
              </div>
            </div>

            {/* Add-on: Sombrero */}
            <div className="snap-center shrink-0 w-[75vw] md:w-auto flex flex-col items-center p-6 border border-gray-100 rounded-xl bg-gray-50">
              <span className="text-4xl mb-3">🤠</span>
              <h4 className="font-bold text-gray-900 text-center">Sombrero Tradicional</h4>
              <p className="text-sm text-gray-500 text-center mb-3">Protégete del sol con estilo paisa</p>
              <span className="font-bold text-xl text-gray-900 mt-auto">$30.000</span>
            </div>

            {/* Add-on: Poncho */}
            <div className="snap-center shrink-0 w-[75vw] md:w-auto flex flex-col items-center p-6 border border-gray-100 rounded-xl bg-gray-50">
              <span className="text-4xl mb-3">🧣</span>
              <h4 className="font-bold text-gray-900 text-center">Poncho Antioqueño</h4>
              <p className="text-sm text-gray-500 text-center mb-3">Llévate la mejor foto de recuerdo</p>
              <span className="font-bold text-xl text-gray-900 mt-auto">$30.000</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}