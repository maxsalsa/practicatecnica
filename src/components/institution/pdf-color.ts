/** Resolves a CSS color token (oklch, hsl, hex…) to RGB through a 1×1 canvas, so PDFs keep the brand color. */
export function tokenRgb(token: string): [number, number, number] | null {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  if (!value) return null;
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.fillStyle = '#000'; ctx.fillStyle = value; ctx.fillRect(0, 0, 1, 1);
  const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}
