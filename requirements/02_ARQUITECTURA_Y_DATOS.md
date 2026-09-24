# Arquitectura, modelo de datos y contratos de implementación

Versión 1.0 · 24/09/2026. Documento de diseño para construir la aplicación; todavía no es una implementación. Las reglas de negocio de `01_REQUERIMIENTOS_SISTEMA.md` prevalecen. El protocolo detallado de identidad y correo está en `05_AUTENTICACION_Y_CORREO.md`.

## 1. Stack y responsabilidades

| Componente | Decisión |
|---|---|
| Aplicación | Next.js App Router, TypeScript estricto y React; versiones estables mantenidas al empezar, fijadas en lockfile. No canary ni dependencia de `latest` en CI. |
| Despliegue | Vercel; entorno de pruebas separado de producción. Runtime Node para BFF y criptografía compatible, sin convertir todo a Edge. |
| Identidad | Supabase Auth: correo/contraseña, confirmación, recuperación y MFA TOTP nativo. No hashes propios, PHP, MySQL ni TOTP casero. |
| Datos | PostgreSQL de Supabase; migraciones SQL pequeñas, ordenadas y versionadas. Supabase CLI como herramienta de esquema; tipos generados de la base. No añadir Prisma como segunda autoridad del esquema. |
| Autorización | RLS, funciones transaccionales y capa de acceso a datos de servidor. Identidad firmada + estado de cuenta + sesión autorizada + permisos por operación. |
| Documentos | Supabase Storage privado, URLs firmadas de 60 segundos como máximo. |
| Correo | Resend, cola persistente y webhooks; SMTP personalizado de Auth con el mismo proveedor para eventos nativos. |
| Trabajo diferido | Supabase Cron cada minuto y Edge Function protegida; procesamiento inmediato esperado cuando sea posible. Vercel no conserva procesos residentes. |
| UI | Tailwind CSS, primitivas accesibles Radix/shadcn revisadas y tokens propios; iconos coherentes. No mezclar varias bibliotecas completas de componentes. |
| Validación y pruebas | Zod para contratos; Vitest para reglas; pruebas PostgreSQL/RLS; Playwright para flujos; axe para apoyo a accesibilidad. |
| Código | Repositorio GitHub privado, pnpm y Node LTS compatibles y fijados. CI antes de despliegue. |

La interfaz habla con Route Handlers/Server Actions del propio sitio. El BFF mantiene sesiones mediante cookies seguras, `HttpOnly`, `SameSite=Lax` y HTTPS; todas las operaciones de Auth/MFA pasan por servidor. No usar un cliente Auth del navegador que necesite leer esas cookies ni mezclar este patrón con tokens persistidos en localStorage. El servidor renueva sesiones según el SDK y valida identidad con `getUser` o `getClaims`, además del estado autoritativo de aplicación; no confía solo en `getSession`.

Usar el JWT de la persona para consultas y RPC ordinarias, de modo que RLS siga actuando. La clave secreta privilegiada solo sirve para aprovisionamiento, reconciliación y trabajos expresamente autorizados. Marcar sus módulos `server-only`. Nunca exportarla a un Client Component, action payload, bundle, `.env.example` o registro.

La protección de una página en middleware no protege automáticamente su API. La capa de acceso a datos vuelve a comprobar cada operación; el navegador recibe DTO mínimos y explícitos.

## 2. Organización que debe construir la IA

