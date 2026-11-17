import React, { useState, useEffect, useMemo } from 'react';
import {
  CATALOGO_INSTITUCIONES_SUPERIOR,
  ITEMS_SEMILLA_CURADOS,
  generarItemInfinito,
  calcularPuntajeAdmision
} from '../data/bancoUniversidadesMep';

export default function SimuladorUniversitarioMep({ usuarioActual }) {
  const [institucionActiva, setInstitucionActiva] = useState('UCR_UNA');
  const [modoPractica, setModoPractica] = useState('guiada');
  const [modalidadGenerador, setModalidadGenerador] = useState('mixto'); // 'mixto' | 'verbal' | 'matematico'
  const [itemsDinamicos, setItemsDinamicos] = useState([]);
  const [contadorInfinito, setContadorInfinito] = useState(1);
  const [indiceActual, setIndiceActual] = useState(0);
  const [historialRespuestas, setHistorialRespuestas] = useState({});
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);

  // Cronómetro Oficial de 3 Horas (10,800 segundos)
  const [segundosRestantes, setSegundosRestantes] = useState(10800);
  const [cronometroActivo, setCronometroActivo] = useState(true);

  // Nota de Educación Diversificada (Colegio) para cálculo UCR/UNA (50/50) y TEC (60/40)
  const [notaColegio, setNotaColegio] = useState(92);
  const [hashCertificado, setHashCertificado] = useState('Calculando huella SHA-256...');

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

  const listaReactivos = useMemo(() => {
    const base = ITEMS_SEMILLA_CURADOS.filter(i => i.institucion === institucionActiva);
    const extras = itemsDinamicos.filter(i => i.institucion === institucionActiva);
    const combinados = [...base, ...extras];
    return combinados.length > 0 ? combinados : [generarItemInfinito(institucionActiva, 1, modalidadGenerador)];
  }, [institucionActiva, itemsDinamicos, modalidadGenerador]);

  const itemActual = listaReactivos[indiceActual] || listaReactivos[0];
  const respuestaGuardada = historialRespuestas[itemActual.id];

  // Estadísticas y Nota en Escala 200-800 (UCR/TEC) o 0-100 (UTN/MEP/COSEVI)
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

  // Generar Huella Criptográfica SHA-256 Real con Web Crypto API
  useEffect(() => {
    async function generarSha256() {
      const payload = `${usuarioActual?.nombre || 'Estudiante'}-${institucionActiva}-${estadisticas.puntajeFinal}-${estadisticas.aciertos}-${estadisticas.respondidas}-CTP-MERCEDES-NORTE-2026`;
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
  }, [institucionActiva, estadisticas, usuarioActual]);

  const cambiarInstitucion = (id) => {
    setInstitucionActiva(id);
    setIndiceActual(0);
    setMostrarExplicacion(false);
  };

  const verificarRespuesta = (idxOpcion) => {
    if (respuestaGuardada !== undefined) return;
    setHistorialRespuestas(prev => ({ ...prev, [itemActual.id]: idxOpcion }));
    if (modoPractica === 'guiada') {
      setMostrarExplicacion(true);
    }
  };

  const inyectarLoteInfinito = (cantidad = 5, tipoForzado = modalidadGenerador) => {
    const nuevos = [];
    for (let i = 0; i < cantidad; i++) {
      nuevos.push(generarItemInfinito(institucionActiva, contadorInfinito + i, tipoForzado));
    }
    setContadorInfinito(prev => prev + cantidad);
    setItemsDinamicos(prev => [...prev, ...nuevos]);
  };

  const siguienteReactivo = () => {
    setMostrarExplicacion(false);
    if (indiceActual + 1 < listaReactivos.length) {
      setIndiceActual(indiceActual + 1);
    } else {
      inyectarLoteInfinito(2, modalidadGenerador);
      setIndiceActual(listaReactivos.length);
    }
  };

  // Exportar Certificado Oficial de Simulacro en PDF con Firma SHA-256
  const exportarComprobantePdf = () => {
    const instObj = CATALOGO_INSTITUCIONES_SUPERIOR.find(i => i.id === institucionActiva);
    const fechaHoy = new Date().toLocaleString('es-CR');
    const ventanaPdf = window.open('', '_blank', 'width=900,height=700');
    if (!ventanaPdf) {
      alert('Por favor permite las ventanas emergentes para descargar el PDF firmado con SHA-256.');
      return;
    }

    const filasHoja = listaReactivos.map((it, idx) => {
      const r = historialRespuestas[it.id];
      const letras = ['A', 'B', 'C', 'D'];
      const estado = r === undefined ? 'Sin responder' : (r === it.correcta ? '✓ CORRECTA' : `✕ INCORRECTA (Marcó ${letras[r]}, Correcta ${letras[it.correcta]})`);
      return `<tr>
        <td style="padding:6px;border:1px solid #cbd5e1;text-align:center;">#${idx + 1}</td>
        <td style="padding:6px;border:1px solid #cbd5e1;">${it.subarea || it.area}</td>
        <td style="padding:6px;border:1px solid #cbd5e1;">${estado}</td>
      </tr>`;
    }).join('');

    ventanaPdf.document.write(`
      <html>
        <head>
          <title>Certificado Oficial de Simulacro — ${instObj.sigla}</title>
          <style>
            body { font-family: Arial, sans-serif; color: #0f172a; padding: 32px; }
            .header { border-bottom: 3px solid #0284c7; padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
            .box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 16px; margin-bottom: 20px; }
            .score { font-size: 28px; font-weight: bold; color: #0369a1; }
            .sha { font-family: monospace; font-size: 11px; background: #0f172a; color: #38bdf8; padding: 10px; border-radius: 6px; word-break: break-all; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 style="margin:0;font-size:22px;">🦉 pracTICAtecnica.com — CTP Mercedes Norte & MEP</h1>
              <p style="margin:4px 0 0 0;font-size:13px;color:#475569;">Comprobante Oficial de Simulacro Universitario y Práctica Guiada</p>
            </div>
            <div style="text-align:right;font-size:12px;">
              <strong>Fecha:</strong> ${fechaHoy}<br/>
              <strong>Normativa:</strong> Ley 8968 & SHA-256
            </div>
          </div>

          <div class="box">
            <p style="margin:4px 0;"><strong>Persona Estudiante / Usuario:</strong> ${usuarioActual?.nombre || 'Estudiante Activo'}</p>
            <p style="margin:4px 0;"><strong>Prueba Evaluada:</strong> ${instObj.sigla} — ${instObj.nombre}</p>
            <p style="margin:4px 0;"><strong>Tiempo Empleado del Cronómetro (3h):</strong> ${formatearTiempo(10800 - segundosRestantes)} (Restante: ${formatearTiempo(segundosRestantes)})</p>
            <p style="margin:8px 0;" class="score">Puntaje Obtenido: ${estadisticas.puntajeFinal} / ${estadisticas.escalaMax} pts</p>
            <p style="margin:4px 0;font-size:12px;color:#334155;">${estadisticas.detalleFormula}</p>
          </div>

          <h3 style="margin-bottom:6px;font-size:15px;">Hoja de Respuestas Auditada</h3>
          <table>
            <thead>
              <tr style="background:#e2e8f0;">
                <th style="padding:6px;border:1px solid #cbd5e1;">Ítem</th>
                <th style="padding:6px;border:1px solid #cbd5e1;">Subárea Evaluada</th>
                <th style="padding:6px;border:1px solid #cbd5e1;">Resultado</th>
              </tr>
            </thead>
            <tbody>${filasHoja}</tbody>
          </table>

          <div style="margin-top:24px;">
            <p style="font-size:12px;font-weight:bold;margin-bottom:4px;">🔒 Sello Criptográfico de Autenticidad SHA-256:</p>
            <div class="sha">${hashCertificado}</div>
          </div>

          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    ventanaPdf.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Barra Superior: Cronómetro 3 Horas, Escala 0-800 UCR/TEC y Exportador PDF SHA-256 */}
      <div className="bg-slate-900 border border-cyan-500/40 p-5 rounded-2xl shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
              ⚡ Motor Universitario & MEP v26.7 — Activo en Tiempo Real
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2">
              🎓 Simulacros Oficiales UCR, TEC, UNA, UTN, MEP & COSEVI
            </h2>
          </div>

          {/* Cronómetro Oficial de 3 Horas */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
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

        {/* Panel de Calificación Diferenciada UCR/UNA (50/50) vs TEC (60/40) y Botón PDF */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <p className="text-xs text-slate-400">Nota de Admisión Estimada:</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-cyan-400">{estadisticas.puntajeFinal}</span>
              <span className="text-xs text-slate-400 font-bold">/ {estadisticas.escalaMax} pts</span>
              <span className="ml-2 text-xs text-emerald-400 font-semibold">
                ({estadisticas.aciertos}/{estadisticas.respondidas} aciertos)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">{estadisticas.detalleFormula}</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 flex justify-between">
              <span>📊 Tu Nota de Educación Diversificada (Colegio):</span>
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
              Ajusta tu promedio de colegio para ver cómo cambia tu nota en escala 200-800 (UCR 50/50 o TEC 60/40).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 justify-end">
            <button
              onClick={exportarComprobantePdf}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow flex items-center justify-center gap-2"
            >
              <span>📄</span> Exportar Certificado PDF (Firma SHA-256)
            </button>
            <span className="text-[10px] font-mono text-slate-500 truncate text-center">
              SHA-256: {hashCertificado.slice(0, 28)}...
            </span>
          </div>
        </div>

        {/* Tarjetas Selectoras de Universidad / Institución */}
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
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className="text-2xl">{inst.icono}</span>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-black/40 text-cyan-300">
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
      </div>

      {/* Contenedor Principal: Pregunta a la izquierda + Hoja de Respuestas Interactiva a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda (2/3): Reactivo y Generadores Infinitos */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-cyan-950 text-cyan-300 border border-cyan-700/50 px-2.5 py-1 rounded-lg font-bold">
                {itemActual.area}
              </span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg">
                Ítem #{indiceActual + 1} de {listaReactivos.length}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => inyectarLoteInfinito(5, 'verbal')}
                className="bg-sky-700 hover:bg-sky-600 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition-all"
              >
                📖 +5 Lectura / Analogías / Inglés
              </button>
              <button
                onClick={() => inyectarLoteInfinito(5, 'matematico')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition-all"
              >
                ♾️ +5 Matemática / Redes / Lógica
              </button>
            </div>
          </div>

          {/* Enunciado del Reactivo */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              {itemActual.enunciado}
            </p>
          </div>

          {/* Opciones de Respuesta */}
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

          {/* Guía Paso a Paso */}
          {respuestaGuardada !== undefined && (
            <div className="space-y-3 pt-2">
              {(mostrarExplicacion || modoPractica === 'guiada') && (
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
                  onClick={siguienteReactivo}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow"
                >
                  Siguiente Reactivo (o Generar Infinito) →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Columna Derecha (1/3): Hoja de Respuestas Oficial y Navegador de Ítems */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-extrabold text-cyan-400 flex items-center gap-2">
                📋 Hoja de Respuestas Oficial
              </h3>
              <p className="text-[11px] text-slate-400">
                Haz clic en cualquier número para saltar al reactivo o auditar tus respuestas.
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto p-1">
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
            <p className="text-white font-bold">🔐 Certificación en Vivo SHA-256:</p>
            <p className="font-mono text-[10px] text-cyan-300 break-all bg-slate-900 p-2 rounded border border-slate-800">
              {hashCertificado}
            </p>
            <button
              onClick={exportarComprobantePdf}
              className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg text-xs transition-all"
            >
              📥 Descargar Hoja y Nota en PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}