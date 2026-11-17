export const CATALOGO_INSTITUCIONES_SUPERIOR = [
  {
    id: 'UCR_UNA',
    sigla: 'UCR / UNA',
    nombre: 'Prueba de Aptitud Académica (PAA)',
    color: 'from-sky-600 to-blue-800',
    icono: '🌻',
    descripcion: 'Razonamiento en contexto verbal y matemático oficial para admisión UCR y UNA.'
  },
  {
    id: 'TEC',
    sigla: 'TEC',
    nombre: 'Examen de Admisión Tecnológico de Costa Rica',
    color: 'from-red-600 to-rose-900',
    icono: '⚙️',
    descripcion: 'Matemática intensiva, geometría analítica, lógica algorítmica y comprensión de lectura.'
  },
  {
    id: 'UTN',
    sigla: 'UTN',
    nombre: 'Ingreso y Nivelación — Universidad Técnica Nacional',
    color: 'from-indigo-600 to-slate-900',
    icono: '🛠️',
    descripcion: 'Competencias tecnológicas, lógica aplicada, inglés técnico y articulación de CTP.'
  },
  {
    id: 'MEP_CTP',
    sigla: 'MEP / CTP',
    nombre: 'Pruebas Nacionales y Especialidades Técnicas',
    color: 'from-cyan-600 to-teal-900',
    icono: '🦉',
    descripcion: 'Desarrollo Web, Ciberseguridad, Redes CCNA, Contabilidad, Electromecánica y Académicas.'
  },
  {
    id: 'COSEVI',
    sigla: 'COSEVI / MOPT',
    nombre: 'Prueba Teórica de Manejo de Costa Rica',
    color: 'from-emerald-600 to-green-900',
    icono: '🚗',
    descripcion: 'Ley de Tránsito, señalamiento vial, rotondas, prioridades de paso y conducción eficiente.'
  }
];

