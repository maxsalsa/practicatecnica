/** Max requires Gmail accounts for user control; the database enforces the same rule in my_access. */
export const GMAIL_ONLY_MESSAGE = 'Para mayor control de cuentas, pracTICAtecnica.com acepta solo correos @gmail.com.';
export function isAllowedAccountEmail(email: string | null | undefined) {
  return /^[^\s@]+@gmail\.com$/i.test((email ?? '').trim());
}
