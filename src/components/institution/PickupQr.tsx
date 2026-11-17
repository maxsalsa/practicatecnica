import { useEffect, useState } from 'react';
export function PickupQr({ id }: { id: string }) {
  const [src, setSrc] = useState('');
  useEffect(() => {
    let active = true;
    void import('qrcode').then(m => m.toDataURL(`PT-RETIRO:${id}`, { width: 220, margin: 2 })).then(image => { if (active) setSrc(image); }).catch(() => { if (active) setSrc(''); });
    return () => { active = false; };
  }, [id]);
  return <div className="mt-2 space-y-2">{src && <img src={src} alt="QR de consulta privada del retiro" className="h-40 w-40" />}<p className="break-all font-mono text-xs">PT-RETIRO:{id}</p></div>;
}