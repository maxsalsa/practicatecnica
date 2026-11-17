import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Mic, MicOff, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pianoKeyboardNote } from '@/lib/game-controls';
import { useAccount } from '@/components/AccountProvider';
import { supabase } from '@/integrations/supabase/client';
import { saveRecreationalSession, type RecreationalSession } from '@/lib/recreational-progress';
import { MUSIC_MODES, MUSIC_LEVELS, SOLFEGE, ROUND_SIZE, STAFF_NOTES, buildRound, musicSubject, midiToFreq, detectPitch, nearestNote, matchesPitchClass, noteName, type MusicLevel, type MusicMode, type MusicQuestion, type PlaySpec } from '@/lib/music-lab';

type LabMode = MusicMode | 'cantar';
const LOCAL_KEY = 'pt-anonymous-recreation';
const POINTS: Record<MusicLevel, number> = { inicial: 10, intermedio: 20, avanzado: 30 };
const AUDIO_MODES: LabMode[] = ['notas', 'intervalos', 'escalas', 'apreciacion'];
const band = (pct: number) => (pct >= 90 ? 'Dominado' : pct >= 50 ? 'En proceso' : 'Requiere reforzamiento');
const newSeed = () => Math.floor(Math.random() * 2 ** 31);

/** Tones are synthesized on this device with the Web Audio API; nothing is downloaded or recorded. */
function useSynth() {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodes = useRef<OscillatorNode[]>([]);
  const busyUntil = useRef(0);
  const ensure = useCallback(() => {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    void ctxRef.current.resume();
    return ctxRef.current;
  }, []);
  const stop = useCallback(() => { for (const o of nodes.current) { try { o.stop(); } catch { /* already stopped */ } } nodes.current = []; busyUntil.current = 0; }, []);
  const play = useCallback((spec: PlaySpec) => {
    const ctx = ensure(); if (!ctx) return false;
    stop();
    const beat = 60 / spec.bpm; let t = ctx.currentTime + 0.05;
    const master = ctx.createGain(); master.gain.value = spec.gain * 0.4; master.connect(ctx.destination);
    for (const step of spec.steps) {
      const dur = step.beats * beat;
      for (const n of step.notes) {
        const o = ctx.createOscillator(); o.type = spec.wave; o.frequency.value = midiToFreq(n);
        const g = ctx.createGain(); const peak = 1 / Math.max(1, step.notes.length);
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0008, t + dur * 0.95);
        o.connect(g).connect(master); o.start(t); o.stop(t + dur); nodes.current.push(o);
      }
      t += dur;
    }
    busyUntil.current = performance.now() + (t - ctx.currentTime) * 1000 + 150;
    return true;
  }, [ensure, stop]);
  useEffect(() => () => { stop(); const ctx=ctxRef.current; ctxRef.current=null; if(ctx&&ctx.state!=='closed')void ctx.close(); }, [stop]);
  return { play, stop, ensure, busy: () => performance.now() < busyUntil.current };
}

/** Personal bests: Cloud rows when signed in, this browser only otherwise. */
function useMusicBest() {
  const { user } = useAccount();
  const [local, setLocal] = useState<RecreationalSession[]>([]);
  const readLocal = useCallback(() => { try { const rows: RecreationalSession[] = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '[]'); setLocal(rows.filter(r => r.subject.startsWith('musica-v1:'))); } catch { setLocal([]); } }, []);
  useEffect(() => { if (!user) readLocal(); }, [user, readLocal]);
  const query = useQuery({
    queryKey: ['music-progress', user?.id], enabled: !!user, staleTime: 30_000,
    queryFn: async () => { if(!user)return []; const { data, error } = await supabase.from('recreational_sessions').select('id,subject,questions,correct,created_at').eq('user_id', user.id).like('subject', 'musica-v1:%').order('created_at', { ascending: false }).limit(300); if (error) throw error; return data as RecreationalSession[]; },
  });
  const rows = user ? (query.data ?? []) : local;
  const best = new Map<string, { correct: number; questions: number }>();
  for (const r of rows) { const b = best.get(r.subject); if (!b || r.correct / Math.max(1, r.questions) > b.correct / Math.max(1, b.questions)) best.set(r.subject, { correct: r.correct, questions: r.questions }); }
  return { user, best, refresh: readLocal };
}

