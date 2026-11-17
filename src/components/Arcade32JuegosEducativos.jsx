import React, { useState } from 'react';

export const CATALOGO_32_JUEGOS_EDUCATIVOS = [
  // 1 a 8: Razonamiento Lógico, Matemático y Verbal (UCR / TEC / UNA / UTN)
  { id: 1, cat: 'Razonamiento y Admisión', icono: '🔢', titulo: '1. Sucesiones Numéricas UCR/TEC', reto: '¿Cuál número continúa la serie lógica: 3, 7, 15, 31, 63, ...?', ops: ['127', '125', '95', '128'], ok: 0, exp: 'Cada término es el doble del anterior más 1 (63 × 2 + 1 = 127).' },
  { id: 2, cat: 'Razonamiento y Admisión', icono: '🧠', titulo: '2. Silogismos e Inferencias Lógicas', reto: 'Si ningún metal noble se oxida fácilmente y el oro es un metal noble, entonces:', ops: ['El oro no se oxida fácilmente', 'Todo lo que brilla es oro', 'Algún oro se oxida rápido', 'Ningún metal conduce calor'], ok: 0, exp: 'Silogismo categórico universal negativo (Celarent).' },
  { id: 3, cat: 'Razonamiento y Admisión', icono: '🗣️', titulo: '3. Analogías Verbales Académicas', reto: 'TEOREMA es a DEMOSTRACIÓN como HIPÓTESIS es a:', ops: ['Experimentación / Verificación', 'Olvido', 'Dogma', 'Lectura'], ok: 0, exp: 'El teorema se valida mediante demostración; la hipótesis mediante experimentación.' },
  { id: 4, cat: 'Razonamiento y Admisión', icono: '⚖️', titulo: '4. Balanza Algebraica de Ecuaciones', reto: 'Si 3 Cajas + 5 kg = 20 kg en equilibrio, ¿cuánto pesa cada Caja?', ops: ['5 kg', '6 kg', '4 kg', '15 kg'], ok: 0, exp: '3x + 5 = 20 -> 3x = 15 -> x = 5 kg.' },
  { id: 5, cat: 'Razonamiento y Admisión', icono: '🎲', titulo: '5. Probabilidad y Combinatoria', reto: 'Al lanzar un dado justo de 6 caras, ¿cuál es la probabilidad de obtener un número primo (2, 3 o 5)?', ops: ['50% (3/6)', '33.3% (2/6)', '66.6% (4/6)', '16.6% (1/6)'], ok: 0, exp: 'Hay 3 números primos (2, 3 y 5) de 6 resultados posibles: 3/6 = 1/2 = 50%.' },
  { id: 6, cat: 'Razonamiento y Admisión', icono: '📐', titulo: '6. Reto Geométrico Pitagórico', reto: 'Un triángulo rectángulo tiene catetos de 6 cm y 8 cm. ¿Cuánto mide su hipotenusa?', ops: ['10 cm', '12 cm', '14 cm', '9 cm'], ok: 0, exp: 'c = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.' },
  { id: 7, cat: 'Razonamiento y Admisión', icono: '⏱️', titulo: '7. Velocidad de Cálculo Mental', reto: '¿Cuánto es el 15% de 400 más el doble de 25?', ops: ['110', '95', '120', '85'], ok: 0, exp: '15% de 400 = 60; el doble de 25 = 50; 60 + 50 = 110.' },
  { id: 8, cat: 'Razonamiento y Admisión', icono: '🔍', titulo: '8. Comprensión Lectora Exprés', reto: '«La tecnología educa cuando emancipa, no cuando distrae.» La idea central sostiene que la tecnología debe:', ops: ['Promover la autonomía intelectual', 'Reemplazar a los libros', 'Usarse sin objetivos', 'Prohibirse en el aula'], ok: 0, exp: 'Emancipar significa liberar y fortalecer el criterio propio.' },

  // 9 a 16: Especialidades CTP (Contabilidad Pura, Accounting, Web, Ciberseguridad, Redes, Electrónica)
  { id: 9, cat: 'Especialidades CTP', icono: '📊', titulo: '9. Partida Doble — Contabilidad Pura', reto: 'Si un cliente abona en efectivo ₡200 000 a su cuenta por cobrar, ¿qué ocurre contablemente?', ops: ['Aumenta Efectivo (Debe) y disminuye Cuentas por Cobrar (Haber)', 'Aumenta Pasivo y disminuye Capital', 'Aumenta Gasto y disminuye Ingreso', 'No se registra en el Libro Diario'], ok: 0, exp: 'Entra dinero a Caja/Bancos (Debe) y se rebaja el saldo de Cuentas por Cobrar (Haber).' },
  { id: 10, cat: 'Especialidades CTP', icono: '💵', titulo: '10. Bilingual Accounting Challenge', reto: 'Which financial statement reports Revenues and Expenses over a specific period to determine Net Income?', ops: ['Income Statement (Profit & Loss)', 'Balance Sheet', 'Chart of Accounts', 'Purchase Order'], ok: 0, exp: 'The Income Statement measures performance (Revenues - Expenses = Net Income).' },
  { id: 11, cat: 'Especialidades CTP', icono: '🧾', titulo: '11. Calculadora Tributaria IVA Ley 9635', reto: '¿Cuál es la tarifa reducida de IVA aplicable a los servicios de educación privada regulada y medicamentos en CR?', ops: ['2%', '13%', '4%', '0.5%'], ok: 0, exp: 'Según la Ley 9635, educación regulada y medicamentos tributan tarifa reducida del 2%.' },
  { id: 12, cat: 'Especialidades CTP', icono: '🛡️', titulo: '12. Cazador de Phishing (Ciberseguridad)', reto: 'Recibes un correo urgente de "soporte-mep-login.ru" pidiendo tu contraseña institucional. ¿Qué debes hacer?', ops: ['Reportarlo como Phishing y jamás ingresar credenciales', 'Responder con la clave actual', 'Reenviarlo a todos los compañeros', 'Desactivar el antivirus'], ok: 0, exp: 'El dominio externo falso delata un ataque de ingeniería social (Phishing).' },
  { id: 13, cat: 'Especialidades CTP', icono: '🌐', titulo: '13. Maestro del Subneteo IPv4 (CCNA)', reto: '¿Cuál es la máscara decimal equivalente al prefijo de red /24?', ops: ['255.255.255.0', '255.255.0.0', '255.255.255.128', '255.0.0.0'], ok: 0, exp: '24 bits encendidos en binario equivalen a tres octetos en 255: 255.255.255.0.' },
  { id: 14, cat: 'Especialidades CTP', icono: '💻', titulo: '14. Depurador de Código JavaScript/React', reto: '¿Qué devuelve la expresión [10, 20, 30].map(x => x * 2) en JavaScript?', ops: ['[20, 40, 60]', '60', '[10, 20, 30]', 'true'], ok: 0, exp: 'El método .map() transforma cada elemento multiplicándolo por 2.' },
  { id: 15, cat: 'Especialidades CTP', icono: '🎨', titulo: '15. Diseño y Desarrollo Digital (UI/UX)', reto: 'Según las pautas de accesibilidad web WCAG, ¿para qué sirve el alto contraste entre texto y fondo?', ops: ['Para garantizar la legibilidad a personas con baja visión y en pantallas móviles', 'Para que el archivo pese más megabytes', 'Para ocultar el menú principal', 'Para eliminar el HTML'], ok: 0, exp: 'El contraste adecuado (mínimo 4.5:1) asegura inclusión visual y lectura clara.' },
  { id: 16, cat: 'Especialidades CTP', icono: '📦', titulo: '16. Logística e Incoterms 2026', reto: 'En el método de valuación de inventarios PEPS (FIFO), ¿cuáles unidades salen primero del almacén?', ops: ['Las primeras que entraron a bodega', 'Las últimas que se compraron', 'Las más caras únicamente', 'Las que no tienen factura'], ok: 0, exp: 'PEPS significa Primero en Entrar, Primero en Salir.' },

  // 17 a 24: Ciencias Exactas, Biología, Química, Física e Ingeniería
  { id: 17, cat: 'Ciencias e Ingeniería', icono: '🔌', titulo: '17. Código de Colores de Resistencias', reto: 'En Electrónica Industrial, ¿qué valor representa una resistencia con bandas Café (1), Negro (0) y Rojo (×100)?', ops: ['1 000 Ω (1 kΩ)', '100 Ω', '10 000 Ω', '220 Ω'], ok: 0, exp: 'Café(1) y Negro(0) forman 10, multiplicado por Rojo(10²) = 1 000 Ω = 1 kΩ.' },
  { id: 18, cat: 'Ciencias e Ingeniería', icono: '⚙️', titulo: '18. Electromecánica y PLC Industrial', reto: 'En un diagrama Ladder (escalera) de un PLC, dos contactos normalmente abiertos en serie representan una función lógica:', ops: ['AND (Y)', 'OR (O)', 'NOT (Inversor)', 'Memoria Reset'], ok: 0, exp: 'En serie ambos contactos deben cerrarse simultáneamente para energizar la bobina (AND).' },
  { id: 19, cat: 'Ciencias e Ingeniería', icono: '⚗️', titulo: '19. Trivia de Tabla Periódica (Química)', reto: '¿Cuál es el símbolo químico y el número de oxidación más común del elemento Sodio?', ops: ['Na (+1)', 'So (+2)', 'Sd (-1)', 'K (+1)'], ok: 0, exp: 'El Sodio (Natrium -> Na) pertenece a los metales alcalinos (Grupo 1) con estado +1.' },
  { id: 20, cat: 'Ciencias e Ingeniería', icono: '🧬', titulo: '20. Laboratorio de Genética (Biología)', reto: 'En la molécula de ADN, la base nitrogenada Adenina (A) se aparea siempre mediante puentes de hidrógeno con:', ops: ['Timina (T)', 'Citosina (C)', 'Guanina (G)', 'Uracilo (U)'], ok: 0, exp: 'En el ADN rige la ley de Chargaff: Adenina con Timina (A-T) y Citosina con Guanina (C-G).' },
  { id: 21, cat: 'Ciencias e Ingeniería', icono: '🚀', titulo: '21. Desafío de Leyes de Newton (Física)', reto: '¿Cuál fuerza neta se requiere para acelerar una masa de 15 kg a razón de 4 m/s²?', ops: ['60 N', '19 N', '3.75 N', '150 N'], ok: 0, exp: 'Por la Segunda Ley de Newton: F = m · a = 15 kg × 4 m/s² = 60 N.' },
  { id: 22, cat: 'Ciencias e Ingeniería', icono: '🌱', titulo: '22. Ecosistemas y Agroecología CR', reto: '¿Qué porcentaje aproximado de la biodiversidad mundial alberga el territorio de Costa Rica?', ops: ['Cerca del 5% de la biodiversidad mundial', 'Menos del 0.01%', 'El 50% del planeta', 'Solo especies marinas'], ok: 0, exp: 'Con apenas el 0.03% de la superficie terrestre, Costa Rica concentra cerca del 5% de la biodiversidad.' },
  { id: 23, cat: 'Ciencias e Ingeniería', icono: '🔬', titulo: '23. Célula y Organelas (Ciencias III Ciclo)', reto: '¿Cuál estructura es exclusiva de la célula vegetal y realiza la fotosíntesis?', ops: ['El cloroplasto', 'El centríolo', 'La mitocondria', 'El ribosoma'], ok: 0, exp: 'Los cloroplastos contienen clorofila para transformar energía lumínica en química.' },
  { id: 24, cat: 'Ciencias e Ingeniería', icono: '⚡', titulo: '24. Conversor Binario-Decimal TI', reto: '¿A qué número decimal equivale el octeto binario 00001010?', ops: ['10', '12', '8', '16'], ok: 0, exp: 'Encendidos los bits de valor 8 y 2: 8 + 2 = 10.' },

  // 25 a 32: Cultura General, Estudios Sociales, Cívica, Idiomas, Deportes y Educación Vial
  { id: 25, cat: 'Cultura, Idiomas y Cívica', icono: '🌎', titulo: '25. Geografía y Provincias de Costa Rica', reto: '¿En cuál cordillera de Costa Rica se ubican los volcanes Poás, Barva, Irazú y Turrialba?', ops: ['Cordillera Volcánica Central', 'Cordillera de Talamanca', 'Cordillera Volcánica de Guanacaste', 'Fila Brunqueña'], ok: 0, exp: 'Los cuatro grandes colosos del Valle Central conforman la Cordillera Volcánica Central.' },
  { id: 26, cat: 'Cultura, Idiomas y Cívica', icono: '🇨🇷', titulo: '26. Trivia Constitucional y Cívica', reto: '¿En qué año se promulgó la actual Constitución Política de la Segunda República de Costa Rica?', ops: ['1949', '1821', '1871', '1995'], ok: 0, exp: 'La Constitución vigente fue promulgada el 7 de noviembre de 1949.' },
  { id: 27, cat: 'Cultura, Idiomas y Cívica', icono: '🗣️', titulo: '27. Technical & Conversational English', reto: 'Choose the correct option: "If the server _____ offline, the PWA will load data from the local cache."', ops: ['goes', 'went', 'going', 'gone'], ok: 0, exp: 'First Conditional (Real possibility): If + Present Simple (goes), + Future (will load).' },
  { id: 28, cat: 'Cultura, Idiomas y Cívica', icono: '🎧', titulo: '28. Servicio al Cliente & Etiqueta', reto: 'En atención ejecutiva bilingüe, ¿qué significa el indicador KPI denominado CSAT?', ops: ['Customer Satisfaction Score (Índice de Satisfacción del Cliente)', 'Computer System Access Tool', 'Cost of Sales and Taxes', 'Central Switch Automatic Timer'], ok: 0, exp: 'CSAT mide directamente el porcentaje de satisfacción del cliente tras una interacción.' },
  { id: 29, cat: 'Cultura, Idiomas y Cívica', icono: '⚽', titulo: '29. Fisiología y Deportes MEP', reto: '¿Cuál macronutriente constituye la fuente principal e inmediata de energía durante el ejercicio aeróbico?', ops: ['Los carbohidratos (glucógeno)', 'Las vitaminas liposolubles', 'El agua mineral', 'El hierro'], ok: 0, exp: 'El glucógeno muscular y hepático aporta la glucosa necesaria para producir ATP rápidamente.' },
  { id: 30, cat: 'Cultura, Idiomas y Cívica', icono: '🎵', titulo: '30. Círculos Armónicos y Música', reto: 'En teoría musical y práctica de ukelele/guitarra, ¿cuáles notas forman el acorde perfecto de Do Mayor (C)?', ops: ['Do - Mi - Sol (C - E - G)', 'Do - Re - Mi', 'La - Do - Mi', 'Sol - Si - Re'], ok: 0, exp: 'La tríada mayor de Do está integrada por tónica (Do), tercera mayor (Mi) y quinta justa (Sol).' },
  { id: 31, cat: 'Cultura, Idiomas y Cívica', icono: '🚗', titulo: '31. Señalamiento Vial COSEVI / MOPT', reto: 'Una señal vial preventiva con fondo amarillo y símbolo negro en forma de rombo tiene como finalidad:', ops: ['Advertir con anticipación sobre un peligro o condición especial en la vía', 'Sancionar con multa automática', 'Indicar servicios turísticos de restaurante', 'Establecer prohibición absoluta'], ok: 0, exp: 'Las señales preventivas (amarillas en rombo) alertan sobre curvas, pendientes o cruces peligrosos.' },
  { id: 32, cat: 'Cultura, Idiomas y Cívica', icono: '🦉', titulo: '32. Ciberseguridad y Ley 8968 (PRODHAB)', reto: '¿Cuál entidad adscrita al Ministerio de Justicia vigila el cumplimiento de la Ley 8968 en Costa Rica?', ops: ['PRODHAB (Agencia de Protección de Datos de los Habitantes)', 'CONAVI', 'RECOPE', 'SENARA'], ok: 0, exp: 'La PRODHAB es el órgano rector nacional encargado de tutelar los datos personales.' }
];

