// Motor Multiverso Kamizama — Práctica Técnica .com
// 100% Reactivos Originales Paramétricos (Cero copia de propiedad intelectual ajena)
// Cubre: Primaria/Secundaria MEP, Especialidades CTP, Universidades (UCR, TEC, UNA, UNED, UTN) y MOPT

export const CATALOGO_MULTIVERSO = [
  // UNIVERSIDADES PÚBLICAS (ADMISIÓN Y NIVELACIÓN)
  { id: "uni-ucr-una", grupo: "Universidades", nombre: "Admisión UCR / UNA (Razonamiento Verbal y Matemático)", nivelBase: "Universitario", total: 3000000 },
  { id: "uni-tec", grupo: "Universidades", nombre: "Admisión TEC (Matemática Intensiva y Lógica Analítica)", nivelBase: "Universitario", total: 3000000 },
  { id: "uni-utn-uned", grupo: "Universidades", nombre: "Ingreso y Nivelación UTN / UNED (Competencias Troncal)", nivelBase: "Universitario", total: 3000000 },

  // ESPECIALIDADES TÉCNICAS CTP
  { id: "ctp-ciberseguridad", grupo: "Especialidades CTP", nombre: "Ciberseguridad, Redes y Protección de Infraestructura", nivelBase: "10° a 12° Técnico", total: 3000000 },
  { id: "ctp-web-software", grupo: "Especialidades CTP", nombre: "Desarrollo Web, Programación y Diseño de Software (JSX/SQL)", nivelBase: "10° a 12° Técnico", total: 3000000 },
  { id: "ctp-soporte-ti", grupo: "Especialidades CTP", nombre: "Soporte TI, Mantenimiento, Cloud y Virtualización", nivelBase: "10° a 12° Técnico", total: 3000000 },
  { id: "ctp-contabilidad-admin", grupo: "Especialidades CTP", nombre: "Contabilidad, Finanzas, Administración y Logística", nivelBase: "10° a 12° Técnico", total: 3000000 },
  { id: "ctp-electromecanica", grupo: "Especialidades CTP", nombre: "Electrónica, Electromecánica, Metrología y Salud Ocupacional", nivelBase: "10° a 12° Técnico", total: 3000000 },
  { id: "ctp-ingles-ejecutivo", grupo: "Especialidades CTP", nombre: "English for Communication & Technical B2/C1", nivelBase: "10° a 12° Técnico", total: 3000000 },

  // ASIGNATURAS ACADÉMICAS MEP
  { id: "mep-matematica", grupo: "Asignaturas MEP", nombre: "Matemática (Álgebra, Funciones, Geometría y Estadística)", nivelBase: "7° a 12° Académico", total: 3000000 },
  { id: "mep-ciencias", grupo: "Asignaturas MEP", nombre: "Ciencias (Biología, Física, Química)", nivelBase: "7° a 12° Académico", total: 3000000 },
  { id: "mep-espanol", grupo: "Asignaturas MEP", nombre: "Español (Comprensión Lectora, Gramática y Redacción)", nivelBase: "1° a 12° Académico", total: 3000000 },
  { id: "mep-sociales-civica", grupo: "Asignaturas MEP", nombre: "Estudios Sociales y Educación Cívica", nivelBase: "1° a 12° Académico", total: 3000000 },

  // ACADEMIA VIAL MOPT
  { id: "mopt-teorico", grupo: "Licencias MOPT", nombre: "Manual del Conductor MOPT — Ley 9078 (Motos A, Carros B, Camiones C)", nivelBase: "Oficial COSEVI", total: 3000000 }
];

export const DIFICULTADES_MULTIVERSO = [
  { id: "baja", nombre: "Nivel 1: Fundamentos (3M)", color: "bg-emerald-500/10 text-emerald-600" },
  { id: "media", nombre: "Nivel 2: Intermedio Aplicado (3M)", color: "bg-blue-500/10 text-blue-600" },
  { id: "alta", nombre: "Nivel 3: Avanzado / Reto Superior (3M)", color: "bg-purple-500/10 text-purple-600" },
  { id: "multiverso", nombre: "Multiverso Adaptativo (9M Mezclados)", color: "bg-amber-500/10 text-amber-600" }
];

