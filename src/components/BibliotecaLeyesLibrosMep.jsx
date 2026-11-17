import React, { useState } from 'react';

const DOCUMENTOS_OFICIALES_Y_LIBROS = [
  {
    id: 'ley-9635',
    categoria: 'Leyes, Decretos e Impuestos',
    titulo: 'Ley N.° 9635 — Fortalecimiento de las Finanzas Públicas (IVA 13% y Renta)',
    autor: 'República de Costa Rica (Dominio Público Oficial)',
    resumen: 'Regulación oficial del Impuesto al Valor Agregado (13% general, 4%, 2% educación, 1% canasta básica) e Impuesto sobre las Utilidades y Renta.',
    icono: '⚖️'
  },
  {
    id: 'ley-8968',
    categoria: 'Leyes, Decretos e Impuestos',
    titulo: 'Ley N.° 8968 — Protección de la Persona frente al Tratamiento de sus Datos Personales',
    autor: 'PRODHAB / Asamblea Legislativa CR',
    resumen: 'Garantiza la autodeterminación informativa, el consentimiento informado y la privacidad de los expedientes estudiantiles y ciudadanos.',
    icono: '🛡️'
  },
  {
    id: 'ley-7600',
    categoria: 'Leyes, Decretos e Impuestos',
    titulo: 'Ley N.° 7600 y Decreto DUA — Igualdad de Oportunidades y Adecuaciones Curriculares',
    autor: 'MEP / República de Costa Rica',
    resumen: 'Fundamento jurídico del Diseño Universal para el Aprendizaje (DUA) y apoyos educativos de acceso, no significativos y significativos.',
    icono: '🤝'
  },
  {
    id: 'decreto-rea',
    categoria: 'Leyes, Decretos e Impuestos',
    titulo: 'Decreto Ejecutivo N.° 40862-MEP — Reglamento de Evaluación de los Aprendizajes (REA)',
    autor: 'Ministerio de Educación Pública (MEP)',
    resumen: 'Normativa de Trabajo Cotidiano, Tareas, Proyectos, Pruebas, justificación de ausencias/tardías (3 días hábiles) y conducta.',
    icono: '📜'
  },
  {
    id: 'prog-contabilidad',
    categoria: 'Programas de Estudio MEP',
    titulo: 'Programa Oficial de Contabilidad, Finanzas y Accounting (10°, 11° y 12° CTP)',
    autor: 'DETCE — Ministerio de Educación Pública',
    resumen: 'Subáreas de Gestión Contable NIIF, Costos, Finanzas, Tributación Aplicada, Planillas y Hoja Electrónica Financiera.',
    icono: '📊'
  },
  {
    id: 'prog-diseno-digital',
    categoria: 'Programas de Estudio MEP',
    titulo: 'Programa Oficial de Diseño y Desarrollo Digital / Desarrollo Web y Ciberseguridad',
    autor: 'DETCE — Ministerio de Educación Pública',
    resumen: 'Arquitectura UI/UX, Programación Frontend y Backend, Bases de Datos, Ciberseguridad, Redes y Emprendimiento Digital.',
    icono: '💻'
  },
  {
    id: 'libro-circuitos',
    categoria: 'Libros y Folletos Libres',
    titulo: 'Folleto Abierto de Electrónica Industrial, Electromecánica y Circuitos Digitales',
    autor: 'Edición Abierta Educativa (Creative Commons Zero)',
    resumen: 'Guía ilustrada de Ley de Ohm, Leyes de Kirchhoff, Compuertas Lógicas, Microcontroladores y Motores Trifásicos.',
    icono: '🔌'
  },
  {
    id: 'libro-logistica',
    categoria: 'Libros y Folletos Libres',
    titulo: 'Manual Libre de Administración, Logística, Distribución y Servicio al Cliente',
    autor: 'Edición Abierta Educativa (Libre de Derechos de Autor)',
    resumen: 'Cadena de suministro, control de inventarios PEPS/Promedio, Incoterms, aduanas, protocolo corporativo y CRM.',
    icono: '📦'
  }
];

export default function BibliotecaLeyesLibrosMep() {
  const [filtroCat, setFiltroCat] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');

  const docsFiltrados = DOCUMENTOS_OFICIALES_Y_LIBROS.filter((d) => {
    const okCat = filtroCat === 'Todas' || d.categoria === filtroCat;
    const okTxt = (d.titulo + ' ' + d.resumen).toLowerCase().includes(busqueda.toLowerCase());
    return okCat && okTxt;
  });

  const abrirFolletoPdf = (doc) => {
    const w = window.open('', '_blank', 'width=850,height=650');
    if (!w) return;
    w.document.write(`
      <html>
        <head>
          <title>${doc.titulo}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #0f172a; line-height: 1.6; }
            .head { background: #0f172a; color: #38bdf8; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
            .box { border: 1px solid #cbd5e1; padding: 16px; border-radius: 10px; background: #f8fafc; }
          </style>
        </head>
        <body>
          <div class="head">
            <h1 style="margin:0;font-size:20px;">${doc.icono} ${doc.titulo}</h1>
            <p style="margin:6px 0 0 0;color:#e2e8f0;font-size:12px;">${doc.autor} • Material Educativo Abierto / Dominio Público</p>
          </div>
          <div class="box">
            <h3>Síntesis Pedagógica y Fundamento Oficial</h3>
            <p>${doc.resumen}</p>
            <p><strong>Uso autorizado:</strong> Libre consulta, impresión y descarga para estudiantes, docentes y centros educativos de Costa Rica en pracTICAtecnica.com.</p>
          </div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    w.document.close();
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-2xl shadow-2xl space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-700">
            📚 Acervo Abierto Libre de Derechos de Autor & Normativa Nacional
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-2">
            Programas de Estudio MEP, Libros, Folletos, Leyes, Decretos e Impuestos de Costa Rica
          </h2>
        </div>

        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="🔍 Buscar ley, impuesto, programa o libro..."
          className="w-full lg:w-72 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {['Todas', 'Programas de Estudio MEP', 'Leyes, Decretos e Impuestos', 'Libros y Folletos Libres'].map((c) => (
          <button
            key={c}
            onClick={() => setFiltroCat(c)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold ${
              filtroCat === c ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-300 border border-slate-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docsFiltrados.map((doc) => (
          <div key={doc.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl">{doc.icono}</span>
                <span className="text-[10px] font-bold bg-slate-900 text-cyan-300 px-2.5 py-0.5 rounded border border-slate-800">
                  {doc.categoria}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white">{doc.titulo}</h3>
              <p className="text-[11px] text-amber-300 font-semibold mt-0.5">{doc.autor}</p>
              <p className="text-xs text-slate-300 mt-2">{doc.resumen}</p>
            </div>
            <button
              onClick={() => abrirFolletoPdf(doc)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-xs transition-all"
            >
              📥 Abrir / Descargar Folleto en PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}