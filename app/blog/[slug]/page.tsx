"use client";
import React, { useEffect, useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null);
  const [globalData, setGlobalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const docSnap = await getDoc(doc(db, "configuracion", "general"));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setGlobalData(data);
        const foundPost = data.blogPosts?.find((p: any) => p.slug === params.slug);
        setPost(foundPost);

        if (foundPost) {
          // Inyección SEO exclusiva para este artículo
          document.title = foundPost.metaTitle || foundPost.title;
          
          const setMeta = (name: string, content: string, isProperty = false) => {
             if(!content) return;
             const attr = isProperty ? 'property' : 'name';
             let el = document.querySelector(`meta[${attr}="${name}"]`);
             if (!el) { 
                 el = document.createElement('meta'); 
                 el.setAttribute(attr, name); 
                 document.head.appendChild(el); 
             }
             el.setAttribute('content', content);
          };

          setMeta('description', foundPost.metaDesc || '');
          setMeta('keywords', foundPost.keywords || '');
          setMeta('og:image', foundPost.image || '', true);
          setMeta('og:title', foundPost.metaTitle || foundPost.title, true);
        }
      }
      setLoading(false);
    };
    fetchPost();
  }, [params.slug]);

  if (loading) return <div className="min-h-screen bg-stone-50 flex items-center justify-center animate-pulse"><div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>;

  if (!post) return <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center text-center p-4"><h1 className="text-4xl font-bold text-stone-800 mb-4">Artículo no encontrado</h1><a href="/blog" className="text-amber-600 font-bold hover:underline">Volver al blog</a></div>;

  const whatsappNum = globalData?.whatsappNumber || "573000000000";
  const linkGancho = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(`¡Hola! Acabo de leer el artículo "${post.title}" y quiero cotizar una cabalgata. 🐎`)}`;

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-24">
      <header className="absolute top-0 w-full z-50 p-6 flex justify-between items-center">
         <a href="/blog" className="p-3 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/50 transition-colors shadow-lg"><ArrowLeft className="w-6 h-6"/></a>
      </header>

      <div className="h-[50vh] md:h-[60vh] relative bg-stone-900">
         <img src={post.image || 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=1920'} className="w-full h-full object-cover opacity-60" alt={post.title} />
         <div className="absolute inset-0 bg-gradient-to-t from-stone-50 to-transparent"></div>
      </div>

      <main className="max-w-3xl mx-auto px-6 mt-[-120px] relative z-20">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100">
          <h1 className="text-3xl md:text-5xl font-extrabold text-stone-800 mb-8 leading-tight">{post.title}</h1>
          <div className="prose prose-stone prose-lg max-w-none text-stone-600 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* CTA FINAL DEL BLOG */}
        <div className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 p-10 rounded-3xl border border-amber-200 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-stone-800 mb-4">¿Listo para vivir la experiencia?</h3>
          <p className="text-stone-600 mb-8">Convierte lo que acabas de leer en realidad. Reserva tu cabalgata ahora mismo con un asesor en línea y crea recuerdos inolvidables.</p>
          <a href={linkGancho} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105"><MessageCircle className="w-6 h-6"/> Cotizar por WhatsApp</a>
        </div>
      </main>
    </div>
  );
}


