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
    descripcion: 'Matemática intensiva, geometría analítica, lógica deductiva y comprensión científica.'
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
    id: 'UNED',
    sigla: 'UNED',
    nombre: 'Autoevaluación y Nivelación — Educación a Distancia',
    escala: 'Escala 0 - 100 pts (Autonomía, Lectura y Competencias)',
    color: 'from-amber-600 to-yellow-950',
    icono: '📚',
    descripcion: 'Sin examen excluyente: diagnóstico de comprensión lectora, lógica y autorregulación universitaria.'
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
    nombre: 'Prueba Teórica y Simulador Vial 2D (Moto, Carro, Tráiler)',
    escala: 'Escala 0 - 100 pts (Aprobación mínima 80 pts)',
    color: 'from-emerald-600 to-green-950',
    icono: '🚗',
    descripcion: 'Ley de Tránsito 9078, rotondas, prioridades de paso y simulador interactivo en Canvas 2D.'
  }
];

export const CORTES_HISTORICOS_CARRERAS = [
  { universidad: 'UCR', carrera: 'Medicina y Cirugía', corte: 726, escala: 800, sede: 'Rodrigo Facio' },
  { universidad: 'UCR', carrera: 'Ciencias de la Computación e Informática', corte: 645, escala: 800, sede: 'Rodrigo Facio / Alajuela' },
  { universidad: 'UCR', carrera: 'Microbiología y Química Clínica', corte: 692, escala: 800, sede: 'Rodrigo Facio' },
  { universidad: 'UCR', carrera: 'Ingeniería Eléctrica / Mecánica', corte: 625, escala: 800, sede: 'Rodrigo Facio' },
  { universidad: 'UCR', carrera: 'Derecho / Dirección de Empresas', corte: 598, escala: 800, sede: 'Rodrigo Facio / Sedes' },
  { universidad: 'UNA', carrera: 'Ingeniería en Sistemas de Información', corte: 610, escala: 800, sede: 'Campus Omar Dengo (Heredia)' },
  { universidad: 'UNA', carrera: 'Medicina Veterinaria', corte: 665, escala: 800, sede: 'Campus Benjamín Núñez' },
  { universidad: 'TEC', carrera: 'Ingeniería en Computación', corte: 678, escala: 800, sede: 'Cartago / San José / Alajuela' },
  { universidad: 'TEC', carrera: 'Ingeniería en Mecatrónica', corte: 695, escala: 800, sede: 'Cartago' },
  { universidad: 'TEC', carrera: 'Ingeniería en Biotecnología', corte: 685, escala: 800, sede: 'Cartago' },
  { universidad: 'TEC', carrera: 'Ingeniería en Electrónica', corte: 635, escala: 800, sede: 'Cartago / San Carlos' },
  { universidad: 'TEC', carrera: 'Administración de Tecnología de Información (ATI)', corte: 615, escala: 800, sede: 'Cartago' },
  { universidad: 'UTN', carrera: 'Ingeniería del Software / Tecnologías Informáticas', corte: 80, escala: 100, sede: 'Sede Central Alajuela' },
  { universidad: 'UTN', carrera: 'Ingeniería en Ciberseguridad y Redes (Articulación CTP)', corte: 82, escala: 100, sede: 'Sede Central Alajuela' },
  { universidad: 'UTN', carrera: 'Contaduría Pública y Finanzas', corte: 75, escala: 100, sede: 'Sede Central Alajuela' },
  { universidad: 'UNED', carrera: 'Ingeniería Informática (Ingreso Abierto con Nivelación)', corte: 70, escala: 100, sede: 'Sedes Universitarias CR' }
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
    guiaPasoAPaso: 'Paso 1: Analizar la advertencia del texto: «investigar sin cuestionar sus propias premisas» lleva a un «ritual de confirmación».\nPaso 2: Por contraposición lógica, es indispensable examinar críticamente los propios supuestos iniciales.'
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
    guiaPasoAPaso: 'Paso 1: El programador diseña una secuencia codificada llamada algoritmo.\nPaso 2: El compositor diseña una secuencia musical codificada llamada partitura.'
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
    guiaPasoAPaso: 'Paso 1: Aplicar Modus Ponens.\nPaso 2: El expediente del CTP hereda necesariamente la propiedad de generar un resumen de 256 bits.'
  },
  {
    id: 'utn-eng-01',
    institucion: 'UTN',
    subarea: 'Technical English for IT',
    area: 'Inglés Técnico UTN (Reading & Vocabulary)',
    dificultad: 'Media',
    enunciado: 'Read the following technical excerpt: "To prevent unauthorized data exfiltration, the network administrator must configure a strict outbound firewall rule and enforce multi-factor authentication (MFA)." What is the primary purpose of these measures?',
    opciones: [
      'To increase the bandwidth speed of local switches.',
      'To stop sensitive information from being stolen or leaked to external networks.',
      'To replace the database server with a static HTML website.',
      'To allow anonymous users to bypass login credentials.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: "Prevent unauthorized data exfiltration" significa impedir la fuga o robo de datos sensibles hacia el exterior.'
  },
  {
    id: 'uned-01',
    institucion: 'UNED',
    subarea: 'Autorregulación y Estudio Independiente',
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
    guiaPasoAPaso: 'Paso 1: La autonomía universitaria en la UNED requiere gestión activa del tiempo, pensamiento crítico y autoevaluación constante.'
  },
  {
    id: 'mep-01',
    institucion: 'MEP_CTP',
    subarea: 'Ciberseguridad y Ley 8968',
    area: 'Especialidades Técnicas MEP',
    dificultad: 'Alta',
    enunciado: 'Bajo el cumplimiento de la Ley 8968 (PRODHAB) en Costa Rica, ¿cuál es el principio que obliga a que un usuario acceda únicamente a los registros estrictamente necesarios según su rol?',
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
    enunciado: 'Si usted conduce una motocicleta, automóvil o tráiler y va a ingresar a una rotonda en Costa Rica, ¿cuál es la norma obligatoria de prioridad y velocidad?',
    opciones: [
      'Tiene prioridad quien ingresa más rápido a más de 60 km/h.',
      'Tiene prioridad el vehículo que ya circula dentro de la rotonda, a una velocidad máxima de 30 km/h.',
      'Los tráileres tienen prioridad absoluta para cortar todos los carriles internos sin ceder el paso.',
      'Se debe ingresar por el carril izquierdo para salir inmediatamente en la primera salida.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: En Costa Rica, la velocidad máxima dentro de la rotonda es de 30 km/h y la prioridad de paso la tiene siempre el vehículo que ya circula dentro del anillo.'
  }
];

const BANCO_ANALOGIAS_INFINITAS = [
  { base: 'FIREWALL es a TRÁFICO MALICIOSO', correcta: 'Filtro es a impurezas', d1: 'Teclado es a monitor', d2: 'Cable es a electricidad', d3: 'Archivo es a carpeta', exp: 'Relación de función protectora: el firewall bloquea el tráfico malicioso tal como el filtro retiene las impurezas.' },
  { base: 'COMPILADOR es a CÓDIGO FUENTE', correcta: 'Traductor es a idioma extranjero', d1: 'Impresora es a tinta', d2: 'Antena es a satélite', d3: 'Batería es a voltaje', exp: 'Relación de transformación de lenguaje: el compilador traduce código fuente a código máquina, así como el traductor convierte de un idioma a otro.' },
  { base: 'ÍNDICE es a BASE DE DATOS', correcta: 'Catálogo es a biblioteca', d1: 'Página es a portada', d2: 'Servidor es a enfriamiento', d3: 'Router es a gabinete', exp: 'Relación de búsqueda acelerada: el índice acelera la localización de registros igual que el catálogo en una biblioteca.' },
  { base: 'AUDITORÍA es a TRANSPARENCIA', correcta: 'Vacuna es a inmunidad', d1: 'Fraude es a confianza', d2: 'Ruido es a silencio', d3: 'Sanción es a desorden', exp: 'Relación de medio preventivo a resultado: la auditoría fomenta la transparencia tal como la vacuna genera inmunidad.' },
  { base: 'PROTOCOLO es a COMUNICACIÓN', correcta: 'Reglamento es a convivencia', d1: 'Pantalla es a píxel', d2: 'Tornillo es a tuerca', d3: ' Nube es a lluvia', exp: 'Relación de norma reguladora: el protocolo ordena la comunicación de red igual que el reglamento ordena la convivencia.' }
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
    exp: 'Paso 1: "Reduces data redundancy" significa evitar duplicidad de datos y asegurar consistencia.'
  },
  {
    termino: 'Asynchronous Programming (async/await)',
    contexto: 'When fetching data from a REST API in JavaScript, using async/await prevents the main UI thread from freezing while waiting for the server response.',
    pregunta: 'Why do developers use async/await in modern web applications?',
    correcta: 'To keep the user interface responsive during network requests.',
    d1: 'To block the browser until the user restarts the computer.',
    d2: 'To remove CSS styles from mobile devices.',
    d3: 'To force synchronous execution of all network packets.',
    exp: 'Paso 1: "Prevents the main UI thread from freezing" = Mantiene la interfaz fluida y receptiva.'
  },
  {
    termino: 'Zero-Trust Security Architecture',
    contexto: 'Under a Zero-Trust model, no user or device is trusted by default, even if they are connected inside the corporate local area network (LAN).',
    pregunta: 'Which statement best summarizes the Zero-Trust principle?',
    correcta: 'Always verify every access request regardless of network location.',
    d1: 'Grant automatic SuperAdmin privileges to all internal LAN users.',
    d2: 'Disable password requirements for local Wi-Fi connections.',
    d3: 'Only inspect traffic coming from outside the country.',
    exp: 'Paso 1: "No user or device is trusted by default" = Verificar siempre cada solicitud sin importar la red.'
  },
  {
    termino: 'Version Control & Git Branching',
    contexto: 'Creating an isolated feature branch in Git allows engineers to develop and test new modules without breaking the production main branch.',
    pregunta: 'What is the primary advantage of using feature branches?',
    correcta: 'It protects the stability of the main production code while developing new features.',
    d1: 'It automatically deletes the remote repository after every commit.',
    d2: 'It replaces the need for automated QA testing.',
    d3: 'It prevents multiple developers from working on the same project.',
    exp: 'Paso 1: Aislar cambios en ramas protege el código en producción contra fallos.'
  }
];

