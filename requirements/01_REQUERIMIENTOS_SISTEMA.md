# PracTICAtecnica.com — especificación para Next.js y Supabase

**Versión del documento:** 1.0 · **Fecha:** 24 de septiembre de 2026  
**Propietario del producto:** Max · **Cuenta propietaria:** `maxi.salsa@gmail.com`  
**Destino:** persona desarrolladora y Claude u otra IA de programación.  
**Referencia funcional y de contenido:** paquete PHP/MySQL 9.9.1. Este documento define una aplicación nueva; no es un parche ni una aplicación ejecutable.

## 1. Resultado que se debe entregar

Construir y desplegar una plataforma educativa de preparación para especialidades técnicas de secundaria de Costa Rica, con Next.js, TypeScript, Supabase y Vercel, conservando los contenidos adjuntos. Una persona estudiante se registra una sola vez con su correo, lo verifica, recibe una contraseña temporal, la cambia y estudia cualquier especialidad desde su propia cuenta. Solo el propietario administra usuarios y consulta el seguimiento de otras personas.

El resultado debe incluir frontend, backend, esquema PostgreSQL, políticas de acceso, importador de contenido, correo transaccional, PWA, pruebas y despliegue reproducible. Una maqueta con botones sin funcionamiento, datos ficticios o autenticación solo visual no satisface el encargo.

**Orden de autoridad:** (1) esta especificación para comportamiento objetivo; (2) contenido adjunto para textos, preguntas y documentos; (3) arquitectura, protocolo de identidad/correo, plan y matriz de aceptación; (4) implementación PHP anterior solo como referencia histórica. Si aparece una incompatibilidad, registrarla antes de cambiar el contenido o el flujo de acceso. Las decisiones técnicas nuevas de este documento son propuestas de implementación, no funciones que se afirme haber comprobado en Supabase.

## 2. Decisiones definitivas y alcance

| ID | Decisión obligatoria |
|---|---|
| DEC-01 | Una cuenta por correo normalizado. No crear una cuenta por especialidad ni pedir nombre de usuario. |
| DEC-02 | Correo y contraseña son las credenciales de la plataforma. Nunca solicitar la contraseña del buzón Gmail, MEP u otro proveedor a estudiantes. |
| DEC-03 | Todas las siete especialidades están incluidas en cada cuenta habilitada. La especialidad inicial solo establece la primera pantalla. |
| DEC-04 | Acceso gratuito durante 2026. Sin PayPal, tarjeta, códigos promocionales, campañas ni cobros automáticos en esta entrega. |
| DEC-05 | Solo `maxi.salsa@gmail.com`, vinculado al UUID propietario aprovisionado de forma privada, tiene administración. `superroot` es un rol interno, no un usuario adicional. `maxsalsa` no crea otra identidad. |
| DEC-06 | El propietario tiene vista estudiantil y puede regresar a administración. No se le crea una segunda cuenta con el mismo correo. |
| DEC-07 | Inicio nuevo de usuarios y progreso en Supabase. Se importan contenidos, no tablas, contraseñas ni usuarios MySQL. No borrar el sitio o la base antiguos desde scripts de despliegue. |
| DEC-08 | Alcance inicial: cinco formas por especialidad, A/B/C guiadas y D/E simulacros; 60 ítems por forma. Es el alcance verificado de 9.9.1. No convertirlo silenciosamente en cinco guiadas más tres simulacros. |
| DEC-09 | Cinco intentos por persona, especialidad y forma. Cada contador empieza en 1 y es independiente de los demás. |
| DEC-10 | Se requiere Internet para autenticar, descargar materiales y guardar respuestas. PWA instalable no significa exámenes utilizables sin conexión. |
| DEC-11 | Mantener español claro de Costa Rica y el tratamiento de usted; Accounting conserva sus contenidos en inglés. |
| DEC-12 | El producto es educativo e independiente: no presentarse como sistema oficial del MEP, DGEC ni Google, ni garantizar aprobación de una prueba oficial. |

**Acceso al terminar 2026:** mostrar “Gratis durante 2026”, nunca “un año” contado desde cada registro. Guardar fin del período en `America/Costa_Rica`: inicio del 01/01/2027, equivalente a `2027-01-01T06:00:00Z`. Decisión de continuidad para esta entrega: no borrar datos ni bloquear automáticamente cuentas activas al cambiar el año; ocultar el sello vencido y mantener acceso existente hasta una decisión expresa del propietario. No implementar cobros futuros sin otro requerimiento.

Fuera del alcance inicial: roles docentes, instituciones multiusuario, pagos, cupones, OAuth social, aplicación nativa, chat, ranking público, IA generativa durante las pruebas y migración de usuarios anteriores. El perfil técnico del propietario no justifica añadir funciones administrativas para estudiantes.

## 3. Contenido entregado y su preservación

