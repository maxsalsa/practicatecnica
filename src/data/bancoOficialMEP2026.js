export const DICCIONARIO_UI = {
  ES: {
    agradecimiento: 'Creado con gratitud, excelencia Kaizen y cortesia profesional para toda Costa Rica',
    subtituloHeader: '3 Practicas Guiadas (3 Intentos) + 2 Simulacros Ciegos de 60 Preguntas + Generador Infinito PISA/MEP',
    buscarPlaceholder: 'Buscar letra por letra: codigo (1001, 2003), materia, nivel (Facil, Intermedio, Alto, DUA)...',
    tabPracticas: '1. 3 Practicas Guiadas (3 Intentos)',
    tabSimulacros: '2. 2 Simulacros de 60 Items (Certificacion)',
    tabGenerador: '3. Generador Infinito 1000x1000 + Cargar',
    tabPisa: '4. Reglas MEP, PISA y Certificaciones',
    tabJuegos: '5. 5 Juegos + Plan MEP + Empresa',
    btnGoogleLogin: 'Acceder con Google',
    btnMejorarPro: 'Activar PRO (Google Pay)',
    badgeSuperAdmin: 'SUPER ADMIN - Max Salazar Sanchez',
    badgeProActivo: 'PLAN PRO ACTIVO'
  },
  EN: {
    agradecimiento: 'Built with gratitude, Kaizen excellence, and professional courtesy for Costa Rica',
    subtituloHeader: '3 Guided Practices (3 Attempts) + 2 Blind 60-Question Mock Exams + Infinite PISA/MEP Generator',
    buscarPlaceholder: 'Search letter by letter: code (1001, 2003), subject, level (Easy, Intermediate, High, UDL)...',
    tabPracticas: '1. 3 Guided Practices (3 Attempts)',
    tabSimulacros: '2. 2 Mock Exams of 60 Items (Certification)',
    tabGenerador: '3. Infinite 1000x1000 Generator + Upload',
    tabPisa: '4. MEP Rules, PISA & Certifications',
    tabJuegos: '5. 5 Games + Lesson Plan + Soft Skills',
    btnGoogleLogin: 'Sign in with Google',
    btnMejorarPro: 'Upgrade to PRO (Google Pay)',
    badgeSuperAdmin: 'SUPER ADMIN - Max Salazar Sanchez',
    badgeProActivo: 'PRO PLAN ACTIVE'
  }
};

export const NIVELES_DIFICULTAD = [
  { id: 'TODOS', nombre: 'Todos los Niveles', color: 'bg-slate-800 text-slate-200' },
  { id: 'DUA', nombre: 'Nivel DUA (Acceso Guiado)', color: 'bg-teal-900/60 text-teal-300 border-teal-500' },
  { id: 'FACIL', nombre: 'Nivel Facil (Base)', color: 'bg-emerald-900/60 text-emerald-300 border-emerald-500' },
  { id: 'MEDIANO', nombre: 'Nivel Mediano (Procedimental)', color: 'bg-cyan-900/60 text-cyan-300 border-cyan-500' },
  { id: 'INTERMEDIO', nombre: 'Nivel Intermedio (Analisis)', color: 'bg-amber-900/60 text-amber-300 border-amber-500' },
  { id: 'ALTO', nombre: 'Nivel Alto (PISA / Certificacion)', color: 'bg-purple-900/60 text-purple-300 border-purple-500' }
];

export const ESPECIALIDADES_CATALOGO = [
  { codigo: '1001', familia: 'ETP_AGRO', nombreES: 'Agroecologia', nombreEN: 'Agroecology' },
  { codigo: '1003', familia: 'ETP_AGRO', nombreES: 'Agroindustria Agricola', nombreEN: 'Crop Food Processing' },
  { codigo: '1004', familia: 'ETP_AGRO', nombreES: 'Agroindustria Pecuaria', nombreEN: 'Livestock Food Processing' },
  { codigo: '1005', familia: 'ETP_AGRO', nombreES: 'Agrojardineria', nombreEN: 'Landscaping & Gardening' },
  { codigo: '1009', familia: 'ETP_AGRO', nombreES: 'Produccion Agricola y Pecuaria', nombreEN: 'Crop & Livestock Production' },
  { codigo: '2003', familia: 'ETP_IND', nombreES: 'Construccion Civil', nombreEN: 'Civil Construction' },
  { codigo: '2005', familia: 'ETP_IND', nombreES: 'Dibujo Tecnico', nombreEN: 'Technical Drafting' },
  { codigo: '2006', familia: 'ETP_IND', nombreES: 'Dibujo y Modelado Edificaciones', nombreEN: 'Building Modeling & BIM' },
  { codigo: '2007', familia: 'ETP_ART', nombreES: 'Diseno Grafico', nombreEN: 'Graphic Design' },
  { codigo: '2008', familia: 'ETP_ART', nombreES: 'Diseno Publicitario', nombreEN: 'Advertising Design' },
  { codigo: '4001', familia: 'ETP_TI', nombreES: 'Desarrollo Web y Software', nombreEN: 'Web & Software Development' },
  { codigo: '4002', familia: 'ETP_TI', nombreES: 'Ciberseguridad y Redes', nombreEN: 'Cybersecurity & Networks' },
  { codigo: 'SEC-MAT', familia: 'ACADEMICA', nombreES: 'Matematicas (Primaria y Secundaria)', nombreEN: 'Mathematics (K-12)' },
  { codigo: 'SEC-CIE', familia: 'ACADEMICA', nombreES: 'Ciencias (Fisica, Quimica, Biologia)', nombreEN: 'Sciences (Physics, Chem, Bio)' },
  { codigo: 'SEC-SOC', familia: 'ACADEMICA', nombreES: 'Estudios Sociales y Civica', nombreEN: 'Social Studies & Civics' },
  { codigo: 'ADM-PISA', familia: 'ADMISION', nombreES: 'PISA + Admision UCR/TEC/UNA', nombreEN: 'PISA & University Admission' }
];

