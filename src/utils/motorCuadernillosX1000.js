// ============================================================================
// PRACTICATECNICA.COM - MOTOR DUAL PNE (ACADÉMICO) + PNEET (TÉCNICO) X1000
// Inclusividad Mundial DUA (Visual, Auditivo, Lectura Fácil, Alto Potencial)
// ============================================================================

export const SEMILLA_MAESTRA_OFICIAL = [
  // BLOQUE ACADÉMICO (MOD-ACA)
  {
    id: "ITEM-ACA-MAT-01", codigo: "PNE-MAT-01", modalidad: "MOD-ACA", area: "Matemáticas Académicas", subarea: "Relaciones y Álgebra", nivel: "11° / 12°",
    ra: "Determinar el vértice y concavidad de un modelo cuadrático f(x) = ax² + bx + c.",
    dua: "Fórmula del vértice resaltada: V = (-b / 2a, f(-b / 2a)). Si a < 0, abre hacia abajo (máximo).",
    generarVariante: (seed) => {
      const a = -2;
      const xv = (seed % 9) + 3; // Vértice dinámico entre 3 y 11
      const b = -2 * a * xv;     // b = 4 * xv
      const c = -((seed % 5) + 1) * 10;
      const maxGanancia = a * (xv * xv) + b * xv + c;
      const cultivos = ["aguacate Hass", "café de altura", "piña de exportación", "cacao orgánico", "fresa hidropónica"];
      const cultivo = cultivos[seed % cultivos.length];
      return {
        enunciado: `[Variante #${seed}] La ganancia mensual G(x), en miles de colones, de una cooperativa que produce x toneladas de ${cultivo} se modela con G(x) = ${a}x² + ${b}x ${c}. ¿Cuántas toneladas maximizan la ganancia y cuál es ese monto máximo?`,
        opciones: [
          { id: "A", texto: `${xv} toneladas para una ganancia máxima de ${maxGanancia + 8} mil colones.` },
          { id: "B", texto: `${xv} toneladas para una ganancia máxima de ${maxGanancia} mil colones.` },
          { id: "C", texto: `${xv * 2} toneladas para una ganancia máxima de ${maxGanancia * 2} mil colones.` },
          { id: "D", texto: `${b} toneladas para una ganancia máxima de ${Math.abs(c) * 2} mil colones.` }
        ],
        correcta: "B",
        solucionario: `El punto máximo (a = ${a} < 0) se alcanza en xv = -b/(2a) = -${b}/(2*${a}) = ${xv} toneladas. Evaluando G(${xv}) = ${a}(${xv})² + ${b}(${xv}) ${c} = ${maxGanancia} mil colones.`
      };
    }
  },
  {
    id: "ITEM-ACA-CIE-02", codigo: "PNE-CIE-02", modalidad: "MOD-ACA", area: "Ciencias (Química)", subarea: "Estequiometría y Soluciones", nivel: "11° / 12°",
    ra: "Calcular la concentración molar M = n / V en disoluciones acuosas.",
    dua: "Conversión clave: 1000 mL = 1 L. Fórmula directa: Molaridad (M) = moles (n) ÷ Litros (V).",
    generarVariante: (seed) => {
      const molesList = [0.25, 0.5, 0.75, 1.2, 1.5, 2.0];
      const volMlList = [250, 500, 750, 200, 400];
      const n = molesList[seed % molesList.length];
      const vMl = volMlList[(seed >> 1) % volMlList.length];
      const vL = vMl / 1000;
      const M = (n / vL).toFixed(2);
      return {
        enunciado: `[Variante #${seed}] En un laboratorio se disuelven ${n} mol de NaOH en agua destilada hasta completar ${vMl} mL (${vL} L) de disolución. ¿Cuál es la concentración molar (M)?`,
        opciones: [
          { id: "A", texto: `${(n * vL).toFixed(3)} mol/L` },
          { id: "B", texto: `${M} mol/L` },
          { id: "C", texto: `${(n / (vL * 2)).toFixed(2)} mol/L` },
          { id: "D", texto: `${(parseFloat(M) + 1.5).toFixed(2)} mol/L` }
        ],
        correcta: "B",
        solucionario: `M = n / V = ${n} mol / ${vL} L = ${M} mol/L.`
      };
    }
  },
  {
    id: "ITEM-ACA-CIE-03", codigo: "PNE-CIE-03", modalidad: "MOD-ACA", area: "Ciencias (Física)", subarea: "Dinámica y Leyes de Newton", nivel: "11° / 12°",
    ra: "Aplicar la Segunda Ley de Newton (ΣF = m · a) en superficies con fricción.",
    dua: "Diagrama de cuerpo libre: Fuerza Neta = Fuerza Aplicada - Fricción. Luego: a = Fuerza Neta ÷ masa.",
    generarVariante: (seed) => {
      const masa = ((seed % 8) + 4) * 2; // 8 a 22 kg
      const acel = ((seed % 5) + 2) + 0.5; // 2.5 a 6.5 m/s²
      const friccion = (seed % 4 + 1) * 5; // 5 a 20 N
      const fAplicada = masa * acel + friccion;
      return {
        enunciado: `[Variante #${seed}] Un bloque de ${masa} kg recibe una fuerza horizontal de ${fAplicada} N hacia la derecha sobre una mesa con fricción cinética opuesta de ${friccion} N. ¿Cuál es la magnitud de su aceleración?`,
        opciones: [
          { id: "A", texto: `${acel.toFixed(2)} m/s²` },
          { id: "B", texto: `${(fAplicada / masa).toFixed(2)} m/s²` },
          { id: "C", texto: `${((fAplicada + friccion) / masa).toFixed(2)} m/s²` },
          { id: "D", texto: `${(friccion / masa).toFixed(2)} m/s²` }
        ],
        correcta: "A",
        solucionario: `Fuerza neta ΣF = ${fAplicada} N - ${friccion} N = ${fAplicada - friccion} N. Por Segunda Ley de Newton: a = ${fAplicada - friccion} N / ${masa} kg = ${acel.toFixed(2)} m/s².`
      };
    }
  },

  // BLOQUE DE ESPECIALIDADES TÉCNICAS (MOD-TEC + PDFs MEP 2026)
  {
    id: "ITEM-TEC-DW-03", codigo: "PNEET-DW-03", modalidad: "MOD-TEC", area: "Desarrollo Web y Ciberseguridad", subarea: "Redes IPv4 y VLSM", nivel: "12°",
    ra: "RA 1.3: Dimensionar subredes IPv4 mediante VLSM (2ⁿ - 2 >= hosts).",
    dua: "Tabla de potencias de 2: 2³-2=6 (/29), 2⁴-2=14 (/28), 2⁵-2=30 (/27), 2⁶-2=62 (/26), 2⁷-2=126 (/25).",
    generarVariante: (seed) => {
      const tabla = [
        { req: 12, pref: "/28", mask: "255.255.255.240", util: 14, bits: 4 },
        { req: 26, pref: "/27", mask: "255.255.255.224", util: 30, bits: 5 },
        { req: 55, pref: "/26", mask: "255.255.255.192", util: 62, bits: 6 },
        { req: 110, pref: "/25", mask: "255.255.255.128", util: 126, bits: 7 }
      ];
      const sel = tabla[seed % tabla.length];
      return {
        enunciado: `[Variante #${seed}] Un arquitecto de ciberseguridad segmenta una red IPv4 con VLSM para un laboratorio con ${sel.req} hosts utilizables sin desperdiciar direcciones. ¿Qué máscara y prefijo CIDR debe aplicar?`,
        opciones: [
          { id: "A", texto: `${sel.mask} (${sel.pref}), que provee ${sel.util} direcciones de host utilizables.` },
          { id: "B", texto: `255.255.255.248 (/29), que provee 6 direcciones de host utilizables.` },
          { id: "C", texto: `255.255.255.252 (/30), que provee 2 direcciones de host utilizables.` },
          { id: "D", texto: `255.255.0.0 (/16), que provee 65534 direcciones utilizables.` }
        ],
        correcta: "A",
        solucionario: `Con n = ${sel.bits} bits de host, 2^${sel.bits} - 2 = ${sel.util} >= ${sel.req}. El prefijo es 32 - ${sel.bits} = ${sel.pref} (${sel.mask}).`
      };
    }
  },
  {
    id: "ITEM-TEC-CF-01", codigo: "PNEET-CF-01", modalidad: "MOD-TEC", area: "Contabilidad y Finanzas", subarea: "Gestión Contable NIC 16", nivel: "11°",
    ra: "RA 2.2: Calcular el gasto anual por depreciación de activos no corrientes según NIC 16.",
    dua: "Fórmula NIC 16: Depreciación Anual = [(Costo Factura + Instalación) - Valor Residual] ÷ Vida Útil.",
    generarVariante: (seed) => {
      const vida = ((seed % 5) + 4); // 4 a 8 años
      const residual = ((seed % 4) + 1) * 1000000;
      const cuotaAnual = ((seed % 6) + 2) * 500000;
      const instalacion = 1200000;
      const costoTotal = (cuotaAnual * vida) + residual;
      const compra = costoTotal - instalacion;
      return {
        enunciado: `[Variante #${seed}] Una planta adquiere maquinaria por ₡${compra.toLocaleString()} más costos de instalación de ₡${instalacion.toLocaleString()}. Su vida útil es de ${vida} años y el valor residual es de ₡${residual.toLocaleString()}. Según la NIC 16 (línea recta), ¿cuál es el gasto anual por depreciación?`,
        opciones: [
          { id: "A", texto: `₡${(cuotaAnual - 250000).toLocaleString()} colones` },
          { id: "B", texto: `₡${cuotaAnual.toLocaleString()} colones` },
          { id: "C", texto: `₡${(costoTotal / vida).toLocaleString()} colones` },
          { id: "D", texto: `₡${(compra / vida).toLocaleString()} colones` }
        ],
        correcta: "B",
        solucionario: `Costo capitalizable = ₡${compra.toLocaleString()} + ₡${instalacion.toLocaleString()} = ₡${costoTotal.toLocaleString()}. Importe depreciable = ₡${costoTotal.toLocaleString()} - ₡${residual.toLocaleString()} = ₡${(costoTotal - residual).toLocaleString()}. Dividido entre ${vida} años = ₡${cuotaAnual.toLocaleString()}.`
      };
    }
  },
  {
    id: "ITEM-TEC-EI-02", codigo: "PNEET-EI-02", modalidad: "MOD-TEC", area: "Electrónica Industrial", subarea: "Instrumentación 4-20 mA", nivel: "12°",
    ra: "RA 1.2: Calcular corriente y tensión (V = I · R) en lazos industriales de 4 mA a 20 mA.",
    dua: "Escala de 4 mA (0%) a 20 mA (100%): Span = 16 mA. Luego aplica Ley de Ohm: V = I(A) × R(Ω).",
    generarVariante: (seed) => {
      const porcentajes = [0.25, 0.50, 0.75, 1.0];
      const pct = porcentajes[seed % porcentajes.length];
      const tMax = ((seed % 4) + 1) * 100; // 100 a 400 °C
      const tActual = tMax * pct;
      const corrienteMa = 4 + (16 * pct); // 8, 12, 16, 20 mA
      const R = 250;
      const V = ((corrienteMa / 1000) * R).toFixed(2);
      return {
        enunciado: `[Variante #${seed}] Un transmisor de 0 °C a ${tMax} °C opera con un lazo de 4 mA a 20 mA sobre una resistencia de precisión R = ${R} Ω. Cuando el proceso marca ${tActual} °C (${pct * 100}% del rango), ¿cuál es la corriente y la tensión?`,
        opciones: [
          { id: "A", texto: `${corrienteMa - 2} mA y ${(V - 0.5).toFixed(2)} V` },
          { id: "B", texto: `${corrienteMa} mA y ${V} V` },
          { id: "C", texto: `${corrienteMa} mA y ${(V * 1.25).toFixed(2)} V` },
          { id: "D", texto: `20 mA y 5.00 V` }
        ],
        correcta: "B",
        solucionario: `Al ${pct * 100}% del span (16 mA), I = 4 mA + (${pct} × 16 mA) = ${corrienteMa} mA (${corrienteMa / 1000} A). Por Ley de Ohm: V = ${corrienteMa / 1000} A × ${R} Ω = ${V} V.`
      };
    }
  },
  {
    id: "ITEM-TEC-AGRO-01", codigo: "PNEET-AGRO-1001", modalidad: "MOD-TEC", area: "Agroecología y Agroindustria (1001/1003)", subarea: "Suelos, Brix y Conservación", nivel: "12°",
    ra: "Evaluar el control de escorrentía en contorno y el rendimiento quesero / agroindustrial.",
    dua: "Regla de tres directa para rendimiento lácteo: (kg de queso ÷ litros de leche) × 100.",
    generarVariante: (seed) => {
      const litros = ((seed % 6) + 3) * 100; // 300 a 800 L
      const rendPor100 = 12.5;
      const kgQueso = (litros * rendPor100) / 100;
      return {
        enunciado: `[Variante #${seed}] Una planta agroindustrial de un CTP procesa ${litros} litros de leche estandarizada y obtiene ${kgQueso} kg de queso fresco. ¿Cuál es el rendimiento expresado en kg de queso por cada 100 L de leche?`,
        opciones: [
          { id: "A", texto: `8,0 kg / 100 L` },
          { id: "B", texto: `10,0 kg / 100 L` },
          { id: "C", texto: `16,0 kg / 100 L` },
          { id: "D", texto: `${rendPor100} kg / 100 L` }
        ],
        correcta: "D",
        solucionario: `Rendimiento = (${kgQueso} kg / ${litros} L) × 100 = ${rendPor100} kg por cada 100 litros.`
      };
    }
  },
  {
    id: "ITEM-TEC-CC-01", codigo: "PNEET-CC-2003", modalidad: "MOD-TEC", area: "Construcción Civil y Dibujo (2003/2005)", subarea: "Estática, Escalas y Cubicaciones", nivel: "12°",
    ra: "Calcular reacciones en vigas isostáticas y volúmenes de concreto en losas.",
    dua: "En una viga simétrica con carga puntual en el centro (L/2), cada apoyo soporta exactamente la mitad: Ra = Rb = P ÷ 2.",
    generarVariante: (seed) => {
      const carga = ((seed % 9) + 4) * 200; // 800 a 2400 kgf
      const reaccion = carga / 2;
      return {
        enunciado: `[Variante #${seed}] Se diseña una viga de 6 m simplemente apoyada en sus extremos A y B, sometida a una carga puntual en el centro de ${carga} kgf. Para mantener el equilibrio estático, ¿cuál es la reacción Ra?`,
        opciones: [
          { id: "A", texto: `0 kgf` },
          { id: "B", texto: `${reaccion} kgf` },
          { id: "C", texto: `${carga} kgf` },
          { id: "D", texto: `${carga * 2} kgf` }
        ],
        correcta: "B",
        solucionario: `Por simetría estática (ΣFy = 0 y ΣM = 0), la carga central se distribuye en partes iguales entre ambos apoyos: Ra = ${carga} / 2 = ${reaccion} kgf.`
      };
    }
  }
];

export function generarLoteMilVariantes(modalidadFiltro = "TODAS", cantidad = 20) {
  const baseFiltrada = modalidadFiltro === "TODAS"
    ? SEMILLA_MAESTRA_OFICIAL
    : SEMILLA_MAESTRA_OFICIAL.filter(i => i.modalidad === modalidadFiltro);

  const lote = [];
  const seedBase = Math.floor(Math.random() * 9000) + 1000;
  for (let i = 0; i < cantidad; i++) {
    const plantilla = baseFiltrada[i % baseFiltrada.length];
    const seedUnica = seedBase + (i * 17) + Math.floor(Math.random() * 99);
    const generada = plantilla.generarVariante(seedUnica);
    lote.push({
      ...plantilla,
      uid: `${plantilla.codigo}-VAR-${seedUnica}`,
      ...generada
    });
  }
  return lote;
}