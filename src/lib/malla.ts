import { cuadernillos } from "./cuadernillos";
import { specialtyDeckIds } from "./specialty-decks";

export type Materia = { name: string; emoji: string; decks: string[]; pdf?: string | undefined; links?: { to: string; label: string }[] | undefined };
export type Nivel = { name: string; materias: Materia[] };
export type Modalidad = { id: string; name: string; emoji: string; niveles: Nivel[] };
const SHARED_DECKS = new Set(['espanol', 'historia', 'civica', 'religion', 'experto', 'admision', 'mopt']);
export function deckScopeNotice(id: string): string | undefined {
  if (/^prim[1-5]$/.test(id)) return 'Repaso mixto del grado: incluye varias materias; no es un simulacro específico de la materia seleccionada.';
  if (SHARED_DECKS.has(id)) return 'Banco general compartido: no acredita cobertura completa de este grado, institución o materia.';
  return undefined;
}

const PDF = (t: string) => cuadernillos.find((c) => c.title.startsWith(t))?.url;
const ACAD = ["Matemática", "Español", "Ciencias", "Estudios Sociales", "Educación Cívica", "Inglés", "Francés", "Educación Religiosa", "Educación Física", "Artes Plásticas", "Educación Musical", "Artes Industriales", "Educación para el Hogar"];
const ACAD_EMO: Record<string, string> = { "Matemática": "➗", "Español": "✍️", "Ciencias": "🔬", "Biología": "🧬", "Física": "⚛️", "Química": "⚗️", "Estudios Sociales": "🌎", "Educación Cívica": "🏛️", "Inglés": "🇬🇧", "Francés": "🇫🇷", "Educación Religiosa": "🕊️", "Portugués": "🇧🇷", "Educación Física": "⚽", "Artes Plásticas": "🎨", "Educación Musical": "🎵", "Artes Industriales": "🔧", "Educación para el Hogar": "🏠", "Psicología": "🧠", "Filosofía": "🤔", "Afectividad y Sexualidad": "💬" };
const DECK: Record<string, string[]> = { "Español": ["espanol"], "Estudios Sociales": ["historia", "civica"], "Educación Cívica": ["civica"], "Educación Religiosa": ["religion"] };
const IDIOMA = { to: "/destrezas", label: "🎧 Escuchar, hablar y escribir" };

function acad(grade: string, extra: string[] = []): Materia[] {
  return [...ACAD, ...extra].map((m) => {
    const decks = [...(DECK[m] ?? [])];
    if (m === "Matemática" && grade === "7.º") decks.unshift("lote-mat-07-01", "lote-mat-07-01-t1", "lote-mat-07-01-t2", "lote-mat-07-01-t3", "lote-mat-07-01-t4");
    if (m === "Matemática" && grade === "8.º") decks.unshift("lote-mat-08-01");
    if (["10.º", "11.º"].includes(grade) && m === "Matemática") decks.push("experto");
    return { name: m, emoji: ACAD_EMO[m] ?? "📘", decks, links: ["Inglés", "Francés", "Portugués"].includes(m) ? [IDIOMA] : undefined };
  });
}
const prim = (g: number): Materia[] => ["Matemática", "Español", "Ciencias", "Estudios Sociales", "Inglés", "Educación Religiosa", "Educación Física", "Artes Plásticas", "Educación Musical"].map((m) => ({
  name: m, emoji: ACAD_EMO[m] ?? "📘", decks: g===1&&m==='Matemática' ? ['mep-math-01-e60','mep-math-01-v2','mep-math-01-v1'] : g===1&&m==='Español' ? ['mep-spanish-01-v1'] : [],
  links: g === 6 ? [{ to: "/sexto", label: "🎯 6.º interactivo" }, { to: "/resumen-sexto", label: "🗺️ Resúmenes y mapas" }] : m === "Inglés" ? [IDIOMA] : [{ to: "/resumen-primaria", label: "📝 Resúmenes" }],
}));

const tecnicas = cuadernillos.filter((c) => /^\d{4}/.test(c.title));
const familia = (re: RegExp) => tecnicas.filter((c) => re.test(c.title.slice(0, 1)));
const CODE_DECK = specialtyDeckIds;
const esp = (list: typeof tecnicas): Materia[] => list.map((c) => { const code = c.title.slice(0, 4); return { name: c.title, emoji: "🛠️", decks: CODE_DECK[code] ? [CODE_DECK[code]] : [], pdf: c.url }; });

