import type { Deck } from './questions';
/** Soporte TI: three versioned 20-item blocks, difficulty 1/2/3. */
export const supportDecks: Deck[] = [
 {
  "id": "study-support-b1-v1",
  "title": "Soporte TI · Bloque 1 · Hardware y diagnóstico básico",
  "emoji": "🧰",
  "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
  "questions": [
   {
    "q": "Un equipo no enciende ni muestra luces. ¿Qué revisa primero?",
    "options": [
     "Reinstalar el sistema operativo",
     "La conexión eléctrica y el cable de poder",
     "Cambiar la tarjeta de video",
     "Actualizar el navegador"
    ],
    "answer": 1,
    "why": "Empiece por lo simple y físico: sin energía no hay arranque.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Qué componente guarda datos de forma permanente aunque se apague el equipo?",
    "options": [
     "La unidad SSD",
     "La memoria RAM",
     "La caché del procesador",
     "El registro del CPU"
    ],
    "answer": 0,
    "why": "La RAM es volátil; el SSD conserva la información sin energía.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Qué puerto se usa habitualmente para conectar un monitor moderno?",
    "options": [
     "RJ-11",
     "PS/2",
     "Puerto serie DB-9",
     "HDMI"
    ],
    "answer": 3,
    "why": "HDMI transmite video y audio digital a monitores actuales.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "Un usuario dice que «la computadora está lenta». ¿Cuál es la primera pregunta útil?",
    "options": [
     "¿Quiere comprar otra?",
     "¿Puede formatearla hoy?",
     "¿Desde cuándo y al hacer qué ocurre?",
     "¿Usa el modo oscuro?"
    ],
    "answer": 2,
    "why": "Delimitar cuándo y cómo ocurre orienta el diagnóstico.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Qué herramienta de Windows muestra los procesos que más consumen CPU?",
    "options": [
     "Bloc de notas",
     "Administrador de tareas",
     "Paint",
     "Mapa de caracteres"
    ],
    "answer": 1,
    "why": "El Administrador de tareas lista procesos y su consumo.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Qué medida protege los componentes al manipular el interior de un equipo?",
    "options": [
     "Usar pulsera antiestática",
     "Trabajar sobre alfombra",
     "Tocar los chips con los dedos",
     "Dejarlo conectado y encendido"
    ],
    "answer": 0,
    "why": "La descarga electrostática puede dañar componentes.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Qué unidad mide la capacidad de almacenamiento?",
    "options": [
     "Gigahercio (GHz)",
     "Vatio (W)",
     "Píxel (px)",
     "Gigabyte (GB)"
    ],
    "answer": 3,
    "why": "GB mide datos; GHz mide frecuencia.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "Una impresora muestra «sin papel» pero tiene hojas. ¿Qué revisa?",
    "options": [
     "Cambiar la contraseña Wi-Fi",
     "Reinstalar el antivirus",
     "Que la bandeja esté bien colocada y el papel alineado",
     "Desconectar el monitor"
    ],
    "answer": 2,
    "why": "Muchos sensores fallan por bandejas mal insertadas.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Qué significa reiniciar un equipo como primer paso de soporte?",
    "options": [
     "Borrar todos los archivos",
     "Limpiar estados temporales de memoria y procesos",
     "Restablecer de fábrica",
     "Cambiar el hardware"
    ],
    "answer": 1,
    "why": "Reiniciar libera memoria y procesos bloqueados sin borrar datos.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Qué dispositivo de entrada sirve para escribir texto?",
    "options": [
     "Teclado",
     "Parlante",
     "Monitor",
     "Proyector"
    ],
    "answer": 0,
    "why": "El teclado introduce datos; los otros son de salida.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Para qué sirve una copia de seguridad (respaldo)?",
    "options": [
     "Acelerar el internet",
     "Aumentar la RAM",
     "Evitar actualizaciones",
     "Recuperar información si se pierde o daña"
    ],
    "answer": 3,
    "why": "El respaldo permite restaurar datos tras fallas o errores.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "Un mouse inalámbrico deja de responder. ¿Qué revisa primero?",
    "options": [
     "La tarjeta madre",
     "El BIOS",
     "Las baterías y el receptor USB",
     "La fuente de poder"
    ],
    "answer": 2,
    "why": "Las causas más comunes son baterías o receptor desconectado.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Qué componente procesa las instrucciones de los programas?",
    "options": [
     "El disco duro",
     "El procesador (CPU)",
     "La fuente de poder",
     "El gabinete"
    ],
    "answer": 1,
    "why": "La CPU ejecuta instrucciones; el disco solo almacena.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Qué indica un pitido al encender el equipo (POST)?",
    "options": [
     "Un código de diagnóstico del hardware",
     "Que el internet funciona",
     "Que llegó un correo",
     "Que el antivirus terminó"
    ],
    "answer": 0,
    "why": "Los pitidos POST señalan el estado o falla del hardware.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Dónde se registra una solicitud de soporte para darle seguimiento?",
    "options": [
     "En una nota adhesiva sin fecha",
     "En un mensaje privado sin registro",
     "En la memoria del técnico",
     "En un ticket del sistema de mesa de ayuda"
    ],
    "answer": 3,
    "why": "El ticket deja trazabilidad, prioridad y responsable.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Qué cable conecta un equipo a la red cableada?",
    "options": [
     "Cable VGA",
     "Cable HDMI",
     "Cable UTP con conector RJ-45",
     "Cable de audio 3,5 mm"
    ],
    "answer": 2,
    "why": "El UTP con RJ-45 es el estándar Ethernet.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "Antes de abrir un equipo de escritorio, ¿qué debe hacer?",
    "options": [
     "Subir el brillo",
     "Apagarlo y desconectarlo de la corriente",
     "Abrir el navegador",
     "Conectar más USB"
    ],
    "answer": 1,
    "why": "Trabajar sin energía previene daños y riesgos eléctricos.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Qué es un controlador (driver)?",
    "options": [
     "Software que permite al sistema usar un dispositivo",
     "Un cable de red",
     "Un tipo de virus",
     "Una pieza de la pantalla"
    ],
    "answer": 0,
    "why": "El driver traduce entre sistema operativo y hardware.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "La pantalla se ve pero no hay sonido. ¿Qué revisa primero?",
    "options": [
     "La memoria RAM",
     "El disco duro",
     "El cable de red",
     "El volumen, silencio y salida de audio seleccionada"
    ],
    "answer": 3,
    "why": "Revise configuración simple antes de suponer fallas de hardware.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   },
   {
    "q": "¿Qué es la memoria RAM?",
    "options": [
     "Almacenamiento permanente",
     "Un puerto de video",
     "Memoria de trabajo temporal y volátil",
     "Un programa antivirus"
    ],
    "answer": 2,
    "why": "La RAM guarda datos en uso y se borra al apagar.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 1
   }
  ]
 },
 {
  "id": "study-support-b2-v1",
  "title": "Soporte TI · Bloque 2 · Sistemas, redes y mesa de ayuda",
  "emoji": "🧰",
  "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
  "questions": [
   {
    "q": "Un equipo obtiene la IP 169.254.10.5. ¿Qué indica?",
    "options": [
     "Tiene IP pública válida",
     "Está en IPv6",
     "No recibió dirección del servidor DHCP",
     "El DNS funciona bien"
    ],
    "answer": 2,
    "why": "169.254.x.x es APIPA: el equipo no obtuvo IP por DHCP.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Qué comando de Windows muestra la configuración IP del equipo?",
    "options": [
     "chkdsk",
     "ipconfig",
     "format",
     "tasklist /k"
    ],
    "answer": 1,
    "why": "ipconfig muestra IP, máscara y puerta de enlace.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "Hay internet por IP pero no abren páginas por nombre. ¿Qué servicio falla probablemente?",
    "options": [
     "DNS",
     "DHCP",
     "SMTP",
     "FTP"
    ],
    "answer": 0,
    "why": "DNS traduce nombres a direcciones IP.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Qué comando prueba conectividad básica con otro equipo?",
    "options": [
     "cls",
     "dir",
     "echo",
     "ping"
    ],
    "answer": 3,
    "why": "ping envía paquetes ICMP y mide respuesta.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "En ITIL, ¿qué es un incidente?",
    "options": [
     "Un cambio aprobado",
     "Una compra de equipo",
     "Una interrupción no planificada o degradación de un servicio",
     "Una capacitación"
    ],
    "answer": 2,
    "why": "El incidente afecta el servicio y se restaura lo antes posible.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Qué diferencia hay entre incidente y problema?",
    "options": [
     "Son lo mismo",
     "El problema es la causa raíz de uno o más incidentes",
     "El problema es solo de hardware",
     "El incidente es siempre planificado"
    ],
    "answer": 1,
    "why": "La gestión de problemas busca eliminar la causa de fondo.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Cómo se prioriza normalmente un ticket?",
    "options": [
     "Según impacto y urgencia",
     "Por orden alfabético",
     "Por quién insiste más",
     "Al azar"
    ],
    "answer": 0,
    "why": "Impacto y urgencia determinan la prioridad.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "Un usuario olvidó su contraseña. ¿Qué hace antes de restablecerla?",
    "options": [
     "Enviarla por correo público",
     "Usar la misma de otro usuario",
     "Desactivar la seguridad",
     "Verificar su identidad por el procedimiento autorizado"
    ],
    "answer": 3,
    "why": "Verificar identidad evita entregar cuentas a terceros.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Qué sistema de archivos usa Windows por defecto en el disco del sistema?",
    "options": [
     "FAT12",
     "ext4",
     "NTFS",
     "HFS"
    ],
    "answer": 2,
    "why": "NTFS admite permisos, archivos grandes y registro.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Para qué sirve el Modo seguro de Windows?",
    "options": [
     "Navegar más rápido",
     "Arrancar con controladores mínimos para diagnosticar",
     "Instalar juegos",
     "Aumentar la batería"
    ],
    "answer": 1,
    "why": "Aísla fallas causadas por drivers o programas.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Qué es una puerta de enlace predeterminada?",
    "options": [
     "El router que conecta la red local con otras redes",
     "El servidor de correo",
     "La impresora de red",
     "El cable de poder"
    ],
    "answer": 0,
    "why": "El tráfico hacia otras redes sale por la puerta de enlace.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Qué es un SLA?",
    "options": [
     "Un tipo de cable",
     "Un antivirus",
     "Un formato de imagen",
     "Acuerdo de nivel de servicio con tiempos comprometidos"
    ],
    "answer": 3,
    "why": "El SLA define tiempos de respuesta y resolución.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "Tras resolver un ticket, ¿qué paso falta?",
    "options": [
     "Cerrarlo sin avisar",
     "Borrar el historial",
     "Confirmar con el usuario y documentar la solución",
     "Reabrirlo otro día"
    ],
    "answer": 2,
    "why": "Confirmar y documentar asegura calidad y conocimiento reutilizable.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Qué herramienta permite atender un equipo a distancia con permiso del usuario?",
    "options": [
     "Correo masivo",
     "Escritorio remoto autorizado",
     "Impresora compartida",
     "Bluetooth del mouse"
    ],
    "answer": 1,
    "why": "El acceso remoto debe ser autorizado y registrado.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Qué ventaja tiene una dirección IP estática en una impresora de red?",
    "options": [
     "Los equipos la encuentran siempre en la misma dirección",
     "Imprime a color",
     "Consume menos tinta",
     "No necesita red"
    ],
    "answer": 0,
    "why": "Una IP fija evita que cambie y se pierda la conexión.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "Un disco hace ruidos de clic y el equipo se congela. ¿Qué es prioritario?",
    "options": [
     "Desfragmentarlo varias veces",
     "Instalar más programas",
     "Ignorarlo",
     "Respaldar los datos de inmediato"
    ],
    "answer": 3,
    "why": "Son señales de falla física; proteja primero la información.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Qué es una base de conocimiento en soporte?",
    "options": [
     "Lista de precios",
     "Inventario de sillas",
     "Repositorio de soluciones documentadas",
     "Contraseñas compartidas"
    ],
    "answer": 2,
    "why": "Permite resolver más rápido casos repetidos.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Qué indica un escalamiento de nivel 1 a nivel 2?",
    "options": [
     "El usuario está molesto",
     "El caso requiere mayor especialización",
     "Se cierra el ticket",
     "Se cancela el servicio"
    ],
    "answer": 1,
    "why": "Se escala cuando el primer nivel no puede resolver.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Qué comando de Windows revisa y repara archivos del sistema?",
    "options": [
     "sfc /scannow",
     "ipconfig /all",
     "ping -t",
     "cd .."
    ],
    "answer": 0,
    "why": "sfc verifica y repara archivos protegidos del sistema.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   },
   {
    "q": "¿Qué máscara de subred corresponde a /24?",
    "options": [
     "255.255.0.0",
     "255.0.0.0",
     "255.255.255.255",
     "255.255.255.0"
    ],
    "answer": 3,
    "why": "/24 son 24 bits en uno: 255.255.255.0.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 2
   }
  ]
 },
 {
  "id": "study-support-b3-v1",
  "title": "Soporte TI · Bloque 3 · Casos integrados de soporte",
  "emoji": "🧰",
  "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
  "questions": [
   {
    "q": "Caso Oficina Norte. Varios equipos pierden red a la misma hora cada día. ¿Qué enfoque aplica?",
    "options": [
     "Atender cada caso como aislado y cerrar",
     "Reinstalar todos los equipos",
     "Cambiar a todos los usuarios",
     "Gestión de problemas: buscar patrón y causa raíz común"
    ],
    "answer": 3,
    "why": "Incidentes repetidos con patrón indican un problema subyacente.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Oficina Norte. Un cambio en el router dejó sin red a toda la sede. ¿Qué faltó probablemente?",
    "options": [
     "Más impresoras",
     "Un nuevo fondo de pantalla",
     "Gestión de cambios con plan de reversión",
     "Más usuarios administradores"
    ],
    "answer": 2,
    "why": "Los cambios deben evaluarse y tener plan para revertir.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Laboratorio CTP. Hay 30 equipos idénticos que instalar. ¿Qué es más eficiente y consistente?",
    "options": [
     "Instalar cada uno a mano distinto",
     "Desplegar una imagen estándar probada",
     "Copiar archivos desde un USB personal",
     "Dejar que cada estudiante instale"
    ],
    "answer": 1,
    "why": "Una imagen estándar reduce errores y tiempo.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Laboratorio CTP. Un equipo muestra ventanas emergentes y redirecciones. ¿Primera acción?",
    "options": [
     "Aislarlo de la red y analizarlo con antimalware",
     "Seguir usándolo en red",
     "Compartir sus archivos",
     "Desactivar el firewall"
    ],
    "answer": 0,
    "why": "Aislar evita propagación mientras se analiza.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Clínica Sur. El ticket A afecta a una persona; el B detiene la facturación de todos. ¿Cuál se atiende primero?",
    "options": [
     "El A, porque llegó antes",
     "Ninguno hasta mañana",
     "El que sea más fácil",
     "El B, por mayor impacto y urgencia"
    ],
    "answer": 3,
    "why": "La prioridad sigue impacto y urgencia, no solo orden de llegada.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Clínica Sur. Se promete resolver en 4 horas y el caso tomará más. ¿Qué corresponde?",
    "options": [
     "Cerrar el ticket sin solución",
     "Ocultar el retraso",
     "Comunicar el avance y escalar según el SLA",
     "Cambiar la fecha del ticket"
    ],
    "answer": 2,
    "why": "La comunicación transparente y el escalamiento cumplen el SLA.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Oficina Norte. Un equipo tiene IP 192.168.1.50/24 y gateway 192.168.2.1. ¿Qué ocurre?",
    "options": [
     "Funciona perfecto",
     "No puede salir de su red: el gateway está en otra subred",
     "Tiene IP pública",
     "Usa IPv6"
    ],
    "answer": 1,
    "why": "El gateway debe estar en la misma subred que el equipo.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Bodega Central. Dos equipos reportan «conflicto de dirección IP». ¿Causa más probable?",
    "options": [
     "Dos dispositivos con la misma IP asignada",
     "Falta de papel",
     "Monitor desconectado",
     "Teclado dañado"
    ],
    "answer": 0,
    "why": "Una IP estática duplicada o fuera del rango DHCP provoca conflicto.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Bodega Central. La copia de seguridad corre diario pero nunca se ha probado. ¿Qué riesgo existe?",
    "options": [
     "Ninguno",
     "Que el internet sea lento",
     "Que suba el precio",
     "No saber si se podrá restaurar cuando se necesite"
    ],
    "answer": 3,
    "why": "Un respaldo sin prueba de restauración no garantiza recuperación.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Bodega Central. ¿Qué regla de respaldo es recomendada?",
    "options": [
     "Una sola copia en el mismo disco",
     "Copias solo en la memoria RAM",
     "3-2-1: tres copias, dos medios, una fuera del sitio",
     "Ninguna copia si hay antivirus"
    ],
    "answer": 2,
    "why": "La regla 3-2-1 reduce el riesgo de pérdida total.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Colegio Este. Un docente pide permisos de administrador para instalar un programa. ¿Qué aplica?",
    "options": [
     "Darle admin a todos",
     "Mínimo privilegio: instalar el programa autorizado sin dar admin permanente",
     "Compartir la clave admin",
     "Desactivar las cuentas"
    ],
    "answer": 1,
    "why": "Se atiende la necesidad sin ampliar privilegios innecesarios.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Colegio Este. Tras una actualización, una aplicación crítica falla. ¿Mejor acción inmediata?",
    "options": [
     "Revertir la actualización según el plan y documentar",
     "Borrar la aplicación",
     "Esperar sin avisar",
     "Formatear todos los equipos"
    ],
    "answer": 0,
    "why": "Restaurar el servicio primero y luego analizar la causa.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Oficina Norte. ping a 8.8.8.8 responde, pero no a «ejemplo.com». ¿Dónde está la falla?",
    "options": [
     "Cable de red",
     "Tarjeta de red",
     "Fuente de poder",
     "Resolución de nombres (DNS)"
    ],
    "answer": 3,
    "why": "Hay conectividad IP; falla la traducción de nombres.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Clínica Sur. Un portátil con datos de pacientes se perdió. ¿Qué control reduce el daño?",
    "options": [
     "Fondo de pantalla con logo",
     "Más memoria RAM",
     "Cifrado del disco y bloqueo remoto",
     "Teclado inalámbrico"
    ],
    "answer": 2,
    "why": "El cifrado impide leer datos sin credenciales.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Laboratorio CTP. Equipos lentos tras meses de uso; el disco está al 98 %. ¿Qué acción es adecuada?",
    "options": [
     "Cambiar el monitor",
     "Liberar espacio y revisar archivos temporales y de usuario",
     "Agregar otro mouse",
     "Bajar el brillo"
    ],
    "answer": 1,
    "why": "Un disco casi lleno degrada rendimiento y actualizaciones.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Colegio Este. ¿Qué métrica muestra si soporte resuelve en el primer contacto?",
    "options": [
     "Tasa de resolución en primer contacto (FCR)",
     "Cantidad de sillas",
     "Velocidad del CPU",
     "Número de impresoras"
    ],
    "answer": 0,
    "why": "FCR mide casos resueltos sin escalar ni reabrir.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Bodega Central. Un switch se calienta y reinicia solo. ¿Qué revisa?",
    "options": [
     "El fondo de pantalla",
     "La versión del navegador",
     "El tipo de letra",
     "Ventilación, temperatura del rack y fuente"
    ],
    "answer": 3,
    "why": "El sobrecalentamiento provoca reinicios en equipos de red.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Oficina Norte. Se reemplazará un servidor. ¿Qué documento ayuda a evitar olvidos?",
    "options": [
     "Un mensaje informal",
     "Una foto del equipo",
     "Lista de verificación del cambio con pruebas y respaldo",
     "Ninguno"
    ],
    "answer": 2,
    "why": "Las listas de verificación reducen errores en cambios planificados.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Clínica Sur. Un usuario recibe un archivo .exe de remitente desconocido. ¿Qué le indica soporte?",
    "options": [
     "Abrirlo para ver qué es",
     "No abrirlo y reportarlo para análisis",
     "Reenviarlo a compañeros",
     "Desactivar el antivirus"
    ],
    "answer": 1,
    "why": "Los ejecutables desconocidos son vía común de malware.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   },
   {
    "q": "Caso Laboratorio CTP. ¿Qué registro permite saber qué equipo tiene cada estudiante y su estado?",
    "options": [
     "Inventario de activos actualizado",
     "Un grupo de chat",
     "Una lista sin fechas",
     "La memoria del docente"
    ],
    "answer": 0,
    "why": "El inventario de activos da trazabilidad y control.",
    "source": "GICM. Original; soporte TI. Referencia conceptual: ITIL 4 y CompTIA A+ (sin afiliación).",
    "difficulty": 3
   }
  ]
 }
];
