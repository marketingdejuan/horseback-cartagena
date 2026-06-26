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

  // Estructura de datos por defecto para evitar errores si Firestore está vacío
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

  // Cargar datos de Firebase al autenticarse
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const docRef = doc(db, "configuracion", "general");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setSiteData({
              heroTitle: data.heroTitle || '',
              heroSubtitle: data.heroSubtitle || '',
              aboutText: data.aboutText || '',
              whatsappNumber: data.whatsappNumber || '',
              routes: data.routes || [],
              gallery: data.gallery || [],
              reviews: data.reviews || []
            });
          }
        } catch (error) {
          console.error("Error cargando configuración:", error);
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

  // Manejadores de cambios
  const handleInputChange = (field: string, value: string) => {
    setSiteData(prev => ({ ...prev, [field]: value }));
  };
  
  // Rutas
  const addRoute = () => {
    setSiteData(prev => ({
      ...prev,
      routes: [...prev.routes, { id: Date.now(), title: 'Nueva Ruta', price: '0', duration: '1 hora' }]
    }));
  };

  const updateRoute = (id: number, field: string, value: string) => {
    setSiteData(prev => ({
      ...prev,
      routes: prev.routes.map(r => r.id === id ? { ...r, [field]: value } : r)
    }));
  };

  const removeRoute = (id: number) => {
    setSiteData(prev => ({
      ...prev,
      routes: prev.routes.filter(r => r.id !== id)
    }));
  };

  // Galería
  const addGalleryImage = () => {
    setSiteData(prev => ({
      ...prev,
      gallery: [...prev.gallery, '']
    }));
  };

  const updateGalleryImage = (index: number, value: string) => {
    setSiteData(prev => {
      const newGallery = [...prev.gallery];
      newGallery[index] = value;
      return { ...prev, gallery: newGallery };
    });
  };

  const removeGalleryImage = (index: number) => {
    setSiteData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  // Testimonios
  const addReview = () => {
    setSiteData(prev => ({
      ...prev,
      reviews: [...prev.reviews, { id: Date.now(), name: 'Nombre', text: 'Comentario...', rating: 5 }]
    }));
  };

  const updateReview = (id: number, field: string, value: string) => {
    setSiteData(prev => ({
      ...prev,
      reviews: prev.reviews.map(r => r.id === id ? { ...r, [field]: value } : r)
    }));
  };

  const removeReview = (id: number) => {
    setSiteData(prev => ({
      ...prev,
      reviews: prev.reviews.filter(r => r.id !== id)
    }));
  };

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
        <div className="p-4 border-t border-stone-800">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-stone-800 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border">
            <h1 className="text-2xl font-bold text-stone-800 capitalize">Gestión: {activeTab}</h1>
            <button onClick={saveToFirebase} disabled={isSaving} className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-bold shadow-md">
              <Save className="w-5 h-5" /> {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>

          {activeTab === 'general' && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 border">
              <div>
                <label className="font-bold text-stone-700">Título Principal (Hero)</label>
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
                <label className="font-bold text-stone-700">Número de WhatsApp (ej. 573001234567)</label>
                <input type="text" value={siteData.whatsappNumber} onChange={(e) => handleInputChange('whatsappNumber', e.target.value)} className="w-full p-3 border rounded-lg mt-1" />
              </div>
            </div>
          )}

          {activeTab === 'routes' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-stone-500 text-sm">Gestiona las rutas que ofreces a los clientes.</p>
                <button onClick={addRoute} className="bg-stone-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4"/> Agregar Ruta</button>
              </div>
              {siteData.routes.map((route) => (
                <div key={route.id} className="bg-white p-4 rounded-xl shadow-sm border flex gap-4 items-center">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-stone-400 font-bold block">Nombre de la Ruta</label>
                      <input type="text" value={route.title} onChange={(e) => updateRoute(route.id, 'title', e.target.value)} className="p-2 border rounded w-full mt-1" placeholder="Nombre" />
                    </div>
                    <div>
                      <label className="text-xs text-stone-400 font-bold block">Precio (COP)</label>
                      <input type="text" value={route.price} onChange={(e) => updateRoute(route.id, 'price', e.target.value)} className="p-2 border rounded w-full mt-1" placeholder="Ej. 120.000" />
                    </div>
                    <div>
                      <label className="text-xs text-stone-400 font-bold block">Duración</label>
                      <input type="text" value={route.duration} onChange={(e) => updateRoute(route.id, 'duration', e.target.value)} className="p-2 border rounded w-full mt-1" placeholder="Ej. 2 horas" />
                    </div>
                  </div>
                  <button onClick={() => removeRoute(route.id)} className="text-red-500 p-2 mt-4"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-stone-500 text-sm">Agrega URLs de imágenes de Unsplash o de tu servidor. La primera foto será el fondo del banner principal.</p>
                <button onClick={addGalleryImage} className="bg-stone-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4"/> Agregar Imagen</button>
              </div>
              {siteData.gallery.map((url, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border flex gap-4 items-center">
                  {url ? (
                    <img src={url} alt="preview" className="w-16 h-16 object-cover rounded-lg bg-stone-100" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-stone-100 border border-dashed flex items-center justify-center text-stone-300"><ImageIcon className="w-6 h-6" /></div>
                  )}
                  <input type="text" value={url} onChange={(e) => updateGalleryImage(index, e.target.value)} className="flex-1 p-2 border rounded" placeholder="https://images.unsplash.com/photo-..." />
                  <button onClick={() => removeGalleryImage(index)} className="text-red-500 p-2"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-stone-500 text-sm">Añade testimonios de clientes para dar confianza.</p>
                <button onClick={addReview} className="bg-stone-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4"/> Agregar Testimonio</button>
              </div>
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