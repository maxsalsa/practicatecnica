import React, { useState } from "react"
import { Car, Truck, Bike, ShieldCheck } from "lucide-react"

export default function DrivingAcademyView() {
  const [vehicle, setVehicle] = useState("moto")

  return (
    <div className="space-y-6 p-6 bg-background rounded-xl border border-border">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Academia de Manejo Profesional MOPT</h2>
          <p className="text-sm text-muted-foreground">Circuitos viales, normativas y simuladores para Motos, Carros y Camiones</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setVehicle("moto")} className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer ${vehicle === "moto" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
            Motos (Clase A)
          </button>
          <button onClick={() => setVehicle("carro")} className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer ${vehicle === "carro" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
            Carros (Clase B)
          </button>
          <button onClick={() => setVehicle("camion")} className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer ${vehicle === "camion" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
            Camiones (Clase C)
          </button>
        </div>
      </div>

      <div className="p-6 bg-card rounded-xl border border-border space-y-4">
        {vehicle === "moto" && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Bike className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-bold">Manejo de Motocicletas — Ley 9078</h3>
            </div>
            <p className="text-sm text-muted-foreground">Técnicas de frenado combinado, uso obligatorio de casco homologado, equilibrio en conos y respeto de puntos ciegos en carretera.</p>
          </div>
        )}
        {vehicle === "carro" && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Car className="w-6 h-6 text-emerald-500" />
              <h3 className="text-lg font-bold">Manejo de Automóviles — Ley 9078</h3>
            </div>
            <p className="text-sm text-muted-foreground">Dominio de retrovisores, parqueo en paralelo, incorporación segura a rotondas y prioridades de paso en intersecciones urbanas.</p>
          </div>
        )}
        {vehicle === "camion" && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-6 h-6 text-amber-500" />
              <h3 className="text-lg font-bold">Manejo de Camiones y Equipo Pesado (Clase C)</h3>
            </div>
            <p className="text-sm text-muted-foreground">Cálculo de radios de giro amplios, control de frenos de aire, distribución de carga máxima autorizada y manejo defensivo en pendientes.</p>
          </div>
        )}
        <div className="p-4 bg-background rounded-lg border text-xs font-semibold text-emerald-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Simulador vial homologado para pruebas teóricas y prácticas del MOPT.</span>
        </div>
      </div>
    </div>
  )
}