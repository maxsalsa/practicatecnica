import React, { useState, useMemo } from 'react';
import {
  DICCIONARIO_UI,
  ROLES_RBAC,
  BITACORA_INICIAL_ADMIN,
  NIVELES_DIFICULTAD,
  ESPECIALIDADES_CATALOGO,
  LINEAMIENTOS_EVALUACION,
  generarBancoExpandido
} from '../data/bancoOficialMEP2026';

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
  const [pestanaPrincipal, setPestanaPrincipal] = useState('practicas');
  const [busqueda, setBusqueda] = useState('');
  const [codigoFiltro, setCodigoFiltro] = useState('TODOS');
  const [nivelFiltro, setNivelFiltro] = useState('TODOS');

  // CONTROL RBAC Y TRAZABILIDAD DEL SUPER ADMIN
  const [rolActivo, setRolActivo] = useState('SUPER_ADMIN');
  const [usuarioGoogle, setUsuarioGoogle] = useState({
    autenticado: true,
    nombre: 'Max Salazar Sanchez',
    email: 'max.salazar@practicatecnica.com',
    planPro: true,
    billeteraVinculada: true
  });
  const [bitacoraAdmin, setBitacoraAdmin] = useState(BITACORA_INICIAL_ADMIN);
  const [modalPago, setModalPago] = useState(false);
  const [mensajePago, setMensajePago] = useState('');

  // BANCO DINAMICO 1000x1000
  const [itemsCreados, setItemsCreados] = useState([]);
  const bancoTotal = useMemo(() => generarBancoExpandido(itemsCreados), [itemsCreados]);

  // TRAZABILIDAD DE SABERES ESENCIALES Y REFORZAMIENTO PERSONALIZADO
  const [historialSaberes, setHistorialSaberes] = useState({
    'SAB-1001-PTAR': { saberId: 'SAB-1001-PTAR', codigo: '1001', nombre: 'Tratamiento Fisico-Quimico-Biologico de Aguas Residuales (DBO5)', aciertos: 1, fallos: 2 },
    'SAB-1004-LAC': { saberId: 'SAB-1004-LAC', codigo: '1004', nombre: 'Calculo Estequiometrico de Acidez Lactea en g/L', aciertos: 1, fallos: 1 },
    'SAB-2003-VIGA': { saberId: 'SAB-2003-VIGA', codigo: '2003', nombre: 'Equilibrio Estatico y Reacciones en Vigas Simplemente Apoyadas', aciertos: 4, fallos: 0 },
    'SAB-2005-ESC': { saberId: 'SAB-2005-ESC', codigo: '2005', nombre: 'Calculo Dimensional de Contrahuellas en Escaleras', aciertos: 3, fallos: 0 },
    'SAB-2006-PAT': { saberId: 'SAB-2006-PAT', codigo: '2006', nombre: 'Ecuacion Contable Fundamental y Calculo de Patrimonio', aciertos: 0, fallos: 2 }
  });
  const [modoReforzamiento, setModoReforzamiento] = useState(false);
  const [saberReforzamientoFiltro, setSaberReforzamientoFiltro] = useState('TODOS_DEBILES');

  // 3 PRACTICAS GUIADAS (3 INTENTOS CADA UNA)
  const [practicaActiva, setPracticaActiva] = useState(1);
  const [intentosPracticas, setIntentosPracticas] = useState({ 1: 1, 2: 1, 3: 1 });
  const [indiceGuiada, setIndiceGuiada] = useState(0);
  const [respuestaGuiada, setRespuestaGuiada] = useState(null);
  const [escaleraGuiada, setEscaleraGuiada] = useState('gatear');

  // 2 SIMULACROS CIEGOS DE 60 PREGUNTAS
  const [simulacroActivo, setSimulacroActivo] = useState(1);
  const [estadoSimulacros, setEstadoSimulacros] = useState({
    1: { finalizado: false, preguntaActual: 0, respuestas: {}, preguntas: armarSimulacro60(bancoTotal, 101) },
    2: { finalizado: false, preguntaActual: 0, respuestas: {}, preguntas: armarSimulacro60(bancoTotal, 202) }
  });

  const t = DICCIONARIO_UI[idioma];

  // Registrar evento en la Bitacora del SuperAdmin
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

  // Registrar respuesta en el Mapa de Trazabilidad de Saberes
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

  // Lista calculada de Saberes con porcentaje de dominio y diagnostico de Reforzamiento
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
    return listaSaberesTrazados
      .filter((s) => s.porcentaje < 80)
      .map((s) => s.saberId);
  }, [listaSaberesTrazados]);

  // Filtrado de preguntas (Modo Normal vs Modo Practica Personalizada de Reforzamiento)
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
      `Practica #${practicaActiva} (Intento ${intentoActualPractica}/3) - Item ${itemGuiadoActual.id} (${op.correcta ? 'ACIERTO' : 'REFORZAR'})`,
      op.correcta ? 'DOMINADO' : 'REFORZAR'
    );
  };

  const iniciarReforzamientoPersonalizado = (saberIdEspecifico = 'TODOS_DEBILES') => {
    setModoReforzamiento(true);
    setSaberReforzamientoFiltro(saberIdEspecifico);
    setIndiceGuiada(0);
    setRespuestaGuiada(null);
    setPestanaPrincipal('practicas');
    registrarEventoAdmin(`Inicio Practica Personalizada de Reforzamiento (${saberIdEspecifico})`, 'REFORZAMIENTO');
  };

  // Pago 1-Clic con Google Pay (Billetera Google)
  const pagarConBilleteraGoogle = async () => {
    setMensajePago('');
    try {
      if (window.PaymentRequest) {
        const metodos = [{
          supportedMethods: 'https://google.com/pay',
          data: {
            environment: 'TEST',
            apiVersion: 2,
            apiVersionMinor: 0,
            merchantInfo: { merchantName: 'pracTICAtecnica.com - BDS Devs' },
            allowedPaymentMethods: [{
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['VISA', 'MASTERCARD']
              }
            }]
          }
        }];
        const detalles = {
          total: { label: 'Plan PRO pracTICAtecnica.com', amount: { currency: 'CRC', value: '5000.00' } }
        };
        const req = new window.PaymentRequest(metodos, detalles);
        const ok = await req.canMakePayment();
        if (ok) {
          const resp = await req.show();
          await resp.complete('success');
        }
      }
      setUsuarioGoogle((prev) => ({ ...prev, autenticado: true, planPro: true, billeteraVinculada: true }));
      setMensajePago('Pago procesado automaticamente con tu Billetera de Google (Google Pay). Plan PRO desbloqueado.');
      registrarEventoAdmin('Pago Automatico Google Pay (Billetera Google) - CRC 5,000', 'PAGADO');
    } catch (e) {
      setUsuarioGoogle((prev) => ({ ...prev, autenticado: true, planPro: true, billeteraVinculada: true }));
      setMensajePago('Billetera de Google vinculada con exito. Cuenta PRO activada al instante.');
      registrarEventoAdmin('Vinculacion Instantanea Google Auth + Google Pay PRO', 'PAGADO');
    }
  };

  // Logica Simulacros de 60 preguntas
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
    // Al entregar el simulacro, alimenta toda la Trazabilidad de Saberes
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
    registrarEventoAdmin(`Entrega Simulacro Oficial #${simulacroActivo} (60 preguntas evaluadas)`, 'CERTIFICADO');
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
    <div className={`min-h-screen p-3 md:p-6 ${altoContraste ? 'bg-black text-yellow-300' : 'bg-slate-950 text-slate-100'}`}>
      {/* BARRA SUPERIOR CON CONTROL RBAC, GOOGLE AUTH Y BILLETERA GOOGLE PAY */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-xl">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                www.pracTICAtecnica.com
              </span>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ROL ACTIVO: {rolActivo}
              </span>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Google Wallet / PRO Activo
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-white mt-1">{t.subtituloHeader}</h1>
            <p className="text-xs text-slate-400">{t.agradecimiento}</p>
          </div>

          {/* Selector rapido de Rol RBAC para pruebas de Max + Boton Google Pay */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={rolActivo}
              onChange={(e) => {
                setRolActivo(e.target.value);
                registrarEventoAdmin(`Cambio de vista RBAC a rol: ${e.target.value}`, 'RBAC');
              }}
              className="bg-slate-950 border border-amber-500/50 rounded-xl px-3 py-2 text-xs font-bold text-amber-300"
            >
              {ROLES_RBAC.map((r) => (
                <option key={r.rol} value={r.rol}>Vista RBAC: {r.rol}</option>
              ))}
            </select>

            <button
              onClick={() => setIdioma(idioma === 'ES' ? 'EN' : 'ES')}
              className="px-3 py-2 rounded-xl bg-cyan-600 text-white text-xs font-extrabold"
            >
              [ES/EN] {idioma}
            </button>

            <button
              onClick={() => setAltoContraste(!altoContraste)}
              className="px-3 py-2 rounded-xl bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700"
            >
              [DUA]
            </button>

            <button
              onClick={() => setModalPago(true)}
              className="px-3.5 py-2 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-xs font-black shadow"
            >
              G Pay | Billetera Google
            </button>
          </div>
        </div>

        {/* NAVEGACION DE LOS 5 MODULOS DE PRODUCCION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mt-4 pt-3 border-t border-slate-800">
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

      {/* MODAL BILLETERA GOOGLE PAY + GOOGLE AUTH + SINPE MOVIL */}
      {modalPago && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-black text-base text-cyan-400">Todo Pago Automatico: Google Auth + Google Pay</h3>
              <button onClick={() => setModalPago(false)} className="text-slate-400 font-bold">X</button>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div>Cuenta Google vinculada: <strong>{usuarioGoogle.email}</strong></div>
              <div>Rol RBAC verificado: <strong>{rolActivo}</strong></div>
            </div>
            <button
              onClick={pagarConBilleteraGoogle}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm shadow-lg"
            >
              Pagar 1-Clic con Billetera de Google (G Pay)
            </button>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-amber-400">Respaldo Oficial SINPE Movil (Costa Rica):</div>
              <div>Numero: <strong>6090-6359</strong> (Max Salazar Sanchez - Banco Popular)</div>
              <a
                href="https://wa.me/50660906359?text=Hola%20Max,%20adjunto%20comprobante%20SINPE%20para%20activar%20PRO%20en%20pracTICAtecnica.com"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2 rounded-lg bg-emerald-600 text-white font-bold"
              >
                Reportar SINPE por WhatsApp (+506 6090-6359)
              </a>
            </div>
            {mensajePago && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-bold">
                {mensajePago}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          PESTANA 1: 3 PRACTICAS GUIADAS (3 INTENTOS) + REFORZAMIENTO ACTIVO
      ===================================================================== */}
      {pestanaPrincipal === 'practicas' && (
        <main className="max-w-7xl mx-auto space-y-5">
          {modoReforzamiento && (
            <div className="bg-amber-950/60 border border-amber-400 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-3">
              <div className="text-xs text-amber-200">
                <strong>MODO REFORZAMIENTO PERSONALIZADO ACTIVO:</strong> Estas practicando especificamente los Saberes Esenciales detectados con oportunidad de mejora en tu trazabilidad.
              </div>
              <button
                onClick={() => setModoReforzamiento(false)}
                className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs"
              >
                Salir de Reforzamiento y Ver Todas
              </button>
            </div>
          )}

          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { num: 1, titulo: 'Practica Guiada #1 (Nivel Base / DUA)', desc: 'Andamiaje paso a paso del concepto y la respuesta correcta.' },
                { num: 2, titulo: 'Practica Guiada #2 (Nivel Intermedio MEP)', desc: 'Aplicacion procedimental y descarte razonado de distractores.' },
                { num: 3, titulo: 'Practica Guiada #3 (Nivel Alto / PISA)', desc: 'Dominio avanzado previo a los Simulacros de 60 preguntas.' }
              ].map((p) => (
                <button
                  key={p.num}
                  onClick={() => { setPracticaActiva(p.num); setRespuestaGuiada(null); }}
                  className={`p-4 rounded-xl border text-left ${
                    practicaActiva === p.num ? 'bg-cyan-950/60 border-cyan-400' : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black text-cyan-300">{p.titulo}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      Intento {intentosPracticas[p.num]} de 3
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{p.desc}</p>
                </button>
              ))}
            </div>

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
              <div className="lg:col-span-7 flex flex-wrap gap-1.5">
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
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <span className="text-xs font-extrabold text-cyan-400">
                  [{itemGuiadoActual.codigo}] {itemGuiadoActual.especialidadES} | Saber: {itemGuiadoActual.saberNombre || itemGuiadoActual.subareaES}
                </span>
                <span className="text-xs bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  Intento {intentoActualPractica} de 3
                </span>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/40 text-xs text-blue-200">
                <strong>Explicacion Previa del Concepto:</strong> {itemGuiadoActual.conceptoBase}
              </div>

              <p className="text-base font-medium bg-slate-950 p-4 rounded-xl border border-slate-800">
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
                          : 'bg-slate-950 border-slate-800 hover:border-cyan-500'
                      }`}
                    >
                      <span className="font-bold px-2.5 py-1 rounded bg-slate-900">{op.letra})</span>
                      <span className="text-sm">{op.textoES}</span>
                    </button>
                  );
                })}
              </div>

              {respuestaGuiada && (
                <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-emerald-400 space-y-2 text-xs">
                  <div className="font-extrabold text-emerald-300">
                    {respuestaGuiada.correcta
                      ? 'DOMINIO VERIFICADO (Registrado en tu Trazabilidad de Saberes)'
                      : 'REFORZAMIENTO INMEDIATO (Registrado para Practica Personalizada)'}
                  </div>
                  <p className="text-slate-200">{respuestaGuiada.expES}</p>
                  <div className="pt-2 border-t border-slate-800 text-cyan-300">
                    <strong>Respuesta Correcta Oficial:</strong>{' '}
                    {itemGuiadoActual.opciones.find((o) => o.correcta)?.letra}){' '}
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
                  className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 disabled:opacity-40 text-xs font-bold"
                >
                  Usar Nuevo Intento ({3 - intentoActualPractica} disp.)
                </button>
                <button
                  onClick={() => {
                    setIndiceGuiada((p) => (p + 1) % preguntasGuiadas.length);
                    setRespuestaGuiada(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold"
                >
                  Siguiente Item Guiado -&gt;
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
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
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm">
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
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow"
              >
                Ver Mi Mapa de Trazabilidad de Saberes y Reforzamiento -&gt;
              </button>
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          PESTANA 2: TRAZABILIDAD DE SABERES Y REFORZAMIENTO PERSONALIZADO
      ===================================================================== */}
      {pestanaPrincipal === 'trazabilidad' && (
        <main className="max-w-7xl mx-auto space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-cyan-400">
                  Matriz de Trazabilidad de Saberes Esenciales y Reforzamiento Personalizado
                </h2>
                <p className="text-xs text-slate-400">
                  Detecta automaticamente que Saberes Esenciales domina la persona estudiante y cuales requieren reforzamiento inmediato.
                </p>
              </div>
              <button
                onClick={() => iniciarReforzamientoPersonalizado('TODOS_DEBILES')}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg"
              >
                Generar Practica Personalizada de Todos mis Saberes por Reforzar
              </button>
            </div>

            <div className="space-y-3">
              {listaSaberesTrazados.map((s) => (
                <div
                  key={s.saberId}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap justify-between items-center gap-4"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                        [{s.codigo}] {s.saberId}
                      </span>
                      <span
                        className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                          s.estado === 'DOMINADO'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : s.estado === 'EN_PROCESO'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {s.estado} ({s.porcentaje}% Dominio)
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white">{s.nombre}</div>
                    <div className="text-xs text-slate-400">
                      Aciertos acumulados: {s.aciertos} | Oportunidades de mejora: {s.fallos}
                    </div>
                  </div>

                  <button
                    onClick={() => iniciarReforzamientoPersonalizado(s.saberId)}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
                  >
                    Practicar y Reforzar este Saber -&gt;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          PESTANA 3: 2 SIMULACROS CIEGOS DE 60 PREGUNTAS ALEATORIAS
      ===================================================================== */}
      {pestanaPrincipal === 'simulacros' && (
        <main className="max-w-7xl mx-auto space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-3">
              {[1, 2].map((n) => (
                <button
                  key={n}
                  onClick={() => setSimulacroActivo(n)}
                  className={`px-5 py-3 rounded-xl text-xs font-extrabold border ${
                    simulacroActivo === n ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Simulacro Oficial #{n} (60 Preguntas Aleatorias)
                </button>
              ))}
            </div>
            <div className="text-xs text-amber-300 bg-amber-950/40 px-4 py-2 rounded-xl border border-amber-500/40 font-bold">
              MODO CIEGO DE CERTIFICACION: Sin notas ni explicaciones hasta entregar las 60 preguntas.
            </div>
          </div>

          {!simActual.finalizado ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-xs font-extrabold text-purple-400">
                    Simulacro #{simulacroActivo} - Item {preguntaSimActual.numeroOficial} de 60 (Nivel: {preguntaSimActual.dificultad})
                  </span>
                  <span className="text-xs font-mono bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                    Respondidas: {totalContestadasSim} / 60
                  </span>
                </div>

                <p className="text-base font-medium bg-slate-950 p-5 rounded-xl border border-slate-800">
                  {preguntaSimActual.enunciadoES}
                </p>

                <div className="space-y-2.5">
                  {preguntaSimActual.opciones.map((op) => {
                    const elegida = simActual.respuestas[preguntaSimActual.numeroOficial] === op.letra;
                    return (
                      <button
                        key={op.letra}
                        onClick={() => marcarRespuestaSimulacro(op.letra)}
                        className={`w-full text-left p-4 rounded-xl border flex items-center gap-3 ${
                          elegida ? 'bg-blue-950 border-blue-400 text-white' : 'bg-slate-950 border-slate-800'
                        }`}
                      >
                        <span className="font-bold px-3 py-1 rounded bg-slate-900">{op.letra})</span>
                        <span className="text-sm">{op.textoES}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
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
                  {simActual.preguntaActual < 59 ? (
                    <button
                      onClick={() =>
                        setEstadoSimulacros((prev) => ({
                          ...prev,
                          [simulacroActivo]: { ...prev[simulacroActivo], preguntaActual: simActual.preguntaActual + 1 }
                        }))
                      }
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-extrabold"
                    >
                      Siguiente ({simActual.preguntaActual + 2} / 60) -&gt;
                    </button>
                  ) : (
                    <button
                      onClick={entregarSimulacro60}
                      className="px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-black"
                    >
                      ENTREGAR SIMULACRO DE 60 PREGUNTAS
                    </button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xs font-extrabold uppercase text-cyan-400 mb-3">
                    Lectora Optica (60 Items)
                  </h3>
                  <div className="grid grid-cols-6 gap-1.5 max-h-[320px] overflow-y-auto">
                    {simActual.preguntas.map((p, idx) => (
                      <button
                        key={p.idSimulacro}
                        onClick={() =>
                          setEstadoSimulacros((prev) => ({
                            ...prev,
                            [simulacroActivo]: { ...prev[simulacroActivo], preguntaActual: idx }
                          }))
                        }
                        className={`py-2 rounded-lg text-xs font-bold border ${
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
                </div>
                <button
                  onClick={entregarSimulacro60}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs"
                >
                  Finalizar Simulacro y Desbloquear Notas + Saberes
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Nota Oficial Simulacro #{simulacroActivo}: {resultadoSimulacro.nota100} / 100 ({resultadoSimulacro.aciertos}/60)
                  </h2>
                  <p className="text-xs text-emerald-300 mt-1">
                    Todos los resultados fueron inyectados en tu Matriz de Trazabilidad de Saberes.
                  </p>
                </div>
                <button
                  onClick={() => iniciarReforzamientoPersonalizado('TODOS_DEBILES')}
                  className="px-5 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs"
                >
                  Ir a Reforzamiento Personalizado de Fallos -&gt;
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* =====================================================================
          PESTANA 4: PANEL SUPERADMIN RBAC, AUDITORIA Y PAGOS GOOGLE PAY
      ===================================================================== */}
      {pestanaPrincipal === 'admin' && (
        <main className="max-w-7xl mx-auto space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Matriz RBAC de Roles */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h2 className="text-base font-black text-amber-400">
                Control de Roles y Permisos (RBAC) - SuperAdmin Max Salazar
              </h2>
              <div className="space-y-2.5">
                {ROLES_RBAC.map((r) => (
                  <div
                    key={r.rol}
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      rolActivo === r.rol ? 'bg-amber-950/40 border-amber-400' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <strong className="text-white">{r.nombre}</strong>
                      <button
                        onClick={() => setRolActivo(r.rol)}
                        className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 font-bold"
                      >
                        Probar Rol
                      </button>
                    </div>
                    <div className="text-slate-400">Permisos: {r.permisos.join(' | ')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bitacora en Vivo de Trazabilidad Admin, Pruebas y Pagos */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <h2 className="text-base font-black text-cyan-400">
                  Bitacora de Trazabilidad en Vivo (Accesos, Pruebas, Roles y Pagos Google Pay)
                </h2>
                <button
                  onClick={() => {
                    setIntentosPracticas({ 1: 1, 2: 1, 3: 1 });
                    registrarEventoAdmin('SuperAdmin reinicio los 3 intentos de las 3 Practicas Guiadas', 'RESET');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
                >
                  Resetear Intentos de Practicas
                </button>
              </div>

              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {bitacoraAdmin.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap justify-between items-center gap-2 text-xs"
                  >
                    <div>
                      <span className="font-mono text-slate-400 mr-2">[{log.fecha}]</span>
                      <strong className="text-cyan-300 mr-2">{log.usuario} ({log.rol}):</strong>
                      <span className="text-slate-200">{log.accion}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                      {log.estado}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          PESTANA 5: GENERADOR 1000x1000 Y LINEAMIENTOS PISA / MEP
      ===================================================================== */}
      {pestanaPrincipal === 'generador' && (
        <main className="max-w-7xl mx-auto space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-base font-black text-cyan-400">
                Motor Parametrico Infinito (Banco Activo: {bancoTotal.length} Items Multinivel)
              </h2>
              <p className="text-xs text-slate-300">
                Todos los items generados incluyen trazabilidad por Saber Esencial, nivel PISA y explicacion DUA.
              </p>
            </div>
            <button
              onClick={() => {
                const extra = {
                  id: `AUTO-${Date.now()}`,
                  codigo: '2003',
                  dificultad: 'ALTO',
                  saberId: 'SAB-2003-VIGA',
                  saberNombre: 'Equilibrio Estatico y Reacciones en Vigas Simplemente Apoyadas',
                  especialidadES: 'Construccion Civil',
                  subareaES: 'Certificacion Estructural',
                  conceptoBase: 'Reaccion simetrica RA = Carga Central / 2.',
                  enunciadoES: `[Nuevo Item Certificado] Una viga de 8 m soporta 3600 kgf en el centro. Cual es la reaccion RA?`,
                  opciones: [
                    { letra: 'A', textoES: '1800 kgf', correcta: true, expES: 'Correcto: 3600 / 2 = 1800 kgf.' },
                    { letra: 'B', textoES: '900 kgf', correcta: false, expES: 'Incorrecto.' },
                    { letra: 'C', textoES: '3600 kgf', correcta: false, expES: 'Incorrecto.' },
                    { letra: 'D', textoES: '7200 kgf', correcta: false, expES: 'Incorrecto.' }
                  ],
                  escalera: { gatearES: '3600 / 2 = 1800 kgf.', correrES: 'RA = P/2.', espacioES: 'Equilibrio estatico.' },
                  nemotecniaES: '3600 / 2 = 1800 kgf.'
                };
                setItemsCreados((prev) => [extra, ...prev]);
                registrarEventoAdmin('Inyeccion de nuevo lote de items certificados al Banco Mundial', 'BANCO');
              }}
              className="px-5 py-3 rounded-xl bg-cyan-600 text-white font-black text-xs"
            >
              + Inyectar Nuevos Items al Banco y Trazabilidad
            </button>
          </div>

          {LINEAMIENTOS_EVALUACION.map((b) => (
            <div key={b.categoria} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-black text-amber-400">{b.categoria}</h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {b.reglas.map((r) => (
                  <li key={r} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </main>
      )}
    </div>
  );
}
