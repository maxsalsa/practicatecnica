# Integración institucional de Campana Clara

## Resultado
Unir las herramientas útiles de **Campana Clara Editorial** al panel de escuelas, colegios y CTP de pracTICAtecnica.com, sin reemplazar lo que ya funciona ni cambiar su marca.

## Cambios
1. **Campañas institucionales:** añadir un estudio dentro de Mi institución para crear campañas temáticas, avisos y efemérides; objetivo, público, canal, fechas, etiquetas y texto ES/EN independiente. Reutilizar y adaptar las funciones de composición y exportación de Campana Clara, sin importar su aplicación completa.
2. **Vista previa y descarga:** afiches verticales, cuadrados, historias y pantallas; exportación PNG/SVG con logo autorizado y advertencia cuando el texto no cabe. Propuestas de texto con plantillas locales, sin gasto de IA ni traducciones inventadas.
3. **Revisión:** borrador, revisión y publicación aprobada por dirección/Max usando permisos de esta plataforma. Fuentes de efemérides y derechos revisados explícitamente; una propuesta no equivale a aprobación. Duplicar crea un borrador, nunca copia aprobación.
4. **Circulares PDF:** botón desde Biblioteca para seleccionar institución y cargar una copia destinada a publicación. Archivo privado hasta aprobación de dirección/Max; después, enlace de lectura/descarga visible en panel y catálogo público. Retirar publicación revoca su acceso público. Mantener intacto el archivo privado original.
5. **Logos reales:** verificar y cargar el escudo original de CTP Mercedes Norte encontrado en sus archivos, solo para esa institución. Mantener el botón PNG transparente para cada dirección. No inventar escudos ni reutilizar el de Mercedes Norte en otros colegios; los demás originales quedan pendientes de entrega.
6. **Publicación:** actualizar el manual institucional con las funciones nuevas, verificar los recorridos y solicitar publicación del panel, catálogo y Biblioteca.

## Límites de la fusión
- Se revisó una copia del código de Campana Clara, commit `3664d2ca`; no es necesario conectar otra API de GitHub para reutilizar código.
- No reemplazar autenticación, pagos, roles, horarios, prácticas o bancos de respuestas de esta plataforma.
- No trasladar cuentas ni registros privados del proyecto origen: requiere exportación autorizada desde ese proyecto.
- Los PDF aportados de seguimiento individual no son circulares públicas y no se publicarán. Faltan circulares reales autorizadas y los demás logos originales.
- No habilitar cobros como parte de esta integración: PayPal de prueba y verificación completa siguen pendientes.

## Detalles técnicos
- Adaptar módulos puros de composición/exportación y planificación; usar los componentes y tokens existentes, rutas TanStack y almacenamiento institucional de este proyecto.
- Guardar campañas y archivos con alcance institucional y autorización en servidor/RLS; no copiar el almacén local ni las decisiones de aprobación del origen.
- Para PDF públicos, usar almacenamiento separado y acceso condicionado al estado publicado; las copias pendientes o retiradas no deben ser accesibles anónimamente.
- Exponer solo contenido aprobado en el catálogo, nunca autores personales, preguntas con claves o archivos de seguimiento.

## Verificación
- Pruebas de permisos por institución, borrador oculto, aprobación, retirada y publicación de PDF.
- Recorrido autenticado: crear campaña, revisar, publicar y ver desde una sesión sin acceso; exportar afiche y comprobarlo visualmente en móvil/escritorio.
- Subir el logo original y comprobarlo en fondos claro/oscuro; descargar una circular sintética aprobada y comprobar retirada.
- Revisar errores, ejecutar pruebas afectadas, guardar cambios y solicitar publicación. Informar pendientes sin afirmar seguridad absoluta.