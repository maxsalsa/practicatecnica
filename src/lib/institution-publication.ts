import { z } from 'zod';
export const institutionQuestion = z.object({ q: z.string().trim().min(3).max(1000), options: z.array(z.string().trim().min(1).max(500)).length(4), answer: z.number().int().min(0).max(3), why: z.string().max(2000).default(''), skill:z.string().trim().max(120).optional() });
export const publicationInput = z.object({ id: z.string().uuid().optional(), institutionId: z.string().uuid(), kind: z.enum(['anuncio','circular','horario','practica','simulacro']), title: z.string().trim().min(3).max(140), body: z.string().max(5000), subject: z.string().max(100), level: z.string().max(80), minutes: z.number().int().min(1).max(180), questions: z.array(institutionQuestion).max(60), status: z.enum(['draft','review']) }).superRefine((d,c) => { if (['practica','simulacro'].includes(d.kind) && !d.questions.length) c.addIssue({ code:'custom',message:'Agregue al menos una pregunta.' }); });
export function hasVisibleTransparency(rgba: Uint8ClampedArray) {
  let transparent = false, visible = false;
  for (let i=3;i<rgba.length;i+=4) { if ((rgba[i] ?? 255)<255) transparent=true; if ((rgba[i] ?? 0)>0) visible=true; }
  return transparent && visible;
}