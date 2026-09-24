# Autenticación, permisos y correo — contrato de implementación

**Versión 1.0 · 24/09/2026.** Complementa `01_REQUERIMIENTOS_SISTEMA.md` y el modelo de `02_ARQUITECTURA_Y_DATOS.md`. Define el diseño por construir, no una integración ya probada. No contiene credenciales ni SQL para pegar. Ante discrepancias, prevalece el documento 01; registrar y resolver la discrepancia antes de programar.

## 1. Arquitectura y prueba inicial obligatoria

Usar Supabase Auth para contraseñas, identidad, sesiones y MFA; Next.js para las rutas de aplicación; PostgreSQL para permisos/estados/cola; Resend para correo; Supabase Edge Functions y Cron para despacho durable. No implementar un segundo sistema de contraseñas, JWT o TOTP.

Variables públicas: URL de Supabase y clave **publishable**. Variables exclusivamente de servidor: clave **secret** de Supabase, API key de Resend, secreto de webhook y clave de cifrado de temporales/cola. Usar claves actuales del proyecto, no copiar una `service_role` antigua ni exponer secretos con prefijo `NEXT_PUBLIC_`. Separar clientes de usuario y administrativos: una clave administrativa puede omitir RLS, por lo que no debe utilizarse como cliente ordinario de estudiantes [S15].

**Antes de construir pantallas, ejecutar una prueba de contrato contra el proyecto Supabase de pruebas:**

1. Desactivar el registro público de Auth y mantener `Confirm Email` habilitado; proveedores sociales, vinculación manual y acceso anónimo deshabilitados.
2. Verificar que `signUp` público se rechaza y `admin.generateLink(type: signup)` permite aprovisionar desde servidor.
3. Comprobar que una identidad no confirmada no ingresa; `verifyOtp` confirma el token correcto; el reenvío de signup conserva la contraseña; una identidad confirmada no se recrea.
4. Comprobar `session_id`, actualización de contraseña, MFA/AAL2 y cambio seguro de correo con dos confirmaciones. Configurar expiración de tokens de verificación y recuperación a **60 minutos** y comprobar el vencimiento efectivo en el proyecto hospedado; no asumir que cambiar un valor de la aplicación modifica Auth.

La implementación oficial actual separa el bloqueo del endpoint público y la generación administrativa, pero este contrato **debe pasar en la versión hospedada** [S1–S3]. Si falla, detener ese módulo y documentar la incompatibilidad; no habilitar registro público o autoconfirmación como arreglo silencioso.

## 2. Datos autoritativos e invariantes

Un correo normalizado por trim + minúsculas corresponde a un UUID de Auth y un perfil. No quitar puntos ni sufijos `+`. Especialidad inicial es una preferencia: jamás crea una segunda identidad.

Separar estas responsabilidades conforme al modelo del documento 02:

| Entidad lógica | Responsabilidad y acceso |
|---|---|
| Inscripción | Intención durable: ID, correo único, nombre/grupo/especialidad, consentimientos, estado, UUID aprovisionado y versión de credencial. Solo servidor. |
| Credencial temporal | Cifrado autenticado y versión, vinculados a inscripción/UUID; vence y se elimina al cambiar, recuperar, cancelar o expirar. Solo servidor. |
| Acceso de cuenta | Estado, correo verificado, `must_change_password`, expiración temporal, desactivación y `security_epoch`. Solo servidor modifica. |
| Perfil | Nombre, grupo, preferencias. El cliente nunca modifica campos de autorización. |
| Propietario | Singleton con UUID y correo esperado `maxi.salsa@gmail.com`; creado mediante bootstrap privado. |
| Sesión de aplicación | `session_id`, UUID, epoch, scope, vencimiento y revocación. Escritura exclusiva del servidor. |
| Operación de seguridad | Transición durable de cambio/recuperación/correo, fase y resultado saneado; nunca contraseña personal. |
| Outbox | Mensajes, estado de entrega, versión, lease, idempotencia y payload cifrado. Privada. |

