import { z } from "zod";

export const hindranceSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  severity: z.enum(["Minor", "Major"]),
  category: z.string().optional(),

  isHomebrew: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ownerId: z.string().optional(),
  parentId: z.string().optional(),
  sourceId: z.string().optional(),
});

// For updates (allow partials)
export const hindranceUpdateSchema = hindranceSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);