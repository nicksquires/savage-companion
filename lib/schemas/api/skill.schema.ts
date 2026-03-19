import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  linkedAttribute: z.enum(["AGILITY", "SMARTS", "SPIRIT", "STRENGTH", "VIGOR"]),
  description: z.string().optional(),

  // Homebrew / Visibility
  isHomebrew: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  ownerId: z.string().optional(),
  sourceName: z.string().optional(),
});

// For updates (allow partials)
export const skillUpdateSchema = skillSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);

// export const playerCharacterSkillSchema = z.object({
//   playerCharacterId: z.string().min(1),
//   skillId: z.string().min(1),
//   dieType: z.enum(["d4", "d6", "d8", "d10", "d12"]),
//   modifier: z.number().default(0),
//   notes: z.string().optional(),
// });