import { z } from "zod";

export const itemTypeEnum = z.enum([
  "WEAPON",
  "ARMOR",
  "CONSUMABLE",
  "TOOL",
  "ARTIFACT",
  "KEY_ITEM",
  "COMPONENT",
  "MATERIAL",
  "MISC",
]);

// Base item Schema
export const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  cost: z.number().int().nonnegative().optional(),
  weight: z.number().nonnegative().optional(),
  type: itemTypeEnum.optional(),

  isHomebrew: z.boolean().optional().default(false),
  isPublic: z.boolean().optional().default(true),

  ownerId: z.string().cuid().optional().nullable(),
  parentId: z.string().cuid().optional().nullable(),
  sourceId: z.string().cuid().optional().nullable(),
});

// Verification for PATCH methods
export const updateItemSchema = itemSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided for update." }
);