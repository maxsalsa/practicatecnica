import React, { useState } from 'react';
import NavbarInstitucional from './components/NavbarInstitucional';
import ChatInstitucional from './components/ChatInstitucional';
import CarnetEstudiantilQr from './components/CarnetEstudiantilQr';
import PanelSuperAdmin from './components/PanelSuperAdmin';

export default function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [usuarioActual] = useState({
    nombre: 'Ing. Max Salazar Sánchez',
    cedula: '2-0589-0412',
    rol: 'SuperAdmin',
    seccion: 'Administración Global'
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Barra de Navegación Responsiva */}
      <NavbarInstitucional 
        usuarioActual={usuarioActual} 
        onCambiarSeccion={(id) => setSeccionActiva(id)} 
      />

      {/* Contenido Principal Dinámico */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {seccionActiva === 'inicio' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 p-8 rounded-2xl border border-cyan-500/30 shadow-2xl">
              <h2 className="text-3xl font-extrabold text-white mb-2">
                🦉 Bienvenid@ al Ecosistema <span className="text-cyan-400">Práctica Técnica</span>
              </h2>
              <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
                Plataforma oficial de gestión institucional, académica y técnica inspirada en el <span className="text-white font-semibold">CTP Mercedes Norte</span>. Operando bajo arquitectura Offline-First, seguridad cifrada SHA-256 y cumplimiento estricto del REAC 2026 y Ley 8968.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button 
                  onClick={() => setSeccionActiva('carnet')}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl shadow transition-all text-sm"
                >
                  🪪 Ver Mi Carné Digital QR
                </button>
                <button 
                  onClick={() => setSeccionActiva('chats')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-xl shadow transition-all text-sm border border-slate-700"
                >
                  💬 Abrir Canales y Chats
                </button>
                <button 
                  onClick={() => setSeccionActiva('admin')}
                  className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold px-5 py-2.5 rounded-xl shadow transition-all text-sm border border-slate-700"
                >
                  🔐 Panel SuperAdmin
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-3xl mb-3">💻</div>
                <h3 className="font-bold text-lg text-white mb-1">Simuladores Técnicos</h3>
                <p className="text-xs text-slate-400">Pruebas interactivas para Excel, Word y Redes CCNA alineadas con las especialidades del CTP.</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="font-bold text-lg text-white mb-1">Seguridad y RBAC</h3>
                <p className="text-xs text-slate-400">Control estricto de roles con auditoría SHA-256 y protección de datos bajo la Ley 8968.</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold text-lg text-white mb-1">Modo Offline-First</h3>
                <p className="text-xs text-slate-400">Sincronización local en IndexedDB para garantizar operación continua sin conexión a internet.</p>
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'simuladores' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl text-center py-12 space-y-4">
            <span className="text-5xl">💻</span>
            <h3 className="text-2xl font-bold text-white">Módulo de Simuladores Técnicos</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Excel, Word y Cisco IOS listos para evaluar las competencias técnicas de los estudiantes.</p>
          </div>
        )}

        {seccionActiva === 'chats' && (
          <ChatInstitucional usuarioActual={usuarioActual} />
        )}

        {seccionActiva === 'carnet' && (
          <div className="py-4">
            <CarnetEstudiantilQr />
          </div>
        )}

        {seccionActiva === 'admin' && (
          <PanelSuperAdmin superAdminNombre={usuarioActual.nombre} />
        )}

      </main>

      {/* Pie de página institucional */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>© 2026 Práctica Técnica — Desarrollado por GICM & BDS Devs S.A.</p>
        <p>Institución Modelo: CTP Mercedes Norte, Alajuela, Costa Rica. Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}