export const LINEAMIENTOS_EVALUACION = [
  {
    categoria: '1. Reglas Oficiales de la Prueba Nacional Estandarizada MEP (Convocatoria 2026)',
    reglas: [
      'Composicion oficial: La prueba consta exactamente de 60 items de seleccion unica con cuatro opciones (A, B, C y D), donde solo una es correcta.',
      'Integridad del cuadernillo: La persona estudiante debe verificar que no existan paginas faltantes, repetidas o en blanco antes de iniciar.',
      'Regla de Simulacro Oficial en pracTICAtecnica.com: Se disponen de 2 Simulacros Oficiales de 60 preguntas aleatorias. Durante su ejecucion NO se muestran notas ni explicaciones hasta contestar y entregar la totalidad de la prueba.',
      'Regla de Practica Guiada: Se disponen de 3 Practicas Guiadas (3 intentos por practica) con retroalimentacion inmediata del concepto, la formula y la respuesta correcta.',
      'Protocolo de correccion en hoja optica: En formato fisico se rellena el circulo con boligrafo negro o azul y cualquier cambio requiere firma en observaciones (Ejemplo: 12=A, firma).'
    ]
  },
  {
    categoria: '2. Lineamientos Internacionales PISA (OCDE) y Niveles de Desempeno',
    reglas: [
      'Nivel DUA y Nivel 1-2 (Facil): Localizar informacion explicita, reconocer conceptos basicos cotidianos y ejecutar procedimientos de un solo paso con apoyo visual.',
      'Nivel 3-4 (Mediano e Intermedio): Integrar variables de un escenario real (pendientes, pH, escalas, presupuestos), seleccionar modelos tecnicos y descartar distractores.',
      'Nivel 5-6 (Alto / Certificacion): Evaluar criticamente sistemas complejos, sintetizar multiples fuentes normativas (Leyes, ISO, HACCP, Codigos) y transferir soluciones a contextos ineditos.'
    ]
  },
  {
    categoria: '3. Estandares de Certificacion Internacional y Normativa Costarricense',
    reglas: [
      'Calidad, Ambiente e Inocuidad: ISO 9001 (Calidad), ISO 14001 (Gestion Ambiental), ISO 22000 / Codex Alimentarius / HACCP (Puntos Criticos de Control y Prerrequisitos).',
      'Ingenieria, Construccion y Electricidad: Codigo Sismico de Costa Rica, ASTM C-143 (Cono de Abrams), Codigo Electrico Nacional NEC (neutro blanco), Ley N. 7600 y NFPA 101.',
      'Legislacion Agroambiental y Laboral: Ley N. 8591 (Agricultura Organica SFE), Ley N. 7779 (Uso y Conservacion de Suelos), SINAC y Codigo de Trabajo de Costa Rica.'
    ]
  }
];

export const CONTEXTOS_REGIONALES = {
  limon: {
    nombreES: 'Costero / Limon',
    enfoqueES: 'Logistica portuaria, precipitacion de 3600-4000 mm, corrosion salina, cacao, banano, pesca y costas.',
    retoES: 'Controlar condensacion de vapor y alta humedad a 25 C en infraestructura costera.'
  },
  rural: {
    nombreES: 'Rural / Altura y Bajura',
    enfoqueES: 'Cooperativas agricolas, laderas del 12% al 15% con barreras de vetiver, riego en tropico seco y lacteos.',
    retoES: 'Optimizar rendimiento productivo y conservacion de suelo en parcelas inclinadas.'
  },
  indigena: {
    nombreES: 'Indigena / Bosque',
    enfoqueES: 'Sistemas agrosilvopastoriles, abejas nativas Mariola, senderos ecologicos y plataformas Offline-First.',
    retoES: 'Proteger nacientes de agua y biodiversidad mediante manejo forestal sostenible.'
  },
  urbano: {
    nombreES: 'Urbano / GAM',
    enfoqueES: 'Edificios multifamiliares, Ley N. 7600, NFPA 101, sistemas fotovoltaicos y ciberseguridad corporativa.',
    retoES: 'Auditar accesibilidad universal, seguridad humana y redes de datos en edificaciones.'
  }
};

