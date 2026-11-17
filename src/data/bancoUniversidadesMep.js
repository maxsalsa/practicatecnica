export const CATALOGO_INSTITUCIONES_SUPERIOR = [
  {
    id: 'UCR_UNA',
    sigla: 'UCR / UNA',
    nombre: 'Prueba de Aptitud AcadÃ©mica (PAA)',
    escala: 'Escala 200 - 800 pts (50% PAA + 50% Nota Colegio)',
    color: 'from-sky-600 to-blue-900',
    icono: 'ðŸŒ»',
    descripcion: 'ComprensiÃ³n de lectura, analogÃ­as, silogismos y razonamiento matemÃ¡tico en contexto.'
  },
  {
    id: 'TEC',
    sigla: 'TEC',
    nombre: 'Examen de AdmisiÃ³n TecnolÃ³gico de Costa Rica',
    escala: 'Escala 200 - 800 pts (60% Examen TEC + 40% Nota Colegio)',
    color: 'from-red-600 to-rose-950',
    icono: 'âš™ï¸',
    descripcion: 'MatemÃ¡tica intensiva, geometrÃ­a analÃ­tica, lÃ³gica deductiva y comprensiÃ³n cientÃ­fica.'
  },
  {
    id: 'UTN',
    sigla: 'UTN',
    nombre: 'Ingreso y ArticulaciÃ³n â€” Universidad TÃ©cnica Nacional',
    escala: 'Escala 0 - 100 pts (InglÃ©s TÃ©cnico, Redes, TI y LÃ³gica)',
    color: 'from-indigo-600 to-slate-900',
    icono: 'ðŸ› ï¸',
    descripcion: 'Technical English for IT, subredes IPv4, bases de datos SQL y razonamiento aplicado.'
  },
  {
    id: 'UNED',
    sigla: 'UNED',
    nombre: 'AutoevaluaciÃ³n y NivelaciÃ³n â€” EducaciÃ³n a Distancia',
    escala: 'Escala 0 - 100 pts (AutonomÃ­a, Lectura y Competencias)',
    color: 'from-amber-600 to-yellow-950',
    icono: 'ðŸ“š',
    descripcion: 'Sin examen excluyente: diagnÃ³stico de comprensiÃ³n lectora, lÃ³gica y autorregulaciÃ³n universitaria.'
  },
  {
    id: 'MEP_CTP',
    sigla: 'MEP / CTP',
    nombre: 'Pruebas Nacionales y Especialidades TÃ©cnicas',
    escala: 'Escala 0 - 100 pts (Corte oficial 70 pts)',
    color: 'from-cyan-600 to-teal-950',
    icono: 'ðŸ¦‰',
    descripcion: 'Desarrollo Web, Ciberseguridad, Contabilidad, ElectrÃ³nica Industrial y Materias AcadÃ©micas.'
  },
  {
    id: 'COSEVI',
    sigla: 'COSEVI / MOPT',
    nombre: 'Prueba TeÃ³rica y Simulador Vial 2D (Moto, Carro, TrÃ¡iler)',
    escala: 'Escala 0 - 100 pts (AprobaciÃ³n mÃ­nima 80 pts)',
    color: 'from-emerald-600 to-green-950',
    icono: 'ðŸš—',
    descripcion: 'Ley de TrÃ¡nsito 9078, rotondas, prioridades de paso y simulador interactivo en Canvas 2D.'
  }
];

