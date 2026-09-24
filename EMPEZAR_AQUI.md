# PracTICAtecnica · Versión 11

## 1. Abra la carpeta correcta

Descomprima `PracTICAtecnica_Next_Supabase_V11.zip`. Entre en **PracTICAtecnica_V11**: allí deben estar `package.json`, `README.md`, `src`, `public`, `supabase` y `scripts`.

**Esta es la carpeta del proyecto.** Conserve todas sus subcarpetas. En Vercel, Root Directory será **`.`** si sube su contenido a la raíz del repositorio. La aplicación utiliza Next.js y PostgreSQL; esta entrega se instala en Vercel y Supabase.

## 2. Prepare las cuentas

Necesita estas cuentas a su nombre:

| Servicio | Para qué se usa | Qué debe obtener |
|---|---|---|
| [GitHub](https://github.com/) | Guardar el código | Un repositorio **privado**. |
| [Supabase](https://supabase.com/dashboard) | Base de datos, cuentas y PDF | Un proyecto nuevo; URL, claves, referencia y conexión PostgreSQL. |
| [Vercel](https://vercel.com/new) | Publicar la plataforma | Importar el repositorio como Next.js. |
| [Resend](https://resend.com/domains) | Enviar correos | Remitente verificado y API key. |

Los paneles generan las claves. No invente esos valores ni use su contraseña de Gmail como API key. Los detalles de cada variable están en `docs/CONFIGURACION.md`, dentro del ZIP.

Para Resend debe poder editar los DNS **autoritativos** del dominio. Si todavía utiliza los nameservers de InfinityFree, editar registros solo en Hostinger podría no tener efecto. Copie exactamente los registros que solicite el proveedor de correo.

## 3. Haga el primer despliegue en Vercel

Use GitHub Desktop para subir **el contenido de la carpeta del proyecto**, conservando su estructura, al repositorio privado. `.gitignore` excluye `.env.local`, dependencias y resultados temporales.

En Vercel, importe ese repositorio:

| Campo | Valor |
|---|---|
| Framework Preset | Next.js |
| Root Directory | `.` |
| Node.js | 24.x |
| Install Command | `pnpm install --frozen-lockfile` |
| Build Command | `pnpm build` |
| Output Directory | Dejar automático. |

Puede hacer este primer despliegue sin credenciales: la plataforma mostrará que está en preparación. Copie la URL estable HTTPS que Vercel le asigne; la utilizará en el siguiente paso.

## 4. Configure e importe sin pegar SQL

Instale Node.js 24 LTS. Abra PowerShell dentro de la carpeta que contiene `package.json` y ejecute:

```powershell
npm install --global pnpm@12.6.0
pnpm install --frozen-lockfile
Copy-Item .env.example .env.local
```

Complete `.env.local` siguiendo `docs/CONFIGURACION.md`. En `APP_URL` y `NEXT_PUBLIC_APP_URL` escriba la URL HTTPS de Vercel obtenida antes. Para conexión desde una computadora sin IPv6, elija **Session pooler, puerto 5432**, en **Connect** de Supabase. Genere cada clave de cifrado aleatoria con el comando incluido en `.env.example`.

Ejecute, sustituyendo `SU_REFERENCIA` por la referencia real del proyecto:

```powershell
pnpm setup:backend --dry-run
pnpm setup:backend --apply --project-ref=SU_REFERENCIA
```

El segundo comando configura Auth, crea el esquema PostgreSQL e importa las siete especialidades, 2.100 ítems y 14 PDF. Puede repetirse después de corregir un error: comprueba las migraciones y evita duplicar el contenido. No migra las cuentas anteriores; el registro empieza en el proyecto nuevo.

En Vercel, abra **Settings → Environment Variables** y añada las variables de ejecución de `docs/CONFIGURACION.md` con los mismos valores de `.env.local`. Las credenciales PostgreSQL y el token administrativo de Supabase son para la terminal; no necesitan estar en Vercel. Complete este paso con **Redeploy**.

## 5. Active los correos y su cuenta propietaria

Con la aplicación publicada y el remitente Resend verificado:

```powershell
pnpm mail:deploy --apply --project-ref=SU_REFERENCIA
pnpm mail:configure --apply --project-ref=SU_REFERENCIA
```

Cree en Resend un webhook a `https://SU-SITIO/api/webhooks/resend`, seleccione eventos de entrega, rebote y queja, y guarde su secreto en `RESEND_WEBHOOK_SECRET` de Vercel. Vuelva a desplegar si cambió variables.

Solicite su acceso:

```powershell
pnpm owner:bootstrap --apply --project-ref=SU_REFERENCIA
```

Revise el correo **maxi.salsa@gmail.com** y también spam. Confirme el enlace, ingrese con la temporal recibida, escriba dos veces su nueva contraseña y configure **una nueva entrada de Google Authenticator**. No existe una contraseña administrativa fija en el código.

## 6. Pruebe y abra las inscripciones

Desde administración, compruebe correo, privacidad y servicios antes de habilitar el registro. Use una segunda cuenta propia o autorizada para completar este recorrido:

1. Registrarse y recibir el enlace.
2. Confirmarlo, recibir la contraseña temporal e ingresar.
3. Cambiar la contraseña y abrir otra especialidad.
4. Responder, cerrar sesión y verificar que el avance se conserva.
5. Comprobar que el estudiante solo ve su progreso y que usted lo ve en Seguimiento.

La recepción real en Gmail y `@mep.go.cr` debe comprobarse en su entorno. Un mensaje aceptado por el proveedor no garantiza llegada a la bandeja principal.

Cuando funcione en la dirección de Vercel, conecte `practicatecnica.com` siguiendo la última fase de `README.md`. Cambiar el dominio requiere actualizar las URLs de Auth, el worker y el webhook. El certificado HTTPS y una eventual clasificación de Safe Browsing son revisiones diferentes.

**Resultado y límites de las pruebas:** consulte `ENTREGA_Y_VALIDACION.md`. **Guía completa:** `README.md`.
