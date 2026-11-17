import React, { useState } from "react"
import { FileText, Sparkles, CheckCircle2 } from "lucide-react"

export default function AutoPlan() {
  const [subject, setSubject] = useState("Ciberseguridad")
  const [level, setLevel] = useState("12° Técnico")
  const [generated, setGenerated] = useState(false)

  const handleGenerate = (e) => {
    e.preventDefault()
    setGenerated(true)
  }

  return (
    <div className="space-y-6 p-6 bg-background rounded-xl border border-border">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Generador Industrial de Planeamientos & Exámenes</h2>
          <p className="text-sm text-muted-foreground">Estructura oficial MEP 4 Momentos con Enfoque Co-creativo y DUA</p>
        </div>
        <span className="px-3 py-1 bg-purple-500/10 text-purple-600 rounded-full text-xs font-semibold">Antigravity Engine</span>
      </div>

      <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-card p-6 rounded-xl border border-border">
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground">Materia / Especialidad</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full mt-1 p-2.5 bg-background border rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground">Nivel</label>
          <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} className="w-full mt-1 p-2.5 bg-background border rounded-lg text-sm" />
        </div>
        <div className="flex items-end">
          <button type="submit" className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow">
            <Sparkles className="w-4 h-4" />
            <span>Generar OER Automático</span>
          </button>
        </div>
      </form>

      {generated && (
        <div className="p-6 bg-card rounded-xl border border-border space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Planeamiento e Instrumento de Evaluación generados con éxito para {subject} ({level})</span>
          </div>
          <div className="p-4 bg-background rounded-lg border text-xs space-y-2 font-mono">
            <p><strong>1. Enfocarse:</strong> El docente introduce el caso de estudio... El estudiante analiza el escenario base.</p>
            <p><strong>2. Exploración:</strong> El docente facilita entornos prácticos... El estudiante ejecuta pruebas de concepto.</p>
            <p><strong>3. Contraste:</strong> El docente modera debate técnico... El estudiante contrasta resultados con la norma.</p>
            <p><strong>4. Aplicación:</strong> El docente evalúa el entregable... El estudiante despliega la solución en producción.</p>
          </div>
        </div>
      )}
    </div>
  )
}