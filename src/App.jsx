import React, { useState } from "react"
import AnalyticsDashboard from "./components/institution/AnalyticsDashboard"
import AnnouncementsBroadcastPanel from "./components/institution/AnnouncementsBroadcastPanel"
import { Shield, Bell, BarChart3, Home, LogOut } from "lucide-react"

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Barra Superior Institucional */}
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary text-primary-foreground rounded-lg font-bold">
            PT
          </div>
          <div>
            <h1 className="text-lg font-bold">Práctica Técnica .com</h1>
            <p className="text-xs text-muted-foreground">Ecosistema Educativo MEP — CTP Mercedes Norte (SuperAdmin: Max Salazar)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-full font-medium">
            Producción Activa
          </span>
        </div>
      </header>

      {/* Cuerpo Principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar de Navegación Manual */}
        <aside className="w-64 border-r bg-card p-4 space-y-2 hidden md:block">
          <p className="text-xs font-semibold text-muted-foreground uppercase px-3 mb-2">Módulos de Gestión</p>
          
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analíticas SuperAdmin</span>
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "announcements" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Comunicados Oficiales</span>
          </button>
        </aside>

        {/* Contenido Dinámico */}
        <main className="flex-1 p-6 overflow-y-auto bg-background">
          <div className="max-w-6xl mx-auto">
            {activeTab === "dashboard" && <AnalyticsDashboard />}
            {activeTab === "announcements" && <AnnouncementsBroadcastPanel sectionId="11-Tecnico" />}
          </div>
        </main>
      </div>
    </div>
  )
}