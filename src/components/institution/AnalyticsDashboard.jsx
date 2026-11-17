import React, { useState } from "react"
import { Users, BookOpen, DollarSign, Activity, TrendingUp, ShieldCheck } from "lucide-react"

export default function AnalyticsDashboard() {
  const [metrics] = useState({
    totalStudents: 1250,
    activeExams: 48,
    monthlyRevenue: "₡485,000",
    conversionRate: "18.4%"
  })

  return (
    <div className="space-y-6 p-6 bg-background rounded-xl border border-border">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Panel de Control & Analíticas</h2>
          <p className="text-sm text-muted-foreground">Monitoreo en tiempo real del ecosistema Práctica Técnica (Neon DB)</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>SuperAdmin Mode</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-card rounded-lg border border-border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">Estudiantes Registrados</p>
            <h3 className="text-2xl font-bold mt-1">{metrics.totalStudents}</h3>
            <span className="text-xs text-emerald-500 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +12% este mes
            </span>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 bg-card rounded-lg border border-border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">Simulacros Activos</p>
            <h3 className="text-2xl font-bold mt-1">{metrics.activeExams}</h3>
            <span className="text-xs text-muted-foreground mt-1 block">Pruebas MEP y Admisiones</span>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 bg-card rounded-lg border border-border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">Ingresos Mensuales</p>
            <h3 className="text-2xl font-bold mt-1">{metrics.monthlyRevenue}</h3>
            <span className="text-xs text-emerald-500 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> SINPE / Pasarelas
            </span>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 bg-card rounded-lg border border-border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">Tasa de Conversión</p>
            <h3 className="text-2xl font-bold mt-1">{metrics.conversionRate}</h3>
            <span className="text-xs text-muted-foreground mt-1 block">Visitante a Suscriptor</span>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
            <Activity className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  )
}