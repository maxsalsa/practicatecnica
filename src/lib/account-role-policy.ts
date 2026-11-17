export function canCorrectPersonalRole(currentRoles: string[], selected: string) {
  return !currentRoles.includes('admin') && (selected === 'student' || selected === 'teacher');
}