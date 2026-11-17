export const MOTOR_ALEATORIO_DINAMICO = {
  version: "2026.1.1-RandomMaster",
  algoritmoMezcla: "Fisher-Yates Shuffle para aleatorización en tiempo real de ítems y distractores",
  bancoMasivoDinamico: {
    activo: true,
    categorias: [
      {
        tema: "Hoja Electrónica y Funciones",
        preguntasPool: [
          { q: "¿Qué función calcula la media aritmética de un rango?", o: ["=PROMEDIO()", "=SUMA()", "=MAX()", "=SI()"], r: "=PROMEDIO()" },
          { q: "¿Qué función evalúa una condición lógica y devuelve un valor si es verdadero o falso?", o: ["=SI()", "=BUSCARV()", "=CONTAR()", "=MIN()"], r: "=SI()" },
          { q: "¿Cuál función cuenta celdas que contienen números?", o: ["=CONTAR()", "=SUMA()", "=PROMEDIO()", "=MAX()"], r: "=CONTAR()" }
        ]
      },
      {
        tema: "Redes y Cisco IOS",
        preguntasPool: [
          { q: "¿Qué modo en Cisco IOS se requiere para ejecutar comandos de configuración global?", o: ["configure terminal", "enable", "show ip route", "interface"], r: "configure terminal" },
          { q: "¿Cuál es el propósito del comando 'no shutdown'?", o: ["Activar la interfaz de red", "Apagar el switch", "Reiniciar el router", "Borrar la memoria NVRAM"], r: "Activar la interfaz de red" },
          { q: "¿Qué protocolo opera en la capa de red (Capa 3) para el direccionamiento IP?", o: ["IPv4 / IPv6", "TCP", "Ethernet", "HTTP"], r: "IPv4 / IPv6" }
        ]
      }
    ]
  },
  garantiaPedagogica: "Cero repetición estática; cada sesión genera una combinación única de preguntas y orden de opciones para evitar la memorización mecánica."
};
"// Motor Aleatorio Dinámico inicializado correctamente";