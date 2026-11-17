import React, { useState } from "react"
import {
  FileText,
  ClipboardList,
  FolderKanban,
  FileCheck2,
  Printer
} from "lucide-react"

const CATALOGO_CURRICULAR_MEP = {
  "Especialidad Técnica (CTP)": {
    subareas: [
      "Ciberseguridad",
      "Desarrollo Web Full-Stack",
      "Soporte TI y Redes",
      "Diseño de Software",
      "Programación y Bases de Datos",
      "Herramientas de Producción Digital",
      "Contabilidad y Finanzas",
      "Electromecánica y Metrología",
      "English for Communication"
    ],
    niveles: ["10° Nivel Técnico", "11° Nivel Técnico", "12° Nivel Técnico"],
    unidades: [
      "Unidad 1: Arquitectura, Diagnóstico y Seguridad Operativa",
      "Unidad 2: Implementación Práctica, Código Limpio y Automatización",
      "Unidad 3: Auditoría de Calidad, Despliegue en Producción y Mejora Continua"
    ]
  },
  "Asignatura Académica (MEP)": {
    subareas: [
      "Matemática",
      "Ciencias (Física / Química / Biología)",
      "Español y Literatura",
      "Estudios Sociales",
      "Educación Cívica",
      "Inglés Académico"
    ],
    niveles: ["7° Año", "8° Año", "9° Año", "10° Académico", "11° Académico"],
    unidades: [
      "Unidad 1: Fundamentos Analíticos y Comprensión del Entorno",
      "Unidad 2: Resolución de Problemas en Contextos Reales",
      "Unidad 3: Pensamiento Crítico y Proyección Comunitaria"
    ]
  }
}

