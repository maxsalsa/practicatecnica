# Matriz de aceptación — futura aplicación Next.js/Supabase

Versión 1.0 · 24 de septiembre de 2026.

**Estado de todos los casos: pendiente de implementar y ejecutar.** Esta es una nueva suite contractual para la aplicación definida en `01_REQUERIMIENTOS_SISTEMA.md`; no es un reporte de pruebas aprobadas del sistema nuevo. La inspección estática de los archivos originales se documenta por separado en `contenido/auditoria_contenido.json`. No afirmar que esa auditoría valida Auth, RLS, correos, Vercel o el dominio de producción.

Los IDs de requisito remiten a `01_REQUERIMIENTOS_SISTEMA.md`. Antes de ejecutar, fijar commit, versión de contenido, entorno, URL, fecha y navegador. Registrar por caso: aprobado/fallido/bloqueado, evidencia saneada y defecto vinculado. Un caso bloqueado por falta de credenciales, DNS o destinatario autorizado no se cuenta como aprobado. Se acepta automatizar los casos compatibles, pero accesibilidad, correo real, instalación y dominio necesitan comprobaciones apropiadas al entorno.

## Preparación y criterios de salida

- Entorno aislado de pruebas con base y Storage propios; jamás utilizar borrado masivo sobre el sitio antiguo. Importar el contenido original sin modificar sus hashes.
- Fixtures separadas: visitante; dos estudiantes activos E1/E2; estudiante temporal T; estudiante deshabilitado D; propietario P con MFA; sesión propietaria P1 sin segundo factor. Los correos son buzones de prueba autorizados, no credenciales compartidas de producción.
- Poder controlar reloj y fallos en tests de integración, simular respuestas del proveedor de correo, inspeccionar solicitudes/respuestas y consultar la base solo mediante herramientas autorizadas de test. Usar clientes públicos reales para pruebas RLS; no probar aislamiento con service-role, que puede omitirlo.
- Probar por separado UI, servidor y acceso directo permitido a Supabase. Ocultar botones, hacer mocks de permisos o ver un HTTP 200 no demuestra una regla de seguridad.
- Los casos con correo real requieren permiso previo del destinatario; mantener tokens/temporales fuera de capturas públicas y reportes. Distinguir evidencia simulada, aceptación del proveedor y recepción observada.
- Todos los P0 y P1 de la especificación deben cerrar antes de la salida pública. Son bloqueantes el aislamiento roto, pérdida/alteración de respuestas, exposición de claves, duplicidad de identidad, correo crítico inoperante y falta de MFA administrativo. P2 editorial/Realtime no exige inventar funciones para aprobar esta matriz.

## 1. Importación y contenido

| Caso | Requisito | Prerrequisito | Acción | Resultado esperado |
|---|---|---|---|---|
| CON-T01 | CON-01; DEC-07/08 | Base de pruebas vacía y paquete original | Ejecutar importación `--dry-run` | Informa 7 especialidades, 35 formas, 2.100 ítems y 14 PDF; no escribe datos ni importa cuentas MySQL. |
| CON-T02 | CON-01 | Importación inicial completada | Repetir el mismo importador dos veces | Mismo inventario y relaciones; ningún duplicado; informe identifica reutilizaciones y versiones. |
| CON-T03 | CON-01 | Copia de fixture con un byte de banco/PDF alterado | Validar hashes e intentar importar | Rechazo explícito con ruta/hash; no acepta el original como íntegro ni publica lote inválido. |
| CON-T04 | CON-02/03 | Fixture inválida aislada | Probar 3/5 opciones, opción vacía/duplicada, respuesta −1/4, área inválida y explicación vacía | Cada variante falla con archivo, forma e ítem; no se omite o “repara” contenido silenciosamente. |
| CON-T05 | CON-02/03 | Originales válidos | Importar y comparar los campos con sus fuentes | Se conservan textos/Unicode, respuesta, indicadores, página, procedencia y opcionales; no hay traducción ni resumen. |
| CON-T06 | CON-02 | Bancos con `level` string/integer y `language` ausente | Importar y consultar representación normalizada/metadatos | Curso se normaliza explícitamente conservando original; ausencia de idioma no se inventa ni elimina el ítem. |
| CON-T07 | CON-01/02 | IDs `A01` de dos especialidades | Importar ambas y reimportar una | Identidades fuente compuestas distintas; no sobrescribe una con otra. |
| CON-T08 | CON-05; PER-01 | Visitante y build de producción | Consultar URLs públicas, bundle y cachés | Ningún banco, clave ni PDF privado es accesible públicamente; no existe copia en `public/`. |
| CON-T09 | CON-06; ALE-06 | P y un intento ya abierto | Editar/publicar nueva versión de un ítem usado | Validación y vista previa funcionan; nueva versión auditable; snapshot, clave y nota del intento antiguo no cambian. |
| CON-T10 | CON-06/07 | E1 y P; archivo inválido y PDF válido | E1 intenta editar; P sube tipo falso/archivo activo peligroso y luego versión válida | E1 denegado; archivo inválido rechazado; publicación válida controlada y versión anterior recuperable. |
| CON-T11 | CON-04/07 | Materiales y borrador generado de prueba | Revisar publicación y ficha de procedencia | Procedencia/derechos pendientes no se presentan como verificados; borrador generado no se publica automáticamente. |

