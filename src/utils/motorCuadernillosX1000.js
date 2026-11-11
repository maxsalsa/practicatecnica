// ============================================================================
// PRACTICATECNICA.COM - MOTOR MULTIMATERIA REAL (CADA ASIGNATURA TIENE SU BANCO)
// Basado en GUIA_GEMINI_BANCO_MEP.md y Cuadernillos Oficiales MEP 01-2026
// ============================================================================

export const IDIOMAS_DISPONIBLES = [
  { codigo: "ES", nombre: "Español", bandera: "🇨🇷", locale: "es-CR" },
  { codigo: "EN", nombre: "English", bandera: "🇬🇧", locale: "en-US" },
  { codigo: "FR", nombre: "Français", bandera: "🇫🇷", locale: "fr-FR" },
  { codigo: "PT", nombre: "Português", bandera: "🇧🇷", locale: "pt-BR" },
  { codigo: "DE", nombre: "Deutsch", bandera: "🇩🇪", locale: "de-DE" },
  { codigo: "IT", nombre: "Italiano", bandera: "🇮🇹", locale: "it-IT" }
];

export const LIBROS_DESCARGABLES = [
  { id: "LIB-01", titulo: "Manual Oficial de Seguridad Vial MOPT (Licencias A, B1 y C - Ley 9078)", autor: "GICM Desarrollo de Sistemas", paginas: 68, categoria: "MOPT / COSEVI", color: "from-amber-500 to-orange-700", resumen: "Distancias de reacción y frenado, señalamiento vertical y horizontal, sistema de puntos, conducción eficiente y mecánica preventiva." },
  { id: "LIB-02", titulo: "Cuadernillo Desarrollo Web y Ciberseguridad (3016 / 3028 / 3023)", autor: "Ing. Max Salazar Sánchez · GICM", paginas: 84, categoria: "Especialidades TIC", color: "from-cyan-500 to-blue-700", resumen: "HTML5 semántico, accesibilidad WCAG/DUA, subredes IPv4 VLSM, normalización 3FN, APIs RESTful y prevención de vulnerabilidades IDOR/RLS." },
  { id: "LIB-03", titulo: "Compendio de Ciencias PNE: Biología, Física y Química (10.° a 12.°)", autor: "Equipo Editorial Psicométrico GICM", paginas: 76, categoria: "Secundaria Académica", color: "from-emerald-500 to-teal-700", resumen: "Ecología y ciclos biogeoquímicos, genética mendeliana, Leyes de Newton, trabajo y energía mecánica, estequiometría y molaridad." },
  { id: "LIB-04", titulo: "Compendio de Español, Estudios Sociales y Educación Cívica PNE", autor: "Equipo Editorial Psicométrico GICM", paginas: 64, categoria: "Secundaria y Primaria", color: "from-indigo-500 to-purple-700", resumen: "Comprensión lectora inferencial, conectores lógicos, Reforma Social de 1940, Estado Social de Derecho y mecanismos de participación ciudadana." },
  { id: "LIB-05", titulo: "Cuadernillo Ingeniería: Construcción Civil (2003), Dibujo (2005) y BIM (2006)", autor: "Ing. Steven Corrales Bustos & Ing. Max Salazar Sánchez", paginas: 80, categoria: "Ingeniería y Arquitectura", color: "from-sky-500 to-indigo-700", resumen: "Equilibrio estático en vigas, prueba de revenimiento ASTM C-143, nivelación topográfica, ruta crítica CPM, Ley 7600 y Código Sísmico CR." },
  { id: "LIB-06", titulo: "Cuadernillo Agropecuario (1001-1009) y Diseño Gráfico/Publicitario (2007-2008)", autor: "GICM Desarrollo de Sistemas", paginas: 72, categoria: "Agroindustria y Diseño", color: "from-rose-500 to-pink-700", resumen: "Sistemas agrosilvopastoriles, conservación por actividad de agua (°Brix), HACCP, preflight, síntesis vectorial y proporción áurea/ideal." }
];

