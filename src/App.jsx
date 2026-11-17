import React, { useState } from 'react';
import NavbarInstitucional from './components/NavbarInstitucional';
import ChatInstitucional from './components/ChatInstitucional';
import CarnetEstudiantilQr from './components/CarnetEstudiantilQr';
import PanelSuperAdmin from './components/PanelSuperAdmin';
import LoginGoogleAuth from './components/LoginGoogleAuth';
import PasarelaSinpeModal from './components/PasarelaSinpeModal';

export default function App() {
  const [usuarioActual, setUsuarioActual] = useState({
    nombre: 'Ing. Max Salazar Sánchez',
    correo: 'maxi.salsa@gmail.com',
    rol: 'SuperAdmin',
    seccion: 'Administración Global'
  });
  
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [mostrarSinpe, setMostrarSinpe] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Navbar Institucional */}
      <NavbarInstitucional 
        usuarioActual={usuarioActual} 
        onCambiarSeccion={(id) => {
          if (id === 'login') setMostrarLogin(true);
          else if (id === 'sinpe') setMostrarSinpe(true);
          else setSeccionActiva(id);
        }} 
      />

      {/* Contenido Dinámico Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Barra de Accesos Rápidos SuperAdmin / SINPE */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap justify-between items-center gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-cyan-400 font-bold">● Sesión Activa:</span>
            <span className="text-white font-semibold">{usuarioActual.nombre} ({usuarioActual.correo})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMostrarSinpe(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded-lg text-xs transition-all shadow flex items-center gap-1.5"
            >
              <span>📱</span> Aporte / SINPE (6090-6359)
            </button>
            <button
              onClick={() => setMostrarLogin(true)}
              className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold px-4 py-1.5 rounded-lg text-xs transition-all border border-slate-700 flex items-center gap-1.5"
            >
              <span>🌐</span> Cambiar / Google Login
            </button>
          </div>
        </div>

        {seccionActiva === 'inicio' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 p-8 rounded-2xl border border-cyan-500/30 shadow-2xl">
              <h2 className="text-3xl font-extrabold text-white mb-2">
                🦉 Ecosistema Soberano <span className="text-cyan-400">Práctica Técnica</span>
              </h2>
              <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
                Plataforma industrial para el <span className="text-white font-semibold">CTP Mercedes Norte</span> y el MEP. Arquitectura Offline-First, cifrado SHA-256, pasarela SINPE Móvil y soporte oficial en tiempo real.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button 
                  onClick={() => setSeccionActiva('carnet')}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl shadow transition-all text-sm"
                >
                  🪪 Mi Carné Digital QR
                </button>
                <button 
                  onClick={() => setSeccionActiva('chats')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-xl shadow transition-all text-sm border border-slate-700"
                >
                  💬 Canales Institucionales
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
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-bold text-lg text-white mb-1">SINPE Móvil 6090-6359</h3>
                <p className="text-xs text-slate-400">Pasarela directa a nombre de Max Salazar Sánchez (Banco Popular) con enlace a WhatsApp.</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="font-bold text-lg text-white mb-1">Google OAuth & SHA-256</h3>
                <p className="text-xs text-slate-400">Autenticación segura con cuentas institucionales y protección estricta Ley 8968.</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-bold text-lg text-white mb-1">Manuales y Recursos PDF</h3>
                <p className="text-xs text-slate-400">Documentación completa para docentes, estudiantes, padres de familia y administración.</p>
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'simuladores' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl text-center py-12 space-y-4">
            <span className="text-5xl">💻</span>
            <h3 className="text-2xl font-bold text-white">Banco de Simuladores Técnicos</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Pruebas interactivas de Excel, Word y Redes CCNA operando sin interrupciones.</p>
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

      {/* Modales Globales */}
      {mostrarSinpe && (
        <PasarelaSinpeModal onClose={() => setMostrarSinpe(false)} />
      )}

      {mostrarLogin && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-md">
            <button 
              onClick={() => setMostrarLogin(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white font-bold z-10 text-sm"
            >
              ✕
            </button>
            <LoginGoogleAuth onLoginExitoso={(usr) => { setUsuarioActual(usr); setMostrarLogin(false); }} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>© 2026 Práctica Técnica — Desarrollado por GICM & BDS Devs S.A.</p>
        <p>Soporte Oficial WhatsApp: +506 6090-6359 | Ing. Max Salazar Sánchez</p>
      </footer>

    </div>
  );
}