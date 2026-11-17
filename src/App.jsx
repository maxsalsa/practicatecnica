import React, { useState } from "react"
import AnalyticsDashboard from "./components/institution/AnalyticsDashboard"
import AnnouncementsBroadcastPanel from "./components/institution/AnnouncementsBroadcastPanel"
import StudentWalletView from "./components/institution/StudentWalletView"
import LumiAvatar from "./components/lumi/LumiAvatar"
import { BarChart3, Bell, Wallet, Bot } from "lucide-react"

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary text-primary-foreground rounded-lg font-bold">PT</div>
          <div>
            <h1 className="text-lg font-bold">Práctica Técnica .com</h1>
            <p className="text-xs text-muted-foreground">Ecosistema MEP — CTP Mercedes Norte (Max Salazar)</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-full font-medium">Producción Activa</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r bg-card p-4 space-y-2 hidden md:block">
          <p className="text-xs font-semibold text-muted-foreground uppercase px-3 mb-2">Módulos GICM</p>
          <button onClick={() => setActiveTab("dashboard")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === "dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
            <BarChart3 className="w-4 h-4" /><span>Analíticas SuperAdmin</span>
          </button>
          <button onClick={() => setActiveTab("announcements")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === "announcements" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
            <Bell className="w-4 h-4" /><span>Comunicados Oficiales</span>
          </button>
          <button onClick={() => setActiveTab("wallet")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === "wallet" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
            <Wallet className="w-4 h-4" /><span>CoopePago & Alcancía</span>
          </button>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto bg-background space-y-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <LumiAvatar state="feliz" />
            {activeTab === "dashboard" && <AnalyticsDashboard />}
            {activeTab === "announcements" && <AnnouncementsBroadcastPanel sectionId="11-Tecnico" />}
            {activeTab === "wallet" && <StudentWalletView />}
          </div>
        </main>
      </div>
    </div>
  )
}