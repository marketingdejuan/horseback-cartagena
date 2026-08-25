"use client";
import React, { useState, useEffect } from 'react';
import { Settings, Users, Lock, Plus, Trash2, Save, LayoutDashboard, MessageSquare, DollarSign, ImagePlus, Star, Camera, BookOpen, Calendar, AlertCircle, LogOut, Zap, MapPin, UploadCloud } from 'lucide-react';
import { db, storage } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('blog'); 
  const [isSaving, setIsSaving] = useState(false);
  const [mensajeGuardado, setMensajeGuardado] = useState('');
  const [reservas, setReservas] = useState<any[]>([]);
  const [uploadingPostId, setUploadingPostId] = useState<number | null>(null);

  const [siteData, setSiteData] = useState<any>({
    heroTitle: 'Cabalgatas en Caldas', heroTitleEn: 'Horseback Riding',
    heroSubtitle: 'Conectando jinetes...', heroSubtitleEn: 'Connecting riders...',
    whatsappNumber: '573000000000',
    navLabel1: 'Inicio', navLabel1En: 'Home', navLink1: '#inicio',
    navLabel2: 'Cotizar', navLabel2En: 'Quote', navLink2: '#cotizador',
    navLabel3: 'Galería', navLabel3En: 'Gallery', navLink3: '#galeria',
    navLabel4: 'FAQ', navLabel4En: 'FAQ', navLink4: '#faq',
    basePrice: 100000, guidePrice: 80000, depositPercent: 50, promoActive: true,
    urgencyText: '🔥 Quedan pocos cupos', urgencyTextEn: '🔥 Few spots left', enableExitIntent: true,
    businessName: 'Cabalgatas Ecológicas Medellín',
    mapAddress: 'Caldas, Antioquia', mapAddressEn: 'Caldas, Antioquia',
    googleRating: 5.0, googleReviewCount: 150, mapEmbedUrl: '',
    blogPosts: []
  });

  const auth = getAuth(db.app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoginError(false);
    try { await signInWithEmailAndPassword(auth, email, password); } 
    catch (error) { setLoginError(true); }
  };

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const docSnap = await getDoc(doc(db, "configuracion", "general"));
        if (docSnap.exists()) setSiteData((prev: any) => ({ ...prev, ...docSnap.data() }));
      };
      fetchData();

      const q = query(collection(db, 'reservas'), orderBy('fechaCreacion', 'desc'));
      const desuscribir = onSnapshot(q, (snapshot) => {
        setReservas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => desuscribir();
    }
  }, [user]);

  const saveConfig = async () => {
    setIsSaving(true); setMensajeGuardado('');
    try {
      await setDoc(doc(db, "configuracion", "general"), siteData);
      setMensajeGuardado('✅ ¡Cambios Guardados!');
    } catch (error) { setMensajeGuardado('❌ Error al guardar.'); }
    setIsSaving(false); setTimeout(() => setMensajeGuardado(''), 4000);
  };

  const handleInputChange = (field: string, value: any) => setSiteData((prev: any) => ({ ...prev, [field]: value }));

  // ==========================================
  // LÓGICA CRM KANBAN
  // ==========================================
  const updateEstadoReserva = async (id: string, nuevoEstado: string) => {
    try { await setDoc(doc(db, 'reservas', id), { estado: nuevoEstado }, { merge: true }); } 
    catch(e) { console.error(e) }
  };
  const handleDragStart = (e: React.DragEvent, id: string) => e.dataTransfer.setData('reservaId', id);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent, nuevoEstado: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('reservaId');
    if (id) updateEstadoReserva(id, nuevoEstado);
  };

  const generarEnlaceWhatsApp = (reserva: any, estado: string) => {
    const { fecha, hora, jinetes, total, telefono } = reserva;
    let mensaje = "";
    switch (estado) {
      case 'Nueva': mensaje = `¡Hola! Recibimos tu cotización para una cabalgata el ${fecha} a las ${hora} para ${jinetes} jinetes. Valor estimado: $${total?.toLocaleString()}. ¿Tienes alguna duda? 🐎`; break;
      case 'Contactado': mensaje = `¡Hola! Te escribo de Cabalgatas Medellín. Quería hacerte un breve seguimiento sobre tu reserva para el ${fecha}. ✨`; break;
      case 'Abonado': mensaje = `¡Hola! Confirmamos tu abono. 🎉 Tu reserva para el ${fecha} a las ${hora} está 100% confirmada. Recuerda llegar 15 min antes con pantalón largo. 🤠`; break;
      case 'Finalizada': mensaje = `¡Hola! Esperamos que hayas disfrutado la experiencia. 🐴 ¿Nos regalarías 5 estrellas en Google? ⭐⭐⭐⭐⭐`; break;
      default: mensaje = `¡Hola! Te escribo de Cabalgatas Medellín. 🐎`;
    }
    return `https://wa.me/${telefono?.replace(/\D/g, '') || ""}?text=${encodeURIComponent(mensaje)}`;
  };

  const columnasCRM = ['Nueva', 'Contactado', 'Abonado', 'Finalizada'];
  const coloresColumnas: any = { 'Nueva': 'border-red-500', 'Contactado': 'border-amber-500', 'Abonado': 'border-blue-500', 'Finalizada': 'border-green-500' };

  // ==========================================
  // LÓGICA BLOG Y SUBIDA DE IMÁGENES
  // ==========================================
  const removeBlogPost = (id: number) => setSiteData((prev: any) => ({ ...prev, blogPosts: prev.blogPosts.filter((p: any) => p.id !== id) }));
  const updateBlogPost = (id: number, field: string, value: string) => setSiteData((prev: any) => ({ ...prev, blogPosts: prev.blogPosts.map((p: any) => p.id === id ? { ...p, [field]: value } : p) }));
  const addBlogPost = () => setSiteData((prev: any) => ({ ...prev, blogPosts: [{ id: Date.now(), title: 'Nuevo Artículo', slug: `nuevo-articulo-${Date.now()}`, image: '', content: '', metaTitle: '', metaDesc: '', keywords: '' }, ...(prev.blogPosts || [])] }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, postId: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPostId(postId);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Str = reader.result as string;
        const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
        await uploadString(storageRef, base64Str, 'data_url');
        const downloadURL = await getDownloadURL(storageRef);
        updateBlogPost(postId, 'image', downloadURL);
        setUploadingPostId(null);
      };
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("Hubo un error subiendo la imagen. Intenta de nuevo.");
      setUploadingPostId(null);
    }
  };

  const inputClass = "w-full p-3 border-2 border-stone-300 rounded-lg mt-1 text-stone-900 bg-white font-medium focus:border-amber-500 focus:outline-none placeholder-stone-400";
  const labelClass = "block text-sm font-extrabold text-stone-900 mb-1";

  if (authLoading) return <div className="min-h-screen bg-stone-100 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900"></div></div>;

  if (!user) return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border-2 border-stone-200">
        <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"><Lock className="w-10 h-10 text-amber-500"/></div>
        <h1 className="text-2xl font-black mb-2 text-stone-900">Acceso Seguro</h1>
        <p className="text-stone-500 font-medium mb-8">Ingresa tus credenciales para administrar la web.</p>
        <div className="space-y-4 text-left">
          <div><label className={labelClass}>Correo Electrónico</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required /></div>
          <div><label className={labelClass}>Contraseña</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} required /></div>
        </div>
        {loginError && <div className="bg-red-50 text-red-600 font-bold p-3 rounded-lg mt-6 border border-red-200 flex items-center gap-2 justify-center"><AlertCircle size={18}/> Credenciales incorrectas</div>}
        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900 mt-8 py-4 rounded-xl font-extrabold text-lg shadow-lg">Ingresar al Panel</button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col shadow-2xl z-10 relative">
        <div className="p-6 border-b border-stone-800">
          <h2 className="text-2xl font-extrabold text-white mb-2">Panel Admin</h2>
          <p className="text-xs text-stone-500 font-mono truncate">{user.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'reservas', icon: Calendar, label: 'Reservas CRM' },
            { id: 'blog', icon: BookOpen, label: 'Blog & SEO' },
            { id: 'comercial', icon: DollarSign, label: 'Precios y Ventas' },
            { id: 'general', icon: Settings, label: 'Ajustes Generales' }
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-colors ${activeTab === item.id ? 'bg-amber-500 text-stone-900 shadow-lg' : 'hover:bg-stone-800 text-stone-300 hover:text-white'}`}>
              <item.icon className="w-5 h-5" /> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-stone-800 bg-stone-900 pb-safe">
          <button onClick={() => signOut(auth)} className="w-full flex items-center justify-center gap-2 bg-stone-800 hover:bg-red-500 hover:text-white text-stone-400 font-bold py-3 rounded-xl transition-colors">
            <LogOut size={18}/> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-32 bg-stone-100">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-stone-200 sticky top-0 z-20">
            <h1 className="text-2xl font-extrabold capitalize text-stone-900">Módulo: {activeTab}</h1>
            <div className="flex items-center gap-4">
              {mensajeGuardado && <span className="text-green-700 font-extrabold bg-green-100 px-4 py-2 rounded-full border border-green-200">{mensajeGuardado}</span>}
              <button onClick={saveConfig} className="bg-green-600 text-white px-8 py-3 rounded-xl font-extrabold flex items-center gap-2 hover:bg-green-700 shadow-lg transition-transform hover:scale-105">
                <Save size={20}/> {isSaving ? 'Guardando...' : 'Publicar Cambios'}
              </button>
            </div>
          </div>

          {activeTab === 'reservas' && (
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory min-h-[70vh]">
              {columnasCRM.map(col => (
                 <div key={col} onDrop={(e) => handleDrop(e, col)} onDragOver={handleDragOver} className="min-w-[320px] snap-center bg-stone-200/60 rounded-3xl p-5 flex flex-col gap-4 border-2 border-stone-200">
                   <div className="flex justify-between items-center mb-2">
                     <h3 className="font-black text-stone-800 text-lg">{col}</h3>
                     <span className="bg-white text-stone-600 font-bold px-3 py-1 rounded-full text-sm shadow-sm">{reservas.filter(r => (r.estado || 'Nueva') === col).length}</span>
                   </div>
                   {reservas.filter(r => (r.estado || 'Nueva') === col).map(reserva => (
                     <div key={reserva.id} draggable onDragStart={(e) => handleDragStart(e, reserva.id)} className={`bg-white p-5 rounded-2xl shadow-sm cursor-grab active:cursor-grabbing border-l-8 ${coloresColumnas[col]} hover:shadow-xl transition-all`}>
                        <div className="flex justify-between items-start mb-3">
                          <span className="bg-stone-100 text-stone-600 text-xs font-bold px-3 py-1 rounded-full border">{reserva.origen || 'Web'}</span>
                          <a href={generarEnlaceWhatsApp(reserva, col)} target="_blank" rel="noreferrer" className="text-green-500 hover:text-green-600 bg-green-50 p-2 rounded-full transition-transform hover:scale-110 flex items-center gap-1 group">
                            <MessageSquare size={18}/>
                          </a>
                        </div>
                        <p className="font-black text-stone-900 text-xl leading-tight mb-2">{reserva.plan}</p>
                        <p className="text-sm text-stone-600 font-medium flex items-center gap-2 mb-1"><Calendar size={16} className="text-stone-400"/> {reserva.fecha} a las {reserva.hora}</p>
                        <p className="text-sm text-stone-600 font-medium flex items-center gap-2"><Users size={16} className="text-stone-400"/> {reserva.jinetes} Jinetes</p>
                        <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center">
                           <span className="text-xs text-stone-400 font-bold">{reserva.fechaCreacion ? new Date(reserva.fechaCreacion.seconds * 1000).toLocaleDateString() : 'Reciente'}</span>
                           <span className="text-green-600 font-black text-lg">${reserva.total?.toLocaleString()}</span>
                        </div>
                     </div>
                   ))}
                 </div>
              ))}
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-6">
              <button onClick={addBlogPost} className="bg-stone-900 text-white px-6 py-3 rounded-xl font-extrabold flex items-center gap-2 hover:bg-stone-800 shadow-lg"><Plus size={20}/> Crear Nuevo Artículo</button>
              
              {siteData.blogPosts?.map((post: any) => (
                <div key={post.id} className="bg-white p-8 rounded-2xl border-2 border-stone-200 shadow-sm space-y-6 relative">
                  <button onClick={() => removeBlogPost(post.id)} className="absolute top-6 right-6 text-red-600 bg-red-100 p-3 rounded-xl hover:bg-red-200 transition-colors"><Trash2 size={20}/></button>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-extrabold text-lg text-stone-900 border-b-2 border-stone-100 pb-2">Contenido Visual</h4>
                      
                      {/* PREVISUALIZACIÓN Y SUBIDA DE IMAGEN */}
                      <div>
                        <label className={labelClass}>Foto del Artículo</label>
                        {post.image && <img src={post.image} alt="Preview" className="w-full h-40 object-cover rounded-xl border border-stone-200 mb-2 shadow-sm" />}
                        <div className="flex gap-2">
                          <input value={post.image} onChange={(e) => updateBlogPost(post.id, 'image', e.target.value)} className={inputClass} placeholder="Pega una URL o sube una foto" />
                          <label className="bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 py-3 rounded-lg mt-1 cursor-pointer flex items-center justify-center font-bold transition-colors border border-amber-300">
                            {uploadingPostId === post.id ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-700"></div> : <UploadCloud size={20} />}
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, post.id)} />
                          </label>
                        </div>
                      </div>

                      <div><label className={labelClass}>Título (H1)</label><input value={post.title} onChange={(e) => updateBlogPost(post.id, 'title', e.target.value)} className={inputClass} /></div>
                      <div><label className={labelClass}>Cuerpo</label><textarea value={post.content} onChange={(e) => updateBlogPost(post.id, 'content', e.target.value)} className={inputClass} rows={8} /></div>
                    </div>
                    <div className="space-y-4 bg-stone-50 p-6 rounded-2xl border-2 border-stone-200 shadow-inner">
                      <h4 className="font-extrabold text-lg text-stone-900 border-b-2 border-stone-200 pb-2">SEO Avanzado</h4>
                      <div><label className={labelClass}>Enlace (Slug)</label><input value={post.slug} onChange={(e) => updateBlogPost(post.id, 'slug', e.target.value)} className={`${inputClass} text-amber-700 font-mono text-sm`} /></div>
                      <div><label className={labelClass}>Meta Title</label><input value={post.metaTitle} onChange={(e) => updateBlogPost(post.id, 'metaTitle', e.target.value)} className={inputClass} /></div>
                      <div><label className={labelClass}>Meta Description</label><textarea value={post.metaDesc} onChange={(e) => updateBlogPost(post.id, 'metaDesc', e.target.value)} className={inputClass} rows={4} /></div>
                      <div><label className={labelClass}>Keywords</label><textarea value={post.keywords} onChange={(e) => updateBlogPost(post.id, 'keywords', e.target.value)} className={inputClass} rows={3} /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'comercial' && (
            <div className="bg-white p-8 rounded-2xl border-2 border-stone-200 shadow-sm space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className={labelClass}>Precio Base (COP)</label><input type="number" value={siteData.basePrice} onChange={(e) => handleInputChange('basePrice', Number(e.target.value))} className={inputClass} /></div>
                <div><label className={labelClass}>Costo Guía Privado (COP)</label><input type="number" value={siteData.guidePrice} onChange={(e) => handleInputChange('guidePrice', Number(e.target.value))} className={inputClass} /></div>
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="bg-white p-8 rounded-2xl border-2 border-stone-200 shadow-sm space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className={labelClass}>WhatsApp Principal</label><input value={siteData.whatsappNumber} onChange={(e) => handleInputChange('whatsappNumber', e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Nombre del Negocio</label><input value={siteData.businessName} onChange={(e) => handleInputChange('businessName', e.target.value)} className={inputClass} /></div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}