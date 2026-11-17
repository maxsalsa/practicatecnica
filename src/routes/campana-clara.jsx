import { createFileRoute, Link } from '@tanstack/react-router';
import { SiteHeader } from '@/components/SiteHeader';
import { PosterComposer } from '@/components/institution/PosterComposer';
import { PublicEditorialCatalog } from '@/components/institution/PublicEditorialCatalog';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/campana-clara')({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: 'Campaña Clara · publicaciones institucionales | pracTICAtecnica.com' },
    { name: 'description', content: 'Campañas y circulares institucionales aprobadas, con acceso a los canales autorizados de su institución.' },
    { property: 'og:title', content: 'Campaña Clara · pracTICAtecnica.com' },
    { property: 'og:description', content: 'Publicaciones aprobadas y comunicación institucional protegida.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: CampaignPage,
});

function CampaignPage() {
  return <main className="min-h-screen bg-hero">
    <SiteHeader />
    <section className="mx-auto max-w-5xl px-5 pb-16 pt-6">
      <h1 className="text-3xl font-black">Campaña Clara</h1>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild><Link to="/institucion" search={{ vista: 'canales' }}>Canal de mi sección</Link></Button>
        <Button asChild variant="outline"><Link to="/institucion" search={{ vista: 'editorial' }}>Gestionar campañas y circulares</Link></Button>
      </div>
      <PosterComposer />
      <PublicEditorialCatalog />
    </section>
  </main>;
}