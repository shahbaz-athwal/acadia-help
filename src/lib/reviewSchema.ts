import { z } from "zod";

export const reviewSchema = z.object({
  message: z.string().min(3).max(500),
  grade: z.string(),
  wouldTakeAgain: z.boolean().nullable(),
  quality: z.number().int().min(1).max(5),
  difficulty: z.number().int().min(1).max(5),
  bookRequired: z.boolean(),
  attendance: z.boolean(),
  courseId: z.string(),
  professorId: z.number().int(),
});

