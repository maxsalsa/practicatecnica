import React, { useState, useEffect, useRef } from 'react';

const VEHICULOS_COSEVI = [
  { id: 'moto', nombre: '🏍️ Motocicleta (A1/A2/A3)', largo: 22, ancho: 10, velMax: 3.4, giro: 0.07, color: '#38bdf8' },
  { id: 'carro', nombre: '🚗 Automóvil Sedán (B1)', largo: 34, ancho: 18, velMax: 2.8, giro: 0.055, color: '#10b981' },
  { id: 'trailer', nombre: '🚛 Tráiler Articulado (B4)', largo: 64, ancho: 22, velMax: 1.9, giro: 0.035, color: '#f59e0b' }
];

export default function SimuladorVialCoseviCanvas() {
  const canvasRef = useRef(null);
  const [vehiculoSel, setVehiculoSel] = useState(VEHICULOS_COSEVI[1]);
  const [puntosViales, setPuntosViales] = useState(100);
  const [mensajeEstado, setMensajeEstado] = useState('Ingresa a la rotonda cediendo el paso y estaciona en el cajón verde (P).');
  const [parqueoCompletado, setParqueoCompletado] = useState(false);

  const estadoJuegoRef = useRef({
    x: 310,
    y: 355,
    angulo: -Math.PI / 2,
    velocidad: 0,
    teclas: {},
    npcAngulo1: 0,
    npcAngulo2: Math.PI
  });

  const reiniciarManiobra = (nuevoVeh = vehiculoSel) => {
    estadoJuegoRef.current = {
      x: 310,
      y: 355,
      angulo: -Math.PI / 2,
      velocidad: 0,
      teclas: {},
      npcAngulo1: 0,
      npcAngulo2: Math.PI
    };
    setPuntosViales(100);
    setParqueoCompletado(false);
    setMensajeEstado(`Conduciendo ${nuevoVeh.nombre}: Cede el paso en la rotonda y entra al cajón P (arriba a la derecha).`);
  };

  useEffect(() => {
    const downHandler = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        e.preventDefault();
        estadoJuegoRef.current.teclas[e.key] = true;
      }
    };
    const upHandler = (e) => {
      estadoJuegoRef.current.teclas[e.key] = false;
    };
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const st = estadoJuegoRef.current;
      const t = st.teclas;

      // Control de aceleración y frenado
      if (t['ArrowUp'] || t['w']) {
        st.velocidad = Math.min(vehiculoSel.velMax, st.velocidad + 0.08);
      } else if (t['ArrowDown'] || t['s']) {
        st.velocidad = Math.max(-1.5, st.velocidad - 0.08);
      } else {
        st.velocidad *= 0.94;
      }

      // Giro proporcional al movimiento
      if (Math.abs(st.velocidad) > 0.1) {
        const dir = st.velocidad > 0 ? 1 : -1;
        if (t['ArrowLeft'] || t['a']) st.angulo -= vehiculoSel.giro * dir;
        if (t['ArrowRight'] || t['d']) st.angulo += vehiculoSel.giro * dir;
      }

      st.x += Math.cos(st.angulo) * st.velocidad;
      st.y += Math.sin(st.angulo) * st.velocidad;

      // Límites del mapa
      st.x = Math.max(25, Math.min(595, st.x));
      st.y = Math.max(25, Math.min(375, st.y));

      // Movimiento de vehículos NPC con prioridad dentro de la rotonda (centro 240, 200, radio 85)
      st.npcAngulo1 += 0.018;
      st.npcAngulo2 += 0.018;
      const npc1X = 240 + Math.cos(st.npcAngulo1) * 85;
      const npc1Y = 200 + Math.sin(st.npcAngulo1) * 85;
      const npc2X = 240 + Math.cos(st.npcAngulo2) * 85;
      const npc2Y = 200 + Math.sin(st.npcAngulo2) * 85;

      // Detección de colisión con isla central (240, 200, radio 45)
      const distCentro = Math.hypot(st.x - 240, st.y - 200);
      if (distCentro < 48) {
        st.velocidad = -0.8;
        setPuntosViales((p) => Math.max(0, p - 2));
        setMensajeEstado('⚠️ ¡Cuidado! Invadiste la isla central de la rotonda (-2 pts).');
      }

      // Detección de colisión con vehículos que tienen prioridad en rotonda
      const distNpc1 = Math.hypot(st.x - npc1X, st.y - npc1Y);
      const distNpc2 = Math.hypot(st.x - npc2X, st.y - npc2Y);
      if (distNpc1 < 26 || distNpc2 < 26) {
        st.velocidad = -1.2;
        setPuntosViales((p) => Math.max(0, p - 5));
        setMensajeEstado('🚨 ¡Infracción COSEVI! No cediste la prioridad al vehículo dentro de la rotonda (-5 pts).');
      }

      // Zona de Parqueo Meta (Cajón P en x: 500..585, y: 40..110)
      if (st.x > 505 && st.x < 580 && st.y > 45 && st.y < 105 && Math.abs(st.velocidad) < 0.25) {
        setParqueoCompletado(true);
        setMensajeEstado('🏆 ¡MANIOBRA APROBADA POR COSEVI! Rotonda superada y estacionamiento perfecto en cajón P.');
      }

      // Renderizado Canvas 2D
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calles de acceso
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(195, 0, 90, 400);
      ctx.fillRect(0, 155, 620, 90);

      // Zona de Parqueo (Arriba a la derecha)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(460, 25, 140, 135);
      ctx.strokeStyle = parqueoCompletado ? '#10b981' : '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(500, 38, 86, 70);
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('P (META)', 512, 78);

      // Anillo de la Rotonda
      ctx.beginPath();
      ctx.arc(240, 200, 120, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#64748b';
      ctx.stroke();

      // Línea discontinua divisoria de carriles en rotonda
      ctx.beginPath();
      ctx.setLineDash([8, 8]);
      ctx.arc(240, 200, 85, 0, Math.PI * 2);
      ctx.strokeStyle = '#eab308';
      ctx.stroke();
      ctx.setLineDash([]);

      // Isla Central de la Rotonda
      ctx.beginPath();
      ctx.arc(240, 200, 45, 0, Math.PI * 2);
      ctx.fillStyle = '#065f46';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#fbbf24';
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('ROTONDA', 212, 198);
      ctx.fillText('MÁX 30km/h', 206, 212);

      // Señales de CEDA en las entradas
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('▽ CEDA EL PASO', 288, 335);

      // Dibujar Vehículos NPC en rotonda
      [
        { x: npc1X, y: npc1Y, ang: st.npcAngulo1 + Math.PI / 2 },
        { x: npc2X, y: npc2Y, ang: st.npcAngulo2 + Math.PI / 2 }
      ].forEach((npc) => {
        ctx.save();
        ctx.translate(npc.x, npc.y);
        ctx.rotate(npc.ang);
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(-15, -9, 30, 18);
        ctx.fillStyle = '#fde047';
        ctx.fillRect(11, -7, 4, 4);
        ctx.fillRect(11, 3, 4, 4);
        ctx.restore();
      });

      // Dibujar Vehículo del Usuario (Moto, Carro o Tráiler)
      ctx.save();
      ctx.translate(st.x, st.y);
      ctx.rotate(st.angulo);
      ctx.fillStyle = vehiculoSel.color;
      ctx.fillRect(-vehiculoSel.largo / 2, -vehiculoSel.ancho / 2, vehiculoSel.largo, vehiculoSel.ancho);

      // Cabina si es tráiler
      if (vehiculoSel.id === 'trailer') {
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(vehiculoSel.largo / 2 - 14, -vehiculoSel.ancho / 2, 14, vehiculoSel.ancho);
      }

      // Luces delanteras
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(vehiculoSel.largo / 2 - 3, -vehiculoSel.ancho / 2 + 2, 3, 4);
      ctx.fillRect(vehiculoSel.largo / 2 - 3, vehiculoSel.ancho / 2 - 6, 3, 4);
      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [vehiculoSel, parqueoCompletado]);

  const pulsarBotonTactil = (tecla, estado) => {
    estadoJuegoRef.current.teclas[tecla] = estado;
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/40 p-6 rounded-2xl shadow-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            🕹️ Simulador Interactivo 2D COSEVI / MOPT — Rotondas y Parqueo
          </h3>
          <p className="text-xs text-slate-400">
            Elige Moto, Automóvil o Tráiler Articulado. Usa las flechas del teclado (o WASD / botones táctiles) para ingresar cediendo el paso y estacionar en el cajón P.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold">Puntaje Vial COSEVI:</span>
          <span className={`text-2xl font-mono font-extrabold ${puntosViales >= 80 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {puntosViales} / 100
          </span>
        </div>
      </div>

      {/* Selector de Tipo de Vehículo */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {VEHICULOS_COSEVI.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setVehiculoSel(v);
                reiniciarManiobra(v);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                vehiculoSel.id === v.id
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
              }`}
            >
              {v.nombre}
            </button>
          ))}
        </div>

        <button
          onClick={() => reiniciarManiobra(vehiculoSel)}
          className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold px-3.5 py-2 rounded-xl text-xs"
        >
          ↺ Reiniciar Pista 2D
        </button>
      </div>

      {/* Mensaje de telemetría vial */}
      <div className={`p-3 rounded-xl border text-xs font-bold ${
        parqueoCompletado
          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
          : 'bg-slate-950 border-slate-800 text-cyan-300'
      }`}>
        {mensajeEstado}
      </div>

      {/* Lienzo Canvas 2D y Controles en Pantalla */}
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="w-full overflow-x-auto flex justify-center">
          <canvas
            ref={canvasRef}
            width={620}
            height={400}
            className="rounded-xl border-2 border-slate-700 bg-slate-950 shadow-inner max-w-full"
          />
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 w-full lg:w-64 text-center">
          <p className="text-xs font-bold text-slate-300">Controles Táctiles / Mouse</p>
          <div className="grid grid-cols-3 gap-2">
            <div />
            <button
              onMouseDown={() => pulsarBotonTactil('ArrowUp', true)}
              onMouseUp={() => pulsarBotonTactil('ArrowUp', false)}
              onTouchStart={() => pulsarBotonTactil('ArrowUp', true)}
              onTouchEnd={() => pulsarBotonTactil('ArrowUp', false)}
              className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg text-xs select-none"
            >
              ▲ Acelerar
            </button>
            <div />
            <button
              onMouseDown={() => pulsarBotonTactil('ArrowLeft', true)}
              onMouseUp={() => pulsarBotonTactil('ArrowLeft', false)}
              onTouchStart={() => pulsarBotonTactil('ArrowLeft', true)}
              onTouchEnd={() => pulsarBotonTactil('ArrowLeft', false)}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-lg text-xs select-none"
            >
              ◀ Izq
            </button>
            <button
              onMouseDown={() => pulsarBotonTactil('ArrowDown', true)}
              onMouseUp={() => pulsarBotonTactil('ArrowDown', false)}
              onTouchStart={() => pulsarBotonTactil('ArrowDown', true)}
              onTouchEnd={() => pulsarBotonTactil('ArrowDown', false)}
              className="bg-rose-700 hover:bg-rose-600 text-white font-bold py-3 rounded-lg text-xs select-none"
            >
              ▼ Reversa
            </button>
            <button
              onMouseDown={() => pulsarBotonTactil('ArrowRight', true)}
              onMouseUp={() => pulsarBotonTactil('ArrowRight', false)}
              onTouchStart={() => pulsarBotonTactil('ArrowRight', true)}
              onTouchEnd={() => pulsarBotonTactil('ArrowRight', false)}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-lg text-xs select-none"
            >
              Der ▶
            </button>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Regla de Oro MOPT: Los autos rojos dentro del anillo tienen prioridad. Espera un espacio libre, gira a 30 km/h y estaciona dentro del recuadro verde P.
          </p>
        </div>
      </div>
    </div>
  );
}