export type Chapter = {
  subject: string; emoji: string;
  saberes: string[]; contenidos: string[]; habilidades: string[];
  ejemplo: string; ejercicios: { q: string; a: string }[];
};
export type Book = { grade: number; title: string; chapters: Chapter[] };

export const primaryBooks: Book[] = [
  { grade: 0, title: "Preescolar · Jugando aprendo", chapters: [
    { subject: "Pensamiento matemático", emoji: "🧮", saberes: ["Números del 1 al 10", "Formas y colores"], contenidos: ["Conteo con objetos", "Grande y pequeño", "Arriba y abajo"], habilidades: ["Contar con los dedos", "Agrupar por color"], ejemplo: "🍎🍎🍎 = 3 manzanas.", ejercicios: [{ q: "¿Cuántas estrellas hay? ⭐⭐⭐⭐", a: "4" }, { q: "¿Qué es más grande: un elefante o un ratón?", a: "Un elefante" }] },
    { subject: "Lenguaje y comunicación", emoji: "🗣️", saberes: ["Vocales", "Escuchar y contar cuentos"], contenidos: ["Sonidos iniciales", "Nombre propio"], habilidades: ["Expresar ideas", "Reconocer su nombre"], ejemplo: "Oso empieza con O.", ejercicios: [{ q: "¿Con qué vocal empieza «uva»?", a: "U" }] },
    { subject: "Conocimiento del entorno", emoji: "🌳", saberes: ["Mi cuerpo", "Animales y plantas"], contenidos: ["Lavado de manos", "Día y noche"], habilidades: ["Cuidar la naturaleza"], ejemplo: "Antes de comer nos lavamos las manos.", ejercicios: [{ q: "¿Qué hacemos antes de comer?", a: "Lavarnos las manos" }] },
    { subject: "Convivencia y emociones", emoji: "💛", saberes: ["Emociones básicas", "Normas de la clase"], contenidos: ["Alegría, tristeza, enojo, miedo", "Pedir por favor y dar gracias"], habilidades: ["Compartir y esperar turno"], ejemplo: "Cuando recibo ayuda digo «gracias».", ejercicios: [{ q: "¿Qué decimos al recibir un regalo?", a: "Gracias" }] },
  ]},
  { grade: 1, title: "1.º grado · Mis primeros pasos", chapters: [
    { subject: "Matemática", emoji: "🔢", saberes: ["Números del 0 al 100", "Suma y resta sin llevar"], contenidos: ["Conteo y orden", "Decenas y unidades", "Figuras: círculo, cuadrado, triángulo"], habilidades: ["Contar objetos", "Comparar con mayor que y menor que"], ejemplo: "34 = 3 decenas y 4 unidades.", ejercicios: [{ q: "¿Cuánto es 12 + 5?", a: "17" }, { q: "¿Qué número es mayor: 48 o 84?", a: "84" }] },
    { subject: "Español", emoji: "📝", saberes: ["Vocales y consonantes", "Lectura de palabras sencillas"], contenidos: ["Sílabas directas (ma, pa, sa)", "Mayúscula al inicio y en nombres propios"], habilidades: ["Leer en voz alta", "Escribir su nombre"], ejemplo: "ma + no = mano.", ejercicios: [{ q: "¿Cuántas sílabas tiene «pelota»?", a: "Tres: pe-lo-ta" }, { q: "¿Cómo se escribe correctamente: «costa rica» o «Costa Rica»?", a: "Costa Rica, por ser nombre propio" }] },
    { subject: "Ciencias", emoji: "🌱", saberes: ["Partes del cuerpo", "Los cinco sentidos"], contenidos: ["Higiene personal", "Seres vivos y no vivos"], habilidades: ["Observar y describir"], ejemplo: "Con la nariz usamos el olfato.", ejercicios: [{ q: "¿Una piedra es un ser vivo?", a: "No, no nace, no crece ni se reproduce" }] },
    { subject: "Estudios Sociales", emoji: "🏡", saberes: ["Mi familia", "Mi escuela y mi comunidad"], contenidos: ["Símbolos patrios: bandera, escudo e himno", "Normas de convivencia"], habilidades: ["Respetar turnos", "Identificar la bandera"], ejemplo: "La bandera tiene franjas azul, blanca y roja.", ejercicios: [{ q: "¿Qué color está en el centro de la bandera de Costa Rica?", a: "Rojo" }] },
  ]},
  { grade: 2, title: "2.º grado · Exploro y descubro", chapters: [
    { subject: "Matemática", emoji: "🔢", saberes: ["Números hasta 1 000", "Suma y resta llevando"], contenidos: ["Centenas", "Introducción a la multiplicación", "Medidas de longitud: metro y centímetro"], habilidades: ["Resolver problemas cotidianos"], ejemplo: "3 grupos de 4 manzanas = 3 × 4 = 12.", ejercicios: [{ q: "¿Cuánto es 47 + 28?", a: "75" }, { q: "¿Cuánto es 5 × 2?", a: "10" }] },
    { subject: "Español", emoji: "📝", saberes: ["Sustantivo y adjetivo", "Comprensión de cuentos"], contenidos: ["Género y número", "Uso del punto"], habilidades: ["Identificar personajes de un cuento"], ejemplo: "«El perro grande»: perro es sustantivo, grande es adjetivo.", ejercicios: [{ q: "¿Cuál es el plural de «lápiz»?", a: "Lápices" }] },
    { subject: "Ciencias", emoji: "🌱", saberes: ["Plantas y sus partes", "Animales domésticos y silvestres"], contenidos: ["Raíz, tallo, hoja, flor", "Cuidado del agua"], habilidades: ["Clasificar seres vivos"], ejemplo: "La raíz absorbe agua del suelo.", ejercicios: [{ q: "¿Qué parte de la planta absorbe agua?", a: "La raíz" }] },
    { subject: "Estudios Sociales", emoji: "🏡", saberes: ["Mi comunidad y sus servicios"], contenidos: ["Oficios y profesiones", "Puntos cardinales"], habilidades: ["Ubicarse con norte, sur, este y oeste"], ejemplo: "El sol sale por el este.", ejercicios: [{ q: "¿Por dónde sale el sol?", a: "Por el este" }] },
  ]},
  { grade: 3, title: "3.º grado · Mi cantón y mi mundo", chapters: [
    { subject: "Matemática", emoji: "🔢", saberes: ["Números hasta 10 000", "Tablas de multiplicar", "División sencilla"], contenidos: ["Fracciones: mitad, tercio, cuarto", "Perímetro"], habilidades: ["Calcular mentalmente"], ejemplo: "La mitad de 8 es 4, se escribe 1/2.", ejercicios: [{ q: "¿Cuánto es 7 × 8?", a: "56" }, { q: "Perímetro de un cuadrado de 5 cm de lado", a: "20 cm" }] },
    { subject: "Español", emoji: "📝", saberes: ["Verbo", "Sílaba tónica"], contenidos: ["Palabras agudas, graves y esdrújulas", "La carta"], habilidades: ["Escribir un párrafo"], ejemplo: "«Árbol» es grave: el acento cae en la penúltima sílaba.", ejercicios: [{ q: "¿«Música» es aguda, grave o esdrújula?", a: "Esdrújula" }] },
    { subject: "Ciencias", emoji: "🌱", saberes: ["Estados del agua", "Sistema digestivo"], contenidos: ["Sólido, líquido y gaseoso", "Alimentación saludable"], habilidades: ["Hacer experimentos sencillos"], ejemplo: "El hielo al calentarse se vuelve líquido.", ejercicios: [{ q: "¿En qué estado está el vapor?", a: "Gaseoso" }] },
    { subject: "Estudios Sociales", emoji: "🗺️", saberes: ["Provincias de Costa Rica", "Mi cantón"], contenidos: ["Las 7 provincias", "Relieve: montañas, valles y llanuras"], habilidades: ["Leer un mapa sencillo"], ejemplo: "Costa Rica tiene 7 provincias: San José, Alajuela, Cartago, Heredia, Guanacaste, Puntarenas y Limón.", ejercicios: [{ q: "¿Cuántas provincias tiene Costa Rica?", a: "Siete" }] },
  ]},
  { grade: 4, title: "4.º grado · Investigo y razono", chapters: [
    { subject: "Matemática", emoji: "🔢", saberes: ["Números hasta 100 000", "Fracciones equivalentes", "Decimales"], contenidos: ["Ángulos", "Área de rectángulos"], habilidades: ["Resolver problemas de dos pasos"], ejemplo: "2/4 es equivalente a 1/2.", ejercicios: [{ q: "Área de un rectángulo de 6 m × 4 m", a: "24 m²" }, { q: "¿Qué es mayor: 0,5 o 0,45?", a: "0,5" }] },
    { subject: "Español", emoji: "📝", saberes: ["Oración: sujeto y predicado", "Textos informativos"], contenidos: ["Sinónimos y antónimos", "Uso de la coma"], habilidades: ["Resumir un texto"], ejemplo: "«Ana canta»: sujeto Ana, predicado canta.", ejercicios: [{ q: "Antónimo de «alto»", a: "Bajo" }] },
    { subject: "Ciencias", emoji: "🔬", saberes: ["Ecosistemas", "Cadenas alimentarias"], contenidos: ["Productores, consumidores, descomponedores", "Áreas de conservación"], habilidades: ["Explicar relaciones entre seres vivos"], ejemplo: "Planta → oruga → ave.", ejercicios: [{ q: "En una cadena alimentaria, ¿quién produce su alimento?", a: "Las plantas (productores)" }] },
    { subject: "Estudios Sociales", emoji: "⛰️", saberes: ["Geografía de Costa Rica", "Pueblos indígenas"], contenidos: ["Cordilleras y volcanes", "Ocho pueblos indígenas reconocidos"], habilidades: ["Valorar la diversidad cultural"], ejemplo: "El Chirripó (3 820 m) es el punto más alto del país.", ejercicios: [{ q: "¿Cuál es el cerro más alto de Costa Rica?", a: "El Chirripó" }] },
  ]},
  { grade: 5, title: "5.º grado · Pienso con historia", chapters: [
    { subject: "Matemática", emoji: "🔢", saberes: ["Operaciones con fracciones", "Porcentajes básicos"], contenidos: ["Múltiplos y divisores", "Volumen"], habilidades: ["Estimar y comprobar resultados"], ejemplo: "El 10 % de 200 es 20.", ejercicios: [{ q: "¿Cuánto es 1/4 + 2/4?", a: "3/4" }, { q: "¿Cuál es el 50 % de 80?", a: "40" }] },
    { subject: "Español", emoji: "📝", saberes: ["Tiempos verbales", "Textos narrativos y poéticos"], contenidos: ["Tilde diacrítica", "Leyendas costarricenses"], habilidades: ["Argumentar una opinión"], ejemplo: "«Tú» (persona) lleva tilde; «tu» (posesivo) no.", ejercicios: [{ q: "Complete: «___ casa es bonita» (tu/tú)", a: "Tu" }] },
    { subject: "Ciencias", emoji: "🔬", saberes: ["Sistema circulatorio y respiratorio", "Energía"], contenidos: ["Corazón y pulmones", "Fuentes de energía renovables"], habilidades: ["Relacionar hábitos con la salud"], ejemplo: "Costa Rica genera casi toda su electricidad con fuentes renovables.", ejercicios: [{ q: "¿Qué órgano bombea la sangre?", a: "El corazón" }] },
    { subject: "Estudios Sociales", emoji: "🏛️", saberes: ["Época colonial", "Independencia de 1821"], contenidos: ["Acta de Independencia (15 de setiembre de 1821)", "Vida en la colonia"], habilidades: ["Ordenar hechos en una línea del tiempo"], ejemplo: "La noticia de la independencia llegó a Cartago en octubre de 1821.", ejercicios: [{ q: "¿En qué año se independizó Costa Rica?", a: "1821" }] },
  ]},
];

