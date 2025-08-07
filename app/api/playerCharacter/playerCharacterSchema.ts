import { z } from "zod";

export const DieTypeEnum = z.enum(["d4", "d6", "d8", "d10", "d12"]).default("d4");
export const RankEnum = z.enum(["Novice", "Seasoned", "Veteran", "Heroic", "Legendary"]).default("Novice");

// Base Player Character schema
export const playerCharacterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  concept: z.string().optional(),
  userId: z.string().cuid(),

  raceId: z.string().cuid(),
  arcaneBackground: z.string().optional(),
  rank: RankEnum,
  experience: z.number().int().nonnegative().default(0),
  advances: z.number().int().nonnegative().default(0),

  agility: DieTypeEnum,
  smarts: DieTypeEnum,
  spirit: DieTypeEnum,
  strength: DieTypeEnum,
  vigor: DieTypeEnum,

  pace: z.number().int().positive().default(6),
  parry: z.number().int().nonnegative().default(0),
  toughness: z.number().int().nonnegative(),
  armor: z.number().int().nonnegative().default(0),
  bennies: z.number().int().nonnegative().default(3),
  wounds: z.number().int().nonnegative().default(0),
  fatigue: z.number().int().nonnegative().default(0),

  wealth: z.number().int().optional(),
  gear: z.any().optional(),
  notes: z.string().optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// For updates (allow partials)
export const playerCharacterUpdateSchema = playerCharacterSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);