export const ITEMS_SEMILLA_CURADOS = [
  {
    id: 'ucr-01',
    institucion: 'UCR_UNA',
    area: 'Razonamiento Verbal',
    dificultad: 'Media',
    enunciado: '«La educación técnica no solo transmite oficios, sino que emancipa el pensamiento crítico frente a la automatización.» Según el texto, es posible afirmar con certeza que la educación técnica:',
    opciones: [
      'Sustituye por completo la necesidad de utilizar sistemas automatizados.',
      'Trasciende la mera ejecución mecánica al fortalecer la autonomía intelectual.',
      'Limita el pensamiento crítico exclusivamente a los entornos industriales.',
      'Considera que los oficios manuales son incompatibles con la tecnología.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: Identificar el conector «no solo... sino que», el cual añade un valor superior.\nPaso 2: «Emancipar el pensamiento crítico» equivale a dar autonomía intelectual más allá del oficio mecánico.'
  },
  {
    id: 'ucr-02',
    institucion: 'UCR_UNA',
    area: 'Razonamiento Matemático',
    dificultad: 'Alta',
    enunciado: 'En un colegio técnico, por cada 3 estudiantes de Desarrollo Web hay 5 de Contabilidad. Si en total ambas especialidades suman 160 estudiantes, ¿cuántos estudiantes hay en Desarrollo Web?',
    opciones: ['48', '60', '96', '100'],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: Sumar las partes de la razón: 3 + 5 = 8 partes.\nPaso 2: Dividir el total entre las partes: 160 / 8 = 20 estudiantes por parte.\nPaso 3: Multiplicar por las 3 partes de Desarrollo Web: 3 × 20 = 60.'
  },
  {
    id: 'tec-01',
    institucion: 'TEC',
    area: 'Matemática y Lógica TEC',
    dificultad: 'Alta',
    enunciado: 'Si una función cuadrática f(x) = x² - 6x + k tiene su vértice sobre el eje X (una única raíz real), ¿cuál debe ser el valor de la constante k?',
    opciones: ['3', '6', '9', '12'],
    correcta: 2,
    guiaPasoAPaso: 'Paso 1: Para que toque el eje X en un único punto, el discriminante Δ = b² - 4ac debe ser igual a 0.\nPaso 2: (-6)² - 4(1)(k) = 0 -> 36 - 4k = 0 -> k = 36 / 4 = 9.'
  },
  {
    id: 'tec-02',
    institucion: 'TEC',
    area: 'Geometría y Álgebra TEC',
    dificultad: 'Media',
    enunciado: 'Un servidor procesa 2^10 peticiones en 4 segundos. Manteniendo la misma tasa constante, ¿cuántas peticiones procesará en 32 segundos?',
    opciones: ['2^12', '2^13', '2^14', '2^15'],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: Expresar los tiempos en potencias de 2: 4 s = 2² s, y 32 s = 2⁵ s.\nPaso 2: El tiempo se multiplica por 32 / 4 = 8 = 2³.\nPaso 3: Multiplicar las peticiones: 2^10 × 2^3 = 2^(10+3) = 2^13.'
  },
  {
    id: 'utn-01',
    institucion: 'UTN',
    area: 'Tecnología y Redes Aplicadas',
    dificultad: 'Media',
    enunciado: 'En una red local del laboratorio de la UTN con máscara /26 (255.255.255.192), ¿cuántas direcciones IP utilizables (hosts válidos) se obtienen por cada subred?',
    opciones: ['30 hosts', '62 hosts', '64 hosts', '126 hosts'],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: Prefijo /26 deja 32 - 26 = 6 bits para host.\nPaso 2: Aplicar fórmula 2^n - 2 (restando red y broadcast): 2^6 - 2 = 64 - 2 = 62 hosts utilizables.'
  },
  {
    id: 'utn-02',
    institucion: 'UTN',
    area: 'Lógica de Programación y Bases de Datos',
    dificultad: 'Media',
    enunciado: '¿Cuál sentencia SQL recupera únicamente los estudiantes de la sede de Alajuela cuyo promedio sea mayor o igual a 85, ordenados de mayor a menor promedio?',
    opciones: [
      'SELECT * FROM estudiantes WHERE sede = "Alajuela" AND promedio >= 85 ORDER BY promedio DESC;',
      'SELECT * FROM estudiantes HAVING sede = "Alajuela" ORDER BY promedio ASC;',
      'GET * FROM estudiantes WHERE sede = "Alajuela" OR promedio >= 85;',
      'SELECT * FROM estudiantes WHERE sede = "Alajuela" GROUP BY promedio DESC;'
    ],
    correcta: 0,
    guiaPasoAPaso: 'Paso 1: Filtrar filas individuales con WHERE usando el operador lógico AND.\nPaso 2: Ordenar de mayor a menor requiere la cláusula ORDER BY promedio DESC.'
  },
  {
    id: 'mep-01',
    institucion: 'MEP_CTP',
    area: 'Ciberseguridad y Desarrollo Web',
    dificultad: 'Alta',
    enunciado: 'Al almacenar contraseñas o validar integridades de expedientes bajo la Ley 8968 en una aplicación React/Node, ¿por qué se utiliza un algoritmo criptográfico como SHA-256 o bcrypt en lugar de cifrado simétrico simple?',
    opciones: [
      'Porque el hash es unidireccional e impide reconstruir el texto plano original ante una filtración.',
      'Porque SHA-256 comprime las imágenes del servidor a la mitad de su peso.',
      'Porque reemplaza la necesidad de utilizar conexiones HTTPS en el navegador.',
      'Porque permite desencriptar la contraseña en el frontend usando la clave pública.'
    ],
    correcta: 0,
    guiaPasoAPaso: 'Paso 1: Una función hash criptográfica (SHA-256) es irreversible (unidireccional).\nPaso 2: Así se verifica la integridad sin exponer jamás el dato sensible original.'
  },
  {
    id: 'cosevi-01',
    institucion: 'COSEVI',
    area: 'Seguridad Vial y Normativa',
    dificultad: 'Media',
    enunciado: 'Al aproximarse a una rotonda en Costa Rica, ¿quién tiene la prioridad de paso según la Ley de Tránsito?',
    opciones: [
      'El vehículo que intenta ingresar a la rotonda por el carril derecho.',
      'El vehículo que ya circula dentro de la rotonda.',
      'El vehículo de mayor tonelaje sin importar su posición.',
      'El vehículo que circula a mayor velocidad por la vía principal.'
    ],
    correcta: 1,
    guiaPasoAPaso: 'Paso 1: En toda rotonda nacional, la prioridad la tiene quien ya se encuentra circulando dentro del anillo vial.\nPaso 2: Quien ingresa debe ceder el paso y respetar la velocidad máxima de 30 km/h.'
  }
];

// Generador Paramétrico Infinito: crea ítems nuevos en tiempo real sin agotarse jamás
export function generarItemInfinito(institucionId, contadorSemilla = 1) {
  const n1 = (contadorSemilla * 7) % 25 + 4;
  const n2 = (contadorSemilla * 13) % 15 + 3;

  if (institucionId === 'UCR_UNA') {
    const total = (n1 + n2) * 12;
    const correctaVal = n1 * 12;
    const opciones = [
      String(correctaVal),
      String(correctaVal + 12),
      String(correctaVal - 6),
      String(n2 * 12)
    ];
    return {
      id: `inf-ucr-${Date.now()}-${contadorSemilla}`,
      institucion: 'UCR_UNA',
      area: 'Razonamiento Matemático Dinámico (PAA)',
      dificultad: 'Dinámica',
      enunciado: `[Reactivo Infinito #${contadorSemilla}] En un proyecto de investigación conjunta entre la UCR y la UNA, la proporción de becas asignadas entre Ingeniería y Ciencias Sociales es de ${n1} a ${n2}. Si en total se otorgaron ${total} becas, ¿cuántas correspondieron a Ingeniería?`,
      opciones,
      correcta: 0,
      guiaPasoAPaso: `Paso 1: Sumar las partes de la proporción: ${n1} + ${n2} = ${n1 + n2} partes.\nPaso 2: Dividir el total de becas (${total}) entre ${n1 + n2} = 12 becas por parte.\nPaso 3: Multiplicar las partes de Ingeniería (${n1} × 12) = ${correctaVal} becas.`
    };
  }

  if (institucionId === 'TEC') {
    const x1 = n1;
    const x2 = n2;
    const suma = x1 + x2;
    const prod = x1 * x2;
    return {
      id: `inf-tec-${Date.now()}-${contadorSemilla}`,
      institucion: 'TEC',
      area: 'Álgebra y Matemática Intensiva TEC',
      dificultad: 'Alta',
      enunciado: `[Reactivo Infinito #${contadorSemilla}] Si las dos raíces reales de la ecuación cuadrática x² - bx + c = 0 son x₁ = ${x1} y x₂ = ${x2}, ¿cuál es el valor de (b + c)?`,
      opciones: [
        String(suma + prod),
        String(suma * prod),
        String(prod - suma),
        String(suma + prod + 10)
      ],
      correcta: 0,
      guiaPasoAPaso: `Paso 1: Por las relaciones de Vieta, en x² - bx + c = 0, el coeficiente b es la suma de las raíces (${x1} + ${x2} = ${suma}) y c es el producto (${x1} × ${x2} = ${prod}).\nPaso 2: Por tanto, b + c = ${suma} + ${prod} = ${suma + prod}.`
    };
  }

  if (institucionId === 'UTN') {
    const bitsHost = (contadorSemilla % 5) + 3; // entre 3 y 7 bits
    const prefijo = 32 - bitsHost;
    const hostsValidos = Math.pow(2, bitsHost) - 2;
    return {
      id: `inf-utn-${Date.now()}-${contadorSemilla}`,
      institucion: 'UTN',
      area: 'Redes, TI y Articulación Técnica UTN',
      dificultad: 'Media',
      enunciado: `[Reactivo Infinito #${contadorSemilla}] En un laboratorio de la UTN se configura una subred IPv4 con prefijo /${prefijo}. ¿Cuál es la cantidad exacta de direcciones de host utilizables en dicha subred?`,
      opciones: [
        `${hostsValidos} hosts utilizables`,
        `${hostsValidos + 2} hosts utilizables`,
        `${Math.pow(2, bitsHost + 1) - 2} hosts utilizables`,
        `${Math.max(2, hostsValidos - 4)} hosts utilizables`
      ],
      correcta: 0,
      guiaPasoAPaso: `Paso 1: Con prefijo /${prefijo}, quedan 32 - ${prefijo} = ${bitsHost} bits para hosts.\nPaso 2: Aplicando 2^${bitsHost} - 2 (restando dirección de red y broadcast), se obtienen ${hostsValidos} hosts válidos.`
    };
  }

  // Por defecto MEP_CTP o COSEVI
  const amperios = n2;
  const ohmios = n1;
  const voltios = amperios * ohmios;
  return {
    id: `inf-mep-${Date.now()}-${contadorSemilla}`,
    institucion: institucionId || 'MEP_CTP',
    area: 'Práctica Guiada Técnica & Ciencias MEP',
    dificultad: 'Media',
    enunciado: `[Reactivo Infinito #${contadorSemilla}] En un circuito electrónico del taller técnico, circula una corriente de ${amperios} A a través de una resistencia de ${ohmios} Ω. Según la Ley de Ohm, ¿cuál es la tensión (voltaje) aplicada?`,
    opciones: [
      `${voltios} V`,
      `${voltios + ohmios} V`,
      `${amperios + ohmios} V`,
      `${Math.round((ohmios / amperios) * 10) / 10} V`
    ],
    correcta: 0,
    guiaPasoAPaso: `Paso 1: Aplicar la Ley de Ohm: V = I × R.\nPaso 2: Multiplicar ${amperios} A × ${ohmios} Ω = ${voltios} V.`
  };
}