| Código | Especialidad | Sigla | Formas | PDF |
|---|---|---|---|---|
| 2017 | Electrónica Industrial | EI | A–E | Tabla DGEC + libro |
| 3002 | Administración, Logística y Distribución | ALD | A–E | Tabla DGEC + libro |
| 3006 | Ciberseguridad | C | A–E | Tabla DGEC + libro |
| 3010 | Contabilidad | CT | A–E | Tabla DGEC + libro |
| 3016 | Desarrollo Web | DW | A–E | Tabla DGEC + libro |
| 3019 | Ejecutivo Comercial y Servicio al Cliente | EC | A–E | Tabla DGEC + libro |
| 3001 | Accounting | AC | A–E | Tabla DGEC + libro |

El directorio `contenido/` incluye el catálogo, siete bancos JSON y catorce PDF originales. Son 35 formas y 2.100 entradas de preguntas. No confundir esas entradas con promesa de 2.100 preguntas intercambiables en cualquier prueba. Electromecánica no forma parte del sistema.

**CON-01.** El importador valida el inventario y hashes de origen antes de escribir. Importar por lotes pequeños y repetibles, con transacciones, claves estables, informe y modo `--dry-run`. Repetir la importación no duplica preguntas, formas, documentos ni relaciones.

**CON-02.** Conservar enunciado, opciones, respuesta correcta, explicaciones, justificación de distractores, área, indicador, dificultad, contexto y procedencia. No resumir, regenerar, traducir ni “corregir” preguntas silenciosamente. Guardar los campos de origen no normalizados en `source_metadata`.

**CON-03.** Validar que cada ítem tenga cuatro opciones no vacías, una única respuesta correcta y referencias válidas. Detectar opciones duplicadas, referencias inexistentes, explicaciones vacías y respuestas fuera de rango. Un error debe indicar archivo, forma y número; no omitirlo para lograr una importación aparentemente exitosa.

**CON-04.** Las tablas PDF se identifican como documentos oficiales cuando su procedencia esté corroborada; los libros y las prácticas son material didáctico del proyecto. Verificar derechos de distribución y vigencia antes de publicar. No inventar indicadores DGEC ni afirmar una validación curricular que no se haya realizado.

**CON-05.** Los documentos se guardan en un bucket privado de Supabase Storage. No incluir bancos, claves de respuesta ni PDF protegidos en `public/`, archivos JavaScript del navegador, caché PWA o repositorio público.

**CON-06.** Implementar edición administrativa de ítems con estado borrador/publicado/retirado, validación y vista previa. Una corrección crea una versión nueva; nunca altera el ítem congelado de un intento ya iniciado. Subir/reemplazar PDF solo como propietario, verificando tipo real, tamaño y acciones activas peligrosas. Conservar versión anterior para revertir.

**CON-07.** Ampliar variedad es una fase editorial posterior a la paridad funcional. La nueva IA puede proponer borradores, pero no publicar automáticamente ítems generados. Debe haber revisión disciplinar y pedagógica; una misma pregunta solo puede asociarse a varias especialidades mediante alineamientos explícitos aprobados.

## 4. Roles y permisos

| Operación | Visitante | Estudiante activo | Propietario con MFA |
|---|---:|---:|---:|
| Ver portada, catálogo y condiciones | Sí | Sí | Sí |
| Registrarse / recuperar su acceso | Sí, con límites | Sí, su cuenta | Recuperación protegida |
| Descargar materiales y practicar | No | Todas las especialidades | Todas las especialidades |
| Ver perfil, intentos y progreso propios | No | Sí | Sí, vista estudiantil |
| Consultar datos de otros estudiantes | No | No | Sí |
| Crear/invitar, editar, desactivar o eliminar estudiantes | No | No | Sí |
| Promover usuarios a administradores | No | No | No: propietario único |
| Editar/publicar preguntas y documentos | No | No | Sí |
| Configurar apertura, correo y ver estado técnico | No | No | Sí |
| Exportar seguimiento CSV | No | No | Sí |

**PER-01.** Verificar permisos en servidor y en base de datos. Ocultar un botón no es un control de acceso. Alterar URL, UUID, especialidad, JSON, cookies o `user_metadata` nunca debe conceder acceso a otra cuenta.

**PER-02.** El UUID propietario se fija mediante aprovisionamiento privado. El correo, por sí solo, no concede privilegios. La tabla propietaria tiene una sola fila; el estudiante no puede escribir roles, estado, correo verificado, permisos ni `must_change_password`.

**PER-03.** “Ver como estudiante” es una vista de la misma identidad: banner persistente “Vista estudiantil del propietario” y botón “Volver a administrar”. No suplantar a un estudiante real. Los intentos de prueba del propietario se distinguen y se excluyen del seguimiento y estadísticas del alumnado por defecto.

**PER-04.** La administración requiere sesión con segundo factor TOTP verificado (`aal2`) y cuenta habilitada. Una sesión propietaria sin MFA solo accede al circuito de completar/verificar MFA, contraseña y salida.

**PER-05.** Desactivar una cuenta corta su acceso en la siguiente petición protegida aunque conserve un JWT todavía vigente. Los controles consultan el estado autoritativo, no solo un claim antiguo. Los enlaces de descarga ya emitidos caducan como máximo en 60 segundos.

## 5. Registro, acceso y autogestión

### 5.1 Datos y validaciones

