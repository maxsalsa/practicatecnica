export function requireContentAccess(access: {has_access:boolean}[] | null, failed: boolean) {
  if(failed || !access?.[0]?.has_access) throw new Error('Suscripción o prueba vigente requerida.');
}