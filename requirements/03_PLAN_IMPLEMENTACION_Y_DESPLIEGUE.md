# PracTICAtecnica.com — plan de implementación y despliegue

**Fecha de referencia:** 24 de septiembre de 2026.  
**Estado:** plan por ejecutar. Este paquete no contiene la aplicación Next.js nueva ni acredita que los scripts, integraciones o pruebas descritos ya existan.  
**Autoridad funcional:** `01_REQUERIMIENTOS_SISTEMA.md`; diseño técnico en `02_ARQUITECTURA_Y_DATOS.md`; protocolo de identidad/correo en `05_AUTENTICACION_Y_CORREO.md`; cierre mediante `04_MATRIZ_ACEPTACION.md`.

## 1. Resultado y decisiones operativas

Construir una aplicación Next.js con **App Router y TypeScript estricto**, en repositorio **GitHub privado**, desplegada en **Vercel**. Utilizar **Supabase PostgreSQL, Auth, MFA TOTP nativo y Storage**, y **Resend** para correo. La cola persistente de correo reside en PostgreSQL; un worker en Supabase Edge Functions la procesa. **Supabase Cron** ejecuta el respaldo de despacho cada minuto. No sustituirlo por Vercel Hobby Cron, que no ofrece esa frecuencia [S01–S09, S14].

La nueva base empieza con **cero estudiantes y cero progreso**. Se importan contenidos, no cuentas, hashes de contraseña, semillas TOTP ni tablas MySQL. Solo existe una identidad propietaria: `maxi.salsa@gmail.com`, ligada a un UUID verificado y a una fila singleton protegida. Grupo/sección es un dato descriptivo del estudiante, no un permiso. No añadir administradores secundarios ni acceso institucional por cursos.

El sitio anterior se conserva con respaldo y, durante el cambio definitivo, en modo de solo lectura hasta la aceptación. **Este plan no autoriza ni ejecuta una limpieza hoy.** Ningún script nuevo debe conectarse a MySQL para borrar datos, eliminar archivos del hosting antiguo o convertir una migración de contenidos en migración de identidades.

Cada hito termina con un **gate de aceptación**: evidencia guardada, resultado y pendientes identificados. Una pantalla bonita no compensa un gate de seguridad o correo fallido. M2 debe aprobarse antes de desarrollar la interfaz completa; M0–M6 y los requisitos P0/P1 deben aprobarse antes de abrir el servicio.

## 2. Hitos y gates

