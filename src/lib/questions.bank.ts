export type Q = {
  q: string;
  options: string[];
  answer: number;
  why: string;
  source: string;
  difficulty?: 1 | 2 | 3;
};
export type Deck = {
  id: string;
  title: string;
  emoji: string;
  level: string;
  questions: Q[];
  progressive?: boolean;
};

// Preguntas verificadas contra fuentes públicas (Ley 9078 de Tránsito, MEP, datos históricos oficiales).
export const decks: Deck[] = [
  {
    id: "mopt",
    title: "Examen teórico MOPT",
    emoji: "🚗",
    level: "Licencia B1",
    questions: [
      {
        q: "¿Velocidad máxima en una zona escolar señalizada?",
        options: ["40 km/h", "25 km/h", "60 km/h", "15 km/h"],
        answer: 1,
        why: "La Ley 9078 fija 25 km/h en zonas escolares en horario lectivo.",
        source: "Ley 9078, art. 95",
      },
      {
        q: "Límite de alcohol en sangre para un conductor novato o profesional:",
        options: ["0,20 g/L", "0,50 g/L", "0,75 g/L", "1,00 g/L"],
        answer: 0,
        why: "Para conductores novatos y profesionales el límite es 0,20 g/L; para los demás, 0,50 g/L.",
        source: "Ley 9078, art. 143",
      },
      {
        q: "Una señal octogonal roja significa:",
        options: ["Ceda el paso", "Prohibido estacionar", "ALTO total", "Vía preferencial"],
        answer: 2,
        why: "La forma octogonal está reservada a ALTO: detención completa obligatoria.",
        source: "Manual SIECA de señales",
      },
      {
        q: "¿Quién debe usar cinturón de seguridad?",
        options: [
          "Solo el conductor",
          "Conductor y copiloto",
          "Todos los ocupantes",
          "Solo en carretera",
        ],
        answer: 2,
        why: "Es obligatorio para todas las personas ocupantes del vehículo.",
        source: "Ley 9078, art. 9",
      },
      {
        q: "En una rotonda, ¿quién tiene prioridad?",
        options: [
          "Quien entra",
          "Quien ya circula dentro",
          "El vehículo más grande",
          "Quien va a la derecha",
        ],
        answer: 1,
        why: "Los vehículos que circulan dentro de la rotonda tienen preferencia de paso.",
        source: "Manual del conductor COSEVI",
      },
      {
        q: "Personas menores de 12 años y de menos de 1,45 m deben viajar:",
        options: [
          "En el asiento delantero",
          "En sistema de retención infantil",
          "Sin restricción",
          "Solo con cinturón",
        ],
        answer: 1,
        why: "La ley exige dispositivo de retención infantil según edad y talla.",
        source: "Ley 9078, art. 9",
      },
      { q: "Una señal triangular con borde rojo y un vértice hacia abajo indica:", options: ["ALTO total", "Ceda el paso", "Curva peligrosa", "Fin de zona escolar"], answer: 1, why: "El triángulo invertido indica ceder el paso: reduzca velocidad y deténgase solo si es necesario.", source: "Manual SIECA de señales", difficulty: 1 },
      { q: "Al escuchar la sirena de una ambulancia que se acerca, usted debe:", options: ["Acelerar para abrir paso", "Orillarse a la derecha y detenerse", "Detenerse en el centro del carril", "Seguir igual"], answer: 1, why: "Orillarse a la derecha y detenerse libera el carril para el vehículo de emergencia.", source: "Manual del conductor COSEVI", difficulty: 1 },
      { q: "Una línea amarilla continua en el centro de la vía significa:", options: ["Puede adelantar con precaución", "Prohibido adelantar", "Carril exclusivo de autobuses", "Zona de estacionamiento"], answer: 1, why: "La línea continua no debe cruzarse para adelantar; la discontinua lo permite cuando es seguro.", source: "Manual SIECA de señales", difficulty: 2 },
      { q: "Usar el celular en la mano mientras conduce:", options: ["Se permite en semáforo en rojo", "Está prohibido", "Se permite a baja velocidad", "Solo se prohíbe en carretera"], answer: 1, why: "La ley prohíbe manipular el teléfono mientras conduce; solo se admite manos libres.", source: "Ley 9078", difficulty: 1 },
      { q: "La luz amarilla del semáforo indica:", options: ["Acelerar para pasar", "Prevención: detenerse si puede hacerlo con seguridad", "Paso libre", "Giro obligatorio"], answer: 1, why: "El amarillo anuncia el cambio a rojo; debe detenerse salvo que hacerlo sea inseguro.", source: "Manual del conductor COSEVI", difficulty: 2 },
    ],
  },
  {
    id: "admision",
    title: "Prueba de admisión UCR/TEC",
    emoji: "🎓",
    level: "Razonamiento",
    questions: [
      {
        q: "Si 3x + 5 = 20, entonces x =",
        options: ["3", "5", "15", "25/3"],
        answer: 1,
        why: "3x = 15 → x = 5.",
        source: "Álgebra básica",
      },
      {
        q: "¿Cuánto es 2¹⁰?",
        options: ["512", "1000", "1024", "2048"],
        answer: 2,
        why: "2¹⁰ = 1024.",
        source: "Potencias",
      },
      {
        q: "Serie: 2, 6, 18, 54, …",
        options: ["108", "162", "72", "216"],
        answer: 1,
        why: "Cada término se multiplica por 3: 54 × 3 = 162.",
        source: "Razonamiento numérico",
      },
      {
        q: "Un artículo de ₡20 000 tiene 15% de descuento. Precio final:",
        options: ["₡17 000", "₡18 500", "₡3 000", "₡15 000"],
        answer: 0,
        why: "15% de 20 000 = 3 000; 20 000 − 3 000 = 17 000.",
        source: "Porcentajes",
      },
      {
        q: "Antónimo de «efímero»:",
        options: ["Breve", "Perdurable", "Frágil", "Veloz"],
        answer: 1,
        why: "Efímero = de corta duración; su opuesto es perdurable.",
        source: "RAE",
      },
    ],
  },
  {
    id: "ctp",
    title: "Especialidades CTP",
    emoji: "💻",
    level: "Técnico medio",
    questions: [
      {
        q: "El número binario 1010 equivale en decimal a:",
        options: ["8", "10", "12", "1010"],
        answer: 1,
        why: "1·8 + 0·4 + 1·2 + 0·1 = 10.",
        source: "Desarrollo de Software",
      },
      {
        q: "HTML es un lenguaje de:",
        options: ["Programación", "Marcado", "Consultas", "Estilos"],
        answer: 1,
        why: "HyperText Markup Language: describe estructura, no lógica.",
        source: "W3C",
      },
      {
        q: "Ecuación contable fundamental:",
        options: [
          "Activo = Pasivo + Patrimonio",
          "Activo = Ingresos − Gastos",
          "Pasivo = Activo + Patrimonio",
          "Patrimonio = Ingresos",
        ],
        answer: 0,
        why: "Todo recurso (activo) se financia con deuda (pasivo) o aportes (patrimonio).",
        source: "Contabilidad",
      },
      {
        q: "Ley de Ohm: con V = 12 V y R = 4 Ω, la corriente es:",
        options: ["48 A", "3 A", "0,33 A", "16 A"],
        answer: 1,
        why: "I = V / R = 12 / 4 = 3 A.",
        source: "Electrónica",
      },
      {
        q: "Instrucción SQL para leer datos de una tabla:",
        options: ["INSERT", "SELECT", "UPDATE", "DROP"],
        answer: 1,
        why: "SELECT consulta filas; las otras modifican o eliminan.",
        source: "ISO SQL",
      },
    ],
  },
  {
    id: "civica",
    title: "Estudios Sociales y Cívica",
    emoji: "🇨🇷",
    level: "Bachillerato",
    questions: [
      {
        q: "¿Cuántas provincias tiene Costa Rica?",
        options: ["5", "6", "7", "8"],
        answer: 2,
        why: "San José, Alajuela, Cartago, Heredia, Guanacaste, Puntarenas y Limón.",
        source: "IGN",
      },
      {
        q: "Año de la abolición del ejército:",
        options: ["1821", "1948", "1949", "1856"],
        answer: 1,
        why: "José Figueres lo abolió el 1 de diciembre de 1948; la Constitución de 1949 lo ratificó (art. 12).",
        source: "Constitución Política",
      },
      {
        q: "Fecha de la independencia de Centroamérica:",
        options: [
          "15 de setiembre de 1821",
          "25 de julio de 1824",
          "11 de abril de 1856",
          "7 de noviembre de 1889",
        ],
        answer: 0,
        why: "El Acta de Independencia se firmó en Guatemala el 15/09/1821.",
        source: "MEP",
      },
      {
        q: "Héroe nacional de la Batalla de Rivas (1856):",
        options: ["Juan Santamaría", "Juanito Mora", "José María Cañas", "Braulio Carrillo"],
        answer: 0,
        why: "Juan Santamaría incendió el mesón el 11 de abril de 1856.",
        source: "Historia de CR",
      },
    ],
  },
  {
    id: "historia",
    title: "Historia de Costa Rica",
    emoji: "📜",
    level: "Primaria y secundaria",
    questions: [
      { q: "Primer jefe de Estado de Costa Rica (1824):", options: ["Juan Mora Fernández", "Braulio Carrillo", "Juan Rafael Mora Porras", "José María Castro Madriz"], answer: 0, why: "Juan Mora Fernández asumió en 1824 como primer jefe de Estado.", source: "Historia de CR · MEP", difficulty: 1 },
      { q: "Fecha de la Anexión del Partido de Nicoya:", options: ["15 de setiembre de 1821", "25 de julio de 1824", "11 de abril de 1856", "1 de diciembre de 1948"], answer: 1, why: "El Partido de Nicoya se unió a Costa Rica el 25 de julio de 1824.", source: "Historia de CR · MEP", difficulty: 1 },
      { q: "La Batalla de Santa Rosa (1856) ocurrió el:", options: ["20 de marzo", "11 de abril", "15 de setiembre", "2 de agosto"], answer: 0, why: "Fue el 20 de marzo de 1856, en Guanacaste, contra los filibusteros de William Walker.", source: "Historia de CR · MEP", difficulty: 2 },
      { q: "Las Garantías Sociales se incorporaron a la Constitución en 1943 durante el gobierno de:", options: ["Rafael Ángel Calderón Guardia", "José Figueres Ferrer", "Ricardo Jiménez Oreamuno", "León Cortés Castro"], answer: 0, why: "Calderón Guardia impulsó las Garantías Sociales junto con la Iglesia y el Partido Vanguardia Popular.", source: "Historia de CR · MEP", difficulty: 2 },
      { q: "Tras la batalla de Ochomogo (1823), la capital se trasladó de Cartago a:", options: ["Heredia", "Alajuela", "San José", "Puntarenas"], answer: 2, why: "Los republicanos de San José y Alajuela vencieron y la capital pasó a San José.", source: "Historia de CR · MEP", difficulty: 3 },
      { q: "La Universidad de Costa Rica fue fundada en:", options: ["1814", "1940", "1948", "1973"], answer: 1, why: "La UCR se creó en 1940, en el gobierno de Calderón Guardia.", source: "Historia de CR · UCR", difficulty: 2 },
    ],
  },
  {
    id: "espanol",
    title: "Español: ortografía y gramática",
    emoji: "✍️",
    level: "Primaria y secundaria",
    questions: [
      { q: "¿Cuál palabra es aguda?", options: ["árbol", "canción", "lápiz", "música"], answer: 1, why: "Canción lleva la fuerza en la última sílaba (can-CIÓN).", source: "RAE · Ortografía", difficulty: 1 },
      { q: "¿Cuál palabra es esdrújula?", options: ["teléfono", "camión", "fácil", "reloj"], answer: 0, why: "Te-LÉ-fo-no: fuerza en la antepenúltima sílaba; las esdrújulas siempre llevan tilde.", source: "RAE · Ortografía", difficulty: 1 },
      { q: "Escritura correcta:", options: ["estube", "estuve", "hestuve", "estuvé"], answer: 1, why: "Los pretéritos de estar, andar y tener se escriben con v: estuve, anduve, tuve.", source: "RAE · Ortografía", difficulty: 2 },
      { q: "En «Los estudiantes de sexto resolvieron la práctica», el sujeto es:", options: ["la práctica", "resolvieron", "Los estudiantes de sexto", "de sexto"], answer: 2, why: "El sujeto concuerda con el verbo: ellos (los estudiantes de sexto) resolvieron.", source: "RAE · Gramática", difficulty: 2 },
      { q: "Autora de «Cuentos de mi tía Panchita»:", options: ["Carmen Lyra", "Yolanda Oreamuno", "Eunice Odio", "Carmen Naranjo"], answer: 0, why: "Carmen Lyra (María Isabel Carvajal) publicó la obra en 1920.", source: "Literatura costarricense · MEP", difficulty: 1 },
      { q: "¿En cuál palabra hay hiato?", options: ["cielo", "país", "causa", "huevo"], answer: 1, why: "Pa-ís: la vocal cerrada tónica con tilde separa las vocales en sílabas distintas.", source: "RAE · Ortografía", difficulty: 3 },
    ],
  },
  {
    id: "religion",
    title: "Educación Religiosa",
    emoji: "🕊️",
    level: "Primaria y secundaria",
    questions: [
      { q: "Primer libro de la Biblia:", options: ["Éxodo", "Génesis", "Salmos", "Mateo"], answer: 1, why: "Génesis abre el Antiguo Testamento y narra los orígenes.", source: "Biblia", difficulty: 1 },
      { q: "¿Cuántos son los evangelios canónicos?", options: ["Dos", "Cuatro", "Siete", "Doce"], answer: 1, why: "Mateo, Marcos, Lucas y Juan.", source: "Biblia · Nuevo Testamento", difficulty: 1 },
      { q: "La romería a la Basílica de los Ángeles en Cartago se celebra cada:", options: ["15 de setiembre", "2 de agosto", "25 de julio", "8 de diciembre"], answer: 1, why: "El 2 de agosto se honra a la Virgen de los Ángeles, patrona de Costa Rica.", source: "Tradición costarricense", difficulty: 1 },
      { q: "Las Bienaventuranzas forman parte del:", options: ["Sermón de la Montaña", "Libro del Génesis", "Libro de los Salmos", "Apocalipsis"], answer: 0, why: "Aparecen en Mateo 5, al inicio del Sermón de la Montaña.", source: "Biblia · Mateo 5", difficulty: 2 },
      { q: "La «regla de oro», presente en varias tradiciones, enseña:", options: ["Tratar a los demás como desea ser tratado", "Obedecer sin preguntar", "Competir para ganar siempre", "Evitar ayudar a desconocidos"], answer: 0, why: "Es un principio ético común a muchas religiones y filosofías.", source: "Educación religiosa · valores", difficulty: 2 },
    ],
  },
  {
    id: "sim7",
    title: "Simulacro de ingreso a 7.º",
    emoji: "🧭",
    level: "Contenidos hasta 6.º",
    questions: [
      { q: "¿Cuál es la expresión decimal de 3/4?", options: ["0,34", "0,75", "0,43", "7,5"], answer: 1, why: "3 ÷ 4 = 0,75.", source: "MEP · Matemática: fracciones", difficulty: 1 },
      { q: "Mínimo común múltiplo de 4 y 6:", options: ["24", "2", "12", "10"], answer: 2, why: "Múltiplos de 4: 4, 8, 12…; de 6: 6, 12… El menor común es 12. 24 es común pero no el mínimo.", source: "MEP · Matemática", difficulty: 2 },
      { q: "La suma de los ángulos internos de un triángulo es:", options: ["90°", "180°", "270°", "360°"], answer: 1, why: "En todo triángulo los tres ángulos internos suman 180°.", source: "MEP · Geometría", difficulty: 1 },
      { q: "¿Cuántos minutos hay en 2,5 horas?", options: ["125", "250", "150", "25"], answer: 2, why: "2,5 × 60 = 150 minutos.", source: "MEP · Medidas", difficulty: 2 },
      { q: "Si x + 7 = 15, entonces x =", options: ["22", "8", "7", "105"], answer: 1, why: "Se resta 7 en ambos lados: x = 15 − 7 = 8.", source: "MEP · Álgebra inicial", difficulty: 2 },
      { q: "Un pantalón de ₡12 000 sube 10%. ¿Cuál es el nuevo precio?", options: ["₡12 100", "₡13 200", "₡10 800", "₡22 000"], answer: 1, why: "10% de 12 000 = 1 200; 12 000 + 1 200 = 13 200.", source: "MEP · Porcentajes", difficulty: 3 },
      { q: "La unidad básica de los seres vivos es:", options: ["El átomo", "La célula", "El órgano", "El tejido"], answer: 1, why: "Todo ser vivo está formado por una o más células.", source: "MEP · Ciencias", difficulty: 1 },
      { q: "El planeta más grande del sistema solar es:", options: ["Saturno", "Tierra", "Júpiter", "Neptuno"], answer: 2, why: "Júpiter es el planeta de mayor tamaño y masa.", source: "MEP · Ciencias", difficulty: 1 },
      { q: "Un texto que busca convencer al lector con razones es:", options: ["Narrativo", "Descriptivo", "Argumentativo", "Instructivo"], answer: 2, why: "El texto argumentativo defiende una opinión con argumentos.", source: "MEP · Español", difficulty: 2 },
      { q: "Plural correcto de «lápiz»:", options: ["lápizes", "lápices", "lapices", "lápiz"], answer: 1, why: "La z cambia a c ante e, y conserva la tilde por ser esdrújula: lá-pi-ces.", source: "RAE · Ortografía", difficulty: 2 },
      { q: "El volcán Irazú forma parte de la cordillera:", options: ["De Talamanca", "Volcánica de Guanacaste", "Volcánica Central", "De Tilarán"], answer: 2, why: "El Irazú, en Cartago, pertenece a la Cordillera Volcánica Central.", source: "IGN · Geografía de CR", difficulty: 3 },
      { q: "¿Cuál es la capital de Costa Rica?", options: ["Cartago", "Alajuela", "San José", "Heredia"], answer: 2, why: "San José es la capital desde 1823.", source: "IGN", difficulty: 1 },
    ],
  },
  {
    id: "sim10",
    title: "Simulacro de ingreso a 10.º",
    emoji: "🚀",
    level: "Contenidos hasta 9.º",
    questions: [
      { q: "Si 2x − 3 = 11, entonces x =", options: ["4", "7", "14", "5,5"], answer: 1, why: "2x = 14 → x = 7.", source: "MEP · Álgebra", difficulty: 1 },
      { q: "Un triángulo rectángulo tiene catetos de 3 cm y 4 cm. La hipotenusa mide:", options: ["7 cm", "5 cm", "12 cm", "25 cm"], answer: 1, why: "Teorema de Pitágoras: √(3² + 4²) = √25 = 5 cm. 25 es el cuadrado, no la medida.", source: "MEP · Geometría", difficulty: 2 },
      { q: "El producto (x + 3)(x − 3) es igual a:", options: ["x² + 9", "x² − 9", "x² − 6x − 9", "2x"], answer: 1, why: "Suma por diferencia: (a + b)(a − b) = a² − b² → x² − 9.", source: "MEP · Álgebra", difficulty: 2 },
      { q: "La pendiente de la recta y = 2x + 1 es:", options: ["1", "2", "−2", "1/2"], answer: 1, why: "En y = mx + b, la pendiente es m = 2; b = 1 es la intersección.", source: "MEP · Funciones", difficulty: 2 },
      { q: "Área de un círculo de radio 3 cm:", options: ["6π cm²", "9π cm²", "3π cm²", "12π cm²"], answer: 1, why: "A = πr² = π · 3² = 9π cm². 6π es la circunferencia.", source: "MEP · Geometría", difficulty: 3 },
      { q: "El número atómico de un elemento indica la cantidad de:", options: ["Neutrones", "Protones", "Moléculas", "Enlaces"], answer: 1, why: "El número atómico (Z) es el número de protones del núcleo.", source: "MEP · Química", difficulty: 1 },
      { q: "Una fuerza neta acelera 3 m/s² a un objeto de 2 kg. La fuerza es:", options: ["1,5 N", "5 N", "6 N", "0,67 N"], answer: 2, why: "Segunda ley de Newton: F = m · a = 2 × 3 = 6 N.", source: "MEP · Física", difficulty: 2 },
      { q: "La mitosis produce:", options: ["Cuatro células con la mitad de cromosomas", "Dos células idénticas a la original", "Gametos", "Una sola célula más grande"], answer: 1, why: "La mitosis genera dos células hijas genéticamente iguales; la meiosis produce gametos.", source: "MEP · Biología", difficulty: 3 },
      { q: "¿Cuál conector expresa contraste?", options: ["Además", "Sin embargo", "Por lo tanto", "Por ejemplo"], answer: 1, why: "«Sin embargo» opone ideas; «por lo tanto» indica consecuencia.", source: "MEP · Español", difficulty: 2 },
      { q: "La Constitución Política vigente de Costa Rica se promulgó en:", options: ["1821", "1871", "1949", "1983"], answer: 2, why: "Fue promulgada el 7 de noviembre de 1949.", source: "Constitución Política", difficulty: 1 },
      { q: "En Costa Rica se adquiere la mayoría de edad a los:", options: ["16 años", "18 años", "21 años", "15 años"], answer: 1, why: "La mayoría de edad y la ciudadanía se adquieren a los 18 años.", source: "Constitución Política, art. 90", difficulty: 1 },
      { q: "¿Cuál es la idea principal de un párrafo?", options: ["El dato más pequeño", "La idea que resume lo que trata el párrafo", "La última oración siempre", "Una cita textual"], answer: 1, why: "La idea principal resume el tema central; las secundarias la apoyan.", source: "MEP · Comprensión lectora", difficulty: 2 },
    ],
  },
  {
    id: "prim1",
    title: "Repaso 1.º grado",
    emoji: "🌱",
    level: "Primaria 1.º",
    questions: [
      { q: "¿Cuánto es 3 + 4?", options: ["6", "7", "8", "34"], answer: 1, why: "Contamos 3 y luego 4 más: 7.", source: "MEP · Matemática 1.º", difficulty: 1 },
      { q: "¿Qué número va después del 9?", options: ["8", "10", "19", "11"], answer: 1, why: "Después del 9 sigue el 10.", source: "MEP · Matemática 1.º", difficulty: 1 },
      { q: "¿Cuánto es 10 − 2?", options: ["12", "8", "7", "9"], answer: 1, why: "A 10 le quitamos 2: quedan 8.", source: "MEP · Matemática 1.º", difficulty: 2 },
      { q: "¿Cuál palabra empieza con la letra «m»?", options: ["sol", "mesa", "pato", "casa"], answer: 1, why: "«Mesa» empieza con m.", source: "MEP · Español 1.º", difficulty: 1 },
      { q: "¿Con qué parte del cuerpo vemos?", options: ["Oídos", "Ojos", "Nariz", "Manos"], answer: 1, why: "Vemos con los ojos.", source: "MEP · Ciencias 1.º", difficulty: 1 },
      { q: "¿Cuántos días tiene una semana?", options: ["5", "7", "10", "30"], answer: 1, why: "Lunes a domingo: 7 días.", source: "MEP · Estudios Sociales 1.º", difficulty: 1 },
    ],
  },
  {
    id: "prim2",
    title: "Repaso 2.º grado",
    emoji: "🌿",
    level: "Primaria 2.º",
    questions: [
      { q: "¿Cuánto es 25 + 13?", options: ["38", "37", "48", "12"], answer: 0, why: "5 + 3 = 8 y 20 + 10 = 30: 38.", source: "MEP · Matemática 2.º", difficulty: 1 },
      { q: "¿Cuánto es 5 × 2?", options: ["7", "10", "52", "3"], answer: 1, why: "5 dos veces: 5 + 5 = 10.", source: "MEP · Matemática 2.º", difficulty: 1 },
      { q: "En el número 46, el 4 vale:", options: ["4 unidades", "4 decenas", "4 centenas", "46"], answer: 1, why: "El 4 está en las decenas: vale 40.", source: "MEP · Matemática 2.º", difficulty: 2 },
      { q: "¿Cuál es el plural de «flor»?", options: ["flors", "flores", "floras", "flor"], answer: 1, why: "Palabras que terminan en consonante agregan -es: flores.", source: "MEP · Español 2.º", difficulty: 2 },
      { q: "¿Qué necesita una planta para vivir?", options: ["Solo tierra", "Agua, luz y aire", "Solo oscuridad", "Plástico"], answer: 1, why: "Las plantas necesitan agua, luz solar y aire.", source: "MEP · Ciencias 2.º", difficulty: 1 },
      { q: "¿Cuántos meses tiene un año?", options: ["10", "12", "7", "52"], answer: 1, why: "El año tiene 12 meses.", source: "MEP · Estudios Sociales 2.º", difficulty: 1 },
    ],
  },
  {
    id: "prim3",
    title: "Repaso 3.º grado",
    emoji: "🍃",
    level: "Primaria 3.º",
    questions: [
      { q: "¿Cuánto es 7 × 8?", options: ["54", "56", "64", "15"], answer: 1, why: "7 × 8 = 56.", source: "MEP · Matemática 3.º", difficulty: 2 },
      { q: "¿Cuánto es 300 + 450?", options: ["750", "700", "345", "650"], answer: 0, why: "300 + 450 = 750.", source: "MEP · Matemática 3.º", difficulty: 1 },
      { q: "La mitad de 18 es:", options: ["8", "9", "36", "6"], answer: 1, why: "18 ÷ 2 = 9.", source: "MEP · Matemática 3.º", difficulty: 1 },
      { q: "En «El perro corre», ¿cuál es el verbo?", options: ["El", "perro", "corre", "ninguno"], answer: 2, why: "El verbo indica la acción: corre.", source: "MEP · Español 3.º", difficulty: 2 },
      { q: "El agua hierve a nivel del mar a:", options: ["50 °C", "100 °C", "0 °C", "200 °C"], answer: 1, why: "A nivel del mar el agua hierve a 100 °C; se congela a 0 °C.", source: "MEP · Ciencias 3.º", difficulty: 2 },
      { q: "¿Cuántas provincias tiene Costa Rica?", options: ["5", "7", "9", "81"], answer: 1, why: "San José, Alajuela, Cartago, Heredia, Guanacaste, Puntarenas y Limón: 7.", source: "IGN · Estudios Sociales", difficulty: 1 },
    ],
  },
  {
    id: "prim4",
    title: "Repaso 4.º grado",
    emoji: "🌳",
    level: "Primaria 4.º",
    questions: [
      { q: "¿Cuánto es 144 ÷ 12?", options: ["11", "12", "14", "13"], answer: 1, why: "12 × 12 = 144.", source: "MEP · Matemática 4.º", difficulty: 2 },
      { q: "¿Cuál fracción es mayor?", options: ["1/4", "1/2", "1/8", "1/3"], answer: 1, why: "Con igual numerador, gana el menor denominador: 1/2.", source: "MEP · Matemática 4.º", difficulty: 2 },
      { q: "El perímetro de un cuadrado de lado 5 cm es:", options: ["10 cm", "20 cm", "25 cm", "15 cm"], answer: 1, why: "4 lados × 5 cm = 20 cm. 25 cm² sería el área.", source: "MEP · Matemática 4.º", difficulty: 3 },
      { q: "¿Cuál palabra es aguda?", options: ["árbol", "canción", "mesa", "lápiz"], answer: 1, why: "Can-CIÓN: la fuerza está en la última sílaba.", source: "MEP · Español 4.º", difficulty: 2 },
      { q: "Los animales que comen solo plantas son:", options: ["Carnívoros", "Herbívoros", "Omnívoros", "Depredadores"], answer: 1, why: "Herbívoros: se alimentan de plantas.", source: "MEP · Ciencias 4.º", difficulty: 1 },
      { q: "Costa Rica se independizó en el año:", options: ["1821", "1856", "1948", "1502"], answer: 0, why: "La independencia fue el 15 de septiembre de 1821.", source: "MEP · Estudios Sociales 4.º", difficulty: 1 },
    ],
  },
  {
    id: "prim5",
    title: "Repaso 5.º grado",
    emoji: "🌲",
    level: "Primaria 5.º",
    questions: [
      { q: "¿Cuánto es 0,5 + 0,25?", options: ["0,30", "0,75", "0,525", "7,5"], answer: 1, why: "Alineando decimales: 0,50 + 0,25 = 0,75.", source: "MEP · Matemática 5.º", difficulty: 2 },
      { q: "El 25% de 80 es:", options: ["20", "25", "40", "8"], answer: 0, why: "25% es la cuarta parte: 80 ÷ 4 = 20.", source: "MEP · Matemática 5.º", difficulty: 2 },
      { q: "Área de un rectángulo de 6 m × 4 m:", options: ["20 m²", "24 m²", "10 m²", "24 m"], answer: 1, why: "Área = base × altura = 24 m².", source: "MEP · Matemática 5.º", difficulty: 2 },
      { q: "Un sinónimo de «alegre» es:", options: ["triste", "contento", "lento", "enojado"], answer: 1, why: "Sinónimo: significado parecido. Contento.", source: "MEP · Español 5.º", difficulty: 1 },
      { q: "El órgano que bombea la sangre es:", options: ["Pulmón", "Corazón", "Estómago", "Riñón"], answer: 1, why: "El corazón bombea la sangre por el cuerpo.", source: "MEP · Ciencias 5.º", difficulty: 1 },
      { q: "Juan Santamaría es recordado por la batalla de:", options: ["Santa Rosa", "Rivas", "Ochomogo", "Coris"], answer: 1, why: "En la Batalla de Rivas (11 de abril de 1856) incendió el mesón.", source: "MEP · Estudios Sociales 5.º", difficulty: 3 },
    ],
  },
  {
    id: "ctp-prog",
    title: "Programación",
    emoji: "💻",
    level: "CTP · Especialidad técnica",
    questions: [
      { q: "En Python, ¿qué imprime print(7 // 2)?", options: ["3.5", "3", "4", "1"], answer: 1, why: "// es división entera: 7 // 2 = 3.", source: "Python docs", difficulty: 2 },
      { q: "¿Qué estructura repite instrucciones mientras una condición sea verdadera?", options: ["if", "while", "def", "import"], answer: 1, why: "while repite mientras la condición sea True.", source: "Fundamentos de programación", difficulty: 1 },
      { q: "En Python, len([4, 8, 15]) devuelve:", options: ["2", "3", "15", "27"], answer: 1, why: "len cuenta los elementos: 3.", source: "Python docs", difficulty: 1 },
      { q: "Un algoritmo es:", options: ["Un lenguaje", "Una secuencia finita de pasos para resolver un problema", "Un virus", "Un monitor"], answer: 1, why: "Un algoritmo es un conjunto ordenado y finito de pasos.", source: "Fundamentos de programación", difficulty: 1 },
      { q: "En Python, el índice del primer elemento de una lista es:", options: ["1", "0", "−1", "Depende"], answer: 1, why: "Las listas empiezan en el índice 0.", source: "Python docs", difficulty: 2 },
    ],
  },
  {
    id: "ctp-web",
    title: "Desarrollo web",
    emoji: "🌐",
    level: "CTP · Especialidad técnica",
    questions: [
      { q: "¿Qué etiqueta HTML crea un enlace?", options: ["<p>", "<a>", "<img>", "<div>"], answer: 1, why: "<a href=\"…\"> crea hipervínculos.", source: "MDN · HTML", difficulty: 1 },
      { q: "¿Qué lenguaje da estilo (colores, tamaños) a una página?", options: ["HTML", "CSS", "SQL", "Python"], answer: 1, why: "CSS controla la presentación.", source: "MDN · CSS", difficulty: 1 },
      { q: "En CSS, «color: red;» cambia:", options: ["El fondo", "El color del texto", "El borde", "La fuente"], answer: 1, why: "color aplica al texto; background-color al fondo.", source: "MDN · CSS", difficulty: 2 },
      { q: "¿Qué protocolo cifra la comunicación web?", options: ["HTTP", "HTTPS", "FTP", "SMTP"], answer: 1, why: "HTTPS usa TLS para cifrar.", source: "MDN · Seguridad web", difficulty: 1 },
      { q: "JavaScript se ejecuta principalmente en:", options: ["La impresora", "El navegador", "El router", "El monitor"], answer: 1, why: "JavaScript corre en el navegador (y también en servidores con Node.js).", source: "MDN · JavaScript", difficulty: 1 },
    ],
  },
  {
    id: "ctp-ciber",
    title: "Ciberseguridad",
    emoji: "🛡️",
    level: "CTP · Especialidad técnica",
    questions: [
      { q: "El phishing es:", options: ["Un antivirus", "Un engaño para robar datos haciéndose pasar por alguien confiable", "Un tipo de cable", "Una copia de seguridad"], answer: 1, why: "Phishing: suplantación para obtener contraseñas o datos.", source: "INCIBE · Glosario", difficulty: 1 },
      { q: "¿Cuál contraseña es más segura?", options: ["123456", "maria2008", "T7#qL!9vR2&m", "password"], answer: 2, why: "Larga, con mayúsculas, minúsculas, números y símbolos.", source: "NIST SP 800-63B", difficulty: 2 },
      { q: "La autenticación de dos factores (2FA) agrega:", options: ["Más velocidad", "Una segunda prueba de identidad", "Más memoria", "Un nuevo correo"], answer: 1, why: "2FA pide algo adicional, como un código en el teléfono.", source: "NIST SP 800-63B", difficulty: 1 },
      { q: "La tríada CIA de la seguridad es:", options: ["Confidencialidad, Integridad, Disponibilidad", "Control, Inspección, Acceso", "Cifrado, Internet, Antivirus", "Código, IP, Autenticación"], answer: 0, why: "CIA: Confidentiality, Integrity, Availability.", source: "ISO/IEC 27000", difficulty: 2 },
      { q: "El ransomware:", options: ["Acelera la PC", "Cifra archivos y pide rescate", "Limpia virus", "Actualiza el sistema"], answer: 1, why: "Secuestra los datos cifrándolos y exige pago.", source: "INCIBE", difficulty: 2 },
    ],
  },
  {
    id: "ctp-conta",
    title: "Contabilidad y finanzas",
    emoji: "📊",
    level: "CTP · Especialidad técnica",
    questions: [
      { q: "La ecuación contable fundamental es:", options: ["Activo = Pasivo + Patrimonio", "Activo = Ingresos − Gastos", "Pasivo = Activo + Patrimonio", "Utilidad = Activo"], answer: 0, why: "A = P + Pt: todo recurso se financia con deudas o capital propio.", source: "NIIF · Marco conceptual", difficulty: 2 },
      { q: "Una cuenta por pagar a un proveedor es un:", options: ["Activo", "Pasivo", "Ingreso", "Patrimonio"], answer: 1, why: "Es una obligación de la empresa: pasivo.", source: "NIIF", difficulty: 1 },
      { q: "Utilidad bruta = Ventas − …", options: ["Gastos administrativos", "Costo de ventas", "Impuestos", "Activos"], answer: 1, why: "Utilidad bruta = ventas − costo de lo vendido.", source: "Contabilidad financiera", difficulty: 2 },
      { q: "En la partida doble, cada transacción afecta:", options: ["Una sola cuenta", "Al menos dos cuentas, débito y crédito iguales", "Solo el banco", "Solo el patrimonio"], answer: 1, why: "Total débitos = total créditos.", source: "Contabilidad financiera", difficulty: 1 },
      { q: "El IVA general en Costa Rica es del:", options: ["10 %", "13 %", "15 %", "19 %"], answer: 1, why: "Ley 9635 de Fortalecimiento de las Finanzas Públicas: tarifa general 13 %.", source: "Ley 9635", difficulty: 2 },
    ],
  },
  {
    id: "ctp-ejec",
    title: "Ejecutivo comercial y servicio al cliente",
    emoji: "🤝",
    level: "CTP · Especialidad técnica",
    questions: [
      { q: "Ante un cliente molesto, lo primero es:", options: ["Interrumpirlo", "Escuchar con atención y mostrar empatía", "Culpar a otro", "Ignorarlo"], answer: 1, why: "Escucha activa y empatía calman y permiten resolver.", source: "Servicio al cliente", difficulty: 1 },
      { q: "Las 4P del marketing son:", options: ["Producto, Precio, Plaza, Promoción", "Plan, Proceso, Personas, Pago", "Precio, Publicidad, Papel, Pantalla", "Producto, Persona, Puesto, Pago"], answer: 0, why: "Mezcla de marketing de McCarthy: Producto, Precio, Plaza, Promoción.", source: "Kotler · Marketing", difficulty: 2 },
      { q: "Fidelizar a un cliente significa:", options: ["Venderle una vez", "Lograr que vuelva y recomiende", "Subir precios", "Cambiarlo de tienda"], answer: 1, why: "La fidelización busca relaciones de largo plazo.", source: "Kotler", difficulty: 1 },
      { q: "Un correo comercial formal debe empezar con:", options: ["«Qué tal mae»", "Un saludo cortés, p. ej. «Estimado señor Pérez:»", "Solo el precio", "Emojis"], answer: 1, why: "El saludo formal muestra respeto y profesionalismo.", source: "Comunicación empresarial", difficulty: 1 },
      { q: "Margen de ganancia: costo ₡4 000, precio ₡5 000. El margen sobre el precio es:", options: ["25 %", "20 %", "10 %", "80 %"], answer: 1, why: "(5 000 − 4 000) ÷ 5 000 = 20 %. 25 % sería sobre el costo.", source: "Matemática comercial", difficulty: 3 },
    ],
  },
  {
    id: "ctp-logis",
    title: "Administración y logística",
    emoji: "📦",
    level: "CTP · Especialidad técnica",
    questions: [
      { q: "El método PEPS (FIFO) de inventario significa:", options: ["Primero en entrar, primero en salir", "Último en entrar, primero en salir", "Promedio", "Sin control"], answer: 0, why: "Se despachan primero las existencias más antiguas.", source: "Gestión de inventarios", difficulty: 1 },
      { q: "El stock de seguridad sirve para:", options: ["Decorar", "Cubrir variaciones de demanda o atrasos", "Aumentar costos", "Eliminar compras"], answer: 1, why: "Es inventario de respaldo contra incertidumbre.", source: "Gestión de inventarios", difficulty: 2 },
      { q: "Las etapas del proceso administrativo son:", options: ["Planear, organizar, dirigir y controlar", "Comprar, vender, cobrar", "Contratar y despedir", "Producir y almacenar"], answer: 0, why: "Modelo clásico de Fayol (simplificado).", source: "Fayol · Administración", difficulty: 2 },
      { q: "Un código de barras en bodega ayuda a:", options: ["Decorar cajas", "Identificar y registrar productos rápido", "Pintar", "Medir temperatura"], answer: 1, why: "Reduce errores de digitación y acelera el inventario.", source: "Logística", difficulty: 1 },
      { q: "La cadena de suministro incluye:", options: ["Solo la tienda", "Proveedores, producción, distribución y cliente", "Solo el transporte", "Solo el banco"], answer: 1, why: "Abarca todo el flujo desde el proveedor hasta el cliente final.", source: "Logística", difficulty: 1 },
    ],
  },
  {
    id: "ctp-electro",
    title: "Electrónica",
    emoji: "🔌",
    level: "CTP · Especialidad técnica",
    questions: [
      { q: "Ley de Ohm: V = 12 V y R = 4 Ω. La corriente es:", options: ["48 A", "3 A", "0,33 A", "16 A"], answer: 1, why: "I = V ÷ R = 12 ÷ 4 = 3 A.", source: "Electrónica básica", difficulty: 2 },
      { q: "La unidad de la resistencia eléctrica es:", options: ["Voltio", "Ohmio", "Amperio", "Vatio"], answer: 1, why: "Se mide en ohmios (Ω).", source: "SI", difficulty: 1 },
      { q: "Un diodo permite el paso de corriente:", options: ["En ambos sentidos", "En un solo sentido", "Nunca", "Solo en CA"], answer: 1, why: "Conduce en polarización directa y bloquea en inversa.", source: "Electrónica básica", difficulty: 1 },
      { q: "Dos resistencias de 100 Ω en serie dan:", options: ["50 Ω", "200 Ω", "100 Ω", "10 000 Ω"], answer: 1, why: "En serie se suman: 100 + 100 = 200 Ω. En paralelo serían 50 Ω.", source: "Electrónica básica", difficulty: 2 },
      { q: "Potencia: V = 120 V, I = 2 A. P =", options: ["60 W", "240 W", "122 W", "118 W"], answer: 1, why: "P = V × I = 240 W.", source: "Electrónica básica", difficulty: 2 },
    ],
  },
  {
    id: "ctp-accounting",
    title: "English for Accounting",
    emoji: "🧾",
    level: "CTP · Especialidad técnica",
    questions: [
      { q: "«Accounts payable» means:", options: ["Cuentas por cobrar", "Cuentas por pagar", "Inventario", "Capital"], answer: 1, why: "Payable = to be paid by the company.", source: "Business English", difficulty: 1 },
      { q: "«Revenue» is closest to:", options: ["Gastos", "Ingresos", "Deudas", "Impuestos"], answer: 1, why: "Revenue = income from sales.", source: "Business English", difficulty: 1 },
      { q: "Choose the correct sentence:", options: ["The invoice were sent.", "The invoice was sent.", "The invoice sended.", "The invoice is send."], answer: 1, why: "Singular subject + past passive: was sent.", source: "English grammar", difficulty: 2 },
      { q: "A «balance sheet» shows:", options: ["Only sales", "Assets, liabilities and equity", "Employee schedules", "Marketing plans"], answer: 1, why: "Balance sheet = estado de situación financiera.", source: "IFRS vocabulary", difficulty: 2 },
      { q: "«Due date» means:", options: ["Fecha de vencimiento", "Fecha de nacimiento", "Descuento", "Recibo"], answer: 0, why: "The date by which a payment must be made.", source: "Business English", difficulty: 1 },
    ],
  },
  {
    id: "experto",
    title: "Desafío experto",
    emoji: "🏆",
    level: "Dificultad alta · 10.º, 11.º y admisión",
    questions: [
      { q: "Si f(x) = 2x² − 8, ¿cuáles son sus raíces?", options: ["x = 4 y x = −4", "x = 2 y x = −2", "x = 8", "No tiene raíces reales"], answer: 1, why: "2x² = 8 → x² = 4 → x = ±2.", source: "Álgebra · funciones cuadráticas", difficulty: 3 },
      { q: "Un artículo cuesta ₡20 000, sube 10 % y luego baja 10 %. ¿Precio final?", options: ["₡20 000", "₡19 800", "₡20 200", "₡18 000"], answer: 1, why: "20 000 × 1,1 = 22 000; 22 000 × 0,9 = 19 800.", source: "Porcentajes sucesivos", difficulty: 3 },
      { q: "¿Cuál es log₂ 64?", options: ["5", "6", "8", "32"], answer: 1, why: "2⁶ = 64.", source: "Logaritmos", difficulty: 3 },
      { q: "En un triángulo rectángulo con catetos 6 y 8, la hipotenusa mide:", options: ["10", "12", "14", "48"], answer: 0, why: "√(36 + 64) = √100 = 10.", source: "Teorema de Pitágoras", difficulty: 2 },
      { q: "¿Cuántos moles hay en 36 g de agua (H₂O ≈ 18 g/mol)?", options: ["0,5", "1", "2", "18"], answer: 2, why: "36 ÷ 18 = 2 mol.", source: "Estequiometría", difficulty: 3 },
      { q: "Dos resistencias de 6 Ω en paralelo equivalen a:", options: ["12 Ω", "6 Ω", "3 Ω", "36 Ω"], answer: 2, why: "Iguales en paralelo: R/2 = 3 Ω.", source: "Circuitos eléctricos", difficulty: 3 },
      { q: "Un auto pasa de 0 a 20 m/s en 4 s. Su aceleración es:", options: ["4 m/s²", "5 m/s²", "80 m/s²", "16 m/s²"], answer: 1, why: "a = Δv / t = 20 / 4 = 5 m/s².", source: "Cinemática", difficulty: 2 },
      { q: "¿Qué documento de 1949 rige actualmente la organización del Estado costarricense?", options: ["Pacto de Concordia", "Constitución Política", "Código Civil", "Acta de Independencia"], answer: 1, why: "La Constitución Política vigente se promulgó el 7 de noviembre de 1949.", source: "Constitución Política de Costa Rica", difficulty: 2 },
      { q: "Serie: 2, 6, 12, 20, 30, … ¿siguiente?", options: ["40", "42", "36", "44"], answer: 1, why: "Las diferencias crecen de 2 en 2: +4, +6, +8, +10, +12 → 42.", source: "Razonamiento de sucesiones", difficulty: 3 },
      { q: "Si todos los A son B y ningún B es C, entonces:", options: ["Algún A es C", "Ningún A es C", "Todo C es A", "No se puede saber"], answer: 1, why: "Si A está dentro de B y B no toca C, A tampoco toca C.", source: "Razonamiento lógico", difficulty: 3 },
      { q: "En la oración «Aunque llovía, salimos», «aunque» introduce una relación de:", options: ["Causa", "Concesión", "Finalidad", "Tiempo"], answer: 1, why: "«Aunque» expresa un obstáculo que no impide la acción: concesión.", source: "Gramática del español", difficulty: 3 },
      { q: "Choose the correct sentence:", options: ["If I would have time, I help you.", "If I had time, I would help you.", "If I have time, I would helped you.", "If I had time, I will help you."], answer: 1, why: "Second conditional: If + past, would + verb.", source: "English grammar · conditionals", difficulty: 3 },
    ],
  },
];