| Ruta de repositorio | Contenido |
|---|---|
| `src/app/(public)/` | Portada, acceso, registro, confirmación, recuperación, condiciones y privacidad. |
| `src/app/(student)/` | Espacio de estudio, perfil, materiales, pruebas, revisión y progreso propios. |
| `src/app/(owner)/` | Seguimiento, cuentas, estado de correo, configuración y edición editorial. |
| `src/app/api/` | Contratos de este documento; webhook y rutas de identidad según 05. |
| `src/components/` | Sistema visual, formularios, diálogos, selector de especialidad, preguntas y gráficos accesibles. |
| `src/lib/server/` | DAL, clientes Supabase separados, autorización, validación, correo y claves; solo servidor. |
| `src/lib/domain/` | Reglas puras, tipos y validadores compartibles que no contengan secretos ni bancos. |
| `supabase/migrations/` | Tablas, constraints, funciones, RLS, Storage y configuración de trabajos. |
| `supabase/functions/` | Worker de correo/reconciliación y limpieza autorizada con tareas acotadas. |
| `scripts/` | Verificación de entorno, importación, bootstrap privado, revisión de despliegue y respaldos. |
| `content-source/` | Copia de `contenido/` en repositorio privado o entrada privada del importador; nunca bajo `public/`. |
| `tests/` | Unitarias, integración, concurrencia, RLS y E2E; fixtures ficticios exclusivos de pruebas. |
| `public/` | Iconos, manifest, recursos públicos y worker sin información personal. |
| `docs/` | Instalación breve, operación, recuperación, fuentes, decisiones y resultados de QA. |

Es una estructura objetivo, no archivos ejecutables existentes en este ZIP. Un módulo debe tener una responsabilidad; no reintroducir parches con varias implementaciones de login, correo o conteo.

## 3. Convenciones PostgreSQL

- UUID para identidades y entidades; códigos de especialidad como texto estable (`3006`), forma como `A`–`E`. No convertir el código a ordinal de visualización.
- Fechas `timestamptz` en UTC; formato de presentación `America/Costa_Rica`. Texto Unicode UTF-8. Importes no aplican porque no hay pagos.
- Esquema `public` solo para contratos seguros expuestos por Data API. Esquema `private` no expuesto para autorización, secretos, respuestas correctas y trabajos. Revocar permisos por defecto y conceder los mínimos explícitos.
- RLS en toda tabla expuesta con datos privados y también en tablas internas de estudiantes accesibles por funciones. No confiar en que una URL sea difícil de adivinar.
- Columnas auditables `created_at`, `updated_at` cuando corresponda; FK, NOT NULL y CHECK expresan invariantes. Migraciones no dependen de un trigger genérico que active cuentas desde `user_metadata`.
- Índices sobre todas las FK consultadas y sobre filtros/paginación; `user_id, specialty_code, form_code, created_at` para historial; `state,next_attempt_at` para trabajos.

## 4. Entidades mínimas

La IA escribirá el DDL exacto a partir de este contrato. No es obligatorio que todos los nombres coincidan si documenta una equivalencia completa; sí deben conservarse las relaciones, unicidad, privacidad y restricciones.

