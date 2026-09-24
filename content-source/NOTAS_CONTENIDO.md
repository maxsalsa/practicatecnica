# Contenido original: importación, cuotas y límites conocidos

Fecha de auditoría: 24 de septiembre de 2026. Estos resultados proceden de lectura y validación estática local del paquete PHP/MySQL 9.9.1. No constituyen una prueba de la futura aplicación Next.js/Supabase, una revisión pedagógica completa ni una certificación de vigencia curricular o derechos de distribución. Los casos de aceptación del sistema están en `../04_MATRIZ_ACEPTACION.md` y aún deben implementarse y ejecutarse.

## Archivos y autoridad

- `catalogo_original.json`: copia original del catálogo, sin normalización ni cambios.
- `especialidades/{codigo}/bank.json`: siete bancos originales; conservar bytes y contenido. No importar desde un texto resumido por una IA.
- `especialidades/{codigo}/materials/`: catorce PDF originales, dos por especialidad.
- `SHA256SUMS.json`: manifiesto de hashes SHA-256 de 22 originales: catálogo + siete bancos + catorce PDF. Las rutas son relativas a este directorio `contenido/`.
- `inventario.json`: inventario de distribución entregado en el paquete.
- `blueprints.json`: archivo DERIVADO, versión de esquema 1; cuotas exactas de los 35 formularios por `area`, `indicator`, `difficulty`, con hash del banco fuente. No contiene contenido editorial nuevo ni modifica originales.
- `auditoria_contenido.json`: archivo DERIVADO de auditoría estática, versión de esquema 1. Incluye presencia/tipos de campos, distribuciones, grupos con selección obligada, PDF y errores de validación. `source_hashes_match: true` significa que los 22 originales coincidían con su manifiesto al crear este informe.

La especificación `../01_REQUERIMIENTOS_SISTEMA.md` manda sobre el comportamiento objetivo. Los bancos originales mandan sobre los textos y las cuotas de la primera versión de contenido. La implementación PHP histórica es referencia de la lógica, no código que deba copiarse sin adaptar seguridad y persistencia.

## Inventario exacto

Son **7 especialidades, 35 formas, 2.100 registros de preguntas y 14 PDF**. Cada especialidad tiene 300 entradas; cada forma tiene exactamente 60. En todas las formas las preguntas tienen cuatro opciones distintas y una respuesta correcta de índice entero 0–3. Los 300 IDs son únicos dentro de cada especialidad, pero pueden repetirse entre especialidades.

| Código | Nombre exacto | Siglas | Indicadores distintos por forma | Áreas |
|---|---|---|---:|---:|
| 2017 | Electrónica Industrial | EI | 55 | 8 |
| 3002 | Administración, Logística y Distribución | ALD | 48 | 5 |
| 3006 | Ciberseguridad | C | 60 | 5 |
| 3010 | Contabilidad | CT | 49 | 5 |
| 3016 | Desarrollo Web | DW | 47 | 5 |
| 3019 | Ejecutivo Comercial y Servicio al Cliente | EC | 38 | 4 |
| 3001 | Accounting | AC | 53 | 7 |

En todas las especialidades: A = Práctica 1, B = Práctica 2 y C = Práctica 3, modo `practice`; D = Práctica pro 1 y E = Práctica pro 2, modo `pro`. Las cinco están disponibles; `total` y `expected` son 60. No existen cinco guiadas más tres simulacros ni una especialidad de Electromecánica en este paquete.

Las entradas son distintas por huella de enunciado + opciones ordenadas dentro de cada especialidad (300 por especialidad). Esto no significa que sean 300 variantes pedagógicamente independientes, ni permite mezclarlas entre modos o especialidades sin límites. No se realizó revisión semántica exhaustiva de similitudes.

## Campos: contrato de importación

| Campo fuente | Tipo JSON y significado | Presencia |
|---|---|---|
| `id` | string; ID fuente como `A01`, separado de UUID interno y posición | 2.100 |
| `number` | integer; posición fuente 1–60; no ordinal de intento | 2.100 |
| `area` | integer; índice de base cero en `areas` del catálogo de esa especialidad | 2.100 |
| `level` | string de curso o integer 10/11/12; ver normalización abajo | 2.100 |
| `indicator` | string; identificador usado en las cuotas | 2.100 |
| `page` | integer; referencia de página original | 2.100 |
| `indicatorText` | string; descripción de indicador | 2.100 |
| `stem` | string; enunciado completo | 2.100 |
| `options` | array de exactamente cuatro strings; índices 0–3 | 2.100 |
| `answer` | integer; índice de la única opción correcta | 2.100 |
| `explanation` | string; explicación general de la solución | 2.100 |
| `difficulty` | string `Básica`, `Media` o `Alta` | 2.100 |
| `origin` | string; procedencia didáctica, conservar literal | 2.100 |
| `distractors` | objeto cuyas claves son índices de las tres opciones incorrectas, con su explicación | 64; ausente en 2.036 |
| `language` | string `es` o `en` | 1.140; ausente en 960 |
| `official_indicator` | string; referencia adicional de Ciberseguridad | 300; ausente en 1.800 |

