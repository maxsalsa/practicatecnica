import React from 'react';

export default function NavbarInstitucional({ usuarioActual, seccionActiva, onCambiarSeccion }) {
  const itemsMenu = [
    { id: 'inicio', icono: '🏠', label: 'Inicio' },
    { id: 'materias', icono: '🔬', label: 'Especialidades y Materias' },
    { id: 'simuladores', icono: '🎓', label: 'Exámenes (10 a 60 Ítems)' },
    { id: 'juegovial', icono: '🕹️', label: 'Juego Vial 2D (Rotonda)' },
    { id: 'gestion', icono: '📋', label: 'Horarios y Tardías' },
    { id: 'ia', icono: '🤖', label: 'Planes y Exámenes IA' },
    { id: 'carnet', icono: '🪪', label: 'Carné QR' },
    { id: 'admin', icono: '🔐', label: 'SuperAdmin & QA' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-2">
          <div
            onClick={() => onCambiarSeccion('inicio')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-lg shadow-lg">
              🦉
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-white">
                  prac<span className="text-cyan-400">TICA</span>tecnica<span className="text-cyan-400">.com</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-600 px-2 py-0.5 rounded-full">
                  v29.5 OFFLINE-FIRST
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400">
                CTP Mercedes Norte • Páginas Independientes & Caché Instantáneo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-600/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Offline-Ready
            </span>

            <div
              onClick={() => onCambiarSeccion('login')}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-xl cursor-pointer text-right"
            >
              <p className="text-[11px] font-bold text-white leading-tight truncate max-w-[130px] sm:max-w-none">
                {usuarioActual?.nombre}
              </p>
              <p className="text-[9px] font-extrabold text-cyan-400 uppercase">{usuarioActual?.rol}</p>
            </div>
          </div>
        </div>

        {/* Pestañas de Páginas Separadas */}
        <div className="bg-slate-900/95 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {itemsMenu.map((item) => {
              const activo = seccionActiva === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onCambiarSeccion(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activo
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{item.icono}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Barra Inferior Fija Mobile-First para Celulares */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 grid grid-cols-5 py-1.5 px-1">
        {[
          { id: 'inicio', icono: '🏠', txt: 'Inicio' },
          { id: 'materias', icono: '🔬', txt: 'Materias' },
          { id: 'simuladores', icono: '🎓', txt: 'Exámenes' },
          { id: 'juegovial', icono: '🕹️', txt: 'Juego 2D' },
          { id: 'gestion', icono: '📋', txt: 'Horarios' }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => onCambiarSeccion(m.id)}
            className={`flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-bold ${
              seccionActiva === m.id ? 'text-cyan-400 bg-slate-900' : 'text-slate-400'
            }`}
          >
            <span className="text-base">{m.icono}</span>
            <span>{m.txt}</span>
          </button>
        ))}
      </nav>
    </>
  );
}