// ITEMS BASE OFICIALES MEP 2026
export const BANCO_ITEMS_BASE = [
  {
    id: '1001-05', codigo: '1001', dificultad: 'INTERMEDIO',
    especialidadES: 'Agroecologia', subareaES: 'Tratamiento de Efluentes',
    conceptoBase: 'Tren de Tratamiento de Aguas Residuales (Fisico -> Quimico -> Biologico)',
    enunciadoES: 'En una planta agroindustrial se trata un efluente en tres etapas: Etapa I disminuye solidos sedimentables; Etapa II reduce notablemente la turbidez; Etapa III disminuye la DBO5. Cual secuencia de procesos explica los resultados?',
    opciones: [
      { letra: 'A', textoES: 'Biologico - fisico - quimico', correcta: false, expES: 'El tratamiento biologico no puede ir al inicio con solidos gruesos.' },
      { letra: 'B', textoES: 'Quimico - biologico - fisico', correcta: false, expES: 'La sedimentacion fisica siempre antecede al proceso quimico.' },
      { letra: 'C', textoES: 'Fisico - biologico - quimico', correcta: false, expES: 'La reduccion de DBO5 es biologica y ocurre en la tercera etapa.' },
      { letra: 'D', textoES: 'Fisico - quimico - biologico', correcta: true, expES: 'Correcto: Etapa I Fisico (sedimenta), Etapa II Quimico (coagula turbidez), Etapa III Biologico (bacterias degradan materia organica bajando DBO5).' }
    ],
    escalera: {
      gatearES: '1. Cuelas piedras (Fisico), 2. Aclaras el agua turbia (Quimico) y 3. Bacterias comen materia organica (Biologico).',
      correrES: 'Secuencia PTAR: primario fisico, secundario quimico (coagulacion-floculacion) y biologico (reduccion de DBO5).',
      espacioES: 'Disena un sistema integrado con trampa de grasas, biodigestor y humedal artificial.'
    },
    nemotecniaES: 'FI-QUI-BIO: Fisico asienta, Quimico aclara, Biologico baja DBO5.',
    palabraES: 'BIOLOGICO', pistaES: 'Tratamiento que usa microorganismos para reducir la DBO5.'
  },
  {
    id: '1001-56', codigo: '1001', dificultad: 'FACIL',
    especialidadES: 'Agroecologia', subareaES: 'Sistemas Integrados',
    conceptoBase: 'Simbiosis Acuaponica (Acuicultura + Hidroponia con recirculacion)',
    enunciadoES: 'En una unidad productiva se integran la crianza de tilapia y el cultivo de hortalizas: disminuye el consumo de agua, los compuestos nitrogenados son transformados en nutrientes vegetales y el agua retorna a los peces. Cual sistema se describe?',
    opciones: [
      { letra: 'A', textoES: 'Cultivo en jaulas', correcta: false, expES: 'No integra hortalizas ni recirculacion.' },
      { letra: 'B', textoES: 'Piscicultura extensiva', correcta: false, expES: 'No incluye biofiltracion hidroponica.' },
      { letra: 'C', textoES: 'Flujo acuicola continuo', correcta: false, expES: 'Es un sistema abierto sin retorno.' },
      { letra: 'D', textoES: 'Produccion acuaponica', correcta: true, expES: 'Correcto: La acuaponia integra peces y plantas en un circuito cerrado de recirculacion.' }
    ],
    escalera: {
      gatearES: 'Los peces abonan a las plantas y las plantas limpian el agua para los peces: Acuaponia.',
      correrES: 'Bacterias nitrificantes transforman el amonio de los peces en nitratos asimilables por las raices.',
      espacioES: 'Calcula la relacion entre gramos de alimento diario para tilapia y area de cultivo de lechuga.'
    },
    nemotecniaES: 'ACUA (Peces) + PONIA (Hidroponia) = Acuaponia.',
    palabraES: 'ACUAPONIA', pistaES: 'Sistema que integra crianza de peces y cultivo de plantas en recirculacion.'
  },
  {
    id: '1003-09', codigo: '1003', dificultad: 'MEDIANO',
    especialidadES: 'Agroindustria Agricola', subareaES: 'Conservacion de Alimentos',
    conceptoBase: 'Control de Actividad de Agua (aw) por Concentracion de Solutos (Grados Brix)',
    enunciadoES: 'En el taller se concentra una mermelada hasta alcanzar 65 grados Brix, disminuyendo la disponibilidad de agua para el crecimiento microbiano. Cual principio de conservacion explica este efecto?',
    opciones: [
      { letra: 'A', textoES: 'Disminucion de la actividad de agua por alta concentracion de solutos', correcta: true, expES: 'Correcto: Los azucares disueltos a 65 Brix ligan el agua libre y deprimen la actividad de agua (aw).' },
      { letra: 'B', textoES: 'Inactivacion microbiana por congelacion', correcta: false, expES: 'No es un proceso de congelacion.' },
      { letra: 'C', textoES: 'Eliminacion absoluta del agua total', correcta: false, expES: 'El agua permanece en la mermelada pero ligada a los solutos.' },
      { letra: 'D', textoES: 'Fermentacion acida de la fruta', correcta: false, expES: 'La mermelada no se conserva por fermentacion.' }
    ],
    escalera: {
      gatearES: 'Tanta azucar (65 Brix) amarra las moleculas de agua y los microbios no pueden usarla.',
      correrES: 'La alta presion osmotica de los solidos solubles reduce la actividad de agua (aw) bajo el limite patogeno.',
      espacioES: 'Formula el balance de masa de fruta, sacarosa y pectina para estandarizar a 65 Brix y pH 3,2.'
    },
    nemotecniaES: '65 BRIX = SOLUTOS AMARRAN EL AGUA (baja aw).',
    palabraES: 'SOLUTOS', pistaES: 'Solidos disueltos que reducen la actividad de agua en mermeladas.'
  },
  {
    id: '1004-29', codigo: '1004', dificultad: 'MEDIANO',
    especialidadES: 'Agroindustria Pecuaria', subareaES: 'Analisis Lacteo',
    conceptoBase: 'Conversion Volumetrica de Concentracion (g/mL a g/L)',
    enunciadoES: 'En el laboratorio se determina que una muestra de leche contiene 0,45 g de acido lactico en un volumen de 250 mL. Si debe expresarse en gramos por litro (g/L), cual concentracion debe consignarse?',
    opciones: [
      { letra: 'A', textoES: '0,18 g/L', correcta: false, expES: 'Error de division.' },
      { letra: 'B', textoES: '1,80 g/L', correcta: true, expES: 'Correcto: Como 1 L (1000 mL) equivale a 4 veces 250 mL, multiplicamos 0,45 g x 4 = 1,80 g/L.' },
      { letra: 'C', textoES: '4,50 g/L', correcta: false, expES: 'Error por multiplicar por 10 en lugar de 4.' },
      { letra: 'D', textoES: '18,00 g/L', correcta: false, expES: '18 corresponde a grados Dornic, pero en g/L es 1,80.' }
    ],
    escalera: {
      gatearES: 'En 1 litro caben 4 vasos de 250 mL. Multiplica 0,45 x 4 = 1,80 g/L.',
      correrES: 'Factor de conversion: (0,45 g / 250 mL) x (1000 mL / 1 L) = 1,80 g/L.',
      espacioES: 'Relaciona 1,80 g/L (18 grados Dornic) con la aptitud de la leche para pasteurizacion HTST.'
    },
    nemotecniaES: '250 mL x 4 = 1 LITRO (Multiplica por 4).',
    palabraES: 'LACTICO', pistaES: 'Acido producido por bacterias al fermentar la lactosa de la leche.'
  },
  {
    id: '1005-41', codigo: '1005', dificultad: 'FACIL',
    especialidadES: 'Agrojardineria', subareaES: 'Replanteo de Jardines',
    conceptoBase: 'Determinacion de Cotas Faltantes por Diferencia Longitudinal',
    enunciadoES: 'En una franja longitudinal de 18 m se ubican consecutivamente: arbustos (4,50 m), sendero (2,00 m), cesped (sin cota) y jardinera (3,50 m). Cual es la longitud real del cesped?',
    opciones: [
      { letra: 'A', textoES: '6,00 m', correcta: false, expES: 'Resta incompleta.' },
      { letra: 'B', textoES: '7,00 m', correcta: false, expES: 'Error de suma.' },
      { letra: 'C', textoES: '8,00 m', correcta: true, expES: 'Correcto: Sumamos 4,50 + 2,00 + 3,50 = 10,00 m. Restamos 18,00 - 10,00 = 8,00 m.' },
      { letra: 'D', textoES: '10,00 m', correcta: false, expES: '10,00 m es la suma de los otros segmentos.' }
    ],
    escalera: {
      gatearES: 'Suma las partes conocidas (4,50 + 2 + 3,50 = 10 m). A 18 m quitale 10 m y quedan 8 m.',
      correrES: 'Cota restante: L = 18,00 m - (4,50 + 2,00 + 3,50) m = 8,00 m.',
      espacioES: 'Convierte los 8,00 m a escala 1:100 (8 cm en el plano) y calcula el area total.'
    },
    nemotecniaES: '18 MENOS 10 = 8 METROS.',
    palabraES: 'REPLANTEO', pistaES: 'Traslado de las medidas del plano de jardineria al terreno real.'
  },
  {
    id: '1009-05', codigo: '1009', dificultad: 'DUA',
    especialidadES: 'Produccion Agricola y Pecuaria', subareaES: 'Mecanizacion Agricola',
    conceptoBase: 'Labranza Vertical Profunda sin Inversion de Horizontes',
    enunciadoES: 'Se debe seleccionar un implemento para fracturar una capa compactada ubicada a 40 cm de profundidad, procurando poca inversion del suelo superficial. Cual implemento corresponde?',
    opciones: [
      { letra: 'A', textoES: 'Subsolador', correcta: true, expES: 'Correcto: El subsolador realiza corte vertical profundo a 40 cm sin voltear la capa fertil superficial.' },
      { letra: 'B', textoES: 'Arado de discos', correcta: false, expES: 'Invierte el prisma de suelo.' },
      { letra: 'C', textoES: 'Rastra niveladora', correcta: false, expES: 'Trabaja solo superficialmente.' },
      { letra: 'D', textoES: 'Cultivador rotativo', correcta: false, expES: 'Pulveriza la superficie sin descompactar a 40 cm.' }
    ],
    escalera: {
      gatearES: 'Para romper suelo duro en lo profundo (40 cm) sin voltear la tierra de arriba, usas el Subsolador.',
      correrES: 'El subsolador rompe el piso de arado mejorando la infiltracion hidrica y la aireacion radical.',
      espacioES: 'Calcula la potencia requerida en HP para traccionar un subsolador de 3 cinceles.'
    },
    nemotecniaES: 'SUB-SUELO PROFUNDO = SUBSOLADOR.',
    palabraES: 'SUBSOLADOR', pistaES: 'Implemento de labranza vertical para romper capas compactadas profundas.'
  },
  {
    id: '2003-19', codigo: '2003', dificultad: 'MEDIANO',
    especialidadES: 'Construccion Civil', subareaES: 'Estatica de Vigas',
    conceptoBase: 'Equilibrio Estatico de Fuerzas y Momentos en Vigas Simplemente Apoyadas',
    enunciadoES: 'Se debe construir una viga de 6 m de longitud, sujeta en ambos extremos con apoyos simples, con una carga puntual en el centro de 1200 kgf. Cual es la reaccion RA para mantener el equilibrio estatico?',
    opciones: [
      { letra: 'A', textoES: '0 kgf', correcta: false, expES: 'Sin reaccion vertical la viga colapsaria.' },
      { letra: 'B', textoES: '600 kgf', correcta: true, expES: 'Correcto: Por simetria, cada apoyo recibe la mitad de la carga central: 1200 / 2 = 600 kgf.' },
      { letra: 'C', textoES: '1200 kgf', correcta: false, expES: 'Es la suma de las dos reacciones.' },
      { letra: 'D', textoES: '2400 kgf', correcta: false, expES: 'Duplica erroneamente la carga.' }
    ],
    escalera: {
      gatearES: 'Si el peso de 1200 kgf esta justo en la mitad, cada apoyo sostiene la mitad: 600 kgf.',
      correrES: 'Por sumatoria de momentos en B igual a cero: -(RA x 6 m) + (1200 kgf x 3 m) = 0 -> RA = 600 kgf.',
      espacioES: 'Calcula el momento flector maximo Mmax = (P x L) / 4 = 1800 kgf.m.'
    },
    nemotecniaES: 'CARGA AL CENTRO = MITAD EN CADA APOYO (600 kgf).',
    palabraES: 'EQUILIBRIO', pistaES: 'Condicion estatica donde la suma de fuerzas y momentos es cero.'
  },
  {
    id: '2005-28', codigo: '2005', dificultad: 'FACIL',
    especialidadES: 'Dibujo Tecnico', subareaES: 'Diseno Arquitectonico',
    conceptoBase: 'Calculo Dimensional de Escaleras (Altura Total / Numero de Contrahuellas)',
    enunciadoES: 'Se disena una escalera para salvar una altura de 3,06 m mediante 18 contrahuellas iguales. Cual altura corresponde a cada contrahuella?',
    opciones: [
      { letra: 'A', textoES: '0,165 m', correcta: false, expES: '18 x 0,165 m solo alcanza 2,97 m.' },
      { letra: 'B', textoES: '0,16 m', correcta: false, expES: '18 x 0,16 m solo alcanza 2,88 m.' },
      { letra: 'C', textoES: '0,15 m', correcta: false, expES: '18 x 0,15 m solo alcanza 2,70 m.' },
      { letra: 'D', textoES: '0,17 m', correcta: true, expES: 'Correcto: Dividimos 3,06 m / 18 contrahuellas = 0,17 m (17 cm por escalon).' }
    ],
    escalera: {
      gatearES: 'Divide la altura del piso (3,06 m) entre las 18 gradas: 3,06 / 18 = 0,17 m.',
      correrES: 'Formula de contrahuella: C = Desnivel / Numero de gradas = 3,06 / 18 = 0,17 m.',
      espacioES: 'Aplica la formula de Blondel (2C + H = 64 cm) para determinar la huella.'
    },
    nemotecniaES: '3,06 ENTRE 18 = 0,17 METROS.',
    palabraES: 'CONTRAHUELLA', pistaES: 'Altura vertical de cada peldano en una escalera.'
  },
  {
    id: '2006-60', codigo: '2006', dificultad: 'INTERMEDIO',
    especialidadES: 'Dibujo y Modelado Edificaciones', subareaES: 'Gestion Financiera',
    conceptoBase: 'Ecuacion Contable Fundamental (Patrimonio = Activos - Pasivos)',
    enunciadoES: 'En el balance preliminar de una microempresa se identifican Activos por 82 500 000 colones y Pasivos por 31 800 000 colones. A cual componente corresponde la diferencia entre ambos valores?',
    opciones: [
      { letra: 'A', textoES: 'Activo', correcta: false, expES: 'El activo ya fue suministrado.' },
      { letra: 'B', textoES: 'Pasivo', correcta: false, expES: 'El pasivo corresponde a las deudas.' },
      { letra: 'C', textoES: 'Ingreso', correcta: false, expES: 'Pertenece al estado de resultados.' },
      { letra: 'D', textoES: 'Patrimonio', correcta: true, expES: 'Correcto: Patrimonio = Activos - Pasivos (50 700 000 colones).' }
    ],
    escalera: {
      gatearES: 'Lo que tienes (Activos) menos lo que debes (Pasivos) es tu Patrimonio neto.',
      correrES: 'Ecuacion patrimonial: P = A - L = 82 500 000 - 31 800 000 = 50 700 000 colones.',
      espacioES: 'Integra este patrimonio en el flujo de caja proyectado de un estudio BIM.'
    },
    nemotecniaES: 'ACTIVO MENOS PASIVO = PATRIMONIO.',
    palabraES: 'PATRIMONIO', pistaES: 'Capital propio resultante de restar los pasivos a los activos.'
  },
  {
    id: '2007-30', codigo: '2007', dificultad: 'ALTO',
    especialidadES: 'Diseno Grafico', subareaES: 'Preprensa Digital',
    conceptoBase: 'Auditoria Tecnica Previa a la Impresion (Preflight PDF/X)',
    enunciadoES: 'Antes de reproducir un PDF en imprenta se comprueban fuentes incrustadas, resolucion de imagenes, sangrados, espacios de color y transparencias. Cual procedimiento reune estas verificaciones?',
    opciones: [
      { letra: 'A', textoES: 'Preflight', correcta: true, expES: 'Correcto: El Preflight valida tecnicamente el archivo antes de generar planchas CTP o imprimir.' },
      { letra: 'B', textoES: 'Trapping', correcta: false, expES: 'Es el traslape leve entre tintas.' },
      { letra: 'C', textoES: 'Imposicion', correcta: false, expES: 'Es el ordenamiento de paginas en el pliego.' },
      { letra: 'D', textoES: 'Rasterizacion', correcta: false, expES: 'Es la conversion de vectores a mapa de bits.' }
    ],
    escalera: {
      gatearES: 'Es el chequeo antes del vuelo (Preflight) para asegurar que nada salga mal en la imprenta.',
      correrES: 'Verificacion automatizada de preprensa bajo estandares internacionales ISO PDF/X.',
      espacioES: 'Configura un perfil Preflight para empaques con tintas CMYK, Pantone y barniz UV.'
    },
    nemotecniaES: 'PRE-FLIGHT = Chequeo tecnico antes de despegar a imprenta.',
    palabraES: 'PREFLIGHT', pistaES: 'Verificacion digital previa a la impresion de fuentes, sangrados y color.'
  },
  {
    id: '2008-13', codigo: '2008', dificultad: 'ALTO',
    especialidadES: 'Diseno Publicitario', subareaES: 'Figura Humana',
    conceptoBase: 'Antropometria Artistica y Canon Modular de 8 Cabezas',
    enunciadoES: 'En un boceto de figura humana adulta, la cabeza mide 24 mm y la altura total de la figura es de 192 mm. Cual canon de proporcion se aplico?',
    opciones: [
      { letra: 'A', textoES: 'Ideal (8 cabezas)', correcta: true, expES: 'Correcto: Dividimos 192 mm / 24 mm = 8 cabezas exactas, que define el canon Ideal.' },
      { letra: 'B', textoES: 'Natural (7,5 cabezas)', correcta: false, expES: 'Mediria 180 mm.' },
      { letra: 'C', textoES: 'Heroico (8,5 cabezas)', correcta: false, expES: 'Mediria 204 mm.' },
      { letra: 'D', textoES: 'Infantil (5 cabezas)', correcta: false, expES: 'Mediria 120 mm.' }
    ],
    escalera: {
      gatearES: 'Divide la altura total (192 mm) entre la cabeza (24 mm): 192 / 24 = 8 cabezas (Canon Ideal).',
      correrES: 'Relacion modular clasica: N = Altura Total / Modulo Cefalico = 192 / 24 = 8.',
      espacioES: 'Disena un personaje publicitario aplicando vistas ortogonales con canon de 8 cabezas.'
    },
    nemotecniaES: '192 ENTRE 24 = 8 CABEZAS (Canon Ideal).',
    palabraES: 'CANON', pistaES: 'Regla de proporcion anatomica que toma la cabeza como unidad modular.'
  }
];

