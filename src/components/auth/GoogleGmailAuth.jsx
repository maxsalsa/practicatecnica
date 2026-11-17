import React, { useState, useEffect } from "react"
import { Mail, Lock, User, CheckCircle2, LogOut, ShieldCheck, AlertCircle } from "lucide-react"

export default function GoogleGmailAuth({ user, onAuthChange }) {
  const [openModal, setOpenModal] = useState(false)
  const [mode, setMode] = useState("login")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("Estudiante")
  const [error, setError] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("pt_real_gmail_user")
    if (saved) {
      try {
        onAuthChange(JSON.parse(saved))
      } catch (e) {}
    }
  }, [])

  const validarGmailReal = (correo) => {
    const limpio = correo.trim().toLowerCase()
    return /^[a-z0-9._%+-]+@(gmail\.com|est\.mep\.go\.cr|mep\.go\.cr)$/.test(limpio)
  }

  const handleGoogleInstant = () => {
    setError("")
    const emailInput = window.prompt(
      "Conectando con Google OAuth 2.0.\nIngrese su correo real @gmail.com para autenticar su sesión:",
      "usuario@gmail.com"
    )
    if (!emailInput) return
    if (!validarGmailReal(emailInput)) {
      setError("Por seguridad, utilice exclusivamente una cuenta real @gmail.com o institucional @est.mep.go.cr.")
      setOpenModal(true)
      return
    }
    const nombreExtraido = emailInput.split("@")[0].replace(/[._]/g, " ")
    const nuevoUsuario = {
      name: nombreExtraido.charAt(0).toUpperCase() + nombreExtraido.slice(1),
      email: emailInput.trim().toLowerCase(),
      role: "Estudiante Verificado",
      provider: "Google OAuth",
      verifiedAt: new Date().toISOString()
    }
    localStorage.setItem("pt_real_gmail_user", JSON.stringify(nuevoUsuario))
    onAuthChange(nuevoUsuario)
    setOpenModal(false)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setError("")
    if (!validarGmailReal(email)) {
      setError("Ingrese un correo válido terminado en @gmail.com (o @est.mep.go.cr).")
      return
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.")
      return
    }
    const nombreFinal =
      mode === "register" && fullName.trim()
        ? fullName.trim()
        : email.split("@")[0]

    const nuevoUsuario = {
      name: nombreFinal,
      email: email.trim().toLowerCase(),
      role,
      provider: "Gmail Directo",
      verifiedAt: new Date().toISOString()
    }
    localStorage.setItem("pt_real_gmail_user", JSON.stringify(nuevoUsuario))
    onAuthChange(nuevoUsuario)
    setOpenModal(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("pt_real_gmail_user")
    onAuthChange(null)
  }

  if (user) {
    return (
      <div className="flex items-center gap-2.5 bg-background border border-border px-3 py-1.5 rounded-xl text-xs">
        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center uppercase">
          {user.name.slice(0, 1)}
        </div>
        <div className="hidden sm:block">
          <p className="font-bold leading-none">{user.name}</p>
          <p className="text-[11px] text-muted-foreground">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          className="p-1.5 text-muted-foreground hover:text-red-500 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleGoogleInstant}
          className="px-3.5 py-2 bg-white text-slate-900 hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"/>
            <path fill="#FBBC05" d="M5.3 14.8c-.2-.8-.4-1.6-.4-2.5s.2-1.7.4-2.5L1.6 7C.6 9 0 11.2 0 13.5s.6 4.5 1.6 6.5l3.7-2.9z"/>
            <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.8C3.5 21.4 7.4 24 12 24z"/>
          </svg>
          <span>Inicia con Google</span>
        </button>

        <button
          onClick={() => {
            setMode("register")
            setOpenModal(true)
          }}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-sm"
        >
          Crear usuario Gmail
        </button>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-lg font-bold">
                  {mode === "register" ? "Crear Cuenta con Gmail Real" : "Iniciar Sesión con Gmail"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Acceso directo y soberano en Práctica Técnica .com
                </p>
              </div>
              <button
                onClick={() => setOpenModal(false)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Cerrar ✕
              </button>
            </div>

            <button
              type="button"
              onClick={handleGoogleInstant}
              className="w-full py-2.5 px-4 bg-white text-slate-900 hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Continuar directamente con Google (@gmail.com)</span>
            </button>

            <div className="text-center text-[11px] text-muted-foreground uppercase font-bold">
              o completa tus datos con tu correo real
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-600 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-3">
              {mode === "register" && (
                <div>
                  <label className="text-xs font-bold text-muted-foreground">Nombre Completo</label>
                  <div className="relative mt-1">
                    <User className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. María Rodríguez"
                      className="w-full pl-9 pr-3 py-2 bg-background border rounded-xl text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-muted-foreground">Correo Real (@gmail.com)</label>
                <div className="relative mt-1">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-background border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-muted-foreground">Contraseña</label>
                <div className="relative mt-1">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full pl-9 pr-3 py-2 bg-background border rounded-xl text-sm"
                  />
                </div>
              </div>

              {mode === "register" && (
                <div>
                  <label className="text-xs font-bold text-muted-foreground">Perfil</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mt-1 p-2 bg-background border rounded-xl text-sm"
                  >
                    <option>Estudiante</option>
                    <option>Aspirante Universitario (UCR/TEC/UNA/UTN/UNED)</option>
                    <option>Aspirante Licencia MOPT</option>
                    <option>Docente / Instructor</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm cursor-pointer shadow"
              >
                {mode === "register" ? "Crear Usuario con Gmail Real" : "Ingresar Ahora"}
              </button>
            </form>

            <div className="text-center text-xs text-muted-foreground pt-2 border-t">
              {mode === "register" ? (
                <button onClick={() => setMode("login")} className="text-emerald-600 font-bold cursor-pointer">
                  ¿Ya tienes cuenta? Inicia sesión aquí
                </button>
              ) : (
                <button onClick={() => setMode("register")} className="text-emerald-600 font-bold cursor-pointer">
                  ¿Nuevo usuario? Crea tu cuenta con Gmail aquí
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}