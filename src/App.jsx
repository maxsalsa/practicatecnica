import React, { useState } from "react"
import PracticeArena9M from "./components/institution/PracticeArena9M"
import AnalyticsDashboard from "./components/institution/AnalyticsDashboard"
import AnnouncementsBroadcastPanel from "./components/institution/AnnouncementsBroadcastPanel"
import StudentWalletView from "./components/institution/StudentWalletView"
import SchoolServicesPanel from "./components/institution/SchoolServicesPanel"
import DrivingAcademyView from "./components/institution/DrivingAcademyView"
import CertifiedCertificatesView from "./components/institution/CertifiedCertificatesView"
import QAReportDashboard from "./components/institution/QAReportDashboard"
import EducationalGames from "./components/games/EducationalGames"
import AutoPlan from "./components/plan/AutoPlan"
import AiOfflineEngine from "./components/ai/AiOfflineEngine"
import LumiAvatar from "./components/lumi/LumiAvatar"
import InstallAppButton from "./components/InstallAppButton"
import {
  Brain,
  BarChart3,
  Bell,
  Wallet,
  Utensils,
  Car,
  Award,
  Puzzle,
  FileText,
  Cpu,
  ShieldCheck
} from "lucide-react"

export default function App() {
  const [activeTab, setActiveTab] = useState("arena9m")
  const [earnedBadges, setEarnedBadges] = useState([])

  const navItems = [
    { id: "arena9m", label: "Banco 9M & Simulacros", icon: Brain },
    { id: "driving", label: "Academia Vial MOPT", icon: Car },
    { id: "games", label: "Clue & Rummy Cub", icon: Puzzle },
    { id: "certs", label: "Certificados & Insignias QR", icon: Award },
    { id: "wallet", label: "CoopePago & Alcancía", icon: Wallet },
    { id: "services", label: "Comedor & Horarios", icon: Utensils },
    { id: "aioffline", label: "IA Offline & Retos", icon: Cpu },
    { id: "plans", label: "Planeamientos MEP", icon: FileText },
    { id: "announcements", label: "Comunicados Oficiales", icon: Bell },
    { id: "dashboard", label: "Analíticas SuperAdmin", icon: BarChart3 },
    { id: "qa", label: "Auditoría QA / UX / PWA", icon: ShieldCheck }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="border-b bg-card px-4 md:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600 text-white rounded-xl font-extrabold text-sm">PT</div>
          <div>
            <h1 className="text-base md:text-lg font-bold">Práctica Técnica .com</h1>
            <p className="text-xs text-muted-foreground">
              9,000,000 Reactivos • CTP Mercedes Norte • Ing. Max Salazar Sánchez
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full font-bold">
            9M Activos • Cero En Construcción
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r bg-card p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  active ? "bg-emerald-600 text-white shadow" : "hover:bg-muted text-foreground"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </aside>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-background space-y-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <LumiAvatar state="feliz" />
            {activeTab === "arena9m" && (
              <PracticeArena9M
                onEarnBadge={(b) => setEarnedBadges((prev) => [b, ...prev])}
              />
            )}
            {activeTab === "driving" && <DrivingAcademyView />}
            {activeTab === "games" && <EducationalGames />}
            {activeTab === "certs" && <CertifiedCertificatesView badges={earnedBadges} />}
            {activeTab === "wallet" && <StudentWalletView />}
            {activeTab === "services" && <SchoolServicesPanel />}
            {activeTab === "aioffline" && <AiOfflineEngine />}
            {activeTab === "plans" && <AutoPlan />}
            {activeTab === "announcements" && <AnnouncementsBroadcastPanel sectionId="11-Tecnico" />}
            {activeTab === "dashboard" && <AnalyticsDashboard />}
            {activeTab === "qa" && <QAReportDashboard />}
          </div>
        </main>
      </div>

      <InstallAppButton />
    </div>
  )
}