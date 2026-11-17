import { useEffect, useRef, useState } from 'react';

import { Camera, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PickupNfc } from './PickupNfc';
export function InstitutionCodeReader({ onCode }) {
  const video = useRef(null);
  const controls = useRef(null);
  const epoch = useRef(0);
  const [active, setActive] = useState(false);
  const [error, setError] = useState('');
  function stop() { epoch.current++; controls.current?.stop(); controls.current = null; setActive(false); }
  useEffect(() => () => { epoch.current++; controls.current?.stop(); }, []);
  async function scan() {
    stop(); setError(''); setActive(true); const current = epoch.current;
    try {
      const { BrowserMultiFormatReader } = await import('@zxing/browser');
      if (!video.current || current !== epoch.current) return;
      const reader = new BrowserMultiFormatReader();
      const running = await reader.decodeFromConstraints({ video: { facingMode: { ideal: 'environment' } }, audio }, video.current, (result, _error, controller) => {
        if (!result || current !== epoch.current) return;
        controller.stop(); stop(); onCode(result.getText());
      });
      if (current !== epoch.current) running.stop(); else controls.current = running;
    } catch { if (current === epoch.current) { stop(); setError('Cámara no disponible. Ingrese el código manualmente.'); } }
  }
  return <div className="space-y-3"><div className="flex gap-2"><Button type="button" onClick={() => void scan()} disabled={active}><Camera className="mr-2 size-4" />QR / barras</Button>{active && <Button type="button" variant="outline" onClick={stop}><Square className="mr-2 size-4" />Detener</Button>}</div><video ref={video} autoPlay muted playsInline className={active ? 'aspect-video w-full rounded-md bg-muted object-cover' : 'hidden'} /><PickupNfc onCode={code => { stop(); onCode(code); }} />{error && <p role="alert" className="text-destructive">{error}</p>}</div>;
}