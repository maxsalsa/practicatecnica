import React, { useState, useEffect, useMemo } from 'react';
import {
  IDIOMAS_DISPONIBLES,
  LIBROS_DESCARGABLES,
  CATALOGO_MATERIAS_Y_ESPECIALIDADES,
  hablarTexto,
  generarBancoEspecialidad
} from '../utils/motorCuadernillosX1000';

export default function ConsolaCuadernillosDual() {
  const [modoEstudio, setModoEstudio] = useState("PRACTICA_GUIADA");
  const [grupoFiltro, setGrupoFiltro] = useState("TODOS");
  const [especialidadId, setEspecialidadId] = useState("MOPT-B1");
  const [dificultad, setDificultad] = useState("TODAS");
  const [semilla, setSemilla] = useState(2026);
  const [idioma, setIdioma] = useState("ES");
  const [bilingue, setBilingue] = useState(true);
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState({});

  const gruposDisponibles = [
    "TODOS",
    "MOPT y Admisión Universitaria",
    "Secundaria Académica (PNE)",
    "Primaria (1.° a 6.° Grado)",
    "Especialidades TIC y Ciberseguridad (CTP)",
    "Agroecología y Agroindustria (CTP)",
    "Ingeniería, Construcción y Diseño (CTP)",
    "Comercio, Finanzas y Turismo (CTP)"
  ];

  const catalogoFiltrado = useMemo(() => {
    return CATALOGO_MATERIAS_Y_ESPECIALIDADES.filter(x => grupoFiltro === "TODOS" || x.grupo === grupoFiltro);
  }, [grupoFiltro]);

  useEffect(() => {
    const lote = generarBancoEspecialidad(especialidadId, 60, semilla, dificultad);
    setPreguntas(lote);
    setIndice(0);
    setRespuestas({});
  }, [especialidadId, dificultad, semilla]);

  const espActual = CATALOGO_MATERIAS_Y_ESPECIALIDADES.find(e => e.id === especialidadId) || CATALOGO_MATERIAS_Y_ESPECIALIDADES[0];
  const item = preguntas[indice];

  return (
    <div className="min-h-screen bg-[#06152d] text-slate-100 pb-20">
      <header className="sticky top-0 z-40 bg-[#071936]/95 backdrop-blur border-b border-slate-800 px-4 py-3 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div>
            <div className="text-xl font-black text-white">prac<span className="text-sky-400">TICA</span>tecnica.com</div>
            <div className="text-xs text-cyan-300 font-bold">Activa: {espActual.nombre}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setModoEstudio("PRACTICA_GUIADA")} className={`px-3.5 py-2 rounded-xl text-xs font-black ${modoEstudio === "PRACTICA_GUIADA" ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-white'}`}>📘 Práctica Guiada DUA</button>
            <button onClick={() => setModoEstudio("SIMULACRO")} className={`px-3.5 py-2 rounded-xl text-xs font-black ${modoEstudio === "SIMULACRO" ? 'bg-sky-500 text-slate-950' : 'bg-slate-900 text-white'}`}>⏱️ Simulacro (60)</button>
            <button onClick={() => setBilingue(!bilingue)} className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-black">🇬🇧 ES/EN {bilingue ? 'ON' : 'OFF'}</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-5 space-y-5">
        {/* SELECTOR DE PRUEBA (MOPT, CIENCIAS, ESPAÑOL, WEB, AGRO, INGENIERÍA) */}
        <section className="p-5 rounded-2xl bg-[#091e3a] border-2 border-sky-400/50 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            <div className="md:col-span-4">
              <label className="block text-xs font-black text-sky-400 mb-1">1. Categoría de Prueba</label>
              <select
                value={grupoFiltro}
                onChange={e => {
                  const g = e.target.value;
                  setGrupoFiltro(g);
                  const pri = CATALOGO_MATERIAS_Y_ESPECIALIDADES.find(x => g === "TODOS" || x.grupo === g);
                  if (pri) setEspecialidadId(pri.id);
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-white"
              >
                {gruposDisponibles.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className="md:col-span-6">
              <label className="block text-xs font-black text-amber-400 mb-1">2. Elige Prueba, Materia o Especialidad ({catalogoFiltrado.length})</label>
              <select
                value={especialidadId}
                onChange={e => setEspecialidadId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-amber-400 text-xs sm:text-sm font-black text-white"
              >
                {catalogoFiltrado.map(esp => <option key={esp.id} value={esp.id}>{esp.nombre}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <button onClick={() => setSemilla(s => s + 17)} className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs">
                🔄 Variantes
              </button>
            </div>
          </div>

          {/* BOTONES RÁPIDOS 1-CLIC */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
            {[
              { id: "MOPT-B1", t: "🚗 MOPT Carro B1" },
              { id: "MOPT-A", t: "🏍️ MOPT Moto A" },
              { id: "ADM-UNI", t: "🎓 Admisión UCR/TEC" },
              { id: "ACA-ESP", t: "📖 Español" },
              { id: "ACA-MAT", t: "📐 Matemáticas" },
              { id: "ACA-BIO", t: "🧬 Biología" },
              { id: "ACA-FIS", t: "⚡ Física" },
              { id: "ACA-QUI", t: "🧪 Química" },
              { id: "ACA-ESO", t: "🌎 Sociales" },
              { id: "ACA-CIV", t: "🏛️ Cívica" },
              { id: "ACA-ING", t: "🇬🇧 Inglés" },
              { id: "TEC-3016", t: "🌐 3016 Web y Ciber" },
              { id: "TEC-3028", t: "🖧 3028 Redes" },
              { id: "TEC-1001", t: "🌱 1001 Agroecología" },
              { id: "TEC-1003", t: "🍍 1003 Agroindustria" },
              { id: "TEC-2003", t: "🏗️ 2003 Construcción Civil" },
              { id: "TEC-2007", t: "✒️ 2007 Diseño Gráfico" }
            ].map(b => (
              <button
                key={b.id}
                onClick={() => setEspecialidadId(b.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold ${especialidadId === b.id ? 'bg-amber-400 text-slate-950 font-black scale-105' : 'bg-slate-950 text-slate-200 border border-slate-800'}`}
              >
                {b.t}
              </button>
            ))}
          </div>
        </section>

        {/* PREGUNTA ACTIVA */}
        {item && (
          <section className="p-6 rounded-2xl bg-[#091e3a] border border-slate-800 space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="px-3 py-1 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-bold">
                  Pregunta {indice + 1} de 60 · {item.uid}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">{espActual.nombre} · <span className="text-sky-400">{item.subarea}</span></h2>
              </div>
              <div className="flex gap-2">
                <button onClick={() => hablarTexto(item.enunciado, "es-CR")} className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold">🔊 Escuchar ES</button>
                {bilingue && <button onClick={() => hablarTexto(item.enunciadoEn, "en-US")} className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold">🔊 Listen EN</button>}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <p className="text-base sm:text-lg font-medium text-white leading-relaxed">{item.enunciado}</p>
              {bilingue && <p className="text-sm text-indigo-300 pt-2 border-t border-slate-800">🇬🇧 {item.enunciadoEn}</p>}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border-l-4 border-cyan-400 text-xs text-slate-200">
              <strong className="text-cyan-300">💡 Orientación DUA:</strong> {item.dua}
            </div>

            <div className="space-y-2.5">
              {item.opciones.map(op => {
                const r = respuestas[item.uid];
                const marcada = r === op.id;
                const esCorrecta = op.id === item.correcta;
                let cl = "bg-slate-950 border-slate-800 text-slate-100 hover:border-sky-400";
                if (r) {
                  if (esCorrecta) cl = "bg-emerald-950/80 border-emerald-400 text-white";
                  else if (marcada) cl = "bg-rose-950/80 border-rose-400 text-white";
                }
                return (
                  <button
                    key={op.id}
                    onClick={() => setRespuestas(prev => ({ ...prev, [item.uid]: op.id }))}
                    className={`w-full p-4 rounded-xl border-2 text-left flex items-start gap-3 ${cl}`}
                  >
                    <span className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-black text-sky-400">{op.id}</span>
                    <div className="flex-1">
                      <div className="text-sm sm:text-base">{op.texto}</div>
                      {bilingue && <div className="text-xs text-indigo-300">[EN] {op.textoEn}</div>}
                    </div>
                  </button>
                );
              })}
            </div>

            {respuestas[item.uid] && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-400 text-xs sm:text-sm space-y-1">
                <div className="font-bold text-emerald-300">Clave Oficial Verificada: Opción {item.correcta}</div>
                <p>{item.solucionario}</p>
              </div>
            )}

            <div className="flex justify-between pt-3 border-t border-slate-800">
              <button disabled={indice === 0} onClick={() => setIndice(i => Math.max(0, i - 1))} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold">⬅️ Anterior</button>
              <button onClick={() => setIndice(i => (i + 1 < preguntas.length ? i + 1 : 0))} className="px-5 py-2 rounded-xl bg-sky-500 text-slate-950 text-xs font-black">Siguiente Pregunta ➡️</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}