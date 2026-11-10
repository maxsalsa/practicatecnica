import React, { useState, useEffect } from 'react';
import { verificarAccesoPro } from '../utils/gestorSuscripcion';
import { ShieldCheck, Clock, CreditCard, CheckCircle } from 'lucide-react';

export default function PanelSuscripcionUsuario({ emailUsuario }) {
  const [estadoAcceso, setEstadoAcceso] = useState(null);

  useEffect(() => {
    const acceso = verificarAccesoPro(emailUsuario || 'estudiante@practicatecnica.com');
    setEstadoAcceso(acceso);
  }, [emailUsuario]);

  if (!estadoAcceso) return null;

  return (
    <div className="max-w-xl mx-auto my-6 p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 text-slate-200 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-emerald-400" />
          <h3 className="font-black text-white text-base">Estado de tu Cuenta pracTICAtecnica</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-black ${estadoAcceso.activo ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}>
          {estadoAcceso.activo ? `PRO ACTIVO (${estadoAcceso.tipo})` : 'EXPIRADO'}
        </span>
      </div>

      {estadoAcceso.activo ? (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs text-cyan-300 font-bold">
            <Clock className="h-4 w-4" />
            <span>Tienes acceso completo garantizado</span>
          </div>
          <p className="text-sm text-slate-300">
            {estadoAcceso.diasRestantes ? `Te quedan ${estadoAcceso.diasRestantes} días de tu período de cortesía o plan activo.` : 'Acceso ilimitado por privilegios de SuperAdmin.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-rose-300">{estadoAcceso.mensaje}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-white text-sm">Plan Semestral</div>
              <div className="text-xs text-emerald-400 font-black">₡1,000 colones (6 Meses)</div>
              <a
                href="https://tilo.co/s/VCREmR9q"
                target="_blank"
                rel="noreferrer"
                className="block w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs text-center"
              >
                Pagar ₡1,000 (Tilopay)
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-white text-sm">Plan Anual PRO</div>
              <div className="text-xs text-amber-400 font-black">₡5,000 colones (1 Año)</div>
              <a
                href="https://tilo.co/s/VCREmR9q"
                target="_blank"
                rel="noreferrer"
                className="block w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs text-center"
              >
                Pagar ₡5,000 (Tilopay)
              </a>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
            O paga por SINPE Móvil oficial al <strong className="text-amber-300">6090-6359</strong> (Banco Popular, Max Salazar Sánchez) y envía comprobante al WhatsApp.
          </div>
        </div>
      )}
    </div>
  );
}