## 2. Registro, temporal y recuperación

| Caso | Requisito | Prerrequisito | Acción | Resultado esperado |
|---|---|---|---|---|
| AUT-T01 | AUT-01; DEC-01/02 | Visitante | Registrarse con nombre Unicode, grupo y correo válido | Solicita solo datos definidos y consentimiento versionado; no pide usuario, contraseña del buzón ni datos de pago. |
| AUT-T02 | AUT-01/02 | Fixture de validación | Probar límites de nombre/grupo/correo, HTML, especialidad inexistente y falta de consentimiento | Rechazo en cliente y servidor con error de campo; sin cuenta parcial utilizable. |
| AUT-T03 | AUT-02/07 | Correo de prueba autorizado | Registrar variante con espacios/mayúsculas y repetir | Unicidad por trim + minúsculas; una inscripción/cuenta; no se reinicia una cuenta activa. |
| AUT-T04 | AUT-02 | Direcciones válidas de fixtures | Comparar correo con/sin `+`, con/sin puntos y dominio `@mep.go.cr` | No se eliminan puntos/sufijos; dominio MEP válido se acepta; cada correo completo sigue su identidad definida. |
| AUT-T05 | AUT-03; DEC-05 | Visitante con correo reservado del propietario | Intentar registro estudiantil | No crea otra identidad ni rol; orienta al acceso/recuperación protegida sin revelar secretos. |
| AUT-T06 | AUT-06; SEG-04 | Inscripción pendiente y enlace válido | Abrir enlace mediante GET, precarga y escáner de correo | No activa cuenta ni genera temporal; requiere confirmación explícita de la persona. |
| AUT-T07 | AUT-04/06 | Inscripción pendiente; reloj controlado | Confirmar verificación y entrar con la temporal recibida | Una temporal aleatoria de al menos 16 caracteres; vigencia de 24 h; acceso solo a cambio obligatorio. |
| AUT-T08 | AUT-04/05 | T autenticado directamente en Supabase | Consultar app, REST/RPC, progreso, materiales e iniciar intento sin cambiar clave | Todas las rutas de contenido y datos quedan bloqueadas por servidor/RLS; no basta el flag visual. |
| AUT-T09 | AUT-04/05 | T y reloj en 24 h más un instante | Intentar login/acceso protegido y luego solicitar recuperación | Temporal vencida no habilita contenido; recuperación válida ofrece continuar sin cuenta duplicada. |
| AUT-T10 | AUT-04 | T en cambio obligatorio | Probar nueva clave de 11/129 caracteres, discrepancia, igual a temporal y una válida de 12–128 | Variantes inválidas no cambian estado; válida admite pegar/gestor, elimina restricción y abre las siete especialidades. |
| AUT-T11 | AUT-06 | Una inscripción y barrera de concurrencia | Confirmar el mismo enlace en dos pestañas a la vez; refrescar | Una cuenta, una operación de bienvenida y una generación temporal; respuesta repetida coherente. |
| AUT-T12 | AUT-06; COR-05/06 | Fallo inducido entre Auth, Postgres y encolado | Reintentar operación y ejecutar reconciliación | No queda acceso sin estado coherente ni duplicado; se recupera/cierra operación y no cambia temporal por un simple retry. |
| AUT-T13 | AUT-07 | E1 activo con intentos | Reenviar formulario de registro con el mismo correo y otro nombre | Mensaje neutro; no altera nombre, contraseña, rol, UUID o progreso. |
| AUT-T14 | AUT-08 | E1 activo con sesión | Pedir recuperación sin completarla | Contraseña vigente y sesión siguen funcionando; no hay reset por una mera solicitud ajena. |
| AUT-T15 | AUT-08 | Enlace de recuperación válido y dos sesiones previas | Completar reset; reutilizar enlace e intentar sesiones/temporal anteriores | Nueva clave válida; enlace de un uso; sesiones previas y bienvenida/temporales pendientes invalidadas. |
| AUT-T16 | AUT-08 | Token a los 60 minutos vencido, manipulado o de otra solicitud | Intentar completar recuperación/verificación | Rechazo seguro; no cambio de cuenta ni secreto en error; opción clara para solicitar enlace nuevo. |
| AUT-T17 | AUT-10 | Contador compartido y reloj controlado | Hacer cinco fallos consecutivos desde distintas instancias serverless; sexto intento | Bloqueo de cinco minutos y límites IP/cuenta efectivos; no revela existencia del correo; no afecta contador de exámenes. |
| AUT-T18 | AUT-11 | Correo de prueba y reloj controlado | Solicitar dos enlaces en un minuto y cuatro en quince minutos | Solo límites permitidos; respuesta clara y neutra; ninguna lluvia de correos por múltiples instancias. |
| AUT-T19 | AUT-12 | E1 activo | Editar nombre/grupo/tema; solicitar correo nuevo; confirmar primero un buzón y luego el otro | UUID y progreso conservados; correo anterior vigente hasta completar ambas confirmaciones; primera confirmación sola no cambia identidad; aviso al anterior, sesiones revocadas y duplicados impedidos. |
| AUT-T20 | AUT-12; PER-02 | E1 y P | E1 intenta escribir verificado/rol/estado; P intenta cambiar su correo por UI ordinaria | Campos privilegiados protegidos; correo propietario bloqueado en ese circuito. |
| AUT-T21 | AUT-05/08; PER-01 | Temporal válida, JWT viejo y cambio normal completado | Reusar JWT/refresco de sesión temporal después del cambio; comparar nueva sesión | Sesión nueva autorizada y session_id diferente; la anterior nunca hereda acceso de estudiante. |
| AUT-T22 | AUT-06; PER-05; ADM-05 | Cambio/reset preparado y barrera concurrente con disable/borrado | Ejecutar cambio y desactivación/borrado simultáneos, luego reconciliador | Epoch y estado impiden reactivar cuenta o emitir sesión por finalización tardía; bloqueo prevalece. |
| AUT-T23 | AUT-05/10; PER-01/02 | Clave pública Supabase, visitante y credencial de fixture | Intentar signUp directo, signIn directo y escritura de app_sessions | Registro directo deshabilitado; JWT obtenido sin flujo autorizado no crea sesión de aplicación ni acceso; estudiante no escribe scopes/epoch. |

