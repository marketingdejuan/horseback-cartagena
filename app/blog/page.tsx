"use client";
import React, { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function BlogList() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "configuracion", "general"), (docSnap) => {
      if (docSnap.exists()) setData(docSnap.data());
    });
    return unsub;
  }, []);

  if (!data) return <div className="min-h-screen bg-stone-50 flex items-center justify-center animate-pulse"><div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-24 md:pb-8">
      <header className="bg-stone-900 text-white p-6 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <a href="/" className="p-2 bg-stone-800 rounded-full hover:bg-stone-700 transition-colors"><ArrowLeft className="w-5 h-5"/></a>
          <h1 className="text-2xl font-bold">Blog Equino</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {data.blogPosts && data.blogPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {data.blogPosts.map((post: any) => (
              <a key={post.id} href={`/blog/${post.slug}`} className="bg-white rounded-3xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                <div className="h-56 overflow-hidden">
                   <img src={post.image || 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=800'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h2 className="font-extrabold text-2xl mb-3 text-stone-800 leading-tight group-hover:text-amber-600 transition-colors">{post.title}</h2>
                  <p className="text-stone-500 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">{post.metaDesc || post.content}</p>
                  <span className="text-amber-600 font-bold text-sm inline-flex items-center gap-2">Leer artículo <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-stone-500 bg-white rounded-3xl border border-stone-100">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="font-bold">Pronto publicaremos artículos increíbles aquí.</p>
          </div>
        )}
      </main>
    </div>
  );
}


