"use client";
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Detecta si estamos en la página en inglés
  const isEnglish = pathname.startsWith('/en');

  const toggleLanguage = () => {
    if (isEnglish) {
      router.push('/'); // Cambia a Español
    } else {
      router.push('/en'); // Cambia a Inglés
    }
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="fixed bottom-8 left-8 z-50 bg-stone-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 hover:bg-stone-800 transition-all hover:scale-110 border-2 border-stone-700 group animate-in slide-in-from-left"
    >
      <Globe className="w-6 h-6 text-amber-500 group-hover:animate-spin" />
      <span className="font-extrabold text-sm hidden md:block">
        {isEnglish ? '🇪🇸 Ver en Español (COP)' : '🇺🇸 English (USD)'}
      </span>
      <span className="font-extrabold text-sm block md:hidden">
        {isEnglish ? '🇪🇸 ESP' : '🇺🇸 ENG'}
      </span>
    </button>
  );
}