export function generarItemInfinito(institucionId, contadorSemilla = 1, modalidadContenido = 'mixto') {
  const n1 = (contadorSemilla * 7) % 25 + 4;
  const n2 = (contadorSemilla * 13) % 15 + 3;
  const rotacionOpciones = contadorSemilla % 4;

  // Función auxiliar para rotar la posición de la respuesta correcta entre A, B, C y D
  const acomodarOpciones = (correctaStr, distractores) => {
    const todas = [...distractores];
    todas.splice(rotacionOpciones, 0, correctaStr);
    return { opciones: todas.slice(0, 4), correcta: rotacionOpciones };
  };

  const usarVerbal = modalidadContenido === 'verbal' || (modalidadContenido === 'mixto' && contadorSemilla % 2 === 0);

  if (institucionId === 'UCR_UNA' || institucionId === 'UNED') {
    if (usarVerbal) {
      const itemAn = BANCO_ANALOGIAS_INFINITAS[contadorSemilla % BANCO_ANALOGIAS_INFINITAS.length];
      const acomodo = acomodarOpciones(itemAn.correcta, [itemAn.d1, itemAn.d2, itemAn.d3]);
      return {
        id: `inf-${institucionId}-v-${contadorSemilla}`,
        institucion: institucionId,
        subarea: 'Comprensión de Lectura y Analogías',
        area: `Razonamiento Verbal (${institucionId})`,
        dificultad: 'Dinámica',
        enunciado: `[Reactivo #${contadorSemilla}] Analice la relación lógica en contexto académico: «${itemAn.base}» (Serie #${contadorSemilla}). ¿Cuál opción mantiene el mismo vínculo semántico y funcional?`,
        opciones: acomodo.opciones,
        correcta: acomodo.correcta,
        guiaPasoAPaso: `Paso 1: Analizar el par base (${itemAn.base}).\nPaso 2: ${itemAn.exp}`
      };
    }

    const factor = (contadorSemilla % 9) + 6;
    const total = (n1 + n2) * factor;
    const correctaVal = n1 * factor;
    const acomodo = acomodarOpciones(String(correctaVal), [
      String(correctaVal + factor),
      String(Math.max(1, correctaVal - factor)),
      String(n2 * factor)
    ]);
    return {
      id: `inf-${institucionId}-m-${contadorSemilla}`,
      institucion: institucionId,
      subarea: 'Razonamiento Matemático',
      area: `Razonamiento Matemático (${institucionId})`,
      dificultad: 'Dinámica',
      enunciado: `[Reactivo #${contadorSemilla}] En una investigación universitaria, la proporción de becas entre Ingeniería y Educación es de ${n1} a ${n2}. Si en total se asignaron ${total} becas, ¿cuántas corresponden a Ingeniería?`,
      opciones: acomodo.opciones,
      correcta: acomodo.correcta,
      guiaPasoAPaso: `Paso 1: Sumar partes: ${n1} + ${n2} = ${n1 + n2}.\nPaso 2: Dividir ${total} / ${n1 + n2} = ${factor} por parte.\nPaso 3: Multiplicar ${n1} × ${factor} = ${correctaVal}.`
    };
  }

  if (institucionId === 'TEC') {
    if (usarVerbal) {
      const acomodo = acomodarOpciones(
        `El módulo #${contadorSemilla} no presenta vulnerabilidades de inyección SQL.`,
        [
          `El módulo #${contadorSemilla} carece de conexión a red.`,
          'Todo sistema auditado se ejecuta sin memoria RAM.',
          'Las pruebas de caja blanca eliminan el compilador.'
        ]
      );
      return {
        id: `inf-tec-v-${contadorSemilla}`,
        institucion: 'TEC',
        subarea: 'Lógica Deductiva y Silogismos TEC',
        area: 'Razonamiento Verbal y Lógico TEC',
        dificultad: 'Alta',
        enunciado: `[Reactivo TEC #${contadorSemilla}] Premisa 1: Si un módulo supera la auditoría de caja blanca de BDS Devs, entonces no presenta vulnerabilidades de inyección SQL. Premisa 2: El módulo #${contadorSemilla} superó la auditoría de caja blanca. Se deduce con certeza que:`,
        opciones: acomodo.opciones,
        correcta: acomodo.correcta,
        guiaPasoAPaso: 'Paso 1: Por Modus Ponens (Si P → Q, y P es verdadero, entonces Q es necesariamente verdadero).'
      };
    }

    const x1 = n1;
    const x2 = n2;
    const suma = x1 + x2;
    const prod = x1 * x2;
    const acomodo = acomodarOpciones(String(suma + prod), [
      String(suma * prod),
      String(Math.abs(prod - suma)),
      String(suma + prod + 12)
    ]);
    return {
      id: `inf-tec-m-${contadorSemilla}`,
      institucion: 'TEC',
      subarea: 'Matemática Intensiva TEC',
      area: 'Álgebra y Geometría Analítica TEC',
      dificultad: 'Alta',
      enunciado: `[Reactivo TEC #${contadorSemilla}] Si las dos raíces reales de la ecuación cuadrática x² - bx + c = 0 son x₁ = ${x1} y x₂ = ${x2}, ¿cuál es el valor exacto de (b + c)?`,
      opciones: acomodo.opciones,
      correcta: acomodo.correcta,
      guiaPasoAPaso: `Paso 1: Por relaciones de Vieta, b = ${x1} + ${x2} = ${suma} y c = ${x1} × ${x2} = ${prod}.\nPaso 2: Entonces b + c = ${suma + prod}.`
    };
  }

  if (institucionId === 'UTN') {
    if (usarVerbal) {
      const eng = BANCO_INGLES_TECNICO_INFINITO[contadorSemilla % BANCO_INGLES_TECNICO_INFINITO.length];
      const acomodo = acomodarOpciones(eng.correcta, [eng.d1, eng.d2, eng.d3]);
      return {
        id: `inf-utn-eng-${contadorSemilla}`,
        institucion: 'UTN',
        subarea: 'Technical English for IT',
        area: `Inglés Técnico UTN — ${eng.termino}`,
        dificultad: 'Media',
        enunciado: `[Technical English #${contadorSemilla}] "${eng.contexto}" — ${eng.pregunta}`,
        opciones: acomodo.opciones,
        correcta: acomodo.correcta,
        guiaPasoAPaso: eng.exp
      };
    }

    const bitsHost = (contadorSemilla % 6) + 3; // 3 a 8 bits
    const prefijo = 32 - bitsHost;
    const hostsValidos = Math.pow(2, bitsHost) - 2;
    const acomodo = acomodarOpciones(`${hostsValidos} hosts utilizables`, [
      `${hostsValidos + 2} hosts utilizables`,
      `${Math.pow(2, bitsHost + 1) - 2} hosts utilizables`,
      `${Math.max(2, hostsValidos - 6)} hosts utilizables`
    ]);
    return {
      id: `inf-utn-net-${contadorSemilla}`,
      institucion: 'UTN',
      subarea: 'Redes CCNA y Articulación UTN',
      area: 'Redes, TI y Lógica Aplicada UTN',
      dificultad: 'Media',
      enunciado: `[Reactivo UTN #${contadorSemilla}] En un laboratorio de la UTN se configura una subred IPv4 con máscara /${prefijo}. ¿Cuál es la cantidad exacta de direcciones IP de host utilizables?`,
      opciones: acomodo.opciones,
      correcta: acomodo.correcta,
      guiaPasoAPaso: `Paso 1: Bits de host = 32 - ${prefijo} = ${bitsHost}.\nPaso 2: Hosts válidos = 2^${bitsHost} - 2 = ${hostsValidos}.`
    };
  }

  if (institucionId === 'COSEVI') {
    const distanciaSegundos = (contadorSemilla % 2 === 0) ? 'vehículo liviano o motocicleta (mínimo 2 segundos)' : 'vehículo pesado o tráiler articulado (mínimo 3 a 5 segundos)';
    const velRotonda = 30;
    const acomodo = acomodarOpciones(
      `Respetar los ${velRotonda} km/h en rotonda y mantener la regla de seguimiento para ${distanciaSegundos}.`,
      [
        'Acelerar a 80 km/h dentro del anillo de la rotonda para despejar la vía.',
        'Invadir el carril interno con el tráiler sin señalizar con direccionales.',
        'Detenerse por completo en medio del carril interno de la rotonda para dar paso.'
      ]
    );
    return {
      id: `inf-cosevi-${contadorSemilla}`,
      institucion: 'COSEVI',
      subarea: 'Maniobras Viales y Rotondas',
      area: 'Educación Vial COSEVI / MOPT',
      dificultad: 'Media',
      enunciado: `[Caso Vial #${contadorSemilla}] Al conducir un ${distanciaSegundos} aproximándose a una intersección tipo rotonda en Costa Rica, ¿cuál es la maniobra reglamentaria correcta?`,
      opciones: acomodo.opciones,
      correcta: acomodo.correcta,
      guiaPasoAPaso: 'Paso 1: En rotondas la velocidad máxima es de 30 km/h, tiene prioridad quien ya circula adentro y debe conservarse la distancia de seguridad.'
    };
  }

  const amperios = n2;
  const ohmios = n1;
  const voltios = amperios * ohmios;
  const acomodo = acomodarOpciones(`${voltios} V`, [
    `${voltios + ohmios} V`,
    `${amperios + ohmios} V`,
    `${voltios * 2} V`
  ]);
  return {
    id: `inf-mep-${contadorSemilla}`,
    institucion: institucionId || 'MEP_CTP',
    subarea: 'Especialidades Técnicas CTP',
    area: 'Práctica Guiada Técnica & Académica MEP',
    dificultad: 'Media',
    enunciado: `[Reactivo Técnico #${contadorSemilla}] En un circuito del taller del CTP circula una corriente de ${amperios} A por una resistencia de ${ohmios} Ω. Según la Ley de Ohm, ¿cuál es la tensión medida?`,
    opciones: acomodo.opciones,
    correcta: acomodo.correcta,
    guiaPasoAPaso: `Paso 1: Ley de Ohm V = I × R = ${amperios} A × ${ohmios} Ω = ${voltios} V.`
  };
}

// Ensamblador exacto de Simulacros de 20, 30, 40 o 60 preguntas variadas
export function ensamblarSimulacroCompleto(institucionId, cantidadPreguntas = 20, modalidad = 'mixto') {
  const totalMeta = Number(cantidadPreguntas) || 20;
  const semillasBase = ITEMS_SEMILLA_CURADOS.filter(i => i.institucion === institucionId);
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
    const promedioPonderado = (porcentajeExamen * 0.60) + (notaCol * 0.40);
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