export const DICCIONARIO_UI = {
  ES: {
    agradecimiento: 'Orden General de Produccion Activa - Excelencia Kaizen, Cortesia y Trazabilidad Total MEP',
    subtituloHeader: 'Trazabilidad de Saberes + Reforzamiento + 3 Practicas (3 Intentos) + 2 Simulacros (60 Items) + RBAC & Google Pay',
    buscarPlaceholder: 'Buscar letra por letra: codigo (1001, 2003), saber esencial, materia, nivel (DUA, Facil, Alto)...',
    tabPracticas: '1. 3 Practicas Guiadas (3 Intentos)',
    tabTrazabilidad: '2. Trazabilidad de Saberes y Reforzamiento',
    tabSimulacros: '3. 2 Simulacros Ciegos (60 Items)',
    tabAdminRbac: '4. SuperAdmin RBAC, Pagos y Auditoria',
    tabGenerador: '5. Generador 1000x1000 y Reglas PISA/MEP'
  },
  EN: {
    agradecimiento: 'General Production Order Active - Kaizen Excellence, Courtesy & Full MEP Traceability',
    subtituloHeader: 'Knowledge Traceability + Reinforcement + 3 Guided Practices + 2 Blind Mock Exams (60 Items) + RBAC & Google Pay',
    buscarPlaceholder: 'Search letter by letter: code (1001, 2003), essential knowledge, subject, level...',
    tabPracticas: '1. 3 Guided Practices (3 Attempts)',
    tabTrazabilidad: '2. Knowledge Traceability & Reinforcement',
    tabSimulacros: '3. 2 Blind Mock Exams (60 Items)',
    tabAdminRbac: '4. SuperAdmin RBAC, Payments & Audit',
    tabGenerador: '5. 1000x1000 Generator & PISA/MEP Rules'
  }
};

export const ROLES_RBAC = [
  {
    rol: 'SUPER_ADMIN',
    nombre: 'SUPER_ADMIN (Max Salazar Sanchez)',
    permisos: ['Acceso Total', 'Auditoria de Pagos', 'Control de Usuarios RBAC', 'Inyeccion de Items', 'Reinicio de Intentos', 'Exportacion Oficial']
  },
  {
    rol: 'DOCENTE',
    nombre: 'PERSONA DOCENTE (MEP / ETP / Academico)',
    permisos: ['Generar Planes Cotidianos MEP', 'Ver Trazabilidad de Seccion', 'Asignar Practicas de Reforzamiento']
  },
  {
    rol: 'ESTUDIANTE',
    nombre: 'PERSONA ESTUDIANTE (Primaria / Secundaria / ETP)',
    permisos: ['3 Practicas Guiadas (3 intentos)', '2 Simulacros de 60 Preguntas', 'Reforzamiento Personalizado DUA']
  },
  {
    rol: 'ENCARGADO_LEGAL',
    nombre: 'PERSONA ENCARGADA LEGAL (Hogar)',
    permisos: ['Consultar Avance de Saberes', 'Ver Certificados de Simulacro', 'Gestionar Suscripcion Google Pay / SINPE']
  }
];

export const BITACORA_INICIAL_ADMIN = [
  { id: 'LOG-101', fecha: '2026-11-10 15:00', usuario: 'Max Salazar Sanchez', rol: 'SUPER_ADMIN', accion: 'Activacion de Orden General de Produccion y Control RBAC', estado: 'VERIFICADO' },
  { id: 'LOG-102', fecha: '2026-11-10 15:05', usuario: 'docente.ctp@est.mep.go.cr', rol: 'DOCENTE', accion: 'Suscripcion PRO Automatica via Google Pay (Billetera Google) - CRC 5,000', estado: 'PAGADO' },
  { id: 'LOG-103', fecha: '2026-11-10 15:10', usuario: 'estudiante.12@est.mep.go.cr', rol: 'ESTUDIANTE', accion: 'Finalizo Simulacro Oficial #1 (60 preguntas) - Nota: 85/100', estado: 'CERTIFICADO' },
  { id: 'LOG-104', fecha: '2026-11-10 15:12', usuario: 'suscriptor.sinpe@gmail.com', rol: 'DOCENTE', accion: 'Pago SINPE Movil 6090-6359 confirmado - Plan Anual PRO', estado: 'PAGADO' }
];

