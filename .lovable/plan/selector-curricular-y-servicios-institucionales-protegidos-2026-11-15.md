# Selector curricular y servicios institucionales protegidos

## Primera entrega: encontrar todas las materias
- Llevar a Inicio un selector compacto en cascada: **modalidad → nivel → materia → bloques disponibles**, con acceso a la selección en Explorar.
- Incluir Primaria, Secundaria académica, Técnica CTP y Admisión; conservar ingreso a colegios y MOPT como opciones adicionales.
- Primaria: grados 1.º–6.º. Secundaria: 7.º–11.º. CTP: grupos académicos, familias y especialidades del catálogo. Admisión: universidades identificadas, sin afirmar exámenes oficiales.
- No comenzar automáticamente en Desarrollo Web ni ocultar materias sin bancos. Distinguir material propio, repaso compartido y ejercicios pendientes; cambiar modalidad o nivel reinicia las selecciones dependientes.
- Mantener búsqueda única, controles compactos y opciones avanzadas contraídas. Reutilizar ilustraciones y marca GICM existentes.
- Esta entrega mejora el descubrimiento del catálogo, no crea todas las baterías ni acredita cobertura MEP completa.

## Seguimiento familiar
- Reutilizar matrícula digital, secciones, vínculos familiares, canales y seguimiento existentes en vez de duplicarlos.
- Padres/encargados solicitan registrar a sus hijos; dirección revisa y vincula cuentas verificadas. La solicitud no permite consultar progreso por sí sola.
- Añadir una vista familiar que reúna solicitudes, hijos vinculados, tareas asignadas, estado de cumplimiento basado en evidencias y seguimiento privado.
- Envío/recepción de PDF y fotos privados con autorización y revisión institucional; conservar aislamiento de cada estudiante y retirada de acceso al desvincular.
- Estudiantes consultan su información y comunicados autorizados; no administran instituciones ni participan en chats entre estudiantes.

## Pagos
- Consolidar la página existente de pagos con monto anual y estado persistido, SINPE Móvil **+506 60906359**, Max Salazar Sánchez, Banco Popular, detalle «.».
- Comprobante privado y solicitud pendiente: SINPE se activa solo después de revisión manual de Max, nunca por enviar una referencia.
- Verificar proveedor de tarjeta disponible antes de modificarlo; no sustituir una integración activa ni habilitar cobros reales sin pruebas de confirmación y lectura posterior del acceso.
- Identificar qué significa «SIMV» antes de incorporarlo como medio de pago. No inventar compatibilidad bancaria, certificaciones legales ni transacciones de prueba.

## WhatsApp
- Corrección 14:49 UTC: la función familiar es comunicación interna de la aplicación, no WhatsApp externo. Reutilizar canales protegidos con moderación y archivos revisados para familias, docentes y personal autorizado; definir escritura estudiantil frente a la regla vigente de solo lectura antes de ampliarla. Los puntos siguientes aplican únicamente a pedidos externos anteriores.
- Integrar solo contactos adultos institucionales/encargados consentidos; mantener WhatsApp separado de chats estudiantiles.
- No afirmar envío o recepción mientras la cuenta Business siga sin conexión verificada.
- Una vez conectada: plantillas aprobadas cuando corresponda, permisos de envío por institución, enlaces privados con ingreso, bandeja durable de recepción y estados de entrega.
- No importar agendas ni conversaciones automáticamente, ni adjuntar datos de menores a campañas. La aceptación de Meta no equivale a entrega; campañas pueden tener costo.

## Verificación y publicación
- Probar selector en escritorio y teléfono: cuatro modalidades, cambios de nivel, materias con/sin banco y enlaces que mantienen la selección.
- Probar dirección, docente, encargado y estudiante con cuentas autorizadas: institución ajena denegada, vínculo familiar pendiente denegado, estudiante sin edición, archivos privados y revocación.
- Verificar QR de permiso aprobado y consulta pública mínima; SHA-256 no sustituye firma legal ni revela motivos médicos.
- Ejecutar pruebas relevantes y revisar seguridad antes de solicitar publicación del lote comprobado. Guardar los cambios con commit; la plataforma sincroniza el repositorio, sin ejecutar push manual.
- Publicar la primera entrega verificada aunque los servicios externos sigan pendientes, explicando esos límites.

## Detalles técnicos
### Presentación y firma de documentos institucionales
- Unificar los documentos que la institución realmente puede emitir: encabezado del colegio, escudo propio, fecha de emisión en Costa Rica y pie «pracTICAtecnica.com», con TICA mayúscula.
- Distinguir documentos institucionales de certificados independientes de práctica; estos últimos no llevan encabezado gubernamental ni firma atribuida a una dirección.
- Mostrar «Ministerio de Educación Pública» y «Gobierno de Costa Rica» solo tras verificar que el centro puede usar esas menciones; no agregar logotipos oficiales ni presumir autorización por el nombre del colegio.
- Identificar emisor, nombre y cargo de quien aprobó, fecha/hora y espacio opcional para firma manuscrita. No presentar documentos sin aprobación como firmados ni ampliar permisos de subdirección automáticamente.
- Reutilizar el QR y registro SHA-256 existentes donde correspondan; no inventar verificación para carnés, notas o matrícula que todavía no cuenten con un registro autorizado. La consulta pública debe minimizar los datos de menores.
- Aclarar que QR/SHA-256 verifica un registro y su integridad, no es firma digital certificada. Integrar firma digital certificada requiere un proceso separado y validación jurídica.
- Verificar encabezado, escudo, legibilidad impresa, fechas y consulta QR en un documento autorizado antes de extender el formato al resto; no afirmar que los documentos aún no construidos ya están disponibles.

- Selector y URLs usan el catálogo canónico `malla` y metadatos públicos; no importar bancos de respuestas al navegador ni cambiar claves de scoring.
- Reutilizar TanStack Router y controles del sistema visual. Validar selecciones al leer URLs y conservar enlaces existentes por banco.
- Familia y pagos utilizan funciones autenticadas/RPC y políticas existentes; ampliaciones de esquema con permisos explícitos y pruebas de autorización.
- Webhook WhatsApp firmado, inbox persistente, reconciliación idempotente y recuperación antes de declarar la integración completa.

## Dependencias externas
- Conexión WhatsApp Business y verificación de callbacks.
- Proveedor de tarjeta y cuenta de prueba independiente; PayPal actualmente real no se etiqueta como Sandbox.
- Significado de «SIMV» y cuentas autorizadas para verificar cada rol cuando no haya sesión disponible.