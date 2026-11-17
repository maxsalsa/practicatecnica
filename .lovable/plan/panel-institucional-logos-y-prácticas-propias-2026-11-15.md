# Panel institucional, logos y prácticas propias

## Resultado
- Ampliar **Mi institución**, sin duplicar los paneles existentes de horarios, documentos, avisos y canales.
- Añadir desde **Biblioteca** un acceso a la subida del logo de la institución seleccionada, exclusivo para su dirección o Max.
- Crear un catálogo público institucional de materias, simulacros y publicaciones expresamente aprobadas.
- Incorporar un **manual institucional consolidado PDF** con lectura y descarga en Biblioteca.

## Logos
- Seleccionar institución, cargar un PNG original, previsualizarlo sobre fondos claro y oscuro y comprobar transparencia real antes de guardar.
- Mantener los escudos originales y los permisos actuales. No inventar logos ni quitar fondos automáticamente; los archivos de cada colegio debe aportarlos su representante.
- Conservar los formatos actuales en el panel anterior; el nuevo acceso desde Biblioteca exigirá PNG transparente.

## Administración y vista pública
- Mantener privados horarios internos, nombres del personal, alumnado, canales y documentos actuales.
- Añadir un área de publicaciones públicas separada: borrador, revisión de dirección y publicado; retirada posterior disponible.
- Horarios públicos serán versiones deliberadamente preparadas sin nombres personales. Circulares públicas requerirán un archivo específicamente aprobado para publicación, nunca volver público el archivo privado existente.
- Mostrar el nombre y logo institucional, materias y fichas de simulacros publicados. No incluir correos, listas de estudiantes, conversaciones ni claves de respuesta.

## Prácticas propias
- Permitir a docentes autorizados de la institución y dirección crear y editar borradores: materia, nivel, título, duración, preguntas, opciones y explicaciones.
- Dirección o Max aprobará su aparición en el catálogo público. El catálogo mostrará metadatos, no bancos completos ni respuestas.
- Participación con cuenta y acceso vigente; cargar preguntas mediante autorización y calcular resultados en servidor.
- Separar estas evaluaciones institucionales de certificados y bancos canónicos de plataforma: no emitir automáticamente certificaciones ni inflar dominio verificado.

## PayPal y beta
- Abrir la conexión para una **cuenta PayPal sandbox nueva**, independiente de la conexión live existente. La cuenta y comprador de prueba deben configurarse mediante la tarjeta de conexión.
- Verificar importe, moneda, autorización, captura, lectura posterior, cancelación e idempotencia con datos de prueba; no mezclar prueba con pagos reales ni ampliar acceso anual por un resultado sandbox.
- Mantener cobros reales desactivados hasta completar estas verificaciones y confirmar la configuración segura. No activar live únicamente por haber conectado sandbox.
- Mostrar el mensaje de beta únicamente cuando el acceso confirmado corresponda a la prueba vigente: **«Su prueba gratuita de 13 días está activa»**, junto con su fecha de vencimiento. El pago no reinicia la beta.

## Manual y comprobación
- Manual institucional: accesos por rol, horarios, circulares, anuncios, PNG transparente, creación/revisión de prácticas y privacidad de la vista pública.
- Capturas con datos sintéticos, diagramas y distinción clara entre disponible y pendiente; revisar visualmente todas las páginas.
- Pruebas de aislamiento entre instituciones, permisos, publicación/retirada, transparencia PNG, carga de bancos y puntuación.
- Verificar creación → guardado → lectura en el panel y publicación → lectura pública; Biblioteca → lectura/descarga PDF. Publicar después de las verificaciones.

## Detalles técnicos
- Conservar TanStack Start, funciones autenticadas y políticas Cloud existentes; nuevos registros públicos separados de las tablas privadas.
- Validar dueño institucional y rol en servidor/RPC, no en selectores de interfaz. Aplicar permisos explícitos y RLS en toda tabla nueva.
- Claves y bancos privados fuera del catálogo público; recursos publicados mediante proyecciones limitadas y almacenamiento específico para contenido público aprobado.
- Actualizar documentación y registrar decisiones estructurales en AGENTS.md; guardar cambios en un commit.

## Dependencias externas
- Originales autorizados de los logos institucionales.
- Conexión PayPal sandbox y comprador de prueba. Sin ellos se pueden preparar controles y pruebas de seguridad, pero no declarar el cobro completo verificado ni habilitar cobros reales.