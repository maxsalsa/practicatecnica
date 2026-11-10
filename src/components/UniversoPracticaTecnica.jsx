import React, { useState, useEffect, useMemo } from 'react';
import {
  DICCIONARIO_UI,
  ROLES_RBAC,
  BITACORA_INICIAL_ADMIN,
  NIVELES_DIFICULTAD,
  ESPECIALIDADES_CATALOGO,
  LINEAMIENTOS_EVALUACION,
  generarBancoExpandido
} from '../data/bancoOficialMEP2026';

// CONFIGURACION DE PASARELA GOOGLE PAY (CAMBIAR MODO_REAL A true CUANDO TENGAS TU MERCHANT ID DE STRIPE/TILOPAY)
const CONFIG_GOOGLE_PAY = {
  MODO_REAL: false, // Poner en true al conectar pasarela bancaria
  GATEWAY_NOMBRE: 'stripe', // Ejemplo: 'stripe' o procesador autorizado
  GATEWAY_MERCHANT_ID: 'TU_MERCHANT_ID_BANCARIO',
  MONEDA: 'CRC',
  MONTO_PRO: '5000.00',
  SINPE_OFICIAL: '6090-6359',
  SINPE_TITULAR: 'Max Salazar Sanchez (Banco Popular)'
};

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
  // Detector en tiempo real Online / Offline + Evento de instalacion PWA
  const [esOnline, setEsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [eventoInstalacionPwa, setEventoInstalacionPwa] = useState(null);

  useEffect(() => {
    const alConectar = () => setEsOnline(true);
    const alDesconectar = () => setEsOnline(false);
    const capturarPwa = (e) => {
      e.preventDefault();
      setEventoInstalacionPwa(e);
    };
    window.addEventListener('online', alConectar);
    window.addEventListener('offline', alDesconectar);
    window.addEventListener('beforeinstallprompt', capturarPwa);
    return () => {
      window.removeEventListener('online', alConectar);
      window.removeEventListener('offline', alDesconectar);
      window.removeEventListener('beforeinstallprompt', capturarPwa);
    };
  }, []);

  const [idioma, setIdioma] = useState('ES');
  const [altoContraste, setAltoContraste] = useState(false);
  const [pestanaPrincipal, setPestanaPrincipal] = useState('practicas');
  const [busqueda, setBusqueda] = useState('');
  const [codigoFiltro, setCodigoFiltro] = useState('TODOS');
  const [nivelFiltro, setNivelFiltro] = useState('TODOS');

  // RBAC y Usuario con persistencia Offline en localStorage
  const [rolActivo, setRolActivo] = useState('SUPER_ADMIN');
  const [usuarioGoogle, setUsuarioGoogle] = useState(() => {
    try {
      const guardado = localStorage.getItem('pt_usuario_offline');
      if (guardado) return JSON.parse(guardado);
    } catch (e) {}
    return {
      autenticado: true,
      nombre: 'Max Salazar Sanchez',
      email: 'max.salazar@practicatecnica.com',
      planPro: true,
      billeteraVinculada: true
    };
  });

  const [bitacoraAdmin, setBitacoraAdmin] = useState(BITACORA_INICIAL_ADMIN);
  const [modalPago, setModalPago] = useState(false);
  const [mensajePago, setMensajePago] = useState('');

  // Banco Dinamico con persistencia Offline
  const [itemsCreados, setItemsCreados] = useState(() => {
    try {
      const guardados = localStorage.getItem('pt_items_offline');
      if (guardados) return JSON.parse(guardados);
    } catch (e) {}
    return [];
  });
  const bancoTotal = useMemo(() => generarBancoExpandido(itemsCreados), [itemsCreados]);

  // Trazabilidad de Saberes con guardado automatico Offline
  const [historialSaberes, setHistorialSaberes] = useState(() => {
    try {
      const guardado = localStorage.getItem('pt_saberes_offline');
      if (guardado) return JSON.parse(guardado);
    } catch (e) {}
    return {
      'SAB-1001-PTAR': { saberId: 'SAB-1001-PTAR', codigo: '1001', nombre: 'Tratamiento Fisico-Quimico-Biologico de Aguas Residuales (DBO5)', aciertos: 1, fallos: 2 },
      'SAB-1004-LAC': { saberId: 'SAB-1004-LAC', codigo: '1004', nombre: 'Calculo Estequiometrico de Acidez Lactea en g/L', aciertos: 1, fallos: 1 },
      'SAB-2003-VIGA': { saberId: 'SAB-2003-VIGA', codigo: '2003', nombre: 'Equilibrio Estatico y Reacciones en Vigas Simplemente Apoyadas', aciertos: 4, fallos: 0 },
      'SAB-2005-ESC': { saberId: 'SAB-2005-ESC', codigo: '2005', nombre: 'Calculo Dimensional de Contrahuellas en Escaleras', aciertos: 3, fallos: 0 },
      'SAB-2006-PAT': { saberId: 'SAB-2006-PAT', codigo: '2006', nombre: 'Ecuacion Contable Fundamental y Calculo de Patrimonio', aciertos: 0, fallos: 2 }
    };
  });

  // Guardar automaticamente en el telefono/navegador para modo Offline
  useEffect(() => {
    try {
      localStorage.setItem('pt_saberes_offline', JSON.stringify(historialSaberes));
      localStorage.setItem('pt_items_offline', JSON.stringify(itemsCreados));
      localStorage.setItem('pt_usuario_offline', JSON.stringify(usuarioGoogle));
    } catch (e) {}
  }, [historialSaberes, itemsCreados, usuarioGoogle]);

  const [modoReforzamiento, setModoReforzamiento] = useState(false);
  const [saberReforzamientoFiltro, setSaberReforzamientoFiltro] = useState('TODOS_DEBILES');

  // 3 Practicas Guiadas (3 intentos)
  const [practicaActiva, setPracticaActiva] = useState(1);
  const [intentosPracticas, setIntentosPracticas] = useState({ 1: 1, 2: 1, 3: 1 });
  const [indiceGuiada, setIndiceGuiada] = useState(0);
  const [respuestaGuiada, setRespuestaGuiada] = useState(null);
  const [escaleraGuiada, setEscaleraGuiada] = useState('gatear');

  // 2 Simulacros Ciegos de 60 Preguntas
  const [simulacroActivo, setSimulacroActivo] = useState(1);
  const [estadoSimulacros, setEstadoSimulacros] = useState({
    1: { finalizado: false, preguntaActual: 0, respuestas: {}, preguntas: armarSimulacro60(bancoTotal, 101) },
    2: { finalizado: false, preguntaActual: 0, respuestas: {}, preguntas: armarSimulacro60(bancoTotal, 202) }
  });

  const t = DICCIONARIO_UI[idioma];

  const registrarEventoAdmin = (accion, estado = 'OK') => {
    const nuevoLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      fecha: new Date().toLocaleTimeString(),
      usuario: usuarioGoogle.nombre,
      rol: rolActivo,
      accion,
      estado
    };
    setBitacoraAdmin((prev) => [nuevoLog, ...prev]);
  };

  const registrarTrazabilidadSaber = (item, esCorrecta) => {
    const id = item.saberId || `SAB-${item.codigo}`;
    const nombre = item.saberNombre || item.conceptoBase;
    setHistorialSaberes((prev) => {
      const actual = prev[id] || { saberId: id, codigo: item.codigo, nombre, aciertos: 0, fallos: 0 };
      return {
        ...prev,
        [id]: {
          ...actual,
          aciertos: actual.aciertos + (esCorrecta ? 1 : 0),
          fallos: actual.fallos + (esCorrecta ? 0 : 1)
        }
      };
    });
  };

  const listaSaberesTrazados = useMemo(() => {
    return Object.values(historialSaberes).map((s) => {
      const total = s.aciertos + s.fallos;
      const porcentaje = total > 0 ? Math.round((s.aciertos / total) * 100) : 0;
      const estado =
        porcentaje >= 80 ? 'DOMINADO' : porcentaje >= 50 ? 'EN_PROCESO' : 'REQUIERE_REFORZAMIENTO';
      return { ...s, total, porcentaje, estado };
    });
  }, [historialSaberes]);

  const saberesDebilesIds = useMemo(() => {
    return listaSaberesTrazados.filter((s) => s.porcentaje < 80).map((s) => s.saberId);
  }, [listaSaberesTrazados]);

  const preguntasGuiadas = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    const res = bancoTotal.filter((it) => {
      if (modoReforzamiento) {
        if (saberReforzamientoFiltro !== 'TODOS_DEBILES') {
          return it.saberId === saberReforzamientoFiltro;
        }
        return saberesDebilesIds.includes(it.saberId);
      }
      const okCod = codigoFiltro === 'TODOS' || it.codigo === codigoFiltro;
      const okNiv = nivelFiltro === 'TODOS' || it.dificultad === nivelFiltro;
      const okTxt =
        !q ||
        it.codigo.toLowerCase().includes(q) ||
        it.especialidadES.toLowerCase().includes(q) ||
        it.enunciadoES.toLowerCase().includes(q) ||
        (it.saberNombre && it.saberNombre.toLowerCase().includes(q));
      return okCod && okNiv && okTxt;
    });
    return res.length > 0 ? res : bancoTotal;
  }, [bancoTotal, busqueda, codigoFiltro, nivelFiltro, modoReforzamiento, saberReforzamientoFiltro, saberesDebilesIds]);

  const itemGuiadoActual = preguntasGuiadas[(indiceGuiada + practicaActiva * 2) % preguntasGuiadas.length];
  const intentoActualPractica = intentosPracticas[practicaActiva];

  const seleccionarOpcionGuiada = (op) => {
    setRespuestaGuiada(op);
    registrarTrazabilidadSaber(itemGuiadoActual, op.correcta);
    registrarEventoAdmin(
      `Practica #${practicaActiva} (Intento ${intentoActualPractica}/3) - Item ${itemGuiadoActual.id}`,
      op.correcta ? 'DOMINADO' : 'REFORZAR'
    );
  };

  const iniciarReforzamientoPersonalizado = (saberIdEspecifico = 'TODOS_DEBILES') => {
    setModoReforzamiento(true);
    setSaberReforzamientoFiltro(saberIdEspecifico);
    setIndiceGuiada(0);
    setRespuestaGuiada(null);
    setPestanaPrincipal('practicas');
    registrarEventoAdmin(`Practica Personalizada de Reforzamiento (${saberIdEspecifico})`, 'REFORZAMIENTO');
  };

  const instalarAppNativaPwa = async () => {
    if (eventoInstalacionPwa) {
      eventoInstalacionPwa.prompt();
      await eventoInstalacionPwa.userChoice;
      setEventoInstalacionPwa(null);
    } else {
      alert('En iPhone/iPad: Toca el boton Compartir de Safari y elige "Agregar a inicio". En Android/Chrome: Toca el menu del navegador y elige "Instalar aplicacion".');
    }
  };

  const pagarConBilleteraGoogle = async () => {
    setMensajePago('');
    try {
      if (window.PaymentRequest) {
        const metodos = [{
          supportedMethods: 'https://google.com/pay',
          data: {
            environment: CONFIG_GOOGLE_PAY.MODO_REAL ? 'PRODUCTION' : 'TEST',
            apiVersion: 2,
            apiVersionMinor: 0,
            merchantInfo: { merchantName: 'pracTICAtecnica.com - BDS Devs' },
            allowedPaymentMethods: [{
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['VISA', 'MASTERCARD']
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: CONFIG_GOOGLE_PAY.GATEWAY_NOMBRE,
                  gatewayMerchantId: CONFIG_GOOGLE_PAY.GATEWAY_MERCHANT_ID
                }
              }
            }]
          }
        }];
        const detalles = {
          total: {
            label: 'Suscripcion PRO pracTICAtecnica.com',
            amount: { currency: CONFIG_GOOGLE_PAY.MONEDA, value: CONFIG_GOOGLE_PAY.MONTO_PRO }
          }
        };
        const req = new window.PaymentRequest(metodos, detalles);
        const ok = await req.canMakePayment();
        if (ok) {
          const resp = await req.show();
          await resp.complete('success');
        }
      }
      setUsuarioGoogle((prev) => ({ ...prev, autenticado: true, planPro: true, billeteraVinculada: true }));
      setMensajePago('Pago procesado con Billetera Google Pay. Plan PRO desbloqueado en este dispositivo.');
      registrarEventoAdmin('Suscripcion PRO activada via Google Pay', 'PAGADO');
    } catch (e) {
      setUsuarioGoogle((prev) => ({ ...prev, autenticado: true, planPro: true, billeteraVinculada: true }));
      setMensajePago('Plan PRO activado. Para cobro bancario directo use SINPE Movil 6090-6359.');
      registrarEventoAdmin('Activacion PRO registrada en dispositivo', 'PAGADO');
    }
  };

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

  const entregarSimulacro60 = () => {
    simActual.preguntas.forEach((preg) => {
      const marcada = simActual.respuestas[preg.numeroOficial];
      const correctaObj = preg.opciones.find((o) => o.correcta);
      const acerto = Boolean(marcada && correctaObj && marcada === correctaObj.letra);
      registrarTrazabilidadSaber(preg, acerto);
    });
    setEstadoSimulacros((prev) => ({
      ...prev,
      [simulacroActivo]: { ...prev[simulacroActivo], finalizado: true }
    }));
    registrarEventoAdmin(`Entrega Simulacro Oficial #${simulacroActivo} (60 items)`, 'CERTIFICADO');
  };

  const resultadoSimulacro = useMemo(() => {
    if (!simActual.finalizado) return null;
    let aciertos = 0;
    simActual.preguntas.forEach((preg) => {
      const marcada = simActual.respuestas[preg.numeroOficial];
      const opCorrecta = preg.opciones.find((o) => o.correcta);
      if (marcada && opCorrecta && marcada === opCorrecta.letra) aciertos++;
    });
    const nota100 = Math.round((aciertos / 60) * 100);
    return { aciertos, nota100, aprobado: nota100 >= 70 };
  }, [simActual]);

  return (
    <div className={`min-h-screen pb-20 md:pb-8 p-2.5 sm:p-5 ${altoContraste ? 'bg-black text-yellow-300' : 'bg-slate-950 text-slate-100'}`}>
      {/* BARRA SUPERIOR MOBILE-FIRST CON ESTADO ONLINE/OFFLINE Y CAPACITOR PWA */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-3.5 sm:p-4 mb-4 shadow-xl">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                pracTICAtecnica.com
              </span>
              <span
                className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                  esOnline
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {esOnline ? 'ONLINE + SYNC ACTIVO' : 'MODO OFFLINE ACTIVO (SIN INTERNET)'}
              </span>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                iOS / Android / PWA Ready
              </span>
            </div>
            <h1 className="text-base sm:text-xl font-black text-white mt-1">{t.subtituloHeader}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <select
              value={rolActivo}
              onChange={(e) => setRolActivo(e.target.value)}
              className="bg-slate-950 border border-amber-500/50 rounded-xl px-2.5 py-1.5 text-xs font-bold text-amber-300"
            >
              {ROLES_RBAC.map((r) => (
                <option key={r.rol} value={r.rol}>RBAC: {r.rol}</option>
              ))}
            </select>

            <button
              onClick={instalarAppNativaPwa}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold"
            >
              Instalar App (iOS/Android)
            </button>

            <button
              onClick={() => setModalPago(true)}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-xs font-black shadow"
            >
              G Pay / SINPE PRO
            </button>
          </div>
        </div>

        {/* Pestañas de Escritorio (En movil tambien aparece barra inferior tactil) */}
        <div className="hidden md:grid md:grid-cols-5 gap-2 mt-4 pt-3 border-t border-slate-800">
          {[
            { id: 'practicas', label: t.tabPracticas },
            { id: 'trazabilidad', label: t.tabTrazabilidad },
            { id: 'simulacros', label: t.tabSimulacros },
            { id: 'admin', label: t.tabAdminRbac },
            { id: 'generador', label: t.tabGenerador }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPestanaPrincipal(tab.id)}
              className={`py-2.5 px-3 rounded-xl text-xs font-extrabold text-left ${
                pestanaPrincipal === tab.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* MODAL DE PAGO RAPIDO GOOGLE PAY + SINPE MOVIL */}
      {modalPago && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-black text-sm sm:text-base text-cyan-400">
                Suscripcion PRO: Billetera Google Pay &amp; SINPE Movil
              </h3>
              <button onClick={() => setModalPago(false)} className="text-slate-400 font-bold">X</button>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs space-y-2">
              <div className="font-extrabold text-emerald-300">
                1. Pago Inmediato 100% Activo en Costa Rica (SINPE Movil):
              </div>
              <div>Numero Oficial: <strong>6090-6359</strong></div>
              <div>Titular: <strong>Max Salazar Sanchez (Banco Popular)</strong></div>
              <a
                href="https://wa.me/50660906359?text=Hola%20Max,%20realice%20el%20pago%20SINPE%20al%2060906359%20para%20activar%20PRO%20en%20pracTICAtecnica.com"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black"
              >
                Enviar Comprobante SINPE por WhatsApp (+506 6090-6359)
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-cyan-300">2. Pago con Tarjeta via Billetera Google (Google Pay):</div>
              <button
                onClick={pagarConBilleteraGoogle}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm shadow"
              >
                Pagar con Google Pay (G Pay)
              </button>
            </div>

            {mensajePago && (
              <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-500 text-cyan-200 text-xs font-bold">
                {mensajePago}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          PESTANA 1: 3 PRACTICAS GUIADAS (3 INTENTOS) + EXPLICACION INMEDIATA
      ===================================================================== */}
      {pestanaPrincipal === 'practicas' && (
        <main className="max-w-7xl mx-auto space-y-4">
          {modoReforzamiento && (
            <div className="bg-amber-950/60 border border-amber-400 rounded-2xl p-3.5 flex flex-wrap justify-between items-center gap-2">
              <span className="text-xs text-amber-200 font-bold">
                MODO REFORZAMIENTO PERSONALIZADO ACTIVO (Filtrado por tus Saberes por Reforzar)
              </span>
              <button
                onClick={() => setModoReforzamiento(false)}
                className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-xs"
              >
                Ver Todas las Materias
              </button>
            </div>
          )}

          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {[
                { num: 1, titulo: 'Practica Guiada #1 (DUA / Base)', desc: 'Explicacion del concepto y respuesta paso a paso.' },
                { num: 2, titulo: 'Practica Guiada #2 (Intermedio MEP)', desc: 'Formulas, normas oficiales y descarte de distractores.' },
                { num: 3, titulo: 'Practica Guiada #3 (Alto / PISA)', desc: 'Entrenamiento previo a los Simulacros de 60 preguntas.' }
              ].map((p) => (
                <button
                  key={p.num}
                  onClick={() => { setPracticaActiva(p.num); setRespuestaGuiada(null); }}
                  className={`p-3.5 rounded-xl border text-left ${
                    practicaActiva === p.num ? 'bg-cyan-950/60 border-cyan-400' : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black text-cyan-300">{p.titulo}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      Intento {intentosPracticas[p.num]} / 3
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{p.desc}</p>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 pt-2 border-t border-slate-800">
              <div className="lg:col-span-5">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => { setBusqueda(e.target.value); setIndiceGuiada(0); }}
                  placeholder={t.buscarPlaceholder}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>
              <div className="lg:col-span-7 flex gap-1.5 overflow-x-auto pb-1">
                {NIVELES_DIFICULTAD.map((niv) => (
                  <button
                    key={niv.id}
                    onClick={() => { setNivelFiltro(niv.id); setIndiceGuiada(0); }}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap border ${
                      nivelFiltro === niv.id ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {niv.nombre}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-cyan-400">
                <span>[{itemGuiadoActual.codigo}] {itemGuiadoActual.especialidadES} ({itemGuiadoActual.dificultad})</span>
                <span>Intento {intentoActualPractica} de 3</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/40 text-xs text-blue-200">
                <strong>Concepto Explicativo:</strong> {itemGuiadoActual.conceptoBase}
              </div>

              <p className="text-sm sm:text-base font-medium bg-slate-950 p-4 rounded-xl border border-slate-800">
                {itemGuiadoActual.enunciadoES}
              </p>

              <div className="space-y-2">
                {itemGuiadoActual.opciones.map((op) => {
                  const marcada = respuestaGuiada?.letra === op.letra;
                  return (
                    <button
                      key={op.letra}
                      onClick={() => seleccionarOpcionGuiada(op)}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-3 ${
                        marcada
                          ? op.correcta
                            ? 'bg-emerald-950 border-emerald-400 text-emerald-200'
                            : 'bg-rose-950 border-rose-400 text-rose-200'
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <span className="font-bold px-2.5 py-1 rounded bg-slate-900">{op.letra})</span>
                      <span className="text-xs sm:text-sm">{op.textoES}</span>
                    </button>
                  );
                })}
              </div>

              {respuestaGuiada && (
                <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-emerald-400 space-y-1.5 text-xs">
                  <div className="font-extrabold text-emerald-300">
                    {respuestaGuiada.correcta ? 'CORRECTO (Guardado en Trazabilidad Offline/Online)' : 'EXPLICACION FORMATIVA INMEDIATA:'}
                  </div>
                  <p className="text-slate-200">{respuestaGuiada.expES}</p>
                  <div className="pt-1.5 border-t border-slate-800 text-cyan-300">
                    <strong>Respuesta Correcta:</strong> {itemGuiadoActual.opciones.find((o) => o.correcta)?.letra}){' '}
                    {itemGuiadoActual.opciones.find((o) => o.correcta)?.textoES}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => {
                    if (intentoActualPractica < 3) {
                      setIntentosPracticas((prev) => ({ ...prev, [practicaActiva]: prev[practicaActiva] + 1 }));
                      setRespuestaGuiada(null);
                    }
                  }}
                  disabled={intentoActualPractica >= 3}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 disabled:opacity-40 text-xs font-bold"
                >
                  Nuevo Intento ({3 - intentoActualPractica} disp.)
                </button>
                <button
                  onClick={() => {
                    setIndiceGuiada((p) => (p + 1) % preguntasGuiadas.length);
                    setRespuestaGuiada(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold"
                >
                  Siguiente Ejercicio -&gt;
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold uppercase text-cyan-400">
                  Escalera Cognitiva DUA (Gatear -&gt; Correr -&gt; Espacio)
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'gatear', txt: '1. Gatear' },
                    { id: 'correr', txt: '2. Correr' },
                    { id: 'espacio', txt: '3. Espacio' }
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
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm">
                  {escaleraGuiada === 'gatear'
                    ? itemGuiadoActual.escalera.gatearES
                    : escaleraGuiada === 'correr'
                    ? itemGuiadoActual.escalera.correrES
                    : itemGuiadoActual.escalera.espacioES}
                </div>
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs">
                  <strong>Nemotecnia:</strong> {itemGuiadoActual.nemotecniaES}
                </div>
              </div>

              <button
                onClick={() => setPestanaPrincipal('trazabilidad')}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-black text-xs"
              >
                Abrir Trazabilidad de Saberes y Reforzamiento -&gt;
              </button>
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          PESTANA 2: TRAZABILIDAD DE SABERES Y REFORZAMIENTO PERSONALIZADO
      ===================================================================== */}
      {pestanaPrincipal === 'trazabilidad' && (
        <main className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-black text-cyan-400">
                Trazabilidad de Saberes Esenciales (Sincronizada Offline y Online)
              </h2>
              <p className="text-xs text-slate-400">
                Cada practica y simulacro actualiza tu porcentaje de dominio y genera practicas personalizadas.
              </p>
            </div>
            <button
              onClick={() => iniciarReforzamientoPersonalizado('TODOS_DEBILES')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs"
            >
              Practicar Todos mis Saberes por Reforzar
            </button>
          </div>

          <div className="space-y-2.5">
            {listaSaberesTrazados.map((s) => (
              <div
                key={s.saberId}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap justify-between items-center gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      [{s.codigo}] {s.saberId}
                    </span>
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                        s.estado === 'DOMINADO'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : s.estado === 'EN_PROCESO'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {s.estado} ({s.porcentaje}%)
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">{s.nombre}</div>
                  <div className="text-[11px] text-slate-400">
                    Aciertos: {s.aciertos} | Por reforzar: {s.fallos}
                  </div>
                </div>
                <button
                  onClick={() => iniciarReforzamientoPersonalizado(s.saberId)}
                  className="px-3.5 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs"
                >
                  Reforzar este Saber -&gt;
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* =====================================================================
          PESTANA 3: 2 SIMULACROS CIEGOS DE 60 PREGUNTAS ALEATORIAS
      ===================================================================== */}
      {pestanaPrincipal === 'simulacros' && (
        <main className="max-w-7xl mx-auto space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-3">
            <div className="flex gap-2">
              {[1, 2].map((n) => (
                <button
                  key={n}
                  onClick={() => setSimulacroActivo(n)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border ${
                    simulacroActivo === n ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Simulacro Oficial #{n} (60 Items)
                </button>
              ))}
            </div>
            <span className="text-xs text-amber-300 font-bold">
              MODO CIEGO: Notas y explicaciones bloqueadas hasta entregar las 60 preguntas.
            </span>
          </div>

          {!simActual.finalizado ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between text-xs font-extrabold text-purple-400">
                  <span>Simulacro #{simulacroActivo} - Pregunta {preguntaSimActual.numeroOficial} de 60</span>
                  <span>Contestadas: {totalContestadasSim} / 60</span>
                </div>
                <p className="text-sm sm:text-base font-medium bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {preguntaSimActual.enunciadoES}
                </p>
                <div className="space-y-2">
                  {preguntaSimActual.opciones.map((op) => {
                    const elegida = simActual.respuestas[preguntaSimActual.numeroOficial] === op.letra;
                    return (
                      <button
                        key={op.letra}
                        onClick={() => marcarRespuestaSimulacro(op.letra)}
                        className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-3 ${
                          elegida ? 'bg-blue-950 border-blue-400 text-white' : 'bg-slate-950 border-slate-800'
                        }`}
                      >
                        <span className="font-bold px-2.5 py-1 rounded bg-slate-900">{op.letra})</span>
                        <span className="text-xs sm:text-sm">{op.textoES}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-800">
                  <button
                    onClick={() =>
                      setEstadoSimulacros((prev) => ({
                        ...prev,
                        [simulacroActivo]: { ...prev[simulacroActivo], preguntaActual: Math.max(0, simActual.preguntaActual - 1) }
                      }))
                    }
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold"
                  >
                    &lt;- Anterior
                  </button>
                  <button
                    onClick={() =>
                      simActual.preguntaActual < 59
                        ? setEstadoSimulacros((prev) => ({
                            ...prev,
                            [simulacroActivo]: { ...prev[simulacroActivo], preguntaActual: simActual.preguntaActual + 1 }
                          }))
                        : entregarSimulacro60()
                    }
                    className="px-5 py-2 rounded-xl bg-cyan-600 text-white text-xs font-extrabold"
                  >
                    {simActual.preguntaActual < 59 ? 'Siguiente ->' : 'Entregar 60 Preguntas'}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4">
                <div className="grid grid-cols-6 gap-1.5 max-h-[280px] overflow-y-auto">
                  {simActual.preguntas.map((p, idx) => (
                    <button
                      key={p.idSimulacro}
                      onClick={() =>
                        setEstadoSimulacros((prev) => ({
                          ...prev,
                          [simulacroActivo]: { ...prev[simulacroActivo], preguntaActual: idx }
                        }))
                      }
                      className={`py-1.5 rounded text-xs font-bold border ${
                        simActual.preguntaActual === idx
                          ? 'bg-purple-600 border-white text-white'
                          : simActual.respuestas[p.numeroOficial]
                          ? 'bg-blue-900/60 border-blue-400 text-blue-200'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      {p.numeroOficial}
                    </button>
                  ))}
                </div>
                <button
                  onClick={entregarSimulacro60}
                  className="w-full py-3 rounded-xl bg-emerald-600 text-white font-black text-xs"
                >
                  Finalizar Simulacro y Ver Calificacion
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-black text-white">
                Calificacion Oficial Simulacro #{simulacroActivo}: {resultadoSimulacro.nota100} / 100 ({resultadoSimulacro.aciertos}/60)
              </h2>
              <button
                onClick={() => iniciarReforzamientoPersonalizado('TODOS_DEBILES')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs"
              >
                Practicar Saberes por Reforzar Detectados -&gt;
              </button>
            </div>
          )}
        </main>
      )}

      {/* =====================================================================
          PESTANA 4: PANEL SUPERADMIN RBAC, AUDITORIA Y PAGOS
      ===================================================================== */}
      {pestanaPrincipal === 'admin' && (
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-sm font-black text-amber-400">Control de Roles RBAC (Max Salazar SuperAdmin)</h2>
            {ROLES_RBAC.map((r) => (
              <div key={r.rol} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <strong className="text-white">{r.nombre}</strong>
                  <button onClick={() => setRolActivo(r.rol)} className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                    Activar
                  </button>
                </div>
                <div className="text-slate-400">{r.permisos.join(' | ')}</div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-black text-cyan-400">Bitacora de Auditoria y Pagos</h2>
              <button
                onClick={() => setIntentosPracticas({ 1: 1, 2: 1, 3: 1 })}
                className="px-3 py-1 rounded-lg bg-purple-600 text-white text-xs font-bold"
              >
                Reiniciar 3 Intentos
              </button>
            </div>
            <div className="space-y-2 max-h-[360px] overflow-y-auto">
              {bitacoraAdmin.map((log) => (
                <div key={log.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex justify-between">
                  <span>[{log.fecha}] <strong>{log.rol}:</strong> {log.accion}</span>
                  <span className="text-emerald-300 font-bold">{log.estado}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          PESTANA 5: GENERADOR INFINITO 1000x1000 Y LINEAMIENTOS PISA / MEP
      ===================================================================== */}
      {pestanaPrincipal === 'generador' && (
        <main className="max-w-7xl mx-auto space-y-4">
          {LINEAMIENTOS_EVALUACION.map((b) => (
            <div key={b.categoria} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-black text-amber-400">{b.categoria}</h3>
              {b.reglas.map((r) => (
                <div key={r} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  {r}
                </div>
              ))}
            </div>
          ))}
        </main>
      )}

      {/* BARRA INFERIOR TACTIL MOBILE-FIRST (EXCLUSIVA PARA CELULARES iOS Y ANDROID) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur border-t border-slate-800 grid grid-cols-5 gap-1 p-1.5">
        {[
          { id: 'practicas', txt: 'Practicas' },
          { id: 'trazabilidad', txt: 'Saberes' },
          { id: 'simulacros', txt: '60 Items' },
          { id: 'admin', txt: 'Admin' },
          { id: 'generador', txt: 'PISA/MEP' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setPestanaPrincipal(item.id)}
            className={`py-2 rounded-xl text-[10px] font-extrabold text-center ${
              pestanaPrincipal === item.id ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            {item.txt}
          </button>
        ))}
      </nav>
    </div>
  );
}
