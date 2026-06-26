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
  Globe,
  HelpCircle,
  Users,
  Play
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cabalgata Medellín | Expertos en Rutas a Caballo',
  description: 'Vive la mejor experiencia de cabalgata en Medellín. Rutas seguras, caballos bien cuidados y paisajes inolvidables en Caldas, Antioquia.',
  keywords: 'cabalgata Medellín, horseback riding Medellin, turismo ecuestre Antioquia, paseos a caballo',
};

export default function MobileFirstHome() {
  const siteConfig = {
    whatsappLink: "https://wa.me/573147094325?text=Hola!%20Vengo%20de%20la%20p%C3%A1gina%20web%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20cabalgatas.",
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans pb-24 selection:bg-amber-200">
      
      {/* Header */}
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

      {}
      <section className="px-6 py-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-amber-500"/> Nuestra Galería</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* REPLACE THESE URLS WITH YOUR OWN CONTENT */}
          <img src="cabalgatasmedellin-celebracion-de-cumpleanos.jpg" alt="Cabalgata" className="w-full h-32 object-cover rounded-xl shadow-md" />
          <img src="https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=400" alt="Paisaje" className="w-full h-32 object-cover rounded-xl shadow-md" />
          <img src="https://images.unsplash.com/photo-1534777367033-28956923b7e7?q=80&w=400" alt="Experiencia" className="w-full h-32 object-cover rounded-xl shadow-md" />
          <div className="w-full h-32 bg-stone-200 rounded-xl flex items-center justify-center text-stone-400 font-bold border-2 border-dashed border-stone-300">
            Más fotos...
          </div>
        </div>
      </section>

      {}
      <section className="px-6 py-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Play className="w-5 h-5 text-amber-500"/> Mira la experiencia</h2>
        <div className="aspect-video bg-stone-900 rounded-2xl overflow-hidden shadow-xl relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 fill-current" />
                </button>
            </div>
            <img src="https://images.unsplash.com/photo-1553284965-83fd3e82fa52?q=80&w=800" alt="Video cover" className="w-full h-full object-cover opacity-60" />
        </div>
      </section>

      {}
      <section className="px-6 py-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-amber-500 fill-current"/> Lo que dicen nuestros clientes</h2>
        <div className="space-y-4">
          <div className="bg-stone-100 p-4 rounded-xl text-sm italic text-stone-600 border-l-4 border-amber-500">
            "Una experiencia inolvidable. Los caballos están muy bien cuidados y el paisaje es increíble. 100% recomendado."
            <p className="font-bold text-stone-800 mt-2 not-italic text-xs">- Valentina R.</p>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
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