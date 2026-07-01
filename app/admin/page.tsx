"use client";
import React, { useState, useEffect } from 'react';
import { Save, ArrowUp, ArrowDown, Camera, LayoutDashboard, ImagePlus, MessageSquare, DollarSign, Users, Star } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/* STREAMING_CHUNK: Definición del componente y estados iniciales */
export default function AdminDashboard() {
  const [siteData, setSiteData] = useState<any>({ 
    mediaLibrary: [], 
    gallerySelected: [], 
    heroTitle: 'Cabalgatas en Caldas',
    horses: [],
    faqs: [],
    reviews: []
  });
  const [activeTab, setActiveTab] = useState('galeria');

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(doc(db, "configuracion", "general"));
      if (docSnap.exists()) setSiteData(docSnap.data());
    };
    fetchData();
  }, []);

  const saveConfig = async () => {
    try {
      await setDoc(doc(db, "configuracion", "general"), siteData);
      alert("✅ Orden de galería guardado correctamente.");
    } catch (e) {
      alert("❌ Error al guardar.");
    }
  };
  /* STREAMING_CHUNK: Lógica de ordenamiento y selección */
  const moveItem = (index: number, direction: number) => {
    const newGallery = [...(siteData.gallerySelected || [])];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newGallery.length) return;
    
    [newGallery[index], newGallery[targetIndex]] = [newGallery[targetIndex], newGallery[index]];
    setSiteData({...siteData, gallerySelected: newGallery});
  };

  const toggleGallerySelection = (mediaItem: any) => {
    const selected = siteData.gallerySelected || [];
    const exists = selected.find((s: any) => s.id === mediaItem.id);
    const newSelected = exists 
      ? selected.filter((s: any) => s.id !== mediaItem.id)
      : [...selected, mediaItem];
    setSiteData({...siteData, gallerySelected: newSelected});
  };
  /* STREAMING_CHUNK: Renderizado de la interfaz del Admin */
  return (
    <div className="min-h-screen bg-stone-50 flex">
      <aside className="w-64 bg-stone-900 text-stone-300 p-6 flex flex-col">
        <h2 className="text-xl font-bold text-white mb-8">Admin CMS</h2>
        <nav className="space-y-4">
          {[{id: 'galeria', icon: Camera, label: 'Galería Avanzada'}, 
            {id: 'media', icon: ImagePlus, label: 'Biblioteca'}].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-3 w-full p-2 ${activeTab === item.id ? 'text-white' : ''}`}>
              <item.icon size={20}/> {item.label}
            </button>
          ))}
        </nav>
        <button onClick={saveConfig} className="mt-auto bg-green-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
          <Save size="{18}"/> Guardar Cambios
        </button>
      </aside>

      <main className="flex-1 p-8">
        {activeTab === 'galeria' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h3 className="font-bold mb-4 text-stone-800">1. Seleccionar de Biblioteca</h3>
              <div className="grid grid-cols-3 gap-2">
                {siteData.mediaLibrary?.map((m: any) => (
                  <div key={m.id} onClick={() => toggleGallerySelection(m)} className={`cursor-pointer border-4 ${siteData.gallerySelected?.find((s: any) => s.id === m.id) ? 'border-green-500' : 'border-transparent'}`}>
                    <img src={m.url} className="w-full h-24 object-cover" />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-bold mb-4 text-stone-800">2. Orden de visualización</h3>
              <div className="space-y-2">
                {siteData.gallerySelected?.map((s: any, idx: number) => (
                  <div key={s.id} className="flex items-center gap-4 bg-white p-2 border shadow-sm rounded">
                    <img src={s.url} className="w-16 h-16 object-cover" />
                    <span className="flex-1 font-bold">Posición {idx + 1}</span>
                    <button onClick={() => moveItem(idx, -1)} className="p-2 hover:bg-stone-100 rounded"><ArrowUp size="{20}"/></button>
                    <button onClick={() => moveItem(idx, 1)} className="p-2 hover:bg-stone-100 rounded"><ArrowDown size="{20}"/></button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}