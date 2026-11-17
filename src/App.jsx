import React from 'react';
import AnnouncementsBroadcastPanel from './components/institution/AnnouncementsBroadcastPanel.jsx';

const KPI_METRICS = [
  { label: 'Reactivos Activos', value: '2,480', delta: '+14% este mes', tone: 'text-emerald-600' },
  { label: 'Estudiantes Conectados', value: '1,294', delta: '99.8% Offline Ready', tone: 'text-indigo-600' },
  { label: 'Simulacros Completados', value: '8,920', delta: '+310 hoy', tone: 'text-emerald-600' },
  { label: 'Rendimiento PWA', value: '98 / 100', delta: 'Latencia menor a 40ms', tone: 'text-amber-600' }
];

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fe]">
      <header className="argon-header-gradient pb-28 pt-8 px-4 sm:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/15">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white text-indigo-600 font-black flex items-center justify-center shadow-md">
                PT
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">
                  Práctica Técnica CR · Argon Workspace
                </h1>
                <p className="text-xs text-indigo-100">
                  Entorno Educativo PWA Offline-First · Edición 2026
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur text-xs font-semibold">
              Estado: Sincronizado con GitHub
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {KPI_METRICS.map((kpi, idx) => (
              <div key={idx} className="argon-card p-5 text-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {kpi.label}
                </p>
                <p className="text-2xl font-black text-slate-800 mt-1">
                  {kpi.value}
                </p>
                <p className={`text-xs font-semibold mt-2 ${kpi.tone}`}>
                  {kpi.delta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 -mt-16 pb-16 flex-1">
        <AnnouncementsBroadcastPanel />
      </main>

      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200/60 bg-white">
        Práctica Técnica CR © 2026 · Arquitectura Argon en JavaScript (.jsx)
      </footer>
    </div>
  );
}
