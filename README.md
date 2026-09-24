# PracTICAtecnica.com · Next.js + Supabase · V11

Una cuenta estudiantil permite estudiar las siete especialidades y consultar solamente su progreso. La única identidad propietaria prevista es `maxi.salsa@gmail.com`. El stack es Next.js/TypeScript en Vercel; Supabase PostgreSQL, Auth, MFA y Storage; Resend para correo.

**Este proyecto se publica en Vercel. No se sube a `htdocs` ni a InfinityFree.** Conserve el sitio anterior y su respaldo mientras prueba el nuevo. No importe usuarios, contraseñas ni semillas del autenticador anterior. La nueva cuenta propietaria configura una nueva entrada de Google Authenticator.

Los originales de `content-source/` contienen 2.100 preguntas, 35 pruebas y 14 PDF. El importador comprueba sus hashes, estructura y acciones PDF; estos archivos nunca van en `public/`. Integridad no equivale a validación pedagógica oficial ni certificación antivirus. La carpeta `requirements/` conserva la especificación completa: sus casos de aceptación no equivalen a pruebas ejecutadas. Consulte el informe de entrega/`qa/` para conocer resultados y límites reales.

## Preparación en cinco fases

### 1. Prepare las cuentas y el proyecto vacío

Necesita Node.js **24 LTS**, pnpm **12.6.0**, Git y cuentas en GitHub, Supabase, Vercel y Resend. Cree un repositorio **privado** y un proyecto **nuevo** de Supabase. No reutilice ni borre la base MySQL anterior.

En Supabase obtenga la URL, clave publishable, clave secreta de servidor, referencia del proyecto y conexión PostgreSQL desde **Connect**. Para una computadora sin IPv6 use el **session pooler, puerto 5432**. El token de administración está en los tokens de acceso de su cuenta Supabase. No envíe estas credenciales por chat ni las suba a GitHub.

En Resend añada/verifique `notificaciones.practicatecnica.com`, copie los registros DNS exactos que muestre el proveedor en la **zona autoritativa real** y cree la API key. El remitente previsto es `acceso@notificaciones.practicatecnica.com`. Si usa nameservers de InfinityFree, no asuma que el editor DNS de Hostinger controla el dominio.

### 2. Obtenga primero la dirección de Vercel

Descomprima el proyecto y abra la terminal **en la carpeta que contiene `package.json`**:

```sh
npm install --global pnpm@12.6.0
pnpm install --frozen-lockfile
```

Suba el **contenido de esta carpeta conservando subcarpetas** al repositorio privado; GitHub Desktop facilita ese paso. Incluya `src`, `public`, `supabase`, `scripts`, `content-source`, configuración y `pnpm-lock.yaml`. No suba `.env.local`, `node_modules`, `.next`, `backups` ni claves. `.gitignore` los excluye al usar Git.

En Vercel elija **Add New → Project → Import** el repositorio.

| Campo | Valor |
|---|---|
| Framework | Next.js |
| Root Directory | `.` — donde está `package.json` |
| Node.js | 24.x |
| Install | `pnpm install --frozen-lockfile` |
| Build | `pnpm build` |
| Output Directory | Automático de Next.js; no `htdocs`, `public` ni `out` |

Haga este primer despliegue **sin credenciales**. Mostrará la pantalla de preparación; todavía no se puede registrar ni estudiar. Copie la dirección estable de producción del proyecto, por ejemplo `https://su-proyecto.vercel.app`, no la dirección distinta de cada despliegue. Así obtiene la URL real antes de configurar los enlaces de correo.

### 3. Prepare todo el backend con un comando

En su computadora, copie `.env.example` como `.env.local`. En PowerShell: `Copy-Item .env.example .env.local`. Complete las credenciales de la fase 1 y use la dirección HTTPS estable de Vercel en **ambas** variables `APP_URL` y `NEXT_PUBLIC_APP_URL`. Genere cada clave aleatoria de forma independiente con el comando comentado en el archivo. Añada también al entorno **Production** de Vercel las variables de ejecución de `docs/CONFIGURACION.md`; las credenciales exclusivas de operaciones se quedan en su computadora.

Ejecute en la carpeta del proyecto:

