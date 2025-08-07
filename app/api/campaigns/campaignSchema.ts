import { z } from "zod";

// Base Campaign schema
export const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  summary: z.string().optional(),
  setting: z.string().optional(),
  genre: z.string().optional(),
  isActive: z.boolean().default(true),
  ownerId: z.string().min(1, "Owner ID is required"),

  // Optional nested object for character template
  charTemplate: z
    .object({
      startingWealth: z.number().int().min(0).default(500),
      startingSkillPoints: z.number().int().min(0).default(12),
      startingEdges: z.number().int().min(0).default(1),
      startingHindrances: z.number().int().min(0).default(3),
      startingPace: z.number().int().min(0).default(6),
      startingBennies: z.number().int().min(0).default(3),

      // Optional support for bonus entries (IDs of existing entities)
      bonusSkillIds: z.array(z.string()).optional(),
      bonusEdgeIds: z.array(z.string()).optional(),
      bonusHindranceIds: z.array(z.string()).optional(),
    })
    .optional(),

    // Source support
    sourceIds: z.array(z.string()).min(1, "Select at least one source"),
});

// For updates (allow partials)
export const campaignUpdateSchema = campaignSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);