export const CATALOGO_MATERIAS_Y_ESPECIALIDADES = [
  // 1. MOPT Y ADMISIÓN UNIVERSITARIA
  { id: "MOPT-B1", codigo: "MOPT-B1", grupo: "MOPT y Admisión Universitaria", nombre: "🚗 MOPT Licencia B1 (Vehículos Livianos · Ley 9078)", nombreEn: "MOPT Class B1 Driver's License Exam", tipo: "MOPT_B1" },
  { id: "MOPT-A", codigo: "MOPT-A", grupo: "MOPT y Admisión Universitaria", nombre: "🏍️ MOPT Licencia Tipo A (Motocicletas · Ley 9078)", nombreEn: "MOPT Class A Motorcycle Exam", tipo: "MOPT_A" },
  { id: "MOPT-C", codigo: "MOPT-C", grupo: "MOPT y Admisión Universitaria", nombre: "🚛 MOPT Licencia Tipo C (Camión y Transporte Público)", nombreEn: "MOPT Class C Heavy Truck & Bus Exam", tipo: "MOPT_C" },
  { id: "ADM-UNI", codigo: "PAA-UNI", grupo: "MOPT y Admisión Universitaria", nombre: "🎓 Admisión Universitaria (UCR · TEC · UNA · UTN · UNED)", nombreEn: "University Admission Aptitude Test (PAA)", tipo: "ADM_UNI" },

  // 2. SECUNDARIA ACADÉMICA (7.° A 11.° / 12.° PNE)
  { id: "ACA-ESP", codigo: "PNE-ESP", grupo: "Secundaria Académica (PNE)", nombre: "📖 Español y Comprensión Lectora (7.° a 12.° PNE)", nombreEn: "Spanish & Reading Comprehension (PNE)", tipo: "ESPANOL" },
  { id: "ACA-MAT", codigo: "PNE-MAT", grupo: "Secundaria Académica (PNE)", nombre: "📐 Matemáticas Secundaria (7.° a 12.° PNE)", nombreEn: "High School Mathematics (PNE)", tipo: "MATEMATICA" },
  { id: "ACA-BIO", codigo: "PNE-BIO", grupo: "Secundaria Académica (PNE)", nombre: "🧬 Ciencias · Biología (10.° a 12.° PNE)", nombreEn: "Natural Sciences: Biology (PNE)", tipo: "BIOLOGIA" },
  { id: "ACA-FIS", codigo: "PNE-FIS", grupo: "Secundaria Académica (PNE)", nombre: "⚡ Ciencias · Física (10.° a 12.° PNE)", nombreEn: "Natural Sciences: Physics (PNE)", tipo: "FISICA" },
  { id: "ACA-QUI", codigo: "PNE-QUI", grupo: "Secundaria Académica (PNE)", nombre: "🧪 Ciencias · Química (10.° a 12.° PNE)", nombreEn: "Natural Sciences: Chemistry (PNE)", tipo: "QUIMICA" },
  { id: "ACA-CIE", codigo: "PNE-CIE", grupo: "Secundaria Académica (PNE)", nombre: "🔬 Ciencias Generales III Ciclo (7.° a 9.°)", nombreEn: "General Sciences (7th-9th Grade)", tipo: "CIENCIAS_GEN" },
  { id: "ACA-ESO", codigo: "PNE-ESO", grupo: "Secundaria Académica (PNE)", nombre: "🌎 Estudios Sociales e Historia de CR (PNE)", nombreEn: "Social Studies & Costa Rican History", tipo: "SOCIALES" },
  { id: "ACA-CIV", codigo: "PNE-CIV", grupo: "Secundaria Académica (PNE)", nombre: "🏛️ Educación Cívica y Democracia (PNE)", nombreEn: "Civic Education & Democracy", tipo: "CIVICA" },
  { id: "ACA-ING", codigo: "PNE-ING", grupo: "Secundaria Académica (PNE)", nombre: "🇬🇧 Inglés Académico y Conversacional (MCER)", nombreEn: "Academic & Conversational English", tipo: "INGLES" },
  { id: "ACA-FRA", codigo: "PNE-FRA", grupo: "Secundaria Académica (PNE)", nombre: "🇫🇷 Francés Secundaria (DELF A1-B1)", nombreEn: "High School French", tipo: "FRANCES" },
  { id: "ACA-FIL", codigo: "PNE-FIL", grupo: "Secundaria Académica (PNE)", nombre: "🦉 Filosofía y Pensamiento Crítico", nombreEn: "Philosophy & Critical Thinking", tipo: "FILOSOFIA" },
  { id: "ACA-PSI", codigo: "PNE-PSI", grupo: "Secundaria Académica (PNE)", nombre: "🧠 Psicología y Desarrollo Humano", nombreEn: "Psychology & Human Development", tipo: "PSICOLOGIA" },

  // 3. PRIMARIA (1.° A 6.° GRADO MEP)
  { id: "PRI-FULL", codigo: "PRI-6G", grupo: "Primaria (1.° a 6.° Grado)", nombre: "🎒 Simulacro General de 6.° Grado Primaria (Todas)", nombreEn: "6th Grade Full Primary Exam", tipo: "PRIMARIA_MIX" },
  { id: "PRI-MAT", codigo: "P-MAT-06", grupo: "Primaria (1.° a 6.° Grado)", nombre: "🎒 Matemática Primaria (1.° a 6.° Grado)", nombreEn: "Primary Mathematics", tipo: "MATEMATICA" },
  { id: "PRI-ESP", codigo: "P-ESP-06", grupo: "Primaria (1.° a 6.° Grado)", nombre: "🎒 Español y Lectura Primaria (1.° a 6.° Grado)", nombreEn: "Primary Spanish & Reading", tipo: "ESPANOL" },
  { id: "PRI-CIE", codigo: "P-CIE-06", grupo: "Primaria (1.° a 6.° Grado)", nombre: "🎒 Ciencias Primaria (1.° a 6.° Grado)", nombreEn: "Primary Natural Sciences", tipo: "CIENCIAS_GEN" },
  { id: "PRI-SOC", codigo: "P-SOC-06", grupo: "Primaria (1.° a 6.° Grado)", nombre: "🎒 Estudios Sociales y Cívica Primaria", nombreEn: "Primary Social Studies", tipo: "SOCIALES" },

  // 4. ESPECIALIDADES TÉCNICAS TIC, WEB, CIBERSEGURIDAD Y REDES (CTP)
  { id: "TEC-3016", codigo: "3016", grupo: "Especialidades TIC y Ciberseguridad (CTP)", nombre: "🌐 3016 · Desarrollo Web y Ciberseguridad", nombreEn: "3016 · Web Development & Cybersecurity", tipo: "WEB_CIBER_3016" },
  { id: "TEC-3028", codigo: "3028", grupo: "Especialidades TIC y Ciberseguridad (CTP)", nombre: "🖧 3028 · Informática en Redes de Computadoras", nombreEn: "3028 · Computer Networking IT", tipo: "REDES_3028" },
  { id: "TEC-3023", codigo: "3023", grupo: "Especialidades TIC y Ciberseguridad (CTP)", nombre: "💻 3023 · Informática en Desarrollo de Software", nombreEn: "3023 · Software Engineering IT", tipo: "SOFTWARE_3023" },
  { id: "TEC-3015", codigo: "3015", grupo: "Especialidades TIC y Ciberseguridad (CTP)", nombre: "📱 3015 · Desarrollo de Aplicaciones Móviles", nombreEn: "3015 · Mobile App Development", tipo: "MOVILES_3015" },
  { id: "TEC-3030", codigo: "3030", grupo: "Especialidades TIC y Ciberseguridad (CTP)", nombre: "🤖 3030 · Inteligencia Artificial", nombreEn: "3030 · Artificial Intelligence", tipo: "IA_3030" },
  { id: "TEC-3017", codigo: "3017", grupo: "Especialidades TIC y Ciberseguridad (CTP)", nombre: "🎨 3017 · Diseño y Desarrollo Digital", nombreEn: "3017 · Digital Design & Development", tipo: "DISENO_2007" },

  // 5. ESPECIALIDADES AGROPECUARIAS Y AGROINDUSTRIALES 2026 (CTP)
  { id: "TEC-1001", codigo: "1001", grupo: "Agroecología y Agroindustria (CTP)", nombre: "🌱 1001 · Agroecología", nombreEn: "1001 · Agroecology", tipo: "AGRO_1001" },
  { id: "TEC-1003", codigo: "1003", grupo: "Agroecología y Agroindustria (CTP)", nombre: "🍍 1003 · Agroindustria Alimentaria (Tecnología Agrícola)", nombreEn: "1003 · Agricultural Food Agroindustry", tipo: "AGROIND_1003" },
  { id: "TEC-1004", codigo: "1004", grupo: "Agroecología y Agroindustria (CTP)", nombre: "🧀 1004 · Agroindustria Alimentaria (Tecnología Pecuaria)", nombreEn: "1004 · Livestock Food Agroindustry", tipo: "AGROPEC_1004" },
  { id: "TEC-1005", codigo: "1005", grupo: "Agroecología y Agroindustria (CTP)", nombre: "🌺 1005 · Agrojardinería", nombreEn: "1005 · Landscaping & Agrogardening", tipo: "JARDIN_1005" },
  { id: "TEC-1009", codigo: "1009", grupo: "Agroecología y Agroindustria (CTP)", nombre: "🚜 1009 · Producción Agrícola y Pecuaria", nombreEn: "1009 · Crop & Livestock Production", tipo: "PROD_AGRO_1009" },

  // 6. INGENIERÍA, CONSTRUCCIÓN, DIBUJO, BIM Y DISEÑO 2026 (CTP)
  { id: "TEC-2003", codigo: "2003", grupo: "Ingeniería, Construcción y Diseño (CTP)", nombre: "🏗️ 2003 · Construcción Civil", nombreEn: "2003 · Civil Construction", tipo: "CIVIL_2003" },
  { id: "TEC-2005", codigo: "2005", grupo: "Ingeniería, Construcción y Diseño (CTP)", nombre: "📏 2005 · Dibujo Técnico", nombreEn: "2005 · Technical Drawing", tipo: "DIBUJO_2005" },
  { id: "TEC-2006", codigo: "2006", grupo: "Ingeniería, Construcción y Diseño (CTP)", nombre: "🏢 2006 · Dibujo y Modelado para Edificaciones (BIM)", nombreEn: "2006 · Building Information Modeling (BIM)", tipo: "BIM_2006" },
  { id: "TEC-2007", codigo: "2007", grupo: "Ingeniería, Construcción y Diseño (CTP)", nombre: "✒️ 2007 · Diseño Gráfico", nombreEn: "2007 · Graphic Design", tipo: "DISENO_2007" },
  { id: "TEC-2008", codigo: "2008", grupo: "Ingeniería, Construcción y Diseño (CTP)", nombre: "📢 2008 · Diseño Publicitario", nombreEn: "2008 · Advertising Design", tipo: "PUBLICIDAD_2008" },
  { id: "TEC-2017", codigo: "2017", grupo: "Ingeniería, Construcción y Diseño (CTP)", nombre: "⚡ 2017 · Electrónica Industrial y Electrotecnia", nombreEn: "2017 · Industrial Electronics", tipo: "ELECTRONICA_2017" },
  { id: "TEC-2019", codigo: "2019", grupo: "Ingeniería, Construcción y Diseño (CTP)", nombre: "✅ 2019 · Gestión de la Calidad y Salud Ocupacional", nombreEn: "2019 · Quality Management & Safety", tipo: "CALIDAD_2019" },

  // 7. COMERCIO, FINANZAS, TURISMO Y HOSPITALIDAD (CTP)
  { id: "TEC-3001", codigo: "3001", grupo: "Comercio, Finanzas y Turismo (CTP)", nombre: "📊 3001 · Contabilidad y Finanzas (NIIF / NIC)", nombreEn: "3001 · Accounting & IFRS Finance", tipo: "CONTA_3001" },
  { id: "TEC-3019", codigo: "3019", grupo: "Comercio, Finanzas y Turismo (CTP)", nombre: "🤝 3019 · Ejecutivo Comercial y Servicio al Cliente", nombreEn: "3019 · Commercial Executive & Customer Care", tipo: "COMERCIAL_3019" },
  { id: "TEC-3021", codigo: "3021", grupo: "Comercio, Finanzas y Turismo (CTP)", nombre: "🎧 3021 · Executive Service Centers (Bilingüe)", nombreEn: "3021 · Executive Service Centers", tipo: "INGLES" },
  { id: "TEC-3018", codigo: "3018", grupo: "Comercio, Finanzas y Turismo (CTP)", nombre: "🦜 3018 · Ecoturismo y Gestión Hotelera", nombreEn: "3018 · Ecotourism & Hospitality", tipo: "TURISMO_3018" },
  { id: "TEC-3022", codigo: "3022", grupo: "Comercio, Finanzas y Turismo (CTP)", nombre: "👨‍🍳 3022 · Gerencia y Producción en Cocina", nombreEn: "3022 · Culinary Management & Production", tipo: "COCINA_3022" }
];

