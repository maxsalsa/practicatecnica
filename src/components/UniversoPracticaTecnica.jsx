import React, { useState, useMemo } from 'react';
import {
  ESPECIALIDADES_CATALOGO,
  CONTEXTOS_REGIONALES,
  BIBLIA_HABILIDADES_BLANDAS,
  BANCO_ITEMS_2026,
  JUEGO_SECUENCIAS
} from '../data/bancoOficialMEP2026';

export default function UniversoPracticaTecnica() {
  const [busqueda, setBusqueda] = useState('');
  const [codigoFiltro, setCodigoFiltro] = useState('TODOS');
  const [regionActiva, setRegionActiva] = useState('limon');
  const [modoVista, setModoVista] = useState('juegos');
  const [juegoActivo, setJuegoActivo] = useState('simulador');
  const [idioma, setIdioma] = useState('ES');
  const [altoContraste, setAltoContraste] = useState(false);

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

  const preguntasFiltradas = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    const res = BANCO_ITEMS_2026.filter((it) => {
      const okCod = codigoFiltro === 'TODOS' || it.codigo === codigoFiltro;
      const okTxt = !q || it.codigo.toLowerCase().includes(q) || it.especialidad.toLowerCase().includes(q) || it.enunciadoES.toLowerCase().includes(q) || it.palabraClave.toLowerCase().includes(q);
      return okCod && okTxt;
    });
    return res.length > 0 ? res : BANCO_ITEMS_2026;
  }, [busqueda, codigoFiltro]);

  const itemActual = preguntasFiltradas[indicePregunta % preguntasFiltradas.length];
  const contextoRegional = CONTEXTOS_REGIONALES[regionActiva];
  const secuenciaActual = JUEGO_SECUENCIAS[indiceSecuencia % JUEGO_SECUENCIAS.length];

  const siguientePregunta = () => {
    setIndicePregunta((p) => (p + 1) % preguntasFiltradas.length);
    setOpcionElegida(null);
    setCincuenta(false);
    setIntentoPalabra('');
    setPalabraResuelta(false);
  };

  const responderMillonario = (op) => {
    setOpcionElegida(op);
    if (op.correcta) {
      setRacha((r) => r + 1);
      setPuntos((p) => p + 500 * (racha + 1));
    } else {
      setRacha(0);
      setVidas((v) => Math.max(0, v - 1));
    }
  };

  const secuenciaCorrecta =
    pasosUsuario.length === secuenciaActual.pasosCorrectos.length &&
    pasosUsuario.every((v, i) => v === secuenciaActual.pasosCorrectos[i]);

  return (
    <div className={`min-h-screen p-4 md:p-6 ${altoContraste ? 'bg-black text-yellow-300' : 'bg-slate-950 text-slate-100'}`}>
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-5 flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            pracTICAtecnica.com • MEP OFICIAL 2026 • CTP MERCEDES NORTE
          </span>
          <h1 className="text-xl md:text-2xl font-black text-white mt-1">
            Universo Contenedor de Especialidades, Prácticas y Juegos DUA
          </h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIdioma(idioma === 'ES' ? 'EN' : 'ES')} className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-cyan-300 border border-slate-700">
            🌐 {idioma === 'ES' ? 'English Mode' : 'Modo Español'}
          </button>
          <button onClick={() => setAltoContraste(!altoContraste)} className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-amber-300 border border-slate-700">
            ♿ DUA: {altoContraste ? 'Normal' : 'Alto Contraste'}
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5">
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <label className="block text-xs font-bold text-cyan-400 mb-1">🔍 Buscar por Código, Especialidad o Tema:</label>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setIndicePregunta(0); }}
            placeholder="Escribe: 1001, 2003, viga, queso, mermelada, escalera..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
          />
        </div>

        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <label className="block text-xs font-bold text-amber-400 mb-1">🗺️ Adaptar Clase y Práctica a mi Región:</label>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'limon', txt: '🌊 Limón' },
              { id: 'rural', txt: '🚜 Rural' },
              { id: 'indigena', txt: '🌿 Indígena' },
              { id: 'urbano', txt: '🏙️ GAM' }
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setRegionActiva(r.id)}
                className={`py-2 rounded-lg text-xs font-bold ${regionActiva === r.id ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-300'}`}
              >
                {r.txt}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center">
          <div className="grid grid-cols-3 gap-1.5 w-full">
            {[
              { id: 'juegos', txt: '🎮 5 Juegos' },
              { id: 'planeamiento', txt: '📋 Plan MEP' },
              { id: 'blandas', txt: '🤝 Empresa' }
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setModoVista(v.id)}
                className={`py-2.5 rounded-xl text-xs font-extrabold ${modoVista === v.id ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400'}`}
              >
                {v.txt}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-3 mb-5">
        <button
          onClick={() => { setCodigoFiltro('TODOS'); setIndicePregunta(0); }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border ${codigoFiltro === 'TODOS' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
        >
          🌟 Todas ({BANCO_ITEMS_2026.length})
        </button>
        {ESPECIALIDADES_CATALOGO.map((e) => (
          <button
            key={e.codigo}
            onClick={() => { setCodigoFiltro(e.codigo); setIndicePregunta(0); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border ${codigoFiltro === e.codigo ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
          >
            {e.icono} [{e.codigo}] {e.nombre}
          </button>
        ))}
      </div>

      {modoVista === 'juegos' && (
        <main className="max-w-7xl mx-auto space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-wrap gap-2">
            {[
              { id: 'simulador', txt: '1️⃣ Simulador Escalera DUA' },
              { id: 'millonario', txt: '2️⃣ Reto Millonario (50/50)' },
              { id: 'secuencia', txt: '3️⃣ Ordena el Proceso Industrial' },
              { id: 'memoria', txt: '4️⃣ Memoria de Parejas' },
              { id: 'palabra', txt: '5️⃣ Crucigrama y Práctica Escrita' }
            ].map((j) => (
              <button
                key={j.id}
                onClick={() => { setJuegoActivo(j.id); setOpcionElegida(null); }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold ${juegoActivo === j.id ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400'}`}
              >
                {j.txt}
              </button>
            ))}
          </div>

          {juegoActivo === 'simulador' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex justify-between text-xs font-bold text-cyan-400 mb-3">
                  <span>[{itemActual.codigo}] {itemActual.especialidad} • {itemActual.subarea}</span>
                  <span>Ítem {indicePregunta + 1} / {preguntasFiltradas.length}</span>
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
                          sel ? (op.correcta ? 'bg-emerald-950 border-emerald-400 text-emerald-200' : 'bg-rose-950 border-rose-400 text-rose-200') : 'bg-slate-950 border-slate-800 hover:border-cyan-500'
                        }`}
                      >
                        <span className="font-bold px-2.5 py-1 rounded bg-slate-900">{op.letra})</span>
                        <span className="text-sm">{op.texto}</span>
                      </button>
                    );
                  })}
                </div>
                {opcionElegida && (
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border-l-4 border-cyan-400 text-xs text-slate-200">
                    <strong>{opcionElegida.correcta ? '✅ ¡Correcto!' : '🔍 Explicación paso a paso:'}</strong> {opcionElegida.explicacion}
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <button onClick={siguientePregunta} className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold">
                    Siguiente Ítem ➔
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xs font-extrabold uppercase text-cyan-400 mb-2">🧠 Escalera Cognitiva: De Gatear al Espacio</h3>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[
                      { id: 'gatear', txt: '👶 1. Gatear' },
                      { id: 'correr', txt: '🏃 2. Correr' },
                      { id: 'espacio', txt: '🚀 3. Espacio' }
                    ].map((n) => (
                      <button
                        key={n.id}
                        onClick={() => setNivelEscalera(n.id)}
                        className={`py-2 rounded-xl text-xs font-bold ${nivelEscalera === n.id ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400'}`}
                      >
                        {n.txt}
                      </button>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm mb-3">
                    {itemActual.escalera[nivelEscalera]}
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs">
                    <strong>⚡ Nemotecnia:</strong> {itemActual.nemotecnia}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs">
                  <strong className="text-emerald-300 block mb-1">📍 Adaptación en {contextoRegional.nombre}:</strong>
                  {contextoRegional.enfoquePedagogico}
                </div>
              </div>
            </div>
          )}

          {juegoActivo === 'millonario' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-3">
                <div className="flex gap-3 text-xs font-bold">
                  <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300">🏆 Puntos: {puntos}</span>
                  <span className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300">🔥 Racha: x{racha + 1}</span>
                  <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300">❤️ Vidas: {vidas}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setCincuenta(true)} disabled={cincuenta} className="px-3 py-1.5 rounded-xl bg-purple-600 disabled:opacity-40 text-white text-xs font-bold">
                    ✂️ Comodín 50/50
                  </button>
                  <button onClick={() => { setPuntos(0); setRacha(0); setVidas(3); setOpcionElegida(null); setCincuenta(false); }} className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold">
                    🔄 Reiniciar
                  </button>
                </div>
              </div>
              {vidas === 0 ? (
                <div className="text-center py-6 space-y-3">
                  <div className="text-xl font-black text-rose-400">¡Partida terminada! Puntaje final: {puntos} pts</div>
                  <button onClick={() => { setPuntos(0); setRacha(0); setVidas(3); setOpcionElegida(null); }} className="px-5 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold">
                    Jugar de nuevo
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-base font-medium bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4">{itemActual.enunciadoES}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {itemActual.opciones.map((op, i) => {
                      if (cincuenta && !op.correcta && i % 2 === 0) {
                        return <div key={op.letra} className="p-3.5 rounded-xl bg-slate-950/30 border border-slate-900 text-slate-600 text-xs italic">Descartada por 50/50</div>;
                      }
                      const sel = opcionElegida?.letra === op.letra;
                      return (
                        <button
                          key={op.letra}
                          disabled={Boolean(opcionElegida)}
                          onClick={() => responderMillonario(op)}
                          className={`p-3.5 rounded-xl border text-left text-sm ${
                            sel ? (op.correcta ? 'bg-emerald-900 border-emerald-400' : 'bg-rose-900 border-rose-400') : 'bg-slate-950 border-slate-800 hover:border-amber-400'
                          }`}
                        >
                          <strong className="text-amber-400 mr-2">{op.letra})</strong> {op.texto}
                        </button>
                      );
                    })}
                  </div>
                  {opcionElegida && (
                    <div className="mt-4 flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
                      <span>{opcionElegida.explicacion}</span>
                      <button onClick={siguientePregunta} className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold">Siguiente ➔</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {juegoActivo === 'secuencia' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-extrabold text-cyan-400">⚙️ {secuenciaActual.especialidad}</h3>
                <button onClick={() => { setIndiceSecuencia((s) => s + 1); setPasosUsuario([]); }} className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-cyan-300">
                  Cambiar Proceso ➔
                </button>
              </div>
              <p className="text-xs text-slate-300">{secuenciaActual.instruccion}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  {[...secuenciaActual.pasosCorrectos].sort((a, b) => a.localeCompare(b)).map((paso) => (
                    <button
                      key={paso}
                      disabled={pasosUsuario.includes(paso)}
                      onClick={() => setPasosUsuario([...pasosUsuario, paso])}
                      className="w-full text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-slate-700 text-xs"
                    >
                      {paso.replace(/^[0-9]+\.\s*/, '')}
                    </button>
                  ))}
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-amber-400">
                    <span>Orden seleccionado:</span>
                    <button onClick={() => setPasosUsuario([])} className="text-rose-400 underline">Reiniciar</button>
                  </div>
                  {pasosUsuario.map((p, i) => (
                    <div key={p} className="p-2 rounded bg-cyan-950/50 border border-cyan-500/40 text-xs">
                      <strong>Paso {i + 1}:</strong> {p.replace(/^[0-9]+\.\s*/, '')}
                    </div>
                  ))}
                  {pasosUsuario.length === secuenciaActual.pasosCorrectos.length && (
                    <div className={`p-3 rounded-xl text-xs font-bold ${secuenciaCorrecta ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'}`}>
                      {secuenciaCorrecta ? '✅ ¡Secuencia industrial correcta!' : '❌ Orden incorrecto. Haz clic en Reiniciar.'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {juegoActivo === 'memoria' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-extrabold text-cyan-400">🧩 Selecciona un Concepto a la izquierda y su Definición a la derecha</h3>
                <button onClick={() => setParejasResueltas([])} className="px-3 py-1 rounded bg-slate-800 text-xs">Reiniciar</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {preguntasFiltradas.slice(0, 5).map((it) => (
                    <button
                      key={it.id}
                      disabled={parejasResueltas.includes(it.id)}
                      onClick={() => setSeleccionMemoria(it.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-bold ${
                        parejasResueltas.includes(it.id) ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : seleccionMemoria === it.id ? 'bg-cyan-600 text-white' : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      🔑 {it.palabraClave} ({it.especialidad})
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {preguntasFiltradas.slice(0, 5).map((it) => (
                    <button
                      key={it.id}
                      disabled={parejasResueltas.includes(it.id)}
                      onClick={() => {
                        if (seleccionMemoria === it.id) {
                          setParejasResueltas([...parejasResueltas, it.id]);
                          setSeleccionMemoria(null);
                        }
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs ${
                        parejasResueltas.includes(it.id) ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 hover:border-amber-400'
                      }`}
                    >
                      {it.pistaCrucigrama}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {juegoActivo === 'palabra' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="text-xs font-bold text-cyan-400 uppercase">🔤 Crucigrama y Práctica Escrita • {itemActual.especialidad}</div>
              <p className="text-sm bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong>Definición Oficial:</strong> {itemActual.pistaCrucigrama}
              </p>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={intentoPalabra}
                  onChange={(e) => {
                    const v = e.target.value.toUpperCase().trim();
                    setIntentoPalabra(v);
                    if (v === itemActual.palabraClave) setPalabraResuelta(true);
                  }}
                  placeholder={`Escribe el concepto (${itemActual.palabraClave.length} letras)`}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm font-mono uppercase text-cyan-300"
                />
                <button onClick={() => { setIntentoPalabra(itemActual.palabraClave); setPalabraResuelta(true); }} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-amber-300">
                  💡 Mostrar Respuesta
                </button>
                <button onClick={siguientePregunta} className="px-4 py-2 rounded-xl bg-cyan-600 text-xs font-bold text-white">
                  Siguiente ➔
                </button>
              </div>
              {palabraResuelta && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 text-xs">
                  🎉 <strong>¡Respuesta exacta ({itemActual.palabraClave})!</strong> {itemActual.nemotecnia}
                </div>
              )}
            </div>
          )}
        </main>
      )}

      {modoVista === 'planeamiento' && (
        <section className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-extrabold text-cyan-400">
            📋 Plan Cotidiano Oficial MEP • {itemActual.especialidad} ({contextoRegional.nombre})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-cyan-500">
              <strong className="text-cyan-400 block mb-1">1. Focalización (15 min)</strong>
              <strong>La persona docente</strong> aplica el saludo empresarial y presenta el caso regional en <em>{contextoRegional.nombre}</em>: {contextoRegional.enfoquePedagogico} <strong>La persona estudiante</strong> plantea hipótesis iniciales respetando el turno de palabra.
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-emerald-500">
              <strong className="text-emerald-400 block mb-1">2. Exploración DUA (20 min)</strong>
              <strong>La persona docente</strong> facilita recursos visuales, auditivos y bilingües sobre <em>{itemActual.palabraClave}</em>. <strong>La persona estudiante</strong> explora el nivel base: "{itemActual.escalera.gatear}".
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-amber-500">
              <strong className="text-amber-400 block mb-1">3. Contrastación (20 min)</strong>
              <strong>La persona docente</strong> modela el estándar técnico: "{itemActual.escalera.correr}". <strong>La persona estudiante</strong> resuelve el ítem oficial y descarta técnicamente los distractores.
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-purple-500">
              <strong className="text-purple-400 block mb-1">4. Aplicación y Cierre 5S (25 min)</strong>
              <strong>La persona docente</strong> asigna el reto práctico: "{contextoRegional.retoPractica}". <strong>La persona estudiante</strong> entrega el producto evaluado con rúbrica 3-2-1, aplica orden 5S y comparte el logro con <strong>la persona encargada legal</strong>.
            </div>
          </div>
        </section>
      )}

      {modoVista === 'blandas' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {BIBLIA_HABILIDADES_BLANDAS.map((b) => (
            <div key={b.titulo} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-cyan-400 text-sm">{b.titulo}</h3>
              <p className="text-xs text-slate-200"><strong>En el aula/taller:</strong> {b.habito}</p>
              <p className="text-xs text-emerald-300 bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30">
                <strong>🏢 Impacto en la Empresa:</strong> {b.empresa}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
