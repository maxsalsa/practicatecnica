export function backupDocument(data: { users: unknown[]; grades: unknown[]; permissions: unknown[]; [key: string]: unknown }) {
  return JSON.stringify(data, null, 2);
}
export function downloadBackup(content: string, filename: string) {
  const url = URL.createObjectURL(new Blob([content], { type: 'application/json;charset=utf-8' }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename;
  document.body.appendChild(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}