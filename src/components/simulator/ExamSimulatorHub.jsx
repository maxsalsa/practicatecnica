import React, { useState, useEffect } from 'react';

const EXAM_TRACKS = [
  {
    id: 'mep-estandarizada',
    name: 'Pruebas Nacionales Estandarizadas MEP',
    badge: 'Secundaria 11° y 12°',
    durationMinutes: 45,
    description: 'Reactivos oficiales de análisis, resolución de problemas y comprensión lectora.',
    questions: [
      {
        id: 'q1',
        area: 'Pensamiento Lógico y Matemático',
        prompt: 'En una red local de laboratorio con 28 estaciones de trabajo, el servidor distribuye paquetes en bloques de 4 estaciones cada 15 milisegundos. ¿Cuántos milisegundos tarda en cubrir la totalidad del laboratorio?',
        options: ['90 ms', '105 ms', '120 ms', '135 ms'],
        correctIndex: 1,
        explanation: '28 estaciones divididas en bloques de 4 equivalen a 7 bloques. Multiplicando 7 bloques por 15 ms se obtienen 105 ms.'
      },
      {
        id: 'q2',
        area: 'Ciencias y Tecnología Aplicada',
        prompt: '¿Cuál práctica garantiza la disponibilidad de una aplicación web educativa cuando falla la conexión a Internet en el aula?',
        options: [
          'Depender únicamente de consultas remotas en cada clic',
          'Implementar almacenamiento local (Offline-First) y Service Workers en PWA',
          'Desactivar el caché del navegador permanentemente',
          'Aumentar el tamaño de las imágenes sin comprimir'
        ],
        correctIndex: 1,
        explanation: 'La arquitectura PWA Offline-First almacena reactivos y progreso en caché local para operar sin red y sincronizar al reconectar.'
      }
    ]
  },
  {
    id: 'ctp-tecnico',
    name: 'Especialidades Técnicas CTP (Ciberseguridad · Web · TI)',
    badge: 'Educación Técnica',
    durationMinutes: 60,
    description: 'Práctica técnica para Desarrollo Web (.JSX), Ciberseguridad, Soporte TI y Diseño de Software.',
    questions: [
      {
        id: 'q3',
        area: 'Ciberseguridad y Protección de Datos',
        prompt: 'Al gestionar un repositorio Git para una aplicación en producción, ¿cuál configuración evita exponer credenciales de base de datos y claves API?',
        options: [
          'Subir el archivo .env.production directamente a la rama main',
          'Declarar .env y .env* dentro de .gitignore y usar variables de entorno en el servidor',
          'Guardar las contraseñas dentro de comentarios en App.jsx',
          'Renombrar la carpeta node_modules antes del commit'
        ],
        correctIndex: 1,
        explanation: 'Bloquear cualquier variante .env* en .gitignore impide que tokens privados viajen al repositorio público.'
      },
      {
        id: 'q4',
        area: 'Desarrollo Web Moderno (.JSX)',
        prompt: 'En React con JavaScript (.jsx), ¿cuál hook permite sincronizar el estado de un componente con localStorage cada vez que cambian los datos?',
        options: ['useEffect', 'useMemo', 'useRef', 'useContext'],
        correctIndex: 0,
        explanation: 'useEffect ejecuta efectos secundarios como persistencia en localStorage cuando cambian las dependencias declaradas.'
      }
    ]
  },
  {
    id: 'mopt-cosevi',
    name: 'Examen Teórico de Manejo MOPT · COSEVI',
    badge: 'Seguridad Vial CR',
    durationMinutes: 40,
    description: 'Simulador cronometrado basado en el Manual del Conductor de Costa Rica.',
    questions: [
      {
        id: 'q5',
        area: 'Normativa y Señalización Vial',
        prompt: 'Al aproximarse a una zona escolar debidamente demarcada con presencia de estudiantes en Costa Rica, ¿cuál es el límite máximo de velocidad permitido?',
        options: ['25 km/h', '40 km/h', '50 km/h', '60 km/h'],
        correctIndex: 0,
        explanation: 'La Ley de Tránsito de Costa Rica establece una velocidad máxima de 25 km/h frente a centros educativos con presencia de estudiantes.'
      }
    ]
  },
  {
    id: 'admision-u',
    name: 'Admisión Universitaria (UCR · UNA · TEC)',
    badge: 'Ingreso Educación Superior',
    durationMinutes: 60,
    description: 'Entrenamiento intensivo en razonamiento verbal y matemático con explicación paso a paso.',
    questions: [
      {
        id: 'q6',
        area: 'Razonamiento Verbal',
        prompt: 'Si todas las herramientas offline garantizan continuidad pedagógica, y Práctica Técnica CR opera bajo arquitectura offline, ¿qué conclusión se deduce necesariamente?',
        options: [
          'Ninguna plataforma web requiere Internet',
          'Práctica Técnica CR garantiza continuidad pedagógica',
          'Solo los laboratorios grandes usan herramientas offline',
          'La continuidad pedagógica depende exclusivamente del ancho de banda'
        ],
        correctIndex: 1,
        explanation: 'Por silogismo directo: si todo A es B, y X es A, entonces X necesariamente cumple B.'
      }
    ]
  }
];

