"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowLeft, Calendar, Loader2 } from 'lucide-react';

const MARCA_SITIO = 'cabalgatamedellin.com';

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`https://admin.cabalgatas.co/api/blog?brand=${MARCA_SITIO}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPosts(data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-20">
      <header className="bg-stone-900 text-white py-16 px-6 text-center rounded-b-[40px] shadow-xl">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-500 font-bold text-sm mb-6 hover:underline">
            <ArrowLeft size={16} /> Volver al Inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
            <BookOpen className="text-amber-500" size={36} /> Blog de Cabalgatas
          </h1>
          <p className="text-stone-300 max-w-xl mx-auto font-medium">
            Guías, recomendaciones y secretos para disfrutar de las mejores rutas ecológicas a caballo en Antioquia.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-12">
        {cargando ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-amber-600" size={44} />
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm">
            <p className="text-stone-500 font-bold text-lg">Próximamente publicaremos nuevos artículos.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`} 
                className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 bg-stone-100 overflow-hidden relative">
                    <img 
                      src={post.image || 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=800'} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold text-stone-400 flex items-center gap-1.5 mb-2">
                      <Calendar size={13} /> {new Date(post.createdAt).toLocaleDateString('es-CO')}
                    </p>
                    <h2 className="text-xl font-black text-stone-900 mb-3 group-hover:text-amber-700 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-stone-600 text-sm line-clamp-3 leading-relaxed">
                      {post.metaDesc || post.content}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <span className="text-amber-700 font-extrabold text-sm">Leer artículo completo →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}