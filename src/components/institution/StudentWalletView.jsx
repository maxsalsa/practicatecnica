import React, { useState } from "react"
import { QrCode, Wallet, PiggyBank, ShieldCheck } from "lucide-react"

export default function StudentWalletView() {
  const [showQrModal, setShowQrModal] = useState(false)
  return (
    <div className="space-y-6 p-6 bg-background rounded-xl border border-border">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">CoopePago — Billetera Estudiantil</h2>
          <p className="text-sm text-muted-foreground">Gestión financiera escolar y soda (CTPMN)</p>
        </div>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-semibold">Seguro & Cifrado</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Saldo Disponible</span>
            <h3 className="text-3xl font-extrabold mt-1">₡4,850</h3>
          </div>
          <button onClick={() => setShowQrModal(true)} className="mt-6 w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer shadow">
            <QrCode className="w-5 h-5" />
            <span>Mostrar QR Estudiantil</span>
          </button>
        </div>
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Alcancía: Gira Técnica</span>
            <h3 className="text-2xl font-bold mt-1">₡12,500 <span className="text-xs text-muted-foreground">/ ₡15,000</span></h3>
          </div>
          <p className="text-xs text-muted-foreground mt-4 pt-2 border-t">Fondo reservado protegido de gastos diarios.</p>
        </div>
      </div>
      {showQrModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card p-6 rounded-2xl border border-border max-w-sm w-full text-center space-y-4 shadow-xl">
            <h3 className="text-lg font-bold">QR Dinámico CoopePago</h3>
            <div className="p-6 bg-white rounded-xl inline-block mx-auto">
              <div className="w-48 h-48 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs font-mono">[ QR TOKEN SECURE ]</div>
            </div>
            <button onClick={() => setShowQrModal(false)} className="w-full py-2.5 bg-muted text-foreground rounded-lg font-bold text-sm cursor-pointer">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  )
}