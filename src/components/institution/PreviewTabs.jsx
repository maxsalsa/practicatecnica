import { Children, isValidElement, type ReactNode, type ReactElement } from 'react';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
export function PreviewTabs({ allowed, children, value, onValueChange }: { allowed: string[] | null; children: ReactNode; value: string; onValueChange: (value: string) => void }) {
  const filter = (nodes): ReactNode => Children.map(nodes, child => {
    if (!isValidElement(child)) return child;
    const el = child as ReactElement<{ value?: string; children?: ReactNode }>;
    if (allowed && el.props.value && !allowed.includes(el.props.value)) return null;
    if (allowed && el.type === TabsContent) return el;
    if (allowed && (el.type === 'nav' || el.type === 'details' || el.type === TabsList)) return null;
    return el;
  });
  return <Tabs value={value} onValueChange={onValueChange}>{allowed&&<nav aria-label="Vista institucional por rol" className="flex flex-wrap gap-2"><Button variant="outline" onClick={()=>onValueChange('avisos')}>Avisos</Button><Button variant="outline" onClick={()=>onValueChange('canales')}>Canales</Button>{allowed.includes('revision')&&<Button variant="outline" onClick={()=>onValueChange('revision')}>Revisar permisos</Button>}{allowed.includes('permisos')&&<Button variant="outline" onClick={()=>onValueChange('permisos')}>Mis permisos</Button>}{allowed.includes('mi-horario')&&<Button variant="outline" onClick={()=>onValueChange('mi-horario')}>Mi horario</Button>}{allowed.includes('resultados')&&<Button variant="outline" onClick={()=>onValueChange('resultados')}>Resultados del estudiante</Button>}</nav>}{allowed&&!allowed.includes(value)?<p role="status" className="py-6 text-muted-foreground">Esta sección no corresponde a la vista seleccionada.</p>:allowed?filter(children):children}</Tabs>;
}