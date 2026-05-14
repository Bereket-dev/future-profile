import { z } from "zod";

export const AnswersSchema = z.object({
  age: z.union([z.number(), z.string()]).transform((v) => Number(v)).refine((v) => v >= 18 && v <= 70),
  gender: z.string().min(1),
  country: z.string().min(1),
  education: z.string().min(1),
  introExtro: z.number().min(0).max(100),
  careerPriority: z.number().min(0).max(100),
  relationshipGoals: z.string().min(1),
  desireChildren: z.string().min(1),
  socialActivity: z.number().min(0).max(100),
  familyImportance: z.number().min(0).max(100),
  lifestyle: z.string().min(1),
  commitment: z.string().min(1)
});

