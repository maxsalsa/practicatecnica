/**
 * Re-encodes photos in the browser before upload so hidden metadata (GPS location, device, time) is removed,
 * and caps the longest side to keep files small. PDFs and unsupported types are returned unchanged.
 */
export const MAX_IMAGE_SIDE = 2000;
export function scaledSize(width: number, height: number, max = MAX_IMAGE_SIDE) {
  const k = Math.min(1, max / Math.max(width, height));
  return { width: Math.max(1, Math.round(width * k)), height: Math.max(1, Math.round(height * k)) };
}
export async function stripImageMetadata(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || typeof createImageBitmap !== 'function') return file;
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' } as ImageBitmapOptions);
  const size = scaledSize(bitmap.width, bitmap.height);
  const canvas = document.createElement('canvas');
  canvas.width = size.width; canvas.height = size.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) { bitmap.close(); return file; }
  ctx.drawImage(bitmap, 0, 0, size.width, size.height);
  bitmap.close();
  const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, type, 0.86));
  if (!blob) return file;
  const name = file.name.replace(/\.[^.]+$/, '') + (type === 'image/png' ? '.png' : '.jpg');
  return new File([blob], name, { type });
}
