export const officialMoptSource = {
  title: 'MOPT. (2026, 13 de febrero). Nuevos Manuales del Conductor estarán disponibles el lunes.',
  url: 'https://www.mopt.go.cr/noticias/2026/nuevos-manuales-del-conductor-estaran-disponibles-el-lunes',
  detail: 'Aviso oficial: manuales separados para automóvil y motocicleta comercializados por Imprenta Nacional. Este enlace no es un PDF descargable ni autoriza reproducir el manual.',
};
export function matchesMoptSource(query: string): boolean {
  const words = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().split(/\s+/);
  return words.some(word => ['mopt', 'manual', 'conductor', 'carro', 'moto', 'automovil', 'motocicleta'].includes(word));
}