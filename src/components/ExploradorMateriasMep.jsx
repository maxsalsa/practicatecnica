import React, { useState } from 'react';

export const CATALOGO_MATERIAS_MEP = [
  {
    id: 'diseno_desarrollo_digital',
    nombre: 'Diseño y Desarrollo Digital',
    categoria: 'Especialidades CTP',
    icono: '🎨',
    color: 'from-fuchsia-600 to-indigo-950',
    niveles: '10°, 11° y 12° CTP',
    items: 'Prototipado UI/UX, Producción Multimedia, Animación 2D/3D, Desarrollo Frontend Interactivo, Identidad Visual y Marketing Digital.',
    ilustracion: '✨ UI/UX Figma + 🎬 Multimedia + 💻 Desarrollo Interactivo',
    guiaDescargable: 'Programa y Manual Práctico de Diseño y Desarrollo Digital MEP'
  },
  // ESPECIALIDADES TÉCNICAS CTP (SEPARADAS INDIVIDUALMENTE)
  {
    id: 'desarrollo_web',
    nombre: 'Desarrollo Web',
    categoria: 'Especialidades CTP',
    icono: '💻',
    color: 'from-cyan-600 to-blue-950',
    niveles: '10°, 11° y 12° CTP',
    items: 'HTML5, CSS3/Tailwind, JavaScript ES6+, React, APIs REST, Node.js, Bases de Datos SQL/NoSQL y UI/UX.',
    ilustracion: '🌐 Frontend + ⚡ Backend + 🗄️ Base de Datos',
    guiaDescargable: 'Manual Técnico de Arquitectura Web Full-Stack y Prácticas React/JS MEP'
  },
  {
    id: 'ciberseguridad',
    nombre: 'Ciberseguridad',
    categoria: 'Especialidades CTP',
    icono: '🛡️',
    color: 'from-sky-600 to-slate-950',
    niveles: '10°, 11° y 12° CTP',
    items: 'Hacking Ético, Criptografía SHA-256, Firewalls, SOC, Análisis de Vulnerabilidades OWASP, ISO 27001 y Ley 8968.',
    ilustracion: '🔐 Cifrado SHA-256 + 🧱 Firewall + 🕵️‍♂️ Pentesting',
    guiaDescargable: 'Guía Oficial de Laboratorios de Ciberseguridad, Hardening y Auditoría Forense'
  },
  {
    id: 'contabilidad',
    nombre: 'Contabilidad y Finanzas',
    categoria: 'Especialidades CTP',
    icono: '📊',
    color: 'from-emerald-600 to-teal-950',
    niveles: '10°, 11° y 12° CTP',
    items: 'Ciclo Contable, Normas NIIF, Planillas, Conciliación Bancaria, Impuestos (IVA/Renta) y Costos Industriales.',
    ilustracion: '📘 Libro Diario + ⚖️ Balance General + 🧮 Estado de Resultados',
    guiaDescargable: 'Compendio Práctico de Asientos Contables NIIF, Planillas y Tributación CR'
  },
  {
    id: 'accounting',
    nombre: 'Accounting (Bilingual Accounting)',
    categoria: 'Especialidades CTP',
    icono: '💵',
    color: 'from-teal-600 to-emerald-950',
    niveles: '10°, 11° y 12° CTP',
    items: 'US GAAP & IFRS Standards, Balance Sheet, Income Statement, Cash Flow, Corporate Finance & Financial English.',
    ilustracion: '🏦 Assets = Liabilities + Equity | 📈 Cash Flow Analysis',
    guiaDescargable: 'Bilingual Accounting & IFRS Workbook for Technical High Schools'
  },
  {
    id: 'ejecutivo_comercial',
    nombre: 'Ejecutivo Comercial y de Servicio al Cliente',
    categoria: 'Especialidades CTP',
    icono: '🎧',
    color: 'from-indigo-600 to-blue-950',
    niveles: '10°, 11° y 12° CTP',
    items: 'Comunicación Empresarial, CRM, Etiqueta y Protocolo, Gestión de Calidad, Ventas B2B/B2C y Customer Experience.',
    ilustracion: '🤝 Atención Omnicanal + 📞 Inglés de Negocios + ⭐ KPIs de Calidad',
    guiaDescargable: 'Manual de Protocolo Corporativo, CRM y Resolución de Casos de Servicio al Cliente'
  },
  {
    id: 'administracion_logistica',
    nombre: 'Administración, Logística y Distribución',
    categoria: 'Especialidades CTP',
    icono: '📦',
    color: 'from-amber-600 to-yellow-950',
    niveles: '10°, 11° y 12° CTP',
    items: 'Cadena de Suministro (Supply Chain), Inventarios (PEPS/Promedio), Comercio Internacional, Incoterms, Aduanas y Bodegas.',
    ilustracion: '🚢 Incoterms 2026 + 🏭 Control de Stock + 🚚 Rutas de Distribución',
    guiaDescargable: 'Guía de Operaciones Logísticas, Incoterms, Inventarios y Comercio Exterior'
  },
  {
    id: 'electronica_industrial',
    nombre: 'Electrónica Industrial',
    categoria: 'Especialidades CTP',
    icono: '🔌',
    color: 'from-purple-600 to-indigo-950',
    niveles: '10°, 11° y 12° CTP',
    items: 'Circuitos Digitales y Analógicos, Microcontroladores, Sensores, Instrumentación, Variadores e IoT Industrial.',
    ilustracion: '🔋 Ley de Ohm + 🎛️ Osciloscopio + 🤖 Microcontroladores PWM',
    guiaDescargable: 'Formulario y Prácticas de Laboratorio de Electrónica Analógica, Digital y Potencia'
  },
  {
    id: 'electromecanica',
    nombre: 'Electromecánica Industrial',
    categoria: 'Especialidades CTP',
    icono: '⚙️',
    color: 'from-orange-600 to-red-950',
    niveles: '10°, 11° y 12° CTP',
    items: 'Motores Trifásicos, Control Eléctrico, Neumática, Hidráulica, Autómatas Programables (PLC) y Mantenimiento Preventivo.',
    ilustracion: '⚡ Arranque Estrella-Delta + 🔧 Neumática + 🏭 Automatización PLC',
    guiaDescargable: 'Manual de Diagramas de Control Electromecánico, Motores y Lógica Escalera (Ladder)'
  },
  {
    id: 'redes_ccna',
    nombre: 'Configuración y Soporte de Redes (CCNA)',
    categoria: 'Especialidades CTP',
    icono: '🌐',
    color: 'from-blue-600 to-slate-900',
    niveles: '10°, 11° y 12° CTP',
    items: 'Subneteo IPv4/IPv6, VLANs, Enrutamiento OSPF, Comandos Cisco IOS, Cableado Estructurado y Redes Inalámbricas.',
    ilustracion: '🖧 Switch Capa 2 + 📡 Router Cisco IOS + 🔢 Subneteo VLSM',
    guiaDescargable: 'Guía de Comandos Cisco IOS, Cálculo de Subredes VLSM y Topologías Packet Tracer'
  },
  {
    id: 'ia_datos',
    nombre: 'Inteligencia Artificial y Ciencia de Datos',
    categoria: 'Especialidades CTP',
    icono: '🧠',
    color: 'from-fuchsia-600 to-purple-950',
    niveles: '10°, 11° y 12° CTP',
    items: 'Python para Datos, Machine Learning, Prompt Engineering, Modelos Generativos, Estadística Aplicada y Ética de IA.',
    ilustracion: '🐍 Python Pandas + 🤖 Redes Neuronales + 📊 Visualización Big Data',
    guiaDescargable: 'Manual de Fundamentos de Machine Learning, Análisis de Datos y Automatización IA'
  },
  {
    id: 'diseno_mecanica_turismo',
    nombre: 'Diseño Gráfico, Mecánica de Precisión, Refrigeración y Turismo',
    categoria: 'Especialidades CTP',
    icono: '🎨',
    color: 'from-pink-600 to-rose-950',
    niveles: '10°, 11° y 12° CTP',
    items: 'Diseño Vectorial UI, Torno/Fresadora CNC, Termodinámica y Climatización, Hospitalidad y Turismo Ecológico.',
    ilustracion: '✒️ Vectorial + ⚙️ CNC CAD/CAM + ❄️ Climatización + 🌿 Ecoturismo',
    guiaDescargable: 'Compendio Multidisciplinario de Especialidades Industriales, Comerciales y de Servicios'
  },
  {
    id: 'agroecologia',
    nombre: 'Agroecología y Agroindustria',
    categoria: 'Especialidades CTP',
    icono: '🌱',
    color: 'from-lime-600 to-green-950',
    niveles: '10°, 11° y 12° CTP',
    items: 'Suelos, Cultivos Sostenibles, Riego Automatizado, Inocuidad Alimentaria, Biotecnología Vegetal y Gestión Ambiental.',
    ilustracion: '🌾 Agricultura de Precisión + 💧 Fertirriego + ♻️ Producción Orgánica',
    guiaDescargable: 'Guía Técnica de Producción Agroecológica, Manejo de Suelos y Soberanía Alimentaria'
  },

  // MATERIAS ACADÉMICAS, CIENCIAS, DEPORTES E IDIOMAS
  {
    id: 'sociales',
    nombre: 'Estudios Sociales',
    categoria: 'Académicas y Ciencias',
    icono: '🌎',
    color: 'from-amber-700 to-orange-950',
    niveles: '7° a 11° / Primaria',
    items: 'Historia de Costa Rica, Geografía Mundial, Geopolítica, Estado Social de Derecho y Cartografía.',
    ilustracion: '🗺️ Relieve de CR + 📜 Reforma Social 1940 + 🌍 Geopolítica',
    guiaDescargable: 'Resumen Ilustrado de Historia y Geografía de Costa Rica para Pruebas Nacionales'
  },
  {
    id: 'civica',
    nombre: 'Educación Cívica',
    categoria: 'Académicas y Ciencias',
    icono: '🇨🇷',
    color: 'from-blue-700 to-indigo-950',
    niveles: '7° a 11°',
    items: 'Constitución Política, División de Poderes, Régimen Municipal, Derechos Humanos y Cultura Democrática.',
    ilustracion: '⚖️ Poderes de la República + 🗳️ Sufragio + 🛡️ Garantías Individuales',
    guiaDescargable: 'Antología de Educación Cívica, Institucionalidad Costarricense y Derechos Constitucionales'
  },
  {
    id: 'ciencias',
    nombre: 'Ciencias Naturales (7°, 8° y 9°)',
    categoria: 'Académicas y Ciencias',
    icono: '🔬',
    color: 'from-emerald-700 to-teal-950',
    niveles: 'III Ciclo MEP',
    items: 'Estructura Celular, Sistemas del Cuerpo Humano, Energía, Materia, Tabla Periódica Básica y Astronomía.',
    ilustracion: '🦠 Célula Eucariota + ⚡ Transformación de Energía + 🪐 Sistema Solar',
    guiaDescargable: 'Cuaderno de Prácticas y Experimentos Guiados de Ciencias para Tercer Ciclo'
  },
  {
    id: 'biologia',
    nombre: 'Biología',
    categoria: 'Académicas y Ciencias',
    icono: '🧬',
    color: 'from-green-700 to-emerald-950',
    niveles: '10°, 11° y 12°',
    items: 'Genética Mendeliana y No Mendeliana, ADN/ARN, Síntesis de Proteínas, Evolución, Ecología y Ciclos Biogeoquímicos.',
    ilustracion: '🧬 Cruces de Punnett + 🌿 Fotosíntesis vs Respiración + 🦋 Biodiversidad',
    guiaDescargable: 'Formulario y Problemas Resueltos de Genética, Ecología y Biología Molecular MEP'
  },
  {
    id: 'quimica',
    nombre: 'Química',
    categoria: 'Académicas y Ciencias',
    icono: '⚗️',
    color: 'from-violet-700 to-purple-950',
    niveles: '10°, 11° y 12°',
    items: 'Configuración Electrónica, Enlaces Químicos, Nomenclatura Inorgánica, Estequiometría, Disoluciones y Química Orgánica.',
    ilustracion: '🧪 Mol y Número de Avogadro + ⚛️ Enlace Covalente/Iónico + 🔥 Reacciones',
    guiaDescargable: 'Tabla Periódica Comentada y Guía Paso a Paso de Estequiometría y Química Orgánica'
  },
  {
    id: 'fisica',
    nombre: 'Física-Matemática',
    categoria: 'Académicas y Ciencias',
    icono: '🚀',
    color: 'from-cyan-700 to-sky-950',
    niveles: '10°, 11° y 12°',
    items: 'Vectores, MRU, MRUA, Caída Libre, Leyes de Newton, Trabajo y Energía, Hidrostática, Electrostática y Ley de Coulomb.',
    ilustracion: '🏎️ Cinemática MRUA + 🍎 F = m·a + ⚡ Campo Eléctrico y Circuitos',
    guiaDescargable: 'Formulario Maestro de Física-Matemática con Despejes y Problemas Resueltos'
  },
  {
    id: 'matematicas',
    nombre: 'Matemáticas MEP',
    categoria: 'Académicas y Ciencias',
    icono: '📐',
    color: 'from-rose-700 to-red-950',
    niveles: '1° a 12°',
    items: 'Circunferencia, Polígonos, Funciones (Lineal, Cuadrática, Exponencial, Logarítmica), Estadística y Probabilidad.',
    ilustracion: '📈 Funciones f(x) + ⭕ Geometría Analítica + 🎲 Probabilidad',
    guiaDescargable: 'Manual de Fórmulas Matemáticas, Geometría Analítica y Funciones para Diversificada'
  },
  {
    id: 'espanol_deportes_artes',
    nombre: 'Español, Educación Física / Deportes, Música, Filosofía e Idiomas',
    categoria: 'Deportes, Artes e Idiomas',
    icono: '⚽',
    color: 'from-lime-700 to-emerald-950',
    niveles: '1° a 12°',
    items: 'Comprensión Lectora, Literatura, Fisiología Deportiva y Reglamentos, Solfeo, Lógica Filosófica, Inglés y Francés.',
    ilustracion: '🏃‍♂️ Salud y Deporte + 📖 Análisis Literario + 🎵 Armonía + 🗣️ Bilingüismo',
    guiaDescargable: 'Guía Integral de Asignaturas Complementarias, Lectura Crítica, Deportes e Idiomas'
  }
];

