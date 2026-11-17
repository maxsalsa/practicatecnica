import { useEffect, useRef, useState } from 'react';
import { Nfc, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

) => Promise<void>;
  onreading: ((event: { message: { records: { recordType: string; encoding?: string; data: DataView }[] } }) => void) | null;
  onreadingerror: (() => void) | null;
};
export function PickupNfc({ onCode }: { onCode: (code: string) => void }) {
  const [supported, setSupported] = useState(false);
  const [reading, setReading] = useState(false);
  const [error, setError] = useState('');
  const abort = useRef<AbortController | null>(null);
  useEffect(() => {
    setSupported('NDEFReader' in window);
    return () => abort.current?.abort();
  }, []);
  function stop() { abort.current?.abort(); abort.current = null; setReading(false); }
  async function start() {
    stop(); setError('');
    const Reader = (window as unknown as { NDEFReader?: new () => NdefReader }).NDEFReader;
    if (!Reader) return;
    const controller = new AbortController(); abort.current = controller;
    const reader = new Reader(); setReading(true);
    reader.onreading = event => {
      if (controller.signal.aborted) return;
      const text = event.message.records.find(record => record.recordType === 'text');
      if (!text) { setError('La etiqueta no contiene un código de texto compatible.'); return; }
      const value = new TextDecoder(text.encoding || 'utf-8').decode(text.data);
      stop(); onCode(value);
    };
    reader.onreadingerror = () => { if (!controller.signal.aborted) setError('No se pudo leer la etiqueta. Use QR, barras o el número registrado.'); };
    try { await reader.scan({ signal: controller.signal }); }
    catch { if (!controller.signal.aborted) { stop(); setError('NFC no disponible o permiso denegado. Use la cámara o el número registrado.'); } }
  }
  if (!supported) return <p className="text-xs text-muted-foreground">NFC no disponible en este navegador. Puede usar la cámara o ingresar el número registrado.</p>;
  return <div className="space-y-2"><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => void start()} disabled={reading}><Nfc className="mr-2 h-4 w-4" />Leer etiqueta NFC</Button>{reading && <Button variant="outline" onClick={stop}><Square className="mr-2 h-4 w-4" />Detener NFC</Button>}</div>{reading && <p className="text-sm" role="status">Acerque una etiqueta NFC con el código de retiro.</p>}{error && <p role="alert" className="text-destructive">{error}</p>}<p className="text-xs text-muted-foreground">Solo etiquetas de texto NDEF compatibles; no lee chips protegidos de cédulas, licencias o pasaportes.</p></div>;
}
