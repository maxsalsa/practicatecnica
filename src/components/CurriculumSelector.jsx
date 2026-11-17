import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { malla, deckScopeNotice } from '@/lib/malla';
import { decks } from '@/lib/questions';
import { resolveCurriculumSelection } from '@/lib/curriculum-selection';
import { Button } from '@/components/ui/button';

const field = 'mt-1 h-12 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50';

export function CurriculumSelector() {
  const [modalidad, setModalidad] = useState('');
  const [nivel, setNivel] = useState('');
  const [materia, setMateria] = useState('');
  const { modality, level, subject } = resolveCurriculumSelection({ modalidad, nivel, materia });
  const available = subject?.decks.filter(id => decks.some(d => d.id === id)) ?? [];
  const shared = available.some(id => deckScopeNotice(id));

  return <section aria-labelledby="curriculum-selector-title" className="mt-6 border-y border-border py-5">
    <h2 id="curriculum-selector-title" className="text-xl font-black">Materias por nivel</h2>
    <div className="mt-3 grid gap-3 md:grid-cols-3">
      <label className="min-w-0 text-sm font-semibold">Modalidad
        <select aria-label="Modalidad curricular" className={field} value={modalidad} onChange={e => { setModalidad(e.target.value); setNivel(''); setMateria(''); }}>
          <option value="">Seleccione modalidad</option>
          {malla.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </label>
      <label className="min-w-0 text-sm font-semibold">{modalidad === 'ctp' ? 'Nivel o familia técnica' : modalidad === 'admision' ? 'Universidad' : 'Nivel'}
        <select aria-label="Nivel curricular" className={field} disabled={!modality} value={nivel} onChange={e => { setNivel(e.target.value); setMateria(''); }}>
          <option value="">Seleccione nivel</option>
          {modality?.niveles.map(n => <option key={n.name} value={n.name}>{n.name}</option>)}
        </select>
      </label>
      <label className="min-w-0 text-sm font-semibold">Materia o especialidad
        <select aria-label="Materia curricular" className={field} disabled={!level} value={materia} onChange={e => setMateria(e.target.value)}>
          <option value="">Seleccione materia</option>
          {level?.materias.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
        </select>
      </label>
    </div>
    {subject && <div className="mt-4 flex flex-wrap items-center gap-3">
      <p role="status" className="min-w-0 flex-1 text-sm text-muted-foreground">{available.length ? `${available.length} bloque(s) disponibles${shared ? ' · Incluye repaso compartido' : ''}` : subject.pdf ? 'PDF disponible · Banco de ejercicios pendiente' : 'Banco propio pendiente'}</p>
      <Button asChild className="min-h-11 whitespace-normal"><Link to="/explorar" search={{ modalidad, nivel, materia }}>Ver materia →</Link></Button>
    </div>}
  </section>;
}