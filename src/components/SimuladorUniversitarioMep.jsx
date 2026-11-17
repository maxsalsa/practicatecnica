import React, { useState, useEffect, useMemo } from 'react';
import {
  CATALOGO_INSTITUCIONES_SUPERIOR,
  CORTES_HISTORICOS_CARRERAS,
  ensamblarSimulacroCompleto,
  generarItemInfinito,
  calcularPuntajeAdmision
} from '../data/bancoUniversidadesMep';
import SimuladorVialCoseviCanvas from './SimuladorVialCoseviCanvas';
import SuiteAuditoriaQaBds from './SuiteAuditoriaQaBds';

export default function SimuladorUniversitarioMep({ usuarioActual }) {
  const [institucionActiva, setInstitucionActiva] = useState('UCR_UNA');
  const [cantidadMeta, setCantidadMeta] = useState(20); // 20 | 30 | 40 | 60
  const [modoPractica, setModoPractica] = useState('guiada');
  const [modalidadGenerador, setModalidadGenerador] = useState('mixto');
  const [listaReactivos, setListaReactivos] = useState(() =>
    ensamblarSimulacroCompleto('UCR_UNA', 20, 'mixto')
  );
  const [indiceActual, setIndiceActual] = useState(0);
  const [historialRespuestas, setHistorialRespuestas] = useState({});
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [mostrarTablaCortes, setMostrarTablaCortes] = useState(true);

  // Cronómetro Oficial de 3 Horas (10,800 segundos)
  const [segundosRestantes, setSegundosRestantes] = useState(10800);
  const [cronometroActivo, setCronometroActivo] = useState(true);

  const [notaColegio, setNotaColegio] = useState(92);
  const [hashCertificado, setHashCertificado] = useState('Calculando huella SHA-256...');

  // Re-ensamblar cuando cambia la institución, el tamaño (20, 30, 40, 60) o la modalidad
  const configurarSimulacro = (nuevaInst, nuevaCant, nuevaMod = modalidadGenerador) => {
    setInstitucionActiva(nuevaInst);
    setCantidadMeta(nuevaCant);
    setModalidadGenerador(nuevaMod);
    const nuevoBanco = ensamblarSimulacroCompleto(nuevaInst, nuevaCant, nuevaMod);
    setListaReactivos(nuevoBanco);
    setIndiceActual(0);
    setMostrarExplicacion(false);
  };

  useEffect(() => {
    if (!cronometroActivo) return;
    const timer = setInterval(() => {
      setSegundosRestantes((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cronometroActivo]);

  const formatearTiempo = (totalSeg) => {
    const h = Math.floor(totalSeg / 3600);
    const m = Math.floor((totalSeg % 3600) / 60);
    const s = totalSeg % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const itemActual = listaReactivos[indiceActual] || listaReactivos[0];
  const respuestaGuardada = historialRespuestas[itemActual.id];

  const estadisticas = useMemo(() => {
    let aciertos = 0;
    let respondidas = 0;
    listaReactivos.forEach((it) => {
      const resp = historialRespuestas[it.id];
      if (resp !== undefined) {
        respondidas += 1;
        if (resp === it.correcta) aciertos += 1;
      }
    });
    const calculo = calcularPuntajeAdmision(institucionActiva, aciertos, respondidas, notaColegio);
    return { aciertos, respondidas, ...calculo };
  }, [listaReactivos, historialRespuestas, institucionActiva, notaColegio]);

  useEffect(() => {
    async function generarSha256() {
      const payload = `${usuarioActual?.nombre || 'Estudiante'}-${institucionActiva}-${cantidadMeta}-${estadisticas.puntajeFinal}-${estadisticas.aciertos}-BDS-DEVS-2026`;
      if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
        const msgBuffer = new TextEncoder().encode(payload);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setHashCertificado(hashHex.toUpperCase());
      } else {
        setHashCertificado('SHA256-9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08');
      }
    }
    generarSha256();
  }, [institucionActiva, cantidadMeta, estadisticas, usuarioActual]);

  const verificarRespuesta = (idxOpcion) => {
    if (respuestaGuardada !== undefined) return;
    setHistorialRespuestas(prev => ({ ...prev, [itemActual.id]: idxOpcion }));
    if (modoPractica === 'guiada') {
      setMostrarExplicacion(true);
    }
  };

  const inyectarMasInfinitos = (cantidadExtra = 10, tipoForzado = 'mixto') => {
    const baseLen = listaReactivos.length;
    const nuevos = [];
    for (let i = 1; i <= cantidadExtra; i++) {
      nuevos.push(generarItemInfinito(institucionActiva, baseLen + i, tipoForzado));
    }
    setListaReactivos(prev => [...prev, ...nuevos]);
    setCantidadMeta(baseLen + cantidadExtra);
  };

  const exportarComprobantePdf = () => {
    const instObj = CATALOGO_INSTITUCIONES_SUPERIOR.find(i => i.id === institucionActiva);
    const fechaHoy = new Date().toLocaleString('es-CR');
    const ventanaPdf = window.open('', '_blank', 'width=920,height=720');
    if (!ventanaPdf) {
      alert('Permite las ventanas emergentes para exportar el comprobante oficial en PDF con firma SHA-256.');
      return;
    }

    const filasHoja = listaReactivos.map((it, idx) => {
      const r = historialRespuestas[it.id];
      const letras = ['A', 'B', 'C', 'D'];
      const estado = r === undefined ? 'Pendiente' : (r === it.correcta ? '✓ CORRECTA' : `✕ INCORRECTA (Marcó ${letras[r]}, Correcta ${letras[it.correcta]})`);
      return `<tr>
        <td style="padding:5px;border:1px solid #cbd5e1;text-align:center;">#${idx + 1}</td>
        <td style="padding:5px;border:1px solid #cbd5e1;">${it.subarea || it.area}</td>
        <td style="padding:5px;border:1px solid #cbd5e1;">${estado}</td>
      </tr>`;
    }).join('');

    ventanaPdf.document.write(`
      <html>
        <head>
          <title>Comprobante Oficial de Simulacro — ${instObj.sigla}</title>
          <style>
            body { font-family: Arial, sans-serif; color: #0f172a; padding: 28px; }
            .header { border-bottom: 3px solid #0284c7; padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; }
            .box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; margin-bottom: 18px; }
            .score { font-size: 26px; font-weight: bold; color: #0369a1; }
            .sha { font-family: monospace; font-size: 11px; background: #0f172a; color: #38bdf8; padding: 10px; border-radius: 6px; word-break: break-all; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 style="margin:0;font-size:20px;">🦉 pracTICAtecnica.com — CTP Mercedes Norte & BDS Devs</h1>
              <p style="margin:4px 0 0 0;font-size:12px;color:#475569;">Certificado de Simulacro Oficial (${listaReactivos.length} Preguntas)</p>
            </div>
            <div style="text-align:right;font-size:11px;">
              <strong>Fecha:</strong> ${fechaHoy}<br/>
              <strong>Estándar:</strong> Calidad 100% BDS Devs & Ley 8968
            </div>
          </div>
          <div class="box">
            <p style="margin:4px 0;"><strong>Estudiante:</strong> ${usuarioActual?.nombre || 'Estudiante Activo'}</p>
            <p style="margin:4px 0;"><strong>Institución Evaluada:</strong> ${instObj.sigla} — ${instObj.nombre}</p>
            <p style="margin:8px 0;" class="score">Nota Estimada: ${estadisticas.puntajeFinal} / ${estadisticas.escalaMax} pts</p>
            <p style="margin:4px 0;font-size:12px;">${estadisticas.detalleFormula}</p>
          </div>
          <h3>Desglose de los ${listaReactivos.length} Reactivos</h3>
          <table>
            <thead>
              <tr style="background:#e2e8f0;">
                <th style="padding:5px;border:1px solid #cbd5e1;">#</th>
                <th style="padding:5px;border:1px solid #cbd5e1;">Subárea</th>
                <th style="padding:5px;border:1px solid #cbd5e1;">Estado</th>
              </tr>
            </thead>
            <tbody>${filasHoja}</tbody>
          </table>
          <p style="font-size:11px;font-weight:bold;margin-top:18px;">🔒 Firma Criptográfica SHA-256:</p>
          <div class="sha">${hashCertificado}</div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    ventanaPdf.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Cabecera Maestra con Cronómetro 3h y Selector de 20, 30, 40 y 60 Preguntas */}
      <div className="bg-slate-900 border border-cyan-500/40 p-5 rounded-2xl shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
              ⚡ Calidad 100% BDS Devs — Simulacros de 20, 30, 40 y 60 Preguntas Activos
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2">
              🎓 Admisión UCR, TEC, UNA, UTN, UNED, Pruebas MEP & Simulador Vial 2D
            </h2>
          </div>

          {/* Cronómetro Oficial de 3 Horas */}
          <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">⏱️ Cronómetro Oficial (3 Horas)</span>
              <span className="text-2xl font-mono font-extrabold text-amber-400">{formatearTiempo(segundosRestantes)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setCronometroActivo(!cronometroActivo)}
                className="bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-bold px-2.5 py-1 rounded"
              >
                {cronometroActivo ? '⏸ Pausar' : '▶ Reanudar'}
              </button>
              <button
                onClick={() => setSegundosRestantes(10800)}
                className="bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 px-2.5 py-0.5 rounded"
              >
                ↺ Reiniciar 3h
              </button>
            </div>
          </div>
        </div>

        {/* Selector de Tamaño de Simulacro: 20, 30, 40 o 60 Preguntas + Modo Guiado/Examen */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold text-cyan-400 mr-1">🔢 Cantidad de Preguntas del Simulacro:</span>
            {[20, 30, 40, 60].map((cant) => (
              <button
                key={cant}
                onClick={() => configurarSimulacro(institucionActiva, cant, modalidadGenerador)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                  cantidadMeta === cant
                    ? 'bg-amber-600 text-white border-amber-400 shadow-lg scale-105'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-cyan-500'
                }`}
              >
                {cant} Preguntas
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setModoPractica('guiada')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                modoPractica === 'guiada' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              🧭 Práctica Guiada (Paso a Paso)
            </button>
            <button
              onClick={() => setModoPractica('examen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                modoPractica === 'examen' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              📝 Modo Examen Sin Pistas
            </button>
          </div>
        </div>

        {/* Tarjetas de las 6 Instituciones (UCR/UNA, TEC, UTN, UNED, MEP, COSEVI) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {CATALOGO_INSTITUCIONES_SUPERIOR.map((inst) => {
            const activo = inst.id === institucionActiva;
            return (
              <button
                key={inst.id}
                onClick={() => configurarSimulacro(inst.id, cantidadMeta, modalidadGenerador)}
                className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between ${
                  activo
                    ? `bg-gradient-to-br ${inst.color} border-cyan-400 shadow-lg scale-[1.01]`
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xl">{inst.icono}</span>
                  <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-black/40 text-cyan-300">
                    {inst.sigla}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-snug">{inst.nombre}</p>
                  <p className="text-[10px] text-amber-300 font-semibold mt-1">{inst.escala}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel de Nota 200-800 y Control Deslizable de Nota de Colegio */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <p className="text-xs text-slate-400">Puntaje Estimado de Admisión:</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-cyan-400">{estadisticas.puntajeFinal}</span>
              <span className="text-xs text-slate-400 font-bold">/ {estadisticas.escalaMax} pts</span>
              <span className="ml-2 text-xs text-emerald-400 font-semibold">
                ({estadisticas.aciertos}/{estadisticas.respondidas} aciertos de {listaReactivos.length})
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">{estadisticas.detalleFormula}</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 flex justify-between">
              <span>📊 Promedio Educación Diversificada (Colegio):</span>
              <span className="text-cyan-300 font-mono">{notaColegio} / 100</span>
            </label>
            <input
              type="range"
              min="70"
              max="100"
              value={notaColegio}
              onChange={(e) => setNotaColegio(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">
              Ponderación automática: UCR/UNA (50% PAA + 50% Colegio) | TEC (60% Examen + 40% Colegio).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
            <button
              onClick={exportarComprobantePdf}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow flex items-center justify-center gap-2"
            >
              <span>📄</span> Exportar Certificado PDF (Firma SHA-256)
            </button>
            <button
              onClick={() => setMostrarTablaCortes(!mostrarTablaCortes)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold py-1.5 px-3 rounded-lg text-[11px]"
            >
              {mostrarTablaCortes ? '🔼 Ocultar Tabla de Cortes de Carreras' : '🔽 Ver Tabla de Cortes de Carreras UCR/TEC'}
            </button>
          </div>
        </div>
      </div>

      {/* Si está seleccionada COSEVI, mostrar también el Jueguito Interactivo en Canvas 2D */}
      {institucionActiva === 'COSEVI' && (
        <SimuladorVialCoseviCanvas />
      )}

      {/* Área Interactiva: Reactivo Actual + Hoja de Respuestas de 20/30/40/60 Casillas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-cyan-950 text-cyan-300 border border-cyan-700/50 px-2.5 py-1 rounded-lg font-bold">
                {itemActual.area}
              </span>
              <span className="bg-slate-800 text-amber-300 font-bold px-2.5 py-1 rounded-lg">
                Pregunta #{indiceActual + 1} de {listaReactivos.length}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => inyectarMasInfinitos(10, 'verbal')}
                className="bg-sky-700 hover:bg-sky-600 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px]"
              >
                📖 +10 Verbal / Inglés
              </button>
              <button
                onClick={() => inyectarMasInfinitos(10, 'matematico')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px]"
              >
                ♾️ +10 Mate / Redes
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              {itemActual.enunciado}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {itemActual.opciones.map((op, idx) => {
              const letras = ['A', 'B', 'C', 'D'];
              let estiloBoton = 'bg-slate-950 border-slate-800 hover:border-cyan-500 text-slate-200';

              if (respuestaGuardada !== undefined) {
                if (idx === itemActual.correcta) {
                  estiloBoton = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold';
                } else if (idx === respuestaGuardada && idx !== itemActual.correcta) {
                  estiloBoton = 'bg-rose-950/90 border-rose-500 text-rose-200';
                } else {
                  estiloBoton = 'bg-slate-950 border-slate-800 opacity-60 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => verificarRespuesta(idx)}
                  disabled={respuestaGuardada !== undefined}
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

          <div className="space-y-3 pt-2">
            {respuestaGuardada !== undefined && (mostrarExplicacion || modoPractica === 'guiada') && (
              <div className="bg-cyan-950/40 border border-cyan-500/40 p-4 rounded-xl text-xs space-y-1.5">
                <p className="font-extrabold text-cyan-300">💡 Solución Explicada Paso a Paso:</p>
                <p className="text-slate-200 whitespace-pre-line leading-relaxed">
                  {itemActual.guiaPasoAPaso}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setIndiceActual(Math.max(0, indiceActual - 1))}
                disabled={indiceActual === 0}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-semibold px-4 py-2 rounded-xl text-xs"
              >
                ← Anterior
              </button>
              <button
                onClick={() => {
                  setMostrarExplicacion(false);
                  if (indiceActual + 1 < listaReactivos.length) {
                    setIndiceActual(indiceActual + 1);
                  } else {
                    inyectarMasInfinitos(5, modalidadGenerador);
                    setIndiceActual(listaReactivos.length);
                  }
                }}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow"
              >
                Siguiente Pregunta →
              </button>
            </div>
          </div>
        </div>

        {/* Hoja de Respuestas Dinámica (20, 30, 40 o 60 casillas) */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-extrabold text-cyan-400">
                  📋 Hoja Oficial ({listaReactivos.length} Ítems)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Navega por las {listaReactivos.length} preguntas del simulacro.
                </p>
              </div>
              <button
                onClick={() => setHistorialRespuestas({})}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded"
              >
                Limpiar Hoja
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto p-1">
              {listaReactivos.map((it, idx) => {
                const resp = historialRespuestas[it.id];
                const letras = ['A', 'B', 'C', 'D'];
                let colorCasilla = 'bg-slate-950 border-slate-800 text-slate-400';
                if (resp !== undefined) {
                  colorCasilla = resp === it.correcta
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-rose-950 border-rose-500 text-rose-300 font-bold';
                }
                if (idx === indiceActual) {
                  colorCasilla += ' ring-2 ring-cyan-400';
                }

                return (
                  <button
                    key={it.id}
                    onClick={() => setIndiceActual(idx)}
                    className={`p-2 rounded-lg border text-xs flex flex-col items-center justify-center transition-all ${colorCasilla}`}
                  >
                    <span>#{idx + 1}</span>
                    <span className="text-[10px] font-mono">
                      {resp !== undefined ? letras[resp] : '-'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-[11px]">
            <p className="text-white font-bold">🔐 Huella SHA-256 en Tiempo Real:</p>
            <p className="font-mono text-[10px] text-cyan-300 break-all bg-slate-900 p-2 rounded border border-slate-800">
              {hashCertificado}
            </p>
          </div>
        </div>
      </div>

      {/* Tabla Comparativa de Cortes Históricos de Carreras (UCR, TEC, UNA, UTN, UNED) */}
      {mostrarTablaCortes && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-lg font-extrabold text-white">
                🏛️ Comparador de Cortes Históricos de Carreras (UCR, TEC, UNA, UTN & UNED)
              </h3>
              <p className="text-xs text-slate-400">
                Compara automáticamente tu puntaje actual ({estadisticas.puntajeFinal} / {estadisticas.escalaMax} pts) con los cortes de admisión.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 text-cyan-400 border-b border-slate-800">
                  <th className="p-3">Universidad</th>
                  <th className="p-3">Carrera Universitaria</th>
                  <th className="p-3">Sede / Campus</th>
                  <th className="p-3">Corte Referencia</th>
                  <th className="p-3">Diagnóstico con tu Nota Actual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {CORTES_HISTORICOS_CARRERAS.map((c, i) => {
                  // Normalizar comparación según si la carrera está en escala 800 o 100
                  const puntajeComparable = c.escala === estadisticas.escalaMax
                    ? estadisticas.puntajeFinal
                    : c.escala === 800
                      ? Math.round(200 + (estadisticas.puntajeFinal / 100) * 600)
                      : Math.round(((estadisticas.puntajeFinal - 200) / 600) * 100);

                  const alcanza = puntajeComparable >= c.corte;
                  const diferencia = puntajeComparable - c.corte;

                  return (
                    <tr key={i} className="hover:bg-slate-950/60">
                      <td className="p-3 font-extrabold text-white">{c.universidad}</td>
                      <td className="p-3 font-semibold text-slate-200">{c.carrera}</td>
                      <td className="p-3 text-slate-400">{c.sede}</td>
                      <td className="p-3 font-mono font-bold text-amber-300">{c.corte} / {c.escala}</td>
                      <td className="p-3">
                        {alcanza ? (
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-600 px-2.5 py-1 rounded-lg font-bold">
                            ✓ SUPERA EL CORTE (+{diferencia} pts)
                          </span>
                        ) : (
                          <span className="bg-amber-950 text-amber-300 border border-amber-700 px-2.5 py-1 rounded-lg font-semibold">
                            ⚡ A {Math.abs(diferencia)} pts del corte
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Botón directo al Simulador Vial 2D también desde cualquier pestaña */}
      {institucionActiva !== 'COSEVI' && (
        <SimuladorVialCoseviCanvas />
      )}

      {/* Suite de Auditoría QA Caja Negra / Caja Blanca / Funcional / Integral */}
      <SuiteAuditoriaQaBds />
    </div>
  );
}