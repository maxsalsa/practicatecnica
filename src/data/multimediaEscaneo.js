export const MULTIMEDIA_ESCANEO_GICM = {
  lectorQr: {
    activo: true,
    motor: "Html5Qrcode / ZXing",
    uso: "Validación rápida de tiquetes de comedor, credenciales y accesos estudiantiles"
  },
  lectorBarras: {
    activo: true,
    motor: "BarcodeDetector API",
    uso: "Control de inventarios, equipos de cómputo y activos de laboratorios CTP"
  },
  motorFotos: {
    activo: true,
    formatosSoportados: ["JPG", "PNG", "WEBP"],
    uso: "Evidencias de trabajos cotidianos, prácticas y proyectos STEAM"
  },
  procesadorPdfs: {
    activo: true,
    motor: "PDF.js Core Worker",
    uso: "Lectura, extracción y conversión de programas de estudio MEP y guías de trabajo autónomo (GTA)"
  }
};
"// Módulo multimedia y de escaneo inicializado correctamente";