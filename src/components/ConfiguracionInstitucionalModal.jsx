import React, { useState } from 'react';

const CLAVE_CONFIG_INSTITUCION = 'pt_config_institucion_whitelabel_v43';

export function obtenerConfigInstitucion() {
  try {
    const guardado = localStorage.getItem(CLAVE_CONFIG_INSTITUCION);
    if (guardado) return JSON.parse(guardado);
  } catch (e) {}
  return {
    nombreInstitucion: 'CTP Mercedes Norte',
    subtituloInstitucion: 'Educación Técnica Profesional y Académica',
    regionMep: 'Dirección Regional de Heredia',
    circuitoMep: 'Circuito 04',
    provincia: 'Heredia',
    contactoTelefono: '+506 2261-0000',
    correoInstitucional: 'ctp.mercedesnorte@mep.go.cr',
    mepLogoPersonalizado: '',        // 1. Logotipo oficial del MEP
    logoUrlPersonalizado: '',        // 2. Logo oficial de la institución
    estandarteUrlPersonalizado: '',  // 3. Estandarte / Escudo
    mascotaUrlPersonalizado: ''      // 4. Mascota oficial
  };
}

export default function ConfiguracionInstitucionalModal({ onClose, onGuardar }) {
  const [config, setConfig] = useState(obtenerConfigInstitucion);
  const [mensajeGuardado, setMensajeGuardado] = useState(false);

  const guardarCambios = (e) => {
    e.preventDefault();
    localStorage.setItem(CLAVE_CONFIG_INSTITUCION, JSON.stringify(config));
    setMensajeGuardado(true);
    setTimeout(() => {
      setMensajeGuardado(false);
      if (onGuardar) onGuardar(config);
      if (onClose) onClose();
      window.location.reload();
    }, 700);
  };

  const manejarSubidaArchivo = (e, campo) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig((prev) => ({ ...prev, [campo]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const limpiarActivo = (campo) => {
    setConfig((prev) => ({ ...prev, [campo]: '' }));
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-slate-900 border-2 border-cyan-500 rounded-3xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl space-y-4 text-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase bg-amber-950 text-amber-300 border border-amber-600 px-2.5 py-0.5 rounded">
              🏢 Plan Anual Institucional • 4 Casillas de Subida Independientes 1 a 1
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
              Configuración de Logotipo MEP, Escudos y Datos Institucionales
            </h3>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white font-extrabold px-3 py-1 rounded-xl text-xs"
          >
            ✕ Cerrar
          </button>
        </div>

        {mensajeGuardado ? (
          <div className="bg-emerald-950/90 border-2 border-emerald-500 p-6 rounded-2xl text-center space-y-2">
            <span className="text-3xl">✅</span>
            <h4 className="text-base font-extrabold text-white">¡Identidad Institucional Actualizada con Éxito!</h4>
            <p className="text-xs text-emerald-200">Los emblemas subidos ya están vigentes en toda la plataforma.</p>
          </div>
        ) : (
          <form onSubmit={guardarCambios} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Nombre Oficial del Centro Educativo:</label>
                <input
                  type="text"
                  value={config.nombreInstitucion}
                  onChange={(e) => setConfig({ ...config, nombreInstitucion: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-semibold"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Dirección Regional MEP:</label>
                <input
                  type="text"
                  value={config.regionMep}
                  onChange={(e) => setConfig({ ...config, regionMep: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Circuito Escolar:</label>
                <input
                  type="text"
                  value={config.circuitoMep}
                  onChange={(e) => setConfig({ ...config, circuitoMep: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Correo Institucional:</label>
                <input
                  type="email"
                  value={config.correoInstitucional}
                  onChange={(e) => setConfig({ ...config, correoInstitucional: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Teléfono:</label>
                <input
                  type="text"
                  value={config.contactoTelefono}
                  onChange={(e) => setConfig({ ...config, contactoTelefono: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            {/* Las 4 Casillas de Subida 1 a 1 */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800">
              <label className="block font-bold text-cyan-300 text-sm">
                📁 Subida y Cambio Individual 1 a 1 de los 4 Activos Gráficos:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* 1. Logotipo Oficial MEP */}
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-2 text-center">
                  <p className="font-extrabold text-[11px] text-amber-300">1. Logotipo Oficial MEP</p>
                  <div className="w-16 h-16 bg-slate-900 mx-auto rounded-xl flex items-center justify-center border border-slate-700 overflow-hidden shadow-inner">
                    {config.mepLogoPersonalizado ? (
                      <img src={config.mepLogoPersonalizado} className="w-full h-full object-contain" />
                    ) : (
                      <img src="/logo-mep-oficial.svg" className="w-full h-full object-contain" />
                    )}
                  </div>
                  <div className="flex gap-1">
                    <input type="file" accept="image/*" onChange={(e) => manejarSubidaArchivo(e, 'mepLogoPersonalizado')} className="text-[9px] text-slate-400 file:w-full file:py-1 file:px-2 file:rounded file:border-0 file:text-[9px] file:font-bold file:bg-cyan-600 file:text-white cursor-pointer" />
                    {config.mepLogoPersonalizado && (
                      <button type="button" onClick={() => limpiarActivo('mepLogoPersonalizado')} className="bg-rose-800 text-white text-[10px] px-2 rounded">✕</button>
                    )}
                  </div>
                </div>

                {/* 2. Logo Institucional */}
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-2 text-center">
                  <p className="font-extrabold text-[11px] text-cyan-300">2. Logo Institucional</p>
                  <div className="w-16 h-16 bg-slate-900 mx-auto rounded-xl flex items-center justify-center border border-slate-700 overflow-hidden shadow-inner">
                    {config.logoUrlPersonalizado ? (
                      <img src={config.logoUrlPersonalizado} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-2xl">🏫</span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <input type="file" accept="image/*" onChange={(e) => manejarSubidaArchivo(e, 'logoUrlPersonalizado')} className="text-[9px] text-slate-400 file:w-full file:py-1 file:px-2 file:rounded file:border-0 file:text-[9px] file:font-bold file:bg-blue-600 file:text-white cursor-pointer" />
                    {config.logoUrlPersonalizado && (
                      <button type="button" onClick={() => limpiarActivo('logoUrlPersonalizado')} className="bg-rose-800 text-white text-[10px] px-2 rounded">✕</button>
                    )}
                  </div>
                </div>

                {/* 3. Estandarte / Escudo */}
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-2 text-center">
                  <p className="font-extrabold text-[11px] text-emerald-300">3. Estandarte / Escudo</p>
                  <div className="w-16 h-16 bg-slate-900 mx-auto rounded-xl flex items-center justify-center border border-slate-700 overflow-hidden shadow-inner">
                    {config.estandarteUrlPersonalizado ? (
                      <img src={config.estandarteUrlPersonalizado} className="w-full h-full object-contain" />
                    ) : (
                      <img src="/rosa-vientos-tpmn.svg" className="w-full h-full object-contain" />
                    )}
                  </div>
                  <div className="flex gap-1">
                    <input type="file" accept="image/*" onChange={(e) => manejarSubidaArchivo(e, 'estandarteUrlPersonalizado')} className="text-[9px] text-slate-400 file:w-full file:py-1 file:px-2 file:rounded file:border-0 file:text-[9px] file:font-bold file:bg-emerald-600 file:text-white cursor-pointer" />
                    {config.estandarteUrlPersonalizado && (
                      <button type="button" onClick={() => limpiarActivo('estandarteUrlPersonalizado')} className="bg-rose-800 text-white text-[10px] px-2 rounded">✕</button>
                    )}
                  </div>
                </div>

                {/* 4. Mascota Oficial */}
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-2 text-center">
                  <p className="font-extrabold text-[11px] text-purple-300">4. Mascota Oficial</p>
                  <div className="w-16 h-16 bg-slate-900 mx-auto rounded-xl flex items-center justify-center border border-slate-700 overflow-hidden shadow-inner">
                    {config.mascotaUrlPersonalizado ? (
                      <img src={config.mascotaUrlPersonalizado} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-2xl">🦉</span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <input type="file" accept="image/*" onChange={(e) => manejarSubidaArchivo(e, 'mascotaUrlPersonalizado')} className="text-[9px] text-slate-400 file:w-full file:py-1 file:px-2 file:rounded file:border-0 file:text-[9px] file:font-bold file:bg-purple-600 file:text-white cursor-pointer" />
                    {config.mascotaUrlPersonalizado && (
                      <button type="button" onClick={() => limpiarActivo('mascotaUrlPersonalizado')} className="bg-rose-800 text-white text-[10px] px-2 rounded">✕</button>
                    )}
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 rounded-xl text-xs shadow-lg transition-all"
              >
                💾 Guardar e Institucionalizar Cambios
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}