export const NIVELES_DIFICULTAD = [
  { id: 'TODOS', nombre: 'Todos los Niveles' },
  { id: 'DUA', nombre: 'Nivel DUA (Apoyo Guiado)' },
  { id: 'FACIL', nombre: 'Nivel Facil (Base)' },
  { id: 'MEDIANO', nombre: 'Nivel Mediano (Procedimental)' },
  { id: 'INTERMEDIO', nombre: 'Nivel Intermedio (Analisis)' },
  { id: 'ALTO', nombre: 'Nivel Alto (PISA / Certificacion)' }
];

export const ESPECIALIDADES_CATALOGO = [
  { codigo: '1001', familia: 'ETP_AGRO', nombreES: 'Agroecologia' },
  { codigo: '1003', familia: 'ETP_AGRO', nombreES: 'Agroindustria Agricola' },
  { codigo: '1004', familia: 'ETP_AGRO', nombreES: 'Agroindustria Pecuaria' },
  { codigo: '1005', familia: 'ETP_AGRO', nombreES: 'Agrojardineria' },
  { codigo: '1009', familia: 'ETP_AGRO', nombreES: 'Produccion Agricola y Pecuaria' },
  { codigo: '2003', familia: 'ETP_IND', nombreES: 'Construccion Civil' },
  { codigo: '2005', familia: 'ETP_IND', nombreES: 'Dibujo Tecnico' },
  { codigo: '2006', familia: 'ETP_IND', nombreES: 'Dibujo y Modelado Edificaciones' },
  { codigo: '2007', familia: 'ETP_ART', nombreES: 'Diseno Grafico' },
  { codigo: '2008', familia: 'ETP_ART', nombreES: 'Diseno Publicitario' },
  { codigo: '4001', familia: 'ETP_TI', nombreES: 'Desarrollo Web y Software' },
  { codigo: '4002', familia: 'ETP_TI', nombreES: 'Ciberseguridad y Redes' },
  { codigo: 'SEC-MAT', familia: 'ACADEMICA', nombreES: 'Matematicas (Primaria y Secundaria)' },
  { codigo: 'SEC-CIE', familia: 'ACADEMICA', nombreES: 'Ciencias (Fisica, Quimica, Biologia)' },
  { codigo: 'ADM-PISA', familia: 'ADMISION', nombreES: 'PISA + Admision UCR/TEC/UNA' }
];

export const LINEAMIENTOS_EVALUACION = [
  {
    categoria: '1. Reglas Oficiales de Practicas Guiadas, Trazabilidad y Simulacros MEP 2026',
    reglas: [
      '3 Practicas Guiadas Explicativas: Cada practica permite hasta 3 intentos y muestra de inmediato el concepto base, la formula y por que la opcion elegida es correcta o incorrecta.',
      'Trazabilidad de Saberes y Reforzamiento: Cada respuesta alimenta automaticamente el Mapa de Dominio del Estudiante y genera Practicas Personalizadas de Reforzamiento en los saberes con dominio menor al 75%.',
      '2 Simulacros Oficiales de 60 Preguntas: Compuestos por 60 items aleatorios multinivel. No permiten ver notas ni explicaciones hasta finalizar y entregar las 60 preguntas.'
    ]
  },
  {
    categoria: '2. Marco Internacional PISA y Certificaciones Tecnicas (ISO, HACCP, NEC, CFIA)',
    reglas: [
      'Niveles DUA y Facil (PISA 1-2): Identificacion directa de conceptos y relaciones de un paso.',
      'Niveles Mediano e Intermedio (PISA 3-4): Aplicacion de procedimientos tecnicos, conversiones volumetricas, escalas y equilibrio estatico.',
      'Nivel Alto (PISA 5-6): Auditoria normativa (Ley 8591, Ley 7779, Ley 7600, ISO 9001/14001, HACCP, Preflight PDF/X) y toma de decisiones.'
    ]
  }
];

