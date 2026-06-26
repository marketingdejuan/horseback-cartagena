  <main className="flex-1 p-4 md:p-8 overflow-y-auto">
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white p-4 rounded-xl shadow-sm border gap-4">
        <h1 className="text-2xl font-bold text-stone-800 capitalize">Módulo: {activeTab}</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          {mensajeGuardado && <span className="text-green-600 font-bold">{mensajeGuardado}</span>}
          <button onClick={saveToFirebase} disabled={isSaving} className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 font-bold shadow-lg">
            <Save className="w-5 h-5" /> {isSaving ? 'Subiendo...' : 'Publicar Cambios'}
          </button>
        </div>
      </div>

      {activeTab === 'comercial' && (
        <div className="bg-white rounded-xl shadow-sm p-6 border space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="font-bold text-stone-700">Precio Base x Jinete</label><input type="number" value={siteData.basePrice} onChange={(e) => handleInputChange('basePrice', Number(e.target.value))} className="w-full p-3 border-2 rounded-xl mt-1 font-bold text-lg" /></div>
            <div><label className="font-bold text-stone-700">Costo Guía (Lun-Vie)</label><input type="number" value={siteData.guidePrice} onChange={(e) => handleInputChange('guidePrice', Number(e.target.value))} className="w-full p-3 border-2 rounded-xl mt-1 font-bold text-lg" /></div>
            <div><label className="font-bold text-stone-700">% Abono Requerido</label><input type="number" value={siteData.depositPercent} onChange={(e) => handleInputChange('depositPercent', Number(e.target.value))} className="w-full p-3 border-2 rounded-xl mt-1 font-bold text-lg" /></div>
            <div><label className="font-bold text-stone-700">Horas Cancelación</label><input type="number" value={siteData.cancelHours} onChange={(e) => handleInputChange('cancelHours', Number(e.target.value))} className="w-full p-3 border-2 rounded-xl mt-1 font-bold text-lg" /></div>
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
          {siteData.horses.map((horse) => (
            <div key={horse.id} className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-4 items-center">
              <img src={horse.photo || 'https://via.placeholder.com/150'} alt="Caballo" className="w-24 h-24 object-cover rounded-xl bg-stone-100" />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <input type="text" value={horse.name} onChange={(e) => updateHorse(horse.id, 'name', e.target.value)} className="p-2 border rounded font-bold" placeholder="Nombre" />
                <input type="text" value={horse.photo} onChange={(e) => updateHorse(horse.id, 'photo', e.target.value)} className="p-2 border rounded" placeholder="URL Foto" />
                <select value={horse.type} onChange={(e) => updateHorse(horse.id, 'type', e.target.value)} className="p-2 border rounded font-bold text-stone-600">
                  <option value="Manso">Manso (Principiantes)</option>
                  <option value="Brioso">Brioso (Expertos)</option>
                </select>
                <select value={horse.status} onChange={(e) => updateHorse(horse.id, 'status', e.target.value)} className="p-2 border rounded font-bold text-stone-600">
                  <option value="Activo">Estado: Activo</option>
                  <option value="Reposo">Estado: En Reposo / Herraje</option>
                </select>
              </div>
              <button onClick={() => removeHorse(horse.id)} className="text-red-500 p-3 bg-red-50 rounded-xl hover:bg-red-100"><Trash2 className="w-5 h-5"/></button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="space-y-4">
          <button onClick={addFaq} className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus className="w-4 h-4"/> Añadir Pregunta</button>
          {siteData.faqs.map((faq) => (
            <div key={faq.id} className="bg-white p-5 rounded-xl shadow-sm border space-y-3">
              <div className="flex justify-between">
                <input type="text" value={faq.q} onChange={(e) => updateFaq(faq.id, 'q', e.target.value)} className="p-2 border-b-2 border-stone-200 w-full font-bold text-stone-800 text-lg outline-none focus:border-amber-500" placeholder="Pregunta..." />
                <button onClick={() => removeFaq(faq.id)} className="text-red-500 ml-4"><Trash2 className="w-5 h-5"/></button>
              </div>
              <textarea value={faq.a} onChange={(e) => updateFaq(faq.id, 'a', e.target.value)} className="w-full p-3 border rounded-xl text-stone-600 outline-none focus:border-amber-500" placeholder="Respuesta..." rows={3} />
            </div>
          ))}
        </div>
      )}

      {activeTab === 'general' && (
        <div className="bg-white rounded-xl shadow-sm p-6 border space-y-6">
          <div><label className="font-bold block mb-1 text-stone-700">Título SEO (H1)</label><input type="text" value={siteData.heroTitle} onChange={(e) => handleInputChange('heroTitle', e.target.value)} className="w-full p-3 border-2 rounded-xl font-bold" /></div>
          <div><label className="font-bold block mb-1 text-stone-700">Subtítulo Hero</label><textarea value={siteData.heroSubtitle} onChange={(e) => handleInputChange('heroSubtitle', e.target.value)} className="w-full p-3 border-2 rounded-xl" rows={2} /></div>
          <div><label className="font-bold block mb-1 text-stone-700">Número de WhatsApp (Sin +)</label><input type="text" value={siteData.whatsappNumber} onChange={(e) => handleInputChange('whatsappNumber', e.target.value)} className="w-full p-3 border-2 rounded-xl font-mono text-lg" placeholder="573000000000" /></div>
        </div>
      )}
    </div>
  </main>
</div>
