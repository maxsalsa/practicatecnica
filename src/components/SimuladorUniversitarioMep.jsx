import React, { useState, useMemo } from 'react';
import {
  CATALOGO_INSTITUCIONES_SUPERIOR,
  ITEMS_SEMILLA_CURADOS,
  generarItemInfinito
} from '../data/bancoUniversidadesMep';

export default function SimuladorUniversitarioMep() {
  const [institucionActiva, setInstitucionActiva] = useState('UCR_UNA');
  const [modoPractica, setModoPractica] = useState('guiada'); // 'guiada' | 'examen'
  const [itemsDinamicos, setItemsDinamicos] = useState([]);
  const [contadorInfinito, setContadorInfinito] = useState(1);
  const [indiceActual, setIndiceActual] = useState(0);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [respondidas, setRespondidas] = useState(0);

  const listaReactivos = useMemo(() => {
    const base = ITEMS_SEMILLA_CURADOS.filter(i => i.institucion === institucionActiva);
    const extras = itemsDinamicos.filter(i => i.institucion === institucionActiva);
    const combinados = [...base, ...extras];
    return combinados.length > 0
      ? combinados
      : [generarItemInfinito(institucionActiva, 1)];
  }, [institucionActiva, itemsDinamicos]);

  const itemActual = listaReactivos[indiceActual] || listaReactivos[0];

  const cambiarInstitucion = (id) => {
    setInstitucionActiva(id);
    setIndiceActual(0);
    setOpcionSeleccionada(null);
    setMostrarExplicacion(false);
  };

  const verificarRespuesta = (idxOpcion) => {
    if (opcionSeleccionada !== null) return;
    setOpcionSeleccionada(idxOpcion);
    setRespondidas(prev => prev + 1);
    if (idxOpcion === itemActual.correcta) {
      setAciertos(prev => prev + 1);
    }
    if (modoPractica === 'guiada') {
      setMostrarExplicacion(true);
    }
  };

  const siguienteReactivo = () => {
    setOpcionSeleccionada(null);
    setMostrarExplicacion(false);
    if (indiceActual + 1 < listaReactivos.length) {
      setIndiceActual(indiceActual + 1);
    } else {
      // Si llega al final, genera automáticamente otro ítem infinito
      inyectarLoteInfinito(1);
      setIndiceActual(listaReactivos.length);
    }
  };

  const inyectarLoteInfinito = (cantidad = 5) => {
    const nuevos = [];
    for (let i = 0; i < cantidad; i++) {
      nuevos.push(generarItemInfinito(institucionActiva, contadorInfinito + i));
    }
    setContadorInfinito(prev => prev + cantidad);
    setItemsDinamicos(prev => [...prev, ...nuevos]);
  };

  return (
    <div className="space-y-6">
      {/* Cabecera de Universidades y Modalidades */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              🎓 Simulacros Universitarios (UCR, TEC, UNA, UTN) & Prácticas MEP
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Motor híbrido con reactivos curados + Generador Paramétrico Infinito para prácticas guiadas paso a paso.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setModoPractica('guiada')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                modoPractica === 'guiada'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🧭 Práctica Guiada (Paso a Paso)
            </button>
            <button
              onClick={() => setModoPractica('examen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                modoPractica === 'examen'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              ⏱️ Modo Simulacro Examen
            </button>
          </div>
        </div>

        {/* Tarjetas Selectoras de Institución */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CATALOGO_INSTITUCIONES_SUPERIOR.map((inst) => {
            const activo = inst.id === institucionActiva;
            return (
              <button
                key={inst.id}
                onClick={() => cambiarInstitucion(inst.id)}
                className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  activo
                    ? `bg-gradient-to-br ${inst.color} border-cyan-400 shadow-lg scale-[1.01]`
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-2xl">{inst.icono}</span>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-black/30 text-cyan-300">
                    {inst.sigla}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-snug">{inst.nombre}</p>
                  <p className="text-[10px] text-slate-300 mt-1 line-clamp-2">{inst.descripcion}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Área Interactiva del Reactivo */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-cyan-950 text-cyan-300 border border-cyan-700/50 px-2.5 py-1 rounded-lg font-bold">
              {itemActual.area}
            </span>
            <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg">
              Reactivo {indiceActual + 1} de {listaReactivos.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold">
              ✓ Aciertos: {aciertos} / {respondidas}
            </span>
            <button
              onClick={() => inyectarLoteInfinito(5)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-lg transition-all shadow flex items-center gap-1"
            >
              <span>♾️</span> +5 Ítems Infinitos
            </button>
          </div>
        </div>

        {/* Enunciado */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
          <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
            {itemActual.enunciado}
          </p>
        </div>

        {/* Opciones */}
        <div className="grid grid-cols-1 gap-3">
          {itemActual.opciones.map((op, idx) => {
            const letras = ['A', 'B', 'C', 'D'];
            let estiloBoton = 'bg-slate-950 border-slate-800 hover:border-cyan-500 text-slate-200';

            if (opcionSeleccionada !== null) {
              if (idx === itemActual.correcta) {
                estiloBoton = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold';
              } else if (idx === opcionSeleccionada && idx !== itemActual.correcta) {
                estiloBoton = 'bg-rose-950/90 border-rose-500 text-rose-200';
              } else {
                estiloBoton = 'bg-slate-950 border-slate-800 opacity-60 text-slate-400';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => verificarRespuesta(idx)}
                disabled={opcionSeleccionada !== null}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 text-xs sm:text-sm ${estiloBoton}`}
              >
                <span className="bg-slate-800 text-cyan-300 font-mono font-bold px-2.5 py-1 rounded">
                  {letras[idx]}
                </span>
                <span className="flex-1 pt-0.5">{op}</span>
              </button>
            );
          })}
        </div>

        {/* Retroalimentación de Práctica Guiada */}
        {opcionSeleccionada !== null && (
          <div className="space-y-3 pt-2">
            {(mostrarExplicacion || modoPractica === 'guiada') && (
              <div className="bg-cyan-950/40 border border-cyan-500/40 p-4 rounded-xl text-xs space-y-1.5">
                <p className="font-extrabold text-cyan-300 flex items-center gap-1.5">
                  <span>💡</span> Solución y Guía Paso a Paso:
                </p>
                <p className="text-slate-200 whitespace-pre-line leading-relaxed">
                  {itemActual.guiaPasoAPaso}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              {modoPractica === 'examen' && !mostrarExplicacion ? (
                <button
                  onClick={() => setMostrarExplicacion(true)}
                  className="text-xs text-cyan-400 hover:underline font-semibold"
                >
                  🔍 Ver resolución explicada
                </button>
              ) : <div />}

              <button
                onClick={siguienteReactivo}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow"
              >
                Siguiente Reactivo (o Generar Nuevo) →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}