function Keyboard({ highlight = [], onPlay }: { highlight?: number[]; onPlay: (midi: number) => void }) {
  const notes = Array.from({ length: 20 }, (_, i) => 57 + i);
  const whites = notes.filter(n => !(SOLFEGE[n % 12] ?? '').includes('♯'));
  const width = 100 / whites.length;
  return (
    <div className="mt-4 overflow-x-auto pb-2">
      <div role="group" tabIndex={0} aria-label="Teclado musical. Teclas A W S E D F T G Y H U J K o toque para escuchar." onKeyDown={e=>{const note=pianoKeyboardNote(e.key);if(note!==null&&!e.repeat){e.preventDefault();onPlay(note)}}} className="relative h-32 min-w-[528px] select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
        {whites.map((n, i) => (
          <button key={n} type="button" onClick={() => onPlay(n)} aria-label={noteName(n)} style={{ left: `${i * width}%`, width: `${width}%` }}
            className={`absolute top-0 flex h-full items-end justify-center rounded-b-md border border-border pb-1 text-[11px] font-semibold focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${highlight.includes(n) ? 'bg-accent text-accent-foreground' : 'bg-card text-foreground'}`}>
            {SOLFEGE[n % 12]}
          </button>
        ))}
        {notes.filter(n => (SOLFEGE[n % 12] ?? '').includes('♯')).map(n => {
          const i = whites.indexOf(n - 1);
          return <button key={n} type="button" onClick={() => onPlay(n)} aria-label={noteName(n)} style={{ left: `${(i + 1) * width - width * 0.3}%`, width: `${width * 0.6}%` }}
            className={`absolute top-0 z-10 h-[60%] rounded-b-md border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${highlight.includes(n) ? 'bg-accent' : 'bg-foreground'}`} />;
        })}
      </div>
    </div>
  );
}

