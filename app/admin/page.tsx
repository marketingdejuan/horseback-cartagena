"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Settings, Users, Lock, LogOut, Plus, Trash2, Save, LayoutDashboard, MessageSquare, DollarSign, ImagePlus, Copy, Star, Camera, ArrowUp, ArrowDown } from 'lucide-react';
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
  const [uploadTarget, setUploadTarget] = useState('galeria'); 
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [siteData, setSiteData] = useState<any>({
    heroTitle: '', heroTitleEn: '', heroSubtitle: '', heroSubtitleEn: '',
    whatsappNumber: '573000000000', navLabel1: '', navLabel1En: '',
    navLabel2: '', navLabel2En: '', navLabel3: '', navLabel3En: '',
    basePrice: 100000, guidePrice: 80000, depositPercent: 50, promoActive: true,
    horses: [], faqs: [], mediaLibrary: [], reviews: [], heroMedia: [], gallery: []
  });

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        const docSnap = await getDoc(doc(db, "configuracion", "general"));
        if (docSnap.exists()) setSiteData(docSnap.data());
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const saveToFirebase = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "configuracion", "general"), siteData);
      setMensajeGuardado('✅ ¡Cambios Guardados!');
    } catch (e) { setMensajeGuardado('❌ Error.'); }
    setIsSaving(false); setTimeout(() => setMensajeGuardado(''), 3000);
  };
  /* LÓGICA DE REORDENAMIENTO */
  const moveGalleryItem = (index: number, direction: number) => {
    const newGallery = [...(siteData.gallery || [])];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newGallery.length) return;
    [newGallery[index], newGallery[targetIndex]] = [newGallery[targetIndex], newGallery[index]];
    setSiteData({...siteData, gallery: newGallery});
  };

  /* CRUD GENERAL */
  const handleInputChange = (field: string, value: any) => setSiteData({...siteData, [field]: value});
  
  const addHorse = () => setSiteData({...siteData, horses: [...siteData.horses, { id: Date.now(), name: 'Nuevo', type: 'Manso', photo: '', status: 'Activo' }]});
  const updateHorse = (id: number, field: string, value: string) => setSiteData({...siteData, horses: siteData.horses.map((h: any) => h.id === id ? {...h, [field]: value} : h)});
  const removeHorse = (id: number) => setSiteData({...siteData, horses: siteData.horses.filter((h: any) => h.id !== id)});
  
  const addFaq = () => setSiteData({...siteData, faqs: [...siteData.faqs, { id: Date.now(), q: '', a: '', qEn: '', aEn: '' }]});
  const updateFaq = (id: number, field: string, value: string) => setSiteData({...siteData, faqs: siteData.faqs.map((f: any) => f.id === id ? {...f, [field]: value} : f)});
  const removeFaq = (id: number) => setSiteData({...siteData, faqs: siteData.faqs.filter((f: any) => f.id !== id)});
  
  const addReview = () => setSiteData({...siteData, reviews: [...siteData.reviews, { id: Date.now(), author: '', text: '', textEn: '', rating: 5, videoUrl: '' }]});
  const updateReview = (id: number, field: string, value: any) => setSiteData({...siteData, reviews: siteData.reviews.map((r: any) => r.id === id ? {...r, [field]: value} : r)});
  const removeReview = (id: number) => setSiteData({...siteData, reviews: siteData.reviews.filter((r: any) => r.id !== id)});

  /* SUBIDA DE IMAGENES */
  const processAndUpload = async () => {
    if (!previewImage) return;
    setIsUploading(true);
    const storageRef = ref(storage, `imagenes/${Date.now()}.webp`);
    await uploadString(storageRef, previewImage, 'data_url');
    const url = await getDownloadURL(storageRef);
    setSiteData({...siteData, mediaLibrary: [{ id: Date.now(), url, target: uploadTarget }, ...siteData.mediaLibrary]});
    setPreviewImage(null); setIsUploading(false);
  };
  if (!isAuthenticated) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <form onSubmit={(e) => { e.preventDefault(); if (password === 'admin') setIsAuthenticated(true); else setLoginError(true); }} className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="font-bold mb-4">Acceso Admin</h2>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border mb-4 rounded" placeholder="Password" />
        <button className="w-full bg-stone-900 text-white p-2 rounded">Entrar</button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex">
      <aside className="w-64 bg-stone-900 text-stone-300 p-6 flex flex-col">
        <h2 className="text-xl font-bold text-white mb-8">CMS Master</h2>
        <nav className="space-y-4">
          {[ {id: 'comercial', icon: DollarSign, label: 'Precios'}, {id: 'hero', icon: LayoutDashboard, label: 'Hero'}, {id: 'galeria', icon: Camera, label: 'Galería'}, {id: 'media', icon: ImagePlus, label: 'Biblioteca'}, {id: 'caballos', icon: Users, label: 'Caballos'}, {id: 'reviews', icon: Star, label: 'Reseñas'}, {id: 'faq', icon: MessageSquare, label: 'FAQ'}, {id: 'general', icon: Settings, label: 'General'} ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-3 w-full p-2 ${activeTab === item.id ? 'text-white' : ''}`}><item.icon size={20}/> {item.label}</button>
          ))}
        </nav>
        <button onClick={saveConfig} className="mt-auto bg-green-600 text-white py-3 rounded-lg font-bold">{isSaving ? 'Guardando...' : 'Guardar Todo'}</button>
      </aside>

      <main className="flex-1 p-8">
        {/* Aquí puedes renderizar los formularios específicos de cada tab. 
            Te recomiendo mantener la estructura de 'if activeTab === ...' que ya conoces. */}
        <h2 className="text-2xl font-bold mb-6">Módulo: {activeTab.toUpperCase()}</h2>
        <div className="bg-white p-6 rounded-xl shadow border">
           {/* Contenido dinámico del Tab activo */}
           <p>Estás en {activeTab}. Agrega aquí los campos de entrada según el Tab.</p>
        </div>
      </main>
    </div>
  );
}