export default function AutoPlan({ user }) {
  const [modalidad, setModalidad] = useState("Especialidad Técnica (CTP)")
  const [subarea, setSubarea] = useState("Ciberseguridad")
  const [nivel, setNivel] = useState("12° Nivel Técnico")
  const [unidad, setUnidad] = useState("Unidad 1: Arquitectura, Diagnóstico y Seguridad Operativa")
  const [seccion, setSeccion] = useState("12-1")
  const [docenteNombre, setDocenteNombre] = useState(user?.name || "Ing. Max Salazar Sánchez")
  const [enfoqueSteam, setEnfoqueSteam] = useState("Laboratorio Práctico + Reto Co-creativo STEAM")
  const [activeDocTab, setActiveDocTab] = useState("planeamiento")

  const handleModalidadChange = (nuevaMod) => {
    setModalidad(nuevaMod)
    const config = CATALOGO_CURRICULAR_MEP[nuevaMod]
    setSubarea(config.subareas[0])
    setNivel(config.niveles[0])
    setUnidad(config.unidades[0])
  }

  const configActual = CATALOGO_CURRICULAR_MEP[modalidad]

  return (
    <div className="space-y-6 p-4 md:p-6 bg-background rounded-2xl border border-border">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
            Fábrica Pedagógica Automática — Planeamientos, Cotidianos, Proyectos y Exámenes
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Columnas oficiales MEP • 4 Momentos Cronopedagógicos • DUA y Alto Potencial integrados
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir / Exportar PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-card p-4 rounded-2xl border border-border">
        <div>
          <label className="text-[11px] font-bold uppercase text-muted-foreground">1. Modalidad</label>
          <select
            value={modalidad}
            onChange={(e) => handleModalidadChange(e.target.value)}
            className="w-full mt-1 p-2.5 bg-background border rounded-xl text-xs font-bold"
          >
            {Object.keys(CATALOGO_CURRICULAR_MEP).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase text-muted-foreground">2. Subárea / Asignatura</label>
          <select
            value={subarea}
            onChange={(e) => setSubarea(e.target.value)}
            className="w-full mt-1 p-2.5 bg-background border rounded-xl text-xs font-bold"
          >
            {configActual.subareas.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase text-muted-foreground">3. Nivel</label>
          <select
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="w-full mt-1 p-2.5 bg-background border rounded-xl text-xs font-bold"
          >
            {configActual.niveles.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase text-muted-foreground">4. Unidad de Estudio</label>
          <select
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            className="w-full mt-1 p-2.5 bg-background border rounded-xl text-xs font-bold"
          >
            {configActual.unidades.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase text-muted-foreground">5. Docente y Sección</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={docenteNombre}
              onChange={(e) => setDocenteNombre(e.target.value)}
              className="flex-1 p-2.5 bg-background border rounded-xl text-xs font-bold"
            />
            <input
              type="text"
              value={seccion}
              onChange={(e) => setSeccion(e.target.value)}
              className="w-20 p-2.5 bg-background border rounded-xl text-xs font-bold text-center"
            />
          </div>
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase text-muted-foreground">6. Mediación STEAM</label>
          <select
            value={enfoqueSteam}
            onChange={(e) => setEnfoqueSteam(e.target.value)}
            className="w-full mt-1 p-2.5 bg-background border rounded-xl text-xs font-bold"
          >
            <option>Laboratorio Práctico + Reto Co-creativo STEAM</option>
            <option>Estudio de Caso Real + Debate Técnico Estructurado</option>
            <option>Prototipado Rápido + Defensa ante Pares</option>
            <option>Simulación de Incidente + Resolución Colaborativa</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { id: "planeamiento", label: "1. Planeamiento MEP", sub: "4 Momentos + DUA", icon: FileText },
          { id: "cotidianos", label: "2. Trabajos Cotidianos", sub: "3 Prácticas + Rúbricas 1-3", icon: ClipboardList },
          { id: "proyecto", label: "3. Proyecto Automático", sub: "4 Etapas + Evaluación", icon: FolderKanban },
          { id: "examen", label: "4. Examen + Tabla", sub: "Prueba + Especificaciones", icon: FileCheck2 }
        ].map((tab) => {
          const Icon = tab.icon
          const active = activeDocTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDocTab(tab.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                active ? "bg-emerald-600 text-white border-emerald-600 shadow-lg" : "bg-card hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <div>
                <p className="text-xs font-extrabold">{tab.label}</p>
                <p className="text-[11px] opacity-85">{tab.sub}</p>
              </div>
            </button>
          )
        })}
      </div>

      {activeDocTab === "planeamiento" && (
        <div className="p-5 bg-card rounded-2xl border border-border space-y-4 text-xs">
          <div className="border-b pb-3 flex flex-wrap justify-between gap-2">
            <div>
              <p className="font-extrabold text-sm">
                PLAN DE PRÁCTICA PEDAGÓGICA — {subarea.toUpperCase()} ({nivel})
              </p>
              <p className="text-muted-foreground">
                Docente: <strong>{docenteNombre}</strong> • Sección: <strong>{seccion}</strong> • {unidad}
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full font-bold">
              {enfoqueSteam}
            </span>
          </div>
          <p><strong>1. Enfocarse (20 min):</strong> El docente presenta un escenario diagnóstico real de {subarea}. El estudiante analiza las variables críticas y formula una propuesta técnica inicial.</p>
          <p><strong>2. Exploración (40 min):</strong> El docente facilita recursos de experimentación práctica en {subarea}. El estudiante construye un prototipo funcional registrando evidencias verificables.</p>
          <p><strong>3. Contraste (40 min):</strong> El docente guía la revisión cruzada con estándares oficiales. El estudiante contrasta sus resultados, corrige errores y documenta la mejora.</p>
          <p><strong>4. Aplicación (60 min):</strong> El docente asigna un reto integrador para la sección {seccion}. El estudiante despliega la solución final con ajustes DUA y extensión de Alto Potencial.</p>
        </div>
      )}

      {activeDocTab === "cotidianos" && (
        <div className="p-5 bg-card rounded-2xl border border-border grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-4 bg-background rounded-xl border space-y-2">
              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-bold">
                Trabajo Cotidiano #{n}
              </span>
              <p className="font-bold text-sm">Práctica Guiada #{n} de {subarea}</p>
              <p className="text-muted-foreground">
                El docente plantea el escenario práctico #{n}. El estudiante resuelve y documenta la solución técnica con rúbrica de niveles Inicial (1), Intermedio (2) y Avanzado (3).
              </p>
            </div>
          ))}
        </div>
      )}

      {activeDocTab === "proyecto" && (
        <div className="p-5 bg-card rounded-2xl border border-border grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-background rounded-xl border">
            <p className="font-bold text-emerald-400">Fase 1 y 2: Diagnóstico y Diseño ({subarea})</p>
            <p className="text-muted-foreground mt-1">Definición del problema real, arquitectura de la solución y cronograma de entregas para la sección {seccion}.</p>
          </div>
          <div className="p-4 bg-background rounded-xl border">
            <p className="font-bold text-sky-400">Fase 3 y 4: Implementación y Defensa Técnica</p>
            <p className="text-muted-foreground mt-1">Construcción del prototipo funcional, pruebas de calidad y demostración pública evaluada con rúbrica analítica.</p>
          </div>
        </div>
      )}

      {activeDocTab === "examen" && (
        <div className="p-5 bg-card rounded-2xl border border-border space-y-3 text-xs">
          <p className="font-extrabold text-sm">
            Prueba Escrita Oficial + Tabla de Especificaciones — {subarea} ({nivel})
          </p>
          <p className="text-muted-foreground">
            Total: 35 pts • Selección de Respuesta (15 pts) + Respuesta Construida / Casos Prácticos (20 pts) con solucionario verificado.
          </p>
        </div>
      )}
    </div>
  )
}