| Entidad | Campos y restricciones esenciales | Acceso |
|---|---|---|
| `auth.users` | Identidad gestionada por Supabase. No replicar password hash en aplicación. | Auth/Admin API, nunca frontend directo de administración. |
| `private.registrations` | UUID, email normalizado UNIQUE, nombre/grupo, especialidad inicial, consentimiento, estado, UUID Auth vinculado, operación de provisión/versiones, fechas y error saneado. | Servidor de registro; nunca lista pública. |
| `private.account_access` | `user_id` PK/FK Auth, email normalizado UNIQUE, lifecycle, verified_at, must_change_password, credential_version, temporary_expires_at, password_changed_at, security_epoch, flags de desactivación. | Servidor y helpers mínimos. |
| `private.platform_owner` | PK constante `singleton=1` con CHECK; `user_id` UNIQUE/FK, correo esperado `maxi.salsa@gmail.com`, fecha de bootstrap. | Solo aprovisionamiento privado; jamás role editable del perfil. |
| `private.app_sessions` | `session_id` PK del JWT verificado, user_id, epoch, scope, expires_at, last_activity_at, revoked_at. | Servidor; RLS consulta helper booleano. |
| `private.credential_secrets` | user/registration id + versión UNIQUE, temporal cifrada, key_version, nonce/tag según cifrado, expires_at y fase de operación. | Worker controlado; purga al cambiar/vencer/cancelar. |
| `public.profiles` | user_id PK/FK, display_name, group_label, preferred_specialty FK, theme `system/light/dark`, fechas. Sin role ni flags de seguridad. | Persona propia activa; propietario AAL2 según modo. UPDATE mediante lista permitida. |
| `private.consents` | user/registration id, tipo, versión, fecha, evidencia mínima y versión de aviso. | Propia a través de exportación segura; administración autorizada. |
| `public.specialties` | code PK, slug UNIQUE, nombre, sigla, orden, publicado. | Lectura pública solo publicadas; escritura propietario. |
| `public.areas` | id PK, specialty_code FK, source_index, título, orden; UNIQUE(specialty,source_index). | Catálogo público saneado. |
| `public.forms` | specialty + code PK, título, mode `practice/pro`, total CHECK=60, publicado. FK compuestas. | Metadatos públicos, sin claves de respuestas. |
| `private.questions` | id estable, specialty FK, source_form, source_id, source_hash; UNIQUE(specialty,source_form,source_id). | Editorial/selección de servidor. |
| `private.question_versions` | question_id + version UNIQUE, área, indicador, dificultad, nivel, idioma, stem, 4 opciones con IDs estables, correct_option_id, explanation, distractor explanations, source_metadata, estado editorial, fechas. | Sin SELECT directo de estudiantes. |
| `private.blueprint_versions` / `blueprint_quotas` | forma + versión UNIQUE; grupos área/indicador/dificultad + cantidad; sumatoria de cuotas =60 validada al publicar. | Selección/editorial privada. |
| `private.material_versions` | specialty, kind `tabla/libro`, versión, bucket/key, filename, mime, bytes, sha256, procedencia, estado. Una versión publicada por especialidad/tipo. | Metadatos seguros por RPC; objetos privados. |
| `public.attempts` | id UUID, user_id, specialty/form, ordinal CHECK 1..5, mode, blueprint_version, state `open/submitted`, total=60, answered_count 0..60, started_at, submitted_at, owner_preview. UNIQUE(user,specialty,form,ordinal). | Solo propio o propietario autorizado. **No poner aquí claves, aciertos ni nota oculta.** |
| `private.attempt_items` | attempt_id + position 1..60 PK, question/version, snapshot inmutable completo, option_permutation, correct answer y explicaciones. UNIQUE(attempt_id,question_id). | RPC retorna proyección segura según estado. |
| `public.attempt_responses` | attempt_id + position PK/FK, option_id elegido, confirmed_at, operation_id. Sin is_correct ni explicación. | Lectura propia; escritura solo por comando autorizado. |
| `public.attempt_flags` | attempt_id + position PK/FK, flagged boolean, updated_at. | Propio, actualización controlada; no altera respuestas. |
| `private.attempt_grades` | attempt_id PK, correct_count, incorrect_count, omitted_count y fecha de cálculo final. Restricciones coherentes total=60. | RPC filtra resultados mientras simulacro abierto. |
| `private.email_outbox` / `email_events` | Definición de 05; claves de idempotencia, estado, payload cifrado, lease, fencing, provider ID y evento único. | Worker y panel propietario saneado. |
| `private.operation_jobs` | Operaciones recuperables de provisión, cambio de acceso, borrado e importación; idempotencia UNIQUE, pasos/lease/error saneado; en operaciones de seguridad, expected_security_epoch y estados previos permitidos para compare-and-swap. | Servidor, sin passwords personales. |
| `private.rate_limits` | Clave HMAC de cuenta/IP, ventana, contador, blocked_until y expiración. | Servidor compartido, no memoria de una instancia. |
| `private.settings` | singleton: inscripción abierta, release/content_release, límites no sensibles, ventana gratuita y estado de comprobaciones. Sin API keys editables en interfaz ordinaria. | Proyección pública mínima y escritura propietaria. |
| `private.audit_events` | actor UUID opcional, operación, entidad pseudonimizada cuando proceda, resultado, fecha y request_id. Nunca contraseña/token/contenido completo de correo. | Consulta propietaria; retención aprobada. |

