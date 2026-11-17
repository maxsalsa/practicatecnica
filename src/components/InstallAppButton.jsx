import React, { useState, useEffect } from "react"
import { Download, Smartphone, CheckCircle2, X, ShieldCheck, Sparkles } from "lucide-react"

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [toast, setToast] = useState(null)
  const [engineName, setEngineName] = useState("Navegador")

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (navigator.brave) setEngineName("Brave")
    else if (ua.includes("edg/")) setEngineName("Edge")
    else if (ua.includes("chrome")) setEngineName("Chrome")
    else if (ua.includes("safari") && !ua.includes("chrome")) setEngineName("Safari")
    else if (ua.includes("firefox")) setEngineName("Firefox")

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {})
    }

    const onBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall)
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      setToast("¡PWA instalada como aplicación nativa en tu dispositivo!")
    })

    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      setIsInstalled(true)
    }

    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall)
  }, [])

  const triggerOneClickInstall = async () => {
    setInstalling(true)
    try {
      if (deferredPrompt) {
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === "accepted") {
          setIsInstalled(true)
          setToast(`¡Instalación nativa completada en ${engineName}!`)
        }
        setDeferredPrompt(null)
      } else {
        if ("serviceWorker" in navigator) {
          await navigator.serviceWorker.register("/sw.js")
        }
        localStorage.setItem("pt_pwa_standalone_active", "true")
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen().catch(() => {})
        }
        setToast(
          `Modo App Nativo y Caché Offline activados en ${engineName}. Listo para usar sin conexión.`
        )
      }
    } finally {
      setInstalling(false)
      setTimeout(() => setToast(null), 5000)
    }
  }

  return (
    <>
      {!isInstalled && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
          <button
            onClick={triggerOneClickInstall}
            disabled={installing}
            className="flex items-center gap-2.5 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-2xl cursor-pointer border border-emerald-400/40 transition-all transform hover:scale-105"
          >
            <Smartphone className="w-5 h-5" />
            <span>{installing ? "Activando App..." : `Instalar App (${engineName} 1-Clic)`}</span>
            <Download className="w-4 h-4" />
          </button>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-20 right-5 z-50 max-w-sm bg-card text-foreground border border-emerald-500/40 p-4 rounded-2xl shadow-2xl flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold text-emerald-600">PWA Universal Activa</p>
            <p className="text-muted-foreground">{toast}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  )
}