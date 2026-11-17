export const SUPER_ADMIN_CONFIG = {
  version: "2026.5.0-RBACMaster",
  reglaBasicaSeguridad: "Todo usuario registrado o autenticado ingresa estrictamente bajo el rol de 'Estudiante'.",
  privilegiosSuperAdmin: {
    titular: "Ing. Max Salazar Sánchez",
    alcance: "Único rol con capacidad de elevar privilegios institucionales a Docente, Director, Administrador, Ministro o Jefatura.",
    auditoria: "Cada ascenso o cambio de rol queda firmado criptográficamente con SHA-256 en el registro de auditoría."
  },
  proyeccionEvolutiva5Anos: "Arquitectura blindada para soportar la operación institucional ininterrumpida de Costa Rica y expansión regional 2026-2031."
};
"// Configuración de SuperAdmin y RBAC inicializada correctamente";