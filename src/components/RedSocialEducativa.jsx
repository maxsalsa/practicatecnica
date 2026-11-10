import React, { useState } from 'react';
import { Trophy, Users, ShieldCheck, Gamepad2, Brain, Sparkles, Globe, HeartPulse, Atom } from 'lucide-react';

export default function RedSocialEducativa() {
  const [usuarioGoogle, setUsuarioGoogle] = useState(null);
  const [ligaActiva, setLigaActiva] = useState('DIAMANTE');
  const [seccion, setSeccion] = useState('LIGAS');

  const iniciarSesionGoogle = () => {
    // Simulación de autenticación segura Google OAuth supervisada
    const perfilMock = {
      nombre: "Estudiante Supervizado MEP",
      email: "estudiante.mep@est.mep.go.cr",
      xp: 2450,
      racha: 14,
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=MaxMEP"
    };
    setUsuarioGoogle(perfilMock);
  };

  const materiasUniverso = [
    { id: 'QUIMICA', nombre: 'Química & Biología STEM', icono: Atom, color: 'text-emerald-400' },
    { id: 'PSICOLOGIA', nombre: 'Psicología & Hábitos Saludables', icono: HeartPulse, color: 'text-rose-400' },
    { id: 'CIBER', nombre: 'Ciberseguridad & Redes', icono: ShieldCheck, color: 'text-cyan-400' },
    { id: 'SOFTWARE', nombre: 'Diseño de Software & Código', icono: Brain, color: 'text-amber-400' },
    { id: 'PREESCOLAR', nombre: 'Preescolar: Inglés y Juegos', icono: Gamepad2, color: 'text-purple-400' }
  ];

  const rankingLigas = [
    { puesto: 1, nombre: "Valeria Morales (CTP Mercedes N.)", xp: 5420, insignia: "🏆 Campeón Nacional" },
    { puesto: 2, nombre: "Andrés Solís (Colegio Científico)", xp: 4890, insignia: "🥈 Élite Pro" },
    { puesto: 3, nombre: "Lucía Valverde (IPEC Alajuela)", xp: 4500, insignia: "🥉 Avanzado" },
    { puesto: 4, nombre: "Tú (Modo Supervisado Google)", xp: usuarioGoogle ? usuarioGoogle.xp : 2450, insignia: "⭐ Contendiente" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-6">
      
      {/* HEADER DE LA RED SOCIAL */}
      <header className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/30">
            www.pracTICAtecnica.com · Red Social &amp; Ligas MEP
          </span>
          <h1 className="text-xl md:text-3xl font-black text-white mt-2">
            La Comunidad Global de Aprendizaje STEM, Ciberseguridad y Hábitos
          </h1>
        </div>

        {/* LOGIN GOOGLE SUPERVISADO */}
        <div>
          {usuarioGoogle ? (
            <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-emerald-500/30">
              <img src={usuarioGoogle.avatar} alt="Avatar" className="w-8 h-8 rounded-full bg-slate-800" />
              <div>
                <div className="text-xs font-black text-white">{usuarioGoogle.nombre}</div>
                <div className="text-[10px] text-emerald-400">⚡ {usuarioGoogle.xp} XP | Racha: {usuarioGoogle.racha} días</div>
              </div>
            </div>
          ) : (
            <button
              onClick={iniciarSesionGoogle}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2"
            >
              <Globe className="h-4 w-4 text-blue-600" />
              <span>Acceso Seguro Google (Supervisado)</span>
            </button>
          )}
        </div>
      </header>

      {/* NAVEGACIÓN INTERNA DE LA RED */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
        {[
          { id: 'LIGAS', label: '🏆 Ligas y Torneos en Vivo', icono: Trophy },
          { id: 'MATERIAS', label: '🧬 Universos de Ciencia y Software', icono: Atom },
          { id: 'GRUPOS', label: '👥 Grupos de Estudio CTP & Académicos', icono: Users }
        ].map((tab) => {
          const IconTab = tab.icono;
          return (
            <button
              key={tab.id}
              onClick={() => setSeccion(tab.id)}
              className={`px-5 py-3 rounded-xl font-black text-xs flex items-center gap-2 transition-all ${seccion === tab.id ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'}`}
            >
              <IconTab className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTENIDO SEGÚN SECCIÓN */}
      <main className="max-w-6xl mx-auto">
        
        {seccion === 'LIGAS' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white">Liga Diamante MEP · Competencia Sana Nacional</h3>
                <p className="text-xs text-slate-400">Compite semanalmente acumulando XP en simulacros, retos de química, ciberseguridad e inglés preescolar.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/30">
                Temporada Activa 2026
              </span>
            </div>

            <div className="space-y-3">
              {rankingLigas.map((user) => (
                <div key={user.puesto} className={`p-4 rounded-xl border flex items-center justify-between ${user.puesto === 4 ? 'bg-cyan-950/40 border-cyan-500/50' : 'bg-slate-950 border-slate-800'}`}>
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${user.puesto === 1 ? 'bg-amber-500 text-slate-950' : user.puesto === 2 ? 'bg-slate-300 text-slate-950' : user.puesto === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-300'}`}>
                      #{user.puesto}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-white">{user.nombre}</div>
                      <div className="text-[11px] text-slate-400">{user.insignia}</div>
                    </div>
                  </div>
                  <div className="font-black text-emerald-400 text-sm">
                    {user.xp} XP
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {seccion === 'MATERIAS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materiasUniverso.map((mat) => {
              const IconMat = mat.icono;
              return (
                <div key={mat.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-cyan-500/50 transition-all">
                  <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800 w-fit ${mat.color}`}>
                    <IconMat className="h-6 w-6" />
                  </div>
                  <h4 className="font-black text-white text-base">{mat.nombre}</h4>
                  <p className="text-xs text-slate-400">
                    Retos interactivos, vocabulario en inglés, simulacros de 15, 20 y 30 ítems con retroalimentación DUA y adaptados al MEP.
                  </p>
                  <button
                    onClick={() => alert(`¡Entrando al módulo de ${mat.nombre}! Competencia y práctica en curso.`)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-slate-700"
                  >
                    Ingresar al Reto 🚀
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {seccion === 'GRUPOS' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <h3 className="text-lg font-black text-white">Grupos de Estudio Colaborativo &amp; Aulas CTP</h3>
            <p className="text-xs text-slate-400">Únete a círculos de estudio guiados por docentes o crea tu propio grupo de práctica para Ciberseguridad, Química y Desarrollo de Software.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-sm">Círculo de Ciberseguridad CTP Mercedes Norte</div>
                <div className="text-xs text-cyan-400">34 estudiantes activos · Docente SuperAdmin</div>
                <button onClick={() => alert("¡Solicitud de ingreso al grupo enviada con éxito!")} className="mt-2 px-4 py-2 rounded-lg bg-cyan-600 text-white font-black text-xs">Unirme al Grupo</button>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-sm">Olimpiadas de Química &amp; Biología MEP</div>
                <div className="text-xs text-emerald-400">128 estudiantes activos · Torneo Abierto</div>
                <button onClick={() => alert("¡Solicitud de ingreso al grupo enviada con éxito!")} className="mt-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-black text-xs">Unirme al Grupo</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}