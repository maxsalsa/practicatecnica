# Alcance de la validación

Validación local vigente tras recuperar el proyecto: **133 pruebas aprobadas en 8 archivos**. La comprobación TypeScript también finalizó sin errores. El informe de la corrida consolidada está en `qa/local-test-results.json`. Los resultados anteriores a la recuperación del entorno no se usan como evidencia de esta versión.

La compilación de producción Next.js terminó correctamente. TypeScript y ESLint, con cero advertencias permitidas, aprobaron. Las 11 comprobaciones HTTP contra la compilación de producción también aprobaron; el resultado está en `qa/http-smoke.json`. La instalación con lockfile congelado se verificó y la auditoría de dependencias de producción reportó cero vulnerabilidades conocidas en el momento de la consulta (`qa/dependency-audit.json`).

La suite Playwright está incluida, pero no se ejecutó en este entorno: no había un navegador disponible y la descarga del ejecutable Chromium devolvió un archivo ZIP truncado. No se afirma validación visual automatizada vigente.

- PostgreSQL real mediante PGlite ejecuta las migraciones y sus políticas RLS. El esquema técnico de Supabase Auth es un fixture; esta prueba no sustituye una sesión real de GoTrue, la firma de JWT ni el aprovisionamiento de MFA en Supabase alojado.
- Se prueban separación entre cuentas, sesión restringida por contraseña temporal, propietario exclusivo con AAL2, revocación, límites de cinco intentos independientes, cuotas, calificación, feedback protegido, borradores y material privado.
- La prueba de peticiones simultáneas a PGlite comprueba idempotencia en una conexión. No representa concurrencia entre varias conexiones de un PostgreSQL alojado.
- Los originales de las siete especialidades se validan: 2.100 ítems, 35 pruebas y 14 PDF. Los hashes cotejan la fuente incluida; no constituyen una certificación de ausencia de malware.
- La validación estructural PDF rechaza scripts y contenido activo conocidos. No se presenta como un antivirus.
- Las pruebas de cifrado comprueban autenticidad y confidencialidad del contenedor de respaldo. La restauración completa de base de datos y Storage requiere un proyecto de prueba configurado.
- Las pruebas Playwright públicas comprueban navegación, tamaño adaptable, formularios, temas y modal. Una sesión simulada solo prueba la interfaz del instalador, no los permisos.

Pendiente de la configuración del propietario: Supabase Auth real, entrega efectiva y tiempos de recepción en Gmail y @mep.go.cr, SPF/DKIM/DMARC, webhooks del proveedor, DNS/TLS del dominio, revisión Safe Browsing, instalación PWA en dispositivos y una restauración completa. La respuesta «aceptado por el proveedor» no equivale a entrega en bandeja de entrada.

No se hicieron cambios de DNS ni despliegues de producción, ni se enviaron correos externos durante estas pruebas locales. La revisión legal final y los datos de la persona responsable deben completarse antes de abrir las inscripciones.