No hay campo separado universal `context`, imágenes de pregunta, puntuación por ítem, tiempo límite ni nivel de dominio. El contexto que exista está dentro del enunciado. No inventar campos de origen ni valores oficiales al normalizar.

### Normalizaciones controladas

- Clave estable sugerida de origen: `(specialty_code, source_id)`. Conservar `source_form` y `source_number` por separado. `A01` solo no es una clave global. Un intento puede usar una pregunta fuente B dentro de una plantilla A si cumple todas las cuotas del modo.
- `area` exige conservar el orden del arreglo del catálogo. En la base puede crearse un UUID de área, pero con referencia estable `(specialty_code, source_area_index)`. Ordenar nombres sin remapear rompe todas las preguntas.
- `level`: Ciberseguridad y Ejecutivo usan enteros 10, 11 y 12. Las otras cinco especialidades usan strings `Décimo`, `Undécimo`, `Duodécimo`. Se puede derivar un `grade_level` 10/11/12, conservando el original en `source_metadata`; rechazar valores desconocidos en vez de adivinarlos.
- `language`: Accounting tiene por forma 15 `es` + 45 `en`; Ejecutivo 40 `es` + 20 `en`; Contabilidad 60 `es`; Desarrollo Web B–E 60 `es`, pero A omite el campo. Electrónica, Administración y Ciberseguridad lo omiten por completo. El idioma ausente es un valor desconocido en la importación; no es prueba de español ni error que autorice a descartar el ítem. Una normalización posterior debe ser explícita y revisada.
- `official_indicator` está en los 300 ítems de Ciberseguridad, con strings como `1.1`. No sustituye al `indicator` usado por el blueprint. El PHP lo guarda en el snapshot pero no lo expone en la proyección estudiantil; se debe conservar al importar.
- Conservar Unicode, tildes, saltos de línea, signos, inglés y textos literales. Renderizar como texto seguro; no tratar el contenido como HTML ejecutable. Cualquier edición posterior debe crear una nueva versión y dejar intacta la inicial.
- `distractors` es un objeto, no un array garantizado ni una lista ordenada. Al mezclar opciones, permutar sus claves con la misma transformación que `answer`. No asociar explicación por posición fuente después de mezclar.

Validaciones estáticas ejecutadas en este paquete: cuatro opciones no vacías y distintas; índice correcto entero válido; índice de área válido; explicación general no vacía; cobertura de las tres opciones incorrectas en los 64 objetos de distractores; pools suficientes para cada cuota actual; concordancia de hashes de los 22 originales. No se detectaron errores en esas comprobaciones. La auditoría estática no confirma que la respuesta marcada sea correcta en términos disciplinares.

## Cuotas exactas y lectura de blueprints.json

Cada `specialties[].forms[]` contiene `form`, `mode`, `total` y `quotas[]`. Cada cuota tiene `area`, `indicator`, `difficulty`, `count`. La suma de `count` debe ser 60. Comparar estas cuotas agrupadas con cada nuevo snapshot; no comprobar solo la suma final.

Ejemplo de estructura (ilustrativo, no sustituye a las cuotas reales):

```json
{"area": 0, "indicator": "1:1.1", "difficulty": "Básica", "count": 1}
```

Las cinco formas de cada especialidad comparten la distribución por área y por par área–indicador. La dificultad cambia y forma parte de la cuota conjunta. Los nombres de área completos y su orden permanecen en catálogo y en cada especialidad del archivo derivado. Para implementación, utilizar las cuotas del JSON, no esta tabla resumida.

| Código | A: Básica/Media/Alta | B: Básica/Media/Alta | C: Básica/Media/Alta | D: Básica/Media/Alta | E: Básica/Media/Alta |
|---|---|---|---|---|---|
| 2017 | 51/8/1 | 1/59/0 | 1/59/0 | 0/0/60 | 0/0/60 |
| 3002 | 60/0/0 | 0/60/0 | 0/60/0 | 0/0/60 | 0/0/60 |
| 3006 | 49/11/0 | 0/60/0 | 0/60/0 | 0/49/11 | 0/13/47 |
| 3010 | 60/0/0 | 0/60/0 | 0/60/0 | 0/0/60 | 0/0/60 |
| 3016 | 24/27/9 | 0/60/0 | 0/60/0 | 0/0/60 | 0/0/60 |
| 3019 | 24/27/9 | 54/6/0 | 0/60/0 | 0/42/18 | 0/33/27 |
| 3001 | 60/0/0 | 0/60/0 | 0/60/0 | 0/0/60 | 0/0/60 |