| Hito | Trabajo obligatorio | Gate para avanzar |
|---|---|---|
| **M0 · Contenido y base del repositorio** | Leer los requisitos y las notas de contenido. Inventariar catálogo, bancos y PDF; verificar `SHA256SUMS.json`. Crear repositorio privado, estructura Next.js, lockfile, versiones compatibles fijadas y CI inicial. Preparar importador con `--dry-run`, lotes, claves estables y reporte por archivo/forma/ítem. | Inventario de **7 especialidades, 35 formas, 2.100 entradas y 14 PDF**; explicación de hallazgos y derechos/procedencia pendientes. Validación de cuatro opciones, clave y referencias, con dry-run reproducible. Ningún contenido privado incluido en `public/`. |
| **M1 · PostgreSQL, Storage y RLS** | Implementar el modelo de 02: identidades, estado autoritativo, propietario singleton, contenido versionado, blueprints, snapshots, intentos, respuestas y operaciones/outbox. Migraciones cortas, ordenadas y versionadas; buckets privados y RPC mínimas. | Reconstrucción reproducible en base local vacía e importación repetida sin duplicados. Pruebas negativas directas contra tablas, vistas, RPC y Storage con visitante, dos estudiantes, propietario AAL1/AAL2 y cuenta desactivada. Ni correo ni `user_metadata` conceden privilegios. Secretos, claves de respuesta y tablas internas no quedan expuestos. |
| **M2 · Prueba de concepto de Auth y correo** | Implementar pantallas mínimas funcionales y el flujo completo de verificación explícita, temporal, cambio obligatorio, recuperación y MFA. Configurar Resend, SMTP Auth, outbox, worker, Cron, webhooks y seguimiento. Aprovisionar el propietario de manera privada. | Superar todas las pruebas del apartado 3, incluidas recepción real autorizada en Gmail y `@mep.go.cr`, concurrencia y fallos parciales. Guardar evidencias saneadas. Si Supabase no permite cumplir un punto, documentar la incompatibilidad y resolverla antes de continuar; no afirmar que una redirección de UI lo cumple. |
| **M3 · Estudio y progreso** | Mi espacio, todas las especialidades, PDF privados, A/B/C guiadas y D/E simulacros. Selección por cuotas originales, menos vistas y mezcla persistida. Intentos 1–5 independientes, respuestas inmutables tras confirmar, retomar, entrega y estadísticas. | Siempre 60 ítems y cuotas exactas; un solo intento abierto por persona/especialidad/forma. Dos peticiones concurrentes no duplican intento, ordinal, confirmación ni entrega. Recarga conserva snapshot. Simulacro no filtra resultados antes de entregar. Cálculo y progreso coinciden con 01; no hay temporizador de cierre inventado. |
| **M4 · Administración y estética** | Gestión completa de estudiantes, seguimiento, CSV seguro, correo observable y edición editorial versionada. Vista estudiantil de la misma cuenta propietaria. Unificar componentes, temas, tarjetas/PDF, gráficos, formularios y diálogos. | MFA requerido también en la vista estudiantil del propietario; su actividad excluida del seguimiento por defecto. Eliminación recuperable protege el UUID propietario. Edición no cambia intentos históricos. Pruebas a 360/390/768/1440 px, zoom 200 %, teclado y claro/oscuro; estados vacíos, errores y recuperación accesibles. |
| **M5 · PWA y transición de caché** | Manifest, iconos, instalación según navegador, pantalla offline y service worker limitado a recursos públicos versionados. Implementar transición del antiguo `/sw.js`. | Inspección de cachés sin auth, API, datos personales, respuestas, bancos ni PDF privados. Logout y Atrás no muestran al usuario anterior. Ensayar una instalación antigua y una nueva; actualización no pierde respuestas, cierra un intento ni recarga en medio de una respuesta sin permiso del usuario. La app requiere Internet para estudiar y guardar. |
| **M6 · Producción y aceptación** | Ejecutar CI completa, carga, restauración, corte DNS, TLS, correo real y regresión final. Entregar manual de Max, inventario de cuentas/servicios, costos, diagnóstico y procedimiento de rollback. | Matriz de aceptación aprobada, prueba de 50 concurrentes y p95 documentado según 01, sin mezcla/pérdida de respuestas; restauración de base y archivos ensayada. URL canónica y correo operativos, revisión de privacidad/menores resuelta, release identificable. Mantener el sistema anterior preservado hasta aceptación explícita. |

Los informes de cada gate deben indicar commit, entorno, versión de contenido, fecha, resultado y límites de la prueba. Se proponen `qa/M0_contenido.md` a `qa/M6_produccion.md` como **archivos que la implementación deberá crear**, sin capturas de tokens, contraseñas ni secretos.

## 3. Gate M2: resolver acceso y correo antes de completar la UI

### 3.1 Inscripción y temporal

Probar la secuencia exacta de 01: inscripción idempotente → enlace → pantalla de confirmación → acción POST explícita → comprobación de posesión → temporal aleatoria → bienvenida → login restringido → contraseña definitiva. Un GET, robot de correo o vista previa no verifica al usuario. Dos confirmaciones concurrentes no generan dos cuentas ni dos temporales.

Comprobar vencimiento de 24 horas y `must_change_password` en servidor/RLS incluso con llamadas directas a Auth y con JWT vigente. **La expiración del permiso de usar la temporal no debe presentarse como una capacidad nativa de expiración de contraseñas de Supabase sin demostrarla.** Un cambio directo en Auth tampoco permite que el cliente quite flags protegidos. La transición oficial debe recuperarse de un fallo entre actualizar Auth y registrar el cambio en PostgreSQL.

