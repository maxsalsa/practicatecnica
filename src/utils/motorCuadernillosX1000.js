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
      const xv = (seed % 9) + 3;
      const b = -2 * a * xv;
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
      const masa = ((seed % 8) + 4) * 2;
      const acel = ((seed % 5) + 2) + 0.5;
      const friccion = (seed % 4 + 1) * 5;
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
  // BLOQUE DE ESPECIALIDADES TÉCNICAS (MOD-TEC + Ejecutivo Comercial y Servicio al Cliente)
  {
    id: "ITEM-TEC-ECS-01", codigo: "PNEET-ECS-01", modalidad: "MOD-TEC", area: "Ejecutivo Comercial y Servicio al Cliente", subarea: "Legislación Laboral y Prestaciones", nivel: "12°",
    ra: "Calcular liquidaciones laborales (preaviso y cesantía) según el Código de Trabajo de Costa Rica.",
    dua: "Fórmula: Salario Diario = Salario Mensual ÷ 30. Cesantía = Días por año × Años laborados × Salario Diario.",
    generarVariante: (seed) => {
      const anos = (seed % 4) + 2;
      const salarios = [450000, 550000, 650000, 750000, 850000];
      const sal = salarios[seed % salarios.length];
      const diasCesantia = anos * 21;
      const cesantia = (sal / 30) * diasCesantia;
      const preaviso = sal;
      const total = preaviso + cesantia;
      return {
        enunciado: `[Variante #${seed}] Una persona laboró ${anos} años en una empresa con un salario mensual de ₡${sal.toLocaleString()} y finaliza con responsabilidad patronal. ¿Cuál es el monto total por preaviso y auxilio de cesantía (21 días por año)?`,
        opciones: [
          { id: "A", texto: `₡${(total - 300000).toLocaleString()} colones` },
          { id: "B", texto: `₡${total.toLocaleString()} colones` },
          { id: "C", texto: `₡${(cesantia).toLocaleString()} colones` },
          { id: "D", texto: `₡${(total + 500000).toLocaleString()} colones` }
        ],
        correcta: "B",
        solucionario: `Salario diario = ₡${sal.toLocaleString()} ÷ 30 = ₡${(sal/30).toFixed(2)}. Preaviso = ₡${sal.toLocaleString()}. Cesantía (${diasCesantia} días) = ₡${cesantia.toLocaleString()}. Total = ₡${total.toLocaleString()}.`
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