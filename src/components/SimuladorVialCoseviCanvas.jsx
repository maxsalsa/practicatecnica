import React, { useState, useEffect, useRef } from 'react';

const VEHICULOS_COSEVI = [
  { id: 'moto', nombre: '🏍️ Moto (A1/A2)', largo: 22, ancho: 10, velMax: 2.2, giro: 0.065, color: '#38bdf8' },
  { id: 'carro', nombre: '🚗 Automóvil (B1)', largo: 32, ancho: 16, velMax: 1.9, giro: 0.055, color: '#10b981' },
  { id: 'trailer', nombre: '🚛 Tráiler (B4)', largo: 54, ancho: 20, velMax: 1.4, giro: 0.04, color: '#f59e0b' }
];

const CLAVE_RECORD_VIAL = 'pt_cosevi_record_offline_v29_5';

export default function SimuladorVialCoseviCanvas() {
  const canvasRef = useRef(null);
  const [vehiculoSel, setVehiculoSel] = useState(VEHICULOS_COSEVI[1]);
  const [puntosViales, setPuntosViales] = useState(100);
  const [mejorPuntaje, setMejorPuntaje] = useState(() => {
    return Number(localStorage.getItem(CLAVE_RECORD_VIAL)) || 100;
  });
  const [marchaCrucero, setMarchaCrucero] = useState(false);
  const [mostrarGuiaRuta, setMostrarGuiaRuta] = useState(true);
  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(true);
  const [parqueoCompletado, setParqueoCompletado] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState(
    'Paso 1: Presiona "▶ Avanzar" (o Flecha Arriba), cede el paso a los autos rojos y sigue la línea punteada celeste hasta el cajón P.'
  );

  const estadoJuegoRef = useRef({
    x: 240,
    y: 365,
    angulo: -Math.PI / 2,
    velocidad: 0,
    teclas: {},
    cruceroActivo: false,
    npcAngulo1: 0,
    npcAngulo2: Math.PI
  });

  const reiniciarManiobra = (nuevoVeh = vehiculoSel) => {
    estadoJuegoRef.current = {
      x: 240,
      y: 365,
      angulo: -Math.PI / 2,
      velocidad: 0,
      teclas: {},
      cruceroActivo: false,
      npcAngulo1: 0,
      npcAngulo2: Math.PI
    };
    setMarchaCrucero(false);
    setPuntosViales(100);
    setParqueoCompletado(false);
    setMensajeEstado(`Listo con ${nuevoVeh.nombre}: Toca "▶ Avanzar" y sigue la línea celeste ① → ② → ③ hasta estacionar en P.`);
  };

  const alternarCrucero = () => {
    const nuevo = !marchaCrucero;
    setMarchaCrucero(nuevo);
    estadoJuegoRef.current.cruceroActivo = nuevo;
  };

  useEffect(() => {
    const downHandler = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '].includes(e.key)) {
        e.preventDefault();
        if (e.key === ' ') {
          estadoJuegoRef.current.cruceroActivo = false;
          setMarchaCrucero(false);
          estadoJuegoRef.current.velocidad = 0;
        } else {
          estadoJuegoRef.current.teclas[e.key] = true;
        }
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

      if (t['ArrowUp'] || t['w'] || st.cruceroActivo) {
        st.velocidad = Math.min(vehiculoSel.velMax, st.velocidad + 0.06);
      } else if (t['ArrowDown'] || t['s']) {
        st.velocidad = Math.max(-1.2, st.velocidad - 0.06);
      } else {
        st.velocidad *= 0.92;
      }

      if (Math.abs(st.velocidad) > 0.08) {
        const dir = st.velocidad >= 0 ? 1 : -1;
        if (t['ArrowLeft'] || t['a']) st.angulo -= vehiculoSel.giro * dir;
        if (t['ArrowRight'] || t['d']) st.angulo += vehiculoSel.giro * dir;
      }

      st.x += Math.cos(st.angulo) * st.velocidad;
      st.y += Math.sin(st.angulo) * st.velocidad;

      st.x = Math.max(25, Math.min(595, st.x));
      st.y = Math.max(25, Math.min(375, st.y));

      st.npcAngulo1 += 0.014;
      st.npcAngulo2 += 0.014;
      const npc1X = 240 + Math.cos(st.npcAngulo1) * 85;
      const npc1Y = 200 + Math.sin(st.npcAngulo1) * 85;
      const npc2X = 240 + Math.cos(st.npcAngulo2) * 85;
      const npc2Y = 200 + Math.sin(st.npcAngulo2) * 85;

      // Colisión con isla central
      const distCentro = Math.hypot(st.x - 240, st.y - 200);
      if (distCentro < 48) {
        st.velocidad = -0.7;
        st.cruceroActivo = false;
        setMarchaCrucero(false);
        setPuntosViales((p) => Math.max(0, p - 2));
        setMensajeEstado('⚠️ Tocaste el cordón de la isla central (-2 pts). Usa ◀ Izq o Der ▶ para rodearla.');
      }

      // Colisión con vehículos con prioridad en la rotonda
      const distNpc1 = Math.hypot(st.x - npc1X, st.y - npc1Y);
      const distNpc2 = Math.hypot(st.x - npc2X, st.y - npc2Y);
      if (distNpc1 < 25 || distNpc2 < 25) {
        st.velocidad = -1.0;
        st.cruceroActivo = false;
        setMarchaCrucero(false);
        setPuntosViales((p) => Math.max(0, p - 5));
        setMensajeEstado('🚨 ¡Cuidado! Los autos rojos dentro de la rotonda llevan la vía (-5 pts). Espera a que pasen.');
      }

      // Llegada a la Meta (Cajón P en x: 500..585, y: 38..110)
      if (st.x > 500 && st.x < 585 && st.y > 38 && st.y < 110) {
        st.velocidad = 0;
        st.cruceroActivo = false;
        setMarchaCrucero(false);
        if (!parqueoCompletado) {
          setParqueoCompletado(true);
          setMensajeEstado('🏆 ¡PRUEBA SUPERADA! Ceder el paso en rotonda y estacionamiento en cajón P completados con éxito.');
          localStorage.setItem(CLAVE_RECORD_VIAL, String(puntosViales));
          setMejorPuntaje((prev) => Math.max(prev, puntosViales));
        }
      }

      // Dibujar Mapa
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calles
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(195, 0, 90, 400);
      ctx.fillRect(0, 155, 620, 90);

      // Cajón de Estacionamiento Meta (Arriba a la derecha)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(460, 25, 145, 135);
      ctx.strokeStyle = parqueoCompletado ? '#10b981' : '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(500, 38, 86, 70);
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('③ META (P)', 508, 76);

      // Anillo de Rotonda
      ctx.beginPath();
      ctx.arc(240, 200, 120, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#64748b';
      ctx.stroke();

      ctx.beginPath();
      ctx.setLineDash([8, 8]);
      ctx.arc(240, 200, 85, 0, Math.PI * 2);
      ctx.strokeStyle = '#eab308';
      ctx.stroke();
      ctx.setLineDash([]);

      // Ruta Guiada Punteada Celeste (① -> ② -> ③)
      if (mostrarGuiaRuta) {
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#22d3ee';
        ctx.moveTo(240, 360);
        ctx.lineTo(240, 285);
        ctx.arc(240, 200, 85, Math.PI / 2, 0, true);
        ctx.lineTo(540, 200);
        ctx.lineTo(540, 75);
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = '#22d3ee';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('① INICIO (CEDA)', 255, 355);
        ctx.fillText('② GIRA POR LA DERECHA', 330, 265);
      }

      // Isla Central
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
      ctx.fillText('30 km/h', 218, 212);

      // Autos Rojos NPC con Prioridad
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

      // Vehículo del Jugador
      ctx.save();
      ctx.translate(st.x, st.y);
      ctx.rotate(st.angulo);
      ctx.fillStyle = vehiculoSel.color;
      ctx.fillRect(-vehiculoSel.largo / 2, -vehiculoSel.ancho / 2, vehiculoSel.largo, vehiculoSel.ancho);
      if (vehiculoSel.id === 'trailer') {
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(vehiculoSel.largo / 2 - 14, -vehiculoSel.ancho / 2, 14, vehiculoSel.ancho);
      }
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(vehiculoSel.largo / 2 - 3, -vehiculoSel.ancho / 2 + 2, 3, 4);
      ctx.fillRect(vehiculoSel.largo / 2 - 3, vehiculoSel.ancho / 2 - 6, 3, 4);
      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [vehiculoSel, parqueoCompletado, mostrarGuiaRuta, puntosViales]);

  const pulsarBotonTactil = (tecla, estado) => {
    estadoJuegoRef.current.teclas[tecla] = estado;
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/40 p-4 sm:p-6 rounded-2xl shadow-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
            🕹️ Juego Educativo Mobile-First & Offline-First
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Simulador Vial 2D COSEVI — Prioridad en Rotondas y Parqueo
          </h2>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-xs">
            <span className="text-slate-400 block">Nota Actual:</span>
            <span className={`text-lg font-mono font-extrabold ${puntosViales >= 80 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {puntosViales}/100
            </span>
          </div>
          <div className="text-xs border-l border-slate-800 pl-3">
            <span className="text-slate-400 block">Récord Offline:</span>
            <span className="text-lg font-mono font-extrabold text-cyan-400">{mejorPuntaje} pts</span>
          </div>
        </div>
      </div>

      {/* Guía Visual de 3 Pasos muy fácil de entender */}
      {mostrarInstrucciones && (
        <div className="bg-slate-950 border border-cyan-500/40 p-4 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xs sm:text-sm font-extrabold text-cyan-400">
              🧭 ¿Cómo jugar en Celular o Computadora? (En 3 pasos sencillos):
            </h3>
            <button
              onClick={() => setMostrarInstrucciones(false)}
              className="text-[11px] text-slate-400 hover:text-white"
            >
              Ocultar guía ▲
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <strong className="text-amber-300 block mb-1">① Cede el paso al entrar:</strong>
              Tu vehículo empieza abajo en <strong>① INICIO</strong>. Observa los carros rojos que giran dentro de la rotonda; ellos tienen la vía.
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <strong className="text-cyan-300 block mb-1">② Activa la Marcha y Gira:</strong>
              Toca el botón verde <strong>«▶ Marcha Automática»</strong> (o usa las flechas del teclado) y gira con <strong>◀ Izq / Der ▶</strong> siguiendo la línea punteada celeste.
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <strong className="text-emerald-300 block mb-1">③ Estaciona en el Cajón P:</strong>
              Sal por el carril derecho y entra al recuadro verde <strong>③ META (P)</strong> arriba a la derecha para aprobar con 100 puntos.
            </div>
          </div>
        </div>
      )}

      {/* Selector de Vehículo y Botones Rápidos */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {VEHICULOS_COSEVI.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setVehiculoSel(v);
                reiniciarManiobra(v);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                vehiculoSel.id === v.id
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow'
                  : 'bg-slate-950 text-slate-300 border-slate-800'
              }`}
            >
              {v.nombre}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setMostrarGuiaRuta(!mostrarGuiaRuta)}
            className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold px-3 py-2 rounded-xl text-xs"
          >
            {mostrarGuiaRuta ? '👁️ Ocultar Línea Guía' : '👁️ Mostrar Línea Guía'}
          </button>
          <button
            onClick={() => reiniciarManiobra(vehiculoSel)}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs"
          >
            ↺ Reiniciar Vehículo
          </button>
        </div>
      </div>

      {/* Estado en Vivo */}
      <div className={`p-3 rounded-xl border text-xs font-bold ${
        parqueoCompletado
          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
          : 'bg-slate-950 border-slate-800 text-cyan-300'
      }`}>
        {mensajeEstado}
      </div>

      {/* Lienzo 2D Responsivo + Volante Táctil Mobile-First */}
      <div className="flex flex-col lg:flex-row items-center gap-5">
        <div className="w-full overflow-x-auto flex justify-center">
          <canvas
            ref={canvasRef}
            width={620}
            height={400}
            className="rounded-xl border-2 border-slate-700 bg-slate-950 shadow-inner w-full max-w-[620px] h-auto"
          />
        </div>

        {/* Panel de Control Mobile-First muy fácil de tocar con el pulgar */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 w-full lg:w-72">
          <p className="text-xs font-extrabold text-center text-white">
            📱 Mandos Táctiles (Celular / Mouse)
          </p>

          <button
            onClick={alternarCrucero}
            className={`w-full py-3 rounded-xl font-extrabold text-xs shadow-lg transition-all ${
              marchaCrucero
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {marchaCrucero ? '🛑 FRENAR / DETENER VEHÍCULO' : '▶ AVANZAR (MARCHA AUTOMÁTICA)'}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onMouseDown={() => pulsarBotonTactil('ArrowLeft', true)}
              onMouseUp={() => pulsarBotonTactil('ArrowLeft', false)}
              onMouseLeave={() => pulsarBotonTactil('ArrowLeft', false)}
              onTouchStart={() => pulsarBotonTactil('ArrowLeft', true)}
              onTouchEnd={() => pulsarBotonTactil('ArrowLeft', false)}
              className="bg-cyan-700 active:bg-cyan-500 text-white font-extrabold py-4 rounded-xl text-xs select-none"
            >
              ◀ GIRAR IZQ
            </button>
            <button
              onMouseDown={() => pulsarBotonTactil('ArrowRight', true)}
              onMouseUp={() => pulsarBotonTactil('ArrowRight', false)}
              onMouseLeave={() => pulsarBotonTactil('ArrowRight', false)}
              onTouchStart={() => pulsarBotonTactil('ArrowRight', true)}
              onTouchEnd={() => pulsarBotonTactil('ArrowRight', false)}
              className="bg-cyan-700 active:bg-cyan-500 text-white font-extrabold py-4 rounded-xl text-xs select-none"
            >
              GIRAR DER ▶
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onMouseDown={() => pulsarBotonTactil('ArrowUp', true)}
              onMouseUp={() => pulsarBotonTactil('ArrowUp', false)}
              onTouchStart={() => pulsarBotonTactil('ArrowUp', true)}
              onTouchEnd={() => pulsarBotonTactil('ArrowUp', false)}
              className="bg-slate-800 active:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs select-none"
            >
              ▲ Acelerón Manual
            </button>
            <button
              onMouseDown={() => pulsarBotonTactil('ArrowDown', true)}
              onMouseUp={() => pulsarBotonTactil('ArrowDown', false)}
              onTouchStart={() => pulsarBotonTactil('ArrowDown', true)}
              onTouchEnd={() => pulsarBotonTactil('ArrowDown', false)}
              className="bg-slate-800 active:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs select-none"
            >
              ▼ Reversa
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            En teclado también puedes usar <strong>Flechas</strong> o <strong>W, A, S, D</strong> y <strong>Espacio</strong> para frenar.
          </p>
        </div>
      </div>
    </div>
  );
}