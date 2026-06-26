import React from 'react';
import { MapPin, Star, MessageCircle, Home, Image as ImageIcon, Info } from 'lucide-react';

export default function MobileFirstHome() {
  const siteConfig = {
    whatsappLink: "https://wa.me/573147094325?text=Hola!%20Vengo%20de%20la%20p%C3%A1gina%20web%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n.",
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans pb-24 selection:bg-amber-200">
      <header className="relative h-[60vh] w-full bg-stone-900 rounded-b-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553284965-83fd3e82fa52?q=80&w=800')] bg-cover bg-center opacity-80" />
        <div className="absolute bottom-0 left-0 w-full p-6 z-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-amber-500 text-stone-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              #1 En Caldas
            </span>
          </div>
          <h1 className="text-4xl font-black text-white leading-tight mb-2">Cabalgatas en Medellín</h1>
          <p className="text-stone-200 text-sm flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Caldas, Antioquia</p>
        </div>
      </header>

      <section className="px-6 py-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-amber-500"/> Nuestra Galería</h2>
        <div className="grid grid-cols-2 gap-3">
          <img src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400" alt="Cabalgata" className="w-full h-32 object-cover rounded-xl shadow-md" />
          <img src="https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=400" alt="Paisaje" className="w-full h-32 object-cover rounded-xl shadow-md" />
        </div>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 pb-8 z-50">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-amber-600"><Home className="w-6 h-6" /><span className="text-[10px] font-bold">Inicio</span></button>
          <div className="relative -top-6">
            <a href={siteConfig.whatsappLink} className="flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full shadow-lg text-white hover:bg-emerald-600 animate-bounce">
              <MessageCircle className="w-8 h-8" />
            </a>
          </div>
          <button className="flex flex-col items-center gap-1 text-stone-400"><Info className="w-6 h-6" /><span className="text-[10px] font-bold">Info</span></button>
        </div>
      </nav>
    </div>
  );
}