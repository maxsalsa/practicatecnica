# Instrucciones de construcción — PracTICAtecnica.com

Usted es la IA implementadora y trabaja con la persona desarrolladora que recibe este paquete. Su tarea es construir una plataforma completa y verificable con Next.js, Supabase y Vercel, siguiendo los requisitos adjuntos. El propietario final es Max; es una persona usuaria del producto, no debe necesitar administrar SQL ni ensamblar parches.

## 1. Lea antes de modificar

Orden obligatorio:

1. `00_LEER_PRIMERO.md` y `01_REQUERIMIENTOS_SISTEMA.md`.
2. `contenido/NOTAS_CONTENIDO.md`, inventario, hashes y auditoría.
3. `02_ARQUITECTURA_Y_DATOS.md` y `05_AUTENTICACION_Y_CORREO.md`.
4. `03_PLAN_IMPLEMENTACION_Y_DESPLIEGUE.md` y `04_MATRIZ_ACEPTACION.md`.

Autoridad: 01 define producto y permisos; los originales en `contenido/` definen textos/documentos; 02/05 definen el diseño técnico que debe demostrar; 03 define secuencia y operación; 04 verifica el resultado. Si hay una contradicción, registre la diferencia y resuélvala con la regla más específica y segura que conserve 01. No cambie el flujo visible, borre contenido ni rebaje seguridad sin explicarlo al responsable.

Esta entrega **no contiene código Next.js terminado**. Los nombres de scripts del plan son contratos para implementar. No afirme que ejecutó un comando, desplegó, verificó un correo o realizó una auditoría si solo escribió instrucciones.

## 2. Reglas que no debe reinterpretar

- Una identidad Supabase Auth por correo. Una cuenta estudiantil accede a las siete especialidades y solo a sus propios resultados. No pedir nombre de usuario.
- Solo el UUID propietario aprovisionado para `maxi.salsa@gmail.com` administra. No basta comparar el email enviado por cliente. No promover `@mep.go.cr`, `superroot`, `maxsalsa` ni metadata de usuario a roles especiales.
- El propietario usa la misma cuenta para ver como estudiante y regresar a administrar; MFA nativo obligatorio. Crear una entrada nueva de Google Authenticator, sin inventar una importación de la semilla anterior.
- Registro → verificación de correo → envío de temporal → ingreso con temporal → nueva contraseña escrita dos veces → acceso. Temporal preparada privadamente una sola vez; enviada solo después de verificar. Nunca actualizar contraseñas desde un reintento de correo.
- Gratis durante 2026, sin tarjeta, PayPal, campañas, cupones ni cobros automáticos. No añadir checkout.
- Cada especialidad tiene A/B/C guiadas y D/E simulacros, 60 ítems por forma y cinco intentos independientes por persona/forma. Retomar no consume otro. No mostrar un ID global como número de intento.
- El servidor selecciona, guarda, califica y autoriza. Los simulacros abiertos nunca exponen sus claves, nota ni explicaciones mediante JSON, RSC, estadísticas o caché.
- Los bancos y PDF originales se preservan. No reemplazarlos por preguntas genéricas, placeholders o contenido generado. Aumentar variedad es trabajo editorial posterior con revisión.
- PostgreSQL nuevo, sin migrar usuarios/contraseñas MySQL. No ejecutar limpiezas del hosting antiguo como parte de instalación.
- No usar PHP, MySQL, archivos de rescate públicos, contraseñas hardcodeadas, MFA casero o enlaces firmados de larga duración.

## 3. Cómo trabajar sin devolver complejidad al propietario

Primero inspeccione archivos, compruebe hashes, cuente contenido y cree un plan de tareas. Use un repositorio privado y commits pequeños. Compruebe versiones mantenidas de Next.js y SDKs en documentación oficial, fije dependencias y anote decisiones en `docs/decisiones.md`.

Demuestre temprano el flujo de Auth/temporal/correo/RLS con un proyecto de pruebas: esta es la parte de mayor riesgo. Haga pruebas de fallos entre Auth y PostgreSQL, reenvíos, solicitudes simultáneas, temporal caducada y acceso directo a Supabase. No invierta primero en toda la interfaz dejando el registro para el final.

Implemente las migraciones y el importador automatizado, no un bloque SQL enorme que Max deba pegar. Incluya dry-run, progreso entendible, validación previa y reejecución idempotente. Los errores indican la acción concreta para recuperarse y conservan el estado necesario.

Resuelva decisiones rutinarias sin hacer al propietario escoger entre bibliotecas equivalentes. Solicite únicamente datos que dependen de él: acceso autorizado a servicios, información legal del responsable, autorización de pruebas reales de correo, costo si el plan elegido no es gratuito y autorización final de cambio de dominio/publicación cuando corresponda. Nunca solicite contraseñas, TOTP o claves API en mensajes públicos.

Si faltan credenciales, avance con entorno local, servicios simulados y pruebas; separe claramente “probado localmente” de “pendiente de configuración real”. No declare producción lista hasta pasar los controles reales bloqueantes.

