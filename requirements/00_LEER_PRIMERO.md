# Entrega para continuar PracTICAtecnica.com

Este paquete permite que otra persona y Claude construyan la nueva plataforma sin depender del historial del chat. **Contiene la especificación y el material educativo; no contiene una aplicación Next.js ya construida.** No se sube a `htdocs` ni sustituye directamente el sitio InfinityFree.

## Lo que debe hacer Max

1. Entregue **el ZIP completo** a la persona que continuará. También puede extraerlo en la carpeta de trabajo de Claude Code.
2. Pídale que empiece por `CLAUDE.md` y siga el orden de lectura. Ese archivo contiene las instrucciones de ejecución, los límites y los resultados exigidos.
3. La persona desarrolladora debe crear y comprobar el repositorio, las migraciones, el importador, los correos y el despliegue. **Usted no debe pegar un SQL largo ni reconstruir carpetas a mano.**
4. Cuando la aplicación pase las pruebas, usted aporta las credenciales de los servicios mediante sus paneles o un canal seguro, comprueba su correo y vincula de nuevo Google Authenticator. Las credenciales no se escriben en el chat ni en GitHub.
5. Pruebe el registro y el acceso en el sitio de prueba antes de cambiar el dominio. Conserve el sitio anterior y su respaldo hasta que la nueva aplicación esté aceptada.

Texto breve para iniciar el trabajo:

> Construya PracTICAtecnica.com a partir de este paquete. Lea primero CLAUDE.md y cumpla todos los documentos indicados. Cree el proyecto Next.js, Supabase y Vercel con importación del contenido incluido, despliegue automatizado y pruebas de aceptación. Empiece por comprobar los archivos y por la prueba de integración de registro, correo, contraseña temporal y permisos. No entregue solo una maqueta ni invente preguntas o PDF. Documente qué comprobó realmente y qué falta para publicar.

## Qué encontrará

| Archivo | Para qué sirve |
|---|---|
| `CLAUDE.md` | Instrucciones para la IA y la persona desarrolladora. |
| `01_REQUERIMIENTOS_SISTEMA.md` | Comportamiento definitivo: cuentas, permisos, contenido, prácticas, progreso y calidad. |
| `02_ARQUITECTURA_Y_DATOS.md` | Stack, entidades PostgreSQL, reglas de acceso, transacciones, API e importación. |
| `03_PLAN_IMPLEMENTACION_Y_DESPLIEGUE.md` | Orden de trabajo, automatización, configuración, publicación, operación y límites de costos. |
| `04_MATRIZ_ACEPTACION.md` | Casos que debe superar la aplicación construida antes de darla por terminada. |
| `05_AUTENTICACION_Y_CORREO.md` | Flujo técnico de verificación, temporal, sesiones, propietario, MFA y entrega de correo. |
| `contenido/NOTAS_CONTENIDO.md` | Inventario, mapeo y límites reales de variedad de preguntas. |
| `contenido/especialidades/` | Siete bancos originales con 2.100 entradas y catorce PDF. |
| `contenido/blueprints.json` | Distribuciones derivadas por prueba, área, indicador y dificultad. |
| `contenido/SHA256SUMS.json` | Huellas para comprobar que los contenidos originales no cambiaron. |
| `contenido/auditoria_contenido.json` | Resultado de comprobaciones estructurales de los archivos, no evaluación curricular ni certificado antimalware. |

## Decisiones que ya están resueltas

Una cuenta por correo; todas las especialidades; solo progreso propio para estudiantes. Propietario único: `maxi.salsa@gmail.com`, con MFA y vista estudiantil. Registro gratuito durante 2026, sin códigos ni pagos. Cinco intentos independientes por persona/especialidad/prueba. Nueva base Supabase sin estudiantes antiguos, conservando los contenidos. No importar contraseñas ni la semilla antigua del autenticador.

El paquete usa como referencia de contenido la versión PHP 9.9.1 disponible. Los números `9.9.1` del sistema anterior y `0.8.0` del catálogo **no son la versión de la nueva aplicación**. La nueva release debe declararse y verificarse de forma independiente.

Los servicios pueden permitir un piloto sin costo dentro de sus condiciones y cuotas. El plan explica esos límites; no promete producción ilimitada y gratuita. Un correo puede tardar o ser filtrado: la aplicación debe informar su estado y permitir recuperación. Un certificado HTTPS y una advertencia de Google Safe Browsing se verifican por separado.

## Comprobación de esta entrega

Se comprobaron los hashes de los 22 archivos originales de contenido, la lectura de los JSON, las cuotas de las 35 formas y la coherencia estructural de los documentos. La matriz contiene **131 casos de aceptación futuros**, todavía pendientes de ejecutar sobre la nueva aplicación. Estas comprobaciones de archivos no prueban entrega de correo, TLS, permisos Supabase ni corrección pedagógica de todas las respuestas.
