export const INITIAL_MEAL_PRICES = { student: 700, teacher: 1400 } as const;
export function ticketTotal(quantity: number, unitPrice: number) {
  if (!Number.isSafeInteger(quantity) || quantity <= 0 || !Number.isSafeInteger(unitPrice) || unitPrice <= 0 || !Number.isSafeInteger(quantity * unitPrice)) throw new Error('Cantidad o tarifa inválida.');
  return quantity * unitPrice;
}
export function creditedTickets(quantity: number, status: string) { return status === 'confirmado' ? quantity : 0; }