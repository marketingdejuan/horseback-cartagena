import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Home, Compass } from 'lucide-react';
import { ARTICULOS_BLOG_SEO } from '../../lib/blogArticulos';

const URL_SITIO = 'https://cabalgatamedellin.com';

export const metadata: Metadata = {
  title: 'Blog y Guías de Cabalgatas en Medellín | Consejos, Rutas y Precios',
  description: 'Aprende todo sobre las cabalgatas ecológicas en Medellín y Caldas, Antioquia: consejos para principiantes, qué ropa llevar, rutas seguras para niños y comparativas.',
  alternates: {
    canonical: `${URL_SITIO}/blog`,
  },
  openGraph: {
    title: 'Blog y Guías de Cabalgatas en Medellín | Cabalgata Medellín',
    description: 'Guías prácticas sobre turismo ecuestre, bienestar animal y rutas a caballo a 30 minutos de El Poblado.',
    url: `${URL_SITIO}/blog`,
    siteName: 'Cabalgata Medellín',
    locale: 'es_CO',
    type: 'website',
  },
};

export default async function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd] font-sans text-zinc-900">
      <header className="bg-zinc-900 text-white py-20 px-6 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-400 text-sm font-bold mb-6 hover:underline">
            <Home className="w-4 h-4" /> Volver a Cabalgata Medellín
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Guías y Blog de Cabalgatas en Medellín
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl">
            Consejos prácticos para jinetes principiantes, bienestar equino, qué ropa llevar y las mejores rutas ecológicas en Caldas, Antioquia (a 30 min de El Poblado).
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-14 space-y-16">
        <div className="grid md:grid-cols-2 gap-8">
          {ARTICULOS_BLOG_SEO.map((post) => (
            <article 
              key={post.slug} 
              className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <div className="relative h-52 w-full bg-zinc-200">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    quality={70}
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <span className="absolute top-4 left-4 bg-zinc-900/80 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-7">
                  <div className="text-xs text-zinc-400 font-semibold mb-2">
                    {post.readTime} • Caldas, Antioquia
                  </div>
                  <h2 className="text-xl font-extrabold text-zinc-900 mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-amber-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {post.metaDesc}
                  </p>
                </div>
              </div>
              <div className="px-7 pb-7 pt-2">
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="inline-flex items-center gap-2 text-amber-600 font-extrabold text-sm hover:text-amber-700"
                >
                  Leer guía completa <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section className="bg-zinc-900 text-white rounded-[2.5rem] p-8 md:p-10 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3 flex items-center gap-2">
            <Compass className="w-7 h-7 text-amber-400" /> ¿Listo para vivir la experiencia en la montaña?
          </h2>
          <p className="text-zinc-300 text-sm md:text-base mb-6">
            Explora nuestros planes directos en la Vereda Salinas de Caldas, Antioquia (a 30 minutos de El Poblado sin peajes):
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm font-bold">
            <Link href="/planes-cabalgatas-medellin" className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl text-amber-400 flex items-center justify-between">
              <span>Planes desde $100.000</span> <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tour-cuatrimotos-medellin-caldas" className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl text-amber-400 flex items-center justify-between">
              <span>Tour de Cuatrimotos</span> <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/cabalgata-romantica-parejas-medellin" className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl text-amber-400 flex items-center justify-between">
              <span>Plan Romántico Parejas</span> <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/cabalgatas-ninos-familias-medellin" className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl text-amber-400 flex items-center justify-between">
              <span>Cabalgata Niños (3+ años)</span> <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/cabalgata-vip-transporte-el-poblado-laureles" className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl text-amber-400 flex items-center justify-between">
              <span>Plan VIP con Transporte</span> <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/reservar" className="bg-green-600 hover:bg-green-700 p-4 rounded-2xl text-white flex items-center justify-between">
              <span>Reservar Cupo Ahora</span> <Calendar className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}