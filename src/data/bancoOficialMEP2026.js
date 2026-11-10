export const DICCIONARIO_UI = {
  ES: {
    subtituloHeader: 'Universo Educativo Nacional: Primaria, Secundaria, Especialidades ETP y Admision',
    buscarPlaceholder: 'Buscar letra por letra: codigo (1001, 2003), materia, primaria, colegio, viga, queso...',
    filtroTodas: 'Ver Todas las Materias y Especialidades',
    tabJuegos: '1. 5 Juegos y Practicas',
    tabPlan: '2. Plan Cotidiano MEP',
    tabBlandas: '3. Habitos y Empresa',
    btnGoogleLogin: 'Acceder con Google',
    btnMejorarPro: 'Activar PRO (Google Pay)',
    badgeSuperAdmin: 'SUPER ADMIN - Max Salazar Sanchez',
    badgeProActivo: 'PLAN PRO ACTIVO',
    modalPagoTitulo: 'Suscripcion Automatica PRO - pracTICAtecnica.com',
    modalPagoSub: 'Acceso total a Primaria, Secundaria, Especialidades Tecnicas ETP, Admision, Planes MEP y 5 Juegos.',
    btnPagarGooglePay: 'Pagar Automaticamente con Google Pay (G Pay)',
    btnPagarSinpe: 'Confirmar por SINPE Movil (6090-6359)',
    juego1: '1. Simulador Escalera DUA',
    juego2: '2. Reto Millonario (50/50)',
    juego3: '3. Ordena el Proceso',
    juego4: '4. Memoria de Parejas',
    juego5: '5. Crucigrama y Practica',
    nivelGatear: '1. Gatear (Intuicion)',
    nivelCorrer: '2. Correr (Oficial MEP)',
    nivelEspacio: '3. Al Espacio (Avanzado)',
    btnSiguiente: 'Siguiente Pregunta ->',
    btnRevelar: 'Mostrar Respuesta',
    docenteLabel: 'La persona docente',
    estudianteLabel: 'La persona estudiante',
    encargadoLabel: 'la persona encargada legal'
  },
  EN: {
    subtituloHeader: 'National Education Universe: Elementary, High School, Technical Majors & Admission',
    buscarPlaceholder: 'Search letter by letter: code (1001, 2003), subject, elementary, beam, cheese...',
    filtroTodas: 'View All Subjects & Majors',
    tabJuegos: '1. 5 Interactive Games',
    tabPlan: '2. Daily Lesson Plan',
    tabBlandas: '3. Workplace Soft Skills',
    btnGoogleLogin: 'Sign in with Google',
    btnMejorarPro: 'Upgrade to PRO (Google Pay)',
    badgeSuperAdmin: 'SUPER ADMIN - Max Salazar Sanchez',
    badgeProActivo: 'PRO PLAN ACTIVE',
    modalPagoTitulo: 'Automatic PRO Subscription - pracTICAtecnica.com',
    modalPagoSub: 'Full access to Elementary, High School, Technical Majors, University Admission, Lesson Plans & 5 Games.',
    btnPagarGooglePay: 'Pay Automatically with Google Pay (G Pay)',
    btnPagarSinpe: 'Confirm via SINPE Movil (+506 6090-6359)',
    juego1: '1. UDL Ladder Simulator',
    juego2: '2. Millionaire Quiz (50/50)',
    juego3: '3. Process Sequence',
    juego4: '4. Tech Memory Match',
    juego5: '5. Crossword & Practice',
    nivelGatear: '1. Crawl (Intuition)',
    nivelCorrer: '2. Run (MEP Standard)',
    nivelEspacio: '3. Space (Engineering)',
    btnSiguiente: 'Next Question ->',
    btnRevelar: 'Reveal Answer',
    docenteLabel: 'The teacher',
    estudianteLabel: 'The student',
    encargadoLabel: 'the legal guardian'
  }
};

export const NIVELES_MACRO = [
  { id: 'TODOS', es: 'Toda la Malla CR', en: 'All CR Curriculum' },
  { id: 'ETP_AGRO', es: 'ETP: Agro y Ambiente', en: 'CTE: Agro & Environment' },
  { id: 'ETP_IND', es: 'ETP: Construccion y Dibujo', en: 'CTE: Construction & CAD' },
  { id: 'ETP_ART', es: 'ETP: Diseno y Publicidad', en: 'CTE: Design & Media' },
  { id: 'ETP_TI', es: 'ETP: Web, Redes y TI', en: 'CTE: Web, Cyber & IT' },
  { id: 'SECUNDARIA', es: 'Secundaria Academica (7 a 11)', en: 'Academic High School (7-11)' },
  { id: 'PRIMARIA', es: 'Primaria (1 a 6 Grado)', en: 'Elementary School (1-6)' },
  { id: 'ADMISION', es: 'Admision UCR/TEC/UNA y Manejo', en: 'University Admission & Driving' }
];

