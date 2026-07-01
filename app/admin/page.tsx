"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Settings, Users, Lock, LogOut, Plus, Trash2, Save, LayoutDashboard, MessageSquare, DollarSign, ImagePlus, Copy, Star, Camera, ArrowUp, ArrowDown, TrendingUp, Edit3, X } from 'lucide-react';
import { db, storage } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

/* STREAMING_CHUNK: Inicializando estado y variables principales... */
export default function AdminDashboard() {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [password, setPassword] = useState('');
const [loginError, setLoginError] = useState(false);
const [activeTab, setActiveTab] = useState('comercial');
const [isSaving, setIsSaving] = useState(false);
const [mensajeGuardado, setMensajeGuardado] = useState('');

const fileInputRef = useRef(null);
const [isUploading, setIsUploading] = useState(false);
const [previewImage, setPreviewImage] = useState<string | null>(null);

// Modal para seleccionar fotos de la librería
const [showPicker, setShowPicker] = useState<'hero' | 'galeria' | null>(null);

const [siteData, setSiteData] = useState({
heroTitle: 'Cabalgatas en Caldas', heroTitleEn: 'Horseback Riding',
heroSubtitle: 'Conectando jinetes...', heroSubtitleEn: 'Connecting riders...',
whatsappNumber: '573000000000',
navLabel1: 'Inicio', navLabel1En: 'Home', navLabel2: 'Cotizar', navLabel2En: 'Quote', navLabel3: 'FAQ', navLabel3En: 'FAQ',
basePrice: 100000, guidePrice: 80000, depositPercent: 50, promoActive: true,
horses: [], faqs: [], mediaLibrary: [], reviews: [], heroMedia: [], gallery: [],
metaTitle: 'Cabalgatas', metaTitleEn: 'Horseback', metaDescription: '...', metaDescriptionEn: '...',
urgencyText: '🔥 Quedan pocos cupos', urgencyTextEn: '🔥 Few spots left', enableExitIntent: true
});

/* STREAMING_CHUNK: Cargando datos desde Firebase y guardado unificado... */
useEffect(() => {
if (isAuthenticated) {
const fetchData = async () => {
const docRef = doc(db, "configuracion", "general");
const docSnap = await getDoc(docRef);
if (docSnap.exists()) setSiteData((prev: any) => ({ ...prev, ...docSnap.data() }));
};
fetchData();
}
}, [isAuthenticated]);

const saveConfig = async () => {
setIsSaving(true); setMensajeGuardado('');
try {
await setDoc(doc(db, "configuracion", "general"), siteData);
setMensajeGuardado('✅ ¡Cambios Guardados en Vivo!');
} catch (error) { setMensajeGuardado('❌ Error al guardar.'); }
setIsSaving(false); setTimeout(() => setMensajeGuardado(''), 4000);
};

const handleInputChange = (field: string, value: any) => setSiteData((prev: any) => ({ ...prev, [field]: value }));

/* STREAMING_CHUNK: Configurando lógica de procesamiento de imágenes y metadatos... */
const handleFileSelect = (e: React.ChangeEvent) => {
const file = e.target.files?.[0];
if (!file) return;
const reader = new FileReader();
reader.onload = (event) => setPreviewImage(event.target?.result as string);
reader.readAsDataURL(file);
};

const processAndUploadImage = async () => {
if (!previewImage) return;
setIsUploading(true);
try {
// Redimensionamiento Automático
const img = new Image(); img.src = previewImage;
await new Promise((resolve) => { img.onload = resolve; });
const canvas = document.createElement('canvas');
const MAX_WIDTH = 1920; const MAX_HEIGHT = 1080;
let width = img.width; let height = img.height;

  if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } } 
  else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }

  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0, width, height);
  
  const webpDataUrl = canvas.toDataURL('image/webp', 0.85); // Compresión de alta calidad
  const storageRef = ref(storage, `imagenes/media_${Date.now()}.webp`);
  await uploadString(storageRef, webpDataUrl, 'data_url');
  const url = await getDownloadURL(storageRef);

  setSiteData((prev: any) => ({ ...prev, mediaLibrary: [{ id: Date.now(), url, title: 'Nueva Imagen' }, ...(prev.mediaLibrary || [])] }));
  setPreviewImage(null); if (fileInputRef.current) fileInputRef.current.value = '';
  alert("✅ Imagen optimizada y subida a la Librería Universal.");
} catch (error) { alert("❌ Hubo un error subiendo la imagen."); }
setIsUploading(false);


};