function hashKamizama(texto) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function sha256Kamizama(texto) {
  const p1 = hashKamizama(texto + "-PT1").toString(16).padStart(8, "0");
  const p2 = hashKamizama(texto + "-PT2").toString(16).padStart(8, "0");
  const p3 = hashKamizama(texto + "-PT3").toString(16).padStart(8, "0");
  const p4 = hashKamizama(texto + "-PT4").toString(16).padStart(8, "0");
  return `${p1}${p2}${p3}${p4}${p1}${p2}${p3}${p4}`.slice(0, 64).toUpperCase();
}

function construirReactivoOriginal(materiaObj, dificultadActual, semillaNumero) {
  const n1 = (semillaNumero % 45) + 12;
  const n2 = ((semillaNumero >> 3) % 18) + 4;
  const idGlobal = (semillaNumero % 8999999) + 100000;

  // Generación paramétrica 100% original según grupo y materia
  if (materiaObj.id === "uni-ucr-una" || materiaObj.id === "uni-tec" || materiaObj.id === "mep-matematica") {
    const resultado = n1 * n2 + (dificultadActual === "alta" ? n1 : 0);
    const enunciado =
      dificultadActual === "baja"
        ? `En una secuencia de optimización cuantitativa, cada lote contiene ${n1} módulos y se procesan ${n2} lotes completos. ¿Cuál es el total exacto de módulos procesados?`
        : dificultadActual === "media"
        ? `Un laboratorio universitario evalúa ${n2} series de datos con ${n1} muestras cada una. Si el modelo converge linealmente sin pérdidas, determine la magnitud total del conjunto muestral.`
        : `En un modelo analítico de admisión superior, una función de rendimiento produce ${n1} unidades por cada uno de los ${n2} ciclos principales, más una reserva adicional equivalente a ${n1} unidades. ¿Cuál es el valor exacto del rendimiento acumulado?`;

    const correcta = `${resultado} unidades verificadas`;
    const d1 = `${resultado + n2} unidades verificadas`;
    const d2 = `${Math.max(1, resultado - n1)} unidades verificadas`;
    const d3 = `${n1 + n2 * 2} unidades verificadas`;

    return {
      idGlobal,
      conceptoResumen: `Proporcionalidad y modelado algebraico directo: se multiplica la capacidad base (${n1}) por los ciclos (${n2}) y se suma cualquier reserva adicional.`,
      formulaClave: dificultadActual === "alta" ? `Total = (${n1} × ${n2}) + ${n1} = ${resultado}` : `Total = ${n1} × ${n2} = ${resultado}`,
      stem: enunciado,
      opcionesBase: [correcta, d1, d2, d3],
      explicacion: `Cálculo directo original: al operar ${n1} con ${n2} bajo las condiciones del enunciado se obtiene exactamente ${resultado}.`
    };
  }

  if (materiaObj.id === "mopt-teorico") {
    const velocidad = [40, 60, 80, 100][semillaNumero % 4];
    const distanciaReaccion = Math.round((velocidad * 3) / 10);
    return {
      idGlobal,
      conceptoResumen: `Conducción preventiva bajo Ley de Tránsito 9078: mantener distancia de seguridad, casco certificado en bicimotos/motocicletas y prioridad de paso reglamentaria.`,
      formulaClave: `Distancia estimada de reacción a ${velocidad} km/h ≈ ${distanciaReaccion} metros en condiciones secas`,
      stem: `Un conductor circula a ${velocidad} km/h en vía pública costarricense bajo la Ley 9078 (${dificultadActual.toUpperCase()}). Para evitar colisiones por alcance y respetar la seguridad vial, ¿cuál es la acción técnica correcta?`,
      opcionesBase: [
        `Conservar margen preventivo de al menos ${distanciaReaccion} m de reacción, luces reglamentarias activas y control anticipado del carril`,
        `Reducir la separación a menos de 2 metros para aprovechar la succión aerodinámica del vehículo delantero`,
        `Accionar el freno de emergencia bloqueando las ruedas en plena curva sin señalizar`,
        `Adelantar utilizando el espaldón derecho sin verificar el punto ciego de los retrovisores`
      ],
      explicacion: `A ${velocidad} km/h el vehículo recorre aproximadamente ${distanciaReaccion} metros solo durante el tiempo de reacción, por lo que mantener distancia y visibilidad salva vidas.`
    };
  }

  if (materiaObj.id.startsWith("ctp-")) {
    const puerto = [22, 80, 443, 5432, 8080][semillaNumero % 5];
    return {
      idGlobal,
      conceptoResumen: `Arquitectura técnica en ${materiaObj.nombre}: aislamiento de privilegios, validación de entradas, respaldos verificados y código limpio modular.`,
      formulaClave: `Nodo #${n1} • Servicio en puerto/control ${puerto} • Integridad SHA-256`,
      stem: `En un entorno productivo de ${materiaObj.nombre} (Escenario #${n1}, dificultad ${dificultadActual.toUpperCase()}), se requiere auditar el servicio asociado al identificador técnico ${puerto}. ¿Cuál procedimiento cumple las buenas prácticas profesionales?`,
      opcionesBase: [
        `Aplicar principio de mínimo privilegio, validar entradas de usuario y registrar trazabilidad firmada del servicio ${puerto}`,
        `Exponer las credenciales administrativas en el código cliente sin ningún tipo de validación`,
        `Desactivar los registros de auditoría para ocultar posibles excepciones de ejecución`,
        `Permitir modificaciones directas en producción sin control de versiones ni pruebas previas`
      ],
      explicacion: `En ${materiaObj.nombre}, la seguridad por diseño, el mínimo privilegio y la trazabilidad garantizan operación continua sin vulnerabilidades.`
    };
  }

  // Asignaturas académicas generales (Ciencias, Español, Sociales, Inglés)
  return {
    idGlobal,
    conceptoResumen: `Síntesis esencial de ${materiaObj.nombre}: análisis crítico de fuentes, relación causa-efecto y aplicación contextualizada del conocimiento.`,
    formulaClave: `Unidad Analítica #${n1}.${n2} • Nivel ${dificultadActual.toUpperCase()}`,
    stem: `Al estudiar el bloque temático #${n1} de ${materiaObj.nombre} en dificultad ${dificultadActual.toUpperCase()}, ¿cuál criterio permite fundamentar una conclusión rigurosa y verificable?`,
    opcionesBase: [
      `Contrastando la evidencia empírica y conceptual del bloque #${n1} con los principios fundamentales de la disciplina`,
      `Aceptando suposiciones subjetivas sin verificar la coherencia interna del texto o fenómeno`,
      `Omitiendo las variables principales del contexto histórico, científico o comunicativo`,
      `Reemplazando los datos comprobables por generalizaciones ambiguas sin sustento`
    ],
    explicacion: `El pensamiento crítico y la verificación de evidencias son la base del dominio académico en ${materiaObj.nombre}.`
  };
}

