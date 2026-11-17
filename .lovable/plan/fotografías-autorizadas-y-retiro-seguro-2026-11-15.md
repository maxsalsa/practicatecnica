# Fotografías autorizadas y retiro seguro

## Matrícula: dos finalidades separadas
- **Fotos del colegio:** adjuntos con nombre del edificio o aula, descripción y compromiso de que la persona tiene autorización para aportarlas. Permanecen privadas hasta revisión institucional; no se publican automáticamente en Campaña Clara ni en canales.
- **Identificación privada:** fotos del estudiante y de familiares destinadas a matrícula y seguridad. Consentimiento específico de uso interno, separado del permiso para difusión de imágenes del centro.
- Conservar SHA-256 de cada archivo guardado y registrar finalidad, consentimiento, versión del texto, cuenta y fecha. El hash verifica integridad, no identidad.

## Personas propuestas para retirar al estudiante
- Permitir al encargado presentar personas propuestas con nombre, identificación, parentesco y fotografía privada opcional.
- Guardarlas como **pendientes de revisión**, nunca como autorizadas automáticamente.
- Dirección o personal expresamente autorizado revisa el vínculo y la documentación antes de habilitar retiro; permitir rechazo y revocación con motivo e historial.
- La foto facilita la comparación visual, pero el retiro exige comprobación de identificación y autorización vigente según el procedimiento del centro. Sin reconocimiento facial automático.

## Acceso y protección
- La familia consulta sus propios datos; revisores solo expedientes de su institución.
- El personal encargado del retiro ve únicamente información mínima de personas autorizadas y estudiantes asignados, mediante permiso explícito. No recibe acceso general a cédulas, recibos o expedientes médicos.
- Estudiantes, otras familias y público no acceden a estas fotos ni identificaciones. Ningún QR público contiene datos del menor o permite abrir fotos familiares.
- Distinguir aportar una imagen, aprobar su uso interno y autorizar su publicación. El consentimiento de matrícula no autoriza difusión pública.

## Detalles técnicos
- Reutilizar formulario y archivos privados de matrícula; ampliar validación de finalidad y consentimiento en cliente y servidor.
- Personas propuestas y decisiones en registros privados separados del manifiesto inmutable de documentos, para permitir revocación auditada sin reescribir solicitudes anteriores.
- Permisos por institución y función, manteniendo prohibición de autoaprobación y superadministración exclusiva de Max.
- No introducir reconocimiento facial, CDN público para fotos familiares ni permisos derivados del perfil elegido en el formulario.

## Verificación
- Pruebas: una foto o hash no concede retiro; consentimiento interno no concede publicación; familia ajena y personal no asignado no acceden; revocación bloquea retiro.
- Revisar presentación desde teléfono y escritorio.
- El flujo real de aprobación y retiro requiere cuentas identificadas y autorización del centro; no crear identidades ni documentos ficticios para afirmar que está verificado.

## Material que falta
- Fotografías originales autorizadas del colegio y nombres de edificios/aulas para cargar imágenes reales.
- Personas concretas y cuentas autorizadas para comprobar revisión y retiro reales. El formulario podrá recibirlas; no se asignarán personas por suposición.