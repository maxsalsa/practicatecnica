import React, { useState } from 'react';
import ExamSimulatorHub from './components/simulator/ExamSimulatorHub.jsx';
import AnnouncementsBroadcastPanel from './components/institution/AnnouncementsBroadcastPanel.jsx';
import { SchedulesModule, CafeteriaModule, PermissionsModule } from './components/institution/InstitutionOperationsSuite.jsx';
import { SchedulePanel } from './components/institution/SchedulePanel.jsx';
import { SchoolServicesPanel } from './components/institution/SchoolServicesPanel.jsx';

const KPI_METRICS = [
  { label: 'Simulacros Práctica Técnica', value: 'MEP · CTP · MOPT · U', delta: 'Motor Interactivo Activo', tone: 'text-indigo-600' },
  { label: 'Horarios y Laboratorios', value: 'Bloques + Matriz MEP', delta: 'Exportación Excel CSV', tone: 'text-indigo-600' },
  { label: 'Comedor y Asistencia', value: 'Aforo + Servicios', delta: 'Descarga CSV UTF-8', tone: 'text-emerald-600' },
  { label: 'Permisos y Avisos', value: '100% Offline-First', delta: 'Sincronizado con Lovable', tone: 'text-emerald-600' }
];

const NAVIGATION_TABS = [
  { id: 'simulacros', label: '1. Simulacros Práctica Técnica' },
  { id: 'avisos', label: '2. Avisos Oficiales' },
  { id: 'horarios', label: '3. Horarios (+Excel)' },
  { id: 'comedor', label: '4. Comedor y Asistencia (+Excel)' },
  { id: 'permisos', label: '5. Permisos (+Excel)' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('simulacros');
  const [institutionId] = useState('ctp-mercedes-norte');

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
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold tracking-tight">
                    practicatecnica.com
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30">
                    Suite Completa Activa
                  </span>
                </div>
                <p className="text-xs text-indigo-100 mt-0.5">
                  Simulacros MEP · CTP · MOPT · Admisión U + Gestión Institucional con Reportes Excel
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 bg-white/15 p-1.5 rounded-xl backdrop-blur">
              {NAVIGATION_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={'px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer ' + (
                    activeTab === tab.id
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-white hover:bg-white/10'
                  )}
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
                <p className="text-xl font-black text-slate-800 mt-1">
                  {kpi.value}
                </p>
                <p className={'text-xs font-semibold mt-2 ' + kpi.tone}>
                  {kpi.delta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 -mt-16 pb-16 flex-1 space-y-6">
        {activeTab === 'simulacros' && <ExamSimulatorHub />}
        {activeTab === 'avisos' && <AnnouncementsBroadcastPanel />}
        {activeTab === 'horarios' && (
          <div className="space-y-6">
            <SchedulesModule />
            <div className="argon-card p-6">
              <SchedulePanel institutionId={institutionId} kind="ctp" canEdit={true} />
            </div>
          </div>
        )}
        {activeTab === 'comedor' && (
          <div className="space-y-6">
            <CafeteriaModule />
            <div className="argon-card p-6">
              <SchoolServicesPanel institutionId={institutionId} mode="comedor" />
            </div>
          </div>
        )}
        {activeTab === 'permisos' && <PermissionsModule />}
      </main>

      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200/60 bg-white">
        practicatecnica.com © 2026 · Sincronizado desde C:\pt26xd hacia GitHub y Lovable
      </footer>
    </div>
  );
}
