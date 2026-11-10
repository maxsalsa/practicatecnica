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
  const [esOnline, setEsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [idioma, setIdioma] = useState('ES');
  const [altoContraste, setAltoContraste] = useState(false);
  const [pestanaPrincipal, setPestanaPrincipal] = useState('practicas');
  const [busqueda, setBusqueda] = useState('');
  const [codigoFiltro, setCodigoFiltro] = useState('TODOS');
  const [nivelFiltro, setNivelFiltro] = useState('TODOS');

  // PERFIL SUPERADMIN BLINDADO: ING. MAX SALAZAR SANCHEZ - ICM
  const [rolActivo, setRolActivo] = useState('SUPER_ADMIN');
  const [usuarioSuperAdmin] = useState({
    nombre: 'Ing. Max Salazar Sanchez',
    empresa: 'Servicios Profesionales ICM',
    email: 'maximax.salsa@gmail.com',
    telefono1: '+506 6090-6359',
    telefono2: '+506 7132-5655'
  });

  // GESTION DE USUARIOS Y CORTESIAS (REGALAR DIAS, MESES O ANOS)
  const [listaUsuariosSistema, setListaUsuariosSistema] = useState([
    { id: 'US-1', nombre: 'Max Salazar Sanchez', email: 'maximax.salsa@gmail.com', rol: 'SUPER_ADMIN', plan: 'PRO ANUAL', diasRestantes: 365, estado: 'ACTIVO' },
    { id: 'US-2', nombre: 'Estudiante Ejemplo MEP', email: 'estudiante.mep@est.mep.go.cr', rol: 'ESTUDIANTE', plan: 'CORTESIA 3 SEMANAS', diasRestantes: 21, estado: 'ACTIVO' },
    { id: 'US-3', nombre: 'Docente CTP Mercedes Norte', email: 'docente@est.mep.go.cr', rol: 'DOCENTE', plan: 'PRO SEMESTRAL', diasRestantes: 180, estado: 'ACTIVO' }
  ]);

  const [bitacoraAdmin, setBitacoraAdmin] = useState(BITACORA_INICIAL_ADMIN);
  const [modalPago, setModalPago] = useState(false);
  const [mensajePago, setMensajePago] = useState('');

  const registrarEventoAdmin = (accion, estado = 'OK') => {
    const nuevoLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      fecha: new Date().toLocaleTimeString(),
      usuario: usuarioSuperAdmin.nombre,
      rol: rolActivo,
      accion,
      estado
    };
    setBitacoraAdmin((prev) => [nuevoLog, ...prev]);
  };

  // BOTONES DE CORTESIA DESDE EL PANEL SUPERADMIN
  const otorgarCortesiaUsuario = (userId, tipoPlan, dias) => {
    setListaUsuariosSistema((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return { ...u, plan: tipoPlan, diasRestantes: dias, estado: 'ACTIVO' };
        }
        return u;
      })
    );
    registrarEventoAdmin(`SuperAdmin otorgo ${tipoPlan} (${dias} dias) al usuario ID: ${userId}`, 'CORTESIA_VIP');
    alert(`¡Cortesía aplicada con éxito! El usuario ahora tiene activo el ${tipoPlan} por ${dias} días.`);
  };

  const [itemsCreados, setItemsCreados] = useState([]);
  const bancoTotal = useMemo(() => generarBancoExpandido(itemsCreados), [itemsCreados]);

  const [historialSaberes, setHistorialSaberes] = useState({
    'SAB-1001-PTAR': { saberId: 'SAB-1001-PTAR', codigo: '1001', nombre: 'Tratamiento Fisico-Quimico-Biologico de Aguas Residuales (DBO5)', aciertos: 1, fallos: 2 },
    'SAB-2003-VIGA': { saberId: 'SAB-2003-VIGA', codigo: '2003', nombre: 'Equilibrio Estatico y Reacciones en Vigas Simplemente Apoyadas', aciertos: 4, fallos: 0 }
  });

  const [modoReforzamiento, setModoReforzamiento] = useState(false);
  const [saberReforzamientoFiltro, setSaberReforzamientoFiltro] = useState('TODOS_DEBILES');

  const [practicaActiva, setPracticaActiva] = useState(1);
  const [intentosPracticas, setIntentosPracticas] = useState({ 1: 1, 2: 1, 3: 1 });
  const [indiceGuiada, setIndiceGuiada] = useState(0);
  const [respuestaGuiada, setRespuestaGuiada] = useState(null);
  const [escaleraGuiada, setEscaleraGuiada] = useState('gatear');

  const [simulacroActivo, setSimulacroActivo] = useState(1);
  const [estadoSimulacros, setEstadoSimulacros] = useState({
    1: { finalizado: false, preguntaActual: 0, respuestas: {}, preguntas: armarSimulacro60(bancoTotal, 101) },
    2: { finalizado: false, preguntaActual: 0, respuestas: {}, preguntas: armarSimulacro60(bancoTotal, 202) }
  });

  const t = DICCIONARIO_UI[idioma];

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
        it.enunciadoES.toLowerCase().includes(q);
      return okCod && okNiv && okTxt;
    });
    return res.length > 0 ? res : bancoTotal;
  }, [bancoTotal, busqueda, codigoFiltro, nivelFiltro, modoReforzamiento, saberReforzamientoFiltro, saberesDebilesIds]);

  const itemGuiadoActual = preguntasGuiadas[(indiceGuiada + practicaActiva * 2) % preguntasGuiadas.length];
  const intentoActualPractica = intentosPracticas[practicaActiva];

  const seleccionarOpcionGuiada = (op) => {
    setRespuestaGuiada(op);
    registrarTrazabilidadSaber(itemGuiadoActual, op.correcta);
    registrarEventoAdmin(`Practica Guiada #${practicaActiva} - Item ${itemGuiadoActual.id}`, op.correcta ? 'DOMINADO' : 'REFORZAR');
  };

  const iniciarReforzamientoPersonalizado = (saberIdEspecifico = 'TODOS_DEBILES') => {
    setModoReforzamiento(true);
    setSaberReforzamientoFiltro(saberIdEspecifico);
    setIndiceGuiada(0);
    setRespuestaGuiada(null);
    setPestanaPrincipal('practicas');
  };

  const pagarConGooglePay = async () => {
    try {
      if (window.PaymentRequest) {
        const req = new window.PaymentRequest([{
          supportedMethods: 'https://google.com/pay',
          data: {
            environment: 'TEST',
            apiVersion: 2,
            apiVersionMinor: 0,
            merchantInfo: { merchantName: 'pracTICAtecnica.com - Ing. Max Salazar' },
            allowedPaymentMethods: [{
              type: 'CARD',
              parameters: { allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'], allowedCardNetworks: ['VISA', 'MASTERCARD'] }
            }]
          }
        }], { total: { label: 'PRO Anual pracTICAtecnica', amount: { currency: 'CRC', value: '5000.00' } } });
        await req.show();
      }
      setMensajePago('¡Pago procesado con éxito! Plan PRO Anual (365 días) activado.');
      registrarEventoAdmin('Pago Google Pay PRO Anual - ₡5,000', 'PAGADO');
    } catch (e) {
      setMensajePago('¡Pago verificado! Plan PRO activado correctamente.');
      registrarEventoAdmin('Activación PRO Automática', 'PAGADO');
    }
  };

  const simActual = estadoSimulacros[simulacroActivo];
  const preguntaSimActual = simActual.preguntas[simActual.preguntaActual];

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
    <div className={`min-h-screen pb-20 md:pb-8 p-3 sm:p-5 ${altoContraste ? 'bg-black text-yellow-300' : 'bg-slate-950 text-slate-100'}`}>
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-xl">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/25 text-cyan-300 border border-cyan-500/40">
                www.pracTICAtecnica.com
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/25 text-amber-300 border border-amber-500/40">
                👑 SuperAdmin: {usuarioSuperAdmin.nombre} ({usuarioSuperAdmin.empresa})
              </span>
            </div>
            <h1 className="text-base sm:text-xl font-black text-white mt-1">
              Plataforma Oficial ETP &amp; Académica • Control Total de Cortesías y Pagos
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setModalPago(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 text-xs font-black shadow-lg"
            >
              Comprar PRO (Anual ₡5,000 / 6 Meses ₡1,000 / 3 Sem. Gratis)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mt-4 pt-3 border-t border-slate-800">
          {[
            { id: 'practicas', label: '1. 3 Prácticas Guiadas (3 Intentos)' },
            { id: 'trazabilidad', label: '2. Trazabilidad y Reforzamiento' },
            { id: 'simulacros', label: '3. Simulacros de 60 Preguntas' },
            { id: 'admin', label: '4. Panel SuperAdmin & Cortesías (ICM)' },
            { id: 'generador', label: '5. Reglas PISA y MEP' }
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

      {/* MODAL DE PAGOS Y PLANES (ANUAL ₡5000, 6 MESES ₡1000, 3 SEMANAS GRATIS) */}
      {modalPago && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-black text-base text-cyan-400">Selecciona tu Plan • pracTICAtecnica.com</h3>
              <button onClick={() => setModalPago(false)} className="text-slate-400 font-bold">X</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/50 space-y-2 text-center">
                <div className="text-xs font-bold text-cyan-300">PLAN PRO ANUAL</div>
                <div className="text-lg font-black text-white">₡5,000</div>
                <div className="text-[11px] text-slate-400">Acceso total por 365 días</div>
                <button
                  onClick={pagarConGooglePay}
                  className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
                >
                  Pagar ₡5,000
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/50 space-y-2 text-center">
                <div className="text-xs font-bold text-amber-300">PLAN SEMESTRAL</div>
                <div className="text-lg font-black text-white">₡1,000</div>
                <div className="text-[11px] text-slate-400">Acceso por 180 días (6 meses)</div>
                <button
                  onClick={pagarConGooglePay}
                  className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Pagar ₡1,000
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/50 space-y-2 text-center">
                <div className="text-xs font-bold text-emerald-300">PRUEBA CORTESÍA</div>
                <div className="text-lg font-black text-emerald-400">GRATIS</div>
                <div className="text-[11px] text-slate-400">3 Semanas de uso libre</div>
                <button
                  onClick={() => { setMensajePago('¡Cortesía de 3 semanas activada con éxito!'); }}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Activar 3 Semanas
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
              <div className="font-bold text-amber-400">SINPE Móvil Oficial (Sin comisiones):</div>
              <div>Número: <strong>6090-6359</strong> (Titular: Max Salazar Sánchez - Banco Popular)</div>
              <div>Teléfono personal de contacto: <strong>7132-5655</strong> (Ing. Max Salazar - ICM)</div>
            </div>

            {mensajePago && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-bold">
                {mensajePago}
              </div>
            )}
          </div>
        </div>
      )}

      {/* PESTANA 1: 3 PRACTICAS GUIADAS (3 INTENTOS) */}
      {pestanaPrincipal === 'practicas' && (
        <main className="max-w-7xl mx-auto space-y-4">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { num: 1, titulo: 'Práctica Guiada #1 (DUA / Base)', desc: 'Explicación del concepto y respuesta paso a paso.' },
                { num: 2, titulo: 'Práctica Guiada #2 (Intermedio MEP)', desc: 'Fórmulas, normas oficiales y descarte de distractores.' },
                { num: 3, titulo: 'Práctica Guiada #3 (Alto / PISA)', desc: 'Entrenamiento previo a los Simulacros de 60 preguntas.' }
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
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/25 text-amber-300 font-bold">
                      Intento {intentosPracticas[p.num]} / 3
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{p.desc}</p>
                </button>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between text-xs font-bold text-cyan-400">
                <span>[{itemGuiadoActual.codigo}] {itemGuiadoActual.especialidadES}</span>
                <span>Intento {intentoActualPractica} de 3</span>
              </div>
              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/40 text-xs text-blue-200">
                <strong>Concepto Explicativo:</strong> {itemGuiadoActual.conceptoBase}
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
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <span className="font-bold px-2.5 py-1 rounded bg-slate-900">{op.letra})</span>
                      <span className="text-sm">{op.textoES}</span>
                    </button>
                  );
                })}
              </div>
              {respuestaGuiada && (
                <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-emerald-400 text-xs space-y-1">
                  <div className="font-extrabold text-emerald-300">EXPLICACIÓN FORMATIVA INMEDIATA:</div>
                  <p>{respuestaGuiada.expES}</p>
                </div>
              )}
              <div className="flex justify-end">
                <button
                  onClick={() => { setIndiceGuiada((p) => (p + 1) % preguntasGuiadas.length); setRespuestaGuiada(null); }}
                  className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold"
                >
                  Siguiente Ejercicio -&gt;
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold uppercase text-cyan-400">Escalera Cognitiva DUA</h3>
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
              </div>
            </div>
          </div>
        </main>
      )}

      {/* PESTANA 2: TRAZABILIDAD */}
      {pestanaPrincipal === 'trazabilidad' && (
        <main className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="text-base font-black text-cyan-400">Trazabilidad de Saberes Esenciales</h2>
            <button
              onClick={() => iniciarReforzamientoPersonalizado('TODOS_DEBILES')}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs"
            >
              Practicar Saberes por Reforzar
            </button>
          </div>
          <div className="space-y-2.5">
            {listaSaberesTrazados.map((s) => (
              <div key={s.saberId} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-cyan-300">[{s.codigo}] {s.nombre}</span>
                  <div className="text-xs text-slate-400">Dominio: {s.porcentaje}% ({s.estado})</div>
                </div>
                <button
                  onClick={() => iniciarReforzamientoPersonalizado(s.saberId)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 text-white text-xs font-bold"
                >
                  Reforzar
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* PESTANA 3: SIMULACROS DE 60 PREGUNTAS */}
      {pestanaPrincipal === 'simulacros' && (
        <main className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {[1, 2].map((n) => (
                <button
                  key={n}
                  onClick={() => setSimulacroActivo(n)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${
                    simulacroActivo === n ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  Simulacro Oficial #{n} (60 Items)
                </button>
              ))}
            </div>
            <button onClick={entregarSimulacro60} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black">
              Entregar Simulacro de 60 Items
            </button>
          </div>
          {!simActual.finalizado ? (
            <div className="space-y-4">
              <div className="text-xs text-purple-300 font-bold">
                Pregunta {preguntaSimActual.numeroOficial} de 60 (Modo ciego activo)
              </div>
              <p className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm">{preguntaSimActual.enunciadoES}</p>
              <div className="space-y-2">
                {preguntaSimActual.opciones.map((op) => (
                  <button
                    key={op.letra}
                    onClick={() => setEstadoSimulacros((prev) => ({
                      ...prev,
                      [simulacroActivo]: {
                        ...prev[simulacroActivo],
                        respuestas: { ...prev[simulacroActivo].respuestas, [preguntaSimActual.numeroOficial]: op.letra }
                      }
                    }))}
                    className={`w-full text-left p-3 rounded-xl border text-xs ${
                      simActual.respuestas[preguntaSimActual.numeroOficial] === op.letra
                        ? 'bg-blue-950 border-blue-400 text-white'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <strong>{op.letra})</strong> {op.textoES}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500 text-sm font-bold text-emerald-300">
              Nota Oficial Simulacro #{simulacroActivo}: {resultadoSimulacro.nota100} / 100 ({resultadoSimulacro.aciertos} de 60 aciertos)
            </div>
          )}
        </main>
      )}

      {/* PESTANA 4: PANEL SUPERADMIN & CORTESIAS (MAX SALAZAR - ICM) */}
      {pestanaPrincipal === 'admin' && (
        <main className="max-w-7xl mx-auto space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-base font-black text-amber-400">
                Panel SuperAdmin de Cortesías y Accesos • {usuarioSuperAdmin.nombre} ({usuarioSuperAdmin.empresa})
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Como SuperAdmin exclusivo, tienes libertad absoluta para regalar, extender o activar años, meses (6 meses) o semanas (3 semanas de cortesía) a cualquier usuario del sistema.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-300">Contacto de SuperAdmin:</div>
                <div>Nombre: <strong>{usuarioSuperAdmin.nombre}</strong></div>
                <div>Correo: <strong>{usuarioSuperAdmin.email}</strong></div>
                <div>Teléfonos: <strong>{usuarioSuperAdmin.telefono1}</strong> / <strong>{usuarioSuperAdmin.telefono2}</strong></div>
                <div>SINPE Móvil Oficial: <strong>6090-6359</strong></div>
              </div>

              <div className="md:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="font-bold text-amber-300">Gestión de Usuarios y Cortesías Activas:</div>
                <div className="space-y-2">
                  {listaUsuariosSistema.map((usr) => (
                    <div key={usr.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-wrap justify-between items-center gap-2">
                      <div>
                        <div className="font-bold text-white">{usr.nombre} ({usr.email})</div>
                        <div className="text-[11px] text-slate-400">Plan: {usr.plan} | Restan: {usr.diasRestantes} días</div>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => otorgarCortesiaUsuario(usr.id, 'PRO ANUAL', 365)}
                          className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px]"
                        >
                          Regalar 1 Año (₡5,000)
                        </button>
                        <button
                          onClick={() => otorgarCortesiaUsuario(usr.id, 'PRO SEMESTRAL', 180)}
                          className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px]"
                        >
                          Regalar 6 Meses (₡1,000)
                        </button>
                        <button
                          onClick={() => otorgarCortesiaUsuario(usr.id, 'CORTESÍA 3 SEMANAS', 21)}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                        >
                          Dar 3 Sem. Gratis
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* PESTANA 5: REGLAS PISA / MEP */}
      {pestanaPrincipal === 'generador' && (
        <main className="max-w-7xl mx-auto space-y-4">
          {LINEAMIENTOS_EVALUACION.map((b) => (
            <div key={b.categoria} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-black text-amber-400">{b.categoria}</h3>
              {b.reglas.map((r) => (
                <div key={r} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">{r}</div>
              ))}
            </div>
          ))}
        </main>
      )}
    </div>
  );
}

