import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { tttWinner, tttBestMove, c4Empty, c4Drop, c4Winner, c4AiMove, C4_COLS, newDeck, shuffle, handTotal, sevenResult, SUSPECTS, ROOMS, ITEMS, mysteryHint } from '@/lib/classic-games';

const box = 'mt-4 rounded-2xl border border-border bg-card p-4';
const rules = (t) => <p className="mt-3 rounded-xl border border-border bg-card p-3 text-sm">{t}</p>;

export function TicTacToe() {
  const [b, setB] = useState(Array(9).fill(''));
  const w = tttWinner(b); const full = b.every(Boolean);
  const play = (i) => { if (b[i] || w) return; const n = [...b]; n[i] = 'X'; if (!tttWinner(n) && !n.every(Boolean)) { const m = tttBestMove(n, 'O'); if (m >= 0) n[m] = 'O'; } setB(n); };
  return <div>{rules('Usted juega con X y la PC con O. Haga tres en línea: horizontal, vertical o diagonal.')}
    <div className="mx-auto mt-4 grid max-w-xs grid-cols-3 gap-2">{b.map((v, i) => <Button key={i} aria-label={`Casilla ${i + 1}`} variant="outline" className={`aspect-square h-auto text-4xl font-black ${v === 'X' ? 'text-primary' : 'text-accent'}`} onClick={() => play(i)}>{v || ''}</Button>)}</div>
    <p role="status" className="mt-4 text-center font-bold">{w === 'X' ? '¡Ganó!' : w === 'O' ? 'Ganó la PC. ¡Inténtelo de nuevo!' : full ? 'Empate.' : 'Su turno.'}</p>
    <div className="text-center"><Button className="mt-3" onClick={() => setB(Array(9).fill(''))}>Nueva partida</Button></div></div>;
}

export function ConnectFour() {
  const [g, setG] = useState(c4Empty); const w = c4Winner(g); const full = g[0]!.every(Boolean);
  const drop = (c) => { if (w) return; let n = c4Drop(g, c, 1); if (!n) return; if (!c4Winner(n)) { const m = c4AiMove(n); const n2 = m >= 0 ? c4Drop(n, m, 2) : null; if (n2) n = n2; } setG(n); };
  return <div>{rules('Toque una columna para soltar su ficha azul. Gana quien junte cuatro seguidas en cualquier dirección.')}
    <div className="mx-auto mt-4 max-w-md rounded-2xl bg-primary/20 p-2"><div className="grid grid-cols-7 gap-1">{Array.from({ length: C4_COLS }, (_, c) => <button key={c} type="button" aria-label={`Columna ${c + 1}`} onClick={() => drop(c)} className="flex flex-col gap-1 rounded-lg p-0.5 hover:bg-primary/20">{g.map((row, r) => <span key={r} className={`aspect-square w-full rounded-full border border-border ${row[c] === 1 ? 'bg-primary' : row[c] === 2 ? 'bg-accent' : 'bg-background'}`} />)}</button>)}</div></div>
    <p role="status" className="mt-4 text-center font-bold">{w === 1 ? '¡Ganó!' : w === 2 ? 'Ganó la PC (verde).' : full ? 'Empate.' : 'Su turno: azul.'}</p>
    <div className="text-center"><Button className="mt-3" onClick={() => setG(c4Empty())}>Nueva partida</Button></div></div>;
}

