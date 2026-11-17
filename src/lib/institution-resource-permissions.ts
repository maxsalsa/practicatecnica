import { z } from 'zod';

export const resourceGrantInput = z.object({
  resource_id: z.string().uuid(),
  institution_id: z.string().uuid(),
  can_read: z.boolean(),
  can_send: z.boolean(),
}).refine(g => !g.can_send || g.can_read, 'Enviar requiere permiso de lectura.');

export const officialInstitutionPhone = z.string().regex(/^[1-9][0-9]{7,14}$/);