# Configuración y secretos

Copie `.env.example` a `.env.local`. Nunca coloque secretos en variables `NEXT_PUBLIC_*`. La app no contiene cuentas de demostración que simulen acceso real.

| Variable | Origen | Ubicación |
|---|---|---|
| `APP_ENV` | development, test o production | Terminal y Vercel; use `production` al configurar el sitio publicado. |
| `APP_URL`, `NEXT_PUBLIC_APP_URL` | Origen exacto HTTPS de Vercel/dominio; localhost en desarrollo | Terminal y Vercel. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Connect/API | Terminal y Vercel. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase API Keys, clave pública | Terminal y Vercel; exige RLS. |
| `SUPABASE_SECRET_KEY` | Clave secreta de servidor de ese proyecto | Solo servidor Vercel/terminal privada. |
| `SUPABASE_PROJECT_REF` | Referencia del proyecto | Terminal/CI; comprobación de destino. |
| `DATABASE_URL` | Supabase Connect; sesión pooler 5432 o directa | Solo terminal/CI; no necesita estar en Vercel. |
| `SUPABASE_ACCESS_TOKEN` | Tokens de acceso de la cuenta Supabase | Solo terminal/CI para Auth y Edge Function. |
| `RESEND_API_KEY` | Resend API Keys | Vercel y terminal de configuración SMTP. |
| `MAIL_FROM` | Dirección del subdominio verificado | Vercel y terminal. |
| `MAIL_REPLY_TO` | maxi.salsa@gmail.com | Vercel. |
| `RESEND_WEBHOOK_SECRET` | Resend webhook de este entorno | Vercel; verifica eventos firmados. |
| `MAIL_ENCRYPTION_KEY` | 32 bytes aleatorios base64 | Terminal y Vercel, con el mismo valor; cifra temporales/payloads. |
| `MAIL_WORKER_SECRET` | Otros 32 bytes aleatorios base64 | Terminal y Vercel, con el mismo valor; `mail:deploy`/`mail:configure` lo guardan en Edge Function y Vault. |
| `BACKUP_ENCRYPTION_KEY` | Otros 32 bytes aleatorios base64 | Terminal/CI privado; separado del respaldo. |

Genere cada secreto con una ejecución distinta:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

No reutilice la clave de correo para backups. No rote la clave de correo sin procesar/cancelar pendientes y conservar el material necesario para descifrar operaciones antiguas. Nunca añada `.env.local` a Git.

`RESEND_WEBHOOK_SECRET` se obtiene al crear el webhook después del primer despliegue. No hace falta para `setup:backend`; añádalo a Vercel y redespliegue antes de solicitar el acceso propietario.

## Comandos reales

| Comando | Efecto |
|---|---|
| `pnpm setup:backend --apply --project-ref=REF` | Comprobar → configurar Auth → migrar → importar. `--dry-run` solo valida. |
| `pnpm setup:check --offline` | Node y contenido local sin red. |
| `pnpm setup:check` | Variables, destino SQL y claves/Auth; no envía correo. |
| `pnpm setup:project --apply --project-ref=REF` | Configuración Auth por Management API. |
| `pnpm db:migrate --apply --project-ref=REF` | Migraciones pendientes con historial de hashes. |
| `pnpm content:import --dry-run` | Validación sin escribir. |
| `pnpm content:import --apply --project-ref=REF` | Importación por lotes y verificación remota de PDF. |
| `pnpm mail:deploy --apply --project-ref=REF` | Secretos del worker y despliegue Edge. |
| `pnpm mail:configure --apply --project-ref=REF` | SMTP y Cron por minuto. |
| `pnpm owner:bootstrap --apply --project-ref=REF` | Reserva identidad propietaria y solicita verificación real. |
| `pnpm mail:smoke --to=SU_CORREO --send` | Un correo de prueba autorizado; sin `--send` simula. |

Los comandos contrastan la referencia del proyecto, URL y conexión PostgreSQL antes de mutar. La conexión remota valida TLS; no desactive validación de certificado para superar un error. Configure adecuadamente una CA corporativa cuando corresponda.

`setup:project` cierra el signup nativo público, exige confirmación, limita redirecciones, habilita TOTP y notificaciones de seguridad. El cambio de correo usa un enlace a la aplicación y POST explícito; se confirman ambos buzones. El registro propio se gestiona desde servidor.

Crear cuentas de proveedor, emitir claves, verificar DNS y crear el webhook requiere realizar una vez esas operaciones en los paneles. El código no compra planes ni cambia DNS. Configure un proyecto de pruebas diferente de producción; no dé secretos productivos a previews/PR no confiables. Cambiar variables Vercel requiere nuevo despliegue.

El SMTP predeterminado de Supabase no sirve para abrir matrículas a cualquier correo. Los límites Resend y filtros del receptor afectan la entrega; `@mep.go.cr` puede demorar o filtrar. Observe estados y mensaje del proveedor, no declare recepción por un HTTP 200.

Fuentes operativas: [Auth Management API](https://supabase.com/docs/reference/api/v1-update-auth-service-config), [SMTP](https://supabase.com/docs/guides/auth/auth-smtp), [Cron y Vault](https://supabase.com/docs/guides/functions/schedule-functions), [dominios Vercel](https://vercel.com/docs/domains/working-with-domains/add-a-domain).
