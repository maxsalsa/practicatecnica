import React, { useState } from 'react';

const CLAVE_CONFIG_INSTITUCION = 'pt_config_institucion_whitelabel_v36';

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
    logoUrlPersonalizado: '',        // 1. Logo oficial
    estandarteUrlPersonalizado: '',  // 2. Escudo / Estandarte
    mascotaUrlPersonalizado: ''      // 3. Mascota oficial
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

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-slate-900 border-2 border-cyan-500 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 text-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase bg-amber-950 text-amber-300 border border-amber-600 px-2.5 py-0.5 rounded">
              🏢 Plan Anual Institucional • 3 Activos Gráficos (Logo, Estandarte y Mascota)
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
              Configuración de Identidad y Activos Institucionales
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
            <h4 className="text-base font-extrabold text-white">¡Identidad Institucional Actualizada!</h4>
            <p className="text-xs text-emerald-200">El logo, estandarte y datos aplicados ya están vigentes.</p>
          </div>
        ) : (
          <form onSubmit={guardarCambios} className="space-y-3.5 text-xs">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Dirección Regional MEP:</label>
                <input
                  type="text"
                  value={config.regionMep}
                  onChange={(e) => setConfig({ ...config, regionMep: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Circuito Escolar:</label>
                <input
                  type="text"
                  value={config.circuitoMep}
                  onChange={(e) => setConfig({ ...config, circuitoMep: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div className="space-y-2 pt-1 border-t border-slate-800">
              <label className="block font-bold text-cyan-300">Gestión de 3 Activos Gráficos Institucionales:</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1.5 text-center">
                  <p className="font-bold text-[11px] text-slate-200">1. Logo Oficial</p>
                  <div className="w-12 h-12 bg-slate-900 mx-auto rounded-lg flex items-center justify-center border border-slate-700 overflow-hidden">
                    {config.logoUrlPersonalizado ? <img src={config.logoUrlPersonalizado} className="w-full h-full object-contain" /> : '🏫'}
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => manejarSubidaArchivo(e, 'logoUrlPersonalizado')} className="text-[10px] text-slate-400 file:w-full file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-cyan-600 file:text-white cursor-pointer" />
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1.5 text-center">
                  <p className="font-bold text-[11px] text-slate-200">2. Estandarte / Escudo</p>
                  <div className="w-12 h-12 bg-slate-900 mx-auto rounded-lg flex items-center justify-center border border-slate-700 overflow-hidden">
                    {config.estandarteUrlPersonalizado ? <img src={config.estandarteUrlPersonalizado} className="w-full h-full object-contain" /> : '🛡️'}
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => manejarSubidaArchivo(e, 'estandarteUrlPersonalizado')} className="text-[10px] text-slate-400 file:w-full file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-emerald-600 file:text-white cursor-pointer" />
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1.5 text-center">
                  <p className="font-bold text-[11px] text-slate-200">3. Mascota Oficial</p>
                  <div className="w-12 h-12 bg-slate-900 mx-auto rounded-lg flex items-center justify-center border border-slate-700 overflow-hidden">
                    {config.mascotaUrlPersonalizado ? <img src={config.mascotaUrlPersonalizado} className="w-full h-full object-contain" /> : '🦉'}
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => manejarSubidaArchivo(e, 'mascotaUrlPersonalizado')} className="text-[10px] text-slate-400 file:w-full file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-purple-600 file:text-white cursor-pointer" />
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