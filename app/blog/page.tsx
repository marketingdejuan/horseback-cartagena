import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICULOS_BLOG } from '@/lib/blogArticulos';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog de Cabalgatas en Cartagena y Turismo en Manzanillo del Mar',
  description: 'Guías, consejos de equitación en playa y recomendaciones para tu cabalgata en Cartagena de Indias.',
  alternates: { canonical: 'https://horsebackcartagena.com/blog' },
};

export default function BlogHubPage() {
  return (
    <div lang="es" className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-slate-900 text-white py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-amber-400">Horseback Cartagena</Link>
          <div className="flex gap-4 text-sm">
            <Link href="/">English Home</Link>
            <Link href="/es">Inicio Español</Link>
            <Link href="/reservar" className="bg-emerald-600 px-3 py-1 rounded-lg">Reservar</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Blog y Guías de Cabalgatas en Cartagena de Indias
        </h1>
        <p className="text-slate-600 mb-8">
          Consejos prácticos para disfrutar tu recorrido a caballo por las playas de Manzanillo del Mar (Zona Norte).
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {ARTICULOS_BLOG.map((art) => (
            <article key={art.slug} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-xs text-slate-400 mb-2">{art.fecha}</p>
              <h2 className="text-xl font-bold mb-2">
                <Link href={`/blog/${art.slug}`} className="hover:text-emerald-700">
                  {art.titulo}
                </Link>
              </h2>
              <p className="text-sm text-slate-600 mb-4">{art.resumen}</p>
              <Link href={`/blog/${art.slug}`} className="text-sm font-semibold text-emerald-700 hover:underline">
                Leer artículo completo →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
