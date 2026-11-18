import React from 'react';
import { obtenerConfigInstitucion } from './ConfiguracionInstitucionalModal';

export function LogoOficialMep2026({ className = "h-9" }) {
  return (
    <div className={`flex items-center gap-2.5 bg-[#111c33] px-3 py-1.5 rounded-xl border border-amber-400/40 shadow-md ${className}`}>
      <img src="/logo-mep-oficial.svg" alt="Logotipo Oficial MEP 2026" className="h-8 w-auto object-contain" />
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
    <div className={`flex items-center justify-center ${className}`}>
      <img src="/escudo-ctp-mercedes.svg" alt="Escudo CTP Mercedes Norte" className="w-full h-full object-contain rounded-xl shadow" />
    </div>
  );
}

export function EscudoOficialMep({ className = "w-10 h-10" }) {
  return <LogoOficialMep2026 className={className} />;
}

export function EscudoInstitucionalPersonalizado({ className = "w-10 h-10" }) {
  return <EscudoCtpMercedesNorte className={className} />;
}