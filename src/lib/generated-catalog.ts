/** Public metadata for parametric item families; items are generated only inside authorized server handlers. */
export type GeneratedFamily = { key: string; title: string; emoji: string; level: string; area: string; summary: string };
export const GENERATED_FAMILIES: GeneratedFamily[] = [
  {key:'frclean',title:'Francés · banco depurado v3',emoji:'🗣️',level:'8 habilidades introductorias',area:'Idiomas',summary:'Una pregunta canónica por habilidad, sin variantes cosméticas; banco finito de ocho ítems.'},
  {key:'ptclean',title:'Portugués · banco depurado v3',emoji:'🗣️',level:'8 habilidades introductorias',area:'Idiomas',summary:'Una pregunta canónica por habilidad, sin variantes cosméticas; banco finito de ocho ítems.'},
  {key:'frvar',title:'Français · gramática ampliada',emoji:'🗣️',level:'Repaso introductorio ampliado',area:'Idiomas',summary:'Être, avoir, conjugación regular, artículos, negación, pasado y futuro.'},
  {key:'ptvar',title:'Português · gramática ampliada',emoji:'🗣️',level:'Repaso introductorio ampliado',area:'Idiomas',summary:'Ser, estar, ter, artículos, negación, pasado y futuro.'},
  {key:'esvar',title:'Español · análisis y gramática ampliada',emoji:'📝',level:'Repaso general; sin cobertura curricular completa',area:'Español',summary:'Conectores, concordancia, interrogativos, tiempos, acentuación y análisis de oraciones.'},
  {key:'segvar',title:'Ciberseguridad · incidentes y controles',emoji:'🛡️',level:'Repaso introductorio ampliado',area:'Técnica',summary:'Confidencialidad, integridad, disponibilidad, reporte de incidentes y verificación de parches.'},
  {key:'redvar',title:'Redes · servicios y equipos',emoji:'🌐',level:'Fundamentos técnicos',area:'Técnica',summary:'DNS, DHCP, HTTPS, NTP, correo, equipos de red y transferencia idealizada.'},
  {key:'ipvar',title:'IPv4 · direccionamiento y subredes',emoji:'🌐',level:'Fundamentos técnicos',area:'Técnica',summary:'Máscaras, hosts, red, difusión, binario y dimensionamiento.'},
  {key:'ipvvar',title:'IPv6 · prefijos ampliados',emoji:'🌐',level:'Fundamentos técnicos',area:'Técnica',summary:'Subdivisión de prefijos, bits, direcciones mapeadas y compresión.'},
  { key: 'ingles', title: 'English · verb forms', emoji: '🗣️', level: 'Repaso gramatical básico e intermedio', area: 'Idiomas', summary: 'To be, presente habitual, pasado simple, presente continuo, futuro y preguntas con did.' },
  { key: 'frances', title: 'Français · formes verbales', emoji: '🗣️', level: 'Repaso gramatical básico e intermedio', area: 'Idiomas', summary: 'Être, passé composé, futur proche y acciones en curso con contextos variables.' },
  { key: 'portugues', title: 'Português · formas verbais', emoji: '🗣️', level: 'Repaso gramatical básico e intermedio', area: 'Idiomas', summary: 'Estar, pretérito perfeito, gerúndio y planes futuros con distintos sujetos y verbos.' },
  { key: 'ipvseis', title: 'Redes · IPv6', emoji: '🌐', level: 'Fundamentos técnicos', area: 'Técnica', summary: 'Compresión de direcciones, prefijos y enlace local, multidifusión y direcciones locales únicas.' },
  { key: 'ciberseguridad', title: 'Ciberseguridad · decisiones de protección', emoji: '🛡️', level: 'Fundamentos técnicos', area: 'Técnica', summary: 'Autenticación multifactor, gestión de parches y mínimo privilegio en escenarios institucionales.' },
  { key: 'mateprim', title: 'Matemática primaria · cálculo y problemas', emoji: '🔢', level: '1.º a 6.º', area: 'Matemática', summary: 'Operaciones, fracciones de una cantidad, perímetro, vuelto en colones, patrones, tiempo y valor posicional.' },
  { key: 'matesec', title: 'Matemática secundaria · álgebra y geometría', emoji: '📐', level: '7.º a 11.º', area: 'Matemática', summary: 'Porcentajes, ecuaciones, potencias, raíces, jerarquía, Pitágoras, pendiente, proporciones, promedio, áreas, cuadráticas y fracciones.' },
  { key: 'espanol', title: 'Español · gramática y ortografía', emoji: '📝', level: '4.º a 11.º', area: 'Español', summary: 'Acentuación por sílaba tónica, conjugación de verbos regulares, sujeto y predicado, sinónimos y antónimos.' },
  { key: 'fisica', title: 'Física · cinemática, dinámica y energía', emoji: '🧲', level: '9.º a 11.º', area: 'Ciencias', summary: 'Rapidez, conversiones, segunda ley de Newton, peso, energía cinética, trabajo, potencia, densidad y presión.' },
  { key: 'quimica', title: 'Química · masa molar y disoluciones', emoji: '⚗️', level: '10.º y 11.º', area: 'Ciencias', summary: 'Masa molar, moles, molaridad y dilución con masas atómicas dadas.' },
  { key: 'biologia', title: 'Biología · genética, célula y cuerpo humano', emoji: '🧬', level: '7.º a 11.º', area: 'Ciencias', summary: 'Cruces de Punnett, funciones celulares, sistemas del cuerpo y flujo de energía.' },
  { key: 'finanzas', title: 'Finanzas y banca · cálculo financiero', emoji: '🏦', level: '10.º a 12.º ETP', area: 'Técnica', summary: 'Interés simple y compuesto, descuentos, IVA, tipo de cambio, ahorro, depreciación, márgenes y cuotas.' },
  { key: 'redes', title: 'Redes · subredes IPv4', emoji: '🌐', level: '10.º a 12.º ETP', area: 'Técnica', summary: 'Máscaras, hosts, dirección de red y difusión, pertenencia a subred, binario y prefijos.' },
  { key: 'electricidad', title: 'Electricidad · Ohm, potencia y circuitos', emoji: '⚡', level: '10.º a 12.º ETP', area: 'Técnica', summary: 'Ley de Ohm, potencia, resistencias en serie y paralelo y costo de energía idealizado.' },
];
export const generatedDeckId = (key: string, exam = false) => `gen-${key}${exam ? '-60' : ''}`;
export const isGeneratedDeck = (id: string) => id.startsWith('gen-');
