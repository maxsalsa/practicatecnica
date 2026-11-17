# Actualización 26X.2: aprendizaje e instituciones

## Resultado esperado
Una ampliación incremental, original y verificable de pracTICAtecnica.com: mejores evaluaciones, cobertura transparente y gestión institucional privada. No anunciar toda la malla completa antes de elaborar y revisar sus materiales. Campaña Clara queda fuera.

## Entrega 1 — Cobertura y calidad de las prácticas
- Ampliar el panel existente de cobertura con filtros por modalidad, grado, materia y especialidad, incluido duodécimo ETP.
- Contar por separado capítulos, cuadernillos/PDF, prácticas, pruebas y simulacros disponibles. Un banco general compartido no cuenta como cobertura específica de cada grado.
- Mostrar pendientes por tipo de recurso; no inventar cuántos libros exige el currículo. Registrar metas editoriales explícitas antes de calcular cantidades faltantes.
- Corregir prácticas académicas a 20 preguntas y simulacros a 60. Cuando el banco específico no alcance, mostrar su estado de preparación en vez de repetir cinco preguntas o mezclar materias silenciosamente. Conservar juegos y repasos breves como modos distintos.
- Inventariar duplicados y expandir por diez los ítems únicos progresivamente, sin multiplicar copias para aparentar cobertura. Priorizar Matemática, Español, banca/finanzas y ejemplos ETP aportados.
- Revisar dificultad por habilidad, claridad, ortografía, traducción ES/EN y distractores. Microevaluación: evidencias de aula; macroevaluación: especificaciones y análisis de ítems. No afirmar calibración PISA/ETS sin evidencia.
- Los ejemplos PPP de Redes, Sistemas Operativos, Ciberseguridad y Calidad de Software sirven como base curricular; documentos con estudiantes o salud permanecen privados. Libros de editoriales solo con permiso/licencia comprobados; producir materiales originales y citar fuentes.

## Entrega 2 — Instituciones y permisos
- Institución con nombre, logo propio y personal autorizado; afiliación verificada por administración, no por dominio del correo ni un selector de perfil.
- Solicitudes de permisos con fechas, motivo y adjunto privado de cita/incapacidad. Estados: pendiente, aprobado, rechazado, cancelado. Inicialmente solo Max aprueba, con auditoría y sin autoaprobación.
- Personal adulto verificado de una misma institución puede usar chat interno. Estudiantes quedan excluidos aunque sean mayores de edad; no chat entre alumnos ni exposición de contactos.
- Publicaciones institucionales y avisos dirigidos por institución/grupo: ausencias, salida temprana, reuniones y actividades. Diferenciar bandeja interna de notificaciones de dispositivo; pedir consentimiento para estas últimas y verificar entrega real.
- Datos de salud: mínimos, archivos privados, enlaces temporales, acceso exclusivo solicitante/revisor y política de conservación por aprobar antes de borrado automático.
- Familias: acceso solo a estudiantes vinculados y autorizados; no habilitarlo por conocer un correo o teléfono.

## Entrega 3 — Precios y pagos
- Institución: ₡10.000/año. Personal incluido mediante membresía institucional verificada; esto no concede administración global.
- Estudiante: ₡2.500/año; ₡1.000/año con colegio activo y vínculo confirmado. Docente individual y público general permanecen en ₡3.500/año.
- Actualizar a la vez precios visibles, validación de pagos y autorización. No cambiar pagos históricos ni cobrar a cuentas de prueba.
- Conservar SINPE al 60906359 con comprobante real y confirmación de Max. PayPal/tarjeta: activación solo tras pago confirmado, monto/moneda exactos e idempotencia.
- Verificar disponibilidad de pagos integrados con tarjeta antes de añadir otra opción; la recarga de créditos de Lovable no habilita Stripe para esta aplicación.
- Mensualidades y acceso vitalicio no se venden hasta contar con precios y condiciones aprobados.

