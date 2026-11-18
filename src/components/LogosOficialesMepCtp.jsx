import React from 'react';
import { obtenerConfigInstitucion } from './ConfiguracionInstitucionalModal';

export function LogoOficialMep2026({ className = "h-9" }) {
  return (
    <div className={`flex items-center gap-2.5 bg-[#17223b] px-3.5 py-1.5 rounded-xl border border-amber-400/40 shadow-md ${className}`}>
      <div className="w-8 h-8 bg-[#11192e] border border-amber-400/70 rounded-lg flex items-center justify-center shrink-0 shadow-inner p-0.5">
        <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M42 12 Q52 18, 48 28 T62 48 Q72 58, 65 75 Q55 88, 45 72 T32 48 Q25 32, 42 12 Z" fill="#d4af37" />
          <path d="M68 38 Q78 44, 74 56 T62 68 Z" fill="#d4af37" />
          <circle cx="28" cy="85" r="3.5" fill="#d4af37" />
        </svg>
      </div>
      <div className="flex flex-col text-left leading-tight">
        <span className="text-[11px] font-bold tracking-wider text-white uppercase" style={{ fontFamily: 'Georgia, serif' }}>
          MINISTERIO
        </span>
        <span className="text-[9.5px] font-semibold text-slate-200 uppercase tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          DE EDUCACIÓN PÚBLICA
        </span>
        <div className="w-full h-[1px] bg-amber-400/70 my-0.5"></div>
        <span className="text-[7.5px] text-amber-300 font-mono tracking-tighter uppercase font-extrabold">
          GOBIERNO DE COSTA RICA
        </span>
      </div>
    </div>
  );
}

export function EscudoCtpMercedesNorte({ className = "w-10 h-10" }) {
  const cfg = obtenerConfigInstitucion();

  if (cfg.estandarteUrlPersonalizado) {
    return <img src={cfg.estandarteUrlPersonalizado} alt="Estandarte" className={`${className} object-contain rounded-xl bg-slate-900 border border-cyan-500/50 p-0.5 shadow`} />;
  }
  if (cfg.logoUrlPersonalizado) {
    return <img src={cfg.logoUrlPersonalizado} alt="Logo" className={`${className} object-contain rounded-xl bg-slate-900 border border-cyan-500/50 p-0.5 shadow`} />;
  }

  return (
    <div className={`flex items-center justify-center p-1 bg-slate-900/90 rounded-xl border border-cyan-400 shadow-lg ${className}`} title="TPMN - CTP Mercedes Norte">
      <img src="/rosa-vientos-tpmn.svg" alt="Rosa de los Vientos TPMN" className="w-full h-full object-contain drop-shadow" />
    </div>
  );
}

export function EscudoOficialMep({ className = "w-10 h-10" }) {
  return <LogoOficialMep2026 className={className} />;
}

export function EscudoInstitucionalPersonalizado({ className = "w-10 h-10" }) {
  return <EscudoCtpMercedesNorte className={className} />;
}