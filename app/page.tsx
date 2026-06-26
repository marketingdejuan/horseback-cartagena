 {/* 1. HERO SECTION (Above the fold) */}
  <section className="relative h-[80vh] bg-stone-900 overflow-hidden flex flex-col justify-between">
    <img src="https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=1200" alt="Fondo Cabalgata" className="absolute inset-0 w-full h-full object-cover opacity-50" />
    <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-900"></div>
    
    {/* Trust Badge Superior */}
    <div className="relative z-10 w-full bg-amber-500/90 text-stone-900 py-2 px-4 flex justify-center text-xs md:text-sm font-bold tracking-wide backdrop-blur-sm">
      <ShieldCheck className="w-4 h-4 mr-2" /> +1,200 jinetes seguros este año • Parqueadero Privado • A 30 mins de Medellín
    </div>

    <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 text-center md:text-left">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
        {data.heroTitle || "Cabalgatas Ecológicas"}
      </h1>
      <p className="text-stone-200 text-lg md:text-xl max-w-2xl font-medium drop-shadow-md">
        {data.heroSubtitle || "Conectando jinetes con los paisajes montañosos."}
      </p>
    </div>
  </section>

  <main className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20 space-y-16">
    
    {/* 2. EL COTIZADOR INTERACTIVO */}
    <section id="cotizador" className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-stone-100">
      <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-amber-600" /> Cotiza y Reserva en Vivo
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controles */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-stone-600 mb-1">1. ¿Qué día vienes?</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-3 border-2 border-stone-200 rounded-xl focus:border-amber-500 outline-none transition-colors" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-stone-600 mb-1">2. ¿Cuántos jinetes?</label>
            <div className="flex items-center gap-4 bg-stone-50 p-2 rounded-xl border border-stone-200 w-fit">
              <button onClick={() => setJinetes(Math.max(1, jinetes - 1))} className="w-10 h-10 bg-white rounded-lg shadow-sm font-bold text-stone-700 hover:bg-stone-200">-</button>
              <span className="w-8 text-center font-bold text-xl">{jinetes}</span>
              <button onClick={() => setJinetes(jinetes + 1)} className="w-10 h-10 bg-white rounded-lg shadow-sm font-bold text-stone-700 hover:bg-stone-200">+</button>
            </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-stone-600 mb-1">3. Distribución de caballos</label>
             <div className="flex gap-4">
                <div className="flex-1 bg-stone-50 p-3 rounded-xl border border-stone-200">
                   <span className="text-xs font-bold text-stone-500 block mb-2">Mansos (Novatos)</span>
                   <input type="number" min="0" value={mansos} onChange={(e)=>setMansos(Number(e.target.value))} className="w-full p-2 border rounded-lg text-center font-bold" />
                </div>
                <div className="flex-1 bg-stone-50 p-3 rounded-xl border border-stone-200">
                   <span className="text-xs font-bold text-stone-500 block mb-2">Briosos (Expertos)</span>
                   <input type="number" min="0" value={briosos} onChange={(e)=>setBriosos(Number(e.target.value))} className="w-full p-2 border rounded-lg text-center font-bold" />
                </div>
             </div>
             {mansos + briosos !== jinetes && (
               <p className="text-red-500 text-xs mt-1 font-bold">¡Ojo! La suma debe ser igual a {jinetes} jinetes.</p>
             )}
          </div>
        </div>

        {/* Recibo Totalizador */}
        <div className="bg-stone-900 rounded-2xl p-6 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-stone-400 font-bold mb-4 uppercase tracking-wider text-sm">Resumen de Inversión</h3>
            <div className="flex justify-between items-center mb-2">
              <span>{jinetes} Jinetes x ${basePrice.toLocaleString()}</span>
              <span className="font-bold">${(jinetes * basePrice).toLocaleString()}</span>
            </div>
            {recargoGuia > 0 && (
              <div className="flex justify-between items-center mb-2 text-amber-400">
                <span>Recargo Guía (Semana)</span>
                <span className="font-bold">+${recargoGuia.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-stone-700 my-4"></div>
            <div className="flex justify-between items-end">
              <span className="text-lg">Total</span>
              <span className="text-4xl font-extrabold text-amber-500">${totalCOP.toLocaleString()}</span>
            </div>
            <p className="text-stone-400 text-xs mt-2 text-right">Abono requerido hoy: ${abonoCOP.toLocaleString()} ({depositPercent}%)</p>
          </div>

          <a href={linkWaGenerado} target="_blank" rel="noreferrer" className="mt-8 block w-full bg-green-500 hover:bg-green-600 text-center text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-500/30">
            Enviar cotización por WhatsApp
          </a>
        </div>
      </div>
    </section>

    {/* 3. MAPA DE EXPERIENCIA (SEO Semántico) */}
    <section id="recorrido">
      <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">El Recorrido en Caldas</h2>
      <div className="flex flex-col md:flex-row justify-between relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-amber-200 hidden md:block -z-10"></div>
        {[
          { t: 'Punto de Partida', d: 'Pesebrera en Caldas. Parqueadero gratuito seguro.' },
          { t: 'Adentramiento', d: 'Senderos ecológicos y densos bosques de pino.' },
          { t: 'Fauna y Agua', d: 'Cruce a caballo de 2 ríos cristalinos del municipio.' },
          { t: 'Regreso', d: 'Paso lento y campestre, guiado por un chalán experto.' }
        ].map((paso, i) => (
          <div key={i} className="flex-1 flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 border-4 border-white shadow-md z-10">{i + 1}</div>
            <h3 className="font-bold text-stone-800 mb-2">{paso.t}</h3>
            <p className="text-stone-600 text-sm">{paso.d}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 4. VITRINA DE EQUINOS */}
    <section id="equinos">
      <h2 className="text-3xl font-bold text-stone-800 mb-2">Conoce a tu compañero</h2>
      <p className="text-stone-500 mb-8">Nuestros equinos están entrenados y alimentados bajo los más altos estándares de bienestar.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.horses?.map((horse: any) => (
          <div key={horse.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 group">
            <div className="h-48 overflow-hidden relative">
              <img src={horse.photo || 'https://via.placeholder.com/300'} alt={horse.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${horse.type === 'Manso' ? 'bg-blue-500' : 'bg-red-500'}`}>
                {horse.type}
              </span>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-extrabold text-stone-800 text-lg">{horse.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* 5. LA BURROTECA */}
    <section className="bg-amber-50 rounded-3xl p-8 border border-amber-100 flex flex-col md:flex-row items-center gap-8">
      <div className="bg-amber-100 p-6 rounded-full text-amber-600">
         <Music className="w-16 h-16" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">La Famosa "Burroteca" 🎶</h2>
        <p className="text-stone-600 mb-4">Llevamos un bafle ecuestre especializado para ponerle ritmo al recorrido. Ideal para celebraciones de cumpleaños o planes con amigos.</p>
        <ul className="text-stone-700 space-y-2">
          <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500"/> Compatible con tu celular vía Bluetooth o USB.</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500"/> Si prefieres escuchar el río y las aves, lo apagamos.</li>
        </ul>
      </div>
    </section>

    {/* 6. FAQ (Optimizado para Google PAA) */}
    <section id="faq" className="pb-12">
      <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Preguntas Frecuentes</h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        {data.faqs?.map((faq: any) => (
          <details key={faq.id} className="group bg-white rounded-xl border border-stone-200 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-stone-800">
              {faq.q}
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-stone-600 mt-2 px-5 pb-5 text-sm leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>

  </main>

  {/* STICKY CTA (Mobile) */}
  <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-stone-200 md:hidden z-50">
    <a href="#cotizador" className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl">
      <Calendar className="w-5 h-5" /> Iniciar Cotización Exacta
    </a>
  </div>

</div>