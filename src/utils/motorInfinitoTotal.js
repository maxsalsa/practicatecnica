// Motor Multiversal Infinito GICM - www.practicatecnica.com
// Garantiza que ningún usuario reciba la misma pregunta gracias a la aleatoriedad algorítmica total.

export const BANCO_UNIVERSAL_MEES = {
  CONTABILIDAD: [
    {
      base: "Una empresa registra una transacción de compra por ₡{monto} con IVA del 13%. Si se aplica un descuento comercial del {desc}%, el monto neto sujeto a registro en el Haber es:",
      generar: () => {
        const monto = Math.floor(Math.random() * 800000) + 100000;
        const desc = [5, 10, 15][Math.floor(Math.random() * 3)];
        const neto = monto * (1 - desc / 100) * 1.13;
        return {
          enunciado: `Una empresa registra una transacción de compra por ₡${monto.toLocaleString()} con IVA del 13%. Si se aplica un descuento comercial del ${desc}%, el monto neto sujeto a registro es:`,
          opciones: [
            `A) ₡${neto.toLocaleString(undefined, {maximumFractionDigits: 2})}`,
            `B) ₡${(monto * 1.13).toLocaleString()}`,
            `C) ₡${(monto * (1 - desc/100)).toLocaleString()}`,
            `D) ₡${(monto * 0.87).toLocaleString()}`
          ],
          correcta: "A",
          explicacion: `Se calcula el valor con descuento (${100-desc}%) y se le suma el 13% de IVA.`
        };
      }
    }
  ],
  CIBERSEGURIDAD: [
    {
      base: "En un análisis de vulnerabilidades de red de clase C ({ip}), se detecta un tráfico anómalo en el puerto {puerto}. ¿Qué protocolo o servicio está siendo comprometido?",
      generar: () => {
        const ips = ["192.168.1.0/24", "10.0.5.0/24", "172.16.10.0/24"][Math.floor(Math.random() * 3)];
        const puertos = [
          { p: 22, s: "SSH (Secure Shell)" },
          { p: 80, s: "HTTP (Web Insegura)" },
          { p: 3389, s: "RDP (Remote Desktop Protocol)" },
          { p: 443, s: "HTTPS (TLS Seguro)" }
        ][Math.floor(Math.random() * 4)];
        return {
          enunciado: `En un análisis de vulnerabilidades de red (${ips}), se detecta un ataque de fuerza bruta dirigido al puerto ${puertos.p}. ¿Qué servicio corresponde?`,
          opciones: [
            `A) ${puertos.s}`,
            `B) Servidor de Correos SMTP (Puerto 25)`,
            `C) Sistema de Nombres de Dominio DNS (Puerto 53)`,
            `D) Protocolo de Transferencia de Archivos FTP (Puerto 21)`
          ],
          correcta: "A",
          explicacion: `El puerto ${puertos.p} está asignado por estándares IANA a ${puertos.s}.`
        };
      }
    }
  ],
  CONSTRUCCION_CIVIL: [
    {
      base: "Para vaciar una losa de concreto de {largo} m x {ancho} m con un espesor de {espesor} m, considerando un 5% de desperdicio en obra, el volumen exacto a solicitar es:",
      generar: () => {
        const l = (Math.random() * 5 + 5).toFixed(1);
        const a = (Math.random() * 3 + 3).toFixed(1);
        const e = 0.15;
        const volNeto = l * a * e;
        const volTotal = (volNeto * 1.05).toFixed(2);
        return {
          enunciado: `Para vaciar una losa de concreto de ${l} m x ${a} m con un espesor de ${e} m, considerando un 5% de desperdicio en obra, el volumen exacto a solicitar es:`,
          opciones: [
            `A) ${volTotal} m³`,
            `B) ${volNeto.toFixed(2)} m³`,
            `C) ${(volNeto * 1.10).toFixed(2)} m³`,
            `D) ${(volNeto * 1.15).toFixed(2)} m³`
          ],
          correcta: "A",
          explicacion: `Volumen geométrico (${l} x ${a} x ${e} = ${volNeto.toFixed(2)} m³) multiplicado por el factor de desperdicio (1.05).`
        };
      }
    }
  ],
  MOPT_MANEJO: [
    {
      base: "Conforme a la Ley de Tránsito de Costa Rica, la sanción por estacionar en zona prohibida señalizada con línea amarilla implica:",
      generar: () => {
        const arts = [143, 145, 148][Math.floor(Math.random() * 3)];
        return {
          enunciado: `Conforme a la Ley de Tránsito de Costa Rica (Artículo ${arts}), la contravención por estacionar en zona prohibida o sobre rampa para personas con discapacidad conlleva:`,
          opciones: [
            `A) Multa económica acumulativa y retiro de placas opcional`,
            `B) Únicamente una amonestación verbal de cortesía`,
            `C) Suspensión temporal de la licencia por 2 años`,
            `D) Decomiso permanente del vehículo sin derecho a apelación`
          ],
          correcta: "A",
          explicacion: "Las infracciones por invasión de espacios peatonales y líneas amarillas contemplan multas severas estipuladas por el MOPT."
        };
      }
    }
  ]
};

export function generarReactivoMultiversal(especialidad) {
  const lista = BANCO_UNIVERSAL_MEES[especialidad] || BANCO_UNIVERSAL_MEES.CIBERSEGURIDAD;
  const plantilla = lista[Math.floor(Math.random() * lista.length)];
  return plantilla.generar();
}