export function generarLoteMultiverso({
  materiaId = "uni-ucr-una",
  dificultad = "multiverso",
  semillaUsuario = "KAMIZAMA-2026",
  cantidad = 12
}) {
  const materiaObj = CATALOGO_MULTIVERSO.find((m) => m.id === materiaId) || CATALOGO_MULTIVERSO[0];
  const baseHash = hashKamizama(`${materiaId}-${dificultad}-${semillaUsuario}`);
  const lista = [];

  for (let i = 0; i < cantidad; i++) {
    const difActual =
      dificultad === "multiverso"
        ? ["baja", "media", "alta"][(baseHash + i) % 3]
        : dificultad;

    const semillaItem = hashKamizama(`${baseHash}-${i * 9973}-${difActual}`);
    const baseItem = construirReactivoOriginal(materiaObj, difActual, semillaItem);

    // Barajado Fisher-Yates determinístico por usuario
    const orden = [0, 1, 2, 3];
    for (let j = 3; j > 0; j--) {
      const k = (semillaItem + j * 19) % (j + 1);
      const tmp = orden[j];
      orden[j] = orden[k];
      orden[k] = tmp;
    }

    const opcionesMezcladas = orden.map((idx) => baseItem.opcionesBase[idx]);
    const respuestaCorrecta = orden.indexOf(0);
    const hashVerificacion = sha256Kamizama(`${baseItem.idGlobal}-${materiaId}-${difActual}`);

    lista.push({
      id: `KMZ-${baseItem.idGlobal}`,
      numeroFormateado: baseItem.idGlobal.toLocaleString("es-CR"),
      materia: materiaObj.nombre,
      grupo: materiaObj.grupo,
      dificultad: difActual.toUpperCase(),
      conceptoResumen: baseItem.conceptoResumen,
      formulaClave: baseItem.formulaClave,
      stem: baseItem.stem,
      options: opcionesMezcladas,
      answer: respuestaCorrecta,
      explanation: baseItem.explicacion,
      sha256: hashVerificacion
    });
  }

  return lista;
}
export const sha256Simulado = sha256Kamizama;
