import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Download, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { backupDocument, downloadBackup } from '@/lib/portable-backup';

export function InstitutionBackup({institutionId}) {
 const [content,setContent]=useState(''); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
 return <section className="space-y-3 border-t border-border py-5"><h2 className="text-xl font-bold">Respaldo para migrar</h2>
 <p className="text-sm text-muted-foreground">Usuarios del centro, boletas de notas emitidas y permisos. Sin contraseñas, archivos médicos ni detalles clínicos. Compatibilidad SEA/PIAD no verificada.</p>
 <div className="flex flex-wrap gap-2"><Button variant="outline" disabled={busy} onClick={async()=>{setBusy(true);setError('');setContent('');try{const r=await supabase.rpc('export_institution_backup',{_inst:institutionId});if(r.error)throw r.error;const data=r.data {users:unknown[];grades:unknown[];permissions:unknown[]};setContent(backupDocument(data));}catch{setError('No se pudo preparar el respaldo. Verifique sus permisos.');}finally{setBusy(false)}}}><FileCheck aria-hidden="true"/>{busy?'Preparando…':'Preparar respaldo'}</Button>
 {content&&<Button onClick={()=>downloadBackup(content,`respaldo-institucion-${institutionId}-${new Date().toISOString().slice(0,10)}.json`)}><Download aria-hidden="true"/>Descargar respaldo JSON</Button>}</div>
 <Button asChild variant="outline"><Link to="/migracion">Revisar respaldo para migrar</Link></Button>
 {content&&<p role="status">Respaldo preparado. Guarde el archivo en un lugar privado.</p>}{error&&<p role="alert" className="text-destructive">{error}</p>}
 </section>;
}