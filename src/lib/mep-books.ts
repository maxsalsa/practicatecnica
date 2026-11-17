import content from './mep-book-content.json';

type AssetPointer = { url: string };
const assets = import.meta.glob<AssetPointer>('../assets/libros-mep/*.asset.json', { eager: true, import: 'default' });
export function mepPdfUrl(filename: string): string | undefined {
  return assets[`../assets/libros-mep/${filename}.pdf.asset.json`]?.url;
}
export const mepBooks = content;
export function exampleResult(kind: string, values: number[]): number | undefined {
  const [a, b, c] = values;
  if (a === undefined || b === undefined) return undefined;
  switch (kind) {
    case 'multiply': return a * b;
    case 'box': return c === undefined ? undefined : a + 2 * b + 2 * c;
    case 'mean': return values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : undefined;
    case 'interest': return c === undefined ? undefined : a * b * c;
    case 'balance': return a + b;
    case 'change': return a === 0 ? undefined : (b - a) / a * 100;
    case 'discount': return a * (1 - b);
    case 'cash': return c === undefined ? undefined : a + b - c;
    case 'ratio': return b === 0 ? undefined : a / b;
    case 'subtract': return a - b;
    case 'abc': return b === 0 || c === undefined ? undefined : a / b * c;
    case 'breakeven': return c === undefined || b <= c ? undefined : a / (b - c);
    default: return undefined;
  }
}