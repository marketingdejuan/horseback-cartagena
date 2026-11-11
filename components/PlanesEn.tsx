import React from 'react';
import { Check, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export default function PlanesEn({ basePrice = 150000 }: { basePrice?: number }) {
  const usdRate = 4000;
  const baseUsd = Math.round(basePrice / usdRate);

  const planes = [
    {
      badge: 'MOST POPULAR',
      highlight: true,
      name: 'Caribbean Beach & Mangrove Ride',
      duration: '2 Hours',
      priceCop: `$${basePrice.toLocaleString('es-CO')} COP`,
      priceUsd: `~$${baseUsd} USD / person`,
      desc: 'Ride gentle Colombian Paso Fino horses along the uncrowded shoreline of Manzanillo del Mar and coastal mangrove trails.',
      features: [
        'Gentle horses matched to your experience',
        'Bilingual local guide assistance',
        'Full medical insurance included',
        '20 mins from Walled City (Zero tolls)',
      ],
    },
    {
      badge: 'COUPLE FAVORITE',
      highlight: false,
      name: 'Golden Hour Sunset Private Ride',
      duration: '2.5 Hours',
      priceCop: '$480.000 COP',
      priceUsd: '~$120 USD / couple',
      desc: '100% private sunset ride for two along the Caribbean beach with a beachside sparkling toast, setup, and photo session.',
      features: [
        '100% Private tour exclusively for 2',
        'Sparkling toast & snacks by the ocean',
        'Professional photo & video capture',
        'Medical insurance included',
      ],
    },
    {
      badge: 'ADRENALINE',
      highlight: false,
      name: 'ATV Beach & Dunes Adventure',
      duration: '1.5 Hours',
      priceCop: '$280.000 COP',
      priceUsd: '~$70 USD / ATV',
      desc: 'Off-road quad tour across Manzanillo del Mar coastal dunes, virgin beaches, and rural North Zone trails (+$15 USD passenger).',
      features: [
        'Automatic high-power ATVs',
        'Sanitized helmet & safety gear',
        'Guided beach & off-road trail route',
        'Medical insurance included',
      ],
    },
    {
      badge: 'HASSLE-FREE',
      highlight: false,
      name: 'VIP Hotel Pickup Add-On',
      duration: 'Round-Trip A/C',
      priceCop: '+$120.000 COP',
      priceUsd: '~$30 USD / group (1-4 pax)',
      desc: 'Private round-trip door-to-door pickup in an air-conditioned SUV directly from your hotel or Airbnb in Cartagena.',
      features: [
        'Pickup in Walled City, Getsemaní & Bocagrande',
        'Direct route via Gran Manglar Viaduct',
        '100% Toll-free highway route',
        'Driver waits for you at the ranch',
      ],
    },
  ];

  return (
    <section id="plans" className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3.5 py-1.5 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Transparent Pricing • No Hidden Fees
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Cartagena Horseback Riding Packages
        </h2>
        <p className="text-slate-600 text-lg">
          All tours depart daily from our private ranch in <strong>Manzanillo del Mar (North Zone)</strong>, just 20 minutes from the Historic Center with zero highway tolls.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planes.map((p, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-6 flex flex-col justify-between transition border ${
              p.highlight
                ? 'bg-slate-900 text-white border-amber-400 shadow-xl ring-2 ring-amber-400/50'
                : 'bg-white text-slate-900 border-slate-200 shadow-sm hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                    p.highlight
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {p.badge}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium ${
                    p.highlight ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" /> {p.duration}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 leading-snug">{p.name}</h3>

              <div className="mb-4">
                <p
                  className={`text-2xl font-extrabold ${
                    p.highlight ? 'text-amber-400' : 'text-emerald-700'
                  }`}
                >
                  {p.priceUsd}
                </p>
                <p
                  className={`text-xs font-medium ${
                    p.highlight ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Official rate: {p.priceCop}
                </p>
              </div>

              <p
                className={`text-sm mb-6 leading-relaxed ${
                  p.highlight ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {p.desc}
              </p>

              <ul className="text-sm space-y-2.5 mb-8">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        p.highlight ? 'text-amber-400' : 'text-emerald-600'
                      }`}
                    />
                    <span className={p.highlight ? 'text-slate-200' : 'text-slate-700'}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#quoter"
              className={`w-full text-center font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 ${
                p.highlight
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Select & Quote Online
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