export const ESPECIALIDADES_CATALOGO = [
  // ESPECIALIDADES TECNICAS OFICIALES 2026
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
  // SECUNDARIA ACADEMICA
  { codigo: 'SEC-MAT', familia: 'SECUNDARIA', nombreES: 'Matematicas Secundaria', nombreEN: 'High School Mathematics' },
  { codigo: 'SEC-CIE', familia: 'SECUNDARIA', nombreES: 'Ciencias (Fisica, Quimica, Biologia)', nombreEN: 'Sciences (Physics, Chem, Bio)' },
  { codigo: 'SEC-SOC', familia: 'SECUNDARIA', nombreES: 'Estudios Sociales y Civica', nombreEN: 'Social Studies & Civics' },
  { codigo: 'SEC-ESP', familia: 'SECUNDARIA', nombreES: 'Espanol y Literatura', nombreEN: 'Spanish & Literature' },
  // PRIMARIA (ESCUELA)
  { codigo: 'PRI-MAT', familia: 'PRIMARIA', nombreES: 'Matematicas Primaria (1 a 6)', nombreEN: 'Elementary Math (Grades 1-6)' },
  { codigo: 'PRI-CIE', familia: 'PRIMARIA', nombreES: 'Ciencias Primaria (1 a 6)', nombreEN: 'Elementary Science (Grades 1-6)' },
  { codigo: 'PRI-SOC', familia: 'PRIMARIA', nombreES: 'Estudios Sociales Primaria', nombreEN: 'Elementary Social Studies' },
  // ADMISION Y PRUEBAS
  { codigo: 'ADM-UNI', familia: 'ADMISION', nombreES: 'Razonamiento Admision UCR / TEC / UNA', nombreEN: 'University Admission Reasoning' },
  { codigo: 'ADM-COSEVI', familia: 'ADMISION', nombreES: 'Examen Teorico de Manejo COSEVI', nombreEN: 'Driver License Theory Exam' }
];

export const CONTEXTOS_REGIONALES = {
  limon: {
    nombreES: 'Costero / Limon', nombreEN: 'Coastal / Limon',
    enfoqueES: 'Aplicar a logistica portuaria, lluvias de 3600-4000 mm, corrosion salina, cacao, banano, pesca y costas.',
    enfoqueEN: 'Apply to port logistics, 3600-4000 mm rainfall, salt corrosion, cocoa, banana, fisheries, and coasts.',
    retoES: 'Disenar solucion practica para controlar humedad del 85% y temperatura de 25 C en instalaciones costeras.',
    retoEN: 'Design a practical solution to control 85% humidity and 25 C temperature in coastal facilities.'
  },
  rural: {
    nombreES: 'Rural / Altura', nombreEN: 'Rural / Highlands',
    enfoqueES: 'Vincular con cooperativas, laderas del 12% al 15% con pasto vetiver, riego en tropico seco y plantas lacteas.',
    enfoqueEN: 'Connect with cooperatives, 12%-15% slopes with vetiver grass, dry-tropics irrigation, and dairy plants.',
    retoES: 'Calcular parametros productivos y de conservacion de suelo en terrenos inclinados.',
    retoEN: 'Calculate production and soil conservation parameters on sloped terrains.'
  },
  indigena: {
    nombreES: 'Indigena / Bosque', nombreEN: 'Indigenous / Forest',
    enfoqueES: 'Integrar sistemas agrosilvopastoriles, abejas nativas Mariola, senderos de bajo impacto y apps Offline-First.',
    enfoqueEN: 'Integrate agrosilvopastoral systems, native Mariola bees, low-impact trails, and Offline-First apps.',
    retoES: 'Estructurar un proyecto comunitario sostenible protegiendo cuencas hidrograficas y bosque local.',
    retoEN: 'Structure a sustainable community project protecting watersheds and local forest.'
  },
  urbano: {
    nombreES: 'Urbano / GAM', nombreEN: 'Urban / GAM',
    enfoqueES: 'Enfocar en edificios multifamiliares, Ley N. 7600, NFPA 101, paneles solares y servicios digitales.',
    enfoqueEN: 'Focus on multi-family buildings, Law 7600 accessibility, NFPA 101, solar panels, and digital services.',
    retoES: 'Auditar el cumplimiento de accesibilidad, seguridad e infraestructura digital en el centro educativo.',
    retoEN: 'Audit accessibility, safety, and digital infrastructure compliance at the school.'
  }
};

export const BIBLIA_HABILIDADES_BLANDAS = [
  {
    tituloES: '1. Saludo Ejecutivo y Presencia Profesional',
    tituloEN: '1. Executive Greeting & Professional Presence',
    habitoES: 'La persona estudiante saluda mirando a los ojos al ingresar al aula o taller y porta su equipo de proteccion completo.',
    habitoEN: 'The student greets making eye contact upon entering the classroom or lab while wearing full protective gear.',
    empresaES: 'Genera confianza inmediata en entrevistas laborales, visitas tecnicas y auditorias.',
    empresaEN: 'Builds immediate trust in job interviews, site visits, and audits.'
  },
  {
    tituloES: '2. Puntualidad y Respeto a la Ruta Critica',
    tituloEN: '2. Punctuality & Critical Path Respect',
    habitoES: 'Entregar avances a tiempo sin atrasar las actividades con holgura cero de la cuadrilla o equipo.',
    habitoEN: 'Deliver progress on time without delaying zero-slack critical path team activities.',
    empresaES: 'Evita perdidas financieras y paros de linea en la industria.',
    empresaEN: 'Prevents financial losses and production line stops in industry.'
  },
  {
    tituloES: '3. Ortografia, Diccion y Etica Documental',
    tituloEN: '3. Spelling, Diction & Document Ethics',
    habitoES: 'Hablar con propiedad tecnica, redactar sin faltas de ortografia y pedir autorizacion antes de divulgar archivos.',
    habitoEN: 'Speak with technical accuracy, write without spelling errors, and request permission before sharing files.',
    empresaES: 'Protege la confidencialidad del cliente y eleva el perfil profesional.',
    empresaEN: 'Protects client confidentiality and elevates professional standing.'
  },
  {
    tituloES: '4. Cultura 5S y Cero Actos Inseguros',
    tituloEN: '4. 5S Culture & Zero Unsafe Acts',
    habitoES: 'Jamas usar audifonos cerca de maquinaria en reversa, bloquear la energia al limpiar y ordenar herramientas al cerrar.',
    habitoEN: 'Never use headphones near reversing machinery, lock out energy when cleaning, and tidy tools at closing.',
    empresaES: 'Elimina accidentes laborales graves y reprocesos.',
    empresaEN: 'Eliminates severe workplace accidents and rework.'
  }
];

