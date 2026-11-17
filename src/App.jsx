import React, { useState, useEffect } from 'react';
import NavbarInstitucional from './components/NavbarInstitucional';
import HeroGamificadoMep from './components/HeroGamificadoMep';
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
import SimuladorVialCoseviCanvas from './components/SimuladorVialCoseviCanvas';
import SuiteAuditoriaQaBds from './components/SuiteAuditoriaQaBds';
import HubModalidadesMep from './components/HubModalidadesMep';
import ExploradorMateriasMep from './components/ExploradorMateriasMep';
import CentroGestionDocenteAdminMep from './components/CentroGestionDocenteAdminMep';

const CLAVE_PAGINA_OFFLINE = 'pt_pagina_activa_offline_v29_5';

export default function App() {
  const [usuarioActual, setUsuarioActual] = useState({
    nombre: 'Ing. Max Salazar Sánchez',
    correo: 'maxi.salsa@gmail.com',
    rol: 'SuperAdmin',
    seccion: 'SuperAdmin Global & Docente CTP'
  });

  // Persistencia instantánea en el navegador de la última página visitada
  const [seccionActiva, setSeccionActiva] = useState(() => {
    return localStorage.getItem(CLAVE_PAGINA_OFFLINE) || 'inicio';
  });
  const [modalidadMepId, setModalidadMepId] = useState('ctp_diurno');
  const [busquedaGlobal, setBusquedaGlobal] = useState('');
  const [mostrarSinpe, setMostrarSinpe] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const [contextoMep, setContextoMep] = useState({
    region: 'Dirección Regional de Alajuela',
    circuito: '04 (CTP Mercedes Norte)',
    modalidad: 'CTP Diurno / Nocturno / Académico'
  });

  useEffect(() => {
    localStorage.setItem(CLAVE_PAGINA_OFFLINE, seccionActiva);
  }, [seccionActiva]);

  const cambiarPagina = (id) => {
    if (id === 'login') setMostrarLogin(true);
    else if (id === 'sinpe') setMostrarSinpe(true);
    else {
      setSeccionActiva(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const cambiarRolRapido = (nuevoRol) => {
    setUsuarioActual((prev) => ({
      ...prev,
      rol: nuevoRol,
      nombre: nuevoRol === 'SuperAdmin' ? 'Ing. Max Salazar Sánchez' : `Usuario Activo (${nuevoRol})`
    }));
  };

  const manejarAccionHero = (accionId) => {
    if (accionId === 'cosevi') cambiarPagina('juegovial');
    else if (accionId === 'universidades' || accionId === 'idiomas') cambiarPagina('simuladores');
    else if (accionId === 'materias') cambiarPagina('materias');
    else if (accionId === 'ctp_gestion') cambiarPagina('gestion');
    else if (accionId === 'modalidades') cambiarPagina('modalidades');
  };

  return (
    <div className="min-h-screen pb-16 sm:pb-0 bg-slate-950 text-slate-100 flex flex-col font-sans notranslate" translate="no">

      <NavbarInstitucional
        usuarioActual={usuarioActual}
        seccionActiva={seccionActiva}
        onCambiarSeccion={cambiarPagina}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:px-8 space-y-5">

        {/* Cintillo Institucional Compacto */}
        <div className="bg-slate-900 border border-slate-800 px-3.5 py-2.5 rounded-2xl flex flex-wrap justify-between items-center gap-2 shadow-md">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-cyan-400 font-bold">🏛️ {contextoMep.region}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">Circuito {contextoMep.circuito}</span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:inline text-amber-300 font-semibold">{contextoMep.modalidad}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={usuarioActual.rol}
              onChange={(e) => cambiarRolRapido(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-cyan-300 text-xs font-bold rounded-xl px-2.5 py-1.5"
            >
              <option value="SuperAdmin">👑 Rol: SuperAdmin</option>
              <option value="Docente MEP">👨‍🏫 Rol: Docente MEP</option>
              <option value="Estudiante CTP">🎓 Rol: Estudiante</option>
              <option value="Director / Coordinación">🏛️ Rol: Administrativo</option>
            </select>

            <button
              onClick={() => setMostrarSelector(true)}
              className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold px-2.5 py-1.5 rounded-xl text-xs"
            >
              🏛️ Región
            </button>

            <button
              onClick={() => setMostrarSinpe(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow"
            >
              📱 SINPE 6090-6359
            </button>
          </div>
        </div>

        {/* Barra de Retorno Rápido cuando estás en una subpágina */}
        {seccionActiva !== 'inicio' && (
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-xl">
            <button
              onClick={() => cambiarPagina('inicio')}
              className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-extrabold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5"
            >
              ← Volver al Menú Principal
            </button>
            <div className="flex flex-wrap gap-2">
              {seccionActiva === 'simuladores' && (
                <button
                  onClick={() => cambiarPagina('juegovial')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                >
                  🕹️ Ir al Juego Vial 2D de la Rotonda →
                </button>
              )}
              {seccionActiva === 'juegovial' && (
                <button
                  onClick={() => cambiarPagina('simuladores')}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                >
                  🎓 Ir al Examen Teórico (10 a 60 Preguntas) →
                </button>
              )}
            </div>
          </div>
        )}

        {/* PÁGINA 1: INICIO (Solo el Menú de Bienvenida y Tarjetas de Acceso a cada Página) */}
        {seccionActiva === 'inicio' && (
          <div className="space-y-6">
            <HeroGamificadoMep
              usuarioActual={usuarioActual}
              busquedaGlobal={busquedaGlobal}
              setBusquedaGlobal={setBusquedaGlobal}
              onNavegarAccion={manejarAccionHero}
            />
          </div>
        )}

        {/* PÁGINA 2: ESPECIALIDADES CTP Y MATERIAS ACADÉMICAS */}
        {seccionActiva === 'materias' && (
          <ExploradorMateriasMep onPracticarMateria={() => cambiarPagina('simuladores')} />
        )}

        {/* PÁGINA 3: MODALIDADES MEP (CTP DIURNO, NOCTURNO, ACADÉMICO, CINDEA) */}
        {seccionActiva === 'modalidades' && (
          <HubModalidadesMep
            modalidadActiva={modalidadMepId}
            onSeleccionarModalidad={(mod) => {
              setModalidadMepId(mod.id);
              setContextoMep((prev) => ({ ...prev, modalidad: mod.nombre }));
            }}
            onIrASimuladores={() => cambiarPagina('simuladores')}
          />
        )}

        {/* PÁGINA 4: EXÁMENES Y SIMULACROS (SOLO EL EXAMEN, SIN EL JUEGO ABAJO) */}
        {seccionActiva === 'simuladores' && (
          <SimuladorUniversitarioMep usuarioActual={usuarioActual} />
        )}

        {/* PÁGINA 5: JUEGO VIAL 2D EN SU PROPIA PÁGINA EXCLUSIVA */}
        {seccionActiva === 'juegovial' && (
          <SimuladorVialCoseviCanvas />
        )}

        {/* PÁGINA 6: HORARIOS, TARDÍAS, AUSENCIAS Y GESTIÓN DOCENTE/ADMIN */}
        {seccionActiva === 'gestion' && (
          <CentroGestionDocenteAdminMep usuarioActual={usuarioActual} />
        )}

        {/* PÁGINA 7: GENERADOR DUAL IA / PLANTILLAS DE PLANEAMIENTOS Y EXÁMENES */}
        {seccionActiva === 'ia' && (
          <AsistenteIaGenerativo />
        )}

        {/* PÁGINA 8: MULTIMEDIA Y CAMPAÑA CLARA */}
        {seccionActiva === 'multimedia' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectorMultimedia />
            <PanelCampanaClara />
          </div>
        )}

        {/* PÁGINA 9: CHATS INSTITUCIONALES */}
        {seccionActiva === 'chats' && (
          <ChatInstitucional usuarioActual={usuarioActual} />
        )}

        {/* PÁGINA 10: CARNÉ DIGITAL QR */}
        {seccionActiva === 'carnet' && (
          <CarnetEstudiantilQr />
        )}

        {/* PÁGINA 11: SUPERADMIN, REPORTES PDF Y SUITE QA */}
        {seccionActiva === 'admin' && (
          <div className="space-y-6">
            <PanelSuperAdmin superAdminNombre={usuarioActual.nombre} />
            <SuiteAuditoriaQaBds />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReportePdfMep />
              <GestorPushPwa />
            </div>
          </div>
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

      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500 space-y-1 mt-8">
        <p>© 2026 pracTICAtecnica.com — Desarrollado por GICM & BDS Devs S.A. | Mobile-First & Offline-First</p>
        <p>Soporte Oficial MEP & WhatsApp: +506 6090-6359 | Ing. Max Salazar Sánchez</p>
      </footer>

    </div>
  );
}