function Staff({ midi }: { midi: number }) {
  const pos = STAFF_NOTES.find(s => s.midi === midi)?.pos ?? 0;
  const y = 90 - pos * 5;
  return (
    <svg viewBox="0 0 240 120" role="img" aria-label="Pentagrama en clave de sol con una nota escrita" className="mt-4 w-full max-w-sm rounded-xl border border-border bg-card text-foreground">
      {[0, 1, 2, 3, 4].map(i => <line key={i} x1="14" x2="226" y1={90 - i * 10} y2={90 - i * 10} stroke="currentColor" strokeWidth="1.2" />)}
      <text x="18" y="62" fontSize="11" fill="currentColor" fontWeight="700">Clave</text><text x="18" y="76" fontSize="11" fill="currentColor" fontWeight="700">de sol</text>
      {pos <= -2 && <line x1="120" x2="152" y1={100} y2={100} stroke="currentColor" strokeWidth="1.2" />}
      <ellipse cx="136" cy={y} rx="7.5" ry="5.2" transform={`rotate(-20 136 ${y})`} fill="currentColor" />
      <line x1={pos >= 4 ? 129.5 : 142.5} x2={pos >= 4 ? 129.5 : 142.5} y1={y} y2={pos >= 4 ? y + 32 : y - 32} stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Round({ mode, level, synth, onFinish }: { mode: MusicMode; level: MusicLevel; synth: ReturnType<typeof useSynth>; onFinish: (correct: number) => void }) {
  const [seed, setSeed] = useState(newSeed);
  const [round, setRound] = useState<MusicQuestion[]>(() => buildRound(mode, level, seed));
  const [n, setN] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const promptRef = useRef<HTMLHeadingElement>(null);
  const q = round[n];
  useEffect(() => { setRound(buildRound(mode, level, seed)); setN(0); setPick(null); setCorrect(0); }, [mode, level, seed]);
  useEffect(() => { promptRef.current?.focus(); if (q?.play && AUDIO_MODES.includes(mode)) synth.play(q.play); }, [q, mode, synth]);
  if (!q) return null;
  const answer = (i: number) => { if (pick !== null) return; setPick(i); if (i === q.answer) setCorrect(c => c + 1); if (mode === 'pentagrama' && q.play) synth.play(q.play); };
  const next = () => { if (n + 1 >= round.length) { onFinish(correct); setSeed(newSeed()); return; } setN(n + 1); setPick(null); };
  return (
    <div className="mt-5 rounded-2xl border border-border bg-card p-4 shadow-card">
      <p className="text-sm text-muted-foreground">Pregunta {n + 1} de {round.length} · Aciertos {correct}</p>
      <h3 ref={promptRef} tabIndex={-1} className="mt-1 text-xl font-bold outline-none">{q.prompt}</h3>
      {q.staff !== undefined && <Staff midi={q.staff} />}
      {q.play && AUDIO_MODES.includes(mode) && <Button className="mt-3 min-h-11" variant="outline" onClick={() => q.play && synth.play(q.play)}><Play className="mr-2 h-4 w-4" aria-hidden />Escuchar otra vez</Button>}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {q.options.map((o, i) => {
          const state = pick === null ? 'outline' : i === q.answer ? 'default' : i === pick ? 'destructive' : 'outline';
          return <Button key={o} variant={state} className="h-auto min-h-11 justify-start whitespace-normal p-3 text-left" aria-pressed={pick === i} disabled={pick !== null && i !== pick && i !== q.answer} onClick={() => answer(i)}>{String.fromCharCode(65 + i)}. {o}</Button>;
        })}
      </div>
      <div role="status" aria-live="polite" className="mt-3 min-h-6">
        {pick !== null && <p className={pick === q.answer ? 'font-semibold text-primary' : 'font-semibold text-destructive'}>{pick === q.answer ? 'Correcto.' : `Respuesta correcta: ${q.options[q.answer]}.`} <span className="font-normal text-foreground">{q.why}</span></p>}
      </div>
      {pick !== null && q.highlight && <><p className="mt-2 text-sm text-muted-foreground">Notas marcadas en el teclado; tóquelas para comparar.</p><Keyboard highlight={q.highlight} onPlay={m => synth.play({ steps: [{ notes: [m], beats: 1 }], bpm: 70, gain: 0.7, wave: 'triangle' })} /></>}
      {pick !== null && <Button className="mt-4 min-h-11" onClick={next}>{n + 1 >= round.length ? 'Ver resultado' : 'Siguiente'}</Button>}
    </div>
  );
}

const SING_TARGETS: Record<MusicLevel, number[]> = { inicial: [60, 62, 64, 65, 67], intermedio: [60, 62, 64, 65, 67, 69, 71], avanzado: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71] };
const SING_COUNT = 5;

/** Singing practice: the microphone signal is analyzed in memory on this device; audio is never recorded or sent. */
function SingLab({ level, synth, onFinish }: { level: MusicLevel; synth: ReturnType<typeof useSynth>; onFinish: (correct: number, total: number) => void }) {
  const [targets, setTargets] = useState<number[]>(() => Array.from({ length: SING_COUNT }, () => { const l = SING_TARGETS[level]; return l[Math.floor(Math.random() * l.length)] ?? 60; }));
  const [n, setN] = useState(0); const [hits, setHits] = useState(0);
  const [heard, setHeard] = useState<{ name: string; cents: number } | null>(null);
  const [status, setStatus] = useState(''); const [on, setOn] = useState(false); const [done, setDone] = useState(false);
  const stream = useRef<MediaStream | null>(null); const raf = useRef(0); const stable = useRef(0); const lock = useRef(false);
  const target = targets[n] ?? 60;
  const stopMic = useCallback(() => { cancelAnimationFrame(raf.current); stream.current?.getTracks().forEach(t => t.stop()); stream.current = null; setOn(false); }, []);
  useEffect(() => () => stopMic(), [stopMic]);
  useEffect(() => { const l = SING_TARGETS[level]; setTargets(Array.from({ length: SING_COUNT }, () => l[Math.floor(Math.random() * l.length)] ?? 60)); setN(0); setHits(0); setDone(false); }, [level]);
  const advance = useCallback((ok: boolean) => {
    lock.current = true; stable.current = 0;
    if (ok) setHits(h => h + 1);
    setStatus(ok ? `¡Afinado! Cantó ${noteName(target).replace(/\d+$/, '')}.` : `Se saltó ${noteName(target).replace(/\d+$/, '')}.`);
    setTimeout(() => { lock.current = false; setN(i => { if (i + 1 >= SING_COUNT) { setDone(true); return i; } return i + 1; }); }, 900);
  }, [target]);
  useEffect(() => { if (done) { stopMic(); onFinish(hits, SING_COUNT); } }, [done]); // eslint-disable-line react-hooks/exhaustive-deps
  const playTarget = () => synth.play({ steps: [{ notes: [target], beats: 2 }], bpm: 60, gain: 0.7, wave: 'triangle' });
  const start = async () => {
    const ctx = synth.ensure();
    if (!ctx || !navigator.mediaDevices?.getUserMedia) { setStatus('Este navegador no permite analizar el micrófono. Practique con los otros modos.'); return; }
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: false } });
      stream.current = s; setOn(true); setStatus('Escuche la nota y cántela con «la» o «u» sostenida.');
      const analyser = ctx.createAnalyser(); analyser.fftSize = 2048; ctx.createMediaStreamSource(s).connect(analyser);
      const buf = new Float32Array(analyser.fftSize);
      const loop = () => {
        analyser.getFloatTimeDomainData(buf);
        const f = synth.busy() || lock.current ? null : detectPitch(buf, ctx.sampleRate);
        if (f) { const nn = nearestNote(f); setHeard({ name: nn.name, cents: nn.cents }); stable.current = matchesPitchClass(f, targetRef.current) ? stable.current + 1 : 0; if (stable.current >= 18) advance(true); }
        else stable.current = Math.max(0, stable.current - 1);
        raf.current = requestAnimationFrame(loop);
      };
      loop(); playTarget();
    } catch { setStatus('No se pudo usar el micrófono (permiso denegado o sin dispositivo). Practique con los otros modos.'); }
  };
  const targetRef = useRef(target); targetRef.current = target;
  const advanceRef = useRef(advance); advanceRef.current = advance;
  return (
    <div className="mt-5 rounded-2xl border border-border bg-card p-4 shadow-card">
      <p className="text-sm text-muted-foreground">El sonido del micrófono se analiza solo en este dispositivo; no se graba ni se envía. Use audífonos si el parlante interfiere.</p>
      <p className="mt-3 text-sm text-muted-foreground">Nota {Math.min(n + 1, SING_COUNT)} de {SING_COUNT} · Afinadas {hits}</p>
      <h3 className="mt-1 text-2xl font-black">Cante: {noteName(target).replace(/\d+$/, '')}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {!on ? <Button className="min-h-11" onClick={start} disabled={done}><Mic className="mr-2 h-4 w-4" aria-hidden />Activar micrófono</Button> : <Button className="min-h-11" variant="outline" onClick={stopMic}><MicOff className="mr-2 h-4 w-4" aria-hidden />Apagar micrófono</Button>}
        <Button className="min-h-11" variant="outline" onClick={playTarget}><Play className="mr-2 h-4 w-4" aria-hidden />Escuchar la nota</Button>
        <Button className="min-h-11" variant="ghost" disabled={done || lock.current} onClick={() => advanceRef.current(false)}>Saltar</Button>
      </div>
      {on && <div className="mt-4">
        <p className="text-sm">Se escucha: <strong>{heard ? `${heard.name} (${heard.cents > 0 ? '+' : ''}${heard.cents} cents)` : '—'}</strong></p>
        <div className="relative mt-2 h-3 rounded-full bg-muted" aria-hidden>
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-foreground" />
          {heard && <div className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" style={{ left: `${50 + Math.max(-50, Math.min(50, heard.cents))}%` }} />}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Centro = afinado. Vale cualquier octava, dentro de medio semitono.</p>
      </div>}
      <p role="status" aria-live="polite" className="mt-3 min-h-6 font-semibold">{status}</p>
    </div>
  );
}