**AUT-01.** Formulario inicial: nombre y apellidos (2–120 caracteres Unicode, sin HTML), sección/grupo (1–40, admitir “Independiente”), correo (máximo 254, normalizado por trim + minúsculas), especialidad inicial existente y aceptación de condiciones/privacidad con versión y fecha. Sin campo de usuario, contraseña inicial elegida, cédula, teléfono, dirección, fecha de nacimiento ni datos de tarjeta.

**AUT-02.** No quitar puntos ni sufijos `+` de correos: no se puede asumir que todos los proveedores los traten igual. La unicidad se aplica al correo normalizado completo. `@mep.go.cr` se acepta si es válido; no hay restricciones comerciales por dominio de correo.

**AUT-03.** Registro reservado del propietario no crea una cuenta estudiantil duplicada. Se ofrece ingresar o recuperar por el circuito de propietario, sin revelar secretos ni eliminar MFA.

### 5.2 Flujo obligatorio de estudiante

1. Envía el formulario una vez. Se crea o recupera una inscripción pendiente de forma idempotente.
2. Se encola y despacha un enlace de verificación al correo indicado.
3. El enlace abre una pantalla de confirmación; una petición GET, un robot de correo o una vista previa no activan la cuenta por sí solos. La persona pulsa “Verificar mi correo”.
4. El servidor valida la prueba de posesión y registra la verificación. Solo entonces habilita el uso restringido de la contraseña temporal y envía el correo de bienvenida. Para evitar que un reintento cambie una contraseña personal posterior, la temporal se prepara una sola vez durante el alta, permanece cifrada y no se envía antes de verificar el correo.
5. La persona entra con correo y contraseña temporal. Solo puede acceder a la pantalla de cambio obligatorio.
6. Escribe contraseña nueva y confirmación; deben coincidir y ser diferentes de la temporal. Tras guardar, accede a su espacio y a todas las especialidades.

**AUT-04.** La temporal tiene al menos 16 caracteres aleatorios seguros, sin ambigüedad para copiar, y vence 24 horas después de confirmar el correo, con la fecha exacta indicada en el mensaje. No se fija en código ni se comparte entre personas. La contraseña definitiva admite pegado y gestores; 12–128 caracteres, sin reglas arbitrarias de “una mayúscula y un símbolo”. Configurar Supabase con una política compatible.

**AUT-05.** El vencimiento y `must_change_password` son controles de servidor y RLS. Incluso autenticándose directamente contra Supabase con una temporal, la persona no puede leer materiales, progreso ni practicar antes de cambiarla. No afirmar que el simple flag del frontend hace cumplir esto.

**AUT-06.** Renovar la página o repetir la confirmación no crea otra cuenta ni otra temporal. Se requiere operación única por inscripción/generación y recuperación de fallos entre Auth, Postgres y el proveedor de correo. Los detalles técnicos están en `02_ARQUITECTURA_Y_DATOS.md`.

**AUT-07.** Si el correo ya existe, mostrar un mensaje neutro con opciones “Ingresar” y “No recibí el correo / Recuperar acceso”. Si está pendiente, permitir reenvío limitado; si está activo, no modificar su nombre, contraseña, rol o progreso por reenviar el formulario.

**AUT-08.** Recuperación estudiantil: enlace de un solo uso que permite escribir dos veces una contraseña nueva. Solicitar el enlace no cambia la contraseña vigente. Al completarlo, invalidar sesiones anteriores y temporales/operaciones de bienvenida pendientes. No reenviar contraseñas definitivas. Los enlaces de verificación y recuperación son de un solo uso y vencen a los 60 minutos; configurar y probar ese vencimiento en Auth, además de los controles de aplicación. Un reenvío solicitado genera un enlace nuevo y explica que se use el más reciente.

**AUT-09.** Recuperación del propietario mantiene MFA. Si pierde el segundo factor, existe procedimiento privado documentado usando control del proyecto Supabase y verificación del propietario; no un botón público que lo quite por conocer el correo. No portar la semilla antigua de Google Authenticator como una “API key”: registrar una nueva entrada TOTP mediante Supabase MFA.

**AUT-10.** Cinco fallos consecutivos de inicio de sesión provocan un bloqueo de cinco minutos. Distinguir este límite del máximo de cinco intentos de examen. Límite adicional por IP y cuenta, almacenamiento compartido y mensajes que no revelen si existe el correo. No confiar en memoria de una función serverless.

**AUT-11.** Solicitudes de reenvío/recuperación: máximo una por minuto y tres por quince minutos por correo, más límites por IP configurables para redes escolares compartidas. CAPTCHA adaptativo solo si se necesita por abuso, accesible y sin convertir cada registro legítimo en un obstáculo.

**AUT-12.** El perfil permite editar nombre/grupo/tema. Cambio de correo estudiantil: usar el cambio seguro de correo de Supabase con confirmación en el buzón anterior y en el nuevo, conservar UUID y progreso, impedir duplicados, revocar sesiones anteriores y avisar del cambio. Si perdió el buzón anterior, ofrecer asistencia privada con comprobación de identidad; no un bypass público. El correo propietario queda bloqueado para cambios desde la interfaz normal.