const ch = (subject: string, emoji: string, saberes: string[], contenidos: string[], habilidades: string[], ejemplo: string, ejercicios: [string, string][]): Chapter =>
  ({ subject, emoji, saberes, contenidos, habilidades, ejemplo, ejercicios: ejercicios.map(([q, a]) => ({ q, a })) });

export const secondaryBooks: Book[] = [
  { grade: 7, title: "7.º año · Inicio del III ciclo", chapters: [
    ch("Matemática", "📐", ["Números enteros", "Geometría plana"], ["Operaciones con enteros", "Ángulos y triángulos"], ["Modelar situaciones con números negativos"], "Temperatura de −3 °C que sube 5 °C: −3 + 5 = 2 °C.", [["−7 + 4", "−3"], ["Suma de los ángulos internos de un triángulo", "180°"]]),
    ch("Español", "📝", ["Comunicación y lenguaje", "Género narrativo"], ["Elementos de la comunicación", "Cuento costarricense"], ["Analizar narrador y personajes"], "En «Cocorí» (Joaquín Gutiérrez) el protagonista es un niño del Caribe.", [["¿Quién recibe el mensaje en la comunicación?", "El receptor"]]),
    ch("Ciencias", "🔬", ["La célula", "Materia y energía"], ["Célula animal y vegetal", "Propiedades de la materia"], ["Usar el microscopio de forma segura"], "Al comparar células animales y vegetales, la vegetal tiene pared celular y la animal no. Otros organismos, como hongos y bacterias, también pueden tener paredes celulares de composición diferente.", [["¿Qué organelo realiza la fotosíntesis?", "El cloroplasto: contiene los pigmentos que captan energía luminosa en las células vegetales fotosintéticas."]]),
    ch("Estudios Sociales", "🌎", ["Geografía física", "Primeras civilizaciones"], ["Coordenadas geográficas", "Mesopotamia y Egipto"], ["Ubicar puntos con latitud y longitud"], "Costa Rica está entre 8° y 11° de latitud norte.", [["¿Qué línea divide la Tierra en norte y sur?", "El ecuador"]]),
    ch("Inglés", "🇬🇧", ["Present simple", "Personal information"], ["Verb to be", "Daily routines"], ["Introduce yourself"], "I am a student. She is my teacher.", [["Complete: They ___ friends.", "are"]]),
  ]},
  { grade: 8, title: "8.º año · Pienso con lógica", chapters: [
    ch("Matemática", "📐", ["Números racionales", "Expresiones algebraicas"], ["Fracciones y decimales", "Polinomios básicos"], ["Simplificar expresiones"], "3x + 2x = 5x.", [["Simplifique 4a + 3a − a", "6a"]]),
    ch("Español", "📝", ["Género lírico", "Oración compuesta"], ["Figuras literarias", "Coordinación"], ["Identificar metáforas"], "«Tus ojos son luceros» es una metáfora.", [["«Corre como el viento» es…", "Un símil o comparación"]]),
    ch("Ciencias", "🔬", ["Sistemas del cuerpo", "Fuerza y movimiento"], ["Sistema nervioso", "Leyes de Newton"], ["Relacionar fuerza y aceleración"], "F = m · a: 2 kg × 3 m/s² = 6 N.", [["Unidad de fuerza en el SI", "El newton (N)"]]),
    ch("Estudios Sociales", "🏰", ["Edad Media", "Encuentro de culturas"], ["Feudalismo", "Llegada de Colón a Costa Rica (1502)"], ["Comparar sociedades"], "Colón llegó a la costa caribeña en 1502, en su cuarto viaje.", [["¿En qué viaje llegó Colón a Costa Rica?", "En el cuarto viaje (1502)"]]),
    ch("Inglés", "🇬🇧", ["Past simple"], ["Regular and irregular verbs"], ["Tell a past story"], "Yesterday I went to school.", [["Past of «go»", "went"]]),
  ]},
  { grade: 9, title: "9.º año · Cierre del III ciclo", chapters: [
    ch("Matemática", "📐", ["Teorema de Pitágoras", "Funciones lineales"], ["Ecuaciones de primer grado", "Pendiente"], ["Resolver ecuaciones"], "Catetos 3 y 4 → hipotenusa 5.", [["Resuelva 2x + 6 = 14", "x = 4"]]),
    ch("Español", "📝", ["Género dramático", "Textos argumentativos"], ["Tesis y argumentos", "Obra de teatro costarricense"], ["Redactar una opinión fundamentada"], "Tesis: «El reciclaje debe ser obligatorio».", [["¿Qué parte del texto argumentativo plantea la idea principal?", "La tesis"]]),
    ch("Ciencias", "⚗️", ["Tabla periódica", "Genética básica"], ["Átomo y elementos", "Herencia (Mendel)"], ["Leer la tabla periódica"], "El símbolo del sodio es Na.", [["Símbolo químico del oxígeno", "O"]]),
    ch("Estudios Sociales", "🇨🇷", ["Costa Rica independiente", "Campaña Nacional 1856-1857"], ["Batalla de Rivas", "Juan Santamaría"], ["Explicar causas y consecuencias"], "La Batalla de Rivas fue el 11 de abril de 1856.", [["¿Contra quién luchó Costa Rica en 1856?", "Los filibusteros de William Walker"]]),
    ch("Inglés", "🇬🇧", ["Future and present perfect"], ["Will / going to", "Have + past participle"], ["Talk about plans"], "I have studied for the test.", [["Complete: She ___ visited Limón.", "has"]]),
  ]},
  { grade: 10, title: "10.º año · Ciclo diversificado", chapters: [
    ch("Matemática", "📐", ["Funciones cuadráticas", "Trigonometría"], ["Vértice y raíces", "Seno, coseno y tangente"], ["Interpretar gráficas"], "sen 30° = 0,5.", [["Raíces de x² − 9 = 0", "x = 3 y x = −3"]]),
    ch("Español", "📝", ["Literatura universal", "Ensayo"], ["Análisis de novela", "Cohesión textual"], ["Comentar textos"], "Conectores: «sin embargo», «por lo tanto».", [["¿«Sin embargo» indica adición u oposición?", "Oposición"]]),
    ch("Biología / Química / Física", "🧪", ["Biología celular", "Enlaces químicos", "Cinemática"], ["Mitosis", "Enlace iónico y covalente", "MRU"], ["Resolver problemas con unidades"], "v = d / t: 100 m en 20 s = 5 m/s.", [["NaCl tiene enlace…", "Iónico"]]),
    ch("Estudios Sociales y Cívica", "⚖️", ["Siglo XX en Costa Rica", "Democracia"], ["Garantías sociales (1943)", "Abolición del ejército (1948)"], ["Argumentar sobre derechos"], "El ejército se abolió el 1 de diciembre de 1948.", [["¿En qué año se abolió el ejército?", "1948"]]),
    ch("Inglés", "🇬🇧", ["Reading comprehension", "Conditionals"], ["First conditional"], ["Read for main idea"], "If it rains, we will stay home.", [["Complete: If you study, you ___ pass.", "will"]]),
  ]},
  { grade: 11, title: "11.º año · Rumbo al bachillerato y la universidad", chapters: [
    ch("Matemática", "📐", ["Funciones exponenciales y logarítmicas", "Estadística y probabilidad"], ["Logaritmos", "Media, mediana y moda"], ["Analizar datos"], "log₁₀ 1000 = 3.", [["Probabilidad de sacar cara en una moneda", "1/2"]]),
    ch("Español", "📝", ["Literatura costarricense", "Comprensión lectora avanzada"], ["Generaciones literarias", "Inferencias"], ["Inferir intención del autor"], "Carmen Lyra escribió «Cuentos de mi tía Panchita».", [["¿Quién escribió «Cuentos de mi tía Panchita»?", "Carmen Lyra"]]),
    ch("Ciencias", "🧪", ["Química orgánica", "Electricidad"], ["Hidrocarburos", "Ley de Ohm"], ["Aplicar fórmulas"], "V = I · R: 2 A × 6 Ω = 12 V.", [["Corriente con 12 V y 4 Ω", "3 A"]]),
    ch("Estudios Sociales y Cívica", "🌐", ["Globalización", "Participación ciudadana"], ["Desarrollo sostenible", "Sufragio y TSE"], ["Proponer acciones ciudadanas"], "El Tribunal Supremo de Elecciones organiza los comicios.", [["¿Qué institución organiza las elecciones?", "El TSE"]]),
    ch("Inglés", "🇬🇧", ["Academic reading", "Passive voice"], ["Text structure"], ["Answer exam-style reading"], "The book was written by Carmen Lyra.", [["Passive: «They built the house»", "The house was built"]]),
  ]},
];

