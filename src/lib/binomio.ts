// Binomio sagrado MEP: la persona docente media / la persona estudiante construye, con verbos de Bloom.
export const BLOOM = {
  recordar: ['identifica', 'reconoce', 'nombra'],
  comprender: ['explica', 'describe', 'interpreta'],
  aplicar: ['resuelve', 'utiliza', 'demuestra'],
  analizar: ['compara', 'distingue', 'organiza'],
  evaluar: ['valora', 'justifica', 'verifica'],
  crear: ['diseña', 'elabora', 'propone'],
} as const;
export type BloomLevel = keyof typeof BLOOM;
export type Moment = { momento: string; nivel: BloomLevel; docente: string; estudiante: string };
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1).replace(/\.$/, '');
export function buildBinomio(topic: string, objective: string, example: string, seed = 0): Moment[] {
  const v = (l: BloomLevel) => BLOOM[l][seed % 3]!;
  const t = `«${topic}»`;
  return [
    { momento: 'Focalización', nivel: 'recordar', docente: `La persona docente presenta una situación cotidiana sobre ${t} mediante preguntas generadoras para activar conocimientos previos.`, estudiante: `La persona estudiante ${v('recordar')} conceptos previos relacionados con ${t} mediante una lluvia de ideas.` },
    { momento: 'Exploración', nivel: 'comprender', docente: `La persona docente facilita material y un ejemplo guiado (${example}) mediante trabajo en parejas.`, estudiante: `La persona estudiante ${v('comprender')} el procedimiento del ejemplo mediante un organizador gráfico.` },
    { momento: 'Contrastación', nivel: 'analizar', docente: `La persona docente media la discusión de resultados mediante una puesta en común con preguntas de verificación.`, estudiante: `La persona estudiante ${v('analizar')} sus respuestas con las de otros grupos para ${lower(objective)}.` },
    { momento: 'Aplicación', nivel: 'aplicar', docente: `La persona docente propone un caso práctico de la comunidad o del entorno laboral mediante una guía de trabajo.`, estudiante: `La persona estudiante ${v('aplicar')} lo aprendido sobre ${t} mediante la resolución del caso.` },
    { momento: 'Evaluación y cierre', nivel: 'evaluar', docente: `La persona docente aplica la rúbrica 3/2/1/0 mediante observación y retroalimentación oportuna.`, estudiante: `La persona estudiante ${v('evaluar')} su desempeño y ${v('crear')} una conclusión propia mediante una autoevaluación escrita.` },
  ];
}
