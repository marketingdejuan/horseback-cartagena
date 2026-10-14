"use client";
import React, { useState, useRef, useEffect } from 'react';
import { PenTool, CheckCircle2, AlertTriangle, Calendar, Map, User, Phone, AtSign, FileText, Users } from 'lucide-react';

// 🔥 CONFIGURACIÓN DE MARCA: Si copias este archivo a otro sitio, solo cambia estas 2 líneas:
const MARCA_SITIO = 'cabalgatamedellin.com'; // Opciones: 'cabalgatas.co' | 'cabalgatamedellin.com' | 'toursdemedellin.com'
const NOMBRE_COMERCIAL = 'Cabalgatas Medellín';

export default function WaiverPage() {
  const [form, setForm] = useState({ 
    language: 'Español',
    tourDate: '', tourTime: '10:00 am', tourDuration: 'Cabalgata Privada',
    clientName: '', idType: 'Cédula', idNumber: '', 
    countryCode: '+57', whatsapp: '', instagram: '', emergencyContact: '',
    hasMinor: false, minorAcudienteName: '', minorAcudienteIdType: 'Cédula', minorAcudienteId: '', minorName: '', minorIdType: 'Tarjeta de identidad', minorId: '',
    acceptedTerms: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#1c1917'; 
      }
    }
  }, [isSuccess]);

  const startDrawing = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx?.beginPath();
    ctx?.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    e.preventDefault(); 
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx?.lineTo(clientX - rect.left, clientY - rect.top);
    ctx?.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if(canvas) canvas.getContext('2d')?.closePath();
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if(canvas) canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acceptedTerms) return alert("Debes leer y aceptar los términos y condiciones.");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(ctx!.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
    const hasPixels = pixelBuffer.some(color => color !== 0);
    
    if (!hasPixels) return alert("Por favor, dibuje su firma en el cuadro correspondiente.");

    setIsSubmitting(true);
    const signatureImage = canvas.toDataURL('image/png');

    try {
      // 🔥 1. ENVIAR DIRECTAMENTE AL SÚPER ERP CENTRAL (PostgreSQL)
      const payloadERP = {
        fullName: form.clientName.trim(),
        idType: form.idType,
        documentId: form.idNumber.trim(),
        phone: `${form.countryCode === 'Otro' ? '' : form.countryCode}${form.whatsapp.replace(/\D/g, '')}`,
        instagram: form.instagram.trim(),
        emergencyContact: form.emergencyContact.trim(),
        tourDate: new Date(`${form.tourDate}T12:00:00Z`).toISOString(),
        tourTime: form.tourTime,
        planType: form.tourDuration,
        hasMinor: form.hasMinor,
        minorName: form.hasMinor ? form.minorName : null,
        minorId: form.hasMinor ? form.minorId : null,
        signatureUrl: signatureImage, // Enviamos la firma digital lista para visualizar
        brand: MARCA_SITIO
      };

      const response = await fetch('https://admin.cabalgatas.co/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadERP)
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor ERP");
      }

      setIsSuccess(true);
      
      // =========================================================================
      // 🚀 ESTRATEGIA PRO: EXTRACCIÓN Y ENVÍO DE DATA A LOS ALGORITMOS (ADS)
      // =========================================================================
      try {
        const nameParts = form.clientName.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
        
        const cleanPhone = `${form.countryCode.replace('+', '')}${form.whatsapp.replace(/\D/g, '')}`;
        const phoneForGoogle = `+${cleanPhone}`;

        // 🎯 1. GOOGLE ADS (Conversiones Mejoradas / Enhanced Conversions)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('set', 'user_data', {
            "phone_number": phoneForGoogle,
            "address": {
              "first_name": firstName,
              "last_name": lastName,
            }
          });
          (window as any).gtag('event', 'conversion', { 
            'send_to': 'AW-XXXXXXXXXX/TU_ETIQUETA_DE_CONVERSION',
            'value': 0.00,
            'currency': 'COP'
          });
        }

        // 🎯 2. META ADS (Coincidencia Avanzada de Facebook/Instagram)
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: form.tourDuration,
            value: 0.00,
            currency: 'COP',
            fn: firstName.toLowerCase(),
            ln: lastName.toLowerCase(),
            ph: cleanPhone,
            external_id: form.idNumber
          });
        }
      } catch (trackingError) {
        console.error("Error enviando data a los Píxeles:", trackingError);
      }
      // =========================================================================

    } catch (error) {
      console.error(error);
      alert("Error de conexión. Verifica tu internet e intenta de nuevo.");
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center selection:bg-amber-200">
        <CheckCircle2 size={100} className="text-green-500 mb-6 animate-in zoom-in duration-500" />
        <h1 className="text-4xl font-black text-stone-900 mb-4">¡Registro Exitoso!</h1>
        <p className="text-stone-500 font-medium max-w-md mb-8 text-lg">
          Tus datos y exoneración han sido guardados correctamente. ¡Prepárate para conectar con la naturaleza y vivir la mejor cabalgata! 🐎🌲
        </p>
        <button onClick={() => window.location.reload()} className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-black py-4 px-10 rounded-full shadow-xl active:scale-95 transition-all text-lg">
          Registrar otro participante
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans pb-10 selection:bg-amber-200">
      
      <div className="bg-stone-900 pt-12 pb-20 px-6 rounded-b-[40px] shadow-2xl text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter relative z-10">{NOMBRE_COMERCIAL}</h1>
        <p className="text-amber-500 font-bold text-sm mt-2 relative z-10">Registro y Exoneración de Responsabilidades</p>
      </div>

      <form onSubmit={handleSubmit} className="px-4 -mt-12 space-y-6 max-w-lg mx-auto w-full relative z-20">
        
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-stone-100 space-y-5">

<Map size={20} className="text-amber-500"/>
<h2 className="font-black text-stone-900 flex items-center gap-2 text-lg"> 1. Datos de la Cabalgata</h2>
          
          <div>
            <label className="block text-xs font-black text-stone-500 uppercase mb-2 ml-1">Fecha de la reserva</label>
            <div className="relative">
              <input required type="date" value={form.tourDate} onChange={e=>setForm({...form, tourDate: e.target.value})} className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 pl-12 outline-none focus:border-amber-500 text-stone-900 font-bold transition-colors" />
              <Calendar className="absolute left-4 top-4 text-stone-400" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-stone-500 uppercase mb-2 ml-1">Hora</label>
              <select value={form.tourTime} onChange={e=>setForm({...form, tourTime: e.target.value})} className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 outline-none focus:border-amber-500 text-stone-900 font-bold transition-colors">
                <option value="10:00 am">10:00 am</option>
                <option value="2:00 pm">2:00 pm</option>
                <option value="4:00 pm">4:00 pm</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-stone-500 uppercase mb-2 ml-1">Modalidad</label>
              <select value={form.tourDuration} onChange={e=>setForm({...form, tourDuration: e.target.value})} className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 outline-none focus:border-amber-500 text-stone-900 font-bold transition-colors text-sm">
                <option value="Cabalgata Privada">Plan Privado</option>
                <option value="Cabalgata Grupal">Plan Grupal</option>
                <option value="Plan Celebración">Plan Celebración</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl border border-stone-100 space-y-5">
          <h2 className="font-black text-stone-900 flex items-center gap-2 text-lg"><User size={20} className="text-amber-500"/> 2. Tus Datos (Seguro Médico)</h2>
          
          <div>
            <label className="block text-xs font-black text-stone-500 uppercase mb-2 ml-1">Nombre Completo</label>
            <input required type="text" value={form.clientName} onChange={e=>setForm({...form, clientName: e.target.value})} className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 outline-none focus:border-amber-500 text-stone-900 font-bold transition-colors" placeholder="Como aparece en tu documento" />
          </div>

          <div className="flex gap-3">
            <select value={form.idType} onChange={e=>setForm({...form, idType: e.target.value})} className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 outline-none focus:border-amber-500 text-stone-900 font-bold w-1/3 text-sm transition-colors">
              <option value="Cédula">Cédula</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="CE">C. Extranj.</option>
            </select>
            <input required type="text" value={form.idNumber} onChange={e=>setForm({...form, idNumber: e.target.value})} className="w-2/3 bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 outline-none focus:border-amber-500 text-stone-900 font-bold transition-colors" placeholder="Número de documento" />
          </div>

          <div className="flex gap-3">
            <select value={form.countryCode} onChange={e=>setForm({...form, countryCode: e.target.value})} className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 outline-none focus:border-amber-500 text-stone-900 font-bold w-1/3 text-sm text-center transition-colors">
              <option value="+57">🇨🇴 +57</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+52">🇲🇽 +52</option>
              <option value="+34">🇪🇸 +34</option>
              <option value="Otro">Otro</option>
            </select>
            <div className="relative w-2/3">
              <input required type="tel" value={form.whatsapp} onChange={e=>setForm({...form, whatsapp: e.target.value})} className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 pl-12 outline-none focus:border-amber-500 text-stone-900 font-bold transition-colors" placeholder="WhatsApp" />
              <Phone className="absolute left-4 top-4 text-stone-400" size={20} />
            </div>
          </div>

          <div>
            <div className="relative">
              <input required type="text" value={form.instagram} onChange={e=>setForm({...form, instagram: e.target.value})} className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 pl-12 outline-none focus:border-amber-500 text-stone-900 font-bold transition-colors" placeholder="Tu usuario de Instagram (@)" />
              <AtSign className="absolute left-4 top-4 text-stone-400" size={20} />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-black text-red-500 uppercase mb-2 ml-1">Contacto de Emergencia</label>
            <input required type="text" value={form.emergencyContact} onChange={e=>setForm({...form, emergencyContact: e.target.value})} className="w-full bg-red-50 border-2 border-red-200 rounded-2xl p-4 outline-none focus:border-red-500 text-red-900 font-bold transition-colors" placeholder="Nombre y Teléfono de un familiar" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl border border-stone-100 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.hasMinor} onChange={e => setForm({...form, hasMinor: e.target.checked})} className="w-6 h-6 accent-amber-500" />
            <span className="font-black text-stone-900 flex items-center gap-2 text-lg"><Users size={20} className="text-amber-500"/> ¿Asistirá con un menor?</span>
          </label>

          {form.hasMinor && (
            <div className="space-y-5 pt-4 border-t border-stone-100 animate-in fade-in">
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                <p className="text-xs text-blue-900 font-bold leading-relaxed">Declaro bajo juramento que soy padre y/o acudiente del menor. Exonero a {NOMBRE_COMERCIAL} de todo daño que pueda ocurrirle bajo mi supervisión durante la interacción con los equinos.</p>
              </div>
              
              <label className="block text-xs font-black text-stone-500 uppercase ml-1">Acudiente Responsable</label>
              <input type="text" required={form.hasMinor} placeholder="Nombre Completo" value={form.minorAcudienteName} onChange={e=>setForm({...form, minorAcudienteName: e.target.value})} className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 outline-none text-stone-900 font-bold" />
              
              <div className="flex gap-3">
                <select value={form.minorAcudienteIdType} onChange={e=>setForm({...form, minorAcudienteIdType: e.target.value})} className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 text-sm w-1/3">
                  <option value="Cédula">Cédula</option><option value="Pasaporte">Pasaporte</option>
                </select>
                <input type="text" required={form.hasMinor} placeholder="Documento Acudiente" value={form.minorAcudienteId} onChange={e=>setForm({...form, minorAcudienteId: e.target.value})} className="w-2/3 bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 outline-none text-stone-900 font-bold" />
              </div>

              <label className="block text-xs font-black text-stone-500 uppercase ml-1 mt-2">Datos del Menor</label>
              <input type="text" required={form.hasMinor} placeholder="Nombre Completo del Menor" value={form.minorName} onChange={e=>setForm({...form, minorName: e.target.value})} className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 outline-none text-stone-900 font-bold" />
              
              <div className="flex gap-3">
                <select value={form.minorIdType} onChange={e=>setForm({...form, minorIdType: e.target.value})} className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 text-sm w-1/3">
                  <option value="Tarjeta de identidad">T. Identidad</option><option value="Registro civil">R. Civil</option><option value="Pasaporte">Pasaporte</option>
                </select>
                <input type="text" required={form.hasMinor} placeholder="Documento Menor" value={form.minorId} onChange={e=>setForm({...form, minorId: e.target.value})} className="w-2/3 bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 outline-none text-stone-900 font-bold" />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl border border-stone-100 space-y-4">
          <h2 className="font-black text-stone-900 flex items-center gap-2 text-lg"><FileText size={20} className="text-amber-500"/> 4. Términos Legales</h2>
          
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 h-48 overflow-y-scroll text-xs text-stone-600 leading-relaxed text-justify shadow-inner">
            <strong className="text-stone-900 uppercase">Exoneración de Responsabilidades y Asunción de Riesgos</strong><br/><br/>
            <strong>Asunción de Riesgos:</strong> Entendiendo que la práctica de montar a caballo, el ecoturismo y la interacción con animales es una actividad que conlleva riesgos inherentes. Los caballos son animales vivos con instinto de huida que pueden reaccionar de forma impredecible ante sonidos, movimientos u objetos. Declaro a {NOMBRE_COMERCIAL.toUpperCase()} que entiendo los riesgos que suponen este tipo de prácticas.<br/><br/>
            He elegido personalmente asistir a este evento/tour y acepto y asumo completa y voluntariamente todos los riesgos de accidentes, lesiones físicas o daños. Asumo y me haré cargo de mis propios gastos médicos y de emergencia en caso de lesión.<br/><br/>
            <strong>Indemnización:</strong> Acepto indemnizar y eximir de todo tipo de responsabilidad civil o penal a {NOMBRE_COMERCIAL.toUpperCase()}, sus guías, propietarios y dueños de los predios, de todas las reclamaciones por daños personales o contra mi propiedad durante el recorrido.<br/><br/>
            <strong>Condiciones de Salud:</strong> Declaro que gozo de buena salud física y mental para realizar la actividad. Confirmo que no me encuentro bajo los efectos de sustancias alucinógenas o estado de embriaguez extrema que comprometa mi seguridad o la del animal. Acepto seguir en todo momento las instrucciones del guía asignado.<br/><br/>
            <strong>Habeas Data:</strong> Acepto que mi nombre, fotografías o filmaciones realizadas durante el recorrido puedan ser usadas con fines promocionales. De conformidad con la Ley 1581 de 2012, autorizo el tratamiento de mis datos personales.
          </div>

          <label className="flex items-start gap-3 cursor-pointer mt-4 bg-amber-50 p-4 rounded-2xl border border-amber-200">
            <input type="checkbox" required checked={form.acceptedTerms} onChange={e => setForm({...form, acceptedTerms: e.target.checked})} className="w-5 h-5 accent-amber-600 mt-1" />
            <span className="font-extrabold text-amber-900 text-xs uppercase leading-tight">ENTIENDO QUE ESTOY CEDIENDO ALGUNOS DE MIS DERECHOS. HE LEÍDO Y ENTENDIDO ESTA ACEPTACIÓN DE RIESGOS Y TRATAMIENTO DE DATOS.</span>
          </label>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl border border-stone-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-black text-stone-900 flex items-center gap-2 text-lg"><PenTool size={20} className="text-amber-500"/> Firma Digital</h2>
            <button type="button" onClick={clearSignature} className="text-xs font-black uppercase text-stone-500 hover:text-red-500 bg-stone-100 px-4 py-2 rounded-xl active:scale-95 transition-transform">Limpiar</button>
          </div>
          
          <div className="border-2 border-dashed border-stone-300 rounded-2xl bg-stone-50 relative overflow-hidden shadow-inner touch-none">
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-stone-300 font-bold text-sm pointer-events-none select-none text-center">
              Dibuja tu firma aquí<br/><span className="text-xs font-normal">Usa tu dedo o el mouse</span>
            </p>
            <canvas 
              ref={canvasRef}
              width={350} height={180}
              className="w-full touch-none relative z-10 cursor-crosshair"
              style={{ touchAction: 'none' }} 
              onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
              onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
            />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900 font-black text-xl py-5 rounded-2xl shadow-xl active:scale-95 transition-all flex justify-center items-center gap-3">
          {isSubmitting ? <AlertTriangle className="animate-pulse" /> : 'Guardar y Finalizar Registro'}
        </button>
        <p className="text-center text-xs text-stone-400 font-bold mt-4">Protegido con encriptación SSL en Servidor Central.</p>
      </form>
    </div>
  );
}