export const ctpBook: Book = { grade: 12, title: "Talleres exploratorios y especialidades CTP (7.º a 12.º)", chapters: [
  ch("Taller de Electricidad", "⚡", ["Seguridad eléctrica", "Circuitos básicos"], ["Serie y paralelo", "Multímetro"], ["Medir voltaje con seguridad"], "En serie: R total = R1 + R2.", [["R total de 100 Ω y 220 Ω en serie", "320 Ω"]]),
  ch("Taller de Informática y Web", "💻", ["HTML y CSS", "Lógica de programación"], ["Etiquetas", "Variables y condicionales"], ["Crear una página sencilla"], "<h1>Hola</h1> crea un título principal.", [["Etiqueta HTML para un enlace", "<a>"]]),
  ch("Turismo y Hotelería", "🏨", ["Servicio al cliente", "Turismo sostenible"], ["Recepción", "Certificación para la Sostenibilidad Turística"], ["Atender con cortesía bilingüe"], "Check-in: registro de llegada del huésped.", [["¿Qué significa check-out?", "Salida del huésped"]]),
  ch("Gastronomía", "🍳", ["Higiene e inocuidad", "Costeo de recetas"], ["Buenas prácticas de manufactura", "Food cost"], ["Calcular costos"], "Costo ₡1 000, precio ₡3 000 → food cost 33 %.", [["Zona de peligro de temperatura de alimentos", "Entre 5 °C y 60 °C, aprox."]]),
  ch("Contabilidad y Finanzas", "📊", ["Ecuación contable", "Impuestos"], ["Activo = Pasivo + Patrimonio", "IVA 13 %"], ["Registrar asientos"], "Activo ₡500 000, pasivo ₡200 000 → patrimonio ₡300 000.", [["IVA de una venta de ₡10 000", "₡1 300"]]),
  ch("Mecánica y Dibujo Técnico", "🔧", ["Herramientas y metrología", "Vistas ortogonales"], ["Calibrador vernier", "Planta, frente y perfil"], ["Leer planos"], "Un vernier mide con precisión de 0,05 mm o 0,02 mm.", [["Las tres vistas básicas", "Frontal, superior y lateral"]]),
]};

