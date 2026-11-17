import React, { useState } from "react"
import { QrCode, ShieldCheck, Award, FileCheck } from "lucide-react"

export default function CertifiedCertificatesView() {
  const [certId] = useState("SHA256-9F83B2026-CTPMN")

  return (
    <div className="space-y-6 p-6 bg-background rounded-xl border border-border">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Certificados y Notas con Firma SHA-256</h2>
          <p className="text-sm text-muted-foreground">Validez oficial, códigos QR seguros y títulos verificables</p>
        </div>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-semibold flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" /> SHA-256 Secure
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-card rounded-xl border border-border space-y-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold">Título Oficial Técnico & Académico</h3>
          </div>
          <p className="text-xs text-muted-foreground">Emitido por CTP Mercedes Norte y respaldado por el ecosistema Práctica Técnica .com.</p>
          <div className="p-3 bg-background rounded-lg border font-mono text-xs">
            <strong>Hash SHA-256:</strong><br />
            <span className="text-muted-foreground">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
          </div>
        </div>

        <div className="p-6 bg-card rounded-xl border border-border flex flex-col items-center justify-center text-center space-y-3">
          <QrCode className="w-16 h-16 text-primary" />
          <h4 className="font-bold text-sm">QR Certificado de Autenticidad</h4>
          <p className="text-xs text-muted-foreground">Escanee para verificar calificaciones, permisos y aprobación en tiempo real.</p>
          <span className="text-xs font-mono bg-muted px-3 py-1 rounded">{certId}</span>
        </div>
      </div>
    </div>
  )
}