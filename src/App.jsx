import React, { useState, useEffect } from "react"
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
import GoogleGmailAuth from "./components/auth/GoogleGmailAuth"
import SuperAdminAndPlansView from "./components/admin/SuperAdminAndPlansView"
import {
  esSuperAdmin,
  obtenerPlanUsuario,
  tienePermisoModulo
} from "./data/planesRbac"
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
  ShieldCheck,
  Crown,
  Lock
} from "lucide-react"

export default function App() {
  const [activeTab, setActiveTab] = useState("arena9m")
  const [earnedBadges, setEarnedBadges] = useState([])
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("pt_real_gmail_user")
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      return null
    }
  })

  const planActual = obtenerPlanUsuario(user)
  const soySuperAdmin = esSuperAdmin(user)

  const allNavItems = [
    { id: "superadmin_panel", label: "Planes & SuperAdmin", icon: Crown, alwaysVisible: true },
    { id: "arena9m", label: "Aprender / Repasar / Simular", icon: Brain },
    { id: "plans", label: "Planeamientos, Cotidianos y Exámenes", icon: FileText },
    { id: "driving", label: "Licencias MOPT (A/B/C)", icon: Car },
    { id: "games", label: "Clue & Rummy Lógico", icon: Puzzle },
    { id: "certs", label: "Certificados & Insignias QR", icon: Award },
    { id: "aioffline", label: "Tutor IA Sin Conexión", icon: Cpu },
    { id: "wallet", label: "CoopePago & Billetera", icon: Wallet },
    { id: "services", label: "Comedor & Horarios", icon: Utensils },
    { id: "announcements", label: "Comunicados Oficiales", icon: Bell },
    { id: "dashboard", label: "Analíticas Institucionales", icon: BarChart3 },
    { id: "qa", label: "Auditoría QA & PWA", icon: ShieldCheck }
  ]

  useEffect(() => {
    if (activeTab !== "superadmin_panel" && !tienePermisoModulo(user, activeTab)) {
      setActiveTab("superadmin_panel")
    }
  }, [user, activeTab])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="border-b bg-card px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/lumi-owl.svg"
            alt="Búho Azul Práctica Técnica"
            className="w-11 h-11 object-contain drop-shadow select-none"
            style={{ background: "transparent" }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-extrabold tracking-tight">
                Práctica Técnica .com [vv26.1.1d.01.14.09]
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${planActual.badge}`}>
                {soySuperAdmin ? "SUPERADMIN TOTAL" : planActual.nombre}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Asignaturas MEP • Especialidades CTP • Universidades • MOPT
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("superadmin_panel")}
            className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>{soySuperAdmin ? "Consola SuperAdmin" : "Cambiar / Comprar Plan"}</span>
          </button>
          <GoogleGmailAuth user={user} onAuthChange={setUser} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <aside className="w-full md:w-68 border-b md:border-b-0 md:border-r bg-card p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0">
          {allNavItems.map((item) => {
            const Icon = item.icon
            const permitido = item.alwaysVisible || tienePermisoModulo(user, item.id)
            const active = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-sky-600 text-white shadow"
                    : permitido
                    ? "hover:bg-muted text-foreground"
                    : "opacity-55 hover:bg-muted/50 text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {!permitido && <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
              </button>
            )
          })}
        </aside>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-background space-y-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <LumiAvatar state="sabio" />

            {activeTab === "superadmin_panel" && (
              <SuperAdminAndPlansView user={user} onUpdateUser={setUser} />
            )}

            {activeTab !== "superadmin_panel" && !tienePermisoModulo(user, activeTab) ? (
              <SuperAdminAndPlansView user={user} onUpdateUser={setUser} />
            ) : (
              <>
                {activeTab === "arena9m" && (
                  <PracticeArena9M
                    user={user}
                    onEarnBadge={(b) => setEarnedBadges((prev) => [b, ...prev])}
                  />
                )}
                {activeTab === "plans" && <AutoPlan user={user} />}
                {activeTab === "driving" && <DrivingAcademyView />}
                {activeTab === "games" && <EducationalGames />}
                {activeTab === "certs" && <CertifiedCertificatesView badges={earnedBadges} />}
                {activeTab === "aioffline" && <AiOfflineEngine />}
                {activeTab === "wallet" && <StudentWalletView />}
                {activeTab === "services" && <SchoolServicesPanel />}
                {activeTab === "announcements" && <AnnouncementsBroadcastPanel sectionId="General" />}
                {activeTab === "dashboard" && <AnalyticsDashboard />}
                {activeTab === "qa" && <QAReportDashboard />}
              </>
            )}
          </div>
        </main>
      </div>

      <InstallAppButton />
    </div>
  )
}