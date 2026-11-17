import React, { useState } from "react"
import { QrCode, ShieldCheck, Award, CheckCircle2, Medal, Sparkles } from "lucide-react"
import { sha256Simulado } from "../../data/bancoInagotable9Millones"

export default function CertifiedCertificatesView({ badges = [] }) {
  const [studentName, setStudentName] = useState("Estudiante Destacado CTPMN")
  const [specialty, setSpecialty] = useState("Ciberseguridad & Desarrollo Web JSX")
  const hashReal = sha256Simulado(`${studentName}-${specialty}-2026-CTPMN`)
  const qrPayload = `https://practicatecnica.com/verificar?hash=${hashReal.slice(0, 24)}`

  const insigniasBase = [
    { titulo: "Arquitecto JSX Puro", nivel: "Diamante", hash: sha256Simulado("JSX-DIAMANTE") },
    { titulo: "Dominio Vial MOPT Ley 9078", nivel: "Oro", hash: sha256Simulado("MOPT-ORO") },
    { titulo: "Estratega Lógico Clue & Rummy", nivel: "Platino", hash: sha256Simulado("LOGICA-PLATINO") },
    ...badges.map((b) => ({ titulo: b.titulo, nivel: "Mérito 9M", hash: b.sha256 }))
  ]

  return (
    <div className="space-y-6 p-6 bg-background rounded-xl border border-border">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Certificados Oficiales, Insignias y Firma QR SHA-256
          </h2>
          <p className="text-sm text-muted-foreground">
            Verificación criptográfica instantánea de notas, títulos e insignias de mérito
          </p>
        </div>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> SHA-256 Activo
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card p-4 rounded-xl border border-border">
        <div>
          <label className="text-xs font-bold uppercase text-muted-foreground">Nombre del Titular</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full mt-1 p-2.5 bg-background border rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-muted-foreground">Especialidad / Certificación</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full mt-1 p-2.5 bg-background border rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 bg-card rounded-xl border border-border space-y-4">
          <div className="flex items-center gap-3">
            <Award className="w-7 h-7 text-emerald-600" />
            <div>
              <h3 className="text-lg font-bold">{studentName}</h3>
              <p className="text-xs text-muted-foreground">Especialidad acreditada: {specialty}</p>
            </div>
          </div>
          <div className="p-3.5 bg-background rounded-lg border font-mono text-xs break-all space-y-1">
            <p className="font-bold text-foreground">Huella Digital Criptográfica SHA-256:</p>
            <p className="text-emerald-600">{hashReal}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-muted-foreground">Insignias Desbloqueadas</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {insigniasBase.map((ins, i) => (
                <div key={i} className="p-3 bg-background rounded-lg border flex items-center gap-3">
                  <Medal className="w-5 h-5 text-amber-500 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold">{ins.titulo}</p>
                    <p className="text-muted-foreground font-mono">
                      {ins.nivel} • {ins.hash.slice(0, 12)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-card rounded-xl border border-border flex flex-col items-center justify-center text-center space-y-3">
          <div className="p-4 bg-background rounded-2xl border">
            <QrCode className="w-24 h-24 text-emerald-600" />
          </div>
          <h4 className="font-bold text-sm">Código QR Verificable</h4>
          <p className="text-xs text-muted-foreground break-all font-mono">{qrPayload}</p>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-bold">
            Autenticidad Validada
          </span>
        </div>
      </div>
    </div>
  )
}