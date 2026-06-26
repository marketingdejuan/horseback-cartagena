<main className="flex-1 p-4 md:p-8 overflow-y-auto">
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white p-4 rounded-xl shadow-sm border gap-4">
        <h1 className="text-2xl font-bold text-stone-800 capitalize">Módulo: {activeTab}</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          {notification && <span className="text-green-600 font-medium text-sm animate-pulse">{notification}</span>}
          <button onClick={saveToFirebase} disabled={isSaving} className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-bold shadow-md">
            <Save className="w-5 h-5" /> {isSaving ? '...' : 'Guardar en Base de Datos'}
          </button>
        </div>
      </div>

      {/* VARIABLES COMERCIALES */}
      {activeTab === 'comercial' && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 border">
          <p className="text-stone-500 mb-4">Ajusta los precios aquí para que el <b>Cotizador del cliente</b> calcule automáticamente los totales y abonos.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-bold text-stone-700">Precio Base por Jinete (COP)</label>
              <input type="number" value={siteData.basePrice} onChange={(e) => handleInputChange('basePrice', Number(e.target.value))} className="w-full p-3 border rounded-lg mt-1" />
            </div>
            <div>
              <label className="font-bold text-stone-700">Costo Guía (Lunes-Viernes)</label>
              <input type="number" value={siteData.guidePrice} onChange={(e) => handleInputChange('guidePrice', Number(e.target.value))} className="w-full p-3 border rounded-lg mt-1" />
            </div>
            <div>
              <label className="font-bold text-stone-700">% de Abono Requerido</label>
              <input type="number" value={siteData.depositPercent} onChange={(e) => handleInputChange('depositPercent', Number(e.target.value))} className="w-full p-3 border rounded-lg mt-1" />
            </div>
          </div>
        </div>
      )}

      {/* FLOTA EQUINA */}
      {activeTab === 'caballos' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center"><p className="text-stone-500">Administra los caballos visibles en la web.</p><button onClick={addHorse} className="bg-stone-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4"/> Añadir Caballo</button></div>
          {siteData.horses.map((horse) => (
            <div key={horse.id} className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-4 items-center">
              <img src={horse.photo || 'https://via.placeholder.com/150'} alt={horse.name} className="w-20 h-20 object-cover rounded-lg bg-stone-100" />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <input type="text" value={horse.name} onChange={(e) => updateHorse(horse.id, 'name', e.target.value)} className="p-2 border rounded" placeholder="Nombre" />
                <input type="text" value={horse.photo} onChange={(e) => updateHorse(horse.id, 'photo', e.target.value)} className="p-2 border rounded" placeholder="URL Foto" />
                <select value={horse.type} onChange={(e) => updateHorse(horse.id, 'type', e.target.value)} className="p-2 border rounded">
                  <option value="Manso">Manso (Principiantes)</option>
                  <option value="Brioso">Brioso (Expertos)</option>
                </select>
                <select value={horse.status} onChange={(e) => updateHorse(horse.id, 'status', e.target.value)} className="p-2 border rounded">
                  <option value="Activo">Activo operativo</option>
                  <option value="Reposo">En reposo / Herraje</option>
                </select>
              </div>
              <button onClick={() => removeHorse(horse.id)} className="text-red-500 p-2 bg-red-50 rounded-lg"><Trash2 className="w-5 h-5"/></button>
            </div>
          ))}
        </div>
      )}

      {/* PREGUNTAS FRECUENTES (FAQ) */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
           <div className="flex justify-between items-center"><p className="text-stone-500">Nutre el SEO con preguntas comunes.</p><button onClick={addFaq} className="bg-stone-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4"/> Añadir FAQ</button></div>
           {siteData.faqs.map((faq) => (
            <div key={faq.id} className="bg-white p-4 rounded-xl shadow-sm border space-y-2">
              <div className="flex justify-between">
                <input type="text" value={faq.q} onChange={(e) => updateFaq(faq.id, 'q', e.target.value)} className="p-2 border rounded w-full font-bold text-stone-800" placeholder="Pregunta" />
                <button onClick={() => removeFaq(faq.id)} className="text-red-500 ml-2"><Trash2 className="w-5 h-5"/></button>
              </div>
              <textarea value={faq.a} onChange={(e) => updateFaq(faq.id, 'a', e.target.value)} className="w-full p-2 border rounded text-stone-600" placeholder="Respuesta..." rows={2} />
            </div>
          ))}
        </div>
      )}

      {/* TEXTOS GENERALES */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 border">
          <div><label className="font-bold">H1 (SEO) Título Hero</label><input type="text" value={siteData.heroTitle} onChange={(e) => handleInputChange('heroTitle', e.target.value)} className="w-full p-3 border rounded mt-1" /></div>
          <div><label className="font-bold">Subtítulo Hero</label><textarea value={siteData.heroSubtitle} onChange={(e) => handleInputChange('heroSubtitle', e.target.value)} className="w-full p-3 border rounded mt-1" rows={2} /></div>
          <div><label className="font-bold">Número WhatsApp (Recepción Ventas)</label><input type="text" value={siteData.whatsappNumber} onChange={(e) => handleInputChange('whatsappNumber', e.target.value)} className="w-full p-3 border rounded mt-1" /></div>
        </div>
      )}

    </div>
  </main>
</div>