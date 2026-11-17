import React, { useState } from "react"
import { Cpu, Zap, ShieldCheck, Terminal, Award, RefreshCw } from "lucide-react"

export default function AiOfflineEngine() {
  const [model, setModel] = useState("Llama-3-8B-Instruct (WASM / WebGPU)")
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState([
    { role: "assistant", text: "¡Hola! Soy Lumi Offline. Estoy cargado localmente en tu navegador mediante WebGPU. Puedes hacerme preguntas técnicas, de programación o resolver retos sin gastar internet ni tokens." }
  ])
  const [loading, setLoading] = useState(false)

  const handleSend = (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    const userText = prompt
    setMessages(prev => [...prev, { role: "user", text: userText }])
    setPrompt("")
    setLoading(true)

    // Simulación de respuesta offline de alta velocidad con el modelo seleccionado
    setTimeout(() => {
      let reply = `[Modo Offline - ${model}] Análisis procesado localmente con éxito: Para resolver tu consulta sobre "${userText}", recuerda aplicar las buenas prácticas de desarrollo en React/JSX y seguir los lineamientos de arquitectura industrial GICM.`
      if (userText.toLowerCase().includes("reto") || userText.toLowerCase().includes("desafío")) {
        reply = `🧩 [Reto Técnico Generado Offline]: Diseña un componente en JavaScript/JSX que gestione un estado reactivo de 4 momentos pedagógicos sin usar TypeScript. ¡Valida tu código en el entorno!`
      }
      setMessages(prev => [...prev, { role: "assistant", text: reply }])
      setLoading(false)
    }, 800)
  }

  return (
    <div className="space-y-6 p-6 bg-background rounded-xl border border-border">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Motor de IA Offline & Retos Dinámicos</h2>
          <p className="text-sm text-muted-foreground">Procesamiento local en navegador (Cero Tokens, 100% Gratis, Sin Conexión)</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            className="px-3 py-1.5 bg-card border rounded-lg text-xs font-semibold cursor-pointer"
          >
            <option>Llama-3-8B-Instruct (WASM / WebGPU)</option>
            <option>Phi-3-mini-4k (Ultra Ligero Móvil)</option>
            <option>Mistral-7B-Instruct (Razonamiento PAA)</option>
          </select>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-semibold flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> WebGPU Active
          </span>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-4 h-96 overflow-y-auto space-y-3 flex flex-col shadow-inner">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-3.5 rounded-xl text-sm max-w-[85%] ${msg.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted text-foreground mr-auto border"}`}>
            <p className="font-semibold text-xs opacity-75 mb-1">{msg.role === "user" ? "Estudiante / Docente" : "Lumi Offline (Local Engine)"}</p>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="p-3 bg-muted rounded-xl text-xs text-muted-foreground animate-pulse flex items-center gap-2 mr-auto">
            <RefreshCw className="w-4 h-4 animate-spin" /> Procesando inferencia local en la GPU...
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input 
          type="text" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe tu pregunta, pide un reto técnico o solicita un desafío..." 
          className="flex-1 p-3 bg-card border border-input rounded-xl text-sm shadow-sm"
        />
        <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer shadow">
          <Zap className="w-4 h-4" />
          <span>Enviar Local</span>
        </button>
      </form>
    </div>
  )
}