## 3. Propietario, MFA, RLS y desactivación

| Caso | Requisito | Prerrequisito | Acción | Resultado esperado |
|---|---|---|---|---|
| PER-T01 | PER-01/02 | Visitante y E1 | Alterar UUID, URL, cookies, JSON y `user_metadata` para declararse propietario | Ninguna variante concede administración; políticas se basan en UUID aprovisionado autoritativo. |
| PER-T02 | PER-02; DEC-05 | Base con propietario aprovisionado | Intentar insertar segundo propietario o promover estudiante por interfaces públicas | Única identidad propietaria; ni cliente ni interfaz administrativa crean otro administrador. |
| PER-T03 | PER-04 | P1 con AAL1 | Abrir administración, exportar, editar usuarios y leer correos | Solo circuito MFA/contraseña/salida disponible; acciones y datos administrativos denegados también por API/DB. |
| PER-T04 | PER-04; AUT-09 | P inicia enrolamiento TOTP nuevo | Verificar código correcto, incorrecto y factor no verificado | Solo factor válidamente verificado permite AAL2; no se importa semilla antigua como API key. |
| PER-T05 | AUT-09 | Propietario con MFA y enlace de recuperación | Recuperar contraseña y volver a administrar | MFA sigue siendo obligatorio; conocer correo/enlace de contraseña no elimina segundo factor. |
| PER-T06 | PER-03; DEC-06 | P en AAL2 | Cambiar a vista estudiantil, practicar y volver | Misma identidad; banner persistente y retorno visible; no suplanta alumno ni crea otra cuenta. |
| PER-T07 | PER-01 | E1/E2 con intentos diferentes | E1 lee/escribe UUIDs de E2 vía API, REST y RPC | Rechazo uniforme o ausencia autorizada de filas; no filtra respuestas, perfil, progreso ni documentos mediante rutas prohibidas. |
| PER-T08 | PER-01; EXA-11 | E1 con pro abierto | Consultar respuestas, snapshots, joins, vistas y canales accesibles desde cliente público | No se obtienen `answer`, corrección, explicación, distractores ni estadísticas que revelen resultados antes de entrega. |
| PER-T09 | PER-01/02 | E1 activo | Intentar insert/update/delete directo de intentos, notas, roles, estado y flags de E2 | Solo operaciones autorizadas y validadas funcionan; no se autoadjudica nota, intento o privilegio. |
| PER-T10 | PER-05 | E1 con JWT vigente y enlace PDF recién emitido | P desactiva E1; E1 hace próxima petición protegida | Acceso cortado aunque JWT no venza; enlaces emitidos expiran en ≤60 s; estado no depende de claim viejo. |
| PER-T11 | PER-05; ADM-04 | E1 desactivado con historial | P reactiva y E1 entra de nuevo | Recupera acceso permitido y conserva identidad/progreso; no se resetean contadores. |
| PER-T12 | PER-01; SEG-05 | Build y cliente público | Buscar service-role, secretos y accesos anon en bundle/env públicas | No hay secretos; anon no obtiene datos privados; las pruebas RLS usan JWT reales, nunca privilegio service-role. |