Probar correos existentes, reenvíos limitados, confirmaciones repetidas, token vencido, recuperación pendiente y cambio de correo conservando UUID/progreso. La recuperación no cambia la contraseña al solicitarla; al completarse, impide que un worker atrasado reinstale o envíe una temporal obsoleta e invalida los accesos anteriores exigidos en 01.

Validar los cinco fallos/cinco minutos y los límites de reenvío en almacenamiento compartido. Revisar expresamente la superficie directa de Supabase: limitar solo la ruta Next.js no demuestra que Auth no pueda eludirse. Registrar cómo se aplica AUT-10 en el sistema real y cualquier incompatibilidad; no ocultarla bajo pruebas que solo visitan la interfaz.

### 3.2 Propietario único y MFA

El bootstrap es una operación privada, inicialmente con inscripciones cerradas. Comprueba proyecto destino, dirección exacta y correo confirmado mediante un flujo real de posesión; no marca verificado un buzón solo porque aparezca en una variable. Vincula ese UUID a la única fila propietaria mediante una operación transaccional. Si ya existe una fila, una identidad diferente o una cuenta no verificable, se detiene sin reemplazarla. Repetirlo con la misma identidad es seguro.

Inscribir una **nueva entrada TOTP nativa de Supabase**, escanearla y verificar un código antes de habilitar administración. No importar la semilla anterior de Google Authenticator ni llamarla API key. Una sesión propietaria AAL1 solo puede completar MFA/contraseña o salir; las operaciones administrativas y la vista estudiantil del propietario necesitan AAL2. Verificarlo en servidor y base de datos [S04].

La pérdida del factor requiere un procedimiento privado de recuperación: comprobar control autorizado del proyecto Supabase e identidad propietaria, bloquear operaciones privilegiadas durante la recuperación, revocar accesos anteriores pertinentes, restablecer el factor mediante las capacidades administrativas vigentes, reinscribir y verificar TOTP, y registrar auditoría sin secretos. No crear un endpoint público que quite MFA por conocer el correo, ni deshabilitar MFA globalmente para recuperar una cuenta.

### 3.3 Despacho, reintentos y evidencia

El flujo propio utiliza Resend API y outbox; los mensajes gestionados por Auth usan el SMTP personalizado de Resend. Documentar cuál de los dos caminos produce cada plantilla para evitar envíos dobles. Configurar SPF/DKIM y la política DMARC con los valores reales del proveedor y la zona DNS autoritativa [S05, S08].

Después del commit, activar despacho inmediato con el mismo reclamo exclusivo usado por el worker. **Supabase Cron + `pg_net` invoca la Edge Function cada minuto**, con secretos de invocación en Vault y función protegida. Una publishable key identifica al proyecto pero no autoriza por sí sola despachar correo: exigir un secreto propio de worker validado en servidor. No exponer al cliente la cola, los payloads ni un endpoint abierto de envío [S06–S07].

Probar leases, recuperación de worker caído, idempotencia, espera 1/5/15/60 minutos, cuotas, `Retry-After`, vencimientos y supresiones. Cifrar los payloads de correo con temporal/token y purgarlos al aceptar, vencer o cancelar; no regenerar credenciales en cada reintento. Tras eliminar el payload aceptado, un reenvío solicitado es una nueva operación controlada, no reconstrucción de un secreto borrado. La conservación de material operativo separado para reconciliar credenciales sigue el protocolo de 05. Inyectar errores entre Auth, PostgreSQL y Resend.

Validar firma de webhook sobre cuerpo crudo, replay y event ID. Distinguir `accepted`, `delivered`, rebote y fallo según 01: ninguno garantiza lectura ni bandeja principal. Las pruebas en Gmail/MEP requieren destinatarios autorizados y registro de recepción real. Cron cada minuto es recuperación operativa, **no garantía de entrega en un minuto ni exactamente una vez**. En caso de pausa de Supabase o cuota agotada, conservar la cola y mostrar estado fiable.

## 4. Repositorio, entornos y automatización que se deben construir

### 4.1 Organización propuesta

