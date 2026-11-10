import React, { useState, useEffect } from 'react';
import { ESPECIALIDADES_OFICIALES, generarLoteVerificado } from './data/motorMasivo';

const TORNEOS_OFICIALES = [
  { id: 't1', nombre: 'Copa Nacional Cyber & Dev CTP 2026', sede: 'CTP Mercedes Norte • Abierto', participantes: 348, premio: 'Trofeo Diamante + 2,500 XP', estado: 'EN VIVO AHORA', mod: 'web' },
  { id: 't2', nombre: 'Maratón Teórico MOPT Autos & Motos', sede: 'Liga Vial Costa Rica', participantes: 512, premio: 'Insignia Conductor Oro + 1,800 XP', estado: 'INSCRIPCIÓN ABIERTA', mod: 'mopt_autos' },
  { id: 't3', nombre: 'Olimpiada Admisión UCR / TEC / UNA', sede: 'Liga Académica Universitaria', participantes: 890, premio: 'Rango Maestro Cuantitativo + 3,000 XP', estado: 'EN VIVO AHORA', mod: 'admision_uni' }
];

const RANKING_LIGA = [
  { pos: 1, nombre: 'Max Salazar Sánchez (SuperAdmin)', colegio: 'CTP Mercedes Norte', rol: 'SUPER_ADMIN', xp: 21450, racha: 42 },
  { pos: 2, nombre: 'Deilyn Salazar', colegio: 'División de Honor CR', rol: 'VIP_PRO', xp: 16400, racha: 29 },
  { pos: 3, nombre: 'Meilyn Salazar', colegio: 'División de Honor CR', rol: 'VIP_PRO', xp: 15950, racha: 27 },
  { pos: 4, nombre: 'Aarón Dev Colaborador', colegio: 'Gingles ICM Core', rol: 'MODERADOR', xp: 14200, racha: 19 },
  { pos: 5, nombre: 'Valeria Morales C.', colegio: 'CTP Mercedes Norte', rol: 'ESTUDIANTE_VIP', xp: 12850, racha: 15 }
];

