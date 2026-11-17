import React, { useState } from "react"
import { Bell, Send, CheckCircle2, AlertCircle } from "lucide-react"

export default function AnnouncementsBroadcastPanel({ sectionId }) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState("normal")
  const [status, setStatus] = useState(null)

  const handleSendBroadcast = (e) => {
    e.preventDefault()
    if (!title.trim() || !message.trim()) return

    // Simulación de inyección Neon DB / Canal MEP
    console.log("Emitiendo comunicado oficial a sección:", sectionId, { title, message, priority })
    setStatus("success")
    setTitle("")
    setMessage("")
    setTimeout(() => setStatus(null), 4000)
  }

  return (
    <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Bell className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Comunicados Oficiales de Dirección</h3>
          <p className="text-sm text-muted-foreground">Difusión directa a chats de estudiantes y canales oficiales MEP</p>
        </div>
      </div>

      {status === "success" && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-emerald-600 text-sm">
          <CheckCircle2 className="w-4 h-4" />
          <span>Comunicado transmitido y registrado en la base de datos central.</span>
        </div>
      )}

      <form onSubmit={handleSendBroadcast} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título del Comunicado</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Directrices para Pruebas Nacionales..."
            className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mensaje Institucional</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escriba las directrices claras para la sección..."
            rows={4}
            className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Prioridad</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-3 py-1.5 bg-background border border-input rounded-md text-sm"
            >
              <option value="normal">Normal</option>
              <option value="importante">Importante</option>
              <option value="urgente">Urgente / Oficial</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 flex items-center gap-2 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Emitir Comunicado</span>
          </button>
        </div>
      </form>
    </div>
  )
}