| Directorio futuro | Responsabilidad |
|---|---|
| `src/app/` | Rutas App Router públicas, autenticadas, de propietario y endpoints necesarios. |
| `src/components/` | Componentes accesibles, tokens y temas compartidos. |
| `src/lib/server/` | Capa de acceso a datos, validación, autorización y operaciones que nunca se empaquetan para navegador. |
| `supabase/migrations/` | Migraciones pequeñas, revisadas y ordenadas; sin credenciales ni datos reales de estudiantes. |
| `supabase/functions/` | Worker de outbox y funciones delimitadas según 02. |
| `scripts/` | Preparación, importación, bootstrap, diagnóstico, respaldo y restauración. |
| `tests/`, `qa/` | Pruebas de negocio, RLS y E2E; informes saneados por gate. |
| `.github/workflows/` | CI, release ordenada y respaldos programados. |

Usar pnpm, Node LTS y versiones estables compatibles fijadas en lockfile, según 02; documentar las seleccionadas al implementar. El BFF corre en Node, con Auth/MFA a través del servidor y cookies HttpOnly; no crear un segundo flujo Auth en el navegador. No actualizar dependencias indiscriminadamente en producción. Aislar el cliente administrativo Supabase: sus claves elevadas omiten RLS, por lo que cada operación que lo use necesita autorización explícita; no usarlo para servir toda petición estudiantil [S01–S03, S07].

### 4.2 Separación de entornos

| Entorno | Datos y configuración |
|---|---|
| Local y CI de PR | Supabase local efímero, fixtures ficticios y proveedor simulado. Sin secretos de producción y sin envíos a usuarios reales. |
| Preview de PR | URL Vercel de revisión con backend de prueba aislado o funcionalidad sin mutaciones hasta disponer de él. Nunca apuntar previews arbitrarios a producción. No exponer secretos a PR no confiables. |
| Staging | Proyecto Supabase distinto de producción, destinatarios de prueba permitidos y datos sintéticos. Las pruebas de una PR que modifique esquema se aíslan localmente; no migran simultáneamente un staging compartido. |
| Producción | Proyecto Supabase nuevo, configuración propia, contenido validado y propietario verificado. Sin importación de alumnos antiguos ni fixtures; pruebas reales controladas identificadas expresamente. |

Con dos proyectos Supabase Free se pueden reservar staging y producción, mientras PR usa Supabase local. Esto depende de cuotas y uso; no implica disponibilidad garantizada. Un backend remoto por PR puede requerir recursos adicionales de pago. No ampliar el costo ocultamente para llamar “aislado” a un entorno compartido.

Definir URL canónica y redirecciones Auth exactas por entorno. No permitir callbacks arbitrarios ni reutilizar secretos. La clave de firma de webhook y el destino de correo de staging deben distinguirse de producción. Mantener producción cerrada a inscripciones hasta terminar los gates.

### 4.3 Contrato de scripts futuros

**Todos los nombres siguientes son propuestas que Claude o la persona desarrolladora debe implementar y probar. No son comandos disponibles en este paquete.** Deben tener ayuda, salida saneada, códigos de error y validación del entorno; las mutaciones muestran antes el proyecto destino. La intervención inicial consiste en crear/conectar cuentas y guardar secretos, no en pegar bloques SQL extensos.

| Script propuesto | Contrato esperado |
|---|---|
| `setup:check` | Comprueba herramientas, variables presentes sin imprimir valores, conexión, referencias de proyecto, versión y permisos; falla antes de escribir si detecta incoherencia. |
| `setup:project` | Prepara configuración no secreta, extensiones, buckets y parámetros soportados mediante CLI/API. Idempotente; enumera cualquier paso de consola que no pueda automatizarse. No compra planes ni cambia DNS. |
| `db:migrate` | Ejecuta migraciones versionadas con Supabase CLI. En CI parte de base local vacía; en remoto verifica historial y aplica solo pendientes. Nunca ejecuta `db reset` contra staging o producción. |
| `content:validate` / `content:import` | Verifica hashes y reglas, admite `--dry-run`, importa lotes repetibles y genera reporte; sube PDF privados y comprueba conteos/hashes. No modifica el origen para ocultar errores. |
| `owner:bootstrap` | Vincula solo la identidad legítima verificada al singleton; falla ante discrepancias. No exporta contraseñas ni factor TOTP. |
| `mail:configure` / `mail:smoke` | Configura capacidades API/CLI soportadas, instala un único Cron, valida endpoint protegido y prueba destinatarios autorizados. Distingue enviado/aceptado/recibido; no envía a una lista de estudiantes. |
| `release:check` | Comprueba build, migraciones, contenido, permisos, cron, variables, ausencia de fixtures y gates; emite informe del commit. |
| `backup:run` / `restore:verify` | Exporta base y objetos, cifra, calcula hashes y guarda manifiesto privado; restaura en entorno aislado y valida integridad. Nunca restaura sobre producción por defecto. |

