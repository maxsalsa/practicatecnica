import { useEffect, useState } from 'react';
export function PersonalCredentialQr({ id }) {
  const [src, setSrc] = useState('');
  useEffect(() => { let alive = true; void import('qrcode').then(m => m.toDataURL(`PT-PERSONA:${id}`, { width: 220, margin: 2 })).then(image => { if (alive) setSrc(image); }).catch(() => { if (alive) setSrc(''); }); return () => { alive = false; }; }, [id]);
  return <div className="space-y-2">{src && <img src={src} alt="QR personal institucional" width={160} height={160} />}<p className="break-all font-mono text-xs">PT-PERSONA:{id}</p></div>;
}