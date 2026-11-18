import React from 'react';
import { obtenerConfigInstitucion } from './ConfiguracionInstitucionalModal';

// Logo oficial del Ministerio de Educación Pública 2026 (Gobierno de Costa Rica)
export function LogoOficialMep2026({ className = "h-9" }) {
  return (
    <div className={`flex items-center gap-2.5 bg-[#111c33] px-3 py-1.5 rounded-xl border border-amber-400/40 shadow-md ${className}`}>
      <div className="w-7 h-7 bg-[#0b1324] border border-amber-400 rounded flex items-center justify-center shrink-0 shadow-inner">
        <svg viewBox="0 0 40 40" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8 Q16 12, 14 18 T22 28 Q26 32, 24 35 Q18 32, 15 28 T10 18 Z" fill="#d4af37" />
          <circle cx="8" cy="32" r="1.5" fill="#d4af37" />
        </svg>
      </div>
      <div className="flex flex-col text-left leading-tight">
        <span className="text-[10px] font-bold tracking-wider text-white uppercase" style={{ fontFamily: 'Georgia, serif' }}>
          MINISTERIO
        </span>
        <span className="text-[9px] font-semibold text-slate-200 uppercase tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          DE EDUCACIÓN PÚBLICA
        </span>
        <span className="text-[7px] text-amber-300 font-mono tracking-tighter">
          GOBIERNO DE COSTA RICA
        </span>
      </div>
    </div>
  );
}

// Aliases requeridos por otros componentes del sistema
export function EscudoOficialMep({ className = "w-10 h-10" }) {
  return <LogoOficialMep2026 className={className} />;
}

export function EscudoCtpMercedesNorte({ className = "w-10 h-10" }) {
  return <EscudoInstitucionalPersonalizado className={className} />;
}

// Componente personalizable whitelabel (Soporta Logo, Estandarte y Mascota)
export function EscudoInstitucionalPersonalizado({ className = "w-10 h-10" }) {
  const cfg = obtenerConfigInstitucion();
  
  if (cfg.estandarteUrlPersonalizado) {
    return (
      <img 
        src={cfg.estandarteUrlPersonalizado} 
        alt="Estandarte Institucional" 
        className={`${className} object-contain rounded-xl bg-slate-900 border border-cyan-500/50 p-0.5 shadow`} 
      />
    );
  }

  if (cfg.logoUrlPersonalizado) {
    return (
      <img 
        src={cfg.logoUrlPersonalizado} 
        alt="Logo Institucional" 
        className={`${className} object-contain rounded-xl bg-slate-900 border border-cyan-500/50 p-0.5 shadow`} 
      />
    );
  }

  return (
    <div className={`${className} rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 border border-cyan-400 flex items-center justify-center text-cyan-300 font-black text-xs shadow`}>
      CTP
    </div>
  );
}