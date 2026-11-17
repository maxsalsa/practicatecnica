import type { Deck } from './questions';
/** Deportes: three versioned 20-item blocks, difficulty 1/2/3. */
export const sportsDecks: Deck[] = [
 {
  "id": "study-sports-b1-v1",
  "title": "Deportes · Bloque 1 · Reglas básicas",
  "emoji": "⚽",
  "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
  "questions": [
   {
    "q": "¿Cuántos jugadores por equipo hay en cancha en el fútbol?",
    "options": [
     "9",
     "11",
     "7",
     "12"
    ],
    "answer": 1,
    "why": "El reglamento de la IFAB fija 11 jugadores por equipo, incluido el portero.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "¿Cuántos jugadores por equipo hay en cancha en baloncesto?",
    "options": [
     "5",
     "6",
     "7",
     "4"
    ],
    "answer": 0,
    "why": "FIBA establece 5 jugadores por equipo en la cancha.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "¿Cuántos jugadores por equipo juegan en voleibol de sala?",
    "options": [
     "5",
     "7",
     "4",
     "6"
    ],
    "answer": 3,
    "why": "El voleibol de sala se juega con 6 jugadores por equipo.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "En fútbol, ¿qué tarjeta indica expulsión?",
    "options": [
     "Amarilla",
     "Verde",
     "Roja",
     "Azul"
    ],
    "answer": 2,
    "why": "La tarjeta roja expulsa al jugador; la amarilla es amonestación.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "¿Cuánto dura un partido oficial de fútbol de adultos?",
    "options": [
     "60 minutos",
     "90 minutos",
     "80 minutos",
     "120 minutos"
    ],
    "answer": 1,
    "why": "Son dos tiempos de 45 minutos, sin contar la reposición.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "En baloncesto, ¿cuántos puntos vale un tiro desde fuera de la línea de 3?",
    "options": [
     "3",
     "2",
     "1",
     "4"
    ],
    "answer": 0,
    "why": "Un enceste desde detrás de la línea de tres puntos vale 3.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "¿Cuántos puntos vale un tiro libre convertido en baloncesto?",
    "options": [
     "2",
     "3",
     "0,5",
     "1"
    ],
    "answer": 3,
    "why": "Cada tiro libre convertido suma 1 punto.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "En voleibol, ¿cuántos toques máximos tiene un equipo antes de pasar el balón?",
    "options": [
     "2",
     "4",
     "3",
     "5"
    ],
    "answer": 2,
    "why": "Se permiten 3 toques por equipo, sin contar el bloqueo.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "¿Qué deporte se juega con raqueta y volante (plumilla)?",
    "options": [
     "Tenis",
     "Bádminton",
     "Squash",
     "Pádel"
    ],
    "answer": 1,
    "why": "El bádminton usa raqueta y volante de plumas.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "En atletismo, ¿cuántos metros tiene una vuelta a la pista oficial?",
    "options": [
     "400 m",
     "200 m",
     "300 m",
     "500 m"
    ],
    "answer": 0,
    "why": "La pista estándar al aire libre mide 400 m en el carril 1.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "¿Qué indica un saque de esquina en fútbol?",
    "options": [
     "Una falta dentro del área",
     "Un fuera de lugar",
     "Un balón que salió por la banda",
     "Que el balón salió por la línea de meta tocado por un defensor"
    ],
    "answer": 3,
    "why": "El córner se concede si el último en tocar fue del equipo que defiende esa meta.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "En tenis, ¿cómo se llama el marcador 40-40?",
    "options": [
     "Ventaja",
     "Set",
     "Iguales (deuce)",
     "Quiebre"
    ],
    "answer": 2,
    "why": "Con 40-40 el juego queda en iguales y se necesita ventaja de dos puntos.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "¿Cuántos sets debe ganar un equipo para ganar un partido de voleibol a 5 sets?",
    "options": [
     "2",
     "3",
     "4",
     "5"
    ],
    "answer": 1,
    "why": "Se juega al mejor de cinco: gana quien obtiene 3 sets.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "En natación, ¿qué estilo se nada boca arriba?",
    "options": [
     "Espalda",
     "Mariposa",
     "Pecho",
     "Crol"
    ],
    "answer": 0,
    "why": "El estilo espalda es el único que se nada en posición dorsal.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "¿Con qué parte del cuerpo NO puede tocar el balón un jugador de campo en fútbol?",
    "options": [
     "Cabeza",
     "Pecho",
     "Muslo",
     "Manos y brazos"
    ],
    "answer": 3,
    "why": "Solo el portero, dentro de su área, puede usar las manos.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "¿Qué deporte usa el término «jaque mate»?",
    "options": [
     "Damas",
     "Tenis de mesa",
     "Ajedrez",
     "Golf"
    ],
    "answer": 2,
    "why": "El jaque mate termina la partida de ajedrez.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "En baloncesto, ¿qué es un «doble» (dobles)?",
    "options": [
     "Lanzar con dos manos",
     "Volver a botar tras detener el bote",
     "Dos faltas seguidas",
     "Encestar dos veces"
    ],
    "answer": 1,
    "why": "Tras sujetar el balón, botarlo de nuevo es una violación.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "¿Cuántos jugadores tiene un equipo de béisbol en el campo defensivo?",
    "options": [
     "9",
     "11",
     "10",
     "8"
    ],
    "answer": 0,
    "why": "En béisbol defienden 9 jugadores.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "¿Qué mide el cronómetro en una carrera de 100 m?",
    "options": [
     "La distancia recorrida",
     "La velocidad máxima",
     "Las pulsaciones",
     "El tiempo desde la salida hasta cruzar la meta"
    ],
    "answer": 3,
    "why": "El resultado es el tiempo empleado en recorrer la distancia.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   },
   {
    "q": "¿Qué es el calentamiento antes de la actividad física?",
    "options": [
     "Un descanso largo",
     "Un estiramiento solo al final",
     "Ejercicios suaves que preparan músculos y articulaciones",
     "Beber agua fría"
    ],
    "answer": 2,
    "why": "Calentar eleva la temperatura muscular y reduce el riesgo de lesión.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 1
   }
  ]
 },
 {
  "id": "study-sports-b2-v1",
  "title": "Deportes · Bloque 2 · Técnica y entrenamiento",
  "emoji": "⚽",
  "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
  "questions": [
   {
    "q": "En voleibol, ¿qué gesto técnico se usa normalmente para recibir un saque fuerte?",
    "options": [
     "Remate",
     "Bloqueo",
     "Antebrazos (recepción baja)",
     "Toque de dedos con salto"
    ],
    "answer": 2,
    "why": "La recepción de antebrazos controla balones rápidos y bajos.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "En baloncesto, ¿qué es la «bandeja»?",
    "options": [
     "Un tiro libre",
     "Lanzamiento en carrera tras dos pasos, cerca del aro",
     "Un pase picado",
     "Una defensa zonal"
    ],
    "answer": 1,
    "why": "La bandeja combina dos apoyos y lanzamiento suave al tablero.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "¿Qué capacidad física mejora principalmente correr 30 minutos a ritmo moderado?",
    "options": [
     "Resistencia aeróbica",
     "Fuerza máxima",
     "Flexibilidad",
     "Velocidad de reacción"
    ],
    "answer": 0,
    "why": "El esfuerzo prolongado y moderado desarrolla la resistencia aeróbica.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "Si la frecuencia cardiaca máxima estimada es 220 − edad, ¿cuál es para alguien de 16 años?",
    "options": [
     "236 ppm",
     "196 ppm",
     "214 ppm",
     "204 ppm"
    ],
    "answer": 3,
    "why": "220 − 16 = 204 pulsaciones por minuto.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "¿Qué porcentaje de 200 ppm corresponde a 150 ppm?",
    "options": [
     "70 %",
     "80 %",
     "75 %",
     "65 %"
    ],
    "answer": 2,
    "why": "150 ÷ 200 = 0,75, es decir, 75 %.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "En fútbol, ¿con qué parte del pie se hace un pase corto preciso?",
    "options": [
     "Punta",
     "Parte interna",
     "Talón",
     "Planta"
    ],
    "answer": 1,
    "why": "El borde interno ofrece mayor superficie de contacto y precisión.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "¿Qué tipo de estiramiento se recomienda tras el ejercicio?",
    "options": [
     "Estático suave y sostenido",
     "Rebotes bruscos",
     "Ninguno",
     "Saltos explosivos"
    ],
    "answer": 0,
    "why": "El estiramiento estático en la vuelta a la calma favorece la recuperación.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "En atletismo, ¿qué salida se usa en las carreras de velocidad?",
    "options": [
     "Salida de pie",
     "Salida lanzada",
     "Salida sentada",
     "Salida baja con tacos"
    ],
    "answer": 3,
    "why": "Los 100 m usan tacos y posición baja para impulsarse mejor.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "En natación crol, ¿cómo se respira correctamente?",
    "options": [
     "Levantando la cabeza al frente",
     "Sin respirar",
     "Girando la cabeza lateralmente",
     "Boca arriba"
    ],
    "answer": 2,
    "why": "El giro lateral mantiene la línea del cuerpo.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "¿Qué principio del entrenamiento dice que la carga debe aumentar poco a poco?",
    "options": [
     "Especificidad",
     "Progresión",
     "Reversibilidad",
     "Individualidad"
    ],
    "answer": 1,
    "why": "La progresión aumenta gradualmente la exigencia para seguir adaptándose.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "¿Qué principio indica que se pierden mejoras si se deja de entrenar?",
    "options": [
     "Reversibilidad",
     "Progresión",
     "Variedad",
     "Sobrecarga"
    ],
    "answer": 0,
    "why": "Sin estímulo las adaptaciones se revierten.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "Un atleta corre 100 m en 12,5 s. ¿Cuál es su rapidez media?",
    "options": [
     "12,5 m/s",
     "7,5 m/s",
     "10 m/s",
     "8 m/s"
    ],
    "answer": 3,
    "why": "100 ÷ 12,5 = 8 m/s.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "En tenis de mesa, ¿qué efecto hace que la bola baje rápido tras botar?",
    "options": [
     "Cortado",
     "Plano",
     "Liftado (topspin)",
     "Lateral"
    ],
    "answer": 2,
    "why": "El topspin hace girar la bola hacia adelante y acelera su caída.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "En voleibol, ¿quién organiza el ataque con toques de dedos?",
    "options": [
     "El líbero",
     "El colocador",
     "El opuesto",
     "El central"
    ],
    "answer": 1,
    "why": "El colocador distribuye el segundo toque para el ataque.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "¿Cuál es la función del líbero en voleibol?",
    "options": [
     "Especialista en defensa y recepción",
     "Rematador principal",
     "Sacador obligatorio",
     "Capitán único"
    ],
    "answer": 0,
    "why": "El líbero no ataca por encima de la red y viste distinto.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "En baloncesto, ¿qué defensa asigna a cada jugador un rival?",
    "options": [
     "Zonal 2-3",
     "Zonal 3-2",
     "Presión de zona",
     "Individual"
    ],
    "answer": 3,
    "why": "En la individual cada defensor marca a un atacante.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "¿Cuál es la hidratación recomendada en ejercicio prolongado?",
    "options": [
     "Beber solo al terminar",
     "No beber",
     "Beber agua en pequeñas cantidades regularmente",
     "Solo bebidas energéticas"
    ],
    "answer": 2,
    "why": "Pequeños sorbos frecuentes evitan la deshidratación.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "En gimnasia, ¿qué capacidad es clave para un split (spagat)?",
    "options": [
     "Resistencia",
     "Flexibilidad",
     "Velocidad",
     "Potencia aeróbica"
    ],
    "answer": 1,
    "why": "El split exige gran amplitud articular.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "Un equipo anota 18 de 30 tiros. ¿Cuál es su porcentaje de acierto?",
    "options": [
     "60 %",
     "54 %",
     "66 %",
     "50 %"
    ],
    "answer": 0,
    "why": "18 ÷ 30 = 0,6 = 60 %.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   },
   {
    "q": "¿Qué se recomienda para prevenir lesiones al levantar peso?",
    "options": [
     "Doblar la espalda",
     "Girar el tronco con carga",
     "Bloquear la respiración siempre",
     "Espalda recta y fuerza de piernas"
    ],
    "answer": 3,
    "why": "Mantener la columna neutra protege la espalda.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 2
   }
  ]
 },
 {
  "id": "study-sports-b3-v1",
  "title": "Deportes · Bloque 3 · Historia y casos integrados",
  "emoji": "⚽",
  "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
  "questions": [
   {
    "q": "¿En qué país se originaron los Juegos Olímpicos antiguos?",
    "options": [
     "Italia",
     "Egipto",
     "China",
     "Grecia"
    ],
    "answer": 3,
    "why": "Se celebraban en Olimpia, Grecia, desde el 776 a. C. según la tradición.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "¿Quién impulsó los Juegos Olímpicos modernos de 1896?",
    "options": [
     "James Naismith",
     "William Webb Ellis",
     "Pierre de Coubertin",
     "Jules Rimet"
    ],
    "answer": 2,
    "why": "Coubertin fundó el COI en 1894 e impulsó Atenas 1896.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "¿Quién inventó el baloncesto en 1891?",
    "options": [
     "Pierre de Coubertin",
     "James Naismith",
     "William Morgan",
     "Abner Doubleday"
    ],
    "answer": 1,
    "why": "Naismith lo creó en Springfield, Estados Unidos.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "¿Quién creó el voleibol en 1895?",
    "options": [
     "William G. Morgan",
     "James Naismith",
     "Charles Miller",
     "Walter Camp"
    ],
    "answer": 0,
    "why": "Morgan lo ideó como actividad menos intensa que el baloncesto.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "¿Qué selección logró llegar a cuartos de final en el Mundial de fútbol Brasil 2014?",
    "options": [
     "Panamá",
     "Honduras",
     "Guatemala",
     "Costa Rica"
    ],
    "answer": 3,
    "why": "Costa Rica llegó a cuartos de final en Brasil 2014.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "¿Qué nadadora costarricense ganó la primera medalla de oro olímpica del país (Atlanta 1996)?",
    "options": [
     "Sylvia Poll",
     "Andrea Vargas",
     "Claudia Poll",
     "Nery Brenes"
    ],
    "answer": 2,
    "why": "Claudia Poll ganó oro en 200 m libre en 1996.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "¿En qué año fue el primer Mundial de fútbol masculino?",
    "options": [
     "1950",
     "1930",
     "1920",
     "1934"
    ],
    "answer": 1,
    "why": "Uruguay organizó y ganó el primer Mundial en 1930.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "¿Qué significan los cinco anillos olímpicos?",
    "options": [
     "La unión de los cinco continentes",
     "Cinco deportes originales",
     "Cinco ciudades sede",
     "Cinco valores del atleta"
    ],
    "answer": 0,
    "why": "Representan la unión de los continentes habitados.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "Un partido de baloncesto termina 78-65. ¿Por cuántos puntos ganó el vencedor?",
    "options": [
     "12",
     "14",
     "15",
     "13"
    ],
    "answer": 3,
    "why": "78 − 65 = 13 puntos.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "En el Mundial de 1930, ¿qué país ganó?",
    "options": [
     "Argentina",
     "Brasil",
     "Uruguay",
     "Italia"
    ],
    "answer": 2,
    "why": "Uruguay venció 4-2 a Argentina en la final.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "Un jugador de fútbol recibe dos amarillas en el mismo partido. ¿Qué ocurre?",
    "options": [
     "Sigue jugando",
     "Es expulsado (roja)",
     "Sale y entra otro sin sanción",
     "Su equipo pierde el partido"
    ],
    "answer": 1,
    "why": "Dos amonestaciones equivalen a expulsión.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "En voleibol, un equipo gana el set 25-23. ¿Por qué no terminó en 24-23?",
    "options": [
     "Se necesitan 25 puntos y 2 de ventaja",
     "Se juega a 30",
     "El set es a 21",
     "Por un error del árbitro"
    ],
    "answer": 0,
    "why": "El set termina con al menos 25 y diferencia de 2.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "Si un set de voleibol llega a 24-24, ¿cuándo termina?",
    "options": [
     "Al punto 25",
     "Al punto 30 siempre",
     "Por sorteo",
     "Cuando un equipo logre 2 puntos de ventaja"
    ],
    "answer": 3,
    "why": "Se sigue jugando hasta obtener dos de ventaja (26-24, 27-25…).",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "Un corredor hace 5 km en 25 minutos. ¿Cuál es su ritmo por kilómetro?",
    "options": [
     "4 min/km",
     "6 min/km",
     "5 min/km",
     "5,5 min/km"
    ],
    "answer": 2,
    "why": "25 ÷ 5 = 5 minutos por kilómetro.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "¿Por qué el fuera de lugar no se sanciona en un saque de banda?",
    "options": [
     "Porque el balón no está en juego",
     "El reglamento lo exceptúa en saque de banda, de meta y de esquina",
     "Solo aplica en el segundo tiempo",
     "Porque lo decide el capitán"
    ],
    "answer": 1,
    "why": "La regla 11 excluye esas reanudaciones.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "¿Qué organización rige el fútbol a nivel mundial?",
    "options": [
     "FIFA",
     "FIBA",
     "COI",
     "FIVB"
    ],
    "answer": 0,
    "why": "La FIFA organiza competiciones mundiales de fútbol.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "¿Qué organización rige el voleibol internacional?",
    "options": [
     "FIFA",
     "FIBA",
     "World Athletics",
     "FIVB"
    ],
    "answer": 3,
    "why": "La FIVB es la federación internacional de voleibol.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "En una liga, ganar vale 3 puntos, empatar 1. Un equipo tiene 5 victorias y 2 empates. ¿Cuántos puntos?",
    "options": [
     "15",
     "19",
     "17",
     "12"
    ],
    "answer": 2,
    "why": "5×3 + 2×1 = 17 puntos.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "¿Qué valor olímpico promueve respetar reglas y rivales?",
    "options": [
     "Ganar a toda costa",
     "Juego limpio (fair play)",
     "Individualismo",
     "Rapidez"
    ],
    "answer": 1,
    "why": "El fair play es base de la ética deportiva.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   },
   {
    "q": "¿Qué evento deportivo reúne a atletas con discapacidad tras los Juegos Olímpicos?",
    "options": [
     "Juegos Paralímpicos",
     "Juegos Panamericanos",
     "Mundial de clubes",
     "Juegos Centroamericanos"
    ],
    "answer": 0,
    "why": "Los Paralímpicos se celebran en la misma sede tras los Olímpicos.",
    "source": "GICM. Original; educación física y cultura deportiva. Referencia: reglamentos IFAB, FIBA, FIVB y COI.",
    "difficulty": 3
   }
  ]
 }
];