## 4. Correo y recuperación de fallos de envío

| Caso | Requisito | Prerrequisito | Acción | Resultado esperado |
|---|---|---|---|---|
| COR-T01 | COR-01/02 | Proveedor/dominio verificados en staging | Enviar verificación del flujo elegido | Remitente autorizado y Reply-To correctos; SMTP Auth de producción configurado; un flujo no dispara correos duplicados de Auth y cola propia. |
| COR-T02 | COR-03 | Todas las plantillas | Renderizar HTML/texto con nombres largos y caracteres especiales | Marca, HTTPS canónico, enlaces y alternativa texto correctos; sin HTML inyectado, credenciales del buzón ni marca equivocada. |
| COR-T03 | COR-04 | Proveedor devuelve `accepted`, sin webhook | Consultar estado en UI y admin | “Aceptado; entrega sin confirmar”; nunca “leído”, “en bandeja” o “recibido” sin evidencia. |
| COR-T04 | COR-04/07 | Webhooks signed de entrega/rebote/queja | Procesar eventos válidos y consultar estado | Estados correctos y evidencia del proveedor; delivered no se presenta como lectura; rebotes/quejas bloquean reintentos indebidos. |
| COR-T05 | COR-07 | Endpoint de webhook | Enviar firma inválida, cuerpo alterado, replay y mismo event ID dos veces | Inválidos rechazados; eventos válidos duplicados idempotentes; jamás verifican usuario por JSON sin firma. |
| COR-T06 | COR-05 | Un trabajo pendiente y dos workers | Reclamar/despachar en concurrencia | Reclamo exclusivo con lease; una operación lógica; no prometen entrega externa exactamente una vez ni regeneran secretos. |
| COR-T07 | COR-05 | Caída tras reclamar y antes de terminar | Vencer lease y ejecutar cron de respaldo | Trabajo recuperado de forma segura; no queda `processing` para siempre ni crea otra cuenta/temporal. |
| COR-T08 | COR-05/06 | Proveedor falla o devuelve 429/Retry-After | Ejecutar reintentos con reloj simulado | Esperas 1/5/15/60 min respetan cuotas y Retry-After; misma generación; errores saneados y estado visible. |
| COR-T09 | COR-05/06 | Correo con token vencido o generación cancelada | Worker intenta reanudar envío | Se expira/cancela; no envía temporal obsoleta; payload sensible eliminado según estado. |
| COR-T10 | COR-06 | Mensajes queued y accepted y logs de test | Inspeccionar DB, logs, errores y UI admin | Payload sensible cifrado mientras hace falta y borrado tras aceptación/vencimiento/cancelación; no temporales/tokens en logs ni UI. |
| COR-T11 | COR-08 | E1/E2 y administrador | Consultar/alterar ID del estado de correo; reintentar trabajo elegible | E1 solo contexto propio; P ve metadatos/error seguro y puede reintentar; no enumera secretos o otras solicitudes. |
| COR-T12 | COR-09; CAL-05 | Gmail y MEP autorizados; dominio de staging/producción | Ejecutar registro real, recepción, verificación, temporal y cambio final | Registrar timestamps y recepción observada en ambos buzones; retrasos/bloqueos quedan como fallo/bloqueo, no éxito por cola vacía. |

## 5. Intentos, respuestas y concurrencia

