import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { SERVICE_LABELS, LICENSE_SUGGESTIONS, formatColones } from '@/lib/institution-pricing';
import { roadVehicles, bandLabels, drivingBands } from '@/lib/road-circuits';

const field = 'mt-1 block w-full rounded-lg border border-border bg-background p-2';
const services = Object.keys(SERVICE_LABELS);

export function useInstitutionPrices(institutionId) {
  const tariffs = useQuery({ queryKey: ['institution-tariffs', institutionId], queryFn () => {
    const { data, error } = await supabase.from('institution_tariffs').select('id,service,label,level,vehicle,license_category,amount,active,updated_at').eq('institution_id', institutionId).order('updated_at', { ascending });
    if (error) throw new Error('No se pudieron consultar las tarifas.');
    return data as (Tariff & { updated_at })[];
  } });
  const discounts = useQuery({ queryKey: ['institution-discounts', institutionId], queryFn () => {
    const { data, error } = await supabase.from('institution_discounts').select('id,name,criteria,priority,kind,value,applies_to,active,updated_at').eq('institution_id', institutionId).order('priority');
    if (error) throw new Error('No se pudieron consultar los descuentos.');
    return data as (Discount & { updated_at })[];
  } });
  return { tariffs, discounts };
}

function friendly(e) {
  if (e.code === '23505') return kind === 'tarifa' ? 'Ya existe una tarifa activa con ese mismo servicio, nivel, vehículo y licencia. Desactívela primero.' : 'Esa prioridad ya la usa otro descuento activo.';
  if (e.code === '42501' || /row-level security/i.test(e.message)) return 'Solo Dirección, Subdirección o la superadministración pueden cambiar precios.';
  return kind === 'tarifa' ? 'No se pudo guardar la tarifa.' : 'No se pudo guardar el descuento.';
}

