export const GUIDED_ATTEMPT_LIMIT = 3;
export const MOCK_ATTEMPT_LIMIT = 2;
export function assessmentBankKey(id: string) { return id.replace(/~f\d+$/, '').replace(/-s\d+$/, ''); }
export function assertAttemptAvailable(used: number, exam: boolean) {
  if (used >= (exam ? MOCK_ATTEMPT_LIMIT : GUIDED_ATTEMPT_LIMIT)) throw new Error(exam ? 'Ha utilizado los dos simulacros de esta materia.' : 'Ha utilizado los tres intentos de esta práctica.');
}