'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Planes from '@/components/Planes';
import PlanesEn from '@/components/PlanesEn';

export const MARCA_SITIO = 'horsebackcartagena.com';
export const ERP_URL = 'https://admin.cabalgatas.co';

interface ClientePageProps {
  lang?: 'en' | 'es';
}

export default function ClientePage({ lang = 'en' }: ClientePageProps) {
  const isEn = lang === 'en';

  // Estados sincronizados con el ERP (con valores provisionales para Cartagena)
  const [basePrice, setBasePrice] = useState<number>(150000);
  const [guidePrice, setGuidePrice] = useState<number>(60000);
  const [whatsappNumber, setWhatsappNumber] = useState<string>('573000000000');
  const [businessName, setBusinessName] = useState<string>('Horseback Cartagena');

  // Estados del Cotizador Interactivo
  const [riders, setRiders] = useState<number>(2);
  const [date, setDate] = useState<string>('');
  const [privateGuide, setPrivateGuide] = useState<boolean>(true);
  const [vipTransport, setVipTransport] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');

  useEffect(() => {
    let active = true;
    fetch(`${ERP_URL}/api/ajustes?brandName=${encodeURIComponent(MARCA_SITIO)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        if (Number(data.basePrice) > 0) setBasePrice(Number(data.basePrice));
        if (Number(data.guidePrice) >= 0) setGuidePrice(Number(data.guidePrice));
        if (data.whatsappNumber) {
          const cleanPhone = String(data.whatsappNumber).replace(/[^\d]/g, '');
          if (cleanPhone.length >= 10) setWhatsappNumber(cleanPhone);
        }
        if (data.businessName) setBusinessName(String(data.businessName));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Pilar 6: Sanitización estricta de entradas para prevenir DOM XSS
  const jinetesSeguros = Math.min(30, Math.max(1, Number(riders) || 1));
  const fechaSegura = String(date || '').replace(/[^0-9-]/g, '').slice(0, 10);
  const telefonoSeguro = String(customerPhone || '').replace(/[^0-9+]/g, '').slice(0, 20);
  const nombreSeguro = String(customerName || '').replace(/[<>]/g, '').trim().slice(0, 80);

  const transportCost = vipTransport ? 120000 : 0;
  const guideCost = privateGuide ? guidePrice : 0;
  const totalEstimado = jinetesSeguros * basePrice + guideCost + transportCost;

  // Pilar 1: Liberación del hilo principal en móvil para tracking
  const trackWhatsAppClick = () => {
    setTimeout(() => {
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'conversion_whatsapp', {
          event_category: 'lead',
          event_label: MARCA_SITIO,
          value: totalEstimado,
        });
      }
    }, 0);
  };

  // Pilar 1: Envío no bloqueante al ERP con keepalive: true y apertura instantánea de WhatsApp
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackWhatsAppClick();

    try {
      fetch(`${ERP_URL}/api/reservas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          brandName: MARCA_SITIO,
          customerName: nombreSeguro || (isEn ? 'Web Visitor' : 'Visitante Web'),
          customerPhone: telefonoSeguro,
          reservationDate: fechaSegura,
          ridersCount: jinetesSeguros,
          privateGuide,
          vipTransport,
          totalAmount: totalEstimado,
          funnelStage: 'Nueva',
        }),
      }).catch(() => {});
    } catch {}

    const msg = isEn
      ? `Hello ${businessName}! I would like to book a beach horseback ride in Manzanillo del Mar, Cartagena:\n- Riders: ${jinetesSeguros}\n- Date: ${fechaSegura || 'Flexible'}\n- Private Guide: ${privateGuide ? 'Yes' : 'No'}\n- VIP Hotel Pickup: ${vipTransport ? 'Yes' : 'No'}\n- Name: ${nombreSeguro || 'Guest'}\n- Estimated Total: $${totalEstimado.toLocaleString('es-CO')} COP`
      : `¡Hola ${businessName}! Quiero reservar una cabalgata en la playa de Manzanillo del Mar, Cartagena:\n- Jinetes: ${jinetesSeguros}\n- Fecha: ${fechaSegura || 'Por definir'}\n- Guía Privado: ${privateGuide ? 'Sí' : 'No'}\n- Transporte VIP Hotel: ${vipTransport ? 'Sí' : 'No'}\n- Nombre: ${nombreSeguro || 'Cliente'}\n- Total Estimado: $${totalEstimado.toLocaleString('es-CO')} COP`;

    const waUrl = `https://wa.me/${encodeURIComponent(whatsappNumber)}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div lang={isEn ? 'en' : 'es'} className="min-h-screen flex flex-col">
      {/* Pilar 4: Menú de Navegación Superior Global Fijo */}
      <header className="sticky top-0 z-50 bg-slate-900/95 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={isEn ? '/' : '/es'} className="font-extrabold text-lg tracking-tight text-amber-400">
            Horseback Cartagena
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href={isEn ? '/' : '/es'} className="hover:text-amber-400">
              {isEn ? 'Home' : 'Inicio'}
            </Link>
            <Link href="/planes-cabalgatas-cartagena" className="hover:text-amber-400">
              {isEn ? 'Packages' : 'Planes'}
            </Link>
            <Link href="/cabalgatas-manzanillo-del-mar" className="hover:text-amber-400">
              {isEn ? 'Manzanillo Beach' : 'Sede Manzanillo'}
            </Link>
            <Link href="/tour-cuatrimotos-cartagena-manzanillo" className="hover:text-amber-400">
              {isEn ? 'ATVs' : 'Cuatrimotos'}
            </Link>
            <Link href="/cabalgata-romantica-parejas-cartagena" className="hover:text-amber-400">
              {isEn ? 'Couples' : 'Parejas'}
            </Link>
            <Link href="/blog" className="hover:text-amber-400">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href={isEn ? '/es' : '/'}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800"
            >
              {isEn ? 'Español 🇨🇴' : 'English 🇺🇸'}
            </Link>
            <Link
              href="/reservar"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg"
            >
              {isEn ? 'Book Now' : 'Reservar'}
            </Link>
          </div>
        </div>
      </header>

      {/* Pilar 1: Hero con Imagen Optimizada para LCP */}
      <section className="relative bg-slate-900 text-white py-16 md:py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <span className="inline-block bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {isEn
                ? '📍 Manzanillo del Mar (North Zone) • 20 Mins from Walled City • Zero Tolls'
                : '📍 Manzanillo del Mar (Zona Norte) • A 20 Min del Centro • Sin Peajes'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              {isEn
                ? 'Beach Horseback Riding in Cartagena de Indias'
                : 'Cabalgatas en la Playa en Cartagena de Indias'}
            </h1>
            <p className="text-slate-300 text-lg mb-6">
              {isEn
                ? 'Ride gentle Paso Fino horses along uncrowded Caribbean beaches and mangrove trails in Manzanillo del Mar. Only 20 minutes from Bocagrande and Getsemaní via the Gran Manglar Viaduct with no toll fees.'
                : 'Recorre a caballo las playas vírgenes y senderos de manglar en Manzanillo del Mar. A solo 20 minutos del Centro Histórico y Bocagrande por el Viaducto del Gran Manglar, 100% libre de peajes.'}
            </p>
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-700 shadow-lg">
              <Image
                src="/cabalgatas-en-medellin-y-caldas.webp"
                alt={
                  isEn
                    ? 'Horseback riding on Manzanillo del Mar beach in Cartagena Colombia'
                    : 'Cabalgatas en la playa de Manzanillo del Mar Cartagena Colombia'
                }
                fill
                priority={true}
                fetchPriority="high"
                quality={65}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 900px, 1200px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Cotizador en Línea sin backdrop-blur pesado para proteger INP móvil */}
          <div
            id={isEn ? 'quoter' : 'cotizador'}
            className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200"
          >
            <h2 className="text-2xl font-bold mb-1">
              {isEn ? 'Instant Online Quoter' : 'Cotizador en Línea al Instante'}
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              {isEn
                ? 'Calculate your exact price and confirm availability via WhatsApp.'
                : 'Calcula tu tarifa exacta al instante y confirma cupo por WhatsApp.'}
            </p>

            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  {isEn ? 'Number of Riders (1 - 30)' : 'Número de Jinetes (1 - 30)'}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRiders((r) => Math.max(1, r - 1))}
                    className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold w-12 text-center">{jinetesSeguros}</span>
                  <button
                    type="button"
                    onClick={() => setRiders((r) => Math.min(30, r + 1))}
                    className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    {isEn ? 'Your Name' : 'Tu Nombre'}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={isEn ? 'John Doe' : 'Tu nombre'}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    {isEn ? 'WhatsApp / Phone' : 'WhatsApp / Celular'}
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 / +57..."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  {isEn ? 'Preferred Date' : 'Fecha Tentativa'}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privateGuide}
                    onChange={(e) => setPrivateGuide(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>
                    {isEn
                      ? `Private Exclusive Guide (+$${guidePrice.toLocaleString('es-CO')} COP per group)`
                      : `Guía Privado Exclusivo (+$${guidePrice.toLocaleString('es-CO')} COP por grupo)`}
                  </span>
                </label>
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vipTransport}
                    onChange={(e) => setVipTransport(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>
                    {isEn
                      ? 'VIP Round-Trip Hotel Pickup (+$120.000 COP)'
                      : 'Transporte VIP Puerta a Puerta Hotel (+$120.000 COP)'}
                  </span>
                </label>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">
                  {isEn ? 'Estimated Total:' : 'Total Estimado:'}
                </span>
                <span className="text-2xl font-extrabold text-emerald-700">
                  ${totalEstimado.toLocaleString('es-CO')} COP
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl text-base shadow-md transition"
              >
                {isEn ? 'Send Quote via WhatsApp' : 'Enviar por WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Grilla de Planes según Idioma */}
      {isEn ? <PlanesEn basePrice={basePrice} /> : <Planes basePrice={basePrice} />}

      {/* Pilar 4: Clúster de Tarjetas de Enlaces Internos (Interlinking Completo) */}
      <section className="py-14 px-4 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            {isEn
              ? 'Explore Specialized Tours & Guides in Cartagena'
              : 'Explora Experiencias y Guías en Cartagena'}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <Link href="/cabalgatas-manzanillo-del-mar" className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 font-semibold">
              🏖️ {isEn ? 'Manzanillo del Mar Official Guide' : 'Guía Oficial Manzanillo del Mar'}
            </Link>
            <Link href="/en-horseback-riding-cartagena-tours" className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 font-semibold">
              🇺🇸 Horseback Riding Cartagena Tours (English)
            </Link>
            <Link href="/planes-cabalgatas-cartagena" className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 font-semibold">
              🐎 {isEn ? 'All Horseback Packages' : 'Planes de Cabalgatas en Cartagena'}
            </Link>
            <Link href="/alquiler-caballos-cartagena-precios" className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 font-semibold">
              💲 {isEn ? 'Horse Rental & Hourly Rates' : 'Alquiler de Caballos y Precios'}
            </Link>
            <Link href="/tour-cuatrimotos-cartagena-manzanillo" className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 font-semibold">
              🛞 {isEn ? 'ATV Beach Tours in Manzanillo' : 'Tour de Cuatrimotos en Manzanillo'}
            </Link>
            <Link href="/cabalgata-romantica-parejas-cartagena" className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 font-semibold">
              ❤️ {isEn ? 'Romantic Sunset Rides for Couples' : 'Cabalgata Romántica para Parejas'}
            </Link>
            <Link href="/cabalgatas-ninos-familias-cartagena" className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 font-semibold">
              👨‍👩‍👧 {isEn ? 'Kids & Family Safe Rides' : 'Cabalgatas para Niños y Familias'}
            </Link>
            <Link href="/cabalgata-vip-transporte-bocagrande-centro-morros" className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 font-semibold">
              🚐 {isEn ? 'VIP Hotel Pickup (Bocagrande & Walled City)' : 'Transporte VIP Bocagrande, Centro y Morros'}
            </Link>
            <Link href="/donde-montar-a-caballo-cerca-de-cartagena" className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 font-semibold">
              🗺️ {isEn ? 'Where to Ride Horses Near Cartagena' : 'Dónde Montar a Caballo cerca de Cartagena'}
            </Link>
          </div>
        </div>
      </section>

      {/* Pilar 4: Footer Global de 3 Columnas con Datos NAP Completos */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 mt-auto">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Horseback Cartagena</h3>
            <p className="mb-2">
              {isEn
                ? 'Beach & Mangrove Horseback Riding in Manzanillo del Mar, North Zone of Cartagena de Indias, Colombia.'
                : 'Cabalgatas por la playa y manglares en Manzanillo del Mar, Zona Norte de Cartagena de Indias, Colombia.'}
            </p>
            <p className="text-amber-400 font-semibold">
              {isEn ? '20 mins from the Walled City • Zero Tolls' : 'A 20 min del Centro Amurallado • Sin Peajes'}
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-3">
              {isEn ? 'Quick Links' : 'Enlaces Directos'}
            </h3>
            <ul className="space-y-2">
              <li><Link href="/cabalgatas-manzanillo-del-mar" className="hover:text-white">Manzanillo del Mar</Link></li>
              <li><Link href="/planes-cabalgatas-cartagena" className="hover:text-white">{isEn ? 'Packages & Pricing' : 'Planes y Precios'}</Link></li>
              <li><Link href="/tour-cuatrimotos-cartagena-manzanillo" className="hover:text-white">{isEn ? 'ATV Tours' : 'Cuatrimotos'}</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/reservar" className="hover:text-white">{isEn ? 'Book Online' : 'Reservar'}</Link></li>
              <li><Link href="/consultar" className="hover:text-white">{isEn ? 'Check Availability' : 'Consultar'}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-3">
              {isEn ? 'Contact & Location (NAP)' : 'Contacto y Ubicación (NAP)'}
            </h3>
            <p>📍 Playas de Manzanillo del Mar, Zona Norte, Cartagena, Bolívar, Colombia</p>
            <p className="mt-2">📞 WhatsApp: +{whatsappNumber}</p>
            <p className="mt-2">🕒 {isEn ? 'Daily Departures: 8:00 AM – 5:30 PM' : 'Salidas Diarias: 8:00 AM – 5:30 PM'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
