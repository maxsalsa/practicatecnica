export const DICCIONARIO_UI = {
  ES: {
    subtituloHeader: 'Plataforma Oficial de Educación Técnica y Académica • DUA Inclusivo',
    buscarPlaceholder: 'Buscar por código (1001, 2003), especialidad o concepto...',
    filtroTodas: 'Todas las Especialidades',
    selectorRegion: 'Contexto Territorial MEP:',
    tabJuegos: '🎮 5 Juegos Interactivos',
    tabPlan: '📋 Plan Cotidiano MEP',
    tabBlandas: '🤝 Cultura Empresarial',
    btnGoogleLogin: 'Acceder con Google',
    btnMejorarPro: '⚡ Activar PRO (Google Pay)',
    badgeSuperAdmin: 'SUPER ADMIN • Max Salazar Sánchez',
    badgeProActivo: '✅ PLAN PRO ACTIVO',
    modalPagoTitulo: 'Suscripción Automática PRO • pracTICAtecnica.com',
    modalPagoSub: 'Desbloquea las 10+ especialidades, descargas PDF/PPTX, generador de planeamiento MEP y simuladores ilimitados.',
    btnPagarGooglePay: 'Pagar Automáticamente con Google Pay',
    btnPagarSinpe: 'Confirmar SINPE Móvil (6090-6359)',
    juego1: '1️⃣ Simulador DUA',
    juego2: '2️⃣ Reto Millonario',
    juego3: '3️⃣ Ordena el Proceso',
    juego4: '4️⃣ Memoria Técnica',
    juego5: '5️⃣ Crucigrama Oficial',
    nivelGatear: '👶 1. Gatear (Base)',
    nivelCorrer: '🏃 2. Correr (MEP)',
    nivelEspacio: '🚀 3. Al Espacio (Ing.)',
    btnSiguiente: 'Siguiente Ítem Oficial ➔',
    btnRevelar: '💡 Mostrar Respuesta',
    docenteLabel: 'La persona docente',
    estudianteLabel: 'La persona estudiante',
    encargadoLabel: 'la persona encargada legal'
  },
  EN: {
    subtituloHeader: 'Official Technical & Academic Education Platform • Inclusive UDL',
    buscarPlaceholder: 'Search by code (1001, 2003), major, or technical concept...',
    filtroTodas: 'All Specialties',
    selectorRegion: 'Regional Teaching Context:',
    tabJuegos: '🎮 5 Interactive Games',
    tabPlan: '📋 Daily Lesson Plan',
    tabBlandas: '🤝 Workplace Soft Skills',
    btnGoogleLogin: 'Sign in with Google',
    btnMejorarPro: '⚡ Upgrade to PRO (Google Pay)',
    badgeSuperAdmin: 'SUPER ADMIN • Max Salazar Sánchez',
    badgeProActivo: '✅ PRO PLAN ACTIVE',
    modalPagoTitulo: 'Automatic PRO Subscription • pracTICAtecnica.com',
    modalPagoSub: 'Unlock all technical majors, PDF/PPTX exports, lesson plan generator, and unlimited simulators.',
    btnPagarGooglePay: 'Pay Automatically with Google Pay',
    btnPagarSinpe: 'Confirm SINPE Móvil (+506 6090-6359)',
    juego1: '1️⃣ UDL Simulator',
    juego2: '2️⃣ Millionaire Quiz',
    juego3: '3️⃣ Process Sequence',
    juego4: '4️⃣ Tech Memory Match',
    juego5: '5️⃣ Official Crossword',
    nivelGatear: '👶 1. Crawl (Intuition)',
    nivelCorrer: '🏃 2. Run (Standard)',
    nivelEspacio: '🚀 3. Space (Advanced)',
    btnSiguiente: 'Next Official Item ➔',
    btnRevelar: '💡 Reveal Answer',
    docenteLabel: 'The teacher',
    estudianteLabel: 'The student',
    encargadoLabel: 'the legal guardian'
  }
};

