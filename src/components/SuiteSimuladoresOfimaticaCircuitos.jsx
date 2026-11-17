import React, { useState } from 'react';

export default function SuiteSimuladoresOfimaticaCircuitos() {
  const [tabLab, setTabLab] = useState('excel'); // 'excel' | 'word' | 'circuitos'

  // Estado Simulador de Hoja Electrónica y Contabilidad Pura (Excel / NIIF / Impuestos)
  const [filasExcel, setFilasExcel] = useState([
    { codigo: '101', cuenta: 'Ventas de Servicios Técnicos (Gravadas)', monto: 850000, tasaIva: 13 },
    { codigo: '102', cuenta: 'Licencias de Software Educativo (Canasta/Educación)', monto: 320000, tasaIva: 2 },
    { codigo: '201', cuenta: 'Compra de Equipo de Laboratorio y Redes', monto: 450000, tasaIva: 13 },
    { codigo: '301', cuenta: 'Servicios Profesionales de Contabilidad y Auditoría', monto: 210000, tasaIva: 13 }
  ]);
  const [formulaSeleccionada, setFormulaSeleccionada] = useState('=SUMA(C2:C5)');

  // Estado Simulador de Procesador de Textos (Word / Informes y Cartas MEP)
  const [tituloDoc, setTituloDoc] = useState('INFORME TÉCNICO Y DE GESTIÓN EMPRESARIAL — NORMAS APA 7');
  const [fuenteDoc, setFuenteDoc] = useState('font-sans');
  const [alineacionDoc, setAlineacionDoc] = useState('text-left');
  const [contenidoDoc, setContenidoDoc] = useState(
    '1. RESUMEN EJECUTIVO\nEl presente documento certifica la aplicación práctica de competencias en Procesador de Textos, redacción comercial, normas ortográficas y estructura documental bajo estándares oficiales del MEP.\n\n2. DESARROLLO TÉCNICO\nLas personas estudiantes elaboran informes ejecutivos, cartas comerciales, memorandos, actas y proyectos de investigación libres de plagio.'
  );

  // Estado Simulador de Circuitos Digitales, Electrónica e Informática (Compuertas + Ley de Ohm + Cisco CLI)
  const [entradaA, setEntradaA] = useState(1);
  const [entradaB, setEntradaB] = useState(1);
  const [compuerta, setCompuerta] = useState('AND');
  const [voltaje, setVoltaje] = useState(12);
  const [resistencia, setResistencia] = useState(240);
  const [comandoCli, setComandoCli] = useState('');
  const [historialCli, setHistorialCli] = useState([
    'Switch-CTP-MercedesNorte> enable',
    'Switch-CTP-MercedesNorte# show ip interface brief',
    'Interface              IP-Address      OK? Method StatusProtocol',
    'Vlan1                  192.168.10.1    YES manual up                    up',
    'GigabitEthernet0/1     unassigned      YES unset  up                    up'
  ]);

  const calcularSalidaLogica = () => {
    if (compuerta === 'AND') return entradaA && entradaB ? 1 : 0;
    if (compuerta === 'OR') return entradaA || entradaB ? 1 : 0;
    if (compuerta === 'XOR') return entradaA !== entradaB ? 1 : 0;
    if (compuerta === 'NAND') return !(entradaA && entradaB) ? 1 : 0;
    if (compuerta === 'NOR') return !(entradaA || entradaB) ? 1 : 0;
    return entradaA ? 0 : 1; // NOT A
  };

  const salidaLed = calcularSalidaLogica();
  const corrienteMa = ((voltaje / resistencia) * 1000).toFixed(1);
  const potenciaMw = ((voltaje * voltaje / resistencia) * 1000).toFixed(1);

  const subtotalExcel = filasExcel.reduce((acc, f) => acc + Number(f.monto || 0), 0);
  const totalIvaExcel = filasExcel.reduce((acc, f) => acc + (Number(f.monto || 0) * Number(f.tasaIva || 0)) / 100, 0);
  const granTotalExcel = subtotalExcel + totalIvaExcel;

  const ejecutarCli = (e) => {
    e.preventDefault();
    if (!comandoCli.trim()) return;
    const cmd = comandoCli.trim();
    let resp = 'Comando ejecutado correctamente en el núcleo IOS.';
    if (cmd.toLowerCase().includes('ping')) {
      resp = 'Enviando 5 paquetes ICMP de 100 bytes... !!!!! Éxito = 100% (5/5), RTT min/avg/max = 1/2/4 ms.';
    } else if (cmd.toLowerCase().includes('vlan')) {
      resp = 'VLAN 10 (DESARROLLO_WEB) activa | VLAN 20 (CONTABILIDAD) activa | VLAN 30 (CIBERSEGURIDAD) activa.';
    } else if (cmd.toLowerCase().includes('version')) {
      resp = 'Cisco IOS Software, C2960X Software — Laboratorio de Redes CTP Mercedes Norte.';
    }
    setHistorialCli([...historialCli, `Switch-CTP# ${cmd}`, resp]);
    setComandoCli('');
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-5 sm:p-6 rounded-2xl shadow-2xl space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
            🧪 Laboratorios Prácticos Interactivos — Aprender Haciendo
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
            Simuladores de Hoja Electrónica (Contabilidad Pura), Procesador de Textos y Circuitos Electrónicos/Informáticos
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'excel', label: '📊 Hoja Electrónica & Contabilidad Pura' },
            { id: 'word', label: '📝 Procesador de Textos (APA 7 / Cartas)' },
            { id: 'circuitos', label: '⚡ Circuitos Electrónicos, Lógica Digital & Cisco CLI' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTabLab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                tabLab === t.id
                  ? 'bg-cyan-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500/50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* SIMULADOR 1: HOJA ELECTRÓNICA Y CONTABILIDAD PURA (EXCEL + IMPUESTOS LEY 9635) */}
      {tabLab === 'excel' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex flex-wrap items-center gap-3 text-xs">
            <span className="bg-emerald-700 text-white font-extrabold px-2.5 py-1 rounded">fx Fórmula Activa:</span>
            <input
              type="text"
              value={formulaSeleccionada}
              onChange={(e) => setFormulaSeleccionada(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-emerald-300"
            />
            <div className="flex flex-wrap gap-1.5">
              {[
                '=SUMA(C2:C5)',
                '=PROMEDIO(C2:C5)',
                '=SI(C2>=500000;"Mayorista";"Detalle")',
                '=BUSCARV(101;A2:E5;3;FALSO)'
              ].map((f) => (
                <button
                  key={f}
                  onClick={() => setFormulaSeleccionada(f)}
                  className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[11px] px-2.5 py-1 rounded"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto bg-slate-950 border border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-emerald-950/60 text-emerald-300 border-b border-slate-800 font-mono">
                  <th className="p-2.5 border-r border-slate-800">Celda</th>
                  <th className="p-2.5 border-r border-slate-800">A (Código NIIF)</th>
                  <th className="p-2.5 border-r border-slate-800">B (Cuenta Contable / Detalle)</th>
                  <th className="p-2.5 border-r border-slate-800">C (Monto Base ₡)</th>
                  <th className="p-2.5 border-r border-slate-800">D (% IVA Ley 9635)</th>
                  <th className="p-2.5">E (Total con Impuesto ₡)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {filasExcel.map((fila, idx) => {
                  const iva = (Number(fila.monto) * Number(fila.tasaIva)) / 100;
                  const totalFila = Number(fila.monto) + iva;
                  return (
                    <tr key={idx} className="hover:bg-slate-900/60">
                      <td className="p-2.5 border-r border-slate-800 text-slate-500 font-bold">{idx + 2}</td>
                      <td className="p-2.5 border-r border-slate-800 text-cyan-300">{fila.codigo}</td>
                      <td className="p-2.5 border-r border-slate-800 font-sans text-slate-200">{fila.cuenta}</td>
                      <td className="p-2.5 border-r border-slate-800">
                        <input
                          type="number"
                          value={fila.monto}
                          onChange={(e) => {
                            const copia = [...filasExcel];
                            copia[idx].monto = Number(e.target.value);
                            setFilasExcel(copia);
                          }}
                          className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white w-28"
                        />
                      </td>
                      <td className="p-2.5 border-r border-slate-800">
                        <select
                          value={fila.tasaIva}
                          onChange={(e) => {
                            const copia = [...filasExcel];
                            copia[idx].tasaIva = Number(e.target.value);
                            setFilasExcel(copia);
                          }}
                          className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-amber-300"
                        >
                          <option value={13}>13% (Tarifa General)</option>
                          <option value={4}>4% (Salud / Boletos)</option>
                          <option value={2}>2% (Educación / Medicamentos)</option>
                          <option value={1}>1% (Canasta Básica)</option>
                          <option value={0}>0% (Exento)</option>
                        </select>
                      </td>
                      <td className="p-2.5 text-emerald-400 font-bold">
                        ₡{totalFila.toLocaleString('es-CR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Subtotal Base (=SUMA):</span>
              <span className="text-xl font-mono font-extrabold text-white">₡{subtotalExcel.toLocaleString('es-CR')}</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Total IVA Recaudado/Soportado:</span>
              <span className="text-xl font-mono font-extrabold text-amber-400">₡{totalIvaExcel.toLocaleString('es-CR')}</span>
            </div>
            <div className="bg-slate-950 border border-emerald-500/40 p-4 rounded-xl">
              <span className="text-[11px] text-emerald-300 block">Total Balance General / Facturación:</span>
              <span className="text-xl font-mono font-extrabold text-emerald-400">₡{granTotalExcel.toLocaleString('es-CR')}</span>
            </div>
          </div>
        </div>
      )}

      {/* SIMULADOR 2: PROCESADOR DE TEXTOS (WORD / APA 7 / EJECUTIVO COMERCIAL) */}
      {tabLab === 'word' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFuenteDoc('font-sans')}
                className={`px-3 py-1.5 rounded-lg font-bold ${fuenteDoc === 'font-sans' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'}`}
              >
                Arial / Inter (APA 7)
              </button>
              <button
                onClick={() => setFuenteDoc('font-serif')}
                className={`px-3 py-1.5 rounded-lg font-serif font-bold ${fuenteDoc === 'font-serif' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'}`}
              >
                Times New Roman
              </button>
              <button
                onClick={() => setFuenteDoc('font-mono')}
                className={`px-3 py-1.5 rounded-lg font-mono font-bold ${fuenteDoc === 'font-mono' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'}`}
              >
                 Monoespaciado Técnico
              </button>
              <button
                onClick={() => setAlineacionDoc(alineacionDoc === 'text-left' ? 'text-justify' : 'text-left')}
                className="bg-slate-800 hover:bg-slate-700 text-cyan-300 px-3 py-1.5 rounded-lg font-bold"
              >
                📐 Alternar Alineación
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-mono">
                Palabras: <strong className="text-white">{contenidoDoc.trim().split(/\s+/).filter(Boolean).length}</strong>
              </span>
              <button
                onClick={() => window.print()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-lg"
              >
                🖨️ Exportar Documento PDF
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
            <input
              type="text"
              value={tituloDoc}
              onChange={(e) => setTituloDoc(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-extrabold text-cyan-300"
            />
            <textarea
              rows="8"
              value={contenidoDoc}
              onChange={(e) => setContenidoDoc(e.target.value)}
              className={`w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-100 leading-relaxed ${fuenteDoc} ${alineacionDoc}`}
            />
          </div>
        </div>
      )}

      {/* SIMULADOR 3: CIRCUITOS DIGITALES, ELECTRÓNICA E INFORMÁTICA (COMPUERTAS + LEY DE OHM + CISCO CLI) */}
      {tabLab === 'circuitos' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Laboratorio de Compuertas Lógicas y Ley de Ohm */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-5">
            <h3 className="text-sm font-extrabold text-cyan-400">
              🔌 Simulador de Compuertas Lógicas Digitales (Electrónica e Informática)
            </h3>

            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="space-y-2">
                <button
                  onClick={() => setEntradaA(entradaA ? 0 : 1)}
                  className={`w-36 py-2 rounded-xl text-xs font-extrabold border ${
                    entradaA ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-950 text-slate-400 border-slate-700'
                  }`}
                >
                  Interruptor A = {entradaA}
                </button>
                <button
                  onClick={() => setEntradaB(entradaB ? 0 : 1)}
                  className={`w-36 py-2 rounded-xl text-xs font-extrabold border block ${
                    entradaB ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-950 text-slate-400 border-slate-700'
                  }`}
                >
                  Interruptor B = {entradaB}
                </button>
              </div>

              <div className="text-center space-y-1">
                <span className="text-[10px] text-slate-400 block font-bold">Compuerta Activa</span>
                <select
                  value={compuerta}
                  onChange={(e) => setCompuerta(e.target.value)}
                  className="bg-slate-950 border border-cyan-500 text-cyan-300 font-mono font-extrabold px-3 py-2 rounded-xl text-xs"
                >
                  <option value="AND">AND (A · B)</option>
                  <option value="OR">OR (A + B)</option>
                  <option value="XOR">XOR (A ⊕ B)</option>
                  <option value="NAND">NAND ~(A · B)</option>
                  <option value="NOR">NOR ~(A + B)</option>
                  <option value="NOT">NOT (~A)</option>
                </select>
              </div>

              <div className="text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xs font-extrabold border-4 transition-all ${
                    salidaLed
                      ? 'bg-emerald-400 text-slate-950 border-emerald-200 shadow-lg shadow-emerald-400/50'
                      : 'bg-slate-950 text-slate-500 border-slate-800'
                  }`}
                >
                  LED={salidaLed}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {salidaLed ? 'ENCENDIDO (5V)' : 'APAGADO (0V)'}
                </span>
              </div>
            </div>

            {/* Medidor en Vivo de Ley de Ohm */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <h4 className="font-extrabold text-amber-300">⚡ Banco de Prueba Analógico (Ley de Ohm & Watt):</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Voltaje (V): <strong className="text-white">{voltaje} V</strong></label>
                  <input type="range" min="3" max="48" value={voltaje} onChange={(e) => setVoltaje(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Resistencia (R): <strong className="text-white">{resistencia} Ω</strong></label>
                  <input type="range" min="10" max="1000" step="10" value={resistencia} onChange={(e) => setResistencia(Number(e.target.value))} className="w-full accent-amber-500" />
                </div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono flex justify-between text-xs">
                <span className="text-cyan-300">Corriente I: {corrienteMa} mA</span>
                <span className="text-emerald-400 font-bold">Potencia P: {potenciaMw} mW</span>
              </div>
            </div>
          </div>

          {/* Terminal Interactiva Cisco IOS / Redes e Informática */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-3">
            <div>
              <h3 className="text-sm font-extrabold text-emerald-400">
                💻 Terminal Interactiva de Redes Cisco IOS & Informática
              </h3>
              <p className="text-[11px] text-slate-400">
                Prueba comandos como <code className="text-cyan-300">ping 192.168.10.1</code>, <code className="text-cyan-300">show vlan</code> o <code className="text-cyan-300">show version</code>.
              </p>
            </div>

            <div className="bg-black border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-emerald-400 h-48 overflow-y-auto space-y-1">
              {historialCli.map((linea, i) => (
                <div key={i}>{linea}</div>
              ))}
            </div>

            <form onSubmit={ejecutarCli} className="flex gap-2">
              <input
                type="text"
                value={comandoCli}
                onChange={(e) => setComandoCli(e.target.value)}
                placeholder="Switch-CTP# escribe un comando (ej. ping 192.168.10.1)..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white"
              />
              <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-xl text-xs">
                Ejecutar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}