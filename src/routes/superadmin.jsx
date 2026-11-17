import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/superadmin')({
  component,
})

function SuperAdminComponent() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Panel Super Admin</h1>
      <p className="text-muted-foreground mt-2">Control total del ecosistema GICM.</p>
    </div>
  )
}