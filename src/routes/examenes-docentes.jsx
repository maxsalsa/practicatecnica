import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/examenes-docentes')({
  component,
})

function RouteComponent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Módulo Activo</h1>
      <p className="text-muted-foreground mt-2">Cargando contenido oficial...</p>
    </div>
  )
}