import React, { useState } from 'react';
import { Trophy, Award, Gift, Dices, Disc, Play, Star, Sparkles } from 'lucide-react';

export default function GamificacionTotalGICM() {
  const [xp, setXp] = useState(1250);
  const [coronas, setCoronas] = useState(15);
  const [chocolates, setChocolates] = useState(4);
  const [mensajeJuego, setMensajeJuego] = useState("¡Selecciona un minijuego y gana recompensas GICM!");

  const girarRuleta = () => {
    const premiosXP = [50, 100, 200, 500, 1000];
    const ganado = premiosXP[Math.floor(Math.random() * premiosXP.length)];
    setXp(xp + ganado);
    setMensajeJuego(`🎰 ¡Ganaste ${ganado} XP en la Ruleta Multiversal!`);
  };

  const tirarDados = () => {
    const dado1 = Math.floor(Math.random() * 6) + 1;
    const dado2 = Math.floor(Math.random() * 6) + 1;
    const suma = dado1 + dado2;
    if (suma >= 9) {
      setCoronas(coronas + 1);
      setMensajeJuego(`🎲 Dados: ${dado1} y ${dado2} (Total: ${suma}). ¡Ganaste 👑 1 Corona de Oro!`);
    } else {
      setMensajeJuego(`🎲 Dados: ${dado1} y ${dado2} (Total: ${suma}). ¡Sigue intentando para ganar coronas!`);
    }
  };

  const reclamarChocolate = () => {
    if (xp >= 500) {
      setXp(xp - 500);
      setChocolates(chocolates + 1);
      setMensajeJuego("🍫 ¡Canjeaste 500 XP por 1 barra de Chocolate artesanal GICM!");
    } else {
      setMensajeJuego("⚠️ Necesitas al menos 500 XP para canjear un chocolate.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100 space-y-6">
      
      {/* BARRA DE ESTADO / GAMIFICACIÓN */}
      <div className="flex flex-wrap justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800 gap-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-400" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Experiencia Total</div>
            <div className="text-lg font-black text-amber-400">{xp} XP</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6 text-cyan-400" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Coronas de Honor</div>
            <div className="text-lg font-black text-cyan-400">{coronas} 👑</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Gift className="h-6 w-6 text-pink-400" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Chocolates Ganados</div>
            <div className="text-lg font-black text-pink-400">{chocolates} 🍫</div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-center text-xs font-bold text-cyan-300">
        {mensajeJuego}
      </div>

      {/* JUEGOS Y RETOS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-center">
          <Disc className="h-8 w-8 text-amber-400 mx-auto animate-spin" style={{ animationDuration: '6s' }} />
          <h3 className="font-black text-sm text-white">Ruleta Multiversal</h3>
          <p className="text-[11px] text-slate-400">Gira la rueda y acumula XP al instante.</p>
          <button onClick={girarRuleta} className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs">
            Girar Ruleta 🎰
          </button>
        </div>

        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-center">
          <Dices className="h-8 w-8 text-cyan-400 mx-auto" />
          <h3 className="font-black text-sm text-white">Dados de la Suerte</h3>
          <p className="text-[11px] text-slate-400">Obtén 9 o más y gana Coronas de Oro.</p>
          <button onClick={tirarDados} className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs">
            Lanzar Dados 🎲
          </button>
        </div>

        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-center">
          <Sparkles className="h-8 w-8 text-pink-400 mx-auto" />
          <h3 className="font-black text-sm text-white">Canje de Chocolates</h3>
          <p className="text-[11px] text-slate-400">Intercambia 500 XP por 1 Chocolate GICM.</p>
          <button onClick={reclamarChocolate} className="w-full py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-black text-xs">
            Canjear Premio 🍫
          </button>
        </div>
      </div>

    </div>
  );
}