Estados de cuenta: `awaiting_verification` → `credential_pending` → `password_change_required` → `active`; `disabled` y `deletion_pending` bloquean acceso desde cualquier estado. `must_change_password` no se deduce de una cookie o mensaje de éxito.

`user_metadata` es editable por el usuario: **no otorga roles, verificación ni permisos**. Tampoco basta un claim de rol antiguo; consultar el estado actual. Todo UUID ajeno a una inscripción válida permanece bloqueado. Una identidad Auth existente sin vínculo confiable de aprovisionamiento no se adopta ni se sobrescribe por volver a escribir su correo [S4].

## 3. Registro y verificación: un solo flujo

### Preparación durable

`POST /api/auth/register` aplica las validaciones del documento 01, límites y consentimiento versionado. Reserva la inscripción mediante unicidad de correo y clave de idempotencia. Repetir la petición conserva la intención; nunca modifica una cuenta activa. El correo propietario se reserva para su circuito privado.

Generar una temporal de al menos 16 caracteres criptográficamente aleatorios, fáciles de copiar. Guardarla cifrada **antes** de aprovisionar Auth, con versión estable. Después llamar desde servidor a `admin.generateLink({type: 'signup', email, password: temporal})`, con origen de retorno permitido. Guardar UUID y token de la respuesta; encolar únicamente el correo de verificación. `generateLink` no envía el mensaje automáticamente [S1].

La temporal se prepara durante el alta, pero no se envía ni autoriza estudio antes de verificar. Un reintento usa la misma credencial durable. Serializar la provisión por inscripción y comprobar que no existe un usuario previo desconocido. Si Auth creó la identidad y se perdió la respuesta, reconciliar usando la intención preexistente y el registro privado de aprovisionamiento; no inferir propiedad desde metadata o nombre. Una asociación ambigua queda bloqueada para recuperación, sin adoptar ni borrar usuarios automáticamente.

### Confirmación humana

El correo enlaza a `/verificar-correo` en el origen HTTPS canónico. El GET presenta «Verificar mi correo» y **no consume el token**. Solo `POST /api/auth/verify-email` lo consume mediante `verifyOtp({token_hash, type: 'email'})`. Comprobar propósito, expiración, contexto y correspondencia del UUID/correo con la inscripción. El navegador no puede escoger libremente el tipo de operación.

Los tokens de verificación y recuperación vencen a los 60 minutos; mostrar el vencimiento y permitir solicitar otro sin repetir el registro. No consumir automáticamente enlaces nativos de confirmación o magic link al cargar una página ni registrar una sesión de aplicación por su GET: las plantillas deben dirigir a la confirmación POST propia. Los enlaces deben abrirse en otro navegador o dispositivo. No depender del Local Storage del navegador que inició el registro. Evitar que tokens lleguen a analítica, logs, recursos externos o mensajes de error; aplicar `no-store` y `Referrer-Policy: no-referrer`. Proteger formularios POST con comprobación de origen y CSRF donde corresponda. El token de correo no sustituye controles de propósito ni de caducidad [S5].

La sesión que devuelve la verificación se descarta/revoca sin entregarla al navegador ni registrarla como sesión de aplicación. Confirmar correo no inicia estudio: el siguiente paso visible es recibir e ingresar la temporal.

### Bienvenida posterior

Tras confirmar en Auth, una transacción marca la verificación, fija expiración temporal a **24 horas desde esa confirmación**, habilita `password_change_required` y crea una orden única de bienvenida por UUID/versión. El worker envía la temporal ya asignada: **nunca llama a `updateUserById(password)` para enviar o reenviar correo**.

