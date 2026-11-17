import { useMemo, useState } from "react";
import { Chess } from "chess.js";
import { Button } from "@/components/ui/button";
import * "@/lib/checkers";

function HowTo({ steps }) {
  return <ol className="mt-3 grid gap-2 sm:grid-cols-3">{steps.map((s, i) => <li key={i} className="rounded-xl border bg-card p-3 text-sm"><span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{i + 1}</span>{s}</li>)}</ol>;
}
function Turn({ who, names }) {
  return <p className="mt-3 text-lg font-bold" role="status">Turno className={who === 0 ? "text-primary" : "text-accent"}>{names[who]}</span> · pase el dispositivo</p>;
}

const GLYPH, string> = { wp: "♙", wn: "♘", wb: "♗", wr: "♖", wq: "♕", wk: "♔", bp: "♟", bn: "♞", bb: "♝", br: "♜", bq: "♛", bk: "♚" };
export function ChessGame() {
  const [game, setGame] = useState(() => new Chess());
  const [sel, setSel] = useState(null);
  const [, force] = useState(0);
  const targets = useMemo(() => sel ? game.moves({ square, verbose }).map(m => m.to) : [], [sel, game, game.fen()]);
  const files = "abcdefgh";
  const click = (sq) => {
    if (sel && targets.includes(sq)) { game.move({ from, to, promotion: "q" }); setSel(null); force(x => x + 1); return; }
    const p = game.get(sq); setSel(p && p.color === game.turn() ? sq);
  };
  const status = game.isCheckmate() ? `¡Jaque mate! Gana ${game.turn() === "w" ? "Negras" : "Blancas"}.` : game.isDraw() ? "Tablas." : game.inCheck() ? "¡Jaque!" : "";
  return <div className="mt-4">
    <HowTo steps={["Toque una pieza de su color posibles.", "Toque la casilla verde para mover. El peón que llega al final se vuelve dama.", "Gana quien dé jaque mate al rey contrario."]} />
    <Turn who={game.turn() === "w" ? 0 : 1} names={["Blancas ♔", "Negras ♚"]} />
    {status && <p className="font-bold text-accent" role="alert">{status}</p>}
    <div className="mx-auto mt-3 grid max-w-md grid-cols-8 overflow-hidden rounded-xl border-4 border-primary" aria-label="Tablero de ajedrez">
      {Array.from({ length: 64 }, (_, i) => { const r = 8 - Math.floor(i / 8), f = files[i % 8]; const sq = `${f}${r}`; const p = game.get(sq); const dark = (i + Math.floor(i / 8)) % 2 === 1;
        return <Button key={sq} type="button" variant="ghost" aria-label={sq} disabled={game.isGameOver()} onClick={() => click(sq)} className={`relative h-auto min-w-0 rounded-none p-0 aspect-square text-3xl sm:text-4xl hover:opacity-90 ${dark ? "bg-board-dark hover:bg-board-dark" : "bg-board-light hover:bg-board-light"} ${sel === sq ? "ring-4 ring-inset ring-accent" : ""}`}>
          {p ? <span className={p.color === "w" ? "text-piece-light" : "text-piece-dark"}>{GLYPH[p.color + p.type]}</span> : null}
          {targets.includes(sq) && <span className="absolute h-4 w-4 rounded-full bg-accent" />}
        </Button>; })}
    </div>
    <div className="mt-3 flex justify-center gap-2"><Button variant="outline" onClick={() => { game.undo(); setSel(null); force(x => x + 1); }}>↩ Deshacer</Button><Button onClick={() => { setGame(new Chess()); setSel(null); }}>Nueva partida</Button></div>
  </div>;
}

