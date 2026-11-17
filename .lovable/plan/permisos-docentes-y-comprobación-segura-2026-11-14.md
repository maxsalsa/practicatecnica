# Permisos docentes y comprobación segura

## Cambios
- Separar el rol docente del acceso estudiantil/general. Pagar estos planes no habilita herramientas docentes.
- Permitir herramientas docentes durante los 13 días de prueba únicamente a docentes autorizados; después exigir plan docente confirmado y vigente. Conservar acceso administrativo de Max.
- Aplicar esta regla a planeamientos, PPP, cotidianos, proyectos, tareas, matrículas y seguimiento. No permitir que un usuario se autoasigne el rol docente.
- Mantener gestión de roles exclusiva de administración, con verificación del permiso en cada operación.
- Verificar edición de las plantillas y escudo opcional CTP Mercedes Norte; el reglamento permanece un documento oficial enlazado sin alterar su texto.

## Pruebas
- Probar estudiante, público general, docente en prueba, docente con pago pendiente, docente con pago confirmado y administrador.
- Usar datos ficticios explícitos, sin importar nombres o informes privados ni afirmar vinculación de estudiantes reales.
- Comprobar matrícula, identidad verificada y lectura docente por materia con cuenta de prueba controlada cuando esté disponible; no enviar correos ni generar cargos reales.
- Revisar Inicio con grados cubiertos y conservar separación entre lectura declarada y resultados verificados.

## Detalles técnicos
- Reutilizar roles separados, pagos persistidos y comprobaciones de identidad existentes; centralizar autorización docente en una función autenticada y aplicar controles de acceso a las operaciones privadas.
- Añadir tests concretos para la política de 13 días y planes; no confiar en selectores de perfil ni en permisos guardados en el navegador.
- Incorporar los hallazgos de la revisión profunda ya iniciada antes de difundir. No publicar en esta etapa.

## Límites pendientes
- IA: no activar gasto sin financiación gratuita verificable; los documentos MEP son fuentes, no modelos de IA acreditados del MEP.
- La malla restante requiere redacción original y revisión curricular por bloques; Open English sirve como referencia funcional, nunca como contenido copiado.
- Las pruebas ficticias no equivalen a la comprobación de avances de alumnos reales.