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
import HubModalidadesMep, { MODALIDADES_OFICIALES_MEP } from './components/HubModalidadesMep';

export default function App() {
  const [usuarioActual, setUsuarioActual] = useState({
    nombre: 'Ing. Max Salazar Sánchez',
    correo: 'maxi.salsa@gmail.com',
    rol: 'SuperAdmin',
    seccion: 'SuperAdmin Global & Docente CTP'
  });

  // Iniciar en 'inicio' donde se ve TANTO el Hub de Modalidades MEP (CTP Diurno/Nocturno/Académico) COMO los Simulacros
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [modalidadMepId, setModalidadMepId] = useState('ctp_diurno');
  const [mostrarSinpe, setMostrarSinpe] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const [contextoMep, setContextoMep] = useState({
    region: 'Dirección Regional de Alajuela',
    circuito: '04 (CTP Mercedes Norte & Circuito Oficial)',
    modalidad: 'CTP Diurno / Técnico Nocturno / Académico'
  });

  const cambiarRolRapido = (nuevoRol) => {
    setUsuarioActual((prev) => ({
      ...prev,
      rol: nuevoRol,
      nombre: nuevoRol === 'SuperAdmin' ? 'Ing. Max Salazar Sánchez' : `${prev.nombre.split(' (')[0]} (${nuevoRol})`
    }));
  };

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

        {/* Barra de Control Institucional + Selector Rápido de Modalidad y Rol SuperAdmin */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-600 px-2 py-0.5 rounded font-extrabold">
                ✓ v26.9 EN LÍNEA
              </span>
              <span className="text-cyan-400 font-bold">🏛️ {contextoMep.region}</span>
              <span className="text-slate-400">| Circuito {contextoMep.circuito}</span>
              <span className="text-amber-300 font-bold">| Modalidad: {contextoMep.modalidad}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Sesión activa: <strong className="text-white">{usuarioActual.nombre}</strong> — Rol: <strong className="text-cyan-300">{usuarioActual.rol}</strong> (Todos los servicios desbloqueados)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={usuarioActual.rol}
              onChange={(e) => cambiarRolRapido(e.target.value)}
              className="bg-slate-950 border border-cyan-600/60 text-cyan-300 text-xs font-bold rounded-lg px-2.5 py-1.5"
              title="Cambiar vista de rol para pruebas QA"
            >
              <option value="SuperAdmin">👑 Vista: SuperAdmin (Total)</option>
              <option value="Docente MEP">👨‍🏫 Vista: Docente MEP</option>
              <option value="Estudiante CTP">🎓 Vista: Estudiante CTP / Académico</option>
              <option value="Director / Coordinación">🏛️ Vista: Director / Coordinador</option>
            </select>

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

        {/* Barra de Navegación Completa de los 8 Módulos del Ecosistema */}
        <div className="flex flex-wrap gap-2 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
          {[
            { id: 'inicio', label: '🏠 Todo el Ecosistema (Vista Completa)' },
            { id: 'modalidades', label: '🏫 CTP Diurno / Nocturno / Académico / CINDEA' },
            { id: 'simuladores', label: '🎓 Simulacros UCR / TEC / UNA / UTN / COSEVI' },
            { id: 'ia', label: '🤖 Asistente IA (Planeamientos y Exámenes)' },
            { id: 'carnet', label: '🪪 Carné Digital QR' },
            { id: 'chats', label: '💬 Chats Institucionales' },
            { id: 'multimedia', label: '🖼️ Multimedia & Campaña Clara' },
            { id: 'reportes', label: '📄 Reportes PDF & Push' },
            { id: 'admin', label: '🔐 Consola SuperAdmin' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSeccionActiva(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition-all ${
                seccionActiva === tab.id
                  ? 'bg-cyan-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* VISTA INICIO: Muestra todo el poder (Hub de Modalidades MEP + Simulacros + IA + SuperAdmin) */}
        {seccionActiva === 'inicio' && (
          <div className="space-y-8">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SelectorMultimedia />
              <PanelCampanaClara />
            </div>
          </div>
        )}

        {seccionActiva === 'modalidades' && (
          <HubModalidadesMep
            modalidadActiva={modalidadMepId}
            onSeleccionarModalidad={(mod) => {
              setModalidadMepId(mod.id);
              setContextoMep((prev) => ({ ...prev, modalidad: mod.nombre }));
            }}
            onIrASimuladores={() => setSeccionActiva('simuladores')}
          />
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

        {seccionActiva === 'reportes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReportePdfMep />
            <GestorPushPwa />
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

      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>© 2026 pracTICAtecnica.com — Desarrollado por GICM & BDS Devs S.A. | Ley 8968 Activa</p>
        <p>Soporte Oficial MEP & WhatsApp: +506 6090-6359 | Ing. Max Salazar Sánchez</p>
      </footer>

    </div>
  );
}