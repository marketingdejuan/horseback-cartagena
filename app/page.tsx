"use client";

import React, { useState, useEffect } from 'react';
import { Settings, Image as ImageIcon, Map, Lock, User, LogOut, Plus, Trash2, Save, LayoutDashboard } from 'lucide-react';
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
sessions: []
});

useEffect(() => {
if (isAuthenticated) {
const fetchData = async () => {
try {
const docRef = doc(db, "configuracion", "general");
const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSiteData(docSnap.data());
      } else {
        setSiteData({
          heroTitle: 'Descubre Medellín a Caballo',
          heroDescription: 'Vive una experiencia inolvidable recorriendo los mejores paisajes.',
          whatsappNumber: '+573001234567',
          sessions: [
            { id: 1, title: 'Ruta Mirador del Valle', price: '120.000', duration: '2 horas' }
          ]
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
alert("¡Cambios guardados en Firebase con éxito! 🚀");
} catch (error) {
console.error("Error al guardar:", error);
alert("Hubo un error al guardar. Revisa la consola.");
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

const addSession = () => {
const newSession = { id: Date.now(), title: 'Nueva Ruta', price: '0', duration: '0 horas' };
setSiteData({ ...siteData, sessions: [...siteData.sessions, newSession] });
};

const removeSession = (id: number) => {
setSiteData({ ...siteData, sessions: siteData.sessions.filter((s: any) => s.id !== id) });
};

const updateSession = (id: number, field: string, value: string) => {
const updatedSessions = siteData.sessions.map((session: any) => {
if (session.id === id) {
return { ...session, [field]: value };
}
return session;
});
setSiteData({ ...siteData, sessions: updatedSessions });
};

if (!isAuthenticated) {
return (






Acceso Colaboradores


      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Escribe 'admin' para entrar"
          />
          {loginError && <p className="text-red-500 text-sm mt-1">Contraseña incorrecta.</p>}
        </div>
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-medium hover:bg-green-700">
          Ingresar al Panel
        </button>
      </form>
    </div>
  </div>
);


}

return (




 Panel Admin



<button onClick={() => setActiveTab('general')} className={w-full flex items-center gap-3 p-3 rounded-lg ${activeTab === 'general' ? 'bg-green-600 text-white' : 'hover:bg-slate-800'}}>
 Textos Principales

<button onClick={() => setActiveTab('sessions')} className={w-full flex items-center gap-3 p-3 rounded-lg ${activeTab === 'sessions' ? 'bg-green-600 text-white' : 'hover:bg-slate-800'}}>
 Rutas y Precios




  <main className="flex-1 p-4 md:p-8 overflow-y-auto">
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Contenido</h1>
        <button 
          onClick={handleSaveToDB}
          disabled={isSaving}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Guardando...' : 'Guardar en Base de Datos'}
        </button>
      </div>

      {activeTab === 'general' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Título Principal (Hero)</label>
            <input type="text" value={siteData.heroTitle} onChange={(e) => handleInputChange(e, 'heroTitle')} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción (Subtítulo)</label>
            <textarea value={siteData.heroDescription} onChange={(e) => handleInputChange(e, 'heroDescription')} rows="3" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Número de WhatsApp</label>
            <input type="text" value={siteData.whatsappNumber} onChange={(e) => handleInputChange(e, 'whatsappNumber')} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button onClick={addSession} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800">
              <Plus className="w-4 h-4" /> Agregar Ruta
            </button>
          </div>
          {siteData.sessions.map((session: any) => (
            <div key={session.id} className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 border border-gray-100">
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Ruta</label>
                  <input type="text" value={session.title} onChange={(e) => updateSession(session.id, 'title', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Precio</label>
                  <input type="text" value={session.price} onChange={(e) => updateSession(session.id, 'price', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Duración</label>
                  <input type="text" value={session.duration} onChange={(e) => updateSession(session.id, 'duration', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <button onClick={() => removeSession(session.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </main>
</div>


);
}