export const BANCO_ITEMS_2026 = [
  {
    id: '1001-05', codigo: '1001',
    especialidadES: 'Agroecologia', especialidadEN: 'Agroecology',
    subareaES: 'Tratamiento de Efluentes', subareaEN: 'Effluent Treatment',
    enunciadoES: 'En una planta agroindustrial se trata un efluente en tres etapas: Etapa I disminuye solidos sedimentables; Etapa II reduce notablemente la turbidez; Etapa III disminuye la DBO5. Cual secuencia de procesos se aplico?',
    enunciadoEN: 'An agro-industrial plant treats an effluent in three stages: Stage I settles solids; Stage II reduces turbidity; Stage III lowers BOD5. Which process sequence was applied?',
    opciones: [
      { letra: 'A', textoES: 'Biologico - fisico - quimico', textoEN: 'Biological - physical - chemical', correcta: false, expES: 'El tratamiento biologico va al final.', expEN: 'Biological treatment goes last.' },
      { letra: 'B', textoES: 'Quimico - biologico - fisico', textoEN: 'Chemical - biological - physical', correcta: false, expES: 'Primero se sedimentan fisicamente los solidos gruesos.', expEN: 'Coarse solids are physically settled first.' },
      { letra: 'C', textoES: 'Fisico - biologico - quimico', textoEN: 'Physical - biological - chemical', correcta: false, expES: 'La reduccion de DBO5 es biologica en la Etapa III.', expEN: 'BOD5 reduction is biological in Stage III.' },
      { letra: 'D', textoES: 'Fisico - quimico - biologico', textoEN: 'Physical - chemical - biological', correcta: true, expES: 'Correcto: I Fisico (sedimenta), II Quimico (coagula turbidez), III Biologico (bacterias reducen DBO5).', expEN: 'Correct: I Physical (settles), II Chemical (coagulates turbidity), III Biological (bacteria lower BOD5).' }
    ],
    escalera: {
      gatearES: '1. Cuelas piedras (Fisico), 2. Aclaras el agua turbia (Quimico) y 3. Bacterias comen materia organica (Biologico).',
      gatearEN: '1. Strain stones (Physical), 2. Clarify murky water (Chemical), 3. Bacteria eat organic matter (Biological).',
      correrES: 'Secuencia PTAR: sedimentacion fisica primaria, coagulacion-floculacion quimica secundaria y oxidacion biologica de DBO5.',
      correrEN: 'WWTP sequence: primary physical settling, secondary chemical coagulation, and biological BOD5 oxidation.',
      espacioES: 'Disena un sistema de tratamiento para aguas de ordeno con biodigestor y humedal.',
      espacioEN: 'Design a dairy wastewater treatment train using a biodigester and constructed wetland.'
    },
    nemotecniaES: 'FI-QUI-BIO: Fisico asienta, Quimico aclara, Biologico baja DBO5.',
    nemotecniaEN: 'PHY-CHEM-BIO: Physical settles, Chemical clarifies, Biological lowers BOD5.',
    palabraES: 'BIOLOGICO', palabraEN: 'BIOLOGICAL',
    pistaES: 'Tratamiento que utiliza microorganismos para degradar materia organica y reducir la DBO5.',
    pistaEN: 'Treatment using microorganisms to degrade organic matter and reduce BOD5.'
  },
  {
    id: '1003-09', codigo: '1003',
    especialidadES: 'Agroindustria Agricola', especialidadEN: 'Crop Food Processing',
    subareaES: 'Conservacion de Alimentos', subareaEN: 'Food Preservation',
    enunciadoES: 'En el taller se concentra una mermelada hasta alcanzar 65 grados Brix, disminuyendo la disponibilidad de agua para los microorganismos. Cual principio explica su conservacion?',
    enunciadoEN: 'Jam is concentrated to 65 degrees Brix, reducing water availability for microbial growth. Which principle explains its preservation?',
    opciones: [
      { letra: 'A', textoES: 'Disminucion de la actividad de agua por alta concentracion de solutos', textoEN: 'Reduction of water activity by high solute concentration', correcta: true, expES: 'Correcto: Los azucares a 65 Brix ligan el agua libre y bajan la actividad de agua (aw).', expEN: 'Correct: Sugars at 65 Brix bind free water and lower water activity (aw).' },
      { letra: 'B', textoES: 'Inactivacion por congelacion rapida', textoEN: 'Inactivation by fast freezing', correcta: false, expES: 'La mermelada se conserva por solutos y coccion.', expEN: 'Jam is preserved by solutes and cooking.' },
      { letra: 'C', textoES: 'Eliminacion absoluta de toda el agua', textoEN: 'Complete removal of all water', correcta: false, expES: 'El agua permanece en el producto pero ligada a los solutos.', expEN: 'Water remains in the product but bound to solutes.' },
      { letra: 'D', textoES: 'Fermentacion lactica del azucar', textoEN: 'Lactic fermentation of sugar', correcta: false, expES: 'No es un alimento fermentado.', expEN: 'It is not a fermented food.' }
    ],
    escalera: {
      gatearES: 'Tanta azucar (65 Brix) deja el agua amarrada y los microbios no tienen agua libre para crecer.',
      gatearEN: 'So much sugar (65 Brix) ties up the water so microbes cannot use it to grow.',
      correrES: 'La presion osmotica generada por 65% de solidos solubles reduce la actividad de agua (aw).',
      correrEN: 'Osmotic pressure from 65% soluble solids depresses water activity (aw).',
      espacioES: 'Formula un lote de 100 kg de mermelada ajustando pectina y pH a 3,2.',
      espacioEN: 'Formulate a 100 kg jam batch adjusting pectin and pH to 3.2.'
    },
    nemotecniaES: '65 BRIX = SOLUTOS AMARRAN EL AGUA (baja aw).',
    nemotecniaEN: '65 BRIX = SOLUTES BIND WATER (lowers aw).',
    palabraES: 'SOLUTOS', palabraEN: 'SOLUTES',
    pistaES: 'Solidos disueltos (medidos en grados Brix) que reducen la actividad de agua en mermeladas.',
    pistaEN: 'Dissolved solids (measured in Brix) that lower water activity in jams.'
  },
  {
    id: '1004-29', codigo: '1004',
    especialidadES: 'Agroindustria Pecuaria', especialidadEN: 'Livestock Food Processing',
    subareaES: 'Control de Calidad Lacteo', subareaEN: 'Dairy Quality Control',
    enunciadoES: 'Una muestra de leche contiene 0,45 g de acido lactico en 250 mL. Si el sistema exige registrar el resultado en gramos por litro (g/L), cual concentracion corresponde?',
    enunciadoEN: 'A milk sample contains 0.45 g of lactic acid in 250 mL. What concentration must be recorded in grams per liter (g/L)?',
    opciones: [
      { letra: 'A', textoES: '0,18 g/L', textoEN: '0.18 g/L', correcta: false, expES: 'Error de division.', expEN: 'Division error.' },
      { letra: 'B', textoES: '1,80 g/L', textoEN: '1.80 g/L', correcta: true, expES: 'Correcto: 1 L tiene cuatro veces 250 mL, por tanto 0,45 g x 4 = 1,80 g/L.', expEN: 'Correct: 1 L is four times 250 mL, so 0.45 g x 4 = 1.80 g/L.' },
      { letra: 'C', textoES: '4,50 g/L', textoEN: '4.50 g/L', correcta: false, expES: 'Multiplico por 10 en lugar de 4.', expEN: 'Multiplied by 10 instead of 4.' },
      { letra: 'D', textoES: '18,00 g/L', textoEN: '18.00 g/L', correcta: false, expES: '18 corresponde a grados Dornic.', expEN: '18 corresponds to Dornic degrees.' }
    ],
    escalera: {
      gatearES: 'En 1 litro caben 4 vasos de 250 mL. Multiplica 0,45 x 4 = 1,80 g/L.',
      gatearEN: 'Four 250 mL cups fit in 1 liter. Multiply 0.45 x 4 = 1.80 g/L.',
      correrES: 'Conversion volumetrica: (0,45 g / 0,250 L) = 1,80 g/L.',
      correrEN: 'Volumetric conversion: (0.45 g / 0.250 L) = 1.80 g/L.',
      espacioES: 'Relaciona 1,80 g/L (18 Dornic) con la prueba de estabilidad al alcohol en recepcion de planta.',
      espacioEN: 'Relate 1.80 g/L (18 Dornic) with the alcohol stability test at plant reception.'
    },
    nemotecniaES: '250 mL x 4 = 1 LITRO (Multiplica los gramos por 4).',
    nemotecniaEN: '250 mL x 4 = 1 LITER (Multiply grams by 4).',
    palabraES: 'LACTICO', palabraEN: 'LACTIC',
    pistaES: 'Acido organico producido al fermentar la lactosa de la leche.',
    pistaEN: 'Organic acid produced when fermenting milk lactose.'
  },
  {
    id: '1005-41', codigo: '1005',
    especialidadES: 'Agrojardineria', especialidadEN: 'Landscaping & Gardening',
    subareaES: 'Replanteo de Jardines', subareaEN: 'Landscape Layout',
    enunciadoES: 'En una franja total de 18 m se ubican consecutivamente: arbustos (4,50 m), sendero (2,00 m), cesped (sin cota) y jardinera (3,50 m). Cual es la longitud real del cesped?',
    enunciadoEN: 'An 18 m strip has shrubs (4.50 m), path (2.00 m), lawn (unlabeled), and planter (3.50 m). What is the real length of the lawn?',
    opciones: [
      { letra: 'A', textoES: '6,00 m', textoEN: '6.00 m', correcta: false, expES: 'Resta incompleta.', expEN: 'Incomplete subtraction.' },
      { letra: 'B', textoES: '7,00 m', textoEN: '7.00 m', correcta: false, expES: 'Error de suma.', expEN: 'Addition error.' },
      { letra: 'C', textoES: '8,00 m', textoEN: '8.00 m', correcta: true, expES: 'Correcto: 4,50 + 2,00 + 3,50 = 10,00 m. Luego 18,00 - 10,00 = 8,00 m.', expEN: 'Correct: 4.50 + 2.00 + 3.50 = 10.00 m. Then 18.00 - 10.00 = 8.00 m.' },
      { letra: 'D', textoES: '10,00 m', textoEN: '10.00 m', correcta: false, expES: '10 m es la suma de los otros elementos.', expEN: '10 m is the sum of the other elements.' }
    ],
    escalera: {
      gatearES: 'Suma las partes conocidas (4,50 + 2 + 3,50 = 10 m). A 18 m restale 10 m y quedan 8 m.',
      gatearEN: 'Add known parts (4.50 + 2 + 3.50 = 10 m). Subtract 10 m from 18 m to get 8 m.',
      correrES: 'Diferencia longitudinal a escala 1:100: L = 18,00 m - 10,00 m = 8,00 m.',
      correrEN: 'Longitudinal difference at 1:100 scale: L = 18.00 m - 10.00 m = 8.00 m.',
      espacioES: 'Representa la franja de 8,00 m a escala 1:50 y cuantifica tepes de zacate.',
      espacioEN: 'Draw the 8.00 m strip at 1:50 scale and quantify sod rolls.'
    },
    nemotecniaES: '18 MENOS 10 = 8 METROS DE CESPED.',
    nemotecniaEN: '18 MINUS 10 = 8 METERS OF LAWN.',
    palabraES: 'REPLANTEO', palabraEN: 'LAYOUT',
    pistaES: 'Operacion tecnica de trasladar las medidas del plano de jardineria al terreno real.',
    pistaEN: 'Technical operation of transferring landscape plan dimensions to the actual ground.'
  },
  {
    id: '1009-05', codigo: '1009',
    especialidadES: 'Produccion Agricola y Pecuaria', especialidadEN: 'Crop & Livestock Production',
    subareaES: 'Maquinaria y Suelos', subareaEN: 'Machinery & Soils',
    enunciadoES: 'Se requiere fracturar una capa compactada ubicada a 40 cm de profundidad procurando poca inversion del suelo superficial. Cual implemento corresponde?',
    enunciadoEN: 'Which implement fractures a compacted soil layer at 40 cm depth with minimal topsoil inversion?',
    opciones: [
      { letra: 'A', textoES: 'Subsolador', textoEN: 'Subsoiler', correcta: true, expES: 'Correcto: El subsolador rompe capas profundas verticalmente sin voltear el suelo.', expEN: 'Correct: The subsoiler fractures deep layers vertically without inverting topsoil.' },
      { letra: 'B', textoES: 'Arado de discos', textoEN: 'Disc plow', correcta: false, expES: 'Invierte el prisma de suelo.', expEN: 'Inverts the soil layer.' },
      { letra: 'C', textoES: 'Rastra niveladora', textoEN: 'Leveling harrow', correcta: false, expES: 'Actua solo en la superficie.', expEN: 'Acts only on the surface.' },
      { letra: 'D', textoES: 'Cultivador rotativo', textoEN: 'Rotary tiller', correcta: false, expES: 'Pulveriza superficialmente.', expEN: 'Pulverizes the surface.' }
    ],
    escalera: {
      gatearES: 'Para romper suelo duro a 40 cm de profundidad sin revolver la tierra de arriba, usas el Subsolador.',
      gatearEN: 'To break hard soil at 40 cm depth without flipping the top layer, use a Subsoiler.',
      correrES: 'Labranza vertical profunda: fractura el piso de arado mejorando infiltracion y drenaje.',
      correrEN: 'Deep vertical tillage: fractures hardpan improving infiltration and root drainage.',
      espacioES: 'Calcula la potencia requerida del tractor para operar un subsolador de 3 puas.',
      espacioEN: 'Calculate tractor horsepower required to pull a 3-shank subsoiler.'
    },
    nemotecniaES: 'SUB-SUELO PROFUNDO = SUBSOLADOR.',
    nemotecniaEN: 'DEEP SUB-SOIL = SUBSOILER.',
    palabraES: 'SUBSOLADOR', palabraEN: 'SUBSOILER',
    pistaES: 'Implemento de labranza vertical que rompe capas compactadas profundas sin voltear el suelo.',
    pistaEN: 'Vertical tillage implement that fractures deep compacted soil layers.'
  },
  {
    id: '2003-19', codigo: '2003',
    especialidadES: 'Construccion Civil', especialidadEN: 'Civil Construction',
    subareaES: 'Estatica y Sistemas Estructurales', subareaEN: 'Statics & Structural Systems',
    enunciadoES: 'Se debe construir una viga de 6 m de longitud, sujeta en ambos extremos con apoyos simples, con una carga puntual en el centro de 1200 kgf. Cual es la reaccion RA para mantener el equilibrio estatico?',
    enunciadoEN: 'A 6 m simply supported beam carries a central point load of 1200 kgf. What is the reaction force RA required for static equilibrium?',
    opciones: [
      { letra: 'A', textoES: '0 kgf', textoEN: '0 kgf', correcta: false, expES: 'Sin reaccion vertical la viga colapsaria.', expEN: 'Without vertical reaction the beam would collapse.' },
      { letra: 'B', textoES: '600 kgf', textoEN: '600 kgf', correcta: true, expES: 'Correcto: Por simetria cada apoyo soporta la mitad: 1200 / 2 = 600 kgf.', expEN: 'Correct: By symmetry each support carries half: 1200 / 2 = 600 kgf.' },
      { letra: 'C', textoES: '1200 kgf', textoEN: '1200 kgf', correcta: false, expES: '1200 kgf es la carga total.', expEN: '1200 kgf is the total load.' },
      { letra: 'D', textoES: '2400 kgf', textoEN: '2400 kgf', correcta: false, expES: 'Duplica erroneamente la carga.', expEN: 'Incorrectly doubles the load.' }
    ],
    escalera: {
      gatearES: 'Si dos personas cargan un tronco de 6 m con 1200 kg justo en el medio, cada hombro soporta 600 kgf.',
      gatearEN: 'If two people carry a 6 m log with 1200 kg in the middle, each shoulder carries 600 kgf.',
      correrES: 'Sumatoria de momentos en B igual a cero: -(RA x 6 m) + (1200 kgf x 3 m) = 0 -> RA = 600 kgf.',
      correrEN: 'Sum of moments about B equals zero: -(RA x 6 m) + (1200 kgf x 3 m) = 0 -> RA = 600 kgf.',
      espacioES: 'Determina el momento flector maximo Mmax = (P x L) / 4 = 1800 kgf.m.',
      espacioEN: 'Determine the maximum bending moment Mmax = (P x L) / 4 = 1800 kgf.m.'
    },
    nemotecniaES: 'CARGA AL CENTRO = MITAD EN CADA APOYO (600 kgf).',
    nemotecniaEN: 'CENTER LOAD = HALF ON EACH SUPPORT (600 kgf).',
    palabraES: 'EQUILIBRIO', palabraEN: 'EQUILIBRIUM',
    pistaES: 'Condicion estatica de una viga donde la suma de fuerzas y momentos es igual a cero.',
    pistaEN: 'Static condition of a beam where the sum of forces and moments equals zero.'
  },
  {
    id: '2005-28', codigo: '2005',
    especialidadES: 'Dibujo Tecnico', especialidadEN: 'Technical Drafting',
    subareaES: 'Diseno de Escaleras', subareaEN: 'Staircase Design',
    enunciadoES: 'Se disena una escalera para salvar una altura de 3,06 m mediante 18 contrahuellas iguales. Cual altura corresponde a cada contrahuella?',
    enunciadoEN: 'A staircase is designed to overcome a 3.06 m height with 18 equal risers. What is the height of each riser?',
    opciones: [
      { letra: 'A', textoES: '0,165 m', textoEN: '0.165 m', correcta: false, expES: '18 x 0,165 m solo suma 2,97 m.', expEN: '18 x 0.165 m only equals 2.97 m.' },
      { letra: 'B', textoES: '0,16 m', textoEN: '0.16 m', correcta: false, expES: '18 x 0,16 m solo suma 2,88 m.', expEN: '18 x 0.16 m only equals 2.88 m.' },
      { letra: 'C', textoES: '0,15 m', textoEN: '0.15 m', correcta: false, expES: '18 x 0,15 m solo suma 2,70 m.', expEN: '18 x 0.15 m only equals 2.70 m.' },
      { letra: 'D', textoES: '0,17 m', textoEN: '0.17 m', correcta: true, expES: 'Correcto: 3,06 m / 18 contrahuellas = 0,17 m (17 cm por escalon).', expEN: 'Correct: 3.06 m / 18 risers = 0.17 m (17 cm per step).' }
    ],
    escalera: {
      gatearES: 'Divide la altura del piso (3,06 m) entre las 18 gradas: 3,06 / 18 = 0,17 m.',
      gatearEN: 'Divide total height (3.06 m) by 18 steps: 3.06 / 18 = 0.17 m.',
      correrES: 'Relacion de contrahuella C = H / N = 3,06 / 18 = 0,17 m (cumple norma <= 0,18 m).',
      correrEN: 'Riser formula R = H / N = 3.06 / 18 = 0.17 m (complies with code <= 0.18 m).',
      espacioES: 'Aplica la ley de Blondel (2C + H = 64 cm) para definir una huella de 30 cm.',
      espacioEN: 'Apply Blondel law (2R + T = 64 cm) to define a 30 cm tread.'
    },
    nemotecniaES: '3,06 ENTRE 18 = 0,17 METROS.',
    nemotecniaEN: '3.06 DIVIDED BY 18 = 0.17 METERS.',
    palabraES: 'CONTRAHUELLA', palabraEN: 'RISER',
    pistaES: 'Parte vertical de cada peldano o grada en el diseno de una escalera.',
    pistaEN: 'Vertical part of each step in staircase design.'
  },
  {
    id: '2006-60', codigo: '2006',
    especialidadES: 'Dibujo y Modelado Edificaciones', especialidadEN: 'Building Modeling & BIM',
    subareaES: 'Estructura Financiera', subareaEN: 'Financial Structure',
    enunciadoES: 'En el balance preliminar de una microempresa se registran Activos por 82 500 000 colones y Pasivos por 31 800 000 colones. A cual componente corresponde la diferencia entre ambos?',
    enunciadoEN: 'A business balance shows Assets of 82,500,000 and Liabilities of 31,800,000. Which component corresponds to the difference?',
    opciones: [
      { letra: 'A', textoES: 'Activo', textoEN: 'Asset', correcta: false, expES: 'El activo ya esta dado.', expEN: 'Assets are already given.' },
      { letra: 'B', textoES: 'Pasivo', textoEN: 'Liability', correcta: false, expES: 'El pasivo son las deudas.', expEN: 'Liabilities are debts.' },
      { letra: 'C', textoES: 'Ingreso', textoEN: 'Revenue', correcta: false, expES: 'Pertenece al estado de resultados.', expEN: 'Belongs to the income statement.' },
      { letra: 'D', textoES: 'Patrimonio', textoEN: 'Equity', correcta: true, expES: 'Correcto: Patrimonio = Activos - Pasivos (50 700 000 colones).', expEN: 'Correct: Equity = Assets - Liabilities (50,700,000 colones).' }
    ],
    escalera: {
      gatearES: 'Lo que tienes (Activos) menos lo que debes (Pasivos) es tu Patrimonio.',
      gatearEN: 'What you own (Assets) minus what you owe (Liabilities) is your Equity.',
      correrES: 'Ecuacion contable patrimonial: Patrimonio = 82 500 000 - 31 800 000 = 50 700 000.',
      correrEN: 'Accounting equation: Equity = 82,500,000 - 31,800,000 = 50,700,000.',
      espacioES: 'Integra el balance inicial dentro de un Business Model Canvas para un estudio BIM.',
      espacioEN: 'Integrate the opening balance into a Business Model Canvas for a BIM studio.'
    },
    nemotecniaES: 'ACTIVO MENOS PASIVO = PATRIMONIO.',
    nemotecniaEN: 'ASSETS MINUS LIABILITIES = EQUITY.',
    palabraES: 'PATRIMONIO', palabraEN: 'EQUITY',
    pistaES: 'Capital propio resultante de restar los pasivos al total de activos.',
    pistaEN: 'Net worth resulting from subtracting liabilities from total assets.'
  },
  {
    id: '2007-30', codigo: '2007',
    especialidadES: 'Diseno Grafico', especialidadEN: 'Graphic Design',
    subareaES: 'Preprensa e Impresion', subareaEN: 'Digital Prepress & Printing',
    enunciadoES: 'Antes de reproducir un PDF en imprenta se comprueban fuentes incrustadas, resolucion de imagenes, sangrados, espacios de color y transparencias. Cual procedimiento reune estas verificaciones?',
    enunciadoEN: 'Before printing a PDF, checking embedded fonts, image resolution, bleeds, color spaces, and transparencies is known as:',
    opciones: [
      { letra: 'A', textoES: 'Preflight', textoEN: 'Preflight', correcta: true, expES: 'Correcto: El Preflight audita todos los requisitos tecnicos antes de imprimir.', expEN: 'Correct: Preflight audits all technical requirements prior to printing.' },
      { letra: 'B', textoES: 'Trapping', textoEN: 'Trapping', correcta: false, expES: 'Es el traslape entre tintas.', expEN: 'Overlap between adjacent inks.' },
      { letra: 'C', textoES: 'Imposicion', textoEN: 'Imposition', correcta: false, expES: 'Es el acomodo de paginas en el pliego.', expEN: 'Page arrangement on the press sheet.' },
      { letra: 'D', textoES: 'Rasterizacion', textoEN: 'Rasterization', correcta: false, expES: 'Convierte vectores en pixeles.', expEN: 'Converts vectors into pixels.' }
    ],
    escalera: {
      gatearES: 'Es la inspeccion antes del vuelo (Preflight) para evitar errores al imprimir.',
      gatearEN: 'It is the pre-flight inspection to prevent printing errors.',
      correrES: 'Validacion tecnica automatizada bajo normas ISO PDF/X.',
      correrEN: 'Automated technical validation under ISO PDF/X standards.',
      espacioES: 'Configura un perfil Preflight para envases en CMYK + tinta plana.',
      espacioEN: 'Configure a Preflight profile for CMYK + spot color packaging.'
    },
    nemotecniaES: 'PRE-FLIGHT = Chequeo antes de despegar a imprenta.',
    nemotecniaEN: 'PRE-FLIGHT = Check before printing takeoff.',
    palabraES: 'PREFLIGHT', palabraEN: 'PREFLIGHT',
    pistaES: 'Revision digital previa a la impresion de fuentes, sangrados y resolucion.',
    pistaEN: 'Digital pre-print check of fonts, bleeds, and resolution.'
  },
  {
    id: '2008-13', codigo: '2008',
    especialidadES: 'Diseno Publicitario', especialidadEN: 'Advertising Design',
    subareaES: 'Canon de Figura Humana', subareaEN: 'Human Figure Canon',
    enunciadoES: 'En un boceto de figura humana adulta, la cabeza mide 24 mm y la altura total de la figura es de 192 mm. Cual canon de proporcion se aplico?',
    enunciadoEN: 'In an adult human figure sketch, the head measures 24 mm and total height is 192 mm. Which proportion canon was applied?',
    opciones: [
      { letra: 'A', textoES: 'Ideal (8 cabezas)', textoEN: 'Ideal (8 heads)', correcta: true, expES: 'Correcto: 192 mm / 24 mm = 8 cabezas exactas (Canon Ideal).', expEN: 'Correct: 192 mm / 24 mm = 8 exact heads (Ideal Canon).' },
      { letra: 'B', textoES: 'Natural (7,5 cabezas)', textoEN: 'Natural (7.5 heads)', correcta: false, expES: 'Daria 180 mm.', expEN: 'Would equal 180 mm.' },
      { letra: 'C', textoES: 'Heroico (8,5 cabezas)', textoEN: 'Heroic (8.5 heads)', correcta: false, expES: 'Daria 204 mm.', expEN: 'Would equal 204 mm.' },
      { letra: 'D', textoES: 'Infantil (5 cabezas)', textoEN: 'Child (5 heads)', correcta: false, expES: 'Daria 120 mm.', expEN: 'Would equal 120 mm.' }
    ],
    escalera: {
      gatearES: 'Divide la estatura total (192 mm) entre la cabeza (24 mm): 192 / 24 = 8 cabezas (Canon Ideal).',
      gatearEN: 'Divide total height (192 mm) by head size (24 mm): 192 / 24 = 8 heads (Ideal Canon).',
      correrES: 'Proporcion antropometrica clasica donde el cuerpo humano mide 8 modulos cefalicos.',
      correrEN: 'Classical anthropometric proportion where the adult body measures 8 head modules.',
      espacioES: 'Construye una hoja de giro de personaje publicitario aplicando el canon de 8 cabezas.',
      espacioEN: 'Build an advertising character turnaround sheet using the 8-head canon.'
    },
    nemotecniaES: '192 ENTRE 24 = 8 CABEZAS (Canon Ideal).',
    nemotecniaEN: '192 DIVIDED BY 24 = 8 HEADS (Ideal Canon).',
    palabraES: 'CANON', palabraEN: 'CANON',
    pistaES: 'Regla de proporcion anatomica que utiliza la cabeza como unidad modular.',
    pistaEN: 'Anatomical proportion rule using the head as a modular unit.'
  },
  {
    id: '4001-01', codigo: '4001',
    especialidadES: 'Desarrollo Web y Software', especialidadEN: 'Web & Software Development',
    subareaES: 'Bases de Datos y CSS Responsivo', subareaEN: 'Databases & Responsive CSS',
    enunciadoES: 'En una aplicacion web, el diseno debe reorganizar columnas, imagenes y menus automaticamente segun el ancho de pantalla del celular o monitor. Cual regla de CSS permite esto?',
    enunciadoEN: 'In a web app, the layout must automatically reorganize columns and menus based on screen width. Which CSS feature enables this?',
    opciones: [
      { letra: 'A', textoES: 'Reglas responsivas y consultas de medios (@media queries)', textoEN: 'Responsive rules and CSS @media queries', correcta: true, expES: 'Correcto: Las @media queries adaptan el diseno a cualquier pantalla.', expEN: 'Correct: CSS @media queries adapt layouts to any screen width.' },
      { letra: 'B', textoES: 'Tablas estaticas de ancho fijo en pixeles', textoEN: 'Static fixed-pixel tables', correcta: false, expES: 'Rompen el diseno en pantallas moviles.', expEN: 'Breaks layout on mobile screens.' },
      { letra: 'C', textoES: 'Marcas de corte para impresion offset', textoEN: 'Offset print crop marks', correcta: false, expES: 'Son exclusivas para papel impreso.', expEN: 'Exclusive for printed paper.' },
      { letra: 'D', textoES: 'Archivos sin hojas de estilo', textoEN: 'Unstyled plain files', correcta: false, expES: 'No adapta columnas.', expEN: 'Does not adapt columns.' }
    ],
    escalera: {
      gatearES: 'Para que una pagina se acomode sola en celular o computadora se usan Media Queries en CSS.',
      gatearEN: 'To make a webpage fit phones and monitors automatically, use CSS Media Queries.',
      correrES: 'Consultas de medios CSS (@media) combinadas con Grid y Flexbox.',
      correrEN: 'CSS @media queries combined with Grid and Flexbox.',
      espacioES: 'Desarrolla una PWA Offline-First en React (.jsx) con Tailwind CSS.',
      espacioEN: 'Build an Offline-First PWA in pure React (.jsx) with Tailwind CSS.'
    },
    nemotecniaES: 'PANTALLA CAMBIA = CSS MEDIA QUERIES.',
    nemotecniaEN: 'SCREEN CHANGES = CSS MEDIA QUERIES.',
    palabraES: 'RESPONSIVO', palabraEN: 'RESPONSIVE',
    pistaES: 'Diseno web que adapta automaticamente sus columnas al tamano de cada pantalla.',
    pistaEN: 'Web design that automatically adapts columns to each screen size.'
  }
];

