"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  
  // Ocultar en paneles administrativos o registro si existen
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/registro')) {
    return null;
  }

  const isEnglish = pathname?.startsWith('/en');

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
      <Link
        href={isEnglish ? '/' : '/en'}
        aria-label={isEnglish ? 'Cambiar idioma a Español' : 'Switch language to English'}
        className="flex items-center gap-1.5 bg-white/80 hover:bg-white backdrop-blur-md text-zinc-800 px-3.5 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-white/60 text-xs font-bold tracking-tight transition-all duration-300 hover:scale-105"
      >
        <Globe className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
        <span>{isEnglish ? 'ES 🇨🇴' : 'EN 🇺🇸'}</span>
      </Link>
    </div>
  );
}