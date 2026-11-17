import React from 'react';

export default function HeroGamificadoMep({
  usuarioActual,
  xpActual = 350,
  rachaDias = 8,
  busquedaGlobal,
  setBusquedaGlobal,
  onNavegarAccion
}) {
  const accionesRapidas = [
    {
      id: 'cosevi',
      titulo: '🚗 Teórica MOPT & Juego 2D',
      subtitulo: 'Simulacro COSEVI + Pista 2D (Moto, Carro y Tráiler)',
      destacado: true
    },
    {
      id: 'idiomas',
      titulo: '🗣️ Idiomas (Inglés / Francés)',
      subtitulo: 'Technical English UTN, Conversacional MEP y B1/B2',
      destacado: false
    },
    {
      id: 'universidades',
      titulo: '🎓 Admisión Universitaria',
      subtitulo: 'UCR, TEC, UNA, UTN y UNED (20, 30, 40 y 60 ítems)',
      destacado: false
    },
    {
      id: 'materias',
      titulo: '🔬 Prácticas por Materia',
      subtitulo: 'Sociales, Ciencias, Química, Biología, Mate, Deportes',
      destacado: false
    },
    {
      id: 'modalidades',
      titulo: '🏫 Ingreso y Modalidades MEP',
      subtitulo: 'CTP Diurno, Nocturno, Académico, CINDEA, IPEC y Primaria',
      destacado: false
    },
    {
      id: 'ctp_gestion',
      titulo: '🛠️ Especialidades CTP & Gestión',
      subtitulo: 'Web, Ciberseguridad, Contabilidad + Horarios y Tardías',
      destacado: false
    }
  ];

  const porcentajeMeta = Math.min(100, Math.round((xpActual / 500) * 100));

  return (
    <div className="bg-gradient-to-b from-slate-900 via-[#071426] to-slate-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Barra Superior de Búsqueda Global y Racha de XP */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={busquedaGlobal}
            onChange={(e) => setBusquedaGlobal(e.target.value)}
            placeholder="🔍 Buscar materia, idioma, simulacro UCR/TEC, horario o trámite..."
            className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-cyan-400 rounded-full px-5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none shadow-inner"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-full flex items-center gap-3 text-xs font-extrabold shadow">
            <span className="text-amber-400 flex items-center gap-1">
              🔥 {rachaDias} días
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 flex items-center gap-1">
              ⚡ {xpActual} XP
            </span>
          </div>
        </div>
      </div>

      {/* Tarjeta Central de Meta Diaria y Racha */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl">
            🚀
          </div>
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              ¡Hola, {usuarioActual?.nombre || 'Ing. Max Salazar Sánchez'}!
            </h3>
            <p className="text-xs text-slate-400">
              Meta diaria: {xpActual}/500 XP · Especialidades CTP, Académicas & Admisión
            </p>
            <div className="w-full sm:w-64 h-2 bg-slate-950 rounded-full overflow-hidden mt-2 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${porcentajeMeta}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-950 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-amber-300 self-end sm:self-center">
          🔥 {rachaDias} días seguidos
        </div>
      </div>

      {/* Encabezado Principal Inspirador */}
      <div className="space-y-2 max-w-4xl">
        <p className="text-xs font-bold text-cyan-400">
          Mi avance por materia e historial SHA-256 →
        </p>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
          Práctica y simulacros para MEP, colegios técnicos, admisión universitaria y MOPT en Costa Rica
        </h1>
        <p className="text-xs sm:text-sm font-bold text-emerald-400">
          Repase. Practique. Prepárese. · Plataforma costarricense de aprendizaje y gestión educativa (v27.5 Fusión Total).
        </p>
      </div>

      {/* Sección "¿Qué desea hacer hoy?" con los 6 Grandes Botones Interactivos */}
      <div className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-extrabold text-white">
          ¿Qué desea hacer hoy?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {accionesRapidas.map((acc) => (
            <button
              key={acc.id}
              onClick={() => onNavegarAccion && onNavegarAccion(acc.id)}
              className={`text-left p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between group ${
                acc.destacado
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 border-sky-300 text-white shadow-lg shadow-blue-500/25 hover:scale-[1.01]'
                  : 'bg-slate-950/85 hover:bg-slate-900 border-slate-800 hover:border-cyan-500/60 text-slate-100 hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-sm sm:text-base font-extrabold">{acc.titulo}</span>
                <span className="text-xs opacity-75 group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className={`text-[11px] mt-1.5 ${acc.destacado ? 'text-blue-100' : 'text-slate-400'}`}>
                {acc.subtitulo}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}