import { z } from "zod";

// Base edge schema
export const edgeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().optional(), // e.g., Background, Combat, Social
  rank: z.enum(['Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary']),
  requirements: z.any().optional(), // stored as JSON — validate deeper if structure known
  effects: z.string().min(1, "Effects description is required"),

  description: z.string().optional(), // long description of edge
  summary: z.string().optional(),     // short description of edge

  effectDefinitions: z.string().optional(),   // JSON effect definitions

  isHomebrew: z.boolean().optional().default(false),
  isPublic: z.boolean().optional().default(true),

  ownerId: z.string().cuid().optional().nullable(),
  parentId: z.string().cuid().optional().nullable(),
  sourceId: z.string().cuid().optional().nullable(), // make mandatory 
});

// For updates (allow partials)
export const edgeUpdateSchema = edgeSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);