export const FAMILIAS_MENU = [
  { id: 'TODAS', es: '🌟 Todas', en: '🌟 All' },
  { id: 'AGRO', es: '🌱 Agro y Ambiente', en: '🌱 Agro & Environment' },
  { id: 'IND', es: '🏗️ Construcción y Dibujo', en: '🏗️ Civil & Drafting' },
  { id: 'ART', es: '🎨 Diseño y Publicidad', en: '🎨 Design & Media' },
  { id: 'TI', es: '💻 Software y Redes', en: '💻 Software & Cyber' }
];

export const ESPECIALIDADES_CATALOGO = [
  { codigo: '1001', familia: 'AGRO', icono: '🌱', nombreES: 'Agroecología', nombreEN: 'Agroecology' },
  { codigo: '1003', familia: 'AGRO', icono: '🍍', nombreES: 'Agroindustria Agrícola', nombreEN: 'Crop Food Processing' },
  { codigo: '1004', familia: 'AGRO', icono: '🧀', nombreES: 'Agroindustria Pecuaria', nombreEN: 'Livestock Food Processing' },
  { codigo: '1005', familia: 'AGRO', icono: '🌺', nombreES: 'Agrojardinería', nombreEN: 'Landscaping & Gardening' },
  { codigo: '1009', familia: 'AGRO', icono: '🚜', nombreES: 'Producción Agrícola y Pecuaria', nombreEN: 'Crop & Livestock Production' },
  { codigo: '2003', familia: 'IND', icono: '🏗️', nombreES: 'Construcción Civil', nombreEN: 'Civil Construction' },
  { codigo: '2005', familia: 'IND', icono: '📐', nombreES: 'Dibujo Técnico', nombreEN: 'Technical Drafting' },
  { codigo: '2006', familia: 'IND', icono: '🏢', nombreES: 'Dibujo y Modelado Edificaciones', nombreEN: 'Building Modeling & BIM' },
  { codigo: '2007', familia: 'ART', icono: '🎨', nombreES: 'Diseño Gráfico', nombreEN: 'Graphic Design' },
  { codigo: '2008', familia: 'ART', icono: '📢', nombreES: 'Diseño Publicitario', nombreEN: 'Advertising Design' },
  { codigo: '4001', familia: 'TI', icono: '💻', nombreES: 'Desarrollo Web y Software', nombreEN: 'Web & Software Development' },
  { codigo: '4002', familia: 'TI', icono: '🛡️', nombreES: 'Ciberseguridad y Redes', nombreEN: 'Cybersecurity & Networks' }
];

export const CONTEXTOS_REGIONALES = {
  limon: {
    nombreES: '🌊 Costero / Limón', nombreEN: '🌊 Coastal / Limón',
    enfoqueES: 'Aplicar a logística portuaria, humedad de 3600-4000 mm, corrosión salina, cacao, banano, pesca y turismo costero.',
    enfoqueEN: 'Apply to port logistics, 3600-4000 mm rainfall, salt corrosion, cocoa, banana, fisheries, and coastal tourism.',
    retoES: 'Diseñar solución técnica para controlar condensación y alta humedad a 25 °C en instalaciones costeras.',
    retoEN: 'Design a technical solution to control vapor condensation and high humidity at 25 °C in coastal facilities.'
  },
  rural: {
    nombreES: '🚜 Rural / Altura', nombreEN: '🚜 Rural / Highlands',
    enfoqueES: 'Vincular con cooperativas, laderas del 12% al 15% con pasto vetiver, riego en trópico seco y plantas lácteas.',
    enfoqueEN: 'Connect with cooperatives, 12%-15% slopes with vetiver grass, dry-tropics irrigation, and dairy plants.',
    retoES: 'Calcular parámetros productivos y de conservación de suelo en fincas con pendiente pronunciada.',
    retoEN: 'Calculate production and soil conservation parameters on steep-slope farms.'
  },
  indigena: {
    nombreES: '🌿 Indígena / Bosque', nombreEN: '🌿 Indigenous / Forest',
    enfoqueES: 'Integrar sistemas agrosilvopastoriles, abejas nativas Mariola, senderos de bajo impacto y apps Offline-First.',
    enfoqueEN: 'Integrate agrosilvopastoral systems, native Mariola bees, low-impact trails, and Offline-First apps.',
    retoES: 'Estructurar un proyecto comunitario sostenible protegiendo nacientes de agua y biodiversidad local.',
    retoEN: 'Structure a sustainable community project protecting water springs and local biodiversity.'
  },
  urbano: {
    nombreES: '🏙️ Urbano / GAM', nombreEN: '🏙️ Urban / GAM',
    enfoqueES: 'Enfocar en edificios multifamiliares, Ley N.° 7600, NFPA 101, paneles fotovoltaicos y servicios digitales.',
    enfoqueEN: 'Focus on multi-family buildings, Law 7600 accessibility, NFPA 101, solar panels, and digital services.',
    retoES: 'Auditar el cumplimiento normativo de accesibilidad, seguridad e infraestructura digital en un entorno urbano.',
    retoEN: 'Audit regulatory compliance for accessibility, safety, and digital infrastructure in an urban environment.'
  }
};

