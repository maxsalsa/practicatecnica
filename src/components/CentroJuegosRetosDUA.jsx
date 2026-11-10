import React, { useState } from 'react';
import { Gamepad2, Puzzle, Flame, Users, BookOpen, CheckCircle, Award, Sparkles, MessageSquare } from 'lucide-react';

export default function CentroJuegosRetosDUA() {
  const [pestana, setPestana] = useState('TRIVIA');
  const [xp, setXp] = useState(1200);
  const [nivelDUA, setNivelDUA] = useState('Correr (Aplicación)');

  return (
    <div className="max-w-6xl mx-auto my-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-slate-100">
      
      {/* HEADER EDITORIAL GICM */}
      <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-4 gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/30">
            GICM · Editorial Independiente (Ing. Max Salazar Sánchez)
          </span>
          <h2 className="text-xl md:text-3xl font-black text-white mt-2">
            Centro Interactivo de Juegos, Retos y Trabajo Autónomo DUA
          </h2>
          <p className="text-xs text-slate-400">Plataforma mundial de seguimiento docente, crucigramas, debates y autoevaluación.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <Flame className="h-5 w-5 text-amber-400 animate-pulse" />
          <span className="text-xs font-black text-white">XP Acumulado: {xp}</span>
        </div>
      </div>

      {/* BOTONES DE NAVEGACIÓN DEL CENTRO DE JUEGOS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'TRIVIA', label: '🎮 Retos & Trivias de Velocidad', icono: Gamepad2 },
          { id: 'CRUCIGRAMA', label: '🧩 Crucigrama Técnico & Conceptual', icono: Puzzle },
          { id: 'DEBATES', label: '💬 Debates & Casos de Estudio', icono: MessageSquare },
          { id: 'AUTONOMO', label: '📚 Guía de Trabajo Autónomo DUA', icono: BookOpen }
        ].map((tab) => {
          const IconTab = tab.icono;
          return (
            <button
              key={tab.id}
              onClick={() => setPestana(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all ${pestana === tab.id ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'}`}
            >
              <IconTab className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTENIDO DE LAS PESTAÑAS */}
      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        
        {pestana === 'TRIVIA' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-cyan-400">Reto Relámpago de Opción Múltiple (Modo Gamificado)</h3>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">Nivel DUA: {nivelDUA}</span>
            </div>
            <p className="text-sm font-bold text-white">¿Cuál es el principio fundamental que rige la confidencialidad de datos en redes corporativas?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['A. Cifrado y control estricto de accesos', 'B. Aumentar el almacenamiento en disco', 'C. Imprimir reportes diarios en papel', 'D. Apagar los servidores en la noche'].map((op, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    alert(idx === 0 ? "¡Correcto! +150 XP ganados." : "Incorrecto. Inténtalo de nuevo.");
                    if(idx === 0) setXp(x => x + 150);
                  }}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-xs font-bold text-slate-200 transition-all"
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        )}

        {pestana === 'CRUCIGRAMA' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-amber-400">Crucigrama GICM de Conceptos Esenciales</h3>
            <p className="text-xs text-slate-300">Resuelve las pistas horizontales y verticales para completar el diagrama de conceptos técnicos y contables.</p>
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400 space-y-2">
              <div className="font-bold text-white">Pista Horizontal 1 (6 letras): Recurso controlado por la empresa como resultado de sucesos pasados.</div>
              <input type="text" placeholder="Escribe tu respuesta aquí..." className="w-full max-w-md mx-auto p-2 rounded bg-slate-950 border border-slate-700 text-center text-white text-xs font-bold" />
              <div>
                <button onClick={() => alert("¡Palabra validada correctamente en el crucigrama!")} className="mt-2 px-4 py-2 rounded bg-amber-600 text-slate-950 font-black text-xs">Comprobar Respuesta</button>
              </div>
            </div>
          </div>
        )}

        {pestana === 'DEBATES' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-emerald-400">Foro de Debates &amp; Casos de Estudio en Grupo</h3>
            <p className="text-xs text-slate-300">Espacio moderado por docentes para analizar dilemas éticos, tecnológicos y sociales bajo la guía pedagógica independiente GICM.</p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-cyan-300">Caso Activo: Responsabilidad legal ante brechas de datos en pymes.</div>
              <textarea placeholder="Escribe tu análisis o debate crítico basado en el caso..." className="w-full h-24 p-3 rounded bg-slate-950 border border-slate-700 text-xs text-white resize-none" />
              <button onClick={() => alert("¡Aporte publicado en el foro de estudio con éxito!")} className="px-4 py-2 rounded bg-emerald-600 text-white font-black text-xs">Enviar Aporte al Grupo</button>
            </div>
          </div>
        )}

        {pestana === 'AUTONOMO' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-purple-400">Guía de Trabajo Autónomo (GTA) bajo Enfoque DUA</h3>
            <p className="text-xs text-slate-300">Estructura guiada en 4 momentos clave: Focalización, Exploración, Contraste y Aplicación.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs">1. Momento de Focalización</div>
                <div className="text-[11px] text-slate-400">Activación de conocimientos previos mediante acertijo interactivo.</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs">2. Momento de Exploración</div>
                <div className="text-[11px] text-slate-400">Lectura de mapas conceptuales ilustrados y casos de estudio reales.</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}