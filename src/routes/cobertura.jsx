import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { curriculumCoverage } from '@/lib/curriculum-coverage';
import { normalizeSearch } from '@/lib/material-search';

export const Route=createFileRoute('/cobertura')({staticData:{sitemap:true},head:()=>({meta:[{title:'Cobertura por grado y especialidad ETP · practicatecnica.com'},{name:'description',content:'Consulte capítulos, descargas y evaluaciones disponibles por grado, materia y especialidad, desde primaria hasta duodécimo ETP.'},{property:'og:title',content:'Cobertura curricular por grado · practicatecnica.com'},{property:'og:description',content:'Materiales existentes y tipos de recursos pendientes, sin atribuir cobertura oficial completa.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:Coverage});

function Coverage(){
 const [query,setQuery]=useState('');
 const [modality,setModality]=useState('');
 const [level,setLevel]=useState('');
 const levels=[...new Set(curriculumCoverage.filter(r=>!modality||r.modality===modality).map(r=>r.level))];
 const rows=curriculumCoverage.filter(r=>(!modality||r.modality===modality)&&(!level||r.level===level)&&normalizeSearch(`${r.modality} ${r.level} ${r.subject}`).includes(normalizeSearch(query)));
 const totals=rows.reduce((s,r)=>({chapters:s.chapters+r.chapterCount,downloads:s.downloads+r.downloadCount,practices:s.practices+r.practice20Count,exams:s.exams+r.exam60Count}),{chapters:0,downloads:0,practices:0,exams:0});
 const fieldClass='min-w-0 max-w-full rounded-lg border border-border bg-card px-4 py-3';
 return <main className="min-h-screen bg-hero"><SiteHeader/><section className="mx-auto max-w-6xl px-5 pb-24">
  <h1 className="mt-6 text-3xl font-black">Cobertura por grado y materia</h1>
  <p className="mt-3 text-muted-foreground">Preparación independiente: capítulos y cuadernillos iniciales, no libros completos ni revisión integral del programa MEP.</p>
  <div className="mt-6 grid gap-3 sm:grid-cols-3">
   <input aria-label="Buscar cobertura por materia y nivel" type="search" value={query} onChange={e=>setQuery(e.target.value)} className={fieldClass} placeholder="Materia o especialidad"/>
   <select aria-label="Modalidad de cobertura" value={modality} onChange={e=>{setModality(e.target.value);setLevel('');}} className={fieldClass}><option value="">Todas las modalidades</option>{[...new Set(curriculumCoverage.map(r=>r.modality))].map(m=><option key={m}>{m}</option>)}</select>
   <select aria-label="Grado o área de cobertura" value={level} onChange={e=>setLevel(e.target.value)} className={fieldClass}><option value="">Todos los grados y áreas</option>{levels.map(l=><option key={l}>{l}</option>)}</select>
  </div>
  <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5 sm:grid-cols-4">{[['Capítulos',totals.chapters],['Descargas catalogadas',totals.downloads],['Prácticas de 20',totals.practices],['Simulacros de 60',totals.exams]].map(([label,value])=><div key={label}><dt className="text-sm text-muted-foreground">{label}</dt><dd className="mt-1 text-2xl font-black">{value}</dd></div>)}</dl>
  <p role="status" className="mt-4 text-sm">{rows.length} selecciones · {rows.filter(r=>r.pendingTypes.length>0).length} con tipos de material pendientes</p>
  <p className="mt-2 text-sm text-muted-foreground">Conteos por selección, no total de archivos únicos. Bancos compartidos excluidos de evaluaciones específicas; una prueba distinta y la meta total de libros siguen sin definir.</p>
  <div className="mt-5 overflow-x-auto" tabIndex={0} aria-label="Inventario de cobertura"><table className="w-full text-left text-sm"><thead className="border-b border-border"><tr>{['Nivel','Materia','Capítulos','Descargas','Prácticas 20','Simulacros 60','Pendientes','Materiales'].map(label=><th key={label} className="p-3 font-bold">{label}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={`${r.modality}-${r.level}-${r.subject}-${i}`} className="border-b border-border">
   <td className="p-3">{r.modality}<br/>{r.level}</td><td className="p-3 font-semibold">{r.subject}{r.shared&&<span className="mt-1 block font-normal text-muted-foreground">Incluye banco compartido</span>}</td>
   <td className="p-3">{r.chapterCount}</td><td className="p-3">{r.downloadCount}</td><td className="p-3">{r.practice20Count}</td><td className="p-3">{r.exam60Count}</td>
   <td className="p-3">{r.pendingTypes.length?<ul className="space-y-1">{r.pendingTypes.map(t=><li key={t}>{t}</li>)}</ul>:'Tipos iniciales disponibles; revisión integral pendiente'}</td>
   <td className="p-3">{r.topicId&&<Link to="/temas/$topic" params={{topic:r.topicId}} className="mb-2 block text-primary underline">Repaso gratuito</Link>}{r.examDeckIds.map(id=><Link key={id} to="/simulacro" search={{deck:id}} className="mb-2 block text-primary underline">Evaluación · {id}</Link>)}{r.pdf&&<a href={r.pdf} target="_blank" rel="noreferrer" className="text-primary underline">PDF catalogado</a>}{!r.topicId&&!r.pdf&&!r.examDeckIds.length&&<span className="text-muted-foreground">Sin material específico</span>}</td>
  </tr>)}</tbody></table></div>
  {!rows.length&&<p className="py-8 text-muted-foreground">Sin coincidencias.</p>}
 </section></main>;
}