### 5.3 Mensajes al usuario

Usar estos significados, sin prometer entrega confirmada cuando solo hubo aceptación del servidor:

- Solicitud aceptada: “Estamos procesando su correo. Puede tardar unos minutos. Revise su bandeja de entrada y spam o correo no deseado”.
- Verificación realizada: “Su correo quedó verificado. Estamos enviando su contraseña temporal. Cuando llegue, ingrese con su correo y cámbiela por una nueva”.
- Fallo de correo: “No pudimos completar el envío. Su solicitud se conserva. Puede volver a intentarlo en un minuto”.
- Enlace vencido: “Este enlace venció. Solicite uno nuevo; no necesita registrarse otra vez”.
- Contraseña guardada: “Su contraseña se actualizó. Ya puede continuar”.

La pantalla siempre explica qué pasó y cuál es el siguiente paso. No enviar a soporte para resolver un reenvío normal.

## 6. Correo automático y seguimiento de entrega

**COR-01.** Proveedor de referencia: Resend con dominio o subdominio remitente verificado. Remitente propuesto `PracTICAtecnica.com <acceso@notificaciones.practicatecnica.com>`; Reply-To `maxi.salsa@gmail.com`. Configurar SPF/DKIM y DMARC según las instrucciones reales del proveedor. No falsificar un remitente Gmail desde un servicio no autorizado.

**COR-02.** Configurar correo personalizado de Supabase Auth para los mensajes que Auth envíe; el servicio de correo de desarrollo de Supabase no es la solución de producción. Para los correos del flujo propio, usar una cola persistente y el mismo proveedor. No producir dos mensajes distintos para una misma verificación por activar ambos caminos a la vez.

**COR-03.** Plantillas HTML y texto plano para verificación, bienvenida/temporal, recuperación, cambio de contraseña/correo, invitación administrativa y prueba técnica. Nombre de marca consistente; URL HTTPS canónica; sin adjuntos ni enlaces a otras marcas para iniciar sesión en la plataforma.

**COR-04.** Estados internos: `queued`, `processing`, `accepted`, `delivered`, `bounced`, `complained`, `failed`, `expired`, `cancelled`. `accepted` solo significa aceptación del proveedor; `delivered` significa aceptación del servidor receptor cuando exista evento, nunca prueba de lectura o bandeja principal. Si el proveedor no informa entrega, mostrar “aceptado; entrega sin confirmar”.

**COR-05.** Despacho inmediato después de confirmar la transacción; cron de respaldo cada minuto. Reclamo exclusivo de trabajos, leases, reintentos con espera 1/5/15/60 minutos y cancelación al vencer el token. Respetar cuotas, `Retry-After`, rebotes permanentes y supresiones. No prometer entrega exactamente una vez con SMTP/API externa.

**COR-06.** Los payloads que contienen temporal/token permanecen cifrados y se eliminan al confirmar aceptación, al vencer o cancelar. No registrar contraseñas, tokens ni cuerpo sensible en logs. No regenerar la temporal cada vez que se reintenta un envío existente. La credencial temporal cifrada se conserva por separado únicamente hasta cambio, vencimiento o cancelación, para permitir su reenvío sin rotarla; eliminar el payload de un mensaje aceptado no elimina anticipadamente esa posibilidad.

**COR-07.** Webhooks con firma validada sobre cuerpo crudo, control de replay e idempotencia por event ID. Nunca aceptar un JSON sin firma que marque un correo como entregado o un usuario como verificado.

**COR-08.** Administración muestra destino, tipo, fecha, estado, último error saneado y reintento permitido. No muestra temporales ni tokens. Una persona estudiante solo recibe estado de su propia solicitud por contexto autorizado, sin enumerar usuarios.

**COR-09.** Antes de abrir inscripciones, ejecutar pruebas reales en Gmail y en una cuenta `@mep.go.cr`, con autorización del destinatario. Verificar enlace, temporal, cambio de clave y mensaje final. Filtros institucionales pueden retrasar o bloquear un mensaje; registrar evidencia del proveedor y recepción real, no afirmar que “sin pendientes” significa recibido.

## 7. Estudio, prácticas y simulacros

**EST-01.** “Mi espacio” presenta especialidad actual, cambio de especialidad, documentos, cinco pruebas, progreso y botón para retomar. El selector está presente en móvil y escritorio. Cambiar especialidad no crea usuario, borra respuestas ni consume intentos.

**EST-02.** Cada especialidad tiene dos acciones alineadas: “Tabla de contenidos (PDF)” y “Libro de repaso (PDF)”, con abrir/descargar y estados de carga/error. Ambos apuntan al PDF de la especialidad seleccionada. No publicar rutas locales del servidor ni enlaces rotos.

**EXA-01.** Formas A/B/C: práctica guiada; confirmar una respuesta muestra si fue correcta y la explicación. Formas D/E: simulacro; guardar respuestas no revela nota, opción correcta, explicación ni estadísticas que permitan inferirla hasta entregar.

