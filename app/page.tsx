import React from 'react';
import { Metadata } from 'next';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Star, 
  MessageCircle, 
  Home, 
  Image as ImageIcon, 
  Info,
  CheckCircle2,
  Globe
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cabalgata Medellín | Best Horseback Riding Tours',
  description: 'Descubre las mejores cabalgatas en Medellín. Authentic horseback riding in Medellin, Colombia. Bilingual guides, stunning landscapes, and unforgettable outdoor activities.',
  keywords: 'cabalgata Medellín, cabalgatas en Medellín, horseback riding Medellin, Medellin tours, things to do in Medellin, paseo a caballo Antioquia, Caldas',
};

export default function MobileFirstHome() {
  const siteConfig = {
    // Aquí está tu número y mensaje configurados perfectamente
    whatsappLink: "https://wa.me/573147094325?text=Hola!%20Vengo%20de%20la%20p%C3%A1gina%20web%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20cabalgatas.",
    price: "$XX",
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans pb-24 selection:bg-amber-200">
      
      {}
      <header className="relative h-[65vh] w-full bg-stone-900 rounded-b-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553284965-83fd3e82fa52?q=80&w=800')] bg-cover bg-center opacity-80" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 z-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-amber-500 text-stone-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Bestseller
            </span>
            <span className="flex items-center text-amber-400 text-sm font-semibold bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
              <Star className="w-4 h-4 fill-current mr-1" /> 4.9 (120+ Reviews)
            </span>
          </div>
          
          <h1 className="text-3xl font-black text-white leading-tight mb-2 text-shadow-md">
            Cabalgatas en Medellín <br/>
            <span className="text-xl font-medium text-stone-300">Horseback Riding Tours</span>
          </h1>
          <p className="text-stone-200 text-sm font-light flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> Caldas, Antioquia (Near Poblado)
          </p>
        </div>
      </header>

      {}
      <section className="px-5 py-6 -mt-4 relative z-30">
        <div className="bg-white rounded-2xl shadow-lg border border-stone-100 p-5 grid grid-cols-2 gap-y-4 gap-x-2">
          <div className="flex items-center gap-3">
            <div className="bg-stone-100 p-2 rounded-full text-stone-600"><Clock className="w-5 h-5"/></div>
            <div>
              <p className="text-xs text-stone-400 font-medium uppercase">Duración / Time</p>
              <p className="text-sm font-bold text-stone-700">2 - 3 Horas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-stone-100 p-2 rounded-full text-stone-600"><Globe className="w-5 h-5"/></div>
            <div>
              <p className="text-xs text-stone-400 font-medium uppercase">Idiomas</p>
              <p className="text-sm font-bold text-stone-700">Español, English</p>
            </div>
          </div>
          <div className="flex items-center gap-3 col-span-2 pt-3 border-t border-stone-100">
             <div className="bg-emerald-100 p-2 rounded-full text-emerald-600"><CheckCircle2 className="w-5 h-5"/></div>
             <div>
              <p className="text-sm font-bold text-stone-700">Transporte opcional / Pickup available</p>
             </div>
          </div>
        </div>
      </section>

      {}
      <section className="px-6 py-4">
        <h2 className="text-xl font-bold mb-3">La Experiencia / The Experience</h2>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Escapa del ruido de la ciudad y sumérgete en los impresionantes paisajes de Antioquia. Nuestra <strong>cabalgata en Medellín</strong> está diseñada tanto para principiantes como para jinetes expertos. 
          <br/><br/>
          Rated as one of the <strong>best things to do in Medellin</strong>, our horseback riding tours offer safe, well-trained horses, bilingual guides, and exclusive nature trails.
        </p>
      </section>

      {}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 transition-transform duration-300">
        <div className="flex justify-between items-center max-w-md mx-auto">
          
          <button className="flex flex-col items-center gap-1 text-amber-600 group">
            <Home className="w-6 h-6 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold">Inicio</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 text-stone-400 hover:text-amber-600 transition-colors group">
            <Compass className="w-6 h-6 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold">Rutas</span>
          </button>
          
          <div className="relative -top-6">
            <a 
              href={siteConfig.whatsappLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/30 text-white hover:bg-emerald-600 transition-all transform hover:scale-105 animate-pulse"
              style={{ animationDuration: '3s' }}
            >
              <MessageCircle className="w-8 h-8" />
            </a>
          </div>

          <button className="flex flex-col items-center gap-1 text-stone-400 hover:text-amber-600 transition-colors group">
            <ImageIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold">Galería</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 text-stone-400 hover:text-amber-600 transition-colors group">
            <Info className="w-6 h-6 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold">Info</span>
          </button>

        </div>
      </nav>

    </div>
  );
}