La dificultad es metadato editorial estimado; no equivale a una calibración psicométrica. No convertir a un porcentaje estándar como 40/45/15 porque algunas formas coincidan con ese reparto.

Accounting incluye nombres declarados editoriales en el propio catálogo: «Computing · rótulo editorial, sin encabezado en la tabla» y «Business foundations · rótulo editorial, sin encabezado en la tabla». Conservar esa aclaración; no presentarlos como títulos oficiales verificados.

## Selección actual y límites de variedad

La lógica histórica en `private/progress.php:random_bank` reúne A/B/C entre sí y D/E entre sí, de la misma especialidad. Agrupa por `area|indicator|difficulty`; deduplica por huella de enunciado y opciones ordenadas. Baraja cada grupo y prioriza preguntas menos vistas por ese usuario. Cuenta exposiciones de los snapshots de hasta los últimos 100 intentos de la especialidad, incluso preguntas nunca contestadas; con el límite actual solo puede haber 25 intentos por especialidad.

Luego cubre cada slot de la plantilla elegida con una huella no usada dentro del nuevo intento. Baraja opciones, corrige su correspondencia con respuesta y distractores, baraja preguntas y guarda el snapshot completo. Si faltan preguntas distintas para una cuota, falla; no sustituye otra dificultad ni reduce la prueba. No agrupa por idioma/curso/página. En los datos actuales no hay diferencias de curso, página o texto de indicador dentro de un grupo; hay 25 grupos guiados de Desarrollo Web que combinan `language` ausente con `es`.

Cada especialidad tiene un pool de **180 preguntas guiadas y 120 pro**. Ningún grupo actual es insuficiente para un intento. Sin embargo, algunos tienen exactamente tantas alternativas como requiere una cuota, por lo que deben aparecer todas cada vez.

La tabla siguiente es el número mínimo de contenidos obligatoriamente repetidos en todos los intentos de esa misma forma por agotamiento de grupo; no predice otras repeticiones posibles por historial o azar:

| Código | A | B | C | D | E |
|---|---:|---:|---:|---:|---:|
| 2017 | 51 | 2 | 0 | 0 | 0 |
| 3002 | 60 | 0 | 0 | 0 | 0 |
| 3006 | 49 | 0 | 0 | 38 | 38 |
| 3010 | 60 | 0 | 0 | 0 | 0 |
| 3016 | 33 | 0 | 0 | 0 | 0 |
| 3019 | 9 | 13 | 13 | 27 | 30 |
| 3001 | 60 | 0 | 0 | 0 | 0 |

**Interpretación:** en A de Accounting, Administración y Contabilidad se incluyen los mismos 60 contenidos en cada intento: solo cambian orden de preguntas y opciones. En Ciberseguridad D y E hay 38 contenidos forzados por forma. Los grupos exactos están en `auditoria_contenido.json`, campo `forced_groups`.

No prometer “preguntas completamente nuevas en cada intento”, “sin repetición en cinco intentos” ni “15 respuestas correctas por letra”. La permutación independiente puede repetir un orden y no garantiza equilibrio A/B/C/D. Cinco intentos sin repetición de una forma necesitarían al menos cinco veces su cuota en cada grupo. Garantizarlo entre las tres guiadas exigiría cubrir la suma de cuotas de sus quince intentos: 900 exposiciones frente a 180 preguntas actuales; en pro, 600 frente a 120. Ampliar banco es trabajo editorial posterior y no autoriza a alterar las cuotas existentes.

## Explicación general frente a distractores

Todas las 2.100 preguntas tienen `explanation`; solo **64** incluyen explicación específica para las tres opciones incorrectas:

- 2017 — Electrónica Industrial, forma A: 4 preguntas (A01, A02, A03, A04).
- 3016 — Desarrollo Web, forma A: 60 preguntas, todos sus 60 ítems.

Las otras 2.036 no tienen este detalle. Su ausencia es parte del dato original y no debe bloquear la importación ni producir un texto inventado. Si se amplía la cobertura, publicar solo después de revisar cada explicación y registrar una versión nueva. En modo pro, ni explicación general ni distractores se envían al cliente antes de entregar.

