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

const CLAVE_GUARDADO_LOCAL = 'pt_avance_simulacro_v28_5';

export default function SimuladorUniversitarioMep({ usuarioActual }) {
  const [institucionActiva, setInstitucionActiva] = useState('UCR_UNA');
  const [cantidadMeta, setCantidadMeta] = useState(10); // 10 | 20 | 30 | 40 | 60
  const [modoPractica, setModoPractica] = useState('examen'); // 'examen' (nota al final) | 'guiada' (paso a paso)
  const [modalidadGenerador, setModalidadGenerador] = useState('mixto');
  const [listaReactivos, setListaReactivos] = useState(() =>
    ensamblarSimulacroCompleto('UCR_UNA', 10, 'mixto')
  );
  const [indiceActual, setIndiceActual] = useState(0);
  const [historialRespuestas, setHistorialRespuestas] = useState({});
  const [examenFinalizado, setExamenFinalizado] = useState(false);
  const [mensajeGuardado, setMensajeGuardado] = useState('');

  // Cronómetro exclusivo del simulacro (se ajusta según cantidad de preguntas o 3h)
  const [segundosRestantes, setSegundosRestantes] = useState(3600);
  const [cronometroActivo, setCronometroActivo] = useState(true);

  const [notaColegio, setNotaColegio] = useState(92);
  const [hashCertificado, setHashCertificado] = useState('Calculando huella SHA-256...');

  // Cargar avance guardado si existe en localStorage
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_GUARDADO_LOCAL);
      if (guardado) {
        const parsed = JSON.parse(guardado);
        if (parsed && Array.isArray(parsed.listaReactivos) && parsed.listaReactivos.length > 0) {
          setInstitucionActiva(parsed.institucionActiva || 'UCR_UNA');
          setCantidadMeta(parsed.cantidadMeta || 10);
          setModoPractica(parsed.modoPractica || 'examen');
          setListaReactivos(parsed.listaReactivos);
          setHistorialRespuestas(parsed.historialRespuestas || {});
          setIndiceActual(parsed.indiceActual || 0);
          setSegundosRestantes(parsed.segundosRestantes || 3600);
          setExamenFinalizado(Boolean(parsed.examenFinalizado));
          setMensajeGuardado('✓ Se restauró tu último avance guardado.');
        }
      }
    } catch (e) {
      // Ignorar errores de lectura de caché
    }
  }, []);

  // Configurar nuevo simulacro de 10, 20, 30, 40 o 60 preguntas
  const configurarSimulacro = (nuevaInst, nuevaCant, nuevaMod = modalidadGenerador) => {
    setInstitucionActiva(nuevaInst);
    setCantidadMeta(nuevaCant);
    setModalidadGenerador(nuevaMod);
    const nuevoBanco = ensamblarSimulacroCompleto(nuevaInst, nuevaCant, nuevaMod);
    setListaReactivos(nuevoBanco);
    setHistorialRespuestas({});
    setIndiceActual(0);
    setExamenFinalizado(false);
    // Tiempo proporcional sugerido: 3 min por pregunta (o 3h en 60 preguntas)
    setSegundosRestantes(nuevaCant * 180);
    setCronometroActivo(true);
    setMensajeGuardado('');
  };

  // Guardar avance y pausar cuando el estudiante o docente lo desee
  const guardarAvanceYPausar = () => {
    setCronometroActivo(false);
    const payload = {
      institucionActiva,
      cantidadMeta,
      modoPractica,
      listaReactivos,
      historialRespuestas,
      indiceActual,
      segundosRestantes,
      examenFinalizado,
      fechaGuardado: new Date().toLocaleTimeString('es-CR')
    };
    localStorage.setItem(CLAVE_GUARDADO_LOCAL, JSON.stringify(payload));
    setMensajeGuardado(`💾 Avance guardado y cronómetro en pausa (${payload.fechaGuardado}). Puedes continuar cuando gustes.`);
  };

  useEffect(() => {
    if (!cronometroActivo || examenFinalizado) return;
    const timer = setInterval(() => {
      setSegundosRestantes((prev) => {
        if (prev <= 1) {
          setExamenFinalizado(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cronometroActivo, examenFinalizado]);

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
    // Calificar sobre el total de preguntas del simulacro cuando se finaliza
    const baseEval = modoPractica === 'examen' ? listaReactivos.length : Math.max(1, respondidas);
    const calculo = calcularPuntajeAdmision(institucionActiva, aciertos, baseEval, notaColegio);
    return { aciertos, respondidas, totalPreguntas: listaReactivos.length, ...calculo };
  }, [listaReactivos, historialRespuestas, institucionActiva, notaColegio, modoPractica]);

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

  const seleccionarRespuesta = (idxOpcion) => {
    if (examenFinalizado) return;
    // En modo guiado se bloquea tras responder para mostrar paso a paso; en modo examen permite cambiar antes de entregar
    if (modoPractica === 'guiada' && respuestaGuardada !== undefined) return;
    setHistorialRespuestas((prev) => ({ ...prev, [itemActual.id]: idxOpcion }));
  };

  const inyectarMasInfinitos = (cantidadExtra = 10, tipoForzado = 'mixto') => {
    const baseLen = listaReactivos.length;
    const nuevos = [];
    for (let i = 1; i <= cantidadExtra; i++) {
      nuevos.push(generarItemInfinito(institucionActiva, baseLen + i, tipoForzado));
    }
    setListaReactivos((prev) => [...prev, ...nuevos]);
    setCantidadMeta(baseLen + cantidadExtra);
  };

  const exportarComprobantePdf = () => {
    const instObj = CATALOGO_INSTITUCIONES_SUPERIOR.find((i) => i.id === institucionActiva);
    const fechaHoy = new Date().toLocaleString('es-CR');
    const ventanaPdf = window.open('', '_blank', 'width=920,height=720');
    if (!ventanaPdf) {
      alert('Permite las ventanas emergentes para exportar el comprobante oficial en PDF con firma SHA-256.');
      return;
    }

    const filasHoja = listaReactivos.map((it, idx) => {
      const r = historialRespuestas[it.id];
      const letras = ['A', 'B', 'C', 'D'];
      const estado = r === undefined ? 'Sin responder' : (r === it.correcta ? '✓ CORRECTA' : `✕ INCORRECTA (Marcó ${letras[r]}, Correcta ${letras[it.correcta]})`);
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
              <h1 style="margin:0;font-size:20px;">🦉 practicatecnica.com — CTP Mercedes Norte & BDS Devs</h1>
              <p style="margin:4px 0 0 0;font-size:12px;color:#475569;">Certificado Oficial de Simulacro (${listaReactivos.length} Preguntas)</p>
            </div>
            <div style="text-align:right;font-size:11px;">
              <strong>Fecha:</strong> ${fechaHoy}<br/>
              <strong>Estándar:</strong> Calidad 100% BDS Devs & Ley 8968
            </div>
          </div>
          <div class="box">
            <p style="margin:4px 0;"><strong>Estudiante:</strong> ${usuarioActual?.nombre || 'Estudiante Activo'}</p>
            <p style="margin:4px 0;"><strong>Institución Evaluada:</strong> ${instObj.sigla} — ${instObj.nombre}</p>
            <p style="margin:8px 0;" class="score">Calificación Final: ${estadisticas.puntajeFinal} / ${estadisticas.escalaMax} pts</p>
            <p style="margin:4px 0;font-size:12px;">${estadisticas.detalleFormula}</p>
          </div>
          <h3>Hoja de Respuestas Auditada (${listaReactivos.length} Reactivos)</h3>
          <table>
            <thead>
              <tr style="background:#e2e8f0;">
                <th style="padding:5px;border:1px solid #cbd5e1;">#</th>
                <th style="padding:5px;border:1px solid #cbd5e1;">Subárea</th>
                <th style="padding:5px;border:1px solid #cbd5e1;">Resultado</th>
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

  // Determinar si se deben mostrar los colores de acierto/error y la nota
  const revelarSoluciones = modoPractica === 'guiada' || examenFinalizado;

  return (
    <div className="space-y-6">
      {/* Cabecera Exclusiva del Simulador: Cronómetro, Pausa/Guardado y Selector 10/20/30/40/60 */}
      <div className="bg-slate-900 border border-cyan-500/40 p-5 rounded-2xl shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
              🎯 Simulacros Oficiales con Nota al Final y Guardado de Avance
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2">
              🎓 Simulacros UCR, TEC, UNA, UTN, UNED, Pruebas MEP & Teórica COSEVI
            </h2>
          </div>

          {/* Cronómetro y Botones de Pausa / Guardar Avance */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="text-right pr-2 border-r border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">
                ⏱️ Tiempo de Prueba ({cantidadMeta} ítems)
              </span>
              <span className={`text-2xl font-mono font-extrabold ${cronometroActivo ? 'text-amber-400' : 'text-cyan-400'}`}>
                {formatearTiempo(segundosRestantes)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCronometroActivo(!cronometroActivo)}
                className="bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-bold px-3 py-1.5 rounded-lg"
              >
                {cronometroActivo ? '⏸ Pausar Tiempo' : '▶ Reanudar'}
              </button>
              <button
                onClick={guardarAvanceYPausar}
                className="bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-bold px-3 py-1.5 rounded-lg shadow"
              >
                💾 Guardar Avance y Pausar
              </button>
            </div>
          </div>
        </div>

        {mensajeGuardado && (
          <div className="bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 px-4 py-2.5 rounded-xl text-xs font-bold flex justify-between items-center">
            <span>{mensajeGuardado}</span>
            <button onClick={() => setMensajeGuardado('')} className="text-emerald-300 hover:text-white">✕</button>
          </div>
        )}

        {/* Selector de Cantidad: 10, 20, 30, 40 y 60 Preguntas + Modo */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold text-cyan-400 mr-1">🔢 Cantidad de Preguntas:</span>
            {[10, 20, 30, 40, 60].map((cant) => (
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
              onClick={() => {
                setModoPractica('examen');
                setExamenFinalizado(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                modoPractica === 'examen' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300'
              }`}
            >
              📝 Modo Simulacro (Nota hasta el Final)
            </button>
            <button
              onClick={() => setModoPractica('guiada')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                modoPractica === 'guiada' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300'
              }`}
            >
              🧭 Práctica Guiada (Explicación Inmediata)
            </button>
          </div>
        </div>

        {/* Tarjetas de las 6 Instituciones */}
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

        {/* Barra de Progreso o Panel de Calificación Final (según si ya terminó el simulacro) */}
        {!revelarSoluciones ? (
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-cyan-300">
                  📊 Avance del Simulacro: {estadisticas.respondidas} de {listaReactivos.length} preguntas respondidas
                </span>
                <span className="text-slate-400">
                  La nota final se revelará al entregar el simulacro
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all"
                  style={{ width: `${Math.round((estadisticas.respondidas / listaReactivos.length) * 100)}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                setExamenFinalizado(true);
                setCronometroActivo(false);
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-emerald-600/20 transition-all"
            >
              ✅ Finalizar y Calificar Simulacro Ahora
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center bg-emerald-950/30 border-2 border-emerald-500/60 p-4 rounded-xl">
            <div>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">
                🏆 RESULTADO OFICIAL DEL SIMULACRO
              </span>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-extrabold text-cyan-400">{estadisticas.puntajeFinal}</span>
                <span className="text-xs text-slate-300 font-bold">/ {estadisticas.escalaMax} pts</span>
                <span className="ml-2 text-xs text-emerald-400 font-bold">
                  ({estadisticas.aciertos} aciertos de {listaReactivos.length})
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">{estadisticas.detalleFormula}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200 flex justify-between">
                <span>📊 Nota Educación Diversificada (Colegio):</span>
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
              <p className="text-[10px] text-slate-400">
                UCR/UNA (50% PAA + 50% Colegio) | TEC (60% Examen + 40% Colegio).
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={exportarComprobantePdf}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow"
              >
                📄 Descargar Certificado PDF (SHA-256)
              </button>
              <button
                onClick={() => configurarSimulacro(institucionActiva, cantidadMeta, modalidadGenerador)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold py-1.5 px-3 rounded-lg text-xs"
              >
                ↺ Iniciar Nuevo Simulacro
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Área Interactiva: Pregunta Actual + Hoja de Respuestas */}
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
                if (!revelarSoluciones) {
                  // En modo simulacro activo: solo resalta cuál marcó el estudiante sin revelar si es correcta
                  estiloBoton = idx === respuestaGuardada
                    ? 'bg-cyan-950/90 border-cyan-400 text-white font-bold ring-1 ring-cyan-400'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                } else {
                  // Al finalizar el examen o en modo guiado: revela verde/rojo
                  if (idx === itemActual.correcta) {
                    estiloBoton = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold';
                  } else if (idx === respuestaGuardada && idx !== itemActual.correcta) {
                    estiloBoton = 'bg-rose-950/90 border-rose-500 text-rose-200';
                  } else {
                    estiloBoton = 'bg-slate-950 border-slate-800 opacity-60 text-slate-400';
                  }
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => seleccionarRespuesta(idx)}
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
            {revelarSoluciones && (
              <div className="bg-cyan-950/40 border border-cyan-500/40 p-4 rounded-xl text-xs space-y-1.5">
                <p className="font-extrabold text-cyan-300">💡 Solución Explicada Paso a Paso:</p>
                <p className="text-slate-200 whitespace-pre-line leading-relaxed">
                  {itemActual.guiaPasoAPaso}
                </p>
              </div>
            )}

            <div className="flex flex-wrap justify-between items-center gap-2 pt-2">
              <button
                onClick={() => setIndiceActual(Math.max(0, indiceActual - 1))}
                disabled={indiceActual === 0}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-semibold px-4 py-2 rounded-xl text-xs"
              >
                ← Anterior
              </button>

              <div className="flex gap-2">
                {indiceActual + 1 < listaReactivos.length ? (
                  <button
                    onClick={() => setIndiceActual(indiceActual + 1)}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow"
                  >
                    Siguiente Pregunta →
                  </button>
                ) : (
                  !examenFinalizado && (
                    <button
                      onClick={() => {
                        setExamenFinalizado(true);
                        setCronometroActivo(false);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-lg"
                    >
                      🏆 Entregar y Ver Calificación Final
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hoja de Respuestas (10, 20, 30, 40 o 60 casillas) */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-extrabold text-cyan-400">
                  📋 Hoja Oficial ({listaReactivos.length} Ítems)
                </h3>
                <p className="text-[11px] text-slate-400">
                  {revelarSoluciones ? 'Revisión de aciertos y fallos' : 'Casillas marcadas (sin calificar aún)'}
                </p>
              </div>
              <button
                onClick={guardarAvanceYPausar}
                className="text-[10px] bg-indigo-700 hover:bg-indigo-600 text-white font-bold px-2.5 py-1 rounded"
              >
                💾 Guardar
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto p-1">
              {listaReactivos.map((it, idx) => {
                const resp = historialRespuestas[it.id];
                const letras = ['A', 'B', 'C', 'D'];
                let colorCasilla = 'bg-slate-950 border-slate-800 text-slate-400';

                if (resp !== undefined) {
                  if (!revelarSoluciones) {
                    colorCasilla = 'bg-cyan-950 border-cyan-500 text-cyan-200 font-bold';
                  } else {
                    colorCasilla = resp === it.correcta
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-rose-950 border-rose-500 text-rose-300 font-bold';
                  }
                }
                if (idx === indiceActual) {
                  colorCasilla += ' ring-2 ring-amber-400';
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

          <div className="space-y-2">
            {!examenFinalizado && modoPractica === 'examen' && (
              <button
                onClick={() => {
                  setExamenFinalizado(true);
                  setCronometroActivo(false);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 rounded-xl text-xs shadow-lg"
              >
                ✅ Finalizar Simulacro y Ver Nota
              </button>
            )}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-[11px]">
              <p className="text-white font-bold">🔐 Huella SHA-256:</p>
              <p className="font-mono text-[10px] text-cyan-300 break-all bg-slate-900 p-2 rounded border border-slate-800">
                {hashCertificado}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla Comparativa de Cortes (Visible al finalizar o en práctica guiada) */}
      {revelarSoluciones && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-4">
          <h3 className="text-lg font-extrabold text-white">
            🏛️ Comparador de Cortes Históricos de Carreras (UCR, TEC, UNA, UTN & UNED)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 text-cyan-400 border-b border-slate-800">
                  <th className="p-3">Universidad</th>
                  <th className="p-3">Carrera Universitaria</th>
                  <th className="p-3">Sede</th>
                  <th className="p-3">Corte Oficial</th>
                  <th className="p-3">Diagnóstico con tu Nota Final</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {CORTES_HISTORICOS_CARRERAS.map((c, i) => {
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

      
      
    </div>
  );
}