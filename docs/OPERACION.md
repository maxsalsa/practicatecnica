# Operación, respaldo y recuperación

## Actualizar

1. Ejecute `pnpm release:check` y las pruebas necesarias del cambio.
2. Respalde si la base tiene datos; revise compatibilidad de migraciones con la app todavía publicada.
3. Aplique migraciones pendientes e importación si corresponde. Nunca altere snapshots históricos.
4. Publique esa misma revisión en Vercel y compruebe acceso, correo, intento y PDF.
5. Si falla, cierre nuevas operaciones y vuelva a una revisión compatible. No ejecute db reset ni sobreescriba progreso nuevo con copias antiguas por rutina.

El historial `migration_meta.applied` guarda hash y fecha por migración. Cambiar SQL ya aplicado produce error: escriba una migración nueva. El workflow manual prepara backend sin publicar frontend; conserve ese orden antes de enviar cambios a main.

## Correo y acceso

Cron invoca una Edge Function protegida, que solicita al worker Next.js procesar la cola. Cron por minuto ofrece recuperación del despacho, no garantía de recepción inmediata. Revise cola, configuración, dominio verificado, cuotas y eventos del proveedor. Si está aceptado pero no recibido, compruebe entregas/rebotes y spam. Reintentar no debe regenerar contraseñas ni permitir reinstalar una temporal antigua.

Rotar MAIL_WORKER_SECRET exige actualizar Vercel, Edge Function y Vault con mail:deploy/mail:configure. MAIL_ENCRYPTION_KEY protege operaciones pendientes: planifique rotación y custodie copias antes de cambiarla. La aplicación recupera operaciones legítimas interrumpidas mediante comprobaciones de identidad; una colisión desconocida no se adopta automáticamente ni se elimina una cuenta confirmada.

La recuperación de contraseña propietaria conserva MFA. Si pierde el factor, se requiere acceso privado autorizado al proyecto Supabase, comprobación de identidad, revocación de sesiones y reinscripción con auditoría. No crear una puerta trasera ni quitar MFA con solo conocer el correo.

## Respaldo cifrado

Instale pg_dump/pg_restore compatibles con la versión PostgreSQL del proyecto; no necesita un servidor local para exportar.

```sh
pnpm backup:run
pnpm restore:verify --file=backups/ARCHIVO.ptbackup
```

El respaldo incluye dump de public/private/auth/storage/migration_meta y objetos del bucket privado study-materials, con AES-256-GCM y hashes. El dump tiene límite operativo de 200 MB; si crece debe implementar backup en streaming administrado. Copie el archivo cifrado a un destino privado externo y custodie la clave aparte. Contiene datos personales; nunca subir a GitHub.

`restore:verify` descifra y comprueba autenticidad, hashes, rutas y catálogo de pg_restore. **No restaura una base y no acredita recuperación completa.** Su informe indica restored:false. Esta entrega no provisiona almacenamiento externo de backup ni afirma que la restauración hospedada esté ensayada.

Antes de abrir producción, la persona técnica debe ensayar en un proyecto nuevo aislado:

- Restaurar esquemas/identidades mediante procedimiento Supabase vigente y cliente PostgreSQL compatible; nunca sobre usuarios reales.
- Restaurar objetos Storage manteniendo buckets privados, rutas y hashes.
- Reconfigurar URL, claves, Auth/SMTP, webhook, Vault y Cron. La configuración del proveedor no queda restaurada por un dump de aplicación.
- Probar aislamiento con dos usuarios ficticios, propietario con MFA, intento histórico y PDF. Registrar resultados y tiempos sin secretos.

Una copia sin restauración ensayada no cumple el gate. Las copias administradas de Supabase tampoco incluyen bytes de Storage: [documentación](https://supabase.com/docs/guides/platform/backups).

## Dominio y datos

Hostinger como registrador, DNS autoritativo, Vercel y Google Safe Browsing son componentes distintos. Compruebe NS/SOA/A/AAAA/CNAME antes de cambiar registros. Un certificado necesita el destino correcto; una alerta de phishing requiere investigación/revisión propia y no desaparece por renombrar archivos.

Defina responsable, contacto, retención y tratamiento de menores antes de admitir datos reales. Valide obligaciones aplicables en Costa Rica con la instancia competente. El sistema no certifica cumplimiento legal ni aval del MEP. La conservación de contenidos tampoco equivale a validación oficial de las preguntas.
