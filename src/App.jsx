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
import HubModalidadesMep from './components/HubModalidadesMep';
import ExploradorMateriasMep from './components/ExploradorMateriasMep';
import CentroGestionDocenteAdminMep from './components/CentroGestionDocenteAdminMep';

export default function App() {
  const [usuarioActual, setUsuarioActual] = useState({
    nombre: 'Ing. Max Salazar Sánchez',
    correo: 'maxi.salsa@gmail.com',
    rol: 'SuperAdmin',
    seccion: 'SuperAdmin Global & Docente CTP'
  });

  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [modalidadMepId, setModalidadMepId] = useState('ctp_diurno');
  const [mostrarSinpe, setMostrarSinpe] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const [contextoMep, setContextoMep] = useState({
    region: 'Dirección Regional de Alajuela',
    circuito: '04 (CTP Mercedes Norte)',
    modalidad: 'CTP Diurno / Técnico Nocturno / Académico'
  });

  const cambiarRolRapido = (nuevoRol) => {
    setUsuarioActual((prev) => ({
      ...prev,
      rol: nuevoRol,
      nombre: nuevoRol === 'SuperAdmin' ? 'Ing. Max Salazar Sánchez' : `Usuario Activo (${nuevoRol})`
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">

      <NavbarInstitucional
        usuarioActual={usuarioActual}
        seccionActiva={seccionActiva}
        onCambiarSeccion={(id) => {
          if (id === 'login') setMostrarLogin(true);
          else if (id === 'sinpe') setMostrarSinpe(true);
          else setSeccionActiva(id);
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:px-6 lg:px-8 space-y-6">

        {/* Cintillo Institucional y Accesos Rápidos */}
        <div className="bg-slate-900/90 border border-slate-800 px-4 py-3 rounded-2xl flex flex-wrap justify-between items-center gap-3 shadow-lg">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-cyan-400 font-extrabold">🏛️ MEP Costa Rica:</span>
            <span className="text-slate-200 font-medium">{contextoMep.region}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">Circuito {contextoMep.circuito}</span>
            <span className="text-slate-600">•</span>
            <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 px-2.5 py-0.5 rounded-lg font-bold">
              {contextoMep.modalidad}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={usuarioActual.rol}
              onChange={(e) => cambiarRolRapido(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-cyan-300 text-xs font-bold rounded-xl px-3 py-1.5"
            >
              <option value="SuperAdmin">👑 Rol: SuperAdmin</option>
              <option value="Docente MEP">👨‍🏫 Rol: Docente MEP</option>
              <option value="Estudiante CTP">🎓 Rol: Estudiante</option>
              <option value="Director / Coordinación">🏛️ Rol: Administrativo / Dirección</option>
            </select>

            <button
              onClick={() => setMostrarSelector(true)}
              className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs transition-all"
            >
              🏛️ Región / Circuito
            </button>

            <button
              onClick={() => setMostrarSinpe(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-600/20"
            >
              📱 SINPE 6090-6359
            </button>
          </div>
        </div>

        {/* VISTA INICIO: Todo visible y accesible de inmediato */}
        {seccionActiva === 'inicio' && (
          <div className="space-y-8">
            <ExploradorMateriasMep onPracticarMateria={() => setSeccionActiva('simuladores')} />

            <CentroGestionDocenteAdminMep usuarioActual={usuarioActual} />

            <HubModalidadesMep
              modalidadActiva={modalidadMepId}
              onSeleccionarModalidad={(mod) => {
                setModalidadMepId(mod.id);
                setContextoMep((prev) => ({ ...prev, modalidad: mod.nombre }));
              }}
              onIrASimuladores={() => setSeccionActiva('simuladores')}
            />

            <SimuladorUniversitarioMep usuarioActual={usuarioActual} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AsistenteIaGenerativo />
              <div className="space-y-6">
                <ReportePdfMep />
                <GestorPushPwa />
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'materias' && (
          <ExploradorMateriasMep onPracticarMateria={() => setSeccionActiva('simuladores')} />
        )}

        {seccionActiva === 'gestion' && (
          <CentroGestionDocenteAdminMep usuarioActual={usuarioActual} />
        )}

        {seccionActiva === 'simuladores' && (
          <SimuladorUniversitarioMep usuarioActual={usuarioActual} />
        )}

        {seccionActiva === 'ia' && (
          <AsistenteIaGenerativo />
        )}

        {seccionActiva === 'multimedia' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectorMultimedia />
            <PanelCampanaClara />
          </div>
        )}

        {seccionActiva === 'chats' && (
          <ChatInstitucional usuarioActual={usuarioActual} />
        )}

        {seccionActiva === 'carnet' && (
          <CarnetEstudiantilQr />
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

      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500 space-y-1 mt-12">
        <p>© 2026 pracTICAtecnica.com — Desarrollado por GICM & BDS Devs S.A. | Ley 8968 Activa</p>
        <p>Soporte Oficial MEP & WhatsApp: +506 6090-6359 | Ing. Max Salazar Sánchez</p>
      </footer>

    </div>
  );
}