## 4. Calidad visual que se espera

Construya un diseño propio y consistente, manteniendo identidad de PracTICAtecnica.com y contexto de “Aula Técnica”. Portada clara, poca carga visual, navegación que no se envuelve en varias filas desordenadas, selector de especialidad y acceso rápido al intento abierto.

Base visual propuesta, ajustable después de medir contraste: azul profundo para navegación, fondo claro neutro y superficies blancas en modo claro; azul casi negro y superficies azul oscuro en modo oscuro; primario azul, acento turquesa y ámbar contrastante para áreas por reforzar. Use tokens semánticos, no colores repetidos en cada componente. Texto base de al menos 16 px; anchura de lectura limitada y espacio suficiente. Fuente legible autoalojada o stack del sistema. No cargar tipografías o trackers innecesarios de terceros.

Desarrolle y revise al menos estas pantallas reales:

1. Portada y catálogo con aviso gratuito vigente.
2. Inscripción, estado del correo y confirmación explícita.
3. Ingreso, temporal y cambio doble de contraseña.
4. Recuperación y enlaces vencidos.
5. Enrolamiento/desafío MFA del propietario.
6. Espacio de estudio y selector de especialidad con PDF alineados.
7. Pregunta guiada con feedback, marcas y mapa de 60 posiciones.
8. Simulacro sin feedback hasta entregar, con confirmación de pendientes.
9. Revisión final imprimible e historial/progreso propio.
10. Administración de cuentas, seguimiento filtrado y detalle.
11. Estado de correo, configuración guiada y publicación de contenidos.
12. Estados vacíos, sin conexión, sesión vencida y ayuda de instalación PWA.

Los diálogos de confirmación deben tener foco, contraste y acciones claras. No usar modales para cada respuesta guardada. No mostrar a estudiantes fallos internos como “maintenanceAction is not defined”. Pruebe ambas apariencias en móvil/escritorio y revise capturas, no solo el DOM.

## 5. Seguridad como comportamiento comprobado

Use Auth/MFA de Supabase, RLS y permisos de servidor. Ningún rol, nota, dueño, verificación o `must_change_password` depende de una bandera editable por cliente. Evite sesiones temporales que hereden acceso cuando otra sesión cambia la contraseña. Pruebe la revocación de cuenta con un JWT todavía vigente.

Corregir TLS no elimina Safe Browsing; cambiar de hosting no demuestra limpieza. No incluya ejecutables del sitio anterior ni los publique para diagnóstico. Compruebe dependencias, secretos, redirecciones y contenido; describa el alcance real de la revisión. No garantice ausencia absoluta de malware ni recepción en bandeja de entrada.

Respete los documentos y derechos de los contenidos; no afirme respaldo oficial del MEP. Prepare privacidad/condiciones adaptadas a responsable, finalidad, menores, proveedores y conservación. Haga visibles los campos que requieren revisión humana antes de producción; no invente razones sociales o autorizaciones legales.

## 6. Entregables exigidos a la IA implementadora

| Entregable | Condición |
|---|---|
| Repositorio completo | Código limpio, sin duplicados obsoletos, lockfile, README, `.env.example` sin valores secretos. |
| PostgreSQL | Migraciones pequeñas, restricciones, funciones transaccionales y RLS con pruebas. |
| Importador | 7 especialidades, 35 formas, 2.100 entradas y 14 PDF; dry-run e idempotencia verificadas. |
| Auth y correo | Flujo completo, propietario único, MFA, temporal, recuperación, cola, webhooks y controles probados. |
| Frontend | Pantallas funcionales, responsive, tema claro/oscuro, diálogos accesibles y PWA. |
| Automatización | Scripts de instalación/validación, CI, despliegue y tareas diferidas; no SQL manual obligatorio. |
| QA | Matriz de aceptación con resultado, evidencia, entorno y fallos pendientes. No sustituir pruebas por checklist marcado sin ejecución. |
| Operación | Manual corto para Max, recuperación, respaldo/restauración, cuotas y alertas, política de rollback. |
| Entrega portable | ZIP del proyecto Next.js más instrucciones GitHub→Supabase→Vercel; no se describe como ZIP para `htdocs`. |
| Publicación | Dominio, HTTPS, recepción real y controles de permisos comprobados antes de abrir registro general. |

P0 y P1 de 01 son obligatorios para la salida pública. No considerar terminada una entrega con botones decorativos, registros de prueba expuestos, secretos en Git, bancos públicos, enlaces PDF falsos o funciones de usuario pendientes.

## 7. Formato de la entrega final al propietario

Informe de forma breve:

- Qué quedó construido y dónde acceder.
- Qué pruebas pasaron y en qué entorno.
- Qué datos debe configurar Max, con ruta exacta en cada panel.
- Pasos numerados de publicación que aún dependan de él, sin mezclar pruebas con producción.
- Cualquier bloqueo real, costo o verificación legal/operativa pendiente.

Adjunte repositorio/ZIP y documentos actualizados. Mantenga el historial de decisiones para que otra persona pueda retomar sin repetir esta conversación.