export const JUEGO_SECUENCIAS = [
  {
    id: 'SEC-1',
    tituloES: '1003 - Beneficiado Humedo del Cafe (Item 54)',
    tituloEN: '1003 - Wet Coffee Processing (Item 54)',
    instruccionES: 'Selecciona en orden cronologico las 4 etapas posteriores al recibo del cafe maduro:',
    instruccionEN: 'Select in chronological order the 4 stages after receiving ripe coffee cherries:',
    pasosES: ['1. Despulpado del fruto', '2. Fermentacion del mucilago', '3. Lavado con agua limpia', '4. Secado del grano pergamino'],
    pasosEN: ['1. Depulping the cherry', '2. Mucilage fermentation', '3. Clean water washing', '4. Parchment drying']
  },
  {
    id: 'SEC-2',
    tituloES: '2007 - Produccion Grafica Impresa (Item 57)',
    tituloEN: '2007 - Print Production Workflow (Item 57)',
    instruccionES: 'Ordena las 5 etapas desde el pedido hasta la entrega del impreso:',
    instruccionEN: 'Order the 5 stages from client order to print delivery:',
    pasosES: ['1. Definicion del encargo', '2. Diseno y aprobacion', '3. Preprensa digital', '4. Impresion del tiraje', '5. Acabado y entrega'],
    pasosEN: ['1. Job definition', '2. Design & approval', '3. Digital prepress', '4. Press printing', '5. Finishing & delivery']
  },
  {
    id: 'SEC-3',
    tituloES: '2008 - Captura en Camara Digital (Item 42)',
    tituloEN: '2008 - Digital Camera Capture (Item 42)',
    instruccionES: 'Ordena el recorrido de la luz y los datos al tomar una fotografia digital:',
    instruccionEN: 'Order the light and data path when taking a digital photo:',
    pasosES: ['1. Diafragma regula la luz', '2. Obturador controla el tiempo', '3. Sensor captura la imagen', '4. Procesamiento digital'],
    pasosEN: ['1. Aperture regulates light', '2. Shutter controls time', '3. Sensor captures image', '4. Digital processing']
  },
  {
    id: 'SEC-4',
    tituloES: '2003 - Ruta Critica de Construccion (Item 44)',
    tituloEN: '2003 - Construction Critical Path (Item 44)',
    instruccionES: 'Ordena las 5 actividades con holgura cero (Ruta Critica) de la obra:',
    instruccionEN: 'Order the 5 zero-slack activities (Critical Path) of the project:',
    pasosES: ['1. a: Limpieza y excavacion', '2. b: Encofrado', '3. c: Acero de refuerzo', '4. f: Vaciado de concreto', '5. g: Curado del concreto'],
    pasosEN: ['1. a: Clearing & excavation', '2. b: Formwork', '3. c: Reinforcing steel', '4. f: Concrete pouring', '5. g: Concrete curing']
  }
];
