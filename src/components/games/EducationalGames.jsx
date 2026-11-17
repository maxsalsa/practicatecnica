import React, { useState } from "react"
import { ShieldCheck, Brain, Puzzle, Award } from "lucide-react"

export default function EducationalGames() {
  const [activeGame, setActiveGame] = useState("clue")

  return (
    <div className="space-y-6 p-6 bg-background rounded-xl border border-border">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Arena de Juegos Educativos (Cero Violencia)</h2>
          <p className="text-sm text-muted-foreground">Clue Lógico Educativo & Rummy Cub Conceptual (CTPMN)</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setActiveGame("clue")} className={`px-4 py-2 rounded-lg font-bold text-sm cursor-pointer ${activeGame === "clue" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
            Clue Educativo
          </button>
          <button onClick={() => setActiveGame("rummy")} className={`px-4 py-2 rounded-lg font-bold text-sm cursor-pointer ${activeGame === "rummy" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
            Rummy Cub
          </button>
        </div>
      </div>

      {activeGame === "clue" ? (
        <div className="p-6 bg-card rounded-xl border border-border space-y-4">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold">Misterio Lógico: ¿Quién descifró el algoritmo?</h3>
          </div>
          <p className="text-sm text-muted-foreground">Resuelva las pistas deducidas de las premisas de programación y bases de datos para hallar al autor del código correcto sin violencia.</p>
          <div className="p-4 bg-background rounded-lg border space-y-2 text-sm">
            <p><strong>Pista 1:</strong> El desarrollador usó React y JSX puro.</p>
            <p><strong>Pista 2:</strong> No utilizó TypeScript en el proyecto.</p>
            <p><strong>Pista 3:</strong> Trabaja en CTP Mercedes Norte.</p>
            <div className="pt-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-bold">Solución validada: Ing. Max Salazar Sánchez</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-card rounded-xl border border-border space-y-4">
          <div className="flex items-center gap-3">
            <Puzzle className="w-6 h-6 text-amber-500" />
            <h3 className="text-lg font-bold">Rummy Cub: Series y Escalas Matemáticas</h3>
          </div>
          <p className="text-sm text-muted-foreground">Agrupe fichas numéricas y algebraicas en secuencias lógicas para dominar el cálculo de probabilidades.</p>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-4 bg-background rounded-lg border font-mono font-bold text-lg text-blue-600">[ 7 ] [ 8 ] [ 9 ]</div>
            <div className="p-4 bg-background rounded-lg border font-mono font-bold text-lg text-emerald-600">[ X ] [ X ] [ X ]</div>
            <div className="p-4 bg-background rounded-lg border font-mono font-bold text-lg text-amber-600">[ 12 ] [ 13 ] [ 14 ]</div>
            <div className="p-4 bg-background rounded-lg border font-mono font-bold text-lg text-purple-600">[ A ] [ B ] [ C ]</div>
          </div>
        </div>
      )}
    </div>
  )
}