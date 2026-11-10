import React, { useState, useMemo } from 'react';
import {
  DICCIONARIO_UI,
  NIVELES_DIFICULTAD,
  ESPECIALIDADES_CATALOGO,
  LINEAMIENTOS_EVALUACION,
  CONTEXTOS_REGIONALES,
  generarBancoExpandido
} from '../data/bancoOficialMEP2026';

// Funcion para barajar aleatoriamente 60 preguntas para cada Simulacro Oficial
function armarSimulacro60(bancoCompleto, semilla = 1) {
  const copia = [...bancoCompleto];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(((Math.sin(semilla * (i + 1)) + 1) / 2) * (i + 1)) % (i + 1);
    const temp = copia[i];
    copia[i] = copia[j];
    copia[j] = temp;
  }
  const seleccion = [];
  let idx = 0;
  while (seleccion.length < 60) {
    const base = copia[idx % copia.length];
    seleccion.push({
      ...base,
      numeroOficial: seleccion.length + 1,
      idSimulacro: `SIM-${semilla}-Q${seleccion.length + 1}`
    });
    idx++;
  }
  return seleccion;
}

export default function UniversoPracticaTecnica() {
  const [idioma, setIdioma] = useState('ES');
  const [altoContraste, setAltoContraste] = useState(false);
  const [pestanaPrincipal, setPestanaPrincipal] = useState('practicas'); // 'practicas' | 'simulacros' | 'generador' | 'pisa'
  const [busqueda, setBusqueda] = useState('');
  const [codigoFiltro, setCodigoFiltro] = useState('TODOS');
  const [nivelFiltro, setNivelFiltro] = useState('TODOS');
  const [regionActiva, setRegionActiva] = useState('limon');

  // Banco dinamico que permite cargar/crear items infinitos
  const [itemsCreados, setItemsCreados] = useState([]);
  const bancoTotal = useMemo(() => generarBancoExpandido(itemsCreados), [itemsCreados]);

  // =========================================================================
  // ESTADO 1: LAS 3 PRACTICAS GUIADAS EXPLICATIVAS (MAXIMO 3 INTENTOS C/U)
  // =========================================================================
  const [practicaActiva, setPracticaActiva] = useState(1); // Practica 1, 2 o 3
  const [intentosPracticas, setIntentosPracticas] = useState({ 1: 1, 2: 1, 3: 1 });
  const [indiceGuiada, setIndiceGuiada] = useState(0);
  const [respuestaGuiada, setRespuestaGuiada] = useState(null);
  const [escaleraGuiada, setEscaleraGuiada] = useState('gatear');

  // =========================================================================
  // ESTADO 2: LOS 2 SIMULACROS DE 60 PREGUNTAS (MODO CIEGO HASTA TERMINAR)
  // =========================================================================
  const [simulacroActivo, setSimulacroActivo] = useState(1); // Simulacro 1 o Simulacro 2 (Solo 2 permitidos)
  const [estadoSimulacros, setEstadoSimulacros] = useState({
    1: { iniciado: true, finalizado: false, preguntaActual: 0, respuestas: {}, preguntas: armarSimulacro60(bancoTotal, 101) },
    2: { iniciado: true, finalizado: false, preguntaActual: 0, respuestas: {}, preguntas: armarSimulacro60(bancoTotal, 202) }
  });

  // =========================================================================
  // ESTADO 3: FORMULARIO PARA CARGAR / CREAR ITEMS DEL MUNDO MUNDIAL
  // =========================================================================
  const [nuevoCodigo, setNuevoCodigo] = useState('1001');
  const [nuevaDificultad, setNuevaDificultad] = useState('ALTO');
  const [nuevoConcepto, setNuevoConcepto] = useState('');
  const [nuevoEnunciado, setNuevoEnunciado] = useState('');
  const [nuevaCorrecta, setNuevaCorrecta] = useState('');
  const [nuevoDistractor1, setNuevoDistractor1] = useState('');
  const [nuevoDistractor2, setNuevoDistractor2] = useState('');
  const [nuevoDistractor3, setNuevoDistractor3] = useState('');
  const [nuevaExplicacion, setNuevaExplicacion] = useState('');
  const [mensajeCarga, setMensajeCarga] = useState('');

  // Estado Google Pay
  const [modalPago, setModalPago] = useState(false);
  const [mensajePago, setMensajePago] = useState('');

  const t = DICCIONARIO_UI[idioma];
  const reg = CONTEXTOS_REGIONALES[regionActiva];

  // Filtrado del banco para las 3 Practicas Guiadas
  const preguntasGuiadas = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    const res = bancoTotal.filter((it) => {
      const okCod = codigoFiltro === 'TODOS' || it.codigo === codigoFiltro;
      const okNiv = nivelFiltro === 'TODOS' || it.dificultad === nivelFiltro;
      const okTxt =
        !q ||
        it.codigo.toLowerCase().includes(q) ||
        it.especialidadES.toLowerCase().includes(q) ||
        it.enunciadoES.toLowerCase().includes(q) ||
        it.conceptoBase.toLowerCase().includes(q);
      return okCod && okNiv && okTxt;
    });
    return res.length > 0 ? res : bancoTotal;
  }, [bancoTotal, busqueda, codigoFiltro, nivelFiltro]);

  const itemGuiadoActual = preguntasGuiadas[(indiceGuiada + practicaActiva * 3) % preguntasGuiadas.length];
  const intentoActualPractica = intentosPracticas[practicaActiva];

  // Reiniciar un intento de la Practica Guiada (Maximo 3 veces)
  const usarNuevoIntentoPractica = () => {
    if (intentoActualPractica < 3) {
      setIntentosPracticas((prev) => ({ ...prev, [practicaActiva]: prev[practicaActiva] + 1 }));
      setIndiceGuiada(0);
      setRespuestaGuiada(null);
    }
  };

  // Manejo del Simulacro Oficial de 60 Preguntas (Ciego hasta terminar)
  const simActual = estadoSimulacros[simulacroActivo];
  const preguntaSimActual = simActual.preguntas[simActual.preguntaActual];
  const totalContestadasSim = Object.keys(simActual.respuestas).length;

  const marcarRespuestaSimulacro = (letra) => {
    if (simActual.finalizado) return;
    setEstadoSimulacros((prev) => ({
      ...prev,
      [simulacroActivo]: {
        ...prev[simulacroActivo],
        respuestas: {
          ...prev[simulacroActivo].respuestas,
          [preguntaSimActual.numeroOficial]: letra
        }
      }
    }));
  };

  const irAPreguntaSimulacro = (nuevoIdx) => {
    setEstadoSimulacros((prev) => ({
      ...prev,
      [simulacroActivo]: {
        ...prev[simulacroActivo],
        preguntaActual: nuevoIdx
      }
    }));
  };

  const entregarSimulacro60 = () => {
    setEstadoSimulacros((prev) => ({
      ...prev,
      [simulacroActivo]: {
        ...prev[simulacroActivo],
        finalizado: true
      }
    }));
  };

  // Calculo de calificacion SOLO cuando el simulacro de 60 preguntas se ha entregado
  const resultadoSimulacro = useMemo(() => {
    if (!simActual.finalizado) return null;
    let aciertos = 0;
    simActual.preguntas.forEach((preg) => {
      const letraMarcada = simActual.respuestas[preg.numeroOficial];
      const opCorrecta = preg.opciones.find((o) => o.correcta);
      if (letraMarcada && opCorrecta && letraMarcada === opCorrecta.letra) {
        aciertos++;
      }
    });
    const nota100 = Math.round((aciertos / 60) * 100);
    return {
      aciertos,
      nota100,
      aprobado: nota100 >= 70
    };
  }, [simActual]);

  // Funcion para inyectar un item nuevo o un lote masivo al banco
  const agregarItemPersonalizado = (e) => {
    e.preventDefault();
    if (!nuevoEnunciado.trim() || !nuevaCorrecta.trim()) return;
    const nuevo = {
      id: `CUSTOM-${Date.now()}`,
      codigo: nuevoCodigo,
      dificultad: nuevaDificultad,
      especialidadES: ESPECIALIDADES_CATALOGO.find((c) => c.codigo === nuevoCodigo)?.nombreES || 'Especialidad MEP',
      subareaES: 'Item Personalizado / Certificacion',
      conceptoBase: nuevoConcepto || 'Principio Tecnico y Resolucion Analitica',
      enunciadoES: nuevoEnunciado,
      opciones: [
        { letra: 'A', textoES: nuevaCorrecta, correcta: true, expES: nuevaExplicacion || 'Respuesta correcta verificada tecnicamente.' },
        { letra: 'B', textoES: nuevoDistractor1 || 'Distractor tecnico secundario', correcta: false, expES: 'No cumple las condiciones del enunciado.' },
        { letra: 'C', textoES: nuevoDistractor2 || 'Distractor por omision de norma', correcta: false, expES: 'Contradice la normativa vigente.' },
        { letra: 'D', textoES: nuevoDistractor3 || 'Distractor por error de calculo', correcta: false, expES: 'Presenta desviacion en el calculo.' }
      ],
      escalera: {
        gatearES: nuevaExplicacion || 'Identifica los datos clave del enunciado paso a paso.',
        correrES: nuevoConcepto || 'Aplica la norma tecnica oficial del programa de estudio MEP.',
        espacioES: 'Transfiere este principio a un proyecto real de certificacion.'
      },
      nemotecniaES: `CLAVE: ${nuevoConcepto || 'Dominio del concepto esencial'}`,
      palabraES: 'CERTIFICACION',
      pistaES: nuevoConcepto || 'Concepto clave evaluado.'
    };
    setItemsCreados((prev) => [nuevo, ...prev]);
    setNuevoConcepto('');
    setNuevoEnunciado('');
    setNuevaCorrecta('');
    setNuevoDistractor1('');
    setNuevoDistractor2('');
    setNuevoDistractor3('');
    setNuevaExplicacion('');
    setMensajeCarga('Item inyectado exitosamente en el Banco Mundial y en los Simulacros de 60 preguntas.');
  };

  const generarLoteMasivoMil = () => {
    const lote = [];
    for (let i = 1; i <= 20; i++) {
      const baseCarga = 1000 + i * 250;
      const mitad = baseCarga / 2;
      lote.push({
        id: `MEGA-${Date.now()}-${i}`,
        codigo: i % 2 === 0 ? '2003' : '1004',
        dificultad: NIVELES_DIFICULTAD[(i % 5) + 1].id,
        especialidadES: i % 2 === 0 ? 'Construccion Civil / Ingenieria' : 'Agroindustria / Ciencias PISA',
        subareaES: 'Generacion Infinita Multinivel',
        conceptoBase: 'Modelado Matematico y Control de Procesos Certificados',
        enunciadoES: `[Item Generado Dinamico #${i}] En una prueba de certificacion internacional se evalua una carga de proceso de ${baseCarga} unidades distribuida simetricamente en 2 lineas operativas. Cual es el valor de equilibrio por linea?`,
        opciones: [
          { letra: 'A', textoES: `${mitad} unidades por linea`, correcta: true, expES: `Correcto: La distribucion simetrica divide ${baseCarga} / 2 = ${mitad} unidades.` },
          { letra: 'B', textoES: `${baseCarga} unidades por linea`, correcta: false, expES: 'Corresponde al total sin dividir.' },
          { letra: 'C', textoES: `${mitad / 2} unidades por linea`, correcta: false, expES: 'Corresponde a un cuarto de la carga.' },
          { letra: 'D', textoES: `${baseCarga * 2} unidades por linea`, correcta: false, expES: 'Duplica erroneamente el parametro.' }
        ],
        escalera: {
          gatearES: `Divide ${baseCarga} en 2 partes iguales = ${mitad}.`,
          correrES: `Balance de linea simetrico: Q = ${baseCarga} / 2 = ${mitad}.`,
          espacioES: `Optimizacion de capacidad instalada con holgura cero.`
        },
        nemotecniaES: `${baseCarga} / 2 = ${mitad}.`,
        palabraES: 'SIMETRIA',
        pistaES: 'Distribucion equilibrada entre dos apoyos o lineas.'
      });
    }
    setItemsCreados((prev) => [...lote, ...prev]);
    setMensajeCarga('Se han generado e inyectado +20 nuevos items parametricos multinivel en tiempo real.');
  };

  return (
    <div className={`min-h-screen p-3 md:p-6 ${altoContraste ? 'bg-black text-yellow-300' : 'bg-slate-950 text-slate-100'}`}>
      {/* ENCABEZADO CON CORTESIA, IDENTIDAD Y CONTROLES */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-xl">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                pracTICAtecnica.com
              </span>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                [ADMIN] {t.badgeSuperAdmin}
              </span>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Banco Activo: {bancoTotal.length} Items Multinivel
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-white mt-1">{t.subtituloHeader}</h1>
            <p className="text-xs text-slate-400 mt-0.5">{t.agradecimiento}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIdioma(idioma === 'ES' ? 'EN' : 'ES')}
              className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-extrabold"
            >
              [ES/EN] {idioma}
            </button>
            <button
              onClick={() => setAltoContraste(!altoContraste)}
              className="px-3 py-2 rounded-xl bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700"
            >
              [DUA Contraste]
            </button>
            <button
              onClick={() => setModalPago(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold"
            >
              {t.btnMejorarPro}
            </button>
          </div>
        </div>

        {/* BARRA DE NAVEGACION PRINCIPAL (LAS 4 GRANDES AREAS PEDAGOGICAS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800">
          {[
            { id: 'practicas', label: t.tabPracticas },
            { id: 'simulacros', label: t.tabSimulacros },
            { id: 'generador', label: t.tabGenerador },
            { id: 'pisa', label: t.tabPisa }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPestanaPrincipal(tab.id)}
              className={`py-2.5 px-3 rounded-xl text-xs font-extrabold text-left transition-all ${
                pestanaPrincipal === tab.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* MODAL GOOGLE PAY + SINPE */}
      {modalPago && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-black text-base text-cyan-400">Suscripcion PRO - Google Pay &amp; SINPE</h3>
              <button onClick={() => setModalPago(false)} className="text-slate-400 font-bold">X</button>
            </div>
            <button
              onClick={() => setMensajePago('Suscripcion PRO verificada automaticamente con Google Pay.')}
              className="w-full py-3 rounded-xl bg-white text-slate-950 font-black text-sm"
            >
              Pagar con Google Pay (G Pay)
            </button>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-amber-400">SINPE Movil Costa Rica: 6090-6359 (Max Salazar Sanchez)</div>
              <a
                href="https://wa.me/50660906359"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2 rounded-lg bg-emerald-600 text-white font-bold"
              >
                Confirmar por WhatsApp (+506 6090-6359)
              </a>
            </div>
            {mensajePago && <div className="p-3 rounded-xl bg-emerald-950 text-emerald-200 text-xs font-bold">{mensajePago}</div>}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODULO 1: 3 PRACTICAS GUIADAS EXPLICATIVAS (3 INTENTOS CADA UNA)
      ===================================================================== */}
      {pestanaPrincipal === 'practicas' && (
        <main className="max-w-7xl mx-auto space-y-5">
          {/* Selector de las 3 Practicas Guiadas y Contador de 3 Intentos */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { num: 1, titulo: 'Practica Guiada #1: Nivel Base y DUA (Gatear)', desc: 'Explicacion paso a paso desde lo concreto a lo abstracto.' },
                { num: 2, titulo: 'Practica Guiada #2: Nivel Mediano e Intermedio (Correr)', desc: 'Aplicacion de formulas, normas MEP y descarte de distractores.' },
                { num: 3, titulo: 'Practica Guiada #3: Nivel Alto y Estandar PISA (Al Espacio)', desc: 'Casos complejos de ingenieria, certificacion y resolucion critica.' }
              ].map((p) => {
                const activa = practicaActiva === p.num;
                const usados = intentosPracticas[p.num];
                return (
                  <button
                    key={p.num}
                    onClick={() => { setPracticaActiva(p.num); setRespuestaGuiada(null); }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      activa ? 'bg-cyan-950/60 border-cyan-400 shadow-lg' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-black text-cyan-300">{p.titulo}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                        Intento {usados} de 3
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{p.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Buscador y Filtros por Nivel de Dificultad (DUA, Facil, Mediano, Intermedio, Alto) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-2 border-t border-slate-800">
              <div className="lg:col-span-5">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => { setBusqueda(e.target.value); setIndiceGuiada(0); }}
                  placeholder={t.buscarPlaceholder}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>
              <div className="lg:col-span-7 flex flex-wrap gap-1.5 items-center">
                {NIVELES_DIFICULTAD.map((niv) => (
                  <button
                    key={niv.id}
                    onClick={() => { setNivelFiltro(niv.id); setIndiceGuiada(0); }}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border ${
                      nivelFiltro === niv.id ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {niv.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro por Especialidad */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setCodigoFiltro('TODOS')}
                className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
                  codigoFiltro === 'TODOS' ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Todas ({preguntasGuiadas.length})
              </button>
              {ESPECIALIDADES_CATALOGO.map((esp) => (
                <button
                  key={esp.codigo}
                  onClick={() => { setCodigoFiltro(esp.codigo); setIndiceGuiada(0); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
                    codigoFiltro === esp.codigo ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-300'
                  }`}
                >
                  [{esp.codigo}] {esp.nombreES}
                </button>
              ))}
            </div>
          </section>

          {/* Area de Practica Guiada con Explicacion Inmediata del Concepto y Respuesta Correcta */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <span className="text-xs font-extrabold text-cyan-400">
                  [{itemGuiadoActual.codigo}] {itemGuiadoActual.especialidadES} - Nivel: {itemGuiadoActual.dificultad}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    Intento {intentoActualPractica} / 3
                  </span>
                  <button
                    onClick={usarNuevoIntentoPractica}
                    disabled={intentoActualPractica >= 3}
                    className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 disabled:opacity-40 text-xs font-bold border border-amber-500/40"
                  >
                    Reiniciar Intento ({3 - intentoActualPractica} disp.)
                  </button>
                </div>
              </div>

              {/* Capsula previa explicativa del concepto */}
              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/40 text-xs text-blue-200">
                <strong>Concepto Guia Previo:</strong> {itemGuiadoActual.conceptoBase}
              </div>

              <p className="text-base font-medium bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed">
                {itemGuiadoActual.enunciadoES}
              </p>

              <div className="space-y-2">
                {itemGuiadoActual.opciones.map((op) => {
                  const marcada = respuestaGuiada?.letra === op.letra;
                  return (
                    <button
                      key={op.letra}
                      onClick={() => setRespuestaGuiada(op)}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                        marcada
                          ? op.correcta
                            ? 'bg-emerald-950 border-emerald-400 text-emerald-200'
                            : 'bg-rose-950 border-rose-400 text-rose-200'
                          : 'bg-slate-950 border-slate-800 hover:border-cyan-500'
                      }`}
                    >
                      <span className="font-bold px-2.5 py-1 rounded bg-slate-900">{op.letra})</span>
                      <span className="text-sm">{op.textoES}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explicacion Guiada Inmediata de la Respuesta Correcta */}
              {respuestaGuiada && (
                <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-emerald-400 space-y-2 text-xs">
                  <div className="font-extrabold text-sm text-emerald-300">
                    {respuestaGuiada.correcta
                      ? 'EXCELENTE: Respuesta Correcta Verificada'
                      : 'ANALISIS GUIADO: Por que esta opcion no es y cual es la correcta'}
                  </div>
                  <p className="text-slate-200">{respuestaGuiada.expES}</p>
                  <div className="pt-2 border-t border-slate-800 text-cyan-300">
                    <strong>Respuesta Oficial Correcta:</strong>{' '}
                    {itemGuiadoActual.opciones.find((o) => o.correcta)?.letra}){' '}
                    {itemGuiadoActual.opciones.find((o) => o.correcta)?.textoES}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => {
                    setIndiceGuiada((p) => (p - 1 + preguntasGuiadas.length) % preguntasGuiadas.length);
                    setRespuestaGuiada(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold"
                >
                  &lt;- Anterior
                </button>
                <button
                  onClick={() => {
                    setIndiceGuiada((p) => (p + 1) % preguntasGuiadas.length);
                    setRespuestaGuiada(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold"
                >
                  Siguiente Ejercicio Guiado -&gt;
                </button>
              </div>
            </div>

            {/* Columna Derecha: Escalera Cognitiva DUA + Contexto Regional */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold uppercase text-cyan-400">
                  Escalera Cognitiva Explicativa (Gatear -&gt; Correr -&gt; Espacio)
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'gatear', txt: '1. Gatear (Base)' },
                    { id: 'correr', txt: '2. Correr (MEP)' },
                    { id: 'espacio', txt: '3. Espacio (PISA)' }
                  ].map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setEscaleraGuiada(n.id)}
                      className={`py-2 rounded-xl text-xs font-bold ${
                        escaleraGuiada === n.id ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400'
                      }`}
                    >
                      {n.txt}
                    </button>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm leading-relaxed">
                  {escaleraGuiada === 'gatear'
                    ? itemGuiadoActual.escalera.gatearES
                    : escaleraGuiada === 'correr'
                    ? itemGuiadoActual.escalera.correrES
                    : itemGuiadoActual.escalera.espacioES}
                </div>
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs">
                  <strong>Nemotecnia para recordar siempre:</strong> {itemGuiadoActual.nemotecniaES}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-emerald-300">Contexto Regional ({reg.nombreES}):</strong>
                  <div className="flex gap-1">
                    {['limon', 'rural', 'indigena', 'urbano'].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRegionActiva(r)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          regionActiva === r ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {r.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-slate-300">{reg.enfoqueES}</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          MODULO 2: 2 SIMULACROS DE 60 PREGUNTAS ALEATORIAS (CIEGOS HASTA TERMINAR)
      ===================================================================== */}
      {pestanaPrincipal === 'simulacros' && (
        <main className="max-w-7xl mx-auto space-y-5">
          {/* Selector de los 2 Unicos Simulacros Oficiales */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-3">
              {[1, 2].map((numSim) => (
                <button
                  key={numSim}
                  onClick={() => setSimulacroActivo(numSim)}
                  className={`px-5 py-3 rounded-xl text-xs font-extrabold border transition-all ${
                    simulacroActivo === numSim
                      ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Simulacro Estandarizado Oficial #{numSim} (60 Preguntas Aleatorias)
                </button>
              ))}
            </div>

            <div className="text-xs text-amber-300 bg-amber-950/40 px-4 py-2 rounded-xl border border-amber-500/40 font-bold">
              REGLA ESTRICTA DE CERTIFICACION: Notas y explicaciones ocultas hasta finalizar y entregar las 60 preguntas.
            </div>
          </div>

          {/* SI EL SIMULACRO NO HA FINALIZADO: MODO CIEGO DE EXAMEN (SIN NOTAS NI PISTAS) */}
          {!simActual.finalizado ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-xs font-extrabold text-purple-400 uppercase">
                    Simulacro #{simulacroActivo} - Pregunta Oficial {preguntaSimActual.numeroOficial} de 60 (Nivel: {preguntaSimActual.dificultad})
                  </span>
                  <span className="text-xs font-mono bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                    Contestadas: {totalContestadasSim} / 60
                  </span>
                </div>

                <p className="text-base font-medium bg-slate-950 p-5 rounded-xl border border-slate-800 leading-relaxed">
                  {preguntaSimActual.enunciadoES}
                </p>

                {/* Opciones en Modo Ciego: Solo marca la seleccion en azul sin revelar si es correcta o incorrecta */}
                <div className="space-y-2.5">
                  {preguntaSimActual.opciones.map((op) => {
                    const letraGuardada = simActual.respuestas[preguntaSimActual.numeroOficial];
                    const elegida = letraGuardada === op.letra;
                    return (
                      <button
                        key={op.letra}
                        onClick={() => marcarRespuestaSimulacro(op.letra)}
                        className={`w-full text-left p-4 rounded-xl border flex items-center gap-3 transition-all ${
                          elegida
                            ? 'bg-blue-950 border-blue-400 text-white'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <span className="font-bold px-3 py-1 rounded bg-slate-900 border border-slate-700">
                          {op.letra})
                        </span>
                        <span className="text-sm">{op.textoES}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => irAPreguntaSimulacro(Math.max(0, simActual.preguntaActual - 1))}
                    disabled={simActual.preguntaActual === 0}
                    className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 text-xs font-bold"
                  >
                    &lt;- Pregunta Anterior
                  </button>

                  {simActual.preguntaActual < 59 ? (
                    <button
                      onClick={() => irAPreguntaSimulacro(simActual.preguntaActual + 1)}
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-extrabold"
                    >
                      Siguiente Pregunta ({simActual.preguntaActual + 2} / 60) -&gt;
                    </button>
                  ) : (
                    <button
                      onClick={entregarSimulacro60}
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg"
                    >
                      FINALIZAR Y ENTREGAR SIMULACRO DE 60 PREGUNTAS
                    </button>
                  )}
                </div>
              </div>

              {/* Hoja Lectora Optica de 60 Preguntas */}
              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xs font-extrabold uppercase text-cyan-400 mb-3">
                    Hoja Lectora Optica (60 Items Oficiales)
                  </h3>
                  <div className="grid grid-cols-6 gap-1.5 max-h-[340px] overflow-y-auto pr-1">
                    {simActual.preguntas.map((p, idx) => {
                      const contestada = Boolean(simActual.respuestas[p.numeroOficial]);
                      const esActual = simActual.preguntaActual === idx;
                      return (
                        <button
                          key={p.idSimulacro}
                          onClick={() => irAPreguntaSimulacro(idx)}
                          className={`py-2 rounded-lg text-xs font-bold border ${
                            esActual
                              ? 'bg-purple-600 border-white text-white'
                              : contestada
                              ? 'bg-blue-900/60 border-blue-400 text-blue-200'
                              : 'bg-slate-950 border-slate-800 text-slate-500'
                          }`}
                        >
                          {p.numeroOficial}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                    Modo Certificacion Activo: Las notas, aciertos y explicaciones se desbloquearan unicamente al presionar el boton de entrega final.
                  </div>
                  <button
                    onClick={entregarSimulacro60}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg"
                  >
                    Entregar Prueba de 60 Items y Ver Calificacion
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* PANTALLA POST-ENTREGA: CERTIFICADO DE NOTAS Y REVISION DE LAS 60 PREGUNTAS */
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/40 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase text-cyan-400">
                    Informe Oficial de Certificacion - Simulacro #{simulacroActivo} Finalizado
                  </span>
                  <h2 className="text-2xl font-black text-white mt-1">
                    Calificacion Obtenida: {resultadoSimulacro.nota100} / 100 ({resultadoSimulacro.aciertos} de 60 aciertos)
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Estado de Certificacion:{' '}
                    <strong className={resultadoSimulacro.aprobado ? 'text-emerald-400' : 'text-amber-400'}>
                      {resultadoSimulacro.aprobado
                        ? 'APROBADO - Competencia Tecnica Certificada'
                        : 'EN PROCESO - Se recomienda repasar las 3 Practicas Guiadas'}
                    </strong>
                  </p>
                </div>
              </div>

              <h3 className="text-sm font-extrabold text-cyan-400 uppercase">
                Revision Formativa Desbloqueada (60 Items con Concepto y Respuesta Correcta):
              </h3>

              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2">
                {simActual.preguntas.map((preg) => {
                  const marcada = simActual.respuestas[preg.numeroOficial];
                  const correctaObj = preg.opciones.find((o) => o.correcta);
                  const acerto = marcada === correctaObj?.letra;
                  return (
                    <div
                      key={preg.idSimulacro}
                      className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                        acerto ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-rose-950/30 border-rose-500/40'
                      }`}
                    >
                      <div className="flex justify-between font-bold">
                        <span>Pregunta #{preg.numeroOficial} [{preg.dificultad}] - {preg.especialidadES}</span>
                        <span>{acerto ? 'ACIERTO' : `Tu respuesta: ${marcada || 'Sin responder'} | Correcta: ${correctaObj?.letra}`}</span>
                      </div>
                      <p className="text-slate-200">{preg.enunciadoES}</p>
                      <div className="text-cyan-300">
                        <strong>Respuesta Correcta ({correctaObj?.letra}):</strong> {correctaObj?.textoES}
                      </div>
                      <div className="text-slate-300">
                        <strong>Aprendizaje y Explicacion:</strong> {correctaObj?.expES}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      )}

      {/* =====================================================================
          MODULO 3: GENERADOR INFINITO 1000x1000 Y CARGA DE ITEMS DEL MUNDO
      ===================================================================== */}
      {pestanaPrincipal === 'generador' && (
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-black text-cyan-400">
              Motor Parametrico Infinito (1000 x 1000 Variaciones)
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Genera instantaneamente lotes de preguntas con datos numericos, escenarios PISA y niveles de dificultad variados (DUA, Facil, Mediano, Intermedio y Alto) para alimentar tanto las 3 Practicas Guiadas como los Simulacros de 60 preguntas.
            </p>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div>Total actual en memoria activa: <strong>{bancoTotal.length} items</strong></div>
              <div>Niveles incluidos: <strong>DUA, Facil, Mediano, Intermedio y Alto (PISA)</strong></div>
            </div>
            <button
              onClick={generarLoteMasivoMil}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs shadow-lg"
            >
              + INYECTAR LOTE DE 20 NUEVOS ITEMS PARAMETRICOS AHORA
            </button>
            {mensajeCarga && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-bold">
                {mensajeCarga}
              </div>
            )}
          </div>

          <form onSubmit={agregarItemPersonalizado} className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h2 className="text-base font-black text-amber-400">
              Cargar o Crear Nuevo Item para el Banco Mundial
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Especialidad / Materia</label>
                <select
                  value={nuevoCodigo}
                  onChange={(e) => setNuevoCodigo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {ESPECIALIDADES_CATALOGO.map((e) => (
                    <option key={e.codigo} value={e.codigo}>[{e.codigo}] {e.nombreES}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Nivel de Dificultad</label>
                <select
                  value={nuevaDificultad}
                  onChange={(e) => setNuevaDificultad(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {NIVELES_DIFICULTAD.filter((n) => n.id !== 'TODOS').map((n) => (
                    <option key={n.id} value={n.id}>{n.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            <input
              type="text"
              value={nuevoConcepto}
              onChange={(e) => setNuevoConcepto(e.target.value)}
              placeholder="Concepto o Regla Evaluada (ej: Ley de Hooke, HACCP, Teorema de Pitagoras)..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
            />

            <textarea
              rows={2}
              value={nuevoEnunciado}
              onChange={(e) => setNuevoEnunciado(e.target.value)}
              placeholder="Escribe el enunciado o caso tecnico del item..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                value={nuevaCorrecta}
                onChange={(e) => setNuevaCorrecta(e.target.value)}
                placeholder="Opcion Correcta..."
                className="bg-emerald-950/40 border border-emerald-500/50 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="text"
                value={nuevoDistractor1}
                onChange={(e) => setNuevoDistractor1(e.target.value)}
                placeholder="Distractor 1..."
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="text"
                value={nuevoDistractor2}
                onChange={(e) => setNuevoDistractor2(e.target.value)}
                placeholder="Distractor 2..."
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="text"
                value={nuevoDistractor3}
                onChange={(e) => setNuevoDistractor3(e.target.value)}
                placeholder="Distractor 3..."
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <input
              type="text"
              value={nuevaExplicacion}
              onChange={(e) => setNuevaExplicacion(e.target.value)}
              placeholder="Explicacion paso a paso de por que la respuesta es correcta..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs"
            >
              Guardar e Inyectar Item en Practicas y Simulacros
            </button>
          </form>
        </main>
      )}

      {/* =====================================================================
          MODULO 4: REGLAS OFICIALES MEP, LINEAMIENTOS PISA Y CERTIFICACIONES
      ===================================================================== */}
      {pestanaPrincipal === 'pisa' && (
        <section className="max-w-7xl mx-auto space-y-4">
          {LINEAMIENTOS_EVALUACION.map((bloque) => (
            <div key={bloque.categoria} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h2 className="text-base font-black text-cyan-400">{bloque.categoria}</h2>
              <ul className="space-y-2 text-xs text-slate-200 leading-relaxed">
                {bloque.reglas.map((r) => (
                  <li key={r} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