export function CheckersGame() {
  const [b, setB] = useState(K.start);
  const [turn, setTurn] = useState(1);
  const [sel, setSel] = useState(null);
  const [chain, setChain] = useState(null);
  const legal = chain === null ? K.allMoves(b, turn) : K.movesFor(b, chain).filter(m => m.jump !== undefined);
  const mine = sel === null ? [] : legal.filter(m => m.from === sel);
  const red = b.filter(v => K.owner(v) === 1).length, black = b.filter(v => K.owner(v) === 2).length;
  const winner = !red ? "Negras" : !black ? "Rojas" : !legal.length ? (turn === 1 ? "Negras" : "Rojas") : "";
  const click = (i) => {
    if (winner) return;
    const m = mine.find(x => x.to === i);
    if (m) { const nb = K.apply(b, m); const again = m.jump !== undefined && K.movesFor(nb, m.to).some(x => x.jump !== undefined);
      setB(nb); if (again) { setSel(m.to); setChain(m.to); } else { setSel(null); setChain(null); setTurn(turn === 1 ? 2 : 1); } return; }
    if (chain !== null) return;
    setSel(K.owner(b[i] ?? 0) === turn && legal.some(x => x.from === i) ? i);
  };
  return <div className="mt-4">
    <HowTo steps={["Mueva en diagonal hacia adelante a una casilla libre.", "Si puede saltar una ficha rival, debe hacerlo; puede encadenar saltos.", "Al llegar al otro lado se corona 👑 y mueve hacia atrás también."]} />
    {winner ? <p className="mt-3 text-xl font-black text-accent" role="alert">🏆 ¡Ganan las {winner}!</p> : <Turn who={turn === 1 ? 0 : 1} names={["Rojas 🔴", "Negras ⚫"]} />}
    <p className="text-sm text-muted-foreground">Fichas: 🔴 {red} · ⚫ {black}</p>
    <div className="mx-auto mt-3 grid max-w-md grid-cols-8 overflow-hidden rounded-xl border-4 border-primary">
      {b.map((v, i) => { const dark = (Math.floor(i / 8) + i % 8) % 2 === 1; const target = mine.some(m => m.to === i); const can = legal.some(m => m.from === i);
        return <button key={i} type="button" aria-label={`Casilla ${i + 1}`} disabled={!dark} onClick={() => click(i)} className={`relative flex aspect-square items-center justify-center text-2xl sm:text-3xl ${dark ? "bg-primary/60" : "bg-card"} ${sel === i ? "ring-4 ring-inset ring-accent" : can && !winner ? "ring-2 ring-inset ring-accent/50" : ""}`}>
          {v ? <span>{K.owner(v) === 1 ? "🔴" : "⚫"}{v > 2 && <span className="absolute text-sm">👑</span>}</span> : null}
          {target && <span className="absolute h-4 w-4 rounded-full bg-accent" />}
        </button>; })}
    </div>
    <div className="mt-3 flex justify-center"><Button onClick={() => { setB(K.start()); setTurn(1); setSel(null); setChain(null); }}>Nueva partida</Button></div>
  </div>;
}

const CARDS = [
  { n: "Router", e: "📡", t: ["red", "hardware"] }, { n: "Servidor", e: "🖥️", t: ["red", "hardware"] }, { n: "Firewall", e: "🧱", t: ["red", "seguridad"] }, { n: "Antivirus", e: "🛡️", t: ["software", "seguridad"] },
  { n: "Python", e: "🐍", t: ["software", "programación"] }, { n: "HTML", e: "🌐", t: ["software", "programación", "web"] }, { n: "CSS", e: "🎨", t: ["software", "web"] }, { n: "Base de datos", e: "🗄️", t: ["software", "datos"] },
  { n: "Sensor IoT", e: "🌡️", t: ["hardware", "electrónica"] }, { n: "Multímetro", e: "🔌", t: ["hardware", "electrónica"] }, { n: "Placa Arduino", e: "🔧", t: ["hardware", "electrónica", "programación"] }, { n: "Contraseña", e: "🔑", t: ["seguridad", "datos"] },
];
const QUESTIONS = ["hardware", "software", "red", "seguridad", "programación", "web", "electrónica", "datos"];
export function GuessWhoGame() {
  const [secret, setSecret] = useState(() => Math.floor(Math.random() * CARDS.length));
  const [down, setDown] = useState([]);
  const [log, setLog] = useState([]);
  const [result, setResult] = useState("");
  const ask = (q) => { const card = CARDS[secret]; if (!card) return; const yes = card.t.includes(q); setDown(d => [...new Set([...d, ...CARDS.map((c, i) => (c.t.includes(q) !== yes ? i : -1)).filter(i => i >= 0)])]); setLog(l => [`¿Es de ${q}? ${yes ? "✅ Sí" : "❌ No"}`, ...l]); };
  const guess = (i) => { const card = CARDS[i]; const hidden = CARDS[secret]; if (!card || !hidden) return; setResult(i === secret ? `🏆 ¡Lo logró en ${log.length} preguntas! Era ${hidden.n}.` : `No es ${card.n}. Siga preguntando.`); };
  return <div className="mt-4">
    <HowTo steps={["La computadora escondió un concepto técnico.", "Toque una pregunta solas.", "Cuando quede una, tóquela para adivinar. ¡Menos preguntas, mejor!"]} />
    <div className="mt-3 flex flex-wrap gap-2">{QUESTIONS.map(q => <Button key={q} size="sm" variant="outline" onClick={() => ask(q)}>¿Es de {q}?</Button>)}</div>
    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">{CARDS.map((c, i) => <button key={c.n} type="button" onClick={() => guess(i)} disabled={down.includes(i)} className={`rounded-xl border p-3 text-center transition ${down.includes(i) ? "scale-95 bg-muted opacity-30" : "bg-card hover:border-accent"}`}><span className="block text-4xl" aria-hidden>{c.e}</span><span className="text-sm font-bold">{c.n}</span></button>)}</div>
    {result && <p className="mt-3 text-lg font-bold text-accent" role="status">{result}</p>}
    <ul className="mt-2 text-sm text-muted-foreground">{log.slice(0, 4).map((l, i) => <li key={i}>{l}</li>)}</ul>
    <Button className="mt-3" onClick={() => { setSecret(Math.floor(Math.random() * CARDS.length)); setDown([]); setLog([]); setResult(""); }}>Nueva ronda</Button>
  </div>;
}
