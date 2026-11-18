import React from 'react';
import { EscudoOficialMep, EscudoCtpMercedesNorte } from './LogosOficialesMepCtp';

export default function NavbarInstitucional({ usuarioActual, seccionActiva, onCambiarSeccion }) {
  const itemsMenu = [
    { id: 'inicio', icono: '🏠', label: 'Inicio' },
    { id: 'gestion', icono: '🏛️', label: 'Dirección, Permisos y Calificaciones' },
    { id: 'arcade32', icono: '🎮', label: '32 Juegos Educativos' },
    { id: 'materias', icono: '🔬', label: 'Especialidades y Materias' },
    { id: 'ofimatica', icono: '🧪', label: 'Simuladores Excel / Word / Circuitos' },
    { id: 'simuladores', icono: '🎓', label: 'Exámenes (10 a 60 Ítems)' },
    { id: 'juegovial', icono: '🕹️', label: 'Simulador Vial 2D' },
    { id: 'biblioteca', icono: '📚', label: 'Programas MEP y Leyes' },
    { id: 'ia', icono: '🤖', label: 'Planeamientos e Instrumentos' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-2">
          <div
            onClick={() => onCambiarSeccion('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex items-center -space-x-1.5">
              <EscudoOficialMep className="w-10 h-10 drop-shadow-md transition-transform group-hover:scale-105" />
              <EscudoCtpMercedesNorte className="w-10 h-10 drop-shadow-md transition-transform group-hover:scale-105" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-white">
                  prac<span className="text-cyan-400">TICA</span>tecnica<span className="text-cyan-400">.com</span>
                </span>
                <span className="hidden md:inline-block text-[10px] font-extrabold bg-sky-950 text-sky-300 border border-sky-700 px-2.5 py-0.5 rounded-full">
                  MEP • CTP Mercedes Norte
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400">
                Ministerio de Educación Pública • Educación Técnica, Académica y Superior de Costa Rica
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-600/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Activo
            </span>

            <div
              onClick={() => onCambiarSeccion('login')}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-1 rounded-xl cursor-pointer text-right"
            >
              <p className="text-[11px] font-bold text-white leading-tight truncate max-w-[140px] sm:max-w-none">
                {usuarioActual?.nombre}
              </p>
              <p className="text-[9px] font-extrabold text-cyan-400 uppercase">{usuarioActual?.rol}</p>
            </div>
          </div>
        </div>

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

      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 grid grid-cols-5 py-1.5 px-1">
        {[
          { id: 'inicio', icono: '🏠', txt: 'Inicio' },
          { id: 'gestion', icono: '🏛️', txt: 'Dirección' },
          { id: 'arcade32', icono: '🎮', txt: '32 Juegos' },
          { id: 'simuladores', icono: '🎓', txt: 'Exámenes' },
          { id: 'ofimatica', icono: '🧪', txt: 'Labs' }
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