import React, { useState } from 'react';
import { LogoOficialMep2026, EscudoInstitucionalPersonalizado } from './LogosOficialesMepCtp';
import { obtenerConfigInstitucion } from './ConfiguracionInstitucionalModal';

export default function NavbarInstitucional({ usuarioActual, seccionActiva, onCambiarSeccion, onAbrirConfigInstitucion }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cfg = obtenerConfigInstitucion();

  const itemsMenu = [
    { id: 'inicio', icono: '🏠', label: 'Inicio' },
    { id: 'gestion', icono: '🏛️', label: 'Dirección y Calificaciones' },
    { id: 'arcade32', icono: '🎮', label: '32 Juegos Educativos' },
    { id: 'materias', icono: '🔬', label: 'Especialidades y Materias' },
    { id: 'ofimatica', icono: '🧪', label: 'Simuladores Excel / Word / Circuitos' },
    { id: 'simuladores', icono: '🎓', label: 'Exámenes y Simulacros' },
    { id: 'juegovial', icono: '🕹️', label: 'Simulador Vial 2D' },
    { id: 'biblioteca', icono: '📚', label: 'Programas MEP y Leyes' },
    { id: 'ia', icono: '🤖', label: 'Instrumentos IA' }
  ];

  const seleccionarOpcion = (id) => {
    setMenuAbierto(false);
    if (onCambiarSeccion) onCambiarSeccion(id);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-2">
          
          <div
            onClick={() => seleccionarOpcion('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-2 shrink-0">
              <LogoOficialMep2026 className="h-9 transition-transform group-hover:scale-105" />
              <EscudoInstitucionalPersonalizado className="w-9 h-9 transition-transform group-hover:scale-105" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm sm:text-base font-black tracking-tight text-white">
                  prac<span className="text-cyan-400">TICA</span>tecnica<span className="text-cyan-400">.com</span>
                </span>
                <span className="text-[9px] font-extrabold bg-cyan-950 text-cyan-300 border border-cyan-700 px-2 py-0.5 rounded-full">
                  {cfg.nombreInstitucion}
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-400 truncate max-w-[180px] sm:max-w-none">
                {cfg.regionMep} • {cfg.circuitoMep}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onAbrirConfigInstitucion && (
              <button
                onClick={onAbrirConfigInstitucion}
                className="bg-amber-600/90 hover:bg-amber-500 text-white font-extrabold px-2.5 py-1.5 rounded-xl text-xs shadow transition-all flex items-center gap-1"
                title="Configurar Logotipos e Identidad Institucional"
              >
                <span>⚙️</span>
                <span className="hidden sm:inline">Institución</span>
              </button>
            )}

            <div
              onClick={() => seleccionarOpcion('login')}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-xl cursor-pointer text-right hidden xs:block"
            >
              <p className="text-[11px] font-bold text-white leading-tight truncate max-w-[110px] sm:max-w-none">
                {usuarioActual?.nombre}
              </p>
              <p className="text-[9px] font-extrabold text-cyan-400 uppercase">{usuarioActual?.rol}</p>
            </div>

            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="lg:hidden bg-slate-900 border border-slate-700 text-white p-2 rounded-xl text-lg font-bold"
              aria-label="Abrir menú"
            >
              {menuAbierto ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <div className="hidden lg:block bg-slate-900/95 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {itemsMenu.map((item) => {
              const activo = seccionActiva === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => seleccionarOpcion(item.id)}
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

        {menuAbierto && (
          <div className="lg:hidden bg-slate-950 border-t border-slate-800 p-3 space-y-1.5 shadow-2xl max-h-[75vh] overflow-y-auto">
            <p className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider px-2 pb-1">
              Menú Principal:
            </p>
            {itemsMenu.map((item) => {
              const activo = seccionActiva === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => seleccionarOpcion(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                    activo
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow'
                      : 'bg-slate-900/80 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-base">{item.icono}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 grid grid-cols-5 py-1.5 px-1 shadow-2xl">
        {[
          { id: 'inicio', icono: '🏠', txt: 'Inicio' },
          { id: 'gestion', icono: '🏛️', txt: 'Dirección' },
          { id: 'arcade32', icono: '🎮', txt: 'Juegos' },
          { id: 'simuladores', icono: '🎓', txt: 'Exámenes' },
          { id: 'ofimatica', icono: '🧪', txt: 'Labs' }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => seleccionarOpcion(m.id)}
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