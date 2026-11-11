import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICULOS_BLOG } from '@/lib/blogArticulos';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const art = ARTICULOS_BLOG.find((a) => a.slug === slug);
  if (!art) return { title: 'Artículo no encontrado' };
  return {
    title: `${art.titulo} | Horseback Cartagena`,
    description: art.resumen,
    alternates: { canonical: `https://horsebackcartagena.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const art = ARTICULOS_BLOG.find((a) => a.slug === slug);
  if (!art) notFound();

  const schemaBlog = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://horsebackcartagena.com/es' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://horsebackcartagena.com/blog' },
          { '@type': 'ListItem', position: 3, name: art.titulo, item: `https://horsebackcartagena.com/blog/${slug}` },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: art.titulo,
        description: art.resumen,
        datePublished: art.fecha,
        author: { '@type': 'Organization', name: 'Horseback Cartagena' },
      },
    ],
  };

  return (
    <div lang="es" className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBlog) }}
      />
      <header className="bg-slate-900 text-white py-4 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-amber-400">Horseback Cartagena</Link>
          <Link href="/blog" className="text-sm hover:underline">← Volver al Blog</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto py-12 px-4">
        <article className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-xs text-slate-400 mb-2">{art.fecha}</p>
          <h1 className="text-3xl font-extrabold mb-6">{art.titulo}</h1>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            {art.contenido.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200">
            <Link
              href="/reservar"
              className="inline-block bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl"
            >
              Cotizar Cabalgata en Manzanillo del Mar
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