// MOTOR PARAMETRICO 1000x1000: Genera decenas/cientos de items variados para simulacros de 60 preguntas
export function generarBancoExpandido(itemsPersonalizados = []) {
  const nivelesCiclo = ['DUA', 'FACIL', 'MEDIANO', 'INTERMEDIO', 'ALTO'];
  const generados = [...itemsPersonalizados, ...BANCO_ITEMS_BASE];

  // 1. Variaciones parametricas de Estatica de Vigas (Construccion Civil / Fisica / Matematica)
  const cargasViga = [800, 1000, 1400, 1600, 1800, 2000, 2200, 2600, 3000, 3600, 4000, 4800, 5000];
  cargasViga.forEach((carga, idx) => {
    const mitad = carga / 2;
    const largo = 4 + (idx % 5) * 2;
    const niv = nivelesCiclo[idx % nivelesCiclo.length];
    generados.push({
      id: `GEN-VIGA-${idx + 1}`,
      codigo: '2003',
      dificultad: niv,
      especialidadES: 'Construccion Civil',
      subareaES: `Calculo Estructural (${niv})`,
      conceptoBase: 'Equilibrio Estatico Simetrico: Reaccion RA = Carga Central / 2',
      enunciadoES: `[Caso Parametrico #${idx + 1} - Nivel ${niv}] Se construye una viga simplemente apoyada de ${largo} m de longitud con una carga puntual en el centro de ${carga} kgf. Cual es la reaccion RA para mantener el equilibrio estatico?`,
      opciones: [
        { letra: 'A', textoES: `${mitad / 2} kgf`, correcta: false, expES: 'Corresponde solo a una cuarta parte de la carga.' },
        { letra: 'B', textoES: `${mitad} kgf`, correcta: true, expES: `Correcto: Por simetria estatica, cada apoyo recibe la mitad de ${carga} kgf: ${carga} / 2 = ${mitad} kgf.` },
        { letra: 'C', textoES: `${carga} kgf`, correcta: false, expES: 'Asume erroneamente que un solo apoyo soporta toda la carga.' },
        { letra: 'D', textoES: `${carga * 2} kgf`, correcta: false, expES: 'Duplica erroneamente la carga central.' }
      ],
      escalera: {
        gatearES: `Divide el peso central (${carga} kgf) entre los 2 apoyos: ${carga} / 2 = ${mitad} kgf.`,
        correrES: `Por sumatoria de momentos igual a cero: RA = ${carga} kgf / 2 = ${mitad} kgf.`,
        espacioES: `El momento flector maximo en el centro es Mmax = (${carga} x ${largo}) / 4 = ${(carga * largo) / 4} kgf.m.`
      },
      nemotecniaES: `MITAD EXACTA: ${carga} / 2 = ${mitad} kgf.`,
      palabraES: 'EQUILIBRIO',
      pistaES: 'Condicion donde la suma de fuerzas y momentos en la viga es cero.'
    });
  });

  // 2. Variaciones parametricas de Rendimiento y Concentracion (Agroindustria / Quimica / PISA)
  const muestrasLeche = [0.30, 0.35, 0.40, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.90, 1.10];
  muestrasLeche.forEach((gramos, idx) => {
    const porLitro = (gramos * 4).toFixed(2).replace('.', ',');
    const mal1 = (gramos * 2).toFixed(2).replace('.', ',');
    const mal2 = (gramos * 10).toFixed(2).replace('.', ',');
    const mal3 = (gramos / 2).toFixed(2).replace('.', ',');
    const gTexto = gramos.toFixed(2).replace('.', ',');
    const niv = nivelesCiclo[(idx + 1) % nivelesCiclo.length];
    generados.push({
      id: `GEN-LAC-${idx + 1}`,
      codigo: '1004',
      dificultad: niv,
      especialidadES: 'Agroindustria Pecuaria',
      subareaES: `Control de Calidad y Laboratorio (${niv})`,
      conceptoBase: 'Estequiometria y Concentracion en Gramos por Litro (1 L = 4 x 250 mL)',
      enunciadoES: `[Laboratorio #${idx + 1} - Nivel ${niv}] Una muestra de 250 mL de leche contiene ${gTexto} g de acido lactico. Cual es la concentracion expresada en gramos por litro (g/L)?`,
      opciones: [
        { letra: 'A', textoES: `${mal3} g/L`, correcta: false, expES: 'Dividio en lugar de multiplicar por 4.' },
        { letra: 'B', textoES: `${porLitro} g/L`, correcta: true, expES: `Correcto: Como 1 litro contiene 4 veces 250 mL, multiplicamos ${gTexto} g x 4 = ${porLitro} g/L.` },
        { letra: 'C', textoES: `${mal1} g/L`, correcta: false, expES: 'Multiplico solo por 2 (500 mL) en lugar de 4 (1000 mL).' },
        { letra: 'D', textoES: `${mal2} g/L`, correcta: false, expES: 'Multiplico por 10 en lugar de 4.' }
      ],
      escalera: {
        gatearES: `En 1 litro caben cuatro muestras de 250 mL. Multiplica ${gTexto} x 4 = ${porLitro} g/L.`,
        correrES: `Conversion unitaria: (${gTexto} g / 0,250 L) = ${porLitro} g/L.`,
        espacioES: `Equivale a ${(gramos * 40).toFixed(1)} grados Dornic en control de recepcion de planta.`
      },
      nemotecniaES: `250 mL x 4 = 1 L -> ${gTexto} x 4 = ${porLitro} g/L.`,
      palabraES: 'CONCENTRACION',
      pistaES: 'Cantidad de soluto o acido lactico presente por cada litro de disolucion.'
    });
  });

  // 3. Variaciones parametricas de Escaleras y Replanteo (Dibujo Tecnico / Agrojardineria / Matematica)
  const gradasLista = [12, 14, 15, 16, 17, 19, 20, 21, 22, 24];
  gradasLista.forEach((nGradas, idx) => {
    const alturaTotal = (nGradas * 0.17).toFixed(2).replace('.', ',');
    const niv = nivelesCiclo[(idx + 2) % nivelesCiclo.length];
    generados.push({
      id: `GEN-ESC-${idx + 1}`,
      codigo: '2005',
      dificultad: niv,
      especialidadES: 'Dibujo Tecnico',
      subareaES: `Diseno Arquitectonico (${niv})`,
      conceptoBase: 'Modulado Vertical de Escaleras (Altura de Contrahuella = Desnivel / N)',
      enunciadoES: `[Diseno #${idx + 1} - Nivel ${niv}] En un edificio se proyecta una escalera para salvar una altura total de ${alturaTotal} m mediante ${nGradas} contrahuellas iguales. Cual es la altura exacta de cada contrahuella?`,
      opciones: [
        { letra: 'A', textoES: '0,15 m', correcta: false, expES: 'No alcanzaria el nivel de entrepiso.' },
        { letra: 'B', textoES: '0,16 m', correcta: false, expES: 'Quedaria faltando 1 cm por cada peldano.' },
        { letra: 'C', textoES: '0,17 m', correcta: true, expES: `Correcto: Al dividir la altura de ${alturaTotal} m entre ${nGradas} contrahuellas se obtiene exactamente 0,17 m.` },
        { letra: 'D', textoES: '0,19 m', correcta: false, expES: 'Excede el desnivel y supera el limite ergonomico habitual.' }
      ],
      escalera: {
        gatearES: `Divide la altura total (${alturaTotal} m) entre las ${nGradas} gradas = 0,17 m.`,
        correrES: `C = H / N = ${alturaTotal} m / ${nGradas} = 0,17 m (17 cm).`,
        espacioES: `Con huella de 0,30 m, el desarrollo horizontal del tramo sera de ${(nGradas - 1) * 0.30} m.`
      },
      nemotecniaES: `${alturaTotal} ENTRE ${nGradas} = 0,17 m.`,
      palabraES: 'CONTRAHUELLA',
      pistaES: 'Medida vertical de cada escalon en un plano constructivo.'
    });
  });

  // 4. Variaciones parametricas de Contabilidad, Topografia Pitagorica y Canon Publicitario (PISA / Admision)
  const lotesContables = [
    { act: 90, pas: 35 }, { act: 120, pas: 45 }, { act: 75, pas: 25 }, { act: 150, pas: 60 },
    { act: 64, pas: 19 }, { act: 110, pas: 40 }, { act: 95, pas: 30 }, { act: 180, pas: 70 },
    { act: 200, pas: 85 }, { act: 140, pas: 55 }, { act: 88, pas: 28 }, { act: 165, pas: 50 },
    { act: 130, pas: 42 }, { act: 175, pas: 65 }, { act: 210, pas: 90 }, { act: 250, pas: 110 }
  ];
  lotesContables.forEach((par, idx) => {
    const pat = par.act - par.pas;
    const niv = nivelesCiclo[(idx + 3) % nivelesCiclo.length];
    generados.push({
      id: `GEN-FIN-${idx + 1}`,
      codigo: '2006',
      dificultad: niv,
      especialidadES: 'Dibujo y Modelado Edificaciones',
      subareaES: `Analisis Financiero y PISA (${niv})`,
      conceptoBase: 'Ecuacion Contable Patrimonial (Patrimonio = Activos - Pasivos)',
      enunciadoES: `[Caso Financiero #${idx + 1} - Nivel ${niv}] Una empresa constructora registra Activos totales por ${par.act} millones de colones y Pasivos por ${par.pas} millones de colones. Cual es el valor de su Patrimonio neto?`,
      opciones: [
        { letra: 'A', textoES: `${par.act + par.pas} millones`, correcta: false, expES: 'Error por sumar las deudas a los activos.' },
        { letra: 'B', textoES: `${pat} millones`, correcta: true, expES: `Correcto: Patrimonio = Activos (${par.act}) - Pasivos (${par.pas}) = ${pat} millones de colones.` },
        { letra: 'C', textoES: `${par.pas} millones`, correcta: false, expES: 'Ese monto corresponde unicamente al pasivo.' },
        { letra: 'D', textoES: `${pat - 10} millones`, correcta: false, expES: 'Error aritmetico en la resta.' }
      ],
      escalera: {
        gatearES: `A lo que tienes (${par.act} millones) restale las deudas (${par.pas} millones) = ${pat} millones.`,
        correrES: `Ecuacion contable: Patrimonio = Activo - Pasivo = ${pat} millones.`,
        espacioES: `Razon de endeudamiento = (${par.pas} / ${par.act}) x 100 = ${((par.pas / par.act) * 100).toFixed(1)}%.`
      },
      nemotecniaES: `${par.act} MENOS ${par.pas} = ${pat} MILLONES DE PATRIMONIO.`,
      palabraES: 'PATRIMONIO',
      pistaES: 'Capital propio obtenido al restar los pasivos del total de activos.'
    });
  });

  return generados;
}
