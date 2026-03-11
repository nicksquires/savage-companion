import { z } from "zod";

export const powerSchema = z.object({
  name: z.string().min(1),
  rank: z.enum(["Novice", "Seasoned", "Veteran", "Heroic", "Legendary"]),
  powerPoints: z.number().min(0).optional(),
  duration: z.string().min(1),
  effect: z.string().min(1),
  trapping: z.string().optional(),

  isHomebrew: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ownerId: z.string().optional(),
  parentId: z.string().optional(),
  sourceId: z.string().optional(),
});

// For updates (allow partials)
export const powerUpdateSchema = powerSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);