export const BANCO_ITEMS_BASE = [
  {
    id: '1001-05', codigo: '1001', dificultad: 'INTERMEDIO',
    saberId: 'SAB-1001-PTAR', saberNombre: 'Tratamiento Fisico-Quimico-Biologico de Aguas Residuales (DBO5)',
    especialidadES: 'Agroecologia', subareaES: 'Gestion Ambiental y Efluentes',
    conceptoBase: 'Secuencia de depuracion: Etapa I Fisica (sedimenta solidos) -> Etapa II Quimica (coagula turbidez) -> Etapa III Biologica (baja DBO5).',
    enunciadoES: 'En una planta agroindustrial se trata un efluente en tres etapas: Etapa I disminuye solidos sedimentables; Etapa II reduce la turbidez; Etapa III disminuye la DBO5. Cual secuencia de procesos explica los resultados?',
    opciones: [
      { letra: 'A', textoES: 'Biologico - fisico - quimico', correcta: false, expES: 'El tratamiento biologico va al final.' },
      { letra: 'B', textoES: 'Quimico - biologico - fisico', correcta: false, expES: 'Primero se sedimentan fisicamente los solidos gruesos.' },
      { letra: 'C', textoES: 'Fisico - biologico - quimico', correcta: false, expES: 'La reduccion de DBO5 es biologica en la Etapa III.' },
      { letra: 'D', textoES: 'Fisico - quimico - biologico', correcta: true, expES: 'Correcto: I Fisico (sedimenta), II Quimico (coagula turbidez), III Biologico (microorganismos reducen la DBO5).' }
    ],
    escalera: {
      gatearES: '1. Cuelas piedras (Fisico), 2. Aclaras el agua turbia (Quimico) y 3. Bacterias comen materia organica (Biologico).',
      correrES: 'Secuencia PTAR oficial: primario fisico, secundario quimico y terciario/biologico para abatir DBO5.',
      espacioES: 'Disena un tren de tratamiento para una planta lactea con biodigestor y biojardinera.'
    },
    nemotecniaES: 'FI-QUI-BIO: Fisico asienta, Quimico aclara, Biologico baja DBO5.'
  },
  {
    id: '1001-56', codigo: '1001', dificultad: 'FACIL',
    saberId: 'SAB-1001-ACUA', saberNombre: 'Sistemas Simbioticos de Produccion Acuaponica',
    especialidadES: 'Agroecologia', subareaES: 'Sistemas Integrados',
    conceptoBase: 'La acuaponia recircula el agua entre estanques de peces (tilapia) y cultivos hidroponicos de hortalizas.',
    enunciadoES: 'Se integran la crianza de tilapia y el cultivo de hortalizas: disminuye el consumo de agua, los compuestos nitrogenados son transformados en el sistema y el agua retorna al componente acuicola. Cual sistema se describe?',
    opciones: [
      { letra: 'A', textoES: 'Cultivo en jaulas', correcta: false, expES: 'No integra hortalizas ni recirculacion.' },
      { letra: 'B', textoES: 'Piscicultura extensiva', correcta: false, expES: 'No incluye biofiltro hidroponico.' },
      { letra: 'C', textoES: 'Flujo acuicola continuo', correcta: false, expES: 'No recircula el agua desde cultivos vegetales.' },
      { letra: 'D', textoES: 'Produccion acuaponica', correcta: true, expES: 'Correcto: Acuaponia integra acuicultura y cultivo hidroponico con recirculacion de nutrientes.' }
    ],
    escalera: {
      gatearES: 'Los peces abonan a las plantas y las plantas limpian el agua para los peces: Acuaponia.',
      correrES: 'Bacterias nitrificantes transforman el amonio de los peces en nitratos para las hortalizas.',
      espacioES: 'Dimensiona un biofiltro para 1000 L de agua con tilapia y cama de lechuga.'
    },
    nemotecniaES: 'ACUA (Peces) + PONIA (Hidroponia) = Acuaponia.'
  },
  {
    id: '1003-09', codigo: '1003', dificultad: 'MEDIANO',
    saberId: 'SAB-1003-AW', saberNombre: 'Control de Actividad de Agua (aw) mediante Grados Brix',
    especialidadES: 'Agroindustria Agricola', subareaES: 'Conservacion de Alimentos',
    conceptoBase: 'Al concentrar una mermelada a 65 grados Brix, la alta concentracion de solutos (azucares) disminuye la actividad de agua (aw).',
    enunciadoES: 'En el taller se concentra una mermelada hasta alcanzar 65 grados Brix, disminuyendo la disponibilidad de agua para el crecimiento microbiano. Cual principio explica su conservacion?',
    opciones: [
      { letra: 'A', textoES: 'Disminucion de la actividad de agua por alta concentracion de solutos', correcta: true, expES: 'Correcto: Los solutos a 65 Brix ligan el agua libre reduciendo la actividad de agua (aw).' },
      { letra: 'B', textoES: 'Inactivacion microbiana por congelacion', correcta: false, expES: 'No es un proceso de congelacion.' },
      { letra: 'C', textoES: 'Eliminacion absoluta de toda el agua', correcta: false, expES: 'El agua permanece en el producto pero ligada.' },
      { letra: 'D', textoES: 'Fermentacion acida de los azucares', correcta: false, expES: 'No es un proceso fermentativo.' }
    ],
    escalera: {
      gatearES: 'Tanta azucar (65 Brix) amarra el agua y los microbios no tienen agua libre para crecer.',
      correrES: 'La presion osmotica de los solidos solubles deprime la actividad de agua (aw).',
      espacioES: 'Calcula la formulacion de pectina y acido citrico para 100 kg de mermelada a 65 Brix.'
    },
    nemotecniaES: '65 BRIX = SOLUTOS AMARRAN EL AGUA (baja aw).'
  },
  {
    id: '1004-29', codigo: '1004', dificultad: 'MEDIANO',
    saberId: 'SAB-1004-LAC', saberNombre: 'Calculo Estequiometrico de Acidez Lactea en g/L',
    especialidadES: 'Agroindustria Pecuaria', subareaES: 'Control de Calidad Lacteo',
    conceptoBase: 'Para pasar de gramos en 250 mL a gramos por litro (1000 mL), se multiplica por 4.',
    enunciadoES: 'Se determina que una muestra de leche contiene 0,45 g de acido lactico en un volumen de 250 mL. Si debe registrarse en gramos por litro (g/L), cual concentracion corresponde?',
    opciones: [
      { letra: 'A', textoES: '0,18 g/L', correcta: false, expES: 'Error de division.' },
      { letra: 'B', textoES: '1,80 g/L', correcta: true, expES: 'Correcto: Como 1 L equivale a 4 veces 250 mL, multiplicamos 0,45 g x 4 = 1,80 g/L.' },
      { letra: 'C', textoES: '4,50 g/L', correcta: false, expES: 'Multiplico por 10 en lugar de 4.' },
      { letra: 'D', textoES: '18,00 g/L', correcta: false, expES: '18 corresponde a grados Dornic, no a g/L.' }
    ],
    escalera: {
      gatearES: 'En 1 litro caben 4 vasos de 250 mL. Multiplica 0,45 x 4 = 1,80 g/L.',
      correrES: 'Conversion: (0,45 g / 0,250 L) = 1,80 g/L.',
      espacioES: 'Relaciona 1,80 g/L (18 Dornic) con la estabilidad termica de la leche.'
    },
    nemotecniaES: '250 mL x 4 = 1 LITRO (Multiplica por 4).'
  },
  {
    id: '2003-19', codigo: '2003', dificultad: 'MEDIANO',
    saberId: 'SAB-2003-VIGA', saberNombre: 'Equilibrio Estatico y Reacciones en Vigas Simplemente Apoyadas',
    especialidadES: 'Construccion Civil', subareaES: 'Estatica y Estructuras',
    conceptoBase: 'En una viga simetrica con carga puntual en el centro, cada apoyo absorbe exactamente la mitad de la carga (RA = RB = P / 2).',
    enunciadoES: 'Se construye una viga de 6 m sujeta en ambos extremos con apoyos simples y una carga puntual en el centro de 1200 kgf. Cual es la reaccion RA para mantener el equilibrio estatico?',
    opciones: [
      { letra: 'A', textoES: '0 kgf', correcta: false, expES: 'Sin reaccion el apoyo colapsaria.' },
      { letra: 'B', textoES: '600 kgf', correcta: true, expES: 'Correcto: Por simetria cada apoyo soporta la mitad de 1200 kgf: 1200 / 2 = 600 kgf.' },
      { letra: 'C', textoES: '1200 kgf', correcta: false, expES: 'Es la carga total entre los dos apoyos.' },
      { letra: 'D', textoES: '2400 kgf', correcta: false, expES: 'Duplica erroneamente la carga.' }
    ],
    escalera: {
      gatearES: 'Si el peso de 1200 kgf esta justo en el centro, cada extremo sostiene la mitad: 600 kgf.',
      correrES: 'Sumatoria de momentos en B igual a cero: -(RA x 6 m) + (1200 kgf x 3 m) = 0 -> RA = 600 kgf.',
      espacioES: 'Calcula el momento flector maximo Mmax = (P x L) / 4 = 1800 kgf.m.'
    },
    nemotecniaES: 'CARGA AL CENTRO = MITAD EN CADA APOYO (600 kgf).'
  },
  {
    id: '2005-28', codigo: '2005', dificultad: 'FACIL',
    saberId: 'SAB-2005-ESC', saberNombre: 'Calculo Dimensional de Contrahuellas en Escaleras',
    especialidadES: 'Dibujo Tecnico', subareaES: 'Diseno Arquitectonico',
    conceptoBase: 'La altura de cada contrahuella se obtiene dividiendo la altura total a salvar entre el numero de contrahuellas.',
    enunciadoES: 'Se disena una escalera para salvar una altura de 3,06 m mediante 18 contrahuellas iguales. Cual altura corresponde a cada contrahuella?',
    opciones: [
      { letra: 'A', textoES: '0,165 m', correcta: false, expES: '18 x 0,165 m solo suma 2,97 m.' },
      { letra: 'B', textoES: '0,16 m', correcta: false, expES: '18 x 0,16 m solo suma 2,88 m.' },
      { letra: 'C', textoES: '0,15 m', correcta: false, expES: '18 x 0,15 m solo suma 2,70 m.' },
      { letra: 'D', textoES: '0,17 m', correcta: true, expES: 'Correcto: 3,06 m / 18 contrahuellas = 0,17 m (17 cm por grada).' }
    ],
    escalera: {
      gatearES: 'Divide la altura total (3,06 m) entre las 18 gradas: 3,06 / 18 = 0,17 m.',
      correrES: 'C = H / N = 3,06 / 18 = 0,17 m.',
      espacioES: 'Aplica la ley de Blondel (2C + H = 64 cm) para definir una huella de 30 cm.'
    },
    nemotecniaES: '3,06 ENTRE 18 = 0,17 METROS.'
  },
  {
    id: '2006-60', codigo: '2006', dificultad: 'INTERMEDIO',
    saberId: 'SAB-2006-PAT', saberNombre: 'Ecuacion Contable Fundamental y Calculo de Patrimonio',
    especialidadES: 'Dibujo y Modelado Edificaciones', subareaES: 'Gestion Financiera',
    conceptoBase: 'El Patrimonio neto es la diferencia entre el total de Activos y el total de Pasivos (Patrimonio = Activos - Pasivos).',
    enunciadoES: 'En el balance preliminar de una microempresa se identifican Activos por 82 500 000 colones y Pasivos por 31 800 000 colones. A cual componente corresponde la diferencia?',
    opciones: [
      { letra: 'A', textoES: 'Activo', correcta: false, expES: 'El activo ya fue dado.' },
      { letra: 'B', textoES: 'Pasivo', correcta: false, expES: 'El pasivo son las deudas.' },
      { letra: 'C', textoES: 'Ingreso', correcta: false, expES: 'Pertenece al estado de resultados.' },
      { letra: 'D', textoES: 'Patrimonio', correcta: true, expES: 'Correcto: Patrimonio = Activos - Pasivos (50 700 000 colones).' }
    ],
    escalera: {
      gatearES: 'Lo que tienes (Activos) menos lo que debes (Pasivos) es tu Patrimonio.',
      correrES: 'Ecuacion patrimonial: P = 82 500 000 - 31 800 000 = 50 700 000 colones.',
      espacioES: 'Integra este patrimonio en el Business Model Canvas de la empresa.'
    },
    nemotecniaES: 'ACTIVO MENOS PASIVO = PATRIMONIO.'
  },
  {
    id: '2007-30', codigo: '2007', dificultad: 'ALTO',
    saberId: 'SAB-2007-PRE', saberNombre: 'Control de Calidad y Verificacion Preflight en Preprensa Digital',
    especialidadES: 'Diseno Grafico', subareaES: 'Preprensa Digital',
    conceptoBase: 'El procedimiento de Preflight audita fuentes incrustadas, resolucion, sangrados, modos de color y transparencias antes de imprimir.',
    enunciadoES: 'Antes de reproducir un PDF en imprenta se comprueban fuentes incrustadas, resolucion de imagenes, sangrados, espacios de color y transparencias. Cual procedimiento reune estas verificaciones?',
    opciones: [
      { letra: 'A', textoES: 'Preflight', correcta: true, expES: 'Correcto: El Preflight verifica tecnicamente el archivo antes de filmacion CTP o impresion.' },
      { letra: 'B', textoES: 'Trapping', correcta: false, expES: 'Es el traslape entre tintas.' },
      { letra: 'C', textoES: 'Imposicion', correcta: false, expES: 'Es la distribucion de paginas en el pliego.' },
      { letra: 'D', textoES: 'Rasterizacion', correcta: false, expES: 'Es la conversion de vectores a pixeles.' }
    ],
    escalera: {
      gatearES: 'Es la inspeccion antes del vuelo (Preflight) para evitar fallos en la imprenta.',
      correrES: 'Auditoria automatizada bajo estandar ISO PDF/X.',
      espacioES: 'Configura un perfil Preflight para empaques flexograficos y offset.'
    },
    nemotecniaES: 'PRE-FLIGHT = Chequeo antes de despegar a imprenta.'
  }
];