export function hablarTexto(texto, codigoIdioma = "es-CR", velocidad = 1.0) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const mapaLocale = { ES: "es-CR", EN: "en-US", FR: "fr-FR", PT: "pt-BR", DE: "de-DE", IT: "it-IT" };
  const langFinal = mapaLocale[codigoIdioma] || codigoIdioma || "es-CR";
  const esIngles = langFinal.toLowerCase().startsWith("en");

  const limpio = String(texto || "")
    .replace(/₡/g, " colones ")
    .replace(/²/g, esIngles ? " squared " : " al cuadrado ")
    .replace(/³/g, esIngles ? " cubed " : " al cubo ")
    .replace(/÷/g, esIngles ? " divided by " : " dividido entre ")
    .replace(/×/g, esIngles ? " times " : " multiplicado por ");

  const u = new SpeechSynthesisUtterance(limpio);
  u.lang = langFinal;
  u.rate = velocidad;
  window.speechSynthesis.speak(u);
}

export const hablarPoliglota = hablarTexto;

// Helper para construir el objeto del reactivo en el formato de la consola
function armarItem(esp, idx, v, dificultad, subarea, diagramaTipo, paramsDiagrama, enunciado, enunciadoEn, opsEs, opsEn, indiceCorrecto, solucionario, dua) {
  const letras = ["A", "B", "C", "D"];
  return {
    uid: `${esp.codigo}-Q${idx + 1}-V${v}`,
    numero: idx + 1,
    area: esp.nombre,
    subarea,
    dificultad,
    diagramaTipo,
    paramsDiagrama,
    enunciado,
    enunciadoEn,
    opciones: [0, 1, 2, 3].map(k => ({
      id: letras[k],
      texto: opsEs[k],
      textoEn: opsEn ? opsEn[k] : opsEs[k]
    })),
    correcta: letras[indiceCorrecto],
    solucionario,
    dua
  };
}