export const malla: Modalidad[] = [
  { id: "primaria", name: "Primaria", emoji: "🎒", niveles: [1, 2, 3, 4, 5, 6].map((g) => ({ name: `${g}.º grado`, materias: [...prim(g), ...(g<=5?[{name:'Repaso mixto del grado',emoji:'🧩',decks:[`prim${g}`]}]:[])] })) },
  { id: "academica", name: "Secundaria académica", emoji: "📚", niveles: ["7.º", "8.º", "9.º", "10.º", "11.º"].map((g) => ({ name: g, materias: acad(g, ["10.º", "11.º"].includes(g) ? ["Biología", "Física", "Química", "Psicología", "Filosofía", "Portugués"] : ["Portugués", "Afectividad y Sexualidad"]) })) },
  { id: "ctp", name: "Técnica CTP", emoji: "🛠️", niveles: [
    { name: "Redes · Bloques introductorios", materias: [{ name: "Redes · IPv4, IPv6, subredes y servicios", emoji: "🔌", decks: ["study-network-b1-v1","study-network-b2-v1","study-network-b3-v1","study-network-b4-v1","study-network-mix-v1"], links: [{to:"/redes",label:"Resúmenes y laboratorio de Redes"}] }] },
    { name: "Herramientas digitales", materias: [{ name: "Excel · Fórmulas y referencias", emoji: "📊", decks: ["excel-fundamentos"] }] },
    { name: "Inglés Técnico CTP", materias: [{ name: "Inglés · Electricidad Industrial (MEP 2021)", emoji: "⚡", decks: ["study-electrical-b1-v1","study-electrical-b2-v1","study-electrical-b3-v1","study-electrical-mix-v1"] }] },
    { name: "Académicas CTP (PNE 2026)", materias: [["Matemáticas CTP", "Matemática"], ["Español CTP", "Español"], ["Ciencias CTP", "Ciencias"], ["Estudios Sociales CTP", "Estudios Sociales"], ["Educación Cívica CTP", "Educación Cívica"]].flatMap(([title, subject]) => title&&subject?[{name:title,emoji:ACAD_EMO[subject]??'📘',decks:DECK[subject]??[],pdf:PDF(title)}]:[]) },
    { name: "12.º CTP (sección técnica)", materias: acad("12.º", ["Psicología", "Filosofía"]) },
    { name: "Agropecuaria (1000)", materias: esp(familia(/1/)) },
    { name: "Industrial (2000)", materias: esp(familia(/2/)) },
    { name: "Comercial y servicios (3000)", materias: esp(familia(/3/)) },
  ] },
  { id: "ingreso", name: "Ingreso a colegios", emoji: "🏫", niveles: [
    { name: "Ingreso a 7.º (CTP, colegios científicos, humanísticos, artísticos y deportivos)", materias: [{ name: "Simulacro de ingreso a 7.º", emoji: "🎯", decks: ["sim7"], links: [{ to: "/ingreso", label: "🏫 Guía de ingreso" }] }] },
    { name: "Ingreso a 10.º (CTP, colegios científicos y humanísticos)", materias: [{ name: "Simulacro de ingreso a 10.º", emoji: "🎯", decks: ["sim10"], links: [{ to: "/ingreso", label: "🏫 Guía de ingreso" }] }] },
  ] },
  { id: "admision", name: "Admisión universitaria", emoji: "🎓", niveles: ["UCR", "TEC", "UNA", "UTN", "UNED"].map((u) => ({ name: u, materias: [{ name: u==='UTN'||u==='UNED'?`Refuerzo académico ${u} · No es examen de admisión`:`Razonamiento ${u} · Banco independiente compartido`, emoji: "🧠", decks: ["admision"] }] })) },
  { id: "mopt", name: "Licencia MOPT", emoji: "🚗", niveles: [
    { name: "Moto (A)", materias: [{ name: "Teórico Ley 9078 · Moto", emoji: "🏍️", decks: ["mopt"] }] },
    { name: "Carro (B1)", materias: [{ name: "Teórico Ley 9078 · Carro", emoji: "🚗", decks: ["mopt"] }] },
    { name: "Camión · Banco pendiente", materias: [{ name: "Camión · Manual y preguntas específicas pendientes", emoji: "🚚", decks: [] }] },
  ] },
];
