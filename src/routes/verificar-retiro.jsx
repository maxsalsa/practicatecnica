import { createFileRoute, Link } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useEffect, useRef, useState } from 'react';

import { Camera, ScanLine, Square } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { useAccount } from '@/components/AccountProvider';
import { Button } from '@/components/ui/button';
import { lookupPickup } from '@/lib/pickup.functions';
import { parsePickupCode } from '@/lib/pickup-code';
import { PickupNfc } from '@/components/institution/PickupNfc';

export const Route = createFileRoute('/verificar-retiro')({
  staticData: { sitemap },
  head: () => ({ meta: [{ title: 'Consulta privada de retiros · pracTICAtecnica.com' },
    { name: 'description', content: 'Consulta autorizada del estado vigente de retiros mediante QR, barras o identificación registrada.' },
    { property: 'og:title', content: 'Verificar retiro · pracTICAtecnica.com' },
    { property: 'og:description', content: 'Verificación privada para familias y personal institucional autorizado.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex' },
  ] }),
  component: PickupScanner,
});

function PickupScanner() {
  const { user, ready } = useAccount();
  const lookup = useServerFn(lookupPickup);
  const video = useRef(null);
  const controls = useRef(null);
  const generation = useRef(0);
  const [code, setCode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  function stop() { generation.current += 1; controls.current?.stop(); controls.current = null; setScanning(false); }
  useEffect(() => () => { generation.current += 1; controls.current?.stop(); }, []);
  useEffect(() => { stop(); setResponse(null); setCode(''); setError(''); }, [user?.id]);
  async function check(value) {
    stop(); setResponse(null); setError('');
    if (!parsePickupCode(value)) { setError('Formato no reconocido. Ingrese el número registrado o el código PT-RETIRO.'); return; }
    const identity = generation.current;
    setBusy(true);
    try { const result = await lookup({ data: { code } }); if (generation.current === identity) setResponse(result); }
    catch { if (generation.current === identity) setError('No se pudo verificar. Compruebe su sesión y conexión; el retiro no queda autorizado.'); }
    finally { setBusy(false); }
  }
  async function start() {
    stop(); setResponse(null); setError('');
    const current = generation.current;
    setScanning(true);
    try {
      const { BrowserMultiFormatReader } = await import('@zxing/browser');
      if (!video.current || generation.current !== current) return;
      const scanner = new BrowserMultiFormatReader();
      const activeControls = await scanner.decodeFromConstraints({ video: { facingMode: { ideal: 'environment' } }, audio }, video.current, (result, _error, scannerControls) => {
        if (!result || generation.current !== current) return;
        scannerControls.stop();
        const text = result.getText(); setCode(text); void check(text);
      });
      if (generation.current !== current) activeControls.stop();
      else controls.current = activeControls;
    } catch { if (generation.current === current) { stop(); setError('Cámara no disponible o permiso denegado. Puede ingresar el código manualmente.'); } }
  }
  return <main className="min-h-screen bg-hero"><SiteHeader /><section className="mx-auto max-w-xl space-y-5 px-5 pb-24">
    <h1 className="text-3xl font-black">Verificar retiro</h1>
    {!ready ? <p>Comprobando sesión…</p> : !user ? <p><Link to="/auth" className="font-bold text-primary underline">Inicie sesión</Link> para consultar sus retiros autorizados.</p> : <>
      <div className="flex flex-wrap gap-3"><Button onClick={() => void start()} disabled={scanning || busy}><Camera className="mr-2 h-4 w-4" />Escanear QR o barras</Button>{scanning && <Button variant="outline" onClick={stop}><Square className="mr-2 h-4 w-4" />Detener cámara</Button>}</div>
      <video ref={video} muted playsInline className={scanning ? 'aspect-video w-full rounded-md bg-muted object-cover' : 'hidden'} aria-label="Cámara de lectura de códigos" />
      <PickupNfc key={user.id} onCode={value => { setCode(value); void check(value); }} />
      <form className="space-y-3" onSubmit={event => { event.preventDefault(); void check(code); }}>
        <label htmlFor="pickup-code" className="block font-semibold">Código de retiro o identificación registrada</label>
        <input id="pickup-code" value={code} maxLength={250} onChange={event => { setCode(event.target.value); setResponse(null); }} autoComplete="off" className="w-full rounded-md border border-input bg-background p-3 text-foreground" />
        <Button type="submit" disabled={busy || !code.trim()}><ScanLine className="mr-2 h-4 w-4" />{busy ? 'Consultando…' : 'Consultar estado vigente'}</Button>
      </form>
      {error && <p role="alert" className="text-destructive">{error}</p>}
      {response && <div aria-live="polite" className="space-y-4 border-t border-border pt-4">
        {!response.results.length && <p>No hay un retiro visible con este código. Puede no existir o no tener permiso para consultarlo.</p>}
        {response.results.map(item => <article key={item.id} className="space-y-1 border-b border-border pb-4"><h2 className={item.authorized ? 'font-bold text-accent' : 'font-bold text-destructive'}>{item.authorized ? 'Autorización vigente registrada' : 'NO autorizado para retiro'}</h2><p>{item.name} · {item.relation}</p><p>{item.student} · {item.level}</p><p>Estado: {item.status}</p></article>)}
        <p className="text-xs text-muted-foreground">Consultado: {new Date(response.checkedAt).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })}. Vuelva a consultar antes del retiro.</p>
      </div>}
      <p className="text-sm text-muted-foreground">Compruebe la identidad con el documento y el procedimiento institucional. Un QR, código de barras o SHA-256 no acredita identidad ni registra una salida. La cámara no almacena fotografías. Cédula, licencia o pasaporte número previamente registrado; formatos no reconocidos requieren entrada manual.</p>
    </>}
  </section></main>;
}