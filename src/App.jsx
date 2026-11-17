import React, { useState } from 'react';
import NavbarInstitucional from './components/NavbarInstitucional';
import ChatInstitucional from './components/ChatInstitucional';
import CarnetEstudiantilQr from './components/CarnetEstudiantilQr';
import PanelSuperAdmin from './components/PanelSuperAdmin';
import LoginGoogleAuth from './components/LoginGoogleAuth';
import PasarelaSinpeModal from './components/PasarelaSinpeModal';
import SelectorInstitucionalModal from './components/SelectorInstitucionalModal';
import ReportePdfMep from './components/ReportePdfMep';
import GestorPushPwa from './components/GestorPushPwa';
import SelectorMultimedia from './components/SelectorMultimedia';
import PanelCampanaClara from './components/PanelCampanaClara';
import AsistenteIaGenerativo from './components/AsistenteIaGenerativo';
import SimuladorUniversitarioMep from './components/SimuladorUniversitarioMep';

export default function App() {
  const [usuarioActual, setUsuarioActual] = useState({
    nombre: 'Ing. Max Salazar Sánchez',
    correo: 'maxi.salsa@gmail.com',
    rol: 'SuperAdmin',
    seccion: 'Administración Global'
  });

  const [seccionActiva, setSeccionActiva] = useState('simuladores');
  const [mostrarSinpe, setMostrarSinpe] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const [contextoMep, setContextoMep] = useState({
    region: 'Dirección Regional de Alajuela',
    circuito: '04 (Incluye CTP Mercedes Norte)',
    modalidad: 'Colegios Técnicos Profesionales (CTP)'
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">

      <NavbarInstitucional
        usuarioActual={usuarioActual}
        onCambiarSeccion={(id) => {
          if (id === 'login') setMostrarLogin(true);
          else if (id === 'sinpe') setMostrarSinpe(true);
          else setSeccionActiva(id);
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:px-6 lg:px-8 space-y-6">

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap justify-between items-center gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-cyan-400 font-bold">🏛️ MEP & Admisión Universitaria:</span>
            <span className="text-slate-300">{contextoMep.region} | Circuito {contextoMep.circuito}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSeccionActiva('simuladores')}
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow"
            >
              🎓 Simulacros UCR / TEC / UNA / UTN
            </button>
            <button
              onClick={() => setMostrarSelector(true)}
              className="bg-cyan-700 hover:bg-cyan-600 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition-all shadow"
            >
              🏛️ Cambiar Región / Circuito
            </button>
            <button
              onClick={() => setMostrarSinpe(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow"
            >
              📱 SINPE (6090-6359)
            </button>
          </div>
        </div>

        {seccionActiva === 'inicio' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 p-8 rounded-2xl border border-cyan-500/30 shadow-2xl">
              <h2 className="text-3xl font-extrabold text-white mb-2">
                🦉 Ecosistema Soberano <span className="text-cyan-400">pracTICAtecnica.com</span>
              </h2>
              <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
                Plataforma integral para el <span className="text-white font-semibold">CTP Mercedes Norte</span>, pruebas del MEP, admisión universitaria (<span className="text-cyan-300 font-bold">UCR, TEC, UNA, UTN</span>) y teoría de manejo COSEVI con ítems infinitos.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setSeccionActiva('simuladores')}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 py-2.5 rounded-xl shadow transition-all text-sm"
                >
                  🎓 Simulacros UCR / TEC / UTN / MEP
                </button>
                <button
                  onClick={() => setSeccionActiva('ia')}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl shadow transition-all text-sm"
                >
                  🤖 Asistente IA Generativo
                </button>
                <button
                  onClick={() => setSeccionActiva('carnet')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-xl shadow transition-all text-sm border border-slate-700"
                >
                  🪪 Carné Digital QR
                </button>
                <button
                  onClick={() => setSeccionActiva('chats')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-xl shadow transition-all text-sm border border-slate-700"
                >
                  💬 Canales y Chats
                </button>
                <button
                  onClick={() => setSeccionActiva('multimedia')}
                  className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold px-5 py-2.5 rounded-xl shadow transition-all text-sm border border-slate-700"
                >
                  🖼️ Multimedia
                </button>
                <button
                  onClick={() => setSeccionActiva('reportes')}
                  className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold px-5 py-2.5 rounded-xl shadow transition-all text-sm border border-slate-700"
                >
                  📄 Informes PDF & Push
                </button>
                <button
                  onClick={() => setSeccionActiva('admin')}
                  className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold px-5 py-2.5 rounded-xl shadow transition-all text-sm border border-slate-700"
                >
                  🔐 Panel SuperAdmin
                </button>
              </div>
            </div>

            <SimuladorUniversitarioMep />
          </div>
        )}

        {seccionActiva === 'simuladores' && (
          <SimuladorUniversitarioMep />
        )}

        {seccionActiva === 'ia' && (
          <div className="py-4">
            <AsistenteIaGenerativo />
          </div>
        )}

        {seccionActiva === 'multimedia' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <SelectorMultimedia />
            <PanelCampanaClara />
          </div>
        )}

        {seccionActiva === 'reportes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <ReportePdfMep />
            <GestorPushPwa />
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

      {mostrarSelector && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setMostrarSelector(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white font-bold z-10 text-sm"
            >
              ✕
            </button>
            <SelectorInstitucionalModal onSeleccionar={(ctx) => { setContextoMep(ctx); setMostrarSelector(false); }} />
          </div>
        </div>
      )}

      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>© 2026 pracTICAtecnica.com — Desarrollado por GICM & BDS Devs S.A. | Ley 8968 Activa</p>
        <p>Soporte Oficial MEP & WhatsApp: +506 6090-6359 | Ing. Max Salazar Sánchez</p>
      </footer>

    </div>
  );
}