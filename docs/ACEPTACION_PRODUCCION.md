# Aceptación del entorno publicado

Estas comprobaciones requieren el entorno real. Registre fecha, release, resultados y evidencias saneadas. No marque una integración aprobada porque compile. La matriz completa está en requirements/04_MATRIZ_ACEPTACION.md.

| Prueba | Comprobación requerida |
|---|---|
| Configuración | Proyecto/URL/claves coherentes, ningún secreto público. |
| Propietario | Correo real, cambio de temporal y MFA. La reserva no evita estos controles. |
| Registro | Datos → enlace → confirmación POST → temporal recibida → login restringido → nueva clave dos veces. |
| Escáner de correo | GET/vista previa no consume verificación. |
| Gmail y MEP | Recepción real autorizada en ambos tipos de buzón; ID, demora y rebote si existe. |
| Reintento | Sin cuentas duplicadas ni cambios de clave de cuentas activas; ningún job reinstala temporales. |
| Recuperación | Solicitar no cambia contraseña; completar invalida sesiones anteriores según política. |
| RLS | Dos estudiantes no consultan/alteran datos del otro, incluso API/RPC directa. |
| MFA/vistas | AAL1 no administra; AAL2 sí. Vista estudiantil usa misma identidad y permite regresar. |
| Contenido | 7 especialidades, 35 pruebas, 2.100 ítems y 14 PDF comprobados. |
| Intentos | Límite 5 independiente por persona/especialidad/prueba; concurrencia no duplica. |
| Corrección | A/B/C retroalimentan al confirmar; D/E ocultan resultado/clave hasta entregar. |
| Persistencia | Recarga conserva orden/opciones/respuestas/marcas. Desconexión no finge guardado. |
| Seguimiento | Coincide con cuenta estudiantil; propietario excluido por defecto. |
| Editorial | Versiones, borradores, publicación/retiro y restauración; historial intacto. |
| PWA | Instalación según navegador; caché sin Auth/API/perfil/respuestas/PDF privados. |
| UX | 360/390 px, tableta/escritorio, teclado, zoom 200%, claro/oscuro y diálogos. |
| TLS/DNS | Dominio y www correctos, canónico y certificado desde dos redes. |
| Safe Browsing | Estado independiente comprobado; reportes resueltos por procedimiento apropiado. |
| Worker | Petición sin secreto rechazada, Cron activo y recuperación de fallo ensayada. |
| Webhook | Firma/replay controlados; accepted no equivale a delivered ni read. |
| Cuotas | Límites y alertas de proveedores conocidos. |
| Backup | Copia cifrada íntegra y restauración completa ensayada en entorno aislado. |
| Carga | 50 concurrentes, latencias/errores documentados y sin pérdida/mezcla de respuestas. |
| Privacidad | Responsable, contacto, consentimiento/menores, retención y derechos revisados. |

No abrir a estudiantes reales si falla aislamiento, autenticación, correo, privacidad o recuperación. Puede revisar interfaz y usar datos ficticios en un entorno de pruebas mientras resuelve esos puntos.