const cardName = (n) => n === 10 ? 'Sota' : n === 11 ? 'Caballo' : n === 12 ? 'Rey' : String(n);
export function SevenAndHalf() {
  const fresh = () => shuffle(newDeck());
  const [deck, setDeck] = useState(fresh); const [hand, setHand] = useState([]); const [bank, setBank] = useState(null); const [wins, setWins] = useState(0);
  const total = handTotal(hand); const over = total > 7.5;
  const draw = () => { const [c, ...rest] = deck; if (c === undefined) return; setHand([...hand, c]); setDeck(rest); };
  const stand = () => { let d = [...deck]; const bh = []; while (handTotal(bh) < 5.5 && d.length) { bh.push(d[0]!); d = d.slice(1); } setDeck(d); setBank(bh); if (sevenResult(total, handTotal(bh)) === 'gana') setWins(wins + 1); };
  const res = bank ? sevenResult(total, handTotal(bank)) : over ? 'pierde' : null;
  const Cards = ({ h }) => <div className="mt-2 flex flex-wrap gap-2">{h.map((c, i) => <span key={i} className="flex h-20 w-14 flex-col items-center justify-center rounded-lg border-2 border-primary bg-background text-lg font-black">{cardName(c)}<small className="text-xs font-normal">{c >= 10 ? '½' : c}</small></span>)}</div>;
  return <div>{rules('Baraja española sin 8, 9 ni 10. Las cartas 1 a 7 valen su número; sota, caballo y rey valen media. Acérquese a 7 y media sin pasarse. Sin apuestas ni dinero.')}
    <div className={box}><p className="font-bold">Su mano · {total}</p><Cards h={hand} />
      {bank && <><p className="mt-4 font-bold">Banca · {handTotal(bank)}</p><Cards h={bank} /></>}
      <p role="status" className="mt-4 font-bold">{res === 'gana' ? '¡Ganó la mano!' : res === 'pierde' ? (over ? 'Se pasó de 7 y media.' : 'Gana la banca.') : res === 'empate' ? 'Empate.' : 'Pida carta o plántese.'}</p>
      <div className="mt-3 flex flex-wrap gap-2">{!res && <><Button onClick={draw}>Pedir carta</Button><Button variant="outline" disabled={!hand.length} onClick={stand}>Plantarse</Button></>}{res && <Button onClick={() => { setDeck(fresh()); setHand([]); setBank(null); }}>Otra mano</Button>}</div>
      <p className="mt-3 text-sm text-muted-foreground">Manos ganadas: {wins}</p></div></div>;
}

const pick = () => ({ s: Math.floor(Math.random() * 4), r: Math.floor(Math.random() * 4), i: Math.floor(Math.random() * 4) });
const roomIcon = ['📚', '🔬', '🍽️', '🏀']; const itemIcon = ['🔑', '🧮', '⚽', '🔬']; const personIcon = ['👩‍🏫', '🧹', '📖', '🧑‍🎓'];
export function SchoolMystery() {
  const [secret, setSecret] = useState(pick); const [g, setG] = useState({ s: 0, r: 0, i: 0 }); const [log, setLog] = useState([]); const [won, setWon] = useState(false);
  const Row = ({ label, list, icons, k }) => <fieldset className="mt-3"><legend className="text-sm font-bold">{label}</legend><div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">{list.map((x, i) => <Button key={x} variant={g[k] === i ? 'default' : 'outline'} className="h-auto whitespace-normal py-2" onClick={() => setG({ ...g, [k]: i })}>{icons[i]} {x}</Button>)}</div></fieldset>;
  const ask = () => { const h = mysteryHint(secret, g); if (h === 3) setWon(true); setLog([`${SUSPECTS[g.s]} · ${ROOMS[g.r]} · ${ITEMS[g.i]} → ${h} de 3 aciertos`, ...log]); };
  return <div>{rules('Alguien tomó prestado un objeto del colegio y lo dejó en una habitación. Elija persona, lugar y objeto; la pista dice cuántos de los tres acertó. Resuélvalo en la menor cantidad de intentos.')}
    <div className={box}><Row label="¿Quién?" list={SUSPECTS} icons={personIcon} k="s" /><Row label="¿Dónde?" list={ROOMS} icons={roomIcon} k="r" /><Row label="¿Con qué objeto?" list={ITEMS} icons={itemIcon} k="i" />
      <div className="mt-4 flex flex-wrap gap-2"><Button disabled={won} onClick={ask}>Investigar</Button><Button variant="outline" onClick={() => { setSecret(pick()); setLog([]); setWon(false); }}>Nuevo caso</Button></div>
      {won && <p role="status" className="mt-3 font-bold text-primary">¡Caso resuelto en {log.length} intentos!</p>}
      <ul className="mt-3 space-y-1 text-sm" aria-live="polite">{log.map((l, i) => <li key={i} className="rounded-lg border border-border p-2">{l}</li>)}</ul></div></div>;
}