const CATEGORIAS = ['Todas', 'Especialidades CTP', 'Académicas y Ciencias', 'Deportes, Artes e Idiomas'];

const BANCO_PREGUNTAS_POR_ESPECIALIDAD = {
  desarrollo_web: {
    q: 'En el desarrollo de una aplicación moderna con React y JavaScript (sin recargar el navegador), ¿cuál hook permite gestionar el estado reactivo local de un componente funcional?',
    ops: ['useState()', 'document.write()', 'SELECT * FROM state', 'System.out.println()'],
    ok: 0,
    exp: 'Paso 1: En React funcional, useState() declara una variable de estado y su función actualizadora.\nPaso 2: Cada vez que cambia el estado, React vuelve a renderizar únicamente los nodos necesarios del Virtual DOM.'
  },
  ciberseguridad: {
    q: 'Un analista de Ciberseguridad del CTP detecta intentos de inyección SQL en el formulario de ingreso. ¿Cuál es la contramedida de programación segura (defensa en profundidad) más efectiva?',
    ops: [
      'Utilizar consultas parametrizadas (Prepared Statements) y validación estricta de entradas.',
      'Cambiar el color del botón de inicio de sesión a rojo.',
      'Mostrar los errores internos de la base de datos en pantalla.',
      'Guardar las contraseñas en un archivo de texto plano público.'
    ],
    ok: 0,
    exp: 'Paso 1: Las consultas parametrizadas separan la estructura del comando SQL de los datos ingresados por el usuario.\nPaso 2: Así se neutraliza cualquier intento de ejecutar código malicioso como OR 1=1.'
  },
  contabilidad: {
    q: 'Si una empresa adquiere equipo de cómputo por ₡1 500 000 más 13% de IVA pagando de contado mediante transferencia bancaria, ¿cuál es el registro contable correcto?',
    ops: [
      'Débito a Equipo de Cómputo (₡1 500 000) y Débito a IVA Soportado (₡195 000), contra Crédito a Bancos (₡1 695 000).',
      'Crédito a Equipo de Cómputo y Débito a Cuentas por Pagar.',
      'Débito a Gasto por Depreciación contra Crédito a Capital Social.',
      'Débito a Bancos por ₡1 500 000 contra Crédito a Ventas.'
    ],
    ok: 0,
    exp: 'Paso 1: El activo Equipo de Cómputo aumenta por el debe (₡1 500 000) junto con el crédito fiscal de IVA (13% = ₡195 000).\nPaso 2: Al pagarse de contado, disminuye la cuenta de Bancos por el haber (₡1 695 000).'
  },
  accounting: {
    q: 'According to the fundamental Accounting Equation under IFRS and US GAAP, if a company has Total Assets of $250,000 and Total Liabilities of $90,000, what is the Owner’s Equity?',
    ops: ['$160,000', '$340,000', '$90,000', '$250,000'],
    ok: 0,
    exp: 'Step 1: Apply the Accounting Equation: Assets = Liabilities + Equity.\nStep 2: Equity = Assets ($250,000) - Liabilities ($90,000) = $160,000.'
  },
  ejecutivo_comercial: {
    q: 'En la gestión profesional de Servicio al Cliente y CRM, cuando un usuario presenta un reclamo justificado con alta carga emocional, ¿cuál es el protocolo correcto de atención?',
    ops: [
      'Aplicar escucha activa, empatizar sin interrumpir, registrar el ticket en el CRM y ofrecer una solución concreta con seguimiento.',
      'Transferir la llamada repetidamente sin tomar los datos del cliente.',
      'Culpar a otro departamento de la empresa y finalizar la conversación.',
      'Ignorar el reclamo hasta que venza el plazo de garantía.'
    ],
    ok: 0,
    exp: 'Paso 1: La técnica HEARD (Hear, Empathize, Apologize, Resolve, Diagnose) exige escuchar activamente, validar la situación y documentar la solución en el CRM.'
  },
  administracion_logistica: {
    q: 'En Comercio Internacional y Logística, ¿cuál Incoterm obliga al vendedor a cubrir todos los costos, flete internacional y seguro hasta el puerto de destino convenido?',
    ops: ['CIF (Cost, Insurance and Freight)', 'EXW (Ex Works - En Fábrica)', 'FCA (Free Carrier)', 'FAS (Free Alongside Ship)'],
    ok: 0,
    exp: 'Paso 1: Bajo el Incoterm CIF (Costo, Seguro y Flete), el exportador contrata y paga el transporte principal y la póliza de seguro marítimo hasta el puerto de destino.'
  },
  electronica_industrial: {
    q: 'En un divisor de tensión de Electrónica Industrial con dos resistencias en serie R₁ = 2 kΩ y R₂ = 3 kΩ conectadas a una fuente de 25 V DC, ¿cuál es el voltaje medido en la resistencia R₂?',
    ops: ['15 V', '10 V', '25 V', '5 V'],
    ok: 0,
    exp: 'Paso 1: Resistencia total Rt = 2 kΩ + 3 kΩ = 5 kΩ.\nPaso 2: Corriente I = 25 V / 5 kΩ = 5 mA.\nPaso 3: Voltaje en R₂ = 5 mA × 3 kΩ = 15 V.'
  },
  electromecanica: {
    q: 'En un taller de Electromecánica Industrial, ¿con qué finalidad técnica se implementa un arrancador Estrella-Delta (Y-Δ) en un motor asíncrono trifásico de gran potencia?',
    ops: [
      'Para reducir el pico de corriente de arranque (a un tercio) y proteger la red eléctrica e instalaciones.',
      'Para duplicar la frecuencia de la red de 60 Hz a 120 Hz.',
      'Para convertir el motor trifásico en una batería de corriente directa.',
      'Para eliminar la necesidad de utilizar relé térmico de sobrecarga.'
    ],
    ok: 0,
    exp: 'Paso 1: Durante el arranque inicial en conexión Estrella (Y), cada bobinado recibe V_línea / √3, reduciendo la corriente de arranque a 1/3 respecto al arranque directo.'
  }
};

