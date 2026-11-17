export const PASARELA_PAGOS_GICM = {
  metodoPrincipal: "SINPE Móvil",
  numeroOficial: "60906359",
  titular: "Max Salazar Sánchez",
  banco: "Banco Popular",
  soporteWhatsApp: "+506 60906359",
  canalesOficialesMEP: "Correo @est.mep.go.cr y Microsoft Teams",
  planes: [
    { id: "estudiante-mes", nombre: "Acceso Estudiantil Mensual", precioColones: 2500, features: ["Prácticas ilimitadas", "Simulacros MOPT", "Modo Offline PWA"] },
    { id: "institucional", nombre: "Licencia Institucional CTP", precioColones: 25000, features: ["Gestión completa de horarios", "Fábrica OER ilimitada", "Soporte prioritario GICM"] }
  ]
};
"// Pasarela de pagos inicializada correctamente";