export const BIBLIA_HABILIDADES_BLANDAS = [
  {
    tituloES: '1. Saludo Ejecutivo y Presencia Profesional',
    tituloEN: '1. Executive Greeting & Professional Presence',
    habitoES: 'La persona estudiante saluda mirando a los ojos al ingresar al taller o aula y porta su equipo de protección completo.',
    habitoEN: 'The student greets making eye contact upon entering the lab or classroom while wearing full personal protective equipment.',
    empresaES: 'Proyecta liderazgo, cortesía y confiabilidad inmediata ante clientes y auditorías.',
    empresaEN: 'Projects leadership, courtesy, and immediate reliability in front of clients and audits.'
  },
  {
    tituloES: '2. Puntualidad y Respeto a la Ruta Crítica',
    tituloEN: '2. Punctuality & Critical Path Respect',
    habitoES: 'Cumplir entregas puntualmente sin retrasar las actividades con holgura cero del equipo.',
    habitoEN: 'Meet deadlines punctually without delaying zero-slack critical path team activities.',
    empresaES: 'Evita pérdidas financieras y cuellos de botella en proyectos industriales.',
    empresaEN: 'Prevents financial losses and bottlenecks in industrial projects.'
  },
  {
    tituloES: '3. Ortografía Impecable, Dicción y Ética Documental',
    tituloEN: '3. Flawless Spelling, Diction & Data Ethics',
    habitoES: 'Expresarse con vocabulario técnico, redactar sin faltas ortográficas y solicitar autorización antes de divulgar archivos.',
    habitoEN: 'Speak with technical precision, write without spelling errors, and request authorization before sharing files.',
    empresaES: 'Protege el secreto industrial y eleva el prestigio corporativo.',
    empresaEN: 'Protects trade secrets and elevates corporate prestige.'
  },
  {
    tituloES: '4. Cultura 5S y Cero Actos Inseguros',
    tituloEN: '4. 5S Culture & Zero Unsafe Acts',
    habitoES: 'Jamás utilizar audífonos cerca de maquinaria, bloquear la energía antes de limpiar y dejar el puesto ordenado al salir.',
    habitoEN: 'Never wear headphones near machinery, lock out energy before cleaning, and leave workstations tidy.',
    empresaES: 'Previene accidentes laborales graves y elimina reprocesos.',
    empresaEN: 'Prevents severe workplace accidents and eliminates rework.'
  }
];