Si el proceso cae después de verificar en Auth y antes del commit, el reconciliador consulta el usuario en Auth, comprueba `email_confirmed_at` y la inscripción original, y completa la transición idempotente. Una repetición de token consumido no genera credenciales nuevas; presenta el estado recuperado por contexto autorizado o instrucciones neutras.

## 4. Login, cambio de contraseña y sesiones

### Login controlado

`POST /api/auth/login` valida correo/contraseña con `signInWithPassword`, luego consulta estado autoritativo y correspondencia de identidad. Ninguna contraseña debe sufrir trim o transformación silenciosa; copiarla exactamente. Una temporal vencida conduce a recuperación, no a una cuenta nueva.

Registrar una fila privada `app_sessions` desde el servidor, tomando `session_id` de un JWT verificado. Nunca aceptar `session_id`, UUID, epoch o scope elegidos por el cliente. Scopes mínimos: `password_change`, `mfa_setup`, `mfa_challenge`, `student`, `owner_admin`, `owner_student`. Antes del cambio obligatorio solo se permite cambiar contraseña, salir o solicitar ayuda de acceso.

RLS exige sesión registrada no revocada, UUID coincidente, epoch actual, cuenta habilitada y scope compatible. El login directo contra Auth puede producir un JWT, pero no una fila autorizada de aplicación. Una sesión vieja no recupera acceso al refrescar su JWT: conserva un `session_id` revocado o un epoch anterior [S6].

### Cambio obligatorio

`POST /api/auth/password` recibe nueva contraseña y confirmación, valida 12–128 caracteres conforme a la política compatible de Auth, igualdad y diferencia respecto a la temporal. Permitir pegado/gestores. Crear operación durable antes de llamar Auth; no guardar la contraseña personal ni el cuerpo del formulario.

Actualizar mediante `auth.updateUser({password})` en el contexto autenticado autorizado. Solo una respuesta exitosa de Auth permite completar la operación interna. En una transacción: marcar cambio, quitar `must_change_password`, activar cuenta, incrementar epoch, revocar sesiones anteriores, cancelar bienvenida pendiente y eliminar cifrado temporal. No activar mediante `PASSWORD_CHANGED` emitido por JavaScript ni una afirmación `success:true` del cliente.

Toda finalización y reconciliación compara `operation.expected_security_epoch` con el epoch actual y exige un lifecycle elegible mediante actualización condicional/transacción. `disabled` y `deletion_pending` nunca pasan a `active` por un cambio o recuperación. Si cambia el epoch o estado, cancelar la finalización, no emitir sesión y conservar el bloqueo. Si Auth alcanzó a cambiar la contraseña antes de una desactivación concurrente, la cuenta continúa desactivada; no revertirla para acomodar el resultado de Auth.

Después obtener una **sesión nueva** con `signInWithPassword` y la nueva contraseña, mantenida únicamente en memoria de la petición; registrar su nuevo `session_id` y emitir cookies. Nunca ascender una fila de sesión temporal a estudiante: un JWT viejo de esa sesión heredaría permisos. Si falla el nuevo login después de guardar, indicar cambio completado y pedir ingresar otra vez.

### Fallo parcial Auth → PostgreSQL

Guardar fases como `prepared`, `auth_applied`, `completed` y el identificador de operación. Si Auth respondió éxito y se alcanzó a guardar `auth_applied`, el reconciliador termina los cambios idempotentes. Si cayó antes de registrar evidencia, el estado es **indeterminado**, no éxito ni fracaso inventado.

En ese caso, permitir reingreso con la contraseña que Auth acepte, manteniendo scope restringido. Pedir completar nuevamente dos campos de nueva contraseña y realizar una actualización comprobada antes de desbloquear. Si Auth rechaza reutilizar la misma clave, explicar que debe elegir otra. Esta recuperación excepcional evita guardar contraseñas personales para reintentos y evita activar cuentas por suposiciones. El reconciliador jamás repone una temporal ni reejecuta cambios de contraseña guardados en una cola.