**EXA-02.** Antes de iniciar, mostrar modo, 60 preguntas, número de intento que se consumirá y disponibilidad. Iniciar crea un snapshot persistente y consume un intento. Mantener como máximo un intento abierto por usuario + especialidad + forma; volver a iniciar retoma ese intento.

**EXA-03.** El servidor asigna ordinales 1–5 por usuario/especialidad/forma, mediante transacción y bloqueo/constraint. No usar el ID global de la fila como número visible. Mostrar “Práctica 1 · Intento 2 de 5 · 4 de 60 respuestas confirmadas”, no “Prueba A #22” sin contexto.

**EXA-04.** Máximo cinco intentos iniciados por forma; retomar, actualizar o reconectar no consume otro. No usar comprobación `count < 5` separada de la inserción. Dos clics o peticiones concurrentes deben producir el mismo intento activo o un conflicto seguro.

**EXA-05.** La persona puede seleccionar una opción y cambiarla antes de confirmar. Al confirmar, la respuesta queda guardada e inmutable. En simulacro se informa “Respuesta guardada” sin resultado. Este comportamiento preserva la lógica actual; no permitir cambiar una respuesta ya revelada para mejorar artificialmente la nota.

**EXA-06.** Confirmación idempotente por intento/posición/operación. Repetir la misma confirmación retorna el mismo resultado; enviar otra opción a una posición ya confirmada no modifica la anterior. La hora del servidor determina la fecha de guardado.

**EXA-07.** Navegación anterior/siguiente y mapa de 60 preguntas con estados accesibles. Diferenciar selección local de respuesta confirmada; advertir de selección sin guardar al salir. Permitir marcar/desmarcar preguntas para revisión; esas marcas se guardan separadas y no cuentan como respuestas. Al entregar, respuestas y marcas quedan congeladas. Tras reiniciar navegador se recupera exactamente el orden, las marcas y las respuestas confirmadas.

**EXA-08.** Práctica guiada finaliza automáticamente al confirmar las 60; se permite “Finalizar práctica” anticipadamente con confirmación que muestra cuántas quedan sin responder. Simulacro requiere “Entregar simulacro”, aunque haya 60 guardadas. Entrega anticipada cuenta no respondidas como incorrectas y no se revierte.

**EXA-09.** Puntaje: 1 por correcta, 0 por incorrecta o sin respuesta; sin penalización adicional. Nota = `100 × correctas / 60`, mostrada con dos decimales. Durante una práctica guiada abierta, si se muestra nota parcial, rotularla como tal y calcular `100 × correctas / confirmadas`, también con dos decimales; si no hay confirmadas, mostrar “Sin respuestas”. No mostrar nota parcial en simulacros abiertos. Conservar enteros para cálculo, no acumular porcentajes redondeados. No rotular “aprobado/reprobado MEP” sin una regla oficialmente validada para esa aplicación.

**EXA-10.** No imponer temporizador con cierre automático en la primera entrega: no existe un tiempo validado en los requisitos definitivos. Puede mostrarse duración informativa medida desde inicio, aclarando que incluye pausas. Un temporizador evaluativo futuro requiere configuración y aprobación específica.

**EXA-11.** Al finalizar, mostrar resultado, aciertos/errores/no respondidas, revisión por ítem, opción elegida, correcta, explicación y áreas por reforzar. Proteger estas respuestas desde servidor; no entregar el banco completo ni la clave antes de tiempo.

**EXA-12.** La revisión final propia se puede imprimir o guardar como PDF mediante la función de impresión del navegador, con estilos legibles y sin navegación. El propietario puede imprimir una revisión autorizada del seguimiento. No convertir esta exportación en una URL pública con resultados.

### Selección aleatoria y distribución

**ALE-01.** El blueprint inicial de cada forma se obtiene de sus 60 ítems originales agrupados por área + indicador + dificultad. La selección conserva exactamente esas cuotas. No reemplazarlas con porcentajes generales inventados ni con aleatoriedad total.

**ALE-02.** El pool elegible combina ítems de la misma especialidad y modo: A/B/C entre sí; D/E entre sí. Priorizar preguntas menos vistas por ese usuario; resolver empates aleatoriamente. No repetir una pregunta dentro de un intento.

**ALE-03.** Mezclar preguntas y las cuatro opciones, manteniendo correspondencia correcta entre opción, clave y explicación de distractor. Guardar el orden en el snapshot. No recalcular al recargar ni exponer semilla/clave al cliente.

**ALE-04.** Si faltan alternativas para una cuota, reutilizar preguntas vistas elegibles sin duplicarlas dentro del intento. Si ni siquiera existen suficientes preguntas distintas para completar una cuota, rechazar el inicio de manera clara y avisar al propietario; no reducir las 60 preguntas ni sustituir otra área en silencio.

**ALE-05.** No prometer exámenes completamente distintos para todas las personas: algunos grupos del banco solo tienen las preguntas necesarias. Ver `contenido/NOTAS_CONTENIDO.md` para limitaciones detectadas. Ampliar esos grupos mediante revisión editorial es la mejora prioritaria de variedad.

