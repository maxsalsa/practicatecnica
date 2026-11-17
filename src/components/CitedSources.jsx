import { forwardRef } from 'react';


export 

/** References supporting an independent material; does not imply institutional endorsement. */
export const CitedSources = forwardRef<HTMLElement, CitedSourcesProps>(function CitedSources({ sources, className = '', ...props }, ref) {
  return <section ref={ref} className={`mt-4 border-t border-border pt-4 text-sm ${className}`} {...props}>
    <h4 className="font-bold">Fuentes citadas</h4>
    <ul className="mt-2 space-y-3">{sources.map(source => <li key={source.url}>
      <a href={source.url} target="_blank" rel="noreferrer" className="break-words text-primary underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{source.title}</a>
      {source.detail && <p className="mt-1 text-muted-foreground">{source.detail}</p>}
      <span className="hidden break-all print:block">{source.url}</span>
    </li>)}</ul>
  </section>;
});
