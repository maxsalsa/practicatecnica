import React, { useState, useEffect } from 'react';
import { generarLoteMilVariantes } from '../utils/motorCuadernillosX1000';

export default function ConsolaCuadernillosDual() {
  const [modalidad, setModalidad] = useState("TODAS");
  const [modoDUA, setModoDUA] = useState(true);
  const [altoContraste, setAltoContraste] = useState(false);
  const [tamanoTexto, setTamanoTexto] = useState("text-sm");
  const [items, setItems] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [xp, setXp] = useState(2500);

  const recargarMultiverso = (mod = modalidad) => {
    const nuevos = generarLoteMilVariantes(mod, 24);
    setItems(nuevos);
    setIndiceActual(0);
    setRespuestas({});
  };

  useEffect(() => {
    recargarMultiverso(modalidad);
  }, [modalidad]);

  const item = items[indiceActual];

  const leerEnVozAlta = (texto) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'es-CR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const responder = (idOpcion) => {
    if (!item) return;
    setRespuestas({ ...respuestas, [item.uid]: idOpcion });
    if (idOpcion === item.correcta) {
      setXp(prev => prev + 150);
    }
  };

  if (!item) return null;
  const respUsuario = respuestas[item.uid];

  return (
    <div className={`max-w-5xl mx-auto my-6 p-6 rounded-2xl border shadow-2xl transition-all ${altoContraste ? 'bg-black border-yellow-400 text-yellow-100' : 'bg-slate-900 border-slate-800 text-slate-100'}`}>
      
      {/* CABECERA SOBERANA GICM + ACCESIBILIDAD MUNDIAL */}
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/40">
            GICM DESARROLLO DE SISTEMAS · MOTOR MULTIVERSAL X1000
          </span>
          <h1 className="text-xl md:text-2xl font-black text-white mt-2">
            pracTICAtecnica.com · Cuadernillo Dual (Académico PNE + Técnico EFTP)
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setModoDUA(!modoDUA)}
            className={`px-3 py-2 rounded-xl text-xs font-black border ${modoDUA ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-950 border-slate-700 text-slate-300'}`}
          >
            ♿ Apoyo DUA: {modoDUA ? 'ACTIVO' : 'OCULTO'}
          </button>
          <button
            onClick={() => setAltoContraste(!altoContraste)}
            className="px-3 py-2 rounded-xl text-xs font-black bg-amber-500 text-slate-950"
          >
            👁️ Alto Contraste
          </button>
          <button
            onClick={() => setTamanoTexto(tamanoTexto === "text-sm" ? "text-lg" : "text-sm")}
            className="px-3 py-2 rounded-xl text-xs font-black bg-slate-800 text-white border border-slate-700"
          >
            🔍 Zoom A+/A-
          </button>
          <button
            onClick={() => leerEnVozAlta(`${item.enunciado}. Apoyo DUA: ${item.dua}`)}
            className="px-3 py-2 rounded-xl text-xs font-black bg-purple-600 text-white"
          >
            🔊 Narrador Voz
          </button>
        </div>
      </div>

      {/* FILTRO DE MODALIDAD + REGENERADOR INFINITO */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "TODAS", label: "🌐 Todo el Universo (PNE + EFTP)" },
            { id: "MOD-ACA", label: "🎓 Cuadernillo Académico (PNE)" },
            { id: "MOD-TEC", label: "⚙️ Especialidades Técnicas (PNEET)" }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setModalidad(m.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${modalidad === m.id ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black">
            ⚡ {xp} XP
          </span>
          <button
            onClick={() => recargarMultiverso(modalidad)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-lg"
          >
            🔄 Multiplicar x1000 Variantes Nuevas
          </button>
        </div>
      </div>

      {/* TARJETA DEL ÍTEM OFICIAL */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
        <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-slate-400 border-b border-slate-800 pb-3">
          <span className="font-black text-cyan-400">{item.uid} · {item.area}</span>
          <span>Subárea: <strong className="text-white">{item.subarea}</strong> ({item.nivel})</span>
        </div>

        <div className="text-xs text-slate-400 italic">
          <strong>Resultado de Aprendizaje / Afirmación:</strong> {item.ra}
        </div>

        <h2 className={`font-black text-white leading-relaxed ${tamanoTexto}`}>
          {item.enunciado}
        </h2>

        {modoDUA && (
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs">
            <strong>💡 Andamiaje Cognitivo Universal (DUA):</strong> {item.dua}
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {item.opciones.map((op) => {
            const seleccionada = respUsuario === op.id;
            const esCorrecta = op.id === item.correcta;
            let estilo = "bg-slate-900 border-slate-800 text-slate-200 hover:border-cyan-500/50";
            if (respUsuario) {
              if (esCorrecta) estilo = "bg-emerald-600/30 border-emerald-400 text-white";
              else if (seleccionada) estilo = "bg-rose-600/30 border-rose-400 text-white";
            }
            return (
              <button
                key={op.id}
                onClick={() => responder(op.id)}
                className={`w-full p-4 rounded-xl border text-left font-bold transition-all ${tamanoTexto} ${estilo}`}
              >
                <span className="font-black mr-2">{op.id})</span> {op.texto}
              </button>
            );
          })}
        </div>

        {respUsuario && (
          <div className={`p-4 rounded-xl border text-xs ${respUsuario === item.correcta ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-rose-950/60 border-rose-500 text-rose-200'}`}>
            <div className="font-black text-sm mb-1">
              {respUsuario === item.correcta ? '✅ ¡ Correcto ! +150 XP' : `❌ Opción seleccionada: ${respUsuario}. La clave oficial es ${item.correcta}.`}
            </div>
            <p><strong>Solucionario Técnico Paso a Paso:</strong> {item.solucionario}</p>
          </div>
        )}

        {/* NAVEGACIÓN DE REACTIVOS */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
          <button
            disabled={indiceActual === 0}
            onClick={() => setIndiceActual(i => Math.max(0, i - 1))}
            className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 text-xs font-black text-white"
          >
            ⬅️ Anterior
          </button>
          <span className="text-xs font-bold text-slate-400">
            Reactivo {indiceActual + 1} de {items.length} (Semilla Aleatoria Activa)
          </span>
          <button
            onClick={() => {
              if (indiceActual + 1 < items.length) setIndiceActual(i => i + 1);
              else recargarMultiverso(modalidad);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-black text-white"
          >
            Siguiente Reactivo ➡️
          </button>
        </div>
      </div>
    </div>
  );
}