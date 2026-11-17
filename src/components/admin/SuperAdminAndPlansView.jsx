import React, { useState } from "react"
import { PLANES_OFICIALES, esSuperAdmin } from "../../data/planesRbac"
import {
  ShieldCheck,
  Crown,
  CreditCard,
  CheckCircle2,
  KeyRound,
  Smartphone,
  Building2
} from "lucide-react"

export default function SuperAdminAndPlansView({ user, onUpdateUser }) {
  const soySuperAdmin = esSuperAdmin(user)
  const [targetEmail, setTargetEmail] = useState("")
  const [targetPlan, setTargetPlan] = useState("docente_particular")
  const [institutionCode, setInstitutionCode] = useState("")
  const [sinpeComprobante, setSinpeComprobante] = useState("")
  const [selectedPurchasePlan, setSelectedPurchasePlan] = useState(
    user?.planId && user.planId !== "superadmin" ? user.planId : "docente_particular"
  )
  const [statusMsg, setStatusMsg] = useState("")
  const [delegatedUsers, setDelegatedUsers] = useState([
    { email: "maxi.salsa@gmail.com", role: "SuperAdmin Absoluto", plan: "superadmin" },
    { email: "direccion@ctpmercedesnorte.ed.cr", role: "Plan Institución Anual", plan: "institucion_anual" },
    { email: "docente.tecnico@gmail.com", role: "Plan Docente Particular", plan: "docente_particular" },
    { email: "estudiante.ctpmn@est.mep.go.cr", role: "Plan Estudiante Centro Educativo", plan: "estudiante_centro" }
  ])

  const handleActivateSuperAdminNow = () => {
    const adminUser = {
      name: "Ing. Max Salazar Sánchez",
      email: "maxi.salsa@gmail.com",
      role: "SuperAdmin Absoluto",
      planId: "superadmin",
      provider: "Llave Maestra GICM"
    }
    localStorage.setItem("pt_real_gmail_user", JSON.stringify(adminUser))
    onUpdateUser(adminUser)
    setStatusMsg("¡Poderes de SuperAdmin activados para Ing. Max Salazar Sánchez! Acceso 100% desbloqueado.")
  }

  const handleDelegateRole = (e) => {
    e.preventDefault()
    if (!targetEmail.trim()) return
    const planObj = PLANES_OFICIALES[targetPlan]
    const nuevo = {
      email: targetEmail.trim().toLowerCase(),
      role: planObj.nombre,
      plan: targetPlan
    }
    setDelegatedUsers((prev) => [nuevo, ...prev.filter((u) => u.email !== nuevo.email)])
    if (user && user.email.toLowerCase() === nuevo.email) {
      const actualizado = { ...user, planId: targetPlan, role: planObj.nombre }
      localStorage.setItem("pt_real_gmail_user", JSON.stringify(actualizado))
      onUpdateUser(actualizado)
    }
    setStatusMsg(`Rol [${planObj.nombre}] delegado a ${nuevo.email}.`)
    setTargetEmail("")
  }

  const handleConfirmPlanPurchase = (e) => {
    e.preventDefault()
    const planElegido = PLANES_OFICIALES[selectedPurchasePlan]
    const usuarioActualizado = {
      ...(user || { name: "Usuario Verificado", email: "usuario@gmail.com" }),
      planId: selectedPurchasePlan,
      role: planElegido.nombre,
      sinpeRef: sinpeComprobante || "SINPE-60906359",
      institutionCode: institutionCode || "N/A"
    }
    localStorage.setItem("pt_real_gmail_user", JSON.stringify(usuarioActualizado))
    onUpdateUser(usuarioActualizado)
    setStatusMsg(`¡Plan activado: ${planElegido.nombre}! Módulos habilitados inmediatamente.`)
  }

  return (
    <div className="space-y-6 p-4 md:p-6 bg-background rounded-2xl border border-border">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <Crown className="w-6 h-6 text-amber-400" />
            <span>Suscripciones por Plan y Consola de Delegación SuperAdmin</span>
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            El SuperAdmin accede a todo • Cada suscriptor accede a los módulos según su plan activo
          </p>
        </div>

        {!soySuperAdmin ? (
          <button
            onClick={handleActivateSuperAdminNow}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow"
          >
            <KeyRound className="w-4 h-4" />
            <span>Activar SuperAdmin (Ing. Max Salazar)</span>
          </button>
        ) : (
          <span className="px-3.5 py-1.5 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-extrabold flex items-center gap-1.5">
            <Crown className="w-4 h-4" /> SUPERADMIN ACTIVO — CONTROL ABSOLUTO
          </span>
        )}
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {soySuperAdmin && (
        <div className="p-5 bg-card rounded-2xl border-2 border-amber-500/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-extrabold text-amber-400 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Delegación de Roles y Simulador de Vistas por Plan</span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Asigna permisos a cualquier correo `@gmail.com` o `@est.mep.go.cr`
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.values(PLANES_OFICIALES).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    const cambiado = { ...user, planId: p.id, role: p.nombre }
                    localStorage.setItem("pt_real_gmail_user", JSON.stringify(cambiado))
                    onUpdateUser(cambiado)
                    setStatusMsg(`Vista actual: ${p.nombre}`)
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer ${
                    user?.planId === p.id ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-background"
                  }`}
                >
                  Vista: {p.id}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleDelegateRole} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="email"
              required
              value={targetEmail}
              onChange={(e) => setTargetEmail(e.target.value)}
              placeholder="Correo del usuario (ej. docente@gmail.com)"
              className="p-2.5 bg-background border rounded-xl text-sm"
            />
            <select
              value={targetPlan}
              onChange={(e) => setTargetPlan(e.target.value)}
              className="p-2.5 bg-background border rounded-xl text-sm font-semibold"
            >
              {Object.values(PLANES_OFICIALES).map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
            <button
              type="submit"
              className="py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-extrabold text-xs cursor-pointer"
            >
              Delegar Rol Ahora
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {delegatedUsers.map((u, idx) => (
              <div key={idx} className="p-3 bg-background rounded-xl border flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold">{u.email}</p>
                  <p className="text-muted-foreground">{u.role}</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full font-bold">
                  Verificado
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          PLANES_OFICIALES.institucion_anual,
          PLANES_OFICIALES.docente_particular,
          PLANES_OFICIALES.estudiante_centro,
          PLANES_OFICIALES.estudiante_particular
        ].map((plan) => {
          const seleccionado = selectedPurchasePlan === plan.id
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPurchasePlan(plan.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                seleccionado ? "border-sky-500 bg-sky-500/10 shadow-lg" : "border-border bg-card"
              }`}
            >
              <div className="space-y-2">
                <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${plan.badge}`}>
                  {plan.nombre}
                </span>
                <p className="text-lg font-extrabold">{plan.precio}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{plan.descripcion}</p>
              </div>
              <button
                type="button"
                className={`w-full py-2 rounded-xl text-xs font-extrabold cursor-pointer ${
                  seleccionado ? "bg-sky-500 text-white" : "bg-background border"
                }`}
              >
                {seleccionado ? "Plan Seleccionado ✓" : "Seleccionar Plan"}
              </button>
            </div>
          )
        })}
      </div>

      <form
        onSubmit={handleConfirmPlanPurchase}
        className="p-5 bg-card rounded-2xl border border-border grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
      >
        <div>
          <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>SINPE Móvil Oficial: 6090-6359 (Max Salazar)</span>
          </label>
          <input
            type="text"
            value={sinpeComprobante}
            onChange={(e) => setSinpeComprobante(e.target.value)}
            placeholder="Comprobante SINPE (+506 6090 6359)"
            className="w-full mt-1.5 p-2.5 bg-background border rounded-xl text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-sky-400" />
            <span>Código Institucional Anual (Opcional)</span>
          </label>
          <input
            type="text"
            value={institutionCode}
            onChange={(e) => setInstitutionCode(e.target.value)}
            placeholder="Ej. CTPMN-2026"
            className="w-full mt-1.5 p-2.5 bg-background border rounded-xl text-sm"
          />
        </div>
        <button
          type="submit"
          className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow"
        >
          <CreditCard className="w-4 h-4" />
          <span>Activar {PLANES_OFICIALES[selectedPurchasePlan]?.nombre}</span>
        </button>
      </form>
    </div>
  )
}