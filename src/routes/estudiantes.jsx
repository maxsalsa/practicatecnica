import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getAttemptReview, getDeckReview } from "@/lib/teacher-review.functions";
import { useAccount } from "@/components/AccountProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { grantTeacher, registerStudent } from "@/lib/student.functions";
import { CsvEnrollment } from "@/components/CsvEnrollment";
import { readAttempts } from "@/lib/cloud-progress";
import { aggregateAttempts } from "@/lib/progress-data";
import { LearningRecords } from "@/components/LearningRecords";
import { GradeBook } from "@/components/GradeBook";
import {updateClassroom,linkedStudentCertificates} from '@/lib/teacher-classroom.functions';
import {learningAchievements,progressAchievements} from '@/lib/learning-achievements';
import {decks} from '@/lib/questions';
import {certificationSubject} from '@/lib/certification-policy';
import { SkillProgress } from '@/components/SkillProgress';
import { TeacherBookProgress } from '@/components/BookTopicProgress';
import { TeacherAccess } from '@/components/TeacherAccess';
export const Route = createFileRoute("/estudiantes")({staticData:{sitemap:false},
  head: () => ({
    meta { title: "Estudiantes · pracTICAtecnica.com" },
      {
        name: "description",
        content: "Seguimiento privado de estudiantes, notas, puntos y rachas.",
      },
      { property: "og:title", content: "Estudiantes · pracTICAtecnica.com" },
      { property: "og:description", content: "Panel docente de aprendizaje." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <TeacherAccess><Students /></TeacherAccess>,
});
const empty = { name: "", email: "", institution: "", level: "", notes: "" };
function Students() {
  const { user, ready } = useAccount();
  const register = useServerFn(registerStudent);
  const classroom=useServerFn(updateClassroom);const readCertificates=useServerFn(linkedStudentCertificates);
  const [groupName,setGroupName]=useState('');const [groupId,setGroupId]=useState('');const [assignedDeck,setAssignedDeck]=useState('study-english-b1-v1');const [dueDate,setDueDate]=useState('');
  const grant = useServerFn(grantTeacher);
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherRole, setTeacherRole] = useState('teacher');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const roles = useQuery({
    queryKey: ["roles", user?.id],
    enabled: !!user,
    queryFn () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user?.id ?? "");
      if (error) throw error;
      return data;
    },
  });
  const admin = roles.data?.some((r) => r.role === "admin");
  const allowed = admin || roles.data?.some((r) => r.role === "teacher");
  const roster = useQuery({
    queryKey: ["students", user?.id, page],
    enabled: !!user && !!allowed,
    queryFn () => {
      const { data, error, count } = await supabase
        .from("students")
        .select("*", { count: "exact" })
        .order("created_at", { ascending })
        .order("id")
        .range(page * 25, page * 25 + 24);
      if (error) throw error;
      return { data, count ?? 0 };
    },
  });
  const details = useQuery({
    queryKey: ["student-attempts", selected],
    enabled: !!selected,
    queryFn: () => readAttempts(selected ?? ""),
    refetchInterval: 30000,
    refetchOnWindowFocus,
  });
  const summary = aggregateAttempts(details.data ?? []);
  const reviewFn = useServerFn(getAttemptReview);
  const [edit, setEdit] = useState(null);
  const [editMsg, setEditMsg] = useState('');
  async function saveEdit() {
    if (!edit) return;
    const patch: { name: string; status: string; email} = { name: edit.name.trim(), status: edit.status };
    if (!edit.linked) patch.email = edit.email.trim().toLowerCase();
    const { error } = await supabase.from("students").update(patch).eq("id", edit.id);
    if (error) { setEditMsg("No se pudo guardar. Revise los datos."); return; }
    setEditMsg("Cambios guardados."); setEdit(null); void roster.refetch();
  }
  const deckReviewFn = useServerFn(getDeckReview);
  const [planDeck, setPlanDeck] = useState('');
  const plan = useQuery({ queryKey: ["deck-review", planDeck], enabled: !!planDeck, queryFn: () => deckReviewFn({ data: { deckId } }) });
  const [reviewId, setReviewId] = useState(null);
  const review = useQuery({ queryKey: ["attempt-review", reviewId], enabled: !!reviewId, queryFn: () => reviewFn({ data: { attemptId ?? "" } }) });
  const answerSheets = useQuery({
    queryKey: ["student-answers", selected],
    enabled: !!selected,
    refetchInterval: 30000,
    queryFn () => {
      const { data, error } = await supabase.from("practice_attempts").select("id,title,score,created_at,answers").eq("user_id", selected ?? "").eq("assessment_mode", "exam").order("created_at", { ascending }).limit(20);
      if (error) throw new Error("No se pudieron leer las respuestas.");
      return (data ?? []).map((r) => ({ ...r, picks: Array.isArray(r.answers) ? (r.answers[]) : [] }));
    },
  });
  const linkedIds = (roster.data?.data ?? []).map((s) => s.user_id).filter((id): id is string => !!id);
  const blockStats = useQuery({
    queryKey: ["block-stats", linkedIds.join(",")],
    enabled: linkedIds.length > 0,
    refetchInterval: 30000,
    queryFn () => {
      const { data, error } = await supabase.from("practice_attempts").select("user_id,title,score,earned_points").eq("assessment_mode", "exam").eq("verified_scoring", true).in("user_id", linkedIds).limit(5000);
      if (error) throw new Error("No se pudo leer el avance por bloque.");
      const map, { n: number; sum: number; pass }> = {};
      for (const r of data ?? []) { const m = (map[r.title] ??= { n: 0, sum: 0, pass: 0 }); m.n++; m.sum += r.score; if (r.score >= 60) m.pass++; }
      const byUser, { n: number; pts }> = {};
      for (const r of data ?? []) { const u = (byUser[r.user_id] ??= { n: 0, pts: 0 }); u.n++; u.pts += r.earned_points; }
      return { blocks: Object.entries(map).sort(([x], [y]) => x.localeCompare(y)), byUser };
    },
  });
  const groups=useQuery({queryKey:['teacher-groups',user?.id],enabled:!!user&&!!allowed,queryFn:async()=>{const [g,m,a]=await Promise.all([supabase.from('teacher_groups').select('id,name').eq('teacher_id',user?.id??''),supabase.from('teacher_group_members').select('group_id,student_id'),supabase.from('student_exam_assignments').select('id,student_id,title,deck_id,due_date').eq('teacher_id',user?.id??'')]);if(g.error||m.error||a.error)throw new Error('No se pudo cargar grupos.');return {groups:g.data,members:m.data,assignments:a.data};}});
  const plans=useQuery({queryKey:['student-plans',user?.id],enabled:!!user&&!!allowed,queryFn:async()=>{const {data,error}=await supabase.rpc('teacher_student_plans');if(error)throw error;return Object.fromEntries((data??[]).map(r=>[r.student_id,r]));}});
  const certificates=useQuery({queryKey:['linked-certificates',selectedStudent],enabled:!!selectedStudent&&!!allowed,queryFn:()=>readCertificates({data:{studentId:selectedStudent??''}}),refetchInterval:30000,refetchOnWindowFocus:true});
  async function changeClassroom(data){setBusy(true);try{await classroom({data});await groups.refetch();setMessage('Cambio guardado.');}catch(e){setMessage(e instanceof Error?e.message:'No se pudo guardar.');}finally{setBusy(false);}}
  const filteredRoster=roster.data?.data.filter(s=>!groupId||groups.data?.members.some(m=>m.group_id===groupId&&m.student_id===s.id))??[];
  async function add(e) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await register({ data });
      setForm(empty);
      setMessage(
        "Estudiante registrado. Su avance se vincula al ingresar con este correo confirmado.",
      );
      await roster.refetch();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h1 className="text-4xl font-black">Administración y panel docente</h1>
        {!ready ? (
          <p className="mt-6">Cargando cuenta…</p>
        ) : !user ? (
          <div className="mt-6">
            <p>Ingrese para acceder al seguimiento privado.</p>
            <Button asChild className="mt-4">
              <Link to="/auth">Ingresar</Link>
            </Button>
          </div>
        ) : roles.isPending ? (
          <p className="mt-6">Comprobando permisos…</p>
        ) : !allowed ? (
          <p className="mt-6">
            Su cuenta no tiene acceso docente. Puede consultar su propio avance en{" "}
            <Link to="/panel" className="text-primary">
              Mi panel
            </Link>
            .
          </p>
        ) : (
          <>
            <p className="mt-3 text-muted-foreground">
              Seguimiento privado · cada docente ve únicamente sus estudiantes; administración puede
              consultar todos.
            </p>
            <CsvEnrollment institution={form.institution} onDone={() => void roster.refetch()} />
            <form onSubmit={add} className="mt-8 grid gap-4 border-y py-6 sm:grid-cols-2">
              <h2 className="text-xl font-bold sm:col-span-2">Registrar estudiante</h2>
              {(["name", "email", "institution", "level"]).map((k) => (
                <label key={k} className="grid gap-1 text-sm font-semibold">
                  {
                    {
                      name: "Nombre",
                      email: "Correo electrónico",
                      institution: "Centro educativo",
                      level: "Nivel",
                    }[k]
                  }
                  <input
                    type={k === "email" ? "email" : "text"}
                    required={k === "email" || k === "name"}
                    maxLength={k === "institution" ? 150 : 100}
                    value={form[k]}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    className="rounded-md border bg-background p-3 font-normal"
                  />
                </label>
              ))}
              <label className="grid gap-1 text-sm sm:col-span-2">
                Observaciones docentes
                <textarea
                  maxLength={1000}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="rounded-md border bg-background p-3"
                />
              </label>
              <Button disabled={busy} type="submit" className="justify-self-start">
                {busy ? "Guardando…" : "Agregar estudiante"}
              </Button>
            </form>
            {admin && (
              <form
                className="mt-6 flex flex-wrap items-end gap-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBusy(true);
                  try {
                    await grant({ data: { email, role } });
                    setMessage(
                      teacherRole === 'teacher' ? "Correo autorizado como docente; requiere prueba vigente o plan docente confirmado." : "Permiso docente retirado. Los permisos administrativos no se modifican.",
                    );
                    setTeacherEmail("");
                  } catch (e) {
                    setMessage(e instanceof Error ? e.message : "No se pudo autorizar.");
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                <label className="grid flex-1 gap-1 text-sm">
                  Correo para administrar permiso docente
                  <input
                    required
                    type="email"
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    className="rounded-md border bg-background p-3"
                  />
                </label>
                <label className="grid gap-1 text-sm">Permiso<select aria-label="Permiso docente" value={teacherRole} onChange={e=>setTeacherRole(e.target.value === 'teacher' ? 'teacher' : 'student')} className="rounded-md border bg-background p-3"><option value="teacher">Autorizar docente</option><option value="student">Estudiante · retirar docente</option></select></label>
                <Button type="submit" disabled={busy}>
                  Guardar permiso
                </Button>
              </form>
            )}
            {message && (
              <p role="status" className="mt-4 text-sm">
                {message}
              </p>
            )}
            <section className="mt-8 border-t border-border pt-5"><h2 className="text-xl font-bold">Estudiantes matriculados</h2><div className="mt-3 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-border"><th className="p-3">Nombre</th><th>Correo</th><th>Cuenta</th><th>Plan</th><th>Simulacros</th><th>Puntos</th><th>Estado</th><th><span className="sr-only">Acciones</span></th></tr></thead><tbody>{roster.data?.data.map(st=>{const u=st.user_id?blockStats.data?.byUser[st.user_id]:undefined;return <tr key={st.id} className="border-b border-border"><td className="p-3">{st.name}</td><td>{st.email}</td><td>{st.user_id?'Vinculada':'Pendiente'}</td><td>{(()=>{const pl=plans.data?.[st.id];if(!pl)return '—';const d=(x)=>x?new Date(x).toLocaleDateString('es-CR'):'';return !pl.has_access?'❌ Sin acceso':pl.paid_until&&new Date(pl.paid_until)>new Date()?`✅ Pagado hasta ${d(pl.paid_until)}`:`🧪 Prueba hasta ${d(pl.trial_ends)}`})()}</td><td>{u?.n??0}</td><td>{u?.pts??0}</td><td>{st.status}</td><td><Button size="sm" variant="outline" onClick={()=>{setEditMsg('');setEdit({id:st.id,name:st.name,email:st.email,status:st.status,linked:!!st.user_id})}}>Editar</Button></td></tr>})}</tbody></table></div>{editMsg&&<p role="status" className="mt-2 text-sm">{editMsg}</p>}{edit&&<form className="mt-4 grid gap-3 rounded-lg border border-border p-4 sm:grid-cols-3" onSubmit={e=>{e.preventDefault();void saveEdit();}}><label className="grid gap-1">Nombre<input required maxLength={120} value={edit.name} onChange={e=>setEdit({...edit,name:e.target.value})} className="rounded-md border border-border bg-card p-3"/></label><label className="grid gap-1">Correo{edit.linked&&<span className="text-xs text-muted-foreground">Cuenta vinculada cambia</span>}<input required type="email" disabled={edit.linked} value={edit.email} onChange={e=>setEdit({...edit,email:e.target.value})} className="rounded-md border border-border bg-card p-3"/></label><label className="grid gap-1">Estado<select value={edit.status} onChange={e=>setEdit({...edit,status:e.target.value})} className="rounded-md border border-border bg-card p-3"><option value="activo">Activo</option><option value="retirado">Retirado</option><option value="suspendido">Suspendido</option></select></label><div className="flex gap-2 sm:col-span-3"><Button type="submit">Guardar</Button><Button type="button" variant="outline" onClick={()=>setEdit(null)}>Cancelar</Button></div></form>}</section><section className="mt-8 border-t border-border pt-5"><h2 className="text-xl font-bold">Avance por bloque</h2><p className="mt-1 text-sm text-muted-foreground">Simulacros verificados de sus estudiantes vinculados. Aprobado: 60 o más.</p><h3 className="mt-3 font-bold">Planificar por bloque</h3><label className="mt-2 grid grid-cols-[minmax(0,1fr)] gap-1 text-sm">Bloque<select value={planDeck} onChange={e=>setPlanDeck(e.target.value)} className="w-full min-w-0 rounded-md border border-border bg-card p-3"><option value="">Seleccione un bloque</option>{decks.filter(d=>certificationSubject(d.id,d.questionCount??0)).map(d=><option key={d.id} value={d.id}>{d.title}</option>)}</select></label>{planDeck&&(plan.isPending?<p role="status">Cargando…</p>:plan.isError?<p role="alert">{plan.error.message}</p>:<ol className="mt-3 max-h-[32rem] space-y-3 overflow-y-auto text-sm">{plan.data?.map(q=><li key={q.n}><p className="font-semibold">{q.n}. {q.q}</p><ul className="ml-4">{q.options.map((o,k)=><li key={k} className={k===q.answer?'font-bold text-accent':''}>{'ABCD'[k]}) {o}{k===q.answer?' ✓':''}</li>)}</ul><p className="ml-4 text-muted-foreground">{q.why} · {q.source}</p></li>)}</ol>)}<h3 className="mt-3 font-bold">Simulacros asignados</h3><ul className="mt-2 space-y-1 text-sm">{groups.data?.assignments.map(a=><li key={a.id}>{a.title} · {roster.data?.data.find(st=>st.id===a.student_id)?.name??'Estudiante'} · Entrega: {a.due_date??'Sin fecha'}{(()=>{if(!a.due_date)return null;const d=Math.ceil((new Date(`${a.due_date}T23:59:59-06:00`).getTime()-Date.now())/86400000);return d<0?<span className="ml-2 font-bold text-destructive" role="status">⚠️ Vencido</span>:d<=3?<span className="ml-2 font-bold text-accent" role="status">⏰ Vence en {d} {d===1?'día':'días'}</span>:null})()}</li>)}</ul>{!groups.data?.assignments.length&&<p className="mt-1 text-sm text-muted-foreground">Sin simulacros asignados.</p>}{blockStats.isError?<p role="alert">No se pudo leer el avance por bloque.</p>:!linkedIds.length?<p className="mt-3 text-muted-foreground">Aún no hay estudiantes con cuenta vinculada.</p>:<div className="mt-3 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-border"><th className="p-3">Bloque</th><th>Intentos</th><th>Promedio</th><th>Aprobados</th><th>Reprobados</th></tr></thead><tbody>{blockStats.data?.blocks.map(([t,m])=><tr key={t} className="border-b border-border"><td className="p-3">{t}</td><td>{m.n}</td><td>{Math.round(m.sum/m.n)}%</td><td>{m.pass}</td><td>{m.n-m.pass}</td></tr>)}</tbody></table><div className="mt-5 space-y-4" aria-label="Gráfico por bloque">{blockStats.data?.blocks.map(([t,m])=>{const avg=Math.round(m.sum/m.n);const p=Math.round(m.pass/m.n*100);return <figure key={t}><figcaption className="text-sm font-semibold">{t}</figcaption><div className="mt-1 h-3 rounded-full bg-muted" role="img" aria-label={`Promedio ${avg}%`}><div className="h-3 rounded-full bg-primary" style={{width:`${avg}%`}}/></div><div className="mt-1 flex h-3 overflow-hidden rounded-full" role="img" aria-label={`${m.pass} aprobados, ${m.n-m.pass} reprobados`}><div className="bg-accent" style={{width:`${p}%`}}/><div className="bg-destructive" style={{width:`${100-p}%`}}/></div><p className="mt-1 text-xs text-muted-foreground">Promedio {avg}% · {m.pass} aprobados · {m.n-m.pass} reprobados</p></figure>})}</div>{blockStats.data?.blocks.length===0&&<p className="mt-3 text-muted-foreground">Sin simulacros entregados todavía.</p>}</div>}</section><section className="mt-8 border-y border-border py-5"><h2 className="text-xl font-bold">Grupos y matrícula</h2><form className="mt-4 flex flex-wrap items-end gap-3" onSubmit={e=>{e.preventDefault();void changeClassroom({action:'group',name:groupName});setGroupName('');}}><label className="grid gap-1">Nombre del grupo<input required maxLength={100} value={groupName} onChange={e=>setGroupName(e.target.value)} className="rounded-md border border-border bg-card p-3"/></label><Button disabled={busy} type="submit">Crear grupo</Button></form><label className="mt-4 grid gap-1">Grupo<select value={groupId} onChange={e=>setGroupId(e.target.value)} className="rounded-md border border-border bg-card p-3"><option value="">Todos mis estudiantes</option>{groups.data?.groups.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select></label>{groups.isError&&<p role="alert">No se pudieron consultar los grupos.</p>}{groupId&&<label className="mt-4 grid gap-1">Matricular estudiante registrado<select aria-label="Matricular estudiante registrado" value="" onChange={e=>{if(e.target.value)void changeClassroom({action:'member',groupId,studentId:e.target.value});}} className="rounded-md border border-border bg-card p-3"><option value="">Seleccione estudiante</option>{roster.data?.data.filter(s=>s.teacher_id===user.id).map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label>}</section><h2 className="mt-8 text-xl font-bold">Estudiantes del grupo</h2>
            {roster.isError ? (
              <p role="alert">
                No se pudo cargar el grupo.{" "}
                <Button variant="link" onClick={() => roster.refetch()}>
                  Reintentar
                </Button>
              </p>
            ) : roster.isPending ? (
              <p className="mt-4">Cargando estudiantes…</p>
            ) : (
              <>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3">Estudiante</th>
                        <th className="p-3">Centro / nivel</th>
                        <th className="p-3">Avance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRoster.map((s) => (
                        <tr key={s.id} className="border-b">
                          <td className="p-3">
                            <strong>{s.name}</strong>
                            <span className="block text-muted-foreground">{s.email}</span>
                          </td>
                          <td className="p-3">
                            {s.institution}
                            <span className="block text-muted-foreground">{s.level}</span>
                          </td>
                          <td className="p-3">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedStudent(s.id);
                                setSelected(s.user_id);
                              }}
                            >
                              Ver / registrar avance
                            </Button>
                            {!s.user_id && (
                              <span className="mt-1 block text-muted-foreground">
                                Cuenta pendiente de ingreso
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!filteredRoster.length && (
                    <p className="py-6 text-muted-foreground">
                      Aún no hay estudiantes registrados.
                    </p>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Button
                    variant="outline"
                    disabled={page === 0}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm">{roster.data.count} estudiantes</span>
                  <Button
                    variant="outline"
                    disabled={(page + 1) * 25 >= roster.data.count}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Siguiente
                  </Button>
                </div>
              </>
            )}
            {selectedStudent&&user&&<section className="mt-8 border-t border-border pt-5"><h2 className="text-xl font-bold">Asignar simulacro por materia</h2><form className="mt-4 grid gap-3" onSubmit={e=>{e.preventDefault();void changeClassroom({action:'assign',studentId,deckId,...(dueDate?{dueDate}:{})});}}><label className="grid gap-1">Simulacro<select className="rounded-md border border-border bg-card p-3" value={assignedDeck} onChange={e=>setAssignedDeck(e.target.value)}>{decks.filter(d=>certificationSubject(d.id,d.questionCount??0)).map(d=><option key={d.id} value={d.id}>{d.title}</option>)}</select></label><label className="grid gap-1">Fecha de entrega opcional<input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} className="rounded-md border border-border bg-card p-3"/></label><Button type="submit" disabled={busy}>Asignar simulacro</Button></form><ul className="mt-4 space-y-2">{groups.data?.assignments.filter(a=>a.student_id===selectedStudent).map(a=><li key={a.id}>{a.title} · {a.due_date??'Sin fecha'}</li>)}</ul><h3 className="mt-5 text-lg font-bold">Respuestas por simulacro</h3>{answerSheets.isError?<p role="alert">No se pudieron leer las respuestas.</p>:!answerSheets.data?.length?<p className="text-sm text-muted-foreground">Sin simulacros entregados por este estudiante.</p>:<ul className="mt-2 space-y-3">{answerSheets.data.map(r=><li key={r.id} className="rounded-lg border border-border p-3"><p className="font-semibold">{r.title} · {r.score}% · {new Date(r.created_at).toLocaleDateString('es-CR',{timeZone:'America/Costa_Rica'})}</p><p className="mt-1 text-sm">{r.picks.map(x=>`${x.index+1}:${x.pick>=0?'ABCD'[x.pick]??'?':'—'}`).join('  ')}</p><Button size="sm" variant="outline" className="mt-2" onClick={()=>setReviewId(reviewId===r.id?null:r.id)}>{reviewId===r.id?'Ocultar preguntas':'Ver preguntas y clave'}</Button>{reviewId===r.id&&(review.isPending?<p role="status">Cargando…</p>:review.isError?<p role="alert">{review.error.message}</p>:<ol className="mt-3 space-y-3 text-sm">{review.data?.map(q=><li key={q.n}><p className="font-semibold">{q.n}. {q.q}</p><ul className="ml-4">{q.options.map((o,k)=><li key={k} className={k===q.answer?'font-bold text-accent':k===q.pick?'text-destructive':''}>{'ABCD'[k]}) {o}{k===q.answer?' ✓ correcta':''}{k===q.pick?' ← eligió':''}</li>)}</ul></li>)}</ol>)}</li>)}</ul>}<h3 className="mt-5 text-lg font-bold">Certificados del estudiante vinculado</h3>{certificates.isError?<p role="alert">No se pudo consultar certificados.</p>:certificates.isPending?<p>Consultando…</p>:<ul>{certificates.data?.map(c=><li key={c.hash} className="mt-2"><Link className="text-primary underline" to="/certificados" search={{h:c.hash}}>{c.title} · {c.score}% · Verificar QR/SHA-256</Link></li>)}</ul>}</section>}
            {selectedStudent && user && (
              <><LearningRecords key={selectedStudent} studentId={selectedStudent} userId={user.id} />
              <GradeBook key={`g${selectedStudent}`} studentId={selectedStudent} editable={roster.data?.data.find(s=>s.id===selectedStudent)?.teacher_id===user.id} /></>
            )}
            {selectedStudent && <TeacherBookProgress key={`books-${selectedStudent}`} studentId={selectedStudent} studentName={roster.data?.data.find(s => s.id === selectedStudent)?.name} attempts={details.data ?? []} attemptsPending={!!selected && details.isPending} attemptsError={details.isError} />}
            {selectedStudent && !selected && <SkillProgress attempts={[]} />}
            {selected && (
              <section className="mt-8 border-t pt-6">
                <h2 className="text-xl font-bold">
                  {roster.data?.data.find((s) => s.id === selectedStudent)?.name} · Resultados de
                  prácticas
                </h2>
                {details.isPending ? (
                  <p>Cargando resultados…</p>
                ) : details.isError ? (
                  <p>No se pudo leer el avance.</p>
                ) : (
                  <>
                    <div className="mt-4 flex flex-wrap gap-6">
                      <p>
                        <strong>{summary.points}</strong> XP
                      </p>
                      <p>
                        <strong>{summary.streak.count}</strong> días de racha
                      </p>
                      <p>
                        <strong>{details.data?.length ?? 0}</strong> prácticas
                      </p>
                    </div>
                    <SkillProgress attempts={details.data ?? []} />
                    <h3 className="mt-5 text-xl font-bold">Insignias obtenidas</h3><ul>{[...progressAchievements(details.data??[],summary.streak.count),...learningAchievements(details.data??[],0)].filter(b=>b.earned).map(b=><li key={b.id} className="mt-2">🏅 {b.title} · {b.description}</li>)}</ul>
                    {Object.values(summary.stats).map((s) => (
                      <p key={s.title} className="mt-3 border-b py-2">
                        {s.title} · Última nota: {s.last}% · Mejor: {s.best}% · {s.attempts}{" "}
                        intentos
                      </p>
                    ))}
                    {!details.data?.length && (
                      <p className="mt-3 text-muted-foreground">
                        Sin prácticas registradas todavía.
                      </p>
                    )}
                  </>
                )}
              </section>
            )}
          </>
        )}
      </section>
    </main>
  );
}
