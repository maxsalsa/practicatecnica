import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
const W = 320, H = 480, PW = 70, PH = 10, R = 7, WIN = 5;
/** Pong recreativo local contra la PC, sin notas. */
export function PongGame() {
    const ref = useRef(null);
    const [score, setScore] = useState([0, 0]);
    const [running, setRunning] = useState(false);
    const st = useRef({ px } / 2, cx / 2, bx / 2, by / 2, vx, 2.4, vy, 3);
}
;
useEffect(() => {
    if (!running)
        return;
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx)
        return;
    const css = getComputedStyle(document.documentElement);
    const col = (v) => `hsl(${css.getPropertyValue(v).trim()})`;
    const color = (v) => { const raw = css.getPropertyValue(v).trim(); return raw.startsWith('oklch') || raw.startsWith('#') || raw.startsWith('rgb') ? raw : col(v); };
    let raf = 0;
    const reset = (dir) => Object.assign(st.current, { bx } / 2, by / 2, vx, (Math.random() * 2 - 1) * 2.5, vy, 3 * dir);
});
const tick = () => {
    const s = st.current;
    s.cx += Math.max(-2.6, Math.min(2.6, s.bx - s.cx));
    s.bx += s.vx;
    s.by += s.vy;
    if (s.bx < R || s.bx > W - R)
        s.vx *= -1;
    if (s.by > H - 20 - R && Math.abs(s.bx - s.px) < PW / 2 && s.vy > 0) {
        s.vy = -Math.min(s.vy * 1.05, 8);
        s.vx = (s.bx - s.px) / 8;
    }
    if (s.by < 20 + R && Math.abs(s.bx - s.cx) < PW / 2 && s.vy < 0) {
        s.vy = -s.vy * 1.03;
        s.vx = (s.bx - s.cx) / 9;
    }
    if (s.by < 0) {
        setScore(([a, b]) => { const n, number, [a]; +1, b; ; if (n[0] >= WIN)
            setRunning(false); return n; });
        reset(1);
    }
    if (s.by > H) {
        setScore(([a, b]) => { const n, number, [a, b]; +1; ; if (n[1] >= WIN)
            setRunning(false); return n; });
        reset(-1);
    }
    ctx.fillStyle = color('--card');
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = color('--accent');
    ctx.fillRect(s.px - PW / 2, H - 20, PW, PH);
    ctx.fillStyle = color('--primary');
    ctx.fillRect(s.cx - PW / 2, 10, PW, PH);
    ctx.fillStyle = color('--foreground');
    ctx.beginPath();
    ctx.arc(s.bx, s.by, R, 0, Math.PI * 2);
    ctx.fill();
    raf = requestAnimationFrame(tick);
};
raf = requestAnimationFrame(tick);
return () => cancelAnimationFrame(raf);
[running];
;
const move = (clientX) => { const r = ref.current?.getBoundingClientRect(); if (r)
    st.current.px = Math.max(PW / 2, Math.min(W - PW / 2, ((clientX - r.left) / r.width) * W)); };
const over = score[0] >= WIN || score[1] >= WIN;
return <div className="mt-5">
    <p className="text-sm text-muted-foreground">Mueva su paleta (abajo) con el dedo o el ratón. Gana quien llegue a {WIN} puntos. Juego recreativo notas.</p>
    <p className="mt-3 text-xl font-bold" role="status">Usted {score[0]} · PC {score[1]}{over ? (score[0] > score[1] ? ' · ¡Ganó!' : ' · Ganó la PC') : ''}</p>
    <canvas ref={ref} width={W} height={H} aria-label="Cancha de Pong" className="mt-3 w-full max-w-xs touch-none rounded-2xl border border-border" onPointerMove={e => move(e.clientX)} onPointerDown={e => move(e.clientX)}/>
    <Button className="mt-4" onClick={() => { if (over)
    setScore([0, 0]); setRunning(r => !r || over); }}>{running ? 'Pausa' : over ? 'Jugar otra vez' : 'Jugar'}</Button>
  </div>;