export default function Arcade32JuegosEducativos({ onAbrirRotonda2D }) {
  const [catFiltro, setCatFiltro] = useState('Todas');
  const [juegoActivo, setJuegoActivo] = useState(CATALOGO_32_JUEGOS_EDUCATIVOS[0]);
  const [opcionMarcada, setOpcionMarcada] = useState(null);
  const [xpGanado, setXpGanado] = useState(0);
  const [juegosSuperados, setJuegosSuperados] = useState({});

  const categorias = ['Todas', 'Razonamiento y Admisión', 'Especialidades CTP', 'Ciencias e Ingeniería', 'Cultura, Idiomas y Cívica'];

  const listaFiltrada = CATALOGO_32_JUEGOS_EDUCATIVOS.filter((j) =>
    catFiltro === 'Todas' ? true : j.cat === catFiltro
  );

  const responderReto = (idx) => {
    if (opcionMarcada !== null) return;
    setOpcionMarcada(idx);
    if (idx === juegoActivo.ok && !juegosSuperados[juegoActivo.id]) {
      setXpGanado((prev) => prev + 50);
      setJuegosSuperados((prev) => ({ ...prev, [juegoActivo.id]: true }));
    }
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-5 sm:p-6 rounded-2xl shadow-2xl space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-700">
            🎮 Gamificación Educativa MEP — 32 Juegos Interactivos de Razonamiento y Especialidades
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
            Arcade de 32 Juegos de Razonamiento, Contabilidad Pura, Ciencias, Idiomas y Tecnología
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-xs font-extrabold">
            <span className="text-emerald-400">🏆 Superados: {Object.keys(juegosSuperados).length} / 32</span>
            <span className="mx-2 text-slate-600">|</span>
            <span className="text-amber-400">⚡ +{xpGanado} XP</span>
          </div>
          {onAbrirRotonda2D && (
            <button
              onClick={onAbrirRotonda2D}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow"
            >
              🕹️ Abrir Simulador 2D de Rotonda
            </button>
          )}
        </div>
      </div>

      {/* Filtros de Categoría */}
      <div className="flex flex-wrap gap-2">
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => setCatFiltro(c)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              catFiltro === c ? 'bg-cyan-600 text-white shadow' : 'bg-slate-950 text-slate-300 border border-slate-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Consola del Juego Seleccionado Arriba */}
      <div className="bg-slate-950 border-2 border-cyan-500/60 p-5 rounded-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">{juegoActivo.icono}</span>
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase">{juegoActivo.cat}</span>
              <h3 className="text-base sm:text-lg font-extrabold text-white">{juegoActivo.titulo}</h3>
            </div>
          </div>
          <button
            onClick={() => {
              const sig = CATALOGO_32_JUEGOS_EDUCATIVOS[juegoActivo.id % CATALOGO_32_JUEGOS_EDUCATIVOS.length];
              setJuegoActivo(sig);
              setOpcionMarcada(null);
            }}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-xl text-xs"
          >
            Siguiente Juego (#{(juegoActivo.id % 32) + 1}) →
          </button>
        </div>

        <p className="text-sm sm:text-base font-semibold text-slate-100 bg-slate-900 p-4 rounded-xl border border-slate-800">
          {juegoActivo.reto}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {juegoActivo.ops.map((op, i) => {
            let estilo = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-cyan-500';
            if (opcionMarcada !== null) {
              if (i === juegoActivo.ok) estilo = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
              else if (i === opcionMarcada) estilo = 'bg-rose-950 border-rose-500 text-rose-200';
            }
            return (
              <button
                key={i}
                onClick={() => responderReto(i)}
                className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all ${estilo}`}
              >
                <strong className="text-cyan-400 mr-2">{['A', 'B', 'C', 'D'][i]})</strong> {op}
              </button>
            );
          })}
        </div>

        {opcionMarcada !== null && (
          <div className="bg-cyan-950/50 border border-cyan-500/40 p-3.5 rounded-xl text-xs text-slate-200">
            <strong className="text-cyan-300 block mb-1">💡 Explicación del Juego #{juegoActivo.id}:</strong>
            {juegoActivo.exp}
          </div>
        )}
      </div>

      {/* Tablero de los 32 Juegos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {listaFiltrada.map((j) => {
          const superado = juegosSuperados[j.id];
          const esActual = juegoActivo.id === j.id;
          return (
            <button
              key={j.id}
              onClick={() => {
                setJuegoActivo(j);
                setOpcionMarcada(null);
              }}
              className={`text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                esActual
                  ? 'bg-cyan-950/80 border-cyan-400 ring-1 ring-cyan-400'
                  : superado
                    ? 'bg-emerald-950/40 border-emerald-600/60'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="text-xl">{j.icono}</span>
                <div className="truncate">
                  <p className="text-xs font-extrabold text-white truncate">{j.titulo}</p>
                  <p className="text-[10px] text-slate-400 truncate">{j.cat}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400">
                {superado ? '✓' : '▶'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}