```sh
pnpm setup:backend --dry-run
pnpm setup:backend --apply --project-ref=SU_REFERENCIA
```

Sustituya `SU_REFERENCIA` por la referencia real. **No debe pegar SQL en Supabase.** El comando comprueba conexiones, configura Auth para la URL real de Vercel, aplica migraciones pequeñas/transaccionales e importa todos los ítems y PDF por lotes. Si algo falla se detiene; corregida la causa puede repetirse sin duplicar lo ya aplicado. No modifica MySQL ni envía correo.

Al terminar, en Vercel abra **Deployments → Redeploy** para que la aplicación use las variables añadidas. Abra su dirección `vercel.app` y compruebe que la preparación dejó paso a la plataforma. Las inscripciones deben permanecer cerradas hasta comprobar el correo y todo el acceso. El dominio propio se conecta en la fase 5.

Para siguientes versiones, prepare migraciones compatibles **antes de enviar a main** una app que necesite columnas nuevas. El workflow manual `prepare-production.yml` prepara el backend, pero no publica. Publique esa misma revisión después de verificarlo.

### 4. Active correo y la cuenta propietaria

Con Vercel funcionando y las variables completas:

```sh
pnpm mail:deploy --apply --project-ref=SU_REFERENCIA
pnpm mail:configure --apply --project-ref=SU_REFERENCIA
```

En Resend cree el webhook `https://SU-SITIO/api/webhooks/resend`, seleccione eventos de entrega/rebote/queja y copie el secreto de firma en `RESEND_WEBHOOK_SECRET` de Vercel. Redespliegue para aplicar el cambio. La cola propia usa Resend API; las operaciones nativas Auth usan SMTP del mismo proveedor, sin duplicar mensajes.

Solicite entonces su acceso:

```sh
pnpm owner:bootstrap --apply --project-ref=SU_REFERENCIA
```

Abra el enlace recibido en `maxi.salsa@gmail.com`, confirme, ingrese con la contraseña temporal, escriba dos veces la definitiva y configure Google Authenticator. La reserva del correo **no omite comprobación ni MFA**. Revise entrada y spam: puede tardar unos minutos. “Aceptado por el proveedor” no prueba llegada a la bandeja principal.

En administración, revise **Accesos y servicios**, complete la revisión de privacidad y habilite inscripciones después de comprobar el funcionamiento. Pruebe un registro estudiantil autorizado, respuesta, reanudación y seguimiento. Compruebe Gmail y `@mep.go.cr` con autorización del titular; anote entrega, demora o rebote.

### 5. Revise y cambie el dominio al final

Ejecute `pnpm release:check`, los ensayos de `docs/ACEPTACION_PRODUCCION.md` y una restauración aislada. Agregue `practicatecnica.com` y `www.practicatecnica.com` al proyecto Vercel; copie **los A/CNAME exactos y actuales que Vercel indique** a la zona DNS autoritativa. Preserve MX/SPF/DKIM y demás registros de correo.

Cuando el dominio resuelva a Vercel, cambie `APP_URL`/`NEXT_PUBLIC_APP_URL` al origen canónico HTTPS en Vercel y `.env.local`; repita `setup:project`, `mail:deploy` y `mail:configure`, actualice webhook y redespliegue. Compruebe certificado desde dos redes, registro, recuperación, PDF y PWA. Conserve respaldado el hosting anterior hasta aceptar el resultado.

Certificado y Google Safe Browsing son comprobaciones distintas: cambiar hosting no elimina una clasificación de phishing. Si existe un reporte pendiente, revise las causas en Search Console y solicite revisión.

## Guías

- [Configuración y secretos](docs/CONFIGURACION.md).
- [Operación y respaldos](docs/OPERACION.md).
- [Aceptación del entorno publicado](docs/ACEPTACION_PRODUCCION.md).
- [Requisitos completos](requirements/01_REQUERIMIENTOS_SISTEMA.md).

Los planes gratuitos tienen condiciones y cuotas; Vercel Hobby restringe uso comercial. El acceso gratuito al estudiante durante 2026 no garantiza infraestructura sin costo. Revise condiciones antes de admitir usuarios reales.
