import React, { useState, useEffect } from "react"
import {
  AREAS_OFICIALES_9M,
  NIVELES_DIFICULTAD,
  obtenerLoteAleatorio9M
} from "../../data/bancoInagotable9Millones"
import {
  Brain,
  Shuffle,
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  ShieldCheck,
  Award,
  Flame
} from "lucide-react"

export default function PracticeArena9M({ onEarnBadge }) {
  const [areaId, setAreaId] = useState("ciberseguridad")
  const [dificultad, setDificultad] = useState("mixto")
  const [modo, setModo] = useState("simulacro")
  const [seed, setSeed] = useState(() => `USER-${Math.floor(Math.random() * 999999)}`)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)

  const cargarNuevoSorteo = () => {
    const nuevoSeed = `USER-${Math.floor(Math.random() * 9999999)}-${Date.now()}`
    setSeed(nuevoSeed)
    const lote = obtenerLoteAleatorio9M({
      areaId,
      dificultad,
      usuarioSeed: nuevoSeed,
      cantidad: 15
    })
    setQuestions(lote)
    setCurrentIndex(0)
    setSelectedOption(null)
  }

  useEffect(() => {
    cargarNuevoSorteo()
  }, [areaId, dificultad, modo])

  const currentQ = questions[currentIndex]

  const responder = (idx) => {
    if (selectedOption !== null) return
    setSelectedOption(idx)
    if (idx === currentQ.answer) {
      const nuevoScore = score + 100
      const nuevaRacha = streak + 1
      setScore(nuevoScore)
      setStreak(nuevaRacha)
      if (onEarnBadge && nuevaRacha % 3 === 0) {
        onEarnBadge({
          titulo: `Dominio ${currentQ.area} (${currentQ.dificultad})`,
          puntos: nuevoScore,
          sha256: currentQ.sha256
        })
      }
    } else {
      setStreak(0)
    }
  }

  const siguientePregunta = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(null)
    } else {
      cargarNuevoSorteo()
    }
  }

  return (
    <div className="space-y-6 p-6 bg-background rounded-xl border border-border">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Banco Inagotable de 9,000,000 de Reactivos — Aleatorio Multi-Nivel
          </h2>
          <p className="text-sm text-muted-foreground">
            3M Dificultad Baja + 3M Dificultad Media + 3M Dificultad Alta • Sorteo único por estudiante ({seed})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-amber-500/10 text-amber-600 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <Flame className="w-4 h-4" /> Racha: {streak}
          </span>
          <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <Trophy className="w-4 h-4" /> {score} pts
          </span>
          <button
            onClick={cargarNuevoSorteo}
            className="px-3.5 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Shuffle className="w-4 h-4" /> Mezclar Universo 9M
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-card p-4 rounded-xl border border-border">
        <div>
          <label className="text-xs font-bold uppercase text-muted-foreground">
            Área / Especialidad (900,000 ítems c/u)
          </label>
          <select
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
            className="w-full mt-1 p-2.5 bg-background border rounded-lg text-sm font-medium"
          >
            {AREAS_OFICIALES_9M.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre} ({a.total.toLocaleString()} ítems)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-muted-foreground">
            Nivel de Dificultad (3M por nivel)
          </label>
          <select
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
            className="w-full mt-1 p-2.5 bg-background border rounded-lg text-sm font-medium"
          >
            {NIVELES_DIFICULTAD.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-muted-foreground">
            Modalidad Activa
          </label>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {[
              { id: "simulacro", label: "Simulacro" },
              { id: "trivia", label: "Trivia Rápida" },
              { id: "liga", label: "Liga Nacional" }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setModo(m.id)}
                className={`py-2 px-2 rounded-lg text-xs font-bold cursor-pointer border ${
                  modo === m.id ? "bg-primary text-primary-foreground" : "bg-background"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {currentQ && (
        <div className="p-6 bg-card rounded-xl border border-border space-y-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-bold">
              {currentQ.area} • Modalidad: {modo.toUpperCase()}
            </span>
            <span className="font-mono text-muted-foreground">
              Ítem {currentIndex + 1} de {questions.length} • ID: {currentQ.id} • Hash: {currentQ.sha256.slice(0, 16)}...
            </span>
          </div>

          <h3 className="text-base md:text-lg font-bold leading-relaxed">{currentQ.stem}</h3>

          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((opt, idx) => {
              const esSeleccionada = selectedOption === idx
              const esCorrecta = idx === currentQ.answer
              let claseBoton = "bg-background hover:bg-muted border-border"
              if (selectedOption !== null) {
                if (esCorrecta) claseBoton = "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                else if (esSeleccionada) claseBoton = "bg-red-500/15 border-red-500 text-red-700 dark:text-red-300"
              }
              return (
                <button
                  key={idx}
                  onClick={() => responder(idx)}
                  className={`w-full text-left p-4 rounded-xl border font-medium text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${claseBoton}`}
                >
                  <span>
                    <strong className="mr-2">{String.fromCharCode(65 + idx)}.</strong>
                    {opt}
                  </span>
                  {selectedOption !== null && esCorrecta && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {selectedOption !== null && esSeleccionada && !esCorrecta && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </button>
              )
            })}
          </div>

          {selectedOption !== null && (
            <div className="p-4 bg-background rounded-xl border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <p className="font-bold text-emerald-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Fundamentación Técnica Verificada:
                </p>
                <p className="text-muted-foreground">{currentQ.explanation}</p>
              </div>
              <button
                onClick={siguientePregunta}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-xs shrink-0 cursor-pointer"
              >
                Siguiente Reactivo Aleatorio →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}