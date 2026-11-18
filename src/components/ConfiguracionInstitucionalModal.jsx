import React, { useState } from 'react';

const CLAVE_CONFIG_INSTITUCION = 'pt_config_institucion_whitelabel_v32';

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
    colorPrimario: 'from-cyan-500 to-blue-700',
    logoUrlPersonalizado: '' // Si suben URL o imagen base64
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
      window.location.reload(); // Refrescar para aplicar cambios globales
    }, 800);
  };

  const manejarSubidaLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig((prev) => ({ ...prev, logoUrlPersonalizado: reader.result }));
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
              🏢 Plan Anual Institucional • Personalización Marca Blanca
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
              Configuración de Escudo, Logo e Identidad del Colegio
            </h3>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white font-extrabold px-3 py-1 rounded-xl text-xs transition-all"
          >
            ✕ Cerrar
          </button>
        </div>

        {mensajeGuardado ? (
          <div className="bg-emerald-950/90 border-2 border-emerald-500 p-6 rounded-2xl text-center space-y-2">
            <span className="text-3xl">✅</span>
            <h4 className="text-base font-extrabold text-white">¡Configuración Institucional Actualizada!</h4>
            <p className="text-xs text-emerald-200">Los escudos, nombres y reportes usarán la nueva identidad del colegio.</p>
          </div>
        ) : (
          <form onSubmit={guardarCambios} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Nombre Oficial del Centro Educativo (CTP / Liceo / Colegio):</label>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <label className="block font-bold text-slate-300 mb-1">Teléfono Oficial:</label>
                <input
                  type="text"
                  value={config.contactoTelefono}
                  onChange={(e) => setConfig({ ...config, contactoTelefono: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Subir Escudo / Logo del Colegio (Imagen PNG o JPG):</label>
              <div className="flex items-center gap-3 bg-slate-950 border border-dashed border-slate-700 p-3 rounded-xl">
                {config.logoUrlPersonalizado ? (
                  <img src={config.logoUrlPersonalizado} alt="Logo" className="w-12 h-12 object-contain rounded-lg bg-white p-1" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center text-xl">🏫</div>
                )}
                <div className="flex-1">
                  <input type="file" accept="image/*" onChange={manejarSubidaLogo} className="text-[11px] text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 rounded-xl text-xs shadow-lg transition-all"
              >
                💾 Guardar y Aplicar Identidad Institucional
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}