export default function ExamSimulatorHub() {
  const [selectedTrackId, setSelectedTrackId] = useState(EXAM_TRACKS[0].id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(EXAM_TRACKS[0].durationMinutes * 60);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('pt26_exam_history');
      return saved ? JSON.parse(saved) : { correct: 18, total: 21 };
    } catch {
      return { correct: 18, total: 21 };
    }
  });

  const activeTrack = EXAM_TRACKS.find((t) => t.id === selectedTrackId) || EXAM_TRACKS[0];
  const currentQuestion = activeTrack.questions[currentIndex] || activeTrack.questions[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('pt26_exam_history', JSON.stringify(history));
  }, [history]);

  const handleSelectTrack = (track) => {
    setSelectedTrackId(track.id);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setSecondsLeft(track.durationMinutes * 60);
  };

  const handleVerifyAnswer = () => {
    if (selectedOption === null || showFeedback) return;
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    setShowFeedback(true);
    setHistory((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const handleNextQuestion = () => {
    const nextIdx = (currentIndex + 1) % activeTrack.questions.length;
    setCurrentIndex(nextIdx);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const formatTimer = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return m + ':' + s;
  };

  const accuracy = Math.round((history.correct / (history.total || 1)) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 space-y-4">
        <div className="argon-card p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            practicatecnica.com
          </span>
          <h2 className="text-lg font-bold text-slate-800 mt-0.5 mb-3">
            Rutas de Entrenamiento Oficial
          </h2>
          <div className="space-y-2.5">
            {EXAM_TRACKS.map((track) => {
              const isSelected = track.id === activeTrack.id;
              return (
                <button
                  key={track.id}
                  onClick={() => handleSelectTrack(track)}
                  className={'w-full text-left p-3.5 rounded-xl border transition cursor-pointer ' + (
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-sm'
                      : 'border-slate-100 bg-slate-50/50 hover:bg-white'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-indigo-600">{track.badge}</span>
                    <span className="text-xs font-semibold text-slate-400">{track.durationMinutes} min</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 mt-1">{track.name}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{track.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="argon-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-emerald-600">Rendimiento Acumulado</span>
            <span className="text-sm font-black text-slate-800">{accuracy}% Efectividad</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-emerald-500 transition-all" style={{ width: accuracy + '%' }} />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Aciertos: <strong>{history.correct}</strong> de <strong>{history.total}</strong> reactivos en modo Offline-First.
          </p>
        </div>
      </div>

      <div className="lg:col-span-8 argon-card p-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                {currentQuestion.area}
              </span>
              <h3 className="text-lg font-bold text-slate-800 mt-0.5">
                {activeTrack.name} · Reactivo {currentIndex + 1} de {activeTrack.questions.length}
              </h3>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-black tracking-wider">
              Reloj: {formatTimer(secondsLeft)}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mb-5">
            <p className="text-base font-semibold text-slate-800 leading-relaxed">
              {currentQuestion.prompt}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const isChosen = selectedOption === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;
              let optionStyle = 'border-slate-200 bg-white hover:border-indigo-300';

              if (showFeedback) {
                if (isCorrectOption) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900';
                } else if (isChosen && !isCorrectOption) {
                  optionStyle = 'border-red-400 bg-red-50 text-red-900';
                }
              } else if (isChosen) {
                optionStyle = 'border-indigo-600 bg-indigo-50/80 text-indigo-950';
              }

              return (
                <button
                  key={idx}
                  onClick={() => !showFeedback && setSelectedOption(idx)}
                  className={'w-full text-left p-4 rounded-xl border-2 text-sm font-medium transition flex items-center gap-3 cursor-pointer ' + optionStyle}
                >
                  <span className="h-7 w-7 rounded-lg bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="mt-5 p-4 rounded-xl bg-indigo-50/90 border border-indigo-200">
              <p className="text-xs font-bold uppercase text-indigo-700">
                Explicación Oficial
              </p>
              <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-6 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            practicatecnica.com · Guardado automático Offline-First
          </span>
          <div className="flex items-center gap-3">
            {!showFeedback ? (
              <button
                onClick={handleVerifyAnswer}
                disabled={selectedOption === null}
                className="px-5 py-2.5 rounded-lg text-xs font-bold argon-btn-primary disabled:opacity-50 cursor-pointer"
              >
                Comprobar Respuesta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
              >
                Siguiente Reactivo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
