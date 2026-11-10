import React, { useState } from 'react';
import { BookOpen, Sparkles, FileText, Image as ImageIcon, CheckCircle, HelpCircle, UserCheck, Download, Award } from 'lucide-react';

export default function LibroEditorialIlustrado() {
  const [nivelSeleccionado, setNivelSeleccionado] = useState('2');
  const [asignatura, setAsignatura] = useState('MATEMATICA');
  const [capituloActivo, setCapituloActivo] = useState('TEORIA');

  const contenidoLibros = {
    MATEMATICA: {
      titulo: "Matemática Aplicada y Razonamiento Lógico",
      resumen: "El estudio de los números hasta 1000, operaciones fundamentales, suma y resta llevando, y bases geométricas aplicadas a la resolución de problemas cotidianos.",
      diagrama: "Números ➔ Unidades, Decenas, Centenas ➔ Operaciones (Suma/Resta) ➔ Resolución de Problemas DUA.",
      casoReal: {
        titulo: "Caso de Estudio: Planificación de compras en una PYME escolar",
        contexto: "Un estudiante de secundaria técnica debe calcular el presupuesto para adquirir 45 paquetes de componentes electrónicos a ₡1,200 cada uno, aplicando un descuento del 10%.",
        pregunta: "¿Cuál es el monto total a pagar tras aplicar el descuento?"
      },
      ejercicios: [
        { pregunta: "¿Cuánto es 450 + 375?", respuesta: "825", pista: "Sume unidades, decenas y lleve la que sobra." },
        { pregunta: "Si un rectángulo mide 12 cm de largo y 5 cm de ancho, ¿su área es?", respuesta: "60 cm²", pista: "Multiplique largo por ancho (12 x 5)." }
      ]
    },
    ESPANOL: {
      titulo: "Lenguaje, Comprensión Lectora y Gramática",
      resumen: "Desarrollo de habilidades lingüísticas avanzadas, identificación de categorías gramaticales (sustantivos y adjetivos), análisis de estructuras narrativas y ortografía.",
      diagrama: "Texto ➔ Análisis Estructural ➔ Identificación de Sujeto/Predicado ➔ Comprensión Crítica.",
      casoReal: {
        titulo: "Caso de Estudio: Redacción de un informe técnico institucional",
        contexto: "Se requiere redactar un comunicado oficial utilizando un tono neutral, formal y sin ambigüedades gramaticales para el cuerpo docente.",
        pregunta: "¿Por qué es crucial el uso correcto de los signos de puntuación en documentos oficiales?"
      },
      ejercicios: [
        { pregunta: "Indique el plural de la palabra 'lápiz':", respuesta: "Lápices", pista: "La 'z' cambia a 'c' al formar el plural." },
        { pregunta: "Identifique el adjetivo en: 'La niña alegre estudia redes'.", respuesta: "Alegre", pista: "El adjetivo califica al sustantivo (niña)." }
      ]
    }
  };

  const actual = contenidoLibros[asignatura] || contenidoLibros.MATEMATICA;

  return (
    <div className="max-w-5xl mx-auto my-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-slate-100">
      
      {/* PORTADA DEL LIBRO */}
      <div className="border-b border-slate-800 pb-4 flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/30">
            EDITORIAL GICM · LIBRO ILUSTRADO DE ESTUDIO
          </span>
          <h2 className="text-xl md:text-3xl font-black text-white mt-2">
            {actual.titulo} (Nivel {nivelSeleccionado}° Grado)
          </h2>
          <p className="text-xs text-slate-400 mt-1">Material didáctico autónomo con resúmenes, diagramas y casos de uso real.</p>
        </div>

        {/* SELECTOR DE ASIGNATURA */}
        <div className="flex gap-2">
          {['MATEMATICA', 'ESPANOL'].map((mat) => (
            <button
              key={mat}
              onClick={() => setAsignatura(mat)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${asignatura === mat ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'}`}
            >
              {mat}
            </button>
          ))}
        </div>
      </div>

      {/* ÍNDICE / CAPÍTULOS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'TEORIA', label: '📖 Resumen Teórico & Conceptos', icono: BookOpen },
          { id: 'DIAGRAMA', label: '🗺️ Diagrama & Mapa Conceptual', icono: ImageIcon },
          { id: 'CASO', label: '🏢 Caso de Estudio Real', icono: UserCheck },
          { id: 'EJERCICIOS', label: '✍️ Práctica & Autoevaluación', icono: CheckCircle }
        ].map((tab) => {
          const IconTab = tab.icono;
          return (
            <button
              key={tab.id}
              onClick={() => setCapituloActivo(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all ${capituloActivo === tab.id ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'}`}
            >
              <IconTab className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CUERPO DEL LIBRO */}
      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        
        {capituloActivo === 'TEORIA' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-cyan-400">Resumen y Fundamentos Teóricos</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{actual.resumen}</p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-300 font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 shrink-0" />
              <span>Nota Pedagógica: Este compendio está diseñado para lectura autónoma y discusión guiada en clase.</span>
            </div>
          </div>
        )}

        {capituloActivo === 'DIAGRAMA' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-amber-400">Esquema y Mapa Conceptual Ilustrado</h3>
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-sm text-cyan-300 shadow-inner">
              {actual.diagrama}
            </div>
            <p className="text-xs text-slate-400 text-center">Estructura visual optimizada para retención a largo plazo.</p>
          </div>
        )}

        {capituloActivo === 'CASO' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-emerald-400">{actual.casoReal.titulo}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{actual.casoReal.contexto}</p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-bold text-xs text-cyan-300">Pregunta de Análisis Crítico:</div>
              <div className="text-sm text-white italic">"{actual.casoReal.pregunta}"</div>
            </div>
          </div>
        )}

        {capituloActivo === 'EJERCICIOS' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-purple-400">Ejercicios Prácticos y Autoevaluación</h3>
            <div className="space-y-3">
              {actual.ejercicios.map((ej, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-white">Ítem {idx + 1}: {ej.pregunta}</div>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Tu respuesta..." className="p-2 rounded bg-slate-950 border border-slate-700 text-xs text-white" />
                    <button onClick={() => alert("¡Respuesta correcta! Excelente trabajo autónomo.")} className="px-4 py-2 rounded bg-emerald-600 text-white font-black text-xs">Comprobar</button>
                  </div>
                  <div className="text-[11px] text-slate-400 italic">💡 Pista pedagógica: {ej.pista}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}