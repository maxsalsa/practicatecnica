// Taxonomía curricular MEP: Modalidad → Nivel → Asignatura → Subárea → Unidad → Tema → Indicador.
// Catálogo base independiente y extensible; no sustituye los programas oficiales.
const t = (tema, ...indicadores) => ({ tema, indicadores });
const u = (unidad, ...temas) => ({ unidad, temas });
const s = (subarea, ...unidades) => ({ subarea, unidades });
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => `${a + i}.°`);

const MATERIAS = {
  'Matemáticas': [s('Números', u('Operaciones', t('Proporcionalidad', 'Resuelve problemas cotidianos con cantidades proporcionales.', 'Calcula porcentajes en situaciones de consumo.')))],
  'Español': [s('Comprensión lectora', u('Textos funcionales', t('Instrucciones y avisos', 'Interpreta la información principal de un texto funcional.', 'Identifica la intención comunicativa de un aviso.')))],
  'Ciencias': [s('Materia y energía', u('Mediciones', t('Magnitudes', 'Aplica mediciones de masa, volumen y tiempo en experimentos.', 'Interpreta datos de un registro experimental.')))],
  'Estudios Sociales': [s('Geografía', u('Espacio geográfico', t('Escalas y mapas', 'Calcula distancias reales mediante la escala de un mapa.', 'Interpreta datos de población de su región.')))],
  'Biología': [s('Seres vivos', u('Ecología', t('Poblaciones', 'Analiza el crecimiento de una población con datos de campo.')))],
  'Física': [s('Mecánica', u('Cinemática', t('Rapidez media', 'Calcula la rapidez media a partir de distancia y tiempo.')))],
  'Química': [s('Disoluciones', u('Concentración', t('Porcentaje en masa', 'Calcula la concentración porcentual de una disolución.')))],
  'Cívica': [s('Participación ciudadana', u('Presupuesto comunal', t('Distribución de recursos', 'Interpreta la distribución porcentual de un presupuesto comunal.')))],
  'Inglés': [s('Reading', u('Everyday texts', t('Schedules', 'Interprets numerical information in a schedule or receipt.')))],
  'Salud Ocupacional': [s('Prevención de riesgos', u('Equipo de protección', t('Inspección de EPP', 'Determina inventarios de equipo de protección según la cantidad de personal.', 'Calcula índices de incidentes en un periodo.')))],
  'Mecánica de Precisión': [s('Metrología', u('Mediciones', t('Tolerancias', 'Calcula dimensiones y tolerancias de piezas mecanizadas.', 'Determina tiempos de mecanizado por lote.')))],
  'Desarrollo Web / Programación': [s('Desarrollo de software', u('Rendimiento', t('Transferencia de datos', 'Estima tiempos de carga según tamaño de recursos y velocidad.', 'Calcula capacidad de almacenamiento requerida.')))],
  'Ciberseguridad': [s('Gestión de incidentes', u('Monitoreo', t('Registros de eventos', 'Calcula tasas de intentos fallidos en bitácoras de acceso.')))],
  'Soporte TI': [s('Mantenimiento', u('Inventario de equipos', t('Planificación', 'Planifica tiempos de mantenimiento preventivo por equipo.')))],
  'Contabilidad y Administración': [s('Contabilidad', u('Costos', t('Margen y descuento', 'Calcula descuentos e impuestos sobre ventas.', 'Determina costos totales de producción.')))],
};
const pick = (...n) => Object.fromEntries(n.map((k) => [k, MATERIAS[k]]));
const ACAD = pick('Matemáticas', 'Español', 'Biología', 'Física', 'Química', 'Estudios Sociales', 'Cívica', 'Inglés');
const CTP = pick('Salud Ocupacional', 'Mecánica de Precisión', 'Desarrollo Web / Programación', 'Ciberseguridad', 'Soporte TI', 'Contabilidad y Administración');

export const TAXONOMIA_MEP = [
  { modalidad: 'Primaria', tipo: 'cotidiano', niveles: range(1, 6), asignaturas: pick('Matemáticas', 'Español', 'Ciencias', 'Estudios Sociales') },
  { modalidad: 'Secundaria Académica', tipo: 'cotidiano', niveles: range(7, 11), asignaturas: ACAD },
  { modalidad: 'Secundaria Técnica CTP', tipo: 'laboral', niveles: range(10, 12), asignaturas: { ...CTP, ...pick('Matemáticas', 'Español', 'Inglés') } },
];

export const modalidades = () => TAXONOMIA_MEP.map((m) => m.modalidad);
const mod = (m) => TAXONOMIA_MEP.find((x) => x.modalidad === m);
export const niveles = (m) => mod(m)?.niveles ?? [];
export const asignaturas = (m) => Object.keys(mod(m)?.asignaturas ?? {});
export const subareas = (m, a) => (mod(m)?.asignaturas[a] ?? []).map((x) => x.subarea);
export const tipoContexto = (m) => mod(m)?.tipo ?? 'cotidiano';

/** Recorre la jerarquía completa y devuelve filas planas filtradas. */
export function filtrarIndicadores({ modalidad, nivel, asignatura, subarea } = {}) {
  const out = [];
  for (const m of TAXONOMIA_MEP) {
    if (modalidad && m.modalidad !== modalidad) continue;
    for (const n of m.niveles) {
      if (nivel && n !== nivel) continue;
      for (const [a, subs] of Object.entries(m.asignaturas)) {
        if (asignatura && a !== asignatura) continue;
        for (const sb of subs) {
          if (subarea && sb.subarea !== subarea) continue;
          for (const un of sb.unidades) for (const te of un.temas) for (const ind of te.indicadores)
            out.push({ modalidad: m.modalidad, nivel: n, asignatura: a, subarea: sb.subarea, unidad: un.unidad, tema: te.tema, indicador: ind, tipo: m.tipo });
        }
      }
    }
  }
  return out;
}
