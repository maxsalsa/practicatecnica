import { expandedSubjectDecks } from './expanded-subjects.bank';
import { curricularSubjectDecks } from './curricular-subjects.bank';
import { wellbeingDecks } from './wellbeing.bank';
import type { Deck } from './questions';
type Item=[string,string[],number,string];
const groups:Record<string,Item[]>={
 critical:[
 ['P es verdadero y Q es falso. ¿P Y Q?',['Verdadero','Falso','Depende del orden','No se puede evaluar'],1,'Una conjunción exige que ambas proposiciones sean verdaderas. Como Q es falsa, P Y Q es falsa.'],
 ['P es verdadero y Q es falso. ¿P O Q inclusivo?',['Falso','Solo si ambas son falsas','Verdadero','No tiene valor'],2,'La disyunción inclusiva es verdadera si al menos una proposición es verdadera. No exige que ambas lo sean.'],
 ['«Su argumento es falso porque usted es antipático». ¿Qué error contiene?',['Prueba experimental','Comparación válida','Definición formal','Ataque a la persona'],3,'Atacar a la persona no refuta el argumento. Examine razones y evidencia, no simpatía.'],
 ['Dos hechos ocurren juntos. ¿Qué se puede concluir sin más datos?',['No basta para probar causalidad','Uno causa siempre al otro','Ambos son imposibles','La coincidencia demuestra intención'],0,'Correlación no demuestra causalidad. Puede haber coincidencia o una tercera variable.'],
 ['Para aprender con menos agotamiento, ¿qué hábito es razonable?',['No dormir para estudiar','Alternar estudio y descansos','Ignorar siempre el cansancio','Usar estimulantes sin orientación'],1,'Organizar descansos y sueño favorece bienestar. Es orientación general, no consejo médico personalizado.'],
 ],
 digital:[
 ['Recibe un correo con un enlace que exige su clave. ¿Qué hace?',['Abrirlo','Verificar por un canal oficial','Enviar la clave','Reenviarlo a todos'],1,'Verifique el remitente por otro canal. Un enlace urgente puede ser phishing; no comparta claves.'],
 ['Un equipo no tiene conexión. ¿Qué revisa primero?',['Comprar otro','Borrar archivos','Cable o conexión Wi-Fi','Cambiar de proveedor'],2,'Compruebe la conexión física o inalámbrica antes de cambios costosos.'],
 ['¿Qué servicio asigna direcciones IP automáticamente?',['DNS','HTTP','FTP','DHCP'],3,'DHCP entrega configuración IP; DNS resuelve nombres y HTTP sirve contenido web.'],
 ['¿Qué reduce el daño de perder un archivo?',['Respaldo probado','Una clave corta','Desactivar antivirus','Borrar registros'],0,'Un respaldo restaurable permite recuperar archivos. Compruebe que la restauración funciona.'],
 ['Para un sistema administrativo, ¿qué permisos asigna?',['Acceso total a todos','Solo los necesarios','La misma clave','Ningún registro'],1,'El principio de mínimo privilegio limita cada cuenta a lo necesario para su trabajo.'],
 ],
 business:[
 ['Activo ₡800 y pasivo ₡300. ¿Patrimonio?',['₡1100','₡300','₡500','₡800'],2,'Patrimonio = activo − pasivo = 800 − 300 = 500. Sumar deudas no calcula patrimonio.'],
 ['«Accounts payable» corresponde a:',['Inventario','Ventas','Capital','Cuentas por pagar'],3,'Son obligaciones de pago a proveedores, no cuentas por cobrar.'],
 ['Vende en ₡1000 algo que cuesta ₡700. ¿Ganancia antes de otros gastos?',['₡300','₡1700','₡700','₡1000'],0,'1000 − 700 = 300. Todavía deben considerarse otros gastos e impuestos si existen.'],
 ['Costo fijo ₡100 y contribución ₡20 por unidad. ¿Unidades de equilibrio?',['2','5','20','100'],1,'100 ÷ 20 = 5 unidades cubren el costo fijo, bajo esos supuestos.'],
 ['Un cliente reclama un error. ¿Primera acción?',['Culparlo','Ignorarlo','Escuchar y verificar','Prometer sin revisar'],2,'Escuche y contraste el problema con los registros antes de proponer una solución.'],
 ],
 agro:[
 ['¿Qué práctica ayuda a proteger un suelo desnudo?',['Quemarlo','Compactarlo','Quitar vegetación','Mantener cobertura'],3,'Una cobertura apropiada reduce exposición a lluvia y erosión; debe adaptarse al cultivo.'],
 ['Antes de aumentar el riego, ¿qué comprueba?',['Humedad del suelo','Color de la manguera','Precio del terreno','Hora del almuerzo'],0,'Observe humedad y necesidades del cultivo. Más agua no siempre mejora su desarrollo.'],
 ['¿Qué debe registrar para rastrear una cosecha?',['Solo un apodo','Lote, fecha y origen','Solo el peso total','Color del camión'],1,'La trazabilidad identifica el origen y lote para seguir el producto y gestionar incidencias.'],
 ['¿Qué evita contaminar agua al manejar agroquímicos?',['Lavar envases en el río','Aplicar sin etiqueta','Seguir etiqueta y protección de fuentes','Mezclar todo'],2,'Respete instrucciones y medidas ambientales. No lave envases ni vierta residuos en fuentes de agua.'],
 ['En compostaje controlado, ¿qué se aprovecha?',['Vidrio','Pilas','Plástico','Residuos orgánicos adecuados'],3,'El compostaje transforma materiales orgánicos aptos; pilas, vidrio y plástico no son compostables.'],
 ],
 industrial:[
 ['Antes de intervenir un equipo eléctrico, ¿qué hace?',['Aislar energía y comprobar ausencia','Tocar el cable','Trabajar mojado','Solo bajar el volumen'],0,'Personal capacitado debe aislar y verificar energías peligrosas; nunca trabajar con tensión sin procedimiento autorizado.'],
 ['¿Qué equipo mide una longitud pequeña con precisión?',['Martillo','Calibrador','Guante','Destornillador'],1,'El calibrador mide dimensiones; seleccione rango y resolución adecuados y verifique su ajuste.'],
 ['Antes de construir una estructura, ¿qué consulta?',['Solo una foto','Un rumor','Planos y especificaciones aprobados','El color del cemento'],2,'Planos y especificaciones aprobados definen requisitos. La ejecución requiere profesionales competentes.'],
 ['¿Qué mantenimiento busca fallos antes de una avería?',['Esperar daño','Eliminar registros','Improvisar cambios','Preventivo'],3,'El mantenimiento preventivo sigue inspecciones programadas para reducir fallos.'],
 ['¿Qué hace ante una fisura nueva en un elemento estructural?',['Reportar y solicitar evaluación','Cubrirla sin revisar','Ignorarla','Cargar más peso'],0,'Reporte y restrinja riesgos según procedimiento; un profesional debe valorar la causa y seguridad.'],
 ],
};
export const arenaDecks:Deck[]=[...Object.entries(groups).map(([id,items])=>({id:`arena-${id}`,title:'Retos técnicos breves',emoji:'🎮',level:'Juego recreativo; no examen ni certificación',questions:items.map(([q,options,answer,why])=>({q,options,answer,why,source:'GICM. (2026). Casos originales para decisiones técnicas introductorias. No sustituye procedimientos profesionales ni capacitación de seguridad.'}))})),...wellbeingDecks];

for(const subject of ["english","math","web","architecture","accounting"]){const source=expandedSubjectDecks.find(d=>d.id===`study-${subject}-b1-v1`);if(source)arenaDecks.push({...source,id:`arena-${subject}`,title:`Retos breves · ${source.title}`,level:"Juego recreativo; no examen ni certificación",questions:source.questions.slice(0,5)});}
for(const subject of ['science','finance','banking','costs']){const source=curricularSubjectDecks.find(d=>d.id===`study-${subject}-b1-v1`);if(source)arenaDecks.push({...source,id:`arena-${subject}`,title:`Retos breves · ${source.title}`,level:'Juego recreativo; no examen ni certificación',questions:source.questions.slice(0,5)});}
