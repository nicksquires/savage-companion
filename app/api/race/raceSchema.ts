import { z } from "zod";

export const raceSchema = z.object({
  name: z.string().min(1, "Race name is required"),
  description: z.string().optional(),
  ancestry: z.string().optional(),
  sourceId: z.string().optional().nullable(),
  ownerId: z.string().optional().nullable(),
  isHomebrew: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  parentId: z.string().optional().nullable(),
});

// For updates (allow partials)
export const updateRaceSchema = raceSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);