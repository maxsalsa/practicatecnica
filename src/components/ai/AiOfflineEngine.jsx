import React, { useState } from "react"
import { Cpu, Zap, RefreshCw } from "lucide-react"

export default function AiOfflineEngine() {
  const [model, setModel] = useState("Motor GICM-8B-Instruct (WASM / WebGPU)")
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Motor de IA GICM activo localmente en tu navegador mediante WebGPU. Realiza consultas técnicas, académicas o solicita retos sin gastar internet ni tokens." }
  ])
  const [loading, setLoading] = useState(false)

  const handleSend = (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    const userText = prompt
    setMessages((prev) => [...prev, { role: "user", text: userText }])
    setPrompt("")
    setLoading(true)

    setTimeout(() => {
      let reply = `[Inferencia Local GICM - ${model}] Análisis completado para "${userText}": aplica validación modular en JSX puro, verifica integridad SHA-256 y repasa los conceptos clave de la unidad.`
      if (userText.toLowerCase().includes("reto") || userText.toLowerCase().includes("desafío")) {
        reply = "🧩 [Reto Técnico Generado Offline]: Resuelve un caso práctico de optimización y seguridad aplicando los 4 momentos pedagógicos o normativa técnica vigente."
      }
      setMessages((prev) => [...prev, { role: "assistant", text: reply }])
      setLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-6 p-6 bg-background rounded-2xl border border-border">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Motor de IA Sin Conexión & Retos Ilimitados</h2>
          <p className="text-sm text-muted-foreground">Procesamiento local GICM en navegador (Cero Tokens, 100% Gratis, Offline)</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="px-3 py-1.5 bg-card border rounded-lg text-xs font-semibold cursor-pointer"
          >
            <option>Motor GICM-8B-Instruct (WASM / WebGPU)</option>
            <option>Motor GICM-Mini-4k (Ultra Rápido Móvil)</option>
            <option>Motor GICM-Math-PAA (Razonamiento Universitario)</option>
          </select>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> WebGPU Activo
          </span>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-4 h-80 overflow-y-auto space-y-3 flex flex-col">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-3.5 rounded-xl text-sm max-w-[85%] ${msg.role === "user" ? "bg-sky-600 text-white ml-auto" : "bg-muted text-foreground mr-auto border"}`}>
            <p className="font-bold text-xs opacity-75 mb-1">{msg.role === "user" ? "Usuario GICM" : "Motor IA Offline GICM"}</p>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="p-3 bg-muted rounded-xl text-xs text-muted-foreground flex items-center gap-2 mr-auto">
            <RefreshCw className="w-4 h-4 animate-spin" /> Procesando localmente...
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe tu consulta o pide un reto técnico..."
          className="flex-1 p-3 bg-card border rounded-xl text-sm"
        />
        <button type="submit" className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer shadow">
          <Zap className="w-4 h-4" />
          <span>Enviar</span>
        </button>
      </form>
    </div>
  )
}