`attempts` requiere índice UNIQUE parcial `(user_id,specialty_code,form_code) WHERE state='open'`. Contador separado opcional con la misma clave y bloqueo transaccional. `MAX(ordinal)+1` sin bloqueo no satisface el requisito.

La nota se calcula a partir de enteros. No guardar un porcentaje editable como fuente de verdad. El resumen de progreso es una consulta o vista segura derivada; si se materializa por rendimiento, actualizarlo en la misma transacción y disponer de reconstrucción verificable.

## 5. Autorización y proyecciones seguras

Helpers conceptuales:

Scopes canónicos: `password_change`, `mfa_setup`, `mfa_challenge`, `student`, `owner_admin`, `owner_student`. No añadir otro flag de vista que pueda contradecir el scope. Una recuperación usa `password_change` con propósito de recuperación acreditado en la operación privada.

1. `current_app_user()` valida UUID/JWT, sesión registrada, epoch, expiración y cuenta; no acepta user_id de un formulario. Sesiones de aplicación: máximo absoluto de 24 horas para estudiantes y 8 horas para propietario, sin extenderlo al refrescar JWT; propietario tras 30 minutos de inactividad debe volver a autenticarse y verificar MFA. Estas son decisiones de aplicación, no una promesa de prestaciones del plan de Auth.
2. `can_study()` exige email confirmado, cuenta activa, cambio de temporal completado y scope `student`, `owner_admin` u `owner_student`, según identidad. Propietario también necesita AAL2.
3. `can_administer()` añade singleton propietario, AAL2 y scope `owner_admin` de la sesión.
4. `can_view_attempt(id)` exige pertenencia propia; como excepción, propietario con `can_administer()`. En vista estudiantil del propietario se permiten solo sus intentos.

Toda finalización de operación de seguridad compara el epoch esperado con el actual y comprueba estado previo elegible. Una desactivación o borrado simultáneos no se revierten a `active` por conciliación tardía; cancelar esa finalización y no emitir sesión.

Las funciones `SECURITY DEFINER` tienen `search_path=''`, nombres de esquema cualificados, permisos EXECUTE mínimos y autorización explícita interna. Revocar EXECUTE por defecto de `PUBLIC`. Las funciones de worker/Admin no son ejecutables por `authenticated`. Las vistas de datos de estudiantes usan `security_invoker=true` cuando corresponda; evitar vistas que omitan RLS.

Un estudiante no obtiene SELECT de snapshots completos ni claves de preguntas. No basta con RLS por fila: esconder resultados de simulacro exige separar columnas privadas y DTO seguros. Antes de finalizar D/E, ninguna respuesta HTTP/RSC, precarga, gráfico, CSV, error o caché contiene `correct_option_id`, `is_correct`, nota, explicación o distractores evaluados.

Storage no tiene políticas de lectura pública. `POST /api/materials/:id/access` verifica `can_study` y genera enlace corto del objeto publicado; no acepta un `path` arbitrario enviado por cliente. Validar archivo PDF real, limitarlo a 20 MiB inicialmente y poner nuevas subidas en cuarentena hasta revisión: sin JavaScript embebido, acciones Launch ni adjuntos ejecutables. Los PDF originales se conservan sin alteración en la fuente; una sanitización aprobada genera una versión derivada con hash propio y trazabilidad.

## 6. Operaciones de pruebas: límites de transacción

### Iniciar o retomar

Una RPC, con usuario derivado de JWT: bloquear la clave persona/especialidad/forma; comprobar cuenta y publicación; devolver intento abierto si existe; rechazar si ya hay cinco; obtener versión de blueprint y pool publicado del mismo modo; construir 60 selecciones por cuota y priorizar menor exposición histórica de esa persona; desempatar y mezclar con aleatoriedad de servidor; permutar opciones; insertar intento y 60 snapshots atómicamente. Confirmar solo al tener todo. Si una cuota es imposible, rollback total sin consumir intento.