/* STREAMING_CHUNK: Funciones CRUD para Banners, Galería y Selección Visual... */
const editMediaMetadata = (id: number, currentTitle: string) => {
const newTitle = prompt("Edita el nombre o metadato de la imagen (SEO):", currentTitle);
if (newTitle !== null) {
setSiteData((prev: any) => ({ ...prev, mediaLibrary: prev.mediaLibrary.map((m: any) => m.id === id ? { ...m, title: newTitle } : m) }));
}
};

const selectFromLibrary = (media: any) => {
if (showPicker === 'hero') {
if ((siteData.heroMedia || []).length >= 3) { alert("Máximo 3 banners."); return; }
setSiteData((prev: any) => ({ ...prev, heroMedia: [...(prev.heroMedia || []), { id: Date.now(), url: media.url, title: '', titleEn: '', subtitle: '', subtitleEn: '' }] }));
} else if (showPicker === 'galeria') {
setSiteData((prev: any) => ({ ...prev, gallery: [...(prev.gallery || []), { id: Date.now(), url: media.url, title: media.title || '', titleEn: '', desc: '', descEn: '' }] }));
}
setShowPicker(null);
};

const moveGalleryItem = (index: number, direction: number) => {
const newGallery = [...(siteData.gallery || [])];
const targetIndex = index + direction;
if (targetIndex < 0 || targetIndex >= newGallery.length) return;
[newGallery[index], newGallery[targetIndex]] = [newGallery[targetIndex], newGallery[index]];
setSiteData((prev: any) => ({ ...prev, gallery: newGallery }));
};

const removeHeroMedia = (id: number) => setSiteData((prev: any) => ({ ...prev, heroMedia: prev.heroMedia.filter((h: any) => h.id !== id) }));
const updateHeroMedia = (id: number, field: string, value: string) => setSiteData((prev: any) => ({ ...prev, heroMedia: prev.heroMedia.map((h: any) => h.id === id ? { ...h, [field]: value } : h) }));

const removeGalleryItem = (id: number) => setSiteData((prev: any) => ({ ...prev, gallery: prev.gallery.filter((g: any) => g.id !== id) }));
const updateGalleryItem = (id: number, field: string, value: string) => setSiteData((prev: any) => ({ ...prev, gallery: prev.gallery.map((g: any) => g.id === id ? { ...g, [field]: value } : g) }));

