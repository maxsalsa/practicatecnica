import { z } from "zod";
import { schoolLevels, schoolSubjects } from "./school-practice";
import { skillAreas } from './skill-areas';
export const learningInput = z.object({
  studentId: z.string().uuid(),
  subject: z.string().refine((s) => schoolSubjects.some((subject) => subject.id === s) || skillAreas.some(area => area.id === s)),
  level: z.string().refine((l) => schoolLevels.includes(l)),
  progress: z.number().int().min(0).max(100),
  notes: z.string().max(1000),
});
