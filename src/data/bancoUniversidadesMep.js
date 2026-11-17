export const CATALOGO_INSTITUCIONES_SUPERIOR = [
  {
    id: 'UCR_UNA',
    sigla: 'UCR / UNA',
    nombre: 'Prueba de Aptitud Académica (PAA)',
    escala: 'Escala 200 - 800 pts (50% PAA + 50% Nota Colegio)',
    color: 'from-sky-600 to-blue-900',
    icono: '🎓',
    descripcion: 'Comprensión de lectura, analogías y razonamiento matemático oficial.'
  },
  {
    id: 'TEC',
    sigla: 'TEC',
    nombre: 'Examen de Admisión Tecnológico de Costa Rica',
    escala: 'Escala 200 - 800 pts (60% Examen TEC + 40% Nota Colegio)',
    color: 'from-rose-600 to-red-950',
    icono: '⚙️',
    descripcion: 'Matemática intensiva, geometría, lógica deductiva y lectura científica.'
  },
  {
    id: 'UTN',
    sigla: 'UTN',
    nombre: 'Ingreso y Nivelación — Universidad Técnica Nacional',
    escala: 'Escala 0 - 100 pts (Redes, TI, Lógica e Inglés Técnico)',
    color: 'from-indigo-600 to-slate-900',
    icono: '🛠️',
    descripcion: 'Competencias tecnológicas, subredes IPv4, SQL y articulación de CTP.'
  },
  {
    id: 'UNED',
    sigla: 'UNED',
    nombre: 'Autoevaluación — Universidad Estatal a Distancia',
    escala: 'Escala 0 - 100 pts (Autonomía, Lectura y Competencias)',
    color: 'from-amber-600 to-yellow-950',
    icono: '📚',
    descripcion: 'Diagnóstico de comprensión lectora, lógica y estudio independiente.'
  },
  {
    id: 'MEP_CTP',
    sigla: 'MEP / CTP',
    nombre: 'Pruebas Nacionales y Especialidades Técnicas MEP',
    escala: 'Escala 0 - 100 pts (Nota mínima oficial 70 pts)',
    color: 'from-cyan-600 to-teal-950',
    icono: '🦉',
    descripcion: 'Desarrollo Web, Ciberseguridad, Contabilidad, Electrónica y Académicas.'
  },
  {
    id: 'COSEVI',
    sigla: 'COSEVI / MOPT',
    nombre: 'Prueba Teórica de Manejo y Simulador Vial 2D',
    escala: 'Escala 0 - 100 pts (Aprobación mínima 80 pts)',
    color: 'from-emerald-600 to-green-950',
    icono: '🚗',
    descripcion: 'Ley de Tránsito 9078, rotondas, prioridades de paso y pista 2D.'
  }
];

export const CORTES_HISTORICOS_CARRERAS = [
  { universidad: 'UCR', carrera: 'Medicina y Cirugía', corte: 726, escala: 800, sede: 'Rodrigo Facio' },
  { universidad: 'UCR', carrera: 'Ciencias de la Computación e Informática', corte: 645, escala: 800, sede: 'Rodrigo Facio / Alajuela' },
  { universidad: 'UCR', carrera: 'Ingeniería Eléctrica / Mecánica', corte: 625, escala: 800, sede: 'Rodrigo Facio' },
  { universidad: 'UCR', carrera: 'Derecho / Dirección de Empresas', corte: 598, escala: 800, sede: 'Rodrigo Facio / Sedes' },
  { universidad: 'UNA', carrera: 'Ingeniería en Sistemas de Información', corte: 610, escala: 800, sede: 'Campus Omar Dengo (Heredia)' },
  { universidad: 'TEC', carrera: 'Ingeniería en Computación', corte: 678, escala: 800, sede: 'Cartago / San José / Alajuela' },
  { universidad: 'TEC', carrera: 'Ingeniería en Mecatrónica', corte: 695, escala: 800, sede: 'Cartago' },
  { universidad: 'TEC', carrera: 'Ingeniería en Biotecnología', corte: 685, escala: 800, sede: 'Cartago' },
  { universidad: 'TEC', carrera: 'Ingeniería en Electrónica', corte: 635, escala: 800, sede: 'Cartago / San Carlos' },
  { universidad: 'UTN', carrera: 'Ingeniería del Software / Tecnologías Informáticas', corte: 80, escala: 100, sede: 'Sede Central Alajuela' },
  { universidad: 'UTN', carrera: 'Ciberseguridad, Redes y Contaduría Pública', corte: 78, escala: 100, sede: 'Sede Central Alajuela' },
  { universidad: 'UNED', carrera: 'Ingeniería Informática y Administración', corte: 70, escala: 100, sede: 'Sedes Universitarias CR' }
];

