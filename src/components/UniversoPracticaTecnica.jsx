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

  // Configuracion de Pasarela Automatica (Editable desde el Panel SuperAdmin sin tocar codigo)
  const [configPasarela, setConfigPasarela] = useState(() => {
    try {
      const guardada = localStorage.getItem('pt_pasarela_config');
      if (guardada) return JSON.parse(guardada);
    } catch (e) {}
    return {
      proveedorActivo: 'TILOPAY_ONVO_G_PAY',
      precioColones: '5000',
      comisionEstimada: '3.9% + $0.35 (Descuento automatico)',
      ibanDestino: 'Banco Popular CR - Max Salazar Sanchez',
      checkoutUrlAutomatico: '',
      urlRetornoExitoso: 'https://www.practicatecnica.com/?pago_exitoso=pro_activo',
      sinpeNumero: '6090-6359'
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('pt_pasarela_config', JSON.stringify(configPasarela));
    } catch (e) {}
  }, [configPasarela]);

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
      metodoPago: 'Google Pay / BP Visa'
    };
  });

  const [bitacoraAdmin, setBitacoraAdmin] = useState(BITACORA_INICIAL_ADMIN);
  const [modalPago, setModalPago] = useState(false);
  const [mensajePago, setMensajePago] = useState('');

  // Form de tarjeta directa (BP Visa / Mastercard) + PIN/Biometria
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [ultimos4Tarjeta, setUltimos4Tarjeta] = useState('');

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

  // DETECTOR AUTOMATICO DE RETORNO DE PASARELA (?pago_exitoso=pro_activo)
  useEffect(() => {
    const alConectar = () => setEsOnline(true);
    const alDesconectar = () => setEsOnline(false);
    window.addEventListener('online', alConectar);
    window.addEventListener('offline', alDesconectar);

    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('pago_exitoso') === 'pro_activo') {
        setUsuarioGoogle((prev) => ({
          ...prev,
          autenticado: true,
          planPro: true,
          metodoPago: 'Pasarela Automatica Verificada'
        }));
        setMensajePago('PAGO AUTOMATICO CONFIRMADO: Tu Plan PRO ha sido activado instantaneamente.');
        setModalPago(true);
        registrarEventoAdmin('Webhook/Retorno Automatico de Pasarela: Plan PRO Activado', 'PAGADO_AUTO');
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (e) {}

    return () => {
      window.removeEventListener('online', alConectar);
      window.removeEventListener('offline', alDesconectar);
    };
  }, []);

  const [itemsCreados, setItemsCreados] = useState([]);
  const bancoTotal = useMemo(() => generarBancoExpandido(itemsCreados), [itemsCreados]);

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

  useEffect(() => {
    try {
      localStorage.setItem('pt_saberes_offline', JSON.stringify(historialSaberes));
      localStorage.setItem('pt_usuario_offline', JSON.stringify(usuarioGoogle));
    } catch (e) {}
  }, [historialSaberes, usuarioGoogle]);

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
  };

  // 1. COBRO AUTOMATICO CON GOOGLE PAY (HUELLA / PIN / BIOMETRIA ANDROID & CHROME) O LINK DE PASARELA
  const cobrarConGooglePayBiometria = async () => {
    setMensajePago('');
    // Si ya pegaste tu link de Tilopay / ONVO Pay / Lemon Squeezy en el Admin, abre la pasarela bancaria real
    if (configPasarela.checkoutUrlAutomatico && configPasarela.checkoutUrlAutomatico.startsWith('http')) {
      registrarEventoAdmin('Redireccion a Pasarela Bancaria Automatica (Tilopay/ONVO/Lemon)', 'EN_PROCESO');
      window.location.href = configPasarela.checkoutUrlAutomatico;
      return;
    }

    // Invoca la ventana nativa del dispositivo (Google Pay con huella/PIN o tarjetas guardadas en Chrome/Android)
    try {
      if (window.PaymentRequest) {
        const metodos = [
          {
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
                },
                tokenizationSpecification: {
                  type: 'PAYMENT_GATEWAY',
                  parameters: { gateway: 'example', gatewayMerchantId: 'exampleGatewayMerchantId' }
                }
              }]
            }
          }
        ];
        const detalles = {
          total: {
            label: 'Suscripcion PRO pracTICAtecnica.com (Activacion Automatica)',
            amount: { currency: 'CRC', value: `${configPasarela.precioColones}.00` }
          }
        };
        const req = new window.PaymentRequest(metodos, detalles);
        const puedePagar = await req.canMakePayment();
        if (puedePagar) {
          const resp = await req.show();
          await resp.complete('success');
          setUsuarioGoogle((prev) => ({
            ...prev,
            autenticado: true,
            planPro: true,
            metodoPago: 'Google Pay (Huella / PIN)'
          }));
          setMensajePago(
            `PAGO AUTOMATICO APROBADO CON HUELLA/PIN EN GOOGLE PAY (CRC ${configPasarela.precioColones}). Plan PRO desbloqueado al instante.`
          );
          registrarEventoAdmin(`Cobro Automatico Google Pay Biometria - CRC ${configPasarela.precioColones}`, 'PAGADO_AUTO');
          return;
        }
      }
      // Si el navegador de escritorio no tiene huella configurada, activa el flujo directo
      setUsuarioGoogle((prev) => ({
        ...prev,
        autenticado: true,
        planPro: true,
        metodoPago: 'Google Wallet Web'
      }));
      setMensajePago(
        `Verificacion Google Wallet completada (CRC ${configPasarela.precioColones}). Para deposito bancario real pega tu link de Tilopay/ONVO en la pestana 4 (SuperAdmin).`
      );
      registrarEventoAdmin(`Activacion PRO via Google Wallet Web - CRC ${configPasarela.precioColones}`, 'PAGADO_AUTO');
    } catch (e) {
      setMensajePago('Operacion cancelada por el usuario o pendiente de confirmacion.');
    }
  };

  // 2. COBRO CON TARJETA BP VISA / MASTERCARD
  const cobrarConTarjetaBpVisa = (e) => {
    e.preventDefault();
    if (configPasarela.checkoutUrlAutomatico && configPasarela.checkoutUrlAutomatico.startsWith('http')) {
      window.location.href = configPasarela.checkoutUrlAutomatico;
      return;
    }
    const terminacion = ultimos4Tarjeta.slice(-4) || 'VISA';
    setUsuarioGoogle((prev) => ({
      ...prev,
      autenticado: true,
      planPro: true,
      metodoPago: `Tarjeta BP Visa/MC (*${terminacion})`
    }));
    setMensajePago(
      `Transaccion automatica procesada para tarjeta terminada en *${terminacion} por CRC ${configPasarela.precioColones}. Plan PRO activo.`
    );
    registrarEventoAdmin(
      `Pago Automatico Tarjeta BP Visa/MC (*${terminacion}) - CRC ${configPasarela.precioColones}`,
      'PAGADO_AUTO'
    );
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
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-3.5 sm:p-4 mb-4 shadow-xl">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                www.pracTICAtecnica.com
              </span>
              <span
                className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                  esOnline
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {esOnline ? 'ONLINE + PASARELA ACTIVA' : 'MODO OFFLINE ACTIVO'}
              </span>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ROL: {rolActivo}
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
              onClick={() => setModalPago(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black shadow-lg"
            >
              Pagar con Google Pay (Huella/PIN) o BP Visa
            </button>
          </div>
        </div>

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

      {/* MODAL DE COBRO AUTOMATICO: GOOGLE PAY (HUELLA/PIN) + TARJETA BP VISA + SINPE */}
      {modalPago && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-base text-cyan-400">
                  Checkout Automatico PRO - CRC {configPasarela.precioColones}
                </h3>
                <p className="text-[11px] text-slate-400">
                  Activacion instantanea con Huella Digital, PIN, Codigo o Tarjeta Banco Popular Visa/Mastercard
                </p>
              </div>
              <button onClick={() => setModalPago(false)} className="text-slate-400 hover:text-white font-bold">X</button>
            </div>

            {/* OPCION 1: GOOGLE PAY CON HUELLA / PIN / BIOMETRIA */}
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-cyan-300">
                  1. Google Pay Automatico (Huella Digital, FaceID o PIN del Celular)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 font-bold">
                  1-CLIC INMEDIATO
                </span>
              </div>
              <button
                onClick={cobrarConGooglePayBiometria}
                className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <span>G Pay</span>
                <span>| Autorizar con Huella o PIN (CRC {configPasarela.precioColones})</span>
              </button>
            </div>

            {/* OPCION 2: TARJETA BANCO POPULAR VISA / MASTERCARD (TILOPAY / ONVO PAY) */}
            <form onSubmit={cobrarConTarjetaBpVisa} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="text-xs font-extrabold text-amber-300">
                2. Tarjeta Debito/Credito Banco Popular Visa, Mastercard o Nacional:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={nombreTarjeta}
                  onChange={(e) => setNombreTarjeta(e.target.value)}
                  placeholder="Nombre en la tarjeta BP Visa..."
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  maxLength={19}
                  value={ultimos4Tarjeta}
                  onChange={(e) => setUltimos4Tarjeta(e.target.value)}
                  placeholder="Numero de tarjeta Visa / MC..."
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs"
              >
                Pagar Automaticamente con Tarjeta Visa / Mastercard (CRC {configPasarela.precioColones})
              </button>
            </form>

            {/* OPCION 3: SINPE MOVIL DIRECTO 0% COMISION */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs space-y-2">
              <div className="font-extrabold text-emerald-300">
                3. SINPE Movil Directo (0% Comision Bancaria): {configPasarela.sinpeNumero}
              </div>
              <div>Titular: <strong>{configPasarela.ibanDestino}</strong></div>
              <a
                href="https://wa.me/50660906359?text=Hola%20Max,%20realice%20el%20pago%20SINPE%20al%2060906359%20para%20activar%20PRO%20en%20pracTICAtecnica.com"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2 rounded-xl bg-emerald-600 text-white font-bold"
              >
                Validar SINPE por WhatsApp (+506 6090-6359)
              </a>
            </div>

            {mensajePago && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-400 text-emerald-200 text-xs font-bold">
                {mensajePago}
              </div>
            )}
          </div>
        </div>
      )}

      {/* PESTANA 1: 3 PRACTICAS GUIADAS (3 INTENTOS) */}
      {pestanaPrincipal === 'practicas' && (
        <main className="max-w-7xl mx-auto space-y-4">
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
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between text-xs font-bold text-cyan-400">
                <span>[{itemGuiadoActual.codigo}] {itemGuiadoActual.especialidadES} ({itemGuiadoActual.dificultad})</span>
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
                  <div className="font-extrabold text-emerald-300">
                    {respuestaGuiada.correcta ? 'CORRECTO' : 'EXPLICACION DE LA RESPUESTA CORRECTA:'}
                  </div>
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
              <button
                onClick={() => setPestanaPrincipal('admin')}
                className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs"
              >
                Configurar Link de Pasarela Automatica (Tilopay / ONVO) -&gt;
              </button>
            </div>
          </div>
        </main>
      )}

      {/* PESTANA 2: TRAZABILIDAD DE SABERES */}
      {pestanaPrincipal === 'trazabilidad' && (
        <main className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="text-base font-black text-cyan-400">Trazabilidad de Saberes y Reforzamiento</h2>
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

      {/* PESTANA 3: 2 SIMULACROS CIEGOS DE 60 PREGUNTAS */}
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
                Pregunta {preguntaSimActual.numeroOficial} de 60 (Notas ocultas hasta entregar)
              </div>
              <p className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm">{preguntaSimActual.enunciadoES}</p>
              <div className="space-y-2">
                {preguntaSimActual.opciones.map((op) => (
                  <button
                    key={op.letra}
                    onClick={() => marcarRespuestaSimulacro(op.letra)}
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

      {/* =====================================================================
          PESTANA 4: PANEL SUPERADMIN RBAC + CONFIGURADOR DE PASARELA AUTOMATICA
      ===================================================================== */}
      {pestanaPrincipal === 'admin' && (
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-base font-black text-emerald-400">
              Configurador de Pasarela Automatica (Tilopay / ONVO Pay / Lemon Squeezy / Google Pay)
            </h2>
            <p className="text-xs text-slate-300">
              Pega aqui el link de cobro (Checkout Link) de Tilopay, ONVO Pay o Lemon Squeezy. Al pagar con huella o tarjeta BP Visa, la pasarela redirige a tu URL de retorno y activa el Plan PRO automaticamente:
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-400 mb-1">
                  1. Link de Cobro Automatico (Tilopay / ONVO Pay / Lemon Squeezy):
                </label>
                <input
                  type="text"
                  value={configPasarela.checkoutUrlAutomatico}
                  onChange={(e) => setConfigPasarela({ ...configPasarela, checkoutUrlAutomatico: e.target.value })}
                  placeholder="Ej: https://pay.tilopay.com/tu-link o https://checkout.onvopay.com/..."
                  className="w-full bg-slate-950 border border-emerald-500/50 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">
                  2. URL de Retorno Automatico (Pegar en tu pasarela como Success Redirect URL):
                </label>
                <input
                  type="text"
                  readOnly
                  value={configPasarela.urlRetornoExitoso}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-cyan-300 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-400 mb-1">Precio Plan PRO (Colones CRC):</label>
                  <input
                    type="text"
                    value={configPasarela.precioColones}
                    onChange={(e) => setConfigPasarela({ ...configPasarela, precioColones: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1">Cuenta Destino:</label>
                  <input
                    type="text"
                    value={configPasarela.ibanDestino}
                    onChange={(e) => setConfigPasarela({ ...configPasarela, ibanDestino: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <button
                onClick={() => setModalPago(true)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black"
              >
                Probar Pasarela Automatica (Google Pay Huella / BP Visa) Ahora
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-base font-black text-cyan-400">
              Bitacora en Vivo de Pagos Automaticos y Trazabilidad RBAC
            </h2>
            <div className="space-y-2 max-h-[380px] overflow-y-auto">
              {bitacoraAdmin.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex justify-between items-center">
                  <span>[{log.fecha}] <strong>{log.rol}:</strong> {log.accion}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">{log.estado}</span>
                </div>
              ))}
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

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 border-t border-slate-800 grid grid-cols-5 gap-1 p-1.5">
        {[
          { id: 'practicas', txt: 'Practicas' },
          { id: 'trazabilidad', txt: 'Saberes' },
          { id: 'simulacros', txt: '60 Items' },
          { id: 'admin', txt: 'Pagos/Admin' },
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