Se cuenta como vista una pregunta asignada a cualquier snapshot previo de esa persona/especialidad, incluso si no la respondió. Se consideran todos sus intentos retenidos; una sola especialidad permite como máximo 25 con las reglas iniciales. No compartir esta preferencia de exposición entre estudiantes. No mezclar pools de guided/pro ni escoger por posición global del banco.

La selección puede ejecutarse dentro de PL/pgSQL con funciones aleatorias criptográficas disponibles y permisos acotados, o mediante una operación servidor que confirme todo atómicamente en PostgreSQL. Si se calcula fuera, la RPC verifica cuotas, unicidad y versiones antes de commit y resuelve correctamente carreras. No enviar selección/correctas al navegador para que las vuelva a guardar.

### Confirmar respuesta

Bloquear intento y posición; comprobar propiedad, estado abierto y opción del snapshot. Si ya está confirmada con la misma opción, devolver resultado previamente guardado; si es diferente, conflicto 409. Guardar y actualizar contador en la misma transacción. Para práctica, devolver feedback de esa posición; si llega a 60, finalizar/calificar. Para simulacro, solo acuse de guardado; queda abierto hasta entregar. Un estado final gana frente a una respuesta que llegue tarde.

### Entregar

Bloquear intento; una entrega repetida retorna la revisión final existente. Calcular correctas contra snapshot, incorrectas entre confirmadas y omitidas=60−confirmadas; guardar resultado final y fecha una sola vez. Nota final=correctas×100/60 con dos decimales; no dividir entre confirmadas al cerrar parcialmente. “No respondidas” aparece separado aunque puntúe 0. Una carrera entre confirmar/entregar debe corresponder a un orden serial posible, nunca una nota diferente al contenido guardado.

### Revisar y medir progreso

Práctica abierta: feedback solo de posiciones confirmadas; posiciones sin respuesta no revelan clave. Simulacro abierto: no feedback ni nota, tampoco al propietario en el detalle de esa prueba para mantener un único contrato. Cualquier intento final: revisión completa autorizada. El propietario sí puede ver respuestas guardadas y avance de otros, sin cambiar su evaluación.

Gráfico por área suma respuestas confirmadas con feedback revelable; repeticiones cuentan como nuevas respuestas. Ordenar por porcentaje de error descendente; desempate por número de errores y orden curricular. Mostrar numerador/denominador y aviso de evidencia inicial con menos de cinco. No deducir dominio curricular de una sola pregunta.

## 7. Contratos HTTP y estados visibles

Todas las mutaciones autenticadas comprueban origen/CSRF y entradas. `Idempotency-Key` para crear/confirmar/entregar/invitar y trabajos sensibles. Persistir claves ligadas a actor+operación+hash de payload; la misma clave con otro payload es 409. No mantener datos de idempotencia con secretos. Para confirmación, la unicidad de posición conserva el resultado incluso tras expirar la caché de idempotencia.

