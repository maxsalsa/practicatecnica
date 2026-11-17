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
import SuiteSimuladoresOfimaticaCircuitos from './components/SuiteSimuladoresOfimaticaCircuitos';
import BibliotecaLeyesLibrosMep from './components/BibliotecaLeyesLibrosMep';
import Arcade32JuegosEducativos from './components/Arcade32JuegosEducativos';

const CLAVE_PAGINA_OFFLINE = 'pt_pagina_activa_offline_v31_0';

export default function App() {
  const [usuarioActual, setUsuarioActual] = useState({
    nombre: 'Ing. Max Salazar Sánchez',
    correo: 'maxi.salsa@gmail.com',
    rol: 'SuperAdmin',
    seccion: 'SuperAdmin Global & Docente CTP'
  });

  const [seccionActiva, setSeccionActiva] = useState(() => {
    return localStorage.getItem(CLAVE_PAGINA_OFFLINE) || 'inicio';
  });
  const [modalidadMepId, setModalidadMepId] = useState('ctp_diurno');
  const [busquedaGlobal, setBusquedaGlobal] = useState('');
  const [mostrarSinpe, setMostrarSinpe] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const [contextoMep, setContextoMep] = useState({
    provincia: 'Heredia',
    region: 'Dirección Regional de Heredia',
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
      nombre: nuevoRol === 'SuperAdmin' ? 'Ing. Max Salazar Sánchez' : `Ing. Max Salazar (${nuevoRol})`
    }));
  };

  const manejarAccionHero = (accionId) => {
    if (accionId === 'cosevi') cambiarPagina('juegovial');
    else if (accionId === 'universidades' || accionId === 'idiomas') cambiarPagina('simuladores');
    else if (accionId === 'materias') cambiarPagina('materias');
    else if (accionId === 'ctp_gestion') cambiarPagina('gestion');
    else if (accionId === 'modalidades') cambiarPagina('arcade32');
  };

  return (
    <div className="min-h-screen pb-16 sm:pb-0 bg-slate-950 text-slate-100 flex flex-col font-sans notranslate" translate="no">

      <NavbarInstitucional
        usuarioActual={usuarioActual}
        seccionActiva={seccionActiva}
        onCambiarSeccion={cambiarPagina}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:px-8 space-y-5">

        {/* Cintillo con Jerarquía Ministerial Completa del MEP */}
        <div className="bg-slate-900 border border-slate-800 px-3.5 py-2.5 rounded-2xl flex flex-wrap justify-between items-center gap-2 shadow-md">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-cyan-950 text-cyan-300 border border-cyan-700 px-2 py-0.5 rounded font-extrabold">
              🇨🇷 {contextoMep.provincia || 'Costa Rica'}
            </span>
            <span className="text-white font-bold">🏛️ {contextoMep.region}</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-300 font-semibold">Circuito {contextoMep.circuito}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={usuarioActual.rol}
              onChange={(e) => cambiarRolRapido(e.target.value)}
              className="bg-slate-950 border border-cyan-500/60 text-cyan-300 text-xs font-extrabold rounded-xl px-3 py-1.5"
            >
              <option value="SuperAdmin">👑 Rol: SuperAdmin Global</option>
              <option value="Ministro(a) de Educación">🇨🇷 Rol: Ministro(a) / Viceministro(a) MEP</option>
              <option value="Asesor(a) Nacional / Regional">🧭 Rol: Asesor(a) Pedagógico / Supervisor(a)</option>
              <option value="Director(a) / Subdirector(a)">🏛️ Rol: Director(a) / Subdirector(a) de Centro</option>
              <option value="Coordinador(a) Técnico / Académico">⚙️ Rol: Coordinador(a) Técnico / Académico</option>
              <option value="Docente MEP">👨‍🏫 Rol: Docente Técnico / Académico</option>
              <option value="Estudiante CTP / Académico">🎓 Rol: Estudiante</option>
              <option value="Encargado Legal / Familia">👨‍👩‍👧 Rol: Encargado Legal / Familia</option>
            </select>

            <button
              onClick={() => setMostrarSelector(true)}
              className="bg-cyan-700 hover:bg-cyan-600 text-white font-extrabold px-3 py-1.5 rounded-xl text-xs shadow"
            >
              🏛️ Cambiar Regional (27 MEP)
            </button>

            <button
              onClick={() => setMostrarSinpe(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow"
            >
              📱 SINPE 6090-6359
            </button>
          </div>
        </div>

        {seccionActiva !== 'inicio' && (
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-xl">
            <button
              onClick={() => cambiarPagina('inicio')}
              className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-extrabold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5"
            >
              ← Volver al Menú Principal
            </button>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => cambiarPagina('gestion')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
              >
                🏛️ Boletas Personal→Dirección & CSV PIAD/SEA
              </button>
              <button
                onClick={() => cambiarPagina('arcade32')}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
              >
                🎮 32 Juegos Educativos
              </button>
            </div>
          </div>
        )}

        {seccionActiva === 'inicio' && (
          <div className="space-y-6">
            <HeroGamificadoMep
              usuarioActual={usuarioActual}
              busquedaGlobal={busquedaGlobal}
              setBusquedaGlobal={setBusquedaGlobal}
              onNavegarAccion={manejarAccionHero}
            />

            {/* 4 Tarjetas Destacadas de Acceso Inmediato */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => cambiarPagina('gestion')}
                className="bg-gradient-to-br from-emerald-900/80 to-slate-900 border border-emerald-500/50 p-5 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all shadow-xl"
              >
                <span className="text-2xl">🏛️</span>
                <h3 className="text-sm font-extrabold text-white mt-2">Boletas Personal→Dirección & Exportar CSV (SEA / PIAD)</h3>
                <p className="text-xs text-slate-300 mt-1">Citas CCSS, llegadas tardías de reloj, emergencias de personal y planilla CSV oficial para PIAD/SEA.</p>
              </div>

              <div
                onClick={() => cambiarPagina('arcade32')}
                className="bg-gradient-to-br from-purple-900/80 to-slate-900 border border-purple-500/50 p-5 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all shadow-xl"
              >
                <span className="text-2xl">🎮</span>
                <h3 className="text-sm font-extrabold text-white mt-2">Arcade de 32 Juegos Educativos (Razonamiento & CTP)</h3>
                <p className="text-xs text-slate-300 mt-1">32 retos gamificados de lógica UCR/TEC, Contabilidad Pura, Ciberseguridad, Ciencias e Idiomas.</p>
              </div>

              <div
                onClick={() => cambiarPagina('ofimatica')}
                className="bg-gradient-to-br from-cyan-900/80 to-slate-900 border border-cyan-500/50 p-5 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all shadow-xl"
              >
                <span className="text-2xl">🧪</span>
                <h3 className="text-sm font-extrabold text-white mt-2">Simuladores de Excel, Word APA 7 y Circuitos Digitales</h3>
                <p className="text-xs text-slate-300 mt-1">Hoja electrónica con IVA Ley 9635, procesador de textos, compuertas AND/OR/XOR y Cisco CLI.</p>
              </div>

              <div
                onClick={() => cambiarPagina('biblioteca')}
                className="bg-gradient-to-br from-amber-900/80 to-slate-900 border border-amber-500/50 p-5 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all shadow-xl"
              >
                <span className="text-2xl">📚</span>
                <h3 className="text-sm font-extrabold text-white mt-2">Programas MEP, Libros Libres, Leyes e Impuestos</h3>
                <p className="text-xs text-slate-300 mt-1">Folletos abiertos sin copyright, Ley 9635, Ley 8968, Ley 7600, REA y Diseño Digital.</p>
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'gestion' && (
          <CentroGestionDocenteAdminMep usuarioActual={usuarioActual} />
        )}

        {seccionActiva === 'arcade32' && (
          <Arcade32JuegosEducativos onAbrirRotonda2D={() => cambiarPagina('juegovial')} />
        )}

        {seccionActiva === 'materias' && (
          <ExploradorMateriasMep onPracticarMateria={() => cambiarPagina('simuladores')} />
        )}

        {seccionActiva === 'ofimatica' && (
          <SuiteSimuladoresOfimaticaCircuitos />
        )}

        {seccionActiva === 'biblioteca' && (
          <BibliotecaLeyesLibrosMep />
        )}

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

        {seccionActiva === 'simuladores' && (
          <SimuladorUniversitarioMep usuarioActual={usuarioActual} />
        )}

        {seccionActiva === 'juegovial' && (
          <SimuladorVialCoseviCanvas />
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
          <div className="relative w-full max-w-lg">
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
        <p>© 2026 pracTICAtecnica.com — Desarrollado por GICM & BDS Devs S.A. | Roles: Ministro, Asesor, Director, Docente y Estudiante</p>
        <p>Soporte Oficial MEP & WhatsApp: +506 6090-6359 | Ing. Max Salazar Sánchez</p>
      </footer>

    </div>
  );
}