export default function App() {
  const [usuario] = useState({
    nombre: 'Max Salazar Sánchez',
    correo: 'max.salazar.sanchez@gmail.com',
    rol: 'SUPER_ADMIN',
    institucion: 'CTP Mercedes Norte'
  });

  const [menuActivo, setMenuActivo] = useState('dashboard');
  const [enSesion, setEnSesion] = useState(false);
  const [especialidadActual, setEspecialidadActual] = useState(null);
  const [preguntasActivas, setPreguntasActivas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [seleccionada, setSeleccionada] = useState(null);
  const [aciertos, setAciertos] = useState(0);
  const [xpTotal, setXpTotal] = useState(21450);
  const [racha, setRacha] = useState(42);
  const [modalSinpe, setModalSinpe] = useState(false);

  const [trazabilidad, setTrazabilidad] = useState(() => {
    const guardado = localStorage.getItem('pt_trazabilidad_v7');
    if (guardado) return JSON.parse(guardado);
    const inicial = {};
    Object.values(ESPECIALIDADES_OFICIALES).forEach(esp => {
      esp.competenciasBase.forEach(c => {
        inicial[c.codigo] = { codigo: c.codigo, nombre: c.nombre, especialidad: esp.titulo, intentos: 6, aciertos: 5 };
      });
    });
    return inicial;
  });

  useEffect(() => {
    localStorage.setItem('pt_trazabilidad_v7', JSON.stringify(trazabilidad));
  }, [trazabilidad]);

  const iniciarPractica = (espId) => {
    const esp = ESPECIALIDADES_OFICIALES[espId];
    const lote = generarLoteVerificado(espId, 15);
    setEspecialidadActual(esp);
    setPreguntasActivas(lote);
    setIndice(0);
    setSeleccionada(null);
    setAciertos(0);
    setEnSesion(true);
  };

  const responder = (idx) => {
    if (seleccionada !== null) return;
    setSeleccionada(idx);
    const item = preguntasActivas[indice];
    const esCorrecto = idx === item.correcta;

    if (esCorrecto) {
      setAciertos(a => a + 1);
      setXpTotal(x => x + 50);
      setRacha(r => r + 1);
    } else {
      setRacha(0);
    }

    setTrazabilidad(prev => {
      const actual = prev[item.comp] || { codigo: item.comp, nombre: item.habilidad, especialidad: especialidadActual?.titulo || 'General', intentos: 0, aciertos: 0 };
      return {
        ...prev,
        [item.comp]: {
          ...actual,
          intentos: actual.intentos + 1,
          aciertos: actual.aciertos + (esCorrecto ? 1 : 0)
        }
      };
    });
  };

  const siguiente = () => {
    if (indice + 1 < preguntasActivas.length) {
      setIndice(i => i + 1);
      setSeleccionada(null);
    } else {
      alert('¡Bloque completado con éxito! Tus notas y XP han sido guardados.');
      setEnSesion(false);
      setMenuActivo('trazabilidad');
    }
  };

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* BARRA SUPERIOR DE ESCRITORIO */}
      <header style={{ height: '70px', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', boxSizing: 'border-box', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => setEnSesion(false) || setMenuActivo('dashboard')}>
          <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#fff', fontSize: '18px', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>PT</div>
          <div>
            <div style={{ fontWeight: '900', fontSize: '16px', color: '#fff', letterSpacing: '-0.5px' }}>practica<span style={{ color: '#3b82f6' }}>tecnica</span>.com</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>SuperAdmin: <strong style={{ color: '#e2e8f0' }}>Max Salazar Sánchez</strong> (CTP Mercedes Norte)</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#020617', border: '1px solid #1e293b', padding: '8px 16px', borderRadius: '12px', display: 'flex', gap: '16px', fontSize: '12px', fontWeight: 'bold' }}>
            <span style={{ color: '#fbbf24' }}>🔥 Racha: {racha} días</span>
            <span style={{ color: '#34d399' }}>⚡ XP Total: {xpTotal.toLocaleString()}</span>
          </div>
          <button onClick={() => setModalSinpe(true)} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(5,150,105,0.3)' }}>
            💳 Suscripción SINPE (6090-6359)
          </button>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <div style={{ display: 'flex', flex: 1, boxSizing: 'border-box' }}>
        
        {/* BARRA LATERAL DE ESCRITORIO */}
        <aside style={{ width: '280px', backgroundColor: '#090d16', borderRight: '1px solid #1e293b', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box', flexShrink: 0 }}>
          <div style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b', letterSpacing: '1px', marginBottom: '4px' }}>Navegación Principal</div>
          
          {[
            { id: 'dashboard', label: '📚 Catálogo & Especialidades', icon: '📚' },
            { id: 'trazabilidad', label: '📊 Trazabilidad & Desempeño', icon: '📊' },
            { id: 'arena', label: '🎮 Arena de Trivias Relámpago', icon: '🎮' },
            { id: 'torneos', label: '🏆 Torneos & Liga Diamante', icon: '🏆' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setEnSesion(false) || setMenuActivo(m.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                backgroundColor: menuActivo === m.id && !enSesion ? '#2563eb' : 'transparent',
                color: menuActivo === m.id && !enSesion ? '#fff' : '#cbd5e1',
                border: 'none',
                padding: '14px 18px',
                borderRadius: '14px',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s'
              }}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}

          <div style={{ marginTop: 'auto', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: '900', color: '#3b82f6', marginBottom: '4px' }}>ROL: SUPER_ADMIN</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>{usuario.nombre}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{usuario.institucion}</div>
          </div>
        </aside>

        {/* ÁREA DE CONTENIDO DINÁMICO */}
        <main style={{ flex: 1, padding: '40px 50px', overflowY: 'auto', boxSizing: 'border-box', backgroundColor: '#020617' }}>
          
          {enSesion && especialidadActual ? (
            <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '18px 24px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => setEnSesion(false)} style={{ background: '#1e293b', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  ← Salir al Menú
                </button>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#3b82f6' }}>{especialidadActual.titulo}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Ítem {indice + 1} de {preguntasActivas.length} • Serie: {preguntasActivas[indice]?.codigoSerie}</div>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#34d399' }}>Aciertos: {aciertos}</div>
              </div>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '40px', borderRadius: '28px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                <div style={{ fontSize: '12px', backgroundColor: '#172554', border: '1px solid #1d4ed8', color: '#60a5fa', padding: '10px 16px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                  <span>🎯 Competencia MEP / Admisión: {preguntasActivas[indice].comp}</span>
                  <span>Habilidad: {preguntasActivas[indice].habilidad}</span>
                </div>

                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#fff', lineHeight: '1.6', margin: 0 }}>
                  {preguntasActivas[indice].pregunta}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {preguntasActivas[indice].opciones.map((op, i) => {
                    let bg = '#1e293b';
                    let border = '#334155';
                    if (seleccionada !== null) {
                      if (i === preguntasActivas[indice].correcta) { bg = 'rgba(5, 150, 105, 0.4)'; border = '#059669'; }
                      else if (i === seleccionada) { bg = 'rgba(225, 29, 72, 0.4)'; border = '#e11d48'; }
                    }
                    return (
                      <button
                        key={i}
                        disabled={seleccionada !== null}
                        onClick={() => responder(i)}
                        style={{ width: '100%', backgroundColor: bg, border: `1px solid ${border}`, color: '#fff', padding: '18px 20px', borderRadius: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', cursor: seleccionada !== null ? 'default' : 'pointer', display: 'flex', gap: '16px', alignItems: 'center', transition: 'all 0.2s' }}
                      >
                        <span style={{ width: '32px', height: '32px', backgroundColor: '#020617', border: '1px solid #475569', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold', flexShrink: 0 }}>{op.letra}</span>
                        <span>{op.texto}</span>
                      </button>
                    );
                  })}
                </div>

                {seleccionada !== null && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                    <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '16px', fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6' }}>
                      <strong style={{ color: '#3b82f6', display: 'block', marginBottom: '6px' }}>💡 Fundamento Técnico y Trazabilidad Registrada:</strong>
                      {preguntasActivas[indice].explicacion}
                    </div>
                    <button onClick={siguiente} style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontSize: '15px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 8px 20px rgba(37,99,235,0.4)' }}>
                      Siguiente Pregunta Verificada →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : menuActivo === 'dashboard' ? (
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '35px' }}>
              <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #1e293b', borderRadius: '28px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                <span style={{ fontSize: '11px', backgroundColor: '#064e3b', color: '#34d399', padding: '6px 14px', borderRadius: '99px', fontWeight: 'bold' }}>✅ Motor Masivo • 6,000+ Ítems con Mezcla Fisher-Yates</span>
                <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', margin: '14px 0 10px 0', letterSpacing: '-0.5px' }}>Plataforma Oficial de Práctica y Acreditación</h1>
                <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, lineHeight: '1.6', maxWidth: '800px' }}>
                  Ecosistema integral de preparatoria técnica CTP (Desarrollo Web y Ciberseguridad), Pruebas Teóricas MOPT separadas para Automóviles (B1) y Motocicletas (A1/A2/A3), y Admisión Universitaria (UCR/TEC/UNA).
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
                {Object.values(ESPECIALIDADES_OFICIALES).map(esp => (
                  <div key={esp.id} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '36px' }}>{esp.icono}</span>
                        <span style={{ fontSize: '11px', backgroundColor: '#1e293b', color: '#38bdf8', padding: '6px 12px', borderRadius: '10px', fontWeight: 'bold' }}>1,000+ Ítems Polimórficos</span>
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: '900', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{esp.grupo}</div>
                      <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: 0, lineHeight: '1.4' }}>{esp.titulo}</h3>
                    </div>

                    <button onClick={() => iniciarPractica(esp.id)} style={{ width: '100%', background: 'linear-gradient(135deg, #2563eb, #4f46e5)', color: '#fff', border: 'none', padding: '14px', borderRadius: '14px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(37,99,235,0.3)' }}>
                      Iniciar Simulador de Práctica →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : menuActivo === 'trazabilidad' ? (
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#fff', margin: 0 }}>📊 Matriz de Trazabilidad y Desempeño Curricular</h2>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 0 0' }}>Registro acumulado de notas, aciertos y nivel de dominio por competencia MEP / Admisión / MOPT.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {Object.values(trazabilidad).map(item => {
                  const pct = item.intentos > 0 ? Math.round((item.aciertos / item.intentos) * 100) : 0;
                  const nivel = pct >= 85 ? 'DOMINIO AVANZADO' : pct >= 65 ? 'EN PROCESO' : 'REQUIERE REFUERZO';
                  const color = pct >= 85 ? '#10b981' : pct >= 65 ? '#f59e0b' : '#f43f5e';

                  return (
                    <div key={item.codigo} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ backgroundColor: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900' }}>{item.codigo}</span>
                        <span style={{ fontSize: '11px', fontWeight: '900', color }}>{nivel} ({pct}%)</span>
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{item.nombre}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.especialidad}</div>

                      <div style={{ width: '100%', backgroundColor: '#020617', height: '8px', borderRadius: '99px', overflow: 'hidden', border: '1px solid #1e293b' }}>
                        <div style={{ width: `${pct}%`, backgroundColor: color, height: '100%', transition: 'width 0.3s' }} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
                        <span>Evaluaciones: {item.intentos}</span>
                        <span style={{ color: '#34d399', fontWeight: 'bold' }}>Aciertos: {item.aciertos}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : menuActivo === 'arena' ? (
            <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div>
                <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#fff', margin: 0 }}>🎮 Arena de Trivias Relámpago</h2>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 0 0' }}>Competencias rápidas con multiplicadores de XP y modo supervivencia.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'linear-gradient(135deg, #78350f, #451a03)', border: '1px solid #b45309', borderRadius: '24px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <span style={{ fontSize: '36px' }}>⚡</span>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: 0 }}>Batalla Relámpago Múltiple</h3>
                  <p style={{ fontSize: '13px', color: '#fde68a', margin: 0, lineHeight: '1.5' }}>Mezcla general de preguntas de CTP, Teórico MOPT y Admisión UCR con reloj de 30 segundos.</p>
                  <button onClick={() => iniciarPractica('web')} style={{ backgroundColor: '#fbbf24', color: '#78350f', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}>
                    Jugar Batalla Relámpago →
                  </button>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #065f46, #064e3b)', border: '1px solid #059669', borderRadius: '24px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <span style={{ fontSize: '36px' }}>🚗</span>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: 0 }}>Reto Vial MOPT (Autos & Motos)</h3>
                  <p style={{ fontSize: '13px', color: '#a7f3d0', margin: 0, lineHeight: '1.5' }}>Simulacro estricto basado en la Ley de Tránsito 9078 para examen oficial COSEVI.</p>
                  <button onClick={() => iniciarPractica('mopt_autos')} style={{ backgroundColor: '#34d399', color: '#064e3b', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}>
                    Jugar Reto MOPT →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#fff', margin: 0 }}>🏆 Torneos Oficiales & Liga Diamante CR</h2>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 0 0' }}>Competencias en vivo y tabla de posiciones de la red educativa de Costa Rica.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {TORNEOS_OFICIALES.map(t => (
                  <div key={t.id} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ backgroundColor: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', padding: '4px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: '900', width: 'fit-content' }}>● {t.estado}</span>
                      <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#fff', margin: 0 }}>{t.nombre}</h3>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{t.sede}</div>
                      <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 'bold' }}>🎁 {t.premio}</div>
                    </div>
                    <button onClick={() => iniciarPractica(t.mod)} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }}>
                      Entrar al Torneo →
                    </button>
                  </div>
                ))}
              </div>

              {/* TABLA DE LIGA DIAMANTE */}
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', padding: '28px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: '0 0 16px 0' }}>💎 Tabla de Clasificación Oficial • Liga Diamante CR</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                        <th style={{ padding: '12px' }}>Pos</th>
                        <th style={{ padding: '12px' }}>Competidor Verificado</th>
                        <th style={{ padding: '12px' }}>Institución</th>
                        <th style={{ padding: '12px' }}>Rol RBAC</th>
                        <th style={{ padding: '12px' }}>Racha</th>
                        <th style={{ padding: '12px', textAlign: 'right' }}>XP Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RANKING_LIGA.map(row => (
                        <tr key={row.pos} style={{ borderBottom: '1px solid rgba(30,41,59,0.5)' }}>
                          <td style={{ padding: '14px 12px', fontWeight: '900', color: '#fbbf24' }}>#{row.pos}</td>
                          <td style={{ padding: '14px 12px', fontWeight: '800', color: '#fff' }}>{row.nombre}</td>
                          <td style={{ padding: '14px 12px', color: '#cbd5e1' }}>{row.colegio}</td>
                          <td style={{ padding: '14px 12px' }}><span style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#60a5fa', padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>{row.rol}</span></td>
                          <td style={{ padding: '14px 12px', color: '#fbbf24', fontWeight: 'bold' }}>🔥 {row.racha}d</td>
                          <td style={{ padding: '14px 12px', textAlign: 'right', fontWeight: '900', color: '#34d399' }}>{row.pos === 1 ? xpTotal.toLocaleString() : row.xp.toLocaleString()} XP</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {modalSinpe && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '28px', padding: '35px', width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '18px', fontWeight: '900' }}>💳 Pase VIP • SINPE Móvil</h3>
              <button onClick={() => setModalSinpe(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
            </div>
            <div style={{ backgroundColor: '#064e3b', border: '1px solid #059669', padding: '18px', borderRadius: '16px', fontSize: '13px', color: '#ecfdf5', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Número Oficial:</span><strong style={{ color: '#34d399', fontSize: '15px' }}>6090-6359</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Entidad Bancaria:</span><strong>Banco Popular</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Titular Verificado:</span><strong>Max Salazar Sánchez</strong></div>
            </div>
            <button onClick={() => setModalSinpe(false)} style={{ width: '100%', backgroundColor: '#1e293b', color: '#fff', border: 'none', padding: '14px', borderRadius: '14px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
              Cerrar Ventana
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

