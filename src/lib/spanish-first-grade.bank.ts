import type { Deck, Q } from './questions';
type Item=[string,string[],number,string];
const items:Item[]=[
 ['¿Con qué vocal comienza «oso»?',['A','O','U','E'],1,'Oso comienza con O. A, U y E representan sonidos diferentes del inicio de esta palabra.'],
 ['¿Cuál es la primera letra de «mesa»?',['S','A','M','E'],2,'Mesa empieza con M. E, S y A aparecen después, no al comienzo.'],
 ['¿Cuántas sílabas tiene «mano»?',['1','3','4','2'],3,'Ma-no tiene dos sílabas. Pronuncie cada parte: ma y no. Contar letras no equivale a contar sílabas.'],
 ['¿Cómo se separa «pelota» en sílabas?',['pe-lo-ta','pel-ota','p-e-l-o-t-a','pelo-ta'],0,'Pe-lo-ta tiene tres sílabas. Las otras separaciones no siguen sus golpes de voz o separan letras individuales.'],
 ['Una persona se llama Ana. ¿Cómo se escribe su nombre?',['ana','Ana','ANAna','aNa'],1,'Los nombres propios empiezan con mayúscula: Ana. Las otras formas no usan la mayúscula inicial correctamente.'],
 ['¿Cuál oración empieza con mayúscula y termina con punto?',['el gato duerme','El gato duerme','El gato duerme.','el gato duerme.'],2,'El gato duerme. reúne las dos condiciones. Las otras opciones omiten la mayúscula, el punto o ambos.'],
 ['Lea: «Luis riega una planta». ¿Quién riega?',['La planta','Una niña','El perro','Luis'],3,'El texto nombra a Luis como quien realiza la acción. La planta recibe el agua; las otras personas o animales no se mencionan.'],
 ['Lea: «La niña guarda su libro en la mochila». ¿Qué guarda?',['Su libro','La mochila','Una pelota','Un vaso'],0,'Guarda su libro. La mochila es el lugar donde lo guarda; pelota y vaso no aparecen en el texto.'],
 ['Lea: «El perro está debajo de la mesa». ¿Dónde está el perro?',['Encima de la mesa','Debajo de la mesa','Dentro de un carro','En el techo'],1,'Debajo de la mesa es la ubicación escrita. Encima es una posición distinta; carro y techo no se mencionan.'],
 ['Lea: «Primero lavamos las manos. Luego comemos». ¿Qué sucede primero?',['Comemos','Dormimos','Lavamos las manos','Salimos a jugar'],2,'Primero se lavan las manos y luego se come. Las otras acciones no son el primer paso del texto.'],
 ['¿Cuál palabra nombra un animal?',['Mesa','Lápiz','Casa','Gato'],3,'Gato nombra un animal. Mesa y lápiz son objetos; casa es una construcción.'],
 ['¿Cuál palabra nombra una acción?',['Saltar','Zapato','Ventana','Flor'],0,'Saltar indica una acción. Zapato, ventana y flor nombran cosas, no acciones.'],
 ['¿Cuál palabra significa lo contrario de «grande»?',['Alto','Pequeño','Largo','Ancho'],1,'Pequeño se opone a grande al hablar del tamaño. Alto, largo y ancho describen otras dimensiones.'],
 ['¿Cuál palabra significa lo contrario de «frío»?',['Azul','Lento','Caliente','Lejos'],2,'Caliente se opone a frío en temperatura. Azul es un color; lento es velocidad y lejos es distancia.'],
 ['Complete: «Una flor, dos __».',['flor','florero','florido','flores'],3,'Flores es el plural de flor. Flor indica una; florero nombra un objeto y florido describe algo.'],
 ['¿Qué expresión se usa para pedir ayuda con respeto?',['Por favor, ¿me ayuda?','¡Quítese!','¡Cállese!','No le voy a escuchar'],0,'La primera pide ayuda con cortesía. Las otras ordenan, agreden o rechazan escuchar, en lugar de pedir ayuda.'],
 ['Cuando alguien le ayuda, ¿qué puede decir para agradecer?',['¡Váyase!','Gracias','¡Silencio!','Deme más'],1,'Gracias expresa agradecimiento. Las otras expresiones no agradecen la ayuda recibida.'],
 ['¿Qué signo abre una pregunta escrita en español?',['!','.', '¿',','],2,'¿ abre una pregunta, que se cierra con ?. El punto cierra una oración y la coma separa partes; ! cierra una exclamación.'],
 ['¿Cuál escritura corresponde a una pregunta?',['Cómo está.','Cómo está,','¡Cómo está!','¿Cómo está?'],3,'¿Cómo está? usa los dos signos de interrogación. Punto, coma y exclamación no marcan esa pregunta del mismo modo.'],
 ['Lea: «El sol salió y Marta abrió la ventana». ¿Qué ocurrió según el texto?',['Marta abrió la ventana','Marta cerró el libro','Comenzó a nevar','El perro se durmió'],0,'El texto dice que Marta abrió la ventana. Las demás acciones no están escritas; no se deben inventar datos para responder.'],
];
const source='GICM. (2026). Textos y ejercicios originales de alfabetización inicial. Referencia: Ministerio de Educación Pública. Programa de estudio de Español, I ciclo. https://ddc.mep.go.cr/dpsc/asignaturaspsc/espanol/informaciongeneral/pdfs/Programa_de_Estudio_de_Espanol_I_Ciclo.pdf · Cotejo integral pendiente; preparación independiente.';
const questions:Q[]=items.map(([q,options,answer,why])=>({q,options,answer,why,source,difficulty:1}));
export const spanishFirstGradeDeck:Deck={id:'mep-spanish-01-v1',title:'Español · 1.º · Lectura y escritura inicial',emoji:'📖',level:'1.º · Bloque original de 20 preguntas; programa completo pendiente',questions};