export function summarizeAICosts(rows: { actual_credits: number | null }[]) {
  return rows.reduce((total, row) => ({
    confirmed: total.confirmed + (row.actual_credits ?? 0),
    pending: total.pending + (row.actual_credits === null ? 1 : 0),
  }), { confirmed: 0, pending: 0 });
}