| Caso | Requisito | Prerrequisito | Acción | Resultado esperado |
|---|---|---|---|---|
| EXA-T01 | EST-01; DEC-03 | E1 recién habilitado | Cambiar entre las siete especialidades | Acceso a todas; selector móvil/escritorio; ningún usuario nuevo, respuesta borrada o intento consumido. |
| EXA-T02 | EXA-02/03 | Forma sin intentos | Ver inicio y comenzar | Modo, 60 preguntas e Intento 1 de 5 claros; snapshot persistido y ordinal local independiente del ID global. |
| EXA-T03 | EXA-02/04 | E1 con intento abierto | Pulsar iniciar/nuevo, recargar y reconectar varias veces | Siempre retoma el mismo intento; no aumenta contador ni rehace orden. |
| EXA-T04 | EXA-03/04 | Forma sin intento activo; dos peticiones sincronizadas | Iniciar simultáneamente desde dos pestañas | Un único intento abierto y ordinal consumido; resultado común o conflicto seguro recuperable. |
| EXA-T05 | DEC-09; EXA-03 | E1/E2 y dos especialidades/formas | Crear primeros intentos en cada combinación | Cada persona/especialidad/forma empieza en 1; ningún contador toma número de otra combinación. |
| EXA-T06 | EXA-04 | E1 con cinco intentos de una forma | Intentar sexto; luego iniciar otra forma/especialidad | Sexto rechazado con historial conservado; demás contadores mantienen cupo propio. |
| EXA-T07 | EXA-04 | E1 con cuatro intentos entregados | Enviar inicios concurrentes para consumir último cupo | Nunca aparece ordinal 6 ni dos quintos; máximo cinco creados. |
| EXA-T08 | EXA-05/07 | Ítem sin responder | Elegir opción, cambiarla y navegar sin confirmar | Cambios solo locales; aviso accesible al salir; no incrementa guardadas ni expone solución. |
| EXA-T09 | EXA-05/06 | Ítem guiado sin responder | Confirmar una elección y repetir misma operación | Una fila/una corrección/hora de servidor; mismo resultado y explicación; no doble conteo. |
| EXA-T10 | EXA-05/06 | Ítem ya confirmado | Confirmar otra opción vía UI y API manipulada | Rechazo/conflicto; primera selección y nota intactas, también en pro. |
| EXA-T11 | EXA-06 | Ítem sin responder; dos respuestas concurrentes distintas | Enviar ambas a la misma posición | Solo una selección queda confirmada; otra no sobrescribe; estado persistente no ambiguo. |
| EXA-T12 | EXA-01/11 | Pro abierto con correctas e incorrectas guardadas | Recorrer UI, informe, red y progreso | Solo guardado/selección visible; no nota, clave, explicación, distractores ni colores de corrección. |
| EXA-T13 | EXA-07; ALE-03 | Intento parcialmente respondido | Cerrar navegador y abrir desde otra sesión propia | Mismo snapshot, orden/opciones y confirmadas; navegación recupera pendiente sin consumir intento. |
| EXA-T14 | EXA-07 | Intento abierto | Marcar/desmarcar ítem para revisar, recargar y navegar | Marca persistente independiente de respuesta; mapa accesible; no cambia nota/contador. |
| EXA-T15 | EXA-08 | Guiada con 59 confirmadas; pro con 59 | Confirmar la número 60 en ambas | Guiada finaliza automáticamente; pro queda abierta hasta Entregar; ambas conservan 60 confirmadas. |
| EXA-T16 | EXA-08/09 | Intento vacío y otro parcial | Entregar anticipadamente tras confirmar diálogo | Pendientes indicados; vacío da 0; no respondidas suman 0 puntos, se muestran separadas y no hay reapertura. |
| EXA-T17 | EXA-06/08 | Intento abierto y respuesta concurrente con entrega | Ejecutar responder/entregar simultáneamente y repetir entrega | Orden transaccional coherente: respuesta antes entra o después se rechaza; resultado final estable e idempotente. |
| EXA-T18 | EXA-08/11 | Intento entregado | Intentar añadir/cambiar respuesta, flag o volver a entregar | Respuestas/marcas congeladas; repetición de entrega no duplica ni modifica resultado. |
| EXA-T19 | EXA-09 | Fixture 20 correctas, 10 incorrectas, 30 pendientes | Comparar parcial guiada y final entregada | Parcial 66,67%; final 33,33%; 20 aciertos, 10 errores en respondidas y 30 no respondidas; enteros fuente intactos. |
| EXA-T20 | EXA-10 | Intento abierto y reloj adelantado | Permanecer/volver tras intervalo largo | No entrega automática por tiempo; duración informativa, si existe, aclara pausas. |
| EXA-T21 | EXA-11/12 | Intentos finalizados y pro abierto | Imprimir/guardar PDF de finales; intentar obtener revisión final de pro abierto | Impresión final legible con identidad/forma/ordinal/áreas; revisión final del pro abierto denegada; no revela claves anticipadamente ni inventa certificado oficial. |

## 6. Aleatorización y conservación editorial

