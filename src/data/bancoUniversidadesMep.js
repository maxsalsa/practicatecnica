export const CATALOGO_INSTITUCIONES_SUPERIOR = [
  {
    id: 'UCR_UNA',
    sigla: 'UCR / UNA',
    nombre: 'Prueba de Aptitud Académica (PAA)',
    escala: 'Escala 200 - 800 pts (50% PAA + 50% Nota Colegio)',
    color: 'from-sky-600 to-blue-900',
    icono: '🌻',
    descripcion: 'Comprensión de lectura, analogías, silogismos y razonamiento matemático en contexto.'
  },
  {
    id: 'TEC',
    sigla: 'TEC',
    nombre: 'Examen de Admisión Tecnológico de Costa Rica',
    escala: 'Escala 200 - 800 pts (60% Examen TEC + 40% Nota Colegio)',
    color: 'from-red-600 to-rose-950',
    icono: '⚙️',
    descripcion: 'Matemática intensiva, geometría analítica, lógica deductiva y comprensión verbal científica.'
  },
  {
    id: 'UTN',
    sigla: 'UTN',
    nombre: 'Ingreso y Articulación — Universidad Técnica Nacional',
    escala: 'Escala 0 - 100 pts (Inglés Técnico, Redes, TI y Lógica)',
    color: 'from-indigo-600 to-slate-900',
    icono: '🛠️',
    descripcion: 'Technical English for IT, subredes IPv4, bases de datos SQL y razonamiento aplicado.'
  },
  {
    id: 'MEP_CTP',
    sigla: 'MEP / CTP',
    nombre: 'Pruebas Nacionales y Especialidades Técnicas',
    escala: 'Escala 0 - 100 pts (Corte oficial 70 pts)',
    color: 'from-cyan-600 to-teal-950',
    icono: '🦉',
    descripcion: 'Desarrollo Web, Ciberseguridad, Contabilidad, Electrónica Industrial y Materias Académicas.'
  },
  {
    id: 'COSEVI',
    sigla: 'COSEVI / MOPT',
    nombre: 'Prueba Teórica de Manejo de Costa Rica',
    escala: 'Escala 0 - 100 pts (Aprobación mínima 80 pts)',
    color: 'from-emerald-600 to-green-950',
    icono: '🚗',
    descripcion: 'Ley de Tránsito 9078, rotondas, prioridades de paso, dispositivos y conducción eficiente.'
  }
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
    guiaPasoAPaso: 'Paso 1: Analizar la advertencia del texto: «investigar sin cuestionar sus propias premisas» lleva a un «ritual de confirmación».\nPaso 2: Por contraposición lógica, para evitar ese sesgo es indispensable examinar críticamente los propios supuestos iniciales.'
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
    guiaPasoAPaso: 'Paso 1: Establecer la relación base: El programador diseña y estructura una secuencia lógica de instrucciones llamada algoritmo.\nPaso 2: De igual manera, el compositor diseña y estructura una secuencia musical codificada llamada partitura.'
  },
  {
    id: 'ucr-mate-03',
    institucion: 'UCR_UNA',
    subarea: 'Razonamiento Matemático',
    area: 'Razonamiento Matemático (PAA)',
    dificultad: 'Alta',
    enunciado: 'En un colegio técnico, por cada 3 estudiantes de Desarrollo Web hay 5 de Contabilidad. Si en total ambas especialidades suman 160 estudiantes, ¿cuántos estudiantes pertenecen a Desarrollo Web?',
    opciones: ['48', '60', '96', '100'],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: Sumar las partes de la razón: 3 + 5 = 8 partes.\nPaso 2: Dividir el total entre las partes: 160 / 8 = 20 estudiantes por parte.\nPaso 3: Multiplicar por las 3 partes de Desarrollo Web: 3 × 20 = 60.'
  },
  {
    id: 'tec-verbal-01',
    institucion: 'TEC',
    subarea: 'Comprensión Científica y Silogismos',
    area: 'Razonamiento Verbal TEC',
    dificultad: 'Alta',
    enunciado: 'Premisa 1: Todos los sistemas encriptados con SHA-256 generan un resumen de longitud fija de 256 bits.\nPremisa 2: El expediente digital del CTP utiliza el estándar SHA-256.\n¿Cuál conclusión se deriva necesariamente de las premisas?',
    opciones: [
      'Cualquier resumen de 256 bits pertenece al expediente digital del CTP.',
      'El expediente digital del CTP genera un resumen criptográfico de longitud fija de 256 bits.',
      'El estándar SHA-256 solo funciona en expedientes educativos.',
      'Los sistemas que no son del CTP no pueden generar resúmenes de 256 bits.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: Aplicar Modus Ponens (Si todo A es B, y X es A, entonces X es B).\nPaso 2: Como el expediente del CTP está dentro del conjunto de sistemas SHA-256, necesariamente hereda la propiedad de generar un resumen de 256 bits.'
  },
  {
    id: 'tec-mate-02',
    institucion: 'TEC',
    subarea: 'Matemática Intensiva',
    area: 'Álgebra y Geometría TEC',
    dificultad: 'Alta',
    enunciado: 'Si una función cuadrática f(x) = x² - 6x + k tiene su vértice exactamente sobre el eje X (una única raíz real), ¿cuál es el valor de k?',
    opciones: ['3', '6', '9', '12'],
    correcta: 2,
    guiaPasoAPaso: 'Paso 1: Para que la parábola sea tangente al eje X, el discriminante Δ = b² - 4ac debe ser igual a 0.\nPaso 2: (-6)² - 4(1)(k) = 0 -> 36 - 4k = 0 -> k = 9.'
  },
  {
    id: 'utn-eng-01',
    institucion: 'UTN',
    subarea: 'Technical English for IT',
    area: 'Inglés Técnico UTN (Reading & Vocabulary)',
    dificultad: 'Media',
    enunciado: 'Read the following technical excerpt: "To prevent unauthorized data exfiltration, the network administrator must configure a strict outbound firewall rule and enforce multi-factor authentication (MFA)." According to the text, what is the primary purpose of these measures?',
    opciones: [
      'To increase the bandwidth speed of local switches.',
      'To stop sensitive information from being stolen or leaked to external networks.',
      'To replace the database server with a static HTML website.',
      'To allow anonymous users to bypass login credentials.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: Analizar el término técnico "prevent unauthorized data exfiltration" (prevenir la extracción/fuga no autorizada de datos).\nPaso 2: Esto equivale directamente a "stop sensitive information from being stolen or leaked".'
  },
  {
    id: 'utn-redes-02',
    institucion: 'UTN',
    subarea: 'Redes y Telecomunicaciones',
    area: 'Tecnología y Redes Aplicadas UTN',
    dificultad: 'Media',
    enunciado: 'En una red local del laboratorio de la UTN con máscara /26 (255.255.255.192), ¿cuántas direcciones IP utilizables (hosts válidos) se obtienen por cada subred?',
    opciones: ['30 hosts', '62 hosts', '64 hosts', '126 hosts'],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: Prefijo /26 deja 32 - 26 = 6 bits para host.\nPaso 2: Aplicar fórmula 2^n - 2 (restando red y broadcast): 2^6 - 2 = 64 - 2 = 62 hosts utilizables.'
  },
  {
    id: 'mep-01',
    institucion: 'MEP_CTP',
    subarea: 'Ciberseguridad y Ley 8968',
    area: 'Especialidades Técnicas MEP',
    dificultad: 'Alta',
    enunciado: 'Bajo el cumplimiento de la Ley 8968 (PRODHAB) en Costa Rica, ¿cuál es el principio que obliga a que un docente o padre de familia acceda únicamente a los registros estrictamente necesarios según su rol?',
    opciones: [
      'Principio de privilegio mínimo y consentimiento informado.',
      'Principio de libre difusión pública de bases de datos.',
      'Neutralidad de ancho de banda inalámbrico.',
      'Indexación abierta en motores de búsqueda.'
    ],
    correcta: 0,
    guiaPasoAPaso: 'Paso 1: En ciberseguridad y protección de datos personales (Ley 8968), el acceso basado en roles (RBAC) aplica el principio de mínimo privilegio y autodeterminación informativa.'
  },
  {
    id: 'cosevi-01',
    institucion: 'COSEVI',
    subarea: 'Normativa Vial',
    area: 'Seguridad Vial COSEVI',
    dificultad: 'Media',
    enunciado: 'Al aproximarse a una rotonda en Costa Rica, ¿quién tiene la prioridad de paso según la Ley de Tránsito?',
    opciones: [
      'El vehículo que intenta ingresar por el carril externo.',
      'El vehículo que ya circula dentro de la rotonda.',
      'El vehículo de carga pesada sin importar su carril.',
      'El vehículo que lleva las luces altas encendidas.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: En toda rotonda nacional, la prioridad de paso la tiene el vehículo que ya circula dentro del anillo vial.'
  }
];

// Bancos léxicos para generación infinita de Lectura, Analogías e Inglés Técnico
const BANCO_ANALOGIAS_INFINITAS = [
  { base: 'FIREWALL es a TRÁFICO MALICIOSO', correcta: 'Filtro es a impurezas', d1: 'Teclado es a monitor', d2: 'Cable es a electricidad', d3: 'Archivo es a carpeta', exp: 'Relación de función protectora: el firewall bloquea el tráfico malicioso tal como el filtro retiene las impurezas.' },
  { base: 'COMPILADOR es a CÓDIGO FUENTE', correcta: 'Traductor es a idioma extranjero', d1: 'Impresora es a tinta', d2: 'Antena es a satélite', d3: 'Batería es a voltaje', exp: 'Relación de transformación de lenguaje: el compilador traduce código fuente a código máquina, así como el traductor convierte de un idioma a otro.' },
  { base: 'ÍNDICE es a BASE DE DATOS', correcta: 'Catálogo es a biblioteca', d1: 'Página es a portada', d2: 'Servidor es a enfriamiento', d3: 'Router es a gabinete', exp: 'Relación de búsqueda acelerada: el índice acelera la localización de registros en una base de datos igual que el catálogo en una biblioteca.' },
  { base: ' AUDITORÍA es a TRANSPARENCIA', correcta: 'Vacuna es a inmunidad', d1: 'Fraude es a confianza', d2: 'Ruido es a silencio', d3: 'Sanción es a desorden', exp: 'Relación de medio a fin preventivo: la auditoría fomenta la transparencia institucional, así como la vacuna genera inmunidad.' }
];

const BANCO_INGLES_TECNICO_INFINITO = [
  {
    termino: 'Database Normalization (3NF)',
    contexto: 'In relational database design, applying Third Normal Form (3NF) eliminates transitive dependencies and reduces data redundancy.',
    pregunta: 'What is the main benefit of applying 3NF according to the statement?',
    correcta: 'It prevents duplicate data and ensures consistency across tables.',
    d1: 'It deletes all primary keys from the database schema.',
    d2: 'It converts SQL tables into uncompressed bitmap images.',
    d3: 'It disables encrypted backups on cloud servers.',
    exp: 'Paso 1: "Reduces data redundancy" significa reducir la duplicación de datos.\nPaso 2: Esto mantiene la integridad y consistencia entre las tablas relacionales.'
  },
  {
    termino: 'Asynchronous Programming (async/await)',
    contexto: 'When fetching data from a REST API in JavaScript, using async/await prevents the main UI thread from freezing while waiting for the server response.',
    pregunta: 'Why do developers use async/await in modern web applications?',
    correcta: 'To keep the user interface responsive during network requests.',
    d1: 'To block the browser until the user restarts the computer.',
    d2: 'To remove CSS styles from mobile devices.',
    d3: 'To force synchronous execution of all network packets.',
    exp: 'Paso 1: "Prevents the main UI thread from freezing" indica que evita que la interfaz se congele.\nPaso 2: Por lo tanto, mantiene la aplicación fluida y receptiva ("responsive").'
  },
  {
    termino: 'Zero-Trust Security Architecture',
    contexto: 'Under a Zero-Trust model, no user or device is trusted by default, even if they are connected inside the corporate local area network (LAN).',
    pregunta: 'Which statement best summarizes the Zero-Trust principle?',
    correcta: 'Always verify every access request regardless of network location.',
    d1: 'Grant automatic SuperAdmin privileges to all internal LAN users.',
    d2: 'Disable password requirements for local Wi-Fi connections.',
    d3: 'Only inspect traffic coming from outside the country.',
    exp: 'Paso 1: "No user or device is trusted by default" = Nunca confiar por defecto, verificar siempre cada solicitud.'
  }
];

export function generarItemInfinito(institucionId, contadorSemilla = 1, modalidadContenido = 'mixto') {
  const n1 = (contadorSemilla * 7) % 25 + 4;
  const n2 = (contadorSemilla * 13) % 15 + 3;

  // Determinar si toca verbal/inglés o matemático/técnico
  const usarVerbal = modalidadContenido === 'verbal' || (modalidadContenido === 'mixto' && contadorSemilla % 2 === 0);

  if (institucionId === 'UCR_UNA') {
    if (usarVerbal) {
      const itemAn = BANCO_ANALOGIAS_INFINITAS[contadorSemilla % BANCO_ANALOGIAS_INFINITAS.length];
      return {
        id: `inf-ucr-v-${Date.now()}-${contadorSemilla}`,
        institucion: 'UCR_UNA',
        subarea: 'Comprensión de Lectura y Analogías',
        area: 'Razonamiento Verbal Dinámico (UCR/UNA)',
        dificultad: 'Dinámica',
        enunciado: `[Reactivo Verbal #${contadorSemilla}] Analice la siguiente relación lógica en contexto académico: «${itemAn.base}». ¿Cuál de las siguientes opciones mantiene exactamente el mismo vínculo semántico y funcional?`,
        opciones: [itemAn.correcta, itemAn.d1, itemAn.d2, itemAn.d3],
        correcta: 0,
        guiaPasoAPaso: `Paso 1: Identificar la relación funcional del par base (${itemAn.base}).\nPaso 2: ${itemAn.exp}`
      };
    }

    const total = (n1 + n2) * 12;
    const correctaVal = n1 * 12;
    return {
      id: `inf-ucr-m-${Date.now()}-${contadorSemilla}`,
      institucion: 'UCR_UNA',
      subarea: 'Razonamiento Matemático',
      area: 'Razonamiento Matemático Dinámico (PAA)',
      dificultad: 'Dinámica',
      enunciado: `[Reactivo Matemático #${contadorSemilla}] En una convocatoria conjunta entre la UCR y la UNA, la razón de proyectos aprobados entre Biotecnología y Educación es de ${n1} a ${n2}. Si en total se aprobaron ${total} proyectos, ¿cuántos corresponden a Biotecnología?`,
      opciones: [
        String(correctaVal),
        String(correctaVal + 12),
        String(correctaVal - 6),
        String(n2 * 12)
      ],
      correcta: 0,
      guiaPasoAPaso: `Paso 1: Sumar las partes de la razón: ${n1} + ${n2} = ${n1 + n2} partes.\nPaso 2: Dividir el total (${total}) entre ${n1 + n2} = 12 proyectos por parte.\nPaso 3: Multiplicar las partes de Biotecnología (${n1} × 12) = ${correctaVal}.`
    };
  }

  if (institucionId === 'TEC') {
    if (usarVerbal) {
      return {
        id: `inf-tec-v-${Date.now()}-${contadorSemilla}`,
        institucion: 'TEC',
        subarea: 'Lógica Proposicional y Lectura Científica',
        area: 'Razonamiento Verbal y Lógico TEC',
        dificultad: 'Alta',
        enunciado: `[Silogismo Científico #${contadorSemilla}] Si un algoritmo tiene complejidad polinomial, entonces es tratable computacionalmente en el lote #${n1}. Se comprueba que el algoritmo Alfa NO es tratable computacionalmente en dicho lote. Por lo tanto, se concluye con certeza que:`,
        opciones: [
          'El algoritmo Alfa no tiene complejidad polinomial.',
          'El algoritmo Alfa es el más rápido del servidor.',
          'Todo algoritmo tratable carece de variables.',
          'La complejidad polinomial impide compilar en C++.'
        ],
        correcta: 0,
        guiaPasoAPaso: 'Paso 1: Aplicar Modus Tollens: Si P → Q, y ocurre ¬Q (no es tratable), entonces necesariamente ¬P (no tiene complejidad polinomial).'
      };
    }

    const x1 = n1;
    const x2 = n2;
    const suma = x1 + x2;
    const prod = x1 * x2;
    return {
      id: `inf-tec-m-${Date.now()}-${contadorSemilla}`,
      institucion: 'TEC',
      subarea: 'Matemática Intensiva TEC',
      area: 'Álgebra y Geometría Analítica TEC',
      dificultad: 'Alta',
      enunciado: `[Reactivo TEC #${contadorSemilla}] Si las dos raíces reales de la ecuación cuadrática x² - bx + c = 0 son x₁ = ${x1} y x₂ = ${x2}, ¿cuál es el valor numérico de (b + c)?`,
      opciones: [
        String(suma + prod),
        String(suma * prod),
        String(prod - suma),
        String(suma + prod + 10)
      ],
      correcta: 0,
      guiaPasoAPaso: `Paso 1: En x² - bx + c = 0, b es la suma de las raíces (${x1} + ${x2} = ${suma}) y c es el producto (${x1} × ${x2} = ${prod}).\nPaso 2: Por tanto, b + c = ${suma} + ${prod} = ${suma + prod}.`
    };
  }

  if (institucionId === 'UTN') {
    if (usarVerbal) {
      const eng = BANCO_INGLES_TECNICO_INFINITO[contadorSemilla % BANCO_INGLES_TECNICO_INFINITO.length];
      return {
        id: `inf-utn-eng-${Date.now()}-${contadorSemilla}`,
        institucion: 'UTN',
        subarea: 'Technical English for IT',
        area: `Inglés Técnico UTN — ${eng.termino}`,
        dificultad: 'Media',
        enunciado: `[Technical English #${contadorSemilla}] "${eng.contexto}" — ${eng.pregunta}`,
        opciones: [eng.correcta, eng.d1, eng.d2, eng.d3],
        correcta: 0,
        guiaPasoAPaso: eng.exp
      };
    }

    const bitsHost = (contadorSemilla % 5) + 3;
    const prefijo = 32 - bitsHost;
    const hostsValidos = Math.pow(2, bitsHost) - 2;
    return {
      id: `inf-utn-net-${Date.now()}-${contadorSemilla}`,
      institucion: 'UTN',
      subarea: 'Redes CCNA y Articulación UTN',
      area: 'Redes, TI y Lógica Aplicada UTN',
      dificultad: 'Media',
      enunciado: `[Reactivo UTN #${contadorSemilla}] En un laboratorio de ingeniería de la UTN se configura una subred IPv4 con máscara prefijo /${prefijo}. ¿Cuál es la cantidad exacta de direcciones de host utilizables?`,
      opciones: [
        `${hostsValidos} hosts utilizables`,
        `${hostsValidos + 2} hosts utilizables`,
        `${Math.pow(2, bitsHost + 1) - 2} hosts utilizables`,
        `${Math.max(2, hostsValidos - 4)} hosts utilizables`
      ],
      correcta: 0,
      guiaPasoAPaso: `Paso 1: Con prefijo /${prefijo}, quedan 32 - ${prefijo} = ${bitsHost} bits para host.\nPaso 2: Aplicando 2^${bitsHost} - 2, se obtienen ${hostsValidos} direcciones válidas.`
    };
  }

  const amperios = n2;
  const ohmios = n1;
  const voltios = amperios * ohmios;
  return {
    id: `inf-mep-${Date.now()}-${contadorSemilla}`,
    institucion: institucionId || 'MEP_CTP',
    subarea: 'Ciencias y Especialidades Técnicas',
    area: 'Práctica Guiada Técnica & Académica MEP',
    dificultad: 'Media',
    enunciado: `[Reactivo MEP #${contadorSemilla}] En un banco de pruebas del CTP circula una corriente de ${amperios} A por una resistencia de ${ohmios} Ω. Según la Ley de Ohm, ¿cuál es el voltaje medido?`,
    opciones: [
      `${voltios} V`,
      `${voltios + ohmios} V`,
      `${amperios + ohmios} V`,
      `${Math.round((ohmios / amperios) * 10) / 10} V`
    ],
    correcta: 0,
    guiaPasoAPaso: `Paso 1: Ley de Ohm: V = I × R.\nPaso 2: Multiplicar ${amperios} A × ${ohmios} Ω = ${voltios} V.`
  };
}

// Función oficial de cálculo diferenciado UCR/UNA vs TEC vs UTN/MEP
export function calcularPuntajeAdmision(institucionId, aciertos, respondidas, notaColegio = 90) {
  const porcentajeExamen = respondidas > 0 ? (aciertos / respondidas) * 100 : 0;
  const notaCol = Math.min(100, Math.max(0, Number(notaColegio) || 90));

  if (institucionId === 'UCR_UNA') {
    // UCR y UNA: Escala 200 a 800 (50% PAA + 50% Educación Diversificada)
    const promedioPonderado = (porcentajeExamen * 0.50) + (notaCol * 0.50);
    const puntaje800 = Math.round(200 + (promedioPonderado / 100) * 600);
    return {
      escalaMax: 800,
      puntajeFinal: puntaje800,
      porcentajeExamen: porcentajeExamen.toFixed(1),
      detalleFormula: `Fórmula Oficial UCR/UNA (200-800): 50% Examen PAA (${porcentajeExamen.toFixed(1)}%) + 50% Nota Educación Diversificada (${notaCol})`
    };
  }

  if (institucionId === 'TEC') {
    // TEC: Escala 200 a 800 (60% Examen de Admisión TEC + 40% Nota Educación Diversificada)
    const promedioPonderado = (porcentajeExamen * 0.60) + (notaCol * 0.40);
    const puntaje800 = Math.round(200 + (promedioPonderado / 100) * 600);
    return {
      escalaMax: 800,
      puntajeFinal: puntaje800,
      porcentajeExamen: porcentajeExamen.toFixed(1),
      detalleFormula: `Fórmula Oficial TEC (200-800): 60% Examen TEC (${porcentajeExamen.toFixed(1)}%) + 40% Nota Presentación Colegio (${notaCol})`
    };
  }

  // UTN, MEP_CTP, COSEVI en escala 0 a 100
  return {
    escalaMax: 100,
    puntajeFinal: Math.round(porcentajeExamen),
    porcentajeExamen: porcentajeExamen.toFixed(1),
    detalleFormula: `Calificación Directa Oficial (0-100): ${aciertos} aciertos de ${respondidas} reactivos resueltos.`
  };
}