Validar identidad en servidor con `getClaims` o `getUser`; `getSession` por sí solo no autentica cookies. Seguir el BFF del documento 02: todas las operaciones Auth/MFA y la renovación ocurren en servidor, con cookies `HttpOnly`, `Secure` y `SameSite=Lax`. No crear un cliente Auth de navegador que necesite leerlas. Usar `@supabase/ssr`, clientes por petición, refresh compatible con la versión Next.js elegida y sin caché compartida de respuestas privadas [S7].

## 5. Recuperación y cambio de correo

### Recuperación

`POST /api/auth/recover` devuelve respuesta neutra. Para una cuenta válida, generar enlace `recovery` en servidor y enviarlo mediante outbox. Solicitarlo no modifica la contraseña vigente. GET solo muestra confirmación; POST verifica con `verifyOtp(type: 'recovery')` y crea una sesión de aplicación con scope `password_change` y propósito de recuperación registrado por servidor, para escribir dos veces una nueva clave. Para un propietario con factor ya inscrito, mantener scope `mfa_challenge` hasta verificar TOTP/AAL2 y solo entonces autorizar `password_change`; el enlace de correo no reemplaza MFA.

Completar por el mismo circuito de operación de seguridad, epoch y sesión nueva; cancelar temporales y mensajes de bienvenida obsoletos. Si la temporal venció, este flujo establece directamente una clave personal: no rotar temporales desde workers. `exchangeCodeForSession` es para códigos PKCE; no usarlo en lugar de `verifyOtp` con `token_hash`.

### Cambio seguro de correo estudiantil

`POST /api/me/email-change` requiere cuenta activa, sesión vigente, reautenticación reciente, dirección válida/única y confirmación de intención. El propietario no puede cambiar su correo por esta ruta. Guardar operación durable conservando UUID, correo anterior y destino; invocar `auth.updateUser({email: nuevoCorreo})`.

Mantener **Secure Email Change** de Supabase activado: debe confirmar tanto el buzón anterior como el nuevo. Esos mensajes nativos salen por SMTP personalizado Resend; **no duplicarlos en la outbox propia**. Configurar sus plantillas para abrir la página de confirmación de la aplicación; GET no consume y POST usa el tipo nativo `email_change` fijado por servidor. La primera confirmación puede no entregar sesión ni completar el cambio: contemplarlo explícitamente [S8–S9].

Hasta que Auth acredite el nuevo correo final, mantener el anterior en la cuenta. Después, consultando Auth desde servidor y contrastando la operación: actualizar correo normalizado, conservar UUID/progreso, incrementar epoch, revocar sesiones y pedir login con el nuevo correo. Si falla la escritura local, reconciliar desde el cambio final acreditado por Auth, sin crear otra cuenta. Resolver conflictos de unicidad sin sobrescribir identidades.

Perder el buzón anterior conduce a asistencia privada con comprobación de identidad; no retirar la segunda confirmación. Habilitar notificaciones nativas de cambios de contraseña/correo y MFA por Resend SMTP. Cada evento tiene **un único emisor**: las notificaciones nativas no se recrean también en la cola.

## 6. Propietario y aislamiento

Bootstrap mediante comando privado idempotente, ejecutado por quien controla el proyecto, sin endpoint público ni contraseña fija. Vincula un solo UUID al correo propietario y cierra el aprovisionamiento al terminar. Verificación de correo y cambio de contraseña siguen siendo obligatorios; coincidencia de correo, metadata, `superroot` o `maxsalsa` nunca promueve una cuenta.

El primer acceso propietario registra un factor TOTP con `mfa.enroll`; mostrar QR/clave en sesión autorizada, comprobar código con desafío/verificación y exigir JWT `aal2` para administrar. Nombre visible: **PracTICAtecnica.com**. Supabase genera una nueva semilla; no prometer importar la antigua clave de Google Authenticator ni llamarla «API key» [S10].