| Caso | Requisito | Prerrequisito | Acción | Resultado esperado |
|---|---|---|---|---|
| ALE-T01 | ALE-01 | Los 35 blueprints iniciales | Generar snapshots y agrupar por área+indicador+dificultad | Cada cuota coincide exactamente con `contenido/blueprints.json`; 60 ítems, no solo porcentaje global similar. |
| ALE-T02 | ALE-02 | Bancos de varias especialidades/modos | Generar A–E e inspeccionar IDs fuente | Solo especialidad elegida; A/B/C comparten pool practice y D/E pool pro; no cruce de modo. |
| ALE-T03 | ALE-02 | Historial controlado: variantes con 0, 1 y 2 exposiciones | Generar la misma cuota repetidamente con RNG de test | Prioriza menor exposición; empates permiten alternativas sin sesgo determinista por orden del archivo; ningún duplicado dentro del intento. |
| ALE-T04 | ALE-03 | Preguntas con distractores y permutación conocida | Permutar opciones y resolver cada opción | Clave y explicación específica siguen al texto correcto; jamás explicación del índice fuente equivocado. |
| ALE-T05 | ALE-03 | Snapshot iniciado | Refrescar, reanudar y consultar historial | No recalcula selección/opciones; semilla y solución no aparecen en payload estudiantil antes de revelación. |
| ALE-T06 | ALE-04 | Pool con todos sus ítems ya vistos | Iniciar forma con cuota todavía suficiente | Reutiliza elegibles menos vistos sin duplicarlos; no exige novedades inexistentes. |
| ALE-T07 | ALE-04 | Fixture con menos ítems distintos que cuota | Intentar iniciar | Error claro y señal para propietario; no consume intento incompleto, no cambia área/dificultad ni crea 59 preguntas. |
| ALE-T08 | ALE-05 | A de Accounting/Administración/Contabilidad | Comparar contenido de dos intentos | Es válido que repita sus 60 contenidos; UI no promete novedad absoluta; cuota y orden persistente correctos. |
| ALE-T09 | ALE-05/06 | Datos auditados y versión editorial nueva | Revisar métricas y retirar/corregir ítem | No se exige balance 15 claves por letra no especificado; nuevas cuotas versionadas no reescriben intentos históricos. |

## 7. Progreso, seguimiento y administración

| Caso | Requisito | Prerrequisito | Acción | Resultado esperado |
|---|---|---|---|---|
| PRO-T01 | PRO-01/02 | E1 sin intentos y después un intento parcial | Abrir panel | Inicial “Sin resultados”; confirmadas/60 se distingue de nota; formas finalizadas no aumenta por solo iniciar. |
| PRO-T02 | PRO-02/03 | Dos finales de A con 100/50 y un B abierto | Consultar progreso | Tres iniciados, dos finales y una forma finalizada de cinco; mejor 100 y promedio 75, sin usar B abierto. |
| PRO-T03 | PRO-03 | A final 100/0; B final 50 | Consultar promedio | Promedio 50 de los tres intentos; no promedia mejores notas por forma. |
| PRO-T04 | PRO-04 | Área con 2 correctas/3 incorrectas visibles, omitidas y pro abierto | Abrir áreas por reforzar | Refuerzo 60% con cantidades; omisiones separadas; pro abierto no altera aciertos ni revela corrección. |
| PRO-T05 | PRO-04/05 | Área con menos de cinco respuestas; tema claro/oscuro | Abrir gráfico y tabla | “Evidencia inicial”; etiquetas y tabla equivalentes; contraste y ámbar visibles sin depender solo de color. |
| ADM-T01 | ADM-01; PER-03 | E1/E2 y P con historial | Filtrar por persona, grupo, especialidad, forma, estado y fechas | Tabla paginada y detalle correctos; ordinal propio del alumno; intentos P excluidos por defecto. |
| ADM-T02 | ADM-02 | P mirando seguimiento; E1 confirma | Esperar polling y ocultar/mostrar pestaña | Cambio visible en 15–30 s o al actualizar; sello horario fiable; polling detenido fuera de vista. |
| ADM-T03 | ADM-03 | Filtros activos y nombres que empiezan =,+,−,@ | Exportar CSV y abrir en hoja de cálculo | UTF-8, fechas claras, solo filtro seleccionado y celdas neutralizadas; sin secretos ni fórmulas ejecutadas. |
| ADM-T04 | ADM-04 | P; solicitud pendiente e histórica rechazada | Invitar dos veces y retomar correo existente | Invitación idempotente; no verifica buzón ni crea contraseña compartida; estado recuperable. |
| ADM-T05 | ADM-05 | E1 con datos; P | Borrar usando correo incorrecto y luego exacto | Incorrecto no borra; exacto inicia borrado Auth/datos consistente; propietario no es eliminable. |
| ADM-T06 | ADM-05 | Fallo inducido en parte de borrado | Reintentar operación y registrarse otra vez tras cierre | Cuenta queda deshabilitada durante fallo; reintento concluye sin huérfanos; nuevo registro sin antiguo progreso. |
| ADM-T07 | ADM-06; DEC-07 | Aplicación desplegada en base nueva | Revisar UI, rutas y scripts de despliegue | No botón público de limpieza masiva; no borra sitio/base MySQL anterior; herramienta privada exige respaldo/vista previa/destino. |
| ADM-T08 | ADM-07; COR-09 | Propietario recién configurado, envío simulado con fallo | Completar guía inicial, ejecutar pruebas, corregir fallo y abrir registro | Pasos persistentes y claros; no marcar entrega real o TLS por un clic; apertura depende de comprobaciones y no expone secretos. |

