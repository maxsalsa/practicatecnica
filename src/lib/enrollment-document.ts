import { z } from 'zod';

export const enrollmentDocumentSchema = z.object({
  path: z.string().max(250),
  category: z.enum(['identificacion', 'foto', 'recibo']),
  description: z.string().trim().min(1).max(120),
  purpose: z.enum(['matricula', 'identidad_privada', 'centro_autorizado']).default('matricula'),
  imageConsent: z.boolean().default(false),
  place: z.string().trim().max(120).default(''),
}).superRefine((doc, ctx) => {
  if (doc.purpose !== 'matricula' && !doc.imageConsent) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Se requiere consentimiento específico para la imagen.' });
  if (doc.purpose === 'centro_autorizado' && !doc.place) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Indique el edificio o aula.' });
});
export const pickupProposalSchema = z.object({
  name: z.string().trim().min(3).max(120),
  identification: z.string().regex(/^[A-Za-z0-9]{5,20}$/),
  relation: z.string().trim().min(2).max(80),
});
export const enrollmentSubmissionSchema = z.object({
  institution: z.string().uuid(),
  relation: z.enum(['madre', 'padre', 'encargado']),
  guardianName: z.string().trim().min(3).max(120),
  email: z.string().email().max(254),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{8,25}$/),
  address: z.string().trim().max(300),
  name: z.string().trim().min(3).max(120),
  identification: z.string().regex(/^[A-Za-z0-9]{5,20}$/),
  level: z.string().trim().min(1).max(40),
  studentEmail: z.union([z.literal(''), z.string().regex(/^[^\s@]+@gmail\.com$/)]),
  birth: z.union([z.literal(''), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]),
  consent: z.literal(true),
  pickup: z.array(pickupProposalSchema).max(5).default([]),
  pickupConsent: z.boolean().default(false),
  documents: z.array(enrollmentDocumentSchema).min(1).max(10),
}).superRefine((data, ctx) => {
  if (data.pickup.length && !data.pickupConsent) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Debe consentir el tratamiento de datos para retiro.' });
});
export function enrollmentPathOwned(path: string, institution: string, user: string) {
  return path.startsWith(`${institution}/${user}/`) && path.split('/').length === 3 && !path.includes('..');
}
export function pickupIsAuthorized(enrollmentStatus: string, pickupStatus: string) {
  return enrollmentStatus === 'aprobada' && pickupStatus === 'autorizada';
}
export function documentMime(bytes: Uint8Array): string | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if ([137,80,78,71,13,10,26,10].every((v,i) => bytes[i] === v)) return 'image/png';
  const text = new TextDecoder().decode(bytes.slice(0,12));
  if (text.startsWith('%PDF-')) return 'application/pdf';
  if (text.startsWith('RIFF') && text.slice(8,12) === 'WEBP') return 'image/webp';
  return null;
}