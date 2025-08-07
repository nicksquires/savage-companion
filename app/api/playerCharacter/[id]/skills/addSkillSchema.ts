import { z } from "zod";

export const addSkillSchema = z.object({
  skillId: z.string().min(1, "Skill ID is required"),
});