| Método y ruta objetivo | Entrada / salida mínima | Regla |
|---|---|---|
| `POST /api/auth/register` | Nombre, grupo, email, especialidad, consentimientos → 202 y contexto opaco | Nunca devuelve password, user ID ajeno ni existencia de cuenta. |
| `POST /api/auth/verify-email` | Token/ref opacos → siguiente paso | 05: POST explícito, no auto-login de estudio. |
| `POST /api/auth/resend` | Contexto autorizado o email → 202 neutro | Rate limits, mismo secreto vigente, cuenta activa no cambia. |
| `POST /api/auth/login` | Email y password → `password_change`, `mfa` o `app` | Cookies emitidas por servidor, sin token en JSON. |
| `POST /api/auth/password` | Nueva y confirmación | Sesión restringida/activa autorizada, operación recuperable y sesión nueva. |
| `POST /api/auth/recover` | Email → 202 neutro | No cambia password al solicitar. |
| `POST /api/auth/recovery/confirm` | Token → sesión de recuperación limitada | No crea acceso de estudio. |
| `POST /api/auth/logout` | Sin datos de identidad | Revoca sesión local y Auth, limpia cliente. |
| `/api/auth/mfa/*` | Enrolar/desafiar/verificar | Ver 05; propietario exclusivo, rate limits, ninguna desactivación pública. |
| `GET /api/me` | Perfil propio + acciones permitidas + release | Sin secretos, controles autoritativos. |
| `PATCH /api/me` | Solo nombre/grupo/tema/especialidad válida | No roles, email verificado ni estado. |
| `POST /api/me/email-change` | Correo nuevo + reautenticación | Confirmación de ambos buzones y UUID estable. |
| `POST /api/me/data-export` | Confirmación/reautenticación | Exportación privada propia, excluye secretos y claves no revelables. |
| `POST /api/me/deletion-request` | Confirmación/reautenticación | Borrado recuperable o solicitud trazable según política; nunca owner. |
| `GET /api/catalog` | Catálogo público, conteos disponibles, release | Sin bancos ni configuraciones privadas. |
| `GET /api/specialties/:code/overview` | Documentos, formas, disponibilidad y progreso propio | Usuario activo. |
| `POST /api/materials/:id/access` | Abrir/descargar → URL corta | Verificar objeto publicado y permisos. |
| `POST /api/attempts` | specialty_code, form_code → intento creado/retomado | Ordinal independiente, transacción y 5 máximo. |
| `GET /api/attempts/:id` | Metadatos, mapa de estado/marcas | Propio o propietario autorizado, sin claves ocultas. |
| `GET /api/attempts/:id/items/:position` | Pregunta segura y respuesta guardada | Feedback solo si permitido. |
| `POST /api/attempts/:id/responses` | position, option_id, operation_id → guardado | No acepta is_correct, grade ni otro user_id. |
| `PUT /api/attempts/:id/flags/:position` | flagged → marca | No afecta avance/nota. |
| `POST /api/attempts/:id/submit` | Confirmación → revisión final | Idempotente, transacción. |
| `GET /api/progress?specialty=...` | Métricas explícitas e historial paginado | Solo persona actual. |
| `/api/owner/students` y `/:id/*` | Listado filtrado, invitación, edición, disable, delete | Todas las operaciones comprueban propietario AAL2; no endpoint de promoción. |
| `/api/owner/tracking` / `/export` | Paginación/filtros y CSV seguro | Excluye owner por defecto; mismos filtros en exportación. |
| `/api/owner/content/*` | Borradores, validación, publicación/versiones | Sin alterar snapshots; impedir publicar blueprint imposible. |
| `/api/owner/mail/*` | Estados saneados, reintento y prueba | Sin secretos; tipos/transiciones permitidos. |
| `/api/owner/settings` / `/health` | Configuración no sensible, checks, release | Solo propietario, nunca eco de variables de entorno. |
| `POST /api/owner/view-mode` | `student/admin` | Misma identidad, require AAL2 al regresar. |
| `POST /api/webhooks/resend` | Cuerpo crudo y firma | Sin sesión de navegador; autenticación criptográfica del proveedor. |

Los nombres pueden adaptarse a convenciones Next.js, manteniendo un único contrato documentado. No publicar Swagger con endpoints de bootstrap o secretos.

Respuestas de error uniformes: `{ "error": { "code": "ATTEMPT_LIMIT_REACHED", "message": "Ya utilizó sus cinco intentos en esta prueba.", "requestId": "…" } }`. Códigos 400 validación; 401 sesión requerida; 403 operación no permitida; 404 recurso ajeno/inexistente cuando corresponda para evitar enumeración; 409 conflicto; 429 límite con `Retry-After`; 503 dependencia temporal no disponible. Nunca devolver 200 con texto “Error” que el cliente trate como éxito.

Pregunta segura ilustrativa: `{position:1, stem:"…", options:[{id:"o2",text:"…"},…], selectedOptionId:null, confirmed:false, flagged:false, feedback:null}`. Tras confirmar práctica, feedback incluye resultado y explicación de esa posición; tras entregar, revisión autorizada puede incluir las correctas. Los IDs de opciones no deben codificar si son correctas.

## 8. Importación de contenido y equivalencias