export const bookReferences = [
  "Ministerio de Educación Pública. (2012). Programas de estudio de Matemáticas: I, II y III ciclos de la Educación General Básica y Ciclo Diversificado. MEP. https://www.mep.go.cr/programas-de-estudio",
  "Ministerio de Educación Pública. (2013). Programa de estudio de Español: I y II ciclos. MEP. https://www.mep.go.cr/programas-de-estudio",
  "Ministerio de Educación Pública. (2016). Programa de estudio de Ciencias: I y II ciclos de la Educación General Básica. MEP. https://www.mep.go.cr/programas-de-estudio",
  "Ministerio de Educación Pública. (2013). Programas de estudio de Estudios Sociales: III ciclo y Educación Diversificada. MEP. https://www.mep.go.cr/programas-de-estudio",
  "Ministerio de Educación Pública. (2016). Programa de estudio de Inglés: III ciclo y Educación Diversificada. MEP. https://www.mep.go.cr/programas-de-estudio",
  "Instituto Geográfico Nacional. (s. f.). División territorial administrativa de Costa Rica. Registro Nacional. https://www.registronacional.go.cr",
];

const extra: Record<string, [string, string][]> = {
  "0-Pensamiento matemático": [["¿Qué número va después del 7?", "8"], ["¿Qué forma tiene una pelota?", "Círculo o esfera"]],
  "0-Lenguaje y comunicación": [["¿Con qué vocal empieza «estrella»?", "E"]],
  "0-Conocimiento del entorno": [["¿Cuándo sale la luna: de día o de noche?", "De noche, aunque a veces se ve de día"]],
  "0-Convivencia y emociones": [["Si un amigo llora, ¿cómo se siente?", "Triste"]],
  "1-Matemática": [["¿Cuánto es 15 − 4?", "11"], ["¿Cuántas decenas tiene 60?", "6"]],
  "1-Español": [["Ordene: sa-ca", "casa"]],
  "1-Ciencias": [["¿Con qué sentido escuchamos?", "El oído"]],
  "1-Estudios Sociales": [["¿Qué canción representa a Costa Rica?", "El Himno Nacional"]],
  "2-Matemática": [["¿Cuánto es 90 − 35?", "55"], ["¿Cuántos centímetros tiene 1 metro?", "100"]],
  "2-Español": [["Sustantivo en «La niña feliz juega»", "Niña"]],
  "2-Ciencias": [["¿Una vaca es animal doméstico o silvestre?", "Doméstico"]],
  "2-Estudios Sociales": [["¿Quién apaga incendios en la comunidad?", "Los bomberos"]],
  "3-Matemática": [["¿Cuánto es 36 ÷ 4?", "9"], ["¿Qué fracción es la mitad?", "1/2"]],
  "3-Español": [["¿«Canción» es aguda, grave o esdrújula?", "Aguda"]],
  "3-Ciencias": [["¿Dónde empieza la digestión?", "En la boca"]],
  "3-Estudios Sociales": [["¿Cuál es la capital de Costa Rica?", "San José"]],
  "4-Matemática": [["¿Cuántos grados tiene un ángulo recto?", "90°"], ["Escriba 3/10 como decimal", "0,3"]],
  "4-Español": [["Sinónimo de «feliz»", "Contento o alegre"]],
  "4-Ciencias": [["¿Qué hacen los descomponedores?", "Descomponen restos de seres vivos y devuelven nutrientes al suelo"]],
  "4-Estudios Sociales": [["¿En qué provincia está el volcán Arenal?", "Alajuela"]],
  "5-Matemática": [["¿Cuál es el 25 % de 200?", "50"], ["¿Es 7 divisor de 42?", "Sí, 42 ÷ 7 = 6"]],
  "5-Español": [["Complete: «___ eres mi amigo» (tu/tú)", "Tú"]],
  "5-Ciencias": [["¿Qué órgano permite respirar?", "Los pulmones"]],
  "5-Estudios Sociales": [["¿En qué ciudad se firmó el Acta de Independencia de Centroamérica?", "Guatemala"]],
};
for (const b of primaryBooks) for (const c of b.chapters) for (const [q, a] of extra[`${b.grade}-${c.subject}`] ?? []) c.ejercicios.push({ q, a });

