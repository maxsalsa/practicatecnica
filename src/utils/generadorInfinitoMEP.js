// Motor Paramétrico e Infinito de Ítems MEP (Generador de millones de variantes)
// www.practicatecnica.com - Ing. Max Salazar Sánchez (ICM)

export const BANCO_PARAMETRICO = {
  CONTABILIDAD: [
    {
      base: "Una empresa adquiere mercancía por ₡{monto} con un IVA del 13%. El total del registro en el Haber es:",
      calcular: (m) => ({
        resp: `₡${(m * 1.13).toLocaleString()}`,
        opciones: [
          `₡${(m * 1.13).toLocaleString()}`,
          `₡${m.toLocaleString()}`,
          `₡${(m * 0.13).toLocaleString()}`,
          `₡${(m * 1.25).toLocaleString()}`
        ],
        explicacion: `El total a pagar incluye el valor de la mercancía más el 13% de impuesto sobre el valor agregado.`
      })
    },
    {
      base: "Si el Capital social es ₡{monto} y los Pasivos son ₡{pasivo}, el Activo total según la ecuación contable es:",
      calcular: (m, p) => ({
        resp: `₡${(m + p).toLocaleString()}`,
        opciones: [
          `₡${(m + p).toLocaleString()}`,
          `₡${Math.abs(m - p).toLocaleString()}`,
          `₡${m.toLocaleString()}`,
          `₡${(p * 2).toLocaleString()}`
        ],
        explicacion: `Activo = Pasivo + Capital. Por lo tanto, ${m} + ${p} = ${m + p}.`
      })
    }
  ],
  CIBERSEGURIDAD: [
    {
      tema: "Triada CIA",
      preguntas: [
        { p: "¿Qué mecanismo de seguridad previene el acceso no autorizado cifrando los datos en tránsito?", o: ["TLS / HTTPS", "SQL Injection", "Phishing", "DDoS"], r: "TLS / HTTPS" },
        { p: "¿Cuál protocolo se utiliza para la autenticación centralizada en redes corporativas?", o: ["RADIUS / TACACS+", "HTTP", "FTP", "SMTP"], r: "RADIUS / TACACS+" }
      ]
    }
  ],
  INGLES_TECNICO: [
    {
      tema: "IT Support Vocabulary",
      preguntas: [
        { p: "What does 'Troubleshooting' mean in technical support?", o: ["Resolver problemas y depurar fallas", "Apagar el servidor", "Comprar hardware", "Diseñar bases de datos"], r: "Resolver problemas y depurar fallas" },
        { p: "Select the correct term for unauthorized access to a network:", o: ["Hacking / Intrusion", "Routing", "Patching", "Caching"], r: "Hacking / Intrusion" }
      ]
    }
  ]
};

// Generador infinito basado en semillas y variables aleatorias (Permite millones de variaciones)
export function generarItemInfinito(especialidad, nivelDUA) {
  if (especialidad === 'CONTABILIDAD') {
    const plantilla = BANCO_PARAMETRICO.CONTABILIDAD[Math.floor(Math.random() * BANCO_PARAMETRICO.CONTABILIDAD.length)];
    const montoAleatorio = Math.floor(Math.random() * 500000) + 50000;
    const segundoValor = Math.floor(Math.random() * 200000) + 10000;
    const datos = plantilla.calcular(montoAleatorio, segundoValor);
    
    return {
      pregunta: plantilla.base.replace("{monto}", montoAleatorio.toLocaleString()).replace("{pasivo}", segundoValor.toLocaleString()),
      opciones: datos.opciones.sort(() => Math.random() - 0.5),
      respuestaCorrecta: datos.resp,
      explicacion: datos.explicacion,
      nivelDUA: nivelDUA || 'Correr (Aplicación)'
    };
  }
  
  if (especialidad === 'CIBERSEGURIDAD') {
    const lista = BANCO_PARAMETRICO.CIBERSEGURIDAD[0].preguntas;
    const item = lista[Math.floor(Math.random() * lista.length)];
    return {
      pregunta: item.p,
      opciones: [...item.o].sort(() => Math.random() - 0.5),
      respuestaCorrecta: item.r,
      explicacion: "Principio fundamental de ciberseguridad defensiva en redes modernas.",
      nivelDUA: nivelDUA || 'Al Espacio (Dominio)'
    };
  }

  // Por defecto (Inglés / Académica / General)
  const listaIngles = BANCO_PARAMETRICO.INGLES_TECNICO[0].preguntas;
  const itemGen = listaIngles[Math.floor(Math.random() * listaIngles.length)];
  return {
    pregunta: itemGen.p,
    opciones: [...itemGen.o].sort(() => Math.random() - 0.5),
    respuestaCorrecta: itemGen.r,
    explicacion: "Evaluación de competencias técnicas globales y multilingües.",
    nivelDUA: nivelDUA || 'Gatear (Comprensión)'
  };
}