// ============================================================================
// GENERADOR ESPECÍFICO POR CADA UNA DE LAS 52 MATERIAS Y ESPECIALIDADES
// ============================================================================
export function generarReactivoDeMateria(esp, idx, seed, dificultadFiltro = "TODAS") {
  const dificultades = ["Básica", "Intermedia", "Avanzada"];
  const dificultad = dificultadFiltro === "TODAS" ? dificultades[(idx + seed) % 3] : dificultadFiltro;
  const v = (seed % 900) + 100 + idx;
  const t = esp.tipo === "PRIMARIA_MIX" ? ["MATEMATICA", "ESPANOL", "CIENCIAS_GEN", "SOCIALES"][idx % 4] : esp.tipo;

  // --------------------------------------------------------------------------
  // 1. PRUEBA TEÓRICA MOPT / COSEVI (LICENCIAS A, B1, C - LEY N.° 9078)
  // --------------------------------------------------------------------------
  if (t.startsWith("MOPT_")) {
    const casoMopt = idx % 4;
    if (casoMopt === 0) {
      const vel = [40, 60, 80, 90, 100][(idx + seed) % 5];
      const distReaccion = Math.round((vel * 1000) / 3600);
      return armarItem(
        esp, idx, v, dificultad, "Seguridad Vial, Distancia de Parada y Ley de Tránsito N.° 9078",
        "FLUJO_FINANCIERO", { sal: vel, cesantia: distReaccion, total: distReaccion * 3 },
        `Una persona conductora circula a ${vel} km/h sobre pavimento seco. Durante el primer segundo de percepción y reacción (antes de accionar el freno), el vehículo recorre aproximadamente ${distReaccion} metros. De acuerdo con el Manual del Conductor del MOPT/COSEVI y la Ley de Tránsito N.° 9078, ¿cuál técnica permite mantener una distancia segura de seguimiento respecto al vehículo que circula adelante?`,
        `A driver travels at ${vel} km/h on dry pavement, covering ${distReaccion} meters during the first second of reaction time. According to the MOPT Driver's Manual, which technique ensures a safe following distance?`,
        [
          "Aplicar la regla del intervalo de tiempo (mínimo dos segundos para vehículos livianos y tres o más para pesados o lluvia) tomando un punto fijo de referencia.",
          "Mantener una distancia fija de dos metros sin importar la velocidad ni las condiciones climáticas.",
          "Utilizar las luces altas de manera continua para advertir la cercanía al vehículo delantero.",
          "Desplazarse sobre la línea de barrera amarilla central para ampliar la visibilidad de frenado."
        ],
        [
          "Apply the time-interval rule (at least 2 seconds for light vehicles and 3+ seconds for heavy vehicles or rain) using a fixed reference point.",
          "Keep a fixed 2-meter distance regardless of speed or weather.",
          "Use high beams continuously to alert the vehicle ahead.",
          "Drive over the center yellow barrier line to increase visibility."
        ],
        0,
        `La distancia de parada suma la distancia de percepción-reacción (${distReaccion} m a ${vel} km/h) más la distancia de frenado. La regla de los dos segundos (o tres a cuatro en lluvia y equipo pesado) ajusta proporcionalmente el espacio de seguridad a la velocidad.`,
        "Cuando la parte trasera del vehículo de adelante pase por un punto fijo, cuente «mil uno, mil dos» antes de que su vehículo pase por ese mismo punto."
      );
    } else if (casoMopt === 1) {
      return armarItem(
        esp, idx, v, dificultad, "Señalamiento Vial Vertical y Horizontal (MOPT)",
        "VIGA_ESTATICA", { carga: 90, reaccion: 45 },
        `Al aproximarse a una intersección vial en Costa Rica, la persona conductora observa una señal vertical con fondo amarillo en forma de rombo y símbolos negros, acompañada en la calzada por una línea amarilla continua junto a una línea amarilla discontinua. ¿Qué indican respectivamente ambos dispositivos viales?`,
        `Approaching an intersection in Costa Rica, a driver sees a yellow diamond-shaped sign with black symbols and a solid yellow line next to a broken yellow line on the road. What do they indicate?`,
        [
          "Una señal de prevención que advierte un peligro en la vía, y que solo puede adelantar quien circula del lado de la línea discontinua.",
          "Una señal de reglamentación de acatamiento obligatorio, y prohibición de estacionar en el espaldón.",
          "Una señal de información turística y permiso para adelantar en ambos sentidos de circulación.",
          "Una zona exclusiva para transporte público y obligación de detenerse por completo durante diez segundos."
        ],
        [
          "A warning sign alerting of a road hazard, and passing permitted only for traffic on the broken-line side.",
          "A regulatory sign and a no-parking zone on the shoulder.",
          "A tourist information sign and passing allowed in both directions.",
          "A public transit lane and mandatory 10-second stop."
        ],
        0,
        `Las señales preventivas tienen forma cuadrada con diagonal vertical (rombo), fondo amarillo y símbolo negro. En demarcación horizontal, la combinación de línea continua y discontinua autoriza el adelantamiento únicamente a los vehículos que circulan del lado de la línea discontinua.`,
        "Fondo amarillo en rombo = Prevención. Línea amarilla continua = Prohibido adelantar desde ese carril."
      );
    } else if (casoMopt === 2) {
      return armarItem(
        esp, idx, v, dificultad, "Conducción en Rotondas y Prioridad de Paso (Ley N.° 9078)",
        "CIRCUNFERENCIA", { h: 0, k: 0, r: 30 },
        `Una persona conductora se aproxima a una rotonda de dos carriles en la Gran Área Metropolitana con la intención de abandonar la rotonda en la primera o segunda salida. Según las normas de circulación vial de Costa Rica, ¿quién tiene la prioridad de paso y cuál carril debe utilizar?`,
        `A driver approaches a two-lane roundabout intending to take the first or second exit. Under Costa Rican traffic law, who has the right of way and which lane should be used?`,
        [
          "Tiene prioridad el vehículo que ya circula dentro de la rotonda a velocidad máxima de 30 km/h, y para salir en la primera o segunda salida debe ubicarse en el carril externo (derecho).",
          "Tiene prioridad el vehículo que intenta ingresar a la rotonda a más de 60 km/h utilizando el carril interno izquierdo.",
          "Tienen prioridad los vehículos que ingresan por la derecha sin respetar la señal de Ceda el Paso.",
          "Se debe abandonar la rotonda directamente desde el carril interno cruzando frente a los vehículos del carril externo."
        ],
        [
          "Vehicles already inside the roundabout at max 30 km/h have right of way, and the outer (right) lane must be used for the first or second exit.",
          "Entering vehicles at 60 km/h have priority via the inner lane.",
          "Vehicles entering from the right have priority over internal traffic.",
          "Drivers must exit directly from the inner lane across outer traffic."
        ],
        0,
        `En toda rotonda la velocidad máxima es de 30 km/h, tienen prioridad los vehículos que ya circulan dentro del anillo y el carril externo derecho es el reglamentario para abandonar en la primera o segunda salida.`,
        "Regla de oro en rotondas: Prioridad para quien ya va adentro (máximo 30 km/h); carril derecho para salir en la 1.ª o 2.ª salida."
      );
    } else {
      return armarItem(
        esp, idx, v, dificultad, "Conducción Técnica, Económica y Eficiente (Tacómetro y Cambio de Marchas)",
        "TOPOLOGIA_RED", { pref: "2000-2500 rpm", hosts: 4, mask: "Par Motor Óptimo" },
        `En la conducción técnica de vehículos con motor de combustión interna, mantener las revoluciones por minuto (rpm) dentro del rango óptimo medido por el tacómetro permite reducir el consumo de combustible y las emisiones contaminantes. ¿En qué rango de revoluciones se recomienda realizar el cambio a una marcha superior en motores diésel y gasolina respectivamente?`,
        `In efficient technical driving, at what tachometer rpm range should upshifts be performed for diesel and gasoline engines respectively?`,
        [
          "Entre 1 500 y 2 000 rpm en motores diésel, y entre 2 000 y 2 500 rpm en motores de gasolina.",
          "Por encima de las 4 500 rpm en motores diésel y a 5 500 rpm en motores de gasolina.",
          "En punto muerto (neutro) durante los descensos en pendiente para apagar el inyector.",
          "Manteniendo siempre la primera marcha hasta alcanzar los 80 km/h en autopista."
        ],
        [
          "Between 1,500 and 2,000 rpm for diesel engines, and between 2,000 and 2,500 rpm for gasoline engines.",
          "Above 4,500 rpm for diesel and 5,500 rpm for gasoline.",
          "Coasting in neutral downhill.",
          "Staying in first gear up to 80 km/h."
        ],
        0,
        `La conducción eficiente aprovecha el par máximo a bajas revoluciones mediante cambios progresivos entre 1 500-2 000 rpm (diésel) y 2 000-2 500 rpm (gasolina), evitando acelerar innecesariamente.`,
        "Tacómetro eficiente: Diésel (1 500 a 2 000 rpm) · Gasolina (2 000 a 2 500 rpm)."
      );
    }
  }

  // --------------------------------------------------------------------------
  // 2. ESPAÑOL Y COMPRENSIÓN DE LECTURA (SECUNDARIA PNE Y PRIMARIA)
  // --------------------------------------------------------------------------
  if (t === "ESPANOL") {
    const casoEsp = idx % 3;
    if (casoEsp === 0) {
      return armarItem(
        esp, idx, v, dificultad, "Comprensión Lectora Crítica · Inferencia y Núcleo de Sentido",
        "FLUJO_FINANCIERO", { sal: 1, cesantia: 2, total: 3 },
        `Lea el siguiente fragmento:\n«La hiperconectividad digital ha creado el espejismo de una comunidad global sin fronteras; sin embargo, los algoritmos de recomendación suelen encerrar a la persona usuaria en cámaras de eco donde solo escucha sus propios prejuicios amplificados, erosionando silenciosamente el diálogo democrático que requiere confrontar la alteridad».\nSegún el núcleo de sentido implícito en el texto anterior, se infiere que el autor advierte sobre:`,
        `Read the excerpt on digital hyperconnectivity and echo chambers. What does the author warn about implicitly?`,
        [
          "La paradoja de una tecnología que aparenta integrar al mundo mientras fomenta el aislamiento ideológico.",
          "La necesidad de prohibir el acceso a las redes informáticas para restaurar las costumbres antiguas.",
          "La superioridad de los algoritmos automatizados frente al diálogo ciudadano en democracia.",
          "La imposibilidad técnica de transmitir mensajes escritos a través de plataformas digitales."
        ],
        [
          "The paradox of technology that appears to unite the world while fostering ideological isolation.",
          "The need to ban internet access completely.",
          "The superiority of algorithms over democratic dialogue.",
          "The technical impossibility of digital text transmission."
        ],
        0,
        `El fragmento contrapone el «espejismo de una comunidad global» con las «cámaras de eco» que amplifican prejuicios y debilitan el diálogo con la alteridad, evidenciando la paradoja entre conexión aparente y aislamiento ideológico.`,
        "Identifique la oposición central del texto: «espejismo de comunidad global» frente a «cámaras de eco que encierran al individuo»."
      );
    } else if (casoEsp === 1) {
      return armarItem(
        esp, idx, v, dificultad, "Lógica Verbal y Cohesión · Conectores Discursivos",
        "FLUJO_FINANCIERO", { sal: 10, cesantia: 20, total: 30 },
        `Considere el siguiente enunciado:\n«Los embalses hidroeléctricos del país registraron niveles históricos de captación durante el último trimestre; __________, las autoridades del sector energético recomiendan mantener el uso racional de la electricidad ante la eventual llegada del fenómeno de El Niño».\n¿Cuál conector discursivo completa el enunciado estableciendo una relación lógica adversativa o de restricción?`,
        `Which discourse connector completes the sentence establishing an adversative or restrictive logical relationship?`,
        [
          "por consiguiente",
          "asimismo",
          "debido a que",
          "no obstante"
        ],
        [
          "consequently (por consiguiente)",
          "likewise (asimismo)",
          "because (debido a que)",
          "nevertheless / however (no obstante)"
        ],
        3,
        `La primera cláusula expone un dato favorable (alta captación hídrica) y la segunda introduce una restricción preventiva (mantener el ahorro). El conector adversativo «no obstante» (opción D) articula con exactitud dicha relación.`,
        "Clasifique los conectores: «por consiguiente» (consecuencia), «asimismo» (adición), «debido a que» (causa) y «no obstante» (oposición/restricción)."
      );
    } else {
      return armarItem(
        esp, idx, v, dificultad, "Análisis de Textos Literarios y Figuras Retóricas",
        "FLUJO_FINANCIERO", { sal: 5, cesantia: 5, total: 10 },
        `Lea los siguientes versos:\n«En la tarde silenciosa, el río suspira cansado mientras acaricia las piedras del camino con sus manos de espuma».\n¿Cuál figura literaria predomina al atribuir acciones y rasgos propios de seres humanos («suspira cansado», «acaricia con sus manos») a un elemento de la naturaleza?`,
        `Which literary figure predominates when attributing human actions ("sighs tiredly", "caresses with its hands") to a river?`,
        [
          "Prosopopeya o personificación",
          "Hipérbole o exageración",
          "Símil o comparación explícita",
          "Epíteto reiterativo"
        ],
        [
          "Personification (Prosopopeya)",
          "Hyperbole",
          "Simile",
          "Epithet"
        ],
        0,
        `La prosopopeya o personificación consiste en otorgar cualidades, sentimientos o acciones humanas a seres inanimados o fenómenos naturales.`,
        "Cualidades humanas atribuidas a objetos o naturaleza = Prosopopeya (Personificación)."
      );
    }
  }

  // --------------------------------------------------------------------------
  // 3. CIENCIAS: BIOLOGÍA, FÍSICA, QUÍMICA Y CIENCIAS GENERALES
  // --------------------------------------------------------------------------
  if (t === "BIOLOGIA" || (t === "CIENCIAS_GEN" && idx % 3 === 0)) {
    return armarItem(
      esp, idx, v, dificultad, "Biología · Ecología, Ciclo del Carbono y Genética",
      "FLUJO_FINANCIERO", { sal: 100, cesantia: 10, total: 110 },
      `En un ecosistema de bosque nuboso en Monteverde, las plantas epífitas y los árboles capturan dióxido de carbono (CO₂) atmosférico, mientras que los hongos saprófitos y las bacterias del suelo degradan la materia orgánica muerta. Dentro del ciclo biogeoquímico del carbono, ¿qué procesos metabólicos fundamentales ejecutan respectivamente los productores primarios y los descomponedores?`,
      `In a cloud forest ecosystem, what fundamental metabolic processes do primary producers and decomposers perform respectively within the carbon cycle?`,
      [
        "Los productores fijan carbono en compuestos orgánicos mediante la fotosíntesis y los descomponedores liberan CO₂ mediante la respiración celular.",
        "Los productores realizan respiración anaerobia y los descomponedores fijan nitrógeno atmosférico.",
        "Ambos grupos fijan carbono inorgánico exclusivamente mediante quimiosíntesis celular sin intervención solar.",
        "Los productores consumen glucosa del suelo y los descomponedores transforman el oxígeno en energía lumínica."
      ],
      [
        "Producers fix carbon into organic compounds via photosynthesis, and decomposers release CO₂ via cellular respiration.",
        "Producers perform anaerobic respiration and decomposers fix nitrogen.",
        "Both groups fix inorganic carbon exclusively via chemosynthesis.",
        "Producers consume soil glucose and decomposers turn oxygen into light."
      ],
      0,
      `Los organismos autótrofos (productores) reducen el CO₂ atmosférico a glucosa durante la fotosíntesis, mientras que los descomponedores oxidan los restos orgánicos liberando CO₂ de vuelta a la atmósfera.`,
      "Productores (plantas) = capturan CO₂ por Fotosíntesis. Descomponedores (hongos/bacterias) = devuelven CO₂ por Respiración."
    );
  }

  if (t === "FISICA" || (t === "CIENCIAS_GEN" && idx % 3 === 1)) {
    const masa = 10 + (idx % 10);
    const fApl = (masa * 6);
    const friccion = (masa * 1.5);
    const acel = ((fApl - friccion) / masa).toFixed(1);
    return armarItem(
      esp, idx, v, dificultad, "Física · Dinámica, Segunda Ley de Newton y Trabajo Mecánico",
      "VIGA_ESTATICA", { carga: fApl, reaccion: friccion },
      `Un bloque de ${masa} kg de masa se encuentra sobre una superficie horizontal y se le aplica una fuerza horizontal de ${fApl} N hacia la derecha. Entre el bloque y la superficie actúa una fuerza de fricción cinética constante de ${friccion} N en sentido opuesto al movimiento. De acuerdo con la Segunda Ley de Newton (ΣF = m · a), ¿cuál es la magnitud de la aceleración que experimenta el bloque?`,
      `A ${masa} kg block on a horizontal surface is pulled right with a ${fApl} N force against a constant kinetic friction force of ${friccion} N. According to Newton's Second Law, what is the magnitude of its acceleration?`,
      [
        `${acel} m/s²`,
        `${(fApl / masa).toFixed(1)} m/s²`,
        `${((fApl + friccion) / masa).toFixed(1)} m/s²`,
        `${(friccion / masa).toFixed(1)} m/s²`
      ],
      [
        `${acel} m/s²`,
        `${(fApl / masa).toFixed(1)} m/s²`,
        `${((fApl + friccion) / masa).toFixed(1)} m/s²`,
        `${(friccion / masa).toFixed(1)} m/s²`
      ],
      0,
      `La fuerza neta horizontal es ΣFx = ${fApl} N − ${friccion} N = ${fApl - friccion} N. Al dividir entre la masa (${masa} kg), la aceleración es a = ${fApl - friccion} ÷ ${masa} = ${acel} m/s² (opción A).`,
      "Paso 1: Reste la fuerza de fricción a la fuerza aplicada para hallar la Fuerza Neta. Paso 2: Divida la Fuerza Neta entre la masa."
    );
  }

  if (t === "QUIMICA" || (t === "CIENCIAS_GEN" && idx % 3 === 2)) {
    const moles = ((idx % 4) + 1) * 0.5; // 0.5, 1.0, 1.5, 2.0 mol
    const volL = 0.25;
    const molaridad = (moles / volL).toFixed(2);
    return armarItem(
      esp, idx, v, dificultad, "Química · Disoluciones, Estequiometría y Molaridad",
      "FLUJO_FINANCIERO", { sal: moles, cesantia: 250, total: molaridad },
      `En un laboratorio de química se prepara una disolución acuosa disolviendo ${moles} mol de hidróxido de sodio (NaOH) en suficiente agua destilada hasta completar un volumen final de disolución de 250 mL (0,25 L). ¿Cuál es la concentración molar (M = n / V) de la disolución resultante?`,
      `In a chemistry lab, ${moles} mol of NaOH is dissolved in distilled water to a final solution volume of 250 mL (0.25 L). What is the molar concentration (M = n / V)?`,
      [
        `${(moles * volL).toFixed(3)} mol/L`,
        `${molaridad} mol/L`,
        `${moles.toFixed(2)} mol/L`,
        `${(molaridad * 2).toFixed(2)} mol/L`
      ],
      [
        `${(moles * volL).toFixed(3)} mol/L`,
        `${molaridad} mol/L`,
        `${moles.toFixed(2)} mol/L`,
        `${(molaridad * 2).toFixed(2)} mol/L`
      ],
      1,
      `La molaridad se define como M = moles de soluto ÷ litros de disolución. Como 250 mL = 0,25 L, se obtiene M = ${moles} mol ÷ 0,25 L = ${molaridad} mol/L (opción B).`,
      "Convierta siempre los mililitros a litros dividiendo entre 1 000 (250 mL = 0,25 L) antes de aplicar M = n ÷ V."
    );
  }

  // --------------------------------------------------------------------------
  // 4. ESTUDIOS SOCIALES, EDUCACIÓN CÍVICA, FILOSOFÍA Y PSICOLOGÍA
  // --------------------------------------------------------------------------
  if (t === "SOCIALES" || t === "CIVICA" || t === "FILOSOFIA" || t === "PSICOLOGIA") {
    const esCivica = t === "CIVICA" || (idx % 2 === 1);
    if (esCivica) {
      return armarItem(
        esp, idx, v, dificultad, "Educación Cívica · Democracia Participativa y Régimen Político",
        "FLUJO_FINANCIERO", { sal: 1949, cesantia: 7, total: 84 },
        `Los habitantes de un cantón costarricense son convocados oficialmente por el Concejo Municipal para votar «Sí» o «No» sobre una decisión administrativa de impacto estrictamente cantonal, o bien sobre la eventual revocatoria de mandato de la alcaldía. Dentro de los mecanismos de democracia participativa vigentes en Costa Rica, ¿cómo se denomina este instrumento de consulta popular local?`,
        `Citizens of a Costa Rican canton are officially convoked by the Municipal Council to vote "Yes" or "No" on a binding local issue or mayoral recall. What is this municipal consultation mechanism called?`,
        [
          "Referéndum constitucional de alcance nacional",
          "Plebiscito municipal",
          "Recurso de hábeas corpus",
          "Veto del Poder Ejecutivo"
        ],
        [
          "National constitutional referendum",
          "Municipal plebiscite",
          "Writ of habeas corpus",
          "Executive veto"
        ],
        1,
        `El plebiscito es el mecanismo de consulta popular de escala cantonal convocado por el Concejo Municipal para decidir asuntos de trascendencia local o la revocatoria del alcalde (opción B).`,
        "Escala Nacional (aprobar/derogar leyes) = Referéndum. Escala Cantonal/Municipal = Plebiscito."
      );
    } else {
      return armarItem(
        esp, idx, v, dificultad, "Estudios Sociales · Reforma Social de 1940 y Estado Social de Derecho",
        "FLUJO_FINANCIERO", { sal: 1940, cesantia: 1943, total: 1949 },
        `Durante la década de 1940 en Costa Rica se fundó la Universidad de Costa Rica, se creó la Caja Costarricense de Seguro Social (CCSS), se promulgó el Código de Trabajo y se incorporó el capítulo de las Garantías Sociales en la Constitución Política. ¿Cuál fue una consecuencia estructural de estas reformas en la sociedad costarricense?`,
        `In the 1940s, Costa Rica founded the UCR, created the Social Security Fund (CCSS), and enacted the Labor Code and Social Guarantees. What was a structural consequence of these reforms?`,
        [
          "La eliminación de los derechos sindicales y del salario mínimo en el sector productivo.",
          "La privatización de los seguros de salud y maternidad en todo el territorio nacional.",
          "La supresión de la intervención estatal en la regulación de las jornadas laborales.",
          "El fortalecimiento de la movilidad social y la consolidación de un sistema de seguridad social solidario y tripartito."
        ],
        [
          "Elimination of labor union rights and minimum wage.",
          "Privatization of health and maternity insurance.",
          "Suppression of state regulation over working hours.",
          "Strengthening of social mobility and consolidation of a solidary tripartite social security system."
        ],
        3,
        `Las Reformas Sociales de la década de 1940 institucionalizaron el financiamiento tripartito (Estado, patronos y personas trabajadoras) de la seguridad social, impulsando el ascenso social y la equidad en Costa Rica (opción D).`,
        "Reforma Social de 1940 = UCR + CCSS (aporte tripartito) + Garantías Sociales + Código de Trabajo."
      );
    }
  }

  // --------------------------------------------------------------------------
  // 5. IDIOMAS: INGLÉS, FRANCÉS Y EXECUTIVE SERVICE CENTERS (3021)
  // --------------------------------------------------------------------------
  if (t === "INGLES" || t === "FRANCES") {
    return armarItem(
      esp, idx, v, dificultad, "Bilingual Communication, Reading Comprehension & Contact Center KPIs (MCER B2)",
      "FLUJO_FINANCIERO", { sal: 95, cesantia: 88, total: 92 },
      `Read the following professional scenario:\n"During a technical support interaction, a corporate client reports a critical outage affecting their online billing system. The specialist responds: 'I understand how urgent this billing interruption is for your operations, and I am escalating your ticket to our Tier-2 engineering team right now while staying on the line with you.'" Which customer service principle and metric focus are demonstrated?`,
      `Which customer service principle and metric focus are demonstrated by the specialist's response?`,
      [
        "Empathetic validation and active ownership aimed at achieving First Contact Resolution (FCR).",
        "Call avoidance and unannounced cold transfer to reduce talk time artificially.",
        "Use of ambiguous technical jargon to delay troubleshooting until the next shift.",
        "Instructing the client to restart their hardware without verifying the server logs."
      ],
      [
        "Empathetic validation and active ownership aimed at achieving First Contact Resolution (FCR).",
        "Call avoidance and unannounced cold transfer.",
        "Use of ambiguous technical jargon to delay troubleshooting.",
        "Instructing the client to restart hardware without checking server logs."
      ],
      0,
      `Validating the urgency of the client's situation while taking immediate ownership of the resolution demonstrates empathetic de-escalation and First Contact Resolution (FCR) best practices (option A).`,
      "Empathetic validation = acknowledge the impact on the customer + take immediate ownership of the solution."
    );
  }

  // --------------------------------------------------------------------------
  // 6. DESARROLLO WEB, CIBERSEGURIDAD, REDES, SOFTWARE, MÓVILES E IA (3015-3030)
  // --------------------------------------------------------------------------
  if (["WEB_CIBER_3016", "REDES_3028", "SOFTWARE_3023", "MOVILES_3015", "IA_3030"].includes(t)) {
    const subTic = idx % 3;
    if (subTic === 0) {
      const tablas = [
        { hosts: 12, pref: "/28", mask: "255.255.255.240", disp: 14, bits: 4 },
        { hosts: 28, pref: "/27", mask: "255.255.255.224", disp: 30, bits: 5 },
        { hosts: 58, pref: "/26", mask: "255.255.255.192", disp: 62, bits: 6 },
        { hosts: 118, pref: "/25", mask: "255.255.255.128", disp: 126, bits: 7 }
      ];
      const r = tablas[(idx + seed) % tablas.length];
      return armarItem(
        esp, idx, v, dificultad, "Redes IPv4 (VLSM), Ciberseguridad y Arquitectura Web",
        "TOPOLOGIA_RED", { pref: r.pref, hosts: r.hosts, mask: r.mask },
        `En un proyecto de ${esp.nombre}, se requiere segmentar una red IPv4 mediante máscaras de longitud variable (VLSM) para alojar una subred con ${r.hosts} terminales activas optimizando el direccionamiento. ¿Cuál máscara de subred y prefijo CIDR cumplen con 2ⁿ - 2 ≥ ${r.hosts}?`,
        `In ${esp.nombreEn}, an IPv4 network must be segmented using VLSM to support ${r.hosts} active hosts without wasting addresses. Which subnet mask and CIDR prefix meet 2ⁿ - 2 ≥ ${r.hosts}?`,
        [
          `${r.mask} (${r.pref}), que provee ${r.disp} direcciones de host utilizables.`,
          `255.255.255.248 (/29), que provee 6 direcciones de host utilizables.`,
          `255.255.255.252 (/30), que provee 2 direcciones de host utilizables.`,
          `255.255.0.0 (/16), que provee 65 534 direcciones de host utilizables.`
        ],
        [
          `${r.mask} (${r.pref}), providing ${r.disp} usable host addresses.`,
          `255.255.255.248 (/29), providing 6 usable host addresses.`,
          `255.255.255.252 (/30), providing 2 usable host addresses.`,
          `255.255.0.0 (/16), providing 65,534 usable host addresses.`
        ],
        0,
        `Con n = ${r.bits} bits para host se obtienen 2^${r.bits} - 2 = ${r.disp} direcciones utilizables. Restando a 32 bits los ${r.bits} bits de host se obtiene el prefijo ${r.pref} y la máscara ${r.mask} (opción A).`,
        "Aplique 2ⁿ - 2 ≥ hosts requeridos: /29 = 6 hosts, /28 = 14 hosts, /27 = 30 hosts, /26 = 62 hosts, /25 = 126 hosts."
      );
    } else if (subTic === 1) {
      return armarItem(
        esp, idx, v, dificultad, "Bases de Datos Relacionales · Normalización (3FN) y Seguridad RLS",
        "FLUJO_FINANCIERO", { sal: 1, cesantia: 2, total: 3 },
        `Considere el siguiente esquema relacional en Segunda Forma Normal (2FN): FACTURAS(id_factura [PK], fecha, id_cliente, nombre_cliente, telefono_cliente, monto_total), donde nombre_cliente y telefono_cliente dependen funcionalmente de id_cliente. ¿Cuál transformación es indispensable para alcanzar la Tercera Forma Normal (3FN)?`,
        `Given the 2NF relation INVOICES(invoice_id [PK], date, client_id, client_name, client_phone, total), where client_name and client_phone depend on client_id, which transformation achieves Third Normal Form (3NF)?`,
        [
          "Definir una llave primaria compuesta entre id_factura y monto_total en la misma tabla.",
          "Eliminar la columna id_cliente y conservar el nombre como texto sin índice.",
          "Extraer nombre_cliente y telefono_cliente hacia una nueva tabla CLIENTES vinculada mediante id_cliente como llave foránea.",
          "Duplicar el registro completo de la factura por cada número telefónico del cliente."
        ],
        [
          "Define a composite primary key between invoice_id and total.",
          "Drop client_id and keep client_name as plain text.",
          "Extract client_name and client_phone into a separate CLIENTS table linked via client_id as a foreign key.",
          "Duplicate the entire invoice row for each phone number."
        ],
        2,
        `La Tercera Forma Normal (3FN) exige eliminar toda dependencia transitiva entre atributos no primos (id_factura → id_cliente → nombre_cliente), separando los atributos del cliente en su propia entidad (opción C).`,
        "3FN = ningún atributo que no sea llave puede depender de otro atributo que tampoco sea llave (cero dependencias transitivas)."
      );
    } else {
      return armarItem(
        esp, idx, v, dificultad, "Ciberseguridad Web (Prevención IDOR, RLS, 2FA) y Servicios RESTful",
        "TOPOLOGIA_RED", { pref: "HTTPS / RLS", hosts: 200, mask: "JWT + 2FA" },
        `Durante una auditoría de ciberseguridad en una aplicación web, se detecta que un usuario autenticado puede consultar expedientes privados de otros clientes cambiando manualmente el identificador numérico en la URL, y que un endpoint REST retorna el código 200 OK incluso cuando falta un campo obligatorio en el JSON. ¿Qué vulnerabilidad de acceso ocurre y qué código HTTP debe retornar la API ante datos incompletos?`,
        `An authenticated user views other clients' records by changing the numeric ID in the URL, and a REST endpoint returns 200 OK when required JSON fields are missing. Identify the access vulnerability and the proper HTTP status code for validation errors.`,
        [
          "Vulnerabilidad de Referencia Directa Insegura a Objetos (IDOR), corregida con políticas RLS en el servidor, y código HTTP 400 Bad Request (o 422).",
          "Desbordamiento de memoria caché en el monitor y código HTTP 201 Created.",
          "Tormenta de difusión en Capa 2 y código HTTP 100 Continue.",
          "Fallo mecánico de fuente de poder y código HTTP 301 Moved Permanently."
        ],
        [
          "Insecure Direct Object Reference (IDOR) vulnerability, fixed via server-side RLS policies, and HTTP 400 Bad Request (or 422).",
          "Monitor cache overflow and HTTP 201 Created.",
          "Layer 2 broadcast storm and HTTP 100 Continue.",
          "Power supply failure and HTTP 301 Moved Permanently."
        ],
        0,
        `Acceder a registros ajenos modificando parámetros de la URL sin validar la pertenencia del recurso en el servidor es una vulnerabilidad IDOR (mitigada con Row Level Security), y los errores de validación de entrada del cliente corresponden al código HTTP 400 o 422 (opción A).`,
        "IDOR = cambiar el ID en la URL para ver datos de otro usuario (se frena con RLS en el servidor). Error de datos enviados por el cliente = 400 Bad Request."
      );
    }
  }

  // --------------------------------------------------------------------------
  // 7. AGROECOLOGÍA (1001), AGROINDUSTRIA (1003/1004), JARDINERÍA (1005) Y AGRO (1009)
  // --------------------------------------------------------------------------
  if (["AGRO_1001", "AGROIND_1003", "AGROPEC_1004", "JARDIN_1005", "PROD_AGRO_1009"].includes(t)) {
    if (t === "AGRO_1001") {
      return armarItem(
        esp, idx, v, dificultad, "Agroecología (1001) · Sistemas Agrosilvopastoriles, Suelos y Compostaje",
        "FLUJO_FINANCIERO", { sal: 28, cesantia: 60, total: 62 },
        `Una parcela productiva de un Colegio Técnico Profesional establece la siembra en callejones de árboles maderables de laurel, intercalados con surcos de cultivo de maíz para cosecha estacional y el manejo de forrajes en el estrato inferior para la rotación controlada de ganado ovino. De acuerdo con la clasificación técnica de los componentes integrados, ¿a qué tipo de sistema corresponde el diseño?`,
        `An integrated plot combines timber trees (laurel) in alleys, seasonal corn rows, and understory forage for controlled sheep grazing. How is this agroforestry system classified?`,
        [
          "Silvoapícola",
          "Silvoagrícola",
          "Silvopastoril",
          "Agrosilvopastoril"
        ],
        [
          "Apiforestry",
          "Silvoarable",
          "Silvopastoral",
          "Agrosilvopastoral"
        ],
        3,
        `Al integrar en la misma unidad productiva cultivos agrícolas (maíz), especies forestales (laurel) y componentes pecuarios (forraje y ganado ovino), el sistema se clasifica como Agrosilvopastoril (opción D).`,
        "Cultivo agrícola (Agro) + Árboles maderables (Silvo) + Ganado en pastoreo (Pastoril) = Sistema Agrosilvopastoril."
      );
    }
    if (t === "AGROIND_1003" || t === "AGROPEC_1004") {
      const litros = (4 + (idx % 6)) * 100;
      const rend = 12.5;
      const kg = (litros * rend) / 100;
      return armarItem(
        esp, idx, v, dificultad, "Agroindustria Alimentaria (1003 / 1004) · Rendimiento, °Brix y HACCP",
        "FLUJO_FINANCIERO", { sal: litros, cesantia: kg, total: rend },
        `Una planta agroindustrial procesa ${litros} litros de leche estandarizada y obtiene ${kg} kg de queso fresco pasteurizado, mientras en la línea de frutas concentra mermelada hasta 65 °Brix para disminuir la actividad de agua (aw). ¿Cuál es el rendimiento quesero expresado en kilogramos por cada 100 litros de leche?`,
        `A dairy plant processes ${litros} liters of milk and obtains ${kg} kg of cheese. Expressed in kg of cheese per 100 liters of milk, what is the yield?`,
        [
          "8,0 kg/100 L",
          "10,0 kg/100 L",
          "12,5 kg/100 L",
          "16,0 kg/100 L"
        ],
        [
          "8.0 kg/100 L",
          "10.0 kg/100 L",
          "12.5 kg/100 L",
          "16.0 kg/100 L"
        ],
        2,
        `El rendimiento por cada 100 L se calcula como (${kg} kg ÷ ${litros} L) × 100 = 12,5 kg/100 L (opción C).`,
        "Rendimiento por cada 100 litros = (Kilogramos de queso obtenidos ÷ Litros de leche procesados) × 100."
      );
    }
    const totalFranja = 18 + (idx % 5);
    const cesped = totalFranja - 10;
    return armarItem(
      esp, idx, v, dificultad, "Agrojardinería (1005) y Producción Agropecuaria (1009)",
      "VIGA_ESTATICA", { carga: totalFranja, reaccion: cesped },
      `En el replanteo de un jardín a escala 1:100, una franja longitudinal mide ${totalFranja},00 m en total y comprende consecutivamente: zona de arbustos (4,50 m), sendero de acceso (2,00 m), área de césped (sin cota) y jardinera (3,50 m). ¿Cuál dimensión real corresponde al área de césped?`,
      `A ${totalFranja}.00 m landscaping strip contains shrubs (4.50 m), path (2.00 m), unlabeled lawn, and planter (3.50 m). What is the real length of the lawn area?`,
      [
        `${cesped - 2},00 m`,
        `${cesped - 1},00 m`,
        `${cesped},00 m`,
        `${cesped + 2},00 m`
      ],
      [
        `${cesped - 2}.00 m`,
        `${cesped - 1}.00 m`,
        `${cesped}.00 m`,
        `${cesped + 2}.00 m`
      ],
      2,
      `La suma de los segmentos acotados es 4,50 + 2,00 + 3,50 = 10,00 m. Al restar 10,00 m al largo total de ${totalFranja},00 m se obtiene ${cesped},00 m (opción C).`,
      "Sume los tramos conocidos (4,50 + 2,00 + 3,50 = 10,00 m) y réstelos a la cota general de la franja."
    );
  }

  // --------------------------------------------------------------------------
  // 8. INGENIERÍA: CONSTRUCCIÓN CIVIL (2003), DIBUJO (2005), BIM (2006) Y DISEÑO (2007/2008)
  // --------------------------------------------------------------------------
  if (["CIVIL_2003", "DIBUJO_2005", "BIM_2006", "DISENO_2007", "PUBLICIDAD_2008", "ELECTRONICA_2017", "CALIDAD_2019"].includes(t)) {
    if (t === "DISENO_2007" || t === "PUBLICIDAD_2008") {
      return armarItem(
        esp, idx, v, dificultad, "Diseño Gráfico (2007) y Publicitario (2008) · Preprensa, Color y Vectorización",
        "FLUJO_FINANCIERO", { sal: 300, cesantia: 4, total: 48 },
        `En una empresa de producción gráfica se recibe un archivo PDF destinado a impresión comercial offset. Antes de filmar las planchas térmicas CTP, la persona operadora comprueba la incrustación de fuentes, la resolución de imágenes, el modo de color CMYK y los sangrados. ¿Cómo se denomina esta operación de control previo en preprensa digital?`,
        `Before generating CTP plates for offset printing, the operator verifies embedded fonts, image resolution, CMYK color mode, and bleeds in the PDF. What is this digital prepress check called?`,
        [
          "Preflight",
          "Trapping",
          "Imposición",
          "Rasterización"
        ],
        [
          "Preflight",
          "Trapping",
          "Imposition",
          "Rasterization"
        ],
        0,
        `El procedimiento técnico de verificación previa de un archivo digital (fuentes, resolución, espacio cromático y sangrados) antes de entrar a prensa se denomina Preflight (opción A).`,
        "Preflight = revisión técnica de fuentes, resolución, sangrados y modo CMYK antes de imprimir."
      );
    }
    const carga = (10 + (idx % 12)) * 100;
    const ra = carga / 2;
    return armarItem(
      esp, idx, v, dificultad, "Ingeniería Civil (2003), Dibujo Técnico (2005) y Modelado BIM (2006)",
      "VIGA_ESTATICA", { carga, reaccion: ra },
      `En el diseño estructural de una edificación, una viga horizontal simétrica de 6 m de longitud apoyada simplemente en sus extremos A y B soporta una carga puntual en su centro geométrico de ${carga} kgf. Para garantizar el equilibrio estático del sistema, ¿cuál es la magnitud de la reacción vertical en cada apoyo (Ra y Rb)?`,
      `A 6 m symmetric simply supported beam carries a central point load of ${carga} kgf. What is the vertical reaction force at each support for static equilibrium?`,
      [
        "0 kgf",
        `${ra} kgf`,
        `${carga} kgf`,
        `${carga * 2} kgf`
      ],
      [
        "0 kgf",
        `${ra} kgf`,
        `${carga} kgf`,
        `${carga * 2} kgf`
      ],
      1,
      `Por equilibrio estático vertical (ΣFy = 0) y simetría de la carga puntual centrada, cada apoyo soporta exactamente la mitad de la carga total: ${carga} ÷ 2 = ${ra} kgf (opción B).`,
      "En toda viga simétrica con carga central, divida la carga total entre 2 para hallar la reacción en cada apoyo."
    );
  }

  // --------------------------------------------------------------------------
  // 9. COMERCIO, CONTABILIDAD (3001), EJECUTIVO COMERCIAL (3019), TURISMO Y COCINA
  // --------------------------------------------------------------------------
  if (["CONTA_3001", "COMERCIAL_3019", "TURISMO_3018", "COCINA_3022"].includes(t)) {
    const sal = ((idx % 5) + 5) * 110000;
    const cesantia = Math.round((sal / 30) * 84);
    const total = sal + cesantia;
    return armarItem(
      esp, idx, v, dificultad, "Gestión Financiera NIIF, Legislación Laboral, Hospitalidad y Costos",
      "FLUJO_FINANCIERO", { sal, cesantia, total },
      `Una persona trabajadora concluye su contrato laboral con responsabilidad patronal tras cuatro años continuos de servicio, devengando un salario mensual promedio de ₡${sal.toLocaleString()}. Considerando un mes de preaviso y 21 días de auxilio de cesantía por cada año laborado (mes comercial de 30 días), ¿cuál es el monto conjunto de ambas indemnizaciones?`,
      `An employee terminates their contract with employer liability after 4 continuous years earning ₡${sal.toLocaleString()}/month. Counting 1 month notice and 21 days/year severance (30-day month), what is the combined payout?`,
      [
        `₡${total.toLocaleString()}`,
        `₡${cesantia.toLocaleString()}`,
        `₡${(sal * 4).toLocaleString()}`,
        `₡${Math.round(sal * 1.13).toLocaleString()}`
      ],
      [
        `₡${total.toLocaleString()}`,
        `₡${cesantia.toLocaleString()}`,
        `₡${(sal * 4).toLocaleString()}`,
        `₡${Math.round(sal * 1.13).toLocaleString()}`
      ],
      0,
      `El salario diario es ₡${sal.toLocaleString()} ÷ 30. Por 4 años corresponden 84 días de cesantía (₡${cesantia.toLocaleString()}) más un mes de preaviso (₡${sal.toLocaleString()}), sumando ₡${total.toLocaleString()} (opción A).`,
      "Divida el salario mensual entre 30 para hallar el salario diario, multiplique por 84 días de cesantía y sume el mes de preaviso."
    );
  }

  // --------------------------------------------------------------------------
  // 10. MATEMÁTICAS Y RAZONAMIENTO CUANTITATIVO (PNE / ADMISIÓN UCR-TEC-UNA)
  // --------------------------------------------------------------------------
  const h = (idx % 9) + 2;
  const k = (seed % 7) + 3;
  const r = ((idx + seed) % 5) + 3;
  const r2 = r * r;
  return armarItem(
    esp, idx, v, dificultad, "Matemáticas y Razonamiento Analítico · Geometría y Funciones",
    "CIRCUNFERENCIA", { h, k, r },
    `En un sistema de coordenadas cartesianas, una zona circular de cobertura tiene su centro en el punto (${h}, ${k}) y un radio de ${r} metros. ¿Cuál es la ecuación algebraica que modela dicha circunferencia?`,
    `In a Cartesian plane, a circular coverage zone has its center at (${h}, ${k}) and a radius of ${r} meters. What is the algebraic equation of the circle?`,
    [
      `(x - ${h})² + (y - ${k})² = ${r2}`,
      `(x + ${h})² + (y + ${k})² = ${r2}`,
      `(x - ${h})² + (y - ${k})² = ${r}`,
      `(x - ${k})² + (y - ${h})² = ${r * 2}`
    ],
    [
      `(x - ${h})² + (y - ${k})² = ${r2}`,
      `(x + ${h})² + (y + ${k})² = ${r2}`,
      `(x - ${h})² + (y - ${k})² = ${r}`,
      `(x - ${k})² + (y - ${h})² = ${r * 2}`
    ],
    0,
    `Al sustituir el centro (${h}, ${k}) y elevar el radio al cuadrado (${r}² = ${r2}) en (x - h)² + (y - k)² = r², se obtiene (x - ${h})² + (y - ${k})² = ${r2} (opción A).`,
    "Invierta el signo de las coordenadas del centro dentro de los paréntesis y eleve el radio al cuadrado."
  );
}

export function generarBancoEspecialidad(especialidadId = "TEC-3016", cantidad = 60, seed = 2026, dificultad = "TODAS") {
  const esp = CATALOGO_MATERIAS_Y_ESPECIALIDADES.find(e => e.id === especialidadId) || CATALOGO_MATERIAS_Y_ESPECIALIDADES[0];
  const lista = [];
  for (let i = 0; i < cantidad; i++) {
    lista.push(generarReactivoDeMateria(esp, i, seed + i * 7, dificultad));
  }
  return lista;
}