import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { schoolServiceAction } from '@/lib/school-services.functions';
import { ticketTotal } from '@/lib/school-services';
import { InstitutionCodeReader } from './InstitutionCodeReader';
import { PersonalCredentialQr } from './PersonalCredentialQr';
import { useAccount } from '@/components/AccountProvider';
const field = 'w-full rounded-md border border-input bg-background p-2 text-foreground';
export function SchoolServicesPanel({ institutionId, mode }) {
    const { user } = useAccount();
    const action = useServerFn(schoolServiceAction);
    const [message, setMessage] = useState('');
    const [busy, setBusy] = useState(false);
    const [code, setCode] = useState('');
    const [person, setPerson] = useState('');
    const [identification, setIdentification] = useState('');
    const [kind, setKind] = useState('tiquete');
    const [reason, setReason] = useState('');
    const [studentPrice, setStudentPrice] = useState(700);
    const [teacherPrice, setTeacherPrice] = useState(1400);
    const [free, setFree] = useState(false);
    const [sinpe, setSinpe] = useState('');
    const [quantity, setQuantity] = useState(3);
    const [method, setMethod] = useState('efectivo');
    const [reference, setReference] = useState('');
    const [lookup, setLookup] = useState(null);
    const [section, setSection] = useState('');
    const [subject, setSubject] = useState('');
    const [session, setSession] = useState('');
    const data = useQuery({ queryKey: ['school-services', user?.id, institutionId, mode], queryFn() { } });
    {
        const manager = await supabase.rpc('school_service_manager', { _inst });
        const operator = await supabase.rpc('school_service_operator', { _inst, _service });
        const credentials = await supabase.from('institution_credentials').select('id,user_id,identification,active').eq('institution_id', institutionId);
        const settings = await supabase.from('institution_meal_settings').select('*').eq('institution_id', institutionId).maybeSingle();
        const purchases = await supabase.from('institution_ticket_purchases').select('*').eq('institution_id', institutionId).order('created_at', { ascending }).limit(50);
        const deliveries = await supabase.from('institution_meal_deliveries').select('*').eq('institution_id', institutionId).order('created_at', { ascending }).limit(50);
        const sessions = await supabase.from('institution_attendance_sessions').select('*').eq('institution_id', institutionId).order('created_at', { ascending }).limit(30);
        const records = await supabase.from('institution_attendance_records').select('*').eq('institution_id', institutionId).order('arrived_at', { ascending }).limit(50);
        const notices = await supabase.from('institution_family_notices').select('id,created_at,student_id').eq('institution_id', institutionId).order('created_at', { ascending }).limit(30);
        const sections = await supabase.from('institution_sections').select('id,name,guide_id').eq('institution_id', institutionId);
        const errors = [manager.error, operator.error, credentials.error, settings.error, purchases.error, deliveries.error, sessions.error, records.error, sections.error].filter(Boolean);
        if (errors.length)
            throw new Error('No se pudieron consultar los registros autorizados.');
        const people = manager.data ? await supabase.rpc('institution_people', { _inst }) : null;
        return { manager: manager.data === true, operator: operator.data === true, credentials: credentials.data ?? [], settings: settings.data, purchases: purchases.data ?? [], deliveries: deliveries.data ?? [], sessions: sessions.data ?? [], records: records.data ?? [], sections: sections.data ?? [], people: people?.data ?? [], notices: notices.data ?? [] };
    }
}
;
useEffect(() => { const s = data.data?.settings; if (s) {
    setStudentPrice(s.student_price);
    setTeacherPrice(s.teacher_price);
    setFree(s.universal_free);
    setSinpe(s.sinpe_account);
} }, [data.data?.settings]);
async function run(operation) {
    setBusy(true);
    setMessage('');
    try {
        const result = await action({ data: { institution, action, values } });
        if (operation === 'lookup' && result && typeof result === 'object' && !Array.isArray(result))
            setLookup(result);
        setMessage(result && typeof result === 'object' && !Array.isArray(result) && result['duplicate'] ? 'Ya registrado; no se duplicó.' : 'Registro confirmado.');
        await data.refetch();
        return result;
    }
    catch (error) {
        setLookup(null);
        setMessage(error instanceof Error ? error.message : 'No se pudo registrar.');
        return null;
    }
    finally {
        setBusy(false);
    }
}
const time = (value) => new Date(value).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' });
if (data.isPending)
    return <p role="status">Consultando…</p>;