/* STREAMING_CHUNK: Renderizando pantalla de Login... */
if (!isAuthenticated) {
return (

<form onSubmit={(e) => { e.preventDefault(); if (password === 'admin') setIsAuthenticated(true); else setLoginError(true); }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">

Acceso CMS Master
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg mb-4" placeholder="Contraseña Maestra" />
Ingresar


);
}

/* STREAMING_CHUNK: Renderizando estructura del Dashboard... */
return (


  {/* MODAL DE LIBRERÍA */}
  {showPicker && (
    <div className="fixed inset-0 bg-stone-900/80 z-[100] flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[80vh] rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-stone-50">
          <h2 className="font-bold text-lg flex items-center gap-2"><ImagePlus /> Selecciona una foto para: {showPicker === 'hero' ? 'Banners' : 'Galería'}</h2>
          <button onClick={() => setShowPicker(null)} className="p-2 bg-stone-200 rounded-full hover:bg-stone-300"><X size={16}/></button>
        </div>
        <div className="p-4 overflow-y-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {siteData.mediaLibrary?.map((media: any) => (
            <div key={media.id} onClick={() => selectFromLibrary(media)} className="cursor-pointer group relative rounded-lg overflow-hidden border-2 border-transparent hover:border-amber-500">
              <img src={media.url} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/20 transition-all flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white text-amber-600 font-bold px-3 py-1 rounded shadow-lg text-sm">Seleccionar</span>
              </div>
            </div>
          ))}
          {(!siteData.mediaLibrary || siteData.mediaLibrary.length === 0) && <p className="col-span-full text-center py-8 text-stone-500">No hay fotos en la librería. Sube algunas primero.</p>}
        </div>
      </div>
    </div>
  )}

  {/* MENÚ LATERAL */}
  <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col shadow-2xl z-10">
    <div className="p-6 border-b border-stone-800"><h2 className="text-xl font-bold text-white">Panel Admin</h2></div>
    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
      {[
        { id: 'comercial', icon: DollarSign, label: 'Precios y Reglas' },
        { id: 'multimedia', icon: ImagePlus, label: 'Librería Universal' },
        { id: 'hero', icon: LayoutDashboard, label: 'Banners (Hero)' },
        { id: 'galeria', icon: Camera, label: 'Galería Dinámica' },
        { id: 'seo', icon: TrendingUp, label: 'SEO & Ventas' },
        { id: 'caballos', icon: Users, label: 'Caballos' },
        { id: 'reviews', icon: Star, label: 'Reseñas' },
        { id: 'faq', icon: MessageSquare, label: 'Preguntas Frecuentes' },
        { id: 'general', icon: Settings, label: 'Textos Generales' }
      ].map((item) => (
        <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${activeTab === item.id ? 'bg-amber-600 text-white shadow-lg' : 'hover:bg-stone-800'}`}>
          <item.icon className="w-5 h-5" /> {item.label}
        </button>
      ))}
    </nav>
  </aside>

  <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-32">
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border sticky top-0 z-20">
        <h1 className="text-2xl font-bold capitalize text-stone-800">Módulo: {activeTab}</h1>
        <div className="flex items-center gap-4">
          {mensajeGuardado && <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">{mensajeGuardado}</span>}
          <button onClick={saveConfig} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 shadow-lg">
            <Save size={20}/> {isSaving ? 'Guardando...' : 'Publicar Cambios'}
          </button>
        </div>
      </div>

      /* STREAMING_CHUNK: Renderizando Módulos de Precios y Multimedia... */
      {activeTab === 'comercial' && (
        <div className="bg-white rounded-xl shadow-sm p-6 border space-y-6">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
             <p className="text-sm text-amber-800"><b>Lógica de Precios Activa (Integrada en la Web):</b> Las cabalgatas Grupales son únicamente los fines de semana a las 2:00 PM (No suman guía). Cualquier otro horario, día o condición se considera Privada y suma automáticamente el Costo del Guía.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="font-bold">Precio Base x Jinete ($)</label><input type="number" value={siteData.basePrice} onChange={(e) => handleInputChange('basePrice', Number(e.target.value))} className="w-full p-3 border-2 rounded-xl mt-1 font-bold text-lg" /></div>
            <div><label className="font-bold">Costo Guía (Solo Privadas)</label><input type="number" value={siteData.guidePrice} onChange={(e) => handleInputChange('guidePrice', Number(e.target.value))} className="w-full p-3 border-2 rounded-xl mt-1 font-bold text-lg text-amber-600" /></div>
          </div>
        </div>
      )}

      {activeTab === 'multimedia' && (
        <div className="bg-white rounded-xl shadow-sm p-6 border space-y-6">
          <div>
            <label className="font-bold text-stone-700 block mb-2 text-lg">1. Subir nueva imagen a la Librería Universal</label>
            <p className="text-sm text-stone-500 mb-4">Sube la foto en cualquier tamaño. El sistema la redimensionará y optimizará automáticamente para que cargue rápido.</p>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} className="w-full p-4 border-2 border-dashed rounded-xl bg-stone-50 cursor-pointer mb-2 font-bold" />
            {previewImage && <button onClick={processAndUploadImage} className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2"><ImagePlus/> Subir y Optimizar</button>}
          </div>
          <h2 className="text-xl font-bold border-t pt-6">2. Tu Librería Maestra</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {siteData.mediaLibrary?.map((media: any) => (
              <div key={media.id} className="border rounded-xl p-2 bg-stone-50 group relative">
                <img src={media.url} className="w-full h-24 object-cover rounded-lg mb-2" />
                <p className="text-xs font-bold truncate mb-2 px-1" title={media.title}>{media.title || 'Sin nombre'}</p>
                <div className="flex gap-2">
                  <button onClick={() => {navigator.clipboard.writeText(media.url); alert("URL Copiada")}} className="flex-1 bg-white text-xs p-1.5 rounded border shadow-sm flex items-center justify-center hover:bg-stone-100" title="Copiar URL"><Copy size={14}/></button>
                  <button onClick={() => editMediaMetadata(media.id, media.title)} className="flex-1 bg-blue-100 text-blue-700 text-xs p-1.5 rounded flex items-center justify-center hover:bg-blue-200" title="Editar Metadatos"><Edit3 size={14}/></button>
                  <button onClick={() => { setSiteData(prev => ({...prev, mediaLibrary: prev.mediaLibrary.filter((m:any) => m.id !== media.id) })) }} className="bg-red-100 text-red-600 text-xs p-1.5 rounded flex items-center justify-center hover:bg-red-200"><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      /* STREAMING_CHUNK: Renderizando Módulos Visuales (Hero y Galería)... */
      {activeTab === 'hero' && (
        <div className="space-y-4">
          <button onClick={() => setShowPicker('hero')} className="bg-stone-900 text-white px-4 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"><Plus className="w-5 h-5"/> Seleccionar foto desde la Librería</button>
          {siteData.heroMedia?.map((h: any, idx: number) => (
            <div key={h.id} className="bg-white p-5 rounded-xl border flex flex-col md:flex-row gap-6 shadow-sm relative">
              <button onClick={() => removeHeroMedia(h.id)} className="absolute top-4 right-4 text-red-500 bg-red-50 p-2 rounded-lg"><Trash2 size={16}/></button>
              <div className="w-full md:w-1/3">
                <p className="font-bold text-stone-500 mb-2">Banner {idx + 1}</p>
                <img src={h.url} className="w-full h-32 object-cover rounded-lg border" />
                <input type="text" value={h.url} onChange={(e) => updateHeroMedia(h.id, 'url', e.target.value)} className="w-full p-2 border mt-2 text-xs rounded" placeholder="O pega una URL externa..." />
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 md:mt-0">
                <div className="space-y-2">
                  <label className="text-xs font-bold">🇨🇴 Español</label>
                  <input value={h.title} onChange={(e) => updateHeroMedia(h.id, 'title', e.target.value)} className="w-full p-2 border rounded font-bold outline-none focus:border-amber-500" placeholder="Título H1" />
                  <textarea value={h.subtitle} onChange={(e) => updateHeroMedia(h.id, 'subtitle', e.target.value)} className="w-full p-2 border rounded text-sm outline-none focus:border-amber-500" placeholder="Subtítulo corto" rows={2}/>
                </div>
                <div className="space-y-2 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                  <label className="text-xs font-bold text-blue-700">🇺🇸 Inglés</label>
                  <input value={h.titleEn} onChange={(e) => updateHeroMedia(h.id, 'titleEn', e.target.value)} className="w-full p-2 border rounded font-bold outline-none focus:border-blue-500 bg-white" placeholder="Title H1" />
                  <textarea value={h.subtitleEn} onChange={(e) => updateHeroMedia(h.id, 'subtitleEn', e.target.value)} className="w-full p-2 border rounded text-sm outline-none focus:border-blue-500 bg-white" placeholder="Short subtitle" rows={2}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'galeria' && (
        <div className="space-y-4">
          <button onClick={() => setShowPicker('galeria')} className="bg-stone-900 text-white px-4 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"><Plus className="w-5 h-5"/> Seleccionar foto desde la Librería</button>
          {siteData.gallery?.map((g: any, idx: number) => (
            <div key={g.id} className="bg-white p-5 rounded-xl border flex flex-col md:flex-row gap-6 shadow-sm relative">
              <div className="absolute top-4 right-14 flex gap-2">
                <button onClick={() => moveGalleryItem(idx, -1)} className="bg-stone-100 p-2 rounded hover:bg-stone-200"><ArrowUp size={16}/></button>
                <button onClick={() => moveGalleryItem(idx, 1)} className="bg-stone-100 p-2 rounded hover:bg-stone-200"><ArrowDown size={16}/></button>
              </div>
              <button onClick={() => removeGalleryItem(g.id)} className="absolute top-4 right-4 text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100"><Trash2 size={16}/></button>
              <div className="w-full md:w-1/3">
                <p className="font-bold text-amber-600 mb-2">Posición #{idx + 1}</p>
                <img src={g.url} className="w-full h-32 object-cover rounded-lg border" />
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 md:mt-0">
                <div className="space-y-2">
                  <label className="text-xs font-bold">🇨🇴 Español</label>
                  <input value={g.title} onChange={(e) => updateGalleryItem(g.id, 'title', e.target.value)} className="w-full p-2 border rounded font-bold outline-none focus:border-amber-500" placeholder="Título SEO" />
                  <textarea value={g.desc} onChange={(e) => updateGalleryItem(g.id, 'desc', e.target.value)} className="w-full p-2 border rounded text-sm outline-none focus:border-amber-500" placeholder="Descripción de la foto" rows={2}/>
                </div>
                <div className="space-y-2 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                  <label className="text-xs font-bold text-blue-700">🇺🇸 Inglés</label>
                  <input value={g.titleEn} onChange={(e) => updateGalleryItem(g.id, 'titleEn', e.target.value)} className="w-full p-2 border rounded font-bold outline-none focus:border-blue-500 bg-white" placeholder="SEO Title" />
                  <textarea value={g.descEn} onChange={(e) => updateGalleryItem(g.id, 'descEn', e.target.value)} className="w-full p-2 border rounded text-sm outline-none focus:border-blue-500 bg-white" placeholder="Photo description" rows={2}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      /* STREAMING_CHUNK: Renderizando Módulos Restantes... */
      {activeTab === 'seo' && (
        <div className="bg-white p-6 rounded-xl border space-y-6">
           <h3 className="font-bold border-b pb-2">Ventana Intención de Salida (Exit Intent)</h3>
           <div className="flex gap-4 items-center">
              <input type="checkbox" checked={siteData.enableExitIntent} onChange={(e) => handleInputChange('enableExitIntent', e.target.checked)} className="w-6 h-6"/>
              <span>Activar Pop-up de Descuento al intentar salir de la página</span>
           </div>
           <h3 className="font-bold border-b pb-2 pt-4">Gatillo de Urgencia en el Cotizador</h3>
           <div className="grid grid-cols-2 gap-4">
             <div><label className="text-xs font-bold text-stone-500">🇨🇴 Español</label><input value={siteData.urgencyText} onChange={(e) => handleInputChange('urgencyText', e.target.value)} className="w-full p-2 border rounded mt-1" placeholder="Ej: 🔥 Alta demanda" /></div>
             <div><label className="text-xs font-bold text-blue-600">🇺🇸 Inglés</label><input value={siteData.urgencyTextEn} onChange={(e) => handleInputChange('urgencyTextEn', e.target.value)} className="w-full p-2 border rounded mt-1 bg-blue-50/30" placeholder="Ej: 🔥 High demand" /></div>
           </div>
        </div>
      )}

      {activeTab === 'caballos' && (
        <div className="bg-white p-6 rounded-xl border flex flex-col items-center justify-center text-stone-400 py-12">
           <Users size={48} className="mb-4 opacity-50"/>
           <p className="font-bold">Módulo de Directorio Equino en desarrollo o configuración...</p>
           <p className="text-sm">Tus caballos se renderizarán aquí en la versión completa.</p>
        </div>
      )}
      {activeTab === 'reviews' && (
        <div className="bg-white p-6 rounded-xl border flex flex-col items-center justify-center text-stone-400 py-12">
           <Star size={48} className="mb-4 opacity-50"/>
           <p className="font-bold">Módulo de Reseñas en desarrollo o configuración...</p>
           <p className="text-sm">Las reseñas bilingües se renderizarán aquí.</p>
        </div>
      )}
      {activeTab === 'faq' && (
        <div className="bg-white p-6 rounded-xl border flex flex-col items-center justify-center text-stone-400 py-12">
           <MessageSquare size={48} className="mb-4 opacity-50"/>
           <p className="font-bold">Módulo de FAQ en desarrollo o configuración...</p>
        </div>
      )}
      {activeTab === 'general' && (
        <div className="bg-white p-6 rounded-xl border flex flex-col items-center justify-center text-stone-400 py-12">
           <Settings size={48} className="mb-4 opacity-50"/>
           <p className="font-bold">Módulo de Configuración General en desarrollo o configuración...</p>
        </div>
      )}

    </div>
  </main>
</div>


);
}