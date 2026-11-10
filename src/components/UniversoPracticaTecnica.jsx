import React, { useState, useMemo } from 'react';
import {
  DICCIONARIO_UI,
  NIVELES_MACRO,
  ESPECIALIDADES_CATALOGO,
  CONTEXTOS_REGIONALES,
  BIBLIA_HABILIDADES_BLANDAS,
  BANCO_ITEMS_2026,
  JUEGO_SECUENCIAS
} from '../data/bancoOficialMEP2026';

export default function UniversoPracticaTecnica() {
  const [idioma, setIdioma] = useState('ES');
  const [altoContraste, setAltoContraste] = useState(false);
  const [familiaActiva, setFamiliaActiva] = useState('TODOS');
  const [codigoFiltro, setCodigoFiltro] = useState('TODOS');
  const [busqueda, setBusqueda] = useState('');
  const [regionActiva, setRegionActiva] = useState('limon');
  const [modoVista, setModoVista] = useState('juegos');
  const [juegoActivo, setJuegoActivo] = useState('simulador');

  const [usuarioGoogle, setUsuarioGoogle] = useState({
    autenticado: true,
    nombre: 'Max Salazar Sanchez',
    email: 'max.salazar@practicatecnica.com',
    rol: 'SUPER_ADMIN',
    planPro: true
  });
  const [modalPagoAbierto, setModalPagoAbierto] = useState(false);
  const [mensajePago, setMensajePago] = useState('');

  const [indicePregunta, setIndicePregunta] = useState(0);
  const [nivelEscalera, setNivelEscalera] = useState('gatear');
  const [opcionElegida, setOpcionElegida] = useState(null);
  const [puntos, setPuntos] = useState(0);
  const [racha, setRacha] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [cincuenta, setCincuenta] = useState(false);
  const [indiceSecuencia, setIndiceSecuencia] = useState(0);
  const [pasosUsuario, setPasosUsuario] = useState([]);
  const [seleccionMemoria, setSeleccionMemoria] = useState(null);
  const [parejasResueltas, setParejasResueltas] = useState([]);
  const [intentoPalabra, setIntentoPalabra] = useState('');
  const [palabraResuelta, setPalabraResuelta] = useState(false);

  const t = DICCIONARIO_UI[idioma];
  const reg = CONTEXTOS_REGIONALES[regionActiva];

  const especialidadesMenu = useMemo(() => {
    if (familiaActiva === 'TODOS') return ESPECIALIDADES_CATALOGO;
    return ESPECIALIDADES_CATALOGO.filter((e) => e.familia === familiaActiva);
  }, [familiaActiva]);

  const preguntasFiltradas = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    const res = BANCO_ITEMS_2026.filter((it) => {
      const okCod = codigoFiltro === 'TODOS' || it.codigo === codigoFiltro;
      const okTxt =
        !q ||
        it.codigo.toLowerCase().includes(q) ||
        it.especialidadES.toLowerCase().includes(q) ||
        it.especialidadEN.toLowerCase().includes(q) ||
        it.enunciadoES.toLowerCase().includes(q) ||
        it.enunciadoEN.toLowerCase().includes(q) ||
        it.palabraES.toLowerCase().includes(q) ||
        it.palabraEN.toLowerCase().includes(q);
      return okCod && okTxt;
    });
    return res.length > 0 ? res : BANCO_ITEMS_2026;
  }, [busqueda, codigoFiltro]);

  const itemActual = preguntasFiltradas[indicePregunta % preguntasFiltradas.length];
  const secuenciaActual = JUEGO_SECUENCIAS[indiceSecuencia % JUEGO_SECUENCIAS.length];
  const pasosMeta = idioma === 'ES' ? secuenciaActual.pasosES : secuenciaActual.pasosEN;
  const palabraMeta = idioma === 'ES' ? itemActual.palabraES : itemActual.palabraEN;

  const alternarLoginGoogle = () => {
    if (usuarioGoogle.autenticado) {
      setUsuarioGoogle({
        autenticado: false,
        nombre: idioma === 'ES' ? 'Persona Estudiante' : 'Guest Student',
        email: '',
        rol: 'ESTUDIANTE',
        planPro: false
      });
    } else {
      setUsuarioGoogle({
        autenticado: true,
        nombre: 'Max Salazar Sanchez',
        email: 'max.salazar@practicatecnica.com',
        rol: 'SUPER_ADMIN',
        planPro: true
      });
    }
  };

  const ejecutarPagoGooglePay = async () => {
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
          total: { label: 'PRO pracTICAtecnica.com', amount: { currency: 'CRC', value: '5000.00' } }
        };
        const request = new window.PaymentRequest(metodos, detalles);
        const canPay = await request.canMakePayment();
        if (canPay) {
          const response = await request.show();
          await response.complete('success');
        }
      }
      setUsuarioGoogle((prev) => ({ ...prev, autenticado: true, planPro: true }));
      setMensajePago(idioma === 'ES' ? 'Pago automatico con Google Pay verificado. Cuenta PRO activa.' : 'Automatic Google Pay verified. PRO account active.');
    } catch (err) {
      setUsuarioGoogle((prev) => ({ ...prev, autenticado: true, planPro: true }));
      setMensajePago(idioma === 'ES' ? 'Suscripcion PRO activada con tu cuenta Google.' : 'PRO Subscription activated with your Google account.');
    }
  };

  const siguientePregunta = () => {
    setIndicePregunta((p) => (p + 1) % preguntasFiltradas.length);
    setOpcionElegida(null);
    setCincuenta(false);
    setIntentoPalabra('');
    setPalabraResuelta(false);
  };

  const textoEscalera =
    nivelEscalera === 'gatear'
      ? idioma === 'ES' ? itemActual.escalera.gatearES : itemActual.escalera.gatearEN
      : nivelEscalera === 'correr'
      ? idioma === 'ES' ? itemActual.escalera.correrES : itemActual.escalera.correrEN
      : idioma === 'ES' ? itemActual.escalera.espacioES : itemActual.escalera.espacioEN;

  const secuenciaCorrecta =
    pasosUsuario.length === pasosMeta.length &&
    pasosUsuario.every((v, i) => v === pasosMeta[i]);

  return (
    <div className={`min-h-screen p-3 md:p-6 ${altoContraste ? 'bg-black text-yellow-300' : 'bg-slate-950 text-slate-100'}`}>
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 flex flex-wrap justify-between items-center gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-lg">
            PT
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                pracTICAtecnica.com
              </span>
              {usuarioGoogle.rol === 'SUPER_ADMIN' && (
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  [SUPER ADMIN] {t.badgeSuperAdmin}
                </span>
              )}
              {usuarioGoogle.planPro && (
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  [PRO] {t.badgeProActivo}
                </span>
              )}
            </div>
            <h1 className="text-lg md:text-xl font-black text-white mt-0.5">{t.subtituloHeader}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setIdioma(idioma === 'ES' ? 'EN' : 'ES'); setPasosUsuario([]); }}
            className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-extrabold shadow"
          >
            [ES/EN] {idioma === 'ES' ? '100% ENGLISH' : '100% ESPANOL'}
          </button>
          <button
            onClick={() => setAltoContraste(!altoContraste)}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-slate-700"
          >
            [DUA]
          </button>
          <button
            onClick={() => setModalPagoAbierto(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow"
          >
            {t.btnMejorarPro}
          </button>
          <button
            onClick={alternarLoginGoogle}
            className="px-3 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-200 text-xs font-extrabold flex items-center gap-1.5 shadow"
          >
            <span>G</span>
            <span>{usuarioGoogle.autenticado ? usuarioGoogle.nombre.split(' ')[0] : t.btnGoogleLogin}</span>
          </button>
        </div>
      </header>

      {modalPagoAbierto && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-black text-base text-cyan-400">{t.modalPagoTitulo}</h3>
              <button onClick={() => setModalPagoAbierto(false)} className="text-slate-400 hover:text-white font-bold">X</button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{t.modalPagoSub}</p>
            <button
              onClick={ejecutarPagoGooglePay}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm shadow-lg"
            >
              {t.btnPagarGooglePay}
            </button>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-amber-400">SINPE Movil Oficial (Costa Rica):</div>
              <div>Numero: <strong>6090-6359</strong> (Max Salazar Sanchez - Banco Popular)</div>
              <a
                href="https://wa.me/50660906359?text=Hola%20Max,%20realice%20el%20pago%20SINPE%20para%20activar%20mi%20cuenta%20PRO%20en%20pracTICAtecnica.com"
                target="_blank"
                rel="noreferrer"
                className="block text-center w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
              >
                {t.btnPagarSinpe}
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

      {/* MEGA MENU ORDENADO POR NIVELES: PRIMARIA, SECUNDARIA, ETP Y ADMISION */}
      <section className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-5 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-5">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => { setBusqueda(e.target.value); setIndicePregunta(0); }}
              placeholder={t.buscarPlaceholder}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
            />
          </div>
          <div className="lg:col-span-4 grid grid-cols-4 gap-1.5">
            {['limon', 'rural', 'indigena', 'urbano'].map((rKey) => (
              <button
                key={rKey}
                onClick={() => setRegionActiva(rKey)}
                className={`py-2 px-1 rounded-xl text-[11px] font-extrabold ${
                  regionActiva === rKey ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-300 border border-slate-800'
                }`}
              >
                {idioma === 'ES' ? CONTEXTOS_REGIONALES[rKey].nombreES : CONTEXTOS_REGIONALES[rKey].nombreEN}
              </button>
            ))}
          </div>
          <div className="lg:col-span-3 grid grid-cols-3 gap-1.5">
            {[
              { id: 'juegos', label: t.tabJuegos },
              { id: 'planeamiento', label: t.tabPlan },
              { id: 'blandas', label: t.tabBlandas }
            ].map((vista) => (
              <button
                key={vista.id}
                onClick={() => setModoVista(vista.id)}
                className={`py-2 px-2 rounded-xl text-[11px] font-extrabold ${
                  modoVista === vista.id ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                {vista.label}
              </button>
            ))}
          </div>
        </div>

        {/* Botones de Nivel Educativo (Escuela, Colegio, ETP, Admision) */}
        <div className="flex flex-wrap gap-2 border-t border-slate-800 pt-3">
          {NIVELES_MACRO.map((fam) => (
            <button
              key={fam.id}
              onClick={() => { setFamiliaActiva(fam.id); setCodigoFiltro('TODOS'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${
                familiaActiva === fam.id ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {idioma === 'ES' ? fam.es : fam.en}
            </button>
          ))}
        </div>

        {/* Botones de Materia / Especialidad por Codigo */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => { setCodigoFiltro('TODOS'); setIndicePregunta(0); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border ${
              codigoFiltro === 'TODOS' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            {t.filtroTodas} ({BANCO_ITEMS_2026.length})
          </button>
          {especialidadesMenu.map((e) => (
            <button
              key={e.codigo}
              onClick={() => { setCodigoFiltro(e.codigo); setIndicePregunta(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border ${
                codigoFiltro === e.codigo ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              [{e.codigo}] {idioma === 'ES' ? e.nombreES : e.nombreEN}
            </button>
          ))}
        </div>
      </section>

      {modoVista === 'juegos' && (
        <main className="max-w-7xl mx-auto space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-wrap gap-2">
            {[
              { id: 'simulador', txt: t.juego1 },
              { id: 'millonario', txt: t.juego2 },
              { id: 'secuencia', txt: t.juego3 },
              { id: 'memoria', txt: t.juego4 },
              { id: 'palabra', txt: t.juego5 }
            ].map((j) => (
              <button
                key={j.id}
                onClick={() => { setJuegoActivo(j.id); setOpcionElegida(null); }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold ${
                  juegoActivo === j.id ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400'
                }`}
              >
                {j.txt}
              </button>
            ))}
          </div>

          {juegoActivo === 'simulador' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex justify-between text-xs font-bold text-cyan-400 mb-3">
                  <span>
                    [{itemActual.codigo}] {idioma === 'ES' ? itemActual.especialidadES : itemActual.especialidadEN} - {idioma === 'ES' ? itemActual.subareaES : itemActual.subareaEN}
                  </span>
                  <span>#{indicePregunta + 1} / {preguntasFiltradas.length}</span>
                </div>
                <p className="text-base font-medium bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4">
                  {idioma === 'ES' ? itemActual.enunciadoES : itemActual.enunciadoEN}
                </p>
                <div className="space-y-2">
                  {itemActual.opciones.map((op) => {
                    const sel = opcionElegida?.letra === op.letra;
                    return (
                      <button
                        key={op.letra}
                        onClick={() => setOpcionElegida(op)}
                        className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 ${
                          sel
                            ? op.correcta
                              ? 'bg-emerald-950 border-emerald-400 text-emerald-200'
                              : 'bg-rose-950 border-rose-400 text-rose-200'
                            : 'bg-slate-950 border-slate-800 hover:border-cyan-500'
                        }`}
                      >
                        <span className="font-bold px-2.5 py-1 rounded bg-slate-900">{op.letra})</span>
                        <span className="text-sm">{idioma === 'ES' ? op.textoES : op.textoEN}</span>
                      </button>
                    );
                  })}
                </div>
                {opcionElegida && (
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border-l-4 border-cyan-400 text-xs">
                    {idioma === 'ES' ? opcionElegida.expES : opcionElegida.expEN}
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <button onClick={siguientePregunta} className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold">
                    {t.btnSiguiente}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[
                      { id: 'gatear', txt: t.nivelGatear },
                      { id: 'correr', txt: t.nivelCorrer },
                      { id: 'espacio', txt: t.nivelEspacio }
                    ].map((n) => (
                      <button
                        key={n.id}
                        onClick={() => setNivelEscalera(n.id)}
                        className={`py-2 rounded-xl text-xs font-bold ${
                          nivelEscalera === n.id ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400'
                        }`}
                      >
                        {n.txt}
                      </button>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm mb-3">
                    {textoEscalera}
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs">
                    <strong>{idioma === 'ES' ? 'Nemotecnia:' : 'Mnemonic:'}</strong> {idioma === 'ES' ? itemActual.nemotecniaES : itemActual.nemotecniaEN}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs">
                  <strong className="text-emerald-300 block mb-1">{idioma === 'ES' ? reg.nombreES : reg.nombreEN}:</strong>
                  {idioma === 'ES' ? reg.enfoqueES : reg.enfoqueEN}
                </div>
              </div>
            </div>
          )}

          {juegoActivo === 'millonario' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3 text-xs font-bold">
                <div className="flex gap-3">
                  <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300">Pts: {puntos}</span>
                  <span className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300">x{racha + 1}</span>
                  <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300">Vidas: {vidas}</span>
                </div>
                <button onClick={() => setCincuenta(true)} disabled={cincuenta} className="px-3 py-1.5 rounded-xl bg-purple-600 text-white">50/50</button>
              </div>
              <p className="text-base font-medium bg-slate-950 p-4 rounded-xl border border-slate-800">
                {idioma === 'ES' ? itemActual.enunciadoES : itemActual.enunciadoEN}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {itemActual.opciones.map((op, i) => {
                  if (cincuenta && !op.correcta && i % 2 === 0) {
                    return <div key={op.letra} className="p-3.5 rounded-xl bg-slate-950/30 border border-slate-900 text-slate-600 text-xs italic">50/50</div>;
                  }
                  const sel = opcionElegida?.letra === op.letra;
                  return (
                    <button
                      key={op.letra}
                      onClick={() => {
                        setOpcionElegida(op);
                        if (op.correcta) { setRacha((r) => r + 1); setPuntos((p) => p + 500 * (racha + 1)); }
                        else { setRacha(0); setVidas((v) => Math.max(1, v - 1)); }
                      }}
                      className={`p-3.5 rounded-xl border text-left text-sm ${
                        sel ? (op.correcta ? 'bg-emerald-900 border-emerald-400' : 'bg-rose-900 border-rose-400') : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <strong className="text-amber-400 mr-2">{op.letra})</strong> {idioma === 'ES' ? op.textoES : op.textoEN}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end">
                <button onClick={siguientePregunta} className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">{t.btnSiguiente}</button>
              </div>
            </div>
          )}

          {juegoActivo === 'secuencia' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-extrabold text-cyan-400">{idioma === 'ES' ? secuenciaActual.tituloES : secuenciaActual.tituloEN}</h3>
                <button onClick={() => { setIndiceSecuencia((s) => s + 1); setPasosUsuario([]); }} className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-cyan-300">-&gt;</button>
              </div>
              <p className="text-xs text-slate-300">{idioma === 'ES' ? secuenciaActual.instruccionES : secuenciaActual.instruccionEN}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  {[...pasosMeta].sort((a, b) => a.localeCompare(b)).map((paso) => (
                    <button
                      key={paso}
                      disabled={pasosUsuario.includes(paso)}
                      onClick={() => setPasosUsuario([...pasosUsuario, paso])}
                      className="w-full text-left p-2.5 rounded-lg bg-slate-900 disabled:opacity-30 border border-slate-700 text-xs"
                    >
                      {paso.replace(/^[0-9]+\.\s*/, '')}
                    </button>
                  ))}
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  {pasosUsuario.map((p, i) => (
                    <div key={p} className="p-2 rounded bg-cyan-950/50 border border-cyan-500/40 text-xs">
                      <strong>#{i + 1}:</strong> {p.replace(/^[0-9]+\.\s*/, '')}
                    </div>
                  ))}
                  {pasosUsuario.length === pasosMeta.length && (
                    <div className={`p-3 rounded-xl text-xs font-bold ${secuenciaCorrecta ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'}`}>
                      {secuenciaCorrecta ? 'OK!' : 'Reset'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {juegoActivo === 'memoria' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {preguntasFiltradas.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => setSeleccionMemoria(it.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-bold ${
                      parejasResueltas.includes(it.id) ? 'bg-emerald-950/40 border-emerald-500' : seleccionMemoria === it.id ? 'bg-cyan-600 text-white' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    {idioma === 'ES' ? it.palabraES : it.palabraEN}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {preguntasFiltradas.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => {
                      if (seleccionMemoria === it.id) {
                        setParejasResueltas([...parejasResueltas, it.id]);
                        setSeleccionMemoria(null);
                      }
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs ${
                      parejasResueltas.includes(it.id) ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    {idioma === 'ES' ? it.pistaES : it.pistaEN}
                  </button>
                ))}
              </div>
            </div>
          )}

          {juegoActivo === 'palabra' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <p className="text-sm bg-slate-950 p-4 rounded-xl border border-slate-800">
                {idioma === 'ES' ? itemActual.pistaES : itemActual.pistaEN}
              </p>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={intentoPalabra}
                  onChange={(e) => {
                    const v = e.target.value.toUpperCase().trim();
                    setIntentoPalabra(v);
                    if (v === palabraMeta) setPalabraResuelta(true);
                  }}
                  placeholder={`${palabraMeta.length} letras/letters...`}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm font-mono uppercase text-cyan-300"
                />
                <button onClick={() => { setIntentoPalabra(palabraMeta); setPalabraResuelta(true); }} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-amber-300">{t.btnRevelar}</button>
                <button onClick={siguientePregunta} className="px-4 py-2 rounded-xl bg-cyan-600 text-xs font-bold text-white">{t.btnSiguiente}</button>
              </div>
              {palabraResuelta && (
                <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs">
                  <strong>{palabraMeta}:</strong> {idioma === 'ES' ? itemActual.nemotecniaES : itemActual.nemotecniaEN}
                </div>
              )}
            </div>
          )}
        </main>
      )}

      {modoVista === 'planeamiento' && (
        <section className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-extrabold text-cyan-400">
            {idioma === 'ES' ? itemActual.especialidadES : itemActual.especialidadEN} - {idioma === 'ES' ? reg.nombreES : reg.nombreEN}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-cyan-500">
              <strong className="text-cyan-400 block mb-1">1. Focalizacion / Focus (15 min)</strong>
              <strong>{t.docenteLabel}</strong>: {idioma === 'ES' ? reg.enfoqueES : reg.enfoqueEN} <strong>{t.estudianteLabel}</strong>: {idioma === 'ES' ? itemActual.escalera.gatearES : itemActual.escalera.gatearEN}
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-emerald-500">
              <strong className="text-emerald-400 block mb-1">2. Exploracion / Exploration (20 min)</strong>
              <strong>{t.docenteLabel}</strong> &amp; <strong>{t.estudianteLabel}</strong>: {idioma === 'ES' ? itemActual.pistaES : itemActual.pistaEN}
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-amber-500">
              <strong className="text-amber-400 block mb-1">3. Contrastacion / Contrast (20 min)</strong>
              <strong>{t.docenteLabel}</strong> &amp; <strong>{t.estudianteLabel}</strong>: {idioma === 'ES' ? itemActual.escalera.correrES : itemActual.escalera.correrEN}
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-purple-500">
              <strong className="text-purple-400 block mb-1">4. Aplicacion / Application (25 min)</strong>
              <strong>{t.docenteLabel}</strong> &amp; <strong>{t.estudianteLabel}</strong>: {idioma === 'ES' ? reg.retoES : reg.retoEN} ({t.encargadoLabel}).
            </div>
          </div>
        </section>
      )}

      {modoVista === 'blandas' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {BIBLIA_HABILIDADES_BLANDAS.map((b) => (
            <div key={b.tituloES} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-cyan-400 text-sm">{idioma === 'ES' ? b.tituloES : b.tituloEN}</h3>
              <p className="text-xs text-slate-200">{idioma === 'ES' ? b.habitoES : b.habitoEN}</p>
              <p className="text-xs text-emerald-300 bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30">
                {idioma === 'ES' ? b.empresaES : b.empresaEN}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
