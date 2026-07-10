"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Settings, Users, Lock, Plus, Trash2, Save, LayoutDashboard, MessageSquare, DollarSign, ImagePlus, Copy, Star, Camera, ArrowUp, ArrowDown, TrendingUp, Edit3, X, MapPin, BadgeCheck, Search, BookOpen } from 'lucide-react';
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState<'hero' | 'galeria' | null>(null);

  const [siteData, setSiteData] = useState<any>({
    heroTitle: 'Cabalgatas en Caldas', heroTitleEn: 'Horseback Riding',
    heroSubtitle: 'Conectando jinetes...', heroSubtitleEn: 'Connecting riders...',
    whatsappNumber: '573000000000',
    navLabel1: 'Inicio', navLabel1En: 'Home', navLink1: '#inicio',
    navLabel2: 'Cotizar', navLabel2En: 'Quote', navLink2: '#cotizador',
    navLabel3: 'Galería', navLabel3En: 'Gallery', navLink3: '#galeria',
    navLabel4: 'FAQ', navLabel4En: 'FAQ', navLink4: '#faq',
    basePrice: 100000, guidePrice: 80000, depositPercent: 50, promoActive: true,
    horses: [], faqs: [], mediaLibrary: [], reviews: [], heroMedia: [], gallery: [],
    metaTitle: 'Cabalgatas Ecológicas Medellín', metaTitleEn: 'Horseback Riding Medellin',
    metaDescription: 'Reserva la mejor cabalgata ecológica en Caldas, Antioquia.', metaDescriptionEn: 'Book the best horseback riding tour in Medellin.',
    seoKeywords: 'cabalgatas medellin, caballos caldas, turismo antioquia', seoKeywordsEn: 'horseback riding medellin, horses antioquia, tours',
    seoOgImage: '', googleAnalyticsId: '',
    urgencyText: '🔥 Quedan pocos cupos', urgencyTextEn: '🔥 Few spots left', enableExitIntent: true,
    businessName: 'Cabalgatas Ecológicas Medellín',
    mapAddress: 'Caldas, Antioquia', mapAddressEn: 'Caldas, Antioquia',
    googleRating: 5.0, googleReviewCount: 150, mapEmbedUrl: '',
    blogPosts: [
      { id: 1, title: 'Guía básica para tu primera cabalgata', slug: 'primera-cabalgata', image: 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=800', content: 'Montar a caballo por primera vez es mágico. Recomendamos postura recta y confiar en el animal...', metaTitle: 'Primera Cabalgata en Medellín | Tips', metaDesc: 'Consejos para jinetes principiantes.', keywords: 'primera cabalgata, principiantes' },
      { id: 2, title: 'Beneficios de montar a caballo', slug: 'beneficios-caballos', image: 'https://images.unsplash.com/photo-1553649084-3e42773ff0e3?q=80&w=800', content: 'La equinoterapia reduce el estrés y mejora la postura...', metaTitle: 'Beneficios de montar caballo', metaDesc: 'Conoce cómo ayuda a tu salud mental.', keywords: 'salud mental, beneficios caballos' },
      { id: 3, title: '¿Qué ropa llevar a una cabalgata?', slug: 'ropa-cabalgata', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800', content: 'Usa pantalón largo (jean), botas o zapatos cerrados, y protector solar...', metaTitle: 'Ropa para cabalgatas | Guía', metaDesc: 'Descubre qué usar para estar cómodo.', keywords: 'ropa cabalgata, outfit, botas' },
      { id: 4, title: 'Caballos Mansos vs Briosos', slug: 'mansos-briosos', image: 'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=800', content: 'Si eres experto, un caballo brioso te dará más energía. Si es tu primera vez, uno manso es ideal...', metaTitle: 'Caballos Mansos y Briosos', metaDesc: 'Diferencias para elegir tu caballo.', keywords: 'caballo manso, caballo brioso' }
    ]
  });

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        const docSnap = await getDoc(doc(db, "configuracion", "general"));
        if (docSnap.exists()) setSiteData((prev: any) => ({ ...prev, ...docSnap.data() }));
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const saveConfig = async () => {
    setIsSaving(true); setMensajeGuardado('');
    try {
      await setDoc(doc(db, "configuracion", "general"), siteData);
      setMensajeGuardado('✅ ¡Cambios Guardados!');
    } catch (error) { setMensajeGuardado('❌ Error al guardar.'); }
    setIsSaving(false); setTimeout(() => setMensajeGuardado(''), 4000);
  };

  const handleInputChange = (field: string, value: any) => setSiteData((prev: any) => ({ ...prev, [field]: value }));

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const storageRef = ref(storage, `imagenes/media_${Date.now()}.webp`);
      await uploadString(storageRef, previewImage, 'data_url');
      const url = await getDownloadURL(storageRef);
      setSiteData((prev: any) => ({ ...prev, mediaLibrary: [{ id: Date.now(), url, title: 'Nueva Imagen' }, ...(prev.mediaLibrary || [])] }));
      setPreviewImage(null); if (fileInputRef.current) fileInputRef.current.value = '';
      alert("✅ Imagen subida a la Librería.");
    } catch (error) { alert("❌ Error subiendo la imagen."); }
    setIsUploading(false);
  };

  const editMediaMetadata = (id: number, currentTitle: string) => {
    const newTitle = prompt("Nombre/SEO de la imagen:", currentTitle);
    if (newTitle !== null) setSiteData((prev: any) => ({ ...prev, mediaLibrary: prev.mediaLibrary.map((m: any) => m.id === id ? { ...m, title: newTitle } : m) }));
  };

  const selectFromLibrary = (media: any) => {
    if (showPicker === 'hero') {
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

  const addBlogPost = () => setSiteData((prev: any) => ({ ...prev, blogPosts: [{ id: Date.now(), title: 'Nuevo Artículo', slug: `nuevo-articulo-${Date.now()}`, image: '', content: '', metaTitle: '', metaDesc: '', keywords: '' }, ...(prev.blogPosts || [])] }));
  const updateBlogPost = (id: number, field: string, value: string) => setSiteData((prev: any) => ({ ...prev, blogPosts: prev.blogPosts.map((p: any) => p.id === id ? { ...p, [field]: value } : p) }));
  const removeBlogPost = (id: number) => setSiteData((prev: any) => ({ ...prev, blogPosts: prev.blogPosts.filter((p: any) => p.id !== id) }));

  const addHorse = () => setSiteData((prev: any) => ({ ...prev, horses: [...(prev.horses||[]), { id: Date.now(), name: 'Nuevo', type: 'Manso', photo: '', status: 'Activo' }] }));
  const updateHorse = (id: number, field: string, value: string) => setSiteData((prev: any) => ({ ...prev, horses: prev.horses.map((h: any) => h.id === id ? { ...h, [field]: value } : h) }));
  const removeHorse = (id: number) => setSiteData((prev: any) => ({ ...prev, horses: prev.horses.filter((h: any) => h.id !== id) }));

  const addReview = () => setSiteData((prev: any) => ({ ...prev, reviews: [...(prev.reviews || []), { id: Date.now(), author: 'Cliente', text: '', textEn: '', rating: 5, videoUrl: '' }] }));
  const updateReview = (id: number, field: string, value: any) => setSiteData((prev: any) => ({ ...prev, reviews: prev.reviews.map((r: any) => r.id === id ? { ...r, [field]: value } : r) }));
  const removeReview = (id: number) => setSiteData((prev: any) => ({ ...prev, reviews: prev.reviews.filter((r: any) => r.id !== id) }));

  const addFaq = () => setSiteData((prev: any) => ({ ...prev, faqs: [...(prev.faqs || []), { id: Date.now(), q: '', a: '', qEn: '', aEn: '' }] }));
  const updateFaq = (id: number, field: string, value: string) => setSiteData((prev: any) => ({ ...prev, faqs: prev.faqs.map((f: any) => f.id === id ? { ...f, [field]: value } : f) }));
  const removeFaq = (id: number) => setSiteData((prev: any) => ({ ...prev, faqs: prev.faqs.filter((f: any) => f.id !== id) }));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <form onSubmit={(e) => { e.preventDefault(); if (password === 'admin') setIsAuthenticated(true); else setLoginError(true); }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <Lock className="w-10 h-10 mx-auto text-amber-600 mb-4"/>
          <h1 className="text-2xl font-bold mb-6">Acceso CMS</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg mb-4" placeholder="Contraseña" />
          {loginError && <p className="text-red-500 font-bold mb-4">Contraseña incorrecta</p>}
          <button type="submit" className="w-full bg-stone-900 text-white p-3 rounded-lg font-bold">Ingresar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Modal Picker Librería */}
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
                  <img src={media.url} className="w-full h-32 object-cover" alt={media.title} />
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

      {/* Menú Lateral */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col shadow-2xl z-10">
        <div className="p-6 border-b border-stone-800"><h2 className="text-xl font-bold text-white">Panel Admin</h2></div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'comercial', icon: DollarSign, label: 'Precios' },
            { id: 'seo', icon: Search, label: 'SEO Avanzado & CRO' },
            { id: 'blog', icon: BookOpen, label: 'Blog & Artículos' },
            { id: 'hero', icon: LayoutDashboard, label: 'Banners' },
            { id: 'galeria', icon: Camera, label: 'Galería' },
            { id: 'multimedia', icon: ImagePlus, label: 'Librería' },
            { id: 'ubicacion', icon: MapPin, label: 'Maps & Confianza' },
            { id: 'caballos', icon: Users, label: 'Caballos' },
            { id: 'reviews', icon: Star, label: 'Reseñas' },
            { id: 'faq', icon: MessageSquare, label: 'FAQ' },
            { id: 'general', icon: Settings, label: 'Menú Móvil' }
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${activeTab === item.id ? 'bg-amber-600 text-white shadow-lg' : 'hover:bg-stone-800'}`}>
              <item.icon className="w-5 h-5" /> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-32">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border sticky top-0 z-20">
            <h1 className="text-2xl font-bold capitalize text-stone-800">Módulo: {activeTab}</h1>
            <div className="flex items-center gap-4">
              {mensajeGuardado && <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">{mensajeGuardado}</span>}
              <button onClick={saveConfig} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 shadow-lg">
                <Save size={20}/> {isSaving ? 'Guardando...' : 'Publicar'}
              </button>
            </div>
          </div>

          {activeTab === 'comercial' && (
            <div className="bg-white rounded-xl p-6 border space-y-6">
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-sm text-amber-800">
                <b>Regla Activa:</b> Grupales = Fin de semana a las 2:00 PM (Sin recargo guía). Privadas = Cualquier otro caso (Suma recargo guía).
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div><label className="font-bold">Precio Base x Jinete ($)</label><input type="number" value={siteData.basePrice} onChange={(e) => handleInputChange('basePrice', Number(e.target.value))} className="w-full p-3 border rounded-xl mt-1 font-bold" /></div>
                <div><label className="font-bold">Costo Guía Exclusivo ($)</label><input type="number" value={siteData.guidePrice} onChange={(e) => handleInputChange('guidePrice', Number(e.target.value))} className="w-full p-3 border rounded-xl mt-1 font-bold text-amber-600" /></div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="bg-white p-6 rounded-xl border space-y-6">
              <h3 className="font-bold border-b pb-2 flex items-center gap-2"><Search className="text-amber-500"/> Configuración Global de SEO</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 bg-stone-50 p-4 rounded-lg border">
                  <h4 className="font-bold text-stone-700">🇨🇴 SEO Español (Home)</h4>
                  <div><label className="text-xs font-bold">Meta Title</label><input value={siteData.metaTitle} onChange={(e) => handleInputChange('metaTitle', e.target.value)} className="w-full p-2 border rounded mt-1" /></div>
                  <div><label className="text-xs font-bold">Meta Description</label><textarea value={siteData.metaDescription} onChange={(e) => handleInputChange('metaDescription', e.target.value)} className="w-full p-2 border rounded mt-1" rows={2}/></div>
                  <div><label className="text-xs font-bold">Keywords (Separar por coma)</label><textarea value={siteData.seoKeywords} onChange={(e) => handleInputChange('seoKeywords', e.target.value)} className="w-full p-2 border rounded mt-1 text-sm" rows={2}/></div>
                </div>
                <div className="space-y-3 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-bold text-blue-800">🇺🇸 SEO Inglés (Home)</h4>
                  <div><label className="text-xs font-bold">Meta Title</label><input value={siteData.metaTitleEn} onChange={(e) => handleInputChange('metaTitleEn', e.target.value)} className="w-full p-2 border rounded mt-1 bg-white" /></div>
                  <div><label className="text-xs font-bold">Meta Description</label><textarea value={siteData.metaDescriptionEn} onChange={(e) => handleInputChange('metaDescriptionEn', e.target.value)} className="w-full p-2 border rounded mt-1 bg-white" rows={2}/></div>
                  <div><label className="text-xs font-bold">Keywords</label><textarea value={siteData.seoKeywordsEn} onChange={(e) => handleInputChange('seoKeywordsEn', e.target.value)} className="w-full p-2 border rounded mt-1 bg-white text-sm" rows={2}/></div>
                </div>
              </div>

              <div>
                <label className="font-bold block text-sm">Imagen de Portada (OG Image)</label>
                <p className="text-xs text-stone-500 mb-2">Es la miniatura que aparece cuando pegas el link en WhatsApp o Facebook.</p>
                <input value={siteData.seoOgImage} onChange={(e) => handleInputChange('seoOgImage', e.target.value)} className="w-full p-2 border rounded" placeholder="https://..." />
              </div>

              <div>
                <label className="font-bold block text-sm">ID Google Analytics (Tracking)</label>
                <input value={siteData.googleAnalyticsId} onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)} className="w-full md:w-1/2 p-2 border rounded" placeholder="G-XXXXXXXXXX" />
              </div>

              <h3 className="font-bold border-b pb-2 pt-4 flex items-center gap-2"><TrendingUp className="text-green-500"/> Ventas y CRO</h3>
              <div className="flex gap-4 items-center mb-4"><input type="checkbox" checked={siteData.enableExitIntent} onChange={(e) => handleInputChange('enableExitIntent', e.target.checked)} className="w-6 h-6"/><span>Activar Pop-up de Intención de Salida (Descuento)</span></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold">Gatillo Urgencia ES (Cotizador)</label><input value={siteData.urgencyText} onChange={(e) => handleInputChange('urgencyText', e.target.value)} className="w-full p-2 border rounded mt-1" /></div>
                <div><label className="text-xs font-bold text-blue-600">Gatillo Urgencia EN</label><input value={siteData.urgencyTextEn} onChange={(e) => handleInputChange('urgencyTextEn', e.target.value)} className="w-full p-2 border rounded mt-1 bg-blue-50" /></div>
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <p className="text-sm text-amber-800"><b>Blog SEO:</b> Escribe artículos sobre cabalgatas, turismo y recomendaciones. Esto posicionará tu web orgánicamente en Google. Recuerda llenar los campos de SEO de cada entrada.</p>
              </div>
              <button onClick={addBlogPost} className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus size={16}/> Escribir Nuevo Artículo</button>
              
              {siteData.blogPosts?.map((post: any) => (
                <div key={post.id} className="bg-white p-6 rounded-xl border shadow-sm space-y-4 relative">
                  <button onClick={() => removeBlogPost(post.id)} className="absolute top-4 right-4 text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100"><Trash2 size={16}/></button>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-bold text-stone-800 border-b pb-1">1. Contenido del Post</h4>
                      <div><label className="text-xs font-bold">Título del Artículo (H1)</label><input value={post.title} onChange={(e) => updateBlogPost(post.id, 'title', e.target.value)} className="w-full p-2 border rounded font-bold" /></div>
                      <div><label className="text-xs font-bold">URL (Slug) Ej: ropa-cabalgata</label><input value={post.slug} onChange={(e) => updateBlogPost(post.id, 'slug', e.target.value)} className="w-full p-2 border rounded text-amber-600 font-mono text-sm" /></div>
                      <div><label className="text-xs font-bold">URL Imagen Principal</label><input value={post.image} onChange={(e) => updateBlogPost(post.id, 'image', e.target.value)} className="w-full p-2 border rounded text-sm" /></div>
                      <div><label className="text-xs font-bold">Cuerpo del Artículo</label><textarea value={post.content} onChange={(e) => updateBlogPost(post.id, 'content', e.target.value)} className="w-full p-3 border rounded" rows={6} /></div>
                    </div>
                    <div className="space-y-3 bg-stone-50 p-4 rounded-lg border">
                      <h4 className="font-bold text-stone-700 border-b pb-1">2. SEO de este Post</h4>
                      <div><label className="text-xs font-bold">Meta Title</label><input value={post.metaTitle} onChange={(e) => updateBlogPost(post.id, 'metaTitle', e.target.value)} className="w-full p-2 border rounded" /></div>
                      <div><label className="text-xs font-bold">Meta Description</label><textarea value={post.metaDesc} onChange={(e) => updateBlogPost(post.id, 'metaDesc', e.target.value)} className="w-full p-2 border rounded" rows={3} /></div>
                      <div><label className="text-xs font-bold">Keywords Específicas</label><textarea value={post.keywords} onChange={(e) => updateBlogPost(post.id, 'keywords', e.target.value)} className="w-full p-2 border rounded text-sm" rows={2} /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ubicacion' && (
            <div className="bg-white rounded-xl p-6 border space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-2"><BadgeCheck className="text-blue-500"/> Negocio Verificado & Maps</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="font-bold text-sm">Nombre Negocio</label><input value={siteData.businessName} onChange={(e) => handleInputChange('businessName', e.target.value)} className="w-full p-2 border rounded mt-1" /></div>
                <div><label className="font-bold text-sm">Rating (Ej: 4.9)</label><input type="number" step="0.1" value={siteData.googleRating} onChange={(e) => handleInputChange('googleRating', Number(e.target.value))} className="w-full p-2 border rounded mt-1 text-amber-600 font-bold" /></div>
                <div><label className="font-bold text-sm">N° Reseñas</label><input type="number" value={siteData.googleReviewCount} onChange={(e) => handleInputChange('googleReviewCount', Number(e.target.value))} className="w-full p-2 border rounded mt-1" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="font-bold text-sm">Dirección ES</label><input value={siteData.mapAddress} onChange={(e) => handleInputChange('mapAddress', e.target.value)} className="w-full p-2 border rounded mt-1" /></div>
                <div><label className="font-bold text-sm text-blue-600">Dirección EN</label><input value={siteData.mapAddressEn} onChange={(e) => handleInputChange('mapAddressEn', e.target.value)} className="w-full p-2 border rounded mt-1 bg-blue-50" /></div>
              </div>
              <div>
                <label className="font-bold text-sm">Link de Compartir Google Maps</label>
                <input value={siteData.mapEmbedUrl} onChange={(e) => handleInputChange('mapEmbedUrl', e.target.value)} className="w-full p-3 border rounded font-mono text-sm mt-1" placeholder="https://maps.app.goo.gl/..." />
              </div>
            </div>
          )}

          {activeTab === 'multimedia' && (
            <div className="bg-white rounded-xl p-6 border space-y-6">
              <div>
                <label className="font-bold block mb-2 text-lg">Subir nueva imagen a Librería</label>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} className="w-full p-4 border-2 border-dashed rounded-xl bg-stone-50 cursor-pointer mb-2 font-bold" />
                {previewImage && <button onClick={processAndUploadImage} className="w-full bg-amber-500 text-stone-900 py-3 rounded-xl font-bold disabled:opacity-50"><ImagePlus className="inline mr-2"/> {isUploading ? 'Subiendo...' : 'Subir a Librería'}</button>}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-4">
                {siteData.mediaLibrary?.map((media: any) => (
                  <div key={media.id} className="border rounded-xl p-2 bg-stone-50">
                    <img src={media.url} className="w-full h-24 object-cover rounded-lg mb-2" alt={media.title} />
                    <p className="text-xs font-bold truncate mb-2 px-1">{media.title || 'Sin nombre'}</p>
                    <div className="flex gap-2">
                      <button onClick={() => editMediaMetadata(media.id, media.title)} className="flex-1 bg-blue-100 text-blue-700 text-xs p-1.5 rounded"><Edit3 size={14} className="mx-auto"/></button>
                      <button onClick={() => { setSiteData((prev: any) => ({...prev, mediaLibrary: prev.mediaLibrary.filter((m:any) => m.id !== media.id) })) }} className="flex-1 bg-red-100 text-red-600 text-xs p-1.5 rounded"><Trash2 size={14} className="mx-auto"/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-4">
              <button onClick={() => setShowPicker('hero')} className="bg-stone-900 text-white px-4 py-3 rounded-xl font-bold flex items-center gap-2"><Plus size={20}/> Seleccionar foto para Banner</button>
              {siteData.heroMedia?.map((h: any) => (
                <div key={h.id} className="bg-white p-5 rounded-xl border flex flex-col md:flex-row gap-6 relative">
                  <button onClick={() => removeHeroMedia(h.id)} className="absolute top-4 right-4 text-red-500 bg-red-50 p-2 rounded-lg"><Trash2 size={16}/></button>
                  <div className="w-full md:w-1/3"><img src={h.url} className="w-full h-32 object-cover rounded-lg border" alt="Hero" /></div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2"><label className="text-xs font-bold">🇨🇴 Español</label><input value={h.title} onChange={(e) => updateHeroMedia(h.id, 'title', e.target.value)} className="w-full p-2 border rounded font-bold" /><textarea value={h.subtitle} onChange={(e) => updateHeroMedia(h.id, 'subtitle', e.target.value)} className="w-full p-2 border rounded text-sm" rows={2}/></div>
                    <div className="space-y-2 bg-blue-50 p-3 rounded-lg"><label className="text-xs font-bold text-blue-700">🇺🇸 Inglés</label><input value={h.titleEn} onChange={(e) => updateHeroMedia(h.id, 'titleEn', e.target.value)} className="w-full p-2 border rounded font-bold" /><textarea value={h.subtitleEn} onChange={(e) => updateHeroMedia(h.id, 'subtitleEn', e.target.value)} className="w-full p-2 border rounded text-sm" rows={2}/></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'galeria' && (
            <div className="space-y-4">
              <button onClick={() => setShowPicker('galeria')} className="bg-stone-900 text-white px-4 py-3 rounded-xl font-bold flex items-center gap-2"><Plus size={20}/> Seleccionar foto para Galería</button>
              {siteData.gallery?.map((g: any, idx: number) => (
                <div key={g.id} className="bg-white p-5 rounded-xl border flex flex-col md:flex-row gap-6 relative">
                  <div className="absolute top-4 right-14 flex gap-2">
                    <button onClick={() => moveGalleryItem(idx, -1)} className="bg-stone-100 p-2 rounded"><ArrowUp size={16}/></button>
                    <button onClick={() => moveGalleryItem(idx, 1)} className="bg-stone-100 p-2 rounded"><ArrowDown size={16}/></button>
                  </div>
                  <button onClick={() => removeGalleryItem(g.id)} className="absolute top-4 right-4 text-red-500 bg-red-50 p-2 rounded-lg"><Trash2 size={16}/></button>
                  <div className="w-full md:w-1/3"><p className="font-bold text-amber-600 mb-2">Posición #{idx + 1}</p><img src={g.url} className="w-full h-32 object-cover rounded-lg border" alt="Galeria" /></div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2"><label className="text-xs font-bold">🇨🇴 Español</label><input value={g.title} onChange={(e) => updateGalleryItem(g.id, 'title', e.target.value)} className="w-full p-2 border rounded font-bold" /><textarea value={g.desc} onChange={(e) => updateGalleryItem(g.id, 'desc', e.target.value)} className="w-full p-2 border rounded text-sm" rows={2}/></div>
                    <div className="space-y-2 bg-blue-50 p-3 rounded-lg"><label className="text-xs font-bold text-blue-700">🇺🇸 Inglés</label><input value={g.titleEn} onChange={(e) => updateGalleryItem(g.id, 'titleEn', e.target.value)} className="w-full p-2 border rounded font-bold" /><textarea value={g.descEn} onChange={(e) => updateGalleryItem(g.id, 'descEn', e.target.value)} className="w-full p-2 border rounded text-sm" rows={2}/></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'caballos' && (
            <div className="space-y-4">
              <button onClick={addHorse} className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus size={16}/> Nuevo Caballo</button>
              {siteData.horses?.map((horse: any) => (
                <div key={horse.id} className="bg-white p-4 rounded-xl border flex gap-4 items-center">
                  <img src={horse.photo || 'https://via.placeholder.com/150'} className="w-24 h-24 object-cover rounded-xl" alt="Caballo" />
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <input type="text" value={horse.name} onChange={(e) => updateHorse(horse.id, 'name', e.target.value)} className="p-2 border rounded" placeholder="Nombre" />
                    <input type="text" value={horse.photo} onChange={(e) => updateHorse(horse.id, 'photo', e.target.value)} className="p-2 border rounded" placeholder="URL Foto" />
                    <select value={horse.type} onChange={(e) => updateHorse(horse.id, 'type', e.target.value)} className="p-2 border rounded"><option>Manso</option><option>Brioso</option></select>
                  </div>
                  <button onClick={() => removeHorse(horse.id)} className="text-red-500 p-3 bg-red-50 rounded-xl"><Trash2 size={20}/></button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <button onClick={addReview} className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus size={16}/> Añadir Reseña</button>
              {siteData.reviews?.map((review: any) => (
                <div key={review.id} className="bg-white p-5 rounded-xl border space-y-4 relative">
                  <button onClick={() => removeReview(review.id)} className="absolute top-4 right-4 text-red-500 bg-red-50 p-2 rounded-lg"><Trash2 size={16}/></button>
                  <div className="grid grid-cols-2 gap-4 pr-12">
                    <div><label className="text-xs font-bold">Cliente</label><input type="text" value={review.author} onChange={(e) => updateReview(review.id, 'author', e.target.value)} className="w-full p-2 border-b-2 font-bold" /></div>
                    <div><label className="text-xs font-bold">Estrellas</label><select value={review.rating} onChange={(e) => updateReview(review.id, 'rating', Number(e.target.value))} className="w-full p-2 border-b-2 text-amber-500 font-bold"><option value={5}>5</option><option value={4}>4</option></select></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold">Reseña ES</label><textarea value={review.text} onChange={(e) => updateReview(review.id, 'text', e.target.value)} className="w-full p-2 border rounded mt-1" rows={3} /></div>
                    <div><label className="text-xs font-bold text-blue-600">Reseña EN</label><textarea value={review.textEn} onChange={(e) => updateReview(review.id, 'textEn', e.target.value)} className="w-full p-2 border rounded mt-1 bg-blue-50" rows={3} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4">
              <button onClick={addFaq} className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus size={16}/> Añadir Pregunta</button>
              {siteData.faqs?.map((faq: any) => (
                <div key={faq.id} className="bg-white p-5 rounded-xl border relative">
                  <button onClick={() => removeFaq(faq.id)} className="absolute top-4 right-4 text-red-500 bg-red-50 p-2 rounded-lg"><Trash2 size={16}/></button>
                  <div className="grid grid-cols-2 gap-6 pr-10">
                    <div className="space-y-2"><label className="text-xs font-bold">🇨🇴 ES</label><input type="text" value={faq.q} onChange={(e) => updateFaq(faq.id, 'q', e.target.value)} className="w-full p-2 border-b-2 font-bold" /><textarea value={faq.a} onChange={(e) => updateFaq(faq.id, 'a', e.target.value)} className="w-full p-2 border rounded" rows={3} /></div>
                    <div className="space-y-2"><label className="text-xs font-bold text-blue-600">🇺🇸 EN</label><input type="text" value={faq.qEn} onChange={(e) => updateFaq(faq.id, 'qEn', e.target.value)} className="w-full p-2 border-b-2 font-bold bg-blue-50" /><textarea value={faq.aEn} onChange={(e) => updateFaq(faq.id, 'aEn', e.target.value)} className="w-full p-2 border rounded bg-blue-50" rows={3} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'general' && (
            <div className="bg-white rounded-xl p-6 border space-y-8">
              <div><label className="font-bold block mb-1">WhatsApp Principal</label><input type="text" value={siteData.whatsappNumber} onChange={(e) => handleInputChange('whatsappNumber', e.target.value)} className="w-full md:w-1/2 p-3 border-2 rounded-xl font-mono text-lg" placeholder="573000000000" /></div>
              
              <div className="space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <h3 className="font-bold text-lg border-b border-stone-200 pb-2 text-stone-800"><LayoutDashboard className="w-5 h-5 inline mr-2"/> Menú Inferior Móvil</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 bg-white p-4 rounded-lg border"><h4 className="font-bold">Botón 1 (Izq Extrema)</h4><div className="flex gap-2"><input type="text" value={siteData.navLabel1} onChange={(e) => handleInputChange('navLabel1', e.target.value)} className="w-full p-2 border rounded text-xs" placeholder="ES" /><input type="text" value={siteData.navLabel1En} onChange={(e) => handleInputChange('navLabel1En', e.target.value)} className="w-full p-2 border rounded bg-blue-50 text-xs" placeholder="EN" /></div><input type="text" value={siteData.navLink1} onChange={(e) => handleInputChange('navLink1', e.target.value)} className="w-full p-2 border rounded font-mono text-xs text-amber-600" placeholder="Link" /></div>
                  <div className="space-y-3 bg-white p-4 rounded-lg border"><h4 className="font-bold">Botón 2 (Izq Medio)</h4><div className="flex gap-2"><input type="text" value={siteData.navLabel2} onChange={(e) => handleInputChange('navLabel2', e.target.value)} className="w-full p-2 border rounded text-xs" placeholder="ES" /><input type="text" value={siteData.navLabel2En} onChange={(e) => handleInputChange('navLabel2En', e.target.value)} className="w-full p-2 border rounded bg-blue-50 text-xs" placeholder="EN" /></div><input type="text" value={siteData.navLink2} onChange={(e) => handleInputChange('navLink2', e.target.value)} className="w-full p-2 border rounded font-mono text-xs text-amber-600" placeholder="Link" /></div>
                  <div className="space-y-3 bg-white p-4 rounded-lg border"><h4 className="font-bold">Botón 3 (Der Medio)</h4><div className="flex gap-2"><input type="text" value={siteData.navLabel3} onChange={(e) => handleInputChange('navLabel3', e.target.value)} className="w-full p-2 border rounded text-xs" placeholder="ES" /><input type="text" value={siteData.navLabel3En} onChange={(e) => handleInputChange('navLabel3En', e.target.value)} className="w-full p-2 border rounded bg-blue-50 text-xs" placeholder="EN" /></div><input type="text" value={siteData.navLink3} onChange={(e) => handleInputChange('navLink3', e.target.value)} className="w-full p-2 border rounded font-mono text-xs text-amber-600" placeholder="Link" /></div>
                  <div className="space-y-3 bg-white p-4 rounded-lg border"><h4 className="font-bold">Botón 4 (Der Extrema)</h4><div className="flex gap-2"><input type="text" value={siteData.navLabel4} onChange={(e) => handleInputChange('navLabel4', e.target.value)} className="w-full p-2 border rounded text-xs" placeholder="ES" /><input type="text" value={siteData.navLabel4En} onChange={(e) => handleInputChange('navLabel4En', e.target.value)} className="w-full p-2 border rounded bg-blue-50 text-xs" placeholder="EN" /></div><input type="text" value={siteData.navLink4} onChange={(e) => handleInputChange('navLink4', e.target.value)} className="w-full p-2 border rounded font-mono text-xs text-amber-600" placeholder="Link" /></div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}