export const BANCO_ITEMS_2026 = [
  {
    id: '2003-19', codigo: '2003',
    especialidadES: 'Construcción Civil', especialidadEN: 'Civil Construction',
    subareaES: 'Estática y Sistemas Estructurales', subareaEN: 'Statics & Structural Systems',
    enunciadoES: 'Se debe construir una viga de 6 m de longitud, sujeta en ambos extremos con apoyos simples, con una carga puntual en el centro de 1200 kgf. ¿Cuál es la reacción RA para que el sistema se encuentre en equilibrio estático?',
    enunciadoEN: 'A 6 m simply supported beam carries a central point load of 1200 kgf. What is the reaction force RA required for static equilibrium?',
    opciones: [
      { letra: 'A', textoES: '0 kgf', textoEN: '0 kgf', correcta: false, expES: 'Sin reacción vertical la viga colapsaría.', expEN: 'Without vertical reaction the beam would collapse.' },
      { letra: 'B', textoES: '600 kgf', textoEN: '600 kgf', correcta: true, expES: '¡Exacto! Por simetría cada apoyo soporta la mitad: 1200 / 2 = 600 kgf.', expEN: 'Correct! By symmetry each support carries half: 1200 / 2 = 600 kgf.' },
      { letra: 'C', textoES: '1200 kgf', textoEN: '1200 kgf', correcta: false, expES: '1200 kgf es la carga total entre ambos apoyos.', expEN: '1200 kgf is the total load shared by both supports.' },
      { letra: 'D', textoES: '2400 kgf', textoEN: '2400 kgf', correcta: false, expES: 'Duplica erróneamente la carga central.', expEN: 'Incorrectly doubles the central load.' }
    ],
    escalera: {
      gatearES: 'Si dos personas cargan un tronco de 6 m con 1200 kg justo en el medio, cada hombro carga la mitad: 600 kgf.',
      gatearEN: 'If two people carry a 6 m beam with 1200 kg right in the middle, each shoulder supports half: 600 kgf.',
      correrES: 'Sumatoria de momentos en B igual a cero: -(RA x 6 m) + (1200 kgf x 3 m) = 0 -> RA = 600 kgf.',
      correrEN: 'Sum of moments about B equals zero: -(RA x 6 m) + (1200 kgf x 3 m) = 0 -> RA = 600 kgf.',
      espacioES: 'Calcula el momento flector máximo en el centro del claro: Mmax = (P x L) / 4 = 1800 kgf·m.',
      espacioEN: 'Calculate the maximum bending moment at mid-span: Mmax = (P x L) / 4 = 1800 kgf·m.'
    },
    nemotecniaES: 'CARGA AL CENTRO = MITAD EN CADA APOYO (600 kgf).',
    nemotecniaEN: 'CENTER LOAD = HALF ON EACH SUPPORT (600 kgf).',
    palabraES: 'EQUILIBRIO', palabraEN: 'EQUILIBRIUM',
    pistaES: 'Condición estática de una estructura donde la suma de fuerzas y momentos es igual a cero.',
    pistaEN: 'Static condition of a structure where the sum of forces and moments equals zero.'
  },
  {
    id: '1004-29', codigo: '1004',
    especialidadES: 'Agroindustria Pecuaria', especialidadEN: 'Livestock Food Processing',
    subareaES: 'Control de Calidad Lácteo', subareaEN: 'Dairy Quality Control',
    enunciadoES: 'Una muestra de leche contiene 0,45 g de ácido láctico en un volumen de 250 mL. Si el sistema exige registrar el resultado en gramos por litro (g/L), ¿cuál concentración debe consignarse?',
    enunciadoEN: 'A milk sample contains 0.45 g of lactic acid in a 250 mL volume. What concentration must be recorded in grams per liter (g/L)?',
    opciones: [
      { letra: 'A', textoES: '0,18 g/L', textoEN: '0.18 g/L', correcta: false, expES: 'Error de división.', expEN: 'Division error.' },
      { letra: 'B', textoES: '1,80 g/L', textoEN: '1.80 g/L', correcta: true, expES: '¡Correcto! Como 1 L tiene cuatro veces 250 mL, multiplicas 0,45 g x 4 = 1,80 g/L.', expEN: 'Correct! Since 1 L is four times 250 mL, multiply 0.45 g x 4 = 1.80 g/L.' },
      { letra: 'C', textoES: '4,50 g/L', textoEN: '4.50 g/L', correcta: false, expES: 'Multiplicó por 10 en lugar de 4.', expEN: 'Multiplied by 10 instead of 4.' },
      { letra: 'D', textoES: '18,00 g/L', textoEN: '18.00 g/L', correcta: false, expES: '18 corresponde a grados Dornic, no a g/L.', expEN: '18 corresponds to Dornic degrees, not g/L.' }
    ],
    escalera: {
      gatearES: 'En 1 litro caben 4 vasos de 250 mL. Multiplica 0,45 por 4 = 1,80 g/L.',
      gatearEN: 'Four 250 mL cups fit in 1 liter. Multiply 0.45 by 4 = 1.80 g/L.',
      correrES: 'Conversión estequiométrica: (0,45 g / 0,250 L) = 1,80 g/L.',
      correrEN: 'Stoichiometric conversion: (0.45 g / 0.250 L) = 1.80 g/L.',
      espacioES: 'Convierte 1,80 g/L a grados Dornic (18 °D) y verifica su aptitud térmica.',
      espacioEN: 'Convert 1.80 g/L to Dornic degrees (18 °D) and verify thermal stability.'
    },
    nemotecniaES: '250 mL x 4 = 1 LITRO (Multiplica por 4).',
    nemotecniaEN: '250 mL x 4 = 1 LITER (Multiply by 4).',
    palabraES: 'LACTICO', palabraEN: 'LACTIC',
    pistaES: 'Ácido orgánico producido al fermentar la lactosa de la leche.',
    pistaEN: 'Organic acid produced when fermenting milk lactose.'
  },
  {
    id: '1001-56', codigo: '1001',
    especialidadES: 'Agroecología', especialidadEN: 'Agroecology',
    subareaES: 'Sistemas Acuícolas Integrados', subareaEN: 'Integrated Aquaculture Systems',
    enunciadoES: 'En una unidad productiva se integran la crianza de tilapia y el cultivo de hortalizas: disminuye el consumo de agua, los compuestos nitrogenados son transformados en el sistema y el agua retorna a los peces. ¿Cuál sistema se describe?',
    enunciadoEN: 'Tilapia farming and vegetables are integrated: water consumption drops, nitrogen compounds feed the plants, and water returns to the fish tank. What system is described?',
    opciones: [
      { letra: 'A', textoES: 'Cultivo en jaulas', textoEN: 'Cage culture', correcta: false, expES: 'No integra hortalizas.', expEN: 'Does not integrate vegetables.' },
      { letra: 'B', textoES: 'Piscicultura extensiva', textoEN: 'Extensive fish farming', correcta: false, expES: 'No incluye biofiltración hidropónica.', expEN: 'Does not include hydroponic biofiltration.' },
      { letra: 'C', textoES: 'Flujo acuícola continuo', textoEN: 'Continuous flow aquaculture', correcta: false, expES: 'Es un sistema abierto.', expEN: 'It is an open system.' },
      { letra: 'D', textoES: 'Producción acuapónica', textoEN: 'Aquaponic production', correcta: true, expES: '¡Exacto! Acuaponía combina acuicultura y cultivo hidropónico en recirculación.', expEN: 'Exact! Aquaponics combines aquaculture and hydroponics in recirculation.' }
    ],
    escalera: {
      gatearES: 'Los peces nutren a las plantas y las plantas limpian el agua para los peces: Acuaponía.',
      gatearEN: 'Fish feed the plants and plants clean the water for the fish: Aquaponics.',
      correrES: 'Bacterias nitrificantes convierten el amonio de los peces en nitratos para las hortalizas.',
      correrEN: 'Nitrifying bacteria convert fish ammonia into nitrates for the vegetables.',
      espacioES: 'Dimensiona un biofiltro para 500 L de agua con tilapia y cama hidropónica de lechuga.',
      espacioEN: 'Size a biofilter for 500 L of tilapia water and a lettuce hydroponic bed.'
    },
    nemotecniaES: 'ACUA (Peces) + PONÍA (Hidroponía) = Acuaponía.',
    nemotecniaEN: 'AQUA (Fish) + PONICS (Hydroponics) = Aquaponics.',
    palabraES: 'ACUAPONIA', palabraEN: 'AQUAPONICS',
    pistaES: 'Sistema simbiótico que integra peces y plantas en recirculación de agua.',
    pistaEN: 'Symbiotic system integrating fish and plants in recirculating water.'
  },
  {
    id: '2007-30', codigo: '2007',
    especialidadES: 'Diseño Gráfico', especialidadEN: 'Graphic Design',
    subareaES: 'Preprensa e Impresión', subareaEN: 'Digital Prepress & Printing',
    enunciadoES: 'Antes de reproducir un PDF en imprenta se comprueban fuentes incrustadas, resolución de imágenes, sangrados, espacios de color y transparencias. ¿Cuál procedimiento reúne estas verificaciones?',
    enunciadoEN: 'Before printing a PDF, checking embedded fonts, image resolution, bleeds, color spaces, and transparencies is known as:',
    opciones: [
      { letra: 'A', textoES: 'Preflight', textoEN: 'Preflight', correcta: true, expES: '¡Correcto! El Preflight audita todos los requisitos técnicos antes de imprimir.', expEN: 'Correct! Preflight audits all technical requirements prior to printing.' },
      { letra: 'B', textoES: 'Trapping', textoEN: 'Trapping', correcta: false, expES: 'Es el traslape entre tintas.', expEN: 'Overlap between adjacent inks.' },
      { letra: 'C', textoES: 'Imposición', textoEN: 'Imposition', correcta: false, expES: 'Es el acomodo de páginas en el pliego.', expEN: 'Page arrangement on the press sheet.' },
      { letra: 'D', textoES: 'Rasterización', textoEN: 'Rasterization', correcta: false, expES: 'Convierte vectores en píxeles.', expEN: 'Converts vectors into pixels.' }
    ],
    escalera: {
      gatearES: 'Es la inspección "antes del vuelo" (Preflight) para evitar errores al imprimir.',
      gatearEN: 'It is the pre-flight inspection to prevent printing errors.',
      correrES: 'Validación técnica automatizada bajo normas ISO PDF/X.',
      correrEN: 'Automated technical validation under ISO PDF/X standards.',
      espacioES: 'Configura un perfil Preflight para envases en CMYK + tinta plana.',
      espacioEN: 'Configure a Preflight profile for CMYK + spot color packaging.'
    },
    nemotecniaES: 'PRE-FLIGHT = Chequeo antes de despegar a imprenta.',
    nemotecniaEN: 'PRE-FLIGHT = Check before printing takeoff.',
    palabraES: 'PREFLIGHT', palabraEN: 'PREFLIGHT',
    pistaES: 'Revisión digital previa a la impresión de fuentes, sangrados y resolución.',
    pistaEN: 'Digital pre-print check of fonts, bleeds, and resolution.'
  }
];