export const CORTES_HISTORICOS_CARRERAS = [
  { universidad: 'UCR', carrera: 'Medicina y CirugÃ­a', corte: 726, escala: 800, sede: 'Rodrigo Facio' },
  { universidad: 'UCR', carrera: 'Ciencias de la ComputaciÃ³n e InformÃ¡tica', corte: 645, escala: 800, sede: 'Rodrigo Facio / Alajuela' },
  { universidad: 'UCR', carrera: 'MicrobiologÃ­a y QuÃ­mica ClÃ­nica', corte: 692, escala: 800, sede: 'Rodrigo Facio' },
  { universidad: 'UCR', carrera: 'IngenierÃ­a ElÃ©ctrica / MecÃ¡nica', corte: 625, escala: 800, sede: 'Rodrigo Facio' },
  { universidad: 'UCR', carrera: 'Derecho / DirecciÃ³n de Empresas', corte: 598, escala: 800, sede: 'Rodrigo Facio / Sedes' },
  { universidad: 'UNA', carrera: 'IngenierÃ­a en Sistemas de InformaciÃ³n', corte: 610, escala: 800, sede: 'Campus Omar Dengo (Heredia)' },
  { universidad: 'UNA', carrera: 'Medicina Veterinaria', corte: 665, escala: 800, sede: 'Campus BenjamÃ­n NÃºÃ±ez' },
  { universidad: 'TEC', carrera: 'IngenierÃ­a en ComputaciÃ³n', corte: 678, escala: 800, sede: 'Cartago / San JosÃ© / Alajuela' },
  { universidad: 'TEC', carrera: 'IngenierÃ­a en MecatrÃ³nica', corte: 695, escala: 800, sede: 'Cartago' },
  { universidad: 'TEC', carrera: 'IngenierÃ­a en BiotecnologÃ­a', corte: 685, escala: 800, sede: 'Cartago' },
  { universidad: 'TEC', carrera: 'IngenierÃ­a en ElectrÃ³nica', corte: 635, escala: 800, sede: 'Cartago / San Carlos' },
  { universidad: 'TEC', carrera: 'AdministraciÃ³n de TecnologÃ­a de InformaciÃ³n (ATI)', corte: 615, escala: 800, sede: 'Cartago' },
  { universidad: 'UTN', carrera: 'IngenierÃ­a del Software / TecnologÃ­as InformÃ¡ticas', corte: 80, escala: 100, sede: 'Sede Central Alajuela' },
  { universidad: 'UTN', carrera: 'IngenierÃ­a en Ciberseguridad y Redes (ArticulaciÃ³n CTP)', corte: 82, escala: 100, sede: 'Sede Central Alajuela' },
  { universidad: 'UTN', carrera: 'ContadurÃ­a PÃºblica y Finanzas', corte: 75, escala: 100, sede: 'Sede Central Alajuela' },
  { universidad: 'UNED', carrera: 'IngenierÃ­a InformÃ¡tica (Ingreso Abierto con NivelaciÃ³n)', corte: 70, escala: 100, sede: 'Sedes Universitarias CR' }
];

