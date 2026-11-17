import React, { useState, useEffect, useMemo } from "react"
import {
  CATALOGO_MULTIVERSO,
  DIFICULTADES_MULTIVERSO,
  generarLoteMultiverso
} from "../../data/bancoInagotable9Millones"
import {
  Search,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  Flame,
  Layers,
  RefreshCw,
  ArrowRight,
  ShieldCheck
} from "lucide-react"

export default function PracticeArena9M({ onEarnBadge, user }) {
  const [busqueda, setBusqueda] = useState("")
  const [grupoFiltro, setGrupoFiltro] = useState("Todos")
  const [materiaId, setMateriaId] = useState("uni-ucr-una")
  const [dificultad, setDificultad] = useState("multiverso")
  const [modoAccion, setModoAccion] = useState("simular") // aprender | repasar | simular | actualizar
  const [seed, setSeed] = useState(() => `KMZ-${Math.floor(Math.random() * 999999)}`)
  const [items, setItems] = useState([])
  const [indice, setIndice] = useState(0)
  const [seleccion, setSeleccion] = useState(null)
  const [mostrarReverso, setMostrarReverso] = useState(false)
  const [puntos, setPuntos] = useState(0)
  const [racha, setRacha] = useState(0)
  const [versionBanco, setVersionBanco] = useState(1)

  const gruposDisponibles = ["Todos", "Universidades", "Especialidades CTP", "Asignaturas MEP", "Licencias MOPT"]

  const materiasFiltradas = useMemo(() => {
    return CATALOGO_MULTIVERSO.filter((m) => {
      const coincideGrupo = grupoFiltro === "Todos" || m.grupo === grupoFiltro
      const coincideTexto =
        !busqueda.trim() ||
        m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        m.grupo.toLowerCase().includes(busqueda.toLowerCase())
      return coincideGrupo && coincideTexto
    })
  }, [busqueda, grupoFiltro])

  const sincronizarLote = () => {
    const nuevaSemilla = `${user?.email || "invitado"}-${Date.now()}-${Math.random()}`
    setSeed(nuevaSemilla)
    const nuevoLote = generarLoteMultiverso({
      materiaId,
      dificultad,
      semillaUsuario: nuevaSemilla,
      cantidad: 15
    })
    setItems(nuevoLote)
    setIndice(0)
    setSeleccion(null)
    setMostrarReverso(false)
    setVersionBanco((v) => v + 1)
  }

  useEffect(() => {
    sincronizarLote()
  }, [materiaId, dificultad])

  const itemActual = items[indice]

  const elegirOpcion = (idx) => {
    if (seleccion !== null) return
    setSeleccion(idx)
    if (idx === itemActual.answer) {
      const nuevosPuntos = puntos + 100
      const nuevaRacha = racha + 1
      setPuntos(nuevosPuntos)
      setRacha(nuevaRacha)
      if (onEarnBadge && nuevaRacha % 3 === 0) {
        onEarnBadge({
          titulo: `${itemActual.materia} (${itemActual.dificultad})`,
          puntos: nuevosPuntos,
          sha256: itemActual.sha256
        })
      }
    } else {
      setRacha(0)
    }
  }

  const avanzar = () => {
    if (indice + 1 < items.length) {
      setIndice(indice + 1)
      setSeleccion(null)
      setMostrarReverso(false)
    } else {
      sincronizarLote()
    }
  }

  return (
    <div className="space-y-5 p-4 md:p-6 bg-background rounded-2xl border border-border">
      {/* BARRA SUPERIOR SIMPLE, INTUITIVA Y RÁPIDA DE ENCONTRAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
            Centro de Estudio Multiverso — Rápido, Intuitivo y 100% Original
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Encuentra tu materia al instante y elige entre <strong>Aprender, Repasar, Simular o Actualizar</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-amber-500/10 text-amber-600 rounded-xl text-xs font-bold flex items-center gap-1">
            <Flame className="w-4 h-4" /> Racha: {racha}
          </span>
          <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-xl text-xs font-bold flex items-center gap-1">
            <Trophy className="w-4 h-4" /> {puntos} pts
          </span>
        </div>
      </div>

      {/* BUSCADOR RÁPIDO + FILTRO DE CATEGORÍAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-card p-4 rounded-xl border border-border">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar asignatura, especialidad o universidad..."
            className="w-full pl-9 pr-3 py-2 bg-background border rounded-xl text-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {gruposDisponibles.map((g) => (
            <button
              key={g}
              onClick={() => setGrupoFiltro(g)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer border ${
                grupoFiltro === g ? "bg-emerald-600 text-white border-emerald-600" : "bg-background"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div>
          <select
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
            className="w-full py-2 px-3 bg-background border rounded-xl text-sm font-semibold"
          >
            {DIFICULTADES_MULTIVERSO.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SELECTOR RÁPIDO DE MATERIA / ESPECIALIDAD / UNIVERSIDAD */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {materiasFiltradas.map((m) => (
          <button
            key={m.id}
            onClick={() => setMateriaId(m.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              materiaId === m.id
                ? "bg-primary text-primary-foreground shadow"
                : "bg-card hover:bg-muted text-foreground"
            }`}
          >
            <span className="opacity-75 mr-1">[{m.grupo}]</span> {m.nombre}
          </button>
        ))}
      </div>

      {/* LOS 4 MODOS NUCLEARES: APRENDER | REPASAR | SIMULAR | ACTUALIZAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setModoAccion("aprender")}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
            modoAccion === "aprender"
              ? "bg-emerald-600 text-white border-emerald-600 shadow-lg"
              : "bg-card hover:bg-muted"
          }`}
        >
          <BookOpen className="w-5 h-5 shrink-0" />
          <div>
            <p className="text-xs font-extrabold uppercase">1. Aprender</p>
            <p className="text-[11px] opacity-85">Guía paso a paso y fórmula</p>
          </div>
        </button>

        <button
          onClick={() => setModoAccion("repasar")}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
            modoAccion === "repasar"
              ? "bg-blue-600 text-white border-blue-600 shadow-lg"
              : "bg-card hover:bg-muted"
          }`}
        >
          <Layers className="w-5 h-5 shrink-0" />
          <div>
            <p className="text-xs font-extrabold uppercase">2. Repasar</p>
            <p className="text-[11px] opacity-85">Tarjetas rápidas de memoria</p>
          </div>
        </button>

        <button
          onClick={() => setModoAccion("simular")}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
            modoAccion === "simular"
              ? "bg-purple-600 text-white border-purple-600 shadow-lg"
              : "bg-card hover:bg-muted"
          }`}
        >
          <Sparkles className="w-5 h-5 shrink-0" />
          <div>
            <p className="text-xs font-extrabold uppercase">3. Simular</p>
            <p className="text-[11px] opacity-85">Examen real con puntaje</p>
          </div>
        </button>

        <button
          onClick={() => {
            setModoAccion("actualizar")
            sincronizarLote()
          }}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
            modoAccion === "actualizar"
              ? "bg-amber-600 text-white border-amber-600 shadow-lg"
              : "bg-card hover:bg-muted"
          }`}
        >
          <RefreshCw className="w-5 h-5 shrink-0" />
          <div>
            <p className="text-xs font-extrabold uppercase">4. Actualizar</p>
            <p className="text-[11px] opacity-85">Regenerar banco (v{versionBanco}.0)</p>
          </div>
        </button>
      </div>

      {/* CONTENIDO SEGÚN EL MODO ELEGIDO */}
      {itemActual && modoAccion === "aprender" && (
        <div className="p-6 bg-card rounded-2xl border border-border space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-bold text-emerald-600 uppercase">
              Modo Aprender • {itemActual.materia} ({itemActual.dificultad})
            </span>
            <span>Lección {indice + 1} de {items.length}</span>
          </div>
          <h3 className="text-lg font-bold">{itemActual.stem}</h3>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2 text-sm">
            <p className="font-bold text-emerald-700 dark:text-emerald-300">Concepto Clave:</p>
            <p>{itemActual.conceptoResumen}</p>
            <p className="font-mono text-xs bg-background p-2.5 rounded-lg border">
              {itemActual.formulaClave}
            </p>
          </div>
          <div className="p-4 bg-background rounded-xl border space-y-1 text-sm">
            <p className="font-bold text-foreground">Resolución Demostrada:</p>
            <p className="text-emerald-600 font-semibold">✔ {itemActual.options[itemActual.answer]}</p>
            <p className="text-xs text-muted-foreground mt-1">{itemActual.explanation}</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={avanzar}
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Siguiente Lección</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {itemActual && modoAccion === "repasar" && (
        <div className="p-6 bg-card rounded-2xl border border-border space-y-4 text-center">
          <p className="text-xs font-bold uppercase text-blue-600">
            Tarjeta de Repaso Rápido #{indice + 1} • {itemActual.materia}
          </p>
          <div
            onClick={() => setMostrarReverso(!mostrarReverso)}
            className="p-8 bg-background rounded-2xl border-2 border-dashed border-blue-500/40 cursor-pointer min-h-[180px] flex flex-col items-center justify-center space-y-3 transition-all hover:border-blue-500"
          >
            {!mostrarReverso ? (
              <>
                <h3 className="text-base md:text-lg font-bold max-w-2xl">{itemActual.stem}</h3>
                <span className="text-xs text-blue-600 font-semibold">
                  Haz clic aquí para voltear la tarjeta y ver la respuesta exacta ↻
                </span>
              </>
            ) : (
              <>
                <p className="text-xs uppercase font-bold text-emerald-600">Respuesta Correcta:</p>
                <h3 className="text-base md:text-lg font-bold text-emerald-600 max-w-2xl">
                  {itemActual.options[itemActual.answer]}
                </h3>
                <p className="text-xs text-muted-foreground max-w-xl">{itemActual.explanation}</p>
              </>
            )}
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setMostrarReverso(!mostrarReverso)}
              className="px-4 py-2 bg-muted rounded-xl text-xs font-bold cursor-pointer"
            >
              {mostrarReverso ? "Ver Pregunta" : "Mostrar Respuesta"}
            </button>
            <button
              onClick={avanzar}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Siguiente Tarjeta →
            </button>
          </div>
        </div>
      )}

      {itemActual && (modoAccion === "simular" || modoAccion === "actualizar") && (
        <div className="p-6 bg-card rounded-2xl border border-border space-y-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="px-3 py-1 bg-purple-500/10 text-purple-600 rounded-full font-bold">
              {itemActual.grupo} • {itemActual.materia} • Dificultad {itemActual.dificultad}
            </span>
            <span className="font-mono text-muted-foreground">
              Reactivo {indice + 1}/{items.length} • ID: {itemActual.id} • Banco v{versionBanco}.0
            </span>
          </div>

          <h3 className="text-base md:text-lg font-bold leading-relaxed">{itemActual.stem}</h3>

          <div className="grid grid-cols-1 gap-3">
            {itemActual.options.map((opcion, idx) => {
              const elegida = seleccion === idx
              const correcta = idx === itemActual.answer
              let estilo = "bg-background hover:bg-muted border-border"
              if (seleccion !== null) {
                if (correcta) estilo = "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                else if (elegida) estilo = "bg-red-500/15 border-red-500 text-red-700 dark:text-red-300"
              }
              return (
                <button
                  key={idx}
                  onClick={() => elegirOpcion(idx)}
                  className={`w-full text-left p-4 rounded-xl border font-medium text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${estilo}`}
                >
                  <span>
                    <strong className="mr-2">{String.fromCharCode(65 + idx)}.</strong>
                    {opcion}
                  </span>
                  {seleccion !== null && correcta && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {seleccion !== null && elegida && !correcta && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </button>
              )
            })}
          </div>

          {seleccion !== null && (
            <div className="p-4 bg-background rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <p className="font-bold text-emerald-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Explicación Directa:
                </p>
                <p className="text-muted-foreground">{itemActual.explanation}</p>
              </div>
              <button
                onClick={avanzar}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-xs shrink-0 cursor-pointer"
              >
                Siguiente Reactivo →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}