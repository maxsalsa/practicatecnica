import React, { useState } from "react"
import { Utensils, Calendar, Clock, ShieldCheck, QrCode } from "lucide-react"

export default function SchoolServicesPanel() {
  const [tab, setTab] = useState("comedor")
  const [scanned, setScanned] = useState(false)

  return (
    <div className="space-y-6 p-6 bg-background rounded-xl border border-border">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Servicios Estudiantiles CTPMN</h2>
          <p className="text-sm text-muted-foreground">Comedor, Control QR de Almuerzos y Horarios Institucionales</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setTab("comedor")} className={`px-4 py-2 rounded-lg font-bold text-sm cursor-pointer ${tab === "comedor" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
            Comedor & QR
          </button>
          <button onClick={() => setTab("horarios")} className={`px-4 py-2 rounded-lg font-bold text-sm cursor-pointer ${tab === "horarios" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
            Horarios MEP
          </button>
        </div>
      </div>

      {tab === "comedor" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-card rounded-xl border border-border space-y-4">
            <div className="flex items-center gap-3">
              <Utensils className="w-6 h-6 text-emerald-500" />
              <h3 className="text-lg font-bold">Terminal de Comedor Estudiantil</h3>
            </div>
            <p className="text-xs text-muted-foreground">Escanee el carnet QR del estudiante para registrar el almuerzo diario (Doble modalidad: Becado MEP / Regular).</p>
            <button onClick={() => { setScanned(true); setTimeout(() => setScanned(false), 3000); }} className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer shadow">
              <QrCode className="w-5 h-5" />
              <span>Simular Escaneo QR Almuerzo</span>
            </button>
            {scanned && (
              <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-lg text-xs font-semibold">
                [OK] Almuerzo registrado con éxito. Beneficiario: 11-Técnico (₡0 Becado MEP).
              </div>
            )}
          </div>
          <div className="p-6 bg-card rounded-xl border border-border space-y-4">
            <h3 className="text-lg font-bold">Menú del Día CTPMN</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>🟢 <strong>Arroz con Pollo</strong> y ensalada fresca</li>
              <li>🥛 Fresco natural de frutas</li>
              <li>🍌 Postre: Fruta de temporada</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-card rounded-xl border border-border space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold">Horario Semanal — Bloques 40-80 min</h3>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            <div className="p-3 bg-muted rounded font-bold">Lunes</div>
            <div className="p-3 bg-muted rounded font-bold">Martes</div>
            <div className="p-3 bg-muted rounded font-bold">Miércoles</div>
            <div className="p-3 bg-muted rounded font-bold">Jueves</div>
            <div className="p-3 bg-muted rounded font-bold">Viernes</div>
          </div>
        </div>
      )}
    </div>
  )
}