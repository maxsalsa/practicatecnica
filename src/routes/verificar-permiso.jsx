import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/verificar-permiso')({
  component: VerificarPermisoComponent,
})

function VerificarPermisoComponent() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Verificación de Permisos</h1>
      <p className="text-muted-foreground mt-2">Módulo de control institucional MEP.</p>
    </div>
  )
}