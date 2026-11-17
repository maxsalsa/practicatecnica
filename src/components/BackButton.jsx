import { useCanGoBack, useRouter, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackButton() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  return canGoBack ? <Button variant="outline" size="sm" onClick={()=>router.history.back()}><ArrowLeft aria-hidden="true"/>Regresar</Button> : <Button asChild variant="outline" size="sm"><Link to="/"><ArrowLeft aria-hidden="true"/>Inicio</Link></Button>;
}