## 8. Materiales, UX y accesibilidad

| Caso | Requisito | Prerrequisito | Acción | Resultado esperado |
|---|---|---|---|---|
| UX-T01 | EST-02 | E1 y las siete especialidades | Abrir/descargar ambos PDF de cada una | Catorce destinos correctos, hash original, autorización vigente y estados carga/error; no confunde tablas del mismo nombre. |
| UX-T02 | UX-01; DEC-04 | Fecha 2026 | Recorrer portada/registro/espacio | Una cuenta/todas las especialidades, gratis durante 2026 y marca consistente; sin cobros, códigos ni jerga técnica para estudiantes. |
| UX-T03 | DEC-04; PRI-03 | Reloj 2027-01-01T05:59:59Z y luego 06:00:00Z | Refrescar portada y cuenta activa | Corte del sello en hora Costa Rica; no bloquea cuentas, borra progreso ni activa cobros automáticamente. |
| UX-T04 | UX-02/08 | Vistas principales con nombres/enunciados largos | Probar 360, 390, 768 y 1440 px y zoom 200% | Sin desbordamiento de página ni contenido cortado; tablas con solución móvil; controles operables. |
| UX-T05 | UX-02/05 | Navegación solo teclado y lector de pantalla | Registrar, responder, abrir/cerrar diálogos y navegar mapa | Orden/foco visibles, nombres accesibles, diálogo con foco controlado/devuelto y estados anunciados; sin trampas inesperadas. |
| UX-T06 | UX-03/05 | Sistema claro/oscuro y selección explícita | Alternar tema y recargar | Preferencia persiste sin destello/hidratación errónea; selects, modales, tablas, disabled y feedback legibles. |
| UX-T07 | UX-04 | Títulos cortos/largos y tarjetas PDF | Comparar tarjetas a varias anchuras | Alturas/espacios coherentes; acciones alineadas al fondo sin posicionar títulos artificialmente. |
| UX-T08 | UX-05/06 | Formulario largo con fallo de servidor | Enviar, provocar error y reintentar | Resumen enfocado y errores junto a campos; conserva no sensibles, sin doble envío ni aviso perdido arriba. |
| UX-T09 | UX-07 | Fixtures de vacío/error/sesión vencida/cupo/enlace vencido/offline | Abrir cada estado | Mensaje comprensible y siguiente paso; no stack trace, variable, undefined ni bloqueo sin salida. |
| UX-T10 | UX-08 | Fechas UTC alrededor de medianoche Costa Rica | Consultar historial, correo y CSV | Conversión `America/Costa_Rica` coherente y formato claro; almacenamiento base sigue UTC. |

## 9. PWA, caché, dominio y seguridad

| Caso | Requisito | Prerrequisito | Acción | Resultado esperado |
|---|---|---|---|---|
| PWA-T01 | PWA-01 | Navegador compatible y HTTPS | Validar manifest, iconos e instalar | Nombre/scope/start/iconos 192/512/maskable válidos; instalación real; no repite prompt si instalada. |
| PWA-T02 | PWA-01/02 | iOS y navegador sin beforeinstallprompt | Abrir Cómo instalar | Guía apropiada, incluyendo Compartir → Añadir a pantalla de inicio; no error ni instalación afirmada sin evidencia. |
| PWA-T03 | PWA-03; DEC-10 | Sesión con intento/PDF consultado | Inspeccionar Cache Storage y cortar Internet | Solo recursos públicos/versionados/offline; sin Auth, API, respuestas, informes ni PDF privados; no finge guardar respuesta sin red. |
| PWA-T04 | PWA-03 | Intento con selección local y nueva release | Activar actualización de service worker | Avisa/controla actualización; no recarga automáticamente ni pierde selección en curso. |
| PWA-T05 | PWA-04 | E1 cierra sesión en equipo compartido | Pulsar Atrás y entrar como E2 | Sin datos de E1 ni banco/claves en localStorage; estado privado del cliente eliminado. |
| PWA-T06 | PWA-05 | Navegador con SW/caché de 9.9.1 | Visitar nueva versión bajo mismo dominio | `/sw.js` migra/retira cachés del proyecto; HTML/JS/API coinciden sin exigir borrado manual a todos. |
| SEG-T01 | SEG-01 | DNS/HTTPS configurados en entorno objetivo | Consultar dominio raíz/www y revisar registros de correo | Certificado/ruta canónica válidos; registros MX/SPF/DKIM/DMARC/verificación conservados. |
| SEG-T02 | SEG-02; CAL-05 | URL exacta y acceso autorizado a herramientas de reputación | Revisar TLS, DNS y Safe Browsing por separado | Evidencias independientes; no se atribuye phishing a SSL sin prueba ni se declara limpio por compilar localmente. |
| SEG-T03 | SEG-03/04 | Entradas y contenido editorial de fixture | Probar HTML/script, consulta manipulada, tamaño excesivo y framing externo | Texto seguro/sanitizado, consultas parametrizadas, límites y cabeceras efectivas; sin ejecutar contenido o desactivar TLS. |
| SEG-T04 | SEG-04 | Sesión válida y origen tercero de test | Enviar acción cross-site y ejecutar GET de entrega/activación | CSRF/origen impide mutación ajena; GET no cambia estado ni entrega intentos. |
| SEG-T05 | SEG-05; CAL-01 | Commit/release de entrega | Ejecutar escaneo de secretos y dependencias e inspeccionar bundles/logs | Sin secretos ni credenciales de demo; vulnerabilidades críticas/altas aplicables resueltas antes de publicar. |

