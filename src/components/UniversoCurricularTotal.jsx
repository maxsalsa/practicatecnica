import React, { useState } from 'react';
import { BookOpen, Cpu, Wrench, ShieldCheck, DollarSign, BookMarked, Globe, HeartPulse, Atom, CheckCircle, Award, Sparkles } from 'lucide-react';

export default function UniversoCurricularTotal() {
  const [categoria, setCategoria] = useState('TECNICA');
  const [asignaturaActiva, setAsignaturaActiva] = useState('ELECTRONICA');

  const asignaturasGICM = {
    TECNICA: [
      { id: 'ELECTRONICA', nombre: 'Electrotecnia y Electrónica', icono: Cpu, desc: 'Circuitos AC/DC, microcontroladores y automatización industrial.' },
      { id: 'MECANICA', nombre: 'Fabricación y Mecánica de Precisión', icono: Wrench, desc: 'Metrología, neumática y diseño mecánico asistido.' },
      { id: 'ELECTROMECANICA', nombre: 'Electromecánica e Hidráulica', icono: Wrench, desc: 'Sistemas de potencia, motores eléctricos y tableros.' },
      { id: 'EJECUTIVO', nombre: 'Ejecutivo para Centros de Servicio (Secretariado)', icono: DollarSign, desc: 'Gestión documental, protocolo empresarial y atención.' },
      { id: 'CONTABILIDAD', nombre: 'Contabilidad y Finanzas (Accounting)', icono: DollarSign, desc: 'Estados financieros, auditoría y tributación local.' },
      { id: 'CIBER', nombre: 'Ciberseguridad y Redes', icono: ShieldCheck, desc: 'Seguridad ofensiva/defensiva, enrutamiento y firewalls.' }
    ],
    ACADEMICA: [
      { id: 'MATEMATICA', nombre: 'Matemática (Primaria y Secundaria)', icono: BookOpen, desc: 'Álgebra, trigonometría, estadística y cálculo.' },
      { id: 'ESPANOL', nombre: 'Español y Literatura', icono: BookMarked, desc: 'Comprensión de lectura, gramática y redacción formal.' },
      { id: 'CIENCIAS', nombre: 'Química, Biología y Física (STEM)', icono: Atom, desc: 'Leyes de la naturaleza, reacciones y laboratorios.' },
      { id: 'SOCIALES', nombre: 'Estudios Sociales y Educación Cívica', icono: Globe, desc: 'Historia patria, geografía y derechos ciudadanos.' },
      { id: 'FILOSOFIA', nombre: 'Filosofía, Ética y Psicología', icono: HeartPulse, desc: 'Pensamiento crítico, lógica y dilemas morales.' },
      { id: 'IDIOMAS', nombre: 'Inglés, Francés y Portugués', icono: Globe, desc: 'Competencias multilingües y vocabulario técnico.' }
    ]
  };

  const listaActual = asignaturasGICM[categoria];
  const actualObj = listaActual.find(a => a.id === asignaturaActiva) || listaActual[0];

  return (
    <div className="max-w-6xl mx-auto my-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-slate-100">
      
      {/* HEADER SUPREMO GICM */}
      <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-4 gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/30">
            EDITORIAL GICM · UNIVERSO CURRICULAR Y TÉCNICO COMPLETO
          </span>
          <h2 className="text-xl md:text-3xl font-black text-white mt-2">
            Banco Masivo de Libros, Pruebas, Juegos y Casos DUA
          </h2>
          <p className="text-xs text-slate-400 mt-1">Cobertura total: Académica, CTPs, Talleres, Idiomas y Educación de Adultos.</p>
        </div>

        {/* SELECTOR DE CATEGORÍA */}
        <div className="flex gap-2">
          <button
            onClick={() => { setCategoria('TECNICA'); setAsignaturaActiva('ELECTRONICA'); }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${categoria === 'TECNICA' ? 'bg-amber-600 text-slate-950 shadow-lg' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}
          >
            ⚙️ Especialidades Técnicas (CTP)
          </button>
          <button
            onClick={() => { setCategoria('ACADEMICA'); setAsignaturaActiva('MATEMATICA'); }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${categoria === 'ACADEMICA' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}
          >
            📚 Asignaturas Académicas &amp; Idiomas
          </button>
        </div>
      </div>

      {/* GRILLA DE ASIGNATURAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {listaActual.map((item) => {
          const IconComp = item.icono;
          return (
            <div
              key={item.id}
              onClick={() => setAsignaturaActiva(item.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${asignaturaActiva === item.id ? 'bg-cyan-950/40 border-cyan-500 shadow-lg' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
            >
              <div className="w-fit p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                <IconComp className="h-5 w-5" />
              </div>
              <div className="font-bold text-sm text-white">{item.nombre}</div>
              <div className="text-[11px] text-slate-400">{item.desc}</div>
            </div>
          );
        })}
      </div>

      {/* CONTENIDO ACTIVO DE LA ASIGNATURA SELECCIONADA */}
      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-base font-black text-amber-400">Módulo Editorial &amp; Práctica: {actualObj.nombre}</h3>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
            Millones de Ítems Paramétricos Activos
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Incluye resúmenes teóricos ilustrados, mapas conceptuales, casos reales de análisis empresarial/técnico, juegos de autoevaluación, crucigramas y simulacros cronometrados de 60 preguntas.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button onClick={() => alert(`¡Generando libro ilustrado y prácticas guiadas para ${actualObj.nombre}!`)} className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs shadow-lg">
            📖 Leer Libro y Resumen Ilustrado
          </button>
          <button onClick={() => alert(`¡Iniciando simulacro oficial de 60 ítems para ${actualObj.nombre}!`)} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg">
            ⏱️ Iniciar Simulacro Cronometrado
          </button>
          <button onClick={() => alert(`¡Cargando juegos y crucigramas para ${actualObj.nombre}!`)} className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shadow-lg">
            🎮 Jugar &amp; Resolver Crucigramas
          </button>
        </div>
      </div>
    </div>
  );
}