import { z } from "zod";

export const questSchema = z.object({
  title: z.string().min(1, "Give your quest a title").max(100, "Keep it under 100 characters"),
  description: z.string().max(500, "Keep it under 500 characters").optional(),
  attribute_key: z.enum(["strength", "intellect", "discipline", "creativity", "wellness"]),
  difficulty: z.enum(["easy", "medium", "hard", "epic"]),
  due_date: z.string().optional(),
});

export type QuestInput = z.infer<typeof questSchema>;