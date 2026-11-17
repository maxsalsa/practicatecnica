# SEA, permisos individuales y expertos por materia

## 1. SEA oficial: canal autorizado y documentos verificables
- Mantener separados los registros escolares y las calificaciones de práctica.
- Revisar los manuales oficiales y localizar un canal de integración o importación autorizado para notas, asistencia, actas e historial.
- No automatizar el ingreso con credenciales ajenas, inventar una API ni presentar un archivo propio como formato oficial.
- Si no existe documentación suficiente, mostrar el acceso al SEA oficial y el estado «Conexión pendiente de autorización». El envío automático y el formato oficial quedan bloqueados hasta obtener especificaciones del MEP y un ejemplo anonimizado autorizado.
- Conservar el QR de comprobantes institucionales como consulta de integridad del registro local; nunca como recibo de entrega al SEA ni firma digital certificada.

## 2. Alcance por rol y permisos por usuario
En la página de roles, mostrar la matriz y permitir seleccionar una persona de la institución, activar o desactivar sus capacidades compatibles y guardar con fecha, autor y valores anteriores/nuevos.

| Rol | Puede ver | Puede hacer |
| --- | --- | --- |
| Docente | Material de expertos, sus recursos y seguimiento autorizado de su alumnado | Preparar contenidos, tareas y borradores; subir contenidos de expertos si mantiene ese permiso |
| Estudiante | Sus prácticas, tareas, resultados y avisos destinados a su sección | Resolver y entregar actividades autorizadas; sin gestión institucional, expedientes médicos ni chat entre estudiantes |
| Dirección | Gestión de su centro, expedientes privados y vigencia de pago institucional | Administrar usuarios delegables, aprobar campañas, emitir notas/órdenes y gestionar horarios según sus permisos |
| Subdirección | Gestión de su centro y expedientes privados; sin fechas de pago | Administrar usuarios delegables, aprobar campañas, emitir notas/órdenes y gestionar horarios según sus permisos |

- Permisos individuales de esta entrega: contenidos de expertos, creación de borradores institucionales, aprobación de campañas, emisión de notas/órdenes y gestión de horarios. Cada control afectará tanto la pantalla como la autorización real.
- Ningún permiso eleva a estudiantes a funciones docentes o de jefatura. Dirección/Subdirección no pueden modificar su propia autoridad, la de Max ni la de otras jefaturas; sus designaciones siguen reservadas a Max.
- Los expedientes médicos permanecen exclusivos de Dirección/Subdirección y no son delegables. Se mantienen pagos y poderes globales fuera de estas casillas.
- Conservar las reglas de suscripción existentes: un permiso institucional no activa por sí solo un plan individual docente.

## 3. Expertos por materia
- Crear una página privada dentro del contexto de la institución, con selección de materia, lista de publicaciones y formulario de título, contenido y archivo opcional.
- Admitir documentos, videos y audios mediante almacenamiento privado, límites explícitos y validación de tipo/tamaño.
- Lectura exclusivamente para docentes y Dirección de la misma institución, como solicitó Max; Subdirección no obtiene acceso a esta nueva página por defecto.
- Docentes con permiso pueden subir y administrar sus propios contenidos; Dirección puede moderarlos. Estudiantes, familias, otras instituciones y el administrador global sin pertenencia autorizada quedan excluidos.
- Enlaces temporales; revocar acceso al retirar la publicación. No subir datos estudiantiles ni certificados médicos a esta biblioteca.

## 4. Prueba de notas y órdenes
- Reutilizar la cuenta real de Max con Dirección en Escuela de Prueba GICM. No crear una cuenta Gmail externa ni inventar una identidad confirmada.
- Emitir una constancia de notas ficticia y una orden ficticia, identificadas como prueba.
- Descargar ambos PDF y comprobar el nombre del centro, notas o texto de la orden, firmante derivado de la cuenta, espacio manuscrito y QR.
- Abrir el QR y confirmar que verifica el registro sin divulgar notas, titular ni texto privado.
- No afirmar firma manuscrita ni certificada: el PDF contiene aprobación registrada e identidad del emisor. Probar el escudo del CTP requiere una cuenta con Dirección/Subdirección de ese centro, sin conceder permisos productivos artificiales.

## 5. Opciones de respuesta corregidas
- Microevaluación: tres opciones A, B y C.
- Macro, estandarizadas, MOPT, simulacros y prácticas de idiomas: cuatro opciones A, B, C y D; sin E, según la corrección confirmada por Max.
- Conservar los límites acordados y las claves canónicas de calificación. Cualquier selección de tres opciones conservará la correcta y tendrá identificación de formato reconstruible por el servidor; no truncar respuestas ni calificar contra otro orden.
- Añadir pruebas de cantidades, conservación de respuesta correcta y reconstrucción de formatos; no anunciar cobertura editorial completa de bancos aún no revisados.

## 6. Indicadores de logro y rúbricas
- Ampliar la herramienta docente existente con indicadores observables por materia y criterios redactables, vinculados a la actividad o contenido elegido.
- Cada criterio tendrá cuatro descriptores editables:
  - **3 — Logrado:** cumple el indicador correctamente y aporta la evidencia solicitada.
  - **2 — Con errores:** muestra un logro parcial; la evidencia presenta errores u omisiones que requieren corrección.
  - **1 — Sin logro demostrado:** participa o presenta trabajo, pero no aporta evidencia suficiente del indicador.
  - **0 — Faltó / no presentó:** no existe evidencia evaluable por ausencia o falta de entrega; registrar el motivo por separado.
- La ausencia no se interpretará como diagnóstico de dominio ni se convertirá automáticamente en una nota oficial SEA.
- Permitir revisar y redactar cada descriptor antes de usar o exportar la rúbrica; conservar el encabezado institucional y no atribuir aprobación oficial MEP.
- Probar los valores exactos 3, 2, 1 y 0 y su separación de las calificaciones verificadas de prácticas.

## Detalles técnicos
- Cambios aditivos en Cloud: permisos por institución/usuario, historial de cambios y publicaciones privadas de expertos; políticas y funciones autorizadas para cada capacidad.
- Integrar los permisos en los controles existentes de recursos, publicaciones, horarios y emisión de documentos, sin sustituir restricciones de titularidad ni reglas de suscripción.
- Reutilizar los encabezados institucionales, componentes y generador PDF/QR existentes.
- Pruebas de reglas: roles permitidos/denegados, institución ajena, capacidad revocada, estudiante sin elevación, autoridades protegidas y límites de archivos.
- Verificar asignación con destinatario autorizado cuando esté disponible; no seleccionar ni elevar cuentas ajenas para fabricar una prueba.
- Comprobar documentos y página de expertos con sesión real, y diseño móvil de 351 px; revisar errores y guardar los cambios. No declarar pruebas de cuentas ausentes como realizadas.

## Bloqueos explícitos
- Conexión y formato SEA oficial: documentación técnica y autorización del MEP aún no verificadas.
- Cuenta de Dirección nueva: requiere una identidad Gmail real confirmada; se usará la cuenta de Dirección de prueba existente.
- Pruebas de destinatario docente y del CTP: requieren cuentas y pertenencias autorizadas disponibles.