"use client";

import React, { useState, useEffect } from 'react';
import { Settings, Map as MapIcon, Lock, User, LogOut, Plus, Trash2, Save, LayoutDashboard } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const [siteData, setSiteData] = useState({
    heroTitle: 'Cargando...',
    heroDescription: 'Cargando...',
    whatsappNumber: '',
    sessions: [] as any[]
  });

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const docRef = doc(db, "configuracion", "general");
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setSiteData(docSnap.data() as any);
          } else {
            setSiteData({
              heroTitle: 'Descubre Medellín a Caballo',
              heroDescription: 'Vive una experiencia inolvidable.',
              whatsappNumber: '+573001234567',
              sessions: [{ id: 1, title: 'Ruta Mirador del Valle', price: '120.000', duration: '2 horas' }]
            });
          }
        } catch (error) {
          console.error("Error al cargar datos:", error);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const handleSaveToDB = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, "configuracion", "general");
      await setDoc(docRef, siteData);
      alert("¡Cambios guardados en Firebase! 🚀");
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setIsSaving(false);
    }
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

  const handleInputChange = (e: any, field: string) => {
    setSiteData({ ...siteData, [field]: e.target.value });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Acceso Colaboradores</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Escribe 'admin' para entrar"
            />
            {loginError && <p className="text-red-500 text-sm">Contraseña incorrecta.</p>}
            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-medium">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col p-4 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Panel Admin</h2>
        <button onClick={() => setActiveTab('general')} className="text-left p-3 hover:bg-slate-800 rounded">Textos</button>
      </aside>
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Gestión de Contenido</h1>
          <button onClick={handleSaveToDB} className="bg-green-600 text-white px-4 py-2 rounded-lg">
            {isSaving ? 'Guardando...' : 'Guardar en Base de Datos'}
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <label className="block text-sm font-semibold mb-2">Título Principal</label>
          <input type="text" value={siteData.heroTitle} onChange={(e) => handleInputChange(e, 'heroTitle')} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
      </main>
    </div>
  );
}