## PDF: integridad y funcionamiento

Todos los archivos `Tabla_DGEC_2026.pdf` tienen el mismo nombre base, pero contenido diferente. Utilizar una ruta/ID que incluya código de especialidad, y conservar hash y versión. Los nombres «oficial» del catálogo son etiquetas de origen; corroborar procedencia, vigencia y derechos antes de publicación abierta según CON-04.

| Código | Archivo | Bytes | SHA-256 |
|---|---|---:|---|
| 2017 | `Libro_electronica_industrial.pdf` | 401961 | `69e5bdf1bf04549daca598bd3503837ea416c5dac880cfefbd101e069140cfb6` |
| 2017 | `Tabla_DGEC_2026.pdf` | 312929 | `77f9558ba309404c62b2217ed55339de9629578dc188233d814c4521d20e2185` |
| 3002 | `Libro_administracion_logistica.pdf` | 308058 | `a0ac0d540f35da3e44f212a44669c7bb9d037ee2a094a1945ce54c6f114abe66` |
| 3002 | `Tabla_DGEC_2026.pdf` | 271817 | `07b00d5a2466e35d2d37db26e839af1e8f17f6ad69693e8b96394f8bf53bfd46` |
| 3006 | `Libro_ciberseguridad.pdf` | 4911531 | `c34e69fe980241c84057372af465a77776a3081f4b7f21c1d8337aeea18ad2a7` |
| 3006 | `Tabla_DGEC_2026.pdf` | 312483 | `996bc2a6a936a1f605e43587f3dbd84c98482f9cdeeb9df61e7dbc90cd3cf681` |
| 3010 | `Libro_contabilidad.pdf` | 315863 | `69e4093438d83d1412dc1ad477b8bc9782b3948d067834ebc3c5480b92879ed7` |
| 3010 | `Tabla_DGEC_2026.pdf` | 291224 | `322a666d9dc0e644473d702b78c891431d1ad6be0288e98e4639815881556a3f` |
| 3016 | `Libro_desarrollo_web.pdf` | 2613421 | `d598886f79aee111bf814191ec2899a2e9a451928f99a0cceea643a3087f8e19` |
| 3016 | `Tabla_DGEC_2026.pdf` | 334133 | `6a69ec1db3fefaeed30c25d61088c6ed2c4f17fb809b971d0c5e0271f794911c` |
| 3019 | `Libro_ejecutivo_comercial.pdf` | 2153548 | `897f50401042c294599b6faf1cc9a537b8da5900336d107426c3a10ff3514fbf` |
| 3019 | `Tabla_DGEC_2026.pdf` | 276526 | `a84c0734065bb04d56d5a31230f5fd564c95fb8107089c5c926afe40cbb5b5f2` |
| 3001 | `Libro_accounting.pdf` | 332209 | `6db5adbaaad886dfc91b3e8c805a681666bf4f807f76c9fc625710e34f3db3f7` |
| 3001 | `Tabla_DGEC_2026.pdf` | 324539 | `1587ee26d05769f5774f4c7efabc17797d954c02ef79e7129facc0993fc1e2c7` |

En la aplicación anterior los materiales se sirven por ruta autenticada, inline y abiertos en nueva pestaña; no existe visor con anotaciones o progreso de lectura. El destino solicitado debe usar bucket privado y acceso autorizado, incluyendo descarga; no colocar estos archivos en `public/` ni precachearlos.

El “PDF de resultados” anterior es un informe HTML que llama `window.print()` y permite guardar como PDF con el navegador. La revisión docente usa el mismo mecanismo. No hay generador PDF de servidor, certificado de aprobación ni firma oficial. La nueva versión debe conservar informe imprimible según la especificación, respetando si las soluciones ya pueden revelarse.

Un respaldo SQL no incluye los bancos ni los PDF. La estrategia del nuevo sistema debe respaldar base y Storage, con restauración verificada.

## Migración e identidad histórica

Se importan solo los contenidos; no se importan usuarios, contraseñas, semillas TOTP, sesiones ni progreso de MySQL. No ejecutar `backup.sql` histórico en Supabase. Cada nuevo intento debe guardar versión, snapshot, posición y correspondencia de opciones; ninguna actualización de pregunta o blueprint puede recalcular su nota retrospectivamente.

Usar `--dry-run`, hashes, validación previa y lotes transaccionales idempotentes. Ante error, informar ruta, forma, `id` y número fuente. Nunca eliminar un ítem o sustituirlo por uno generado para alcanzar 60. Los archivos derivados facilitan validar; no sustituyen los originales ni permiten omitir una validación de importación propia.