La CLI aplica archivos SQL mantenidos por el repositorio, no instrucciones para que Max copie y pegue consultas. Separar creación de estructuras, políticas y cambios de datos en unidades revisables. Evitar migraciones que mezclen ampliación y eliminación de columnas en un solo salto; conservar compatibilidad con la release anterior cuando se requiera rollback [S09].

### 4.4 CI y release

En cada PR: instalación reproducible, TypeScript, lint, build, pruebas unitarias de reglas, reconstrucción local de schema/RLS, fixtures, E2E críticos, búsqueda de secretos y revisión de vulnerabilidades aplicables. Fijar las acciones de terceros a versiones controladas. No imprimir `.env`, payloads de correo ni dumps en logs.

En staging y producción: un único workflow por entorno, con concurrencia controlada, comprueba destino → crea respaldo previo cuando hay datos → aplica migraciones → importa cambios de contenido necesarios → verifica → despliega funciones/worker y Next.js → smoke tests. Evitar que el despliegue automático de Vercel publique la app antes de terminar la migración: configurar un solo mecanismo de promoción ordenada. Si falla una etapa, detener la promoción; no continuar con un estado aparentemente verde.

Para la promoción de producción usar credenciales restringidas al entorno y mecanismo de autorización de release disponible en el plan contratado. No dar por hecho que GitHub Free privado incluye todos los controles de aprobación o protección de ramas. El README deberá dejar un procedimiento corto verificable para Max [S10].

## 5. Variables, secretos y respaldos

Los nombres son el contrato propuesto de la implementación. `.env.example` contiene solamente nombres y valores ficticios. Las variables públicas son visibles en el navegador; no son una protección de acceso. Usar claves Supabase publishable/secret vigentes y documentar compatibilidad; no copiar ciegamente ejemplos antiguos `anon/service_role` [S07].

| Nombre o grupo | Clase y ubicación | Regla |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Públicos; Vercel por entorno | Pueden llegar al cliente; exigen RLS correcta. |
| `NEXT_PUBLIC_APP_URL` | Público; URL canónica por entorno | No derivar enlaces sensibles de una cabecera Host no confiable. |
| `APP_ENV`, `SUPABASE_PROJECT_REF`, ID de proyecto Vercel | Configuración operativa; CI/Vercel | No secretos, pero determinan el destino; contrastarlos antes de mutar. |
| `SUPABASE_SECRET_KEY` | Secreto; servidor Vercel y función que lo necesite | Nunca `NEXT_PUBLIC_*`, Git ni navegador; usar alcance mínimo y rotación. |
| `SUPABASE_ACCESS_TOKEN`, credencial DB para CLI | Secretos; GitHub y terminal privada autorizada | Solo preparación/migraciones/backups; no deben formar parte del runtime cliente. |
| `RESEND_API_KEY` | Secreto; worker y operaciones servidor que envíen | SMTP Auth se configura en Supabase; no colocar credenciales SMTP en formularios estudiantiles. |
| `RESEND_WEBHOOK_SECRET` | Secreto; backend receptor | Verificación sobre cuerpo crudo; distinto en staging/producción. |
| `EMAIL_PAYLOAD_ENCRYPTION_KEY` | Secreto versionado; backend/worker | Rotación documentada y conservación de claves necesarias para descifrar trabajos y respaldos vigentes. |
| `MAIL_WORKER_SECRET` | Secreto; Vault y Edge Function | Autorización específica de invocación; no equivale a la clave pública de Supabase. |
| `MAIL_FROM`, `MAIL_REPLY_TO` | Configuración del proveedor | Remitente verificado propuesto de 01; Reply-To del propietario. |
| Credenciales y clave de cifrado de respaldo | Secretos; workflow y custodia separada | No guardar junto al dump sin protección ni en un bucket público. |

