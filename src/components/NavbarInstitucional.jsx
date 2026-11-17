import React from 'react';

export default function NavbarInstitucional({ usuarioActual, seccionActiva, onCambiarSeccion }) {
  const itemsMenu = [
    { id: 'inicio', label: '🏠 Inicio & Todo el Ecosistema' },
    { id: 'materias', label: '🔬 Materias (Sociales, Ciencias, Química, Deportes)' },
    { id: 'gestion', label: '📋 Horarios, Tardías, Ausencias y Docente/Admin' },
    { id: 'simuladores', label: '🎓 Simulacros UCR / TEC / UTN / COSEVI' },
    { id: 'ia', label: '🤖 Asistente IA' },
    { id: 'chats', label: '💬 Chats' },
    { id: 'carnet', label: '🪪 Carné QR' },
    { id: 'admin', label: '🔐 SuperAdmin' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div
          onClick={() => onCambiarSeccion('inicio')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            🦉
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white">
                prac<span className="text-cyan-400">TICA</span>tecnica<span className="text-cyan-400">.com</span>
              </span>
              <span className="text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-600 px-2 py-0.5 rounded-full">
                v27.0 GOD-LEVEL
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              CTP Mercedes Norte • Materias MEP, Horarios, Justificaciones & Simulacros Universitarios
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-600/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            En Línea
          </span>

          <div
            onClick={() => onCambiarSeccion('login')}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl cursor-pointer transition-all text-right"
          >
            <p className="text-xs font-bold text-white leading-tight">{usuarioActual?.nombre}</p>
            <p className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider">{usuarioActual?.rol}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/90 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 overflow-x-auto">
          {itemsMenu.map((item) => {
            const activo = seccionActiva === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onCambiarSeccion(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activo
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}