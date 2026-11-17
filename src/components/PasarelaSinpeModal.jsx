import React, { useState } from 'react';

export default function PasarelaSinpeModal({ onClose }) {
  const [copiado, setCopiado] = useState(false);
  const telefonoSinpe = '60906359';
  const nombreTitular = 'Max Salazar Sánchez (Banco Popular)';

  const copiarTelefono = () => {
    navigator.clipboard.writeText(telefonoSinpe);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  const abrirWhatsapp = () => {
    const url = `https://wa.me/506${telefonoSinpe}?text=Hola%20Profe%20Max,%20adjunto%20comprobante%20de%20aporte%20SINPE%20Móvil%20para%20Práctica%20Técnica.`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-auto bg-slate-900 border border-cyan-500/40 p-6 rounded-2xl shadow-2xl text-slate-100 space-y-6 relative">
        
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-lg font-extrabold text-cyan-400 flex items-center gap-2">
            📱 Pasarela SINPE Móvil & Soporte
          </h3>
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
          )}
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-center">
          <p className="text-xs text-slate-300">Realiza tu aporte o suscripción institucional mediante SINPE Móvil:</p>
          
          <div className="bg-slate-900 p-3 rounded-lg border border-cyan-500/30">
            <span className="text-xs text-slate-400 block">Número Autorizado:</span>
            <span className="text-2xl font-mono font-extrabold text-cyan-300 tracking-wider">6090-6359</span>
          </div>

          <div className="text-xs text-slate-300">
            <p className="font-semibold text-white">{nombreTitular}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Banco Popular — Costa Rica</p>
          </div>

          <button
            onClick={copiarTelefono}
            className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold py-2 px-4 rounded-lg text-xs transition-all border border-slate-700"
          >
            {copiado ? '✅ ¡Número copiado al portapapeles!' : '📋 Copiar Número SINPE'}
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-slate-400 text-center">¿Dudas o soporte oficial con tu comprobante?</p>
          <button
            onClick={abrirWhatsapp}
            className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow"
          >
            <span>💬</span>
            <span>Contactar Soporte WhatsApp (+506 6090-6359)</span>
          </button>
        </div>

      </div>
    </div>
  );
}