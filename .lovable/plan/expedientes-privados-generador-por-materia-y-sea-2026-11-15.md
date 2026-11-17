# Expedientes privados, generador por materia y SEA

## 1. Expedientes privados por estudiante
- Añadir una pestaña de expediente en Mi institución, exclusiva para Dirección y Subdirección de ese centro. Superadministración no obtiene acceso médico por su rol global.
- Seleccionar estudiantes ya vinculados a la institución y guardar fotos, certificados médicos y otros documentos con título, categoría, autor y fecha.
- Usar almacenamiento privado separado de los documentos compartidos. Comprobar institución, estudiante y rol tanto al subir como al consultar; enlaces breves de 30 segundos, sin publicación ni QR con datos médicos.
- Registrar altas y bajas de documentos. Mostrar errores, carga y lista vacía sin revelar expedientes de otros centros.
- Probar subida y consulta con un archivo de prueba no médico, y negativas de acceso para docentes, familias, estudiantes y otra institución.

## 2. Generador por materia, examen y simulacro
- Incorporar la nueva distinción: microevaluación con tres opciones; macroevaluación, admisión y pruebas estandarizadas quedan pendientes de aclarar cuatro opciones A–D frente a cinco A–E. Preservar las claves canónicas al adaptar distractores.
- Unificar selección de modalidad, nivel y materia con el catálogo curricular existente. Mostrar únicamente bancos realmente disponibles; las materias sin contenido siguen explícitamente pendientes.
- Reutilizar la generación paramétrica privada y las formas de pregunta existentes; no duplicar preguntas para aparentar cobertura.
- Ofrecer práctica guiada con corrección por pregunta y examen/simulacro con corrección al entregar. Mantener calificación autorizada y no atribuir notas oficiales del SEA a ejercicios de práctica.
- Mantener pausada la generación con IA hasta disponer de autorización de gasto individual verificada. No consumir créditos de Max para fabricar cobertura.
- Hay una diferencia pendiente con la regla histórica de tres intentos por práctica y dos simulacros: actualmente algunos flujos permiten repetir sin límite. No cambiar esos límites dentro de este lote sin decisión expresa de Max; no anunciar que están implementados.

## 3. SEA oficial del MEP
- La página oficial consultada describe el SEA y enlaza manuales, pero no documenta una API ni autorización de envío automático: https://www.mep.go.cr/sea.
- Revisar los manuales para identificar formatos y reglas exactas de notas, asistencia, actas e historial. No inventar ponderaciones, columnas ni formatos oficiales.
- La conexión de envío queda bloqueada hasta obtener documentación oficial del canal de integración y autorización institucional del MEP. No pedir contraseñas ni automatizar una sesión ajena.
- El QR verifica únicamente documentos emitidos y registrados en pracTICAtecnica.com; no demuestra recepción en SEA, aval del MEP ni firma digital certificada.

## 4. Comprobación y publicación
- Ejecutar pruebas de autorización, formatos de pregunta y calificación; comprobar las pantallas con sesión autorizada y en teléfono.
- Revisar seguridad, guardar los cambios y solicitar publicación en practicatecnica.com de lo efectivamente comprobado.
- Informar por separado lo publicado, lo pendiente de cobertura curricular y la conexión SEA todavía bloqueada.

## 5. Notas y órdenes institucionales
- Añadir emisión y aprobación de constancias de notas y órdenes para Dirección y Subdirección del centro, con comprobante privado guardado y registro de autor, aprobador y fecha.
- Presentación azul formal con el escudo seleccionado —CTP Mercedes Norte en su institución—, cuadrícula de notas, nombre y cargo firmante y espacio para firma manuscrita.
- Generar PDF y QR de consulta mínima verificable; documentos no aprobados no se presentan como firmados. La aprobación registrada no equivale a firma digital certificada ni confirma recepción en SEA.

## 6. Página de roles y permisos
- Crear una página de administración de usuarios de su institución para Dirección y Subdirección con roles institucionales y permisos explícitos por función.
- Verificar cuentas Gmail confirmadas, institución del actor y destinatario; registrar quién concede o retira permisos y cuándo.
- No permitir autoascenso, conceder Superadmin, modificar instituciones ajenas ni obtener acceso médico por un rol global. Max sigue siendo el único Superadmin.
- Mantener la designación de Dirección bajo control de Max; la gestión cotidiana permite asignar personal y permisos dentro del centro, no sustituir a su máxima autoridad ni alterar pagos.
- Probar que familias, estudiantes y personal sin autorización no pueden asignar permisos aunque intenten hacerlo fuera de la pantalla.

## Detalles técnicos
- Crear metadatos del expediente y bitácora con permisos por institución y rol, políticas de acceso y validación del estudiante miembro. Crear el contenedor privado mediante Storage API, no SQL.
- Reutilizar el catálogo público de metadatos y el controlador autorizado de contenido; no importar bancos de respuestas al navegador.
- Registrar las decisiones estructurales en AGENTS.md y mantener tareas pendientes en roadmap.md.