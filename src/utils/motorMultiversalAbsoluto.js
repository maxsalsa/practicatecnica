// Motor Multiversal Absoluto GICM - www.practicatecnica.com
// Generación algorítmica infinita de variantes para admisiones, MOPT, CTPs, Académica y Universidades.

export function generarPreguntaAleatoriaAbsoluta(materia) {
  const seeds = {
    MATEMATICA: () => {
      const a = Math.floor(Math.random() * 50) + 10;
      const b = Math.floor(Math.random() * 20) + 2;
      return {
        pregunta: `Si un terreno rectangular mide ${a} metros de largo y su perímetro es de ${(a + b)*2} metros, ¿cuál es el ancho exacto?`,
        opciones: [`A) ${b} m`, `B) ${b + 4} m`, `C) ${b - 2} m`, `D) ${b * 2} m`],
        correcta: "A",
        explicacion: `El perímetro es 2(largo + ancho). Despejando se obtiene el ancho de ${b} metros.`
      };
    },
    CIBERSEGURIDAD: () => {
      const puerto = [22, 80, 443, 3389, 21, 53][Math.floor(Math.random() * 6)];
      const servicios = { 22: "SSH", 80: "HTTP", 443: "HTTPS", 3389: "RDP", 21: "FTP", 53: "DNS" };
      return {
        pregunta: `En auditoría de redes, el puerto TCP estándar ${puerto} se encuentra abierto y expuesto. ¿Qué servicio estándar opera típicamente en este puerto?`,
        opciones: [
          `A) ${servicios[puerto]}`,
          `B) Protocolo alternativo de respaldo`,
          `C) Servicio fuera de estandarización IANA`,
          `D) Interfaz de red virtual sin asignar`
        ],
        correcta: "A",
        explicacion: `Por estándares oficiales IANA, el puerto ${puerto} corresponde al servicio ${servicios[puerto]}.`
      };
    },
    MOPT: () => {
      const velocidad = [60, 80, 100, 40][Math.floor(Math.random() * 4)];
      return {
        pregunta: `Conforme a la Ley de Tránsito de Costa Rica, circular a ${velocidad + 40} km/h en una vía señalizada con límite máximo de ${velocidad} km/h constituye una falta calificada como:`,
        opciones: [
          `A) Infracción grave con multa acumulativa`,
          `B) Falta leve de tránsito sin repercusión`,
          `C) Advertencia verbal obligatoria`,
          `D) Exceso permitido por margen de calibración`
        ],
        correcta: "A",
        explicacion: `Exceder el límite de velocidad establecido por los rangos del MOPT conlleva sanciones graves.`
      };
    }
  };

  const generador = seeds[materia] || seeds.CIBERSEGURIDAD;
  return generador();
}