import { cuadernillos, type Cuadernillo } from './cuadernillos';

export const normalizeSearch = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const aliases: Record<string, string> = {
  '3001': 'accounting contabilidad ingles',
  '3004': 'banquifinanzas banca finanzas bancaria',
  '3013': 'contabilidad de costos contabilidad costos',
};
export function findSpecialties(query: string): Cuadernillo[] {
  const words = normalizeSearch(query).trim().split(/\s+/).filter(word => word && !['de', 'la', 'y', 'el'].includes(word));
  return cuadernillos.filter(book => {
    const text = normalizeSearch(`${book.code} ${book.title} ${aliases[book.code] ?? ''}`);
    return words.every(word => text.includes(word));
  });
}
export function specialtyFamily(book: Cuadernillo): string {
  if (book.code.startsWith('1')) return 'Agropecuaria';
  if (book.code.startsWith('2')) return 'Industrial';
  if (book.code.startsWith('3')) return 'Comercial y servicios';
  return 'Académica CTP';
}
