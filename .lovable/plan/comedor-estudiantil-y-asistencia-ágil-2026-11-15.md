# Comedor estudiantil y asistencia ágil

## Objetivo
Añadir dos módulos dentro de Mi institución, sin rediseñar ni duplicar matrícula, perfiles o lectores. Primera puesta en marcha: CTP Mercedes Norte, conservando configuración independiente para cada centro.

## 1. Credencial institucional
- Un código personal opaco para cada estudiante o funcionario registrado y autorizado; presentación en carné impreso o teléfono.
- Lectura con cámara de QR y barras compatibles, lector USB que escribe como teclado, o ingreso manual de carné/cédula registrada desde computadora o teléfono.
- Reutilizar los lectores existentes; NFC solo para etiquetas NDEF compatibles, nunca asumir lectura de chips oficiales.
- Un escaneo identifica un registro, no prueba identidad ni concede una beca o permiso de retiro. Mantener separados los códigos personales y los de retiro.

## 2. Comedor
- Dirección configura gratuidad universal o modalidad mixta: beca vigente y tiquete/pago. Permitir becas explícitas tanto para estudiantes como docentes, sin concederlas automáticamente.
- Tarifas iniciales del CTP Mercedes Norte indicadas por Max: estudiante ₡700 y docente ₡1.400 por tiquete. Editables por institución, manteniendo ambas tarifas separadas e historial; cambios futuros no recalculan compras ya registradas.
- Mostrar «Becado», «Paga tiquete» o «Cortesía autorizada» solo al personal competente. Cortesías o premios de comida requieren motivo, aprobador y registro; no habilitar entregas ocultas fuera del control.
- Detectar docentes desde su membresía institucional verificada; no por escoger un rol ni por conocer su cédula.
- Registrar persona, servicio, fecha/hora, responsable y condición de cobertura. Mostrar estado antes de confirmar la entrega.
- Compra de varios tiquetes: cantidad entera positiva, accesos rápidos para 3, 4 y 5, total según tarifa de la persona y saldo disponible. Ejemplos: 3 estudiantiles ₡2.100; 5 docentes ₡7.000.
- Venta en efectivo confirmada por responsable autorizado; venta SINPE con referencia/comprobante y verificación antes de acreditar saldo. Identificar cuenta institucional receptora: no asumir que sea el SINPE de las suscripciones.
- Consumir un tiquete al confirmar una comida cubierta por saldo, sin saldo negativo ni doble consumo por escaneos repetidos. Becas/cortesías no consumen tiquetes pagados; devolución o anulación deja historial y ajusta saldo de forma controlada.
- Dirección determina reglas de repetición por servicio; no inventar reglas de vencimiento de tiquetes, asignar becas por deducción ni hacer cobros electrónicos nuevos.
- Registrar pagos/tiquetes de almuerzo separados de la suscripción a pracTICAtecnica.com; distinguir pendiente de confirmado y conservar cantidad, precio unitario, importe, medio, vendedor y fecha.
- Resumen de raciones, becas y pagos para responsables autorizados. Evitar duplicados accidentales; rectificaciones con motivo e historial.
- No mostrar condición de beca públicamente ni compartir expedientes familiares o médicos con personal del comedor.

## 3. Asistencia al aula
- Docente autorizado selecciona grupo, materia y clase; registra llegada por escaneo o entrada manual desde teléfono o computadora.
- Guardar hora de registro confiable y mostrarla en America/Costa_Rica. Separar llegada institucional de asistencia a una clase.
- Confirmar presencia y mantener pendientes los estudiantes no registrados; no deducir ausencia o tardanza sin horario/regla aprobados.
- Correcciones de hora o estado requieren motivo y responsable; no sobrescribir silenciosamente el historial.
- Estudiante consulta lo propio; padre/madre consulta solo hijos con vínculo verificado. Dirección y personal acceden según función y sección asignadas.