export const ITEMS_SEMILLA_CURADOS = [
  {
    id: 'ucr-verbal-01',
    institucion: 'UCR_UNA',
    subarea: 'ComprensiÃ³n de Lectura',
    area: 'Razonamiento Verbal (Lectura CrÃ­tica)',
    dificultad: 'Alta',
    enunciado: 'Â«Quien investiga sin cuestionar sus propias premisas corre el riesgo de convertir el mÃ©todo cientÃ­fico en un simple ritual de confirmaciÃ³n.Â» Del fragmento anterior se deduce lÃ³gicamente que el progreso genuino en la investigaciÃ³n exige:',
    opciones: [
      'Prescindir del mÃ©todo cientÃ­fico para evitar los rituales acadÃ©micos.',
      'Someter a examen crÃ­tico incluso los supuestos iniciales del investigador.',
      'Confirmar Ãºnicamente aquellas hipÃ³tesis que cuenten con consenso previo.',
      'Reemplazar la observaciÃ³n empÃ­rica por la intuiciÃ³n filosÃ³fica.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: Analizar la advertencia del texto: Â«investigar sin cuestionar sus propias premisasÂ» lleva a un Â«ritual de confirmaciÃ³nÂ».\nPaso 2: Por contraposiciÃ³n lÃ³gica, es indispensable examinar crÃ­ticamente los propios supuestos iniciales.'
  },
  {
    id: 'ucr-analogia-02',
    institucion: 'UCR_UNA',
    subarea: 'AnalogÃ­as y Contexto Verbal',
    area: 'Razonamiento Verbal (AnalogÃ­as)',
    dificultad: 'Media',
    enunciado: 'Seleccione el par de palabras que presenta una relaciÃ³n analÃ³gica equivalente a la de la pareja base: ALGORITMO es a PROGRAMADOR como:',
    opciones: [
      'BisturÃ­ es a paciente',
      'Partitura es a compositor',
      'Ladrillo es a demoliciÃ³n',
      'SemÃ¡foro es a peatÃ³n'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: El programador diseÃ±a una secuencia codificada llamada algoritmo.\nPaso 2: El compositor diseÃ±a una secuencia musical codificada llamada partitura.'
  },
  {
    id: 'tec-verbal-01',
    institucion: 'TEC',
    subarea: 'ComprensiÃ³n CientÃ­fica y Silogismos',
    area: 'Razonamiento Verbal TEC',
    dificultad: 'Alta',
    enunciado: 'Premisa 1: Todos los sistemas encriptados con SHA-256 generan un resumen de longitud fija de 256 bits.\nPremisa 2: El expediente digital del CTP utiliza el estÃ¡ndar SHA-256.\nÂ¿CuÃ¡l conclusiÃ³n se deriva necesariamente de las premisas?',
    opciones: [
      'Cualquier resumen de 256 bits pertenece al expediente digital del CTP.',
      'El expediente digital del CTP genera un resumen criptogrÃ¡fico de longitud fija de 256 bits.',
      'El estÃ¡ndar SHA-256 solo funciona en expedientes educativos.',
      'Los sistemas que no son del CTP no pueden generar resÃºmenes de 256 bits.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: Aplicar Modus Ponens.\nPaso 2: El expediente del CTP hereda necesariamente la propiedad de generar un resumen de 256 bits.'
  },
  {
    id: 'utn-eng-01',
    institucion: 'UTN',
    subarea: 'Technical English for IT',
    area: 'InglÃ©s TÃ©cnico UTN (Reading & Vocabulary)',
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
    subarea: 'AutorregulaciÃ³n y Estudio Independiente',
    area: 'Competencias Universitarias UNED',
    dificultad: 'Media',
    enunciado: 'En el modelo de educaciÃ³n universitaria a distancia de la UNED, la mediaciÃ³n pedagÃ³gica se apoya en el aprendizaje autÃ³nomo. Esto implica que el estudiante exitoso debe:',
    opciones: [
      'Esperar a que el tutor presencial le dicte diariamente cada resumen en el aula.',
      'Planificar su cronograma, contrastar fuentes acadÃ©micas y autoevaluar su avance.',
      'Memorizar textualmente las guÃ­as sin aplicar los conceptos a proyectos reales.',
      'Estudiar Ãºnicamente el dÃ­a anterior a la entrega del proyecto final.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: La autonomÃ­a universitaria en la UNED requiere gestiÃ³n activa del tiempo, pensamiento crÃ­tico y autoevaluaciÃ³n constante.'
  },
  {
    id: 'mep-01',
    institucion: 'MEP_CTP',
    subarea: 'Ciberseguridad y Ley 8968',
    area: 'Especialidades TÃ©cnicas MEP',
    dificultad: 'Alta',
    enunciado: 'Bajo el cumplimiento de la Ley 8968 (PRODHAB) en Costa Rica, Â¿cuÃ¡l es el principio que obliga a que un usuario acceda Ãºnicamente a los registros estrictamente necesarios segÃºn su rol?',
    opciones: [
      'Principio de privilegio mÃ­nimo y autodeterminaciÃ³n informativa.',
      'Principio de libre difusiÃ³n pÃºblica de bases de datos.',
      'Neutralidad de ancho de banda inalÃ¡mbrico.',
      'IndexaciÃ³n abierta en motores de bÃºsqueda.'
    ],
    correcta: 0,
    guiaPasoAPaso: 'Paso 1: El control de acceso basado en roles (RBAC) protege los datos sensibles aplicando el privilegio mÃ­nimo.'
  },
  {
    id: 'cosevi-01',
    institucion: 'COSEVI',
    subarea: 'Prioridad de Paso en Rotondas',
    area: 'Seguridad Vial COSEVI / MOPT',
    dificultad: 'Media',
    enunciado: 'Si usted conduce una motocicleta, automÃ³vil o trÃ¡iler y va a ingresar a una rotonda en Costa Rica, Â¿cuÃ¡l es la norma obligatoria de prioridad y velocidad?',
    opciones: [
      'Tiene prioridad quien ingresa mÃ¡s rÃ¡pido a mÃ¡s de 60 km/h.',
      'Tiene prioridad el vehÃ­culo que ya circula dentro de la rotonda, a una velocidad mÃ¡xima de 30 km/h.',
      'Los trÃ¡ileres tienen prioridad absoluta para cortar todos los carriles internos sin ceder el paso.',
      'Se debe ingresar por el carril izquierdo para salir inmediatamente en la primera salida.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: En Costa Rica, la velocidad mÃ¡xima dentro de la rotonda es de 30 km/h y la prioridad de paso la tiene siempre el vehÃ­culo que ya circula dentro del anillo.'
  }
];

const BANCO_ANALOGIAS_INFINITAS = [
  { base: 'FIREWALL es a TRÃFICO MALICIOSO', correcta: 'Filtro es a impurezas', d1: 'Teclado es a monitor', d2: 'Cable es a electricidad', d3: 'Archivo es a carpeta', exp: 'RelaciÃ³n de funciÃ³n protectora: el firewall bloquea el trÃ¡fico malicioso tal como el filtro retiene las impurezas.' },
  { base: 'COMPILADOR es a CÃ“DIGO FUENTE', correcta: 'Traductor es a idioma extranjero', d1: 'Impresora es a tinta', d2: 'Antena es a satÃ©lite', d3: 'BaterÃ­a es a voltaje', exp: 'RelaciÃ³n de transformaciÃ³n de lenguaje: el compilador traduce cÃ³digo fuente a cÃ³digo mÃ¡quina, asÃ­ como el traductor convierte de un idioma a otro.' },
  { base: 'ÃNDICE es a BASE DE DATOS', correcta: 'CatÃ¡logo es a biblioteca', d1: 'PÃ¡gina es a portada', d2: 'Servidor es a enfriamiento', d3: 'Router es a gabinete', exp: 'RelaciÃ³n de bÃºsqueda acelerada: el Ã­ndice acelera la localizaciÃ³n de registros igual que el catÃ¡logo en una biblioteca.' },
  { base: 'AUDITORÃA es a TRANSPARENCIA', correcta: 'Vacuna es a inmunidad', d1: 'Fraude es a confianza', d2: 'Ruido es a silencio', d3: 'SanciÃ³n es a desorden', exp: 'RelaciÃ³n de medio preventivo a resultado: la auditorÃ­a fomenta la transparencia tal como la vacuna genera inmunidad.' },
  { base: 'PROTOCOLO es a COMUNICACIÃ“N', correcta: 'Reglamento es a convivencia', d1: 'Pantalla es a pÃ­xel', d2: 'Tornillo es a tuerca', d3: ' Nube es a lluvia', exp: 'RelaciÃ³n de norma reguladora: el protocolo ordena la comunicaciÃ³n de red igual que el reglamento ordena la convivencia.' }
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
    exp: 'Paso 1: Aislar cambios en ramas protege el cÃ³digo en producciÃ³n contra fallos.'
  }
];

export function generarItemInfinito(institucionId, contadorSemilla = 1, modalidadContenido = 'mixto') {
  const n1 = (contadorSemilla * 7) % 25 + 4;
  const n2 = (contadorSemilla * 13) % 15 + 3;
  const rotacionOpciones = contadorSemilla % 4;

  // FunciÃ³n auxiliar para rotar la posiciÃ³n de la respuesta correcta entre A, B, C y D
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
        subarea: 'ComprensiÃ³n de Lectura y AnalogÃ­as',
        area: `Razonamiento Verbal (${institucionId})`,
        dificultad: 'DinÃ¡mica',
        enunciado: `[Reactivo #${contadorSemilla}] Analice la relaciÃ³n lÃ³gica en contexto acadÃ©mico: Â«${itemAn.base}Â» (Serie #${contadorSemilla}). Â¿CuÃ¡l opciÃ³n mantiene el mismo vÃ­nculo semÃ¡ntico y funcional?`,
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
      subarea: 'Razonamiento MatemÃ¡tico',
      area: `Razonamiento MatemÃ¡tico (${institucionId})`,
      dificultad: 'DinÃ¡mica',
      enunciado: `[Reactivo #${contadorSemilla}] En una investigaciÃ³n universitaria, la proporciÃ³n de becas entre IngenierÃ­a y EducaciÃ³n es de ${n1} a ${n2}. Si en total se asignaron ${total} becas, Â¿cuÃ¡ntas corresponden a IngenierÃ­a?`,
      opciones: acomodo.opciones,
      correcta: acomodo.correcta,
      guiaPasoAPaso: `Paso 1: Sumar partes: ${n1} + ${n2} = ${n1 + n2}.\nPaso 2: Dividir ${total} / ${n1 + n2} = ${factor} por parte.\nPaso 3: Multiplicar ${n1} Ã— ${factor} = ${correctaVal}.`
    };
  }

  if (institucionId === 'TEC') {
    if (usarVerbal) {
      const acomodo = acomodarOpciones(
        `El mÃ³dulo #${contadorSemilla} no presenta vulnerabilidades de inyecciÃ³n SQL.`,
        [
          `El mÃ³dulo #${contadorSemilla} carece de conexiÃ³n a red.`,
          'Todo sistema auditado se ejecuta sin memoria RAM.',
          'Las pruebas de caja blanca eliminan el compilador.'
        ]
      );
      return {
        id: `inf-tec-v-${contadorSemilla}`,
        institucion: 'TEC',
        subarea: 'LÃ³gica Deductiva y Silogismos TEC',
        area: 'Razonamiento Verbal y LÃ³gico TEC',
        dificultad: 'Alta',
        enunciado: `[Reactivo TEC #${contadorSemilla}] Premisa 1: Si un mÃ³dulo supera la auditorÃ­a de caja blanca de BDS Devs, entonces no presenta vulnerabilidades de inyecciÃ³n SQL. Premisa 2: El mÃ³dulo #${contadorSemilla} superÃ³ la auditorÃ­a de caja blanca. Se deduce con certeza que:`,
        opciones: acomodo.opciones,
        correcta: acomodo.correcta,
        guiaPasoAPaso: 'Paso 1: Por Modus Ponens (Si P â†’ Q, y P es verdadero, entonces Q es necesariamente verdadero).'
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
      subarea: 'MatemÃ¡tica Intensiva TEC',
      area: 'Ãlgebra y GeometrÃ­a AnalÃ­tica TEC',
      dificultad: 'Alta',
      enunciado: `[Reactivo TEC #${contadorSemilla}] Si las dos raÃ­ces reales de la ecuaciÃ³n cuadrÃ¡tica xÂ² - bx + c = 0 son xâ‚ = ${x1} y xâ‚‚ = ${x2}, Â¿cuÃ¡l es el valor exacto de (b + c)?`,
      opciones: acomodo.opciones,
      correcta: acomodo.correcta,
      guiaPasoAPaso: `Paso 1: Por relaciones de Vieta, b = ${x1} + ${x2} = ${suma} y c = ${x1} Ã— ${x2} = ${prod}.\nPaso 2: Entonces b + c = ${suma + prod}.`
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
        area: `InglÃ©s TÃ©cnico UTN â€” ${eng.termino}`,
        dificultad: 'Media',
        enunciado: `[Technical English #${contadorSemilla}] "${eng.contexto}" â€” ${eng.pregunta}`,
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
      subarea: 'Redes CCNA y ArticulaciÃ³n UTN',
      area: 'Redes, TI y LÃ³gica Aplicada UTN',
      dificultad: 'Media',
      enunciado: `[Reactivo UTN #${contadorSemilla}] En un laboratorio de la UTN se configura una subred IPv4 con mÃ¡scara /${prefijo}. Â¿CuÃ¡l es la cantidad exacta de direcciones IP de host utilizables?`,
      opciones: acomodo.opciones,
      correcta: acomodo.correcta,
      guiaPasoAPaso: `Paso 1: Bits de host = 32 - ${prefijo} = ${bitsHost}.\nPaso 2: Hosts vÃ¡lidos = 2^${bitsHost} - 2 = ${hostsValidos}.`
    };
  }

  if (institucionId === 'COSEVI') {
    const distanciaSegundos = (contadorSemilla % 2 === 0) ? 'vehÃ­culo liviano o motocicleta (mÃ­nimo 2 segundos)' : 'vehÃ­culo pesado o trÃ¡iler articulado (mÃ­nimo 3 a 5 segundos)';
    const velRotonda = 30;
    const acomodo = acomodarOpciones(
      `Respetar los ${velRotonda} km/h en rotonda y mantener la regla de seguimiento para ${distanciaSegundos}.`,
      [
        'Acelerar a 80 km/h dentro del anillo de la rotonda para despejar la vÃ­a.',
        'Invadir el carril interno con el trÃ¡iler sin seÃ±alizar con direccionales.',
        'Detenerse por completo en medio del carril interno de la rotonda para dar paso.'
      ]
    );
    return {
      id: `inf-cosevi-${contadorSemilla}`,
      institucion: 'COSEVI',
      subarea: 'Maniobras Viales y Rotondas',
      area: 'EducaciÃ³n Vial COSEVI / MOPT',
      dificultad: 'Media',
      enunciado: `[Caso Vial #${contadorSemilla}] Al conducir un ${distanciaSegundos} aproximÃ¡ndose a una intersecciÃ³n tipo rotonda en Costa Rica, Â¿cuÃ¡l es la maniobra reglamentaria correcta?`,
      opciones: acomodo.opciones,
      correcta: acomodo.correcta,
      guiaPasoAPaso: 'Paso 1: En rotondas la velocidad mÃ¡xima es de 30 km/h, tiene prioridad quien ya circula adentro y debe conservarse la distancia de seguridad.'
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
    subarea: 'Especialidades TÃ©cnicas CTP',
    area: 'PrÃ¡ctica Guiada TÃ©cnica & AcadÃ©mica MEP',
    dificultad: 'Media',
    enunciado: `[Reactivo TÃ©cnico #${contadorSemilla}] En un circuito del taller del CTP circula una corriente de ${amperios} A por una resistencia de ${ohmios} Î©. SegÃºn la Ley de Ohm, Â¿cuÃ¡l es la tensiÃ³n medida?`,
    opciones: acomodo.opciones,
    correcta: acomodo.correcta,
    guiaPasoAPaso: `Paso 1: Ley de Ohm V = I Ã— R = ${amperios} A Ã— ${ohmios} Î© = ${voltios} V.`
  };
}

// Ensamblador exacto de Simulacros de 20, 30, 40 o 60 preguntas variadas
export function ensamblarSimulacroCompleto(institucionId, cantidadPreguntas = 10, modalidad = 'mixto') {
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
      detalleFormula: `FÃ³rmula Oficial UCR/UNA (200-800): 50% Examen PAA (${porcentajeExamen.toFixed(1)}%) + 50% Nota EducaciÃ³n Diversificada (${notaCol})`
    };
  }

  if (institucionId === 'TEC') {
    const promedioPonderado = (porcentajeExamen * 0.60) + (notaCol * 0.40);
    const puntaje800 = Math.round(200 + (promedioPonderado / 100) * 600);
    return {
      escalaMax: 800,
      puntajeFinal: puntaje800,
      porcentajeExamen: porcentajeExamen.toFixed(1),
      detalleFormula: `FÃ³rmula Oficial TEC (200-800): 60% Examen TEC (${porcentajeExamen.toFixed(1)}%) + 40% Nota PresentaciÃ³n Colegio (${notaCol})`
    };
  }

  return {
    escalaMax: 100,
    puntajeFinal: Math.round(porcentajeExamen),
    porcentajeExamen: porcentajeExamen.toFixed(1),
    detalleFormula: `CalificaciÃ³n Directa Oficial (0-100): ${aciertos} aciertos de ${respondidas} reactivos evaluados.`
  };
}