export const JUEGO_SECUENCIAS = [
  {
    id: 'SEC-1',
    tituloES: '1003 - Beneficiado Húmedo del Café (Ítem 54)',
    tituloEN: '1003 - Wet Coffee Processing (Item 54)',
    instruccionES: 'Selecciona en orden cronológico las 4 etapas posteriores al recibo del café maduro:',
    instruccionEN: 'Select in chronological order the 4 stages after receiving ripe coffee cherries:',
    pasosES: ['1. Despulpado del fruto', '2. Fermentación del mucílago', '3. Lavado con agua limpia', '4. Secado del grano pergamino'],
    pasosEN: ['1. Depulping the cherry', '2. Mucilage fermentation', '3. Clean water washing', '4. Parchment drying']
  },
  {
    id: 'SEC-2',
    tituloES: '2007 - Producción Gráfica Impresa (Ítem 57)',
    tituloEN: '2007 - Print Production Workflow (Item 57)',
    instruccionES: 'Ordena las 5 etapas desde el pedido hasta la entrega del impreso:',
    instruccionEN: 'Order the 5 stages from client order to print delivery:',
    pasosES: ['1. Definición del encargo', '2. Diseño y aprobación', '3. Preprensa digital', '4. Impresión del tiraje', '5. Acabado y entrega'],
    pasosEN: ['1. Job definition', '2. Design & approval', '3. Digital prepress', '4. Press printing', '5. Finishing & delivery']
  }
];