if (data.isError)
    return <p role="alert" className="text-destructive">{data.error.message}</p>;
const state = data.data;
const attendanceOperator = state.operator || state.sections.some(s => s.guide_id === user?.id);
const names = new Map(state.people.map(p => [p.user_id, p.display_name || p.email || p.user_id]));
return <section className="space-y-6 pt-4"><h2 className="text-2xl font-black">{mode === 'comedor' ? 'Comedor estudiantil' : 'Asistencia al aula'}</h2>
    {message && <p role="status" className="break-words text-primary">{message}</p>}
    {mode === 'asistencia' && state.notices.length > 0 && <div className="space-y-2 border-b border-border pb-3"><h3 className="font-bold">Avisos familiares</h3>{state.notices.map(n => <p key={n.id} className="text-sm">Llegada registrada · {time(n.created_at)}</p>)}</div>}
    {!state.manager && state.credentials.filter(c => c.active).map(c => <PersonalCredentialQr key={c.id} id={c.id}/>)}
    {state.manager && <details className="border-b border-border pb-4"><summary className="cursor-pointer font-bold">Configuración y credenciales</summary><div className="mt-4 space-y-4">
      <label className="block">Persona<select className={field} value={person} onChange={e => setPerson(e.target.value)}><option value="">Seleccione…</option>{state.people.filter(p => p.member_role !== 'encargado').map(p => <option key={`${p.user_id}-${p.section_id}`} value={p.user_id}>{p.display_name || p.email} · {p.member_role}</option>)}</select></label>
      <label className="block">Cédula / número de carné registrado<input className={field} value={identification} maxLength={50} onChange={e => setIdentification(e.target.value)}/></label>
      <div className="flex flex-wrap gap-2"><Button disabled={busy || !person} onClick={() => void run('credential', { user_id, identification, active })}>Guardar credencial</Button><Button variant="outline" disabled={busy || !person} onClick={() => void run('credential', { user_id, identification, active })}>Desactivar credencial</Button></div>
      <div className="flex flex-wrap gap-2"><Button variant="outline" disabled={busy || !person} onClick={() => void run('operator', { user_id, service, enabled })}>Autorizar responsable</Button><Button variant="outline" disabled={busy || !person} onClick={() => void run('operator', { user_id, service, enabled })}>Retirar autorización</Button></div>
      {mode === 'comedor' && <><div className="grid gap-3 sm:grid-cols-2"><label>Tarifa estudiante (₡)<input type="number" min="1" className={field} value={studentPrice} onChange={e => setStudentPrice(Number(e.target.value))}/></label><label>Tarifa docente (₡)<input type="number" min="1" className={field} value={teacherPrice} onChange={e => setTeacherPrice(Number(e.target.value))}/></label></div><label className="flex gap-2"><input type="checkbox" checked={free} onChange={e => setFree(e.target.checked)}/>Gratuidad universal</label><label className="block">Cuenta SINPE del comedor<input className={field} value={sinpe} onChange={e => setSinpe(e.target.value)}/></label><Button disabled={busy} onClick={() => void run('settings', { student_price, teacher_price, universal_free, sinpe_account })}>Guardar tarifas</Button>
      <label className="block">Cobertura<select className={field} value={kind} onChange={e => setKind(e.target.value)}><option value="tiquete">Paga tiquete</option><option value="beca">Becado</option><option value="cortesia">Cortesía autorizada</option></select></label><label className="block">Motivo de autorización<input className={field} value={reason} onChange={e => setReason(e.target.value)}/></label><Button disabled={busy || !person} onClick={() => void run('coverage', { user_id, kind, reason })}>Guardar cobertura</Button></>}
      <ul className="space-y-2">{state.credentials.map(c => <li key={c.id} className="break-all text-sm">{names.get(c.user_id) ?? c.user_id} · {c.active ? 'Activa' : 'Desactivada'}<p className="select-all">PT-PERSONA:{c.id}</p></li>)}</ul>
    </div></details>}
    {mode === 'comedor' && state.settings && <p className="text-sm">Estudiante ₡{state.settings.student_price.toLocaleString('es-CR')} · Docente ₡{state.settings.teacher_price.toLocaleString('es-CR')}{state.settings.universal_free ? ' · Gratuidad universal' : ''}</p>}
    {mode === 'asistencia' && attendanceOperator && <><div className="grid gap-3 sm:grid-cols-2"><label>Sección<select className={field} value={section} onChange={e => setSection(e.target.value)}><option value="">Seleccione…</option>{state.sections.filter(s => state.operator || s.guide_id === user?.id).map(s => <option value={s.id} key={s.id}>{s.name}</option>)}</select></label><label>Materia<input className={field} value={subject} onChange={e => setSubject(e.target.value)}/></label></div><Button disabled={busy || !section || !subject} onClick={() => void run('session', { section_id, subject })}>Abrir clase</Button><label className="block">Clase<select className={field} value={session} onChange={e => setSession(e.target.value)}><option value="">Seleccione…</option>{state.sessions.map(s => <option key={s.id} value={s.id}>{s.subject} · {time(s.created_at)}</option>)}</select></label></>}
    {((mode === 'comedor' && state.operator) || (mode === 'asistencia' && attendanceOperator)) && <><InstitutionCodeReader key={`${user?.id}-${institutionId}-${mode}`} onCode={value => { setCode(value); setLookup(null); }}/><label className="block">Código personal / identificación<input className={field} value={code} autoComplete="off" maxLength={250} onChange={e => { setCode(e.target.value); setLookup(null); }}/></label>
    {mode === 'asistencia' ? <Button disabled={busy || !code || !session} onClick={() => void run('attendance', { code, session_id })}>Registrar llegada</Button> : <><Button disabled={busy || !code} onClick={() => void run('lookup', { code })}>Consultar persona y saldo</Button>{lookup && <div className="space-y-3 border-t border-border pt-3"><p className="font-bold">{lookup.name} · {lookup.coverage} · {lookup.balance} tiquetes</p><label className="block">Cantidad<input type="number" min="1" step="1" className={field} value={quantity} onChange={e => setQuantity(Number(e.target.value))}/></label><div className="flex gap-2">{[3, 4, 5].map(q => <Button key={q} size="sm" variant="outline" onClick={() => setQuantity(q)}>{q}</Button>)}</div><p>Total: ₡{Number.isSafeInteger(quantity) && quantity > 0 && lookup.unit_price ? ticketTotal(quantity, lookup.unit_price).toLocaleString('es-CR') : '—'}</p><label className="block">Medio<select className={field} value={method} onChange={e => setMethod(e.target.value)}><option value="efectivo">Efectivo recibido</option><option value="sinpe">SINPE pendiente de revisión</option></select></label><label className="block">Referencia / comprobante<input className={field} value={reference} onChange={e => setReference(e.target.value)}/></label><div className="flex flex-wrap gap-2"><Button disabled={busy || quantity <= 0} onClick={() => void run('purchase', { code, quantity, method, reference })}>Registrar compra</Button><Button disabled={busy} variant="outline" onClick={() => void run('deliver', { code, service: 'almuerzo' })}>Confirmar entrega de almuerzo</Button></div></div>}</>}
    </>}
    {mode === 'comedor' ? <><h3 className="font-bold">Compras registradas</h3><ul className="space-y-3">{state.purchases.map(p => <li key={p.id} className="border-b border-border pb-3 text-sm"><p>{names.get(p.user_id) ?? p.user_id} · {p.quantity} × ₡{p.unit_price} · {p.method} · {p.status}</p><p>{time(p.created_at)}</p>{state.operator && p.status === 'pendiente' && <Button size="sm" variant="outline" disabled={busy} onClick={() => { const evidence = window.prompt('Evidencia de verificación del depósito'); if (evidence)
    void run('confirm_purchase', { id: p.id, reason }); }}>Confirmar depósito verificado</Button>}</li>)}</ul><h3 className="font-bold">Comidas entregadas</h3><ul>{state.deliveries.map(d => <li key={d.id} className="py-2 text-sm">{names.get(d.user_id) ?? d.user_id} · {d.service} · {d.coverage} · {time(d.created_at)}</li>)}</ul></> : <><h3 className="font-bold">Llegadas registradas</h3><ul>{state.records.map(r => <li key={r.id} className="border-b border-border py-3 text-sm">{names.get(r.student_id) ?? r.student_id} · {r.status} · {time(r.arrived_at)}{state.operator && <Button size="sm" variant="outline" className="ml-2" onClick={() => { const note = window.prompt('Motivo de corrección'); if (note)
    void run('correct_attendance', { id: r.id, status: r.status === 'presente' ? 'justificada' : 'presente', reason }); }}>Corregir</Button>}</li>)}</ul></>}
    {!state.purchases.length && !state.records.length && <p className="text-muted-foreground">Sin registros visibles.</p>}
  </section>;