const scopeText = (t) => [t.level && (bandLabels[t.level ?? t.level), t.vehicle && roadVehicles.find(v => v.id === t.vehicle)?.label, t.license_category && `Licencia ${t.license_category}`].filter(Boolean).join(' · ') || 'General';

/** Price lists and priority discounts entered by each institution; nothing is charged automatically. */
export function TariffsPanel({ institutionId, canEdit }: { institutionId: string; canEdit }) {
  const cache = useQueryClient();
  const { tariffs, discounts } = useInstitutionPrices(institutionId);
  const [history, setHistory] = useState(false);
  const [msg, setMsg] = useState(null);
  const [t, setT] = useState({ service: 'matricula', label: '', level: '', vehicle: '', license: '', amount: '' });
  const [d, setD] = useState({ name: '', criteria: '', priority: '', kind: 'porcentaje''kind'], value: '', applies_to: 'todos' });
  const refresh = () => Promise.all([cache.invalidateQueries({ queryKey: ['institution-tariffs', institutionId] }), cache.invalidateQueries({ queryKey: ['institution-discounts', institutionId] }), cache.invalidateQueries({ queryKey: ['circuit-tariffs'] })]);
  const activeDiscounts = (discounts.data ?? []).filter(x => x.active);
  const nextPriority = (() => { const used = new Set(activeDiscounts.map(x => x.priority)); let p = 1; while (used.has(p) && p < 99) p++; return p; })();

  async function addTariff(e) {
    e.preventDefault(); setMsg(null);
    const amount = Number(t.amount);
    if (!Number.isInteger(amount) || amount < 0) { setMsg({ ok, text: 'Escriba un monto entero en colones (0 o más).' }); return; }
    const { error } = await supabase.from('institution_tariffs').insert({ institution_id, service: t.service, label: t.label.trim(), level: t.level.trim() || null, vehicle: t.service === 'circuito_vial' && t.vehicle ? t.vehicle, license_category: t.service === 'circuito_vial' && t.license.trim() ? t.license.trim().toUpperCase() : null, amount });
    if (error) { setMsg({ ok, text: friendly(error, 'tarifa') }); return; }
    setT(o => ({ ...o, label: '', amount: '' })); setMsg({ ok, text: 'Tarifa registrada.' }); await refresh();
  }
  async function addDiscount(e) {
    e.preventDefault(); setMsg(null);
    const value = Number(d.value); const priority = Number(d.priority || nextPriority);
    if (!Number.isInteger(value) || value <= 0 || (d.kind === 'porcentaje' && value > 100)) { setMsg({ ok, text: d.kind === 'porcentaje' ? 'El porcentaje debe ser un entero de 1 a 100.' : 'El monto debe ser un entero mayor que 0.' }); return; }
    if (!Number.isInteger(priority) || priority < 1 || priority > 99) { setMsg({ ok, text: 'La prioridad va de 1 (primero) a 99.' }); return; }
    const { error } = await supabase.from('institution_discounts').insert({ institution_id, name: d.name.trim(), criteria: d.criteria.trim(), priority, kind: d.kind, value, applies_to: d.applies_to });
    if (error) { setMsg({ ok, text: friendly(error, 'descuento') }); return; }
    setD(o => ({ ...o, name: '', criteria: '', priority: '', value: '' })); setMsg({ ok, text: 'Descuento registrado.' }); await refresh();
  }
  async function deactivate(table) {
    if (!window.confirm('¿Desactivar? Quedará en el historial y podrá registrar uno nuevo.')) return;
    const { error } = await supabase.from(table).update({ active }).eq('id', id);
    setMsg(error ? { ok, text: friendly(error, table === 'institution_tariffs' ? 'tarifa' : 'descuento') } : { ok, text: 'Desactivado.' });
    await refresh();
  }

  const rows = (tariffs.data ?? []).filter(x => history || x.active);
  return <section className="space-y-6">
    <div>
      <h2 className="text-xl font-bold">Tarifas, descuentos y prioridades</h2>
      <p className="mt-1 text-sm text-muted-foreground">Montos definidos por la institución. La app los muestra y los usa para la matrícula y su PDF, pero no cobra automáticamente. Para cambiar un monto, desactívelo y registre uno nuevo conserva.</p>
    </div>
    {msg && <p role={msg.ok ? 'status' : 'alert'} className={msg.ok ? 'text-success' : 'text-destructive'}>{msg.text}</p>}

    <div>
      <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-bold">Tarifas</h3><label className="text-sm"><input type="checkbox" className="mr-2" checked={history} onChange={e => setHistory(e.target.checked)} />Mostrar historial</label></div>
      {tariffs.isError ? <p role="alert" className="text-destructive">{tariffs.error.message}</p> : tariffs.isLoading ? <p className="text-sm text-muted-foreground">Cargando…</p> : !rows.length ? <p className="mt-2 text-sm text-muted-foreground">Aún no hay tarifas registradas.</p> :
      <div className="mt-2 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Tarifas de la institución</caption><thead><tr><th className="py-2">Servicio</th><th>Descripción</th><th>Alcance</th><th className="text-right">Monto</th><th><span className="sr-only">Acciones</span></th></tr></thead>
        <tbody>{rows.map(x => <tr key={x.id} className={`border-t border-border ${x.active ? '' : 'text-muted-foreground'}`}><td className="py-2">{SERVICE_LABELS[x.service]}</td><td>{x.label}{!x.active && ' (inactiva)'}</td><td>{scopeText(x)}</td><td className="text-right font-semibold">{formatColones(x.amount)}</td><td className="text-right">{canEdit && x.active && <Button size="sm" variant="ghost" onClick={() => void deactivate('institution_tariffs', x.id)}>Desactivar</Button>}</td></tr>)}</tbody></table></div>}
      {canEdit && <form onSubmit={addTariff} className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold">Servicio<select className={field} value={t.service} onChange={e => setT(o => ({ ...o, service: e.target.value, level: '', vehicle: '', license: '' }))}>{services.map(s => <option key={s} value={s}>{SERVICE_LABELS[s]}</option>)}</select></label>
        <label className="text-sm font-semibold">Descripción<input required minLength={2} maxLength={120} className={field} value={t.label} onChange={e => setT(o => ({ ...o, label: e.target.value }))} placeholder={t.service === 'matricula' ? 'Matrícula anual' : t.service === 'circuito_vial' ? 'Práctica de circuito' : 'Descripción'} /></label>
        {t.service === 'circuito_vial' ? <>
          <label className="text-sm font-semibold">Nivel del circuito<select className={field} value={t.level} onChange={e => setT(o => ({ ...o, level: e.target.value }))}><option value="">Cualquier nivel</option>{drivingBands.map(b => <option key={b} value={b}>{bandLabels[b]}</option>)}</select></label>
          <label className="text-sm font-semibold">Vehículo<select className={field} value={t.vehicle} onChange={e => setT(o => ({ ...o, vehicle: e.target.value }))}><option value="">Cualquier vehículo</option>{roadVehicles.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}</select></label>
          <label className="text-sm font-semibold">Tipo de licencia (opcional)<input maxLength={20} list="license-suggestions" className={field} value={t.license} onChange={e => setT(o => ({ ...o, license: e.target.value }))} placeholder="Ej. B1" /><datalist id="license-suggestions">{LICENSE_SUGGESTIONS.map(l => <option key={l} value={l} />)}</datalist><span className="mt-1 block text-xs font-normal text-muted-foreground">Referencia interna; verifique la categoría oficial vigente.</span></label>
        </> : <label className="text-sm font-semibold">Nivel (opcional)<input maxLength={60} className={field} value={t.level} onChange={e => setT(o => ({ ...o, level: e.target.value }))} placeholder="Ej. 7.° o 10.° CTP" /><span className="mt-1 block text-xs font-normal text-muted-foreground">Debe escribirse igual que el nivel de la solicitud para proponerse sola.</span></label>}
        <label className="text-sm font-semibold">Monto en colones<input required inputMode="numeric" type="number" min={0} max={10000000} step={1} className={field} value={t.amount} onChange={e => setT(o => ({ ...o, amount: e.target.value }))} /></label>
        <div className="sm:col-span-2"><Button type="submit">Registrar tarifa</Button></div>
      </form>}
    </div>

    <div className="border-t border-border pt-5">
      <h3 className="text-lg font-bold">Descuentos por prioridad</h3>
      <p className="mt-1 text-sm text-muted-foreground">Si a una persona le corresponden varios, se aplica solo el de prioridad más alta (número menor). No se acumulan.</p>
      {discounts.isError ? <p role="alert" className="text-destructive">{discounts.error.message}</p> : !(discounts.data ?? []).filter(x => history || x.active).length ? <p className="mt-2 text-sm text-muted-foreground">Aún no hay descuentos registrados.</p> :
      <div className="mt-2 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Descuentos ordenados por prioridad</caption><thead><tr><th className="py-2">Prioridad</th><th>Nombre y criterio</th><th>Aplica a</th><th className="text-right">Valor</th><th><span className="sr-only">Acciones</span></th></tr></thead>
        <tbody>{(discounts.data ?? []).filter(x => history || x.active).map(x => <tr key={x.id} className={`border-t border-border ${x.active ? '' : 'text-muted-foreground'}`}><td className="py-2 font-bold">{x.priority}</td><td>{x.name}{!x.active && ' (inactivo)'}{x.criteria && <small className="block text-muted-foreground">{x.criteria}</small>}</td><td>{x.applies_to === 'todos' ? 'Todos' : SERVICE_LABELS[x.applies_to]}</td><td className="text-right font-semibold">{x.kind === 'porcentaje' ? `${x.value} %` : formatColones(x.value)}</td><td className="text-right">{canEdit && x.active && <Button size="sm" variant="ghost" onClick={() => void deactivate('institution_discounts', x.id)}>Desactivar</Button>}</td></tr>)}</tbody></table></div>}
      {canEdit && <form onSubmit={addDiscount} className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold">Nombre<input required minLength={2} maxLength={120} className={field} value={d.name} onChange={e => setD(o => ({ ...o, name: e.target.value }))} placeholder="Ej. Beca institucional" /></label>
        <label className="text-sm font-semibold">Prioridad (1 = primero)<input type="number" min={1} max={99} step={1} className={field} value={d.priority} placeholder={String(nextPriority)} onChange={e => setD(o => ({ ...o, priority: e.target.value }))} /></label>
        <label className="text-sm font-semibold sm:col-span-2">Criterio (opcional)<input maxLength={500} className={field} value={d.criteria} onChange={e => setD(o => ({ ...o, criteria: e.target.value }))} placeholder="Quién puede recibirlo, según el reglamento de la institución" /></label>
        <label className="text-sm font-semibold">Tipo<select className={field} value={d.kind} onChange={e => setD(o => ({ ...o, kind: e.target.value'kind'] }))}><option value="porcentaje">Porcentaje</option><option value="monto">Monto fijo en colones</option></select></label>
        <label className="text-sm font-semibold">{d.kind === 'porcentaje' ? 'Porcentaje (1–100)' : 'Monto en colones'}<input required type="number" min={1} max={d.kind === 'porcentaje' ? 100 : 10000000} step={1} className={field} value={d.value} onChange={e => setD(o => ({ ...o, value: e.target.value }))} /></label>
        <label className="text-sm font-semibold">Aplica a<select className={field} value={d.applies_to} onChange={e => setD(o => ({ ...o, applies_to: e.target.value }))}><option value="todos">Todos los servicios</option>{services.map(s => <option key={s} value={s}>{SERVICE_LABELS[s]}</option>)}</select></label>
        <div className="sm:col-span-2"><Button type="submit">Registrar descuento</Button></div>
      </form>}
    </div>
  </section>;
}
