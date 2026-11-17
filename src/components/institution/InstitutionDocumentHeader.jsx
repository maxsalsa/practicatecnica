import { InstitutionLogo } from './InstitutionLogo';

export function InstitutionDocumentHeader({ name, logoPath, title, date }: {
  name: string; logoPath; title: string; date;
}) {
  return <header className="flex items-center gap-4 border-b-2 border-primary pb-3">
    <InstitutionLogo path={logoPath} name={name} className="h-16 w-16" />
    <div className="min-w-0 flex-1">
      <p className="break-words text-lg font-black">{name}</p>
      <p className="text-sm font-semibold">{title}</p>
      {date && <p className="mt-1 text-xs text-muted-foreground">{new Date(date).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica', dateStyle: 'medium', timeStyle: 'short' })}</p>}
    </div>
  </header>;
}

export function InstitutionDocumentFooter() {
  return <footer className="mt-4 border-t border-border pt-2 text-xs text-muted-foreground">
    Emitido mediante <span className="font-semibold">prac<span className="text-primary">TICA</span>tecnica.com</span> · GICM
  </footer>;
}