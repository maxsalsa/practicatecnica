import React from 'react';

export default function HeroGamificadoMep({
  usuarioActual,
  xpActual = 450,
  rachaDias = 9,
  busquedaGlobal,
  setBusquedaGlobal,
  onNavegarAccion,
  onAbrirModalPermiso
}) {
  const accionesRapidas = [
    {
      id: 'permiso_direccion',
      titulo: '👨‍🏫 Permiso / Tardía Personal → Dirección',
      subtitulo: 'Citas CCSS, marca de reloj, emergencias y licencias ante el Director(a)',
      colorEspecial: 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-300 text-white shadow-lg shadow-emerald-600/25'
    },
    {
      id: 'justificacion_estudiante',
      titulo: '🎓 Justificar Ausencia Estudiante → Profe',
      subtitulo: 'Enviar comprobante médico, tardía o reprogramación de prueba al docente',
      colorEspecial: 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-300 text-white shadow-lg shadow-cyan-600/25'
    },
    {
      id: 'ctp_gestion',
      titulo: '📊 Notas, Exportar CSV (PIAD / SEA) & Horarios',
      subtitulo: 'Planilla oficial de calificaciones exportable a Excel/PIAD/SEA y aprobación Dirección',
      colorEspecial: 'bg-gradient-to-r from-indigo-600 to-purple-700 border-indigo-300 text-white shadow-lg'
    },
    {
      id: 'universidades',
      titulo: '🏛️ Simulacros UCR, TEC, UNA, UTN y MEP',
      subtitulo: 'Exámenes de 10, 20, 30, 40 y 60 preguntas con nota al final y escala 800',
      colorEspecial: ''
    },
    {
      id: 'cosevi',
      titulo: '🚗 Teórica MOPT & Juego 2D Rotonda',
      subtitulo: 'Simulador vial interactivo (Moto, Carro y Tráiler) + 32 Juegos Educativos',
      colorEspecial: ''
    },
    {
      id: 'materias',
      titulo: '🔬 Especialidades CTP, Ciencias y Simuladores Office',
      subtitulo: 'Contabilidad Pura, Accounting, Diseño Digital, Excel, Word APA 7 y Circuitos',
      colorEspecial: ''
    }
  ];

  const porcentajeMeta = Math.min(100, Math.round((xpActual / 500) * 100));

  return (
    <div className="bg-gradient-to-b from-slate-900 via-[#071426] to-slate-950 border border-cyan-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
      {/* Buscador y Racha */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={busquedaGlobal}
            onChange={(e) => setBusquedaGlobal(e.target.value)}
            placeholder="🔍 Buscar permiso, tardía, materia, simulacro UCR/TEC, CSV PIAD/SEA..."
            className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-cyan-400 rounded-full px-5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none shadow-inner"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-full flex items-center gap-3 text-xs font-extrabold shadow">
            <span className="text-amber-400">🔥 {rachaDias} días</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400">⚡ {xpActual} XP</span>
          </div>
        </div>
      </div>

      {/* Bienvenida y Rol Activo */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-2xl">
            🦉
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                ¡Hola, {usuarioActual?.nombre || 'Ing. Max Salazar Sánchez'}!
              </h3>
              <span className="text-[10px] font-extrabold bg-cyan-950 text-cyan-300 border border-cyan-700 px-2 py-0.5 rounded-full">
                Rol Activo: {usuarioActual?.rol}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Acceso directo en 1 clic a Justificaciones, Permisos ante Dirección, Planillas CSV (SEA/PIAD) y Simulacros.
            </p>
            <div className="w-full sm:w-64 h-2 bg-slate-950 rounded-full overflow-hidden mt-2 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                style={{ width: `${porcentajeMeta}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 self-end sm:self-center">
          <button
            onClick={() => onAbrirModalPermiso && onAbrirModalPermiso('personal_direccion')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs shadow-lg"
          >
            ➕ Permiso Personal → Dirección
          </button>
          <button
            onClick={() => onAbrirModalPermiso && onAbrirModalPermiso('estudiante_docente')}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs shadow-lg"
          >
            ➕ Justificar Estudiante → Profe
          </button>
        </div>
      </div>

      {/* ¿Qué desea hacer hoy? */}
      <div className="space-y-3">
        <h2 className="text-base sm:text-lg font-extrabold text-white">
          ⚡ Acciones Rápidas (1-Clic para Directores, Docentes, Estudiantes y Familias):
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {accionesRapidas.map((acc) => (
            <button
              key={acc.id}
              onClick={() => {
                if (acc.id === 'permiso_direccion') onAbrirModalPermiso('personal_direccion');
                else if (acc.id === 'justificacion_estudiante') onAbrirModalPermiso('estudiante_docente');
                else if (onNavegarAccion) onNavegarAccion(acc.id);
              }}
              className={`text-left p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between group hover:scale-[1.01] ${
                acc.colorEspecial
                  ? acc.colorEspecial
                  : 'bg-slate-950/90 hover:bg-slate-900 border-slate-800 hover:border-cyan-500/60 text-slate-100'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-sm sm:text-base font-extrabold">{acc.titulo}</span>
                <span className="text-xs opacity-80 group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className={`text-[11px] mt-1.5 ${acc.colorEspecial ? 'text-white/90' : 'text-slate-400'}`}>
                {acc.subtitulo}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}