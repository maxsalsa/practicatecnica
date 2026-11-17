export const REA_SOURCE = 'https://ddc.mep.go.cr/deva/reglamentos/pdfs/Reglamento_de_Evaluacion_de_los_Aprendizajes_y_de_la_ConductaN%C2%BA45509-MEP.pdf';
type Weights = Record<string, number>;
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const academic = ['matematica','espanol','estudios sociales','ciencias','lengua extranjera','ingles','frances','biologia','fisica','quimica'];
const project = ['educacion civica','artes plasticas','educacion para el hogar','artes industriales','educacion fisica','educacion musical','psicologia','filosofia'];
const w = (cotidiano: number, examen: number, proyecto = 0): Weights => ({cotidiano,tarea:10,examen,proyecto,asistencia:5});
/** Exact subjects and explicit numeric grades only. Specialty/modalities are not guessed. */
export function officialGradeWeights(subject: string, level: string): { weights: Weights; article: string } | null {
  const normalizedSubject = norm(subject);
  const s = normalizedSubject === 'matematicas' ? 'matematica' : normalizedSubject, l = norm(level);
  const match = l.match(/^(\d{1,2})(?:\s*[.º°oa]*)?$/);
  const grade = match ? Number(match[1]) : 0;
  if (grade < 1 || grade > 12) return null;
  if (grade <= 6) {
    if (academic.includes(s) && !['biologia','fisica','quimica'].includes(s)) return {weights:w(50,35),article:'40(a)'};
    if (['educacion musical','educacion fisica','educacion para el hogar','artes industriales'].includes(s)) return {weights:w(60,25),article:'40(b)'};
    if (s==='artes plasticas') return {weights:w(60,0,25),article:'40(h)'};
    if (s==='formacion tecnologica') return {weights:w(65,20),article:'40(f)'};
  } else if (grade<=9) {
    if (academic.includes(s) && !['biologia','fisica','quimica'].includes(s)) return {weights:w(45,40),article:'41(a)'};
    if (project.includes(s) && s!=='filosofia' || s==='formacion tecnologica') return {weights:w(45,0,40),article:'41(b)'};
    if (s==='educacion religiosa') return {weights:{cotidiano:70,tarea:25,asistencia:5},article:'41(e)'};
  } else {
    if (academic.includes(s) && s!=='ciencias') return {weights:w(35,50),article:'42(a)'};
    if (s==='educacion civica') return {weights:w(35,20,30),article:'42(c)'};
    if (['educacion fisica','educacion musical','artes plasticas'].includes(s)) return {weights:w(45,0,40),article:'42(b)'};
    if (['filosofia','psicologia'].includes(s)) return {weights:w(45,0,40),article:'42(e)'};
    if (s==='educacion religiosa') return {weights:{cotidiano:70,tarea:25,asistencia:5},article:'42(d)'};
  }
  return null;
}