**ALE-06.** Crear versiones de preguntas y blueprints. Retirar o corregir una pregunta no modifica snapshots ni notas históricas. Una pregunta compartida entre especialidades requiere relaciones curriculares separadas; el parecido textual no basta para reasignarla.

## 8. Progreso y seguimiento

**PRO-01.** El estudiante solo ve su información. Panel por especialidad con: intentos iniciados, abiertos y finalizados; respuestas confirmadas; formas finalizadas de 5; mejor nota; promedio de notas finales; historial y botón retomar. Si no hay notas finales, mostrar “Sin resultados” en vez de 0.

**PRO-02.** Progreso de intento = confirmadas/60; es distinto de nota. Progreso de formas = cantidad de formas con al menos un intento finalizado/5; es distinto de cantidad de intentos. No denominar “dominio del programa” a haber terminado un examen incompleto.

**PRO-03.** Mejor nota y promedio solo usan intentos finalizados, con igual peso por intento. El promedio se calcula desde correctas/60 de cada intento final, sin promediar valores previamente redondeados, y se muestra con un decimal. El panel identifica que el promedio incluye todos los intentos finales; no mezclarlo con promedio de mejores notas por forma.

**PRO-04.** Área por reforzar: `1 − correctas/confirmadas` en respuestas cuyo resultado ya puede revelarse, acompañada por cantidades y porcentaje. Excluir simulacros no entregados para no filtrar resultados. Una pregunta sin responder no cuenta como evidencia de error conceptual de un área; mostrarla aparte. Con menos de cinco respuestas del área, indicar “Evidencia inicial”.

**PRO-05.** Gráfico con contraste alto en claro y oscuro, etiquetas y tabla equivalente. Ámbar/amarillo para refuerzo con borde/texto contrastante; no usar celeste sobre fondo claro ni depender únicamente del color.

**ADM-01.** Seguimiento del propietario: filtros por nombre/correo, grupo, especialidad, forma, estado y fechas; tabla paginada de personas/intentos y detalle de respuestas guardadas. Cada número de intento es del estudiante consultado. Excluir intentos del propietario por defecto.

**ADM-02.** Actualizar al confirmar respuestas. En seguimiento puede usarse polling cada 15–30 segundos solo mientras la pestaña está visible, con “Actualizado a…” y botón Actualizar. Realtime es mejora opcional, no requisito para ver cambios fiables.

**ADM-03.** CSV UTF-8 con filtros aplicados, fechas claras y protección contra fórmulas al abrir en hoja de cálculo. No incluir contraseñas, tokens ni información de otras consultas fuera del filtro.

**ADM-04.** Gestión de estudiantes: buscar, invitar/crear solicitud de registro, editar nombre/grupo, desactivar/reactivar, reenviar verificación o recuperación, eliminar. Invitar no marca correo como verificado ni crea contraseña compartida. Una invitación repetida retoma su estado; no choca con solicitudes rechazadas históricas.

**ADM-05.** Eliminar un estudiante exige confirmar el correo exacto. Borrar identidad Auth y sus datos personales/progreso mediante operación recuperable; evitar borrar el UUID propietario. Si una parte falla, mantener cuenta deshabilitada y reintentar hasta consistencia. Después puede volver a registrarse con ese correo como cuenta nueva.

**ADM-06.** No incluir un botón público “limpiar toda la base”. Restablecimientos masivos solo mediante herramienta operativa privada con respaldo, vista previa y confirmación del proyecto destino. El primer despliegue sobre base vacía no necesita limpiar nada.

**ADM-07.** Primer acceso propietario: guía privada de puesta en marcha con estado de contenido importado, proveedor de correo, prueba de envío, dominio/HTTPS, información de privacidad y apertura de inscripciones. Mostrar una acción concreta por paso y su evidencia; no marcar un paso completo porque se pulsó el botón. Los secretos se configuran en los servicios/variables por la persona desarrolladora, no mediante un formulario público. La guía permite probar como estudiante y regresar.

## 9. Interfaz y accesibilidad

**UX-01.** Portada con propuesta clara: “Prepárese a su ritmo”, “Una cuenta · Todas las especialidades” y “Gratis durante 2026” mientras corresponda. Acciones principales “Ingresar” y “Crear mi cuenta gratuita”; navegación sin jerga como SMTP, SQL, tokens o versiones de frameworks para estudiantes.

**UX-02.** Diseño consistente: componentes y tokens únicos de color, tipografía, espaciado, botones, tarjetas y formularios. Responsive desde 360 px; probar también 390, 768 y 1440 px, zoom 200 %, teclado y lector de pantalla. Meta WCAG 2.2 AA: contraste de texto, foco visible, nombres accesibles y objetivos táctiles adecuados [F08].

**UX-03.** Tema sistema/claro/oscuro con preferencia persistente; evitar destello y error de hidratación. Igual legibilidad en tablas, selects, modales, gráficos, opciones de respuesta y estados deshabilitados.

**UX-04.** Tarjetas de especialidad con título y zona de acciones de altura consistente. Los botones PDF se alinean al fondo de la tarjeta; no depender de centrar un título de distinta longitud para corregir el diseño.

