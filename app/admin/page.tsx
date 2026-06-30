"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Settings, Users, Lock, LogOut, Plus, Trash2, Save, LayoutDashboard, MessageSquare, DollarSign, ImagePlus, Copy, CheckCircle, Star, Camera } from 'lucide-react';
import { db, storage } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('comercial');
  const [isSaving, setIsSaving] = useState(false);
  const [mensajeGuardado, setMensajeGuardado] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTarget, setUploadTarget] = useState('caballo'); 
  const [imageAlt, setImageAlt] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [siteData, setSiteData] = useState<any>({
    heroTitle: 'Cabalgatas en Caldas, Antioquia',
    heroTitleEn: 'Ecological Horseback Riding near Medellin',
    heroSubtitle: 'Conectando jinetes principiantes y expertos con los paisajes montañosos del sur del Valle de Aburrá.',
    heroSubtitleEn: 'Connecting beginners and experts with the stunning mountain landscapes of the Aburrá Valley.',
    whatsappNumber: '573000000000',
    navLabel1: 'Inicio', navLabel1En: 'Home',
    navLabel2: 'Cotizar', navLabel2En: 'Quote',
    navLabel3: 'FAQ', navLabel3En: 'FAQ',
    basePrice: 100000, guidePrice: 80000,
    depositPercent: 50, cancelHours: 48, promoActive: true,
    horses: [], faqs: [], mediaLibrary: [], reviews: [],
    heroMedia: [], // NUEVO: Fotos/Videos del banner principal
    gallery: [] // NUEVO: Galería tipo carrusel
  });

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        const docRef = doc(db, "configuracion", "general");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSiteData((prev: any) => ({ 
            ...prev, 
            ...data,
            mediaLibrary: data.mediaLibrary || [],
            reviews: data.reviews || [],
            heroMedia: data.heroMedia || [],
            gallery: data.gallery || []
          }));
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const saveToFirebase = async () => {
    setIsSaving(true); setMensajeGuardado('');
    try {
      const docRef = doc(db, "configuracion", "general");
      await setDoc(docRef, siteData);
      setMensajeGuardado('✅ ¡Cambios Guardados en Vivo!');
    } catch (error) { setMensajeGuardado('❌ Error al guardar.'); }
    setIsSaving(false); setTimeout(() => setMensajeGuardado(''), 4000);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (password === 'admin') { setIsAuthenticated(true); setLoginError(false); } 
    else { setLoginError(true); }
  };

  const handleInputChange = (field: string, value: any) => setSiteData((prev: any) => ({ ...prev, [field]: value }));

  // CRUD Básicos
  const addHorse = () => setSiteData((prev: any) => ({ ...prev, horses: [...prev.horses, { id: Date.now(), name: 'Nuevo', type: 'Manso', photo: '', status: 'Activo' }] }));
  const updateHorse = (id: number, field: string, value: string) => setSiteData((prev: any) => ({ ...prev, horses: prev.horses.map((h: any) => h.id === id ? { ...h, [field]: value } : h) }));
  const removeHorse = (id: number) => setSiteData((prev: any) => ({ ...prev, horses: prev.horses.filter((h: any) => h.id !== id) }));

  const addFaq = () => setSiteData((prev: any) => ({ ...prev, faqs: [...prev.faqs, { id: Date.now(), q: 'Nueva Pregunta', a: 'Respuesta', qEn: '', aEn: '' }] }));
  const updateFaq = (id: number, field: string, value: string) => setSiteData((prev: any) => ({ ...prev, faqs: prev.faqs.map((f: any) => f.id === id ? { ...f, [field]: value } : f) }));
  const removeFaq = (id: number) => setSiteData((prev: any) => ({ ...prev, faqs: prev.faqs.filter((f: any) => f.id !== id) }));

  const addReview = () => setSiteData((prev: any) => ({ ...prev, reviews: [...(prev.reviews || []), { id: Date.now(), author: 'Nombre Cliente', text: 'Me encantó...', textEn: 'I loved it...', rating: 5, videoUrl: '' }] }));
  const updateReview = (id: number, field: string, value: any) => setSiteData((prev: any) => ({ ...prev, reviews: prev.reviews.map((r: any) => r.id === id ? { ...r, [field]: value } : r) }));
  const removeReview = (id: number) => setSiteData((prev: any) => ({ ...prev, reviews: prev.reviews.filter((r: any) => r.id !== id) }));

  // NUEVOS CRUD: Hero y Galería
  const addHeroMedia = () => {
    if (siteData.heroMedia?.length >= 3) { alert("Máximo 3 elementos en el Banner Principal."); return; }
    setSiteData((prev: any) => ({ ...prev, heroMedia: [...(prev.heroMedia || []), { id: Date.now(), url: '' }] }));
  };
  const updateHeroMedia = (id: number, url: string) => setSiteData((prev: any) => ({ ...prev, heroMedia: prev.heroMedia.map((h: any) => h.id === id ? { ...h, url } : h) }));
  const removeHeroMedia = (id: number) => setSiteData((prev: any) => ({ ...prev, heroMedia: prev.heroMedia.filter((h: any) => h.id !== id) }));

  const addGalleryItem = () => setSiteData((prev: any) => ({ ...prev, gallery: [...(prev.gallery || []), { id: Date.now(), url: '', title: 'Título SEO', titleEn: 'SEO Title', desc: 'Descripción...', descEn: 'Description...' }] }));
  const updateGalleryItem = (id: number, field: string, value: string) => setSiteData((prev: any) => ({ ...prev, gallery: prev.gallery.map((g: any) => g.id === id ? { ...g, [field]: value } : g) }));
  const removeGalleryItem = (id: number) => setSiteData((prev: any) => ({ ...prev, gallery: prev.gallery.filter((g: any) => g.id !== id) }));

  // Subida de Imágenes
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => { setPreviewImage(event.target?.result as string); };
    reader.readAsDataURL(file);
  };

  const processAndUploadImage = async () => {
    if (!previewImage) return;
    setIsUploading(true);
    try {
      const img = new Image(); img.src = previewImage;
      await new Promise((resolve) => { img.onload = resolve; });

      const canvas = document.createElement('canvas');
      let targetW = 1200; let targetH = 800;
      if (uploadTarget === 'hero') { targetW = 1920; targetH = 1080; }
      if (uploadTarget === 'caballo') { targetW = 800; targetH = 800; }

      const scale = Math.max(targetW / img.width, targetH / img.height);
      const scaledW = img.width * scale; const scaledH = img.height * scale;
      canvas.width = targetW; canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      const dx = (targetW - scaledW) / 2; const dy = (targetH - scaledH) / 2;
      ctx?.drawImage(img, dx, dy, scaledW, scaledH);
      
      const webpDataUrl = canvas.toDataURL('image/webp', 0.8);
      const fileName = `media_${Date.now()}.webp`;
      const storageRef = ref(storage, `imagenes/${fileName}`);
      await uploadString(storageRef, webpDataUrl, 'data_url');
      const downloadUrl = await getDownloadURL(storageRef);

      const newMedia = { id: Date.now(), url: downloadUrl, alt: imageAlt || 'Cabalgata Caldas', target: uploadTarget };
      setSiteData((prev: any) => ({ ...prev, mediaLibrary: [newMedia, ...(prev.mediaLibrary || [])] }));
      setPreviewImage(null); setImageAlt('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      alert("✅ Imagen comprimida y subida con éxito.");
    } catch (error) { alert("❌ Hubo un error subiendo la imagen."); }
    setIsUploading(false);
  };

  const copyToClipboard = (url: string) => { navigator.clipboard.writeText(url); alert("URL copiada. Pégala donde necesites."); };
  const removeMedia = (id: number) => { setSiteData((prev: any) => ({ ...prev, mediaLibrary: prev.mediaLibrary.filter((m: any) => m.id !== id) })); };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-amber-100 p-3 rounded-full mb-4"><Lock className="w-8 h-8 text-amber-700" /></div>
            <h1 className="text-2xl font-bold text-stone-800">Acceso Operativo</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500" placeholder="Contraseña Maestra" />
            {loginError && <p className="text-red-500 font-bold">Contraseña incorrecta.</p>}
            <button type="submit" className="w-full bg-stone-900 text-white p-3 rounded-lg font-medium hover:bg-stone-800">Ingresar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col shadow-2xl z-10">
        <div className="p-6 border-b border-stone-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-amber-500" /> CRM Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'comercial', icon: DollarSign, label: 'Precios y Reglas' },
            { id: 'multimedia', icon: ImagePlus, label: 'Multimedia SEO' },
            { id: 'galeria', icon: Camera, label: 'Galería de Fotos' }, // NUEVO
            { id: 'caballos', icon: Users, label: 'Directorio Equino' },
            { id: 'reviews', icon: Star, label: 'Reseñas Bilingües' },
            { id: 'faq', icon: MessageSquare, label: 'FAQ Bilingüe' },
            { id: 'general', icon: Settings, label: 'Textos y Hero' },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${activeTab === item.id ? 'bg-amber-600 text-white' : 'hover:bg-stone-800'}`}>
              <item.icon className="w-5 h-5" /> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-32 md:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white p-4 rounded-xl shadow-sm border gap-4 sticky top-0 z-20">
            <h1 className="text-2xl font-bold text-stone-800 capitalize">Módulo: {activeTab}</h1>
            <div className="flex items-center gap-4 w-full md:w-auto">
              {mensajeGuardado && <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">{mensajeGuardado}</span>}
              <button onClick={saveToFirebase} disabled={isSaving} className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 font-bold shadow-lg transition-transform active:scale-95">
                <Save className="w-5 h-5" /> {isSaving ? 'Subiendo...' : 'Publicar Cambios'}
              </button>
            </div>
          </div>

          {activeTab === 'multimedia' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border space-y-6">
                <h2 className="text-xl font-bold text-stone-800 border-b pb-2">Subir y Optimizar Imagen</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">1. ¿Dónde se usará?</label>
                      <select value={uploadTarget} onChange={(e) => setUploadTarget(e.target.value)} className="w-full p-3 border-2 rounded-xl bg-stone-50 outline-none focus:border-amber-500 font-bold text-stone-600">
                        <option value="hero">Banner Principal / Galería (1920x1080)</option>
                        <option value="caballo">Tarjeta de Caballo (800x800)</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">2. Seleccionar Foto</label>
                      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} className="w-full p-2 border-2 border-dashed rounded-xl bg-stone-50 cursor-pointer" />
                    </div>
                    {previewImage && (
                      <button onClick={processAndUploadImage} disabled={isUploading} className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-3 rounded-xl flex justify-center items-center gap-2 shadow-lg">
                        {isUploading ? 'Procesando...' : <><ImagePlus className="w-5 h-5"/> Comprimir y Subir a la Nube</>}
                      </button>
                    )}
                  </div>
                  <div className="bg-stone-100 rounded-xl flex items-center justify-center p-4 border border-stone-200 min-h-[250px]">
                    {previewImage ? <img src={previewImage} alt="Preview" className="max-w-full max-h-[250px] object-contain rounded-lg shadow-md" /> : <p className="text-stone-400 font-bold flex flex-col items-center gap-2"><ImagePlus className="w-8 h-8"/> Vista previa</p>}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <h2 className="text-xl font-bold text-stone-800 border-b pb-2 mb-4">Librería de Medios (WebP)</h2>
                {siteData.mediaLibrary && siteData.mediaLibrary.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {siteData.mediaLibrary.map((media: any) => (
                      <div key={media.id} className="relative group rounded-xl overflow-hidden border border-stone-200">
                        <img src={media.url} alt={media.alt} className="w-full h-32 object-cover" />
                        <div className="absolute inset-0 bg-stone-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                          <button onClick={() => copyToClipboard(media.url)} className="bg-white text-stone-900 text-xs font-bold px-3 py-1 rounded flex items-center gap-1 hover:bg-amber-400"><Copy className="w-3 h-3"/> Copiar URL</button>
                          <button onClick={() => removeMedia(media.id)} className="text-red-400 text-xs flex items-center gap-1 hover:text-red-300"><Trash2 className="w-3 h-3"/> Eliminar</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-stone-500 text-center py-8">Aún no has subido imágenes a la nube.</p>}
              </div>
            </div>
          )}

          {activeTab === 'galeria' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-4">
                <p className="text-sm text-amber-800 font-medium">💡 Sube fotos desde "Multimedia SEO", copia la URL y pégala aquí. Agrega títulos atractivos para mejorar el SEO.</p>
              </div>
              <button onClick={addGalleryItem} className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus className="w-4 h-4"/> Añadir a Galería</button>
              
              {siteData.gallery?.map((item: any) => (
                <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border space-y-4 relative flex flex-col md:flex-row gap-6">
                  <button onClick={() => removeGalleryItem(item.id)} className="absolute top-4 right-4 text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100 z-10"><Trash2 className="w-4 h-4"/></button>
                  <div className="w-full md:w-1/3 shrink-0">
                    <img src={item.url || 'https://via.placeholder.com/300x200'} alt="Galeria" className="w-full h-32 md:h-full object-cover rounded-xl bg-stone-100 border" />
                    <input type="text" value={item.url} onChange={(e) => updateGalleryItem(item.id, 'url', e.target.value)} className="w-full p-2 border rounded-lg mt-2 text-xs" placeholder="URL de la imagen..." />
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500">🇨🇴 Español</label>
                      <input type="text" value={item.title} onChange={(e) => updateGalleryItem(item.id, 'title', e.target.value)} className="w-full p-2 border-b-2 border-stone-200 font-bold outline-none focus:border-amber-500" placeholder="Título SEO..." />
                      <textarea value={item.desc} onChange={(e) => updateGalleryItem(item.id, 'desc', e.target.value)} className="w-full p-2 border rounded-lg text-sm outline-none focus:border-amber-500" placeholder="Descripción corta..." rows={2} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-blue-600">🇺🇸 Inglés</label>
                      <input type="text" value={item.titleEn} onChange={(e) => updateGalleryItem(item.id, 'titleEn', e.target.value)} className="w-full p-2 border-b-2 border-blue-200 font-bold outline-none focus:border-blue-500 bg-blue-50/30" placeholder="SEO Title..." />
                      <textarea value={item.descEn} onChange={(e) => updateGalleryItem(item.id, 'descEn', e.target.value)} className="w-full p-2 border border-blue-200 rounded-lg text-sm outline-none focus:border-blue-500 bg-blue-50/30" placeholder="Short description..." rows={2} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'comercial' && (
             <div className="bg-white rounded-xl shadow-sm p-6 border space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="font-bold text-stone-700">Precio Base x Jinete</label><input type="number" value={siteData.basePrice} onChange={(e) => handleInputChange('basePrice', Number(e.target.value))} className="w-full p-3 border-2 rounded-xl mt-1 font-bold text-lg" /></div>
                <div><label className="font-bold text-stone-700">Costo Guía (Lun-Vie)</label><input type="number" value={siteData.guidePrice} onChange={(e) => handleInputChange('guidePrice', Number(e.target.value))} className="w-full p-3 border-2 rounded-xl mt-1 font-bold text-lg" /></div>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t">
                <input type="checkbox" checked={siteData.promoActive} onChange={(e) => handleInputChange('promoActive', e.target.checked)} className="w-6 h-6" />
                <label className="font-bold text-stone-700">Activar aviso de Promoción (Trust Badge)</label>
              </div>
            </div>
          )}

          {activeTab === 'caballos' && (
            <div className="space-y-4">
              <button onClick={addHorse} className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus className="w-4 h-4"/> Nuevo Caballo</button>
              {siteData.horses?.map((horse: any) => (
                <div key={horse.id} className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-4 items-center">
                  <img src={horse.photo || 'https://via.placeholder.com/150'} alt="Caballo" className="w-24 h-24 object-cover rounded-xl bg-stone-100" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                    <input type="text" value={horse.name} onChange={(e) => updateHorse(horse.id, 'name', e.target.value)} className="p-2 border rounded font-bold" placeholder="Nombre" />
                    <input type="text" value={horse.photo} onChange={(e) => updateHorse(horse.id, 'photo', e.target.value)} className="p-2 border rounded" placeholder="URL Foto..." />
                    <select value={horse.type} onChange={(e) => updateHorse(horse.id, 'type', e.target.value)} className="p-2 border rounded font-bold text-stone-600">
                      <option value="Manso">Manso (Principiantes)</option>
                      <option value="Brioso">Brioso (Expertos)</option>
                    </select>
                    <select value={horse.status} onChange={(e) => updateHorse(horse.id, 'status', e.target.value)} className="p-2 border rounded font-bold text-stone-600">
                      <option value="Activo">Estado: Activo</option>
                      <option value="Reposo">Estado: En Reposo</option>
                    </select>
                  </div>
                  <button onClick={() => removeHorse(horse.id)} className="text-red-500 p-3 bg-red-50 rounded-xl hover:bg-red-100"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <button onClick={addReview} className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus className="w-4 h-4"/> Añadir Reseña</button>
              {siteData.reviews?.map((review: any) => (
                <div key={review.id} className="bg-white p-5 rounded-xl shadow-sm border space-y-4 relative">
                  <button onClick={() => removeReview(review.id)} className="absolute top-4 right-4 text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4"/></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
                    <div><label className="text-xs font-bold text-stone-500">Nombre del Cliente</label><input type="text" value={review.author} onChange={(e) => updateReview(review.id, 'author', e.target.value)} className="w-full p-2 border-b-2 border-stone-200 font-bold text-stone-800 outline-none focus:border-amber-500" /></div>
                    <div><label className="text-xs font-bold text-stone-500">Estrellas</label><select value={review.rating} onChange={(e) => updateReview(review.id, 'rating', Number(e.target.value))} className="w-full p-2 border-b-2 border-stone-200 font-bold text-amber-500 outline-none"><option value={5}>⭐⭐⭐⭐⭐ (5)</option><option value={4}>⭐⭐⭐⭐ (4)</option></select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                    <div><label className="text-xs font-bold text-stone-500 flex items-center gap-1">🇨🇴 Reseña (Español)</label><textarea value={review.text} onChange={(e) => updateReview(review.id, 'text', e.target.value)} className="w-full p-3 border rounded-xl text-stone-600 mt-1" rows={3} /></div>
                    <div><label className="text-xs font-bold text-blue-600 flex items-center gap-1">🇺🇸 Reseña (Inglés)</label><textarea value={review.textEn || ''} onChange={(e) => updateReview(review.id, 'textEn', e.target.value)} className="w-full p-3 border border-blue-200 rounded-xl bg-blue-50/30 mt-1" rows={3} /></div>
                  </div>
                  <div><label className="text-xs font-bold text-stone-500">URL Video/Post (Opcional)</label><input type="text" value={review.videoUrl} onChange={(e) => updateReview(review.id, 'videoUrl', e.target.value)} className="w-full p-2 border-b-2 border-stone-200 text-blue-600 text-sm" placeholder="https://instagram.com/reel/..." /></div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4">
              <button onClick={addFaq} className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus className="w-4 h-4"/> Añadir Pregunta Bilingüe</button>
              {siteData.faqs?.map((faq: any) => (
                <div key={faq.id} className="bg-white p-5 rounded-xl shadow-sm border space-y-4 relative">
                  <button onClick={() => removeFaq(faq.id)} className="absolute top-4 right-4 text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100 z-10"><Trash2 className="w-4 h-4"/></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-10">
                    <div className="space-y-2"><label className="text-xs font-bold text-stone-500">🇨🇴 Español</label><input type="text" value={faq.q} onChange={(e) => updateFaq(faq.id, 'q', e.target.value)} className="w-full p-2 border-b-2 border-stone-200 font-bold" placeholder="Pregunta..." /><textarea value={faq.a} onChange={(e) => updateFaq(faq.id, 'a', e.target.value)} className="w-full p-3 border rounded-xl" rows={3} /></div>
                    <div className="space-y-2"><label className="text-xs font-bold text-blue-600">🇺🇸 Inglés</label><input type="text" value={faq.qEn || ''} onChange={(e) => updateFaq(faq.id, 'qEn', e.target.value)} className="w-full p-2 border-b-2 border-blue-200 font-bold bg-blue-50/30" placeholder="Question..." /><textarea value={faq.aEn || ''} onChange={(e) => updateFaq(faq.id, 'aEn', e.target.value)} className="w-full p-3 border border-blue-200 rounded-xl bg-blue-50/30" rows={3} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'general' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border space-y-8">
              
              <div className="space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <h3 className="font-bold text-lg text-stone-800 flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2"><ImagePlus className="w-5 h-5"/> Medios del Hero (Máx 3)</div>
                  <button onClick={addHeroMedia} className="bg-stone-900 text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1"><Plus className="w-4 h-4"/> Añadir Foto/Video</button>
                </h3>
                <p className="text-xs text-stone-500">Pega URLs de imágenes o videos (.mp4). Si pones varios, el banner rotará automáticamente cada 5 segundos.</p>
                <div className="space-y-3">
                  {siteData.heroMedia?.map((media: any, i: number) => (
                    <div key={media.id} className="flex gap-2 items-center">
                      <span className="font-bold text-stone-400">{i + 1}.</span>
                      <input type="text" value={media.url} onChange={(e) => updateHeroMedia(media.id, e.target.value)} className="flex-1 p-2 border rounded-lg text-sm font-mono" placeholder="https://..." />
                      <button onClick={() => removeHeroMedia(media.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-bold text-lg border-b pb-2 text-stone-800">Textos Principales (Hero)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="font-bold block text-stone-500 border-b pb-1">🇨🇴 Versión Español</label>
                    <div><label className="text-xs font-bold text-stone-500">Título SEO (H1)</label><input type="text" value={siteData.heroTitle} onChange={(e) => handleInputChange('heroTitle', e.target.value)} className="w-full p-2 border-b-2 font-bold focus:border-amber-500 outline-none" /></div>
                    <div><label className="text-xs font-bold text-stone-500">Subtítulo Hero</label><textarea value={siteData.heroSubtitle} onChange={(e) => handleInputChange('heroSubtitle', e.target.value)} className="w-full p-3 border rounded-xl focus:border-amber-500 outline-none" rows={3} /></div>
                  </div>
                  <div className="space-y-4 bg-blue-50/30 p-4 rounded-xl border border-blue-100">
                    <label className="font-bold block text-blue-600 border-b border-blue-200 pb-1">🇺🇸 Versión Inglés</label>
                    <div><label className="text-xs font-bold text-blue-500">SEO Title (H1)</label><input type="text" value={siteData.heroTitleEn || ''} onChange={(e) => handleInputChange('heroTitleEn', e.target.value)} className="w-full p-2 border-b-2 border-blue-200 font-bold bg-transparent" /></div>
                    <div><label className="text-xs font-bold text-blue-500">Hero Subtitle</label><textarea value={siteData.heroSubtitleEn || ''} onChange={(e) => handleInputChange('heroSubtitleEn', e.target.value)} className="w-full p-3 border border-blue-200 rounded-xl bg-white" rows={3} /></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
```