# Motor de estudio y contenido

Las migraciones `202609240002_content.sql` y `202609240003_study.sql` contienen el motor PostgreSQL. La interfaz no calcula notas ni selecciona preguntas por su cuenta.

## Importación privada

El script usa `public.service_import(action,payload)` con credenciales de servicio, nunca desde el navegador.

| Acción | Payload |
|---|---|
| `specialty` | `{specialty: entradaOriginalDelCatalogo}`; código, nombre, siglas, slug, áreas y cinco formas. |
| `questions` | `{specialty:"3006", form:"A", questions:[itemOriginalConSourceHash]}`; máximo 100 por lote. `source_hash` es SHA-256 hexadecimal de los datos originales. |
| `blueprint` | `{specialty, form, quotas:[{area,indicator,difficulty,count}]}`. Área base cero; cuotas suman 60. |
| `material` | `{specialty,kind,title,filename,bucket:"study-materials",path,sha256,bytes}`. `kind`: `tabla` o `libro`. PDF previamente subido al bucket privado. |
| `publish` | `{specialty}`. Exige cinco formas, al menos 60 preguntas publicadas por forma, cuotas realizables y ambos materiales. La fuente inicial se valida con exactamente 60 por forma. |

Importación idéntica: idempotente. Hash cambiado: versión en borrador que conserva la anterior publicada. Los snapshots de intentos existentes nunca cambian al editar el banco. La publicación valida todas las cuotas y revierte si alguna queda sin suficientes preguntas.

## RPC con sesión de la persona

`public.study(action,payload)` usa `auth.uid()` y comprueba sesión, cuenta, época de seguridad y permisos. `src/lib/server/study.ts` conserva el JWT de la persona.

| Acción | Entrada |
|---|---|
| `start` | `{specialty,form}`; crea o retoma el intento abierto. |
| `attempt` | `{attemptId}`; metadatos y mapa de preguntas. |
| `item` | `{attemptId,position}`; pregunta y feedback autorizado. |
| `answer` | `{attemptId,position,optionId}`; confirmación inmutable. |
| `flag` | `{attemptId,position,flagged}`; marca para revisar sin calificar. |
| `submit` | `{attemptId}`; entrega idempotente. |
| `progress`, `overview` | `{specialty}`; progreso propio, formas y materiales. |
| `material` | `{materialId}`; ruta publicada para que el servidor firme una URL. |
| `tracking`, `students` | Propietario administrativo. Filtros `search`, `group`, `specialty`, `form`, `state`, `page`, `pageSize` (máximo 100). |
| `student_edit` | Propietario: `{userId,name?,group?,specialty?}`. Identidad gestiona correo, estado y permisos. |
| `content_list` | Propietario: filtros de especialidad, forma y estado editorial. |
| `content_save` | Propietario: `{questionId,data}` crea borrador. |
| `content_publish` | Propietario: `{versionId}` publica preservando snapshots. |
| `content_create` | Propietario: `{specialty,form,data}` crea borrador; `data.id` único por especialidad y forma. |
| `content_retire` | Propietario: `{versionId}`; revierte si una cuota queda imposible. |
| `materials_list` | Propietario: `{specialty?}` devuelve versiones y metadatos. |
| `material_save` | Propietario: metadatos de PDF validado/subido por servidor; borrador idempotente por SHA-256. |
| `material_preview` | Propietario: `{id}` firma acceso de revisión a borrador. |
| `material_publish` | Propietario: `{id}` publica; permite regresar a versión anterior. |
| `blueprint_list` | Propietario: `{specialty?}` devuelve versiones y cuotas. |
| `blueprint_save` | Propietario: `{specialty,form,quotas}`; valida grupos y suma 60. |
| `blueprint_publish` | Propietario: `{id}`; valida capacidad real y publica/recupera versión anterior. |

Seguimiento `from`/`to`: `YYYY-MM-DD`, fecha de inicio, días completos de Costa Rica con ambos extremos incluidos. CSV reutiliza filtros y autorización.

## Reglas comprobables

- Cinco intentos por persona, especialidad y forma; unicidad y bloqueo transaccional evitan un sexto intento y dos abiertos.
- Conserva cuotas por área, indicador y dificultad, en el mismo modo. Prioriza preguntas menos asignadas y desempata con UUID aleatorio de PostgreSQL.
- 60 snapshots inmutables; preguntas y opciones mezcladas, IDs de opción aleatorios sin codificar la correcta.
- Misma respuesta confirmada: retorno idempotente. Cambiarla: conflicto. Entrega y confirmación toman el mismo bloqueo.
- Práctica: feedback al confirmar y entrega automática en 60. Simulacro: ninguna clave, explicación o nota hasta entregar, incluso en detalle administrativo.
- Nota final `correctas × 100 / 60`, dos decimales. Parcial de práctica `correctas × 100 / confirmadas`. Omitidas separadas.
- Gráficos usan respuestas cuyo feedback está disponible; simulacro abierto no filtra resultados.
- Vista estudiantil del propietario: solo sus datos. Seguimiento excluye al propietario. Estudiantes no reciben datos ajenos ni modifican permisos.

La migración004 conserva inscripción cerrada y privacidad pendiente al instalar. Los trabajos de PDF quedan ligados al propietario, tamaño, especialidad, tipo y SHA-256 de la versión validada; vencen en 30 minutos si no finalizan. Una finalización no puede reasignarse a otra versión.

Las pruebas PostgreSQL/PGlite comprueban la lógica local. Supabase alojado, correo y dominio requieren pruebas reales después de configurar los servicios; no se consideran comprobados por ejecutar pruebas locales.
