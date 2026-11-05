import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Home, ChevronRight, Calendar, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { ARTICULOS_BLOG_SEO } from '../../../lib/blogArticulos';

const URL_SITIO = 'https://cabalgatamedellin.com';

// 🔥 FORZAR RENDERIZADO EN SERVIDOR PARA EVITAR CACHÉ 404 DE DOCKER/COOLIFY
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const rawSlug = decodeURIComponent(String(resolvedParams?.slug || '')).trim().toLowerCase();
  const articulo = ARTICULOS_BLOG_SEO.find((a) => a.slug.toLowerCase() === rawSlug);

  if (!articulo) {
    return {
      title: 'Guía de Cabalgatas en Medellín | Cabalgata Medellín',
    };
  }

  const urlArticulo = `${URL_SITIO}/blog/${articulo.slug}`;

  return {
    title: `${articulo.title} | Cabalgata Medellín`,
    description: articulo.metaDesc,
    alternates: {
      canonical: urlArticulo,
    },
    openGraph: {
      title: articulo.title,
      description: articulo.metaDesc,
      url: urlArticulo,
      siteName: 'Cabalgata Medellín',
      locale: 'es_CO',
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: { params: any }) {
  const resolvedParams = await Promise.resolve(params);
  const rawSlug = decodeURIComponent(String(resolvedParams?.slug || '')).trim().toLowerCase();
  const articulo = ARTICULOS_BLOG_SEO.find((a) => a.slug.toLowerCase() === rawSlug);

  if (!articulo) {
    notFound();
  }

  const urlArticulo = `${URL_SITIO}/blog/${articulo.slug}`;

  const schemaArticle = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Cabalgatas en Medellín", "item": URL_SITIO },
          { "@type": "ListItem", "position": 2, "name": "Blog y Guías", "item": `${URL_SITIO}/blog` },
          { "@type": "ListItem", "position": 3, "name": articulo.title, "item": urlArticulo }
        ]
      },
      {
        "@type": "BlogPosting",
        "headline": articulo.title,
        "description": articulo.metaDesc,
        "image": `${URL_SITIO}${articulo.image}`,
        "datePublished": articulo.date,
        "dateModified": "2026-11-05",
        "author": {
          "@type": "Organization",
          "name": "Cabalgata Medellín",
          "url": URL_SITIO
        },
        "publisher": {
          "@type": "Organization",
          "name": "Cabalgata Medellín",
          "url": URL_SITIO
        },
        "mainEntityOfPage": urlArticulo
      }
    ]
  };

  const otrosArticulos = ARTICULOS_BLOG_SEO.filter((a) => a.slug !== articulo.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fbfbfd] font-sans text-zinc-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />

      <header className="relative bg-zinc-900 text-white py-16 md:py-24 px-6 overflow-hidden">
        <Image 
          src={articulo.image} 
          alt={articulo.title} 
          fill 
          priority={true}
          quality={65}
          className="object-cover opacity-35" 
          sizes="100vw"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-bold text-zinc-300 mb-6">
            <Link href="/" className="hover:text-amber-400 flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Inicio</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
            <Link href="/blog" className="hover:text-amber-400">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-amber-400 truncate max-w-[220px]">{articulo.category}</span>
          </nav>

          <span className="inline-block bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold px-3.5 py-1 rounded-full mb-4">
            {articulo.category} • {articulo.readTime}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            {articulo.title}
          </h1>
          <p className="text-zinc-200 text-lg leading-relaxed">
            {articulo.intro}
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-12">
        <article className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.05)] p-8 md:p-12 border border-zinc-100 space-y-8">
          {articulo.secciones.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
                {sec.h2}
              </h2>
              {sec.parrafos.map((p, pIdx) => (
                <p key={pIdx} className="text-zinc-600 text-base md:text-lg leading-relaxed">
                  {p}
                </p>
              ))}
              {sec.bullets && (
                <ul className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/60 space-y-3 mt-4">
                  {sec.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-zinc-700 font-medium text-sm md:text-base">
                      <span className="text-amber-600 font-extrabold mt-0.5">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-zinc-800">
            <p className="font-semibold leading-relaxed">{articulo.conclusion}</p>
          </div>

          <div className="bg-zinc-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" /> Póliza Magenta Seguros Incluida
              </div>
              <h3 className="text-xl font-extrabold mb-1">¿Quieres vivir esta experiencia en Caldas?</h3>
              <p className="text-zinc-400 text-sm">A solo 30 minutos de El Poblado y Laureles (Sin peajes).</p>
            </div>
            <Link 
              href={articulo.ctaLink} 
              className="shrink-0 bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 px-7 rounded-2xl shadow-lg flex items-center gap-2 transition-colors"
            >
              <Calendar className="w-5 h-5" /> {articulo.ctaTexto}
            </Link>
          </div>

          <div className="pt-6 border-t border-zinc-100">
            <h3 className="text-base font-extrabold text-zinc-900 mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-600" /> Planes y Rutas Relacionadas:
            </h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {articulo.enlacesRelacionados.map((enlace, i) => (
                <Link 
                  key={i} 
                  href={enlace.href}
                  className="p-3.5 rounded-xl bg-zinc-50 hover:bg-amber-50 border border-zinc-200 hover:border-amber-400 text-xs font-bold text-zinc-800 flex items-center justify-between transition-colors"
                >
                  <span>{enlace.texto}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600 shrink-0 ml-1" />
                </Link>
              ))}
            </div>
          </div>
        </article>

        <section className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm">
          <h2 className="text-xl font-extrabold text-zinc-900 mb-6">Continúa leyendo en nuestro Blog</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {otrosArticulos.map((otro) => (
              <Link 
                key={otro.slug} 
                href={`/blog/${otro.slug}`}
                className="p-4 rounded-2xl border border-zinc-200 hover:border-amber-500 transition-colors flex flex-col justify-between"
              >
                <span className="text-[11px] font-bold text-amber-600 mb-1">{otro.category}</span>
                <h3 className="font-bold text-sm text-zinc-900">{otro.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}