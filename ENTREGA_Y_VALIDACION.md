# Entrega V11.0.0 · PracTICAtecnica

Proyecto fuente completo para **Next.js, Supabase y Vercel**, preparado el 24 de septiembre de 2026. Comience por `EMPEZAR_AQUI.md`; los detalles están en `README.md` y `docs/CONFIGURACION.md`.

## Incluido

- Siete especialidades, 35 pruebas, 2.100 ítems y 14 PDF originales. Se verifican 22 hashes del material recibido.
- Una cuenta por estudiante para todas las especialidades, con progreso privado y cinco intentos independientes por cuenta, especialidad y prueba.
- Registro por correo, verificación mediante confirmación explícita, contraseña temporal y cambio obligatorio. Cola de correo, reintentos y estados del proveedor.
- Propietario exclusivo `maxi.salsa@gmail.com`, autenticación de dos factores y vista estudiantil. Seguimiento, administración de cuentas, configuración y edición versionada de contenido.
- Interfaz en español, temas claro/oscuro, modales accesibles, diseño adaptable y PWA. Los datos de sesión, respuestas y PDF privados no se almacenan en la caché del worker.
- Migraciones PostgreSQL y carga de contenido automatizadas: no necesita pegar un SQL largo en el panel.
- Código, dependencias fijadas, scripts de instalación, pruebas, guías y archivos de configuración de ejemplo. No contiene contraseñas productivas ni credenciales de proveedor.

## Resultado comprobado localmente

| Comprobación | Resultado |
|---|---|
| Pruebas automáticas de lógica, SQL, RLS, autenticación, contenido y PDF | 133 aprobadas en 8 archivos |
| TypeScript | Sin errores |
| ESLint | Sin errores ni advertencias |
| Compilación Next.js para producción | Aprobada |
| Peticiones HTTP a esa compilación | 11 aprobadas |
| Dependencias con lockfile congelado | Verificadas |
| Auditoría de dependencias de producción | Cero vulnerabilidades conocidas reportadas |
| Integridad del contenido y carga simulada | 7 especialidades, 35 pruebas, 2.100 ítems, 14 PDF |

Los informes están en `qa/`. Las pruebas SQL usan PostgreSQL mediante PGlite y un esquema de Auth de prueba; no sustituyen validar Supabase Auth alojado. La auditoría y los hashes no garantizan ausencia absoluta de malware ni de errores.

## Comprobaciones pendientes con sus servicios

Esta entrega no está publicada ni conectada a cuentas productivas. Debe completar una vez las credenciales y seguir la guía para instalarla. Quedan pendientes:

1. Probar el recorrido completo real de registro, correo, contraseña temporal, cambio de contraseña y MFA del propietario.
2. Confirmar recepción en Gmail y `@mep.go.cr`. Aceptado por el proveedor significa que recibió la solicitud; no garantiza llegada a bandeja de entrada.
3. Revisar la interfaz en dispositivos y ejecutar Playwright. El entorno de creación no pudo descargar Chromium; no se declara inspección visual automatizada completada.
4. Conectar el dominio, validar DNS/HTTPS y comprobar su estado en Safe Browsing. Publicar en Vercel no elimina automáticamente una clasificación previa del dominio.
5. Completar los datos de privacidad, revisar el contenido pedagógico y habilitar inscripciones desde administración. Se entregan cerradas por defecto.
6. Hacer una prueba de restauración y de concurrencia en un entorno Supabase separado antes de ampliar el uso.

## Instalación y conservación

La carpeta que contiene `package.json` es la raíz del proyecto. Suba **su contenido completo** al repositorio privado de GitHub y seleccione ese repositorio en Vercel. Este ZIP se utiliza en el nuevo stack; no se instala en `htdocs` de InfinityFree.

Se parte de un proyecto Supabase nuevo. No se ha borrado ni modificado la base anterior y no se importan sus cuentas. El material original está incluido. El propietario configurará una entrada nueva de Google Authenticator: no se dispuso del secreto anterior y no se ha incorporado al código.

El ZIP incluye `MANIFIESTO_SHA256.json` para comprobar sus archivos y excluye secretos, dependencias instaladas y resultados de ejecución temporales. Mantenga `.env.local` fuera de Git y conserve las claves de respaldo por separado.
