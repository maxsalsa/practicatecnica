export const ESPECIALIDADES_CATALOGO = [
  { codigo: '1001', nombre: 'Agroecología', icono: '🌱' },
  { codigo: '1003', nombre: 'Agroindustria Agrícola', icono: '🍍' },
  { codigo: '1004', nombre: 'Agroindustria Pecuaria', icono: '🧀' },
  { codigo: '1005', nombre: 'Agrojardinería', icono: '🌺' },
  { codigo: '1009', nombre: 'Producción Agrícola y Pecuaria', icono: '🚜' },
  { codigo: '2003', nombre: 'Construcción Civil', icono: '🏗️' },
  { codigo: '2005', nombre: 'Dibujo Técnico', icono: '📐' },
  { codigo: '2006', nombre: 'Dibujo y Modelado Edificaciones', icono: '🏢' },
  { codigo: '2007', nombre: 'Diseño Gráfico', icono: '🎨' },
  { codigo: '2008', nombre: 'Diseño Publicitario', icono: '📢' },
  { codigo: '4001', nombre: 'Desarrollo Web y Software', icono: '💻' },
  { codigo: '4002', nombre: 'Ciberseguridad y Redes', icono: '🛡️' }
];

export const CONTEXTOS_REGIONALES = {
  limon: {
    nombre: 'Costero / Limón y Caribe',
    enfoquePedagogico: 'Aplicar a logística portuaria, humedad de 3600-4000 mm, corrosión salina, cacao, banano, pesca y turismo costero.',
    retoPractica: 'Diseñar solución técnica para controlar condensación de vapor y alta humedad a 25 °C en instalaciones costeras.'
  },
  rural: {
    nombre: 'Rural / Altura y Bajura (Cartago, San Carlos, Guanacaste)',
    enfoquePedagogico: 'Vincular con cooperativas, laderas del 12% al 15% con pasto vetiver, riego en trópico seco y plantas lácteas.',
    retoPractica: 'Calcular parámetros productivos y de conservación de suelo en fincas con pendiente pronunciada.'
  },
  indigena: {
    nombre: 'Territorio Indígena / Bosque y Cuenca',
    enfoquePedagogico: 'Integrar sistemas agrosilvopastoriles, abejas nativas Mariola, senderos de bajo impacto y apps Offline-First.',
    retoPractica: 'Estructurar un proyecto comunitario sostenible protegiendo nacientes de agua y biodiversidad local.'
  },
  urbano: {
    nombre: 'Urbano / GAM (Heredia, Alajuela, San José)',
    enfoquePedagogico: 'Enfocar en edificios multifamiliares, Ley N.° 7600, NFPA 101, paneles fotovoltaicos y servicios digitales.',
    retoPractica: 'Auditar el cumplimiento normativo de accesibilidad, seguridad e infraestructura digital en un entorno urbano.'
  }
};

export const BIBLIA_HABILIDADES_BLANDAS = [
  { titulo: '1. Saludo Ejecutivo y Presencia', habito: 'Saludar mirando a los ojos al entrar al taller o aula y portar el EPP completo.', empresa: 'Proyecta liderazgo y confianza inmediata ante clientes y supervisores.' },
  { titulo: '2. Puntualidad en Ruta Crítica', habito: 'Cumplir entregas a tiempo sin retrasar las actividades con holgura cero.', empresa: 'Evita pérdidas financieras y paros de línea en proyectos industriales.' },
  { titulo: '3. Ortografía, Dicción y Ética', habito: 'Hablar con vocabulario técnico, escribir sin faltas y pedir permiso antes de compartir archivos.', empresa: 'Protege la información confidencial y eleva el prestigio profesional.' },
  { titulo: '4. Cultura 5S y Cero Actos Inseguros', habito: 'Cero audífonos cerca de maquinaria, bloquear energía al limpiar y ordenar herramientas al cierre.', empresa: 'Elimina accidentes laborales y reduce tiempos muertos.' }
];

