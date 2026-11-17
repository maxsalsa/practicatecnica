import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/instituciones_/practica/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Práctica Institucional Dinámica</h1>
      <p className="text-muted-foreground mt-2">Cargando expediente oficial...</p>
    </div>
  )
}