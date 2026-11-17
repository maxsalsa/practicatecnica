import React, { useState, useEffect } from "react"
import { Download, CheckCircle2, Smartphone } from "lucide-react"

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Comprobar si ya está instalada como PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("Para instalar en iOS (Safari): Presione el botón 'Compartir' y seleccione 'Agregar a Inicio'. En PC/Android, el navegador ya tiene la app lista.")
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      setIsInstalled(true)
      setVisible(false)
    }
    setDeferredPrompt(null)
  }

  if (isInstalled) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={handleInstallClick}
        className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-2xl transition-all transform hover:scale-105 cursor-pointer border border-emerald-400/30 backdrop-blur-md"
      >
        <Smartphone className="w-5 h-5 animate-pulse" />
        <span>Instalar App PWA (1 Clic)</span>
        <Download className="w-4 h-4 ml-1" />
      </button>
    </div>
  )
}