export const platformManuals = [
  ['01-usuario', 'Manual de usuario', 'Estudiantes y público general'],
  ['02-ingenieria', 'Manual de ingeniería', 'Requisitos, UML, relaciones y decisiones'],
  ['03-docente', 'Manual docente', 'Planificación y seguimiento'],
  ['04-horarios', 'Manual de horarios', 'Generación, revisión y guardado'],
  ['05-canales', 'Manual de canales institucionales', 'Personal y familias autorizadas'],
  ['06-archivos', 'Manual de fotos y PDF', 'Adjuntos y documentos privados'],
  ['07-avisos', 'Manual de anuncios y circulares', 'Publicación y lectura'],
  ['08-identidad', 'Manual de logos e identidad', 'Escudos propios y PNG transparente'],
  ['09-pagos', 'Manual de beta y pagos', 'Acceso, revisión y modo de prueba'],
  ['10-qa', 'Manual de QA y operación', 'Verificación, límites y despliegue'],
  ['11-instituciones', 'Manual de instituciones', 'Horarios, circulares, logos y prácticas propias'],
].map(([id, title, audience]) => ({ id, title, audience, url: `/downloads/manuales/${id}.pdf` }));