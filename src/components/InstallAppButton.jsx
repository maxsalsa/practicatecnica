import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type BIP = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function InstallAppButton({ compact = false }: { compact?: boolean }) {
  const [evt, setEvt] = useState<BIP | null>(null);
  const [installed, setInstalled] = useState(false);
  const [help, setHelp] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
    const mode = window.matchMedia("(display-mode: standalone)");
    const detect = () => setInstalled(mode.matches || (navigator as Navigator & { standalone?: boolean }).standalone === true);
    detect();
    mode.addEventListener('change', detect);
    const on = (e) => { e.preventDefault(); setEvt(e as BIP); };
    const done = () => { setInstalled(true); setEvt(null); };
    window.addEventListener("beforeinstallprompt", on);
    window.addEventListener("appinstalled", done);
    return () => { mode.removeEventListener('change', detect); window.removeEventListener("beforeinstallprompt", on); window.removeEventListener("appinstalled", done); };
  }, []);

  if (installed) return null;

  const click = async () => {
    if (evt) { try { await evt.prompt(); await evt.userChoice; } catch { setHelp(true); } finally { setEvt(null); } }
    else setHelp(true);
  };

  return (
    <div className={compact ? "relative" : "mt-6 text-center"}>
      <Button onClick={click} size={compact ? 'sm' : 'lg'} variant={compact ? 'outline' : 'default'}><Download />{compact ? 'Instalar' : 'Instalar app'}</Button>
      {help && (
        <div role="status" className={compact ? "absolute right-0 top-full z-50 mt-2 w-60 rounded-md border border-border bg-card p-3 text-sm text-foreground shadow-card" : "mx-auto mt-3 max-w-md rounded-md border border-border bg-card p-4 text-sm text-muted-foreground"}>
          {ios
            ? "En iPhone o iPad: toque Compartir en Safari y luego «Agregar a pantalla de inicio»."
            : "Abra el menú ⋮ del navegador y elija «Instalar app» o «Agregar a pantalla principal»."}
          <Button variant="ghost" size="sm" onClick={()=>setHelp(false)}>Cerrar</Button>
        </div>
      )}
    </div>
  );
}