const extraSec: Record<string, [string, string][]> = {
  "7-Matemática": [["(−3) × (−4)", "12"], ["Ángulo suplementario de 70°", "110°"], ["−15 ÷ 3", "−5"]],
  "7-Español": [["¿Qué elemento de la comunicación es el canal en una llamada?", "El teléfono o la línea telefónica"], ["Tipo de narrador que dice «yo»", "Narrador protagonista (primera persona)"]],
  "7-Ciencias": [["¿Qué organelo contiene el ADN en la célula eucariota?", "El núcleo"], ["Estado de la materia con forma y volumen definidos", "Sólido"]],
  "7-Estudios Sociales": [["¿Cómo se llaman las líneas que van de polo a polo?", "Meridianos"], ["Río principal de la civilización egipcia", "El Nilo"]],
  "7-Inglés": [["Complete: He ___ (play) soccer every day.", "plays"], ["Negative: «She likes tea»", "She doesn't like tea"]],
  "10-Matemática": [["Vértice de f(x) = x² − 4x + 3", "(2, −1)"], ["cos 60°", "0,5"], ["Discriminante de x² + 2x + 5", "−16 (no tiene raíces reales)"]],
  "10-Español": [["Conector de causa", "Porque, ya que, puesto que"], ["¿Qué tipo de texto defiende una tesis?", "El ensayo o texto argumentativo"]],
  "10-Biología / Química / Física": [["¿Cuántas células hijas produce la mitosis?", "Dos, idénticas a la madre"], ["Enlace del H₂O", "Covalente polar"], ["Distancia en 3 s a 12 m/s (MRU)", "36 m"]],
  "10-Estudios Sociales y Cívica": [["¿Qué creó el Código de Trabajo de 1943?", "Derechos laborales como jornada máxima y salario mínimo"], ["Presidente que abolió el ejército", "José Figueres Ferrer"]],
  "10-Inglés": [["Complete: If she studies, she ___ (pass).", "will pass"], ["Main idea is…", "The most important point of a text"]],
};
for (const b of secondaryBooks) for (const c of b.chapters) for (const [q, a] of extraSec[`${b.grade}-${c.subject}`] ?? []) c.ejercicios.push({ q, a });
