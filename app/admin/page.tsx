"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Settings, Users, Lock, Plus, Trash2, Save, LayoutDashboard, MessageSquare, DollarSign, ImagePlus, Copy, Star, Camera, ArrowUp, ArrowDown, TrendingUp, Edit3, X, MapPin, BadgeCheck, Search, BookOpen, Calendar, Clock, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { db, storage } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('reservas');
  const [isSaving, setIsSaving] = useState(false);
  const [mensajeGuardado, setMensajeGuardado] = useState('');

  // Estados para las Reservas (CRM)
  const [reservas, setReservas] = useState<any[]>([]);
  const [cargandoReservas, setCargandoReservas] = useState(true);

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
    blogPosts: []
  });

  // Cargar configuración general
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        const docSnap = await getDoc(doc(db, "configuracion", "general"));
        if (docSnap.exists()) setSiteData((prev: any) => ({ ...prev, ...docSnap.data() }));
      };
      fetchData();
    }
  }, [isAuthenticated]);

  // Cargar Reservas en tiempo real
  useEffect(() => {
    if (isAuthenticated) {
      const q = query(collection(db, 'reservas'), orderBy('fechaCreacion', 'desc'));
      const desuscribir = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReservas(data);
        setCargandoReservas(false);
      });
      return () => desuscribir();
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
          <h1 className="text-2xl font-bold mb-6 text-stone-900">Acceso CMS</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 border-2 border-stone-300 rounded-lg mb-4 text-stone-900 font-bold bg-white focus:border-amber-500 focus:outline-none" placeholder="Contraseña" />
          {loginError && <p className="text-red-500 font-bold mb-4">Contraseña incorrecta</p>}
          <button type="submit" className="w-full bg-stone-900 text-white p-4 rounded-lg font-bold text-lg">Ingresar</button>
        </form>
      </div>
    );
  }

  // CLASE REUTILIZABLE PARA TODOS LOS INPUTS Y TEXTAREAS (ALTO CONTRASTE)
  const inputClass = "w-full p-3 border-2 border-stone-300 rounded-lg mt-1 text-stone-900 bg-white font-medium focus:border-amber-500 focus:outline-none placeholder-stone-400";
  const labelClass = "block text-sm font-extrabold text-stone-900 mb-1";

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Modal Picker Librería */}
      {showPicker && (
        <div className="fixed inset-0 bg-stone-900/80 z-[100] flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[80vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b-2 flex justify-between items-center bg-stone-100">
              <h2 className="font-extrabold text-xl flex items-center gap-2 text-stone-900"><ImagePlus className="text-amber-600"/> Selecciona una foto para: {showPicker === 'hero' ? 'Banners' : 'Galería'}</h2>
              <button onClick={() => setShowPicker(null)} className="p-2 bg-stone-300 rounded-full hover:bg-stone-400 text-stone-900"><X size={20}/></button>
            </div>
            <div className="p-4 overflow-y-auto grid grid-cols-2 md:grid-cols-4 gap-4 bg-white">
              {siteData.mediaLibrary?.map((media: any) => (
                <div key={media.id} onClick={() => selectFromLibrary(media)} className="cursor-pointer group relative rounded-lg overflow-hidden border-2 border-stone-200 hover:border-amber-500 shadow-sm">
                  <img src={media.url} className="w-full h-32 object-cover" alt={media.title} />
                  <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/20 transition-all flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white text-amber-700 font-extrabold px-4 py-2 rounded-lg shadow-lg">Seleccionar</span>
                  </div>
                </div>
              ))}
              {(!siteData.mediaLibrary || siteData.mediaLibrary.length === 0) && <p className="col-span-full text-center py-8 text-stone-500 font-bold">No hay fotos en la librería. Sube algunas primero.</p>}
            </div>
          </div>
        </div>
      )}

      {/* Menú Lateral */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col shadow-2xl z-10">
        <div className="p-6 border-b border-stone-800"><h2 className="text-2xl font-extrabold text-white">Panel Admin</h2></div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'reservas', icon: Calendar, label: 'Reservas CRM' },
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
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-colors ${activeTab === item.id ? 'bg-amber-500 text-stone-900 shadow-lg' : 'hover:bg-stone-800 text-stone-300 hover:text-white'}`}>
              <item.icon className="w-5 h-5" /> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-32 bg-stone-100">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-stone-200 sticky top-0 z-20">
            <h1 className="text-2xl font-extrabold capitalize text-stone-900">Módulo: {activeTab}</h1>
            <div className="flex items-center gap-4">
              {mensajeGuardado && <span className="text-green-700 font-extrabold bg-green-100 px-4 py-2 rounded-full border border-green-200">{mensajeGuardado}</span>}
              <button onClick={saveConfig} className="bg-green-600 text-white px-8 py-3 rounded-xl font-extrabold flex items-center gap-2 hover:bg-green-700 shadow-lg transition-transform hover:scale-105">
                <Save size={20}/> {isSaving ? 'Guardando...' : 'Publicar Cambios'}
              </button>
            </div>
          </div>

          {/* PESTAÑA: RESERVAS CRM */}
          {activeTab === 'reservas' && (
            <div className="space-y-6">
              {cargandoReservas ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reservas.length === 0 ? (
                    <div className="col-span-full bg-white p-12 text-center rounded-2xl border-2 border-dashed border-stone-300 shadow-sm">
                      <AlertCircle className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                      <h3 className="text-xl font-extrabold text-stone-900">No hay reservas todavía</h3>
                      <p className="text-stone-500 font-medium mt-2">Las cotizaciones de la web aparecerán aquí automáticamente.</p>
                    </div>
                  ) : (
                    reservas.map((reserva) => (
                      <div key={reserva.id} className="bg-white rounded-2xl p-6 shadow-sm border-2 border-stone-200 hover:border-amber-400 transition-colors flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-300">
                            {reserva.plan || 'Cabalgata Estándar'}
                          </span>
                          <span className="text-xs font-bold text-stone-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {reserva.fechaCreacion ? new Date(reserva.fechaCreacion.toDate()).toLocaleDateString() : 'Reciente'}
                          </span>
                        </div>
                        <div className="space-y-3 mb-6 flex-grow">
                          <div className="flex items-center gap-3 text-stone-800">
                            <Calendar className="w-5 h-5 text-stone-400" />
                            <span className="font-extrabold">{reserva.fecha} a las {reserva.hora}</span>
                          </div>
                          <div className="flex items-center gap-3 text-stone-800">
                            <Users className="w-5 h-5 text-stone-400" />
                            <span className="font-bold">{reserva.jinetes} Jinetes <span className="text-stone-400 font-medium">({reserva.origen || 'Web'})</span></span>
                          </div>
                          
                          {reserva.telefono && (
                            <div className="flex items-center gap-3 text-stone-800">
                              <Phone className="w-5 h-5 text-green-600" />
                              <a 
                                href={`https://wa.me/${reserva.telefono.replace(/\D/g, '')}`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="font-extrabold text-green-700 hover:underline bg-green-50 px-2 py-1 rounded-lg border border-green-200"
                                title="Abrir chat en WhatsApp"
                              >
                                {reserva.telefono}
                              </a>
                            </div>
                          )}

                          <div className="flex items-center gap-3 text-stone-900 font-extrabold bg-stone-100 p-3 rounded-xl mt-4 border border-stone-200">
                            <DollarSign className="w-6 h-6 text-green-600" />
                            <span className="text-xl">${reserva.total?.toLocaleString()} COP</span>
                          </div>
                        </div>
                        <div className="mt-auto pt-4 border-t-2 border-stone-100 flex gap-2">
                          <button className="flex-1 bg-stone-900 text-white font-extrabold py-3 px-4 rounded-xl hover:bg-stone-800 transition text-sm">
                            Marcar Contactado
                          </button>
                          <button className="flex items-center justify-center bg-green-100 text-green-700 p-3 rounded-xl hover:bg-green-200 transition border border-green-200">
                            <CheckCircle className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'comercial' && (
            <div className="bg-white rounded-2xl p-8 border-2 border-stone-200 shadow-sm space-y-8">
              <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200 text-amber-900 font-medium">
                <strong className="font-extrabold">Regla Activa:</strong> Grupales = Fin de semana a las 2:00 PM (Sin recargo guía). Privadas = Cualquier otro caso (Suma recargo guía).
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Precio Base x Jinete ($)</label>
                  <input type="number" value={siteData.basePrice} onChange={(e) => handleInputChange('basePrice', Number(e.target.value))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Costo Guía Exclusivo ($)</label>
                  <input type="number" value={siteData.guidePrice} onChange={(e) => handleInputChange('guidePrice', Number(e.target.value))} className={inputClass} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="bg-white p-8 rounded-2xl border-2 border-stone-200 shadow-sm space-y-8">
              <h3 className="font-extrabold text-xl border-b-2 border-stone-100 pb-4 flex items-center gap-3 text-stone-900"><Search className="text-amber-500 w-6 h-6"/> Configuración Global de SEO</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 bg-stone-50 p-6 rounded-2xl border-2 border-stone-200 shadow-inner">
                  <h4 className="font-extrabold text-lg text-stone-900 flex items-center gap-2">🇨🇴 SEO Español (Home)</h4>
                  <div><label className={labelClass}>Meta Title</label><input value={siteData.metaTitle} onChange={(e) => handleInputChange('metaTitle', e.target.value)} className={inputClass} placeholder="Ej: Cabalgatas en Medellín..." /></div>
                  <div><label className={labelClass}>Meta Description</label><textarea value={siteData.metaDescription} onChange={(e) => handleInputChange('metaDescription', e.target.value)} className={inputClass} rows={3} placeholder="La mejor cabalgata..."/></div>
                  <div><label className={labelClass}>Keywords (Separar por coma)</label><textarea value={siteData.seoKeywords} onChange={(e) => handleInputChange('seoKeywords', e.target.value)} className={inputClass} rows={2} placeholder="cabalgatas, caballos, medellin..."/></div>
                </div>
                <div className="space-y-4 bg-blue-50/50 p-6 rounded-2xl border-2 border-blue-200 shadow-inner">
                  <h4 className="font-extrabold text-lg text-blue-900 flex items-center gap-2">🇺🇸 SEO Inglés (Home)</h4>
                  <div><label className={labelClass}>Meta Title</label><input value={siteData.metaTitleEn} onChange={(e) => handleInputChange('metaTitleEn', e.target.value)} className={inputClass} placeholder="Ex: Horseback Riding Medellin..." /></div>
                  <div><label className={labelClass}>Meta Description</label><textarea value={siteData.metaDescriptionEn} onChange={(e) => handleInputChange('metaDescriptionEn', e.target.value)} className={inputClass} rows={3} placeholder="The best riding..."/></div>
                  <div><label className={labelClass}>Keywords</label><textarea value={siteData.seoKeywordsEn} onChange={(e) => handleInputChange('seoKeywordsEn', e.target.value)} className={inputClass} rows={2} placeholder="horseback riding, tours..."/></div>
                </div>
              </div>

              <div className="pt-4">
                <label className={labelClass}>Imagen de Portada (OG Image)</label>
                <p className="text-sm font-medium text-stone-500 mb-3">Es la miniatura que aparece cuando pegas el link de tu web en WhatsApp o Facebook.</p>
                <input value={siteData.seoOgImage} onChange={(e) => handleInputChange('seoOgImage', e.target.value)} className={inputClass} placeholder="https://tu-imagen.jpg..." />
              </div>

              <div className="pt-4">
                <label className={labelClass}>ID Google Analytics (Tracking)</label>
                <input value={siteData.googleAnalyticsId} onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)} className={`${inputClass} md:w-1/2`} placeholder="G-XXXXXXXXXX" />
              </div>

              <h3 className="font-extrabold text-xl border-b-2 border-stone-100 pb-4 pt-6 flex items-center gap-3 text-stone-900"><TrendingUp className="text-green-500 w-6 h-6"/> Ventas y CRO</h3>
              <div className="flex gap-4 items-center mb-6 bg-stone-50 p-4 rounded-xl border-2 border-stone-200">
                <input type="checkbox" checked={siteData.enableExitIntent} onChange={(e) => handleInputChange('enableExitIntent', e.target.checked)} className="w-6 h-6 accent-green-600 rounded cursor-pointer"/>
                <span className="font-bold text-stone-900 cursor-pointer" onClick={(e) => handleInputChange('enableExitIntent', !siteData.enableExitIntent)}>Activar Pop-up de Intención de Salida (Ofrecer Descuento)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className={labelClass}>Gatillo de Urgencia ES (Cotizador)</label><input value={siteData.urgencyText} onChange={(e) => handleInputChange('urgencyText', e.target.value)} className={inputClass} placeholder="Ej: 🔥 Quedan pocos cupos" /></div>
                <div><label className={`${labelClass} text-blue-800`}>Gatillo de Urgencia EN</label><input value={siteData.urgencyTextEn} onChange={(e) => handleInputChange('urgencyTextEn', e.target.value)} className={inputClass} placeholder="Ex: 🔥 Few spots left" /></div>
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="bg-amber-50 p-5 rounded-2xl border-2 border-amber-200">
                <p className="font-medium text-amber-900"><strong className="font-extrabold">Blog SEO:</strong> Escribe artículos sobre cabalgatas, turismo y recomendaciones. Esto posicionará tu web orgánicamente en Google. Recuerda llenar los campos de SEO de cada entrada.</p>
              </div>
              <button onClick={addBlogPost} className="bg-stone-900 text-white px-6 py-3 rounded-xl font-extrabold flex items-center gap-2 hover:bg-stone-800 shadow-lg"><Plus size={20}/> Escribir Nuevo Artículo</button>
              
              {siteData.blogPosts?.map((post: any) => (
                <div key={post.id} className="bg-white p-8 rounded-2xl border-2 border-stone-200 shadow-sm space-y-6 relative">
                  <button onClick={() => removeBlogPost(post.id)} className="absolute top-6 right-6 text-red-600 bg-red-100 p-3 rounded-xl hover:bg-red-200 transition-colors"><Trash2 size={20}/></button>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-extrabold text-lg text-stone-900 border-b-2 border-stone-100 pb-2">1. Contenido del Post</h4>
                      <div><label className={labelClass}>Título del Artículo (H1)</label><input value={post.title} onChange={(e) => updateBlogPost(post.id, 'title', e.target.value)} className={inputClass} /></div>
                      <div><label className={labelClass}>URL (Slug) Ej: ropa-cabalgata</label><input value={post.slug} onChange={(e) => updateBlogPost(post.id, 'slug', e.target.value)} className={`${inputClass} text-amber-700`} /></div>
                      <div><label className={labelClass}>URL Imagen Principal</label><input value={post.image} onChange={(e) => updateBlogPost(post.id, 'image', e.target.value)} className={inputClass} /></div>
                      <div><label className={labelClass}>Cuerpo del Artículo</label><textarea value={post.content} onChange={(e) => updateBlogPost(post.id, 'content', e.target.value)} className={inputClass} rows={8} /></div>
                    </div>
                    <div className="space-y-4 bg-stone-50 p-6 rounded-2xl border-2 border-stone-200 shadow-inner">
                      <h4 className="font-extrabold text-lg text-stone-900 border-b-2 border-stone-200 pb-2">2. SEO de este Post</h4>
                      <div><label className={labelClass}>Meta Title</label><input value={post.metaTitle} onChange={(e) => updateBlogPost(post.id, 'metaTitle', e.target.value)} className={inputClass} /></div>
                      <div><label className={labelClass}>Meta Description</label><textarea value={post.metaDesc} onChange={(e) => updateBlogPost(post.id, 'metaDesc', e.target.value)} className={inputClass} rows={4} /></div>
                      <div><label className={labelClass}>Keywords Específicas</label><textarea value={post.keywords} onChange={(e) => updateBlogPost(post.id, 'keywords', e.target.value)} className={inputClass} rows={3} /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ubicacion' && (
            <div className="bg-white rounded-2xl p-8 border-2 border-stone-200 shadow-sm space-y-8">
              <h2 className="text-xl font-extrabold flex items-center gap-3 border-b-2 border-stone-100 pb-4 text-stone-900"><BadgeCheck className="text-blue-500 w-6 h-6"/> Negocio Verificado & Maps</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div><label className={labelClass}>Nombre Negocio</label><input value={siteData.businessName} onChange={(e) => handleInputChange('businessName', e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Rating (Ej: 4.9)</label><input type="number" step="0.1" value={siteData.googleRating} onChange={(e) => handleInputChange('googleRating', Number(e.target.value))} className={`${inputClass} text-amber-600 font-extrabold`} /></div>
                <div><label className={labelClass}>N° Reseñas (Ej: 150)</label><input type="number" value={siteData.googleReviewCount} onChange={(e) => handleInputChange('googleReviewCount', Number(e.target.value))} className={inputClass} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className={labelClass}>Dirección ES</label><input value={siteData.mapAddress} onChange={(e) => handleInputChange('mapAddress', e.target.value)} className={inputClass} /></div>
                <div><label className={`${labelClass} text-blue-800`}>Dirección EN</label><input value={siteData.mapAddressEn} onChange={(e) => handleInputChange('mapAddressEn', e.target.value)} className={inputClass} /></div>
              </div>
              <div>
                <label className={labelClass}>Link de Compartir Google Maps</label>
                <input value={siteData.mapEmbedUrl} onChange={(e) => handleInputChange('mapEmbedUrl', e.target.value)} className={`${inputClass} font-mono`} placeholder="https://maps.app.goo.gl/..." />
              </div>
            </div>
          )}

          {activeTab === 'multimedia' && (
            <div className="bg-white rounded-2xl p-8 border-2 border-stone-200 shadow-sm space-y-8">
              <div className="bg-stone-50 p-6 rounded-2xl border-2 border-dashed border-stone-300">
                <label className="font-extrabold block mb-4 text-xl text-stone-900">Subir nueva imagen a Librería</label>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} className="w-full p-4 border-2 border-stone-300 rounded-xl bg-white cursor-pointer mb-4 font-bold text-stone-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-stone-900 file:text-white hover:file:bg-stone-700 transition-all" />
                {previewImage && <button onClick={processAndUploadImage} className="w-full bg-amber-500 text-stone-900 py-4 rounded-xl font-extrabold text-lg disabled:opacity-50 hover:bg-amber-600 shadow-lg"><ImagePlus className="inline mr-2 w-6 h-6"/> {isUploading ? 'Subiendo...' : 'Subir a Librería'}</button>}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t-2 border-stone-100 pt-8">
                {siteData.mediaLibrary?.map((media: any) => (
                  <div key={media.id} className="border-2 border-stone-200 rounded-2xl p-3 bg-white shadow-sm hover:border-amber-400 transition-colors">
                    <img src={media.url} className="w-full h-32 object-cover rounded-xl mb-3 border border-stone-100" alt={media.title} />
                    <p className="text-sm font-extrabold truncate mb-3 px-1 text-stone-900 text-center">{media.title || 'Sin nombre'}</p>
                    <div className="flex gap-2">
                      <button onClick={() => editMediaMetadata(media.id, media.title)} className="flex-1 bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition-colors"><Edit3 size={18} className="mx-auto"/></button>
                      <button onClick={() => { setSiteData((prev: any) => ({...prev, mediaLibrary: prev.mediaLibrary.filter((m:any) => m.id !== media.id) })) }} className="flex-1 bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200 transition-colors"><Trash2 size={18} className="mx-auto"/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-6">
              <button onClick={() => setShowPicker('hero')} className="bg-stone-900 text-white px-6 py-4 rounded-xl font-extrabold flex items-center gap-2 hover:bg-stone-800 shadow-lg text-lg"><Plus size={24}/> Seleccionar foto para Banner</button>
              {siteData.heroMedia?.map((h: any) => (
                <div key={h.id} className="bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm flex flex-col md:flex-row gap-8 relative">
                  <button onClick={() => removeHeroMedia(h.id)} className="absolute top-6 right-6 text-red-600 bg-red-100 p-3 rounded-xl hover:bg-red-200"><Trash2 size={20}/></button>
                  <div className="w-full md:w-1/3"><img src={h.url} className="w-full h-48 object-cover rounded-xl border-2 border-stone-200 shadow-inner" alt="Hero" /></div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3"><label className={labelClass}>🇨🇴 Título Español</label><input value={h.title} onChange={(e) => updateHeroMedia(h.id, 'title', e.target.value)} className={inputClass} /><label className={labelClass}>🇨🇴 Subtítulo Español</label><textarea value={h.subtitle} onChange={(e) => updateHeroMedia(h.id, 'subtitle', e.target.value)} className={inputClass} rows={3}/></div>
                    <div className="space-y-3 bg-blue-50/50 p-4 rounded-2xl border-2 border-blue-100"><label className={`${labelClass} text-blue-900`}>🇺🇸 Título Inglés</label><input value={h.titleEn} onChange={(e) => updateHeroMedia(h.id, 'titleEn', e.target.value)} className={inputClass} /><label className={`${labelClass} text-blue-900`}>🇺🇸 Subtítulo Inglés</label><textarea value={h.subtitleEn} onChange={(e) => updateHeroMedia(h.id, 'subtitleEn', e.target.value)} className={inputClass} rows={3}/></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'galeria' && (
            <div className="space-y-6">
              <button onClick={() => setShowPicker('galeria')} className="bg-stone-900 text-white px-6 py-4 rounded-xl font-extrabold flex items-center gap-2 hover:bg-stone-800 shadow-lg text-lg"><Plus size={24}/> Seleccionar foto para Galería</button>
              {siteData.gallery?.map((g: any, idx: number) => (
                <div key={g.id} className="bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm flex flex-col md:flex-row gap-8 relative">
                  <div className="absolute top-6 right-20 flex gap-2">
                    <button onClick={() => moveGalleryItem(idx, -1)} className="bg-stone-100 p-3 rounded-xl hover:bg-stone-200 text-stone-900 border border-stone-300"><ArrowUp size={20}/></button>
                    <button onClick={() => moveGalleryItem(idx, 1)} className="bg-stone-100 p-3 rounded-xl hover:bg-stone-200 text-stone-900 border border-stone-300"><ArrowDown size={20}/></button>
                  </div>
                  <button onClick={() => removeGalleryItem(g.id)} className="absolute top-6 right-6 text-red-600 bg-red-100 p-3 rounded-xl hover:bg-red-200"><Trash2 size={20}/></button>
                  <div className="w-full md:w-1/3">
                    <p className="font-extrabold text-amber-600 mb-3 bg-amber-50 inline-block px-4 py-1 rounded-full border border-amber-200">Posición #{idx + 1}</p>
                    <img src={g.url} className="w-full h-48 object-cover rounded-xl border-2 border-stone-200 shadow-inner" alt="Galeria" />
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3"><label className={labelClass}>🇨🇴 Título ES</label><input value={g.title} onChange={(e) => updateGalleryItem(g.id, 'title', e.target.value)} className={inputClass} /><label className={labelClass}>🇨🇴 Descripción ES</label><textarea value={g.desc} onChange={(e) => updateGalleryItem(g.id, 'desc', e.target.value)} className={inputClass} rows={3}/></div>
                    <div className="space-y-3 bg-blue-50/50 p-4 rounded-2xl border-2 border-blue-100"><label className={`${labelClass} text-blue-900`}>🇺🇸 Título EN</label><input value={g.titleEn} onChange={(e) => updateGalleryItem(g.id, 'titleEn', e.target.value)} className={inputClass} /><label className={`${labelClass} text-blue-900`}>🇺🇸 Descripción EN</label><textarea value={g.descEn} onChange={(e) => updateGalleryItem(g.id, 'descEn', e.target.value)} className={inputClass} rows={3}/></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'caballos' && (
            <div className="space-y-6">
              <button onClick={addHorse} className="bg-stone-900 text-white px-6 py-3 rounded-xl font-extrabold flex items-center gap-2 hover:bg-stone-800 shadow-lg text-lg"><Plus size={20}/> Nuevo Caballo</button>
              {siteData.horses?.map((horse: any) => (
                <div key={horse.id} className="bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                  <img src={horse.photo || 'https://via.placeholder.com/150'} className="w-32 h-32 object-cover rounded-2xl border-2 border-stone-200 shadow-inner" alt="Caballo" />
                  <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label className={labelClass}>Nombre</label><input type="text" value={horse.name} onChange={(e) => updateHorse(horse.id, 'name', e.target.value)} className={inputClass} placeholder="Nombre" /></div>
                    <div><label className={labelClass}>URL de la Foto</label><input type="text" value={horse.photo} onChange={(e) => updateHorse(horse.id, 'photo', e.target.value)} className={inputClass} placeholder="https://..." /></div>
                    <div><label className={labelClass}>Tipo / Temperamento</label><select value={horse.type} onChange={(e) => updateHorse(horse.id, 'type', e.target.value)} className={inputClass}><option>Manso</option><option>Brioso</option></select></div>
                  </div>
                  <button onClick={() => removeHorse(horse.id)} className="text-red-600 p-4 bg-red-100 rounded-xl hover:bg-red-200"><Trash2 size={24}/></button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <button onClick={addReview} className="bg-stone-900 text-white px-6 py-3 rounded-xl font-extrabold flex items-center gap-2 hover:bg-stone-800 shadow-lg text-lg"><Plus size={20}/> Añadir Reseña Manual</button>
              {siteData.reviews?.map((review: any) => (
                <div key={review.id} className="bg-white p-8 rounded-2xl border-2 border-stone-200 shadow-sm space-y-6 relative">
                  <button onClick={() => removeReview(review.id)} className="absolute top-6 right-6 text-red-600 bg-red-100 p-3 rounded-xl hover:bg-red-200"><Trash2 size={20}/></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pr-16">
                    <div><label className={labelClass}>Nombre del Cliente</label><input type="text" value={review.author} onChange={(e) => updateReview(review.id, 'author', e.target.value)} className={inputClass} /></div>
                    <div><label className={labelClass}>Estrellas (1-5)</label><select value={review.rating} onChange={(e) => updateReview(review.id, 'rating', Number(e.target.value))} className={`${inputClass} text-amber-600 font-extrabold`}><option value={5}>⭐⭐⭐⭐⭐ (5)</option><option value={4}>⭐⭐⭐⭐ (4)</option></select></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div><label className={labelClass}>🇨🇴 Reseña en Español</label><textarea value={review.text} onChange={(e) => updateReview(review.id, 'text', e.target.value)} className={inputClass} rows={4} /></div>
                    <div className="bg-blue-50/50 p-4 rounded-2xl border-2 border-blue-100"><label className={`${labelClass} text-blue-900`}>🇺🇸 Reseña en Inglés</label><textarea value={review.textEn} onChange={(e) => updateReview(review.id, 'textEn', e.target.value)} className={inputClass} rows={4} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6">
              <button onClick={addFaq} className="bg-stone-900 text-white px-6 py-3 rounded-xl font-extrabold flex items-center gap-2 hover:bg-stone-800 shadow-lg text-lg"><Plus size={20}/> Añadir Pregunta Frecuente</button>
              {siteData.faqs?.map((faq: any) => (
                <div key={faq.id} className="bg-white p-8 rounded-2xl border-2 border-stone-200 shadow-sm relative">
                  <button onClick={() => removeFaq(faq.id)} className="absolute top-6 right-6 text-red-600 bg-red-100 p-3 rounded-xl hover:bg-red-200"><Trash2 size={20}/></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pr-16">
                    <div className="space-y-4"><label className={`${labelClass} text-lg`}>🇨🇴 Pregunta & Respuesta (ES)</label><input type="text" value={faq.q} onChange={(e) => updateFaq(faq.id, 'q', e.target.value)} className={inputClass} placeholder="¿Qué ropa debo llevar?" /><textarea value={faq.a} onChange={(e) => updateFaq(faq.id, 'a', e.target.value)} className={inputClass} rows={4} placeholder="Respuesta..." /></div>
                    <div className="space-y-4 bg-blue-50/50 p-4 rounded-2xl border-2 border-blue-100"><label className={`${labelClass} text-blue-900 text-lg`}>🇺🇸 Question & Answer (EN)</label><input type="text" value={faq.qEn} onChange={(e) => updateFaq(faq.id, 'qEn', e.target.value)} className={inputClass} placeholder="What should I wear?" /><textarea value={faq.aEn} onChange={(e) => updateFaq(faq.id, 'aEn', e.target.value)} className={inputClass} rows={4} placeholder="Answer..." /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'general' && (
            <div className="bg-white rounded-2xl p-8 border-2 border-stone-200 shadow-sm space-y-10">
              <div>
                <label className="font-extrabold block mb-2 text-xl text-stone-900">Número de WhatsApp Principal del Negocio</label>
                <input type="text" value={siteData.whatsappNumber} onChange={(e) => handleInputChange('whatsappNumber', e.target.value)} className={`${inputClass} md:w-1/2 text-2xl font-mono text-green-700`} placeholder="573000000000" />
              </div>
              
              <div className="space-y-6 bg-stone-50 p-6 rounded-2xl border-2 border-stone-200 shadow-inner">
                <h3 className="font-extrabold text-xl border-b-2 border-stone-200 pb-4 text-stone-900 flex items-center gap-2"><LayoutDashboard className="w-6 h-6 text-stone-600"/> Menú de Navegación Inferior (Barra Móvil)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  <div className="space-y-4 bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm">
                    <h4 className="font-extrabold text-stone-900">Botón 1 (Extrema Izquierda)</h4>
                    <div className="flex gap-4">
                      <div className="flex-1"><label className="text-xs font-bold text-stone-500 uppercase mb-1 block">🇨🇴 Español</label><input type="text" value={siteData.navLabel1} onChange={(e) => handleInputChange('navLabel1', e.target.value)} className={inputClass} placeholder="Inicio" /></div>
                      <div className="flex-1"><label className="text-xs font-bold text-blue-500 uppercase mb-1 block">🇺🇸 Inglés</label><input type="text" value={siteData.navLabel1En} onChange={(e) => handleInputChange('navLabel1En', e.target.value)} className={inputClass} placeholder="Home" /></div>
                    </div>
                    <div><label className="text-xs font-bold text-amber-600 uppercase mb-1 block">Enlace (ID de Sección)</label><input type="text" value={siteData.navLink1} onChange={(e) => handleInputChange('navLink1', e.target.value)} className={`${inputClass} font-mono`} placeholder="#inicio" /></div>
                  </div>

                  <div className="space-y-4 bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm">
                    <h4 className="font-extrabold text-stone-900">Botón 2 (Centro Izquierda)</h4>
                    <div className="flex gap-4">
                      <div className="flex-1"><label className="text-xs font-bold text-stone-500 uppercase mb-1 block">🇨🇴 Español</label><input type="text" value={siteData.navLabel2} onChange={(e) => handleInputChange('navLabel2', e.target.value)} className={inputClass} placeholder="Cotizar" /></div>
                      <div className="flex-1"><label className="text-xs font-bold text-blue-500 uppercase mb-1 block">🇺🇸 Inglés</label><input type="text" value={siteData.navLabel2En} onChange={(e) => handleInputChange('navLabel2En', e.target.value)} className={inputClass} placeholder="Quote" /></div>
                    </div>
                    <div><label className="text-xs font-bold text-amber-600 uppercase mb-1 block">Enlace (ID de Sección)</label><input type="text" value={siteData.navLink2} onChange={(e) => handleInputChange('navLink2', e.target.value)} className={`${inputClass} font-mono`} placeholder="#cotizador" /></div>
                  </div>

                  <div className="space-y-4 bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm">
                    <h4 className="font-extrabold text-stone-900">Botón 3 (Centro Derecha)</h4>
                    <div className="flex gap-4">
                      <div className="flex-1"><label className="text-xs font-bold text-stone-500 uppercase mb-1 block">🇨🇴 Español</label><input type="text" value={siteData.navLabel3} onChange={(e) => handleInputChange('navLabel3', e.target.value)} className={inputClass} placeholder="Galería" /></div>
                      <div className="flex-1"><label className="text-xs font-bold text-blue-500 uppercase mb-1 block">🇺🇸 Inglés</label><input type="text" value={siteData.navLabel3En} onChange={(e) => handleInputChange('navLabel3En', e.target.value)} className={inputClass} placeholder="Gallery" /></div>
                    </div>
                    <div><label className="text-xs font-bold text-amber-600 uppercase mb-1 block">Enlace (ID de Sección)</label><input type="text" value={siteData.navLink3} onChange={(e) => handleInputChange('navLink3', e.target.value)} className={`${inputClass} font-mono`} placeholder="#galeria" /></div>
                  </div>

                  <div className="space-y-4 bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm">
                    <h4 className="font-extrabold text-stone-900">Botón 4 (Extrema Derecha)</h4>
                    <div className="flex gap-4">
                      <div className="flex-1"><label className="text-xs font-bold text-stone-500 uppercase mb-1 block">🇨🇴 Español</label><input type="text" value={siteData.navLabel4} onChange={(e) => handleInputChange('navLabel4', e.target.value)} className={inputClass} placeholder="FAQ" /></div>
                      <div className="flex-1"><label className="text-xs font-bold text-blue-500 uppercase mb-1 block">🇺🇸 Inglés</label><input type="text" value={siteData.navLabel4En} onChange={(e) => handleInputChange('navLabel4En', e.target.value)} className={inputClass} placeholder="FAQ" /></div>
                    </div>
                    <div><label className="text-xs font-bold text-amber-600 uppercase mb-1 block">Enlace (ID de Sección)</label><input type="text" value={siteData.navLink4} onChange={(e) => handleInputChange('navLink4', e.target.value)} className={`${inputClass} font-mono`} placeholder="#faq" /></div>
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