## 4. Avisos y austeridad
- Primera etapa: avisos privados dentro de la plataforma para familias vinculadas, sin recargo nuevo por estos módulos; se conservan las suscripciones existentes.
- Push opcional con permiso explícito del dispositivo y servicio configurado; verificar conexión Firebase ya mencionada en el proyecto, configuración web y límites antes de habilitar envíos.
- Correos de eventos individuales solo después de verificar dominio, configuración y costo. No integrar SMS ni WhatsApp de pago.
- No garantizar gratuidad ilimitada de alojamiento, correo o servicios externos. No activar facturación adicional sin autorización de Max.
- Avisos de pantalla bloqueada sin nombre, cédula, beca ni detalles del menor; abrir la plataforma exige sesión autorizada. Guardar estado real de envío sin confundir aceptación del proveedor con lectura.

## Implementación técnica
- Funciones autenticadas y registros persistentes con permisos por institución, función, grupo y vínculo familiar; validación en servidor y RLS, sin acceso general por etiqueta de rol.
- Cambios de esquema aditivos mediante la herramienta de migraciones, con GRANT y políticas en el mismo cambio.
- Separar credenciales, cobertura del comedor, entregas/pagos, sesiones de clase y asistencia; reutilizar membresías, secciones y vínculos existentes. Los registros no alteran notas, puntos ni certificados académicos.
- Extraer el lector compartido sin alterar la consulta privada de retiros. Credenciales revocables y lectura mínima; no subir imágenes de cámara ni guardar listas privadas en computadoras compartidas.
- Pantallas español/inglés técnico con diseño institucional existente, formularios breves y acceso desde menú según permisos.
- Pruebas de reglas: tarifas ₡700/₡1.400 y totales de 3/4/5 tiquetes, cambios sin alterar compras anteriores, gratuidad universal, beca explícita estudiantil/docente, cortesías auditadas, efectivo autorizado, SINPE pendiente sin saldo, consumo único sin saldo negativo, correcciones y bloqueo entre familias/instituciones.
- Comprobar flujo completo: registro autorizado → escaneo → confirmación → historial → lectura de familia vinculada; verificar móvil y computadora, además de revocación de permisos.

## Etapas y datos reales
1. Credencial y asistencia privada, con avisos internos.
2. Comedor configurable y controles auditados, sin cambiar precios de suscripción.
3. Push/correos tras verificar configuración y costos; no declarar envío hasta probarlo.

Las pantallas y controles pueden construirse sin inventar personas. Las tarifas iniciales del CTP ya fueron aportadas. Para operar y comprobar se necesitan padrón autorizado, responsables, becas vigentes, cuenta receptora SINPE del comedor y reglas de horario/servicio. No crear cuentas, becas ni asistencias ficticias en producción. No se incluye publicación automática ni conexión oficial SEA.

## Solicitudes familiares incorporadas
- Padre, madre o encargado legal se registra personalmente con Gmail; la institución revisa matrícula y autorización antes de habilitar vínculos. No completar correos ni crear personas por deducción.
- Guiar desde la matrícula existente: registro → adjuntos privados → revisión institucional → persona autorizada para retiro → consulta familiar. Verificar con dos familias autorizadas que ninguna consulta el caso de la otra.
- Auditar menú y lectura/registro de pagos con permisos reales. Auditoría puntual realizada: 26 pruebas pasan; hay 1 matrícula, 1 vínculo familiar y ningún retiro autorizado. Falta prueba completa multiusuario y de cobro.
- Recuperar ejemplos ya aportados, investigar fuentes públicas curriculares y elaborar planes/pruebas originales con citas y revisión. No llamar «planes subidos reales» al contenido creado ni atribuir aval oficial.
- PDF con datos institucionales autorizados, autor identificado, fecha y QR/SHA-256. Sin autorización registrada del firmante, ofrecer borrador y espacio para firma; nunca fabricar firma ni equiparar hash con firma digital certificada.
- La cámara puede ayudar a extraer datos de una imagen de cédula, sujetos a confirmación y revisión autorizada; OCR no valida autenticidad. Lectura de chip oficial requiere documentación, compatibilidad y solución autorizada distinta del NDEF web existente. No usar ninguna extracción como permiso automático de retiro.
- No añadir reconocimiento facial ni subir imágenes de identidad a servicios externos sin consentimiento y autorización. Mantener revisión humana y permisos actuales mientras no exista verificación oficial comprobada.