El UUID propietario es configuración privilegiada guardada en PostgreSQL, no un privilegio elegible en un formulario. La dirección prevista puede constar en la configuración, pero nunca sustituye la comprobación de identidad.

**Respaldo operativo a implementar:** GitHub Actions programado y ejecución manual, exportación de PostgreSQL compatible con la versión y copia separada de objetos Storage; cifrado antes de salir, manifiesto con hashes y retención aprobada. Usar un destino privado fuera del proyecto de producción y una copia bajo control de Max; su provisión y costo quedan explícitos antes de abrir. No guardar datos de estudiantes en commits, artifacts públicos o releases. La política de retención de copias debe acompañar la de borrado del sistema.

Probar restauración completa en proyecto aislado y documentar qué configuración Auth, identidades, archivos y secretos debe recuperarse por separado. Supervisar fecha del último respaldo válido, errores, cuotas y antigüedad de la cola. No considerar el workflow exitoso prueba de restaurabilidad. Las copias de PostgreSQL administradas por Supabase **no incluyen los objetos Storage** [S11].

## 6. Dominio, corte y rollback

**Registrador: Hostinger. Autoridad DNS indicada en el traspaso: Infinity.** Registrar el dominio en Hostinger no significa que su editor DNS sea la zona efectiva. Antes de tocar registros, consultar NS y SOA públicos de `practicatecnica.com`, contrastarlos con los paneles y guardar una exportación de la zona vigente. Esta comprobación debe hacerse al ejecutar el cambio; el presente documento no es una inspección DNS en vivo.

1. Mantener intacto el hosting anterior; respaldar sus archivos y base con acceso privado autorizado. Registrar cómo se pone en solo lectura sin destruir datos. Preparar el nuevo sitio en URL de staging y luego en la URL Vercel de producción, con inscripciones cerradas.
2. Añadir `practicatecnica.com` y `www.practicatecnica.com` al proyecto Vercel. Elegir el primero como canónico y configurar la redirección de `www`. Obtener del panel los valores exactos y actuales de A/CNAME; no usar una IP copiada de una guía vieja.
3. Modificar los registros web en **la zona que resulte autoritativa**. Si aún es Infinity, hacerlo allí. Si se decide trasladar DNS a Hostinger, primero reproducir y validar toda la zona, incluidos MX, SPF, DKIM, DMARC y TXT; cambiar nameservers es una operación distinta y no necesaria para alojar la web en Vercel [S12].
4. Verificar por resolutores independientes los registros, ausencia de destinos A/AAAA conflictivos, dominio canónico, redirecciones, certificado para las variantes y renovación. Probar URLs Auth, webhook, PDF firmado y `/sw.js`; conservar correo y verificaciones. HSTS solo después de validar los dominios necesarios.
5. Congelar escritura del sitio anterior durante el corte. Abrir inscripciones nuevas únicamente después de smoke tests y gates. Registrar hora, DNS anterior/nuevo, commit, versiones y operador. No migrar cuentas antiguas durante este paso.
6. Si falla la release, cerrar nuevas escrituras y volver a una versión de aplicación compatible. Si el problema requiere volver DNS al destino anterior, mantenerlo de solo lectura y avisar del estado; no crear dos sistemas activos que reciban progreso independiente. Conservar lo escrito en Supabase; no restaurar una base antigua por rutina ni hacer rollback destructivo del esquema.

Una vez aceptado el sistema nuevo, Max puede decidir por separado la conservación o retirada del antiguo. Hasta entonces no cancelar hosting, borrar MySQL ni eliminar los respaldos.