Cada ruta/RPC administrativa verifica propietario, estado activo, sesión autorizada, scope `owner_admin` y AAL2. Las sesiones sin MFA solo completan configuración/desafío. Recuperar contraseña del propietario no elimina MFA: un factor ya inscrito debe verificarse antes de acciones sensibles. La pérdida de factor se resuelve mediante procedimiento privado auditado del responsable del proyecto, con revocación y nuevo enrolamiento.

«Ver como estudiante» cambia scope mediante servidor a `owner_student`, conserva UUID y utiliza solo intentos propios de prueba. Banner persistente y retorno a administración con comprobación AAL2; no suplanta estudiantes. Esas pruebas se excluyen por defecto de estadísticas del alumnado.

Estudiantes solo ven sus perfiles, intentos, respuestas, resultados y progreso. El UUID se deriva del JWT, no del formulario. RLS protege también consultas directas y Storage. Helpers privados con privilegios mínimos y `search_path` fijado; no funciones privilegiadas arbitrarias expuestas. Los secretos, claves correctas y outbox no son legibles por estudiantes [S4].

## 7. Correo durable, límites y mensajes

Remitente: dominio/subdominio verificado de PracTICAtecnica.com; `Reply-To: maxi.salsa@gmail.com`. SPF/DKIM/DMARC según registros reales de Resend, TLS y enlaces HTTPS canónicos. El correo de desarrollo de Supabase no satisface producción. No afirmar que configurar SMTP confirma entrega institucional [S11].

Estados de mensaje:

| Estado | Significado |
|---|---|
| `queued` | Persistido; espera despacho o próximo reintento. |
| `processing` | Worker con lease vigente. |
| `accepted` | Resend aceptó; llegada todavía sin confirmar. |
| `delivered` | Evento válido acredita aceptación del servidor receptor, no lectura. |
| `bounced` / `complained` | Rebote o queja; aplicar supresión, no reintentar indiscriminadamente. |
| `failed` | Error permanente o agotamiento de reintentos. |
| `expired` / `cancelled` | Token vencido o mensaje invalidado por transición posterior. |

Persistir antes de enviar. Despacho inmediato mediante invocación esperada y respaldo **cada minuto con Supabase Cron/pg_net → Edge Function** protegida; secretos en Vault/variables privadas. No usar tareas sueltas después de responder ni depender del cron de Vercel Hobby [S12].

Reclamo atómico y leases con identificador de trabajador; lotes pequeños, serialización por inscripción y deduplicación por clave estable. Reintentos a 1/5/15/60 minutos, respetando `Retry-After`, cuotas y expiración. El mismo envío mantiene payload e idempotency key. Un reenvío voluntario crea otro mensaje con la misma temporal vigente. Consultar estado/versión inmediatamente antes de enviar; un mensaje ya aceptado puede llegar tarde, pero su clave invalidada no concede acceso.

Los payloads sensibles de mensajes se eliminan al confirmar aceptación, vencer o cancelar. **La temporal cifrada vive separada** hasta cambio/vencimiento/cancelación para permitir reenvío sin rotación. Una respuesta de proveedor perdida se trata como incierta: consultar ID disponible o reintentar con la misma clave, sin generar otra contraseña. La idempotencia del proveedor tiene ventana limitada; la base mantiene deduplicación propia [S13].

Webhook Resend verifica firma sobre cuerpo crudo, timestamp/replay e ID de evento. Acepta eventos repetidos/desordenados sin retroceder de estado por un evento antiguo. No convierte una entrega en correo verificado: únicamente la prueba de posesión verifica la cuenta. Logs sin tokens, temporales, cuerpos de correo ni secretos [S14].

**Límites compartidos en base de datos:** cinco fallos consecutivos de login bloquean cinco minutos; éxito reinicia contador. Aplicar también límites por IP sin bloquear indiscriminadamente una red escolar. Reenvío/recuperación: una solicitud por minuto y tres por quince minutos por correo; límites IP configurables. El endpoint devuelve tiempo restante y respuesta neutra. No usar memoria de una instancia serverless para estos contadores.

