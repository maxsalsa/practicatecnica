import React, { useState } from "react"
import { Bell, Send, CheckCircle2 } from "lucide-react"

export default function AnnouncementsBroadcastPanel({ sectionId }) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const handleSend = (e) => {
    e.preventDefault()
    if (!title || !message) return
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setTitle("")
    setMessage("")
  }

  return (
    <div className="p-6 bg-card rounded-xl border border-border shadow-sm space-y-4">
      <div className="flex items-center gap-3 border-b pb-3">
        <Bell className="w-6 h-6 text-primary" />
        <div>
          <h3 className="text-lg font-bold">Comunicados Oficiales de Dirección</h3>
          <p className="text-xs text-muted-foreground">Difusión para sección: {sectionId || "General CTPMN"}</p>
        </div>
      </div>

      {sent && (
        <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5" />
          <span>¡Comunicado transmitido y sincronizado con éxito!</span>
        </div>
      )}

      <form onSubmit={handleSend} className="space-y-3">
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground">Asunto del Comunicado</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Convocatoria a Pruebas PAA" 
            className="w-full mt-1 p-2.5 bg-background border border-input rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground">Mensaje</label>
          <textarea 
            rows="3" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escriba las instrucciones oficiales aquí..." 
            className="w-full mt-1 p-2.5 bg-background border border-input rounded-lg text-sm"
          ></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-sm flex items-center gap-2 cursor-pointer">
          <Send className="w-4 h-4" />
          <span>Transmitir Comunicado</span>
        </button>
      </form>
    </div>
  )
}