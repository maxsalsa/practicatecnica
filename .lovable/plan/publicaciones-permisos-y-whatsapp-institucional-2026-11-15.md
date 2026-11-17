# Publicaciones, permisos y WhatsApp institucional

## Resultado
Extender el panel existente, sin crear otra aplicación: circulares PDF y campañas con lectores institucionales seleccionados, resúmenes agregados privados y envíos autorizados por WhatsApp Business.

## Publicaciones y permisos
- Mantener dos alcances explícitos: público sin sesión y restringido a instituciones seleccionadas. Los borradores nunca se comparten.
- Dirección de la institución propietaria o Max asignan y revocan permisos; seleccionar una institución no concede acceso a estudiantes ni administración global.
- Cada circular nueva comienza restringida. Asignar por separado lectura y envío por WhatsApp a las instituciones seleccionadas; permitir envío requiere también lectura. La institución propietaria conserva administración, no se concede distribución a terceros automáticamente.
- Añadir bandeja autenticada para personal autorizado de instituciones receptoras. La autorización debe proteger también lectura de PDF, no solo tarjetas.
- Conteos: compartir únicamente resúmenes agregados por institución y periodo; no compartir la analítica global de Max, identidades, respuestas o notas individuales.
- Revocar acceso público al cambiar una publicación a restringida y mantener enlaces temporales de archivos con vencimiento corto.

## WhatsApp Business
- Sección de contactos institucionales adultos con número internacional, institución, consentimiento y baja; importación con vista previa y validación, sin contactos estudiantiles.
- Compositor con selección múltiple de instituciones, vista previa, confirmación y botón por circular/campaña/resumen autorizado.
- Fuera de la ventana de atención de 24 horas, usar plantillas aprobadas por Meta; no enviar texto libre como sustituto. Plantillas de marketing pueden tener costo.
- En recursos restringidos enviar un enlace que exige ingreso y permiso, nunca el PDF público ni el archivo privado como adjunto externo. Verificar el permiso de envío de la institución emisora en cada operación; recibir el enlace no concede acceso ni permiso de reenvío.
- Guardar por destinatario aceptación, fallos y posteriores estados de entrega; aceptación no significa entrega.
- No enviar hasta conectar WhatsApp Business y verificar recepción de estados. La conexión existente representa una cuenta emisora; no simular cuentas propias de otras instituciones.

## Requisitos externos pendientes
### Pago institucional de prueba
- Añadir botón por institución en Instituciones: «Probar pago institucional». Requiere ingreso y autorización sobre esa institución; nunca concede administración por pagar.
- Panel privado de pagos para responsables autorizados: monto anual, moneda, estado persistido y antecedentes de esa institución. Separar claramente prueba Sandbox de pago real confirmado; no exponer referencias personales ni historial de otras instituciones.
- Reutilizar cotización y confirmación del plan institucional anual existente (₡10.000), validando institución, propietario, monto y moneda en servidor.
- Abrir únicamente checkout Sandbox tras verificar configuración independiente. Hasta entonces mostrar estado pendiente, sin redirigir a live ni simular éxito.
- Los pagos sandbox se registran como pruebas y no activan acceso anual real; verificar aprobación, captura idempotente y lectura posterior del resultado antes de habilitar el flujo.

- Adjuntar circulares reales e identificar la institución y autorización pública. Actualmente solo hay borradores sintéticos retirados; informes de estudiantes permanecen privados.
- Configurar WhatsApp Business: la tarjeta anterior fue rechazada. No repetirla sin disposición del usuario a completar la conexión.
- PayPal sandbox independiente y comprador de prueba siguen faltando; la tarjeta volvió a seleccionar live. Mantener bloqueo de cobros reales y no etiquetar live como sandbox.
- Gemini Enterprise: no incorporarlo a estos envíos; su API no ejecuta acciones de WhatsApp. Su uso requiere alcance y financiación definidos.

## Detalles técnicos
- Migraciones aditivas en Lovable Cloud para permisos por recurso, contactos consentidos, registros de envío y bandeja durable de callbacks; RLS y permisos explícitos, roles existentes sin autoascenso.
- Funciones autenticadas para asignación y envío; webhook público firmado en `/api/public/whatsapp/webhook`, procesamiento idempotente y recuperación de pendientes.
- Almacenar ID de mensaje de Meta, reconciliar callbacks anteriores al registro de envío, preservar tiempos y evitar que un estado antiguo degrade entregado/leído.
- No incluir conteos privados en el catálogo público ni usar URLs de archivos que evadan autorización.

## Verificación y publicación
- Pruebas: dos instituciones autorizadas y una excluida, estudiante excluido, borrador oculto, revocación, PDF restringido sin sesión denegado, deduplicación y orden de estados de WhatsApp.
- Revisar móvil 351×651 y escritorio con sesión real; comprobar escudo público y lectura de publicaciones autorizadas.
- Publicar el lote probado; no publicar documentos ficticios ni anunciar PayPal o WhatsApp operativos sin pruebas completas.