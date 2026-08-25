import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowLeft, MessageCircle, Home, ChevronRight } from 'lucide-react';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

const normalizarTexto = (texto: string) => {
  return (texto || '').trim().toLowerCase();
};

async function getPost(slug: string) {
  if (!slug) return { post: null, globalData: null };
  try {
    const docSnap = await getDoc(doc(db, "configuracion", "general"));
    if (docSnap.exists()) {
      const data = docSnap.data();
      const slugBuscado = normalizarTexto(decodeURIComponent(slug));
      
      const post = data.blogPosts?.find((p: any) => normalizarTexto(p.slug) === slugBuscado);
      
      return { post: post || null, globalData: data };
    }
  } catch (error) {
    console.error("Error cargando el artículo:", error);
  }
  return { post: null, globalData: null };
}

// 🔴 SOLUCIÓN NEXT.JS 15+: Await params (Esperar a que lea el enlace)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getPost(slug);

  if (!post) {
    return { title: 'Artículo no encontrado | Cabalgatas Medellín' };
  }

  return {
    title: `${post.metaTitle || post.title} | Cabalgatas Medellín`,
    description: post.metaDesc || post.content.substring(0, 150) + '...',
    keywords: post.keywords || 'cabalgatas medellin',
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.content.substring(0, 150),
      images: [post.image || 'https://cabalgatamedellin.com/default.jpg'],
      type: 'article',
    }
  };
}

// 🔴 SOLUCIÓN NEXT.JS 15+: Await params en el componente visual
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  // Desempaquetamos la promesa de los parámetros
  const { slug } = await params;
  const { post, globalData } = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold text-stone-800 mb-2">Artículo no encontrado</h1>
        <p className="text-stone-500 mb-6">El sistema intentó buscar el enlace exacto: <b className="text-stone-900 bg-stone-200 px-2 py-1 rounded">"{slug}"</b></p>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 mb-8 max-w-md w-full text-left text-sm text-stone-600">
           <p className="font-extrabold text-stone-900 mb-3 border-b pb-2">Enlaces disponibles en tu base de datos:</p>
           <ul className="list-disc pl-5 space-y-2 font-mono text-amber-700">
             {globalData?.blogPosts?.map((p:any, idx: number) => (
               <li key={idx}>"{p.slug}"</li>
             ))}
             {!globalData?.blogPosts?.length && <li>No hay artículos guardados.</li>}
           </ul>
        </div>

        <a href="/blog" className="text-white bg-amber-500 px-8 py-3 rounded-full font-bold hover:bg-amber-600 transition shadow-lg">
          Volver al Blog
        </a>
      </div>
    );
  }

  const whatsappNum = globalData?.whatsappNumber || "573000000000";
  const linkGancho = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(`¡Hola! Acabo de leer el artículo "${post.title}" y quiero cotizar una cabalgata. 🐎`)}`;

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.image],
    "author": { "@type": "Organization", "name": "Cabalgatas Medellín" },
    "publisher": { "@type": "Organization", "name": "Cabalgatas Medellín", "logo": { "@type": "ImageObject", "url": "https://cabalgatamedellin.com/logo.png" } },
    "description": post.metaDesc || post.content.substring(0, 150),
    "articleBody": post.content
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cabalgatamedellin.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://cabalgatamedellin.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://cabalgatamedellin.com/blog/${slug}` }
    ]
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      <header className="absolute top-0 w-full z-50 p-6 flex justify-between items-center">
         <a href="/blog" className="p-3 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/50 transition-colors shadow-lg">
           <ArrowLeft className="w-6 h-6"/>
         </a>
      </header>

      <div className="h-[50vh] md:h-[60vh] relative bg-stone-900 overflow-hidden">
         <Image 
            src={post.image || 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=1920'} 
            alt={post.title}
            fill
            priority
            className="object-cover opacity-60 hover:scale-105 transition-transform duration-1000" 
            sizes="100vw"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-stone-50 to-transparent"></div>
      </div>

      <main className="max-w-4xl mx-auto px-6 mt-[-120px] relative z-20">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100">
          
          <nav className="flex items-center gap-2 text-sm font-bold text-stone-500 mb-8 justify-center md:justify-start flex-wrap">
            <a href="/" className="hover:text-amber-600 flex items-center gap-1 transition-colors"><Home size={16} /> Inicio</a>
            <ChevronRight size={16} className="text-stone-300" />
            <a href="/blog" className="hover:text-amber-600 transition-colors">Blog</a>
            <ChevronRight size={16} className="text-stone-300" />
            <span className="text-stone-800 bg-stone-100 px-3 py-1 rounded-full">{post.title}</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-stone-800 mb-8 leading-tight text-center md:text-left">{post.title}</h1>
          <div className="prose prose-stone prose-lg max-w-none text-stone-600 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 p-10 rounded-3xl border border-amber-200 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-stone-800 mb-4">¿Listo para vivir la experiencia?</h3>
          <p className="text-stone-600 mb-8">Convierte lo que acabas de leer en realidad. Reserva tu cabalgata ahora mismo con un asesor en línea y crea recuerdos inolvidables.</p>
          <a href={linkGancho} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105">
            <MessageCircle className="w-6 h-6"/> Cotizar por WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
}