export function MusicLab() {
  const synth = useSynth();
  const qc = useQueryClient();
  const { user, best, refresh } = useMusicBest();
  const [mode, setMode] = useState<LabMode>('notas');
  const [level, setLevel] = useState<MusicLevel>('inicial');
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);
  const [save, setSave] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const pending = useRef<RecreationalSession | null>(null);
  const [run, setRun] = useState(0);
  const persist = async (session: RecreationalSession) => {
    setSave('saving');
    try { await saveRecreationalSession(user?.id, session); setSave('saved'); if (user) await qc.invalidateQueries({ queryKey: ['music-progress', user.id] }); else refresh(); }
    catch { setSave('error'); }
  };
  const finish = (correct: number, total = ROUND_SIZE) => {
    setResult({ correct, total });
    const session = { id: crypto.randomUUID(), subject: musicSubject(mode, level), questions: total, correct, created_at: new Date().toISOString() };
    pending.current = session; void persist(session);
  };
  const choose = (m: LabMode, l: MusicLevel) => { synth.stop(); setMode(m); setLevel(l); setResult(null); setSave('idle'); setRun(r => r + 1); };
  const modes: { id: LabMode; label: string; hint: string }[] = [...MUSIC_MODES, { id: 'cantar', label: 'Cantar (micrófono)', hint: 'Escuche una nota y cántela; el afinador la reconoce en su dispositivo.' }];
  const pct = result ? Math.round((result.correct / Math.max(1, result.total)) * 100) : 0;
  return (
    <div className="mt-4">
      <p className="text-muted-foreground">Entrene el oído como en «listening» y «speaking», pero con música. Sonidos generados en su dispositivo; resultados recreativos privados, sin notas académicas.</p>
      <fieldset className="mt-4"><legend className="text-sm font-semibold">Modo</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {modes.map(m => <Button key={m.id} variant={mode === m.id ? 'default' : 'outline'} aria-pressed={mode === m.id} className="h-auto min-h-11 flex-col items-start whitespace-normal p-3 text-left" onClick={() => choose(m.id, level)}>
            <span className="font-bold">{m.label}</span><span className="text-xs font-normal opacity-80">{m.hint}</span>
          </Button>)}
        </div>
      </fieldset>
      <fieldset className="mt-4"><legend className="text-sm font-semibold">Nivel</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {MUSIC_LEVELS.map(l => { const b = best.get(musicSubject(mode, l.id)); return <Button key={l.id} variant={level === l.id ? 'default' : 'outline'} aria-pressed={level === l.id} className="min-h-11" onClick={() => choose(mode, l.id)}>{l.label}{b ? ` · mejor ${b.correct}/${b.questions}` : ''}</Button>; })}
        </div>
      </fieldset>
      {result ? (
        <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-card" role="region" aria-label="Resultado de la ronda">
          <h3 className="text-2xl font-black">{result.correct} de {result.total} · {pct}%</h3>
          <p className="mt-1 font-semibold">{band(pct)} · {result.correct * POINTS[level]} puntos recreativos</p>
          <p className="mt-1 text-sm text-muted-foreground">{pct >= 90 ? (level === 'avanzado' ? 'Excelente dominio. Pruebe otro modo.' : 'Listo para subir de nivel.') : 'Repita la ronda: cada intento cambia las preguntas.'}</p>
          <p role="status" className="mt-2 text-sm">{save === 'saving' ? 'Guardando…' : save === 'saved' ? (user ? 'Guardado en su perfil.' : 'Guardado solo en este navegador; inicie sesión para guardarlo en su perfil.') : save === 'error' ? 'No se pudo guardar.' : ''}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {save === 'error' && pending.current && <Button variant="outline" className="min-h-11" onClick={() => pending.current && void persist(pending.current)}>Reintentar guardado</Button>}
            <Button className="min-h-11" onClick={() => choose(mode, level)}><RotateCcw className="mr-2 h-4 w-4" aria-hidden />Otra ronda</Button>
            {pct >= 90 && level !== 'avanzado' && <Button variant="outline" className="min-h-11" onClick={() => choose(mode, level === 'inicial' ? 'intermedio' : 'avanzado')}>Subir de nivel</Button>}
          </div>
        </div>
      ) : mode === 'cantar'
        ? <SingLab key={`${run}-${level}`} level={level} synth={synth} onFinish={finish} />
        : <Round key={`${run}-${mode}-${level}`} mode={mode} level={level} synth={synth} onFinish={c => finish(c)} />}
      <details className="mt-5 rounded-2xl border border-border bg-card p-4">
        <summary className="cursor-pointer font-semibold">Teclado libre para explorar</summary>
        <p className="mt-2 text-sm text-muted-foreground">De La3 a Mi5. Toque las teclas para comparar alturas y construir escalas.</p>
        <Keyboard onPlay={m => synth.play({ steps: [{ notes: [m], beats: 1 }], bpm: 70, gain: 0.7, wave: 'triangle' })} />
      </details>
    </div>
  );
}
