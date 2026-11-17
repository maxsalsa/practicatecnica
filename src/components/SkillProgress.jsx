import { Car, Bike, Code, ShieldCheck, Users, FlaskConical, Trophy, Palette, GraduationCap, Atom, Brain } from 'lucide-react';
import { areaResults } from '@/lib/skill-areas';

const icons = { car, bike, code, shield, users, flask, trophy, palette, graduation, atom, brain };
export function SkillProgress({ attempts }) {
 return <section className="mt-6">
  <h3 className="text-lg font-bold">Resultados verificados por destreza</h3>
  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
   {areaResults(attempts).map(area => { const Icon = icons[area.icon]; return <article key={area.id} className="min-w-0 rounded-lg border bg-card p-4">
    <h4 className="flex items-center gap-2 font-bold"><Icon aria-hidden="true" className="size-5 shrink-0 text-primary" />{area.title}</h4>
    {area.last === undefined ? <p className="mt-3 text-sm text-muted-foreground">Sin resultados</p> : <>
     <p className="mt-3 text-sm">Última nota: <strong>{area.last}%</strong> · Mejor: <strong>{area.best}%</strong></p>
     <progress aria-label={`Última nota ${area.title}`} max={100} value={area.last} className="mt-2 h-2 w-full accent-primary" />
     <p className="mt-2 text-sm text-muted-foreground">{area.attempts} intentos · {area.last >= 80 ? 'Dominado' : area.last >= 50 ? 'En proceso' : 'Requiere reforzamiento'}</p>
    </>}
   </article>; })}
  </div>
 </section>;
}