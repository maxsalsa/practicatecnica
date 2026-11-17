import { useEffect, useState } from 'react';
import { permissionVerifyUrl } from '@/lib/institutions';

/** Verification code + QR for an approved permission; the QR opens the public verification page. */
export function PermissionQr({ hash }: { hash }) {
  const [src, setSrc] = useState('');
  const url = permissionVerifyUrl(hash, typeof window === 'undefined' ? undefined : window.location.origin);
  useEffect(() => {
    let active = true;
    void import('qrcode').then(m => m.toDataURL(url, { margin: 1, width: 220, errorCorrectionLevel: 'M' })).then(d => { if (active) setSrc(d); }).catch(() => setSrc(''));
    return () => { active = false; };
  }, [url]);
  return <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-primary bg-background p-3">
    {src ? <img src={src} alt="Código QR para verificar el permiso" className="h-28 w-28 rounded-md bg-card" /> : <div className="h-28 w-28 animate-pulse rounded-md bg-muted" aria-hidden />}
    <div className="min-w-0 flex-1 text-xs">
      <p className="font-bold text-primary">Permiso aprobado y verificable</p>
      <p className="mt-1 break-all font-mono">{hash}</p>
      <a href={url} target="_blank" rel="noreferrer" className="mt-1 inline-block font-bold text-primary underline">Abrir verificación</a>
    </div>
  </div>;
}