export const ITEMS_SEMILLA_CURADOS = [
  {
    id: 'ucr-verbal-01',
    institucion: 'UCR_UNA',
    subarea: 'Comprensión de Lectura',
    area: 'Razonamiento Verbal (Lectura Crítica)',
    dificultad: 'Alta',
    enunciado: '«Quien investiga sin cuestionar sus propias premisas corre el riesgo de convertir el método científico en un simple ritual de confirmación.» Del fragmento anterior se deduce lógicamente que el progreso genuino en la investigación exige:',
    opciones: [
      'Prescindir del método científico para evitar los rituales académicos.',
      'Someter a examen crítico incluso los supuestos iniciales del investigador.',
      'Confirmar únicamente aquellas hipótesis que cuenten con consenso previo.',
      'Reemplazar la observación empírica por la intuición filosófica.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: Analizar la advertencia del texto: investigar sin cuestionar las propias premisas lleva a un ritual de confirmación.\nPaso 2: Por lo tanto, es indispensable examinar críticamente los supuestos iniciales.'
  },
  {
    id: 'ucr-analogia-02',
    institucion: 'UCR_UNA',
    subarea: 'Analogías y Contexto Verbal',
    area: 'Razonamiento Verbal (Analogías)',
    dificultad: 'Media',
    enunciado: 'Seleccione el par de palabras que presenta una relación analógica equivalente a la de la pareja base: ALGORITMO es a PROGRAMADOR como:',
    opciones: [
      'Bisturí es a paciente',
      'Partitura es a compositor',
      'Ladrillo es a demolición',
      'Semáforo es a peatón'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: El programador diseña y escribe una secuencia lógica llamada algoritmo.\nPaso 2: El compositor diseña y escribe una secuencia musical llamada partitura.'
  },
  {
    id: 'tec-verbal-01',
    institucion: 'TEC',
    subarea: 'Comprensión Científica y Silogismos',
    area: 'Razonamiento Lógico TEC',
    dificultad: 'Alta',
    enunciado: 'Premisa 1: Todos los sistemas protegidos con SHA-256 generan una huella criptográfica de 256 bits.\nPremisa 2: El expediente digital del CTP utiliza el estándar SHA-256.\n¿Cuál conclusión se deriva necesariamente de las premisas?',
    opciones: [
      'Cualquier huella de 256 bits pertenece al expediente digital del CTP.',
      'El expediente digital del CTP genera una huella criptográfica de 256 bits.',
      'El estándar SHA-256 solo funciona en expedientes educativos.',
      'Los sistemas que no son del CTP no pueden generar huellas de 256 bits.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: Por Modus Ponens, el expediente del CTP hereda necesariamente la propiedad de generar una huella de 256 bits.'
  },
  {
    id: 'utn-redes-01',
    institucion: 'UTN',
    subarea: 'Redes y Tecnologías de Información',
    area: 'Tecnología Aplicada UTN',
    dificultad: 'Media',
    enunciado: 'En una red local del laboratorio de la UTN con máscara /26 (255.255.255.192), ¿cuántas direcciones IP utilizables (hosts válidos) se obtienen por cada subred?',
    opciones: ['30 hosts utilizables', '62 hosts utilizables', '64 hosts utilizables', '126 hosts utilizables'],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: El prefijo /26 deja 32 - 26 = 6 bits para host.\nPaso 2: Aplicando 2^6 - 2 (restando red y broadcast) se obtienen 62 hosts utilizables.'
  },
  {
    id: 'uned-01',
    institucion: 'UNED',
    subarea: 'Autorregulación Académica',
    area: 'Competencias Universitarias UNED',
    dificultad: 'Media',
    enunciado: 'En el modelo de educación universitaria a distancia de la UNED, la mediación pedagógica se apoya en el aprendizaje autónomo. Esto implica que el estudiante exitoso debe:',
    opciones: [
      'Esperar a que el tutor presencial le dicte diariamente cada resumen en el aula.',
      'Planificar su cronograma, contrastar fuentes académicas y autoevaluar su avance.',
      'Memorizar textualmente las guías sin aplicar los conceptos a proyectos reales.',
      'Estudiar únicamente el día anterior a la entrega del proyecto final.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: La autonomía universitaria en la UNED requiere gestión activa del tiempo y autoevaluación constante.'
  },
  {
    id: 'mep-01',
    institucion: 'MEP_CTP',
    subarea: 'Ciberseguridad y Ley 8968',
    area: 'Especialidades Técnicas MEP',
    dificultad: 'Alta',
    enunciado: 'Bajo el cumplimiento de la Ley 8968 en Costa Rica, ¿cuál principio obliga a que cada usuario acceda únicamente a los registros estrictamente necesarios según su rol institucional?',
    opciones: [
      'Principio de privilegio mínimo y autodeterminación informativa.',
      'Principio de libre difusión pública de bases de datos.',
      'Neutralidad de ancho de banda inalámbrico.',
      'Indexación abierta en motores de búsqueda.'
    ],
    correcta: 0,
    guiaPasoAPaso: 'Paso 1: El control de acceso basado en roles (RBAC) protege los datos sensibles aplicando el privilegio mínimo.'
  },
  {
    id: 'cosevi-01',
    institucion: 'COSEVI',
    subarea: 'Prioridad de Paso en Rotondas',
    area: 'Seguridad Vial COSEVI / MOPT',
    dificultad: 'Media',
    enunciado: 'Al conducir una motocicleta, automóvil o vehículo articulado aproximándose a una rotonda en Costa Rica, ¿cuál es la norma obligatoria de prioridad y velocidad?',
    opciones: [
      'Tiene prioridad quien ingresa más rápido a más de 60 km/h.',
      'Tiene prioridad el vehículo que ya circula dentro de la rotonda, a una velocidad máxima de 30 km/h.',
      'Los vehículos pesados tienen prioridad absoluta para cortar todos los carriles internos.',
      'Se debe ingresar por el carril izquierdo para salir inmediatamente en la primera salida.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: En Costa Rica, la velocidad máxima dentro de la rotonda es de 30 km/h y la prioridad la tiene siempre quien ya circula dentro del anillo.'
  }
];

const BANCO_ANALOGIAS = [
  { base: 'FIREWALL es a TRÁFICO MALICIOSO', correcta: 'Filtro es a impurezas', d1: 'Teclado es a monitor', d2: 'Cable es a electricidad', d3: 'Archivo es a carpeta', exp: 'El firewall bloquea el tráfico malicioso igual que el filtro retiene las impurezas.' },
  { base: 'COMPILADOR es a CÓDIGO FUENTE', correcta: 'Traductor es a idioma', d1: 'Impresora es a tinta', d2: 'Antena es a satélite', d3: 'Batería es a voltaje', exp: 'El compilador traduce código fuente a código máquina igual que el traductor convierte de un idioma a otro.' },
  { base: 'ÍNDICE es a BASE DE DATOS', correcta: 'Catálogo es a biblioteca', d1: 'Página es a portada', d2: 'Servidor es a enfriamiento', d3: 'Router es a gabinete', exp: 'El índice acelera la búsqueda de registros igual que el catálogo en una biblioteca.' },
  { base: 'AUDITORÍA es a TRANSPARENCIA', correcta: 'Vacuna es a inmunidad', d1: 'Fraude es a confianza', d2: 'Ruido es a silencio', d3: 'Sanción es a desorden', exp: 'La auditoría promueve la transparencia igual que la vacuna genera inmunidad.' }
];

export function generarItemInfinito(institucionId, contadorSemilla = 1, modalidadContenido = 'mixto') {
  const n1 = (contadorSemilla * 7) % 25 + 4;
  const n2 = (contadorSemilla * 13) % 15 + 3;
  const rotacion = contadorSemilla % 4;

  const acomodar = (correctaStr, distractores) => {
    const todas = [...distractores];
    todas.splice(rotacion, 0, correctaStr);
    return { opciones: todas.slice(0, 4), correcta: rotacion };
  };

  const usarVerbal = modalidadContenido === 'verbal' || (modalidadContenido === 'mixto' && contadorSemilla % 2 === 0);

  if (institucionId === 'UCR_UNA' || institucionId === 'UNED') {
    if (usarVerbal) {
      const an = BANCO_ANALOGIAS[contadorSemilla % BANCO_ANALOGIAS.length];
      const ac = acomodar(an.correcta, [an.d1, an.d2, an.d3]);
      return {
        id: `inf-${institucionId}-v-${contadorSemilla}`,
        institucion: institucionId,
        subarea: 'Comprensión de Lectura y Analogías',
        area: `Razonamiento Verbal (${institucionId})`,
        dificultad: 'Media',
        enunciado: `Analice la relación lógica en contexto académico: «${an.base}» (Caso #${contadorSemilla}). ¿Cuál opción mantiene el mismo vínculo funcional?`,
        opciones: ac.opciones,
        correcta: ac.correcta,
        guiaPasoAPaso: `Paso 1: Analizar el par base (${an.base}).\nPaso 2: ${an.exp}`
      };
    }

    const factor = (contadorSemilla % 8) + 5;
    const total = (n1 + n2) * factor;
    const correctaVal = n1 * factor;
    const ac = acomodar(String(correctaVal), [
      String(correctaVal + factor),
      String(Math.max(1, correctaVal - factor)),
      String(n2 * factor)
    ]);
    return {
      id: `inf-${institucionId}-m-${contadorSemilla}`,
      institucion: institucionId,
      subarea: 'Razonamiento Matemático',
      area: `Razonamiento Matemático (${institucionId})`,
      dificultad: 'Alta',
      enunciado: `En un proyecto universitario, la razón de cupos entre Ingeniería y Educación es de ${n1} a ${n2}. Si en total hay ${total} cupos, ¿cuántos corresponden a Ingeniería?`,
      opciones: ac.opciones,
      correcta: ac.correcta,
      guiaPasoAPaso: `Paso 1: Sumar partes: ${n1} + ${n2} = ${n1 + n2}.\nPaso 2: Dividir ${total} / ${n1 + n2} = ${factor} por parte.\nPaso 3: Multiplicar ${n1} × ${factor} = ${correctaVal}.`
    };
  }

  if (institucionId === 'TEC') {
    const x1 = n1;
    const x2 = n2;
    const suma = x1 + x2;
    const prod = x1 * x2;
    const ac = acomodar(String(suma + prod), [
      String(suma * prod),
      String(Math.abs(prod - suma)),
      String(suma + prod + 10)
    ]);
    return {
      id: `inf-tec-${contadorSemilla}`,
      institucion: 'TEC',
      subarea: 'Matemática Intensiva TEC',
      area: 'Álgebra y Geometría Analítica TEC',
      dificultad: 'Alta',
      enunciado: `Si las dos raíces reales de la ecuación cuadrática x² - bx + c = 0 son x₁ = ${x1} y x₂ = ${x2}, ¿cuál es el valor exacto de (b + c)?`,
      opciones: ac.opciones,
      correcta: ac.correcta,
      guiaPasoAPaso: `Paso 1: En x² - bx + c = 0, b = ${x1} + ${x2} = ${suma} y c = ${x1} × ${x2} = ${prod}.\nPaso 2: Por tanto, b + c = ${suma + prod}.`
    };
  }

  if (institucionId === 'UTN') {
    const bitsHost = (contadorSemilla % 6) + 3;
    const prefijo = 32 - bitsHost;
    const hostsValidos = Math.pow(2, bitsHost) - 2;
    const ac = acomodar(`${hostsValidos} hosts utilizables`, [
      `${hostsValidos + 2} hosts utilizables`,
      `${Math.pow(2, bitsHost + 1) - 2} hosts utilizables`,
      `${Math.max(2, hostsValidos - 6)} hosts utilizables`
    ]);
    return {
      id: `inf-utn-${contadorSemilla}`,
      institucion: 'UTN',
      subarea: 'Redes CCNA y Tecnologías TI',
      area: 'Redes y Lógica Aplicada UTN',
      dificultad: 'Media',
      enunciado: `En un laboratorio de la UTN se configura una subred IPv4 con máscara /${prefijo}. ¿Cuál es la cantidad exacta de direcciones IP de host utilizables?`,
      opciones: ac.opciones,
      correcta: ac.correcta,
      guiaPasoAPaso: `Paso 1: Bits de host = 32 - ${prefijo} = ${bitsHost}.\nPaso 2: Hosts válidos = 2^${bitsHost} - 2 = ${hostsValidos}.`
    };
  }

  const amperios = n2;
  const ohmios = n1;
  const voltios = amperios * ohmios;
  const ac = acomodar(`${voltios} V`, [
    `${voltios + ohmios} V`,
    `${amperios + ohmios} V`,
    `${voltios * 2} V`
  ]);
  return {
    id: `inf-mep-${contadorSemilla}`,
    institucion: institucionId || 'MEP_CTP',
    subarea: 'Especialidades Técnicas y Ciencias',
    area: 'Práctica Guiada MEP / CTP',
    dificultad: 'Media',
    enunciado: `En un circuito electrónico del laboratorio circula una corriente de ${amperios} A por una resistencia de ${ohmios} Ω. Según la Ley de Ohm, ¿cuál es la tensión medida?`,
    opciones: ac.opciones,
    correcta: ac.correcta,
    guiaPasoAPaso: `Paso 1: Ley de Ohm V = I × R = ${amperios} A × ${ohmios} Ω = ${voltios} V.`
  };
}

export function ensamblarSimulacroCompleto(institucionId, cantidadPreguntas = 10, modalidad = 'mixto') {
  const totalMeta = Number(cantidadPreguntas) || 10;
  const semillasBase = ITEMS_SEMILLA_CURADOS.filter((i) => i.institucion === institucionId);
  const resultado = [...semillasBase];
  let contador = 1;
  while (resultado.length < totalMeta) {
    resultado.push(generarItemInfinito(institucionId, contador, modalidad));
    contador++;
  }
  return resultado.slice(0, totalMeta);
}

export function calcularPuntajeAdmision(institucionId, aciertos, respondidas, notaColegio = 90) {
  const porcentajeExamen = respondidas > 0 ? (aciertos / respondidas) * 100 : 0;
  const notaCol = Math.min(100, Math.max(0, Number(notaColegio) || 90));

  if (institucionId === 'UCR_UNA') {
    const promedioPonderado = porcentajeExamen * 0.5 + notaCol * 0.5;
    const puntaje800 = Math.round(200 + (promedioPonderado / 100) * 600);
    return {
      escalaMax: 800,
      puntajeFinal: puntaje800,
      porcentajeExamen: porcentajeExamen.toFixed(1),
      detalleFormula: `Fórmula Oficial UCR/UNA (200-800): 50% Examen PAA (${porcentajeExamen.toFixed(1)}%) + 50% Nota Educación Diversificada (${notaCol})`
    };
  }

  if (institucionId === 'TEC') {
    const promedioPonderado = porcentajeExamen * 0.6 + notaCol * 0.4;
    const puntaje800 = Math.round(200 + (promedioPonderado / 100) * 600);
    return {
      escalaMax: 800,
      puntajeFinal: puntaje800,
      porcentajeExamen: porcentajeExamen.toFixed(1),
      detalleFormula: `Fórmula Oficial TEC (200-800): 60% Examen TEC (${porcentajeExamen.toFixed(1)}%) + 40% Nota Presentación Colegio (${notaCol})`
    };
  }

  return {
    escalaMax: 100,
    puntajeFinal: Math.round(porcentajeExamen),
    porcentajeExamen: porcentajeExamen.toFixed(1),
    detalleFormula: `Calificación Directa Oficial (0-100): ${aciertos} aciertos de ${respondidas} reactivos evaluados.`
  };
}