**TLS y Safe Browsing se comprueban por separado.** Vercel puede emitir certificados cuando DNS esté correcto, pero una migración no elimina una advertencia de phishing. Si existe un reporte, revisar URLs y causas en Search Console, corregir y solicitar revisión. Google decide el resultado/plazo; no prometer reparación ni declarar el dominio limpio sin evidencia [S12–S13].

## 7. Costos y límites publicados al 24 de septiembre de 2026

Valores en USD como referencia, no cotización ni garantía de permanencia. Revisar paneles y condiciones al contratar. “Acceso gratuito durante 2026” describe el precio al estudiante; no significa operación sin costo ni elegibilidad automática para Hobby.

| Servicio | Precio/límite verificado | Consecuencia para este proyecto |
|---|---|---|
| **GitHub Free** | Repositorios privados; 2.000 minutos Actions/mes en cuenta personal. Funciones privadas de protección/aprobación dependen del plan [S10]. | Medir CI y backups; no asumir todos los controles de equipos de pago. |
| **Vercel Hobby** | USD 0/mes; uso personal no comercial. No conecta repos de organizaciones Git. Cron: 100 jobs/proyecto, cada job como máximo diario, sin minuto exacto [S14]. | Confirmar elegibilidad real. Desarrollo pagado puede contar como comercial. No utilizar su Cron para outbox. |
| **Vercel Pro** | Base publicada USD 20/mes; consumo adicional, asientos o impuestos pueden variar el total [S14]. | Presupuesto inicial si el uso es comercial o requiere capacidades no incluidas en Hobby. |
| **Supabase Free** | USD 0/mes; dos proyectos activos, 500 MB DB, 1 GB Storage, 5 GB egress y 5 GB cached egress. Pausa tras una semana de inactividad; sin backups automáticos incluidos [S15]. | Piloto condicionado; revisar tamaño real de 14 PDF y consumo. Cron no convierte Free en servicio con disponibilidad garantizada. |
| **Supabase Pro** | Desde USD 25/mes; crédito que cubre una Micro y copias diarias de DB con siete días de retención [S15]. | El cálculo base cubre una Micro, no staging remoto adicional gratis. Storage necesita respaldo aparte. |
| **Supabase Auth SMTP** | Servicio predeterminado solo para miembros del equipo y actualmente dos mensajes/hora; custom SMTP parte de 30/hora ajustables [S05]. | Configurar SMTP Resend antes del piloto y ajustar límites probados sin superar los del proveedor. |
| **Resend Free** | USD 0/mes; 3.000 correos/mes y 100/día [S08]. | Una matrícula concentrada puede agotar el cupo diario aunque quede mensual. Mostrar cola, no falsificar entrega. |
| **Resend Pro** | Base publicada USD 20/mes para 50.000 correos, sin límite diario publicado del Free; extras según tarifa [S08]. | Activar solo si volumen/operación lo requieren y reflejar costo; siguen existiendo límites técnicos y filtros receptores. |

**Límite del costo cero:** es posible un piloto que encaje en las condiciones y cuotas gratuitas; no cubre renovación del dominio, respaldo externo, soporte, impuestos ni disponibilidad garantizada. Vercel Pro + Supabase Pro tiene una base orientativa de **USD 45/mes con una Micro**; con Resend Pro serían **USD 65/mes**, antes de staging adicional, consumo y otros gastos. No presentar esos valores como una factura máxima.

Configurar alertas de consumo, cuota de correo y cola atrasada. Revisar spend caps/controles reales de cada plan; no prometer que un aviso impedirá cualquier cargo. No generar actividad artificial para eludir pausas ni crear proyectos/cuentas para sortear límites.

## 8. Privacidad y datos de menores en Costa Rica

La Ley 8968 contempla información previa, consentimiento del titular o representante cuando corresponda, finalidad, calidad, seguridad y derechos de acceso, rectificación y supresión. Antes del uso abierto, definir responsable y contacto, campos mínimos, retención, seguimiento visible para el propietario y trámite de derechos. Validar con una persona competente la atención de menores, representación y base jurídica; conservar evidencia y versión del aviso. Un checkbox no certifica cumplimiento.

