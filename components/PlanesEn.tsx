import React from 'react';

export default function PlanesEn({ basePrice = 150000 }: { basePrice?: number }) {
  const planes = [
    {
      name: 'Caribbean Beach & Mangrove Ride',
      duration: '2 Hours',
      price: `$${basePrice.toLocaleString('es-CO')} COP`,
      desc: 'Guided ride along the uncrowded beaches of Manzanillo del Mar and coastal ecological trails. Suitable for beginners and experienced riders.',
      features: ['Gentle horses matched to your skill', 'Bilingual guide option', 'Medical insurance included', '20 mins from Walled City (No tolls)'],
    },
    {
      name: 'Romantic Sunset Beach Experience',
      duration: '2.5 Hours',
      price: '$480.000 COP / Couple',
      desc: 'Private golden-hour ride along the shoreline in Manzanillo del Mar with private guide, beachside toast, and romantic setup.',
      features: ['100% Private tour for 2', 'Sparkling toast & snacks on the beach', 'Photo & video assistance', 'Medical insurance included'],
    },
    {
      name: 'ATV Beach & Trail Adventure',
      duration: '1.5 Hours',
      price: '$280.000 COP / ATV',
      desc: 'Off-road quad tour across Manzanillo del Mar dunes, coastal trails, and rural North Zone tracks (+$60.000 COP passenger).',
      features: ['Automatic ATVs', 'Safety helmet & gear', 'Guided beach & dirt route', 'Medical insurance included'],
    },
    {
      name: 'VIP Door-to-Door Package',
      duration: '3.5 Hours Total',
      price: '+$120.000 COP Transport',
      desc: 'Private round-trip pickup in A/C vehicle directly from your hotel or Airbnb in Bocagrande, Walled City, Getsemaní, or Morros.',
      features: ['Private A/C SUV or Van', 'Direct route via Gran Manglar Viaduct', 'Zero toll fees on route', 'Flexible departure times'],
    },
  ];

  return (
    <section id="plans" className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Cartagena Horseback Riding Packages & Prices
      </h2>
      <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
        All tours depart from our ranch in Manzanillo del Mar (North Zone), just 20 minutes from the Historic Center with zero tolls.
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
              href="#quoter"
              className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition"
            >
              Quote This Plan
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
