"use client";
import React, { useState, useEffect } from 'react';
import { Settings, Image as ImageIcon, Map, Lock, User, LogOut, Plus, Trash2, Save, LayoutDashboard, MessageSquare } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Estructura de datos completa de la web
  const [siteData, setSiteData] = useState({
    heroTitle: 'Descubre Medellín a Caballo',
    heroSubtitle: 'Vive una experiencia inolvidable recorriendo los mejores paisajes.',
    aboutText: 'Somos expertos en turismo ecuestre. Nuestros caballos son dóciles y nuestras rutas te mostrarán la verdadera belleza de la región.',
    whatsappNumber: '573001234567',
    routes: [
      { id: 1, title: 'Ruta Mirador', price: '120.000', duration: '2 horas' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1598048600115-325d36e2ca0e?q=80&w=800'
    ],
    reviews: [
      { id: 1, name: 'Juan Pérez', text: '¡Excelente experiencia! Muy recomendado.', rating: 5 }
    ]
  });

  // Cargar datos de Firebase al entrar
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        const docRef = doc(db, "configuracion", "general");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Combinamos los datos de Firebase con nuestra estructura base por si faltan campos
          setSiteData({ ...siteData, ...docSnap.data() });
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  // Guardar datos en Firebase
  const saveToFirebase = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, "configuracion", "general");
      await setDoc(docRef, siteData);
      alert("¡Todos los cambios guardados exitosamente en la web! 🚀");
    } catch (error) {
      console.error("Error guardando:", error);
      alert("Hubo un error al guardar. Revisa la consola.");
    }
    setIsSaving(false);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // --- Funciones de actualización de estado ---
  const handleInputChange = (field: string, value: string) => setSiteData({ ...siteData, [field]: value });
  
  // Rutas
  const addRoute = () => setSiteData({ ...siteData, routes: [...siteData.routes, { id: Date.now(), title: 'Nueva Ruta', price: '0', duration: '1 hora' }] });
  const updateRoute = (id: number, field: string, value: string) => {
    setSiteData({ ...siteData, routes: siteData.routes.map(r => r.id === id ? { ...r, [field]: value } : r) });
  };
  const removeRoute = (id: number) => setSiteData({ ...siteData, routes: siteData.routes.filter(r => r.id !== id) });

  // Galería
  const addGalleryImage = () => setSiteData({ ...siteData, gallery: [...siteData.gallery, 'URL de la imagen...'] });
  const updateGalleryImage = (index: number, value: string) => {
    const newGallery = [...siteData.gallery];
    newGallery[index] = value;
    setSiteData({ ...siteData, gallery: newGallery });
  };
  const removeGalleryImage = (index: number) => setSiteData({ ...siteData, gallery: siteData.gallery.filter((_, i) => i !== index) });

  // Testimonios
  const addReview = () => setSiteData({ ...siteData, reviews: [...siteData.reviews, { id: Date.now(), name: 'Nombre', text: 'Comentario...', rating: 5 }] });
  const updateReview = (id: number, field: string, value: string) => {
    setSiteData({ ...siteData, reviews: siteData.reviews.map(r => r.id === id ? { ...r, [field]: value } : r) });
  };
  const removeReview = (id: number) => setSiteData({ ...siteData, reviews: siteData.reviews.filter(r => r.id !== id) });


  // --- LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-amber-100 p-3 rounded-full mb-4">
              <Lock className="w-8 h-8 text-amber-700" />
            </div>
            <h1 className="text-2xl font-bold text-stone-800">Admin Cabalgatas</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="Contraseña"
            />
            {loginError && <p className="text-red-500 text-sm">Contraseña incorrecta.</p>}
            <button type="submit" className="w-full bg-stone-900 text-white p-3 rounded-lg font-medium hover:bg-stone-800">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- PANEL ---
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Menú Lateral */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-stone-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-amber-500" /> Cabalgatas
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'general', icon: Settings, label: 'General' },
            { id: 'routes', icon: Map, label: 'Rutas' },
            { id: 'gallery', icon: ImageIcon, label: 'Galería' },
            { id: 'reviews', icon: MessageSquare, label: 'Testimonios' },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-amber-600 text-white' : 'hover:bg-stone-800'}`}>
              <item.icon className="w-5 h-5" /> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold text-stone-800 capitalize">Gestión: {activeTab}</h1>
            <button onClick={saveToFirebase} disabled={isSaving} className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-bold shadow-md">
              <Save className="w-5 h-5" /> {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>

          {activeTab === 'general' && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <label className="font-bold text-stone-700">Título Principal</label>
                <input type="text" value={siteData.heroTitle} onChange={(e) => handleInputChange('heroTitle', e.target.value)} className="w-full p-3 border rounded-lg mt-1" />
              </div>
              <div>
                <label className="font-bold text-stone-700">Subtítulo</label>
                <textarea value={siteData.heroSubtitle} onChange={(e) => handleInputChange('heroSubtitle', e.target.value)} className="w-full p-3 border rounded-lg mt-1" rows={2} />
              </div>
              <div>
                <label className="font-bold text-stone-700">Texto "Sobre Nosotros"</label>
                <textarea value={siteData.aboutText} onChange={(e) => handleInputChange('aboutText', e.target.value)} className="w-full p-3 border rounded-lg mt-1" rows={4} />
              </div>
              <div>
                <label className="font-bold text-stone-700">Número de WhatsApp (ej. 57300...)</label>
                <input type="text" value={siteData.whatsappNumber} onChange={(e) => handleInputChange('whatsappNumber', e.target.value)} className="w-full p-3 border rounded-lg mt-1" />
              </div>
            </div>
          )}

          {activeTab === 'routes' && (
            <div className="space-y-4">
              <button onClick={addRoute} className="bg-stone-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4"/> Agregar Ruta</button>
              {siteData.routes.map((route) => (
                <div key={route.id} className="bg-white p-4 rounded-xl shadow-sm border flex gap-4 items-center">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input type="text" value={route.title} onChange={(e) => updateRoute(route.id, 'title', e.target.value)} className="p-2 border rounded" placeholder="Nombre" />
                    <input type="text" value={route.price} onChange={(e) => updateRoute(route.id, 'price', e.target.value)} className="p-2 border rounded" placeholder="Precio" />
                    <input type="text" value={route.duration} onChange={(e) => updateRoute(route.id, 'duration', e.target.value)} className="p-2 border rounded" placeholder="Duración" />
                  </div>
                  <button onClick={() => removeRoute(route.id)} className="text-red-500 p-2"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-4">
               <button onClick={addGalleryImage} className="bg-stone-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4"/> Agregar Imagen (URL)</button>
               {siteData.gallery.map((url, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border flex gap-4 items-center">
                  <img src={url} alt="preview" className="w-16 h-16 object-cover rounded-lg bg-stone-100" />
                  <input type="text" value={url} onChange={(e) => updateGalleryImage(index, e.target.value)} className="flex-1 p-2 border rounded" placeholder="https://..." />
                  <button onClick={() => removeGalleryImage(index)} className="text-red-500 p-2"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <button onClick={addReview} className="bg-stone-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4"/> Agregar Testimonio</button>
              {siteData.reviews.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded-xl shadow-sm border flex flex-col gap-2">
                   <div className="flex justify-between items-center">
                      <input type="text" value={review.name} onChange={(e) => updateReview(review.id, 'name', e.target.value)} className="p-2 border rounded w-1/2" placeholder="Nombre del cliente" />
                      <button onClick={() => removeReview(review.id)} className="text-red-500"><Trash2 className="w-5 h-5"/></button>
                   </div>
                   <textarea value={review.text} onChange={(e) => updateReview(review.id, 'text', e.target.value)} className="w-full p-2 border rounded" placeholder="Comentario..." rows={2} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}