export const BANCO_ITEMS_2026 = [
  {
    id: '1001-05', codigo: '1001', especialidad: 'Agroecología', subarea: 'Tratamiento de Efluentes',
    enunciadoES: 'En una planta agroindustrial se trata un efluente en tres etapas: Etapa I disminuye sólidos sedimentables; Etapa II reduce la turbidez; Etapa III disminuye la DBO5. ¿Cuál secuencia se aplicó?',
    enunciadoEN: 'An effluent is treated in 3 stages: Stage I settles solids; Stage II reduces turbidity; Stage III lowers BOD5. What sequence is this?',
    opciones: [
      { letra: 'A', texto: 'Biológico - físico - químico', correcta: false, explicacion: 'El proceso biológico va al final.' },
      { letra: 'B', texto: 'Químico - biológico - físico', correcta: false, explicacion: 'Primero debe ocurrir la sedimentación física.' },
      { letra: 'C', texto: 'Físico - biológico - químico', correcta: false, explicacion: 'La reducción de DBO5 es biológica (Etapa III).' },
      { letra: 'D', texto: 'Físico - químico - biológico', correcta: true, explicacion: '¡Exacto! I: Físico (sedimenta), II: Químico (coagula turbidez), III: Biológico (bacterias reducen DBO5).' }
    ],
    escalera: {
      gatear: '1° Cuelas piedras (Físico), 2° Aclaras el agua turbia (Químico) y 3° Bacterias comen materia orgánica (Biológico).',
      correr: 'Secuencia estándar PTAR: primario físico, secundario físico-químico y biológico (DBO5).',
      espacio: 'Diseña un sistema de biodigestor y biojardinera para tratar aguas de ordeño.'
    },
    nemotecnia: 'FI-QUI-BIO: Físico asienta, Químico aclara, Biológico baja DBO5.',
    palabraClave: 'BIOLOGICO', pistaCrucigrama: 'Etapa de tratamiento que usa microorganismos para reducir la DBO5 del agua.'
  },
  {
    id: '1001-56', codigo: '1001', especialidad: 'Agroecología', subarea: 'Sistemas Integrados',
    enunciadoES: 'Se integra la crianza de tilapia y el cultivo de hortalizas: disminuye el consumo de agua, los compuestos nitrogenados se transforman en nutrientes vegetales y el agua retorna a los peces. ¿Cuál sistema es?',
    enunciadoEN: 'Tilapia farming and vegetables are integrated in recirculating water where fish waste feeds plants. What system is this?',
    opciones: [
      { letra: 'A', texto: 'Cultivo en jaulas', correcta: false, explicacion: 'No integra hortalizas ni recirculación.' },
      { letra: 'B', texto: 'Piscicultura extensiva', correcta: false, explicacion: 'No incluye biofiltro hidropónico.' },
      { letra: 'C', texto: 'Flujo acuícola continuo', correcta: false, explicacion: 'Es un sistema abierto sin retorno.' },
      { letra: 'D', texto: 'Producción acuapónica', correcta: true, explicacion: '¡Correcto! Acuaponía = Acuicultura (peces) + Hidroponía (hortalizas) en recirculación.' }
    ],
    escalera: {
      gatear: 'Los peces abonan a las plantas y las plantas limpian el agua para los peces: Acuaponía.',
      correr: 'Las bacterias nitrificantes transforman el amonio excretado por la tilapia en nitratos aprovechados por las hortalizas.',
      espacio: 'Calcula el volumen del biofiltro para un estanque de 1000 litros con 40 tilapias.'
    },
    nemotecnia: 'ACUA (Peces) + PONÍA (Plantas en agua) = Acuaponía.',
    palabraClave: 'ACUAPONIA', pistaCrucigrama: 'Sistema simbiótico que une la crianza de peces con el cultivo hidropónico de hortalizas.'
  },
  {
    id: '1003-09', codigo: '1003', especialidad: 'Agroindustria Agrícola', subarea: 'Conservación de Alimentos',
    enunciadoES: 'Se concentra una mermelada hasta 65 °Brix, disminuyendo la disponibilidad de agua para los microorganismos. ¿Cuál principio explica su conservación?',
    enunciadoEN: 'Jam is concentrated to 65 °Brix, lowering water availability for microbes. Which principle explains this?',
    opciones: [
      { letra: 'A', texto: 'Disminución de la actividad de agua por alta concentración de solutos', correcta: true, explicacion: '¡Exacto! Los azúcares a 65 °Brix atrapan el agua libre, reduciendo la actividad de agua (aw).' },
      { letra: 'B', texto: 'Inactivación por temperaturas de congelación', correcta: false, explicacion: 'La mermelada se concentra por cocción y solutos.' },
      { letra: 'C', texto: 'Eliminación total de la humedad del alimento', correcta: false, explicacion: 'El agua sigue presente pero ligada a los solutos.' },
      { letra: 'D', texto: 'Fermentación alcohólica de la fruta', correcta: false, explicacion: 'No es un proceso fermentativo.' }
    ],
    escalera: {
      gatear: 'Tanta azúcar (65 °Brix) deja el agua "amarrada" y las bacterias no pueden usarla para crecer.',
      correr: 'La alta concentración de sólidos solubles reduce la actividad de agua (aw) por presión osmótica.',
      espacio: 'Calcula la cantidad de azúcar y pectina grado 150 para un lote de 80 kg de pulpa de guayaba.'
    },
    nemotecnia: '65 BRIX = SOLUTOS AMARRAN EL AGUA (baja aw).',
    palabraClave: 'SOLUTOS', pistaCrucigrama: 'Sólidos disueltos (medidos en °Brix) que reducen la actividad de agua en una mermelada.'
  },
  {
    id: '1004-29', codigo: '1004', especialidad: 'Agroindustria Pecuaria', subarea: 'Análisis Lácteo',
    enunciadoES: 'Una muestra de leche contiene 0,45 g de ácido láctico en 250 mL. Si el resultado debe expresarse en gramos por litro (g/L), ¿cuál valor corresponde?',
    enunciadoEN: 'A milk sample has 0.45 g of lactic acid in 250 mL. What is the concentration in g/L?',
    opciones: [
      { letra: 'A', texto: '0,18 g/L', correcta: false, explicacion: 'Error de división.' },
      { letra: 'B', texto: '1,80 g/L', correcta: true, explicacion: '¡Correcto! Como 1 litro tiene cuatro veces 250 mL, multiplicas 0,45 g x 4 = 1,80 g/L.' },
      { letra: 'C', texto: '4,50 g/L', correcta: false, explicacion: 'Multiplicó por 10 en vez de 4.' },
      { letra: 'D', texto: '18,00 g/L', correcta: false, explicacion: '18 corresponde a grados Dornic, no a g/L.' }
    ],
    escalera: {
      gatear: 'En 1 litro caben 4 vasos de 250 mL. Multiplica 0,45 por 4 y obtienes 1,80 g/L.',
      correr: 'Cálculo estequiométrico: (0,45 g / 250 mL) x (1000 mL / 1 L) = 1,80 g/L.',
      espacio: 'Verifica si una leche con 1,80 g/L (18 °D) es apta para pasteurización UHT.'
    },
    nemotecnia: '250 mL x 4 = 1 L: Multiplica los gramos por 4.',
    palabraClave: 'LACTICO', pistaCrucigrama: 'Ácido producido por bacterias al fermentar la lactosa de la leche.'
  },
  {
    id: '1005-41', codigo: '1005', especialidad: 'Agrojardinería', subarea: 'Replanteo de Jardines',
    enunciadoES: 'En una franja total de 18 m se ubican consecutivamente: arbustos (4,50 m), sendero (2,00 m), césped (sin cota) y jardinera (3,50 m). ¿Cuánto mide el área de césped?',
    enunciadoEN: 'An 18 m strip has shrubs (4.50 m), path (2.00 m), lawn (unlabeled), and planter (3.50 m). How long is the lawn?',
    opciones: [
      { letra: 'A', texto: '6,00 m', correcta: false, explicacion: 'Resta incompleta.' },
      { letra: 'B', texto: '7,00 m', correcta: false, explicacion: 'Error de suma.' },
      { letra: 'C', texto: '8,00 m', correcta: true, explicacion: '¡Exacto! 4,50 + 2,00 + 3,50 = 10,00 m. Luego 18,00 m - 10,00 m = 8,00 m.' },
      { letra: 'D', texto: '10,00 m', correcta: false, explicacion: '10 m es la suma de los otros tramos.' }
    ],
    escalera: {
      gatear: 'Suma las partes que conoces (4,50 + 2 + 3,50 = 10 m). A 18 m quítale 10 m y te quedan 8 m.',
      correr: 'Diferencia de cotas parciales respecto a la cota general: L = 18 - (4,5 + 2,0 + 3,5) = 8,00 m.',
      espacio: 'Calcula cuántos metros cuadrados de zacate en tepes se requieren si la franja tiene 3,5 m de ancho.'
    },
    nemotecnia: '18 MENOS 10 = 8 METROS DE CÉSPED.',
    palabraClave: 'REPLANTEO', pistaCrucigrama: 'Proceso de trasladar las medidas del plano de jardinería al terreno real.'
  },
  {
    id: '1009-05', codigo: '1009', especialidad: 'Producción Agrícola y Pecuaria', subarea: 'Maquinaria Agrícola',
    enunciadoES: 'Se requiere fracturar una capa compactada de suelo a 40 cm de profundidad procurando poca inversión del suelo superficial. ¿Cuál implemento se debe usar?',
    enunciadoEN: 'Which implement fractures a compacted soil layer at 40 cm depth without inverting the topsoil?',
    opciones: [
      { letra: 'A', texto: 'Subsolador', correcta: true, explicacion: '¡Correcto! El subsolador realiza corte vertical profundo sin voltear las capas del suelo.' },
      { letra: 'B', texto: 'Arado de discos', correcta: false, explicacion: 'El arado de discos invierte el suelo.' },
      { letra: 'C', texto: 'Rastra niveladora', correcta: false, explicacion: 'Trabaja solo a poca profundidad.' },
      { letra: 'D', texto: 'Cultivador rotativo', correcta: false, explicacion: 'Pulveriza la superficie pero no descompacta a 40 cm.' }
    ],
    escalera: {
      gatear: 'Para romper suelo duro en lo profundo (40 cm) sin voltear la tierra fértil, usas el Subsolador.',
      correr: 'Labranza vertical conservacionista: rompe el piso de arado favoreciendo el drenaje y la aireación.',
      espacio: 'Selecciona el tractor adecuado según el requerimiento de tiro de un subsolador de 3 cinceles.'
    },
    nemotecnia: 'SUB-SUELO PROFUNDO = SUBSOLADOR.',
    palabraClave: 'SUBSOLADOR', pistaCrucigrama: 'Implemento agrícola de labranza vertical que rompe capas compactadas profundas.'
  },
  {
    id: '2003-19', codigo: '2003', especialidad: 'Construcción Civil', subarea: 'Estática de Vigas',
    enunciadoES: 'Una viga de 6 m apoyada simplemente en ambos extremos soporta una carga puntual en el centro de 1200 kgf. ¿Cuál es la reacción RA para mantener el equilibrio estático?',
    enunciadoEN: 'A 6 m simply supported beam carries a central load of 1200 kgf. What is the reaction RA?',
    opciones: [
      { letra: 'A', texto: '0 kgf', correcta: false, explicacion: 'Sin reacción la viga caería.' },
      { letra: 'B', texto: '600 kgf', correcta: true, explicacion: '¡Exacto! Por simetría, cada apoyo recibe la mitad de la carga central: 1200 / 2 = 600 kgf.' },
      { letra: 'C', texto: '1200 kgf', correcta: false, explicacion: 'Esa es la carga total entre los dos apoyos.' },
      { letra: 'D', texto: '2400 kgf', correcta: false, explicacion: 'Duplica erróneamente la fuerza.' }
    ],
    escalera: {
      gatear: 'Si el peso de 1200 kgf está justo en el medio, cada extremo carga la mitad: 600 kgf.',
      correr: 'Equilibrio traslacional y rotacional: RA = RB = P / 2 = 1200 kgf / 2 = 600 kgf.',
      espacio: 'Calcula la reacción RA si la carga de 1200 kgf se mueve a 2 m del apoyo izquierdo.'
    },
    nemotecnia: 'CARGA AL CENTRO = MITAD EN CADA APOYO (600 kgf).',
    palabraClave: 'EQUILIBRIO', pistaCrucigrama: 'Estado físico de una estructura donde la suma de fuerzas y momentos es cero.'
  },
  {
    id: '2005-28', codigo: '2005', especialidad: 'Dibujo Técnico', subarea: 'Diseño de Escaleras',
    enunciadoES: 'Se diseña una escalera para salvar una altura de 3,06 m mediante 18 contrahuellas iguales. ¿Cuál es la altura de cada contrahuella?',
    enunciadoEN: 'A staircase overcomes a height of 3.06 m with 18 equal risers. What is the height of each riser?',
    opciones: [
      { letra: 'A', texto: '0,165 m', correcta: false, explicacion: '18 x 0,165 m solo llega a 2,97 m.' },
      { letra: 'B', texto: '0,16 m', correcta: false, explicacion: '18 x 0,16 m solo llega a 2,88 m.' },
      { letra: 'C', texto: '0,15 m', correcta: false, explicacion: '18 x 0,15 m solo llega a 2,70 m.' },
      { letra: 'D', texto: '0,17 m', correcta: true, explicacion: '¡Correcto! 3,06 m / 18 contrahuellas = 0,17 m (17 cm cada grada).' }
    ],
    escalera: {
      gatear: 'Divide la altura total (3,06 m) entre los 18 escalones: 3,06 / 18 = 0,17 m.',
      correr: 'Cálculo arquitectónico de escaleras: Contrahuella = Desnivel total / Número de gradas = 0,17 m.',
      espacio: 'Determina la longitud horizontal total del tramo si cada huella mide 0,30 m.'
    },
    nemotecnia: '3,06 ENTRE 18 = 0,17 METROS.',
    palabraClave: 'CONTRAHUELLA', pistaCrucigrama: 'Parte vertical de cada peldaño o grada en una escalera.'
  },
  {
    id: '2006-60', codigo: '2006', especialidad: 'Dibujo y Modelado Edificaciones', subarea: 'Contabilidad de Proyectos',
    enunciadoES: 'En el balance preliminar de una microempresa se registran Activos por 82 500 000 colones y Pasivos por 31 800 000 colones. ¿Qué representa la diferencia entre ambos?',
    enunciadoEN: 'A business has Assets of 82,500,000 and Liabilities of 31,800,000. What does the difference represent?',
    opciones: [
      { letra: 'A', texto: 'Activo circulante', correcta: false, explicacion: 'El activo total ya fue dado.' },
      { letra: 'B', texto: 'Pasivo a largo plazo', correcta: false, explicacion: 'El pasivo son las obligaciones.' },
      { letra: 'C', texto: 'Ingreso operativo', correcta: false, explicacion: 'Pertenece al estado de resultados.' },
      { letra: 'D', texto: 'Patrimonio', correcta: true, explicacion: '¡Exacto! Patrimonio = Activos - Pasivos (50 700 000 colones).' }
    ],
    escalera: {
      gatear: 'Lo que tienes (Activos) menos lo que debes (Pasivos) es tu Patrimonio propio.',
      correr: 'Ecuación contable fundamental: Patrimonio = Activo - Pasivo = 50 700 000 colones.',
      espacio: 'Elabora el estado de situación financiera inicial para un estudio de modelado BIM.'
    },
    nemotecnia: 'ACTIVO MENOS PASIVO = PATRIMONIO.',
    palabraClave: 'PATRIMONIO', pistaCrucigrama: 'Capital propio resultante de restar los pasivos al total de activos.'
  },
  {
    id: '2007-30', codigo: '2007', especialidad: 'Diseño Gráfico', subarea: 'Preprensa Digital',
    enunciadoES: 'Antes de imprimir un PDF se comprueban fuentes incrustadas, resolución de imágenes, sangrados, espacios de color y transparencias. ¿Cómo se llama este procedimiento?',
    enunciadoEN: 'Checking embedded fonts, resolution, bleeds, and color spaces in a PDF before printing is called:',
    opciones: [
      { letra: 'A', texto: 'Preflight', correcta: true, explicacion: '¡Correcto! El Preflight verifica que el archivo cumpla todos los parámetros técnicos antes de producir planchas o imprimir.' },
      { letra: 'B', texto: 'Trapping', correcta: false, explicacion: 'Trapping es el traslape de tintas.' },
      { letra: 'C', texto: 'Imposición', correcta: false, explicacion: 'Imposición es acomodar páginas en el pliego.' },
      { letra: 'D', texto: 'Rasterización', correcta: false, explicacion: 'Rasterizar es convertir vectores a mapa de bits.' }
    ],
    escalera: {
      gatear: 'Es el chequeo "antes del vuelo" (Preflight) para asegurar que el impreso no salga con fuentes rotas ni bordes blancos.',
      correr: 'Auditoría automatizada de preprensa bajo estándar PDF/X para impresión comercial.',
      espacio: 'Crea una lista de chequeo Preflight para envases flexográficos con barniz selectivo y troquel.'
    },
    nemotecnia: 'PRE-FLIGHT = Revisión técnica antes de mandar a imprenta.',
    palabraClave: 'PREFLIGHT', pistaCrucigrama: 'Verificación digital previa a la impresión que revisa fuentes, sangrados y resolución.'
  },
  {
    id: '2008-13', codigo: '2008', especialidad: 'Diseño Publicitario', subarea: 'Figura Humana',
    enunciadoES: 'En un boceto de figura humana adulta, la cabeza mide 24 mm y la altura total es de 192 mm. ¿Cuál canon de proporción se utilizó?',
    enunciadoEN: 'In an adult human figure sketch, the head is 24 mm and total height is 192 mm. Which canon was used?',
    opciones: [
      { letra: 'A', texto: 'Ideal (8 cabezas)', correcta: true, explicacion: '¡Exacto! 192 mm / 24 mm = 8 cabezas, que define el canon anatómico Ideal.' },
      { letra: 'B', texto: 'Natural (7,5 cabezas)', correcta: false, explicacion: 'Darían 180 mm.' },
      { letra: 'C', texto: 'Heroico (8,5 cabezas)', correcta: false, explicacion: 'Darían 204 mm.' },
      { letra: 'D', texto: 'Infantil (5 cabezas)', correcta: false, explicacion: 'Darían 120 mm.' }
    ],
    escalera: {
      gatear: 'Divide 192 entre 24 y te da 8 cabezas exactas: ese es el Canon Ideal.',
      correr: 'Antropometría artística: la relación H / M = 192 / 24 = 8 módulos cefálicos.',
      espacio: 'Diseña una hoja de modelo (turnaround) de personaje publicitario aplicando el canon de 8 cabezas.'
    },
    nemotecnia: '192 / 24 = 8 CABEZAS (Canon Ideal).',
    palabraClave: 'CANON', pistaCrucigrama: 'Sistema de proporción anatómica que toma la cabeza como unidad de medida.'
  }
];