export default function ExploradorMateriasMep({ onPracticarMateria }) {
  const [busqueda, setBusqueda] = useState('');
  const [catActiva, setCatActiva] = useState('Todas');
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [respuestaDemo, setRespuestaDemo] = useState(null);

  // Estado del Mini-Simulador / Demostración Interactiva en Vivo
  const [voltajeSim, setVoltajeSim] = useState(24);
  const [resistenciaSim, setResistenciaSim] = useState(6);
  const [montoFacturaSim, setMontoFacturaSim] = useState(100000);

  const filtradas = CATALOGO_MATERIAS_MEP.filter((m) => {
    const coincideTexto = (m.nombre + ' ' + m.items + ' ' + m.categoria).toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = catActiva === 'Todas' || m.categoria === catActiva;
    return coincideTexto && coincideCat;
  });

  const abrirMateria = (mat) => {
    setRespuestaDemo(null);
    const reactivo = BANCO_PREGUNTAS_POR_ESPECIALIDAD[mat.id] || {
      q: `[Práctica Guiada Oficial — ${mat.nombre}] Dentro de los contenidos curriculares del MEP (${mat.items}), ¿cuál procedimiento asegura el dominio técnico y académico?`,
      ops: [
        'Resolver ejercicios contextualizados verificando cada paso lógico y su demostración.',
        'Memorizar sin comprender los fundamentos prácticos de la asignatura.',
        'Omitir las normas de seguridad e integridad de datos.',
        'Saltarse la lectura analítica del enunciado.'
      ],
      ok: 0,
      exp: `Paso 1: En ${mat.nombre} (${mat.niveles}), el aprendizaje activo combina teoría ilustrada, demostración práctica y resolución paso a paso.`
    };
    setMateriaSeleccionada({ ...mat, reactivo });
  };

  const descargarGuiaPdf = (mat) => {
    const win = window.open('', '_blank', 'width=850,height=680');
    if (!win) {
      alert('Permite ventanas emergentes para descargar el folleto ilustrado en PDF.');
      return;
    }
    win.document.write(`
      <html>
        <head>
          <title>${mat.guiaDescargable}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #0f172a; line-height: 1.6; }
            .banner { background: #0f172a; color: #38bdf8; padding: 20px; border-radius: 12px; margin-bottom: 20px; }
            .card { border: 1px solid #cbd5e1; border-radius: 10px; padding: 16px; margin-bottom: 16px; background: #f8fafc; }
          </style>
        </head>
        <body>
          <div class="banner">
            <h1 style="margin:0;font-size:22px;">${mat.icono} ${mat.nombre} — Material Descargable Oficial</h1>
            <p style="margin:6px 0 0 0;color:#e2e8f0;font-size:13px;">pracTICAtecnica.com • CTP Mercedes Norte & Cobertura Nacional MEP</p>
          </div>
          <div class="card">
            <h3>📌 Nivel y Cobertura Curricular: ${mat.niveles}</h3>
            <p><strong>Temas Clave:</strong> ${mat.items}</p>
            <p><strong>Esquema Visual:</strong> ${mat.ilustracion}</p>
          </div>
          <div class="card">
            <h3>🧭 Ejercicio Modelo Resuelto Paso a Paso</h3>
            <p><strong>Enunciado:</strong> ${mat.reactivo.q}</p>
            <p><strong>Respuesta Correcta:</strong> ${mat.reactivo.ops[mat.reactivo.ok]}</p>
            <p><strong>Demostración:</strong> ${mat.reactivo.exp}</p>
          </div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-2xl shadow-2xl space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
            ⚙️ Especialidades CTP Separadas + Materias Académicas + Descargas PDF
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-2">
            🧭 Malla Completa MEP: Contabilidad, Accounting, Ejecutivo Comercial, Logística, Electrónica, Electromecánica, Web, Ciberseguridad y Ciencias
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Haz clic en cualquier especialidad o materia para abrir su práctica interactiva, demostración en vivo y guía PDF descargable.
          </p>
        </div>

        <div className="w-full lg:w-80">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔍 Buscar: accounting, logística, electrónica, química..."
            className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Pestañas de Categoría */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCatActiva(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              catActiva === cat
                ? 'bg-cyan-600 text-white shadow-lg'
                : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Especialidades y Materias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {filtradas.map((mat) => (
          <div
            key={mat.id}
            onClick={() => abrirMateria(mat)}
            className={`bg-gradient-to-br ${mat.color} p-4 rounded-2xl border border-white/15 hover:border-cyan-300 cursor-pointer transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{mat.icono}</span>
                <span className="text-[10px] font-extrabold bg-black/40 text-cyan-200 px-2 py-0.5 rounded">
                  {mat.niveles}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white leading-snug">{mat.nombre}</h3>
              <p className="text-[11px] text-slate-200 mt-1.5 line-clamp-3">{mat.items}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-white/15 space-y-1">
              <p className="text-[10px] text-amber-200 font-semibold truncate">{mat.ilustracion}</p>
              <div className="flex justify-between items-center text-[11px] font-extrabold text-cyan-200">
                <span>⚡ Práctica + Demo + PDF</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Panel Desplegable de la Especialidad Seleccionada: Práctica + Demostración + Descarga */}
      {materiaSeleccionada && (
        <div className="bg-slate-950 border-2 border-cyan-500 p-6 rounded-2xl space-y-5 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{materiaSeleccionada.icono}</span>
              <div>
                <h3 className="text-lg font-extrabold text-white">
                  {materiaSeleccionada.nombre} ({materiaSeleccionada.niveles})
                </h3>
                <p className="text-xs text-cyan-400">{materiaSeleccionada.ilustracion}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => descargarGuiaPdf(materiaSeleccionada)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow"
              >
                📥 Descargar Guía PDF Ilustrada
              </button>
              <button
                onClick={() => onPracticarMateria && onPracticarMateria(materiaSeleccionada)}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow"
              >
                🎓 Abrir Simulacro Completo (20/30/40/60 Ítems)
              </button>
              <button
                onClick={() => setMateriaSeleccionada(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-2 rounded-xl text-xs"
              >
                ✕ Cerrar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pregunta Interactiva con Explicación */}
            <div className="lg:col-span-2 space-y-3">
              <span className="text-[11px] font-bold text-amber-300 uppercase">
                🎯 Reactivo Oficial de Práctica Guiada:
              </span>
              <p className="text-sm font-semibold text-white bg-slate-900 p-4 rounded-xl border border-slate-800">
                {materiaSeleccionada.reactivo.q}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {materiaSeleccionada.reactivo.ops.map((op, idx) => {
                  let clase = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-cyan-500';
                  if (respuestaDemo !== null) {
                    if (idx === materiaSeleccionada.reactivo.ok) clase = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                    else if (idx === respuestaDemo) clase = 'bg-rose-950 border-rose-500 text-rose-200';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => setRespuestaDemo(idx)}
                      className={`text-left p-3.5 rounded-xl border text-xs transition-all ${clase}`}
                    >
                      <strong className="text-cyan-400 mr-2">{['A', 'B', 'C', 'D'][idx]})</strong> {op}
                    </button>
                  );
                })}
              </div>

              {respuestaDemo !== null && (
                <div className="bg-cyan-950/50 border border-cyan-500/40 p-4 rounded-xl text-xs text-slate-200 whitespace-pre-line">
                  <strong className="text-cyan-300 block mb-1">💡 Demostración Paso a Paso:</strong>
                  {materiaSeleccionada.reactivo.exp}
                </div>
              )}
            </div>

            {/* Laboratorio / Demostración Interactiva en Vivo */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
              <h4 className="text-xs font-extrabold text-cyan-400 uppercase">
                🧪 Laboratorio Interactivo de Demostración
              </h4>

              {['contabilidad', 'accounting', 'administracion_logistica', 'ejecutivo_comercial'].includes(materiaSeleccionada.id) ? (
                <div className="space-y-2 text-xs">
                  <p className="text-slate-300 font-semibold">Calculadora Contable NIIF / IVA 13% & Retención:</p>
                  <label className="block text-slate-400">
                    Monto Neto Factura (₡ / $): <strong>{montoFacturaSim.toLocaleString()}</strong>
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="10000"
                    value={montoFacturaSim}
                    onChange={(e) => setMontoFacturaSim(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono space-y-1 text-[11px]">
                    <p className="text-slate-300">Subtotal (Debe): {montoFacturaSim.toLocaleString()}</p>
                    <p className="text-amber-300">IVA 13% Fiscal: {(montoFacturaSim * 0.13).toLocaleString()}</p>
                    <p className="text-emerald-400 font-bold">Total Asiento (Haber): {(montoFacturaSim * 1.13).toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <p className="text-slate-300 font-semibold">Simulador de Ley de Ohm / Potencia Industrial:</p>
                  <label className="block text-slate-400">
                    Voltaje Fuente (V): <strong>{voltajeSim} V</strong>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="240"
                    value={voltajeSim}
                    onChange={(e) => setVoltajeSim(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                  <label className="block text-slate-400">
                    Resistencia Carga (Ω): <strong>{resistenciaSim} Ω</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={resistenciaSim}
                    onChange={(e) => setResistenciaSim(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono space-y-1 text-[11px]">
                    <p className="text-cyan-300">Corriente I = V / R: {(voltajeSim / resistenciaSim).toFixed(2)} A</p>
                    <p className="text-emerald-400 font-bold">
                      Potencia P = V × I: {((voltajeSim * voltajeSim) / resistenciaSim).toFixed(1)} W
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}