## 10. Privacidad, operación y calidad

| Caso | Requisito | Prerrequisito | Acción | Resultado esperado |
|---|---|---|---|---|
| OPE-T01 | PRI-01/02 | Documentación y registro listo | Revisar aviso, consentimiento y política de menores | Contacto/finalidad/proveedores/conservación/derechos definidos; versión/fecha guardadas; revisión competente pendiente no se rotula cumplimiento automático. |
| OPE-T02 | PRI-03/04 | Reloj y fixtures con distinta antigüedad | Ejecutar retención aprobada en dry-run y comprobar borrado autorizado | Plazos según política; secretos/cuentas no verificadas/metadatos tratados correctamente; progreso activo no desaparece al acabar 2026. |
| OPE-T03 | PRI-04 | Solicitud autorizada de E1 | Exportar/corregir/borrar sus datos | Solo sus datos y sin secretos ajenos; borrado sin expediente oculto indefinido ni vinculaciones identificables innecesarias. |
| OPE-T04 | PRI-05 | Respaldo privado DB + Storage | Restaurar en entorno aislado y comparar inventario/hashes | Recupera relaciones, intentos y 14 PDF; acceso controlado; dump nunca público. |
| OPE-T05 | CAL-01/06 | Nueva aplicación completa | Ejecutar build, lint, TS estricto, reglas/RLS/E2E en CI | Gates aprobados con evidencia y commit; sin consola rota ni enlaces vacíos; esta matriz no se marca aprobada solo por build. |
| OPE-T06 | CAL-02 | 50 estudiantes de carga aislados | Iniciar/confirmar/entregar con concurrencia y fallos de red controlados | Sin pérdida/mezcla/duplicación; p95 protegido caliente <1,5 s; cold starts y correo medidos aparte. |
| OPE-T07 | CAL-03 | Dispositivo/red de laboratorio documentados | Medir navegación, preguntas y seguimiento paginado | Informe representativo con LCP/INP/CLS frente a metas; no descarga banco completo ni llama laboratorio “datos reales de usuarios”. |
| OPE-T08 | CAL-04 | Release y contenido versionados | Comparar frontend/API/diagnóstico e informe importación | Misma release/commit de aplicación; versión de contenido distinta y trazable, sin confundir catálogo 0.8.0 con release actual. |
| OPE-T09 | CAL-05/06 | Candidata a producción y propietario | Revisar evidencias, manual y flujo real completo | Separación simuladas/reales; MFA, correo, RLS, dominio e inventario cerrados; manual corto entregado y pendientes bloqueantes visibles. |

## Registro de ejecución recomendado

Cada implementación debe producir un reporte en su repositorio/CI con: ID de caso, requisito, fecha UTC, commit y release, versión de contenido, entorno, identidad fixture anonimizada, método (automático/manual), resultado, evidencia saneada y defecto. No adjuntar claves, tokens, cuerpos sensibles de correo ni datos reales de menores.

Las pruebas de contenido se pueden repetir contra los JSON originales; las de concurrencia necesitan una base de pruebas real con transacciones y restricciones. Las de correo simulado no reemplazan COR-T12. Las de build o navegador local no reemplazan SEG-T01/02. Al actualizar esta matriz, mantener los IDs o documentar su reemplazo para conservar trazabilidad.
