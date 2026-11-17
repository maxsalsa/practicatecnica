const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function parsePickupCode(value: string): { kind: 'pickup' | 'identification'; value: string } | null {
  const text = value.trim();
  const token = text.startsWith('PT-RETIRO:') ? text.slice(10) : '';
  if (uuid.test(token)) return { kind: 'pickup', value: token.toLowerCase() };
  if (/^[A-Za-z0-9]{5,20}$/.test(text)) return { kind: 'identification', value: text };
  return null;
}