## Entrega 4 — Estudiantes y pruebas completas
- Matrícula del docente conserva el correo exacto; el propio estudiante confirma su cuenta y reclama el vínculo. No convertir estudiantes en docentes.
- Avance por grado/materia con intentos canónicos verificados; lectura y anotaciones docentes se muestran separadas de notas, puntos y certificados.
- Probar: docente autorizado → matrícula → estudiante confirmado → práctica/simulacro → lectura del avance por el docente propietario. No presentar registros ficticios como alumnado real.
- Para alumnado real faltan nombres/correos y consentimiento; Aaron es referencia de revisión, no una identidad que se deba crear ni una nota que se deba inventar.

## Entrega 5 — Compatibilidad, seguridad y juegos
- SICAI (https://sicai.cr/) se revisó por su información pública: registro académico, ausencias, permisos, comunicaciones y exportación Excel para SEA. Es referencia funcional, no licencia ni API comprobada; no copiar código, diseño ni datos privados.
- SEA/PIAD/CEA: obtener especificaciones oficiales y ejemplos anonimizados antes de declarar compatibilidad. CSV: vista previa, validación de columnas, autorización y prevención de fórmulas maliciosas.
- Seguridad: matriz de acceso entre instituciones y roles, aislamiento de archivos, XSS/CSRF, límites de envío, validación de adjuntos, sesiones y auditoría. Revisar contra OWASP ASVS y WCAG 2.1 AA sin afirmar certificación automática.
- Juegos originales de seguridad vial carro/moto: altos, rotondas, estacionamiento y prioridades, basados en fuentes viales vigentes. La publicidad de Banco Popular es referencia, no prueba de pago ni afiliación. No simular conducción real certificada.
- IA: MEP aporta documentos, no se ha demostrado un modelo propio. Mantener bloqueo hasta financiación individual verificable; no cargar inferencia a Max ni atribuir API gratuita a Gmail o suscripciones de chat.

## Detalles técnicos
- Conservar TanStack Start/React y clientes generados; funciones privadas autenticadas con autorización en cada operación, no solo ocultando pantallas.
- Incorporar membresías institucionales y permisos mediante cambios aditivos en Lovable Cloud, con GRANT, RLS, auditoría y políticas privadas para adjuntos. No derivar roles de metadatos editables.
- Mantener bancos/respuestas canónicas privados y variantes reconstruibles para corrección. Formas de 20/60 deben tener identidad persistida y corrección consistente al recargar.
- Preservar lógica docente de rol más beta de 13 días o pago específico; ampliar explícitamente con membresía institucional activa verificada.
- No introducir dependencias de servidor incompatibles con Workers ni llamadas manuales al protocolo interno de funciones.
- Logo institucional personalizable, sin usar marcas oficiales como aval. Revisar marca pública; OAuth administrado puede necesitar configuración adicional y no se corrige ocultando texto.

## Verificación y publicación
- Pruebas concretas: 20/60 preguntas, precios 10000/2500/1000, descuento solo con colegio activo, estudiante sin herramientas docentes/chat, Max único aprobador inicial, aislamiento entre dos instituciones y adjuntos privados.
- Probar móvil 351×595 y escritorio, edición/impresión de plantillas largas, CSV, notificaciones y pago en entorno de prueba. Pago real solo con aprobación y comprobante reales.
- Revisión editorial por lote antes de publicar; comprobar seguridad y flujos con sesiones auténticas. Una publicación cuando el lote esté verificado, sin anunciar elementos pendientes.

## Límites y documentación
- Saldo consultado: 48,90 créditos; es una lectura puntual, no presupuesto garantizado ni confirmación de pago de $15. No gastar todo automáticamente.
- No prometer finalización de toda la malla con ese saldo ni ejecución programada a las 18:00 sin un mecanismo configurado.
- Entregar instrucciones Markdown para Gemini con fases, criterios de aceptación y bloqueos. Gemini no obtiene acceso al proyecto, claves ni documentos privados por recibir el plan.