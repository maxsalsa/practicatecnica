import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Layers, Cpu, DollarSign, Award, ArrowRight } from 'lucide-react';

export default function SelectorUniversoMEP() {
  const [modalidad, setModalidad] = useState('TECNICA_CTP');
  const [especialidad, setEspecialidad] = useState('CONTABILIDAD');
  const [cantidadItems, setCantidadItems] = useState(20);
  const [iniciado, setIniciado] = useState(false);

  const especialidadesTecnicas = [
    { id: 'CONTABILIDAD', nombre: 'Contabilidad y Finanzas (Accounting)', icono: DollarSign },
    { id: 'CIBERSEGURIDAD', nombre: 'Ciberseguridad y Redes', icono: ShieldCheck },
    { id: 'SOFTWARE', nombre: 'Desarrollo de Software', icono: Cpu },
    { id: 'SECRETARIADO', nombre: 'Ejecutivo para Centros de Servicio', icono: Layers },
    { id: 'ELECTRONICA', nombre: 'Electrotecnia y Electrónica', icono: Cpu }
  ];

  const modalidadesMEP = [
    { id: 'ACADEMICA', nombre: 'Secundaria Académica (7° a 11°/12°)' },
    { id: 'TECNICA_CTP', nombre: 'Colegios Técnicos Profesionales (CTP)' },
    { id: 'ADULTO_IPEC', nombre: 'Educación de Adultos (IPEC / CINDEA)' },
    { id: 'PREESCOLAR_PRIMARIA', nombre: 'Preescolar y Primaria' }
  ];

  if (iniciado) {
    return (
      <div className="max-w-4xl mx-auto my-6 p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl space-y-6 text-slate-100">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30">
              SIMULACRO ACTIVO · {cantidadItems} ÍTEMS
            </span>
            <h2 className="text-lg md:text-2xl font-black text-white mt-1">
              {especialidad} ({modalidad})
            </h2>
          </div>
          <button
            onClick={() => setIniciado(false)}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs"
          >
            Cambiar Filtros 🔄
          </button>
        </div>

        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-center">
          <p className="text-sm text-slate-300">
            Generando banco de <strong className="text-cyan-400">{cantidadItems} preguntas oficiales</strong> adaptadas al currículo de Costa Rica con trazabilidad y explicaciones DUA.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => alert(`¡Simulacro de ${cantidadItems} preguntas completado con éxito!`)}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg"
            >
              Finalizar y Ver Calificación &amp; Certificado 🎓
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-slate-100">
      <div className="border-b border-slate-800 pb-4">
        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/30">
          UNIVERSO MEP · 100% COSTA RICA
        </span>
        <h2 className="text-xl md:text-3xl font-black text-white mt-2">
          Selecciona tu Especialidad, Nivel y Duración de Práctica
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Acceso total para CTPs, Colegios Académicos, IPEC, CINDEA y Educación de Adultos.
        </p>
      </div>

      <div className="space-y-4">
        {/* 1. SELECCIONAR MODALIDAD */}
        <div>
          <label className="block text-xs font-bold text-cyan-400 mb-2">1. Selecciona la Modalidad / Subsistema MEP:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {modalidadesMEP.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setModalidad(mod.id)}
                className={`p-3 rounded-xl text-left text-xs font-black transition-all border ${modalidad === mod.id ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'}`}
              >
                {mod.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* 2. SELECCIONAR ESPECIALIDAD TÉCNICA O ACADÉMICA */}
        <div>
          <label className="block text-xs font-bold text-amber-400 mb-2">2. Selecciona la Especialidad o Asignatura:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {especialidadesTecnicas.map((esp) => {
              const IconoComponente = esp.icono;
              return (
                <button
                  key={esp.id}
                  onClick={() => setEspecialidad(esp.id)}
                  className={`p-3 rounded-xl text-left text-xs font-black transition-all border flex items-center gap-2 ${especialidad === esp.id ? 'bg-amber-600 text-slate-950 border-amber-400 shadow-lg' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'}`}
                >
                  <IconoComponente className="h-4 w-4 shrink-0" />
                  <span>{esp.nombre}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. SELECCIONAR CANTIDAD DE ÍTEMS (15, 20, 30) */}
        <div>
          <label className="block text-xs font-bold text-emerald-400 mb-2">3. Longitud de la Práctica (Cantidad de Ítems):</label>
          <div className="flex gap-3">
            {[15, 20, 30].map((num) => (
              <button
                key={num}
                onClick={() => setCantidadItems(num)}
                className={`flex-1 py-3 rounded-xl font-black text-xs transition-all border ${cantidadItems === num ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg' : 'bg-slate-950 text-slate-300 border-slate-800'}`}
              >
                {num} Preguntas 🎯
              </button>
            ))}
          </div>
        </div>

        {/* BOTÓN DE ARRANCAR */}
        <button
          onClick={() => setIniciado(true)}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2"
        >
          <span>Iniciar Práctica / Simulacro del Universo MEP</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}