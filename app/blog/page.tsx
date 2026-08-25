import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowLeft, Home, ChevronRight, BookOpen } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

// MAGIA SEO PARA LA PÁGINA PRINCIPAL DEL BLOG
export const metadata: Metadata = {
  title: 'Blog de Cabalgatas | Cabalgatas Medellín',
  description: 'Descubre los mejores consejos, rutas y beneficios de montar a caballo en Antioquia.',
};

// TRAER LOS ARTÍCULOS DESDE FIREBASE EN EL SERVIDOR (SÚPER RÁPIDO)
async function getBlogData() {
  const docSnap = await getDoc(doc(db, "configuracion", "general"));
  if (docSnap.exists()) {
    return docSnap.data().blogPosts || [];
  }
  return [];
}

export default async function BlogIndex() {
  const posts = await getBlogData();

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-24 selection:bg-amber-200">
      
      {/* HEADER ELEGANTE */}
      <header className="bg-stone-900 w-full p-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4 text-white max-w-6xl mx-auto w-full">
          <a href="/#blog" className="p-3 bg-stone-800 rounded-full hover:bg-stone-700 transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5"/>
          </a>
          <h1 className="text-2xl font-black tracking-wide">Blog Equino</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {/* MIGAS DE PAN (BREADCRUMBS) */}
        <nav className="flex items-center gap-2 text-sm font-bold text-stone-500 mb-10">
          <a href="/" className="hover:text-amber-600 flex items-center gap-1 transition-colors"><Home size={16} /> Inicio</a>
          <ChevronRight size={16} className="text-stone-300" />
          <span className="text-stone-800 bg-stone-200 px-3 py-1 rounded-full border border-stone-300">Blog</span>
        </nav>

        {/* TÍTULO PRINCIPAL */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-4 flex items-center gap-4">
            <BookOpen className="w-10 h-10 text-amber-500" />
            Artículos Recientes
          </h2>
          <p className="text-stone-600 text-lg font-medium max-w-2xl">
            Aprende todo sobre el mundo equino, descubre rutas increíbles y prepárate para tu próxima aventura con nosotros.
          </p>
        </div>

        {/* GRILLA DE ARTÍCULOS (TARJETAS PREMIUM) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <a 
              key={post.id} 
              href={`/blog/${post.slug}`} 
              className="bg-white rounded-3xl shadow-sm border-2 border-stone-100 overflow-hidden hover:shadow-2xl hover:border-amber-400 transition-all duration-300 group flex flex-col"
            >
              <div className="relative w-full h-56 bg-stone-200 overflow-hidden">
                {/* COMPONENTE NEXT/IMAGE PARA VELOCIDAD EXTREMA */}
                <Image 
                  src={post.image || 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=800'} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-black text-2xl mb-3 text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                <p className="text-stone-500 font-medium mb-8 line-clamp-3 flex-grow leading-relaxed">
                  {post.metaDesc || post.content}
                </p>
                <div className="flex items-center text-amber-600 font-extrabold mt-auto group-hover:translate-x-2 transition-transform">
                  Leer artículo <ChevronRight size={20} className="ml-1"/>
                </div>
              </div>
            </a>
          ))}

          {/* MENSAJE SI NO HAY ARTÍCULOS */}
          {posts.length === 0 && (
            <div className="col-span-full bg-white rounded-3xl border-2 border-dashed border-stone-300 p-20 text-center">
              <BookOpen className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-900 font-black text-2xl mb-2">Aún no hay artículos</p>
              <p className="text-stone-500 font-medium">Ve al Panel Admin y publica tu primer artículo para el Blog.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}