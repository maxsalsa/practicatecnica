export const PANEL_SUPER_ADMIN_SHA256 = {
  version: "2026.5.0-AdminEngine",
  superAdminAutorizado: {
    nombre: "Ing. Max Salazar Sánchez",
    contacto: "maxi.salsa@gmail.com / WhatsApp +506 60906359",
    permisosTotales: "Ascenso/descenso de roles, auditoría inalterable y gestión de licencias institucionales a ₡10,000/año."
  },
  motorSha256Auditoria: {
    activo: true,
    algoritmo: "Firma digital SHA-256 para registrar cada cambio de rol, permiso de salida, asistencia por QR y validación de comedor escolar.",
    reglaEstudiantePorDefecto: "Todo nuevo registro inicia con rol 'Estudiante'. Ningún usuario externo puede auto-otorgarse privilegios administrativos."
  },
  carnetDigitalMovil: {
    activo: true,
    alcance: "El smartphone del estudiante opera como carné digital oficial, identificador QR cifrado, libreta de comunicaciones y pase institucional."
  }
};
"// Panel SuperAdmin y Motor SHA-256 inicializados correctamente";