No importar un dump MySQL a PostgreSQL. Crear el esquema nuevo y leer los JSON del paquete. El código PHP, sesiones viejas y hashes anteriores no se trasladan. Tipos y relaciones se convierten explícitamente:

| Fuente | Destino / validación |
|---|---|
| Código de especialidad | PK de texto, preservada. |
| `forms` A–E | Cinco formas con modo obtenido del catálogo; verificar 60 entradas. |
| `id` del ítem | Parte de clave compuesta con especialidad/forma; no es global. |
| `area` | Índice base cero del catálogo → FK del área; no sumar/restar sin mapa. |
| `level` | Números 10/11/12 o nombres Décimo/Undécimo/Duodécimo → entero validado; conservar original en metadata. |
| `indicator`, `indicatorText`, `page` | Referencia y texto originales; no confundir número de pregunta con indicador. |
| `options` y `answer` | Cuatro opciones con IDs estables; `answer` 0–3 → ID correcto. |
| `distractors` | Claves de índice original → IDs de opción. Puede faltar; no inventar explicaciones. |
| `language` | Preservar cuando exista; normalización documentada cuando falte, con idioma de especialidad y revisión de excepciones. |
| `difficulty` | Mapear Básica/Media/Alta a enum estable sin alterar cuotas. |
| Otros campos | `source_metadata`, incluyendo `official_indicator` cuando exista y `origin`. |
| PDF | Objeto privado con hash y tipo correspondiente; nombre legible y versión. |

Importación en lotes de máximo 100 ítems, con checkpoint por lote y transacción. Las relaciones y snapshots usan IDs internos; source key/hash permiten upsert idempotente de la misma versión. Si cambia un hash de contenido ya publicado, el importador crea propuesta de versión, no sobrescribe historial. Un dry-run informa conteos, relaciones y diferencias sin escribir en DB ni Storage. No imprimir claves de respuestas en un diagnóstico público.

## 9. Observabilidad, capacidad y recuperación

Una release de aplicación desde `package.json`/commit y una release de contenido desde manifiesto. La pantalla de propietario informa ambas. No comparar el hash de un icono como condición para impedir login. El chequeo privado informa errores útiles sin paths internos sensibles.

Registrar request ID y métricas de latencia/errores sin cuerpo sensible. Alertas para fallos repetidos de envío, cola vencida, cuota, tareas paradas, error de importación, bloqueos y denegaciones anómalas. “No hay pendientes” no equivale a recepción comprobada.

Límite inicial de listados: 25 filas, máximo 100 por petición; búsqueda parametrizada y escape apropiado. Exportaciones grandes mediante trabajo y archivo privado temporal, no una petición que cargue todas las filas en memoria. Sesiones, cuentas y PDFs no se guardan en caché compartida; catálogo público y assets sí, versionados.

Respaldo de DB y Storage antes de cambios estructurales y con cadencia operativa aprobada. Restaurar en proyecto aislado y probar conteos/permisos. Las migraciones siguen expandir → actualizar código/datos → contraer cuando sea seguro; revertir frontend no revierte automáticamente una migración destructiva.

## 10. Fuentes técnicas

- Next.js, capa de acceso/seguridad: https://nextjs.org/docs/app/guides/data-security
- Supabase, clientes SSR: https://supabase.com/docs/guides/auth/server-side/creating-a-client
- RLS y limitaciones de metadata/JWT: https://supabase.com/docs/guides/database/postgres/row-level-security
- Migraciones: https://supabase.com/docs/guides/deployment/database-migrations
- Sesiones: https://supabase.com/docs/guides/auth/sessions
- Storage: https://supabase.com/docs/guides/storage/security/access-control
- Supabase Cron: https://supabase.com/docs/guides/cron

Esta arquitectura añade controles para fallos observados en el proyecto anterior. Su viabilidad debe demostrarse con la prueba de contrato Auth/correo y las pruebas RLS antes de construir el resto de pantallas. Si una API mantenida no soporta un paso, la IA documenta el hallazgo y conserva la regla de negocio; no disimula una función incompleta con éxito visual.
