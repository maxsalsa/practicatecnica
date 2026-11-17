# Malla y panel docente con cobertura real

## 1. Malla de primaria y secundaria
- En Inicio mostrar únicamente materias y grados con materiales publicados, con accesos directos a los simulacros específicos cubiertos; no incluir asignaturas pendientes en esa selección.
- Organizar los grados 1.º–6.º y 7.º–11.º utilizando las asignaturas del catálogo publicado.
- Mostrar por asignatura los repasos gratuitos existentes, cuadernillos y bancos disponibles.
- Separar «Repaso disponible», «Simulacro específico disponible» y «Material pendiente». Los bancos mixtos o compartidos no se presentan como simulacros exclusivos de una materia o grado.
- Ofrecer enlaces directos a los temas cubiertos. La organización puede completarse sin afirmar que todos los contenidos o simulacros están terminados.

## 2. Panel docente
- Mantener la selección del estudiante registrado y vinculado a la lista del docente.
- Añadir filtros por grado y asignatura, resumen de capítulos con lectura/ejercicios registrados y fecha del último registro.
- Distinguir lectura y ejercicios autodeclarados de simulacros con notas verificadas. No convertir lectura en dominio, XP ni certificados.
- Mostrar «Sin registros» cuando falten datos y «Consulta pendiente» cuando las notas aún estén cargando; nunca presentar una consulta incompleta como cero intentos.
- Las notas solo respaldan el tema cuando coincide el banco canónico del grado y asignatura.

## 3. IA gratuita: límite y alternativa
No conectar una cuenta gratuita de ChatGPT ni habilitar generación con cobro: no se ha verificado una cuota API gratuita que cubra a los usuarios sin créditos propios ni del titular.

Una página con selector de modelos no resuelve esa financiación. La integración de IA queda pendiente de un proveedor con condiciones y cobertura comprobadas. Un generador que reutilice ejercicios existentes puede hacerse sin inferencia, pero no debe presentarse como generación de IA ni producir nuevas preguntas originales automáticamente.

## Detalles técnicos
- Reutilizar `malla`, `bookTopics` y el catálogo público de bancos; no importar respuestas privadas a la navegación.
- Mantener las consultas de lectura protegidas y la autorización por lista docente existente; evitar nuevas tablas y nuevos permisos.
- Calcular los resúmenes sobre filas guardadas y correspondencias exactas. Añadir pruebas para separar grados, ignorar temas desconocidos y excluir notas no verificadas.

## Verificación y publicación
- Probar enlaces, filtros y estados vacíos en teléfono y escritorio.
- Verificar el panel con una cuenta docente y un estudiante realmente vinculado si están disponibles; sin ello, informar que esa comprobación sigue pendiente, sin crear alumnos ficticios.
- Ejecutar las pruebas afectadas y los controles básicos de seguridad; guardar los cambios y solicitar una sola publicación de la entrega comprobada.

## Pendientes fuera de esta entrega
La producción y revisión de todos los libros y simulacros por tema, la financiación de IA gratuita y el comprobante real del pago docente siguen pendientes. Ninguno se anunciará como completado.