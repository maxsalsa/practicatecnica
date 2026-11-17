import React, { useState } from 'react';
import AnnouncementsBroadcastPanel from './components/institution/AnnouncementsBroadcastPanel.jsx';
import { SchedulesModule, CafeteriaModule, PermissionsModule } from './components/institution/InstitutionOperationsSuite.jsx';

const KPI_METRICS = [
  { label: 'Horarios y Bloques', value: '42 Activos', delta: '10°, 11° y 12° Técnico', tone: 'text-indigo-600' },
  { label: 'Servicio de Comedor', value: '524 Platos', delta: '98% Asistencia Becados', tone: 'text-emerald-600' },
  { label: 'Permisos y Boletas', value: '100% Digital', delta: 'Control en Tiempo Real', tone: 'text-amber-600' },
  { label: 'Motor Offline-First', value: 'Activo', delta: 'Sincronizado en GitHub', tone: 'text-emerald-600' }
];

const TABS = [
  { id: 'avisos', label: '1. Avisos Oficiales' },
  { id: 'horarios', label: '2. Horarios y Labs' },
  { id: 'comedor', label: '3. Comedor Estudiantil' },
  { id: 'permisos', label: '4. Permisos y Salidas' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('avisos');

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fe]">
      <header className="argon-header-gradient pb-28 pt-8 px-4 sm:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-white text-indigo-600 font-black flex items-center justify-center shadow-md text-lg">
                PT
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">
                  Práctica Técnica CR · Suite Institucional Argon
                </h1>
                <p className="text-xs text-indigo-100">
                  Avisos · Horarios · Comedor · Permisos · Edición PWA Offline-First 2026
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 bg-white/15 p-1.5 rounded-xl backdrop-blur">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
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
        {activeTab === 'avisos' && <AnnouncementsBroadcastPanel />}
        {activeTab === 'horarios' && <SchedulesModule />}
        {activeTab === 'comedor' && <CafeteriaModule />}
        {activeTab === 'permisos' && <PermissionsModule />}
      </main>

      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200/60 bg-white">
        Práctica Técnica CR © 2026 · Suite Institucional Argon en JavaScript (.jsx) · Cero Créditos Lovable
      </footer>
    </div>
  );
}