export function generarBancoExpandido(itemsPersonalizados = []) {
  const niveles = ['DUA', 'FACIL', 'MEDIANO', 'INTERMEDIO', 'ALTO'];
  const lista = [...itemsPersonalizados, ...BANCO_ITEMS_BASE];

  // Variaciones parametricas vinculadas a Saberes Esenciales para Trazabilidad y Simulacros de 60 items
  const cargas = [800, 1000, 1400, 1600, 1800, 2000, 2400, 2800, 3200, 3600, 4000, 4400, 5000, 6000];
  cargas.forEach((c, i) => {
    const mitad = c / 2;
    const niv = niveles[i % niveles.length];
    lista.push({
      id: `GEN-VIGA-${i + 1}`,
      codigo: '2003',
      dificultad: niv,
      saberId: 'SAB-2003-VIGA',
      saberNombre: 'Equilibrio Estatico y Reacciones en Vigas Simplemente Apoyadas',
      especialidadES: 'Construccion Civil',
      subareaES: `Estatica Aplicada (${niv})`,
      conceptoBase: 'En toda viga simetrica con carga puntual central P, cada reaccion de apoyo vale P / 2.',
      enunciadoES: `[Caso Estructural #${i + 1} - Nivel ${niv}] Una viga simplemente apoyada de 6 m soporta una carga puntual en el centro de ${c} kgf. Cual es la reaccion RA en el apoyo izquierdo?`,
      opciones: [
        { letra: 'A', textoES: `${mitad / 2} kgf`, correcta: false, expES: 'Corresponde a un cuarto de la carga.' },
        { letra: 'B', textoES: `${mitad} kgf`, correcta: true, expES: `Correcto: Por equilibrio simetrico, RA = ${c} / 2 = ${mitad} kgf.` },
        { letra: 'C', textoES: `${c} kgf`, correcta: false, expES: 'Corresponde al total de la carga.' },
        { letra: 'D', textoES: `${c * 2} kgf`, correcta: false, expES: 'Duplica erroneamente la carga.' }
      ],
      escalera: {
        gatearES: `Divide el peso central (${c} kgf) entre 2 apoyos = ${mitad} kgf.`,
        correrES: `Por sumatoria de momentos igual a cero: RA = ${c} / 2 = ${mitad} kgf.`,
        espacioES: `Momento flector maximo en el centro: Mmax = (${c} x 6) / 4 = ${(c * 6) / 4} kgf.m.`
      },
      nemotecniaES: `MITAD EXACTA: ${c} / 2 = ${mitad} kgf.`
    });
  });

  const muestras = [0.25, 0.30, 0.35, 0.40, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.90, 1.00, 1.20];
  muestras.forEach((g, i) => {
    const gL = (g * 4).toFixed(2).replace('.', ',');
    const gTxt = g.toFixed(2).replace('.', ',');
    const niv = niveles[(i + 1) % niveles.length];
    lista.push({
      id: `GEN-LAC-${i + 1}`,
      codigo: '1004',
      dificultad: niv,
      saberId: 'SAB-1004-LAC',
      saberNombre: 'Calculo Estequiometrico de Acidez Lactea en g/L',
      especialidadES: 'Agroindustria Pecuaria',
      subareaES: `Laboratorio Lacteo (${niv})`,
      conceptoBase: 'Como 1 litro (1000 mL) contiene 4 veces 250 mL, se multiplica la masa en 250 mL por 4.',
      enunciadoES: `[Analisis Lacteo #${i + 1} - Nivel ${niv}] Una muestra de 250 mL de leche contiene ${gTxt} g de acido lactico. Cual es la concentracion en gramos por litro (g/L)?`,
      opciones: [
        { letra: 'A', textoES: `${(g / 2).toFixed(2).replace('.', ',')} g/L`, correcta: false, expES: 'Dividio entre 2 en lugar de multiplicar por 4.' },
        { letra: 'B', textoES: `${gL} g/L`, correcta: true, expES: `Correcto: ${gTxt} g x 4 = ${gL} g/L.` },
        { letra: 'C', textoES: `${(g * 2).toFixed(2).replace('.', ',')} g/L`, correcta: false, expES: 'Calculo para 500 mL en vez de 1000 mL.' },
        { letra: 'D', textoES: `${(g * 10).toFixed(2).replace('.', ',')} g/L`, correcta: false, expES: 'Multiplico por 10 en vez de 4.' }
      ],
      escalera: {
        gatearES: `En 1 L caben 4 vasos de 250 mL: ${gTxt} x 4 = ${gL} g/L.`,
        correrES: `Factor volumetrico: (${gTxt} g / 0,250 L) = ${gL} g/L.`,
        espacioES: `Equivale a ${(g * 40).toFixed(1)} grados Dornic.`
      },
      nemotecniaES: `250 mL x 4 = 1 L -> ${gTxt} x 4 = ${gL} g/L.`
    });
  });

  const escalones = [10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 25];
  escalones.forEach((n, i) => {
    const hTotal = (n * 0.17).toFixed(2).replace('.', ',');
    const niv = niveles[(i + 2) % niveles.length];
    lista.push({
      id: `GEN-ESC-${i + 1}`,
      codigo: '2005',
      dificultad: niv,
      saberId: 'SAB-2005-ESC',
      saberNombre: 'Calculo Dimensional de Contrahuellas en Escaleras',
      especialidadES: 'Dibujo Tecnico',
      subareaES: `Escaleras y Accesibilidad (${niv})`,
      conceptoBase: 'Altura de contrahuella = Desnivel total dividido entre el numero de contrahuellas.',
      enunciadoES: `[Diseno de Escalera #${i + 1} - Nivel ${niv}] Se proyecta salvar un desnivel de ${hTotal} m mediante ${n} contrahuellas iguales. Cual es la altura de cada contrahuella?`,
      opciones: [
        { letra: 'A', textoES: '0,15 m', correcta: false, expES: 'Insuficiente para cubrir el desnivel.' },
        { letra: 'B', textoES: '0,16 m', correcta: false, expES: 'Menor al requerido.' },
        { letra: 'C', textoES: '0,17 m', correcta: true, expES: `Correcto: ${hTotal} m / ${n} = 0,17 m.` },
        { letra: 'D', textoES: '0,19 m', correcta: false, expES: 'Excede el desnivel total.' }
      ],
      escalera: {
        gatearES: `Divide ${hTotal} m entre ${n} gradas = 0,17 m.`,
        correrES: `C = H / N = ${hTotal} / ${n} = 0,17 m.`,
        espacioES: `Cumple el Reglamento de Construcciones de Costa Rica.`
      },
      nemotecniaES: `${hTotal} / ${n} = 0,17 m.`
    });
  });

  const balances = [
    { a: 90, p: 35 }, { a: 120, p: 45 }, { a: 80, p: 25 }, { a: 150, p: 60 },
    { a: 110, p: 40 }, { a: 95, p: 30 }, { a: 175, p: 65 }, { a: 210, p: 85 },
    { a: 130, p: 50 }, { a: 160, p: 70 }, { a: 240, p: 90 }, { a: 300, p: 120 }
  ];
  balances.forEach((b, i) => {
    const pat = b.a - b.p;
    const niv = niveles[(i + 3) % niveles.length];
    lista.push({
      id: `GEN-PAT-${i + 1}`,
      codigo: '2006',
      dificultad: niv,
      saberId: 'SAB-2006-PAT',
      saberNombre: 'Ecuacion Contable Fundamental y Calculo de Patrimonio',
      especialidadES: 'Dibujo y Modelado Edificaciones',
      subareaES: `Finanzas de Proyectos (${niv})`,
      conceptoBase: 'Ecuacion contable: Patrimonio = Activos - Pasivos.',
      enunciadoES: `[Balance #${i + 1} - Nivel ${niv}] Una empresa reporta Activos por ${b.a} millones de colones y Pasivos por ${b.p} millones de colones. Cual es su Patrimonio neto?`,
      opciones: [
        { letra: 'A', textoES: `${b.a + b.p} millones`, correcta: false, expES: 'Sumo las deudas en lugar de restarlas.' },
        { letra: 'B', textoES: `${pat} millones`, correcta: true, expES: `Correcto: ${b.a} - ${b.p} = ${pat} millones.` },
        { letra: 'C', textoES: `${b.p} millones`, correcta: false, expES: 'Corresponde solo al pasivo.' },
        { letra: 'D', textoES: `${pat - 15} millones`, correcta: false, expES: 'Error en la resta.' }
      ],
      escalera: {
        gatearES: `Resta ${b.a} menos ${b.p} = ${pat} millones.`,
        correrES: `Patrimonio = Activos (${b.a}) - Pasivos (${b.p}) = ${pat} millones.`,
        espacioES: `Endeudamiento = ${((b.p / b.a) * 100).toFixed(1)}%.`
      },
      nemotecniaES: `ACTIVO (${b.a}) - PASIVO (${b.p}) = ${pat}.`
    });
  });

  return lista;
}