**UX-05.** Errores de campo junto al campo. Confirmaciones importantes en diálogo accesible centrado, con título comprensible, explicación y botón de siguiente paso. Foco atrapado mientras está abierto y devuelto al cerrar; Escape y cierre según el riesgo; evitar diálogos superpuestos. Cambios rutinarios como “respuesta guardada” mediante estado inline/aria-live no invasivo.

**UX-06.** Ningún aviso queda visible solo arriba de una página larga. Al fallar un envío, enfocar el resumen de error. Deshabilitar doble envío mientras se procesa, permitir reintento y conservar campos no sensibles.

**UX-07.** Estados vacíos, carga, error, sesión vencida, límite alcanzado, enlace vencido y sin conexión diseñados de forma explícita. Nunca mostrar stack traces, nombres de variables o “undefined” al usuario final.

**UX-08.** Tablas móviles legibles con tarjetas o desplazamiento contenido; sin desbordamiento horizontal de toda la página. Idioma de página y etiquetas correctos. Fechas visibles en `America/Costa_Rica`, base en UTC.

## 10. PWA, caché, HTTPS y reputación

**PWA-01.** Manifest válido con nombre, nombre corto, colores, alcance, inicio e iconos 192/512 y maskable. HTTPS válido. Botón de instalación aparece cuando la capacidad está disponible; si ya está instalada, no volver a ofrecer el mismo prompt. En iOS, guía real de Compartir → Añadir a pantalla de inicio.

**PWA-02.** No asumir que todos los navegadores emiten `beforeinstallprompt`. Cuando no sea posible, mostrar “Cómo instalar” con pasos del navegador, sin error JavaScript ni éxito inventado.

**PWA-03.** Service worker solo guarda recursos públicos versionados y una pantalla offline. Excluir auth, API, páginas personalizadas, respuestas, informes, tokens y PDF privados. Actualizar caché de forma controlada; no cerrar un intento ni recargar en medio de una respuesta sin permiso del usuario.

**PWA-04.** Al salir, borrar estado privado del cliente y evitar que Atrás muestre datos de la persona anterior. No usar localStorage para guardar contraseñas, claves de respuesta o bancos completos.

**PWA-05.** Migración del service worker antiguo del mismo dominio: incluir una ruta de transición `/sw.js`, reemplazar/eliminar las cachés antiguas del proyecto y comprobar que HTML/JS/API tengan la misma release. No depender de que todos los usuarios borren caché manualmente.

**SEG-01.** Dominio canónico HTTPS; comprobar certificado para `practicatecnica.com` y política para `www`. DNS y certificado se configuran en Vercel/registrador, no mediante un archivo PHP. Conservar registros de correo y verificación al cambiar registros web.

**SEG-02.** SSL válido, DNS correcto y reputación en Google Safe Browsing son problemas distintos. Migrar o emitir un certificado no elimina una advertencia de phishing. Revisar URL concretas en Search Console, corregir hallazgos y solicitar revisión cuando proceda; no atribuir la causa sin evidencia.

**SEG-03.** CSP ajustada a recursos realmente usados, protección clickjacking, `nosniff`, Referrer-Policy y política de permisos mínima. No incluir scripts externos arbitrarios, ejecutar HTML de preguntas ni desactivar validación TLS. HSTS solo después de comprobar dominio y subdominios necesarios.

**SEG-04.** Entradas validadas en servidor, consultas parametrizadas, sanitización de contenido editable y límites de tamaño. Las acciones autenticadas validan origen y protección CSRF. Los GET no cambian estado de cuenta ni entregan pruebas.

**SEG-05.** Secretos solo en entorno servidor/Vault; nunca en `NEXT_PUBLIC_*`, Git, ZIP compartido o logs. El paquete de requisitos no contiene contraseñas ni semillas TOTP. Auditoría de dependencias y detección de secretos en CI. Corregir vulnerabilidades críticas/altas aplicables antes de publicar.

## 11. Privacidad y operación responsable

**PRI-01.** Recoger solo datos necesarios para acceso y progreso. No publicar listas, correos ni ranking de estudiantes. Informar responsable, contacto, finalidad, acceso del propietario al seguimiento, proveedores, conservación, derechos y transferencias internacionales.

**PRI-02.** Registrar versión de aviso/condiciones y consentimiento cuando corresponda. La atención de menores y la base jurídica del tratamiento deben revisarse con una persona competente en normativa costarricense antes del uso abierto. No afirmar que un checkbox constituye por sí solo cumplimiento de la Ley 8968 [F09].

**PRI-03.** Política operativa propuesta, sujeta a validación legal: inscripciones no verificadas 7 días; secretos de correo hasta aceptación/vencimiento; metadatos de entrega 30 días; logs operativos y auditoría mínima 90 días; datos educativos mientras la cuenta esté activa. Avisar antes de eliminar por inactividad, con política aprobada. No ejecutar borrados automáticos de progreso por terminar 2026.

**PRI-04.** Documentar borrado de cuenta, copia de sus datos y corrección. Eliminar payloads y vinculaciones identificables; auditoría mínima de seguridad solo según finalidad/retención legítima, sin conservar subrepticiamente el expediente eliminado.