Revisar contratos, encargados, regiones y transferencias internacionales de Vercel, Supabase y Resend. Valorar con PRODHAB o asesoría competente si la base requiere inscripción; no afirmar que toda base educativa está inscrita, exenta o debe inscribirse por usar la nube. Confirmar derechos de distribución de libros y PDF antes de publicar. Los plazos de retención propuestos en 01 son decisiones operativas pendientes de validación, no plazos legales certificados.

Este plan ofrece requisitos de implementación y fuentes oficiales; **no es asesoramiento jurídico ni certificación de cumplimiento** [S16].

## 9. Fuentes verificadas

Fuentes primarias consultadas el 24/09/2026. Las reglas del producto proceden de 01; los enlaces acreditan capacidades, límites o contexto y no sustituyen las pruebas del código nuevo.

- **S01 · Next.js:** [seguridad y capa de datos](https://nextjs.org/docs/app/guides/data-security); [PWA](https://nextjs.org/docs/app/guides/progressive-web-apps).
- **S02 · Supabase SSR:** [cliente e identidad de servidor](https://supabase.com/docs/guides/auth/server-side/creating-a-client).
- **S03 · Supabase permisos:** [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security); [acceso Storage](https://supabase.com/docs/guides/storage/security/access-control).
- **S04 · Supabase MFA:** [TOTP nativo](https://supabase.com/docs/guides/auth/auth-mfa/totp); [aplicación de MFA en DB y servidor](https://supabase.com/docs/guides/auth/auth-mfa).
- **S05 · Supabase SMTP:** [restricciones y configuración](https://supabase.com/docs/guides/auth/auth-smtp).
- **S06 · Supabase Cron:** [Cron](https://supabase.com/docs/guides/cron); [programar Edge Functions cada minuto y Vault](https://supabase.com/docs/guides/functions/schedule-functions).
- **S07 · Supabase claves:** [publishable y secret](https://supabase.com/docs/guides/api/api-keys).
- **S08 · Resend:** [precios](https://resend.com/pricing); [SMTP](https://resend.com/docs/send-with-smtp); [webhooks](https://resend.com/docs/webhooks/introduction).
- **S09 · Supabase despliegue:** [entornos, migraciones y GitHub Actions](https://supabase.com/docs/guides/deployment/managing-environments).
- **S10 · GitHub:** [planes](https://docs.github.com/en/get-started/learning-about-github/githubs-plans); [secretos de Actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets).
- **S11 · Supabase respaldos:** [cobertura y exclusión de objetos Storage](https://supabase.com/docs/guides/platform/backups); [automatización con Actions](https://supabase.com/docs/guides/deployment/ci/backups).
- **S12 · DNS/HTTPS:** [Vercel, agregar dominio](https://vercel.com/docs/domains/working-with-domains/add-a-domain); [certificados](https://vercel.com/docs/domains/working-with-ssl); [Hostinger, administrar DNS](https://www.hostinger.com/support/1583249-how-to-manage-dns-records-at-hostinger/).
- **S13 · Google Search Console:** [Problemas de seguridad y revisión](https://support.google.com/webmasters/answer/9044101?hl=es).
- **S14 · Vercel planes:** [precios](https://vercel.com/pricing); [uso comercial](https://vercel.com/docs/limits/fair-use-guidelines); [repositorios de organizaciones](https://vercel.com/docs/limits); [límites Cron](https://vercel.com/docs/cron-jobs/usage-and-pricing).
- **S15 · Supabase planes:** [precios y cuotas](https://supabase.com/pricing); [pausas Free](https://supabase.com/docs/guides/platform/free-project-pausing).
- **S16 · Costa Rica:** [Ley 8968 publicada por INAMU](https://formatos.inamu.go.cr/SIDOC/DOCS/ley_8968.pdf); [ficha PGR/SINALEVI](https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=70975&param2=85989&param3=1&param4=); [PRODHAB](https://www.prodhab.go.cr/); [trámites de inscripción](https://www.prodhab.go.cr/tramites%20y%20servicios).