import { pneDecks } from "./pne-decks";
decks.push(...pneDecks);
import { loteDecks, mat07TopicDecks } from "./lote-decks.bank"; decks.push(...loteDecks, ...mat07TopicDecks);
import { moptDecks } from './mopt-decks'; decks.push(...moptDecks);
import { agilityDeck } from './agility-deck'; decks.push(agilityDeck);
import { admissionExtra } from './admission-extra.bank';
import { excelDeck } from './excel.bank';
decks.push(excelDeck);
import { mathFirstGradeDeck } from './math-first-grade.bank';
decks.push(mathFirstGradeDeck);
import { mathExpandedDeck, mathExamDeck } from './math-expanded.bank';
decks.push(mathExpandedDeck, mathExamDeck);
import { spanishFirstGradeDeck } from './spanish-first-grade.bank';
decks.push(spanishFirstGradeDeck);
import { arenaDecks } from './arena.bank';
decks.push(...arenaDecks);
import { languagePracticeDecks } from './language-practice.bank';
decks.push(...languagePracticeDecks);
import { expandedSubjectDecks } from './expanded-subjects.bank';
decks.push(...expandedSubjectDecks);
import { curricularSubjectDecks } from './curricular-subjects.bank';
decks.push(...curricularSubjectDecks);
const admission = decks.find(deck => deck.id === 'admision');
if (admission) {
  admission.title = 'Admisión · Razonamiento, lectura y matemática';
  admission.level = 'Preparación independiente · No es examen oficial';
  admission.questions.push(...admissionExtra);
}
import { electricalEnglishDecks } from './electrical-english.bank';
decks.push(...electricalEnglishDecks);
import { networkDecks } from './networks.bank';
decks.push(...networkDecks);
