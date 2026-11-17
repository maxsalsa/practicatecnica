import { createFileRoute } from '@tanstack/react-router';
import ImportadorTablaMep from '@/components/ImportadorTablaMep';

export const Route = createFileRoute('/tablas-mep')({
  head: () => ({ meta: [
    { title: 'Tablas de especificaciones MEP a práctica · pracTICAtecnica.com' },
    { name: 'description', content: 'Convierta una tabla de especificaciones en una batería de práctica con tres opciones y membrete institucional.' },
    { property: 'og:title', content: 'Tablas de especificaciones a práctica · pracTICAtecnica.com' },
    { property: 'og:description', content: 'Indicadores de logro convertidos en ítems de práctica de tres opciones.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: ImportadorTablaMep,
});
