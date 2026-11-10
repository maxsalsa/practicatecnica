import React, { useState } from 'react';
import { Download, BookOpen, ShieldCheck, Award, FileText, CheckCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function GeneradorLibrosPDF() {
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState('MATEMATICA');
  const [nivel, setNivel] = useState('Secundaria / CTP');

  const libroConfig = {
    MATEMATICA: { titulo: "Matemática Aplicada - Nivel Editorial GICM", unidades: "Unidad 1 a 4: Álgebra, Geometría y Razonamiento" },
    ESPANOL: { titulo: "Español y Literatura - Nivel Editorial GICM", unidades: "Unidad 1 a 4: Comprensión Lectora y Gramática" },
    RELIGION: { titulo: "Educación Religiosa - Nivel Editorial GICM", unidades: "Unidad 1 a 4: Ética, Valores y Antropología" },
    HOGAR: { titulo: "Educación para el Hogar - Nivel Editorial GICM", unidades: "Unidad 1 a 4: Nutrición, Economía Familiar y Gestión" },
    CONTABILIDAD: { titulo: "Contabilidad y Finanzas (Accounting) - CTP", unidades: "Unidad 1 a 4: Estados Financieros, IVA y Ecuación Patrimonial" },
    CIBERSEGURIDAD: { titulo: "Ciberseguridad y Redes - CTP", unidades: "Unidad 1 a 4: Triada CIA, Firewalls y Mitigación de Ataques" }
  };

  const actual = libroConfig[asignaturaSeleccionada] || libroConfig.MATEMATICA;

  const descargarPDFReal = () => {
    const doc = new jsPDF();
    
    // Portada del Libro PDF Editorial GICM
    doc.setFillColor(15, 23, 42); // Fondo oscuro editorial
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("EDITORIAL INDEPENDIENTE GICM", 20, 30);
    
    doc.setFontSize(16);
    doc.setTextColor(56, 189, 248);
    doc.text(actual.titulo, 20, 45);
    
    doc.setFontSize(12);
    doc.setTextColor(203, 213, 225);
    doc.text(`Nivel Académico / Técnico: ${nivel}`, 20, 60);
    doc.text(`Estructura: ${actual.unidades}`, 20, 70);
    doc.text("Propietario: Ing. Max Salazar Sánchez (www.practicatecnica.com)", 20, 85);
    
    doc.setLineWidth(0.5);
    doc.setStrokeColor(56, 189, 248);
    doc.line(20, 95, 190, 95);
    
    // Contenido del Libro / Plan Pedagógico
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text("1. Resumen Teórico y Saberes Esenciales", 20, 115);
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text("Este compendio integra la teoría oficial desarrollada bajo los más altos estándares", 20, 125);
    doc.text("pedagógicos y enfoque DUA (Gatear, Correr, Al Espacio). Diseñado para estudio autónomo.", 20, 132);
    
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text("2. Casos de Estudio Reales y Práctica Guiada", 20, 155);
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text("Incluye análisis de situaciones de entorno real, resolución de ejercicios con 3 intentos", 20, 165);
    doc.text("y retroalimentación nemotécnica inmediata.", 20, 172);

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text("3. Simulacros y Autoevaluación Ciega", 20, 195);
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text("Evaluaciones cronometradas de 60 ítems con certificación y código QR al cierre.", 20, 205);

    // Pie de página
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("© 2026 GICM · Todos los derechos reservados. Uso exclusivo para estudiantes y docentes.", 20, 280);

    // Guardar archivo PDF descargable
    doc.save(`Libro_Editorial_${asignaturaSeleccionada}_GICM.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-slate-100">
      
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/30">
            BIBLIOTECA EDITORIAL GICM · DESCARGA DE LIBROS PDF
          </span>
          <h2 className="text-xl md:text-2xl font-black text-white mt-2">
            Descarga de Libros Ilustrados y Planes Pedagógicos (PDF Real)
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-cyan-400 mb-2">Seleccione la Asignatura o Especialidad:</label>
          <select 
            value={asignaturaSeleccionada}
            onChange={(e) => setAsignaturaSeleccionada(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-bold"
          >
            <option value="MATEMATICA">Matemática</option>
            <option value="ESPANOL">Español y Literatura</option>
            <option value="RELIGION">Educación Religiosa</option>
            <option value="HOGAR">Educación para el Hogar</option>
            <option value="CONTABILIDAD">Contabilidad y Finanzas (Accounting)</option>
            <option value="CIBERSEGURIDAD">Ciberseguridad y Redes</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-emerald-400 mb-2">Nivel Educativo:</label>
          <select 
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-bold"
          >
            <option value="Primaria y Ciclo Materno">Primaria / Preescolar</option>
            <option value="Secundaria Académica">Secundaria Académica (7° a 11°)</option>
            <option value="Secundaria Técnica CTP">Colegio Técnico Profesional (CTP)</option>
            <option value="Educación de Adultos (IPEC/CINDEA)">Educación de Adultos</option>
          </select>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-center">
        <h3 className="font-black text-white text-base">{actual.titulo}</h3>
        <p className="text-xs text-slate-300">
          Estructura curricular completa que incluye: Resúmenes neutrales, mapas conceptuales, casos de estudio reales, ejercicios guiados con 3 intentos y planes de práctica pedagógica.
        </p>

        <button
          onClick={descargarPDFReal}
          className="px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 mx-auto"
        >
          <Download className="h-5 w-5" />
          <span>Descargar Libro Editorial en PDF Oficial (Gratis)</span>
        </button>
      </div>
    </div>
  );
}