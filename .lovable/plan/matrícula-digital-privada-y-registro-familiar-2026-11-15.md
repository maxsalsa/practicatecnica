# Matrícula digital privada y registro familiar

## Prioridad 1: cero papel, sin duplicar la matrícula existente
- Ampliar «Matrícula digital» con datos del padre, madre o encargado: nombre, correo, teléfono y relación con el estudiante.
- Conservar datos del estudiante, institución, nivel y consentimiento.
- Permitir adjuntar identificaciones, fotografías y recibos con categoría y descripción. Almacenar todo de forma privada, vinculado a la solicitud y su familia.
- Validar los archivos y quitar metadatos de ubicación de las fotografías antes de guardarlas.
- Mostrar documentos recibidos, fecha y estado: pendiente, aprobado o rechazado. Los adjuntos no activan acceso ni aprueban matrícula automáticamente.

## Prioridad 2: aprobación y seguimiento
- La familia consulta únicamente sus solicitudes y documentos; el personal revisor consulta solo su institución con los permisos existentes.
- Conservar la prohibición de aprobar solicitudes propias.
- Registrar decisiones y cambios con fecha y persona responsable.
- Tras la revisión, vincular las cuentas verificadas del estudiante y encargado. Seleccionar un perfil en el formulario no concede roles ni acceso a datos de otra persona.
- Mantener superadministración exclusiva de Max. Dirección, docentes y familias reciben facultades delimitadas.

## Verificación SHA-256
- Calcular en el servidor la huella de los archivos realmente guardados y registrar su tamaño y tipo.
- Distinguir huella de archivo de huella de aprobación: la matrícula ya calcula una huella cuando se aprueba, pero no verifica el contenido binario de cada adjunto.
- Mostrar verificación dentro del expediente autorizado; no publicar cédulas, teléfonos, nombres de menores ni documentos mediante QR público.
- SHA-256 y QR no equivalen a firma digital certificada ni aval oficial.

## Validación de la entrega
- Probar guardado, consulta posterior, rechazo y aprobación con cuentas autorizadas de familia y revisión.
- Probar que otra familia no puede consultar archivos ni solicitudes ajenas, y que el estudiante no puede concederse permisos.
- Comprobar el formulario desde teléfono y escritorio y ejecutar las pruebas de reglas.
- No crear matrículas reales ni asignar roles a personas no identificadas para simular una prueba.

## Detalles técnicos
- Reutilizar `enrollment_requests`, `review_enrollment` y el almacenamiento privado `enrollment-files`.
- Añadir registros de adjuntos y eventos de revisión con permisos explícitos y políticas por solicitud, familia e institución.
- Mantener archivos bajo institución/encargado, sin CDN público para identificaciones o recibos.
- Las operaciones que verifican archivos y guardan huellas usan funciones autenticadas y validación de propiedad en el servidor.
- Reutilizar perfiles y acceso existentes; datos de contacto familiares privados separados de los perfiles de presentación.

## Pendientes externos y siguiente entrega
- Fotos de edificios y aulas: faltan originales autorizados y sus nombres; no usar imágenes inventadas como fotografías del centro.
- Asignación a director, docentes y padres reales: faltan cuentas concretas y autorización para cada asignación.
- Pruebas PDF: identificar materia, nivel, preguntas de los planes de estudio y firmante autorizado antes de emitir un documento firmado.
- Gráficos de rúbricas: requieren registros estructurados por indicador e historial; permanecerán privados y separados de notas verificadas, aunque se acceda desde Campaña Clara.

Esta entrega conserva las páginas y módulos existentes y no introduce un rediseño radical ni cambia la política de pagos.