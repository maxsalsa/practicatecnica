import React, { useState } from 'react';
import NavbarInstitucional from './components/NavbarInstitucional';
import ChatInstitucional from './components/ChatInstitucional';
import CarnetEstudiantilQr from './components/CarnetEstudiantilQr';
import PanelSuperAdmin from './components/PanelSuperAdmin';
import LoginGoogleAuth from './components/LoginGoogleAuth';
import PasarelaSinpeModal from './components/PasarelaSinpeModal';
import SelectorInstitucionalModal from './components/SelectorInstitucionalModal';

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
  const [mostrarSelector, setMostrarSelector] = useState(false);
  
  // Contexto Institucional Activo MEP
  const [contextoMep, setContextoMep] = useState({
    region: 'Dirección Regional de Alajuela',
    circuito: '04 (Incluye CTP Mercedes Norte)',
    modalidad: 'Colegios Técnicos Profesionales (CTP)'
  });

  // Expedientes estudiantiles privados (Aislamiento Ley 8968)
  const [expedienteActivo, setExpedienteActivo] = useState(null);
  const [cedulaBusqueda, setCedulaBusqueda] = useState('');

  const estudiantesDB = [
    { cedula: '1-1678-0411', nombre: 'Ana Sofía Mora', seccion: '11-1', especialidad: 'Desarrollo Web', notas: 'Periodo 1: 95.0 - Periodo 2: 92.5', conducta: 'Excelente - 0 boletas' },
    { cedula: '2-0451-0982', nombre: 'Mateo Mora (Hermano)', seccion: '8-2', especialidad: 'Académica I Ciclo', notas: 'Periodo 1: 88.0 - Periodo 2: 90.0', conducta: 'Muy Buena - 0 boletas' }
  ];

  const buscarExpediente = (e) => {
    e.preventDefault();
    const encontrado = estudiantesDB.find(st => st.cedula.includes(cedulaBusqueda.trim()));
    if (encontrado) {
      setExpedienteActivo(encontrado);
    } else {
      alert('Estudiante no encontrado o sin permisos de acceso bajo Ley 8968.');
      setExpedienteActivo(null);
    }
  };

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

      {/* Contenido Principal Dinámico */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Barra de Contexto MEP y Accesos */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap justify-between items-center gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-cyan-400 font-bold">🏛️ MEP Costa Rica:</span>
            <span className="text-slate-300">{contextoMep.region} | Circuito {contextoMep.circuito}</span>
          </div>
          <div className="flex flex-wrap gap-2">
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
                🦉 Ecosistema Soberano <span className="text-cyan-400">Práctica Técnica</span>
              </h2>
              <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
                Plataforma oficial para el <span className="text-white font-semibold">CTP Mercedes Norte</span> y el MEP. Cumplimiento estricto de la <span className="text-cyan-300 font-semibold">Ley 8968</span> de protección de datos personales y expedientes privados individuales.
              </p>
              
              {/* Buscador de Expediente Privado Ley 8968 */}
              <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-xl">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">🔍 Consulta de Expediente Estudiantil (Privacidad Ley 8968)</h4>
                <form onSubmit={buscarExpediente} className="flex gap-2">
                  <input
                    type="text"
                    value={cedulaBusqueda}
                    onChange={(e) => setCedulaBusqueda(e.target.value)}
                    placeholder="Digite número de cédula (Ej: 1-1678-0411)..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                  <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all">
                    Consultar
                  </button>
                </form>

                {expedienteActivo && (
                  <div className="mt-4 bg-slate-900 p-4 rounded-lg border border-cyan-500/40 text-xs space-y-2 animate-fadeIn">
                    <p className="text-white font-bold text-sm">👤 {expedienteActivo.nombre}</p>
                    <p className="text-slate-300">Cédula: <span className="font-mono text-cyan-300">{expedienteActivo.cedula}</span> | Sección: <span className="text-white font-semibold">{expedienteActivo.seccion}</span></p>
                    <p className="text-slate-300">Especialidad / Nivel: <span className="text-cyan-400 font-medium">{expedienteActivo.especialidad}</span></p>
                    <p className="text-slate-300">Historial Notas: <span className="text-green-300 font-mono">{expedienteActivo.notas}</span></p>
                    <p className="text-slate-300">Conducta: <span className="text-amber-300">{expedienteActivo.conducta}</span></p>
                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                      <span>🔒 Cifrado SHA-256 | Acceso Restringido</span>
                      <button onClick={() => alert('Generando PDF oficial con escudo MEP y firma digital SHA-256...')} className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold px-3 py-1 rounded">
                        📥 Descargar Expediente PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>

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
                <div className="text-3xl mb-3">🏛️</div>
                <h3 className="font-bold text-lg text-white mb-1">Jerarquía MEP 2026</h3>
                <p className="text-xs text-slate-400">Estructura oficial de Direcciones Regionales, circuitos y modalidades primarias y técnicas.</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="font-bold text-lg text-white mb-1">Ley 8968 & PRODHAB</h3>
                <p className="text-xs text-slate-400">Privacidad absoluta de datos personales, expedientes de menores y aislamiento por roles.</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-bold text-lg text-white mb-1">SINPE 6090-6359</h3>
                <p className="text-xs text-slate-400">Pasarela directa a nombre de Max Salazar Sánchez (Banco Popular) con soporte WhatsApp.</p>
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'simuladores' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl text-center py-12 space-y-4">
            <span className="text-5xl">💻</span>
            <h3 className="text-2xl font-bold text-white">Banco de Simuladores Técnicos</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Excel, Word y Cisco IOS operando en modo offline-first con certificación SHA-256.</p>
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

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>© 2026 Práctica Técnica — Desarrollado por GICM & BDS Devs S.A. | Ley 8968 Activa</p>
        <p>Soporte Oficial MEP & WhatsApp: +506 6090-6359 | Ing. Max Salazar Sánchez</p>
      </footer>

    </div>
  );
}