# Navegación por rol, variedad y campañas

## 1. Menú y regreso
- Completar el selector con Dirección, Subdirección, Docente, Estudiante, Familia, Orientación, Secretaría, Auxiliar, Guarda y Conserje; distinguir funciones adicionales de Ministro y Asesor de asignatura.
- Mostrar el rol asignado a cada persona. Solo Max selecciona una vista de revisión; ninguna selección modifica cuentas, planes ni permisos.
- Extender la vista seleccionada a los accesos institucionales y opciones avanzadas, no únicamente al menú superior. Separar explícitamente «vista de revisión» de los datos propios de Max: no simular la identidad de otro estudiante.
- Limitar los accesos a funciones autorizadas y al plan realmente vigente; evitar que docentes vean gestión de dirección o familias vean herramientas docentes.
- Conservar Regresar al destino anterior con búsqueda y sección; usar Inicio cuando no exista historial interno. Revisar también regreso desde permisos, horarios, canales y edición.

## 2. Bitácora
- Añadir acceso visible «Bitácora» para Max junto a trazabilidad.
- Reutilizar los historiales existentes de roles, permisos, estado de cuentas y aprobaciones, con filtros por institución, fecha y tipo de cambio.
- Mostrar quién hizo cada cambio y cuándo; no inventar eventos ni llamar bitácora a estadísticas de visitas.
- Mantener dirección limitada a los registros de su institución; la vista de revisión no amplía acceso privado.

## 3. Bancos y simulacros
- Inventariar cantidad real de preguntas y habilidades por área y unidad, empezando por francés, portugués, diseño de software, soporte TI y seguridad.
- Preparar nuevos bloques versionados con conceptos y distractores distintos; conservar claves históricas y scoring privado.
- Ampliar primero las unidades que bloquean simulacros por cantidad insuficiente. No reducir los mínimos ni rellenar con duplicados para habilitarlos.
- Idiomas: variar persona, contexto, presente, pasado, futuro y estructuras pertinentes a cada lengua; añadir destrezas y consejos formativos revisados.
- Hábitos saludables: contenidos educativos breves, sin diagnóstico ni promesas médicas.
- Entregar cantidades verificadas y lista de habilidades, sin afirmar 1.000 ítems completos ni certificación psicométrica sin revisión.

## 4. Campaña Clara
- Incorporar galería precargada de imágenes educativas para circulares, avisos y publicaciones de redes.
- Reutilizar primero imágenes existentes y autorizadas; generar solo las faltantes tras identificar categorías.
- Mantener estilo isométrico luminoso profesional, búho azul e identidad pracTICAtecnica.
- Seleccionar imagen, editar texto y previsualizar antes de exportar; publicar institucionalmente sigue requiriendo aprobación y privacidad.

## 5. Instalación, comprobación y publicación
- Revisar puntualmente precios de Acerca de y mensajes SINPE contra tarifas oficiales y el informe GICM; conservar el detalle autorizado «.» y no cambiar contenido ajeno a esas discrepancias.
- Conservar el búho existente en favicon, Apple y manifiesto; conservar Instalar visible cuando no se detecte instalación.
- Comprobar invitación nativa, ayuda Apple y ocultamiento en modo instalado; no prometer detección universal desde una pestaña normal.
- Probar cada rol y destino en teléfono/computadora, claro/oscuro, y un paso después de cada interacción.
- Ejecutar pruebas de límites, permisos y claves; actualizar revisión de seguridad antes de compartir ampliamente.
- Publicar al final, tras implementar y verificar; confirmar el búho y cambios públicos en el dominio sin confundir solicitud de publicación con despliegue terminado.

## Austeridad y condiciones
- Cambios pequeños y agrupados, reutilizando controles, imágenes y registros existentes.
- El sistema de cobro decide el orden de consumo: el agente no puede forzarlo ni reservar créditos futuros. Comprobar saldo antes de generaciones extensas.
- Para comprobar accesos reales se necesita una lista autorizada de cuentas y secciones; no crear identidades ni vincular familias por suposición.
- Tras publicar, guiar instalación: Windows Chrome con Instalar; Android Chrome con Instalar o Añadir a pantalla de inicio; Apple Safari con Compartir → Añadir a pantalla de inicio. Una instalación previa puede conservar el icono antiguo y requerir reinstalación.

## Detalles técnicos
- El selector es presentación, separado de autorización Cloud/RLS y de la suscripción; conservar roles institucionales separados de roles globales.
- Reutilizar TanStack Router para historial y persistir selección de revisión solo dentro de la sesión de Max, nunca como evidencia de privilegio.
- Bancos canónicos privados y nuevos IDs versionados; catálogo público solo con metadatos. Registrar eventos de revisión mediante autorización verificada si se requiere auditar cambios de vista.
- Instalación con manifiesto y eventos nativos, sin añadir caché de aplicación ni service worker para esta tarea.