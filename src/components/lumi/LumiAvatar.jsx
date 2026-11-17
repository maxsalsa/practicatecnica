import React from "react"

export default function LumiAvatar() {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-sky-500/30 bg-sky-500/5">
      <div className="flex items-center gap-3.5">
        <img
          src="/favicon.svg"
          alt="Emblema Oficial Práctica Técnica GICM"
          className="w-12 h-12 object-contain drop-shadow-md select-none"
          style={{ background: "transparent" }}
        />
        <div>
          <h3 className="text-sm font-extrabold text-sky-400">
            Práctica Técnica .com — Plataforma Oficial GICM & BDS Devs
          </h3>
          <p className="text-xs text-muted-foreground">
            Aprender, Repasar, Simular y Actualizar • Fábrica Automática de Planeamientos, Cotidianos, Proyectos y Exámenes.
          </p>
        </div>
      </div>
      <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
        Identidad Soberana GICM
      </span>
    </div>
  )
}