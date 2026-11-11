'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Compass,
  Sun,
  HeartHandshake,
  Car,
} from 'lucide-react';
import Planes from '@/components/Planes';
import PlanesEn from '@/components/PlanesEn';

export const MARCA_SITIO = 'horsebackcartagena.com';
export const ERP_URL = 'https://admin.cabalgatas.co';

interface ClientePageProps {
  lang?: 'en' | 'es';
}

export default function ClientePage({ lang = 'en' }: ClientePageProps) {
  const isEn = lang === 'en';
  const usdRate = 4000;

  // Estados sincronizados con el ERP
  const [basePrice, setBasePrice] = useState<number>(150000);
  const [guidePrice, setGuidePrice] = useState<number>(60000);
  const [whatsappNumber, setWhatsappNumber] = useState<string>('573000000000');
  const [businessName, setBusinessName] = useState<string>('Horseback Cartagena');

  // Estados del Cotizador Interactivo
  const [riders, setRiders] = useState<number>(2);
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('Sunset (4:00 PM)');
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

  // Pilar 6: Sanitización estricta contra DOM XSS
  const jinetesSeguros = Math.min(30, Math.max(1, Number(riders) || 1));
  const fechaSegura = String(date || '').replace(/[^0-9-]/g, '').slice(0, 10);
  const telefonoSeguro = String(customerPhone || '').replace(/[^0-9+]/g, '').slice(0, 20);
  const nombreSeguro = String(customerName || '').replace(/[<>]/g, '').trim().slice(0, 80);

  const transportCost = vipTransport ? 120000 : 0;
  const guideCost = privateGuide ? guidePrice : 0;
  const totalEstimado = jinetesSeguros * basePrice + guideCost + transportCost;
  const totalUsd = Math.round(totalEstimado / usdRate);

  // Pilar 1: Liberación del hilo principal en móvil (INP < 50ms)
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

  // Pilar 1: Envío al ERP con keepalive: true sin bloquear apertura de WhatsApp
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
          customerName: nombreSeguro || (isEn ? 'International Guest' : 'Visitante Web'),
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
      ? `Hello ${businessName}! I want to book a beach horseback ride in Manzanillo del Mar, Cartagena:\n• Riders: ${jinetesSeguros}\n• Preferred Date: ${fechaSegura || 'Flexible'}\n• Time Slot: ${timeSlot}\n• Private Guide: ${privateGuide ? 'Yes' : 'No'}\n• VIP Hotel Pickup: ${vipTransport ? 'Yes' : 'No'}\n• Name: ${nombreSeguro || 'Guest'}\n• Estimated Total: $${totalEstimado.toLocaleString('es-CO')} COP (~$${totalUsd} USD)`
      : `¡Hola ${businessName}! Quiero reservar una cabalgata en la playa de Manzanillo del Mar, Cartagena:\n• Jinetes: ${jinetesSeguros}\n• Fecha: ${fechaSegura || 'Por definir'}\n• Horario: ${timeSlot}\n• Guía Privado: ${privateGuide ? 'Sí' : 'No'}\n• Transporte VIP Hotel: ${vipTransport ? 'Sí' : 'No'}\n• Nombre: ${nombreSeguro || 'Cliente'}\n• Total Estimado: $${totalEstimado.toLocaleString('es-CO')} COP`;

    const waUrl = `https://wa.me/${encodeURIComponent(whatsappNumber)}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div lang={isEn ? 'en' : 'es'} className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Trust Bar para Turistas Internacionales */}
      <div className="bg-amber-400 text-slate-950 text-xs font-bold py-2 px-4 text-center">
        {isEn
          ? '⭐ #1 Rated Beach Horseback Riding in Cartagena • 20 Mins from Walled City • 100% Toll-Free Route'
          : '⭐ Cabalgatas en la Playa #1 en Cartagena • A 20 Min del Centro Amurallado • Ruta 100% Sin Peajes'}
      </div>

      {/* Pilar 4: Menú de Navegación Superior Global Fijo */}
      <header className="sticky top-0 z-50 bg-slate-950 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={isEn ? '/' : '/es'} className="font-extrabold text-lg tracking-tight flex items-center gap-2">
            <span className="text-amber-400">🐎 Horseback</span>
            <span>Cartagena</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-200">
            <Link href={isEn ? '/' : '/es'} className="hover:text-amber-400 transition">
              {isEn ? 'Home' : 'Inicio'}
            </Link>
            <Link href="/planes-cabalgatas-cartagena" className="hover:text-amber-400 transition">
              {isEn ? 'Packages' : 'Planes'}
            </Link>
            <Link href="/cabalgatas-manzanillo-del-mar" className="hover:text-amber-400 transition">
              {isEn ? 'Manzanillo Beach' : 'Sede Manzanillo'}
            </Link>
            <Link href="/tour-cuatrimotos-cartagena-manzanillo" className="hover:text-amber-400 transition">
              {isEn ? 'ATVs' : 'Cuatrimotos'}
            </Link>
            <Link href="/cabalgata-romantica-parejas-cartagena" className="hover:text-amber-400 transition">
              {isEn ? 'Sunset Couples' : 'Parejas'}
            </Link>
            <Link href="/blog" className="hover:text-amber-400 transition">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href={isEn ? '/es' : '/'}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition"
            >
              {isEn ? '🇨🇴 Español' : '🇺🇸 English'}
            </Link>
            <a
              href={isEn ? '#quoter' : '#cotizador'}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold px-4 py-2 rounded-lg transition"
            >
              {isEn ? 'Book Now' : 'Reservar'}
            </a>
          </div>
        </div>
      </header>

      {/* Pilar 1: Hero con Imagen Optimizada para LCP y Cotizador Instantáneo */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          {/* Columna Izquierda (7 columnas): Propuesta de Valor + Foto Hero LCP */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2 bg-slate-800/90 border border-slate-700 text-amber-300 text-xs font-semibold px-3.5 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isEn
                  ? 'Manzanillo del Mar (North Zone) • 20 Mins from Walled City & Bocagrande'
                  : 'Manzanillo del Mar (Zona Norte) • A 20 Min del Centro y Bocagrande'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
              {isEn ? (
                <>
                  Private Beach{' '}
                  <span className="text-amber-400">Horseback Riding</span> in Cartagena
                </>
              ) : (
                <>
                  Cabalgatas en la Playa de{' '}
                  <span className="text-amber-400">Cartagena de Indias</span>
                </>
              )}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {isEn
                ? 'Escape the crowded city beaches and ride healthy, gentle Colombian Paso Fino horses along the virgin Caribbean coastline and mangrove trails of Manzanillo del Mar. Bilingual guides, VIP hotel pickup, and zero highway tolls.'
                : 'Sal de las playas congestionadas y recorre en caballos mansos de paso fino la costa virgen y los senderos de manglar de Manzanillo del Mar. Guías expertos, recogida VIP en tu hotel y ruta sin peajes.'}
            </p>

            {/* Insignias de Confianza para Extranjeros */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400" /> 4.9 / 5.0
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isEn ? '180+ Verified Reviews' : '+180 Reseñas Reales'}
                </p>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                  <Clock className="w-4 h-4" /> 20 Mins
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isEn ? 'From Walled City' : 'Desde el Centro'}
                </p>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                  <HeartHandshake className="w-4 h-4" /> Ethical Care
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isEn ? 'Healthy Ranch Horses' : 'Caballos Bien Cuidados'}
                </p>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" /> Insured
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isEn ? 'Medical Policy Included' : 'Póliza Médica Incluida'}
                </p>
              </div>
            </div>

            {/* Imagen Hero Optimizada para LCP */}
            <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl">
              <Image
                src="/cabalgatas-en-medellin-y-caldas.webp"
                alt={
                  isEn
                    ? 'Private sunset beach horseback riding in Manzanillo del Mar Cartagena Colombia'
                    : 'Cabalgatas al atardecer en la playa de Manzanillo del Mar Cartagena Colombia'
                }
                fill
                priority={true}
                fetchPriority="high"
                quality={65}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 900px, 1200px"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 text-white px-4 py-2.5 rounded-xl flex items-center justify-between text-xs">
                <span>🏖️ Manzanillo del Mar Beach & Mangrove Trail</span>
                <span className="text-amber-400 font-bold">
                  {isEn ? 'From ~$38 USD' : 'Desde $150.000 COP'}
                </span>
              </div>
            </div>
          </div>

          {/* Columna Derecha (5 columnas): Cotizador Instantáneo en USD + COP */}
          <div
            id={isEn ? 'quoter' : 'cotizador'}
            className="lg:col-span-5 bg-white text-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border-2 border-amber-400/40"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                {isEn ? 'Instant Availability' : 'Cupos en Tiempo Real'}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {isEn ? 'No Prepayment Required' : 'Reserva Directa'}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
              {isEn ? 'Book Your Beach Ride' : 'Cotiza tu Cabalgata al Instante'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-5">
              {isEn
                ? 'Calculate your total in USD & COP and confirm directly with our bilingual team on WhatsApp.'
                : 'Calcula tu tarifa exacta y confirma disponibilidad inmediata por WhatsApp.'}
            </p>

            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-sm font-bold text-slate-800">
                    {isEn ? 'Number of Riders' : 'Número de Jinetes'}
                  </label>
                  <span className="text-xs text-slate-500">
                    {isEn ? 'Kids (3+) & adults welcome' : 'Niños (3+) y adultos'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRiders((r) => Math.max(1, r - 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 font-extrabold text-lg"
                  >
                    -
                  </button>
                  <span className="text-xl font-extrabold w-8 text-center">{jinetesSeguros}</span>
                  <button
                    type="button"
                    onClick={() => setRiders((r) => Math.min(30, r + 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 font-extrabold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    {isEn ? 'Preferred Date' : 'Fecha del Tour'}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    {isEn ? 'Preferred Time' : 'Horario Preferido'}
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium bg-white"
                  >
                    <option value="Morning Breeze (8:30 AM)">
                      {isEn ? '🌅 Morning (8:30 AM)' : '🌅 Mañana (8:30 AM)'}
                    </option>
                    <option value="Mid-Morning (10:30 AM)">
                      {isEn ? '☀️ Mid-Morning (10:30 AM)' : '☀️ Media Mañana (10:30 AM)'}
                    </option>
                    <option value="Golden Hour Sunset (4:00 PM)">
                      {isEn ? '🌇 Sunset Ride (4:00 PM)' : '🌇 Atardecer (4:00 PM)'}
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    {isEn ? 'Your Name' : 'Tu Nombre'}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={isEn ? 'e.g. Sarah Jenkins' : 'Tu nombre'}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    {isEn ? 'WhatsApp Phone' : 'WhatsApp / Celular'}
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 (555) ... / +57..."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={privateGuide}
                    onChange={(e) => setPrivateGuide(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-emerald-600"
                  />
                  <div>
                    <span className="font-bold block text-slate-900">
                      {isEn
                        ? '100% Private Tour (Exclusive Guide for Your Group)'
                        : 'Tour 100% Privado (Guía Exclusivo para tu Grupo)'}
                    </span>
                    <span className="text-slate-500 text-xs">
                      +${guidePrice.toLocaleString('es-CO')} COP (~$
                      {Math.round(guidePrice / usdRate)} USD total per group)
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={vipTransport}
                    onChange={(e) => setVipTransport(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-emerald-600"
                  />
                  <div>
                    <span className="font-bold block text-slate-900">
                      {isEn
                        ? 'VIP Round-Trip Hotel / Airbnb Pickup (A/C Vehicle)'
                        : 'Transporte VIP Puerta a Puerta Hotel / Airbnb'}
                    </span>
                    <span className="text-slate-500 text-xs">
                      +$120.000 COP (~$30 USD round-trip from Walled City / Bocagrande)
                    </span>
                  </div>
                </label>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block">
                    {isEn ? 'Estimated Total' : 'Total Estimado'}
                  </span>
                  <span className="text-xs text-amber-400 font-semibold">
                    ${totalEstimado.toLocaleString('es-CO')} COP
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                    ~${totalUsd} USD
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    {isEn ? 'All taxes & insurance included' : 'Seguro médico incluido'}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-4 rounded-2xl text-base shadow-lg transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {isEn
                  ? 'Confirm Availability via WhatsApp'
                  : 'Confirmar Cupo por WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Sección Exclusiva para Extranjeros: Cómo Funciona la Experiencia (4 Pasos) */}
      <section className="py-16 px-4 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              {isEn ? 'Seamless Experience' : 'Experiencia Paso a Paso'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-3">
              {isEn
                ? 'What to Expect on Your Cartagena Beach Ride'
                : '¿Cómo es el Recorrido en Manzanillo del Mar?'}
            </h2>
            <p className="text-slate-600">
              {isEn
                ? 'Designed specifically for international travelers seeking authentic nature, safety, and zero street-vendor harassment.'
                : 'Un recorrido seguro y privado lejos del ruido urbano, a solo 20 minutos del Centro Histórico.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <Car className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-bold text-lg mb-2">
                {isEn ? '1. 20-Min Toll-Free Arrival' : '1. Llegada en 20 Min Sin Peajes'}
              </h3>
              <p className="text-sm text-slate-600">
                {isEn
                  ? 'Arrive easily by Uber/taxi or choose our VIP A/C hotel pickup from the Walled City, Getsemaní, Bocagrande, or Morros via the Gran Manglar Viaduct.'
                  : 'Llega fácil en carro/Uber o solicita nuestra recogida VIP en hotel desde Bocagrande, Centro o Morros sin pagar un solo peaje.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <HeartHandshake className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">
                {isEn ? '2. Personalized Horse Match' : '2. Asignación de Caballo'}
              </h3>
              <p className="text-sm text-slate-600">
                {isEn
                  ? 'Whether it is your first time on a horse or you are an experienced rider, we match you with a gentle, well-fed Colombian Paso Fino horse.'
                  : 'Asignamos caballos escuela 100% mansos para principiantes o niños, y ejemplares briosos para jinetes con experiencia.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <Compass className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-bold text-lg mb-2">
                {isEn ? '3. Mangrove & Coastal Trails' : '3. Sendero de Manglares y Playa'}
              </h3>
              <p className="text-sm text-slate-600">
                {isEn
                  ? 'Begin riding through peaceful native forest and coastal lagoons before entering the wide, uncrowded sands of Manzanillo del Mar.'
                  : 'Iniciamos por senderos ecológicos costeros hasta salir a la inmensa playa abierta de Manzanillo del Mar.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <Sun className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">
                {isEn ? '4. Caribbean Shoreline & Photos' : '4. Orilla del Mar y Fotografías'}
              </h3>
              <p className="text-sm text-slate-600">
                {isEn
                  ? 'Ride right along the Caribbean waves while your private guide captures unforgettable photos and videos with your phone.'
                  : 'Cabalga junto a las olas del mar Caribe mientras nuestro guía toma las mejores fotos y videos de tu grupo.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grilla de Planes según Idioma */}
      {isEn ? <PlanesEn basePrice={basePrice} /> : <Planes basePrice={basePrice} />}

      {/* Reseñas de Viajeros Internacionales (Social Proof) */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              {isEn ? 'Verified Guest Stories' : 'Testimonios Reales'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
              {isEn
                ? 'Why International Travelers Love Our Ranch'
                : 'Lo que Dicen Nuestros Visitantes en Cartagena'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl">
              <div className="flex gap-1 text-amber-400 mb-3">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <p className="text-sm text-slate-200 mb-4 leading-relaxed">
                &ldquo;Best activity we did in Cartagena! Only 20 minutes from our hotel in the Walled City. The horses were healthy, calm, and riding along Manzanillo beach at sunset with zero crowds was magical.&rdquo;
              </p>
              <p className="text-xs font-bold text-amber-300">
                — Emily &amp; Mark R. • Austin, Texas 🇺🇸
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl">
              <div className="flex gap-1 text-amber-400 mb-3">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <p className="text-sm text-slate-200 mb-4 leading-relaxed">
                &ldquo;We booked the VIP pickup for our family with two kids (ages 6 and 9). The guides were super patient, held the lead rope for our youngest, and took amazing videos of us riding by the water.&rdquo;
              </p>
              <p className="text-xs font-bold text-amber-300">
                — David L. • Toronto, Canada 🇨🇦
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl">
              <div className="flex gap-1 text-amber-400 mb-3">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <p className="text-sm text-slate-200 mb-4 leading-relaxed">
                &ldquo;Super easy booking via WhatsApp. Transparent prices without the crazy tourist markups of cruise agencies. We combined the horses and ATVs in Manzanillo del Mar—10/10!&rdquo;
              </p>
              <p className="text-xs font-bold text-amber-300">
                — Sophie M. • London, UK 🇬🇧
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Visibles en Portada para Posicionamiento Semántico */}
      <section className="py-16 px-4 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-10">
            {isEn
              ? 'Frequently Asked Questions — Cartagena Horseback Riding'
              : 'Preguntas Frecuentes sobre Nuestras Cabalgatas en Cartagena'}
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                {isEn
                  ? 'How far is Manzanillo del Mar from the Walled City and Bocagrande?'
                  : '¿A qué distancia está Manzanillo del Mar del Centro y Bocagrande?'}
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                {isEn
                  ? 'Our ranch is located in Manzanillo del Mar (North Zone), just 20 minutes from the Walled City, Getsemaní, and Bocagrande, and only 12 minutes from Rafael Núñez Airport and Morros via the Gran Manglar Viaduct with zero highway tolls.'
                  : 'Estamos en Manzanillo del Mar (Zona Norte), a solo 20 minutos del Centro Histórico, Getsemaní y Bocagrande, y a 12 minutos del Aeropuerto y Morros por el Viaducto del Gran Manglar, sin pagar peajes.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                {isEn
                  ? 'Do I need previous riding experience?'
                  : '¿Necesito experiencia previa para montar a caballo?'}
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                {isEn
                  ? 'Not at all! Over 80% of our international guests are first-time riders. We match you with calm, gentle Colombian horses and provide a safety briefing and guide accompaniment throughout the entire beach ride.'
                  : 'No necesitas experiencia. Más del 80% de nuestros visitantes montan por primera vez; asignamos caballos sumamente mansos y vas acompañado por nuestro guía en todo momento.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                {isEn
                  ? 'What should we wear and bring for the beach ride?'
                  : '¿Qué ropa debemos llevar a la cabalgata en la playa?'}
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                {isEn
                  ? 'We recommend comfortable long pants or athletic wear, closed-toe shoes or secure sandals, sunglasses, reef-safe sunscreen, and a hat. Our guides will gladly take photos and videos with your phone.'
                  : 'Recomendamos ropa fresca (pantalón ligero o deportivo), calzado cerrado o sandalias ajustables, gafas de sol, sombrero y bloqueador solar.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pilar 4: Clúster de Tarjetas de Enlaces Internos (Interlinking Completo) */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            {isEn
              ? 'Explore All Cartagena Tours & Local Guides'
              : 'Explora Experiencias y Guías en Cartagena'}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <Link href="/cabalgatas-manzanillo-del-mar" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 font-semibold shadow-sm">
              🏖️ {isEn ? 'Manzanillo del Mar Official Guide' : 'Guía Oficial Manzanillo del Mar'}
            </Link>
            <Link href="/en-horseback-riding-cartagena-tours" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 font-semibold shadow-sm">
              🇺🇸 Horseback Riding Cartagena Tours (English)
            </Link>
            <Link href="/planes-cabalgatas-cartagena" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 font-semibold shadow-sm">
              🐎 {isEn ? 'All Horseback Packages' : 'Planes de Cabalgatas en Cartagena'}
            </Link>
            <Link href="/alquiler-caballos-cartagena-precios" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 font-semibold shadow-sm">
              💲 {isEn ? 'Horse Rental & Hourly Rates' : 'Alquiler de Caballos y Precios'}
            </Link>
            <Link href="/tour-cuatrimotos-cartagena-manzanillo" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 font-semibold shadow-sm">
              🛞 {isEn ? 'ATV Beach Tours in Manzanillo' : 'Tour de Cuatrimotos en Manzanillo'}
            </Link>
            <Link href="/cabalgata-romantica-parejas-cartagena" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 font-semibold shadow-sm">
              ❤️ {isEn ? 'Romantic Sunset Rides for Couples' : 'Cabalgata Romántica para Parejas'}
            </Link>
            <Link href="/cabalgatas-ninos-familias-cartagena" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 font-semibold shadow-sm">
              👨‍👩‍👧 {isEn ? 'Kids & Family Safe Rides' : 'Cabalgatas para Niños y Familias'}
            </Link>
            <Link href="/cabalgata-vip-transporte-bocagrande-centro-morros" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 font-semibold shadow-sm">
              🚐 {isEn ? 'VIP Hotel Pickup (Bocagrande & Walled City)' : 'Transporte VIP Bocagrande, Centro y Morros'}
            </Link>
            <Link href="/donde-montar-a-caballo-cerca-de-cartagena" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 font-semibold shadow-sm">
              🗺️ {isEn ? 'Where to Ride Horses Near Cartagena' : 'Dónde Montar a Caballo cerca de Cartagena'}
            </Link>
          </div>
        </div>
      </section>

      {/* Pilar 4: Footer Global de 3 Columnas con Datos NAP Completos */}
      <footer className="bg-slate-950 text-slate-300 py-12 px-4 mt-auto border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">🐎 Horseback Cartagena</h3>
            <p className="mb-2 text-slate-400">
              {isEn
                ? 'Private Beach & Mangrove Horseback Riding in Manzanillo del Mar, North Zone of Cartagena de Indias, Colombia.'
                : 'Cabalgatas privadas por la playa y manglares en Manzanillo del Mar, Zona Norte de Cartagena de Indias, Colombia.'}
            </p>
            <p className="text-amber-400 font-semibold">
              {isEn ? '20 mins from the Walled City • Zero Tolls' : 'A 20 min del Centro Amurallado • Sin Peajes'}
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-3">
              {isEn ? 'Quick Links' : 'Enlaces Directos'}
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/cabalgatas-manzanillo-del-mar" className="hover:text-white">Manzanillo del Mar</Link></li>
              <li><Link href="/planes-cabalgatas-cartagena" className="hover:text-white">{isEn ? 'Packages & Pricing' : 'Planes y Precios'}</Link></li>
              <li><Link href="/tour-cuatrimotos-cartagena-manzanillo" className="hover:text-white">{isEn ? 'ATV Beach Tours' : 'Cuatrimotos'}</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/reservar" className="hover:text-white">{isEn ? 'Book Online' : 'Reservar'}</Link></li>
              <li><Link href="/consultar" className="hover:text-white">{isEn ? 'Check Availability' : 'Consultar'}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-3">
              {isEn ? 'Contact & Location (NAP)' : 'Contacto y Ubicación (NAP)'}
            </h3>
            <p className="text-slate-400">📍 Playas de Manzanillo del Mar, Zona Norte, Cartagena, Bolívar, Colombia</p>
            <p className="mt-2 text-slate-400">📞 WhatsApp: +{whatsappNumber}</p>
            <p className="mt-2 text-slate-400">🕒 {isEn ? 'Daily Departures: 8:00 AM – 5:30 PM' : 'Salidas Diarias: 8:00 AM – 5:30 PM'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
