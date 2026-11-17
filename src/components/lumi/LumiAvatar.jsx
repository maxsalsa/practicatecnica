import React from "react"

export default function LumiAvatar({ state = "feliz", message }) {
  const expressions = {
    feliz: { emoji: "🐧🎓", text: "¡Buen día! Hoy es un gran día para aprender algo nuevo en Práctica Técnica.", bg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" },
    pensando: { emoji: "🤔💭", text: "Tómese su tiempo, analice las premisas y descarte con calma.", bg: "bg-blue-500/10 text-blue-600 border-blue-500/30" },
    logro: { emoji: "⭐🎉", text: "¡Excelente trabajo! La constancia Kaizen da frutos excepcionales.", bg: "bg-amber-500/10 text-amber-600 border-amber-500/30" }
  }
  const current = expressions[state] || expressions.feliz
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border ${current.bg} shadow-sm`}>
      <div className="text-4xl p-2 bg-background rounded-full shadow-inner">{current.emoji}</div>
      <div>
        <span className="font-bold text-sm">Lumi (Mentor Lumora - CTPMN)</span>
        <p className="text-sm mt-1">{message || current.text}</p>
      </div>
    </div>
  )
}