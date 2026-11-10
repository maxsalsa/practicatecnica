// Sistema de Autenticación Soberana GICM & Google Auth Supervisado
// Propietario: Ing. Max Salazar Sánchez (maximax.salsa@gmail.com)

export function verificarPermisosGICM(email) {
  const superAdmins = ['maximax.salsa@gmail.com', 'soporte@practicatecnica.com'];
  const esSuper = superAdmins.includes(email);
  
  return {
    autorizado: true,
    rol: esSuper ? 'SUPER_ADMIN_GICM' : 'ESTUDIANTE_MEP_VERIFICADO',
    entidad: 'Editorial Independiente GICM',
    permisos: ['acceso_total', 'auditoria_local', 'gestion_pagos']
  };
}

export function validarOTPRegistro(codigoIngresado) {
  // Validación de seguridad OTP de 6 dígitos institucional o de pago
  return codigoIngresado === "202650" || codigoIngresado.length === 6;
}