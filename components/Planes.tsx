import React from 'react';

export default function Planes({ basePrice = 150000 }: { basePrice?: number }) {
  const planes = [
    {
      name: 'Cabalgata Playa y Manglares',
      duration: '2 Horas',
      price: `$${basePrice.toLocaleString('es-CO')} COP`,
      desc: 'Recorrido guiado por las playas vírgenes de Manzanillo del Mar y senderos costeros de la Zona Norte. Ideal para principiantes y expertos.',
      features: ['Caballos mansos o briosos a elección', 'Guía montado acompañante', 'Póliza médica incluida', 'A 20 min del Centro (Sin peajes)'],
    },
    {
      name: 'Cabalgata Romántica al Atardecer',
      duration: '2.5 Horas',
      price: '$480.000 COP / Pareja',
      desc: 'Recorrido privado frente al mar Caribe al caer el sol con guía exclusivo, brindis en la playa y decoración especial.',
      features: ['100% Privado para la pareja', 'Brindis y picada frente al mar', 'Toma de fotos y videos', 'Póliza de asistencia médica'],
    },
    {
      name: 'Tour de Cuatrimotos en la Playa',
      duration: '1.5 Horas',
      price: '$280.000 COP / Moto',
      desc: 'Ruta de aventura en cuatrimoto por playas y trochas de Manzanillo del Mar (+$60.000 COP parrillero adicional).',
      features: ['Cuatrimotos automáticas', 'Casco y equipos de protección', 'Ruta mixta de playa y trocha', 'Seguro médico incluido'],
    },
    {
      name: 'Plan VIP con Transporte Puerta a Puerta',
      duration: '3.5 Horas Total',
      price: '+$120.000 COP Transporte',
      desc: 'Recogida privada ida y regreso en vehículo climatizado desde hoteles o Airbnb en Bocagrande, Centro, Getsemaní o Morros.',
      features: ['Vehículo privado con A/C', 'Ruta directa por el Viaducto del Manglar', 'Cero cobro de peajes', 'Horarios flexibles de salida'],
    },
  ];

  return (
    <section id="planes" className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Planes y Precios de Cabalgatas en Cartagena
      </h2>
      <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
        Salidas diarias desde nuestra pesebrera en Manzanillo del Mar (Zona Norte), a solo 20 minutos de la Ciudad Amurallada y sin peajes.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planes.map((p, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                {p.duration}
              </span>
              <h3 className="text-xl font-bold mt-4 mb-2">{p.name}</h3>
              <p className="text-2xl font-extrabold text-emerald-700 mb-3">{p.price}</p>
              <p className="text-sm text-slate-600 mb-4">{p.desc}</p>
              <ul className="text-sm text-slate-700 space-y-2 mb-6">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#cotizador"
              className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition"
            >
              Cotizar Este Plan
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