**PRI-05.** Respaldos privados y cifrados, con restauración ensayada. Incluir base y objetos de Storage: un respaldo SQL no incluye por sí mismo los PDF. No servir dumps desde rutas públicas ni exportar contraseñas Auth a la interfaz.

## 12. Calidad medible y definición de terminado

**CAL-01.** Compilación de producción, lint, TypeScript estricto, pruebas de reglas de negocio, RLS y flujo end-to-end aprobados en CI. Sin errores de consola, enlaces vacíos ni credenciales de demostración en producción.

**CAL-02.** Objetivo de primera salida: 50 estudiantes concurrentes. Ensayar confirmar respuesta/iniciar/entregar con concurrencia, sin pérdida ni mezcla de datos. Meta de respuesta protegida p95 menor de 1,5 s en entorno caliente, midiendo por separado cold starts y proveedor de correo. Una cola lenta se comunica; no se fuerza un timeout corto que duplique operaciones.

**CAL-03.** Metas de experiencia: LCP ≤2,5 s, INP ≤200 ms y CLS ≤0,1 en medición representativa cuando haya datos; durante desarrollo usar pruebas de laboratorio documentadas, sin presentarlas como tráfico real. Paginar seguimiento y no descargar todo el banco para renderizar una pregunta.

**CAL-04.** Una versión de aplicación y commit identificables en frontend, API y diagnóstico privado. La versión de contenido se distingue de la versión de aplicación; no reutilizar el antiguo `0.8.0` del catálogo como release del sitio.

**CAL-05.** Las pruebas de correo simuladas validan código; las reales validan configuración y recepción. Las pruebas locales no certifican el TLS del dominio ni el estado Safe Browsing. Registrar alcance y resultados sin promesas de “100 % libre de malware”.

**CAL-06.** Se considera entregado solo al satisfacer `04_MATRIZ_ACEPTACION.md`, importar 7/35/2.100/14, completar registro real y MFA, comprobar RLS y entregar manual corto para Max. Los fallos de correo, seguridad o permisos son bloqueantes, no “detalles pendientes”.

## 13. Mejoras priorizadas

| Prioridad | Mejora | Criterio de cierre |
|---|---|---|
| P0 | Registro autogestionado sin cuentas duplicadas | Flujo completo con temporal y recuperación probado |
| P0 | Propietario único + MFA + aislamiento RLS | Estudiante y sesión AAL1 no administran ni filtran datos |
| P0 | Intentos y progreso correctos | Dos personas simultáneas conservan sus ordinales y respuestas |
| P0 | Correo observable y recuperable | Estados fiables, reintentos y protección frente a temporales obsoletas |
| P0 | Importación/despliegue automático | Sin SQL manual, repetible y con verificaciones |
| P0 | HTTPS y reputación comprobados por separado | Dominio navegable sin omitir advertencias; revisión si hay reporte |
| P1 | UI coherente y accesible, modales, PDF alineados, PWA | Casos UX y PWA de aceptación aprobados antes de salida pública |
| P1 | Edición editorial versionada | No cambia intentos históricos; revisión antes de publicación |
| P2 | Más alternativas por indicador/dificultad | Aumenta cobertura auditada sin alterar cuotas ni generar ítems al azar en vivo |
| P2 | Realtime y analítica ampliada | Solo tras demostrar necesidad; no retrasan la paridad inicial |

P0 y P1 forman parte de la entrega pública; P2 es evolución posterior. Una mejora no autoriza a eliminar material ni a simplificar controles de autorización.

## 14. Referencias y evidencia

Las reglas de negocio anteriores son decisiones del proyecto. Las referencias siguientes respaldan las capacidades y cautelas técnicas/jurídicas; revisar su vigencia al implementar. Ninguna fuente sustituye las pruebas de integración del nuevo código.

- **F01.** Next.js, seguridad y capa de acceso a datos: https://nextjs.org/docs/app/guides/data-security
- **F02.** Supabase, SSR y validación de identidad: https://supabase.com/docs/guides/auth/server-side/creating-a-client
- **F03.** Supabase, RLS y permisos: https://supabase.com/docs/guides/database/postgres/row-level-security
- **F04.** Supabase, MFA TOTP: https://supabase.com/docs/guides/auth/auth-mfa/totp
- **F05.** Supabase, migraciones versionadas: https://supabase.com/docs/guides/deployment/database-migrations
- **F06.** Supabase, Cron: https://supabase.com/docs/guides/cron
- **F07.** Next.js, PWA: https://nextjs.org/docs/app/guides/progressive-web-apps
- **F08.** W3C, WCAG 2.2: https://www.w3.org/TR/WCAG22/
- **F09.** Normativa costarricense y fuentes operativas: véase `03_PLAN_IMPLEMENTACION_Y_DESPLIEGUE.md`, sección de fuentes verificadas.

El inventario y el análisis del contenido se basan en los archivos del paquete 9.9.1 adjunto, no en una inspección del hosting de producción. El paquete de traspaso no contiene el nuevo código Next.js: especifica lo que la persona desarrolladora debe construir y verificar.
