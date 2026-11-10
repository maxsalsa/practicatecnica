import React, { useState } from 'react';

export default function PasarelaTilopayOficial() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/40 shadow-2xl text-center space-y-4">
      <div className="flex items-center justify-center gap-2">
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30">
          PASARELA OFICIAL TILOPAY &amp; BANCO POPULAR
        </span>
      </div>
      
      <h3 className="text-lg md:text-xl font-black text-white">
        Activación Inmediata Plan PRO (₡5,000 Anual / ₡1,000 Semestral)
      </h3>
      
      <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
        Paga de forma rápida y segura con tarjetas Visa/Mastercard, Google Pay o escanea nuestro código QR integrado para transferencia directa en Costa Rica.
      </p>

      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <a
          href="https://tilo.co/s/VCREmR9q"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg transition-all flex items-center gap-2"
        >
          <span>💳 Pagar Ahora con Tilopay / Tarjeta</span>
        </a>
        
        <button
          onClick={() => setModalAbierto(true)}
          className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-black text-xs border border-cyan-500/30 shadow-lg"
        >
          <span>📱 Ver Código QR &amp; SINPE Banco Popular</span>
        </button>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h4 className="font-black text-sm text-cyan-400">Escanea o Paga por SINPE</h4>
              <button onClick={() => setModalAbierto(false)} className="text-slate-400 hover:text-white font-bold">X</button>
            </div>
            
            <div className="p-4 bg-white rounded-xl inline-block mx-auto border-4 border-slate-950">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://tilo.co/s/VCREmR9q" 
                alt="QR Pago Tilopay" 
                className="w-40 h-40 mx-auto"
              />
            </div>
            
            <div className="text-xs text-slate-300 space-y-1">
              <div>SINPE Móvil Oficial: <strong className="text-amber-300">6090-6359</strong></div>
              <div>Titular: <strong className="text-white">Max Salazar Sánchez (Banco Popular)</strong></div>
              <div className="text-[10px] text-slate-400">Envíe comprobante al +506 6090-6359</div>
            </div>

            <button
              onClick={() => setModalAbierto(false)}
              className="w-full py-2.5 rounded-xl bg-cyan-600 text-white font-black text-xs"
            >
              Cerrar Ventana
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