La pantalla indica recepción pendiente y acción siguiente: «El correo puede tardar unos minutos. Revise entrada y spam o correo no deseado». No decir «entregado» por ausencia de pendientes. Ante fallo, conservar solicitud y ofrecer reintento. Administración muestra destino, propósito, fecha, estado y error saneado; nunca contraseñas. Estado estudiantil solo mediante contexto propio autorizado, sin enumeración de correos.

## 8. Contratos de rutas y aceptación

Además de las rutas descritas: `POST /api/auth/resend`, `/api/auth/logout`, `/api/auth/mfa/enroll`, `/api/auth/mfa/verify`, `/api/auth/confirm-email-change`; `POST /api/owner/view-mode`; webhook y worker separados de rutas de estudiantes. Los GET de confirmación solo presentan interfaz. Respuestas consistentes con código de negocio, mensaje y siguiente acción; ninguna devuelve tokens administrativos o datos de otra cuenta.

La implementación no está lista hasta demostrar:

1. Contrato inicial Auth completo, registro abierto solo a través de aplicación y metadata sin privilegios.
2. Dos registros/clics/reenvíos concurrentes: una identidad, una temporal, sin duplicar perfil.
3. Verificación en otro navegador; GET de escáner no consume; token vencido/repetido con salida comprensible.
4. Temporal funciona, cambio doble obligatorio; API directa y JWT anteriores no evitan RLS.
5. Cortes antes/después de Auth y commits: conciliación o recuperación restringida; ningún éxito falso.
6. Worker retrasado nunca cambia contraseña; bienvenida cancelada tras recuperación/cambio.
7. Estudiante A no consulta B; desactivación/revocación corta acceso; owner AAL1 no administra; owner AAL2 y vista estudiantil respetan scope.
8. Cambio de correo requiere ambos buzones, conserva UUID/progreso y no duplica mensajes; fallos parciales reconciliados.
9. Pruebas reales autorizadas de verificación, bienvenida, login y cambio en Gmail y `@mep.go.cr`, documentando envío y recepción. Mocks no prueban entrega real.

## Fuentes primarias

- **S1:** https://supabase.com/docs/reference/javascript/auth-admin-generatelink
- **S2:** https://raw.githubusercontent.com/supabase/auth/master/internal/api/mail.go y https://raw.githubusercontent.com/supabase/auth/master/internal/api/signup.go — comportamiento revisado, sujeto a versión.
- **S3:** https://supabase.com/docs/guides/auth/general-configuration
- **S4:** https://supabase.com/docs/guides/database/postgres/row-level-security
- **S5:** https://supabase.com/docs/reference/javascript/auth-verifyotp
- **S6:** https://supabase.com/docs/guides/auth/sessions
- **S7:** https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs
- **S8:** https://supabase.com/docs/reference/javascript/auth-updateuser
- **S9:** https://supabase.com/docs/guides/auth/auth-email-templates
- **S10:** https://supabase.com/docs/guides/auth/auth-mfa y https://supabase.com/docs/reference/javascript/auth-mfa-enroll
- **S11:** https://supabase.com/docs/guides/auth/auth-smtp y https://resend.com/docs/send-with-supabase-smtp
- **S12:** https://supabase.com/docs/guides/functions/schedule-functions
- **S13:** https://resend.com/docs/dashboard/emails/idempotency-keys
- **S14:** https://resend.com/docs/webhooks/verify-webhooks-requests
- **S15:** https://supabase.com/docs/guides/getting-started/api-keys

Los estados adicionales, sesiones de aplicación, plazos y mecanismos de conciliación son decisiones de este proyecto; Supabase no los implementa automáticamente. Fijar versiones, probar contratos y registrar resultados antes de producción.
