import React from 'react';
import { obtenerConfigInstitucion } from './ConfiguracionInstitucionalModal';

export function LogoOficialMep2026({ className = "h-9" }) {
  const cfg = obtenerConfigInstitucion();
  if (cfg.mepLogoPersonalizado) {
    return <img src={cfg.mepLogoPersonalizado} alt="Logotipo Oficial MEP" className={`${className} object-contain rounded-xl shadow`} />;
  }
  return (
    <div className={`flex items-center shrink-0 ${className}`}>
      <img src="/logo-mep-oficial.svg" alt="Ministerio de Educación Pública - Gobierno de Costa Rica" className="h-full w-auto object-contain rounded-xl shadow-md border border-amber-400/30" />
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
    <div className={`flex items-center justify-center p-1 bg-slate-900/90 rounded-xl border border-rose-500/60 shadow-lg ${className}`} title="TPMN - CTP Mercedes Norte">
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