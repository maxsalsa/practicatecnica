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

const CLAVE_PAGINA_OFFLINE = 'pt_pagina_activa_offline_v30_0';

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
      nombre: nuevoRol === 'SuperAdmin' ? 'Ing. Max Salazar Sánchez' : `Usuario Activo (${nuevoRol})`
    }));
  };

  const manejarAccionHero = (accionId) => {
    if (accionId === 'cosevi') cambiarPagina('juegovial');
    else if (accionId === 'universidades' || accionId === 'idiomas') cambiarPagina('simuladores');
    else if (accionId === 'materias') cambiarPagina('materias');
    else if (accionId === 'ctp_gestion') cambiarPagina('ofimatica');
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

        {/* Cintillo Nacional con las 7 Provincias y 27 Direcciones Regionales */}
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
              className="bg-slate-950 border border-slate-700 text-cyan-300 text-xs font-bold rounded-xl px-2.5 py-1.5"
            >
              <option value="SuperAdmin">👑 Rol: SuperAdmin</option>
              <option value="Docente MEP">👨‍🏫 Rol: Docente MEP</option>
              <option value="Estudiante CTP">🎓 Rol: Estudiante</option>
              <option value="Director / Coordinación">🏛️ Rol: Administrativo</option>
            </select>

            <button
              onClick={() => setMostrarSelector(true)}
              className="bg-cyan-700 hover:bg-cyan-600 text-white font-extrabold px-3 py-1.5 rounded-xl text-xs shadow"
            >
              🏛️ Cambiar Provincia / Regional (27 MEP)
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
                onClick={() => cambiarPagina('ofimatica')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
              >
                🧪 Simuladores Excel / Word / Circuitos
              </button>
              <button
                onClick={() => cambiarPagina('biblioteca')}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
              >
                📚 Programas MEP, Libros y Leyes
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

            {/* Tarjetas de Acceso Directo a los Nuevos Simuladores de Ofimática, Circuitos y Biblioteca */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={() => cambiarPagina('ofimatica')}
                className="bg-gradient-to-br from-emerald-900/70 to-slate-900 border border-emerald-500/40 p-5 rounded-2xl cursor-pointer hover:scale-[1.01] transition-all shadow-xl"
              >
                <span className="text-2xl">📊</span>
                <h3 className="text-base font-extrabold text-white mt-2">Simulador de Hoja Electrónica & Contabilidad Pura</h3>
                <p className="text-xs text-slate-300 mt-1">Fórmulas de Excel, Libro Diario NIIF, cálculo de IVA 13% (Ley 9635) y Balance en vivo.</p>
              </div>

              <div
                onClick={() => cambiarPagina('ofimatica')}
                className="bg-gradient-to-br from-cyan-900/70 to-slate-900 border border-cyan-500/40 p-5 rounded-2xl cursor-pointer hover:scale-[1.01] transition-all shadow-xl"
              >
                <span className="text-2xl">🔌</span>
                <h3 className="text-base font-extrabold text-white mt-2">Simulador de Circuitos, Electrónica & Redes Cisco</h3>
                <p className="text-xs text-slate-300 mt-1">Compuertas lógicas digitales (AND/OR/XOR), Ley de Ohm, Procesador de Textos APA 7 y Cisco CLI.</p>
              </div>

              <div
                onClick={() => cambiarPagina('biblioteca')}
                className="bg-gradient-to-br from-amber-900/70 to-slate-900 border border-amber-500/40 p-5 rounded-2xl cursor-pointer hover:scale-[1.01] transition-all shadow-xl"
              >
                <span className="text-2xl">📚</span>
                <h3 className="text-base font-extrabold text-white mt-2">Biblioteca Abierta, Programas MEP, Leyes e Impuestos</h3>
                <p className="text-xs text-slate-300 mt-1">Folletos libres de derechos de autor, Ley 9635, Ley 8968, Ley 7600 y programas oficiales.</p>
              </div>
            </div>
          </div>
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

        {seccionActiva === 'gestion' && (
          <CentroGestionDocenteAdminMep usuarioActual={usuarioActual} />
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
        <p>© 2026 pracTICAtecnica.com — Desarrollado por GICM & BDS Devs S.A. | 7 Provincias y 27 Regionales MEP</p>
        <p>Soporte Oficial MEP & WhatsApp: +506 6090-6359 | Ing. Max Salazar Sánchez</p>
      </footer>

    </div>
  );
}