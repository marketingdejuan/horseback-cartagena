"use client";
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  
  const isEnglish = pathname.startsWith('/en');

  const toggleLanguage = () => {
    if (isEnglish) {
      router.push('/'); 
    } else {
      router.push('/en'); 
    }
  };

  return (
    <button 
      onClick={toggleLanguage}
      // SOLUCIÓN: bottom-24 en móviles para esquivar el menú, y bottom-8 en PC. z-[100] para que siempre esté arriba.
      className="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-[100] bg-stone-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 hover:bg-stone-800 transition-all hover:scale-110 border-2 border-stone-700 group animate-in slide-in-from-left"
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