# Navegación y control institucional

## Hallazgos de la auditoría inicial
- **Mi institución no se eliminó**, pero su acceso queda dentro de «Más». En el teléfono, 22 pestañas mezclan tareas personales, Dirección y administración global.
- **Solicitar permiso ya existe**, con foto/PDF, enfermedad o imprevisto, aviso de tres días, justificación en 48 horas, cancelación, revisión y QR. Falta un acceso directo y una petición formal de respaldo antes de resolver.
- **Max puede asignar y retirar miembros**, pero no hay una acción visible de editar cada persona. La página de roles de Dirección no ofrece a Max todas sus instituciones.
- **Tipo de cuenta, rol del colegio y pago están mezclados**: una asignación institucional de Dirección o Docente también añade actualmente el rol docente global. Corregir un rol institucional no retira ese rol global.
- Los planeamientos disponibles combinan plantillas editables y ejemplos preparados; no constituyen generación automática ni cobertura completa de todas las materias.
- La pestaña de pagos institucionales muestra un botón de prueba deshabilitado. No es un cobro operativo y las tarifas de servicios son distintas de la suscripción de la plataforma.
- Recorrido inicial con la cuenta de Max a 351 × 619: sin desbordamiento horizontal ni errores de página. Aún no es una prueba de Dirección, docente, estudiante y familia con cuentas distintas.

## 1. Hacer visibles las tareas de cada persona
- Mantener **Mi institución** como acceso principal del menú para miembros y Max, fuera de «Más».
- Reorganizar el espacio por grupos: **Mi trabajo**, **Estudiantes**, **Gestión del centro** y **Administración de Max**. Mostrar solo acciones autorizadas, con opciones secundarias contraídas.
- Accesos directos a **Solicitar permiso**, **Mis solicitudes y justificaciones**, **Planeamientos**, **Asistencia**, **Consultar notas**, **Aprobar permisos**, **Personal y roles** y **Configuración institucional**, según permisos reales.
- Conservar todos los módulos existentes; no usar un cambio de vista para otorgar permisos o hacerse pasar por otra cuenta.

## 2. Completar el recorrido de permisos
- Solicitud con fechas, horario, motivo, foto/PDF opcional y enfermedad o situación imprevista, sin exigir síntomas en textos compartidos.
- Dirección podrá **pedir un respaldo**, dejando comentario, fecha y responsable; la persona verá qué falta y podrá responder con archivo privado. Pedir respaldo no equivale a aprobar ni rechazar.
- Mantener aprobación/rechazo por Max o Dirección de la institución, nunca de la propia solicitud. No ampliar automáticamente a auxiliares, guías o Subdirección.
- Mostrar aviso previo, plazo de justificación, historial y estado claramente. Conservar las reglas de tres días y 48 horas, con excepciones por enfermedad/imprevisto.
- QR consulta el registro autorizado e íntegro; SHA-256 no es firma digital certificada. Lectura de QR/NFC no concederá por sí sola acceso ni aprobación.

## 3. Corregir cuentas y gestionar personal
- En Superadministración, separar **tipo de cuenta personal**, **rol por institución**, **estado de acceso** y **suscripción**.
- Max podrá corregir una cuenta Estudiante/Docente y asignaciones institucionales desde cada persona, con confirmación e historial de antes/después, autor, fecha y hora.
- Añadir acciones visibles para agregar, consultar, editar y retirar miembros. No borrar cuentas, notas, pagos o historial al retirar una membresía.
- Dirección administrará únicamente funciones delegadas de su colegio; cambios de autoridades y poderes globales quedan reservados a Max.
- La autorización de los «dos ayudantes» para consultar notas queda pendiente de identificar sus funciones o cuentas; no otorgarles acceso general por deducción.

## 4. Separar pagos y documentos institucionales
- Distinguir **suscripción anual de pracTICAtecnica.com** de **tarifas del colegio**: matrícula, comedor y circuitos por nivel/vehículo/licencia.
- Mostrar institución destinataria, importe, vigencia, comprobante y estado real; SINPE seguirá pendiente hasta verificación.
- Sustituir acciones de cobro inoperantes por estados y siguientes pasos claros. No activar Stripe ni migrar suscripciones sin una transición segura y una prueba completa.
- Mantener el pedido de boletas por I periodo, II periodo y anual, con encabezado, escudo propio, siglas, leyendas y QR. Separar su permiso de emisión del acceso a expedientes médicos: imprimir notas no concede acceso médico.

## 5. Planeamientos, contenido y seguimiento
- Reunir planeamientos ya preparados y plantillas por materia/nivel; generar borradores a partir de contenido revisado existente, sin gasto de IA automático ni afirmación de aval oficial.
- Inventariar las materias y los ítems reales antes de ampliar por bloques de 100/1.000; no contar cambios de orden como preguntas nuevas ni declarar malla completa inexistente.
- Registrar ingresos y actividad con hora de Costa Rica y distinguir **tiempo activo estimado** de pestaña abierta. Información privada para la persona y responsables autorizados; familias solo estudiantes vinculados y consentidos.
- El tiempo conectado no aumentará notas, puntos académicos ni rachas verificadas. Mantener logros académicos separados de juegos y actividad de uso.

## Detalles técnicos y comprobación
- Cambios pequeños sobre los paneles existentes; permisos reales en servidor y políticas, no solo ocultamiento de botones.
- Aplicar cambios de datos con migraciones y conservar historial. Añadir pruebas concretas de roles, aislamiento, plazos, respaldo y ausencia de activación por referencia.
- Recorrer teléfono y escritorio: menú → institución → solicitar → respaldo → justificar → resolver → verificar QR; personal → corregir rol → recargar → comprobar acceso.
- Usar instituciones de prueba y cuentas autorizadas distintas, sin conceder roles productivos ficticios. La lectura física NFC requiere dispositivo compatible y etiqueta NDEF; no afirmar validación de cédulas oficiales.
- Entregar por bloques verificados: **primero navegación y permisos; después cuentas/pagos; luego documentos, planeamientos y seguimiento**. Correo y push conservan su requisito pendiente de configuración y prueba real antes de matrículas reales.