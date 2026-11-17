import type { Deck, Q } from './questions';
const source = 'GICM. (2026). Ejercicios originales de conteo, números, operaciones y formas. Referencia curricular: Ministerio de Educación Pública. (2012). Programas de estudio de Matemáticas. https://www.mep.go.cr/sites/default/files/media/matematica.pdf · Cotejo integral del programa pendiente; no es prueba oficial.';
type Item = [string, string[], number, string];
const items: Item[] = [
  ['Ana tiene 3 semillas y recibe 2. ¿Cuántas tiene ahora?', ['4','5','6','1'],1,'3 + 2 = 5. Cuente tres semillas y agregue dos. 1 sería restar; 4 y 6 cuentan una de menos o de más.'],
  ['De 8 lápices se prestan 3. ¿Cuántos quedan?', ['11','3','5','8'],2,'8 − 3 = 5. Retire tres de ocho. 11 suma en vez de quitar; 3 cuenta los prestados y 8 ignora el préstamo.'],
  ['¿Qué número sigue a 9 al contar?', ['8','9','11','10'],3,'Después de 9 viene 10. 8 es el anterior; repetir 9 no avanza y 11 salta un número.'],
  ['¿Qué número va antes de 15?', ['14','16','15','13'],0,'Antes de 15 está 14: una unidad menos. 16 es el siguiente; 15 no cambia y 13 retrocede dos.'],
  ['¿Cuál grupo tiene más objetos: 6 piedras o 4 piedras?', ['El de 4','El de 6','Tienen igual cantidad','Ninguno tiene piedras'],1,'6 es mayor que 4. Al emparejar cuatro piedras de cada grupo, sobran dos en el grupo de seis.'],
  ['¿Cuál número es menor?', ['7','9','2','5'],2,'2 es el menor de 7, 9, 2 y 5. Al contar desde cero, 2 aparece primero. Los demás representan más unidades.'],
  ['Complete: 2, 4, 6, __.', ['7','10','6','8'],3,'Se agregan dos cada vez: 2, 4, 6, 8. 7 suma uno; 10 salta el 8 y 6 repite el término.'],
  ['Una decena equivale a:', ['10 unidades','1 unidad','2 unidades','20 unidades'],0,'Una decena reúne diez unidades. 1 es una unidad; 2 son dos unidades y 20 equivale a dos decenas.'],
  ['¿Qué número tiene una decena y 3 unidades?', ['31','13','10','3'],1,'Una decena son 10; 10 + 3 = 13. 31 invierte posiciones, 10 omite las unidades y 3 omite la decena.'],
  ['En el número 24, el 2 representa:', ['2 unidades','4 decenas','2 decenas','24 decenas'],2,'El 2 ocupa el lugar de las decenas: representa 20. El 4 ocupa las unidades. La posición cambia el valor.'],
  ['Una cesta tiene 5 frutas y otra 5. ¿Cuántas hay en total?', ['0','5','15','10'],3,'5 + 5 = 10. Junte ambos grupos. 0 resta grupos iguales; 5 cuenta una sola cesta y 15 agrega una tercera.'],
  ['¿Qué resultado tiene 7 + 0?', ['7','0','8','70'],0,'Agregar cero no cambia la cantidad: quedan 7. No se borra, no se añade uno ni se escribe un cero a la derecha.'],
  ['Hay 6 tazas. Se usan las 6. ¿Cuántas quedan sin usar?', ['6','0','12','1'],1,'6 − 6 = 0. Se usaron todas; no sobra ninguna. 12 suma y 6 ignora el uso.'],
  ['¿Qué figura plana tiene tres lados?', ['Cuadrado','Círculo','Triángulo','Rectángulo'],2,'El triángulo tiene tres lados. Cuadrado y rectángulo tienen cuatro; el círculo no tiene lados rectos.'],
  ['¿Qué figura plana no tiene esquinas?', ['Triángulo','Cuadrado','Rectángulo','Círculo'],3,'El círculo tiene borde curvo sin esquinas. Las otras figuras tienen vértices donde se unen lados rectos.'],
  ['Un cuadrado tiene:', ['4 lados iguales','3 lados iguales','2 lados en total','Un borde sin lados rectos'],0,'El cuadrado posee cuatro lados iguales. Tres describen un triángulo; dos no cierran un cuadrado y el borde curvo corresponde al círculo.'],
  ['Una cuerda mide 8 unidades y otra 5, medidas con la misma unidad. ¿Cuál es más larga?', ['La de 5','La de 8','Miden igual','No se pueden comparar'],1,'Usando la misma unidad, 8 es mayor que 5; la cuerda de ocho es más larga. La igualdad exigiría la misma medida.'],
  ['Se registra cuántas plantas tiene cada mesa: A tiene 2, B tiene 5 y C tiene 3. ¿Cuál tiene más?', ['A','C','B','Todas por igual'],2,'La mesa B tiene cinco plantas, más que las dos de A y las tres de C. Compare las cantidades, no el orden de las letras.'],
  ['Una caja contiene 4 fichas. ¿Cuántas faltan para tener 6?', ['4','6','10','2'],3,'4 + 2 = 6. Faltan dos fichas. 6 es el total deseado, 4 lo que ya hay y 10 resulta de sumar 4 y 6.'],
  ['Tiene 9 cuentas para una pulsera. Usa 4 y luego 2. ¿Cuántas quedan?', ['3','5','7','15'],0,'Primero 9 − 4 = 5; luego 5 − 2 = 3. 5 omite el segundo uso; 7 omite el primero y 15 suma todo.'],
];
const questions: Q[] = items.map(([q,options,answer,why])=>({q,options,answer,why,source,difficulty:1}));
export const mathFirstGradeDeck: Deck = {id:'mep-math-01-v1',title:'Matemática · 1.º · Conteo, operaciones y formas',emoji:'📐',level:'1.º · Bloque original de 20 preguntas; programa completo pendiente',questions};