export const JUEGO_SECUENCIAS = [
  {
    id: 'SEC-1', especialidad: '1003 - Beneficiado Húmedo del Café (Ítem 54)',
    instruccion: 'Haz clic en orden cronológico sobre las 4 etapas posteriores al recibo del café maduro:',
    pasosCorrectos: ['1. Despulpado del fruto maduro', '2. Fermentación del mucílago', '3. Lavado con agua limpia', '4. Secado del grano pergamino']
  },
  {
    id: 'SEC-2', especialidad: '2007 - Producción Gráfica Impresa (Ítem 57)',
    instruccion: 'Ordena las 5 etapas desde la solicitud del cliente hasta la entrega del folleto:',
    pasosCorrectos: ['1. Definición del encargo', '2. Diseño y aprobación', '3. Preprensa digital', '4. Impresión del tiraje', '5. Acabado y entrega']
  },
  {
    id: 'SEC-3', especialidad: '2008 - Captura en Cámara Digital (Ítem 42)',
    instruccion: 'Ordena el recorrido de la luz y los datos al tomar una fotografía digital:',
    pasosCorrectos: ['1. Diafragma regula la luz', '2. Obturador controla el tiempo', '3. Sensor captura la imagen', '4. Procesamiento digital']
  },
  {
    id: 'SEC-4', especialidad: '2003 - Ruta Crítica de Construcción (Ítem 44)',
    instruccion: 'Ordena las 5 actividades sin holgura (Ruta Crítica) de la obra:',
    pasosCorrectos: ['1. a: Limpieza y excavación', '2. b: Encofrado', '3. c: Acero de refuerzo', '4. f: Vaciado de concreto', '5. g: Curado del concreto']
  }
];
