import { z } from "zod";

export const createCharacterTemplateSchema = z.object({
  campaignId: z.string().min(1, "Campaign ID is required"),

  startingWealth: z.number().int().min(0).default(500),
  startingSkillPoints: z.number().int().min(0).default(12),
  startingEdges: z.number().int().min(0).default(1),
  startingHindrances: z.number().int().min(0).default(3),
  startingPace: z.number().int().min(0).default(6),
  startingBennies: z.number().int().min(0).default(3),

  bonusSkillIds: z.array(z.string()).optional(),
  bonusEdgeIds: z.array(z.string()).optional(),
  bonusHindranceIds: z.array(z.string()).optional(),
});

export const updateCharacterTemplateSchema = z.object({
  startingWealth: z.number().int().min(0).optional(),
  startingSkillPoints: z.number().int().min(0).optional(),
  startingEdges: z.number().int().min(0).optional(),
  startingHindrances: z.number().int().min(0).optional(),
  startingPace: z.number().int().min(0).optional(),
  startingBennies: z.number().int().min(0).optional(),

  bonusSkillIds: z.array(z.string()).optional(),
  bonusEdgeIds: z.array(z.string()).optional(),
  bonusHindranceIds: z.array(z.string()).optional(),
});