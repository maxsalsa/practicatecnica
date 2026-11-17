export const learningSubjects = [
  {id:'network',title:'Redes',emoji:'🔌',units:['IPv4 y dirección de red','IPv6 y notación','Subredes y capacidad','Servicios y diagnóstico'],keys:'redes network ipv4 ipv6 subnetting subredes dns dhcp conectividad'},
  {id:'science',title:'Ciencias',emoji:'🔬',units:['Vida y ambiente','Materia y energía','Investigación y datos'],keys:'ciencias ciencia ambiente investigación'},
  {id:'finance',title:'Finanzas',emoji:'📊',units:['Presupuesto y liquidez','Interés y valor del dinero','Riesgo y decisiones'],keys:'finanzas financiera presupuesto interes inversión'},
  {id:'banking',title:'Banca',emoji:'🏦',units:['Productos y registros','Crédito y pagos','Seguridad y derechos'],keys:'banca bancos bancaria credito pagos'},
  {id:'costs',title:'Contabilidad de costos',emoji:'🧮',units:['Clasificación y producción','Costeo y asignación','Equilibrio y decisiones'],keys:'costos costeo contabilidad costos producción'},
  {
    "id": "english",
    "title": "Inglés",
    "emoji": "🌍",
    "units": [
      "Presente y vocabulario",
      "Pasado y have / had",
      "Infinitivo y allow"
    ],
    "keys": "ingles english pasado presente continuo infinitivo have had allow vocabulario"
  },
  {
    "id": "math",
    "title": "Matemáticas",
    "emoji": "📐",
    "units": [
      "Operaciones y proporciones",
      "Álgebra y geometría",
      "Datos y razonamiento"
    ],
    "keys": "matematica matematicas algebra geometria"
  },
  {
    "id": "security",
    "title": "Ciberseguridad",
    "emoji": "🛡️",
    "units": [
      "Identidad y acceso",
      "Redes y protección",
      "Incidentes y recuperación"
    ],
    "keys": "seguridad ciberseguridad cybersecurity redes"
  },
  {
    "id": "web",
    "title": "Desarrollo web",
    "emoji": "💻",
    "units": [
      "HTML y accesibilidad",
      "CSS y JavaScript",
      "HTTP y seguridad web"
    ],
    "keys": "desarrollo web html css javascript"
  },
  {
    "id": "architecture",
    "title": "Arquitectura de software",
    "emoji": "🏗️",
    "units": [
      "Responsabilidades y diseño",
      "Datos e integración",
      "Calidad y resiliencia"
    ],
    "keys": "arquitectura software sistemas diseño"
  },
  {
    "id": "physics",
    "title": "Física",
    "emoji": "🧲",
    "units": [
      "Conceptos y unidades",
      "Leyes y cálculos básicos",
      "Problemas integrados"
    ],
    "keys": "fisica physics fuerza energia movimiento newton electricidad ondas"
  },
  {
    "id": "sports",
    "title": "Deportes",
    "emoji": "⚽",
    "units": [
      "Reglas básicas",
      "Técnica y entrenamiento",
      "Historia y casos integrados"
    ],
    "keys": "deportes educacion fisica futbol baloncesto voleibol atletismo reglas olimpicos"
  },
  {
    "id": "social",
    "title": "Estudios Sociales",
    "emoji": "🌎",
    "units": [
      "Geografía de Costa Rica",
      "Historia y civismo",
      "Análisis social y mundo"
    ],
    "keys": "estudios sociales historia geografia civica costa rica constitucion"
  },
  {
    "id": "support",
    "title": "Soporte TI",
    "emoji": "🧰",
    "units": [
      "Hardware y diagnóstico básico",
      "Sistemas, redes y mesa de ayuda",
      "Casos integrados de soporte"
    ],
    "keys": "soporte ti tecnico mesa de ayuda help desk hardware itil"
  },
  {
    "id": "accounting",
    "title": "Contabilidad · Accounting",
    "emoji": "🧾",
    "units": [
      "Ecuación y registros",
      "Costos e inventarios",
      "Estados y vocabulario"
    ],
    "keys": "accounting contabilidad costos finanzas"
  }
] as const;
export function learningDeckId(subject:string,block:number){return `study-${subject}-b${block}-v1`;}
export function findLearningSubjects(query:string){const norm=(s:string)=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");const words=norm(query).split(/\s+/).filter(w=>w&&! ["de","en","simulacro","simulacros","practica","practicas"].includes(w));return words.length?learningSubjects.filter(s=>words.every(w=>norm(s.title+" "+s.keys).includes(w))):[];}
